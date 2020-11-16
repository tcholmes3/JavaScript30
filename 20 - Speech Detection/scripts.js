window.SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

//  create a new instance of SpeechRecognition
const recognition = new SpeechRecognition();
// set the iterimResults to true
recognition.interimResults = true;

// create a new paragraph that appends with each new instance
let p = document.createElement("p");
// create a reference to .words div and append p
const words = document.querySelector(".words");
words.appendChild(p);

// add an event listener to recognition that listens for result
recognition.addEventListener("result", (e) => {
    //converts nested transcript data to a string
    const transcript = Array.from(e.results)
        .map((result) => result[0])
        .map(({ transcript }) => transcript)
        .join("");
    // passes it to the p element
    p.textContent = transcript;
    // checks for the prop isFinal on results and appends it to words
    if (e.results[0].isFinal) {
        p = document.createElement("p");
        words.appendChild(p);
    }
});
// add event listener that listens for event end and runs function
recognition.addEventListener("end", recognition.start);

recognition.start();
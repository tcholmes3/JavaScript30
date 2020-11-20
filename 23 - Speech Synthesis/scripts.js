// IIFE
(() => {
    const msg = new SpeechSynthesisUtterance();
    let voices = [];
    const voicesDropdown = document.querySelector('[name="voice"]');
    const options = document.querySelectorAll('[type="range"], [name="text"]');
    const speakButton = document.querySelector("#speak");
    const stopButton = document.querySelector("#stop");

    // set msg.text to value of textarea elem
    msg.text = document.querySelector('[name = "text"]').value;

    // define function populateVoices
    function populateVoices() {
        // define above variable voices as expression of calling method getVoices on event target
        voices = this.getVoices();
        // loop over voices array and assign them as options in dropdown menu
        voicesDropdown.innerHTML = voices
            .map(
                (voice) =>
                `<option value = "${voice.name}">${voice.name}, ${voice.lang}</option>`
            )
            .join("");
    }

    // create a function that sets msg voice to selected from dropdown
    function setVoice() {
        // define voice prop of msg as voices prop that is equal to event target's value
        msg.voice = voices.find((voice) => voice.name === this.value);
        // add function toggle
        toggle();
    }

    // create a function that interrupts speech on option change and pass a flag for passing false to function
    function toggle(startOver = true) {
        speechSynthesis.cancel();
        if (startOver) {
            speechSynthesis.speak(msg);
        }
    }

    // create  function that sets rate, pitch, and text
    function setOption() {
        console.log(this.name, this.value);
        console.log(msg);
        // set the msg properties to appropriate values
        msg[this.name] = this.value;
    }

    // add event listener 'voiceschanged' to speechSynthesis w/ callback function to populate voices in the dropdown
    speechSynthesis.addEventListener("voiceschanged", populateVoices);
    // add event listener 'change' to voicesDropdown w/ callback function to set voice to what has been selected
    voicesDropdown.addEventListener("change", setVoice);
    // add event listener 'change' to options w/ callback function to set rate, pitch, & text
    options.forEach((option) => option.addEventListener("change", setOption));
    // add event listener 'click' on buttons speak & stop with functions toggle and toggle false* respectively
    speakButton.addEventListener("click", toggle);
    stopButton.addEventListener("click", toggle.bind(null, false));

    /*
      to do this we can:
      1) use closure. pass toggle(false) as the body of an anon function
      2) call the .bind() method and pass the value of null with the argument of false *I like this one
      3) use ES6 arrow function with toggle(false) as body
      */
})();
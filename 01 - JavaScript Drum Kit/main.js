function playSound(e) {
    //listening for keypress (e)
    const key = document.querySelector(`div[data-key = "${e.keyCode}"]`);
    const audio = document.querySelector(`audio[data-key = "${e.keyCode}"]`);
    if (!audio) return; //stops keys w/o audio
    audio.currentTime = 0;
    audio.play();
    key.classList.add("playing");
}

function removeAttribute(e) {
    if (e.propertyName !== "transform") return; //effectively targets the transform property in the .playing class
    e.target.classList.remove("playing");
}

const keys = document.querySelectorAll(".key");
keys.forEach((key) => key.addEventListener("transitionend", removeAttribute));

window.addEventListener("keydown", playSound);
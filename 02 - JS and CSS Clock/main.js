function getTime(time) {
    const currentTime = new Date();
    switch (time) {
        case "seconds":
            return currentTime.getSeconds();
        case "minutes":
            return currentTime.getMinutes();
        case "hours":
            return currentTime.getHours();
    }
}

function getDegrees(time, max) {
    return (time / max) * 360 + 90;
}

function runTime() {
    const hour = document.querySelector(".hour-hand");
    const minute = document.querySelector(".min-hand");
    const second = document.querySelector(".second-hand");
    second.style.transform = `rotate(${getDegrees(getTime("seconds"), 60)}deg)`;
    minute.style.transform = `rotate(${getDegrees(getTime("minutes"), 60)}deg)`;
    hour.style.transform = `rotate(${getDegrees(getTime("hours"), 12)}deg)`;
}
setInterval(runTime, 1000);
runTime();
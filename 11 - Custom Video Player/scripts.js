(() => {
    // elements

    const player = document.querySelector(".player"),
        video = player.querySelector(".viewer"),
        progress = player.querySelector(".progress"),
        progressBar = player.querySelector(".progress__filled"),
        toggle = player.querySelector(".toggle"),
        skipButtons = player.querySelectorAll("[data-skip]"),
        ranges = player.querySelectorAll(".player__slider");

    // functions
    const togglePlay = () => video[video.paused ? "play" : "pause"](),
        updateButton = () => (toggle.textContent = video.paused ? "►" : "❚ ❚"),
        handleProgress = () =>
        (progressBar.style["flex-basis"] = `${
        (video.currentTime / video.duration) * 100
      }%`),
        scrub = (e) =>
        (video.currentTime = (e.offsetX / progress.offsetWidth) * video.duration),
        progressMove = (e) => mousedown && scrub(e),
        progressUp = (e) => (mousedown = false),
        progressDown = (e) => (mousedown = true);

    let mousedown = false;
    // event listeners

    const events = [
        { event: "click", handler: togglePlay, target: video },
        { event: "play", handler: updateButton, target: video },
        { event: "pause", handler: updateButton, target: video },
        { event: "timeupdate", handler: handleProgress, target: video },
        { event: "click", handler: togglePlay, target: toggle },
        { event: "click", handler: scrub, target: progress },
        { event: "mousemove", handler: progressMove, target: progress },
        { event: "mousedown", handler: progressDown, target: progress },
        { event: "mouseup", handler: progressUp, target: progress },
    ];

    events.forEach(({ event: e, handler: h, target: t }) =>
        t.addEventListener(e, h)
    );

    skipButtons.forEach((button) =>
        button.addEventListener(
            "click",
            () => (video.currentTime += parseFloat(button.dataset.skip))
        )
    );

    ranges.forEach((range) => {
        range.addEventListener("change", () => (video[range.name] = range.value));
        range.addEventListener(
            "mousemove",
            () => (video[range.name] = range.value)
        );
    });
})();
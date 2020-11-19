// IIFE
(() => {
    //ref all link elements
    const triggers = document.querySelectorAll("a"),
        // create a span element, add a class of highlight & append to body
        highlighter = document.createElement("span");
    highlighter.classList.add("highlight");
    document.body.append(highlighter);

    // create a function to highlight links
    function highlight() {
        // create a constant for highlighted element's BoundingClientRect method
        const linkCoords = this.getBoundingClientRect();
        // apply the width & height to highlighter
        console.log(linkCoords);
        // define a new coords obj to compensate for scrollX & scrollY
        const coords = {
            width: linkCoords.width,
            height: linkCoords.height,
            top: linkCoords.top + window.scrollY,
            left: linkCoords.left + window.scrollX,
        };

        highlighter.style["width"] = `${coords.width}px`;
        highlighter.style["height"] = `${coords.height}px`;
        // style a translate to element's left & top
        highlighter.style[
            "transform"
        ] = `translate(${coords.left}px, ${coords.top}px)`;
    }

    // add event listener for mouseenter to links
    triggers.forEach((a) => a.addEventListener("mouseenter", highlight));
})();
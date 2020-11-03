// store logic in anon function to avoid global pollution
(() => {
    /*
Declare & define a variable reference to canvas HTMLElement
with width and height properties reflecting the inner window size.
*/
    const canvas = document.querySelector("#draw");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    /*
Declare & define a variable reference to the canvas' context(2d),
and set the necessary property values so that lines end and connect smoothly.
*/
    const ctx = canvas.getContext("2d");
    ctx.lineJoin = "round";
    ctx.lineCap = "round";

    /*
Declare two variables which will hold the current and previous mouse location coordinates,
and define them both as objects containing x and y properties with a value of 0.
*/
    const mouse = {
        x: 0,
        y: 0,
    };
    const prevMouse = {...mouse };

    /*
Declare two variables that will be responsible for maintaining the line hue
(should be a number value between 0 and 360) and line width (a boolean set to true).
*/
    let hue = 0;
    let widenLine = true;

    // drawing function
    function draw() {
        ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`; // Set strokeStyle to be an hsl color
        ctx.beginPath(); //Begin/reset the current path and
        ctx.moveTo(prevMouse.x, prevMouse.y); //move the starting point of the path referencing the previous mouse location(x & y)
        ctx.lineTo(mouse.x, mouse.y); // set end of path referencing current mouse location(x & y)
        ctx.closePath(); // Connect and create the path between the two points,
        ctx.stroke(); // and then draw it out.

        hue >= 360 ? (hue = 0) : hue++; // increment hue until 360 then reset

        // increment line width b/t 1 & 100
        widenLine ? ctx.lineWidth++ : ctx.lineWidth--;
        if (ctx.lineWidth >= 100 || ctx.lineWidth <= 1) widenLine = !widenLine;
    }

    // function updating prev & current mouse locations
    // destructuring arrays
    function updateMouse(e) {
        [prevMouse.x, prevMouse.y, mouse.x, mouse.y] = [
            mouse.x,
            mouse.y,
            e.offsetX,
            e.offsetY,
        ];
    }

    // Attach event listeners
    // On a 'mousemove' event, call the function which will update the mouse coordinate values.
    canvas.addEventListener("mousemove", updateMouse);
    // On a 'mousedown' event, attach ANOTHER event listener to the 'mousemove' event that will call the drawing function.
    canvas.addEventListener("mousedown", () =>
        canvas.addEventListener("mousemove", draw)
    );
    // On a 'mouseup' event, REMOVE the event listener attached in the previous step.
    canvas.addEventListener("mouseup", () =>
        canvas.removeEventListener("mousemove", draw)
    );
    //On a 'mouseout' event, repeat the previous step
    canvas.addEventListener("mouseout", () =>
        canvas.removeEventListener("mousemove", draw)
    );
})();
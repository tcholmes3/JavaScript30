const canvas = document.querySelector("#draw");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ctx = canvas.getContext("2d");
ctx.lineJoin = "round";
ctx.lineCap = "round";

let isDrawing = false;
const mouse = {
    x: 0,
    y: 0,
};
let hue = 0;
let widenLine = true;

function draw(e) {
    if (!isDrawing) return;
    ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
    ctx.beginPath();
    // start from
    ctx.moveTo(mouse.x, mouse.y);
    // go to
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    [mouse.x, mouse.y] = [e.offsetX, e.offsetY];

    hue >= 360 ? (hue = 0) : hue++;

    if (ctx.lineWidth >= 100 || ctx.lineWidth <= 1) widenLine = !widenLine;

    widenLine ? ctx.lineWidth++ : ctx.lineWidth--;
}

canvas.addEventListener("mousedown", (e) => {
    isDrawing = true;
    [mouse.x, mouse.y] = [e.offsetX, e.offsetY];
});

canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", () => (isDrawing = false));
canvas.addEventListener("mouseout", () => (isDrawing = false));
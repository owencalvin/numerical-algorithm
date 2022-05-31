import {Point2D, Spline, Splines} from "./classes/Spline";


function setupCanvas(canvas: HTMLCanvasElement, scaleFactor?: number) {
    const pixelRatio = scaleFactor || window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext("2d");

    canvas.style.width = canvas.width + 'px';
    canvas.style.height = canvas.height + 'px';

    canvas.width = rect.width * pixelRatio;
    canvas.height = rect.height * pixelRatio;

    ctx.scale(pixelRatio, pixelRatio);

    return ctx;
}

const canvas = document.getElementById("spline-canvas") as HTMLCanvasElement;
const ctx = setupCanvas(canvas);

const splines = new Splines();
let drawing = false;

function getPoint(e: MouseEvent): Point2D {
    const rect = canvas.getBoundingClientRect();

    return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
    };
}

function draw(e: MouseEvent) {
    if (!drawing) return;

    const point: Point2D = getPoint(e);
    splines.lastSpline.addPoint(point);

    if (splines.lastSpline.pointLength <= 0) return;

    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.lineCap = "round";
    ctx.strokeStyle = "black";
    ctx.moveTo(splines.lastSpline.beforeLastPoint.x, splines.lastSpline.beforeLastPoint.y);
    ctx.lineTo(splines.lastSpline.lastPoint.x, splines.lastSpline.lastPoint.y);
    ctx.closePath();
    ctx.stroke();

    console.log(point);
}

function enterDraw(e: MouseEvent) {
    drawing = true;
    splines.createNewSpline();
    draw(e);
}

function leaveDraw(e: MouseEvent) {
    drawing = false;
}

canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mousedown", enterDraw);
canvas.addEventListener("mouseup", leaveDraw);
document.addEventListener("mouseup", leaveDraw);

import {Point2D, Spline} from "./classes/Spline";


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

const spline = new Spline();
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

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    const point: Point2D = getPoint(e);
    spline.addPoint(point);

    spline.draw(ctx, "gray");
    const simplifiedSpline = spline.copy().simplify(16, 1).translate(100, 0);
    const controlPoints = simplifiedSpline.controlPoints(7);

    simplifiedSpline.draw(ctx, "blue", 3);
    simplifiedSpline.drawPoints(ctx, controlPoints);

    const splineFromControlPoints = new Spline(controlPoints);
    splineFromControlPoints.draw(ctx, "red", 3);
}

function enterDraw(e: MouseEvent) {
    drawing = true;
    spline.clear();
    draw(e);
}

function leaveDraw(e: MouseEvent) {
    drawing = false;
}

canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mousedown", enterDraw);
canvas.addEventListener("mouseup", leaveDraw);
document.addEventListener("mouseup", leaveDraw);

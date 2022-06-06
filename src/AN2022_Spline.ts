import {Spline} from "./classes/Spline";
import {CanvasManager} from "./classes/CanvasManager";

const nbControlPointsElement = document.getElementById("s-control-points") as HTMLInputElement;
const minAngleElement = document.getElementById("s-angle") as HTMLInputElement;
const minNormElement = document.getElementById("s-norm") as HTMLInputElement;

const drawingCanvasElement = document.getElementById("s-spline-canvas") as HTMLCanvasElement;
const previewCanvasElement = document.getElementById("s-spline-canvas-preview") as HTMLCanvasElement;

const drawingCanvasManager = new CanvasManager(drawingCanvasElement);
const previewCanvasManager = new CanvasManager(previewCanvasElement);
previewCanvasManager.isDrawing = true;

let nbControlPoints = 4;
let minAngle = 1;
let minNorm = 20;

const spline = new Spline();

function draw() {
    drawingCanvasManager.clear();
    previewCanvasManager.clear();

    spline.draw(drawingCanvasManager.context, "black");

    const simplifiedSpline = spline.copy().simplify(minNorm, minAngle);
    const controlPoints = simplifiedSpline.controlPoints(spline.areas, nbControlPoints);

    simplifiedSpline.draw(previewCanvasManager.context, "blue", 3);

    const splineFromControlPoints = new Spline(controlPoints);
    splineFromControlPoints.draw(previewCanvasManager.context, "red", 3);

    simplifiedSpline.drawPoints(previewCanvasManager.context, controlPoints);
    simplifiedSpline.drawPoints(previewCanvasManager.context, simplifiedSpline.points, "green", 3);
}

function mouseMove(e: MouseEvent) {
    if (!drawingCanvasManager.isDrawing) return;

    spline.addPoint(drawingCanvasManager.getPoint(e));
    draw();
}

function mouseDown(e: MouseEvent) {
    drawingCanvasManager.isDrawing = true;
    spline.clear();

    mouseMove(e);
}

function mouseUp(e: MouseEvent) {
    drawingCanvasManager.isDrawing = false;
}

drawingCanvasElement.addEventListener("mousemove", mouseMove);
drawingCanvasElement.addEventListener("mousedown", mouseDown);
drawingCanvasElement.addEventListener("mouseup", mouseUp);
document.addEventListener("mouseup", mouseUp);

function onChange() {
    nbControlPoints = Number(nbControlPointsElement.value);
    minAngle = Number(minAngleElement.value);
    minNorm = Number(minNormElement.value);

    draw();
}

nbControlPointsElement.addEventListener("change", onChange);
minAngleElement.addEventListener("change", onChange);
minNormElement.addEventListener("change", onChange);
nbControlPointsElement.addEventListener("keyup", onChange);
minAngleElement.addEventListener("keyup", onChange);
minNormElement.addEventListener("keyup", onChange);

onChange();

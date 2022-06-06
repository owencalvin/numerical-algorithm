import {Spline} from "./classes/Spline";
import {CanvasManager} from "./classes/CanvasManager";
import {Vector2D} from "./classes/Vector2D";

const nbControlPointsElement = document.getElementById("s-control-points") as HTMLInputElement;
const minAngleElement = document.getElementById("s-angle") as HTMLInputElement;
const minNormElement = document.getElementById("s-norm") as HTMLInputElement;
const tElement = document.getElementById("s-t") as HTMLInputElement;
const nbInterpolationPointsElement = document.getElementById("s-interpolation-points") as HTMLInputElement;

const drawingCanvasElement = document.getElementById("s-spline-canvas") as HTMLCanvasElement;
const previewCanvasElement = document.getElementById("s-spline-canvas-preview") as HTMLCanvasElement;
const reconstructionCanvasElement = document.getElementById("s-spline-canvas-reconstruction") as HTMLCanvasElement;
const reconstructionDoneCanvasElement = document.getElementById("s-spline-canvas-reconstruction-done") as HTMLCanvasElement;

const drawingCanvasManager = new CanvasManager(drawingCanvasElement);
const previewCanvasManager = new CanvasManager(previewCanvasElement);
const reconstructionCanvasManager = new CanvasManager(reconstructionCanvasElement);
const reconstructionDoneCanvasManager = new CanvasManager(reconstructionDoneCanvasElement);

let nbControlPoints = 4;
let minAngle = 1;
let minNorm = 20;
let t = 0.5;
let nbInterpolationPoints = 3;

const spline = new Spline();

function draw() {
    drawingCanvasManager.clear();
    previewCanvasManager.clear();
    reconstructionCanvasManager.clear();
    reconstructionDoneCanvasManager.clear();

    drawingCanvasManager.drawLine(spline.points, "black", 3);

    const simplifiedSpline = spline.copy().simplify(minNorm, minAngle);
    const controlPoints = simplifiedSpline.controlPoints(spline.areas, nbControlPoints);
    const splineFromControlPoints = new Spline(controlPoints);
    previewCanvasManager.drawLine(simplifiedSpline.points, "blue", 3);
    previewCanvasManager.drawLine(splineFromControlPoints.points, "red", 3);
    previewCanvasManager.drawPoints(simplifiedSpline.points, 3, "green", "green");
    previewCanvasManager.drawPoints(controlPoints, 5, "green", "black", 2);

    const reconstructedSpline = splineFromControlPoints.copy().catmullRomInterpolation(
        (pA, pB, pC, pD, i, nbInterpolationPoints) => i / nbInterpolationPoints,
        (pA, pB, pC) => {
            if (nbInterpolationPoints >= 0) return nbInterpolationPoints;

            const vBC = new Vector2D(pB, pC);
            const vBA = new Vector2D(pB, pA);
            const angle = vBA.angle(vBC);

            // norm greater -> more points
            // angle greater -> more points
            const normFactor = 0.02 * vBC.norm;
            const angleFactor = 10 * (angle / Math.PI);
            return Math.ceil(normFactor * angleFactor);
        }
    );

    reconstructionCanvasManager.drawLine(reconstructedSpline.points, "black", 3);
    reconstructionCanvasManager.drawPoints(reconstructedSpline.points, 3, "red", "red");
    reconstructionCanvasManager.drawPoints(controlPoints, 5, "green", "black", 2);

    reconstructionDoneCanvasManager.drawLine(reconstructedSpline.points, "black", 3);
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
    console.log("change");
    nbControlPoints = Number(nbControlPointsElement.value);
    minAngle = Number(minAngleElement.value);
    minNorm = Number(minNormElement.value);
    t = Number(tElement.value);
    nbInterpolationPoints = Number(nbInterpolationPointsElement.value);

    draw();
}

nbControlPointsElement.addEventListener("change", onChange);
minAngleElement.addEventListener("change", onChange);
minNormElement.addEventListener("change", onChange);
tElement.addEventListener("change", onChange);
nbInterpolationPointsElement.addEventListener("change", onChange);

nbControlPointsElement.addEventListener("keyup", onChange);
minAngleElement.addEventListener("keyup", onChange);
minNormElement.addEventListener("keyup", onChange);
tElement.addEventListener("keyup", onChange);
nbInterpolationPointsElement.addEventListener("keyup", onChange);

onChange();

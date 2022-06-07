import {Spline} from "./classes/Spline";
import {CanvasManager} from "./classes/CanvasManager";
import {Vector2D} from "./classes/Vector2D";
import {Point2D} from "./classes/Point2D";

const nbControlPointsElement = document.getElementById("s-nb-control-points") as HTMLInputElement;
const minAngleElement = document.getElementById("s-angle") as HTMLInputElement;
const minNormElement = document.getElementById("s-norm") as HTMLInputElement;
const nbInterpolationPointsElement = document.getElementById("s-interpolation-points") as HTMLInputElement;

const drawingCanvasElement = document.getElementById("s-drawing") as HTMLCanvasElement;
const drawingPointsCanvasElement = document.getElementById("s-drawing-points") as HTMLCanvasElement;
const simplifiedCanvasElement = document.getElementById("s-simplified") as HTMLCanvasElement;
const controlPointsCanvasElement = document.getElementById("s-control-points") as HTMLCanvasElement;
const simplifiedInterpolationElement = document.getElementById("s-simplified-interpolation") as HTMLCanvasElement;
const controlPointsInterpolationElement = document.getElementById("s-control-points-interpolation") as HTMLCanvasElement;
const simplifiedInterpolationDoneElement = document.getElementById("s-simplified-interpolation-done") as HTMLCanvasElement;
const controlPointsInterpolationDoneElement = document.getElementById("s-control-points-interpolation-done") as HTMLCanvasElement;

const drawingCanvasManager = new CanvasManager(drawingCanvasElement);
const drawingPointsCanvasManager = new CanvasManager(drawingPointsCanvasElement);
const simplifiedManager = new CanvasManager(simplifiedCanvasElement);
const controlPointsManager = new CanvasManager(controlPointsCanvasElement);
const simplifiedInterpolationManager = new CanvasManager(simplifiedInterpolationElement);
const controlPointsInterpolationManager = new CanvasManager(controlPointsInterpolationElement);
const simplifiedInterpolationDoneManager = new CanvasManager(simplifiedInterpolationDoneElement);
const controlPointsInterpolationDoneManager = new CanvasManager(controlPointsInterpolationDoneElement);

const spline = new Spline();
let nbControlPoints = 4;
let minAngle = 1;
let minNorm = 20;
let nbInterpolationPoints = 3;
const interpolationFn = (pA: Point2D, pB: Point2D, pC: Point2D) => {
    if (nbInterpolationPoints >= 0) return nbInterpolationPoints;

    const vBC = new Vector2D(pB, pC);
    const vBA = new Vector2D(pB, pA);
    const angle = vBA.angle(vBC);

    // norm greater -> more points
    // angle greater -> more points
    const normFactor = 0.02 * vBC.norm;
    const angleFactor = 10 * (angle / Math.PI);
    return Math.ceil(normFactor * angleFactor);
};

function clearAll() {
    drawingCanvasManager.clear();
    simplifiedManager.clear();
    controlPointsManager.clear();
    simplifiedInterpolationManager.clear();
    controlPointsInterpolationManager.clear();
    simplifiedInterpolationDoneManager.clear();
    controlPointsInterpolationDoneManager.clear();
    drawingPointsCanvasManager.clear();
}

function update() {
    clearAll();

    drawingCanvasManager.drawLine(spline.points, "black", 3);

    drawingPointsCanvasManager.drawLine(spline.points, "black", 1);
    drawingPointsCanvasManager.drawPoints(spline.points, 2, "red", "red");

    const simplifiedSpline = spline.copy().simplify(minNorm, minAngle);
    const controlPoints = simplifiedSpline.controlPoints(spline.areas, nbControlPoints);
    simplifiedManager.drawLine(simplifiedSpline.points, "black", 1);
    simplifiedManager.drawPoints(simplifiedSpline.points, 3, "red", "red");
    simplifiedManager.drawPoints(controlPoints, 5, "red", "black", 2);

    const controlPointsSpline = new Spline(controlPoints);
    controlPointsManager.drawLine(controlPointsSpline.points, "black", 1);
    controlPointsManager.drawPoints(controlPointsSpline.points, 5, "red", "black", 2);

    const interpolatedSimplifiedSpline = simplifiedSpline.copy().catmullRomInterpolation(interpolationFn);
    simplifiedInterpolationManager.drawLine(interpolatedSimplifiedSpline.points, "black", 3);
    simplifiedInterpolationManager.drawPoints(interpolatedSimplifiedSpline.points, 2, "green", "green");
    simplifiedInterpolationManager.drawPoints(simplifiedSpline.points, 1, "red", "red");
    simplifiedInterpolationManager.drawPoints(controlPoints, 5, "red", "black", 2);

    const interpolatedControlPointsSpline = controlPointsSpline.copy().catmullRomInterpolation(interpolationFn);
    controlPointsInterpolationManager.drawLine(interpolatedControlPointsSpline.points, "black", 1);
    controlPointsInterpolationManager.drawPoints(interpolatedControlPointsSpline.points, 2, "green", "green");
    controlPointsInterpolationManager.drawPoints(controlPoints, 5, "red", "black", 2);

    controlPointsInterpolationDoneManager.drawLine(interpolatedControlPointsSpline.points, "black", 3);
    simplifiedInterpolationDoneManager.drawLine(interpolatedSimplifiedSpline.points, "black", 3);
}

function mouseMove(e: MouseEvent) {
    if (!drawingCanvasManager.isDrawing) return;

    spline.addPoint(drawingCanvasManager.getPoint(e));
    update();
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
    nbInterpolationPoints = Number(nbInterpolationPointsElement.value);

    update();
}

nbControlPointsElement.addEventListener("change", onChange);
minAngleElement.addEventListener("change", onChange);
minNormElement.addEventListener("change", onChange);
nbInterpolationPointsElement.addEventListener("change", onChange);

nbControlPointsElement.addEventListener("keyup", onChange);
minAngleElement.addEventListener("keyup", onChange);
minNormElement.addEventListener("keyup", onChange);
nbInterpolationPointsElement.addEventListener("keyup", onChange);

onChange();

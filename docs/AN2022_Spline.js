/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/classes/Vector2D.ts
var Vector2D = /** @class */ (function () {
    function Vector2D(start, end) {
        if (end) {
            this._x = end.x - start.x;
            this._y = end.y - start.y;
        }
        else {
            this._x = start.x;
            this._y = start.y;
        }
    }
    Object.defineProperty(Vector2D.prototype, "norm", {
        get: function () {
            return Math.sqrt(Math.pow(this._x, 2) + Math.pow(this._y, 2));
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Vector2D.prototype, "x", {
        get: function () {
            return this._x;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Vector2D.prototype, "y", {
        get: function () {
            return this._y;
        },
        enumerable: false,
        configurable: true
    });
    Vector2D.prototype.normal = function () {
        return new Vector2D({
            x: -this._y,
            y: this._x
        });
    };
    Vector2D.prototype.dotProduct = function (vector) {
        return this._x * vector._x + this._y * vector._y;
    };
    Vector2D.prototype.angle = function (vector) {
        return Math.acos(this.dotProduct(vector) / (this.norm * vector.norm));
    };
    Vector2D.prototype.multiply = function (factor) {
        return new Vector2D({
            x: factor * this._x,
            y: factor * this._y
        });
    };
    Vector2D.prototype.add = function (point) {
        return new Vector2D({
            x: this._x + point._x,
            y: this._y + point._y
        });
    };
    Vector2D.prototype.substract = function (point) {
        return this.add(this.multiply(-1));
    };
    Vector2D.prototype.copy = function () {
        return new Vector2D({
            x: this._x,
            y: this._y
        });
    };
    return Vector2D;
}());


;// CONCATENATED MODULE: ./src/classes/Spline.ts
var __spreadArray = (undefined && undefined.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};

var Spline = /** @class */ (function () {
    function Spline(points) {
        if (points === void 0) { points = []; }
        this._points = points;
    }
    Object.defineProperty(Spline.prototype, "points", {
        get: function () {
            return this._points;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Spline.prototype, "pointLength", {
        get: function () {
            return this._points.length;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Spline.prototype, "lastPoint", {
        get: function () {
            return this._points[this.pointLength - 1];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Spline.prototype, "beforeLastPoint", {
        get: function () {
            return this._points[this.pointLength - 2];
        },
        enumerable: false,
        configurable: true
    });
    Spline.prototype.findPoint = function (point) {
        return this._points.find(function (p2) { return point.x == p2.x && point.y == p2.y; });
    };
    Spline.prototype.addPoint = function (point) {
        this._points.push(point);
    };
    Spline.prototype.clear = function () {
        this._points = [];
    };
    Spline.prototype.simplify = function (minNorm, minAngle) {
        this._points = this._points.reduce(function (prev, item) {
            if (prev.length <= 3)
                return __spreadArray(__spreadArray([], prev, true), [item], false);
            var beforeLastPoint = prev[prev.length - 2];
            var lastPoint = prev[prev.length - 1];
            var vAC = new Vector2D(beforeLastPoint, item);
            var vAB = new Vector2D(beforeLastPoint, lastPoint);
            var vBC = new Vector2D(lastPoint, item);
            if (vAC.norm < minNorm)
                prev.pop();
            var degAngle = vAB.angle(vBC) * 180 / Math.PI;
            if (degAngle < minAngle)
                prev.pop();
            prev.push(item);
            return prev;
        }, []);
        return this;
    };
    Object.defineProperty(Spline.prototype, "angles", {
        get: function () {
            var _this = this;
            return this._points.map(function (currentPoint, index) {
                if (index + 1 <= 1 || index + 1 >= _this._points.length)
                    return Infinity;
                var lastPoint = _this._points[index - 1];
                var nextPoint = _this._points[index + 1];
                var vBA = new Vector2D(currentPoint, lastPoint);
                var vBC = new Vector2D(currentPoint, nextPoint);
                return vBA.angle(vBC);
            });
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Spline.prototype, "areas", {
        get: function () {
            var _this = this;
            return this._points.map(function (currentPoint, index) {
                if (index + 1 <= 1 || index + 1 >= _this._points.length)
                    return Infinity;
                var lastPoint = _this._points[index - 1];
                var nextPoint = _this._points[index + 1];
                var vBA = new Vector2D(currentPoint, lastPoint);
                var vBC = new Vector2D(currentPoint, nextPoint);
                var vAC = new Vector2D(lastPoint, nextPoint);
                var s = (vAC.norm + vBA.norm + vBC.norm) / 2;
                return Math.sqrt(s * (s - vAC.norm) * (s - vBA.norm) * (s - vBC.norm));
            });
        },
        enumerable: false,
        configurable: true
    });
    Spline.prototype.controlPoints = function (values, numberOfControlPoints) {
        var _this = this;
        numberOfControlPoints = Math.max(numberOfControlPoints, 2);
        var valuesWithIndexes = this.areas.map(function (value, index) { return [value, index]; });
        valuesWithIndexes.sort(function (a, b) {
            if (Number.isNaN(b[0]))
                return -1;
            if (a[0] < b[0])
                return 1;
            else if (a[0] > b[0])
                return -1;
            return 0;
        });
        return valuesWithIndexes
            .slice(0, numberOfControlPoints)
            .sort(function (a, b) {
            if (a[1] < b[1])
                return 1;
            else if (a[1] > b[1])
                return -1;
            return 0;
        })
            .map(function (x) { return _this._points[x[1]]; });
    };
    Spline.prototype.translate = function (x, y) {
        this._points = this._points.map(function (point) {
            return {
                x: point.x + x,
                y: point.y + y
            };
        });
        return this;
    };
    Spline.prototype.copy = function () {
        return new Spline(this._points);
    };
    Spline.prototype.catmullRomInterpolation = function (nbInterpolationPointsFn) {
        var _this = this;
        var lastPoint = this._points[this._points.length - 1];
        this._points = this._points.reduce(function (prev, pC, index) {
            if (index + 1 <= 2 || index + 1 >= _this._points.length)
                return prev;
            var add = function (py) {
                if (!prev.find(function (px) { return px.x === py.x && px.y === py.y; })) {
                    prev.push(py);
                }
            };
            var pA = _this._points[index - 2];
            var pB = _this._points[index - 1];
            var pD = _this._points[index + 1];
            add(pA);
            add(pB);
            var nbInterpolationPoints = nbInterpolationPointsFn(pA, pB, pC, pD) + 2;
            for (var i = 2; i < nbInterpolationPoints; i++) {
                var t = i / nbInterpolationPoints;
                var point = {
                    x: Spline.catmullRom(t, pA.x, pB.x, pC.x, pD.x),
                    y: Spline.catmullRom(t, pA.y, pB.y, pC.y, pD.y)
                };
                prev = __spreadArray(__spreadArray([], prev, true), [
                    point,
                ], false);
            }
            add(pC);
            return prev;
        }, []);
        this._points = __spreadArray(__spreadArray([], this._points, true), [
            lastPoint
        ], false);
        return this;
    };
    Spline.catmullRom = function (t, mA, mB, mC, mD) {
        var a = 3 * mB - mA - 3 * mC + mD;
        var b = 2 * mA - 5 * mB + 4 * mC - mD;
        var c = (mC - mA) * t;
        var d = 2 * mB;
        var final = a * Math.pow(t, 3) + b * Math.pow(t, 2) + c + d;
        return 0.5 * final;
    };
    return Spline;
}());


;// CONCATENATED MODULE: ./src/classes/CanvasManager.ts
var CanvasManager = /** @class */ (function () {
    function CanvasManager(canvas, scaleFactor) {
        this._isDrawing = false;
        this._canvas = canvas;
        this._pixelRatio = scaleFactor || window.devicePixelRatio || 1;
        var rect = this._canvas.getBoundingClientRect();
        var context = this._canvas.getContext("2d");
        this._canvas.style.width = this._canvas.width + 'px';
        this._canvas.style.height = this._canvas.height + 'px';
        this._canvas.width = rect.width * this._pixelRatio;
        this._canvas.height = rect.height * this._pixelRatio;
        context.scale(this._pixelRatio, this._pixelRatio);
        this._context = context;
    }
    Object.defineProperty(CanvasManager.prototype, "canvas", {
        get: function () {
            return this._canvas;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CanvasManager.prototype, "pixelRatio", {
        get: function () {
            return this._pixelRatio;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CanvasManager.prototype, "context", {
        get: function () {
            return this._context;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CanvasManager.prototype, "isDrawing", {
        get: function () {
            return this._isDrawing;
        },
        set: function (isDrawing) {
            this._isDrawing = isDrawing;
        },
        enumerable: false,
        configurable: true
    });
    CanvasManager.prototype.clear = function () {
        this.context.clearRect(0, 0, this._context.canvas.width, this._context.canvas.height);
    };
    CanvasManager.prototype.getPoint = function (e) {
        var rect = this._canvas.getBoundingClientRect();
        return {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        };
    };
    CanvasManager.prototype.drawPoint = function (point, radius, fillColor, strokeColor, lineWidth) {
        if (radius === void 0) { radius = 5; }
        if (fillColor === void 0) { fillColor = "black"; }
        if (strokeColor === void 0) { strokeColor = "black"; }
        if (lineWidth === void 0) { lineWidth = 0; }
        if (!point)
            return;
        this._context.beginPath();
        this._context.lineWidth = lineWidth;
        this._context.lineCap = "round";
        this._context.fillStyle = fillColor;
        this._context.strokeStyle = strokeColor;
        this._context.arc(point.x, point.y, radius, 0, 2 * Math.PI);
        this._context.fill();
        this._context.stroke();
        this._context.closePath();
    };
    CanvasManager.prototype.drawPoints = function (points, radius, fillColor, strokeColor, lineWidth) {
        var _this = this;
        if (radius === void 0) { radius = 5; }
        if (fillColor === void 0) { fillColor = "black"; }
        if (strokeColor === void 0) { strokeColor = "black"; }
        if (lineWidth === void 0) { lineWidth = 0; }
        points.forEach(function (point) { return _this.drawPoint(point, radius, fillColor, strokeColor, lineWidth); });
    };
    CanvasManager.prototype.drawLine = function (points, strokeColor, lineWidth) {
        var _this = this;
        if (strokeColor === void 0) { strokeColor = "black"; }
        if (lineWidth === void 0) { lineWidth = 1; }
        points.forEach(function (point, index) {
            if (index >= points.length - 1)
                return;
            _this._context.beginPath();
            _this._context.lineWidth = lineWidth;
            _this._context.lineCap = "round";
            _this._context.strokeStyle = strokeColor;
            _this._context.moveTo(point.x, point.y);
            _this._context.lineTo(points[index + 1].x, points[index + 1].y);
            _this._context.stroke();
            _this._context.closePath();
        });
    };
    return CanvasManager;
}());


;// CONCATENATED MODULE: ./src/AN2022_Spline.ts



var nbControlPointsElement = document.getElementById("s-nb-control-points");
var minAngleElement = document.getElementById("s-angle");
var minNormElement = document.getElementById("s-norm");
var nbInterpolationPointsElement = document.getElementById("s-interpolation-points");
var drawingCanvasElement = document.getElementById("s-drawing");
var simplifiedCanvasElement = document.getElementById("s-simplified");
var controlPointsCanvasElement = document.getElementById("s-control-points");
var simplifiedInterpolationElement = document.getElementById("s-simplified-interpolation");
var controlPointsInterpolationElement = document.getElementById("s-control-points-interpolation");
var simplifiedInterpolationDoneElement = document.getElementById("s-simplified-interpolation-done");
var controlPointsInterpolationDoneElement = document.getElementById("s-control-points-interpolation-done");
var drawingCanvasManager = new CanvasManager(drawingCanvasElement);
var simplifiedManager = new CanvasManager(simplifiedCanvasElement);
var controlPointsManager = new CanvasManager(controlPointsCanvasElement);
var simplifiedInterpolationManager = new CanvasManager(simplifiedInterpolationElement);
var controlPointsInterpolationManager = new CanvasManager(controlPointsInterpolationElement);
var simplifiedInterpolationDoneManager = new CanvasManager(simplifiedInterpolationDoneElement);
var controlPointsInterpolationDoneManager = new CanvasManager(controlPointsInterpolationDoneElement);
var spline = new Spline();
var nbControlPoints = 4;
var minAngle = 1;
var minNorm = 20;
var nbInterpolationPoints = 3;
var interpolationFn = function (pA, pB, pC) {
    if (nbInterpolationPoints >= 0)
        return nbInterpolationPoints;
    var vBC = new Vector2D(pB, pC);
    var vBA = new Vector2D(pB, pA);
    var angle = vBA.angle(vBC);
    // norm greater -> more points
    // angle greater -> more points
    var normFactor = 0.02 * vBC.norm;
    var angleFactor = 10 * (angle / Math.PI);
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
}
function update() {
    clearAll();
    drawingCanvasManager.drawLine(spline.points, "black", 3);
    var simplifiedSpline = spline.copy().simplify(minNorm, minAngle);
    var controlPoints = simplifiedSpline.controlPoints(spline.areas, nbControlPoints);
    simplifiedManager.drawLine(simplifiedSpline.points, "blue", 3);
    simplifiedManager.drawPoints(simplifiedSpline.points, 3, "green", "green");
    simplifiedManager.drawPoints(controlPoints, 5, "green", "black", 2);
    var controlPointsSpline = new Spline(controlPoints);
    controlPointsManager.drawLine(controlPointsSpline.points, "red", 3);
    controlPointsManager.drawPoints(controlPointsSpline.points, 5, "green", "black", 2);
    var interpolatedSimplifiedSpline = simplifiedSpline.copy().catmullRomInterpolation(interpolationFn);
    simplifiedInterpolationManager.drawLine(interpolatedSimplifiedSpline.points, "black", 3);
    simplifiedInterpolationManager.drawPoints(interpolatedSimplifiedSpline.points, 2, "red", "red");
    simplifiedInterpolationManager.drawPoints(simplifiedSpline.points, 3, "green", "green");
    simplifiedInterpolationManager.drawPoints(controlPoints, 5, "green", "black", 2);
    var interpolatedControlPointsSpline = controlPointsSpline.copy().catmullRomInterpolation(interpolationFn);
    controlPointsInterpolationManager.drawLine(interpolatedControlPointsSpline.points, "black", 3);
    controlPointsInterpolationManager.drawPoints(interpolatedControlPointsSpline.points, 2, "red", "red");
    controlPointsInterpolationManager.drawPoints(controlPoints, 5, "green", "black", 2);
    controlPointsInterpolationDoneManager.drawLine(interpolatedControlPointsSpline.points, "black", 3);
    simplifiedInterpolationDoneManager.drawLine(interpolatedSimplifiedSpline.points, "black", 3);
}
function mouseMove(e) {
    if (!drawingCanvasManager.isDrawing)
        return;
    spline.addPoint(drawingCanvasManager.getPoint(e));
    update();
}
function mouseDown(e) {
    drawingCanvasManager.isDrawing = true;
    spline.clear();
    mouseMove(e);
}
function mouseUp(e) {
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

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUU5QyxTQUFTLFFBQVE7SUFDYixlQUFlLEdBQUcsTUFBTSxDQUFDLHNCQUFzQixDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3ZELFFBQVEsR0FBRyxNQUFNLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3pDLE9BQU8sR0FBRyxNQUFNLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3ZDLHFCQUFxQixHQUFHLE1BQU0sQ0FBQyw0QkFBNEIsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUVuRSxNQUFNLEVBQUUsQ0FBQztBQUNiLENBQUM7QUFFRCxzQkFBc0IsQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLENBQUM7QUFDNUQsZUFBZSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsQ0FBQztBQUNyRCxjQUFjLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0FBQ3BELDRCQUE0QixDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsQ0FBQztBQUVsRSxzQkFBc0IsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsUUFBUSxDQUFDLENBQUM7QUFDM0QsZUFBZSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxRQUFRLENBQUMsQ0FBQztBQUNwRCxjQUFjLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0FBQ25ELDRCQUE0QixDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxRQUFRLENBQUMsQ0FBQztBQUVqRSxRQUFRLEVBQUUsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL21hdGhfc3BlLy4vc3JjL2NsYXNzZXMvVmVjdG9yMkQudHMiLCJ3ZWJwYWNrOi8vbWF0aF9zcGUvLi9zcmMvY2xhc3Nlcy9TcGxpbmUudHMiLCJ3ZWJwYWNrOi8vbWF0aF9zcGUvLi9zcmMvY2xhc3Nlcy9DYW52YXNNYW5hZ2VyLnRzIiwid2VicGFjazovL21hdGhfc3BlLy4vc3JjL0FOMjAyMl9TcGxpbmUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtQb2ludDJEfSBmcm9tIFwiLi9Qb2ludDJEXCI7XG5cbmV4cG9ydCBjbGFzcyBWZWN0b3IyRCB7XG4gICAgcHJpdmF0ZSBfeDogbnVtYmVyO1xuICAgIHByaXZhdGUgX3k6IG51bWJlcjtcblxuICAgIGNvbnN0cnVjdG9yKHBvaW50OiBQb2ludDJEKTtcbiAgICBjb25zdHJ1Y3RvcihzdGFydDogUG9pbnQyRCwgZW5kOiBQb2ludDJEKTtcbiAgICBjb25zdHJ1Y3RvcihzdGFydDogUG9pbnQyRCwgZW5kPzogUG9pbnQyRCkge1xuICAgICAgICBpZiAoZW5kKSB7XG4gICAgICAgICAgICB0aGlzLl94ID0gZW5kLnggLSBzdGFydC54O1xuICAgICAgICAgICAgdGhpcy5feSA9IGVuZC55IC0gc3RhcnQueTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX3ggPSBzdGFydC54O1xuICAgICAgICAgICAgdGhpcy5feSA9IHN0YXJ0Lnk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXQgbm9ybSgpIHtcbiAgICAgICAgcmV0dXJuIE1hdGguc3FydCh0aGlzLl94ICoqIDIgKyB0aGlzLl95ICoqIDIpO1xuICAgIH1cblxuICAgIGdldCB4KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5feDtcbiAgICB9XG5cbiAgICBnZXQgeSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3k7XG4gICAgfVxuXG4gICAgbm9ybWFsKCkge1xuICAgICAgICByZXR1cm4gbmV3IFZlY3RvcjJEKHtcbiAgICAgICAgICAgIHg6IC10aGlzLl95LFxuICAgICAgICAgICAgeTogdGhpcy5feFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBkb3RQcm9kdWN0KHZlY3RvcjogVmVjdG9yMkQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3ggKiB2ZWN0b3IuX3ggKyB0aGlzLl95ICogdmVjdG9yLl95O1xuICAgIH1cblxuICAgIGFuZ2xlKHZlY3RvcjogVmVjdG9yMkQpIHtcbiAgICAgICAgcmV0dXJuIE1hdGguYWNvcyh0aGlzLmRvdFByb2R1Y3QodmVjdG9yKSAvICh0aGlzLm5vcm0gKiB2ZWN0b3Iubm9ybSkpO1xuICAgIH1cblxuICAgIG11bHRpcGx5KGZhY3RvcjogbnVtYmVyKSB7XG4gICAgICAgIHJldHVybiBuZXcgVmVjdG9yMkQoe1xuICAgICAgICAgICAgeDogZmFjdG9yICogdGhpcy5feCxcbiAgICAgICAgICAgIHk6IGZhY3RvciAqIHRoaXMuX3lcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgYWRkKHBvaW50OiBWZWN0b3IyRCkge1xuICAgICAgICByZXR1cm4gbmV3IFZlY3RvcjJEKHtcbiAgICAgICAgICAgIHg6IHRoaXMuX3ggKyBwb2ludC5feCxcbiAgICAgICAgICAgIHk6IHRoaXMuX3kgKyBwb2ludC5feVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBzdWJzdHJhY3QocG9pbnQ6IFZlY3RvcjJEKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmFkZCh0aGlzLm11bHRpcGx5KC0xKSk7XG4gICAgfVxuXG4gICAgY29weSgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBWZWN0b3IyRCh7XG4gICAgICAgICAgICB4OiB0aGlzLl94LFxuICAgICAgICAgICAgeTogdGhpcy5feVxuICAgICAgICB9KTtcbiAgICB9XG59XG4iLCJpbXBvcnQge1ZlY3RvcjJEfSBmcm9tIFwiLi9WZWN0b3IyRFwiO1xuaW1wb3J0IHtQb2ludDJEfSBmcm9tIFwiLi9Qb2ludDJEXCI7XG5cbmV4cG9ydCBjbGFzcyBTcGxpbmUge1xuICAgIHByaXZhdGUgX3BvaW50czogUG9pbnQyRFtdO1xuXG4gICAgY29uc3RydWN0b3IocG9pbnRzOiBQb2ludDJEW10gPSBbXSkge1xuICAgICAgICB0aGlzLl9wb2ludHMgPSBwb2ludHM7XG4gICAgfVxuXG4gICAgZ2V0IHBvaW50cygpOiByZWFkb25seSBQb2ludDJEW10ge1xuICAgICAgICByZXR1cm4gdGhpcy5fcG9pbnRzO1xuICAgIH1cblxuICAgIGdldCBwb2ludExlbmd0aCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3BvaW50cy5sZW5ndGg7XG4gICAgfVxuXG4gICAgZ2V0IGxhc3RQb2ludCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3BvaW50c1t0aGlzLnBvaW50TGVuZ3RoIC0gMV07XG4gICAgfVxuXG4gICAgZ2V0IGJlZm9yZUxhc3RQb2ludCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3BvaW50c1t0aGlzLnBvaW50TGVuZ3RoIC0gMl07XG4gICAgfVxuXG4gICAgZmluZFBvaW50KHBvaW50OiBQb2ludDJEKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9wb2ludHMuZmluZCgocDIpID0+IHBvaW50LnggPT0gcDIueCAmJiBwb2ludC55ID09IHAyLnkpO1xuICAgIH1cblxuICAgIGFkZFBvaW50KHBvaW50OiBQb2ludDJEKSB7XG4gICAgICAgIHRoaXMuX3BvaW50cy5wdXNoKHBvaW50KTtcbiAgICB9XG5cbiAgICBjbGVhcigpIHtcbiAgICAgICAgdGhpcy5fcG9pbnRzID0gW107XG4gICAgfVxuXG4gICAgc2ltcGxpZnkobWluTm9ybTogbnVtYmVyLCBtaW5BbmdsZTogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuX3BvaW50cyA9IHRoaXMuX3BvaW50cy5yZWR1Y2U8UG9pbnQyRFtdPigocHJldiwgaXRlbSkgPT4ge1xuICAgICAgICAgICAgaWYgKHByZXYubGVuZ3RoIDw9IDMpIHJldHVybiBbLi4ucHJldiwgaXRlbV07XG5cbiAgICAgICAgICAgIGNvbnN0IGJlZm9yZUxhc3RQb2ludCA9IHByZXZbcHJldi5sZW5ndGggLSAyXTtcbiAgICAgICAgICAgIGNvbnN0IGxhc3RQb2ludCA9IHByZXZbcHJldi5sZW5ndGggLSAxXTtcbiAgICAgICAgICAgIGNvbnN0IHZBQyA9IG5ldyBWZWN0b3IyRChiZWZvcmVMYXN0UG9pbnQsIGl0ZW0pO1xuICAgICAgICAgICAgY29uc3QgdkFCID0gbmV3IFZlY3RvcjJEKGJlZm9yZUxhc3RQb2ludCwgbGFzdFBvaW50KTtcbiAgICAgICAgICAgIGNvbnN0IHZCQyA9IG5ldyBWZWN0b3IyRChsYXN0UG9pbnQsIGl0ZW0pO1xuXG4gICAgICAgICAgICBpZiAodkFDLm5vcm0gPCBtaW5Ob3JtKSBwcmV2LnBvcCgpO1xuXG4gICAgICAgICAgICBjb25zdCBkZWdBbmdsZSA9IHZBQi5hbmdsZSh2QkMpICogMTgwIC8gTWF0aC5QSTtcblxuICAgICAgICAgICAgaWYgKGRlZ0FuZ2xlIDwgbWluQW5nbGUpIHByZXYucG9wKCk7XG5cbiAgICAgICAgICAgIHByZXYucHVzaChpdGVtKTtcblxuICAgICAgICAgICAgcmV0dXJuIHByZXY7XG4gICAgICAgIH0sIFtdKTtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBnZXQgYW5nbGVzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcG9pbnRzLm1hcCgoY3VycmVudFBvaW50LCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgaWYgKGluZGV4ICsgMSA8PSAxIHx8IGluZGV4ICsgMSA+PSB0aGlzLl9wb2ludHMubGVuZ3RoKSByZXR1cm4gSW5maW5pdHk7XG5cbiAgICAgICAgICAgIGNvbnN0IGxhc3RQb2ludCA9IHRoaXMuX3BvaW50c1tpbmRleCAtIDFdO1xuICAgICAgICAgICAgY29uc3QgbmV4dFBvaW50ID0gdGhpcy5fcG9pbnRzW2luZGV4ICsgMV07XG5cbiAgICAgICAgICAgIGNvbnN0IHZCQSA9IG5ldyBWZWN0b3IyRChjdXJyZW50UG9pbnQsIGxhc3RQb2ludCk7XG4gICAgICAgICAgICBjb25zdCB2QkMgPSBuZXcgVmVjdG9yMkQoY3VycmVudFBvaW50LCBuZXh0UG9pbnQpO1xuXG4gICAgICAgICAgICByZXR1cm4gdkJBLmFuZ2xlKHZCQyk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGdldCBhcmVhcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3BvaW50cy5tYXAoKGN1cnJlbnRQb2ludCwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIGlmIChpbmRleCArIDEgPD0gMSB8fCBpbmRleCArIDEgPj0gdGhpcy5fcG9pbnRzLmxlbmd0aCkgcmV0dXJuIEluZmluaXR5O1xuXG4gICAgICAgICAgICBjb25zdCBsYXN0UG9pbnQgPSB0aGlzLl9wb2ludHNbaW5kZXggLSAxXTtcbiAgICAgICAgICAgIGNvbnN0IG5leHRQb2ludCA9IHRoaXMuX3BvaW50c1tpbmRleCArIDFdO1xuXG4gICAgICAgICAgICBjb25zdCB2QkEgPSBuZXcgVmVjdG9yMkQoY3VycmVudFBvaW50LCBsYXN0UG9pbnQpO1xuICAgICAgICAgICAgY29uc3QgdkJDID0gbmV3IFZlY3RvcjJEKGN1cnJlbnRQb2ludCwgbmV4dFBvaW50KTtcbiAgICAgICAgICAgIGNvbnN0IHZBQyA9IG5ldyBWZWN0b3IyRChsYXN0UG9pbnQsIG5leHRQb2ludCk7XG5cbiAgICAgICAgICAgIGNvbnN0IHMgPSAodkFDLm5vcm0gKyB2QkEubm9ybSArIHZCQy5ub3JtKSAvIDI7XG5cbiAgICAgICAgICAgIHJldHVybiBNYXRoLnNxcnQocyAqIChzIC0gdkFDLm5vcm0pICogKHMgLSB2QkEubm9ybSkgKiAocyAtIHZCQy5ub3JtKSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGNvbnRyb2xQb2ludHModmFsdWVzOiBudW1iZXJbXSwgbnVtYmVyT2ZDb250cm9sUG9pbnRzOiBudW1iZXIpIHtcbiAgICAgICAgbnVtYmVyT2ZDb250cm9sUG9pbnRzID0gTWF0aC5tYXgobnVtYmVyT2ZDb250cm9sUG9pbnRzLCAyKTtcblxuICAgICAgICBjb25zdCB2YWx1ZXNXaXRoSW5kZXhlcyA9IHRoaXMuYXJlYXMubWFwKCh2YWx1ZSwgaW5kZXgpID0+IFt2YWx1ZSwgaW5kZXhdKTtcblxuICAgICAgICB2YWx1ZXNXaXRoSW5kZXhlcy5zb3J0KChhLCBiKSA9PiB7XG4gICAgICAgICAgICBpZiAoTnVtYmVyLmlzTmFOKGJbMF0pKSByZXR1cm4gLTE7XG5cbiAgICAgICAgICAgIGlmIChhWzBdIDwgYlswXSkgcmV0dXJuIDE7XG4gICAgICAgICAgICBlbHNlIGlmIChhWzBdID4gYlswXSkgcmV0dXJuIC0xO1xuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiB2YWx1ZXNXaXRoSW5kZXhlc1xuICAgICAgICAgICAgLnNsaWNlKDAsIG51bWJlck9mQ29udHJvbFBvaW50cylcbiAgICAgICAgICAgIC5zb3J0KChhLCBiKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGFbMV0gPCBiWzFdKSByZXR1cm4gMTtcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChhWzFdID4gYlsxXSkgcmV0dXJuIC0xO1xuICAgICAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5tYXAoKHgpID0+IHRoaXMuX3BvaW50c1t4WzFdXSk7XG4gICAgfVxuXG4gICAgdHJhbnNsYXRlKHg6IG51bWJlciwgeTogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuX3BvaW50cyA9IHRoaXMuX3BvaW50cy5tYXAoKHBvaW50KSA9PiB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHg6IHBvaW50LnggKyB4LFxuICAgICAgICAgICAgICAgIHk6IHBvaW50LnkgKyB5XG4gICAgICAgICAgICB9O1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBjb3B5KCkge1xuICAgICAgICByZXR1cm4gbmV3IFNwbGluZSh0aGlzLl9wb2ludHMpO1xuICAgIH1cblxuICAgIGNhdG11bGxSb21JbnRlcnBvbGF0aW9uKFxuICAgICAgICBuYkludGVycG9sYXRpb25Qb2ludHNGbjogKHBBOiBQb2ludDJELCBwQjogUG9pbnQyRCwgcEM6IFBvaW50MkQsIHBEOiBQb2ludDJEKSA9PiBudW1iZXJcbiAgICApIHtcbiAgICAgICAgY29uc3QgbGFzdFBvaW50ID0gdGhpcy5fcG9pbnRzW3RoaXMuX3BvaW50cy5sZW5ndGggLSAxXTtcbiAgICAgICAgdGhpcy5fcG9pbnRzID0gdGhpcy5fcG9pbnRzLnJlZHVjZTxQb2ludDJEW10+KChwcmV2LCBwQywgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIGlmIChpbmRleCArIDEgPD0gMiB8fCBpbmRleCArIDEgPj0gdGhpcy5fcG9pbnRzLmxlbmd0aCkgcmV0dXJuIHByZXY7XG5cbiAgICAgICAgICAgIGNvbnN0IGFkZCA9IChweTogUG9pbnQyRCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICghcHJldi5maW5kKChweCkgPT4gcHgueCA9PT0gcHkueCAmJiBweC55ID09PSBweS55KSkge1xuICAgICAgICAgICAgICAgICAgICBwcmV2LnB1c2gocHkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGNvbnN0IHBBID0gdGhpcy5fcG9pbnRzW2luZGV4IC0gMl07XG4gICAgICAgICAgICBjb25zdCBwQiA9IHRoaXMuX3BvaW50c1tpbmRleCAtIDFdO1xuICAgICAgICAgICAgY29uc3QgcEQgPSB0aGlzLl9wb2ludHNbaW5kZXggKyAxXTtcblxuICAgICAgICAgICAgYWRkKHBBKTtcbiAgICAgICAgICAgIGFkZChwQik7XG5cbiAgICAgICAgICAgIGNvbnN0IG5iSW50ZXJwb2xhdGlvblBvaW50cyA9IG5iSW50ZXJwb2xhdGlvblBvaW50c0ZuKHBBLCBwQiwgcEMsIHBEKSArIDI7XG5cbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAyOyBpIDwgbmJJbnRlcnBvbGF0aW9uUG9pbnRzOyBpKyspIHtcbiAgICAgICAgICAgICAgICBjb25zdCB0ID0gaSAvIG5iSW50ZXJwb2xhdGlvblBvaW50cztcblxuICAgICAgICAgICAgICAgIGNvbnN0IHBvaW50ID0ge1xuICAgICAgICAgICAgICAgICAgICB4OiBTcGxpbmUuY2F0bXVsbFJvbSh0LCBwQS54LCBwQi54LCBwQy54LCBwRC54KSxcbiAgICAgICAgICAgICAgICAgICAgeTogU3BsaW5lLmNhdG11bGxSb20odCwgcEEueSwgcEIueSwgcEMueSwgcEQueSlcbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgcHJldiA9IFtcbiAgICAgICAgICAgICAgICAgICAgLi4ucHJldixcbiAgICAgICAgICAgICAgICAgICAgcG9pbnQsXG4gICAgICAgICAgICAgICAgXTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgYWRkKHBDKTtcblxuICAgICAgICAgICAgcmV0dXJuIHByZXY7XG4gICAgICAgIH0sIFtdKTtcblxuICAgICAgICB0aGlzLl9wb2ludHMgPSBbXG4gICAgICAgICAgICAuLi50aGlzLl9wb2ludHMsXG4gICAgICAgICAgICBsYXN0UG9pbnRcbiAgICAgICAgXTtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBzdGF0aWMgY2F0bXVsbFJvbSh0OiBudW1iZXIsIG1BOiBudW1iZXIsIG1COiBudW1iZXIsIG1DOiBudW1iZXIsIG1EOiBudW1iZXIpIHtcbiAgICAgICAgY29uc3QgYSA9IDMgKiBtQiAtIG1BIC0gMyAqIG1DICsgbUQ7XG4gICAgICAgIGNvbnN0IGIgPSAyICogbUEgLSA1ICogbUIgKyA0ICogbUMgLSBtRDtcbiAgICAgICAgY29uc3QgYyA9IChtQyAtIG1BKSAqIHQ7XG4gICAgICAgIGNvbnN0IGQgPSAyICogbUI7XG4gICAgICAgIGNvbnN0IGZpbmFsID0gYSAqIHQgKiogMyArIGIgKiB0ICoqIDIgKyBjICsgZDtcbiAgICAgICAgcmV0dXJuIDAuNSAqIGZpbmFsO1xuICAgIH1cbn1cbiIsImltcG9ydCB7U3BsaW5lfSBmcm9tIFwiLi9TcGxpbmVcIjtcbmltcG9ydCB7UG9pbnQyRH0gZnJvbSBcIi4vUG9pbnQyRFwiO1xuXG5leHBvcnQgY2xhc3MgQ2FudmFzTWFuYWdlciB7XG4gICAgcHJpdmF0ZSBfY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudDtcbiAgICBwcml2YXRlIF9jb250ZXh0OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQ7XG4gICAgcHJpdmF0ZSBfaXNEcmF3aW5nOiBib29sZWFuO1xuICAgIHByaXZhdGUgX3BpeGVsUmF0aW86IG51bWJlcjtcblxuICAgIGdldCBjYW52YXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jYW52YXM7XG4gICAgfVxuXG4gICAgZ2V0IHBpeGVsUmF0aW8oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9waXhlbFJhdGlvO1xuICAgIH1cblxuICAgIGdldCBjb250ZXh0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY29udGV4dDtcbiAgICB9XG5cbiAgICBnZXQgaXNEcmF3aW5nKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5faXNEcmF3aW5nO1xuICAgIH1cblxuICAgIHNldCBpc0RyYXdpbmcoaXNEcmF3aW5nOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuX2lzRHJhd2luZyA9IGlzRHJhd2luZztcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3RvcihjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50LCBzY2FsZUZhY3Rvcj86IG51bWJlcikge1xuICAgICAgICB0aGlzLl9pc0RyYXdpbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fY2FudmFzID0gY2FudmFzO1xuICAgICAgICB0aGlzLl9waXhlbFJhdGlvID0gc2NhbGVGYWN0b3IgfHwgd2luZG93LmRldmljZVBpeGVsUmF0aW8gfHwgMTtcblxuICAgICAgICBjb25zdCByZWN0ID0gdGhpcy5fY2FudmFzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICBjb25zdCBjb250ZXh0ID0gdGhpcy5fY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcblxuICAgICAgICB0aGlzLl9jYW52YXMuc3R5bGUud2lkdGggPSB0aGlzLl9jYW52YXMud2lkdGggKyAncHgnO1xuICAgICAgICB0aGlzLl9jYW52YXMuc3R5bGUuaGVpZ2h0ID0gdGhpcy5fY2FudmFzLmhlaWdodCArICdweCc7XG5cbiAgICAgICAgdGhpcy5fY2FudmFzLndpZHRoID0gcmVjdC53aWR0aCAqIHRoaXMuX3BpeGVsUmF0aW87XG4gICAgICAgIHRoaXMuX2NhbnZhcy5oZWlnaHQgPSByZWN0LmhlaWdodCAqIHRoaXMuX3BpeGVsUmF0aW87XG5cbiAgICAgICAgY29udGV4dC5zY2FsZSh0aGlzLl9waXhlbFJhdGlvLCB0aGlzLl9waXhlbFJhdGlvKTtcblxuICAgICAgICB0aGlzLl9jb250ZXh0ID0gY29udGV4dDtcbiAgICB9XG5cbiAgICBjbGVhcigpIHtcbiAgICAgICAgdGhpcy5jb250ZXh0LmNsZWFyUmVjdCgwLCAwLCB0aGlzLl9jb250ZXh0LmNhbnZhcy53aWR0aCwgdGhpcy5fY29udGV4dC5jYW52YXMuaGVpZ2h0KTtcbiAgICB9XG5cbiAgICBnZXRQb2ludChlOiBNb3VzZUV2ZW50KTogUG9pbnQyRCB7XG4gICAgICAgIGNvbnN0IHJlY3QgPSB0aGlzLl9jYW52YXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHg6IGUuY2xpZW50WCAtIHJlY3QubGVmdCxcbiAgICAgICAgICAgIHk6IGUuY2xpZW50WSAtIHJlY3QudG9wXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZHJhd1BvaW50KFxuICAgICAgICBwb2ludDogUG9pbnQyRCxcbiAgICAgICAgcmFkaXVzID0gNSxcbiAgICAgICAgZmlsbENvbG9yID0gXCJibGFja1wiLFxuICAgICAgICBzdHJva2VDb2xvciA9IFwiYmxhY2tcIixcbiAgICAgICAgbGluZVdpZHRoID0gMFxuICAgICkge1xuICAgICAgICBpZiAoIXBvaW50KSByZXR1cm47XG4gICAgICAgIHRoaXMuX2NvbnRleHQuYmVnaW5QYXRoKCk7XG4gICAgICAgIHRoaXMuX2NvbnRleHQubGluZVdpZHRoID0gbGluZVdpZHRoO1xuICAgICAgICB0aGlzLl9jb250ZXh0LmxpbmVDYXAgPSBcInJvdW5kXCI7XG4gICAgICAgIHRoaXMuX2NvbnRleHQuZmlsbFN0eWxlID0gZmlsbENvbG9yO1xuICAgICAgICB0aGlzLl9jb250ZXh0LnN0cm9rZVN0eWxlID0gc3Ryb2tlQ29sb3I7XG4gICAgICAgIHRoaXMuX2NvbnRleHQuYXJjKHBvaW50LngsIHBvaW50LnksIHJhZGl1cywgMCwgMiAqIE1hdGguUEkpO1xuICAgICAgICB0aGlzLl9jb250ZXh0LmZpbGwoKTtcbiAgICAgICAgdGhpcy5fY29udGV4dC5zdHJva2UoKTtcbiAgICAgICAgdGhpcy5fY29udGV4dC5jbG9zZVBhdGgoKTtcbiAgICB9XG5cbiAgICBkcmF3UG9pbnRzKFxuICAgICAgICBwb2ludHM6IFBvaW50MkRbXSB8IHJlYWRvbmx5IFBvaW50MkRbXSxcbiAgICAgICAgcmFkaXVzID0gNSxcbiAgICAgICAgZmlsbENvbG9yID0gXCJibGFja1wiLFxuICAgICAgICBzdHJva2VDb2xvciA9IFwiYmxhY2tcIixcbiAgICAgICAgbGluZVdpZHRoID0gMFxuICAgICkge1xuICAgICAgICBwb2ludHMuZm9yRWFjaCgocG9pbnQpID0+IHRoaXMuZHJhd1BvaW50KHBvaW50LCByYWRpdXMsIGZpbGxDb2xvciwgc3Ryb2tlQ29sb3IsIGxpbmVXaWR0aCkpO1xuICAgIH1cblxuICAgIGRyYXdMaW5lKFxuICAgICAgICBwb2ludHM6IFBvaW50MkRbXSB8IHJlYWRvbmx5IFBvaW50MkRbXSxcbiAgICAgICAgc3Ryb2tlQ29sb3IgPSBcImJsYWNrXCIsXG4gICAgICAgIGxpbmVXaWR0aCA9IDFcbiAgICApIHtcbiAgICAgICAgcG9pbnRzLmZvckVhY2goKHBvaW50LCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgaWYgKGluZGV4ID49IHBvaW50cy5sZW5ndGggLSAxKSByZXR1cm47XG5cbiAgICAgICAgICAgIHRoaXMuX2NvbnRleHQuYmVnaW5QYXRoKCk7XG4gICAgICAgICAgICB0aGlzLl9jb250ZXh0LmxpbmVXaWR0aCA9IGxpbmVXaWR0aDtcbiAgICAgICAgICAgIHRoaXMuX2NvbnRleHQubGluZUNhcCA9IFwicm91bmRcIjtcbiAgICAgICAgICAgIHRoaXMuX2NvbnRleHQuc3Ryb2tlU3R5bGUgPSBzdHJva2VDb2xvcjtcbiAgICAgICAgICAgIHRoaXMuX2NvbnRleHQubW92ZVRvKHBvaW50LngsIHBvaW50LnkpO1xuICAgICAgICAgICAgdGhpcy5fY29udGV4dC5saW5lVG8ocG9pbnRzW2luZGV4ICsgMV0ueCwgcG9pbnRzW2luZGV4ICsgMV0ueSk7XG4gICAgICAgICAgICB0aGlzLl9jb250ZXh0LnN0cm9rZSgpO1xuICAgICAgICAgICAgdGhpcy5fY29udGV4dC5jbG9zZVBhdGgoKTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHtTcGxpbmV9IGZyb20gXCIuL2NsYXNzZXMvU3BsaW5lXCI7XG5pbXBvcnQge0NhbnZhc01hbmFnZXJ9IGZyb20gXCIuL2NsYXNzZXMvQ2FudmFzTWFuYWdlclwiO1xuaW1wb3J0IHtWZWN0b3IyRH0gZnJvbSBcIi4vY2xhc3Nlcy9WZWN0b3IyRFwiO1xuaW1wb3J0IHtQb2ludDJEfSBmcm9tIFwiLi9jbGFzc2VzL1BvaW50MkRcIjtcblxuY29uc3QgbmJDb250cm9sUG9pbnRzRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicy1uYi1jb250cm9sLXBvaW50c1wiKSBhcyBIVE1MSW5wdXRFbGVtZW50O1xuY29uc3QgbWluQW5nbGVFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzLWFuZ2xlXCIpIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XG5jb25zdCBtaW5Ob3JtRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicy1ub3JtXCIpIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XG5jb25zdCBuYkludGVycG9sYXRpb25Qb2ludHNFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzLWludGVycG9sYXRpb24tcG9pbnRzXCIpIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XG5cbmNvbnN0IGRyYXdpbmdDYW52YXNFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzLWRyYXdpbmdcIikgYXMgSFRNTENhbnZhc0VsZW1lbnQ7XG5jb25zdCBzaW1wbGlmaWVkQ2FudmFzRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicy1zaW1wbGlmaWVkXCIpIGFzIEhUTUxDYW52YXNFbGVtZW50O1xuY29uc3QgY29udHJvbFBvaW50c0NhbnZhc0VsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInMtY29udHJvbC1wb2ludHNcIikgYXMgSFRNTENhbnZhc0VsZW1lbnQ7XG5jb25zdCBzaW1wbGlmaWVkSW50ZXJwb2xhdGlvbkVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInMtc2ltcGxpZmllZC1pbnRlcnBvbGF0aW9uXCIpIGFzIEhUTUxDYW52YXNFbGVtZW50O1xuY29uc3QgY29udHJvbFBvaW50c0ludGVycG9sYXRpb25FbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzLWNvbnRyb2wtcG9pbnRzLWludGVycG9sYXRpb25cIikgYXMgSFRNTENhbnZhc0VsZW1lbnQ7XG5jb25zdCBzaW1wbGlmaWVkSW50ZXJwb2xhdGlvbkRvbmVFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzLXNpbXBsaWZpZWQtaW50ZXJwb2xhdGlvbi1kb25lXCIpIGFzIEhUTUxDYW52YXNFbGVtZW50O1xuY29uc3QgY29udHJvbFBvaW50c0ludGVycG9sYXRpb25Eb25lRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicy1jb250cm9sLXBvaW50cy1pbnRlcnBvbGF0aW9uLWRvbmVcIikgYXMgSFRNTENhbnZhc0VsZW1lbnQ7XG5cbmNvbnN0IGRyYXdpbmdDYW52YXNNYW5hZ2VyID0gbmV3IENhbnZhc01hbmFnZXIoZHJhd2luZ0NhbnZhc0VsZW1lbnQpO1xuY29uc3Qgc2ltcGxpZmllZE1hbmFnZXIgPSBuZXcgQ2FudmFzTWFuYWdlcihzaW1wbGlmaWVkQ2FudmFzRWxlbWVudCk7XG5jb25zdCBjb250cm9sUG9pbnRzTWFuYWdlciA9IG5ldyBDYW52YXNNYW5hZ2VyKGNvbnRyb2xQb2ludHNDYW52YXNFbGVtZW50KTtcbmNvbnN0IHNpbXBsaWZpZWRJbnRlcnBvbGF0aW9uTWFuYWdlciA9IG5ldyBDYW52YXNNYW5hZ2VyKHNpbXBsaWZpZWRJbnRlcnBvbGF0aW9uRWxlbWVudCk7XG5jb25zdCBjb250cm9sUG9pbnRzSW50ZXJwb2xhdGlvbk1hbmFnZXIgPSBuZXcgQ2FudmFzTWFuYWdlcihjb250cm9sUG9pbnRzSW50ZXJwb2xhdGlvbkVsZW1lbnQpO1xuY29uc3Qgc2ltcGxpZmllZEludGVycG9sYXRpb25Eb25lTWFuYWdlciA9IG5ldyBDYW52YXNNYW5hZ2VyKHNpbXBsaWZpZWRJbnRlcnBvbGF0aW9uRG9uZUVsZW1lbnQpO1xuY29uc3QgY29udHJvbFBvaW50c0ludGVycG9sYXRpb25Eb25lTWFuYWdlciA9IG5ldyBDYW52YXNNYW5hZ2VyKGNvbnRyb2xQb2ludHNJbnRlcnBvbGF0aW9uRG9uZUVsZW1lbnQpO1xuXG5jb25zdCBzcGxpbmUgPSBuZXcgU3BsaW5lKCk7XG5sZXQgbmJDb250cm9sUG9pbnRzID0gNDtcbmxldCBtaW5BbmdsZSA9IDE7XG5sZXQgbWluTm9ybSA9IDIwO1xubGV0IG5iSW50ZXJwb2xhdGlvblBvaW50cyA9IDM7XG5jb25zdCBpbnRlcnBvbGF0aW9uRm4gPSAocEE6IFBvaW50MkQsIHBCOiBQb2ludDJELCBwQzogUG9pbnQyRCkgPT4ge1xuICAgIGlmIChuYkludGVycG9sYXRpb25Qb2ludHMgPj0gMCkgcmV0dXJuIG5iSW50ZXJwb2xhdGlvblBvaW50cztcblxuICAgIGNvbnN0IHZCQyA9IG5ldyBWZWN0b3IyRChwQiwgcEMpO1xuICAgIGNvbnN0IHZCQSA9IG5ldyBWZWN0b3IyRChwQiwgcEEpO1xuICAgIGNvbnN0IGFuZ2xlID0gdkJBLmFuZ2xlKHZCQyk7XG5cbiAgICAvLyBub3JtIGdyZWF0ZXIgLT4gbW9yZSBwb2ludHNcbiAgICAvLyBhbmdsZSBncmVhdGVyIC0+IG1vcmUgcG9pbnRzXG4gICAgY29uc3Qgbm9ybUZhY3RvciA9IDAuMDIgKiB2QkMubm9ybTtcbiAgICBjb25zdCBhbmdsZUZhY3RvciA9IDEwICogKGFuZ2xlIC8gTWF0aC5QSSk7XG4gICAgcmV0dXJuIE1hdGguY2VpbChub3JtRmFjdG9yICogYW5nbGVGYWN0b3IpO1xufTtcblxuZnVuY3Rpb24gY2xlYXJBbGwoKSB7XG4gICAgZHJhd2luZ0NhbnZhc01hbmFnZXIuY2xlYXIoKTtcbiAgICBzaW1wbGlmaWVkTWFuYWdlci5jbGVhcigpO1xuICAgIGNvbnRyb2xQb2ludHNNYW5hZ2VyLmNsZWFyKCk7XG4gICAgc2ltcGxpZmllZEludGVycG9sYXRpb25NYW5hZ2VyLmNsZWFyKCk7XG4gICAgY29udHJvbFBvaW50c0ludGVycG9sYXRpb25NYW5hZ2VyLmNsZWFyKCk7XG4gICAgc2ltcGxpZmllZEludGVycG9sYXRpb25Eb25lTWFuYWdlci5jbGVhcigpO1xuICAgIGNvbnRyb2xQb2ludHNJbnRlcnBvbGF0aW9uRG9uZU1hbmFnZXIuY2xlYXIoKTtcbn1cblxuZnVuY3Rpb24gdXBkYXRlKCkge1xuICAgIGNsZWFyQWxsKCk7XG5cbiAgICBkcmF3aW5nQ2FudmFzTWFuYWdlci5kcmF3TGluZShzcGxpbmUucG9pbnRzLCBcImJsYWNrXCIsIDMpO1xuXG4gICAgY29uc3Qgc2ltcGxpZmllZFNwbGluZSA9IHNwbGluZS5jb3B5KCkuc2ltcGxpZnkobWluTm9ybSwgbWluQW5nbGUpO1xuICAgIGNvbnN0IGNvbnRyb2xQb2ludHMgPSBzaW1wbGlmaWVkU3BsaW5lLmNvbnRyb2xQb2ludHMoc3BsaW5lLmFyZWFzLCBuYkNvbnRyb2xQb2ludHMpO1xuICAgIHNpbXBsaWZpZWRNYW5hZ2VyLmRyYXdMaW5lKHNpbXBsaWZpZWRTcGxpbmUucG9pbnRzLCBcImJsdWVcIiwgMyk7XG4gICAgc2ltcGxpZmllZE1hbmFnZXIuZHJhd1BvaW50cyhzaW1wbGlmaWVkU3BsaW5lLnBvaW50cywgMywgXCJncmVlblwiLCBcImdyZWVuXCIpO1xuICAgIHNpbXBsaWZpZWRNYW5hZ2VyLmRyYXdQb2ludHMoY29udHJvbFBvaW50cywgNSwgXCJncmVlblwiLCBcImJsYWNrXCIsIDIpO1xuXG4gICAgY29uc3QgY29udHJvbFBvaW50c1NwbGluZSA9IG5ldyBTcGxpbmUoY29udHJvbFBvaW50cyk7XG4gICAgY29udHJvbFBvaW50c01hbmFnZXIuZHJhd0xpbmUoY29udHJvbFBvaW50c1NwbGluZS5wb2ludHMsIFwicmVkXCIsIDMpO1xuICAgIGNvbnRyb2xQb2ludHNNYW5hZ2VyLmRyYXdQb2ludHMoY29udHJvbFBvaW50c1NwbGluZS5wb2ludHMsIDUsIFwiZ3JlZW5cIiwgXCJibGFja1wiLCAyKTtcblxuICAgIGNvbnN0IGludGVycG9sYXRlZFNpbXBsaWZpZWRTcGxpbmUgPSBzaW1wbGlmaWVkU3BsaW5lLmNvcHkoKS5jYXRtdWxsUm9tSW50ZXJwb2xhdGlvbihpbnRlcnBvbGF0aW9uRm4pO1xuICAgIHNpbXBsaWZpZWRJbnRlcnBvbGF0aW9uTWFuYWdlci5kcmF3TGluZShpbnRlcnBvbGF0ZWRTaW1wbGlmaWVkU3BsaW5lLnBvaW50cywgXCJibGFja1wiLCAzKTtcbiAgICBzaW1wbGlmaWVkSW50ZXJwb2xhdGlvbk1hbmFnZXIuZHJhd1BvaW50cyhpbnRlcnBvbGF0ZWRTaW1wbGlmaWVkU3BsaW5lLnBvaW50cywgMiwgXCJyZWRcIiwgXCJyZWRcIik7XG4gICAgc2ltcGxpZmllZEludGVycG9sYXRpb25NYW5hZ2VyLmRyYXdQb2ludHMoc2ltcGxpZmllZFNwbGluZS5wb2ludHMsIDMsIFwiZ3JlZW5cIiwgXCJncmVlblwiKTtcbiAgICBzaW1wbGlmaWVkSW50ZXJwb2xhdGlvbk1hbmFnZXIuZHJhd1BvaW50cyhjb250cm9sUG9pbnRzLCA1LCBcImdyZWVuXCIsIFwiYmxhY2tcIiwgMik7XG5cbiAgICBjb25zdCBpbnRlcnBvbGF0ZWRDb250cm9sUG9pbnRzU3BsaW5lID0gY29udHJvbFBvaW50c1NwbGluZS5jb3B5KCkuY2F0bXVsbFJvbUludGVycG9sYXRpb24oaW50ZXJwb2xhdGlvbkZuKTtcbiAgICBjb250cm9sUG9pbnRzSW50ZXJwb2xhdGlvbk1hbmFnZXIuZHJhd0xpbmUoaW50ZXJwb2xhdGVkQ29udHJvbFBvaW50c1NwbGluZS5wb2ludHMsIFwiYmxhY2tcIiwgMyk7XG4gICAgY29udHJvbFBvaW50c0ludGVycG9sYXRpb25NYW5hZ2VyLmRyYXdQb2ludHMoaW50ZXJwb2xhdGVkQ29udHJvbFBvaW50c1NwbGluZS5wb2ludHMsIDIsIFwicmVkXCIsIFwicmVkXCIpO1xuICAgIGNvbnRyb2xQb2ludHNJbnRlcnBvbGF0aW9uTWFuYWdlci5kcmF3UG9pbnRzKGNvbnRyb2xQb2ludHMsIDUsIFwiZ3JlZW5cIiwgXCJibGFja1wiLCAyKTtcblxuICAgIGNvbnRyb2xQb2ludHNJbnRlcnBvbGF0aW9uRG9uZU1hbmFnZXIuZHJhd0xpbmUoaW50ZXJwb2xhdGVkQ29udHJvbFBvaW50c1NwbGluZS5wb2ludHMsIFwiYmxhY2tcIiwgMyk7XG4gICAgc2ltcGxpZmllZEludGVycG9sYXRpb25Eb25lTWFuYWdlci5kcmF3TGluZShpbnRlcnBvbGF0ZWRTaW1wbGlmaWVkU3BsaW5lLnBvaW50cywgXCJibGFja1wiLCAzKTtcbn1cblxuZnVuY3Rpb24gbW91c2VNb3ZlKGU6IE1vdXNlRXZlbnQpIHtcbiAgICBpZiAoIWRyYXdpbmdDYW52YXNNYW5hZ2VyLmlzRHJhd2luZykgcmV0dXJuO1xuXG4gICAgc3BsaW5lLmFkZFBvaW50KGRyYXdpbmdDYW52YXNNYW5hZ2VyLmdldFBvaW50KGUpKTtcbiAgICB1cGRhdGUoKTtcbn1cblxuZnVuY3Rpb24gbW91c2VEb3duKGU6IE1vdXNlRXZlbnQpIHtcbiAgICBkcmF3aW5nQ2FudmFzTWFuYWdlci5pc0RyYXdpbmcgPSB0cnVlO1xuICAgIHNwbGluZS5jbGVhcigpO1xuXG4gICAgbW91c2VNb3ZlKGUpO1xufVxuXG5mdW5jdGlvbiBtb3VzZVVwKGU6IE1vdXNlRXZlbnQpIHtcbiAgICBkcmF3aW5nQ2FudmFzTWFuYWdlci5pc0RyYXdpbmcgPSBmYWxzZTtcbn1cblxuZHJhd2luZ0NhbnZhc0VsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbW92ZVwiLCBtb3VzZU1vdmUpO1xuZHJhd2luZ0NhbnZhc0VsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCBtb3VzZURvd24pO1xuZHJhd2luZ0NhbnZhc0VsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNldXBcIiwgbW91c2VVcCk7XG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwibW91c2V1cFwiLCBtb3VzZVVwKTtcblxuZnVuY3Rpb24gb25DaGFuZ2UoKSB7XG4gICAgbmJDb250cm9sUG9pbnRzID0gTnVtYmVyKG5iQ29udHJvbFBvaW50c0VsZW1lbnQudmFsdWUpO1xuICAgIG1pbkFuZ2xlID0gTnVtYmVyKG1pbkFuZ2xlRWxlbWVudC52YWx1ZSk7XG4gICAgbWluTm9ybSA9IE51bWJlcihtaW5Ob3JtRWxlbWVudC52YWx1ZSk7XG4gICAgbmJJbnRlcnBvbGF0aW9uUG9pbnRzID0gTnVtYmVyKG5iSW50ZXJwb2xhdGlvblBvaW50c0VsZW1lbnQudmFsdWUpO1xuXG4gICAgdXBkYXRlKCk7XG59XG5cbm5iQ29udHJvbFBvaW50c0VsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCBvbkNoYW5nZSk7XG5taW5BbmdsZUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCBvbkNoYW5nZSk7XG5taW5Ob3JtRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsIG9uQ2hhbmdlKTtcbm5iSW50ZXJwb2xhdGlvblBvaW50c0VsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCBvbkNoYW5nZSk7XG5cbm5iQ29udHJvbFBvaW50c0VsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImtleXVwXCIsIG9uQ2hhbmdlKTtcbm1pbkFuZ2xlRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwia2V5dXBcIiwgb25DaGFuZ2UpO1xubWluTm9ybUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImtleXVwXCIsIG9uQ2hhbmdlKTtcbm5iSW50ZXJwb2xhdGlvblBvaW50c0VsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImtleXVwXCIsIG9uQ2hhbmdlKTtcblxub25DaGFuZ2UoKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==
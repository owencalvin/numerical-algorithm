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
    Spline.prototype.catmullRomInterpolation = function (tFn, nbInterpolationPointsFn) {
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
            var nbInterpolationPoints = nbInterpolationPointsFn(pA, pB, pC, pD);
            for (var i = nbInterpolationPoints; i >= 0; i--) {
                var t = tFn(pA, pB, pC, pD, i, nbInterpolationPoints);
                var point = {
                    x: Spline.catmullRom(t, pA.x, pB.x, pC.x, pD.x),
                    y: Spline.catmullRom(t, pA.y, pB.y, pC.y, pD.y)
                };
                prev.push(point);
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



var nbControlPointsElement = document.getElementById("s-control-points");
var minAngleElement = document.getElementById("s-angle");
var minNormElement = document.getElementById("s-norm");
var tElement = document.getElementById("s-t");
var drawingCanvasElement = document.getElementById("s-spline-canvas");
var previewCanvasElement = document.getElementById("s-spline-canvas-preview");
var reconstructionCanvasElement = document.getElementById("s-spline-canvas-reconstruction");
var reconstructionDoneCanvasElement = document.getElementById("s-spline-canvas-reconstruction-done");
var drawingCanvasManager = new CanvasManager(drawingCanvasElement);
var previewCanvasManager = new CanvasManager(previewCanvasElement);
var reconstructionCanvasManager = new CanvasManager(reconstructionCanvasElement);
var reconstructionDoneCanvasManager = new CanvasManager(reconstructionDoneCanvasElement);
var nbControlPoints = 4;
var minAngle = 1;
var minNorm = 20;
var t = 0.5;
var spline = new Spline();
function draw() {
    drawingCanvasManager.clear();
    previewCanvasManager.clear();
    reconstructionCanvasManager.clear();
    reconstructionDoneCanvasManager.clear();
    drawingCanvasManager.drawLine(spline.points, "black", 3);
    var simplifiedSpline = spline.copy().simplify(minNorm, minAngle);
    var controlPoints = simplifiedSpline.controlPoints(spline.areas, nbControlPoints);
    var splineFromControlPoints = new Spline(controlPoints);
    previewCanvasManager.drawLine(simplifiedSpline.points, "blue", 3);
    previewCanvasManager.drawLine(splineFromControlPoints.points, "red", 3);
    previewCanvasManager.drawPoints(simplifiedSpline.points, 3, "green", "green");
    previewCanvasManager.drawPoints(controlPoints, 5, "green", "black", 2);
    var reconstructedSpline = splineFromControlPoints.copy().catmullRomInterpolation(function () { return t; }, function (pA, pB, pC) {
        var vBC = new Vector2D(pB, pC);
        var vBA = new Vector2D(pB, pA);
        var angle = vBA.angle(vBC);
        // norm greater -> more points
        // angle greater -> more points
        var normFactor = 0.5 * vBC.norm;
        var angleFactor = 10 * (angle / Math.PI);
        return Math.ceil(normFactor * angleFactor);
    });
    reconstructionCanvasManager.drawLine(reconstructedSpline.points, "black", 3);
    reconstructionCanvasManager.drawPoints(reconstructedSpline.points, 3, "red", "red");
    reconstructionCanvasManager.drawPoints(controlPoints, 5, "green", "black", 2);
    reconstructionDoneCanvasManager.drawLine(reconstructedSpline.points, "black", 3);
}
function mouseMove(e) {
    if (!drawingCanvasManager.isDrawing)
        return;
    spline.addPoint(drawingCanvasManager.getPoint(e));
    draw();
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
    t = Number(tElement.value);
    draw();
}
nbControlPointsElement.addEventListener("change", onChange);
minAngleElement.addEventListener("change", onChange);
minNormElement.addEventListener("change", onChange);
tElement.addEventListener("change", onChange);
nbControlPointsElement.addEventListener("keyup", onChange);
minAngleElement.addEventListener("keyup", onChange);
minNormElement.addEventListener("keyup", onChange);
tElement.addEventListener("keyup", onChange);
onChange();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUMsS0FBSyxDQUFDLENBQUM7SUFFM0IsSUFBSSxFQUFFLENBQUM7QUFDWCxDQUFDO0FBRUQsc0JBQXNCLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0FBQzVELGVBQWUsQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLENBQUM7QUFDckQsY0FBYyxDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsQ0FBQztBQUNwRCxRQUFRLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0FBQzlDLHNCQUFzQixDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxRQUFRLENBQUMsQ0FBQztBQUMzRCxlQUFlLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0FBQ3BELGNBQWMsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsUUFBUSxDQUFDLENBQUM7QUFDbkQsUUFBUSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxRQUFRLENBQUMsQ0FBQztBQUU3QyxRQUFRLEVBQUUsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL21hdGhfc3BlLy4vc3JjL2NsYXNzZXMvVmVjdG9yMkQudHMiLCJ3ZWJwYWNrOi8vbWF0aF9zcGUvLi9zcmMvY2xhc3Nlcy9TcGxpbmUudHMiLCJ3ZWJwYWNrOi8vbWF0aF9zcGUvLi9zcmMvY2xhc3Nlcy9DYW52YXNNYW5hZ2VyLnRzIiwid2VicGFjazovL21hdGhfc3BlLy4vc3JjL0FOMjAyMl9TcGxpbmUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtQb2ludDJEfSBmcm9tIFwiLi9Qb2ludDJEXCI7XG5cbmV4cG9ydCBjbGFzcyBWZWN0b3IyRCB7XG4gICAgcHJpdmF0ZSBfeDogbnVtYmVyO1xuICAgIHByaXZhdGUgX3k6IG51bWJlcjtcblxuICAgIGNvbnN0cnVjdG9yKHBvaW50OiBQb2ludDJEKTtcbiAgICBjb25zdHJ1Y3RvcihzdGFydDogUG9pbnQyRCwgZW5kOiBQb2ludDJEKTtcbiAgICBjb25zdHJ1Y3RvcihzdGFydDogUG9pbnQyRCwgZW5kPzogUG9pbnQyRCkge1xuICAgICAgICBpZiAoZW5kKSB7XG4gICAgICAgICAgICB0aGlzLl94ID0gZW5kLnggLSBzdGFydC54O1xuICAgICAgICAgICAgdGhpcy5feSA9IGVuZC55IC0gc3RhcnQueTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX3ggPSBzdGFydC54O1xuICAgICAgICAgICAgdGhpcy5feSA9IHN0YXJ0Lnk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXQgbm9ybSgpIHtcbiAgICAgICAgcmV0dXJuIE1hdGguc3FydCh0aGlzLl94ICoqIDIgKyB0aGlzLl95ICoqIDIpO1xuICAgIH1cblxuICAgIGdldCB4KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5feDtcbiAgICB9XG5cbiAgICBnZXQgeSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3k7XG4gICAgfVxuXG4gICAgbm9ybWFsKCkge1xuICAgICAgICByZXR1cm4gbmV3IFZlY3RvcjJEKHtcbiAgICAgICAgICAgIHg6IC10aGlzLl95LFxuICAgICAgICAgICAgeTogdGhpcy5feFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBkb3RQcm9kdWN0KHZlY3RvcjogVmVjdG9yMkQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3ggKiB2ZWN0b3IuX3ggKyB0aGlzLl95ICogdmVjdG9yLl95O1xuICAgIH1cblxuICAgIGFuZ2xlKHZlY3RvcjogVmVjdG9yMkQpIHtcbiAgICAgICAgcmV0dXJuIE1hdGguYWNvcyh0aGlzLmRvdFByb2R1Y3QodmVjdG9yKSAvICh0aGlzLm5vcm0gKiB2ZWN0b3Iubm9ybSkpO1xuICAgIH1cblxuICAgIG11bHRpcGx5KGZhY3RvcjogbnVtYmVyKSB7XG4gICAgICAgIHJldHVybiBuZXcgVmVjdG9yMkQoe1xuICAgICAgICAgICAgeDogZmFjdG9yICogdGhpcy5feCxcbiAgICAgICAgICAgIHk6IGZhY3RvciAqIHRoaXMuX3lcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgYWRkKHBvaW50OiBWZWN0b3IyRCkge1xuICAgICAgICByZXR1cm4gbmV3IFZlY3RvcjJEKHtcbiAgICAgICAgICAgIHg6IHRoaXMuX3ggKyBwb2ludC5feCxcbiAgICAgICAgICAgIHk6IHRoaXMuX3kgKyBwb2ludC5feVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBzdWJzdHJhY3QocG9pbnQ6IFZlY3RvcjJEKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmFkZCh0aGlzLm11bHRpcGx5KC0xKSk7XG4gICAgfVxuXG4gICAgY29weSgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBWZWN0b3IyRCh7XG4gICAgICAgICAgICB4OiB0aGlzLl94LFxuICAgICAgICAgICAgeTogdGhpcy5feVxuICAgICAgICB9KTtcbiAgICB9XG59XG4iLCJpbXBvcnQge1ZlY3RvcjJEfSBmcm9tIFwiLi9WZWN0b3IyRFwiO1xuaW1wb3J0IHtQb2ludDJEfSBmcm9tIFwiLi9Qb2ludDJEXCI7XG5cbmV4cG9ydCBjbGFzcyBTcGxpbmUge1xuICAgIHByaXZhdGUgX3BvaW50czogUG9pbnQyRFtdO1xuXG4gICAgY29uc3RydWN0b3IocG9pbnRzOiBQb2ludDJEW10gPSBbXSkge1xuICAgICAgICB0aGlzLl9wb2ludHMgPSBwb2ludHM7XG4gICAgfVxuXG4gICAgZ2V0IHBvaW50cygpOiByZWFkb25seSBQb2ludDJEW10ge1xuICAgICAgICByZXR1cm4gdGhpcy5fcG9pbnRzO1xuICAgIH1cblxuICAgIGdldCBwb2ludExlbmd0aCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3BvaW50cy5sZW5ndGg7XG4gICAgfVxuXG4gICAgZ2V0IGxhc3RQb2ludCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3BvaW50c1t0aGlzLnBvaW50TGVuZ3RoIC0gMV07XG4gICAgfVxuXG4gICAgZ2V0IGJlZm9yZUxhc3RQb2ludCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3BvaW50c1t0aGlzLnBvaW50TGVuZ3RoIC0gMl07XG4gICAgfVxuXG4gICAgZmluZFBvaW50KHBvaW50OiBQb2ludDJEKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9wb2ludHMuZmluZCgocDIpID0+IHBvaW50LnggPT0gcDIueCAmJiBwb2ludC55ID09IHAyLnkpO1xuICAgIH1cblxuICAgIGFkZFBvaW50KHBvaW50OiBQb2ludDJEKSB7XG4gICAgICAgIHRoaXMuX3BvaW50cy5wdXNoKHBvaW50KTtcbiAgICB9XG5cbiAgICBjbGVhcigpIHtcbiAgICAgICAgdGhpcy5fcG9pbnRzID0gW107XG4gICAgfVxuXG4gICAgc2ltcGxpZnkobWluTm9ybTogbnVtYmVyLCBtaW5BbmdsZTogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuX3BvaW50cyA9IHRoaXMuX3BvaW50cy5yZWR1Y2U8UG9pbnQyRFtdPigocHJldiwgaXRlbSkgPT4ge1xuICAgICAgICAgICAgaWYgKHByZXYubGVuZ3RoIDw9IDMpIHJldHVybiBbLi4ucHJldiwgaXRlbV07XG5cbiAgICAgICAgICAgIGNvbnN0IGJlZm9yZUxhc3RQb2ludCA9IHByZXZbcHJldi5sZW5ndGggLSAyXTtcbiAgICAgICAgICAgIGNvbnN0IGxhc3RQb2ludCA9IHByZXZbcHJldi5sZW5ndGggLSAxXTtcbiAgICAgICAgICAgIGNvbnN0IHZBQyA9IG5ldyBWZWN0b3IyRChiZWZvcmVMYXN0UG9pbnQsIGl0ZW0pO1xuICAgICAgICAgICAgY29uc3QgdkFCID0gbmV3IFZlY3RvcjJEKGJlZm9yZUxhc3RQb2ludCwgbGFzdFBvaW50KTtcbiAgICAgICAgICAgIGNvbnN0IHZCQyA9IG5ldyBWZWN0b3IyRChsYXN0UG9pbnQsIGl0ZW0pO1xuXG4gICAgICAgICAgICBpZiAodkFDLm5vcm0gPCBtaW5Ob3JtKSBwcmV2LnBvcCgpO1xuXG4gICAgICAgICAgICBjb25zdCBkZWdBbmdsZSA9IHZBQi5hbmdsZSh2QkMpICogMTgwIC8gTWF0aC5QSTtcblxuICAgICAgICAgICAgaWYgKGRlZ0FuZ2xlIDwgbWluQW5nbGUpIHByZXYucG9wKCk7XG5cbiAgICAgICAgICAgIHByZXYucHVzaChpdGVtKTtcblxuICAgICAgICAgICAgcmV0dXJuIHByZXY7XG4gICAgICAgIH0sIFtdKTtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBnZXQgYW5nbGVzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcG9pbnRzLm1hcCgoY3VycmVudFBvaW50LCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgaWYgKGluZGV4ICsgMSA8PSAxIHx8IGluZGV4ICsgMSA+PSB0aGlzLl9wb2ludHMubGVuZ3RoKSByZXR1cm4gSW5maW5pdHk7XG5cbiAgICAgICAgICAgIGNvbnN0IGxhc3RQb2ludCA9IHRoaXMuX3BvaW50c1tpbmRleCAtIDFdO1xuICAgICAgICAgICAgY29uc3QgbmV4dFBvaW50ID0gdGhpcy5fcG9pbnRzW2luZGV4ICsgMV07XG5cbiAgICAgICAgICAgIGNvbnN0IHZCQSA9IG5ldyBWZWN0b3IyRChjdXJyZW50UG9pbnQsIGxhc3RQb2ludCk7XG4gICAgICAgICAgICBjb25zdCB2QkMgPSBuZXcgVmVjdG9yMkQoY3VycmVudFBvaW50LCBuZXh0UG9pbnQpO1xuXG4gICAgICAgICAgICByZXR1cm4gdkJBLmFuZ2xlKHZCQyk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGdldCBhcmVhcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3BvaW50cy5tYXAoKGN1cnJlbnRQb2ludCwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIGlmIChpbmRleCArIDEgPD0gMSB8fCBpbmRleCArIDEgPj0gdGhpcy5fcG9pbnRzLmxlbmd0aCkgcmV0dXJuIEluZmluaXR5O1xuXG4gICAgICAgICAgICBjb25zdCBsYXN0UG9pbnQgPSB0aGlzLl9wb2ludHNbaW5kZXggLSAxXTtcbiAgICAgICAgICAgIGNvbnN0IG5leHRQb2ludCA9IHRoaXMuX3BvaW50c1tpbmRleCArIDFdO1xuXG4gICAgICAgICAgICBjb25zdCB2QkEgPSBuZXcgVmVjdG9yMkQoY3VycmVudFBvaW50LCBsYXN0UG9pbnQpO1xuICAgICAgICAgICAgY29uc3QgdkJDID0gbmV3IFZlY3RvcjJEKGN1cnJlbnRQb2ludCwgbmV4dFBvaW50KTtcbiAgICAgICAgICAgIGNvbnN0IHZBQyA9IG5ldyBWZWN0b3IyRChsYXN0UG9pbnQsIG5leHRQb2ludCk7XG5cbiAgICAgICAgICAgIGNvbnN0IHMgPSAodkFDLm5vcm0gKyB2QkEubm9ybSArIHZCQy5ub3JtKSAvIDI7XG5cbiAgICAgICAgICAgIHJldHVybiBNYXRoLnNxcnQocyAqIChzIC0gdkFDLm5vcm0pICogKHMgLSB2QkEubm9ybSkgKiAocyAtIHZCQy5ub3JtKSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGNvbnRyb2xQb2ludHModmFsdWVzOiBudW1iZXJbXSwgbnVtYmVyT2ZDb250cm9sUG9pbnRzOiBudW1iZXIpIHtcbiAgICAgICAgbnVtYmVyT2ZDb250cm9sUG9pbnRzID0gTWF0aC5tYXgobnVtYmVyT2ZDb250cm9sUG9pbnRzLCAyKTtcblxuICAgICAgICBjb25zdCB2YWx1ZXNXaXRoSW5kZXhlcyA9IHRoaXMuYXJlYXMubWFwKCh2YWx1ZSwgaW5kZXgpID0+IFt2YWx1ZSwgaW5kZXhdKTtcblxuICAgICAgICB2YWx1ZXNXaXRoSW5kZXhlcy5zb3J0KChhLCBiKSA9PiB7XG4gICAgICAgICAgICBpZiAoTnVtYmVyLmlzTmFOKGJbMF0pKSByZXR1cm4gLTE7XG5cbiAgICAgICAgICAgIGlmIChhWzBdIDwgYlswXSkgcmV0dXJuIDE7XG4gICAgICAgICAgICBlbHNlIGlmIChhWzBdID4gYlswXSkgcmV0dXJuIC0xO1xuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiB2YWx1ZXNXaXRoSW5kZXhlc1xuICAgICAgICAgICAgLnNsaWNlKDAsIG51bWJlck9mQ29udHJvbFBvaW50cylcbiAgICAgICAgICAgIC5zb3J0KChhLCBiKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGFbMV0gPCBiWzFdKSByZXR1cm4gMTtcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChhWzFdID4gYlsxXSkgcmV0dXJuIC0xO1xuICAgICAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5tYXAoKHgpID0+IHRoaXMuX3BvaW50c1t4WzFdXSk7XG4gICAgfVxuXG4gICAgdHJhbnNsYXRlKHg6IG51bWJlciwgeTogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuX3BvaW50cyA9IHRoaXMuX3BvaW50cy5tYXAoKHBvaW50KSA9PiB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHg6IHBvaW50LnggKyB4LFxuICAgICAgICAgICAgICAgIHk6IHBvaW50LnkgKyB5XG4gICAgICAgICAgICB9O1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBjb3B5KCkge1xuICAgICAgICByZXR1cm4gbmV3IFNwbGluZSh0aGlzLl9wb2ludHMpO1xuICAgIH1cblxuICAgIGNhdG11bGxSb21JbnRlcnBvbGF0aW9uKFxuICAgICAgICB0Rm46IChwQTogUG9pbnQyRCwgcEI6IFBvaW50MkQsIHBDOiBQb2ludDJELCBwRDogUG9pbnQyRCwgaW5kZXg6IG51bWJlciwgbmJJbnRlcnBvbGF0aW9uUG9pbnQ6IG51bWJlcikgPT4gbnVtYmVyLFxuICAgICAgICBuYkludGVycG9sYXRpb25Qb2ludHNGbjogKHBBOiBQb2ludDJELCBwQjogUG9pbnQyRCwgcEM6IFBvaW50MkQsIHBEOiBQb2ludDJEKSA9PiBudW1iZXJcbiAgICApIHtcbiAgICAgICAgY29uc3QgbGFzdFBvaW50ID0gdGhpcy5fcG9pbnRzW3RoaXMuX3BvaW50cy5sZW5ndGggLSAxXTtcbiAgICAgICAgdGhpcy5fcG9pbnRzID0gdGhpcy5fcG9pbnRzLnJlZHVjZTxQb2ludDJEW10+KChwcmV2LCBwQywgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIGlmIChpbmRleCArIDEgPD0gMiB8fCBpbmRleCArIDEgPj0gdGhpcy5fcG9pbnRzLmxlbmd0aCkgcmV0dXJuIHByZXY7XG5cbiAgICAgICAgICAgIGNvbnN0IGFkZCA9IChweTogUG9pbnQyRCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICghcHJldi5maW5kKChweCkgPT4gcHgueCA9PT0gcHkueCAmJiBweC55ID09PSBweS55KSkge1xuICAgICAgICAgICAgICAgICAgICBwcmV2LnB1c2gocHkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGNvbnN0IHBBID0gdGhpcy5fcG9pbnRzW2luZGV4IC0gMl07XG4gICAgICAgICAgICBjb25zdCBwQiA9IHRoaXMuX3BvaW50c1tpbmRleCAtIDFdO1xuICAgICAgICAgICAgY29uc3QgcEQgPSB0aGlzLl9wb2ludHNbaW5kZXggKyAxXTtcblxuICAgICAgICAgICAgYWRkKHBBKTtcbiAgICAgICAgICAgIGFkZChwQik7XG5cbiAgICAgICAgICAgIGNvbnN0IG5iSW50ZXJwb2xhdGlvblBvaW50cyA9IG5iSW50ZXJwb2xhdGlvblBvaW50c0ZuKHBBLCBwQiwgcEMsIHBEKTtcblxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IG5iSW50ZXJwb2xhdGlvblBvaW50czsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgICAgICAgICBjb25zdCB0ID0gdEZuKHBBLCBwQiwgcEMsIHBELCBpLCBuYkludGVycG9sYXRpb25Qb2ludHMpO1xuXG4gICAgICAgICAgICAgICAgY29uc3QgcG9pbnQgPSB7XG4gICAgICAgICAgICAgICAgICAgIHg6IFNwbGluZS5jYXRtdWxsUm9tKHQsIHBBLngsIHBCLngsIHBDLngsIHBELngpLFxuICAgICAgICAgICAgICAgICAgICB5OiBTcGxpbmUuY2F0bXVsbFJvbSh0LCBwQS55LCBwQi55LCBwQy55LCBwRC55KVxuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICBwcmV2LnB1c2gocG9pbnQpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBhZGQocEMpO1xuXG4gICAgICAgICAgICByZXR1cm4gcHJldjtcbiAgICAgICAgfSwgW10pO1xuXG4gICAgICAgIHRoaXMuX3BvaW50cyA9IFtcbiAgICAgICAgICAgIC4uLnRoaXMuX3BvaW50cyxcbiAgICAgICAgICAgIGxhc3RQb2ludFxuICAgICAgICBdO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHN0YXRpYyBjYXRtdWxsUm9tKHQ6IG51bWJlciwgbUE6IG51bWJlciwgbUI6IG51bWJlciwgbUM6IG51bWJlciwgbUQ6IG51bWJlcikge1xuICAgICAgICBjb25zdCBhID0gMyAqIG1CIC0gbUEgLSAzICogbUMgKyBtRDtcbiAgICAgICAgY29uc3QgYiA9IDIgKiBtQSAtIDUgKiBtQiArIDQgKiBtQyAtIG1EO1xuICAgICAgICBjb25zdCBjID0gKG1DIC0gbUEpICogdDtcbiAgICAgICAgY29uc3QgZCA9IDIgKiBtQjtcbiAgICAgICAgY29uc3QgZmluYWwgPSBhICogdCAqKiAzICsgYiAqIHQgKiogMiArIGMgKyBkO1xuICAgICAgICByZXR1cm4gMC41ICogZmluYWw7XG4gICAgfVxufVxuIiwiaW1wb3J0IHtTcGxpbmV9IGZyb20gXCIuL1NwbGluZVwiO1xuaW1wb3J0IHtQb2ludDJEfSBmcm9tIFwiLi9Qb2ludDJEXCI7XG5cbmV4cG9ydCBjbGFzcyBDYW52YXNNYW5hZ2VyIHtcbiAgICBwcml2YXRlIF9jYW52YXM6IEhUTUxDYW52YXNFbGVtZW50O1xuICAgIHByaXZhdGUgX2NvbnRleHQ6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRDtcbiAgICBwcml2YXRlIF9pc0RyYXdpbmc6IGJvb2xlYW47XG4gICAgcHJpdmF0ZSBfcGl4ZWxSYXRpbzogbnVtYmVyO1xuXG4gICAgZ2V0IGNhbnZhcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NhbnZhcztcbiAgICB9XG5cbiAgICBnZXQgcGl4ZWxSYXRpbygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3BpeGVsUmF0aW87XG4gICAgfVxuXG4gICAgZ2V0IGNvbnRleHQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jb250ZXh0O1xuICAgIH1cblxuICAgIGdldCBpc0RyYXdpbmcoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pc0RyYXdpbmc7XG4gICAgfVxuXG4gICAgc2V0IGlzRHJhd2luZyhpc0RyYXdpbmc6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5faXNEcmF3aW5nID0gaXNEcmF3aW5nO1xuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQsIHNjYWxlRmFjdG9yPzogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuX2lzRHJhd2luZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9jYW52YXMgPSBjYW52YXM7XG4gICAgICAgIHRoaXMuX3BpeGVsUmF0aW8gPSBzY2FsZUZhY3RvciB8fCB3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbyB8fCAxO1xuXG4gICAgICAgIGNvbnN0IHJlY3QgPSB0aGlzLl9jYW52YXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgIGNvbnN0IGNvbnRleHQgPSB0aGlzLl9jYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuXG4gICAgICAgIHRoaXMuX2NhbnZhcy5zdHlsZS53aWR0aCA9IHRoaXMuX2NhbnZhcy53aWR0aCArICdweCc7XG4gICAgICAgIHRoaXMuX2NhbnZhcy5zdHlsZS5oZWlnaHQgPSB0aGlzLl9jYW52YXMuaGVpZ2h0ICsgJ3B4JztcblxuICAgICAgICB0aGlzLl9jYW52YXMud2lkdGggPSByZWN0LndpZHRoICogdGhpcy5fcGl4ZWxSYXRpbztcbiAgICAgICAgdGhpcy5fY2FudmFzLmhlaWdodCA9IHJlY3QuaGVpZ2h0ICogdGhpcy5fcGl4ZWxSYXRpbztcblxuICAgICAgICBjb250ZXh0LnNjYWxlKHRoaXMuX3BpeGVsUmF0aW8sIHRoaXMuX3BpeGVsUmF0aW8pO1xuXG4gICAgICAgIHRoaXMuX2NvbnRleHQgPSBjb250ZXh0O1xuICAgIH1cblxuICAgIGNsZWFyKCkge1xuICAgICAgICB0aGlzLmNvbnRleHQuY2xlYXJSZWN0KDAsIDAsIHRoaXMuX2NvbnRleHQuY2FudmFzLndpZHRoLCB0aGlzLl9jb250ZXh0LmNhbnZhcy5oZWlnaHQpO1xuICAgIH1cblxuICAgIGdldFBvaW50KGU6IE1vdXNlRXZlbnQpOiBQb2ludDJEIHtcbiAgICAgICAgY29uc3QgcmVjdCA9IHRoaXMuX2NhbnZhcy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgeDogZS5jbGllbnRYIC0gcmVjdC5sZWZ0LFxuICAgICAgICAgICAgeTogZS5jbGllbnRZIC0gcmVjdC50b3BcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBkcmF3UG9pbnQoXG4gICAgICAgIHBvaW50OiBQb2ludDJELFxuICAgICAgICByYWRpdXMgPSA1LFxuICAgICAgICBmaWxsQ29sb3IgPSBcImJsYWNrXCIsXG4gICAgICAgIHN0cm9rZUNvbG9yID0gXCJibGFja1wiLFxuICAgICAgICBsaW5lV2lkdGggPSAwXG4gICAgKSB7XG4gICAgICAgIHRoaXMuX2NvbnRleHQuYmVnaW5QYXRoKCk7XG4gICAgICAgIHRoaXMuX2NvbnRleHQubGluZVdpZHRoID0gbGluZVdpZHRoO1xuICAgICAgICB0aGlzLl9jb250ZXh0LmxpbmVDYXAgPSBcInJvdW5kXCI7XG4gICAgICAgIHRoaXMuX2NvbnRleHQuZmlsbFN0eWxlID0gZmlsbENvbG9yO1xuICAgICAgICB0aGlzLl9jb250ZXh0LnN0cm9rZVN0eWxlID0gc3Ryb2tlQ29sb3I7XG4gICAgICAgIHRoaXMuX2NvbnRleHQuYXJjKHBvaW50LngsIHBvaW50LnksIHJhZGl1cywgMCwgMiAqIE1hdGguUEkpO1xuICAgICAgICB0aGlzLl9jb250ZXh0LmZpbGwoKTtcbiAgICAgICAgdGhpcy5fY29udGV4dC5zdHJva2UoKTtcbiAgICAgICAgdGhpcy5fY29udGV4dC5jbG9zZVBhdGgoKTtcbiAgICB9XG5cbiAgICBkcmF3UG9pbnRzKFxuICAgICAgICBwb2ludHM6IFBvaW50MkRbXSB8IHJlYWRvbmx5IFBvaW50MkRbXSxcbiAgICAgICAgcmFkaXVzID0gNSxcbiAgICAgICAgZmlsbENvbG9yID0gXCJibGFja1wiLFxuICAgICAgICBzdHJva2VDb2xvciA9IFwiYmxhY2tcIixcbiAgICAgICAgbGluZVdpZHRoID0gMFxuICAgICkge1xuICAgICAgICBwb2ludHMuZm9yRWFjaCgocG9pbnQpID0+IHRoaXMuZHJhd1BvaW50KHBvaW50LCByYWRpdXMsIGZpbGxDb2xvciwgc3Ryb2tlQ29sb3IsIGxpbmVXaWR0aCkpO1xuICAgIH1cblxuICAgIGRyYXdMaW5lKFxuICAgICAgICBwb2ludHM6IFBvaW50MkRbXSB8IHJlYWRvbmx5IFBvaW50MkRbXSxcbiAgICAgICAgc3Ryb2tlQ29sb3IgPSBcImJsYWNrXCIsXG4gICAgICAgIGxpbmVXaWR0aCA9IDFcbiAgICApIHtcbiAgICAgICAgcG9pbnRzLmZvckVhY2goKHBvaW50LCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgaWYgKGluZGV4ID49IHBvaW50cy5sZW5ndGggLSAxKSByZXR1cm47XG5cbiAgICAgICAgICAgIHRoaXMuX2NvbnRleHQuYmVnaW5QYXRoKCk7XG4gICAgICAgICAgICB0aGlzLl9jb250ZXh0LmxpbmVXaWR0aCA9IGxpbmVXaWR0aDtcbiAgICAgICAgICAgIHRoaXMuX2NvbnRleHQubGluZUNhcCA9IFwicm91bmRcIjtcbiAgICAgICAgICAgIHRoaXMuX2NvbnRleHQuc3Ryb2tlU3R5bGUgPSBzdHJva2VDb2xvcjtcbiAgICAgICAgICAgIHRoaXMuX2NvbnRleHQubW92ZVRvKHBvaW50LngsIHBvaW50LnkpO1xuICAgICAgICAgICAgdGhpcy5fY29udGV4dC5saW5lVG8ocG9pbnRzW2luZGV4ICsgMV0ueCwgcG9pbnRzW2luZGV4ICsgMV0ueSk7XG4gICAgICAgICAgICB0aGlzLl9jb250ZXh0LnN0cm9rZSgpO1xuICAgICAgICAgICAgdGhpcy5fY29udGV4dC5jbG9zZVBhdGgoKTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHtTcGxpbmV9IGZyb20gXCIuL2NsYXNzZXMvU3BsaW5lXCI7XG5pbXBvcnQge0NhbnZhc01hbmFnZXJ9IGZyb20gXCIuL2NsYXNzZXMvQ2FudmFzTWFuYWdlclwiO1xuaW1wb3J0IHtWZWN0b3IyRH0gZnJvbSBcIi4vY2xhc3Nlcy9WZWN0b3IyRFwiO1xuXG5jb25zdCBuYkNvbnRyb2xQb2ludHNFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzLWNvbnRyb2wtcG9pbnRzXCIpIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XG5jb25zdCBtaW5BbmdsZUVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInMtYW5nbGVcIikgYXMgSFRNTElucHV0RWxlbWVudDtcbmNvbnN0IG1pbk5vcm1FbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzLW5vcm1cIikgYXMgSFRNTElucHV0RWxlbWVudDtcbmNvbnN0IHRFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzLXRcIikgYXMgSFRNTElucHV0RWxlbWVudDtcblxuY29uc3QgZHJhd2luZ0NhbnZhc0VsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInMtc3BsaW5lLWNhbnZhc1wiKSBhcyBIVE1MQ2FudmFzRWxlbWVudDtcbmNvbnN0IHByZXZpZXdDYW52YXNFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzLXNwbGluZS1jYW52YXMtcHJldmlld1wiKSBhcyBIVE1MQ2FudmFzRWxlbWVudDtcbmNvbnN0IHJlY29uc3RydWN0aW9uQ2FudmFzRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicy1zcGxpbmUtY2FudmFzLXJlY29uc3RydWN0aW9uXCIpIGFzIEhUTUxDYW52YXNFbGVtZW50O1xuY29uc3QgcmVjb25zdHJ1Y3Rpb25Eb25lQ2FudmFzRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicy1zcGxpbmUtY2FudmFzLXJlY29uc3RydWN0aW9uLWRvbmVcIikgYXMgSFRNTENhbnZhc0VsZW1lbnQ7XG5cbmNvbnN0IGRyYXdpbmdDYW52YXNNYW5hZ2VyID0gbmV3IENhbnZhc01hbmFnZXIoZHJhd2luZ0NhbnZhc0VsZW1lbnQpO1xuY29uc3QgcHJldmlld0NhbnZhc01hbmFnZXIgPSBuZXcgQ2FudmFzTWFuYWdlcihwcmV2aWV3Q2FudmFzRWxlbWVudCk7XG5jb25zdCByZWNvbnN0cnVjdGlvbkNhbnZhc01hbmFnZXIgPSBuZXcgQ2FudmFzTWFuYWdlcihyZWNvbnN0cnVjdGlvbkNhbnZhc0VsZW1lbnQpO1xuY29uc3QgcmVjb25zdHJ1Y3Rpb25Eb25lQ2FudmFzTWFuYWdlciA9IG5ldyBDYW52YXNNYW5hZ2VyKHJlY29uc3RydWN0aW9uRG9uZUNhbnZhc0VsZW1lbnQpO1xuXG5sZXQgbmJDb250cm9sUG9pbnRzID0gNDtcbmxldCBtaW5BbmdsZSA9IDE7XG5sZXQgbWluTm9ybSA9IDIwO1xubGV0IHQgPSAwLjU7XG5cbmNvbnN0IHNwbGluZSA9IG5ldyBTcGxpbmUoKTtcblxuZnVuY3Rpb24gZHJhdygpIHtcbiAgICBkcmF3aW5nQ2FudmFzTWFuYWdlci5jbGVhcigpO1xuICAgIHByZXZpZXdDYW52YXNNYW5hZ2VyLmNsZWFyKCk7XG4gICAgcmVjb25zdHJ1Y3Rpb25DYW52YXNNYW5hZ2VyLmNsZWFyKCk7XG4gICAgcmVjb25zdHJ1Y3Rpb25Eb25lQ2FudmFzTWFuYWdlci5jbGVhcigpO1xuXG4gICAgZHJhd2luZ0NhbnZhc01hbmFnZXIuZHJhd0xpbmUoc3BsaW5lLnBvaW50cywgXCJibGFja1wiLCAzKTtcblxuICAgIGNvbnN0IHNpbXBsaWZpZWRTcGxpbmUgPSBzcGxpbmUuY29weSgpLnNpbXBsaWZ5KG1pbk5vcm0sIG1pbkFuZ2xlKTtcbiAgICBjb25zdCBjb250cm9sUG9pbnRzID0gc2ltcGxpZmllZFNwbGluZS5jb250cm9sUG9pbnRzKHNwbGluZS5hcmVhcywgbmJDb250cm9sUG9pbnRzKTtcbiAgICBjb25zdCBzcGxpbmVGcm9tQ29udHJvbFBvaW50cyA9IG5ldyBTcGxpbmUoY29udHJvbFBvaW50cyk7XG4gICAgcHJldmlld0NhbnZhc01hbmFnZXIuZHJhd0xpbmUoc2ltcGxpZmllZFNwbGluZS5wb2ludHMsIFwiYmx1ZVwiLCAzKTtcbiAgICBwcmV2aWV3Q2FudmFzTWFuYWdlci5kcmF3TGluZShzcGxpbmVGcm9tQ29udHJvbFBvaW50cy5wb2ludHMsIFwicmVkXCIsIDMpO1xuICAgIHByZXZpZXdDYW52YXNNYW5hZ2VyLmRyYXdQb2ludHMoc2ltcGxpZmllZFNwbGluZS5wb2ludHMsIDMsIFwiZ3JlZW5cIiwgXCJncmVlblwiKTtcbiAgICBwcmV2aWV3Q2FudmFzTWFuYWdlci5kcmF3UG9pbnRzKGNvbnRyb2xQb2ludHMsIDUsIFwiZ3JlZW5cIiwgXCJibGFja1wiLCAyKTtcblxuICAgIGNvbnN0IHJlY29uc3RydWN0ZWRTcGxpbmUgPSBzcGxpbmVGcm9tQ29udHJvbFBvaW50cy5jb3B5KCkuY2F0bXVsbFJvbUludGVycG9sYXRpb24oXG4gICAgICAgICgpID0+IHQsXG4gICAgICAgIChwQSwgcEIsIHBDKSA9PiB7XG4gICAgICAgICAgICBjb25zdCB2QkMgPSBuZXcgVmVjdG9yMkQocEIsIHBDKTtcbiAgICAgICAgICAgIGNvbnN0IHZCQSA9IG5ldyBWZWN0b3IyRChwQiwgcEEpO1xuICAgICAgICAgICAgY29uc3QgYW5nbGUgPSB2QkEuYW5nbGUodkJDKTtcblxuICAgICAgICAgICAgLy8gbm9ybSBncmVhdGVyIC0+IG1vcmUgcG9pbnRzXG4gICAgICAgICAgICAvLyBhbmdsZSBncmVhdGVyIC0+IG1vcmUgcG9pbnRzXG4gICAgICAgICAgICBjb25zdCBub3JtRmFjdG9yID0gMC41ICogdkJDLm5vcm07XG4gICAgICAgICAgICBjb25zdCBhbmdsZUZhY3RvciA9IDEwICogKGFuZ2xlIC8gTWF0aC5QSSk7XG4gICAgICAgICAgICByZXR1cm4gTWF0aC5jZWlsKG5vcm1GYWN0b3IgKiBhbmdsZUZhY3Rvcik7XG4gICAgICAgIH1cbiAgICApO1xuXG4gICAgcmVjb25zdHJ1Y3Rpb25DYW52YXNNYW5hZ2VyLmRyYXdMaW5lKHJlY29uc3RydWN0ZWRTcGxpbmUucG9pbnRzLCBcImJsYWNrXCIsIDMpO1xuICAgIHJlY29uc3RydWN0aW9uQ2FudmFzTWFuYWdlci5kcmF3UG9pbnRzKHJlY29uc3RydWN0ZWRTcGxpbmUucG9pbnRzLCAzLCBcInJlZFwiLCBcInJlZFwiKTtcbiAgICByZWNvbnN0cnVjdGlvbkNhbnZhc01hbmFnZXIuZHJhd1BvaW50cyhjb250cm9sUG9pbnRzLCA1LCBcImdyZWVuXCIsIFwiYmxhY2tcIiwgMik7XG5cbiAgICByZWNvbnN0cnVjdGlvbkRvbmVDYW52YXNNYW5hZ2VyLmRyYXdMaW5lKHJlY29uc3RydWN0ZWRTcGxpbmUucG9pbnRzLCBcImJsYWNrXCIsIDMpO1xufVxuXG5mdW5jdGlvbiBtb3VzZU1vdmUoZTogTW91c2VFdmVudCkge1xuICAgIGlmICghZHJhd2luZ0NhbnZhc01hbmFnZXIuaXNEcmF3aW5nKSByZXR1cm47XG5cbiAgICBzcGxpbmUuYWRkUG9pbnQoZHJhd2luZ0NhbnZhc01hbmFnZXIuZ2V0UG9pbnQoZSkpO1xuICAgIGRyYXcoKTtcbn1cblxuZnVuY3Rpb24gbW91c2VEb3duKGU6IE1vdXNlRXZlbnQpIHtcbiAgICBkcmF3aW5nQ2FudmFzTWFuYWdlci5pc0RyYXdpbmcgPSB0cnVlO1xuICAgIHNwbGluZS5jbGVhcigpO1xuXG4gICAgbW91c2VNb3ZlKGUpO1xufVxuXG5mdW5jdGlvbiBtb3VzZVVwKGU6IE1vdXNlRXZlbnQpIHtcbiAgICBkcmF3aW5nQ2FudmFzTWFuYWdlci5pc0RyYXdpbmcgPSBmYWxzZTtcbn1cblxuZHJhd2luZ0NhbnZhc0VsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbW92ZVwiLCBtb3VzZU1vdmUpO1xuZHJhd2luZ0NhbnZhc0VsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCBtb3VzZURvd24pO1xuZHJhd2luZ0NhbnZhc0VsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNldXBcIiwgbW91c2VVcCk7XG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwibW91c2V1cFwiLCBtb3VzZVVwKTtcblxuZnVuY3Rpb24gb25DaGFuZ2UoKSB7XG4gICAgbmJDb250cm9sUG9pbnRzID0gTnVtYmVyKG5iQ29udHJvbFBvaW50c0VsZW1lbnQudmFsdWUpO1xuICAgIG1pbkFuZ2xlID0gTnVtYmVyKG1pbkFuZ2xlRWxlbWVudC52YWx1ZSk7XG4gICAgbWluTm9ybSA9IE51bWJlcihtaW5Ob3JtRWxlbWVudC52YWx1ZSk7XG4gICAgdCA9IE51bWJlcih0RWxlbWVudC52YWx1ZSk7XG5cbiAgICBkcmF3KCk7XG59XG5cbm5iQ29udHJvbFBvaW50c0VsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCBvbkNoYW5nZSk7XG5taW5BbmdsZUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCBvbkNoYW5nZSk7XG5taW5Ob3JtRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsIG9uQ2hhbmdlKTtcbnRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgb25DaGFuZ2UpO1xubmJDb250cm9sUG9pbnRzRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwia2V5dXBcIiwgb25DaGFuZ2UpO1xubWluQW5nbGVFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXl1cFwiLCBvbkNoYW5nZSk7XG5taW5Ob3JtRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwia2V5dXBcIiwgb25DaGFuZ2UpO1xudEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImtleXVwXCIsIG9uQ2hhbmdlKTtcblxub25DaGFuZ2UoKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==
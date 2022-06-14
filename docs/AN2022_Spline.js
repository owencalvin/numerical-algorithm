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
    Vector2D.area = function (previousPoint, currentPoint, nextPoint) {
        var vBA = new Vector2D(currentPoint, previousPoint);
        var vBC = new Vector2D(currentPoint, nextPoint);
        var vAC = new Vector2D(previousPoint, nextPoint);
        var s = (vAC.norm + vBA.norm + vBC.norm) / 2;
        return Math.sqrt(s * (s - vAC.norm) * (s - vBA.norm) * (s - vBC.norm));
    };
    return Vector2D;
}());


;// CONCATENATED MODULE: ./src/classes/Polygon.ts
var Polygon = /** @class */ (function () {
    function Polygon() {
        var points = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            points[_i] = arguments[_i];
        }
        this._points = points;
    }
    Polygon.prototype.area = function () {
        var area = 0.0;
        var j = this._points.length - 1;
        for (var i = 0; i < this._points.length; i++) {
            area += (this._points[j].x + this._points[i].x) * (this._points[j].y - this._points[i].y);
            j = i;
        }
        return Math.abs(area / 2.0);
    };
    return Polygon;
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
        this._points = __spreadArray(__spreadArray([], this._points, true), [
            point
        ], false);
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
                var previousPoint = _this._points[index - 1];
                var nextPoint = _this._points[index + 1];
                var polygon = new Polygon(previousPoint, currentPoint, nextPoint);
                return polygon.area();
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
        if (this._points.length < 3)
            return this;
        this._points = this._points.reduce(function (prev, pC, index) {
            var add = function (py) {
                if (!prev.find(function (px) { return (px === null || px === void 0 ? void 0 : px.x) === (py === null || py === void 0 ? void 0 : py.x) && (px === null || px === void 0 ? void 0 : px.y) === (py === null || py === void 0 ? void 0 : py.y); })) {
                    prev.push(py);
                }
            };
            if (index <= 0)
                return prev;
            var pA;
            var pB = _this._points[index - 1];
            var pD;
            if (index == 1) {
                pA = _this._points[index - 1];
                pD = _this._points[index + 1];
            }
            else if (index > 1 && index < _this._points.length - 1) {
                pA = _this._points[index - 2];
                pD = _this._points[index + 1];
            }
            else if (index >= _this._points.length - 1) {
                pA = _this._points[index - 2];
                pD = _this._points[index];
            }
            add(pA);
            add(pB);
            var nbInterpolationPoints = nbInterpolationPointsFn(pA, pB, pC, pD, _this) + 2;
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
var simplifiedPercentageElement = document.getElementById("s-simplified-percentage");
var controlPointsPercentageElement = document.getElementById("s-control-points-percentage");
var drawingCanvasElement = document.getElementById("s-drawing");
var drawingPointsCanvasElement = document.getElementById("s-drawing-points");
var simplifiedCanvasElement = document.getElementById("s-simplified");
var controlPointsCanvasElement = document.getElementById("s-control-points");
var simplifiedInterpolationElement = document.getElementById("s-simplified-interpolation");
var controlPointsInterpolationElement = document.getElementById("s-control-points-interpolation");
var simplifiedInterpolationDoneElement = document.getElementById("s-simplified-interpolation-done");
var controlPointsInterpolationDoneElement = document.getElementById("s-control-points-interpolation-done");
var drawingCanvasManager = new CanvasManager(drawingCanvasElement);
var drawingPointsCanvasManager = new CanvasManager(drawingPointsCanvasElement);
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
var interpolationFn = function (pA, pB, pC, pD, spline) {
    if (nbInterpolationPoints >= 0)
        return nbInterpolationPoints;
    var polygon = new Polygon(pA, pB, pC, pD);
    var areas = spline.areas.filter(function (x) {
        return Math.abs(x) != Infinity && !Number.isNaN(x);
    }).sort().reverse();
    var res = polygon.area() / areas[0];
    if (Number.isNaN(res))
        res = 0;
    if (Math.abs(res) >= Infinity)
        res = 0;
    res *= 5;
    res = Math.max(res, 0);
    res = Math.min(res, 100);
    return Math.ceil(res);
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
    var simplifiedSpline = spline.copy().simplify(minNorm, minAngle);
    var controlPoints = simplifiedSpline.controlPoints(spline.areas, nbControlPoints);
    simplifiedManager.drawLine(simplifiedSpline.points, "black", 1);
    simplifiedManager.drawPoints(simplifiedSpline.points, 3, "red", "red");
    simplifiedManager.drawPoints(controlPoints, 5, "red", "black", 2);
    var controlPointsSpline = new Spline(controlPoints);
    controlPointsManager.drawLine(controlPointsSpline.points, "black", 1);
    controlPointsManager.drawPoints(controlPointsSpline.points, 5, "red", "black", 2);
    var interpolatedSimplifiedSpline = simplifiedSpline.copy().catmullRomInterpolation(interpolationFn);
    simplifiedInterpolationManager.drawLine(interpolatedSimplifiedSpline.points, "black", 3);
    simplifiedInterpolationManager.drawPoints(interpolatedSimplifiedSpline.points, 2, "green", "green");
    simplifiedInterpolationManager.drawPoints(simplifiedSpline.points, 1, "red", "red");
    simplifiedInterpolationManager.drawPoints(controlPoints, 5, "red", "black", 2);
    var interpolatedControlPointsSpline = controlPointsSpline.copy().catmullRomInterpolation(interpolationFn);
    controlPointsInterpolationManager.drawLine(interpolatedControlPointsSpline.points, "black", 1);
    controlPointsInterpolationManager.drawPoints(interpolatedControlPointsSpline.points, 2, "green", "green");
    controlPointsInterpolationManager.drawPoints(controlPoints, 5, "red", "black", 2);
    controlPointsInterpolationDoneManager.drawLine(interpolatedControlPointsSpline.points, "black", 3);
    simplifiedInterpolationDoneManager.drawLine(interpolatedSimplifiedSpline.points, "black", 3);
    if (spline.points.length > 0) {
        controlPointsPercentageElement.innerHTML = "(" + (100 - controlPointsSpline.points.length / spline.points.length * 100).toFixed(2).toString() + "% de compression)";
        simplifiedPercentageElement.innerHTML = "(" + (100 - simplifiedSpline.points.length / spline.points.length * 100).toFixed(2).toString() + "% de compression)";
    }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFnQixDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsQ0FBQztBQUM1RCxlQUFlLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0FBQ3JELGNBQWMsQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLENBQUM7QUFDcEQsNEJBQTRCLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0FBRWxFLHNCQUFzQixDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxRQUFRLENBQUMsQ0FBQztBQUMzRCxlQUFlLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0FBQ3BELGNBQWMsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsUUFBUSxDQUFDLENBQUM7QUFDbkQsNEJBQTRCLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0FBRWpFLFFBQVEsRUFBRSxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbWF0aF9zcGUvLi9zcmMvY2xhc3Nlcy9WZWN0b3IyRC50cyIsIndlYnBhY2s6Ly9tYXRoX3NwZS8uL3NyYy9jbGFzc2VzL1BvbHlnb24udHMiLCJ3ZWJwYWNrOi8vbWF0aF9zcGUvLi9zcmMvY2xhc3Nlcy9TcGxpbmUudHMiLCJ3ZWJwYWNrOi8vbWF0aF9zcGUvLi9zcmMvY2xhc3Nlcy9DYW52YXNNYW5hZ2VyLnRzIiwid2VicGFjazovL21hdGhfc3BlLy4vc3JjL0FOMjAyMl9TcGxpbmUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtQb2ludDJEfSBmcm9tIFwiLi9Qb2ludDJEXCI7XG5cbmV4cG9ydCBjbGFzcyBWZWN0b3IyRCB7XG4gICAgcHJpdmF0ZSBfeDogbnVtYmVyO1xuICAgIHByaXZhdGUgX3k6IG51bWJlcjtcblxuICAgIGNvbnN0cnVjdG9yKHBvaW50OiBQb2ludDJEKTtcbiAgICBjb25zdHJ1Y3RvcihzdGFydDogUG9pbnQyRCwgZW5kOiBQb2ludDJEKTtcbiAgICBjb25zdHJ1Y3RvcihzdGFydDogUG9pbnQyRCwgZW5kPzogUG9pbnQyRCkge1xuICAgICAgICBpZiAoZW5kKSB7XG4gICAgICAgICAgICB0aGlzLl94ID0gZW5kLnggLSBzdGFydC54O1xuICAgICAgICAgICAgdGhpcy5feSA9IGVuZC55IC0gc3RhcnQueTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX3ggPSBzdGFydC54O1xuICAgICAgICAgICAgdGhpcy5feSA9IHN0YXJ0Lnk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXQgbm9ybSgpIHtcbiAgICAgICAgcmV0dXJuIE1hdGguc3FydCh0aGlzLl94ICoqIDIgKyB0aGlzLl95ICoqIDIpO1xuICAgIH1cblxuICAgIGdldCB4KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5feDtcbiAgICB9XG5cbiAgICBnZXQgeSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3k7XG4gICAgfVxuXG4gICAgbm9ybWFsKCkge1xuICAgICAgICByZXR1cm4gbmV3IFZlY3RvcjJEKHtcbiAgICAgICAgICAgIHg6IC10aGlzLl95LFxuICAgICAgICAgICAgeTogdGhpcy5feFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBkb3RQcm9kdWN0KHZlY3RvcjogVmVjdG9yMkQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3ggKiB2ZWN0b3IuX3ggKyB0aGlzLl95ICogdmVjdG9yLl95O1xuICAgIH1cblxuICAgIGFuZ2xlKHZlY3RvcjogVmVjdG9yMkQpIHtcbiAgICAgICAgcmV0dXJuIE1hdGguYWNvcyh0aGlzLmRvdFByb2R1Y3QodmVjdG9yKSAvICh0aGlzLm5vcm0gKiB2ZWN0b3Iubm9ybSkpO1xuICAgIH1cblxuICAgIG11bHRpcGx5KGZhY3RvcjogbnVtYmVyKSB7XG4gICAgICAgIHJldHVybiBuZXcgVmVjdG9yMkQoe1xuICAgICAgICAgICAgeDogZmFjdG9yICogdGhpcy5feCxcbiAgICAgICAgICAgIHk6IGZhY3RvciAqIHRoaXMuX3lcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgYWRkKHBvaW50OiBWZWN0b3IyRCkge1xuICAgICAgICByZXR1cm4gbmV3IFZlY3RvcjJEKHtcbiAgICAgICAgICAgIHg6IHRoaXMuX3ggKyBwb2ludC5feCxcbiAgICAgICAgICAgIHk6IHRoaXMuX3kgKyBwb2ludC5feVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBzdWJzdHJhY3QocG9pbnQ6IFZlY3RvcjJEKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmFkZCh0aGlzLm11bHRpcGx5KC0xKSk7XG4gICAgfVxuXG4gICAgY29weSgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBWZWN0b3IyRCh7XG4gICAgICAgICAgICB4OiB0aGlzLl94LFxuICAgICAgICAgICAgeTogdGhpcy5feVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBzdGF0aWMgYXJlYShwcmV2aW91c1BvaW50OiBQb2ludDJELCBjdXJyZW50UG9pbnQ6IFBvaW50MkQsIG5leHRQb2ludDogUG9pbnQyRCkge1xuICAgICAgICBjb25zdCB2QkEgPSBuZXcgVmVjdG9yMkQoY3VycmVudFBvaW50LCBwcmV2aW91c1BvaW50KTtcbiAgICAgICAgY29uc3QgdkJDID0gbmV3IFZlY3RvcjJEKGN1cnJlbnRQb2ludCwgbmV4dFBvaW50KTtcbiAgICAgICAgY29uc3QgdkFDID0gbmV3IFZlY3RvcjJEKHByZXZpb3VzUG9pbnQsIG5leHRQb2ludCk7XG5cbiAgICAgICAgY29uc3QgcyA9ICh2QUMubm9ybSArIHZCQS5ub3JtICsgdkJDLm5vcm0pIC8gMjtcbiAgICAgICAgcmV0dXJuIE1hdGguc3FydChzICogKHMgLSB2QUMubm9ybSkgKiAocyAtIHZCQS5ub3JtKSAqIChzIC0gdkJDLm5vcm0pKTtcbiAgICB9XG59XG4iLCJpbXBvcnQge1BvaW50MkR9IGZyb20gXCIuL1BvaW50MkRcIjtcblxuZXhwb3J0IGNsYXNzIFBvbHlnb24ge1xuICAgIHByaXZhdGUgX3BvaW50czogUG9pbnQyRFtdO1xuXG4gICAgY29uc3RydWN0b3IoLi4ucG9pbnRzOiBQb2ludDJEW10pIHtcbiAgICAgICAgdGhpcy5fcG9pbnRzID0gcG9pbnRzO1xuICAgIH1cblxuICAgIGFyZWEoKSB7XG4gICAgICAgIGxldCBhcmVhID0gMC4wO1xuICAgICAgICBsZXQgaiA9IHRoaXMuX3BvaW50cy5sZW5ndGggLSAxO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fcG9pbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBhcmVhICs9ICh0aGlzLl9wb2ludHNbal0ueCArIHRoaXMuX3BvaW50c1tpXS54KSAqICh0aGlzLl9wb2ludHNbal0ueSAtIHRoaXMuX3BvaW50c1tpXS55KTtcbiAgICAgICAgICAgIGogPSBpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIE1hdGguYWJzKGFyZWEgLyAyLjApO1xuICAgIH1cbn1cblxuIiwiaW1wb3J0IHtWZWN0b3IyRH0gZnJvbSBcIi4vVmVjdG9yMkRcIjtcbmltcG9ydCB7UG9pbnQyRH0gZnJvbSBcIi4vUG9pbnQyRFwiO1xuaW1wb3J0IHtQb2x5Z29ufSBmcm9tIFwiLi9Qb2x5Z29uXCI7XG5cbmV4cG9ydCBjbGFzcyBTcGxpbmUge1xuICAgIHByaXZhdGUgX3BvaW50czogUG9pbnQyRFtdO1xuXG4gICAgY29uc3RydWN0b3IocG9pbnRzOiBQb2ludDJEW10gPSBbXSkge1xuICAgICAgICB0aGlzLl9wb2ludHMgPSBwb2ludHM7XG4gICAgfVxuXG4gICAgZ2V0IHBvaW50cygpOiByZWFkb25seSBQb2ludDJEW10ge1xuICAgICAgICByZXR1cm4gdGhpcy5fcG9pbnRzO1xuICAgIH1cblxuICAgIGdldCBwb2ludExlbmd0aCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3BvaW50cy5sZW5ndGg7XG4gICAgfVxuXG4gICAgZ2V0IGxhc3RQb2ludCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3BvaW50c1t0aGlzLnBvaW50TGVuZ3RoIC0gMV07XG4gICAgfVxuXG4gICAgZ2V0IGJlZm9yZUxhc3RQb2ludCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3BvaW50c1t0aGlzLnBvaW50TGVuZ3RoIC0gMl07XG4gICAgfVxuXG4gICAgZmluZFBvaW50KHBvaW50OiBQb2ludDJEKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9wb2ludHMuZmluZCgocDIpID0+IHBvaW50LnggPT0gcDIueCAmJiBwb2ludC55ID09IHAyLnkpO1xuICAgIH1cblxuICAgIGFkZFBvaW50KHBvaW50OiBQb2ludDJEKSB7XG4gICAgICAgIHRoaXMuX3BvaW50cyA9IFtcbiAgICAgICAgICAgIC4uLnRoaXMuX3BvaW50cyxcbiAgICAgICAgICAgIHBvaW50XG4gICAgICAgIF07XG4gICAgfVxuXG4gICAgY2xlYXIoKSB7XG4gICAgICAgIHRoaXMuX3BvaW50cyA9IFtdO1xuICAgIH1cblxuICAgIHNpbXBsaWZ5KG1pbk5vcm06IG51bWJlciwgbWluQW5nbGU6IG51bWJlcikge1xuICAgICAgICB0aGlzLl9wb2ludHMgPSB0aGlzLl9wb2ludHMucmVkdWNlPFBvaW50MkRbXT4oKHByZXYsIGl0ZW0pID0+IHtcbiAgICAgICAgICAgIGlmIChwcmV2Lmxlbmd0aCA8PSAzKSByZXR1cm4gWy4uLnByZXYsIGl0ZW1dO1xuXG4gICAgICAgICAgICBjb25zdCBiZWZvcmVMYXN0UG9pbnQgPSBwcmV2W3ByZXYubGVuZ3RoIC0gMl07XG4gICAgICAgICAgICBjb25zdCBsYXN0UG9pbnQgPSBwcmV2W3ByZXYubGVuZ3RoIC0gMV07XG4gICAgICAgICAgICBjb25zdCB2QUMgPSBuZXcgVmVjdG9yMkQoYmVmb3JlTGFzdFBvaW50LCBpdGVtKTtcbiAgICAgICAgICAgIGNvbnN0IHZBQiA9IG5ldyBWZWN0b3IyRChiZWZvcmVMYXN0UG9pbnQsIGxhc3RQb2ludCk7XG4gICAgICAgICAgICBjb25zdCB2QkMgPSBuZXcgVmVjdG9yMkQobGFzdFBvaW50LCBpdGVtKTtcblxuICAgICAgICAgICAgaWYgKHZBQy5ub3JtIDwgbWluTm9ybSkgcHJldi5wb3AoKTtcblxuICAgICAgICAgICAgY29uc3QgZGVnQW5nbGUgPSB2QUIuYW5nbGUodkJDKSAqIDE4MCAvIE1hdGguUEk7XG5cbiAgICAgICAgICAgIGlmIChkZWdBbmdsZSA8IG1pbkFuZ2xlKSBwcmV2LnBvcCgpO1xuXG4gICAgICAgICAgICBwcmV2LnB1c2goaXRlbSk7XG5cbiAgICAgICAgICAgIHJldHVybiBwcmV2O1xuICAgICAgICB9LCBbXSk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgZ2V0IGFuZ2xlcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3BvaW50cy5tYXAoKGN1cnJlbnRQb2ludCwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIGlmIChpbmRleCArIDEgPD0gMSB8fCBpbmRleCArIDEgPj0gdGhpcy5fcG9pbnRzLmxlbmd0aCkgcmV0dXJuIEluZmluaXR5O1xuXG4gICAgICAgICAgICBjb25zdCBsYXN0UG9pbnQgPSB0aGlzLl9wb2ludHNbaW5kZXggLSAxXTtcbiAgICAgICAgICAgIGNvbnN0IG5leHRQb2ludCA9IHRoaXMuX3BvaW50c1tpbmRleCArIDFdO1xuXG4gICAgICAgICAgICBjb25zdCB2QkEgPSBuZXcgVmVjdG9yMkQoY3VycmVudFBvaW50LCBsYXN0UG9pbnQpO1xuICAgICAgICAgICAgY29uc3QgdkJDID0gbmV3IFZlY3RvcjJEKGN1cnJlbnRQb2ludCwgbmV4dFBvaW50KTtcblxuICAgICAgICAgICAgcmV0dXJuIHZCQS5hbmdsZSh2QkMpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBnZXQgYXJlYXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9wb2ludHMubWFwKChjdXJyZW50UG9pbnQsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICBpZiAoaW5kZXggKyAxIDw9IDEgfHwgaW5kZXggKyAxID49IHRoaXMuX3BvaW50cy5sZW5ndGgpIHJldHVybiBJbmZpbml0eTtcblxuICAgICAgICAgICAgY29uc3QgcHJldmlvdXNQb2ludCA9IHRoaXMuX3BvaW50c1tpbmRleCAtIDFdO1xuICAgICAgICAgICAgY29uc3QgbmV4dFBvaW50ID0gdGhpcy5fcG9pbnRzW2luZGV4ICsgMV07XG5cbiAgICAgICAgICAgIGNvbnN0IHBvbHlnb24gPSBuZXcgUG9seWdvbihwcmV2aW91c1BvaW50LCBjdXJyZW50UG9pbnQsIG5leHRQb2ludCk7XG4gICAgICAgICAgICByZXR1cm4gcG9seWdvbi5hcmVhKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGNvbnRyb2xQb2ludHModmFsdWVzOiBudW1iZXJbXSwgbnVtYmVyT2ZDb250cm9sUG9pbnRzOiBudW1iZXIpIHtcbiAgICAgICAgbnVtYmVyT2ZDb250cm9sUG9pbnRzID0gTWF0aC5tYXgobnVtYmVyT2ZDb250cm9sUG9pbnRzLCAyKTtcblxuICAgICAgICBjb25zdCB2YWx1ZXNXaXRoSW5kZXhlcyA9IHRoaXMuYXJlYXMubWFwKCh2YWx1ZSwgaW5kZXgpID0+IFt2YWx1ZSwgaW5kZXhdKTtcblxuICAgICAgICB2YWx1ZXNXaXRoSW5kZXhlcy5zb3J0KChhLCBiKSA9PiB7XG4gICAgICAgICAgICBpZiAoTnVtYmVyLmlzTmFOKGJbMF0pKSByZXR1cm4gLTE7XG5cbiAgICAgICAgICAgIGlmIChhWzBdIDwgYlswXSkgcmV0dXJuIDE7XG4gICAgICAgICAgICBlbHNlIGlmIChhWzBdID4gYlswXSkgcmV0dXJuIC0xO1xuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiB2YWx1ZXNXaXRoSW5kZXhlc1xuICAgICAgICAgICAgLnNsaWNlKDAsIG51bWJlck9mQ29udHJvbFBvaW50cylcbiAgICAgICAgICAgIC5zb3J0KChhLCBiKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGFbMV0gPCBiWzFdKSByZXR1cm4gMTtcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChhWzFdID4gYlsxXSkgcmV0dXJuIC0xO1xuICAgICAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5tYXAoKHgpID0+IHRoaXMuX3BvaW50c1t4WzFdXSk7XG4gICAgfVxuXG4gICAgdHJhbnNsYXRlKHg6IG51bWJlciwgeTogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuX3BvaW50cyA9IHRoaXMuX3BvaW50cy5tYXAoKHBvaW50KSA9PiB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHg6IHBvaW50LnggKyB4LFxuICAgICAgICAgICAgICAgIHk6IHBvaW50LnkgKyB5XG4gICAgICAgICAgICB9O1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBjb3B5KCkge1xuICAgICAgICByZXR1cm4gbmV3IFNwbGluZSh0aGlzLl9wb2ludHMpO1xuICAgIH1cblxuICAgIGNhdG11bGxSb21JbnRlcnBvbGF0aW9uKFxuICAgICAgICBuYkludGVycG9sYXRpb25Qb2ludHNGbjogKHBBOiBQb2ludDJELCBwQjogUG9pbnQyRCwgcEM6IFBvaW50MkQsIHBEOiBQb2ludDJELCBzcGxpbmU6IFNwbGluZSkgPT4gbnVtYmVyXG4gICAgKSB7XG4gICAgICAgIGlmICh0aGlzLl9wb2ludHMubGVuZ3RoIDwgMykgcmV0dXJuIHRoaXM7XG5cbiAgICAgICAgdGhpcy5fcG9pbnRzID0gdGhpcy5fcG9pbnRzLnJlZHVjZTxQb2ludDJEW10+KChwcmV2LCBwQywgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGFkZCA9IChweTogUG9pbnQyRCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICghcHJldi5maW5kKChweCkgPT4gcHg/LnggPT09IHB5Py54ICYmIHB4Py55ID09PSBweT8ueSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcHJldi5wdXNoKHB5KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBpZiAoaW5kZXggPD0gMCkgcmV0dXJuIHByZXY7XG5cbiAgICAgICAgICAgIGxldCBwQTogUG9pbnQyRDtcbiAgICAgICAgICAgIGxldCBwQjogUG9pbnQyRCA9IHRoaXMuX3BvaW50c1tpbmRleCAtIDFdO1xuICAgICAgICAgICAgbGV0IHBEOiBQb2ludDJEO1xuICAgICAgICAgICAgaWYgKGluZGV4ID09IDEpIHtcbiAgICAgICAgICAgICAgICBwQSA9IHRoaXMuX3BvaW50c1tpbmRleCAtIDFdO1xuICAgICAgICAgICAgICAgIHBEID0gdGhpcy5fcG9pbnRzW2luZGV4ICsgMV07XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGluZGV4ID4gMSAmJiBpbmRleCA8IHRoaXMuX3BvaW50cy5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgICAgICAgcEEgPSB0aGlzLl9wb2ludHNbaW5kZXggLSAyXTtcbiAgICAgICAgICAgICAgICBwRCA9IHRoaXMuX3BvaW50c1tpbmRleCArIDFdO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChpbmRleCA+PSB0aGlzLl9wb2ludHMubGVuZ3RoIC0gMSkge1xuICAgICAgICAgICAgICAgIHBBID0gdGhpcy5fcG9pbnRzW2luZGV4IC0gMl07XG4gICAgICAgICAgICAgICAgcEQgPSB0aGlzLl9wb2ludHNbaW5kZXhdO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBhZGQocEEpO1xuICAgICAgICAgICAgYWRkKHBCKTtcblxuICAgICAgICAgICAgY29uc3QgbmJJbnRlcnBvbGF0aW9uUG9pbnRzID0gbmJJbnRlcnBvbGF0aW9uUG9pbnRzRm4ocEEsIHBCLCBwQywgcEQsIHRoaXMpICsgMjtcblxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDI7IGkgPCBuYkludGVycG9sYXRpb25Qb2ludHM7IGkrKykge1xuICAgICAgICAgICAgICAgIGNvbnN0IHQgPSBpIC8gbmJJbnRlcnBvbGF0aW9uUG9pbnRzO1xuXG4gICAgICAgICAgICAgICAgY29uc3QgcG9pbnQgPSB7XG4gICAgICAgICAgICAgICAgICAgIHg6IFNwbGluZS5jYXRtdWxsUm9tKHQsIHBBLngsIHBCLngsIHBDLngsIHBELngpLFxuICAgICAgICAgICAgICAgICAgICB5OiBTcGxpbmUuY2F0bXVsbFJvbSh0LCBwQS55LCBwQi55LCBwQy55LCBwRC55KVxuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICBwcmV2ID0gW1xuICAgICAgICAgICAgICAgICAgICAuLi5wcmV2LFxuICAgICAgICAgICAgICAgICAgICBwb2ludCxcbiAgICAgICAgICAgICAgICBdO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBhZGQocEMpO1xuXG4gICAgICAgICAgICByZXR1cm4gcHJldjtcbiAgICAgICAgfSwgW10pO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHN0YXRpYyBjYXRtdWxsUm9tKHQ6IG51bWJlciwgbUE6IG51bWJlciwgbUI6IG51bWJlciwgbUM6IG51bWJlciwgbUQ6IG51bWJlcikge1xuICAgICAgICBjb25zdCBhID0gMyAqIG1CIC0gbUEgLSAzICogbUMgKyBtRDtcbiAgICAgICAgY29uc3QgYiA9IDIgKiBtQSAtIDUgKiBtQiArIDQgKiBtQyAtIG1EO1xuICAgICAgICBjb25zdCBjID0gKG1DIC0gbUEpICogdDtcbiAgICAgICAgY29uc3QgZCA9IDIgKiBtQjtcbiAgICAgICAgY29uc3QgZmluYWwgPSBhICogdCAqKiAzICsgYiAqIHQgKiogMiArIGMgKyBkO1xuICAgICAgICByZXR1cm4gMC41ICogZmluYWw7XG4gICAgfVxufVxuIiwiaW1wb3J0IHtTcGxpbmV9IGZyb20gXCIuL1NwbGluZVwiO1xuaW1wb3J0IHtQb2ludDJEfSBmcm9tIFwiLi9Qb2ludDJEXCI7XG5cbmV4cG9ydCBjbGFzcyBDYW52YXNNYW5hZ2VyIHtcbiAgICBwcml2YXRlIF9jYW52YXM6IEhUTUxDYW52YXNFbGVtZW50O1xuICAgIHByaXZhdGUgX2NvbnRleHQ6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRDtcbiAgICBwcml2YXRlIF9pc0RyYXdpbmc6IGJvb2xlYW47XG4gICAgcHJpdmF0ZSBfcGl4ZWxSYXRpbzogbnVtYmVyO1xuXG4gICAgZ2V0IGNhbnZhcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NhbnZhcztcbiAgICB9XG5cbiAgICBnZXQgcGl4ZWxSYXRpbygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3BpeGVsUmF0aW87XG4gICAgfVxuXG4gICAgZ2V0IGNvbnRleHQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jb250ZXh0O1xuICAgIH1cblxuICAgIGdldCBpc0RyYXdpbmcoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pc0RyYXdpbmc7XG4gICAgfVxuXG4gICAgc2V0IGlzRHJhd2luZyhpc0RyYXdpbmc6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5faXNEcmF3aW5nID0gaXNEcmF3aW5nO1xuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQsIHNjYWxlRmFjdG9yPzogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuX2lzRHJhd2luZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9jYW52YXMgPSBjYW52YXM7XG4gICAgICAgIHRoaXMuX3BpeGVsUmF0aW8gPSBzY2FsZUZhY3RvciB8fCB3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbyB8fCAxO1xuXG4gICAgICAgIGNvbnN0IHJlY3QgPSB0aGlzLl9jYW52YXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgIGNvbnN0IGNvbnRleHQgPSB0aGlzLl9jYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuXG4gICAgICAgIHRoaXMuX2NhbnZhcy5zdHlsZS53aWR0aCA9IHRoaXMuX2NhbnZhcy53aWR0aCArICdweCc7XG4gICAgICAgIHRoaXMuX2NhbnZhcy5zdHlsZS5oZWlnaHQgPSB0aGlzLl9jYW52YXMuaGVpZ2h0ICsgJ3B4JztcblxuICAgICAgICB0aGlzLl9jYW52YXMud2lkdGggPSByZWN0LndpZHRoICogdGhpcy5fcGl4ZWxSYXRpbztcbiAgICAgICAgdGhpcy5fY2FudmFzLmhlaWdodCA9IHJlY3QuaGVpZ2h0ICogdGhpcy5fcGl4ZWxSYXRpbztcblxuICAgICAgICBjb250ZXh0LnNjYWxlKHRoaXMuX3BpeGVsUmF0aW8sIHRoaXMuX3BpeGVsUmF0aW8pO1xuXG4gICAgICAgIHRoaXMuX2NvbnRleHQgPSBjb250ZXh0O1xuICAgIH1cblxuICAgIGNsZWFyKCkge1xuICAgICAgICB0aGlzLmNvbnRleHQuY2xlYXJSZWN0KDAsIDAsIHRoaXMuX2NvbnRleHQuY2FudmFzLndpZHRoLCB0aGlzLl9jb250ZXh0LmNhbnZhcy5oZWlnaHQpO1xuICAgIH1cblxuICAgIGdldFBvaW50KGU6IE1vdXNlRXZlbnQpOiBQb2ludDJEIHtcbiAgICAgICAgY29uc3QgcmVjdCA9IHRoaXMuX2NhbnZhcy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgeDogZS5jbGllbnRYIC0gcmVjdC5sZWZ0LFxuICAgICAgICAgICAgeTogZS5jbGllbnRZIC0gcmVjdC50b3BcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBkcmF3UG9pbnQoXG4gICAgICAgIHBvaW50OiBQb2ludDJELFxuICAgICAgICByYWRpdXMgPSA1LFxuICAgICAgICBmaWxsQ29sb3IgPSBcImJsYWNrXCIsXG4gICAgICAgIHN0cm9rZUNvbG9yID0gXCJibGFja1wiLFxuICAgICAgICBsaW5lV2lkdGggPSAwXG4gICAgKSB7XG4gICAgICAgIGlmICghcG9pbnQpIHJldHVybjtcbiAgICAgICAgdGhpcy5fY29udGV4dC5iZWdpblBhdGgoKTtcbiAgICAgICAgdGhpcy5fY29udGV4dC5saW5lV2lkdGggPSBsaW5lV2lkdGg7XG4gICAgICAgIHRoaXMuX2NvbnRleHQubGluZUNhcCA9IFwicm91bmRcIjtcbiAgICAgICAgdGhpcy5fY29udGV4dC5maWxsU3R5bGUgPSBmaWxsQ29sb3I7XG4gICAgICAgIHRoaXMuX2NvbnRleHQuc3Ryb2tlU3R5bGUgPSBzdHJva2VDb2xvcjtcbiAgICAgICAgdGhpcy5fY29udGV4dC5hcmMocG9pbnQueCwgcG9pbnQueSwgcmFkaXVzLCAwLCAyICogTWF0aC5QSSk7XG4gICAgICAgIHRoaXMuX2NvbnRleHQuZmlsbCgpO1xuICAgICAgICB0aGlzLl9jb250ZXh0LnN0cm9rZSgpO1xuICAgICAgICB0aGlzLl9jb250ZXh0LmNsb3NlUGF0aCgpO1xuICAgIH1cblxuICAgIGRyYXdQb2ludHMoXG4gICAgICAgIHBvaW50czogUG9pbnQyRFtdIHwgcmVhZG9ubHkgUG9pbnQyRFtdLFxuICAgICAgICByYWRpdXMgPSA1LFxuICAgICAgICBmaWxsQ29sb3IgPSBcImJsYWNrXCIsXG4gICAgICAgIHN0cm9rZUNvbG9yID0gXCJibGFja1wiLFxuICAgICAgICBsaW5lV2lkdGggPSAwXG4gICAgKSB7XG4gICAgICAgIHBvaW50cy5mb3JFYWNoKChwb2ludCkgPT4gdGhpcy5kcmF3UG9pbnQocG9pbnQsIHJhZGl1cywgZmlsbENvbG9yLCBzdHJva2VDb2xvciwgbGluZVdpZHRoKSk7XG4gICAgfVxuXG4gICAgZHJhd0xpbmUoXG4gICAgICAgIHBvaW50czogUG9pbnQyRFtdIHwgcmVhZG9ubHkgUG9pbnQyRFtdLFxuICAgICAgICBzdHJva2VDb2xvciA9IFwiYmxhY2tcIixcbiAgICAgICAgbGluZVdpZHRoID0gMVxuICAgICkge1xuICAgICAgICBwb2ludHMuZm9yRWFjaCgocG9pbnQsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICBpZiAoaW5kZXggPj0gcG9pbnRzLmxlbmd0aCAtIDEpIHJldHVybjtcblxuICAgICAgICAgICAgdGhpcy5fY29udGV4dC5iZWdpblBhdGgoKTtcbiAgICAgICAgICAgIHRoaXMuX2NvbnRleHQubGluZVdpZHRoID0gbGluZVdpZHRoO1xuICAgICAgICAgICAgdGhpcy5fY29udGV4dC5saW5lQ2FwID0gXCJyb3VuZFwiO1xuICAgICAgICAgICAgdGhpcy5fY29udGV4dC5zdHJva2VTdHlsZSA9IHN0cm9rZUNvbG9yO1xuICAgICAgICAgICAgdGhpcy5fY29udGV4dC5tb3ZlVG8ocG9pbnQueCwgcG9pbnQueSk7XG4gICAgICAgICAgICB0aGlzLl9jb250ZXh0LmxpbmVUbyhwb2ludHNbaW5kZXggKyAxXS54LCBwb2ludHNbaW5kZXggKyAxXS55KTtcbiAgICAgICAgICAgIHRoaXMuX2NvbnRleHQuc3Ryb2tlKCk7XG4gICAgICAgICAgICB0aGlzLl9jb250ZXh0LmNsb3NlUGF0aCgpO1xuICAgICAgICB9KTtcbiAgICB9XG59XG4iLCJpbXBvcnQge1NwbGluZX0gZnJvbSBcIi4vY2xhc3Nlcy9TcGxpbmVcIjtcbmltcG9ydCB7Q2FudmFzTWFuYWdlcn0gZnJvbSBcIi4vY2xhc3Nlcy9DYW52YXNNYW5hZ2VyXCI7XG5pbXBvcnQge1ZlY3RvcjJEfSBmcm9tIFwiLi9jbGFzc2VzL1ZlY3RvcjJEXCI7XG5pbXBvcnQge1BvaW50MkR9IGZyb20gXCIuL2NsYXNzZXMvUG9pbnQyRFwiO1xuaW1wb3J0IHtQb2x5Z29ufSBmcm9tIFwiLi9jbGFzc2VzL1BvbHlnb25cIjtcblxuY29uc3QgbmJDb250cm9sUG9pbnRzRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicy1uYi1jb250cm9sLXBvaW50c1wiKSBhcyBIVE1MSW5wdXRFbGVtZW50O1xuY29uc3QgbWluQW5nbGVFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzLWFuZ2xlXCIpIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XG5jb25zdCBtaW5Ob3JtRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicy1ub3JtXCIpIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XG5jb25zdCBuYkludGVycG9sYXRpb25Qb2ludHNFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzLWludGVycG9sYXRpb24tcG9pbnRzXCIpIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XG5jb25zdCBzaW1wbGlmaWVkUGVyY2VudGFnZUVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInMtc2ltcGxpZmllZC1wZXJjZW50YWdlXCIpIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XG5jb25zdCBjb250cm9sUG9pbnRzUGVyY2VudGFnZUVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInMtY29udHJvbC1wb2ludHMtcGVyY2VudGFnZVwiKSBhcyBIVE1MSW5wdXRFbGVtZW50O1xuXG5jb25zdCBkcmF3aW5nQ2FudmFzRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicy1kcmF3aW5nXCIpIGFzIEhUTUxDYW52YXNFbGVtZW50O1xuY29uc3QgZHJhd2luZ1BvaW50c0NhbnZhc0VsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInMtZHJhd2luZy1wb2ludHNcIikgYXMgSFRNTENhbnZhc0VsZW1lbnQ7XG5jb25zdCBzaW1wbGlmaWVkQ2FudmFzRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicy1zaW1wbGlmaWVkXCIpIGFzIEhUTUxDYW52YXNFbGVtZW50O1xuY29uc3QgY29udHJvbFBvaW50c0NhbnZhc0VsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInMtY29udHJvbC1wb2ludHNcIikgYXMgSFRNTENhbnZhc0VsZW1lbnQ7XG5jb25zdCBzaW1wbGlmaWVkSW50ZXJwb2xhdGlvbkVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInMtc2ltcGxpZmllZC1pbnRlcnBvbGF0aW9uXCIpIGFzIEhUTUxDYW52YXNFbGVtZW50O1xuY29uc3QgY29udHJvbFBvaW50c0ludGVycG9sYXRpb25FbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzLWNvbnRyb2wtcG9pbnRzLWludGVycG9sYXRpb25cIikgYXMgSFRNTENhbnZhc0VsZW1lbnQ7XG5jb25zdCBzaW1wbGlmaWVkSW50ZXJwb2xhdGlvbkRvbmVFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzLXNpbXBsaWZpZWQtaW50ZXJwb2xhdGlvbi1kb25lXCIpIGFzIEhUTUxDYW52YXNFbGVtZW50O1xuY29uc3QgY29udHJvbFBvaW50c0ludGVycG9sYXRpb25Eb25lRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicy1jb250cm9sLXBvaW50cy1pbnRlcnBvbGF0aW9uLWRvbmVcIikgYXMgSFRNTENhbnZhc0VsZW1lbnQ7XG5cbmNvbnN0IGRyYXdpbmdDYW52YXNNYW5hZ2VyID0gbmV3IENhbnZhc01hbmFnZXIoZHJhd2luZ0NhbnZhc0VsZW1lbnQpO1xuY29uc3QgZHJhd2luZ1BvaW50c0NhbnZhc01hbmFnZXIgPSBuZXcgQ2FudmFzTWFuYWdlcihkcmF3aW5nUG9pbnRzQ2FudmFzRWxlbWVudCk7XG5jb25zdCBzaW1wbGlmaWVkTWFuYWdlciA9IG5ldyBDYW52YXNNYW5hZ2VyKHNpbXBsaWZpZWRDYW52YXNFbGVtZW50KTtcbmNvbnN0IGNvbnRyb2xQb2ludHNNYW5hZ2VyID0gbmV3IENhbnZhc01hbmFnZXIoY29udHJvbFBvaW50c0NhbnZhc0VsZW1lbnQpO1xuY29uc3Qgc2ltcGxpZmllZEludGVycG9sYXRpb25NYW5hZ2VyID0gbmV3IENhbnZhc01hbmFnZXIoc2ltcGxpZmllZEludGVycG9sYXRpb25FbGVtZW50KTtcbmNvbnN0IGNvbnRyb2xQb2ludHNJbnRlcnBvbGF0aW9uTWFuYWdlciA9IG5ldyBDYW52YXNNYW5hZ2VyKGNvbnRyb2xQb2ludHNJbnRlcnBvbGF0aW9uRWxlbWVudCk7XG5jb25zdCBzaW1wbGlmaWVkSW50ZXJwb2xhdGlvbkRvbmVNYW5hZ2VyID0gbmV3IENhbnZhc01hbmFnZXIoc2ltcGxpZmllZEludGVycG9sYXRpb25Eb25lRWxlbWVudCk7XG5jb25zdCBjb250cm9sUG9pbnRzSW50ZXJwb2xhdGlvbkRvbmVNYW5hZ2VyID0gbmV3IENhbnZhc01hbmFnZXIoY29udHJvbFBvaW50c0ludGVycG9sYXRpb25Eb25lRWxlbWVudCk7XG5cbmNvbnN0IHNwbGluZSA9IG5ldyBTcGxpbmUoKTtcbmxldCBuYkNvbnRyb2xQb2ludHMgPSA0O1xubGV0IG1pbkFuZ2xlID0gMTtcbmxldCBtaW5Ob3JtID0gMjA7XG5sZXQgbmJJbnRlcnBvbGF0aW9uUG9pbnRzID0gMztcbmNvbnN0IGludGVycG9sYXRpb25GbiA9IChwQTogUG9pbnQyRCwgcEI6IFBvaW50MkQsIHBDOiBQb2ludDJELCBwRDogUG9pbnQyRCwgc3BsaW5lOiBTcGxpbmUpID0+IHtcbiAgICBpZiAobmJJbnRlcnBvbGF0aW9uUG9pbnRzID49IDApIHJldHVybiBuYkludGVycG9sYXRpb25Qb2ludHM7XG5cbiAgICBjb25zdCBwb2x5Z29uID0gbmV3IFBvbHlnb24ocEEsIHBCLCBwQywgcEQpO1xuICAgIGNvbnN0IGFyZWFzID0gc3BsaW5lLmFyZWFzLmZpbHRlcigoeCkgPT4gIHtcbiAgICAgICAgcmV0dXJuIE1hdGguYWJzKHgpICE9IEluZmluaXR5ICYmICFOdW1iZXIuaXNOYU4oeCk7XG4gICAgfSkuc29ydCgpLnJldmVyc2UoKTtcblxuICAgIGxldCByZXMgPSBwb2x5Z29uLmFyZWEoKSAvIGFyZWFzWzBdO1xuXG4gICAgaWYgKE51bWJlci5pc05hTihyZXMpKSByZXMgPSAwO1xuICAgIGlmIChNYXRoLmFicyhyZXMpID49IEluZmluaXR5KSByZXMgPSAwO1xuXG4gICAgcmVzICo9IDU7XG5cbiAgICByZXMgPSBNYXRoLm1heChyZXMsIDApO1xuICAgIHJlcyA9IE1hdGgubWluKHJlcywgMTAwKTtcblxuICAgIHJldHVybiBNYXRoLmNlaWwocmVzKTtcbn07XG5cbmZ1bmN0aW9uIGNsZWFyQWxsKCkge1xuICAgIGRyYXdpbmdDYW52YXNNYW5hZ2VyLmNsZWFyKCk7XG4gICAgc2ltcGxpZmllZE1hbmFnZXIuY2xlYXIoKTtcbiAgICBjb250cm9sUG9pbnRzTWFuYWdlci5jbGVhcigpO1xuICAgIHNpbXBsaWZpZWRJbnRlcnBvbGF0aW9uTWFuYWdlci5jbGVhcigpO1xuICAgIGNvbnRyb2xQb2ludHNJbnRlcnBvbGF0aW9uTWFuYWdlci5jbGVhcigpO1xuICAgIHNpbXBsaWZpZWRJbnRlcnBvbGF0aW9uRG9uZU1hbmFnZXIuY2xlYXIoKTtcbiAgICBjb250cm9sUG9pbnRzSW50ZXJwb2xhdGlvbkRvbmVNYW5hZ2VyLmNsZWFyKCk7XG4gICAgZHJhd2luZ1BvaW50c0NhbnZhc01hbmFnZXIuY2xlYXIoKTtcbn1cblxuZnVuY3Rpb24gdXBkYXRlKCkge1xuICAgIGNsZWFyQWxsKCk7XG5cbiAgICBkcmF3aW5nQ2FudmFzTWFuYWdlci5kcmF3TGluZShzcGxpbmUucG9pbnRzLCBcImJsYWNrXCIsIDMpO1xuXG4gICAgZHJhd2luZ1BvaW50c0NhbnZhc01hbmFnZXIuZHJhd0xpbmUoc3BsaW5lLnBvaW50cywgXCJibGFja1wiLCAxKTtcbiAgICBkcmF3aW5nUG9pbnRzQ2FudmFzTWFuYWdlci5kcmF3UG9pbnRzKHNwbGluZS5wb2ludHMsIDIsIFwicmVkXCIsIFwicmVkXCIpO1xuXG4gICAgY29uc3Qgc2ltcGxpZmllZFNwbGluZSA9IHNwbGluZS5jb3B5KCkuc2ltcGxpZnkobWluTm9ybSwgbWluQW5nbGUpO1xuICAgIGNvbnN0IGNvbnRyb2xQb2ludHMgPSBzaW1wbGlmaWVkU3BsaW5lLmNvbnRyb2xQb2ludHMoc3BsaW5lLmFyZWFzLCBuYkNvbnRyb2xQb2ludHMpO1xuICAgIHNpbXBsaWZpZWRNYW5hZ2VyLmRyYXdMaW5lKHNpbXBsaWZpZWRTcGxpbmUucG9pbnRzLCBcImJsYWNrXCIsIDEpO1xuICAgIHNpbXBsaWZpZWRNYW5hZ2VyLmRyYXdQb2ludHMoc2ltcGxpZmllZFNwbGluZS5wb2ludHMsIDMsIFwicmVkXCIsIFwicmVkXCIpO1xuICAgIHNpbXBsaWZpZWRNYW5hZ2VyLmRyYXdQb2ludHMoY29udHJvbFBvaW50cywgNSwgXCJyZWRcIiwgXCJibGFja1wiLCAyKTtcblxuICAgIGNvbnN0IGNvbnRyb2xQb2ludHNTcGxpbmUgPSBuZXcgU3BsaW5lKGNvbnRyb2xQb2ludHMpO1xuICAgIGNvbnRyb2xQb2ludHNNYW5hZ2VyLmRyYXdMaW5lKGNvbnRyb2xQb2ludHNTcGxpbmUucG9pbnRzLCBcImJsYWNrXCIsIDEpO1xuICAgIGNvbnRyb2xQb2ludHNNYW5hZ2VyLmRyYXdQb2ludHMoY29udHJvbFBvaW50c1NwbGluZS5wb2ludHMsIDUsIFwicmVkXCIsIFwiYmxhY2tcIiwgMik7XG5cbiAgICBjb25zdCBpbnRlcnBvbGF0ZWRTaW1wbGlmaWVkU3BsaW5lID0gc2ltcGxpZmllZFNwbGluZS5jb3B5KCkuY2F0bXVsbFJvbUludGVycG9sYXRpb24oaW50ZXJwb2xhdGlvbkZuKTtcbiAgICBzaW1wbGlmaWVkSW50ZXJwb2xhdGlvbk1hbmFnZXIuZHJhd0xpbmUoaW50ZXJwb2xhdGVkU2ltcGxpZmllZFNwbGluZS5wb2ludHMsIFwiYmxhY2tcIiwgMyk7XG4gICAgc2ltcGxpZmllZEludGVycG9sYXRpb25NYW5hZ2VyLmRyYXdQb2ludHMoaW50ZXJwb2xhdGVkU2ltcGxpZmllZFNwbGluZS5wb2ludHMsIDIsIFwiZ3JlZW5cIiwgXCJncmVlblwiKTtcbiAgICBzaW1wbGlmaWVkSW50ZXJwb2xhdGlvbk1hbmFnZXIuZHJhd1BvaW50cyhzaW1wbGlmaWVkU3BsaW5lLnBvaW50cywgMSwgXCJyZWRcIiwgXCJyZWRcIik7XG4gICAgc2ltcGxpZmllZEludGVycG9sYXRpb25NYW5hZ2VyLmRyYXdQb2ludHMoY29udHJvbFBvaW50cywgNSwgXCJyZWRcIiwgXCJibGFja1wiLCAyKTtcblxuICAgIGNvbnN0IGludGVycG9sYXRlZENvbnRyb2xQb2ludHNTcGxpbmUgPSBjb250cm9sUG9pbnRzU3BsaW5lLmNvcHkoKS5jYXRtdWxsUm9tSW50ZXJwb2xhdGlvbihpbnRlcnBvbGF0aW9uRm4pO1xuICAgIGNvbnRyb2xQb2ludHNJbnRlcnBvbGF0aW9uTWFuYWdlci5kcmF3TGluZShpbnRlcnBvbGF0ZWRDb250cm9sUG9pbnRzU3BsaW5lLnBvaW50cywgXCJibGFja1wiLCAxKTtcbiAgICBjb250cm9sUG9pbnRzSW50ZXJwb2xhdGlvbk1hbmFnZXIuZHJhd1BvaW50cyhpbnRlcnBvbGF0ZWRDb250cm9sUG9pbnRzU3BsaW5lLnBvaW50cywgMiwgXCJncmVlblwiLCBcImdyZWVuXCIpO1xuICAgIGNvbnRyb2xQb2ludHNJbnRlcnBvbGF0aW9uTWFuYWdlci5kcmF3UG9pbnRzKGNvbnRyb2xQb2ludHMsIDUsIFwicmVkXCIsIFwiYmxhY2tcIiwgMik7XG5cbiAgICBjb250cm9sUG9pbnRzSW50ZXJwb2xhdGlvbkRvbmVNYW5hZ2VyLmRyYXdMaW5lKGludGVycG9sYXRlZENvbnRyb2xQb2ludHNTcGxpbmUucG9pbnRzLCBcImJsYWNrXCIsIDMpO1xuICAgIHNpbXBsaWZpZWRJbnRlcnBvbGF0aW9uRG9uZU1hbmFnZXIuZHJhd0xpbmUoaW50ZXJwb2xhdGVkU2ltcGxpZmllZFNwbGluZS5wb2ludHMsIFwiYmxhY2tcIiwgMyk7XG5cbiAgICBpZiAoc3BsaW5lLnBvaW50cy5sZW5ndGggPiAwKSB7XG4gICAgICAgIGNvbnRyb2xQb2ludHNQZXJjZW50YWdlRWxlbWVudC5pbm5lckhUTUwgPSBcIihcIiArICgxMDAgLSBjb250cm9sUG9pbnRzU3BsaW5lLnBvaW50cy5sZW5ndGggLyBzcGxpbmUucG9pbnRzLmxlbmd0aCAqIDEwMCkudG9GaXhlZCgyKS50b1N0cmluZygpICsgXCIlIGRlIGNvbXByZXNzaW9uKVwiO1xuICAgICAgICBzaW1wbGlmaWVkUGVyY2VudGFnZUVsZW1lbnQuaW5uZXJIVE1MID0gXCIoXCIgKyAoMTAwIC0gc2ltcGxpZmllZFNwbGluZS5wb2ludHMubGVuZ3RoIC8gc3BsaW5lLnBvaW50cy5sZW5ndGggKiAxMDApLnRvRml4ZWQoMikudG9TdHJpbmcoKSArIFwiJSBkZSBjb21wcmVzc2lvbilcIjtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIG1vdXNlTW92ZShlOiBNb3VzZUV2ZW50KSB7XG4gICAgaWYgKCFkcmF3aW5nQ2FudmFzTWFuYWdlci5pc0RyYXdpbmcpIHJldHVybjtcblxuICAgIHNwbGluZS5hZGRQb2ludChkcmF3aW5nQ2FudmFzTWFuYWdlci5nZXRQb2ludChlKSk7XG4gICAgdXBkYXRlKCk7XG59XG5cbmZ1bmN0aW9uIG1vdXNlRG93bihlOiBNb3VzZUV2ZW50KSB7XG4gICAgZHJhd2luZ0NhbnZhc01hbmFnZXIuaXNEcmF3aW5nID0gdHJ1ZTtcbiAgICBzcGxpbmUuY2xlYXIoKTtcblxuICAgIG1vdXNlTW92ZShlKTtcbn1cblxuZnVuY3Rpb24gbW91c2VVcChlOiBNb3VzZUV2ZW50KSB7XG4gICAgZHJhd2luZ0NhbnZhc01hbmFnZXIuaXNEcmF3aW5nID0gZmFsc2U7XG59XG5cbmRyYXdpbmdDYW52YXNFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW1vdmVcIiwgbW91c2VNb3ZlKTtcbmRyYXdpbmdDYW52YXNFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgbW91c2VEb3duKTtcbmRyYXdpbmdDYW52YXNFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZXVwXCIsIG1vdXNlVXApO1xuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNldXBcIiwgbW91c2VVcCk7XG5cbmZ1bmN0aW9uIG9uQ2hhbmdlKCkge1xuICAgIG5iQ29udHJvbFBvaW50cyA9IE51bWJlcihuYkNvbnRyb2xQb2ludHNFbGVtZW50LnZhbHVlKTtcbiAgICBtaW5BbmdsZSA9IE51bWJlcihtaW5BbmdsZUVsZW1lbnQudmFsdWUpO1xuICAgIG1pbk5vcm0gPSBOdW1iZXIobWluTm9ybUVsZW1lbnQudmFsdWUpO1xuICAgIG5iSW50ZXJwb2xhdGlvblBvaW50cyA9IE51bWJlcihuYkludGVycG9sYXRpb25Qb2ludHNFbGVtZW50LnZhbHVlKTtcblxuICAgIHVwZGF0ZSgpO1xufVxuXG5uYkNvbnRyb2xQb2ludHNFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgb25DaGFuZ2UpO1xubWluQW5nbGVFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgb25DaGFuZ2UpO1xubWluTm9ybUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCBvbkNoYW5nZSk7XG5uYkludGVycG9sYXRpb25Qb2ludHNFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgb25DaGFuZ2UpO1xuXG5uYkNvbnRyb2xQb2ludHNFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXl1cFwiLCBvbkNoYW5nZSk7XG5taW5BbmdsZUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImtleXVwXCIsIG9uQ2hhbmdlKTtcbm1pbk5vcm1FbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXl1cFwiLCBvbkNoYW5nZSk7XG5uYkludGVycG9sYXRpb25Qb2ludHNFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXl1cFwiLCBvbkNoYW5nZSk7XG5cbm9uQ2hhbmdlKCk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=
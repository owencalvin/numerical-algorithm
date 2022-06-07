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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0FBQyxTQUFTLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFDMUQsUUFBUSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUMsQ0FBQztBQUU5QyxTQUFTLFFBQVE7SUFDYixlQUFlLEdBQUcsTUFBTSxDQUFDLHNCQUFzQixDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3ZELFFBQVEsR0FBRyxNQUFNLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3pDLE9BQU8sR0FBRyxNQUFNLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3ZDLHFCQUFxQixHQUFHLE1BQU0sQ0FBQyw0QkFBNEIsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUVuRSxNQUFNLEVBQUUsQ0FBQztBQUNiLENBQUM7QUFFRCxzQkFBc0IsQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLENBQUM7QUFDNUQsZUFBZSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsQ0FBQztBQUNyRCxjQUFjLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0FBQ3BELDRCQUE0QixDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsQ0FBQztBQUVsRSxzQkFBc0IsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsUUFBUSxDQUFDLENBQUM7QUFDM0QsZUFBZSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxRQUFRLENBQUMsQ0FBQztBQUNwRCxjQUFjLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0FBQ25ELDRCQUE0QixDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxRQUFRLENBQUMsQ0FBQztBQUVqRSxRQUFRLEVBQUUsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL21hdGhfc3BlLy4vc3JjL2NsYXNzZXMvVmVjdG9yMkQudHMiLCJ3ZWJwYWNrOi8vbWF0aF9zcGUvLi9zcmMvY2xhc3Nlcy9Qb2x5Z29uLnRzIiwid2VicGFjazovL21hdGhfc3BlLy4vc3JjL2NsYXNzZXMvU3BsaW5lLnRzIiwid2VicGFjazovL21hdGhfc3BlLy4vc3JjL2NsYXNzZXMvQ2FudmFzTWFuYWdlci50cyIsIndlYnBhY2s6Ly9tYXRoX3NwZS8uL3NyYy9BTjIwMjJfU3BsaW5lLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7UG9pbnQyRH0gZnJvbSBcIi4vUG9pbnQyRFwiO1xuXG5leHBvcnQgY2xhc3MgVmVjdG9yMkQge1xuICAgIHByaXZhdGUgX3g6IG51bWJlcjtcbiAgICBwcml2YXRlIF95OiBudW1iZXI7XG5cbiAgICBjb25zdHJ1Y3Rvcihwb2ludDogUG9pbnQyRCk7XG4gICAgY29uc3RydWN0b3Ioc3RhcnQ6IFBvaW50MkQsIGVuZDogUG9pbnQyRCk7XG4gICAgY29uc3RydWN0b3Ioc3RhcnQ6IFBvaW50MkQsIGVuZD86IFBvaW50MkQpIHtcbiAgICAgICAgaWYgKGVuZCkge1xuICAgICAgICAgICAgdGhpcy5feCA9IGVuZC54IC0gc3RhcnQueDtcbiAgICAgICAgICAgIHRoaXMuX3kgPSBlbmQueSAtIHN0YXJ0Lnk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl94ID0gc3RhcnQueDtcbiAgICAgICAgICAgIHRoaXMuX3kgPSBzdGFydC55O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0IG5vcm0oKSB7XG4gICAgICAgIHJldHVybiBNYXRoLnNxcnQodGhpcy5feCAqKiAyICsgdGhpcy5feSAqKiAyKTtcbiAgICB9XG5cbiAgICBnZXQgeCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3g7XG4gICAgfVxuXG4gICAgZ2V0IHkoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl95O1xuICAgIH1cblxuICAgIG5vcm1hbCgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBWZWN0b3IyRCh7XG4gICAgICAgICAgICB4OiAtdGhpcy5feSxcbiAgICAgICAgICAgIHk6IHRoaXMuX3hcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZG90UHJvZHVjdCh2ZWN0b3I6IFZlY3RvcjJEKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl94ICogdmVjdG9yLl94ICsgdGhpcy5feSAqIHZlY3Rvci5feTtcbiAgICB9XG5cbiAgICBhbmdsZSh2ZWN0b3I6IFZlY3RvcjJEKSB7XG4gICAgICAgIHJldHVybiBNYXRoLmFjb3ModGhpcy5kb3RQcm9kdWN0KHZlY3RvcikgLyAodGhpcy5ub3JtICogdmVjdG9yLm5vcm0pKTtcbiAgICB9XG5cbiAgICBtdWx0aXBseShmYWN0b3I6IG51bWJlcikge1xuICAgICAgICByZXR1cm4gbmV3IFZlY3RvcjJEKHtcbiAgICAgICAgICAgIHg6IGZhY3RvciAqIHRoaXMuX3gsXG4gICAgICAgICAgICB5OiBmYWN0b3IgKiB0aGlzLl95XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGFkZChwb2ludDogVmVjdG9yMkQpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBWZWN0b3IyRCh7XG4gICAgICAgICAgICB4OiB0aGlzLl94ICsgcG9pbnQuX3gsXG4gICAgICAgICAgICB5OiB0aGlzLl95ICsgcG9pbnQuX3lcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgc3Vic3RyYWN0KHBvaW50OiBWZWN0b3IyRCkge1xuICAgICAgICByZXR1cm4gdGhpcy5hZGQodGhpcy5tdWx0aXBseSgtMSkpO1xuICAgIH1cblxuICAgIGNvcHkoKSB7XG4gICAgICAgIHJldHVybiBuZXcgVmVjdG9yMkQoe1xuICAgICAgICAgICAgeDogdGhpcy5feCxcbiAgICAgICAgICAgIHk6IHRoaXMuX3lcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgc3RhdGljIGFyZWEocHJldmlvdXNQb2ludDogUG9pbnQyRCwgY3VycmVudFBvaW50OiBQb2ludDJELCBuZXh0UG9pbnQ6IFBvaW50MkQpIHtcbiAgICAgICAgY29uc3QgdkJBID0gbmV3IFZlY3RvcjJEKGN1cnJlbnRQb2ludCwgcHJldmlvdXNQb2ludCk7XG4gICAgICAgIGNvbnN0IHZCQyA9IG5ldyBWZWN0b3IyRChjdXJyZW50UG9pbnQsIG5leHRQb2ludCk7XG4gICAgICAgIGNvbnN0IHZBQyA9IG5ldyBWZWN0b3IyRChwcmV2aW91c1BvaW50LCBuZXh0UG9pbnQpO1xuXG4gICAgICAgIGNvbnN0IHMgPSAodkFDLm5vcm0gKyB2QkEubm9ybSArIHZCQy5ub3JtKSAvIDI7XG4gICAgICAgIHJldHVybiBNYXRoLnNxcnQocyAqIChzIC0gdkFDLm5vcm0pICogKHMgLSB2QkEubm9ybSkgKiAocyAtIHZCQy5ub3JtKSk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHtQb2ludDJEfSBmcm9tIFwiLi9Qb2ludDJEXCI7XG5cbmV4cG9ydCBjbGFzcyBQb2x5Z29uIHtcbiAgICBwcml2YXRlIF9wb2ludHM6IFBvaW50MkRbXTtcblxuICAgIGNvbnN0cnVjdG9yKC4uLnBvaW50czogUG9pbnQyRFtdKSB7XG4gICAgICAgIHRoaXMuX3BvaW50cyA9IHBvaW50cztcbiAgICB9XG5cbiAgICBhcmVhKCkge1xuICAgICAgICBsZXQgYXJlYSA9IDAuMDtcbiAgICAgICAgbGV0IGogPSB0aGlzLl9wb2ludHMubGVuZ3RoIC0gMTtcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX3BvaW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgYXJlYSArPSAodGhpcy5fcG9pbnRzW2pdLnggKyB0aGlzLl9wb2ludHNbaV0ueCkgKiAodGhpcy5fcG9pbnRzW2pdLnkgLSB0aGlzLl9wb2ludHNbaV0ueSk7XG4gICAgICAgICAgICBqID0gaTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBNYXRoLmFicyhhcmVhIC8gMi4wKTtcbiAgICB9XG59XG5cbiIsImltcG9ydCB7VmVjdG9yMkR9IGZyb20gXCIuL1ZlY3RvcjJEXCI7XG5pbXBvcnQge1BvaW50MkR9IGZyb20gXCIuL1BvaW50MkRcIjtcbmltcG9ydCB7UG9seWdvbn0gZnJvbSBcIi4vUG9seWdvblwiO1xuXG5leHBvcnQgY2xhc3MgU3BsaW5lIHtcbiAgICBwcml2YXRlIF9wb2ludHM6IFBvaW50MkRbXTtcblxuICAgIGNvbnN0cnVjdG9yKHBvaW50czogUG9pbnQyRFtdID0gW10pIHtcbiAgICAgICAgdGhpcy5fcG9pbnRzID0gcG9pbnRzO1xuICAgIH1cblxuICAgIGdldCBwb2ludHMoKTogcmVhZG9ubHkgUG9pbnQyRFtdIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3BvaW50cztcbiAgICB9XG5cbiAgICBnZXQgcG9pbnRMZW5ndGgoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9wb2ludHMubGVuZ3RoO1xuICAgIH1cblxuICAgIGdldCBsYXN0UG9pbnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9wb2ludHNbdGhpcy5wb2ludExlbmd0aCAtIDFdO1xuICAgIH1cblxuICAgIGdldCBiZWZvcmVMYXN0UG9pbnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9wb2ludHNbdGhpcy5wb2ludExlbmd0aCAtIDJdO1xuICAgIH1cblxuICAgIGZpbmRQb2ludChwb2ludDogUG9pbnQyRCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcG9pbnRzLmZpbmQoKHAyKSA9PiBwb2ludC54ID09IHAyLnggJiYgcG9pbnQueSA9PSBwMi55KTtcbiAgICB9XG5cbiAgICBhZGRQb2ludChwb2ludDogUG9pbnQyRCkge1xuICAgICAgICB0aGlzLl9wb2ludHMgPSBbXG4gICAgICAgICAgICAuLi50aGlzLl9wb2ludHMsXG4gICAgICAgICAgICBwb2ludFxuICAgICAgICBdO1xuICAgIH1cblxuICAgIGNsZWFyKCkge1xuICAgICAgICB0aGlzLl9wb2ludHMgPSBbXTtcbiAgICB9XG5cbiAgICBzaW1wbGlmeShtaW5Ob3JtOiBudW1iZXIsIG1pbkFuZ2xlOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5fcG9pbnRzID0gdGhpcy5fcG9pbnRzLnJlZHVjZTxQb2ludDJEW10+KChwcmV2LCBpdGVtKSA9PiB7XG4gICAgICAgICAgICBpZiAocHJldi5sZW5ndGggPD0gMykgcmV0dXJuIFsuLi5wcmV2LCBpdGVtXTtcblxuICAgICAgICAgICAgY29uc3QgYmVmb3JlTGFzdFBvaW50ID0gcHJldltwcmV2Lmxlbmd0aCAtIDJdO1xuICAgICAgICAgICAgY29uc3QgbGFzdFBvaW50ID0gcHJldltwcmV2Lmxlbmd0aCAtIDFdO1xuICAgICAgICAgICAgY29uc3QgdkFDID0gbmV3IFZlY3RvcjJEKGJlZm9yZUxhc3RQb2ludCwgaXRlbSk7XG4gICAgICAgICAgICBjb25zdCB2QUIgPSBuZXcgVmVjdG9yMkQoYmVmb3JlTGFzdFBvaW50LCBsYXN0UG9pbnQpO1xuICAgICAgICAgICAgY29uc3QgdkJDID0gbmV3IFZlY3RvcjJEKGxhc3RQb2ludCwgaXRlbSk7XG5cbiAgICAgICAgICAgIGlmICh2QUMubm9ybSA8IG1pbk5vcm0pIHByZXYucG9wKCk7XG5cbiAgICAgICAgICAgIGNvbnN0IGRlZ0FuZ2xlID0gdkFCLmFuZ2xlKHZCQykgKiAxODAgLyBNYXRoLlBJO1xuXG4gICAgICAgICAgICBpZiAoZGVnQW5nbGUgPCBtaW5BbmdsZSkgcHJldi5wb3AoKTtcblxuICAgICAgICAgICAgcHJldi5wdXNoKGl0ZW0pO1xuXG4gICAgICAgICAgICByZXR1cm4gcHJldjtcbiAgICAgICAgfSwgW10pO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGdldCBhbmdsZXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9wb2ludHMubWFwKChjdXJyZW50UG9pbnQsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICBpZiAoaW5kZXggKyAxIDw9IDEgfHwgaW5kZXggKyAxID49IHRoaXMuX3BvaW50cy5sZW5ndGgpIHJldHVybiBJbmZpbml0eTtcblxuICAgICAgICAgICAgY29uc3QgbGFzdFBvaW50ID0gdGhpcy5fcG9pbnRzW2luZGV4IC0gMV07XG4gICAgICAgICAgICBjb25zdCBuZXh0UG9pbnQgPSB0aGlzLl9wb2ludHNbaW5kZXggKyAxXTtcblxuICAgICAgICAgICAgY29uc3QgdkJBID0gbmV3IFZlY3RvcjJEKGN1cnJlbnRQb2ludCwgbGFzdFBvaW50KTtcbiAgICAgICAgICAgIGNvbnN0IHZCQyA9IG5ldyBWZWN0b3IyRChjdXJyZW50UG9pbnQsIG5leHRQb2ludCk7XG5cbiAgICAgICAgICAgIHJldHVybiB2QkEuYW5nbGUodkJDKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZ2V0IGFyZWFzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcG9pbnRzLm1hcCgoY3VycmVudFBvaW50LCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgaWYgKGluZGV4ICsgMSA8PSAxIHx8IGluZGV4ICsgMSA+PSB0aGlzLl9wb2ludHMubGVuZ3RoKSByZXR1cm4gSW5maW5pdHk7XG5cbiAgICAgICAgICAgIGNvbnN0IHByZXZpb3VzUG9pbnQgPSB0aGlzLl9wb2ludHNbaW5kZXggLSAxXTtcbiAgICAgICAgICAgIGNvbnN0IG5leHRQb2ludCA9IHRoaXMuX3BvaW50c1tpbmRleCArIDFdO1xuXG4gICAgICAgICAgICBjb25zdCBwb2x5Z29uID0gbmV3IFBvbHlnb24ocHJldmlvdXNQb2ludCwgY3VycmVudFBvaW50LCBuZXh0UG9pbnQpO1xuICAgICAgICAgICAgcmV0dXJuIHBvbHlnb24uYXJlYSgpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBjb250cm9sUG9pbnRzKHZhbHVlczogbnVtYmVyW10sIG51bWJlck9mQ29udHJvbFBvaW50czogbnVtYmVyKSB7XG4gICAgICAgIG51bWJlck9mQ29udHJvbFBvaW50cyA9IE1hdGgubWF4KG51bWJlck9mQ29udHJvbFBvaW50cywgMik7XG5cbiAgICAgICAgY29uc3QgdmFsdWVzV2l0aEluZGV4ZXMgPSB0aGlzLmFyZWFzLm1hcCgodmFsdWUsIGluZGV4KSA9PiBbdmFsdWUsIGluZGV4XSk7XG5cbiAgICAgICAgdmFsdWVzV2l0aEluZGV4ZXMuc29ydCgoYSwgYikgPT4ge1xuICAgICAgICAgICAgaWYgKE51bWJlci5pc05hTihiWzBdKSkgcmV0dXJuIC0xO1xuXG4gICAgICAgICAgICBpZiAoYVswXSA8IGJbMF0pIHJldHVybiAxO1xuICAgICAgICAgICAgZWxzZSBpZiAoYVswXSA+IGJbMF0pIHJldHVybiAtMTtcbiAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gdmFsdWVzV2l0aEluZGV4ZXNcbiAgICAgICAgICAgIC5zbGljZSgwLCBudW1iZXJPZkNvbnRyb2xQb2ludHMpXG4gICAgICAgICAgICAuc29ydCgoYSwgYikgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChhWzFdIDwgYlsxXSkgcmV0dXJuIDE7XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoYVsxXSA+IGJbMV0pIHJldHVybiAtMTtcbiAgICAgICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAubWFwKCh4KSA9PiB0aGlzLl9wb2ludHNbeFsxXV0pO1xuICAgIH1cblxuICAgIHRyYW5zbGF0ZSh4OiBudW1iZXIsIHk6IG51bWJlcikge1xuICAgICAgICB0aGlzLl9wb2ludHMgPSB0aGlzLl9wb2ludHMubWFwKChwb2ludCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICB4OiBwb2ludC54ICsgeCxcbiAgICAgICAgICAgICAgICB5OiBwb2ludC55ICsgeVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgY29weSgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBTcGxpbmUodGhpcy5fcG9pbnRzKTtcbiAgICB9XG5cbiAgICBjYXRtdWxsUm9tSW50ZXJwb2xhdGlvbihcbiAgICAgICAgbmJJbnRlcnBvbGF0aW9uUG9pbnRzRm46IChwQTogUG9pbnQyRCwgcEI6IFBvaW50MkQsIHBDOiBQb2ludDJELCBwRDogUG9pbnQyRCwgc3BsaW5lOiBTcGxpbmUpID0+IG51bWJlclxuICAgICkge1xuICAgICAgICBpZiAodGhpcy5fcG9pbnRzLmxlbmd0aCA8IDMpIHJldHVybiB0aGlzO1xuXG4gICAgICAgIHRoaXMuX3BvaW50cyA9IHRoaXMuX3BvaW50cy5yZWR1Y2U8UG9pbnQyRFtdPigocHJldiwgcEMsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBhZGQgPSAocHk6IFBvaW50MkQpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoIXByZXYuZmluZCgocHgpID0+IHB4Py54ID09PSBweT8ueCAmJiBweD8ueSA9PT0gcHk/LnkpKSB7XG4gICAgICAgICAgICAgICAgICAgIHByZXYucHVzaChweSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgaWYgKGluZGV4IDw9IDApIHJldHVybiBwcmV2O1xuXG4gICAgICAgICAgICBsZXQgcEE6IFBvaW50MkQ7XG4gICAgICAgICAgICBsZXQgcEI6IFBvaW50MkQgPSB0aGlzLl9wb2ludHNbaW5kZXggLSAxXTtcbiAgICAgICAgICAgIGxldCBwRDogUG9pbnQyRDtcbiAgICAgICAgICAgIGlmIChpbmRleCA9PSAxKSB7XG4gICAgICAgICAgICAgICAgcEEgPSB0aGlzLl9wb2ludHNbaW5kZXggLSAxXTtcbiAgICAgICAgICAgICAgICBwRCA9IHRoaXMuX3BvaW50c1tpbmRleCArIDFdO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChpbmRleCA+IDEgJiYgaW5kZXggPCB0aGlzLl9wb2ludHMubGVuZ3RoIC0gMSkge1xuICAgICAgICAgICAgICAgIHBBID0gdGhpcy5fcG9pbnRzW2luZGV4IC0gMl07XG4gICAgICAgICAgICAgICAgcEQgPSB0aGlzLl9wb2ludHNbaW5kZXggKyAxXTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaW5kZXggPj0gdGhpcy5fcG9pbnRzLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgICAgICAgICBwQSA9IHRoaXMuX3BvaW50c1tpbmRleCAtIDJdO1xuICAgICAgICAgICAgICAgIHBEID0gdGhpcy5fcG9pbnRzW2luZGV4XTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgYWRkKHBBKTtcbiAgICAgICAgICAgIGFkZChwQik7XG5cbiAgICAgICAgICAgIGNvbnN0IG5iSW50ZXJwb2xhdGlvblBvaW50cyA9IG5iSW50ZXJwb2xhdGlvblBvaW50c0ZuKHBBLCBwQiwgcEMsIHBELCB0aGlzKSArIDI7XG5cbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAyOyBpIDwgbmJJbnRlcnBvbGF0aW9uUG9pbnRzOyBpKyspIHtcbiAgICAgICAgICAgICAgICBjb25zdCB0ID0gaSAvIG5iSW50ZXJwb2xhdGlvblBvaW50cztcblxuICAgICAgICAgICAgICAgIGNvbnN0IHBvaW50ID0ge1xuICAgICAgICAgICAgICAgICAgICB4OiBTcGxpbmUuY2F0bXVsbFJvbSh0LCBwQS54LCBwQi54LCBwQy54LCBwRC54KSxcbiAgICAgICAgICAgICAgICAgICAgeTogU3BsaW5lLmNhdG11bGxSb20odCwgcEEueSwgcEIueSwgcEMueSwgcEQueSlcbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgcHJldiA9IFtcbiAgICAgICAgICAgICAgICAgICAgLi4ucHJldixcbiAgICAgICAgICAgICAgICAgICAgcG9pbnQsXG4gICAgICAgICAgICAgICAgXTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgYWRkKHBDKTtcblxuICAgICAgICAgICAgcmV0dXJuIHByZXY7XG4gICAgICAgIH0sIFtdKTtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBzdGF0aWMgY2F0bXVsbFJvbSh0OiBudW1iZXIsIG1BOiBudW1iZXIsIG1COiBudW1iZXIsIG1DOiBudW1iZXIsIG1EOiBudW1iZXIpIHtcbiAgICAgICAgY29uc3QgYSA9IDMgKiBtQiAtIG1BIC0gMyAqIG1DICsgbUQ7XG4gICAgICAgIGNvbnN0IGIgPSAyICogbUEgLSA1ICogbUIgKyA0ICogbUMgLSBtRDtcbiAgICAgICAgY29uc3QgYyA9IChtQyAtIG1BKSAqIHQ7XG4gICAgICAgIGNvbnN0IGQgPSAyICogbUI7XG4gICAgICAgIGNvbnN0IGZpbmFsID0gYSAqIHQgKiogMyArIGIgKiB0ICoqIDIgKyBjICsgZDtcbiAgICAgICAgcmV0dXJuIDAuNSAqIGZpbmFsO1xuICAgIH1cbn1cbiIsImltcG9ydCB7U3BsaW5lfSBmcm9tIFwiLi9TcGxpbmVcIjtcbmltcG9ydCB7UG9pbnQyRH0gZnJvbSBcIi4vUG9pbnQyRFwiO1xuXG5leHBvcnQgY2xhc3MgQ2FudmFzTWFuYWdlciB7XG4gICAgcHJpdmF0ZSBfY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudDtcbiAgICBwcml2YXRlIF9jb250ZXh0OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQ7XG4gICAgcHJpdmF0ZSBfaXNEcmF3aW5nOiBib29sZWFuO1xuICAgIHByaXZhdGUgX3BpeGVsUmF0aW86IG51bWJlcjtcblxuICAgIGdldCBjYW52YXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jYW52YXM7XG4gICAgfVxuXG4gICAgZ2V0IHBpeGVsUmF0aW8oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9waXhlbFJhdGlvO1xuICAgIH1cblxuICAgIGdldCBjb250ZXh0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY29udGV4dDtcbiAgICB9XG5cbiAgICBnZXQgaXNEcmF3aW5nKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5faXNEcmF3aW5nO1xuICAgIH1cblxuICAgIHNldCBpc0RyYXdpbmcoaXNEcmF3aW5nOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuX2lzRHJhd2luZyA9IGlzRHJhd2luZztcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3RvcihjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50LCBzY2FsZUZhY3Rvcj86IG51bWJlcikge1xuICAgICAgICB0aGlzLl9pc0RyYXdpbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fY2FudmFzID0gY2FudmFzO1xuICAgICAgICB0aGlzLl9waXhlbFJhdGlvID0gc2NhbGVGYWN0b3IgfHwgd2luZG93LmRldmljZVBpeGVsUmF0aW8gfHwgMTtcblxuICAgICAgICBjb25zdCByZWN0ID0gdGhpcy5fY2FudmFzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICBjb25zdCBjb250ZXh0ID0gdGhpcy5fY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcblxuICAgICAgICB0aGlzLl9jYW52YXMuc3R5bGUud2lkdGggPSB0aGlzLl9jYW52YXMud2lkdGggKyAncHgnO1xuICAgICAgICB0aGlzLl9jYW52YXMuc3R5bGUuaGVpZ2h0ID0gdGhpcy5fY2FudmFzLmhlaWdodCArICdweCc7XG5cbiAgICAgICAgdGhpcy5fY2FudmFzLndpZHRoID0gcmVjdC53aWR0aCAqIHRoaXMuX3BpeGVsUmF0aW87XG4gICAgICAgIHRoaXMuX2NhbnZhcy5oZWlnaHQgPSByZWN0LmhlaWdodCAqIHRoaXMuX3BpeGVsUmF0aW87XG5cbiAgICAgICAgY29udGV4dC5zY2FsZSh0aGlzLl9waXhlbFJhdGlvLCB0aGlzLl9waXhlbFJhdGlvKTtcblxuICAgICAgICB0aGlzLl9jb250ZXh0ID0gY29udGV4dDtcbiAgICB9XG5cbiAgICBjbGVhcigpIHtcbiAgICAgICAgdGhpcy5jb250ZXh0LmNsZWFyUmVjdCgwLCAwLCB0aGlzLl9jb250ZXh0LmNhbnZhcy53aWR0aCwgdGhpcy5fY29udGV4dC5jYW52YXMuaGVpZ2h0KTtcbiAgICB9XG5cbiAgICBnZXRQb2ludChlOiBNb3VzZUV2ZW50KTogUG9pbnQyRCB7XG4gICAgICAgIGNvbnN0IHJlY3QgPSB0aGlzLl9jYW52YXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHg6IGUuY2xpZW50WCAtIHJlY3QubGVmdCxcbiAgICAgICAgICAgIHk6IGUuY2xpZW50WSAtIHJlY3QudG9wXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZHJhd1BvaW50KFxuICAgICAgICBwb2ludDogUG9pbnQyRCxcbiAgICAgICAgcmFkaXVzID0gNSxcbiAgICAgICAgZmlsbENvbG9yID0gXCJibGFja1wiLFxuICAgICAgICBzdHJva2VDb2xvciA9IFwiYmxhY2tcIixcbiAgICAgICAgbGluZVdpZHRoID0gMFxuICAgICkge1xuICAgICAgICBpZiAoIXBvaW50KSByZXR1cm47XG4gICAgICAgIHRoaXMuX2NvbnRleHQuYmVnaW5QYXRoKCk7XG4gICAgICAgIHRoaXMuX2NvbnRleHQubGluZVdpZHRoID0gbGluZVdpZHRoO1xuICAgICAgICB0aGlzLl9jb250ZXh0LmxpbmVDYXAgPSBcInJvdW5kXCI7XG4gICAgICAgIHRoaXMuX2NvbnRleHQuZmlsbFN0eWxlID0gZmlsbENvbG9yO1xuICAgICAgICB0aGlzLl9jb250ZXh0LnN0cm9rZVN0eWxlID0gc3Ryb2tlQ29sb3I7XG4gICAgICAgIHRoaXMuX2NvbnRleHQuYXJjKHBvaW50LngsIHBvaW50LnksIHJhZGl1cywgMCwgMiAqIE1hdGguUEkpO1xuICAgICAgICB0aGlzLl9jb250ZXh0LmZpbGwoKTtcbiAgICAgICAgdGhpcy5fY29udGV4dC5zdHJva2UoKTtcbiAgICAgICAgdGhpcy5fY29udGV4dC5jbG9zZVBhdGgoKTtcbiAgICB9XG5cbiAgICBkcmF3UG9pbnRzKFxuICAgICAgICBwb2ludHM6IFBvaW50MkRbXSB8IHJlYWRvbmx5IFBvaW50MkRbXSxcbiAgICAgICAgcmFkaXVzID0gNSxcbiAgICAgICAgZmlsbENvbG9yID0gXCJibGFja1wiLFxuICAgICAgICBzdHJva2VDb2xvciA9IFwiYmxhY2tcIixcbiAgICAgICAgbGluZVdpZHRoID0gMFxuICAgICkge1xuICAgICAgICBwb2ludHMuZm9yRWFjaCgocG9pbnQpID0+IHRoaXMuZHJhd1BvaW50KHBvaW50LCByYWRpdXMsIGZpbGxDb2xvciwgc3Ryb2tlQ29sb3IsIGxpbmVXaWR0aCkpO1xuICAgIH1cblxuICAgIGRyYXdMaW5lKFxuICAgICAgICBwb2ludHM6IFBvaW50MkRbXSB8IHJlYWRvbmx5IFBvaW50MkRbXSxcbiAgICAgICAgc3Ryb2tlQ29sb3IgPSBcImJsYWNrXCIsXG4gICAgICAgIGxpbmVXaWR0aCA9IDFcbiAgICApIHtcbiAgICAgICAgcG9pbnRzLmZvckVhY2goKHBvaW50LCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgaWYgKGluZGV4ID49IHBvaW50cy5sZW5ndGggLSAxKSByZXR1cm47XG5cbiAgICAgICAgICAgIHRoaXMuX2NvbnRleHQuYmVnaW5QYXRoKCk7XG4gICAgICAgICAgICB0aGlzLl9jb250ZXh0LmxpbmVXaWR0aCA9IGxpbmVXaWR0aDtcbiAgICAgICAgICAgIHRoaXMuX2NvbnRleHQubGluZUNhcCA9IFwicm91bmRcIjtcbiAgICAgICAgICAgIHRoaXMuX2NvbnRleHQuc3Ryb2tlU3R5bGUgPSBzdHJva2VDb2xvcjtcbiAgICAgICAgICAgIHRoaXMuX2NvbnRleHQubW92ZVRvKHBvaW50LngsIHBvaW50LnkpO1xuICAgICAgICAgICAgdGhpcy5fY29udGV4dC5saW5lVG8ocG9pbnRzW2luZGV4ICsgMV0ueCwgcG9pbnRzW2luZGV4ICsgMV0ueSk7XG4gICAgICAgICAgICB0aGlzLl9jb250ZXh0LnN0cm9rZSgpO1xuICAgICAgICAgICAgdGhpcy5fY29udGV4dC5jbG9zZVBhdGgoKTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHtTcGxpbmV9IGZyb20gXCIuL2NsYXNzZXMvU3BsaW5lXCI7XG5pbXBvcnQge0NhbnZhc01hbmFnZXJ9IGZyb20gXCIuL2NsYXNzZXMvQ2FudmFzTWFuYWdlclwiO1xuaW1wb3J0IHtWZWN0b3IyRH0gZnJvbSBcIi4vY2xhc3Nlcy9WZWN0b3IyRFwiO1xuaW1wb3J0IHtQb2ludDJEfSBmcm9tIFwiLi9jbGFzc2VzL1BvaW50MkRcIjtcbmltcG9ydCB7UG9seWdvbn0gZnJvbSBcIi4vY2xhc3Nlcy9Qb2x5Z29uXCI7XG5cbmNvbnN0IG5iQ29udHJvbFBvaW50c0VsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInMtbmItY29udHJvbC1wb2ludHNcIikgYXMgSFRNTElucHV0RWxlbWVudDtcbmNvbnN0IG1pbkFuZ2xlRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicy1hbmdsZVwiKSBhcyBIVE1MSW5wdXRFbGVtZW50O1xuY29uc3QgbWluTm9ybUVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInMtbm9ybVwiKSBhcyBIVE1MSW5wdXRFbGVtZW50O1xuY29uc3QgbmJJbnRlcnBvbGF0aW9uUG9pbnRzRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicy1pbnRlcnBvbGF0aW9uLXBvaW50c1wiKSBhcyBIVE1MSW5wdXRFbGVtZW50O1xuXG5jb25zdCBkcmF3aW5nQ2FudmFzRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicy1kcmF3aW5nXCIpIGFzIEhUTUxDYW52YXNFbGVtZW50O1xuY29uc3QgZHJhd2luZ1BvaW50c0NhbnZhc0VsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInMtZHJhd2luZy1wb2ludHNcIikgYXMgSFRNTENhbnZhc0VsZW1lbnQ7XG5jb25zdCBzaW1wbGlmaWVkQ2FudmFzRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicy1zaW1wbGlmaWVkXCIpIGFzIEhUTUxDYW52YXNFbGVtZW50O1xuY29uc3QgY29udHJvbFBvaW50c0NhbnZhc0VsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInMtY29udHJvbC1wb2ludHNcIikgYXMgSFRNTENhbnZhc0VsZW1lbnQ7XG5jb25zdCBzaW1wbGlmaWVkSW50ZXJwb2xhdGlvbkVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInMtc2ltcGxpZmllZC1pbnRlcnBvbGF0aW9uXCIpIGFzIEhUTUxDYW52YXNFbGVtZW50O1xuY29uc3QgY29udHJvbFBvaW50c0ludGVycG9sYXRpb25FbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzLWNvbnRyb2wtcG9pbnRzLWludGVycG9sYXRpb25cIikgYXMgSFRNTENhbnZhc0VsZW1lbnQ7XG5jb25zdCBzaW1wbGlmaWVkSW50ZXJwb2xhdGlvbkRvbmVFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzLXNpbXBsaWZpZWQtaW50ZXJwb2xhdGlvbi1kb25lXCIpIGFzIEhUTUxDYW52YXNFbGVtZW50O1xuY29uc3QgY29udHJvbFBvaW50c0ludGVycG9sYXRpb25Eb25lRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicy1jb250cm9sLXBvaW50cy1pbnRlcnBvbGF0aW9uLWRvbmVcIikgYXMgSFRNTENhbnZhc0VsZW1lbnQ7XG5cbmNvbnN0IGRyYXdpbmdDYW52YXNNYW5hZ2VyID0gbmV3IENhbnZhc01hbmFnZXIoZHJhd2luZ0NhbnZhc0VsZW1lbnQpO1xuY29uc3QgZHJhd2luZ1BvaW50c0NhbnZhc01hbmFnZXIgPSBuZXcgQ2FudmFzTWFuYWdlcihkcmF3aW5nUG9pbnRzQ2FudmFzRWxlbWVudCk7XG5jb25zdCBzaW1wbGlmaWVkTWFuYWdlciA9IG5ldyBDYW52YXNNYW5hZ2VyKHNpbXBsaWZpZWRDYW52YXNFbGVtZW50KTtcbmNvbnN0IGNvbnRyb2xQb2ludHNNYW5hZ2VyID0gbmV3IENhbnZhc01hbmFnZXIoY29udHJvbFBvaW50c0NhbnZhc0VsZW1lbnQpO1xuY29uc3Qgc2ltcGxpZmllZEludGVycG9sYXRpb25NYW5hZ2VyID0gbmV3IENhbnZhc01hbmFnZXIoc2ltcGxpZmllZEludGVycG9sYXRpb25FbGVtZW50KTtcbmNvbnN0IGNvbnRyb2xQb2ludHNJbnRlcnBvbGF0aW9uTWFuYWdlciA9IG5ldyBDYW52YXNNYW5hZ2VyKGNvbnRyb2xQb2ludHNJbnRlcnBvbGF0aW9uRWxlbWVudCk7XG5jb25zdCBzaW1wbGlmaWVkSW50ZXJwb2xhdGlvbkRvbmVNYW5hZ2VyID0gbmV3IENhbnZhc01hbmFnZXIoc2ltcGxpZmllZEludGVycG9sYXRpb25Eb25lRWxlbWVudCk7XG5jb25zdCBjb250cm9sUG9pbnRzSW50ZXJwb2xhdGlvbkRvbmVNYW5hZ2VyID0gbmV3IENhbnZhc01hbmFnZXIoY29udHJvbFBvaW50c0ludGVycG9sYXRpb25Eb25lRWxlbWVudCk7XG5cbmNvbnN0IHNwbGluZSA9IG5ldyBTcGxpbmUoKTtcbmxldCBuYkNvbnRyb2xQb2ludHMgPSA0O1xubGV0IG1pbkFuZ2xlID0gMTtcbmxldCBtaW5Ob3JtID0gMjA7XG5sZXQgbmJJbnRlcnBvbGF0aW9uUG9pbnRzID0gMztcbmNvbnN0IGludGVycG9sYXRpb25GbiA9IChwQTogUG9pbnQyRCwgcEI6IFBvaW50MkQsIHBDOiBQb2ludDJELCBwRDogUG9pbnQyRCwgc3BsaW5lOiBTcGxpbmUpID0+IHtcbiAgICBpZiAobmJJbnRlcnBvbGF0aW9uUG9pbnRzID49IDApIHJldHVybiBuYkludGVycG9sYXRpb25Qb2ludHM7XG5cbiAgICBjb25zdCBwb2x5Z29uID0gbmV3IFBvbHlnb24ocEEsIHBCLCBwQywgcEQpO1xuICAgIGNvbnN0IGFyZWFzID0gc3BsaW5lLmFyZWFzLmZpbHRlcigoeCkgPT4gIHtcbiAgICAgICAgcmV0dXJuIE1hdGguYWJzKHgpICE9IEluZmluaXR5ICYmICFOdW1iZXIuaXNOYU4oeCk7XG4gICAgfSkuc29ydCgpLnJldmVyc2UoKTtcblxuICAgIGxldCByZXMgPSBwb2x5Z29uLmFyZWEoKSAvIGFyZWFzWzBdO1xuXG4gICAgaWYgKE51bWJlci5pc05hTihyZXMpKSByZXMgPSAwO1xuICAgIGlmIChNYXRoLmFicyhyZXMpID49IEluZmluaXR5KSByZXMgPSAwO1xuXG4gICAgcmVzICo9IDU7XG5cbiAgICByZXMgPSBNYXRoLm1heChyZXMsIDApO1xuICAgIHJlcyA9IE1hdGgubWluKHJlcywgMTAwKTtcblxuICAgIHJldHVybiBNYXRoLmNlaWwocmVzKTtcbn07XG5cbmZ1bmN0aW9uIGNsZWFyQWxsKCkge1xuICAgIGRyYXdpbmdDYW52YXNNYW5hZ2VyLmNsZWFyKCk7XG4gICAgc2ltcGxpZmllZE1hbmFnZXIuY2xlYXIoKTtcbiAgICBjb250cm9sUG9pbnRzTWFuYWdlci5jbGVhcigpO1xuICAgIHNpbXBsaWZpZWRJbnRlcnBvbGF0aW9uTWFuYWdlci5jbGVhcigpO1xuICAgIGNvbnRyb2xQb2ludHNJbnRlcnBvbGF0aW9uTWFuYWdlci5jbGVhcigpO1xuICAgIHNpbXBsaWZpZWRJbnRlcnBvbGF0aW9uRG9uZU1hbmFnZXIuY2xlYXIoKTtcbiAgICBjb250cm9sUG9pbnRzSW50ZXJwb2xhdGlvbkRvbmVNYW5hZ2VyLmNsZWFyKCk7XG4gICAgZHJhd2luZ1BvaW50c0NhbnZhc01hbmFnZXIuY2xlYXIoKTtcbn1cblxuZnVuY3Rpb24gdXBkYXRlKCkge1xuICAgIGNsZWFyQWxsKCk7XG5cbiAgICBkcmF3aW5nQ2FudmFzTWFuYWdlci5kcmF3TGluZShzcGxpbmUucG9pbnRzLCBcImJsYWNrXCIsIDMpO1xuXG4gICAgZHJhd2luZ1BvaW50c0NhbnZhc01hbmFnZXIuZHJhd0xpbmUoc3BsaW5lLnBvaW50cywgXCJibGFja1wiLCAxKTtcbiAgICBkcmF3aW5nUG9pbnRzQ2FudmFzTWFuYWdlci5kcmF3UG9pbnRzKHNwbGluZS5wb2ludHMsIDIsIFwicmVkXCIsIFwicmVkXCIpO1xuXG4gICAgY29uc3Qgc2ltcGxpZmllZFNwbGluZSA9IHNwbGluZS5jb3B5KCkuc2ltcGxpZnkobWluTm9ybSwgbWluQW5nbGUpO1xuICAgIGNvbnN0IGNvbnRyb2xQb2ludHMgPSBzaW1wbGlmaWVkU3BsaW5lLmNvbnRyb2xQb2ludHMoc3BsaW5lLmFyZWFzLCBuYkNvbnRyb2xQb2ludHMpO1xuICAgIHNpbXBsaWZpZWRNYW5hZ2VyLmRyYXdMaW5lKHNpbXBsaWZpZWRTcGxpbmUucG9pbnRzLCBcImJsYWNrXCIsIDEpO1xuICAgIHNpbXBsaWZpZWRNYW5hZ2VyLmRyYXdQb2ludHMoc2ltcGxpZmllZFNwbGluZS5wb2ludHMsIDMsIFwicmVkXCIsIFwicmVkXCIpO1xuICAgIHNpbXBsaWZpZWRNYW5hZ2VyLmRyYXdQb2ludHMoY29udHJvbFBvaW50cywgNSwgXCJyZWRcIiwgXCJibGFja1wiLCAyKTtcblxuICAgIGNvbnN0IGNvbnRyb2xQb2ludHNTcGxpbmUgPSBuZXcgU3BsaW5lKGNvbnRyb2xQb2ludHMpO1xuICAgIGNvbnRyb2xQb2ludHNNYW5hZ2VyLmRyYXdMaW5lKGNvbnRyb2xQb2ludHNTcGxpbmUucG9pbnRzLCBcImJsYWNrXCIsIDEpO1xuICAgIGNvbnRyb2xQb2ludHNNYW5hZ2VyLmRyYXdQb2ludHMoY29udHJvbFBvaW50c1NwbGluZS5wb2ludHMsIDUsIFwicmVkXCIsIFwiYmxhY2tcIiwgMik7XG5cbiAgICBjb25zdCBpbnRlcnBvbGF0ZWRTaW1wbGlmaWVkU3BsaW5lID0gc2ltcGxpZmllZFNwbGluZS5jb3B5KCkuY2F0bXVsbFJvbUludGVycG9sYXRpb24oaW50ZXJwb2xhdGlvbkZuKTtcbiAgICBzaW1wbGlmaWVkSW50ZXJwb2xhdGlvbk1hbmFnZXIuZHJhd0xpbmUoaW50ZXJwb2xhdGVkU2ltcGxpZmllZFNwbGluZS5wb2ludHMsIFwiYmxhY2tcIiwgMyk7XG4gICAgc2ltcGxpZmllZEludGVycG9sYXRpb25NYW5hZ2VyLmRyYXdQb2ludHMoaW50ZXJwb2xhdGVkU2ltcGxpZmllZFNwbGluZS5wb2ludHMsIDIsIFwiZ3JlZW5cIiwgXCJncmVlblwiKTtcbiAgICBzaW1wbGlmaWVkSW50ZXJwb2xhdGlvbk1hbmFnZXIuZHJhd1BvaW50cyhzaW1wbGlmaWVkU3BsaW5lLnBvaW50cywgMSwgXCJyZWRcIiwgXCJyZWRcIik7XG4gICAgc2ltcGxpZmllZEludGVycG9sYXRpb25NYW5hZ2VyLmRyYXdQb2ludHMoY29udHJvbFBvaW50cywgNSwgXCJyZWRcIiwgXCJibGFja1wiLCAyKTtcblxuICAgIGNvbnN0IGludGVycG9sYXRlZENvbnRyb2xQb2ludHNTcGxpbmUgPSBjb250cm9sUG9pbnRzU3BsaW5lLmNvcHkoKS5jYXRtdWxsUm9tSW50ZXJwb2xhdGlvbihpbnRlcnBvbGF0aW9uRm4pO1xuICAgIGNvbnRyb2xQb2ludHNJbnRlcnBvbGF0aW9uTWFuYWdlci5kcmF3TGluZShpbnRlcnBvbGF0ZWRDb250cm9sUG9pbnRzU3BsaW5lLnBvaW50cywgXCJibGFja1wiLCAxKTtcbiAgICBjb250cm9sUG9pbnRzSW50ZXJwb2xhdGlvbk1hbmFnZXIuZHJhd1BvaW50cyhpbnRlcnBvbGF0ZWRDb250cm9sUG9pbnRzU3BsaW5lLnBvaW50cywgMiwgXCJncmVlblwiLCBcImdyZWVuXCIpO1xuICAgIGNvbnRyb2xQb2ludHNJbnRlcnBvbGF0aW9uTWFuYWdlci5kcmF3UG9pbnRzKGNvbnRyb2xQb2ludHMsIDUsIFwicmVkXCIsIFwiYmxhY2tcIiwgMik7XG5cbiAgICBjb250cm9sUG9pbnRzSW50ZXJwb2xhdGlvbkRvbmVNYW5hZ2VyLmRyYXdMaW5lKGludGVycG9sYXRlZENvbnRyb2xQb2ludHNTcGxpbmUucG9pbnRzLCBcImJsYWNrXCIsIDMpO1xuICAgIHNpbXBsaWZpZWRJbnRlcnBvbGF0aW9uRG9uZU1hbmFnZXIuZHJhd0xpbmUoaW50ZXJwb2xhdGVkU2ltcGxpZmllZFNwbGluZS5wb2ludHMsIFwiYmxhY2tcIiwgMyk7XG59XG5cbmZ1bmN0aW9uIG1vdXNlTW92ZShlOiBNb3VzZUV2ZW50KSB7XG4gICAgaWYgKCFkcmF3aW5nQ2FudmFzTWFuYWdlci5pc0RyYXdpbmcpIHJldHVybjtcblxuICAgIHNwbGluZS5hZGRQb2ludChkcmF3aW5nQ2FudmFzTWFuYWdlci5nZXRQb2ludChlKSk7XG4gICAgdXBkYXRlKCk7XG59XG5cbmZ1bmN0aW9uIG1vdXNlRG93bihlOiBNb3VzZUV2ZW50KSB7XG4gICAgZHJhd2luZ0NhbnZhc01hbmFnZXIuaXNEcmF3aW5nID0gdHJ1ZTtcbiAgICBzcGxpbmUuY2xlYXIoKTtcblxuICAgIG1vdXNlTW92ZShlKTtcbn1cblxuZnVuY3Rpb24gbW91c2VVcChlOiBNb3VzZUV2ZW50KSB7XG4gICAgZHJhd2luZ0NhbnZhc01hbmFnZXIuaXNEcmF3aW5nID0gZmFsc2U7XG59XG5cbmRyYXdpbmdDYW52YXNFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW1vdmVcIiwgbW91c2VNb3ZlKTtcbmRyYXdpbmdDYW52YXNFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgbW91c2VEb3duKTtcbmRyYXdpbmdDYW52YXNFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZXVwXCIsIG1vdXNlVXApO1xuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNldXBcIiwgbW91c2VVcCk7XG5cbmZ1bmN0aW9uIG9uQ2hhbmdlKCkge1xuICAgIG5iQ29udHJvbFBvaW50cyA9IE51bWJlcihuYkNvbnRyb2xQb2ludHNFbGVtZW50LnZhbHVlKTtcbiAgICBtaW5BbmdsZSA9IE51bWJlcihtaW5BbmdsZUVsZW1lbnQudmFsdWUpO1xuICAgIG1pbk5vcm0gPSBOdW1iZXIobWluTm9ybUVsZW1lbnQudmFsdWUpO1xuICAgIG5iSW50ZXJwb2xhdGlvblBvaW50cyA9IE51bWJlcihuYkludGVycG9sYXRpb25Qb2ludHNFbGVtZW50LnZhbHVlKTtcblxuICAgIHVwZGF0ZSgpO1xufVxuXG5uYkNvbnRyb2xQb2ludHNFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgb25DaGFuZ2UpO1xubWluQW5nbGVFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgb25DaGFuZ2UpO1xubWluTm9ybUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCBvbkNoYW5nZSk7XG5uYkludGVycG9sYXRpb25Qb2ludHNFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgb25DaGFuZ2UpO1xuXG5uYkNvbnRyb2xQb2ludHNFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXl1cFwiLCBvbkNoYW5nZSk7XG5taW5BbmdsZUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImtleXVwXCIsIG9uQ2hhbmdlKTtcbm1pbk5vcm1FbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXl1cFwiLCBvbkNoYW5nZSk7XG5uYkludGVycG9sYXRpb25Qb2ludHNFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXl1cFwiLCBvbkNoYW5nZSk7XG5cbm9uQ2hhbmdlKCk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=
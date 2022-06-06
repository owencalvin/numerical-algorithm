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
            var nbInterpolationPoints = nbInterpolationPointsFn(pA, pB, pC, pD);
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
var tElement = document.getElementById("s-t");
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
var t = 0.5;
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
    simplifiedInterpolationManager.drawPoints(interpolatedSimplifiedSpline.points, 3, "red", "red");
    simplifiedInterpolationManager.drawPoints(controlPoints, 5, "green", "black", 2);
    var interpolatedControlPointsSpline = controlPointsSpline.copy().catmullRomInterpolation(interpolationFn);
    controlPointsInterpolationManager.drawLine(interpolatedControlPointsSpline.points, "black", 3);
    controlPointsInterpolationManager.drawPoints(interpolatedControlPointsSpline.points, 3, "red", "red");
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
    console.log("change");
    nbControlPoints = Number(nbControlPointsElement.value);
    minAngle = Number(minAngleElement.value);
    minNorm = Number(minNormElement.value);
    t = Number(tElement.value);
    nbInterpolationPoints = Number(nbInterpolationPointsElement.value);
    update();
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

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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b3VyY2VzIjpbIndlYnBhY2s6Ly9tYXRoX3NwZS8uL3NyYy9jbGFzc2VzL1ZlY3RvcjJELnRzIiwid2VicGFjazovL21hdGhfc3BlLy4vc3JjL2NsYXNzZXMvU3BsaW5lLnRzIiwid2VicGFjazovL21hdGhfc3BlLy4vc3JjL2NsYXNzZXMvQ2FudmFzTWFuYWdlci50cyIsIndlYnBhY2s6Ly9tYXRoX3NwZS8uL3NyYy9BTjIwMjJfU3BsaW5lLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7UG9pbnQyRH0gZnJvbSBcIi4vUG9pbnQyRFwiO1xuXG5leHBvcnQgY2xhc3MgVmVjdG9yMkQge1xuICAgIHByaXZhdGUgX3g6IG51bWJlcjtcbiAgICBwcml2YXRlIF95OiBudW1iZXI7XG5cbiAgICBjb25zdHJ1Y3Rvcihwb2ludDogUG9pbnQyRCk7XG4gICAgY29uc3RydWN0b3Ioc3RhcnQ6IFBvaW50MkQsIGVuZDogUG9pbnQyRCk7XG4gICAgY29uc3RydWN0b3Ioc3RhcnQ6IFBvaW50MkQsIGVuZD86IFBvaW50MkQpIHtcbiAgICAgICAgaWYgKGVuZCkge1xuICAgICAgICAgICAgdGhpcy5feCA9IGVuZC54IC0gc3RhcnQueDtcbiAgICAgICAgICAgIHRoaXMuX3kgPSBlbmQueSAtIHN0YXJ0Lnk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl94ID0gc3RhcnQueDtcbiAgICAgICAgICAgIHRoaXMuX3kgPSBzdGFydC55O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0IG5vcm0oKSB7XG4gICAgICAgIHJldHVybiBNYXRoLnNxcnQodGhpcy5feCAqKiAyICsgdGhpcy5feSAqKiAyKTtcbiAgICB9XG5cbiAgICBnZXQgeCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3g7XG4gICAgfVxuXG4gICAgZ2V0IHkoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl95O1xuICAgIH1cblxuICAgIG5vcm1hbCgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBWZWN0b3IyRCh7XG4gICAgICAgICAgICB4OiAtdGhpcy5feSxcbiAgICAgICAgICAgIHk6IHRoaXMuX3hcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZG90UHJvZHVjdCh2ZWN0b3I6IFZlY3RvcjJEKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl94ICogdmVjdG9yLl94ICsgdGhpcy5feSAqIHZlY3Rvci5feTtcbiAgICB9XG5cbiAgICBhbmdsZSh2ZWN0b3I6IFZlY3RvcjJEKSB7XG4gICAgICAgIHJldHVybiBNYXRoLmFjb3ModGhpcy5kb3RQcm9kdWN0KHZlY3RvcikgLyAodGhpcy5ub3JtICogdmVjdG9yLm5vcm0pKTtcbiAgICB9XG5cbiAgICBtdWx0aXBseShmYWN0b3I6IG51bWJlcikge1xuICAgICAgICByZXR1cm4gbmV3IFZlY3RvcjJEKHtcbiAgICAgICAgICAgIHg6IGZhY3RvciAqIHRoaXMuX3gsXG4gICAgICAgICAgICB5OiBmYWN0b3IgKiB0aGlzLl95XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGFkZChwb2ludDogVmVjdG9yMkQpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBWZWN0b3IyRCh7XG4gICAgICAgICAgICB4OiB0aGlzLl94ICsgcG9pbnQuX3gsXG4gICAgICAgICAgICB5OiB0aGlzLl95ICsgcG9pbnQuX3lcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgc3Vic3RyYWN0KHBvaW50OiBWZWN0b3IyRCkge1xuICAgICAgICByZXR1cm4gdGhpcy5hZGQodGhpcy5tdWx0aXBseSgtMSkpO1xuICAgIH1cblxuICAgIGNvcHkoKSB7XG4gICAgICAgIHJldHVybiBuZXcgVmVjdG9yMkQoe1xuICAgICAgICAgICAgeDogdGhpcy5feCxcbiAgICAgICAgICAgIHk6IHRoaXMuX3lcbiAgICAgICAgfSk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHtWZWN0b3IyRH0gZnJvbSBcIi4vVmVjdG9yMkRcIjtcbmltcG9ydCB7UG9pbnQyRH0gZnJvbSBcIi4vUG9pbnQyRFwiO1xuXG5leHBvcnQgY2xhc3MgU3BsaW5lIHtcbiAgICBwcml2YXRlIF9wb2ludHM6IFBvaW50MkRbXTtcblxuICAgIGNvbnN0cnVjdG9yKHBvaW50czogUG9pbnQyRFtdID0gW10pIHtcbiAgICAgICAgdGhpcy5fcG9pbnRzID0gcG9pbnRzO1xuICAgIH1cblxuICAgIGdldCBwb2ludHMoKTogcmVhZG9ubHkgUG9pbnQyRFtdIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3BvaW50cztcbiAgICB9XG5cbiAgICBnZXQgcG9pbnRMZW5ndGgoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9wb2ludHMubGVuZ3RoO1xuICAgIH1cblxuICAgIGdldCBsYXN0UG9pbnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9wb2ludHNbdGhpcy5wb2ludExlbmd0aCAtIDFdO1xuICAgIH1cblxuICAgIGdldCBiZWZvcmVMYXN0UG9pbnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9wb2ludHNbdGhpcy5wb2ludExlbmd0aCAtIDJdO1xuICAgIH1cblxuICAgIGZpbmRQb2ludChwb2ludDogUG9pbnQyRCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcG9pbnRzLmZpbmQoKHAyKSA9PiBwb2ludC54ID09IHAyLnggJiYgcG9pbnQueSA9PSBwMi55KTtcbiAgICB9XG5cbiAgICBhZGRQb2ludChwb2ludDogUG9pbnQyRCkge1xuICAgICAgICB0aGlzLl9wb2ludHMucHVzaChwb2ludCk7XG4gICAgfVxuXG4gICAgY2xlYXIoKSB7XG4gICAgICAgIHRoaXMuX3BvaW50cyA9IFtdO1xuICAgIH1cblxuICAgIHNpbXBsaWZ5KG1pbk5vcm06IG51bWJlciwgbWluQW5nbGU6IG51bWJlcikge1xuICAgICAgICB0aGlzLl9wb2ludHMgPSB0aGlzLl9wb2ludHMucmVkdWNlPFBvaW50MkRbXT4oKHByZXYsIGl0ZW0pID0+IHtcbiAgICAgICAgICAgIGlmIChwcmV2Lmxlbmd0aCA8PSAzKSByZXR1cm4gWy4uLnByZXYsIGl0ZW1dO1xuXG4gICAgICAgICAgICBjb25zdCBiZWZvcmVMYXN0UG9pbnQgPSBwcmV2W3ByZXYubGVuZ3RoIC0gMl07XG4gICAgICAgICAgICBjb25zdCBsYXN0UG9pbnQgPSBwcmV2W3ByZXYubGVuZ3RoIC0gMV07XG4gICAgICAgICAgICBjb25zdCB2QUMgPSBuZXcgVmVjdG9yMkQoYmVmb3JlTGFzdFBvaW50LCBpdGVtKTtcbiAgICAgICAgICAgIGNvbnN0IHZBQiA9IG5ldyBWZWN0b3IyRChiZWZvcmVMYXN0UG9pbnQsIGxhc3RQb2ludCk7XG4gICAgICAgICAgICBjb25zdCB2QkMgPSBuZXcgVmVjdG9yMkQobGFzdFBvaW50LCBpdGVtKTtcblxuICAgICAgICAgICAgaWYgKHZBQy5ub3JtIDwgbWluTm9ybSkgcHJldi5wb3AoKTtcblxuICAgICAgICAgICAgY29uc3QgZGVnQW5nbGUgPSB2QUIuYW5nbGUodkJDKSAqIDE4MCAvIE1hdGguUEk7XG5cbiAgICAgICAgICAgIGlmIChkZWdBbmdsZSA8IG1pbkFuZ2xlKSBwcmV2LnBvcCgpO1xuXG4gICAgICAgICAgICBwcmV2LnB1c2goaXRlbSk7XG5cbiAgICAgICAgICAgIHJldHVybiBwcmV2O1xuICAgICAgICB9LCBbXSk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgZ2V0IGFuZ2xlcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3BvaW50cy5tYXAoKGN1cnJlbnRQb2ludCwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIGlmIChpbmRleCArIDEgPD0gMSB8fCBpbmRleCArIDEgPj0gdGhpcy5fcG9pbnRzLmxlbmd0aCkgcmV0dXJuIEluZmluaXR5O1xuXG4gICAgICAgICAgICBjb25zdCBsYXN0UG9pbnQgPSB0aGlzLl9wb2ludHNbaW5kZXggLSAxXTtcbiAgICAgICAgICAgIGNvbnN0IG5leHRQb2ludCA9IHRoaXMuX3BvaW50c1tpbmRleCArIDFdO1xuXG4gICAgICAgICAgICBjb25zdCB2QkEgPSBuZXcgVmVjdG9yMkQoY3VycmVudFBvaW50LCBsYXN0UG9pbnQpO1xuICAgICAgICAgICAgY29uc3QgdkJDID0gbmV3IFZlY3RvcjJEKGN1cnJlbnRQb2ludCwgbmV4dFBvaW50KTtcblxuICAgICAgICAgICAgcmV0dXJuIHZCQS5hbmdsZSh2QkMpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBnZXQgYXJlYXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9wb2ludHMubWFwKChjdXJyZW50UG9pbnQsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICBpZiAoaW5kZXggKyAxIDw9IDEgfHwgaW5kZXggKyAxID49IHRoaXMuX3BvaW50cy5sZW5ndGgpIHJldHVybiBJbmZpbml0eTtcblxuICAgICAgICAgICAgY29uc3QgbGFzdFBvaW50ID0gdGhpcy5fcG9pbnRzW2luZGV4IC0gMV07XG4gICAgICAgICAgICBjb25zdCBuZXh0UG9pbnQgPSB0aGlzLl9wb2ludHNbaW5kZXggKyAxXTtcblxuICAgICAgICAgICAgY29uc3QgdkJBID0gbmV3IFZlY3RvcjJEKGN1cnJlbnRQb2ludCwgbGFzdFBvaW50KTtcbiAgICAgICAgICAgIGNvbnN0IHZCQyA9IG5ldyBWZWN0b3IyRChjdXJyZW50UG9pbnQsIG5leHRQb2ludCk7XG4gICAgICAgICAgICBjb25zdCB2QUMgPSBuZXcgVmVjdG9yMkQobGFzdFBvaW50LCBuZXh0UG9pbnQpO1xuXG4gICAgICAgICAgICBjb25zdCBzID0gKHZBQy5ub3JtICsgdkJBLm5vcm0gKyB2QkMubm9ybSkgLyAyO1xuXG4gICAgICAgICAgICByZXR1cm4gTWF0aC5zcXJ0KHMgKiAocyAtIHZBQy5ub3JtKSAqIChzIC0gdkJBLm5vcm0pICogKHMgLSB2QkMubm9ybSkpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBjb250cm9sUG9pbnRzKHZhbHVlczogbnVtYmVyW10sIG51bWJlck9mQ29udHJvbFBvaW50czogbnVtYmVyKSB7XG4gICAgICAgIG51bWJlck9mQ29udHJvbFBvaW50cyA9IE1hdGgubWF4KG51bWJlck9mQ29udHJvbFBvaW50cywgMik7XG5cbiAgICAgICAgY29uc3QgdmFsdWVzV2l0aEluZGV4ZXMgPSB0aGlzLmFyZWFzLm1hcCgodmFsdWUsIGluZGV4KSA9PiBbdmFsdWUsIGluZGV4XSk7XG5cbiAgICAgICAgdmFsdWVzV2l0aEluZGV4ZXMuc29ydCgoYSwgYikgPT4ge1xuICAgICAgICAgICAgaWYgKE51bWJlci5pc05hTihiWzBdKSkgcmV0dXJuIC0xO1xuXG4gICAgICAgICAgICBpZiAoYVswXSA8IGJbMF0pIHJldHVybiAxO1xuICAgICAgICAgICAgZWxzZSBpZiAoYVswXSA+IGJbMF0pIHJldHVybiAtMTtcbiAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gdmFsdWVzV2l0aEluZGV4ZXNcbiAgICAgICAgICAgIC5zbGljZSgwLCBudW1iZXJPZkNvbnRyb2xQb2ludHMpXG4gICAgICAgICAgICAuc29ydCgoYSwgYikgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChhWzFdIDwgYlsxXSkgcmV0dXJuIDE7XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoYVsxXSA+IGJbMV0pIHJldHVybiAtMTtcbiAgICAgICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAubWFwKCh4KSA9PiB0aGlzLl9wb2ludHNbeFsxXV0pO1xuICAgIH1cblxuICAgIHRyYW5zbGF0ZSh4OiBudW1iZXIsIHk6IG51bWJlcikge1xuICAgICAgICB0aGlzLl9wb2ludHMgPSB0aGlzLl9wb2ludHMubWFwKChwb2ludCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICB4OiBwb2ludC54ICsgeCxcbiAgICAgICAgICAgICAgICB5OiBwb2ludC55ICsgeVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgY29weSgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBTcGxpbmUodGhpcy5fcG9pbnRzKTtcbiAgICB9XG5cbiAgICBjYXRtdWxsUm9tSW50ZXJwb2xhdGlvbihcbiAgICAgICAgbmJJbnRlcnBvbGF0aW9uUG9pbnRzRm46IChwQTogUG9pbnQyRCwgcEI6IFBvaW50MkQsIHBDOiBQb2ludDJELCBwRDogUG9pbnQyRCkgPT4gbnVtYmVyXG4gICAgKSB7XG4gICAgICAgIGNvbnN0IGxhc3RQb2ludCA9IHRoaXMuX3BvaW50c1t0aGlzLl9wb2ludHMubGVuZ3RoIC0gMV07XG4gICAgICAgIHRoaXMuX3BvaW50cyA9IHRoaXMuX3BvaW50cy5yZWR1Y2U8UG9pbnQyRFtdPigocHJldiwgcEMsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICBpZiAoaW5kZXggKyAxIDw9IDIgfHwgaW5kZXggKyAxID49IHRoaXMuX3BvaW50cy5sZW5ndGgpIHJldHVybiBwcmV2O1xuXG4gICAgICAgICAgICBjb25zdCBhZGQgPSAocHk6IFBvaW50MkQpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoIXByZXYuZmluZCgocHgpID0+IHB4LnggPT09IHB5LnggJiYgcHgueSA9PT0gcHkueSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcHJldi5wdXNoKHB5KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBjb25zdCBwQSA9IHRoaXMuX3BvaW50c1tpbmRleCAtIDJdO1xuICAgICAgICAgICAgY29uc3QgcEIgPSB0aGlzLl9wb2ludHNbaW5kZXggLSAxXTtcbiAgICAgICAgICAgIGNvbnN0IHBEID0gdGhpcy5fcG9pbnRzW2luZGV4ICsgMV07XG5cbiAgICAgICAgICAgIGFkZChwQSk7XG4gICAgICAgICAgICBhZGQocEIpO1xuXG4gICAgICAgICAgICBjb25zdCBuYkludGVycG9sYXRpb25Qb2ludHMgPSBuYkludGVycG9sYXRpb25Qb2ludHNGbihwQSwgcEIsIHBDLCBwRCk7XG5cbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAyOyBpIDwgbmJJbnRlcnBvbGF0aW9uUG9pbnRzOyBpKyspIHtcbiAgICAgICAgICAgICAgICBjb25zdCB0ID0gaSAvIG5iSW50ZXJwb2xhdGlvblBvaW50cztcblxuICAgICAgICAgICAgICAgIGNvbnN0IHBvaW50ID0ge1xuICAgICAgICAgICAgICAgICAgICB4OiBTcGxpbmUuY2F0bXVsbFJvbSh0LCBwQS54LCBwQi54LCBwQy54LCBwRC54KSxcbiAgICAgICAgICAgICAgICAgICAgeTogU3BsaW5lLmNhdG11bGxSb20odCwgcEEueSwgcEIueSwgcEMueSwgcEQueSlcbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgcHJldiA9IFtcbiAgICAgICAgICAgICAgICAgICAgLi4ucHJldixcbiAgICAgICAgICAgICAgICAgICAgcG9pbnQsXG4gICAgICAgICAgICAgICAgXTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgYWRkKHBDKTtcblxuICAgICAgICAgICAgcmV0dXJuIHByZXY7XG4gICAgICAgIH0sIFtdKTtcblxuICAgICAgICB0aGlzLl9wb2ludHMgPSBbXG4gICAgICAgICAgICAuLi50aGlzLl9wb2ludHMsXG4gICAgICAgICAgICBsYXN0UG9pbnRcbiAgICAgICAgXTtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBzdGF0aWMgY2F0bXVsbFJvbSh0OiBudW1iZXIsIG1BOiBudW1iZXIsIG1COiBudW1iZXIsIG1DOiBudW1iZXIsIG1EOiBudW1iZXIpIHtcbiAgICAgICAgY29uc3QgYSA9IDMgKiBtQiAtIG1BIC0gMyAqIG1DICsgbUQ7XG4gICAgICAgIGNvbnN0IGIgPSAyICogbUEgLSA1ICogbUIgKyA0ICogbUMgLSBtRDtcbiAgICAgICAgY29uc3QgYyA9IChtQyAtIG1BKSAqIHQ7XG4gICAgICAgIGNvbnN0IGQgPSAyICogbUI7XG4gICAgICAgIGNvbnN0IGZpbmFsID0gYSAqIHQgKiogMyArIGIgKiB0ICoqIDIgKyBjICsgZDtcbiAgICAgICAgcmV0dXJuIDAuNSAqIGZpbmFsO1xuICAgIH1cbn1cbiIsImltcG9ydCB7U3BsaW5lfSBmcm9tIFwiLi9TcGxpbmVcIjtcbmltcG9ydCB7UG9pbnQyRH0gZnJvbSBcIi4vUG9pbnQyRFwiO1xuXG5leHBvcnQgY2xhc3MgQ2FudmFzTWFuYWdlciB7XG4gICAgcHJpdmF0ZSBfY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudDtcbiAgICBwcml2YXRlIF9jb250ZXh0OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQ7XG4gICAgcHJpdmF0ZSBfaXNEcmF3aW5nOiBib29sZWFuO1xuICAgIHByaXZhdGUgX3BpeGVsUmF0aW86IG51bWJlcjtcblxuICAgIGdldCBjYW52YXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jYW52YXM7XG4gICAgfVxuXG4gICAgZ2V0IHBpeGVsUmF0aW8oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9waXhlbFJhdGlvO1xuICAgIH1cblxuICAgIGdldCBjb250ZXh0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY29udGV4dDtcbiAgICB9XG5cbiAgICBnZXQgaXNEcmF3aW5nKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5faXNEcmF3aW5nO1xuICAgIH1cblxuICAgIHNldCBpc0RyYXdpbmcoaXNEcmF3aW5nOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuX2lzRHJhd2luZyA9IGlzRHJhd2luZztcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3RvcihjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50LCBzY2FsZUZhY3Rvcj86IG51bWJlcikge1xuICAgICAgICB0aGlzLl9pc0RyYXdpbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fY2FudmFzID0gY2FudmFzO1xuICAgICAgICB0aGlzLl9waXhlbFJhdGlvID0gc2NhbGVGYWN0b3IgfHwgd2luZG93LmRldmljZVBpeGVsUmF0aW8gfHwgMTtcblxuICAgICAgICBjb25zdCByZWN0ID0gdGhpcy5fY2FudmFzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICBjb25zdCBjb250ZXh0ID0gdGhpcy5fY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcblxuICAgICAgICB0aGlzLl9jYW52YXMuc3R5bGUud2lkdGggPSB0aGlzLl9jYW52YXMud2lkdGggKyAncHgnO1xuICAgICAgICB0aGlzLl9jYW52YXMuc3R5bGUuaGVpZ2h0ID0gdGhpcy5fY2FudmFzLmhlaWdodCArICdweCc7XG5cbiAgICAgICAgdGhpcy5fY2FudmFzLndpZHRoID0gcmVjdC53aWR0aCAqIHRoaXMuX3BpeGVsUmF0aW87XG4gICAgICAgIHRoaXMuX2NhbnZhcy5oZWlnaHQgPSByZWN0LmhlaWdodCAqIHRoaXMuX3BpeGVsUmF0aW87XG5cbiAgICAgICAgY29udGV4dC5zY2FsZSh0aGlzLl9waXhlbFJhdGlvLCB0aGlzLl9waXhlbFJhdGlvKTtcblxuICAgICAgICB0aGlzLl9jb250ZXh0ID0gY29udGV4dDtcbiAgICB9XG5cbiAgICBjbGVhcigpIHtcbiAgICAgICAgdGhpcy5jb250ZXh0LmNsZWFyUmVjdCgwLCAwLCB0aGlzLl9jb250ZXh0LmNhbnZhcy53aWR0aCwgdGhpcy5fY29udGV4dC5jYW52YXMuaGVpZ2h0KTtcbiAgICB9XG5cbiAgICBnZXRQb2ludChlOiBNb3VzZUV2ZW50KTogUG9pbnQyRCB7XG4gICAgICAgIGNvbnN0IHJlY3QgPSB0aGlzLl9jYW52YXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHg6IGUuY2xpZW50WCAtIHJlY3QubGVmdCxcbiAgICAgICAgICAgIHk6IGUuY2xpZW50WSAtIHJlY3QudG9wXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZHJhd1BvaW50KFxuICAgICAgICBwb2ludDogUG9pbnQyRCxcbiAgICAgICAgcmFkaXVzID0gNSxcbiAgICAgICAgZmlsbENvbG9yID0gXCJibGFja1wiLFxuICAgICAgICBzdHJva2VDb2xvciA9IFwiYmxhY2tcIixcbiAgICAgICAgbGluZVdpZHRoID0gMFxuICAgICkge1xuICAgICAgICBpZiAoIXBvaW50KSByZXR1cm47XG4gICAgICAgIHRoaXMuX2NvbnRleHQuYmVnaW5QYXRoKCk7XG4gICAgICAgIHRoaXMuX2NvbnRleHQubGluZVdpZHRoID0gbGluZVdpZHRoO1xuICAgICAgICB0aGlzLl9jb250ZXh0LmxpbmVDYXAgPSBcInJvdW5kXCI7XG4gICAgICAgIHRoaXMuX2NvbnRleHQuZmlsbFN0eWxlID0gZmlsbENvbG9yO1xuICAgICAgICB0aGlzLl9jb250ZXh0LnN0cm9rZVN0eWxlID0gc3Ryb2tlQ29sb3I7XG4gICAgICAgIHRoaXMuX2NvbnRleHQuYXJjKHBvaW50LngsIHBvaW50LnksIHJhZGl1cywgMCwgMiAqIE1hdGguUEkpO1xuICAgICAgICB0aGlzLl9jb250ZXh0LmZpbGwoKTtcbiAgICAgICAgdGhpcy5fY29udGV4dC5zdHJva2UoKTtcbiAgICAgICAgdGhpcy5fY29udGV4dC5jbG9zZVBhdGgoKTtcbiAgICB9XG5cbiAgICBkcmF3UG9pbnRzKFxuICAgICAgICBwb2ludHM6IFBvaW50MkRbXSB8IHJlYWRvbmx5IFBvaW50MkRbXSxcbiAgICAgICAgcmFkaXVzID0gNSxcbiAgICAgICAgZmlsbENvbG9yID0gXCJibGFja1wiLFxuICAgICAgICBzdHJva2VDb2xvciA9IFwiYmxhY2tcIixcbiAgICAgICAgbGluZVdpZHRoID0gMFxuICAgICkge1xuICAgICAgICBwb2ludHMuZm9yRWFjaCgocG9pbnQpID0+IHRoaXMuZHJhd1BvaW50KHBvaW50LCByYWRpdXMsIGZpbGxDb2xvciwgc3Ryb2tlQ29sb3IsIGxpbmVXaWR0aCkpO1xuICAgIH1cblxuICAgIGRyYXdMaW5lKFxuICAgICAgICBwb2ludHM6IFBvaW50MkRbXSB8IHJlYWRvbmx5IFBvaW50MkRbXSxcbiAgICAgICAgc3Ryb2tlQ29sb3IgPSBcImJsYWNrXCIsXG4gICAgICAgIGxpbmVXaWR0aCA9IDFcbiAgICApIHtcbiAgICAgICAgcG9pbnRzLmZvckVhY2goKHBvaW50LCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgaWYgKGluZGV4ID49IHBvaW50cy5sZW5ndGggLSAxKSByZXR1cm47XG5cbiAgICAgICAgICAgIHRoaXMuX2NvbnRleHQuYmVnaW5QYXRoKCk7XG4gICAgICAgICAgICB0aGlzLl9jb250ZXh0LmxpbmVXaWR0aCA9IGxpbmVXaWR0aDtcbiAgICAgICAgICAgIHRoaXMuX2NvbnRleHQubGluZUNhcCA9IFwicm91bmRcIjtcbiAgICAgICAgICAgIHRoaXMuX2NvbnRleHQuc3Ryb2tlU3R5bGUgPSBzdHJva2VDb2xvcjtcbiAgICAgICAgICAgIHRoaXMuX2NvbnRleHQubW92ZVRvKHBvaW50LngsIHBvaW50LnkpO1xuICAgICAgICAgICAgdGhpcy5fY29udGV4dC5saW5lVG8ocG9pbnRzW2luZGV4ICsgMV0ueCwgcG9pbnRzW2luZGV4ICsgMV0ueSk7XG4gICAgICAgICAgICB0aGlzLl9jb250ZXh0LnN0cm9rZSgpO1xuICAgICAgICAgICAgdGhpcy5fY29udGV4dC5jbG9zZVBhdGgoKTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHtTcGxpbmV9IGZyb20gXCIuL2NsYXNzZXMvU3BsaW5lXCI7XG5pbXBvcnQge0NhbnZhc01hbmFnZXJ9IGZyb20gXCIuL2NsYXNzZXMvQ2FudmFzTWFuYWdlclwiO1xuaW1wb3J0IHtWZWN0b3IyRH0gZnJvbSBcIi4vY2xhc3Nlcy9WZWN0b3IyRFwiO1xuaW1wb3J0IHtQb2ludDJEfSBmcm9tIFwiLi9jbGFzc2VzL1BvaW50MkRcIjtcblxuY29uc3QgbmJDb250cm9sUG9pbnRzRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicy1uYi1jb250cm9sLXBvaW50c1wiKSBhcyBIVE1MSW5wdXRFbGVtZW50O1xuY29uc3QgbWluQW5nbGVFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzLWFuZ2xlXCIpIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XG5jb25zdCBtaW5Ob3JtRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicy1ub3JtXCIpIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XG5jb25zdCB0RWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicy10XCIpIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XG5jb25zdCBuYkludGVycG9sYXRpb25Qb2ludHNFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzLWludGVycG9sYXRpb24tcG9pbnRzXCIpIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XG5cbmNvbnN0IGRyYXdpbmdDYW52YXNFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzLWRyYXdpbmdcIikgYXMgSFRNTENhbnZhc0VsZW1lbnQ7XG5cbmNvbnN0IHNpbXBsaWZpZWRDYW52YXNFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzLXNpbXBsaWZpZWRcIikgYXMgSFRNTENhbnZhc0VsZW1lbnQ7XG5jb25zdCBjb250cm9sUG9pbnRzQ2FudmFzRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicy1jb250cm9sLXBvaW50c1wiKSBhcyBIVE1MQ2FudmFzRWxlbWVudDtcbmNvbnN0IHNpbXBsaWZpZWRJbnRlcnBvbGF0aW9uRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicy1zaW1wbGlmaWVkLWludGVycG9sYXRpb25cIikgYXMgSFRNTENhbnZhc0VsZW1lbnQ7XG5jb25zdCBjb250cm9sUG9pbnRzSW50ZXJwb2xhdGlvbkVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInMtY29udHJvbC1wb2ludHMtaW50ZXJwb2xhdGlvblwiKSBhcyBIVE1MQ2FudmFzRWxlbWVudDtcbmNvbnN0IHNpbXBsaWZpZWRJbnRlcnBvbGF0aW9uRG9uZUVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInMtc2ltcGxpZmllZC1pbnRlcnBvbGF0aW9uLWRvbmVcIikgYXMgSFRNTENhbnZhc0VsZW1lbnQ7XG5jb25zdCBjb250cm9sUG9pbnRzSW50ZXJwb2xhdGlvbkRvbmVFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzLWNvbnRyb2wtcG9pbnRzLWludGVycG9sYXRpb24tZG9uZVwiKSBhcyBIVE1MQ2FudmFzRWxlbWVudDtcblxuY29uc3QgZHJhd2luZ0NhbnZhc01hbmFnZXIgPSBuZXcgQ2FudmFzTWFuYWdlcihkcmF3aW5nQ2FudmFzRWxlbWVudCk7XG5jb25zdCBzaW1wbGlmaWVkTWFuYWdlciA9IG5ldyBDYW52YXNNYW5hZ2VyKHNpbXBsaWZpZWRDYW52YXNFbGVtZW50KTtcbmNvbnN0IGNvbnRyb2xQb2ludHNNYW5hZ2VyID0gbmV3IENhbnZhc01hbmFnZXIoY29udHJvbFBvaW50c0NhbnZhc0VsZW1lbnQpO1xuY29uc3Qgc2ltcGxpZmllZEludGVycG9sYXRpb25NYW5hZ2VyID0gbmV3IENhbnZhc01hbmFnZXIoc2ltcGxpZmllZEludGVycG9sYXRpb25FbGVtZW50KTtcbmNvbnN0IGNvbnRyb2xQb2ludHNJbnRlcnBvbGF0aW9uTWFuYWdlciA9IG5ldyBDYW52YXNNYW5hZ2VyKGNvbnRyb2xQb2ludHNJbnRlcnBvbGF0aW9uRWxlbWVudCk7XG5jb25zdCBzaW1wbGlmaWVkSW50ZXJwb2xhdGlvbkRvbmVNYW5hZ2VyID0gbmV3IENhbnZhc01hbmFnZXIoc2ltcGxpZmllZEludGVycG9sYXRpb25Eb25lRWxlbWVudCk7XG5jb25zdCBjb250cm9sUG9pbnRzSW50ZXJwb2xhdGlvbkRvbmVNYW5hZ2VyID0gbmV3IENhbnZhc01hbmFnZXIoY29udHJvbFBvaW50c0ludGVycG9sYXRpb25Eb25lRWxlbWVudCk7XG5cbmNvbnN0IHNwbGluZSA9IG5ldyBTcGxpbmUoKTtcbmxldCBuYkNvbnRyb2xQb2ludHMgPSA0O1xubGV0IG1pbkFuZ2xlID0gMTtcbmxldCBtaW5Ob3JtID0gMjA7XG5sZXQgdCA9IDAuNTtcbmxldCBuYkludGVycG9sYXRpb25Qb2ludHMgPSAzO1xuY29uc3QgaW50ZXJwb2xhdGlvbkZuID0gKHBBOiBQb2ludDJELCBwQjogUG9pbnQyRCwgcEM6IFBvaW50MkQpID0+IHtcbiAgICBpZiAobmJJbnRlcnBvbGF0aW9uUG9pbnRzID49IDApIHJldHVybiBuYkludGVycG9sYXRpb25Qb2ludHM7XG5cbiAgICBjb25zdCB2QkMgPSBuZXcgVmVjdG9yMkQocEIsIHBDKTtcbiAgICBjb25zdCB2QkEgPSBuZXcgVmVjdG9yMkQocEIsIHBBKTtcbiAgICBjb25zdCBhbmdsZSA9IHZCQS5hbmdsZSh2QkMpO1xuXG4gICAgLy8gbm9ybSBncmVhdGVyIC0+IG1vcmUgcG9pbnRzXG4gICAgLy8gYW5nbGUgZ3JlYXRlciAtPiBtb3JlIHBvaW50c1xuICAgIGNvbnN0IG5vcm1GYWN0b3IgPSAwLjAyICogdkJDLm5vcm07XG4gICAgY29uc3QgYW5nbGVGYWN0b3IgPSAxMCAqIChhbmdsZSAvIE1hdGguUEkpO1xuICAgIHJldHVybiBNYXRoLmNlaWwobm9ybUZhY3RvciAqIGFuZ2xlRmFjdG9yKTtcbn07XG5cbmZ1bmN0aW9uIGNsZWFyQWxsKCkge1xuICAgIGRyYXdpbmdDYW52YXNNYW5hZ2VyLmNsZWFyKCk7XG4gICAgc2ltcGxpZmllZE1hbmFnZXIuY2xlYXIoKTtcbiAgICBjb250cm9sUG9pbnRzTWFuYWdlci5jbGVhcigpO1xuICAgIHNpbXBsaWZpZWRJbnRlcnBvbGF0aW9uTWFuYWdlci5jbGVhcigpO1xuICAgIGNvbnRyb2xQb2ludHNJbnRlcnBvbGF0aW9uTWFuYWdlci5jbGVhcigpO1xuICAgIHNpbXBsaWZpZWRJbnRlcnBvbGF0aW9uRG9uZU1hbmFnZXIuY2xlYXIoKTtcbiAgICBjb250cm9sUG9pbnRzSW50ZXJwb2xhdGlvbkRvbmVNYW5hZ2VyLmNsZWFyKCk7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZSgpIHtcbiAgICBjbGVhckFsbCgpO1xuXG4gICAgZHJhd2luZ0NhbnZhc01hbmFnZXIuZHJhd0xpbmUoc3BsaW5lLnBvaW50cywgXCJibGFja1wiLCAzKTtcblxuICAgIGNvbnN0IHNpbXBsaWZpZWRTcGxpbmUgPSBzcGxpbmUuY29weSgpLnNpbXBsaWZ5KG1pbk5vcm0sIG1pbkFuZ2xlKTtcbiAgICBjb25zdCBjb250cm9sUG9pbnRzID0gc2ltcGxpZmllZFNwbGluZS5jb250cm9sUG9pbnRzKHNwbGluZS5hcmVhcywgbmJDb250cm9sUG9pbnRzKTtcbiAgICBzaW1wbGlmaWVkTWFuYWdlci5kcmF3TGluZShzaW1wbGlmaWVkU3BsaW5lLnBvaW50cywgXCJibHVlXCIsIDMpO1xuICAgIHNpbXBsaWZpZWRNYW5hZ2VyLmRyYXdQb2ludHMoc2ltcGxpZmllZFNwbGluZS5wb2ludHMsIDMsIFwiZ3JlZW5cIiwgXCJncmVlblwiKTtcbiAgICBzaW1wbGlmaWVkTWFuYWdlci5kcmF3UG9pbnRzKGNvbnRyb2xQb2ludHMsIDUsIFwiZ3JlZW5cIiwgXCJibGFja1wiLCAyKTtcblxuICAgIGNvbnN0IGNvbnRyb2xQb2ludHNTcGxpbmUgPSBuZXcgU3BsaW5lKGNvbnRyb2xQb2ludHMpO1xuICAgIGNvbnRyb2xQb2ludHNNYW5hZ2VyLmRyYXdMaW5lKGNvbnRyb2xQb2ludHNTcGxpbmUucG9pbnRzLCBcInJlZFwiLCAzKTtcbiAgICBjb250cm9sUG9pbnRzTWFuYWdlci5kcmF3UG9pbnRzKGNvbnRyb2xQb2ludHNTcGxpbmUucG9pbnRzLCA1LCBcImdyZWVuXCIsIFwiYmxhY2tcIiwgMik7XG5cbiAgICBjb25zdCBpbnRlcnBvbGF0ZWRTaW1wbGlmaWVkU3BsaW5lID0gc2ltcGxpZmllZFNwbGluZS5jb3B5KCkuY2F0bXVsbFJvbUludGVycG9sYXRpb24oaW50ZXJwb2xhdGlvbkZuKTtcbiAgICBzaW1wbGlmaWVkSW50ZXJwb2xhdGlvbk1hbmFnZXIuZHJhd0xpbmUoaW50ZXJwb2xhdGVkU2ltcGxpZmllZFNwbGluZS5wb2ludHMsIFwiYmxhY2tcIiwgMyk7XG4gICAgc2ltcGxpZmllZEludGVycG9sYXRpb25NYW5hZ2VyLmRyYXdQb2ludHMoaW50ZXJwb2xhdGVkU2ltcGxpZmllZFNwbGluZS5wb2ludHMsIDMsIFwicmVkXCIsIFwicmVkXCIpO1xuICAgIHNpbXBsaWZpZWRJbnRlcnBvbGF0aW9uTWFuYWdlci5kcmF3UG9pbnRzKGNvbnRyb2xQb2ludHMsIDUsIFwiZ3JlZW5cIiwgXCJibGFja1wiLCAyKTtcblxuICAgIGNvbnN0IGludGVycG9sYXRlZENvbnRyb2xQb2ludHNTcGxpbmUgPSBjb250cm9sUG9pbnRzU3BsaW5lLmNvcHkoKS5jYXRtdWxsUm9tSW50ZXJwb2xhdGlvbihpbnRlcnBvbGF0aW9uRm4pO1xuICAgIGNvbnRyb2xQb2ludHNJbnRlcnBvbGF0aW9uTWFuYWdlci5kcmF3TGluZShpbnRlcnBvbGF0ZWRDb250cm9sUG9pbnRzU3BsaW5lLnBvaW50cywgXCJibGFja1wiLCAzKTtcbiAgICBjb250cm9sUG9pbnRzSW50ZXJwb2xhdGlvbk1hbmFnZXIuZHJhd1BvaW50cyhpbnRlcnBvbGF0ZWRDb250cm9sUG9pbnRzU3BsaW5lLnBvaW50cywgMywgXCJyZWRcIiwgXCJyZWRcIik7XG4gICAgY29udHJvbFBvaW50c0ludGVycG9sYXRpb25NYW5hZ2VyLmRyYXdQb2ludHMoY29udHJvbFBvaW50cywgNSwgXCJncmVlblwiLCBcImJsYWNrXCIsIDIpO1xuXG4gICAgY29udHJvbFBvaW50c0ludGVycG9sYXRpb25Eb25lTWFuYWdlci5kcmF3TGluZShpbnRlcnBvbGF0ZWRDb250cm9sUG9pbnRzU3BsaW5lLnBvaW50cywgXCJibGFja1wiLCAzKTtcbiAgICBzaW1wbGlmaWVkSW50ZXJwb2xhdGlvbkRvbmVNYW5hZ2VyLmRyYXdMaW5lKGludGVycG9sYXRlZFNpbXBsaWZpZWRTcGxpbmUucG9pbnRzLCBcImJsYWNrXCIsIDMpO1xufVxuXG5mdW5jdGlvbiBtb3VzZU1vdmUoZTogTW91c2VFdmVudCkge1xuICAgIGlmICghZHJhd2luZ0NhbnZhc01hbmFnZXIuaXNEcmF3aW5nKSByZXR1cm47XG5cbiAgICBzcGxpbmUuYWRkUG9pbnQoZHJhd2luZ0NhbnZhc01hbmFnZXIuZ2V0UG9pbnQoZSkpO1xuICAgIHVwZGF0ZSgpO1xufVxuXG5mdW5jdGlvbiBtb3VzZURvd24oZTogTW91c2VFdmVudCkge1xuICAgIGRyYXdpbmdDYW52YXNNYW5hZ2VyLmlzRHJhd2luZyA9IHRydWU7XG4gICAgc3BsaW5lLmNsZWFyKCk7XG5cbiAgICBtb3VzZU1vdmUoZSk7XG59XG5cbmZ1bmN0aW9uIG1vdXNlVXAoZTogTW91c2VFdmVudCkge1xuICAgIGRyYXdpbmdDYW52YXNNYW5hZ2VyLmlzRHJhd2luZyA9IGZhbHNlO1xufVxuXG5kcmF3aW5nQ2FudmFzRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vtb3ZlXCIsIG1vdXNlTW92ZSk7XG5kcmF3aW5nQ2FudmFzRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIG1vdXNlRG93bik7XG5kcmF3aW5nQ2FudmFzRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwibW91c2V1cFwiLCBtb3VzZVVwKTtcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZXVwXCIsIG1vdXNlVXApO1xuXG5mdW5jdGlvbiBvbkNoYW5nZSgpIHtcbiAgICBjb25zb2xlLmxvZyhcImNoYW5nZVwiKTtcbiAgICBuYkNvbnRyb2xQb2ludHMgPSBOdW1iZXIobmJDb250cm9sUG9pbnRzRWxlbWVudC52YWx1ZSk7XG4gICAgbWluQW5nbGUgPSBOdW1iZXIobWluQW5nbGVFbGVtZW50LnZhbHVlKTtcbiAgICBtaW5Ob3JtID0gTnVtYmVyKG1pbk5vcm1FbGVtZW50LnZhbHVlKTtcbiAgICB0ID0gTnVtYmVyKHRFbGVtZW50LnZhbHVlKTtcbiAgICBuYkludGVycG9sYXRpb25Qb2ludHMgPSBOdW1iZXIobmJJbnRlcnBvbGF0aW9uUG9pbnRzRWxlbWVudC52YWx1ZSk7XG5cbiAgICB1cGRhdGUoKTtcbn1cblxubmJDb250cm9sUG9pbnRzRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsIG9uQ2hhbmdlKTtcbm1pbkFuZ2xlRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsIG9uQ2hhbmdlKTtcbm1pbk5vcm1FbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgb25DaGFuZ2UpO1xudEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCBvbkNoYW5nZSk7XG5uYkludGVycG9sYXRpb25Qb2ludHNFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgb25DaGFuZ2UpO1xuXG5uYkNvbnRyb2xQb2ludHNFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXl1cFwiLCBvbkNoYW5nZSk7XG5taW5BbmdsZUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImtleXVwXCIsIG9uQ2hhbmdlKTtcbm1pbk5vcm1FbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXl1cFwiLCBvbkNoYW5nZSk7XG50RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwia2V5dXBcIiwgb25DaGFuZ2UpO1xubmJJbnRlcnBvbGF0aW9uUG9pbnRzRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwia2V5dXBcIiwgb25DaGFuZ2UpO1xuXG5vbkNoYW5nZSgpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9
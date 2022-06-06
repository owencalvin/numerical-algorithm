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
    drawingPointsCanvasManager.clear();
}
function update() {
    clearAll();
    drawingCanvasManager.drawLine(spline.points, "black", 3);
    drawingPointsCanvasManager.drawLine(spline.points, "black", 3);
    drawingPointsCanvasManager.drawPoints(spline.points, 0.5, "pink", "pink");
    var simplifiedSpline = spline.copy().simplify(minNorm, minAngle);
    var controlPoints = simplifiedSpline.controlPoints(spline.areas, nbControlPoints);
    simplifiedManager.drawLine(simplifiedSpline.points, "black", 3);
    simplifiedManager.drawPoints(simplifiedSpline.points, 3, "pink", "pink");
    simplifiedManager.drawPoints(controlPoints, 5, "pink", "black", 2);
    var controlPointsSpline = new Spline(controlPoints);
    controlPointsManager.drawLine(controlPointsSpline.points, "black", 3);
    controlPointsManager.drawPoints(controlPointsSpline.points, 5, "pink", "black", 2);
    var interpolatedSimplifiedSpline = simplifiedSpline.copy().catmullRomInterpolation(interpolationFn);
    simplifiedInterpolationManager.drawLine(interpolatedSimplifiedSpline.points, "black", 3);
    simplifiedInterpolationManager.drawPoints(interpolatedSimplifiedSpline.points, 2, "red", "red");
    simplifiedInterpolationManager.drawPoints(simplifiedSpline.points, 3, "pink", "pink");
    simplifiedInterpolationManager.drawPoints(controlPoints, 5, "pink", "black", 2);
    var interpolatedControlPointsSpline = controlPointsSpline.copy().catmullRomInterpolation(interpolationFn);
    controlPointsInterpolationManager.drawLine(interpolatedControlPointsSpline.points, "black", 3);
    controlPointsInterpolationManager.drawPoints(interpolatedControlPointsSpline.points, 2, "red", "red");
    controlPointsInterpolationManager.drawPoints(controlPoints, 5, "pink", "black", 2);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QkFBZ0IsQ0FBQyxPQUFPLEVBQUUsUUFBUSxDQUFDLENBQUM7QUFDbkQsNEJBQTRCLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0FBRWpFLFFBQVEsRUFBRSxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbWF0aF9zcGUvLi9zcmMvY2xhc3Nlcy9WZWN0b3IyRC50cyIsIndlYnBhY2s6Ly9tYXRoX3NwZS8uL3NyYy9jbGFzc2VzL1NwbGluZS50cyIsIndlYnBhY2s6Ly9tYXRoX3NwZS8uL3NyYy9jbGFzc2VzL0NhbnZhc01hbmFnZXIudHMiLCJ3ZWJwYWNrOi8vbWF0aF9zcGUvLi9zcmMvQU4yMDIyX1NwbGluZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1BvaW50MkR9IGZyb20gXCIuL1BvaW50MkRcIjtcblxuZXhwb3J0IGNsYXNzIFZlY3RvcjJEIHtcbiAgICBwcml2YXRlIF94OiBudW1iZXI7XG4gICAgcHJpdmF0ZSBfeTogbnVtYmVyO1xuXG4gICAgY29uc3RydWN0b3IocG9pbnQ6IFBvaW50MkQpO1xuICAgIGNvbnN0cnVjdG9yKHN0YXJ0OiBQb2ludDJELCBlbmQ6IFBvaW50MkQpO1xuICAgIGNvbnN0cnVjdG9yKHN0YXJ0OiBQb2ludDJELCBlbmQ/OiBQb2ludDJEKSB7XG4gICAgICAgIGlmIChlbmQpIHtcbiAgICAgICAgICAgIHRoaXMuX3ggPSBlbmQueCAtIHN0YXJ0Lng7XG4gICAgICAgICAgICB0aGlzLl95ID0gZW5kLnkgLSBzdGFydC55O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5feCA9IHN0YXJ0Lng7XG4gICAgICAgICAgICB0aGlzLl95ID0gc3RhcnQueTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldCBub3JtKCkge1xuICAgICAgICByZXR1cm4gTWF0aC5zcXJ0KHRoaXMuX3ggKiogMiArIHRoaXMuX3kgKiogMik7XG4gICAgfVxuXG4gICAgZ2V0IHgoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl94O1xuICAgIH1cblxuICAgIGdldCB5KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5feTtcbiAgICB9XG5cbiAgICBub3JtYWwoKSB7XG4gICAgICAgIHJldHVybiBuZXcgVmVjdG9yMkQoe1xuICAgICAgICAgICAgeDogLXRoaXMuX3ksXG4gICAgICAgICAgICB5OiB0aGlzLl94XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGRvdFByb2R1Y3QodmVjdG9yOiBWZWN0b3IyRCkge1xuICAgICAgICByZXR1cm4gdGhpcy5feCAqIHZlY3Rvci5feCArIHRoaXMuX3kgKiB2ZWN0b3IuX3k7XG4gICAgfVxuXG4gICAgYW5nbGUodmVjdG9yOiBWZWN0b3IyRCkge1xuICAgICAgICByZXR1cm4gTWF0aC5hY29zKHRoaXMuZG90UHJvZHVjdCh2ZWN0b3IpIC8gKHRoaXMubm9ybSAqIHZlY3Rvci5ub3JtKSk7XG4gICAgfVxuXG4gICAgbXVsdGlwbHkoZmFjdG9yOiBudW1iZXIpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBWZWN0b3IyRCh7XG4gICAgICAgICAgICB4OiBmYWN0b3IgKiB0aGlzLl94LFxuICAgICAgICAgICAgeTogZmFjdG9yICogdGhpcy5feVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBhZGQocG9pbnQ6IFZlY3RvcjJEKSB7XG4gICAgICAgIHJldHVybiBuZXcgVmVjdG9yMkQoe1xuICAgICAgICAgICAgeDogdGhpcy5feCArIHBvaW50Ll94LFxuICAgICAgICAgICAgeTogdGhpcy5feSArIHBvaW50Ll95XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHN1YnN0cmFjdChwb2ludDogVmVjdG9yMkQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYWRkKHRoaXMubXVsdGlwbHkoLTEpKTtcbiAgICB9XG5cbiAgICBjb3B5KCkge1xuICAgICAgICByZXR1cm4gbmV3IFZlY3RvcjJEKHtcbiAgICAgICAgICAgIHg6IHRoaXMuX3gsXG4gICAgICAgICAgICB5OiB0aGlzLl95XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiIsImltcG9ydCB7VmVjdG9yMkR9IGZyb20gXCIuL1ZlY3RvcjJEXCI7XG5pbXBvcnQge1BvaW50MkR9IGZyb20gXCIuL1BvaW50MkRcIjtcblxuZXhwb3J0IGNsYXNzIFNwbGluZSB7XG4gICAgcHJpdmF0ZSBfcG9pbnRzOiBQb2ludDJEW107XG5cbiAgICBjb25zdHJ1Y3Rvcihwb2ludHM6IFBvaW50MkRbXSA9IFtdKSB7XG4gICAgICAgIHRoaXMuX3BvaW50cyA9IHBvaW50cztcbiAgICB9XG5cbiAgICBnZXQgcG9pbnRzKCk6IHJlYWRvbmx5IFBvaW50MkRbXSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9wb2ludHM7XG4gICAgfVxuXG4gICAgZ2V0IHBvaW50TGVuZ3RoKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcG9pbnRzLmxlbmd0aDtcbiAgICB9XG5cbiAgICBnZXQgbGFzdFBvaW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcG9pbnRzW3RoaXMucG9pbnRMZW5ndGggLSAxXTtcbiAgICB9XG5cbiAgICBnZXQgYmVmb3JlTGFzdFBvaW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcG9pbnRzW3RoaXMucG9pbnRMZW5ndGggLSAyXTtcbiAgICB9XG5cbiAgICBmaW5kUG9pbnQocG9pbnQ6IFBvaW50MkQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3BvaW50cy5maW5kKChwMikgPT4gcG9pbnQueCA9PSBwMi54ICYmIHBvaW50LnkgPT0gcDIueSk7XG4gICAgfVxuXG4gICAgYWRkUG9pbnQocG9pbnQ6IFBvaW50MkQpIHtcbiAgICAgICAgdGhpcy5fcG9pbnRzLnB1c2gocG9pbnQpO1xuICAgIH1cblxuICAgIGNsZWFyKCkge1xuICAgICAgICB0aGlzLl9wb2ludHMgPSBbXTtcbiAgICB9XG5cbiAgICBzaW1wbGlmeShtaW5Ob3JtOiBudW1iZXIsIG1pbkFuZ2xlOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5fcG9pbnRzID0gdGhpcy5fcG9pbnRzLnJlZHVjZTxQb2ludDJEW10+KChwcmV2LCBpdGVtKSA9PiB7XG4gICAgICAgICAgICBpZiAocHJldi5sZW5ndGggPD0gMykgcmV0dXJuIFsuLi5wcmV2LCBpdGVtXTtcblxuICAgICAgICAgICAgY29uc3QgYmVmb3JlTGFzdFBvaW50ID0gcHJldltwcmV2Lmxlbmd0aCAtIDJdO1xuICAgICAgICAgICAgY29uc3QgbGFzdFBvaW50ID0gcHJldltwcmV2Lmxlbmd0aCAtIDFdO1xuICAgICAgICAgICAgY29uc3QgdkFDID0gbmV3IFZlY3RvcjJEKGJlZm9yZUxhc3RQb2ludCwgaXRlbSk7XG4gICAgICAgICAgICBjb25zdCB2QUIgPSBuZXcgVmVjdG9yMkQoYmVmb3JlTGFzdFBvaW50LCBsYXN0UG9pbnQpO1xuICAgICAgICAgICAgY29uc3QgdkJDID0gbmV3IFZlY3RvcjJEKGxhc3RQb2ludCwgaXRlbSk7XG5cbiAgICAgICAgICAgIGlmICh2QUMubm9ybSA8IG1pbk5vcm0pIHByZXYucG9wKCk7XG5cbiAgICAgICAgICAgIGNvbnN0IGRlZ0FuZ2xlID0gdkFCLmFuZ2xlKHZCQykgKiAxODAgLyBNYXRoLlBJO1xuXG4gICAgICAgICAgICBpZiAoZGVnQW5nbGUgPCBtaW5BbmdsZSkgcHJldi5wb3AoKTtcblxuICAgICAgICAgICAgcHJldi5wdXNoKGl0ZW0pO1xuXG4gICAgICAgICAgICByZXR1cm4gcHJldjtcbiAgICAgICAgfSwgW10pO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGdldCBhbmdsZXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9wb2ludHMubWFwKChjdXJyZW50UG9pbnQsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICBpZiAoaW5kZXggKyAxIDw9IDEgfHwgaW5kZXggKyAxID49IHRoaXMuX3BvaW50cy5sZW5ndGgpIHJldHVybiBJbmZpbml0eTtcblxuICAgICAgICAgICAgY29uc3QgbGFzdFBvaW50ID0gdGhpcy5fcG9pbnRzW2luZGV4IC0gMV07XG4gICAgICAgICAgICBjb25zdCBuZXh0UG9pbnQgPSB0aGlzLl9wb2ludHNbaW5kZXggKyAxXTtcblxuICAgICAgICAgICAgY29uc3QgdkJBID0gbmV3IFZlY3RvcjJEKGN1cnJlbnRQb2ludCwgbGFzdFBvaW50KTtcbiAgICAgICAgICAgIGNvbnN0IHZCQyA9IG5ldyBWZWN0b3IyRChjdXJyZW50UG9pbnQsIG5leHRQb2ludCk7XG5cbiAgICAgICAgICAgIHJldHVybiB2QkEuYW5nbGUodkJDKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZ2V0IGFyZWFzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcG9pbnRzLm1hcCgoY3VycmVudFBvaW50LCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgaWYgKGluZGV4ICsgMSA8PSAxIHx8IGluZGV4ICsgMSA+PSB0aGlzLl9wb2ludHMubGVuZ3RoKSByZXR1cm4gSW5maW5pdHk7XG5cbiAgICAgICAgICAgIGNvbnN0IGxhc3RQb2ludCA9IHRoaXMuX3BvaW50c1tpbmRleCAtIDFdO1xuICAgICAgICAgICAgY29uc3QgbmV4dFBvaW50ID0gdGhpcy5fcG9pbnRzW2luZGV4ICsgMV07XG5cbiAgICAgICAgICAgIGNvbnN0IHZCQSA9IG5ldyBWZWN0b3IyRChjdXJyZW50UG9pbnQsIGxhc3RQb2ludCk7XG4gICAgICAgICAgICBjb25zdCB2QkMgPSBuZXcgVmVjdG9yMkQoY3VycmVudFBvaW50LCBuZXh0UG9pbnQpO1xuICAgICAgICAgICAgY29uc3QgdkFDID0gbmV3IFZlY3RvcjJEKGxhc3RQb2ludCwgbmV4dFBvaW50KTtcblxuICAgICAgICAgICAgY29uc3QgcyA9ICh2QUMubm9ybSArIHZCQS5ub3JtICsgdkJDLm5vcm0pIC8gMjtcblxuICAgICAgICAgICAgcmV0dXJuIE1hdGguc3FydChzICogKHMgLSB2QUMubm9ybSkgKiAocyAtIHZCQS5ub3JtKSAqIChzIC0gdkJDLm5vcm0pKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgY29udHJvbFBvaW50cyh2YWx1ZXM6IG51bWJlcltdLCBudW1iZXJPZkNvbnRyb2xQb2ludHM6IG51bWJlcikge1xuICAgICAgICBudW1iZXJPZkNvbnRyb2xQb2ludHMgPSBNYXRoLm1heChudW1iZXJPZkNvbnRyb2xQb2ludHMsIDIpO1xuXG4gICAgICAgIGNvbnN0IHZhbHVlc1dpdGhJbmRleGVzID0gdGhpcy5hcmVhcy5tYXAoKHZhbHVlLCBpbmRleCkgPT4gW3ZhbHVlLCBpbmRleF0pO1xuXG4gICAgICAgIHZhbHVlc1dpdGhJbmRleGVzLnNvcnQoKGEsIGIpID0+IHtcbiAgICAgICAgICAgIGlmIChOdW1iZXIuaXNOYU4oYlswXSkpIHJldHVybiAtMTtcblxuICAgICAgICAgICAgaWYgKGFbMF0gPCBiWzBdKSByZXR1cm4gMTtcbiAgICAgICAgICAgIGVsc2UgaWYgKGFbMF0gPiBiWzBdKSByZXR1cm4gLTE7XG4gICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHZhbHVlc1dpdGhJbmRleGVzXG4gICAgICAgICAgICAuc2xpY2UoMCwgbnVtYmVyT2ZDb250cm9sUG9pbnRzKVxuICAgICAgICAgICAgLnNvcnQoKGEsIGIpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoYVsxXSA8IGJbMV0pIHJldHVybiAxO1xuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGFbMV0gPiBiWzFdKSByZXR1cm4gLTE7XG4gICAgICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLm1hcCgoeCkgPT4gdGhpcy5fcG9pbnRzW3hbMV1dKTtcbiAgICB9XG5cbiAgICB0cmFuc2xhdGUoeDogbnVtYmVyLCB5OiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5fcG9pbnRzID0gdGhpcy5fcG9pbnRzLm1hcCgocG9pbnQpID0+IHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgeDogcG9pbnQueCArIHgsXG4gICAgICAgICAgICAgICAgeTogcG9pbnQueSArIHlcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGNvcHkoKSB7XG4gICAgICAgIHJldHVybiBuZXcgU3BsaW5lKHRoaXMuX3BvaW50cyk7XG4gICAgfVxuXG4gICAgY2F0bXVsbFJvbUludGVycG9sYXRpb24oXG4gICAgICAgIG5iSW50ZXJwb2xhdGlvblBvaW50c0ZuOiAocEE6IFBvaW50MkQsIHBCOiBQb2ludDJELCBwQzogUG9pbnQyRCwgcEQ6IFBvaW50MkQpID0+IG51bWJlclxuICAgICkge1xuICAgICAgICBjb25zdCBsYXN0UG9pbnQgPSB0aGlzLl9wb2ludHNbdGhpcy5fcG9pbnRzLmxlbmd0aCAtIDFdO1xuICAgICAgICB0aGlzLl9wb2ludHMgPSB0aGlzLl9wb2ludHMucmVkdWNlPFBvaW50MkRbXT4oKHByZXYsIHBDLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgaWYgKGluZGV4ICsgMSA8PSAyIHx8IGluZGV4ICsgMSA+PSB0aGlzLl9wb2ludHMubGVuZ3RoKSByZXR1cm4gcHJldjtcblxuICAgICAgICAgICAgY29uc3QgYWRkID0gKHB5OiBQb2ludDJEKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKCFwcmV2LmZpbmQoKHB4KSA9PiBweC54ID09PSBweS54ICYmIHB4LnkgPT09IHB5LnkpKSB7XG4gICAgICAgICAgICAgICAgICAgIHByZXYucHVzaChweSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgY29uc3QgcEEgPSB0aGlzLl9wb2ludHNbaW5kZXggLSAyXTtcbiAgICAgICAgICAgIGNvbnN0IHBCID0gdGhpcy5fcG9pbnRzW2luZGV4IC0gMV07XG4gICAgICAgICAgICBjb25zdCBwRCA9IHRoaXMuX3BvaW50c1tpbmRleCArIDFdO1xuXG4gICAgICAgICAgICBhZGQocEEpO1xuICAgICAgICAgICAgYWRkKHBCKTtcblxuICAgICAgICAgICAgY29uc3QgbmJJbnRlcnBvbGF0aW9uUG9pbnRzID0gbmJJbnRlcnBvbGF0aW9uUG9pbnRzRm4ocEEsIHBCLCBwQywgcEQpICsgMjtcblxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDI7IGkgPCBuYkludGVycG9sYXRpb25Qb2ludHM7IGkrKykge1xuICAgICAgICAgICAgICAgIGNvbnN0IHQgPSBpIC8gbmJJbnRlcnBvbGF0aW9uUG9pbnRzO1xuXG4gICAgICAgICAgICAgICAgY29uc3QgcG9pbnQgPSB7XG4gICAgICAgICAgICAgICAgICAgIHg6IFNwbGluZS5jYXRtdWxsUm9tKHQsIHBBLngsIHBCLngsIHBDLngsIHBELngpLFxuICAgICAgICAgICAgICAgICAgICB5OiBTcGxpbmUuY2F0bXVsbFJvbSh0LCBwQS55LCBwQi55LCBwQy55LCBwRC55KVxuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICBwcmV2ID0gW1xuICAgICAgICAgICAgICAgICAgICAuLi5wcmV2LFxuICAgICAgICAgICAgICAgICAgICBwb2ludCxcbiAgICAgICAgICAgICAgICBdO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBhZGQocEMpO1xuXG4gICAgICAgICAgICByZXR1cm4gcHJldjtcbiAgICAgICAgfSwgW10pO1xuXG4gICAgICAgIHRoaXMuX3BvaW50cyA9IFtcbiAgICAgICAgICAgIC4uLnRoaXMuX3BvaW50cyxcbiAgICAgICAgICAgIGxhc3RQb2ludFxuICAgICAgICBdO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHN0YXRpYyBjYXRtdWxsUm9tKHQ6IG51bWJlciwgbUE6IG51bWJlciwgbUI6IG51bWJlciwgbUM6IG51bWJlciwgbUQ6IG51bWJlcikge1xuICAgICAgICBjb25zdCBhID0gMyAqIG1CIC0gbUEgLSAzICogbUMgKyBtRDtcbiAgICAgICAgY29uc3QgYiA9IDIgKiBtQSAtIDUgKiBtQiArIDQgKiBtQyAtIG1EO1xuICAgICAgICBjb25zdCBjID0gKG1DIC0gbUEpICogdDtcbiAgICAgICAgY29uc3QgZCA9IDIgKiBtQjtcbiAgICAgICAgY29uc3QgZmluYWwgPSBhICogdCAqKiAzICsgYiAqIHQgKiogMiArIGMgKyBkO1xuICAgICAgICByZXR1cm4gMC41ICogZmluYWw7XG4gICAgfVxufVxuIiwiaW1wb3J0IHtTcGxpbmV9IGZyb20gXCIuL1NwbGluZVwiO1xuaW1wb3J0IHtQb2ludDJEfSBmcm9tIFwiLi9Qb2ludDJEXCI7XG5cbmV4cG9ydCBjbGFzcyBDYW52YXNNYW5hZ2VyIHtcbiAgICBwcml2YXRlIF9jYW52YXM6IEhUTUxDYW52YXNFbGVtZW50O1xuICAgIHByaXZhdGUgX2NvbnRleHQ6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRDtcbiAgICBwcml2YXRlIF9pc0RyYXdpbmc6IGJvb2xlYW47XG4gICAgcHJpdmF0ZSBfcGl4ZWxSYXRpbzogbnVtYmVyO1xuXG4gICAgZ2V0IGNhbnZhcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NhbnZhcztcbiAgICB9XG5cbiAgICBnZXQgcGl4ZWxSYXRpbygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3BpeGVsUmF0aW87XG4gICAgfVxuXG4gICAgZ2V0IGNvbnRleHQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jb250ZXh0O1xuICAgIH1cblxuICAgIGdldCBpc0RyYXdpbmcoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pc0RyYXdpbmc7XG4gICAgfVxuXG4gICAgc2V0IGlzRHJhd2luZyhpc0RyYXdpbmc6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5faXNEcmF3aW5nID0gaXNEcmF3aW5nO1xuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQsIHNjYWxlRmFjdG9yPzogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuX2lzRHJhd2luZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9jYW52YXMgPSBjYW52YXM7XG4gICAgICAgIHRoaXMuX3BpeGVsUmF0aW8gPSBzY2FsZUZhY3RvciB8fCB3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbyB8fCAxO1xuXG4gICAgICAgIGNvbnN0IHJlY3QgPSB0aGlzLl9jYW52YXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgIGNvbnN0IGNvbnRleHQgPSB0aGlzLl9jYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuXG4gICAgICAgIHRoaXMuX2NhbnZhcy5zdHlsZS53aWR0aCA9IHRoaXMuX2NhbnZhcy53aWR0aCArICdweCc7XG4gICAgICAgIHRoaXMuX2NhbnZhcy5zdHlsZS5oZWlnaHQgPSB0aGlzLl9jYW52YXMuaGVpZ2h0ICsgJ3B4JztcblxuICAgICAgICB0aGlzLl9jYW52YXMud2lkdGggPSByZWN0LndpZHRoICogdGhpcy5fcGl4ZWxSYXRpbztcbiAgICAgICAgdGhpcy5fY2FudmFzLmhlaWdodCA9IHJlY3QuaGVpZ2h0ICogdGhpcy5fcGl4ZWxSYXRpbztcblxuICAgICAgICBjb250ZXh0LnNjYWxlKHRoaXMuX3BpeGVsUmF0aW8sIHRoaXMuX3BpeGVsUmF0aW8pO1xuXG4gICAgICAgIHRoaXMuX2NvbnRleHQgPSBjb250ZXh0O1xuICAgIH1cblxuICAgIGNsZWFyKCkge1xuICAgICAgICB0aGlzLmNvbnRleHQuY2xlYXJSZWN0KDAsIDAsIHRoaXMuX2NvbnRleHQuY2FudmFzLndpZHRoLCB0aGlzLl9jb250ZXh0LmNhbnZhcy5oZWlnaHQpO1xuICAgIH1cblxuICAgIGdldFBvaW50KGU6IE1vdXNlRXZlbnQpOiBQb2ludDJEIHtcbiAgICAgICAgY29uc3QgcmVjdCA9IHRoaXMuX2NhbnZhcy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgeDogZS5jbGllbnRYIC0gcmVjdC5sZWZ0LFxuICAgICAgICAgICAgeTogZS5jbGllbnRZIC0gcmVjdC50b3BcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBkcmF3UG9pbnQoXG4gICAgICAgIHBvaW50OiBQb2ludDJELFxuICAgICAgICByYWRpdXMgPSA1LFxuICAgICAgICBmaWxsQ29sb3IgPSBcImJsYWNrXCIsXG4gICAgICAgIHN0cm9rZUNvbG9yID0gXCJibGFja1wiLFxuICAgICAgICBsaW5lV2lkdGggPSAwXG4gICAgKSB7XG4gICAgICAgIGlmICghcG9pbnQpIHJldHVybjtcbiAgICAgICAgdGhpcy5fY29udGV4dC5iZWdpblBhdGgoKTtcbiAgICAgICAgdGhpcy5fY29udGV4dC5saW5lV2lkdGggPSBsaW5lV2lkdGg7XG4gICAgICAgIHRoaXMuX2NvbnRleHQubGluZUNhcCA9IFwicm91bmRcIjtcbiAgICAgICAgdGhpcy5fY29udGV4dC5maWxsU3R5bGUgPSBmaWxsQ29sb3I7XG4gICAgICAgIHRoaXMuX2NvbnRleHQuc3Ryb2tlU3R5bGUgPSBzdHJva2VDb2xvcjtcbiAgICAgICAgdGhpcy5fY29udGV4dC5hcmMocG9pbnQueCwgcG9pbnQueSwgcmFkaXVzLCAwLCAyICogTWF0aC5QSSk7XG4gICAgICAgIHRoaXMuX2NvbnRleHQuZmlsbCgpO1xuICAgICAgICB0aGlzLl9jb250ZXh0LnN0cm9rZSgpO1xuICAgICAgICB0aGlzLl9jb250ZXh0LmNsb3NlUGF0aCgpO1xuICAgIH1cblxuICAgIGRyYXdQb2ludHMoXG4gICAgICAgIHBvaW50czogUG9pbnQyRFtdIHwgcmVhZG9ubHkgUG9pbnQyRFtdLFxuICAgICAgICByYWRpdXMgPSA1LFxuICAgICAgICBmaWxsQ29sb3IgPSBcImJsYWNrXCIsXG4gICAgICAgIHN0cm9rZUNvbG9yID0gXCJibGFja1wiLFxuICAgICAgICBsaW5lV2lkdGggPSAwXG4gICAgKSB7XG4gICAgICAgIHBvaW50cy5mb3JFYWNoKChwb2ludCkgPT4gdGhpcy5kcmF3UG9pbnQocG9pbnQsIHJhZGl1cywgZmlsbENvbG9yLCBzdHJva2VDb2xvciwgbGluZVdpZHRoKSk7XG4gICAgfVxuXG4gICAgZHJhd0xpbmUoXG4gICAgICAgIHBvaW50czogUG9pbnQyRFtdIHwgcmVhZG9ubHkgUG9pbnQyRFtdLFxuICAgICAgICBzdHJva2VDb2xvciA9IFwiYmxhY2tcIixcbiAgICAgICAgbGluZVdpZHRoID0gMVxuICAgICkge1xuICAgICAgICBwb2ludHMuZm9yRWFjaCgocG9pbnQsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICBpZiAoaW5kZXggPj0gcG9pbnRzLmxlbmd0aCAtIDEpIHJldHVybjtcblxuICAgICAgICAgICAgdGhpcy5fY29udGV4dC5iZWdpblBhdGgoKTtcbiAgICAgICAgICAgIHRoaXMuX2NvbnRleHQubGluZVdpZHRoID0gbGluZVdpZHRoO1xuICAgICAgICAgICAgdGhpcy5fY29udGV4dC5saW5lQ2FwID0gXCJyb3VuZFwiO1xuICAgICAgICAgICAgdGhpcy5fY29udGV4dC5zdHJva2VTdHlsZSA9IHN0cm9rZUNvbG9yO1xuICAgICAgICAgICAgdGhpcy5fY29udGV4dC5tb3ZlVG8ocG9pbnQueCwgcG9pbnQueSk7XG4gICAgICAgICAgICB0aGlzLl9jb250ZXh0LmxpbmVUbyhwb2ludHNbaW5kZXggKyAxXS54LCBwb2ludHNbaW5kZXggKyAxXS55KTtcbiAgICAgICAgICAgIHRoaXMuX2NvbnRleHQuc3Ryb2tlKCk7XG4gICAgICAgICAgICB0aGlzLl9jb250ZXh0LmNsb3NlUGF0aCgpO1xuICAgICAgICB9KTtcbiAgICB9XG59XG4iLCJpbXBvcnQge1NwbGluZX0gZnJvbSBcIi4vY2xhc3Nlcy9TcGxpbmVcIjtcbmltcG9ydCB7Q2FudmFzTWFuYWdlcn0gZnJvbSBcIi4vY2xhc3Nlcy9DYW52YXNNYW5hZ2VyXCI7XG5pbXBvcnQge1ZlY3RvcjJEfSBmcm9tIFwiLi9jbGFzc2VzL1ZlY3RvcjJEXCI7XG5pbXBvcnQge1BvaW50MkR9IGZyb20gXCIuL2NsYXNzZXMvUG9pbnQyRFwiO1xuXG5jb25zdCBuYkNvbnRyb2xQb2ludHNFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzLW5iLWNvbnRyb2wtcG9pbnRzXCIpIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XG5jb25zdCBtaW5BbmdsZUVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInMtYW5nbGVcIikgYXMgSFRNTElucHV0RWxlbWVudDtcbmNvbnN0IG1pbk5vcm1FbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzLW5vcm1cIikgYXMgSFRNTElucHV0RWxlbWVudDtcbmNvbnN0IG5iSW50ZXJwb2xhdGlvblBvaW50c0VsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInMtaW50ZXJwb2xhdGlvbi1wb2ludHNcIikgYXMgSFRNTElucHV0RWxlbWVudDtcblxuY29uc3QgZHJhd2luZ0NhbnZhc0VsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInMtZHJhd2luZ1wiKSBhcyBIVE1MQ2FudmFzRWxlbWVudDtcbmNvbnN0IGRyYXdpbmdQb2ludHNDYW52YXNFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzLWRyYXdpbmctcG9pbnRzXCIpIGFzIEhUTUxDYW52YXNFbGVtZW50O1xuY29uc3Qgc2ltcGxpZmllZENhbnZhc0VsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInMtc2ltcGxpZmllZFwiKSBhcyBIVE1MQ2FudmFzRWxlbWVudDtcbmNvbnN0IGNvbnRyb2xQb2ludHNDYW52YXNFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzLWNvbnRyb2wtcG9pbnRzXCIpIGFzIEhUTUxDYW52YXNFbGVtZW50O1xuY29uc3Qgc2ltcGxpZmllZEludGVycG9sYXRpb25FbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzLXNpbXBsaWZpZWQtaW50ZXJwb2xhdGlvblwiKSBhcyBIVE1MQ2FudmFzRWxlbWVudDtcbmNvbnN0IGNvbnRyb2xQb2ludHNJbnRlcnBvbGF0aW9uRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicy1jb250cm9sLXBvaW50cy1pbnRlcnBvbGF0aW9uXCIpIGFzIEhUTUxDYW52YXNFbGVtZW50O1xuY29uc3Qgc2ltcGxpZmllZEludGVycG9sYXRpb25Eb25lRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicy1zaW1wbGlmaWVkLWludGVycG9sYXRpb24tZG9uZVwiKSBhcyBIVE1MQ2FudmFzRWxlbWVudDtcbmNvbnN0IGNvbnRyb2xQb2ludHNJbnRlcnBvbGF0aW9uRG9uZUVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInMtY29udHJvbC1wb2ludHMtaW50ZXJwb2xhdGlvbi1kb25lXCIpIGFzIEhUTUxDYW52YXNFbGVtZW50O1xuXG5jb25zdCBkcmF3aW5nQ2FudmFzTWFuYWdlciA9IG5ldyBDYW52YXNNYW5hZ2VyKGRyYXdpbmdDYW52YXNFbGVtZW50KTtcbmNvbnN0IGRyYXdpbmdQb2ludHNDYW52YXNNYW5hZ2VyID0gbmV3IENhbnZhc01hbmFnZXIoZHJhd2luZ1BvaW50c0NhbnZhc0VsZW1lbnQpO1xuY29uc3Qgc2ltcGxpZmllZE1hbmFnZXIgPSBuZXcgQ2FudmFzTWFuYWdlcihzaW1wbGlmaWVkQ2FudmFzRWxlbWVudCk7XG5jb25zdCBjb250cm9sUG9pbnRzTWFuYWdlciA9IG5ldyBDYW52YXNNYW5hZ2VyKGNvbnRyb2xQb2ludHNDYW52YXNFbGVtZW50KTtcbmNvbnN0IHNpbXBsaWZpZWRJbnRlcnBvbGF0aW9uTWFuYWdlciA9IG5ldyBDYW52YXNNYW5hZ2VyKHNpbXBsaWZpZWRJbnRlcnBvbGF0aW9uRWxlbWVudCk7XG5jb25zdCBjb250cm9sUG9pbnRzSW50ZXJwb2xhdGlvbk1hbmFnZXIgPSBuZXcgQ2FudmFzTWFuYWdlcihjb250cm9sUG9pbnRzSW50ZXJwb2xhdGlvbkVsZW1lbnQpO1xuY29uc3Qgc2ltcGxpZmllZEludGVycG9sYXRpb25Eb25lTWFuYWdlciA9IG5ldyBDYW52YXNNYW5hZ2VyKHNpbXBsaWZpZWRJbnRlcnBvbGF0aW9uRG9uZUVsZW1lbnQpO1xuY29uc3QgY29udHJvbFBvaW50c0ludGVycG9sYXRpb25Eb25lTWFuYWdlciA9IG5ldyBDYW52YXNNYW5hZ2VyKGNvbnRyb2xQb2ludHNJbnRlcnBvbGF0aW9uRG9uZUVsZW1lbnQpO1xuXG5jb25zdCBzcGxpbmUgPSBuZXcgU3BsaW5lKCk7XG5sZXQgbmJDb250cm9sUG9pbnRzID0gNDtcbmxldCBtaW5BbmdsZSA9IDE7XG5sZXQgbWluTm9ybSA9IDIwO1xubGV0IG5iSW50ZXJwb2xhdGlvblBvaW50cyA9IDM7XG5jb25zdCBpbnRlcnBvbGF0aW9uRm4gPSAocEE6IFBvaW50MkQsIHBCOiBQb2ludDJELCBwQzogUG9pbnQyRCkgPT4ge1xuICAgIGlmIChuYkludGVycG9sYXRpb25Qb2ludHMgPj0gMCkgcmV0dXJuIG5iSW50ZXJwb2xhdGlvblBvaW50cztcblxuICAgIGNvbnN0IHZCQyA9IG5ldyBWZWN0b3IyRChwQiwgcEMpO1xuICAgIGNvbnN0IHZCQSA9IG5ldyBWZWN0b3IyRChwQiwgcEEpO1xuICAgIGNvbnN0IGFuZ2xlID0gdkJBLmFuZ2xlKHZCQyk7XG5cbiAgICAvLyBub3JtIGdyZWF0ZXIgLT4gbW9yZSBwb2ludHNcbiAgICAvLyBhbmdsZSBncmVhdGVyIC0+IG1vcmUgcG9pbnRzXG4gICAgY29uc3Qgbm9ybUZhY3RvciA9IDAuMDIgKiB2QkMubm9ybTtcbiAgICBjb25zdCBhbmdsZUZhY3RvciA9IDEwICogKGFuZ2xlIC8gTWF0aC5QSSk7XG4gICAgcmV0dXJuIE1hdGguY2VpbChub3JtRmFjdG9yICogYW5nbGVGYWN0b3IpO1xufTtcblxuZnVuY3Rpb24gY2xlYXJBbGwoKSB7XG4gICAgZHJhd2luZ0NhbnZhc01hbmFnZXIuY2xlYXIoKTtcbiAgICBzaW1wbGlmaWVkTWFuYWdlci5jbGVhcigpO1xuICAgIGNvbnRyb2xQb2ludHNNYW5hZ2VyLmNsZWFyKCk7XG4gICAgc2ltcGxpZmllZEludGVycG9sYXRpb25NYW5hZ2VyLmNsZWFyKCk7XG4gICAgY29udHJvbFBvaW50c0ludGVycG9sYXRpb25NYW5hZ2VyLmNsZWFyKCk7XG4gICAgc2ltcGxpZmllZEludGVycG9sYXRpb25Eb25lTWFuYWdlci5jbGVhcigpO1xuICAgIGNvbnRyb2xQb2ludHNJbnRlcnBvbGF0aW9uRG9uZU1hbmFnZXIuY2xlYXIoKTtcbiAgICBkcmF3aW5nUG9pbnRzQ2FudmFzTWFuYWdlci5jbGVhcigpO1xufVxuXG5mdW5jdGlvbiB1cGRhdGUoKSB7XG4gICAgY2xlYXJBbGwoKTtcblxuICAgIGRyYXdpbmdDYW52YXNNYW5hZ2VyLmRyYXdMaW5lKHNwbGluZS5wb2ludHMsIFwiYmxhY2tcIiwgMyk7XG5cbiAgICBkcmF3aW5nUG9pbnRzQ2FudmFzTWFuYWdlci5kcmF3TGluZShzcGxpbmUucG9pbnRzLCBcImJsYWNrXCIsIDMpO1xuICAgIGRyYXdpbmdQb2ludHNDYW52YXNNYW5hZ2VyLmRyYXdQb2ludHMoc3BsaW5lLnBvaW50cywgMC41LCBcInBpbmtcIiwgXCJwaW5rXCIpO1xuXG4gICAgY29uc3Qgc2ltcGxpZmllZFNwbGluZSA9IHNwbGluZS5jb3B5KCkuc2ltcGxpZnkobWluTm9ybSwgbWluQW5nbGUpO1xuICAgIGNvbnN0IGNvbnRyb2xQb2ludHMgPSBzaW1wbGlmaWVkU3BsaW5lLmNvbnRyb2xQb2ludHMoc3BsaW5lLmFyZWFzLCBuYkNvbnRyb2xQb2ludHMpO1xuICAgIHNpbXBsaWZpZWRNYW5hZ2VyLmRyYXdMaW5lKHNpbXBsaWZpZWRTcGxpbmUucG9pbnRzLCBcImJsYWNrXCIsIDMpO1xuICAgIHNpbXBsaWZpZWRNYW5hZ2VyLmRyYXdQb2ludHMoc2ltcGxpZmllZFNwbGluZS5wb2ludHMsIDMsIFwicGlua1wiLCBcInBpbmtcIik7XG4gICAgc2ltcGxpZmllZE1hbmFnZXIuZHJhd1BvaW50cyhjb250cm9sUG9pbnRzLCA1LCBcInBpbmtcIiwgXCJibGFja1wiLCAyKTtcblxuICAgIGNvbnN0IGNvbnRyb2xQb2ludHNTcGxpbmUgPSBuZXcgU3BsaW5lKGNvbnRyb2xQb2ludHMpO1xuICAgIGNvbnRyb2xQb2ludHNNYW5hZ2VyLmRyYXdMaW5lKGNvbnRyb2xQb2ludHNTcGxpbmUucG9pbnRzLCBcImJsYWNrXCIsIDMpO1xuICAgIGNvbnRyb2xQb2ludHNNYW5hZ2VyLmRyYXdQb2ludHMoY29udHJvbFBvaW50c1NwbGluZS5wb2ludHMsIDUsIFwicGlua1wiLCBcImJsYWNrXCIsIDIpO1xuXG4gICAgY29uc3QgaW50ZXJwb2xhdGVkU2ltcGxpZmllZFNwbGluZSA9IHNpbXBsaWZpZWRTcGxpbmUuY29weSgpLmNhdG11bGxSb21JbnRlcnBvbGF0aW9uKGludGVycG9sYXRpb25Gbik7XG4gICAgc2ltcGxpZmllZEludGVycG9sYXRpb25NYW5hZ2VyLmRyYXdMaW5lKGludGVycG9sYXRlZFNpbXBsaWZpZWRTcGxpbmUucG9pbnRzLCBcImJsYWNrXCIsIDMpO1xuICAgIHNpbXBsaWZpZWRJbnRlcnBvbGF0aW9uTWFuYWdlci5kcmF3UG9pbnRzKGludGVycG9sYXRlZFNpbXBsaWZpZWRTcGxpbmUucG9pbnRzLCAyLCBcInJlZFwiLCBcInJlZFwiKTtcbiAgICBzaW1wbGlmaWVkSW50ZXJwb2xhdGlvbk1hbmFnZXIuZHJhd1BvaW50cyhzaW1wbGlmaWVkU3BsaW5lLnBvaW50cywgMywgXCJwaW5rXCIsIFwicGlua1wiKTtcbiAgICBzaW1wbGlmaWVkSW50ZXJwb2xhdGlvbk1hbmFnZXIuZHJhd1BvaW50cyhjb250cm9sUG9pbnRzLCA1LCBcInBpbmtcIiwgXCJibGFja1wiLCAyKTtcblxuICAgIGNvbnN0IGludGVycG9sYXRlZENvbnRyb2xQb2ludHNTcGxpbmUgPSBjb250cm9sUG9pbnRzU3BsaW5lLmNvcHkoKS5jYXRtdWxsUm9tSW50ZXJwb2xhdGlvbihpbnRlcnBvbGF0aW9uRm4pO1xuICAgIGNvbnRyb2xQb2ludHNJbnRlcnBvbGF0aW9uTWFuYWdlci5kcmF3TGluZShpbnRlcnBvbGF0ZWRDb250cm9sUG9pbnRzU3BsaW5lLnBvaW50cywgXCJibGFja1wiLCAzKTtcbiAgICBjb250cm9sUG9pbnRzSW50ZXJwb2xhdGlvbk1hbmFnZXIuZHJhd1BvaW50cyhpbnRlcnBvbGF0ZWRDb250cm9sUG9pbnRzU3BsaW5lLnBvaW50cywgMiwgXCJyZWRcIiwgXCJyZWRcIik7XG4gICAgY29udHJvbFBvaW50c0ludGVycG9sYXRpb25NYW5hZ2VyLmRyYXdQb2ludHMoY29udHJvbFBvaW50cywgNSwgXCJwaW5rXCIsIFwiYmxhY2tcIiwgMik7XG5cbiAgICBjb250cm9sUG9pbnRzSW50ZXJwb2xhdGlvbkRvbmVNYW5hZ2VyLmRyYXdMaW5lKGludGVycG9sYXRlZENvbnRyb2xQb2ludHNTcGxpbmUucG9pbnRzLCBcImJsYWNrXCIsIDMpO1xuICAgIHNpbXBsaWZpZWRJbnRlcnBvbGF0aW9uRG9uZU1hbmFnZXIuZHJhd0xpbmUoaW50ZXJwb2xhdGVkU2ltcGxpZmllZFNwbGluZS5wb2ludHMsIFwiYmxhY2tcIiwgMyk7XG59XG5cbmZ1bmN0aW9uIG1vdXNlTW92ZShlOiBNb3VzZUV2ZW50KSB7XG4gICAgaWYgKCFkcmF3aW5nQ2FudmFzTWFuYWdlci5pc0RyYXdpbmcpIHJldHVybjtcblxuICAgIHNwbGluZS5hZGRQb2ludChkcmF3aW5nQ2FudmFzTWFuYWdlci5nZXRQb2ludChlKSk7XG4gICAgdXBkYXRlKCk7XG59XG5cbmZ1bmN0aW9uIG1vdXNlRG93bihlOiBNb3VzZUV2ZW50KSB7XG4gICAgZHJhd2luZ0NhbnZhc01hbmFnZXIuaXNEcmF3aW5nID0gdHJ1ZTtcbiAgICBzcGxpbmUuY2xlYXIoKTtcblxuICAgIG1vdXNlTW92ZShlKTtcbn1cblxuZnVuY3Rpb24gbW91c2VVcChlOiBNb3VzZUV2ZW50KSB7XG4gICAgZHJhd2luZ0NhbnZhc01hbmFnZXIuaXNEcmF3aW5nID0gZmFsc2U7XG59XG5cbmRyYXdpbmdDYW52YXNFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW1vdmVcIiwgbW91c2VNb3ZlKTtcbmRyYXdpbmdDYW52YXNFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgbW91c2VEb3duKTtcbmRyYXdpbmdDYW52YXNFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZXVwXCIsIG1vdXNlVXApO1xuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNldXBcIiwgbW91c2VVcCk7XG5cbmZ1bmN0aW9uIG9uQ2hhbmdlKCkge1xuICAgIG5iQ29udHJvbFBvaW50cyA9IE51bWJlcihuYkNvbnRyb2xQb2ludHNFbGVtZW50LnZhbHVlKTtcbiAgICBtaW5BbmdsZSA9IE51bWJlcihtaW5BbmdsZUVsZW1lbnQudmFsdWUpO1xuICAgIG1pbk5vcm0gPSBOdW1iZXIobWluTm9ybUVsZW1lbnQudmFsdWUpO1xuICAgIG5iSW50ZXJwb2xhdGlvblBvaW50cyA9IE51bWJlcihuYkludGVycG9sYXRpb25Qb2ludHNFbGVtZW50LnZhbHVlKTtcblxuICAgIHVwZGF0ZSgpO1xufVxuXG5uYkNvbnRyb2xQb2ludHNFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgb25DaGFuZ2UpO1xubWluQW5nbGVFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgb25DaGFuZ2UpO1xubWluTm9ybUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCBvbkNoYW5nZSk7XG5uYkludGVycG9sYXRpb25Qb2ludHNFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgb25DaGFuZ2UpO1xuXG5uYkNvbnRyb2xQb2ludHNFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXl1cFwiLCBvbkNoYW5nZSk7XG5taW5BbmdsZUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImtleXVwXCIsIG9uQ2hhbmdlKTtcbm1pbk5vcm1FbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXl1cFwiLCBvbkNoYW5nZSk7XG5uYkludGVycG9sYXRpb25Qb2ludHNFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXl1cFwiLCBvbkNoYW5nZSk7XG5cbm9uQ2hhbmdlKCk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=
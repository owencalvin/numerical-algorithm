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
            console.log(nbInterpolationPoints);
            for (var i = 2; i < nbInterpolationPoints; i++) {
                var t = tFn(pA, pB, pC, pD, i, nbInterpolationPoints);
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



var nbControlPointsElement = document.getElementById("s-control-points");
var minAngleElement = document.getElementById("s-angle");
var minNormElement = document.getElementById("s-norm");
var tElement = document.getElementById("s-t");
var nbInterpolationPointsElement = document.getElementById("s-interpolation-points");
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
var nbInterpolationPoints = 3;
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
    var reconstructedSpline = splineFromControlPoints.copy().catmullRomInterpolation(function (pA, pB, pC, pD, i, nbInterpolationPoints) { return i / nbInterpolationPoints; }, function (pA, pB, pC) {
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

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFPLEVBQUUsUUFBUSxDQUFDLENBQUM7QUFDN0MsNEJBQTRCLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0FBRWpFLFFBQVEsRUFBRSxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbWF0aF9zcGUvLi9zcmMvY2xhc3Nlcy9WZWN0b3IyRC50cyIsIndlYnBhY2s6Ly9tYXRoX3NwZS8uL3NyYy9jbGFzc2VzL1NwbGluZS50cyIsIndlYnBhY2s6Ly9tYXRoX3NwZS8uL3NyYy9jbGFzc2VzL0NhbnZhc01hbmFnZXIudHMiLCJ3ZWJwYWNrOi8vbWF0aF9zcGUvLi9zcmMvQU4yMDIyX1NwbGluZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1BvaW50MkR9IGZyb20gXCIuL1BvaW50MkRcIjtcblxuZXhwb3J0IGNsYXNzIFZlY3RvcjJEIHtcbiAgICBwcml2YXRlIF94OiBudW1iZXI7XG4gICAgcHJpdmF0ZSBfeTogbnVtYmVyO1xuXG4gICAgY29uc3RydWN0b3IocG9pbnQ6IFBvaW50MkQpO1xuICAgIGNvbnN0cnVjdG9yKHN0YXJ0OiBQb2ludDJELCBlbmQ6IFBvaW50MkQpO1xuICAgIGNvbnN0cnVjdG9yKHN0YXJ0OiBQb2ludDJELCBlbmQ/OiBQb2ludDJEKSB7XG4gICAgICAgIGlmIChlbmQpIHtcbiAgICAgICAgICAgIHRoaXMuX3ggPSBlbmQueCAtIHN0YXJ0Lng7XG4gICAgICAgICAgICB0aGlzLl95ID0gZW5kLnkgLSBzdGFydC55O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5feCA9IHN0YXJ0Lng7XG4gICAgICAgICAgICB0aGlzLl95ID0gc3RhcnQueTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldCBub3JtKCkge1xuICAgICAgICByZXR1cm4gTWF0aC5zcXJ0KHRoaXMuX3ggKiogMiArIHRoaXMuX3kgKiogMik7XG4gICAgfVxuXG4gICAgZ2V0IHgoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl94O1xuICAgIH1cblxuICAgIGdldCB5KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5feTtcbiAgICB9XG5cbiAgICBub3JtYWwoKSB7XG4gICAgICAgIHJldHVybiBuZXcgVmVjdG9yMkQoe1xuICAgICAgICAgICAgeDogLXRoaXMuX3ksXG4gICAgICAgICAgICB5OiB0aGlzLl94XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGRvdFByb2R1Y3QodmVjdG9yOiBWZWN0b3IyRCkge1xuICAgICAgICByZXR1cm4gdGhpcy5feCAqIHZlY3Rvci5feCArIHRoaXMuX3kgKiB2ZWN0b3IuX3k7XG4gICAgfVxuXG4gICAgYW5nbGUodmVjdG9yOiBWZWN0b3IyRCkge1xuICAgICAgICByZXR1cm4gTWF0aC5hY29zKHRoaXMuZG90UHJvZHVjdCh2ZWN0b3IpIC8gKHRoaXMubm9ybSAqIHZlY3Rvci5ub3JtKSk7XG4gICAgfVxuXG4gICAgbXVsdGlwbHkoZmFjdG9yOiBudW1iZXIpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBWZWN0b3IyRCh7XG4gICAgICAgICAgICB4OiBmYWN0b3IgKiB0aGlzLl94LFxuICAgICAgICAgICAgeTogZmFjdG9yICogdGhpcy5feVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBhZGQocG9pbnQ6IFZlY3RvcjJEKSB7XG4gICAgICAgIHJldHVybiBuZXcgVmVjdG9yMkQoe1xuICAgICAgICAgICAgeDogdGhpcy5feCArIHBvaW50Ll94LFxuICAgICAgICAgICAgeTogdGhpcy5feSArIHBvaW50Ll95XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHN1YnN0cmFjdChwb2ludDogVmVjdG9yMkQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYWRkKHRoaXMubXVsdGlwbHkoLTEpKTtcbiAgICB9XG5cbiAgICBjb3B5KCkge1xuICAgICAgICByZXR1cm4gbmV3IFZlY3RvcjJEKHtcbiAgICAgICAgICAgIHg6IHRoaXMuX3gsXG4gICAgICAgICAgICB5OiB0aGlzLl95XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiIsImltcG9ydCB7VmVjdG9yMkR9IGZyb20gXCIuL1ZlY3RvcjJEXCI7XG5pbXBvcnQge1BvaW50MkR9IGZyb20gXCIuL1BvaW50MkRcIjtcblxuZXhwb3J0IGNsYXNzIFNwbGluZSB7XG4gICAgcHJpdmF0ZSBfcG9pbnRzOiBQb2ludDJEW107XG5cbiAgICBjb25zdHJ1Y3Rvcihwb2ludHM6IFBvaW50MkRbXSA9IFtdKSB7XG4gICAgICAgIHRoaXMuX3BvaW50cyA9IHBvaW50cztcbiAgICB9XG5cbiAgICBnZXQgcG9pbnRzKCk6IHJlYWRvbmx5IFBvaW50MkRbXSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9wb2ludHM7XG4gICAgfVxuXG4gICAgZ2V0IHBvaW50TGVuZ3RoKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcG9pbnRzLmxlbmd0aDtcbiAgICB9XG5cbiAgICBnZXQgbGFzdFBvaW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcG9pbnRzW3RoaXMucG9pbnRMZW5ndGggLSAxXTtcbiAgICB9XG5cbiAgICBnZXQgYmVmb3JlTGFzdFBvaW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcG9pbnRzW3RoaXMucG9pbnRMZW5ndGggLSAyXTtcbiAgICB9XG5cbiAgICBmaW5kUG9pbnQocG9pbnQ6IFBvaW50MkQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3BvaW50cy5maW5kKChwMikgPT4gcG9pbnQueCA9PSBwMi54ICYmIHBvaW50LnkgPT0gcDIueSk7XG4gICAgfVxuXG4gICAgYWRkUG9pbnQocG9pbnQ6IFBvaW50MkQpIHtcbiAgICAgICAgdGhpcy5fcG9pbnRzLnB1c2gocG9pbnQpO1xuICAgIH1cblxuICAgIGNsZWFyKCkge1xuICAgICAgICB0aGlzLl9wb2ludHMgPSBbXTtcbiAgICB9XG5cbiAgICBzaW1wbGlmeShtaW5Ob3JtOiBudW1iZXIsIG1pbkFuZ2xlOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5fcG9pbnRzID0gdGhpcy5fcG9pbnRzLnJlZHVjZTxQb2ludDJEW10+KChwcmV2LCBpdGVtKSA9PiB7XG4gICAgICAgICAgICBpZiAocHJldi5sZW5ndGggPD0gMykgcmV0dXJuIFsuLi5wcmV2LCBpdGVtXTtcblxuICAgICAgICAgICAgY29uc3QgYmVmb3JlTGFzdFBvaW50ID0gcHJldltwcmV2Lmxlbmd0aCAtIDJdO1xuICAgICAgICAgICAgY29uc3QgbGFzdFBvaW50ID0gcHJldltwcmV2Lmxlbmd0aCAtIDFdO1xuICAgICAgICAgICAgY29uc3QgdkFDID0gbmV3IFZlY3RvcjJEKGJlZm9yZUxhc3RQb2ludCwgaXRlbSk7XG4gICAgICAgICAgICBjb25zdCB2QUIgPSBuZXcgVmVjdG9yMkQoYmVmb3JlTGFzdFBvaW50LCBsYXN0UG9pbnQpO1xuICAgICAgICAgICAgY29uc3QgdkJDID0gbmV3IFZlY3RvcjJEKGxhc3RQb2ludCwgaXRlbSk7XG5cbiAgICAgICAgICAgIGlmICh2QUMubm9ybSA8IG1pbk5vcm0pIHByZXYucG9wKCk7XG5cbiAgICAgICAgICAgIGNvbnN0IGRlZ0FuZ2xlID0gdkFCLmFuZ2xlKHZCQykgKiAxODAgLyBNYXRoLlBJO1xuXG4gICAgICAgICAgICBpZiAoZGVnQW5nbGUgPCBtaW5BbmdsZSkgcHJldi5wb3AoKTtcblxuICAgICAgICAgICAgcHJldi5wdXNoKGl0ZW0pO1xuXG4gICAgICAgICAgICByZXR1cm4gcHJldjtcbiAgICAgICAgfSwgW10pO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGdldCBhbmdsZXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9wb2ludHMubWFwKChjdXJyZW50UG9pbnQsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICBpZiAoaW5kZXggKyAxIDw9IDEgfHwgaW5kZXggKyAxID49IHRoaXMuX3BvaW50cy5sZW5ndGgpIHJldHVybiBJbmZpbml0eTtcblxuICAgICAgICAgICAgY29uc3QgbGFzdFBvaW50ID0gdGhpcy5fcG9pbnRzW2luZGV4IC0gMV07XG4gICAgICAgICAgICBjb25zdCBuZXh0UG9pbnQgPSB0aGlzLl9wb2ludHNbaW5kZXggKyAxXTtcblxuICAgICAgICAgICAgY29uc3QgdkJBID0gbmV3IFZlY3RvcjJEKGN1cnJlbnRQb2ludCwgbGFzdFBvaW50KTtcbiAgICAgICAgICAgIGNvbnN0IHZCQyA9IG5ldyBWZWN0b3IyRChjdXJyZW50UG9pbnQsIG5leHRQb2ludCk7XG5cbiAgICAgICAgICAgIHJldHVybiB2QkEuYW5nbGUodkJDKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZ2V0IGFyZWFzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcG9pbnRzLm1hcCgoY3VycmVudFBvaW50LCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgaWYgKGluZGV4ICsgMSA8PSAxIHx8IGluZGV4ICsgMSA+PSB0aGlzLl9wb2ludHMubGVuZ3RoKSByZXR1cm4gSW5maW5pdHk7XG5cbiAgICAgICAgICAgIGNvbnN0IGxhc3RQb2ludCA9IHRoaXMuX3BvaW50c1tpbmRleCAtIDFdO1xuICAgICAgICAgICAgY29uc3QgbmV4dFBvaW50ID0gdGhpcy5fcG9pbnRzW2luZGV4ICsgMV07XG5cbiAgICAgICAgICAgIGNvbnN0IHZCQSA9IG5ldyBWZWN0b3IyRChjdXJyZW50UG9pbnQsIGxhc3RQb2ludCk7XG4gICAgICAgICAgICBjb25zdCB2QkMgPSBuZXcgVmVjdG9yMkQoY3VycmVudFBvaW50LCBuZXh0UG9pbnQpO1xuICAgICAgICAgICAgY29uc3QgdkFDID0gbmV3IFZlY3RvcjJEKGxhc3RQb2ludCwgbmV4dFBvaW50KTtcblxuICAgICAgICAgICAgY29uc3QgcyA9ICh2QUMubm9ybSArIHZCQS5ub3JtICsgdkJDLm5vcm0pIC8gMjtcblxuICAgICAgICAgICAgcmV0dXJuIE1hdGguc3FydChzICogKHMgLSB2QUMubm9ybSkgKiAocyAtIHZCQS5ub3JtKSAqIChzIC0gdkJDLm5vcm0pKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgY29udHJvbFBvaW50cyh2YWx1ZXM6IG51bWJlcltdLCBudW1iZXJPZkNvbnRyb2xQb2ludHM6IG51bWJlcikge1xuICAgICAgICBudW1iZXJPZkNvbnRyb2xQb2ludHMgPSBNYXRoLm1heChudW1iZXJPZkNvbnRyb2xQb2ludHMsIDIpO1xuXG4gICAgICAgIGNvbnN0IHZhbHVlc1dpdGhJbmRleGVzID0gdGhpcy5hcmVhcy5tYXAoKHZhbHVlLCBpbmRleCkgPT4gW3ZhbHVlLCBpbmRleF0pO1xuXG4gICAgICAgIHZhbHVlc1dpdGhJbmRleGVzLnNvcnQoKGEsIGIpID0+IHtcbiAgICAgICAgICAgIGlmIChOdW1iZXIuaXNOYU4oYlswXSkpIHJldHVybiAtMTtcblxuICAgICAgICAgICAgaWYgKGFbMF0gPCBiWzBdKSByZXR1cm4gMTtcbiAgICAgICAgICAgIGVsc2UgaWYgKGFbMF0gPiBiWzBdKSByZXR1cm4gLTE7XG4gICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHZhbHVlc1dpdGhJbmRleGVzXG4gICAgICAgICAgICAuc2xpY2UoMCwgbnVtYmVyT2ZDb250cm9sUG9pbnRzKVxuICAgICAgICAgICAgLnNvcnQoKGEsIGIpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoYVsxXSA8IGJbMV0pIHJldHVybiAxO1xuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGFbMV0gPiBiWzFdKSByZXR1cm4gLTE7XG4gICAgICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLm1hcCgoeCkgPT4gdGhpcy5fcG9pbnRzW3hbMV1dKTtcbiAgICB9XG5cbiAgICB0cmFuc2xhdGUoeDogbnVtYmVyLCB5OiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5fcG9pbnRzID0gdGhpcy5fcG9pbnRzLm1hcCgocG9pbnQpID0+IHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgeDogcG9pbnQueCArIHgsXG4gICAgICAgICAgICAgICAgeTogcG9pbnQueSArIHlcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGNvcHkoKSB7XG4gICAgICAgIHJldHVybiBuZXcgU3BsaW5lKHRoaXMuX3BvaW50cyk7XG4gICAgfVxuXG4gICAgY2F0bXVsbFJvbUludGVycG9sYXRpb24oXG4gICAgICAgIHRGbjogKHBBOiBQb2ludDJELCBwQjogUG9pbnQyRCwgcEM6IFBvaW50MkQsIHBEOiBQb2ludDJELCBpOiBudW1iZXIsIG5iSW50ZXJwb2xhdGlvblBvaW50czogbnVtYmVyKSA9PiBudW1iZXIsXG4gICAgICAgIG5iSW50ZXJwb2xhdGlvblBvaW50c0ZuOiAocEE6IFBvaW50MkQsIHBCOiBQb2ludDJELCBwQzogUG9pbnQyRCwgcEQ6IFBvaW50MkQpID0+IG51bWJlclxuICAgICkge1xuICAgICAgICBjb25zdCBsYXN0UG9pbnQgPSB0aGlzLl9wb2ludHNbdGhpcy5fcG9pbnRzLmxlbmd0aCAtIDFdO1xuICAgICAgICB0aGlzLl9wb2ludHMgPSB0aGlzLl9wb2ludHMucmVkdWNlPFBvaW50MkRbXT4oKHByZXYsIHBDLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgaWYgKGluZGV4ICsgMSA8PSAyIHx8IGluZGV4ICsgMSA+PSB0aGlzLl9wb2ludHMubGVuZ3RoKSByZXR1cm4gcHJldjtcblxuICAgICAgICAgICAgY29uc3QgYWRkID0gKHB5OiBQb2ludDJEKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKCFwcmV2LmZpbmQoKHB4KSA9PiBweC54ID09PSBweS54ICYmIHB4LnkgPT09IHB5LnkpKSB7XG4gICAgICAgICAgICAgICAgICAgIHByZXYucHVzaChweSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgY29uc3QgcEEgPSB0aGlzLl9wb2ludHNbaW5kZXggLSAyXTtcbiAgICAgICAgICAgIGNvbnN0IHBCID0gdGhpcy5fcG9pbnRzW2luZGV4IC0gMV07XG4gICAgICAgICAgICBjb25zdCBwRCA9IHRoaXMuX3BvaW50c1tpbmRleCArIDFdO1xuXG4gICAgICAgICAgICBhZGQocEEpO1xuICAgICAgICAgICAgYWRkKHBCKTtcblxuICAgICAgICAgICAgY29uc3QgbmJJbnRlcnBvbGF0aW9uUG9pbnRzID0gbmJJbnRlcnBvbGF0aW9uUG9pbnRzRm4ocEEsIHBCLCBwQywgcEQpO1xuICAgICAgICAgICAgY29uc29sZS5sb2cobmJJbnRlcnBvbGF0aW9uUG9pbnRzKTtcblxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDI7IGkgPCBuYkludGVycG9sYXRpb25Qb2ludHM7IGkrKykge1xuICAgICAgICAgICAgICAgIGNvbnN0IHQgPSB0Rm4ocEEsIHBCLCBwQywgcEQsIGksIG5iSW50ZXJwb2xhdGlvblBvaW50cyk7XG5cbiAgICAgICAgICAgICAgICBjb25zdCBwb2ludCA9IHtcbiAgICAgICAgICAgICAgICAgICAgeDogU3BsaW5lLmNhdG11bGxSb20odCwgcEEueCwgcEIueCwgcEMueCwgcEQueCksXG4gICAgICAgICAgICAgICAgICAgIHk6IFNwbGluZS5jYXRtdWxsUm9tKHQsIHBBLnksIHBCLnksIHBDLnksIHBELnkpXG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgIHByZXYgPSBbXG4gICAgICAgICAgICAgICAgICAgIC4uLnByZXYsXG4gICAgICAgICAgICAgICAgICAgIHBvaW50LFxuICAgICAgICAgICAgICAgIF07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGFkZChwQyk7XG5cbiAgICAgICAgICAgIHJldHVybiBwcmV2O1xuICAgICAgICB9LCBbXSk7XG5cbiAgICAgICAgdGhpcy5fcG9pbnRzID0gW1xuICAgICAgICAgICAgLi4udGhpcy5fcG9pbnRzLFxuICAgICAgICAgICAgbGFzdFBvaW50XG4gICAgICAgIF07XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgc3RhdGljIGNhdG11bGxSb20odDogbnVtYmVyLCBtQTogbnVtYmVyLCBtQjogbnVtYmVyLCBtQzogbnVtYmVyLCBtRDogbnVtYmVyKSB7XG4gICAgICAgIGNvbnN0IGEgPSAzICogbUIgLSBtQSAtIDMgKiBtQyArIG1EO1xuICAgICAgICBjb25zdCBiID0gMiAqIG1BIC0gNSAqIG1CICsgNCAqIG1DIC0gbUQ7XG4gICAgICAgIGNvbnN0IGMgPSAobUMgLSBtQSkgKiB0O1xuICAgICAgICBjb25zdCBkID0gMiAqIG1CO1xuICAgICAgICBjb25zdCBmaW5hbCA9IGEgKiB0ICoqIDMgKyBiICogdCAqKiAyICsgYyArIGQ7XG4gICAgICAgIHJldHVybiAwLjUgKiBmaW5hbDtcbiAgICB9XG59XG4iLCJpbXBvcnQge1NwbGluZX0gZnJvbSBcIi4vU3BsaW5lXCI7XG5pbXBvcnQge1BvaW50MkR9IGZyb20gXCIuL1BvaW50MkRcIjtcblxuZXhwb3J0IGNsYXNzIENhbnZhc01hbmFnZXIge1xuICAgIHByaXZhdGUgX2NhbnZhczogSFRNTENhbnZhc0VsZW1lbnQ7XG4gICAgcHJpdmF0ZSBfY29udGV4dDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEO1xuICAgIHByaXZhdGUgX2lzRHJhd2luZzogYm9vbGVhbjtcbiAgICBwcml2YXRlIF9waXhlbFJhdGlvOiBudW1iZXI7XG5cbiAgICBnZXQgY2FudmFzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY2FudmFzO1xuICAgIH1cblxuICAgIGdldCBwaXhlbFJhdGlvKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcGl4ZWxSYXRpbztcbiAgICB9XG5cbiAgICBnZXQgY29udGV4dCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbnRleHQ7XG4gICAgfVxuXG4gICAgZ2V0IGlzRHJhd2luZygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lzRHJhd2luZztcbiAgICB9XG5cbiAgICBzZXQgaXNEcmF3aW5nKGlzRHJhd2luZzogYm9vbGVhbikge1xuICAgICAgICB0aGlzLl9pc0RyYXdpbmcgPSBpc0RyYXdpbmc7XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IoY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudCwgc2NhbGVGYWN0b3I/OiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5faXNEcmF3aW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX2NhbnZhcyA9IGNhbnZhcztcbiAgICAgICAgdGhpcy5fcGl4ZWxSYXRpbyA9IHNjYWxlRmFjdG9yIHx8IHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvIHx8IDE7XG5cbiAgICAgICAgY29uc3QgcmVjdCA9IHRoaXMuX2NhbnZhcy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgY29uc3QgY29udGV4dCA9IHRoaXMuX2NhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG5cbiAgICAgICAgdGhpcy5fY2FudmFzLnN0eWxlLndpZHRoID0gdGhpcy5fY2FudmFzLndpZHRoICsgJ3B4JztcbiAgICAgICAgdGhpcy5fY2FudmFzLnN0eWxlLmhlaWdodCA9IHRoaXMuX2NhbnZhcy5oZWlnaHQgKyAncHgnO1xuXG4gICAgICAgIHRoaXMuX2NhbnZhcy53aWR0aCA9IHJlY3Qud2lkdGggKiB0aGlzLl9waXhlbFJhdGlvO1xuICAgICAgICB0aGlzLl9jYW52YXMuaGVpZ2h0ID0gcmVjdC5oZWlnaHQgKiB0aGlzLl9waXhlbFJhdGlvO1xuXG4gICAgICAgIGNvbnRleHQuc2NhbGUodGhpcy5fcGl4ZWxSYXRpbywgdGhpcy5fcGl4ZWxSYXRpbyk7XG5cbiAgICAgICAgdGhpcy5fY29udGV4dCA9IGNvbnRleHQ7XG4gICAgfVxuXG4gICAgY2xlYXIoKSB7XG4gICAgICAgIHRoaXMuY29udGV4dC5jbGVhclJlY3QoMCwgMCwgdGhpcy5fY29udGV4dC5jYW52YXMud2lkdGgsIHRoaXMuX2NvbnRleHQuY2FudmFzLmhlaWdodCk7XG4gICAgfVxuXG4gICAgZ2V0UG9pbnQoZTogTW91c2VFdmVudCk6IFBvaW50MkQge1xuICAgICAgICBjb25zdCByZWN0ID0gdGhpcy5fY2FudmFzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB4OiBlLmNsaWVudFggLSByZWN0LmxlZnQsXG4gICAgICAgICAgICB5OiBlLmNsaWVudFkgLSByZWN0LnRvcFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGRyYXdQb2ludChcbiAgICAgICAgcG9pbnQ6IFBvaW50MkQsXG4gICAgICAgIHJhZGl1cyA9IDUsXG4gICAgICAgIGZpbGxDb2xvciA9IFwiYmxhY2tcIixcbiAgICAgICAgc3Ryb2tlQ29sb3IgPSBcImJsYWNrXCIsXG4gICAgICAgIGxpbmVXaWR0aCA9IDBcbiAgICApIHtcbiAgICAgICAgaWYgKCFwb2ludCkgcmV0dXJuO1xuICAgICAgICB0aGlzLl9jb250ZXh0LmJlZ2luUGF0aCgpO1xuICAgICAgICB0aGlzLl9jb250ZXh0LmxpbmVXaWR0aCA9IGxpbmVXaWR0aDtcbiAgICAgICAgdGhpcy5fY29udGV4dC5saW5lQ2FwID0gXCJyb3VuZFwiO1xuICAgICAgICB0aGlzLl9jb250ZXh0LmZpbGxTdHlsZSA9IGZpbGxDb2xvcjtcbiAgICAgICAgdGhpcy5fY29udGV4dC5zdHJva2VTdHlsZSA9IHN0cm9rZUNvbG9yO1xuICAgICAgICB0aGlzLl9jb250ZXh0LmFyYyhwb2ludC54LCBwb2ludC55LCByYWRpdXMsIDAsIDIgKiBNYXRoLlBJKTtcbiAgICAgICAgdGhpcy5fY29udGV4dC5maWxsKCk7XG4gICAgICAgIHRoaXMuX2NvbnRleHQuc3Ryb2tlKCk7XG4gICAgICAgIHRoaXMuX2NvbnRleHQuY2xvc2VQYXRoKCk7XG4gICAgfVxuXG4gICAgZHJhd1BvaW50cyhcbiAgICAgICAgcG9pbnRzOiBQb2ludDJEW10gfCByZWFkb25seSBQb2ludDJEW10sXG4gICAgICAgIHJhZGl1cyA9IDUsXG4gICAgICAgIGZpbGxDb2xvciA9IFwiYmxhY2tcIixcbiAgICAgICAgc3Ryb2tlQ29sb3IgPSBcImJsYWNrXCIsXG4gICAgICAgIGxpbmVXaWR0aCA9IDBcbiAgICApIHtcbiAgICAgICAgcG9pbnRzLmZvckVhY2goKHBvaW50KSA9PiB0aGlzLmRyYXdQb2ludChwb2ludCwgcmFkaXVzLCBmaWxsQ29sb3IsIHN0cm9rZUNvbG9yLCBsaW5lV2lkdGgpKTtcbiAgICB9XG5cbiAgICBkcmF3TGluZShcbiAgICAgICAgcG9pbnRzOiBQb2ludDJEW10gfCByZWFkb25seSBQb2ludDJEW10sXG4gICAgICAgIHN0cm9rZUNvbG9yID0gXCJibGFja1wiLFxuICAgICAgICBsaW5lV2lkdGggPSAxXG4gICAgKSB7XG4gICAgICAgIHBvaW50cy5mb3JFYWNoKChwb2ludCwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIGlmIChpbmRleCA+PSBwb2ludHMubGVuZ3RoIC0gMSkgcmV0dXJuO1xuXG4gICAgICAgICAgICB0aGlzLl9jb250ZXh0LmJlZ2luUGF0aCgpO1xuICAgICAgICAgICAgdGhpcy5fY29udGV4dC5saW5lV2lkdGggPSBsaW5lV2lkdGg7XG4gICAgICAgICAgICB0aGlzLl9jb250ZXh0LmxpbmVDYXAgPSBcInJvdW5kXCI7XG4gICAgICAgICAgICB0aGlzLl9jb250ZXh0LnN0cm9rZVN0eWxlID0gc3Ryb2tlQ29sb3I7XG4gICAgICAgICAgICB0aGlzLl9jb250ZXh0Lm1vdmVUbyhwb2ludC54LCBwb2ludC55KTtcbiAgICAgICAgICAgIHRoaXMuX2NvbnRleHQubGluZVRvKHBvaW50c1tpbmRleCArIDFdLngsIHBvaW50c1tpbmRleCArIDFdLnkpO1xuICAgICAgICAgICAgdGhpcy5fY29udGV4dC5zdHJva2UoKTtcbiAgICAgICAgICAgIHRoaXMuX2NvbnRleHQuY2xvc2VQYXRoKCk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiIsImltcG9ydCB7U3BsaW5lfSBmcm9tIFwiLi9jbGFzc2VzL1NwbGluZVwiO1xuaW1wb3J0IHtDYW52YXNNYW5hZ2VyfSBmcm9tIFwiLi9jbGFzc2VzL0NhbnZhc01hbmFnZXJcIjtcbmltcG9ydCB7VmVjdG9yMkR9IGZyb20gXCIuL2NsYXNzZXMvVmVjdG9yMkRcIjtcblxuY29uc3QgbmJDb250cm9sUG9pbnRzRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicy1jb250cm9sLXBvaW50c1wiKSBhcyBIVE1MSW5wdXRFbGVtZW50O1xuY29uc3QgbWluQW5nbGVFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzLWFuZ2xlXCIpIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XG5jb25zdCBtaW5Ob3JtRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicy1ub3JtXCIpIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XG5jb25zdCB0RWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicy10XCIpIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XG5jb25zdCBuYkludGVycG9sYXRpb25Qb2ludHNFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzLWludGVycG9sYXRpb24tcG9pbnRzXCIpIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XG5cbmNvbnN0IGRyYXdpbmdDYW52YXNFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzLXNwbGluZS1jYW52YXNcIikgYXMgSFRNTENhbnZhc0VsZW1lbnQ7XG5jb25zdCBwcmV2aWV3Q2FudmFzRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicy1zcGxpbmUtY2FudmFzLXByZXZpZXdcIikgYXMgSFRNTENhbnZhc0VsZW1lbnQ7XG5jb25zdCByZWNvbnN0cnVjdGlvbkNhbnZhc0VsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInMtc3BsaW5lLWNhbnZhcy1yZWNvbnN0cnVjdGlvblwiKSBhcyBIVE1MQ2FudmFzRWxlbWVudDtcbmNvbnN0IHJlY29uc3RydWN0aW9uRG9uZUNhbnZhc0VsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInMtc3BsaW5lLWNhbnZhcy1yZWNvbnN0cnVjdGlvbi1kb25lXCIpIGFzIEhUTUxDYW52YXNFbGVtZW50O1xuXG5jb25zdCBkcmF3aW5nQ2FudmFzTWFuYWdlciA9IG5ldyBDYW52YXNNYW5hZ2VyKGRyYXdpbmdDYW52YXNFbGVtZW50KTtcbmNvbnN0IHByZXZpZXdDYW52YXNNYW5hZ2VyID0gbmV3IENhbnZhc01hbmFnZXIocHJldmlld0NhbnZhc0VsZW1lbnQpO1xuY29uc3QgcmVjb25zdHJ1Y3Rpb25DYW52YXNNYW5hZ2VyID0gbmV3IENhbnZhc01hbmFnZXIocmVjb25zdHJ1Y3Rpb25DYW52YXNFbGVtZW50KTtcbmNvbnN0IHJlY29uc3RydWN0aW9uRG9uZUNhbnZhc01hbmFnZXIgPSBuZXcgQ2FudmFzTWFuYWdlcihyZWNvbnN0cnVjdGlvbkRvbmVDYW52YXNFbGVtZW50KTtcblxubGV0IG5iQ29udHJvbFBvaW50cyA9IDQ7XG5sZXQgbWluQW5nbGUgPSAxO1xubGV0IG1pbk5vcm0gPSAyMDtcbmxldCB0ID0gMC41O1xubGV0IG5iSW50ZXJwb2xhdGlvblBvaW50cyA9IDM7XG5cbmNvbnN0IHNwbGluZSA9IG5ldyBTcGxpbmUoKTtcblxuZnVuY3Rpb24gZHJhdygpIHtcbiAgICBkcmF3aW5nQ2FudmFzTWFuYWdlci5jbGVhcigpO1xuICAgIHByZXZpZXdDYW52YXNNYW5hZ2VyLmNsZWFyKCk7XG4gICAgcmVjb25zdHJ1Y3Rpb25DYW52YXNNYW5hZ2VyLmNsZWFyKCk7XG4gICAgcmVjb25zdHJ1Y3Rpb25Eb25lQ2FudmFzTWFuYWdlci5jbGVhcigpO1xuXG4gICAgZHJhd2luZ0NhbnZhc01hbmFnZXIuZHJhd0xpbmUoc3BsaW5lLnBvaW50cywgXCJibGFja1wiLCAzKTtcblxuICAgIGNvbnN0IHNpbXBsaWZpZWRTcGxpbmUgPSBzcGxpbmUuY29weSgpLnNpbXBsaWZ5KG1pbk5vcm0sIG1pbkFuZ2xlKTtcbiAgICBjb25zdCBjb250cm9sUG9pbnRzID0gc2ltcGxpZmllZFNwbGluZS5jb250cm9sUG9pbnRzKHNwbGluZS5hcmVhcywgbmJDb250cm9sUG9pbnRzKTtcbiAgICBjb25zdCBzcGxpbmVGcm9tQ29udHJvbFBvaW50cyA9IG5ldyBTcGxpbmUoY29udHJvbFBvaW50cyk7XG4gICAgcHJldmlld0NhbnZhc01hbmFnZXIuZHJhd0xpbmUoc2ltcGxpZmllZFNwbGluZS5wb2ludHMsIFwiYmx1ZVwiLCAzKTtcbiAgICBwcmV2aWV3Q2FudmFzTWFuYWdlci5kcmF3TGluZShzcGxpbmVGcm9tQ29udHJvbFBvaW50cy5wb2ludHMsIFwicmVkXCIsIDMpO1xuICAgIHByZXZpZXdDYW52YXNNYW5hZ2VyLmRyYXdQb2ludHMoc2ltcGxpZmllZFNwbGluZS5wb2ludHMsIDMsIFwiZ3JlZW5cIiwgXCJncmVlblwiKTtcbiAgICBwcmV2aWV3Q2FudmFzTWFuYWdlci5kcmF3UG9pbnRzKGNvbnRyb2xQb2ludHMsIDUsIFwiZ3JlZW5cIiwgXCJibGFja1wiLCAyKTtcblxuICAgIGNvbnN0IHJlY29uc3RydWN0ZWRTcGxpbmUgPSBzcGxpbmVGcm9tQ29udHJvbFBvaW50cy5jb3B5KCkuY2F0bXVsbFJvbUludGVycG9sYXRpb24oXG4gICAgICAgIChwQSwgcEIsIHBDLCBwRCwgaSwgbmJJbnRlcnBvbGF0aW9uUG9pbnRzKSA9PiBpIC8gbmJJbnRlcnBvbGF0aW9uUG9pbnRzLFxuICAgICAgICAocEEsIHBCLCBwQykgPT4ge1xuICAgICAgICAgICAgaWYgKG5iSW50ZXJwb2xhdGlvblBvaW50cyA+PSAwKSByZXR1cm4gbmJJbnRlcnBvbGF0aW9uUG9pbnRzO1xuXG4gICAgICAgICAgICBjb25zdCB2QkMgPSBuZXcgVmVjdG9yMkQocEIsIHBDKTtcbiAgICAgICAgICAgIGNvbnN0IHZCQSA9IG5ldyBWZWN0b3IyRChwQiwgcEEpO1xuICAgICAgICAgICAgY29uc3QgYW5nbGUgPSB2QkEuYW5nbGUodkJDKTtcblxuICAgICAgICAgICAgLy8gbm9ybSBncmVhdGVyIC0+IG1vcmUgcG9pbnRzXG4gICAgICAgICAgICAvLyBhbmdsZSBncmVhdGVyIC0+IG1vcmUgcG9pbnRzXG4gICAgICAgICAgICBjb25zdCBub3JtRmFjdG9yID0gMC4wMiAqIHZCQy5ub3JtO1xuICAgICAgICAgICAgY29uc3QgYW5nbGVGYWN0b3IgPSAxMCAqIChhbmdsZSAvIE1hdGguUEkpO1xuICAgICAgICAgICAgcmV0dXJuIE1hdGguY2VpbChub3JtRmFjdG9yICogYW5nbGVGYWN0b3IpO1xuICAgICAgICB9XG4gICAgKTtcblxuICAgIHJlY29uc3RydWN0aW9uQ2FudmFzTWFuYWdlci5kcmF3TGluZShyZWNvbnN0cnVjdGVkU3BsaW5lLnBvaW50cywgXCJibGFja1wiLCAzKTtcbiAgICByZWNvbnN0cnVjdGlvbkNhbnZhc01hbmFnZXIuZHJhd1BvaW50cyhyZWNvbnN0cnVjdGVkU3BsaW5lLnBvaW50cywgMywgXCJyZWRcIiwgXCJyZWRcIik7XG4gICAgcmVjb25zdHJ1Y3Rpb25DYW52YXNNYW5hZ2VyLmRyYXdQb2ludHMoY29udHJvbFBvaW50cywgNSwgXCJncmVlblwiLCBcImJsYWNrXCIsIDIpO1xuXG4gICAgcmVjb25zdHJ1Y3Rpb25Eb25lQ2FudmFzTWFuYWdlci5kcmF3TGluZShyZWNvbnN0cnVjdGVkU3BsaW5lLnBvaW50cywgXCJibGFja1wiLCAzKTtcbn1cblxuZnVuY3Rpb24gbW91c2VNb3ZlKGU6IE1vdXNlRXZlbnQpIHtcbiAgICBpZiAoIWRyYXdpbmdDYW52YXNNYW5hZ2VyLmlzRHJhd2luZykgcmV0dXJuO1xuXG4gICAgc3BsaW5lLmFkZFBvaW50KGRyYXdpbmdDYW52YXNNYW5hZ2VyLmdldFBvaW50KGUpKTtcbiAgICBkcmF3KCk7XG59XG5cbmZ1bmN0aW9uIG1vdXNlRG93bihlOiBNb3VzZUV2ZW50KSB7XG4gICAgZHJhd2luZ0NhbnZhc01hbmFnZXIuaXNEcmF3aW5nID0gdHJ1ZTtcbiAgICBzcGxpbmUuY2xlYXIoKTtcblxuICAgIG1vdXNlTW92ZShlKTtcbn1cblxuZnVuY3Rpb24gbW91c2VVcChlOiBNb3VzZUV2ZW50KSB7XG4gICAgZHJhd2luZ0NhbnZhc01hbmFnZXIuaXNEcmF3aW5nID0gZmFsc2U7XG59XG5cbmRyYXdpbmdDYW52YXNFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW1vdmVcIiwgbW91c2VNb3ZlKTtcbmRyYXdpbmdDYW52YXNFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgbW91c2VEb3duKTtcbmRyYXdpbmdDYW52YXNFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZXVwXCIsIG1vdXNlVXApO1xuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNldXBcIiwgbW91c2VVcCk7XG5cbmZ1bmN0aW9uIG9uQ2hhbmdlKCkge1xuICAgIGNvbnNvbGUubG9nKFwiY2hhbmdlXCIpO1xuICAgIG5iQ29udHJvbFBvaW50cyA9IE51bWJlcihuYkNvbnRyb2xQb2ludHNFbGVtZW50LnZhbHVlKTtcbiAgICBtaW5BbmdsZSA9IE51bWJlcihtaW5BbmdsZUVsZW1lbnQudmFsdWUpO1xuICAgIG1pbk5vcm0gPSBOdW1iZXIobWluTm9ybUVsZW1lbnQudmFsdWUpO1xuICAgIHQgPSBOdW1iZXIodEVsZW1lbnQudmFsdWUpO1xuICAgIG5iSW50ZXJwb2xhdGlvblBvaW50cyA9IE51bWJlcihuYkludGVycG9sYXRpb25Qb2ludHNFbGVtZW50LnZhbHVlKTtcblxuICAgIGRyYXcoKTtcbn1cblxubmJDb250cm9sUG9pbnRzRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsIG9uQ2hhbmdlKTtcbm1pbkFuZ2xlRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsIG9uQ2hhbmdlKTtcbm1pbk5vcm1FbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgb25DaGFuZ2UpO1xudEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCBvbkNoYW5nZSk7XG5uYkludGVycG9sYXRpb25Qb2ludHNFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgb25DaGFuZ2UpO1xuXG5uYkNvbnRyb2xQb2ludHNFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXl1cFwiLCBvbkNoYW5nZSk7XG5taW5BbmdsZUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImtleXVwXCIsIG9uQ2hhbmdlKTtcbm1pbk5vcm1FbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXl1cFwiLCBvbkNoYW5nZSk7XG50RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwia2V5dXBcIiwgb25DaGFuZ2UpO1xubmJJbnRlcnBvbGF0aW9uUG9pbnRzRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwia2V5dXBcIiwgb25DaGFuZ2UpO1xuXG5vbkNoYW5nZSgpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9
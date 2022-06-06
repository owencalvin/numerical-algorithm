export interface Point2D {
    x: number;
    y: number;
}

export class Vector2D {
    private _x: number;
    private _y: number;

    constructor(point: Point2D);
    constructor(start: Point2D, end: Point2D);
    constructor(start: Point2D, end?: Point2D) {
        if (end) {
            this._x = end.x - start.x;
            this._y = end.y - start.y;
        } else {
            this._x = start.x;
            this._y = start.y;
        }
    }

    get norm() {
        return Math.sqrt(this._x ** 2 + this._y ** 2);
    }

    get x() {
        return this._x;
    }

    get y() {
        return this._y;
    }

    normal() {
        return new Vector2D({
            x: -this._y,
            y: this._x
        });
    }

    dotProduct(vector: Vector2D) {
        return this._x * vector._x + this._y * vector._y;
    }

    angle(vector: Vector2D) {
        return Math.acos(this.dotProduct(vector) / (this.norm * vector.norm));
    }

    multiply(factor: number) {
        return new Vector2D({
            x: factor * this._x,
            y: factor * this._y
        });
    }

    add(point: Vector2D) {
        return new Vector2D({
            x: this._x + point._x,
            y: this._y + point._y
        });
    }

    substract(point: Vector2D) {
        return this.add(this.multiply(-1));
    }

    copy() {
        return new Vector2D({
            x: this._x,
            y: this._y
        });
    }

}

export class Spline {
    private _points: Point2D[];

    constructor(points: Point2D[] = []) {
        this._points = points;
    }

    addPoint(point: Point2D) {
        this._points.push(point);
    }

    clear() {
        this._points = [];
    }

    simplify(minNorm: number, minAngle: number) {
        this._points = this._points.reduce<Point2D[]>((prev, item) => {
            if (prev.length <= 3) return [...prev, item];

            const beforeLastPoint = prev[prev.length - 2];
            const lastPoint = prev[prev.length - 1];
            const vAC = new Vector2D(beforeLastPoint, item);
            const vAB = new Vector2D(beforeLastPoint, lastPoint);
            const vBC = new Vector2D(lastPoint, item);

            if (vAC.norm < minNorm) prev.pop();

            const degAngle = vAB.angle(vBC) * 180 / Math.PI;

            if (degAngle < minAngle) prev.pop();

            prev.push(item);

            return prev;
        }, []);

        return this;
    }

    get angles() {
        return this._points.map((currentPoint, index) => {
            if (index <= 0 || index >= this._points.length - 1) return Infinity;

            const lastPoint = this._points[index - 1];
            const nextPoint = this._points[index + 1];
            const vAB = new Vector2D(lastPoint, currentPoint);
            const vBC = new Vector2D(currentPoint, nextPoint);

            return vAB.angle(vBC);
        });
    }

    controlPoints(numberOfControlPoints: number) {
        if (numberOfControlPoints < 2) {
            numberOfControlPoints = 2;
        }

        const anglesWithIndexes = this.angles.map((angle, index) => [angle, index]);

        anglesWithIndexes.sort((a, b) => {
            if (Number.isNaN(b[0])) return -1;

            if (a[0] < b[0]) return 1;
            else if (a[0] > b[0]) return -1;
            return 0;
        });

        return anglesWithIndexes
            .slice(0, numberOfControlPoints + 1)
            .sort((a, b) => {
                if (a[1] < b[1]) return 1;
                else if (a[1] > b[1]) return -1;
                return 0;
            })
            .map((x) => this._points[x[1]]);
    }

    translate(x: number, y: number) {
        this._points = this._points.map((point) => {
            return {
                x: point.x + x,
                y: point.y + y
            };
        });

        return this;
    }

    copy() {
        return new Spline(this._points);
    }

    draw(ctx: CanvasRenderingContext2D, color = "black", lineWidth = 3) {
        for (let i = 0; i < this._points.length - 1; i++) {
            ctx.beginPath();
            ctx.lineWidth = lineWidth;
            ctx.lineCap = "round";
            ctx.strokeStyle = color;
            ctx.fillStyle = color;
            ctx.moveTo(this._points[i].x, this._points[i].y);
            ctx.lineTo(this._points[i + 1].x, this._points[i + 1].y);
            ctx.closePath();
            ctx.stroke();
        }
    }

    drawPoints(ctx: CanvasRenderingContext2D, points: Point2D[], color = "black", radius = 5) {
        points.map((point) => {
            ctx.beginPath();
            ctx.lineCap = "round";
            ctx.fillStyle = color;
            ctx.strokeStyle = color;
            ctx.arc(point.x, point.y, radius, 0, 2 * Math.PI);
            ctx.fill();
        });
    }

    get points(): readonly Point2D[] {
        return this._points;
    }

    get pointLength() {
        return this._points.length;
    }

    get lastPoint() {
        return this._points[this.pointLength - 1];
    }

    get beforeLastPoint() {
        return this._points[this.pointLength - 2];
    }
}

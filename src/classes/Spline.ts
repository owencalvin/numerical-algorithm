import {Vector2D} from "./Vector2D";
import {Point2D} from "./Point2D";

export class Spline {
    private _points: Point2D[];

    constructor(points: Point2D[] = []) {
        this._points = points;
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

    findPoint(point: Point2D) {
        return this._points.find((p2) => point.x == p2.x && point.y == p2.y);
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
            if (index + 1 <= 1 || index + 1 >= this._points.length) return Infinity;

            const lastPoint = this._points[index - 1];
            const nextPoint = this._points[index + 1];

            const vBA = new Vector2D(currentPoint, lastPoint);
            const vBC = new Vector2D(currentPoint, nextPoint);

            return vBA.angle(vBC);
        });
    }

    get areas() {
        return this._points.map((currentPoint, index) => {
            if (index + 1 <= 1 || index + 1 >= this._points.length) return Infinity;

            const lastPoint = this._points[index - 1];
            const nextPoint = this._points[index + 1];

            const vBA = new Vector2D(currentPoint, lastPoint);
            const vBC = new Vector2D(currentPoint, nextPoint);
            const vAC = new Vector2D(lastPoint, nextPoint);

            const s = (vAC.norm + vBA.norm + vBC.norm) / 2;

            return Math.sqrt(s * (s - vAC.norm) * (s - vBA.norm) * (s - vBC.norm));
        });
    }

    controlPoints(values: number[], numberOfControlPoints: number) {
        numberOfControlPoints = Math.max(numberOfControlPoints, 2);

        const valuesWithIndexes = this.areas.map((value, index) => [value, index]);

        valuesWithIndexes.sort((a, b) => {
            if (Number.isNaN(b[0])) return -1;

            if (a[0] < b[0]) return 1;
            else if (a[0] > b[0]) return -1;
            return 0;
        });

        return valuesWithIndexes
            .slice(0, numberOfControlPoints)
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

    catmullRomInterpolation(
        nbInterpolationPointsFn: (pA: Point2D, pB: Point2D, pC: Point2D, pD: Point2D) => number
    ) {
        const lastPoint = this._points[this._points.length - 1];
        this._points = this._points.reduce<Point2D[]>((prev, pC, index) => {
            if (index + 1 <= 2 || index + 1 >= this._points.length) return prev;

            const add = (py: Point2D) => {
                if (!prev.find((px) => px.x === py.x && px.y === py.y)) {
                    prev.push(py);
                }
            };

            const pA = this._points[index - 2];
            const pB = this._points[index - 1];
            const pD = this._points[index + 1];

            add(pA);
            add(pB);

            const nbInterpolationPoints = nbInterpolationPointsFn(pA, pB, pC, pD);

            for (let i = 2; i < nbInterpolationPoints; i++) {
                const t = i / nbInterpolationPoints;

                const point = {
                    x: Spline.catmullRom(t, pA.x, pB.x, pC.x, pD.x),
                    y: Spline.catmullRom(t, pA.y, pB.y, pC.y, pD.y)
                };

                prev = [
                    ...prev,
                    point,
                ];
            }

            add(pC);

            return prev;
        }, []);

        this._points = [
            ...this._points,
            lastPoint
        ];

        return this;
    }

    static catmullRom(t: number, mA: number, mB: number, mC: number, mD: number) {
        const a = 3 * mB - mA - 3 * mC + mD;
        const b = 2 * mA - 5 * mB + 4 * mC - mD;
        const c = (mC - mA) * t;
        const d = 2 * mB;
        const final = a * t ** 3 + b * t ** 2 + c + d;
        return 0.5 * final;
    }
}

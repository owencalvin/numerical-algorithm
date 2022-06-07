import {Point2D} from "./Point2D";

export class Polygon {
    private _points: Point2D[];

    constructor(...points: Point2D[]) {
        this._points = points;
    }

    area() {
        let area = 0.0;
        let j = this._points.length - 1;

        for (let i = 0; i < this._points.length; i++) {
            area += (this._points[j].x + this._points[i].x) * (this._points[j].y - this._points[i].y);
            j = i;
        }

        return Math.abs(area / 2.0);
    }
}


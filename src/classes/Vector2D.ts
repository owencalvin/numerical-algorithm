import {Point2D} from "./Point2D";

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

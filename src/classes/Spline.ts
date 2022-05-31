export interface Point2D {
    x: number;
    y: number;
}


export class Spline {
    private _points: Point2D[] = [];

    addPoint(point: Point2D) {
        this._points.push(point);
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

export class Splines {
    private _splines: Spline[] = [];

    createNewSpline(): Spline {
        const spline = new Spline();
        this.addSpline(spline);

        return spline;
    }

    addSpline(spline: Spline) {
        this._splines.push(spline);
    }

    get lastSpline() {
        return this._splines[this._splines.length - 1];
    }

    get splines(): readonly Spline[] {
        return this._splines;
    }
}

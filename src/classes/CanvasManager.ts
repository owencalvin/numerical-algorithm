import {Point2D} from "./Spline";

export class CanvasManager {
    private _canvas: HTMLCanvasElement;
    private _context: CanvasRenderingContext2D;
    private _isDrawing: boolean;
    private _pixelRatio: number;

    get canvas() {
        return this._canvas;
    }

    get pixelRatio() {
        return this._pixelRatio;
    }

    get context() {
        return this._context;
    }

    get isDrawing() {
        return this._isDrawing;
    }

    set isDrawing(isDrawing: boolean) {
        this._isDrawing = isDrawing;
    }

    constructor(canvas: HTMLCanvasElement, scaleFactor?: number) {
        this._isDrawing = false;
        this._canvas = canvas;
        this._pixelRatio = scaleFactor || window.devicePixelRatio || 1;

        const rect = this._canvas.getBoundingClientRect();
        const context = this._canvas.getContext("2d");

        this._canvas.style.width = this._canvas.width + 'px';
        this._canvas.style.height = this._canvas.height + 'px';

        this._canvas.width = rect.width * this._pixelRatio;
        this._canvas.height = rect.height * this._pixelRatio;

        context.scale(this._pixelRatio, this._pixelRatio);

        this._context = context;
    }

    clear() {
        this.context.clearRect(0, 0, this._context.canvas.width, this._context.canvas.height);
    }

    getPoint(e: MouseEvent): Point2D {
        const rect = this._canvas.getBoundingClientRect();

        return {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        };
    }
}

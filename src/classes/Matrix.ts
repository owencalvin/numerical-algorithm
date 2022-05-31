/**
 * Labo: 3 (Linear systems)
 * Authors: Owen Gombas, David Darmanger, Julien Vaucher, Clément Petignat
 * Team: 2
 * School: HE-Arc
 * Date: 6 mai 2022
 * Course: Mathématiques spécifiques (Module 2234) - M. Stéphane Gobron
 */

/**
 * Represent a matrix with a 2d array of its components
 */
export class Matrix {
    constructor(components: number[][]);

    constructor(components: number[][], isAugmented: boolean);

    constructor(components: number[][], isAugmented?: boolean) {
        // Prevent from creating an empty matrix
        if (components.length == 0)
            throw "Error while creating a matrix";

        this._det = 0;
        this._m = components.length;
        this._n = components[0].length;
        this._components = components;
        this._isAugmented = isAugmented ?? false;
    }

    private readonly _m: number;

    /**
     * Return the number of rows of the matrix
     */
    get m() {
        return this._m;
    }

    private _n: number;

    /**
     * Return the number of columns of the matrix
     */
    get n() {
        return this._n;
    }

    private _det: number;

    /**
     * Return the determinant of the matrix
     */
    get det() {
        return this._det;
    }

    private readonly _components: number[][];

    /**
     * Return the 2d array who's representing the matrix
     */
    get components() {
        return this._components;
    }

    private _isAugmented: boolean;

    /**
     * Return if this matrix is augmented or not
     */
    get isAugmented() {
        return this._isAugmented;
    }

    /*** Other methods ***/

    /**
     * Return a row based on its number
     */
    public row(rowNum: number): number[] {
        return this._components[rowNum];
    }

    /**
     * Return a component of the matrix based on its row and column
     * @param rowIdx The index of the row where the component is
     * @param colIdx The index of the column where the component is
     * @returns The component in the given position
     */
    public component(rowIdx: number, colIdx: number): number {
        return this._components[rowIdx][colIdx];
    }

    /**
     * Multiply a row of this matrix by a scalar
     * @param rowIdx The number of the row to multiply
     * @param multi The scalar to use as a multiplier
     */
    public multiplyRow(rowIdx: number, multi: number) {
        // Multiply every component of the row
        for (let colN = 0; colN < this._n; colN++) {
            this._components[rowIdx][colN] *= multi;
        }
    }

    /**
     * Augment this matrix with another one
     * @param matrix The second matrix
     */
    public augment(matrix: Matrix) {

        // Assure the matrix can be appended
        if (this._m != matrix.m) {
            throw "The matrices should have the same number of rows";
        }

        for (let rowIdx = 0; rowIdx < this._m; rowIdx++) {
            for (let colIdx = this._m; colIdx < this._m + matrix.m; colIdx++) {
                this._components[rowIdx][colIdx] = matrix.component(rowIdx, colIdx - this._m);
            }
        }

        this._n += matrix.n;
        this._isAugmented = true;
    }

    /**
     * Switch two rows of this matrix
     * @param row1 The number of the first row to switch
     * @param row2 The number of the second row to switch
     */
    public switchRows(row1: number, row2: number) {
        // Switch the rows
        const tempRow = this._components[row1];
        this._components[row1] = this._components[row2];
        this._components[row2] = tempRow;
    }

    /**
     * Find the reduced row echelon form of this matrix and
     * calculate the determinant at the same time
     */
    public reducedRowEchelonForm() {
        let currentPivot = -1;
        let switchNumber = 0;

        this._det = 1;

        const LAST_COLUMN = (this._isAugmented) ? this._n - 1 : this._n;

        for (let colN = 0; colN < LAST_COLUMN; colN++) {
            const colMaxRow = this.columnAbsMaxRow(colN, currentPivot + 1);

            // Calculate the determinant
            this._det *= this._components[colMaxRow][colN];

            if (this._components[colMaxRow][colN] != 0) {

                // Keep the pivot below the number of rows
                if (currentPivot + 1 < this._m)
                    currentPivot++;

                // Normalize the row of the current column with the biggest component
                this.multiplyRow(colMaxRow, 1.0 / this._components[colMaxRow][colN]);

                if (colMaxRow != currentPivot) {
                    this.switchRows(colMaxRow, currentPivot);
                    switchNumber++;
                }

                // Normalize the other rows
                for (let rowN = 0; rowN < this._m; rowN++) {
                    if (rowN != currentPivot) {
                        this.addMultipliedRowToRow(currentPivot, -this._components[rowN][colN], rowN);
                    }
                }
            }
        }

        // Fix the sign of the determinant
        this._det *= (-1) ** switchNumber;
    }

    /**
     * Add a multiplied row of this matrix to another row
     * @param multiRow The number of the row to multiply
     * @param multi The scalar to use as a multiplier
     * @param addRow The row to add the multiplied row to
     */
    public addMultipliedRowToRow(multiRow: number, multi: number, addRow: number) {
        for (let colN = 0; colN < this._n; colN++) {
            this._components[addRow][colN] += this._components[multiRow][colN] * multi;
        }
    }

    /**
     * Return the index of the row containing the absolute
     * max value of a given column in this matrix
     * @param colIdx The index of the column to search in
     * @param startRowIdx From which row index to search
     * @returns The index of the row containing the absolute max value of the column
     */
    public columnAbsMaxRow(colIdx: number, startRowIdx: number) {
        let maxValue = Math.abs(this._components[startRowIdx][colIdx]);
        let maxIndex = startRowIdx;

        // Find the row index with the max in the given column
        for (let rowN = startRowIdx + 1; rowN < this._m; rowN++) {
            if (Math.abs(this._components[rowN][colIdx]) > maxValue) {
                maxValue = Math.abs(this._components[rowN][colIdx]);
                maxIndex = rowN;
            }
        }
        return maxIndex;
    }
}

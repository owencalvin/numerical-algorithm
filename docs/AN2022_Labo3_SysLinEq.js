/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/classes/Matrix.ts
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
var Matrix = /** @class */ (function () {
    function Matrix(components, isAugmented) {
        // Prevent from creating an empty matrix
        if (components.length == 0)
            throw "Error while creating a matrix";
        this._det = 0;
        this._m = components.length;
        this._n = components[0].length;
        this._components = components;
        this._isAugmented = isAugmented !== null && isAugmented !== void 0 ? isAugmented : false;
    }
    Object.defineProperty(Matrix.prototype, "m", {
        /**
         * Return the number of rows of the matrix
         */
        get: function () {
            return this._m;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Matrix.prototype, "n", {
        /**
         * Return the number of columns of the matrix
         */
        get: function () {
            return this._n;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Matrix.prototype, "det", {
        /************************/
        /*** Instance methods ***/
        /************************/
        /*** Getters ***/
        /**
         * Return the determinant of the matrix
         */
        get: function () {
            return this._det;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Matrix.prototype, "components", {
        /**
         * Return the 2d array who's representing the matrix
         */
        get: function () {
            return this._components;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Matrix.prototype, "isAugmented", {
        /**
         * Return if this matrix is augmented or not
         */
        get: function () {
            return this._isAugmented;
        },
        enumerable: false,
        configurable: true
    });
    /*** Other methods ***/
    /**
     * Return a row based on its number
     */
    Matrix.prototype.row = function (rowNum) {
        return this._components[rowNum];
    };
    /**
     * Return a component of the matrix based on its row and column
     * @param rowIdx The index of the row where the component is
     * @param colIdx The index of the column where the component is
     * @returns The component in the given position
     */
    Matrix.prototype.component = function (rowIdx, colIdx) {
        return this._components[rowIdx][colIdx];
    };
    /**
     * Multiply a row of this matrix by a scalar
     * @param rowIdx The number of the row to multiply
     * @param multi The scalar to use as a multiplier
     */
    Matrix.prototype.multiplyRow = function (rowIdx, multi) {
        // Multiply every component of the row
        for (var colN = 0; colN < this._n; colN++) {
            this._components[rowIdx][colN] *= multi;
        }
    };
    /**
     * Augment this matrix with another one
     * @param matrix The second matrix
     */
    Matrix.prototype.augment = function (matrix) {
        // Assure the matrix can be appended
        if (this._m != matrix.m)
            throw "The matrices should have the same number of rows";
        for (var rowIdx = 0; rowIdx < this._m; rowIdx++) {
            for (var colIdx = this._m; colIdx < this._m + matrix.m; colIdx++) {
                this._components[rowIdx][colIdx] = matrix.component(rowIdx, colIdx - this._m);
            }
        }
        this._n += matrix.n;
        this._isAugmented = true;
    };
    /**
     * Switch two rows of this matrix
     * @param row1 The number of the first row to switch
     * @param row2 The number of the second row to switch
     */
    Matrix.prototype.switchRows = function (row1, row2) {
        // Switch the rows
        var tempRow = this._components[row1];
        this._components[row1] = this._components[row2];
        this._components[row2] = tempRow;
    };
    /**
     * Find the reduced row echelon form of this matrix and
     * calculate the determinant at the same time
     */
    Matrix.prototype.reducedRowEchelonForm = function () {
        var currentPivot = -1;
        var switchNumber = 0;
        this._det = 1;
        var LAST_COLUMN = (this._isAugmented) ? this._n - 1 : this._n;
        for (var colN = 0; colN < LAST_COLUMN; colN++) {
            var colMaxRow = this.columnAbsMaxRow(colN, currentPivot + 1);
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
                for (var rowN = 0; rowN < this._m; rowN++) {
                    if (rowN != currentPivot) {
                        this.addMultipliedRowToRow(currentPivot, -this._components[rowN][colN], rowN);
                    }
                }
            }
        }
        // Fix the sign of the determinant
        this._det *= Math.pow((-1), switchNumber);
    };
    /**
     * Add a multiplied row of this matrix to another row
     * @param multiRow The number of the row to multiply
     * @param multi The scalar to use as a multiplier
     * @param addRow The row to add the multiplied row to
     */
    Matrix.prototype.addMultipliedRowToRow = function (multiRow, multi, addRow) {
        for (var colN = 0; colN < this._n; colN++) {
            this._components[addRow][colN] += this._components[multiRow][colN] * multi;
        }
    };
    /**
     * Return the index of the row containing the absolute
     * max value of a given column in this matrix
     * @param colIdx The index of the column to search in
     * @param startRowIdx From which row index to search
     * @returns The index of the row containing the absolute max value of the column
     */
    Matrix.prototype.columnAbsMaxRow = function (colIdx, startRowIdx) {
        var maxValue = Math.abs(this._components[startRowIdx][colIdx]);
        var maxIndex = startRowIdx;
        // Find the row index with the max in the given column
        for (var rowN = startRowIdx + 1; rowN < this._m; rowN++) {
            if (Math.abs(this._components[rowN][colIdx]) > maxValue) {
                maxValue = Math.abs(this._components[rowN][colIdx]);
                maxIndex = rowN;
            }
        }
        return maxIndex;
    };
    return Matrix;
}());


;// CONCATENATED MODULE: ./src/classes/LinearEquationsSystem.ts
/**
 * Labo: 3 (Linear systems)
 * Authors: Owen Gombas, David Darmanger, Julien Vaucher, Clément Petignat
 * Team: 2
 * School: HE-Arc
 * Date: 6 mai 2022
 * Course: Mathématiques spécifiques (Module 2234) - M. Stéphane Gobron
 */
/**
 * Represent a linear equation system of the form A*X = B with matrices
 */
var LinearEquationsSystem = /** @class */ (function () {
    function LinearEquationsSystem(a, b) {
        this._a = a;
        this._b = b;
    }
    /**
     * Return the solutions of this linear equations system
     * @returns The solutions of this linear equations system
     */
    LinearEquationsSystem.prototype.solutions = function () {
        var solutions = [];
        this._a.augment(this._b);
        this._a.reducedRowEchelonForm();
        if (this._a.det != 0) {
            // Find the solution in the reduced row echelon matrix
            for (var i = 0; i < this._a.m; i++) {
                solutions[i] = this._a.components[i][this._a.n - 1];
            }
        }
        return solutions;
    };
    return LinearEquationsSystem;
}());


;// CONCATENATED MODULE: ./src/AN2022_Labo3_SysLinEq.ts
/**
 * Labo: 3 (Linear systems)
 * Authors: Owen Gombas, David Darmanger, Julien Vaucher, Clément Petignat
 * Team: 2
 * School: HE-Arc
 * Date: 6 mai 2022
 * Course: Mathématiques spécifiques (Module 2234) - M. Stéphane Gobron
 */


var erJson = document.getElementById("er-json");
var erResult = document.getElementById("er-result");
var matrixA = null;
var matrixB = null;
function readFile(file) {
    return new Promise(function (resolve) {
        var reader = new FileReader();
        reader.readAsText(file);
        reader.onload = function () {
            resolve(JSON.parse(reader.result.toString()));
        };
    });
}
function findSolutions() {
    if (matrixA && matrixB) {
        var start = new Date().getTime();
        var linEqSys = new LinearEquationsSystem(matrixA, matrixB);
        var solutions = linEqSys.solutions();
        var elapsed = new Date().getTime() - start;
        // Add the results in the HTML
        if (solutions.length > 0) {
            var results = solutions
                .map(function (solutions, index) { return "<p class=\"mono\">s<sub class=\"mono\">".concat(index, "</sub> \u2248 ").concat(solutions, "</p>"); })
                .join("");
            erResult.innerHTML = "\n      <div class=\"result-group color-green\">\n        <span class=\"color-grey\">\n          <span class=\"mono\">".concat(solutions.length, "</span> solutions trouv\u00E9es (en ").concat(elapsed / 1000, " secondes):\n        </span>\n        <details ").concat(solutions.length > 20 ? "" : "open", ">\n          <summary>Afficher/masquer toutes les solutions</summary>\n          ").concat(results, "\n        </details>\n      </div>\n      ");
        }
        else {
            erResult.innerHTML = "\n      <div class=\"result-group\">\n        <span class=\"color-red\">\n          <span class=\"mono\">Le syst\u00E8me d'\u00E9quations lin\u00E9aire a une infinit\u00E9 ou aucune solution !</span>\n      </div>\n      ";
        }
    }
}
function convert(dim, components) {
    var rows = [];
    for (var i = 0; i < components.length / dim; i++) {
        var row = [];
        for (var j = 0; j < dim; j++) {
            row.push(components[i * dim + j]);
        }
        rows.push(row);
    }
    return rows;
}
function onChangeMatrixA() {
    matrixA = null;
    readFile(erJson.files[0]).then(function (json) {
        var dim = json['n'];
        matrixA = new Matrix(convert(dim, json["A"]));
        matrixB = new Matrix(convert(1, json["B"]));
        findSolutions();
    });
}
erJson.addEventListener("change", onChangeMatrixA);

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFHLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUMxQixHQUFHLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDckM7UUFDRCxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0tBQ2xCO0lBQ0QsT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQztBQUVELFNBQVMsZUFBZTtJQUNwQixPQUFPLEdBQUcsSUFBSSxDQUFDO0lBQ2YsUUFBUSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxJQUFTO1FBQzlDLElBQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN0QixPQUFPLEdBQUcsSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzlDLE9BQU8sR0FBRyxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDNUMsYUFBYSxFQUFFLENBQUM7SUFDcEIsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDO0FBRUQsTUFBTSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxlQUFlLENBQUMsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL21hdGhfc3BlLy4vc3JjL2NsYXNzZXMvTWF0cml4LnRzIiwid2VicGFjazovL21hdGhfc3BlLy4vc3JjL2NsYXNzZXMvTGluZWFyRXF1YXRpb25zU3lzdGVtLnRzIiwid2VicGFjazovL21hdGhfc3BlLy4vc3JjL0FOMjAyMl9MYWJvM19TeXNMaW5FcS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogTGFibzogMyAoTGluZWFyIHN5c3RlbXMpXHJcbiAqIEF1dGhvcnM6IE93ZW4gR29tYmFzLCBEYXZpZCBEYXJtYW5nZXIsIEp1bGllbiBWYXVjaGVyLCBDbMOpbWVudCBQZXRpZ25hdFxyXG4gKiBUZWFtOiAyXHJcbiAqIFNjaG9vbDogSEUtQXJjXHJcbiAqIERhdGU6IDYgbWFpIDIwMjJcclxuICogQ291cnNlOiBNYXRow6ltYXRpcXVlcyBzcMOpY2lmaXF1ZXMgKE1vZHVsZSAyMjM0KSAtIE0uIFN0w6lwaGFuZSBHb2Jyb25cclxuICovXHJcblxyXG4vKipcclxuICogUmVwcmVzZW50IGEgbWF0cml4IHdpdGggYSAyZCBhcnJheSBvZiBpdHMgY29tcG9uZW50c1xyXG4gKi9cclxuZXhwb3J0IGNsYXNzIE1hdHJpeCB7XHJcbiAgICBjb25zdHJ1Y3Rvcihjb21wb25lbnRzOiBudW1iZXJbXVtdKTtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihjb21wb25lbnRzOiBudW1iZXJbXVtdLCBpc0F1Z21lbnRlZDogYm9vbGVhbik7XHJcblxyXG4gICAgY29uc3RydWN0b3IoY29tcG9uZW50czogbnVtYmVyW11bXSwgaXNBdWdtZW50ZWQ/OiBib29sZWFuKSB7XHJcbiAgICAgICAgLy8gUHJldmVudCBmcm9tIGNyZWF0aW5nIGFuIGVtcHR5IG1hdHJpeFxyXG4gICAgICAgIGlmIChjb21wb25lbnRzLmxlbmd0aCA9PSAwKVxyXG4gICAgICAgICAgICB0aHJvdyBcIkVycm9yIHdoaWxlIGNyZWF0aW5nIGEgbWF0cml4XCI7XHJcblxyXG4gICAgICAgIHRoaXMuX2RldCA9IDA7XHJcbiAgICAgICAgdGhpcy5fbSA9IGNvbXBvbmVudHMubGVuZ3RoO1xyXG4gICAgICAgIHRoaXMuX24gPSBjb21wb25lbnRzWzBdLmxlbmd0aDtcclxuICAgICAgICB0aGlzLl9jb21wb25lbnRzID0gY29tcG9uZW50cztcclxuICAgICAgICB0aGlzLl9pc0F1Z21lbnRlZCA9IGlzQXVnbWVudGVkID8/IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX206IG51bWJlcjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybiB0aGUgbnVtYmVyIG9mIHJvd3Mgb2YgdGhlIG1hdHJpeFxyXG4gICAgICovXHJcbiAgICBnZXQgbSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9uOiBudW1iZXI7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm4gdGhlIG51bWJlciBvZiBjb2x1bW5zIG9mIHRoZSBtYXRyaXhcclxuICAgICAqL1xyXG4gICAgZ2V0IG4oKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX247XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfZGV0OiBudW1iZXI7XHJcblxyXG4gICAgLyoqKioqKioqKioqKioqKioqKioqKioqKi9cclxuICAgIC8qKiogSW5zdGFuY2UgbWV0aG9kcyAqKiovXHJcbiAgICAvKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5cclxuICAgIC8qKiogR2V0dGVycyAqKiovXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm4gdGhlIGRldGVybWluYW50IG9mIHRoZSBtYXRyaXhcclxuICAgICAqL1xyXG4gICAgZ2V0IGRldCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZGV0O1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX2NvbXBvbmVudHM6IG51bWJlcltdW107XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm4gdGhlIDJkIGFycmF5IHdobydzIHJlcHJlc2VudGluZyB0aGUgbWF0cml4XHJcbiAgICAgKi9cclxuICAgIGdldCBjb21wb25lbnRzKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jb21wb25lbnRzO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX2lzQXVnbWVudGVkOiBib29sZWFuO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJuIGlmIHRoaXMgbWF0cml4IGlzIGF1Z21lbnRlZCBvciBub3RcclxuICAgICAqL1xyXG4gICAgZ2V0IGlzQXVnbWVudGVkKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9pc0F1Z21lbnRlZDtcclxuICAgIH1cclxuXHJcbiAgICAvKioqIE90aGVyIG1ldGhvZHMgKioqL1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJuIGEgcm93IGJhc2VkIG9uIGl0cyBudW1iZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIHJvdyhyb3dOdW06IG51bWJlcik6IG51bWJlcltdIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY29tcG9uZW50c1tyb3dOdW1dO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJuIGEgY29tcG9uZW50IG9mIHRoZSBtYXRyaXggYmFzZWQgb24gaXRzIHJvdyBhbmQgY29sdW1uXHJcbiAgICAgKiBAcGFyYW0gcm93SWR4IFRoZSBpbmRleCBvZiB0aGUgcm93IHdoZXJlIHRoZSBjb21wb25lbnQgaXNcclxuICAgICAqIEBwYXJhbSBjb2xJZHggVGhlIGluZGV4IG9mIHRoZSBjb2x1bW4gd2hlcmUgdGhlIGNvbXBvbmVudCBpc1xyXG4gICAgICogQHJldHVybnMgVGhlIGNvbXBvbmVudCBpbiB0aGUgZ2l2ZW4gcG9zaXRpb25cclxuICAgICAqL1xyXG4gICAgcHVibGljIGNvbXBvbmVudChyb3dJZHg6IG51bWJlciwgY29sSWR4OiBudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jb21wb25lbnRzW3Jvd0lkeF1bY29sSWR4XTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIE11bHRpcGx5IGEgcm93IG9mIHRoaXMgbWF0cml4IGJ5IGEgc2NhbGFyXHJcbiAgICAgKiBAcGFyYW0gcm93SWR4IFRoZSBudW1iZXIgb2YgdGhlIHJvdyB0byBtdWx0aXBseVxyXG4gICAgICogQHBhcmFtIG11bHRpIFRoZSBzY2FsYXIgdG8gdXNlIGFzIGEgbXVsdGlwbGllclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgbXVsdGlwbHlSb3cocm93SWR4OiBudW1iZXIsIG11bHRpOiBudW1iZXIpIHtcclxuICAgICAgICAvLyBNdWx0aXBseSBldmVyeSBjb21wb25lbnQgb2YgdGhlIHJvd1xyXG4gICAgICAgIGZvciAobGV0IGNvbE4gPSAwOyBjb2xOIDwgdGhpcy5fbjsgY29sTisrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2NvbXBvbmVudHNbcm93SWR4XVtjb2xOXSAqPSBtdWx0aTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBdWdtZW50IHRoaXMgbWF0cml4IHdpdGggYW5vdGhlciBvbmVcclxuICAgICAqIEBwYXJhbSBtYXRyaXggVGhlIHNlY29uZCBtYXRyaXhcclxuICAgICAqL1xyXG4gICAgcHVibGljIGF1Z21lbnQobWF0cml4OiBNYXRyaXgpIHtcclxuXHJcbiAgICAgICAgLy8gQXNzdXJlIHRoZSBtYXRyaXggY2FuIGJlIGFwcGVuZGVkXHJcbiAgICAgICAgaWYgKHRoaXMuX20gIT0gbWF0cml4Lm0pXHJcbiAgICAgICAgICAgIHRocm93IFwiVGhlIG1hdHJpY2VzIHNob3VsZCBoYXZlIHRoZSBzYW1lIG51bWJlciBvZiByb3dzXCI7XHJcblxyXG4gICAgICAgIGZvciAobGV0IHJvd0lkeCA9IDA7IHJvd0lkeCA8IHRoaXMuX207IHJvd0lkeCsrKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGNvbElkeCA9IHRoaXMuX207IGNvbElkeCA8IHRoaXMuX20gKyBtYXRyaXgubTsgY29sSWR4KyspIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2NvbXBvbmVudHNbcm93SWR4XVtjb2xJZHhdID0gbWF0cml4LmNvbXBvbmVudChyb3dJZHgsIGNvbElkeCAtIHRoaXMuX20pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX24gKz0gbWF0cml4Lm47XHJcbiAgICAgICAgdGhpcy5faXNBdWdtZW50ZWQgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU3dpdGNoIHR3byByb3dzIG9mIHRoaXMgbWF0cml4XHJcbiAgICAgKiBAcGFyYW0gcm93MSBUaGUgbnVtYmVyIG9mIHRoZSBmaXJzdCByb3cgdG8gc3dpdGNoXHJcbiAgICAgKiBAcGFyYW0gcm93MiBUaGUgbnVtYmVyIG9mIHRoZSBzZWNvbmQgcm93IHRvIHN3aXRjaFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3dpdGNoUm93cyhyb3cxOiBudW1iZXIsIHJvdzI6IG51bWJlcikge1xyXG4gICAgICAgIC8vIFN3aXRjaCB0aGUgcm93c1xyXG4gICAgICAgIGNvbnN0IHRlbXBSb3cgPSB0aGlzLl9jb21wb25lbnRzW3JvdzFdO1xyXG4gICAgICAgIHRoaXMuX2NvbXBvbmVudHNbcm93MV0gPSB0aGlzLl9jb21wb25lbnRzW3JvdzJdO1xyXG4gICAgICAgIHRoaXMuX2NvbXBvbmVudHNbcm93Ml0gPSB0ZW1wUm93O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRmluZCB0aGUgcmVkdWNlZCByb3cgZWNoZWxvbiBmb3JtIG9mIHRoaXMgbWF0cml4IGFuZFxyXG4gICAgICogY2FsY3VsYXRlIHRoZSBkZXRlcm1pbmFudCBhdCB0aGUgc2FtZSB0aW1lXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyByZWR1Y2VkUm93RWNoZWxvbkZvcm0oKSB7XHJcbiAgICAgICAgbGV0IGN1cnJlbnRQaXZvdCA9IC0xO1xyXG4gICAgICAgIGxldCBzd2l0Y2hOdW1iZXIgPSAwO1xyXG5cclxuICAgICAgICB0aGlzLl9kZXQgPSAxO1xyXG5cclxuICAgICAgICBjb25zdCBMQVNUX0NPTFVNTiA9ICh0aGlzLl9pc0F1Z21lbnRlZCkgPyB0aGlzLl9uIC0gMSA6IHRoaXMuX247XHJcblxyXG4gICAgICAgIGZvciAobGV0IGNvbE4gPSAwOyBjb2xOIDwgTEFTVF9DT0xVTU47IGNvbE4rKykge1xyXG4gICAgICAgICAgICBjb25zdCBjb2xNYXhSb3cgPSB0aGlzLmNvbHVtbkFic01heFJvdyhjb2xOLCBjdXJyZW50UGl2b3QgKyAxKTtcclxuXHJcbiAgICAgICAgICAgIC8vIENhbGN1bGF0ZSB0aGUgZGV0ZXJtaW5hbnRcclxuICAgICAgICAgICAgdGhpcy5fZGV0ICo9IHRoaXMuX2NvbXBvbmVudHNbY29sTWF4Um93XVtjb2xOXTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9jb21wb25lbnRzW2NvbE1heFJvd11bY29sTl0gIT0gMCkge1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIEtlZXAgdGhlIHBpdm90IGJlbG93IHRoZSBudW1iZXIgb2Ygcm93c1xyXG4gICAgICAgICAgICAgICAgaWYgKGN1cnJlbnRQaXZvdCArIDEgPCB0aGlzLl9tKVxyXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRQaXZvdCsrO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIE5vcm1hbGl6ZSB0aGUgcm93IG9mIHRoZSBjdXJyZW50IGNvbHVtbiB3aXRoIHRoZSBiaWdnZXN0IGNvbXBvbmVudFxyXG4gICAgICAgICAgICAgICAgdGhpcy5tdWx0aXBseVJvdyhjb2xNYXhSb3csIDEuMCAvIHRoaXMuX2NvbXBvbmVudHNbY29sTWF4Um93XVtjb2xOXSk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGNvbE1heFJvdyAhPSBjdXJyZW50UGl2b3QpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN3aXRjaFJvd3MoY29sTWF4Um93LCBjdXJyZW50UGl2b3QpO1xyXG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaE51bWJlcisrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIE5vcm1hbGl6ZSB0aGUgb3RoZXIgcm93c1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgcm93TiA9IDA7IHJvd04gPCB0aGlzLl9tOyByb3dOKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocm93TiAhPSBjdXJyZW50UGl2b3QpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRNdWx0aXBsaWVkUm93VG9Sb3coY3VycmVudFBpdm90LCAtdGhpcy5fY29tcG9uZW50c1tyb3dOXVtjb2xOXSwgcm93Tik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBGaXggdGhlIHNpZ24gb2YgdGhlIGRldGVybWluYW50XHJcbiAgICAgICAgdGhpcy5fZGV0ICo9ICgtMSkgKiogc3dpdGNoTnVtYmVyO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkIGEgbXVsdGlwbGllZCByb3cgb2YgdGhpcyBtYXRyaXggdG8gYW5vdGhlciByb3dcclxuICAgICAqIEBwYXJhbSBtdWx0aVJvdyBUaGUgbnVtYmVyIG9mIHRoZSByb3cgdG8gbXVsdGlwbHlcclxuICAgICAqIEBwYXJhbSBtdWx0aSBUaGUgc2NhbGFyIHRvIHVzZSBhcyBhIG11bHRpcGxpZXJcclxuICAgICAqIEBwYXJhbSBhZGRSb3cgVGhlIHJvdyB0byBhZGQgdGhlIG11bHRpcGxpZWQgcm93IHRvXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhZGRNdWx0aXBsaWVkUm93VG9Sb3cobXVsdGlSb3c6IG51bWJlciwgbXVsdGk6IG51bWJlciwgYWRkUm93OiBudW1iZXIpIHtcclxuICAgICAgICBmb3IgKGxldCBjb2xOID0gMDsgY29sTiA8IHRoaXMuX247IGNvbE4rKykge1xyXG4gICAgICAgICAgICB0aGlzLl9jb21wb25lbnRzW2FkZFJvd11bY29sTl0gKz0gdGhpcy5fY29tcG9uZW50c1ttdWx0aVJvd11bY29sTl0gKiBtdWx0aTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm4gdGhlIGluZGV4IG9mIHRoZSByb3cgY29udGFpbmluZyB0aGUgYWJzb2x1dGVcclxuICAgICAqIG1heCB2YWx1ZSBvZiBhIGdpdmVuIGNvbHVtbiBpbiB0aGlzIG1hdHJpeFxyXG4gICAgICogQHBhcmFtIGNvbElkeCBUaGUgaW5kZXggb2YgdGhlIGNvbHVtbiB0byBzZWFyY2ggaW5cclxuICAgICAqIEBwYXJhbSBzdGFydFJvd0lkeCBGcm9tIHdoaWNoIHJvdyBpbmRleCB0byBzZWFyY2hcclxuICAgICAqIEByZXR1cm5zIFRoZSBpbmRleCBvZiB0aGUgcm93IGNvbnRhaW5pbmcgdGhlIGFic29sdXRlIG1heCB2YWx1ZSBvZiB0aGUgY29sdW1uXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBjb2x1bW5BYnNNYXhSb3coY29sSWR4OiBudW1iZXIsIHN0YXJ0Um93SWR4OiBudW1iZXIpIHtcclxuICAgICAgICBsZXQgbWF4VmFsdWUgPSBNYXRoLmFicyh0aGlzLl9jb21wb25lbnRzW3N0YXJ0Um93SWR4XVtjb2xJZHhdKTtcclxuICAgICAgICBsZXQgbWF4SW5kZXggPSBzdGFydFJvd0lkeDtcclxuXHJcbiAgICAgICAgLy8gRmluZCB0aGUgcm93IGluZGV4IHdpdGggdGhlIG1heCBpbiB0aGUgZ2l2ZW4gY29sdW1uXHJcbiAgICAgICAgZm9yIChsZXQgcm93TiA9IHN0YXJ0Um93SWR4ICsgMTsgcm93TiA8IHRoaXMuX207IHJvd04rKykge1xyXG4gICAgICAgICAgICBpZiAoTWF0aC5hYnModGhpcy5fY29tcG9uZW50c1tyb3dOXVtjb2xJZHhdKSA+IG1heFZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICBtYXhWYWx1ZSA9IE1hdGguYWJzKHRoaXMuX2NvbXBvbmVudHNbcm93Tl1bY29sSWR4XSk7XHJcbiAgICAgICAgICAgICAgICBtYXhJbmRleCA9IHJvd047XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG1heEluZGV4O1xyXG4gICAgfVxyXG59XHJcbiIsIi8qKlxuICogTGFibzogMyAoTGluZWFyIHN5c3RlbXMpXG4gKiBBdXRob3JzOiBPd2VuIEdvbWJhcywgRGF2aWQgRGFybWFuZ2VyLCBKdWxpZW4gVmF1Y2hlciwgQ2zDqW1lbnQgUGV0aWduYXRcbiAqIFRlYW06IDJcbiAqIFNjaG9vbDogSEUtQXJjXG4gKiBEYXRlOiA2IG1haSAyMDIyXG4gKiBDb3Vyc2U6IE1hdGjDqW1hdGlxdWVzIHNww6ljaWZpcXVlcyAoTW9kdWxlIDIyMzQpIC0gTS4gU3TDqXBoYW5lIEdvYnJvblxuICovXG5cbmltcG9ydCB7TWF0cml4fSBmcm9tIFwiLi9NYXRyaXhcIjtcblxuLyoqXG4gKiBSZXByZXNlbnQgYSBsaW5lYXIgZXF1YXRpb24gc3lzdGVtIG9mIHRoZSBmb3JtIEEqWCA9IEIgd2l0aCBtYXRyaWNlc1xuICovXG5leHBvcnQgY2xhc3MgTGluZWFyRXF1YXRpb25zU3lzdGVtIHtcbiAgICBwcml2YXRlIF9hOiBNYXRyaXg7XG4gICAgcHJpdmF0ZSByZWFkb25seSBfYjogTWF0cml4O1xuXG4gICAgY29uc3RydWN0b3IoYTogTWF0cml4LCBiOiBNYXRyaXgpIHtcbiAgICAgICAgdGhpcy5fYSA9IGE7XG4gICAgICAgIHRoaXMuX2IgPSBiO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybiB0aGUgc29sdXRpb25zIG9mIHRoaXMgbGluZWFyIGVxdWF0aW9ucyBzeXN0ZW1cbiAgICAgKiBAcmV0dXJucyBUaGUgc29sdXRpb25zIG9mIHRoaXMgbGluZWFyIGVxdWF0aW9ucyBzeXN0ZW1cbiAgICAgKi9cbiAgICBwdWJsaWMgc29sdXRpb25zKCkge1xuICAgICAgICBjb25zdCBzb2x1dGlvbnM6IG51bWJlcltdID0gW107XG5cbiAgICAgICAgdGhpcy5fYS5hdWdtZW50KHRoaXMuX2IpO1xuICAgICAgICB0aGlzLl9hLnJlZHVjZWRSb3dFY2hlbG9uRm9ybSgpO1xuXG4gICAgICAgIGlmICh0aGlzLl9hLmRldCAhPSAwKSB7XG4gICAgICAgICAgICAvLyBGaW5kIHRoZSBzb2x1dGlvbiBpbiB0aGUgcmVkdWNlZCByb3cgZWNoZWxvbiBtYXRyaXhcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fYS5tOyBpKyspIHtcbiAgICAgICAgICAgICAgICBzb2x1dGlvbnNbaV0gPSB0aGlzLl9hLmNvbXBvbmVudHNbaV1bdGhpcy5fYS5uIC0gMV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gc29sdXRpb25zO1xuICAgIH1cbn1cbiIsIi8qKlxyXG4gKiBMYWJvOiAzIChMaW5lYXIgc3lzdGVtcylcclxuICogQXV0aG9yczogT3dlbiBHb21iYXMsIERhdmlkIERhcm1hbmdlciwgSnVsaWVuIFZhdWNoZXIsIENsw6ltZW50IFBldGlnbmF0XHJcbiAqIFRlYW06IDJcclxuICogU2Nob29sOiBIRS1BcmNcclxuICogRGF0ZTogNiBtYWkgMjAyMlxyXG4gKiBDb3Vyc2U6IE1hdGjDqW1hdGlxdWVzIHNww6ljaWZpcXVlcyAoTW9kdWxlIDIyMzQpIC0gTS4gU3TDqXBoYW5lIEdvYnJvblxyXG4gKi9cclxuXHJcbmltcG9ydCB7TWF0cml4fSBmcm9tIFwiLi9jbGFzc2VzL01hdHJpeFwiO1xyXG5pbXBvcnQge0xpbmVhckVxdWF0aW9uc1N5c3RlbX0gZnJvbSBcIi4vY2xhc3Nlcy9MaW5lYXJFcXVhdGlvbnNTeXN0ZW1cIjtcclxuXHJcbmNvbnN0IGVySnNvbiA9IDxIVE1MSW5wdXRFbGVtZW50PmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZXItanNvblwiKTtcclxuY29uc3QgZXJSZXN1bHQgPSA8SFRNTElucHV0RWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImVyLXJlc3VsdFwiKTtcclxuXHJcbmxldCBtYXRyaXhBOiBNYXRyaXggPSBudWxsO1xyXG5sZXQgbWF0cml4QjogTWF0cml4ID0gbnVsbDtcclxuXHJcbmZ1bmN0aW9uIHJlYWRGaWxlKGZpbGU6IGFueSkge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlKSB7XHJcbiAgICAgICAgY29uc3QgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcclxuICAgICAgICByZWFkZXIucmVhZEFzVGV4dChmaWxlKTtcclxuICAgICAgICByZWFkZXIub25sb2FkID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXNvbHZlKEpTT04ucGFyc2UocmVhZGVyLnJlc3VsdC50b1N0cmluZygpKSk7XHJcbiAgICAgICAgfTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBmaW5kU29sdXRpb25zKCkge1xyXG4gICAgaWYgKG1hdHJpeEEgJiYgbWF0cml4Qikge1xyXG5cclxuICAgICAgICBjb25zdCBzdGFydCA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xyXG5cclxuICAgICAgICBsZXQgbGluRXFTeXMgPSBuZXcgTGluZWFyRXF1YXRpb25zU3lzdGVtKG1hdHJpeEEsIG1hdHJpeEIpO1xyXG4gICAgICAgIGxldCBzb2x1dGlvbnM6IG51bWJlcltdID0gbGluRXFTeXMuc29sdXRpb25zKCk7XHJcblxyXG4gICAgICAgIGxldCBlbGFwc2VkID0gbmV3IERhdGUoKS5nZXRUaW1lKCkgLSBzdGFydDtcclxuXHJcbiAgICAgICAgLy8gQWRkIHRoZSByZXN1bHRzIGluIHRoZSBIVE1MXHJcbiAgICAgICAgaWYgKHNvbHV0aW9ucy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIGxldCByZXN1bHRzID0gc29sdXRpb25zXHJcbiAgICAgICAgICAgICAgICAubWFwKFxyXG4gICAgICAgICAgICAgICAgICAgIChzb2x1dGlvbnMsIGluZGV4KSA9PiBgPHAgY2xhc3M9XCJtb25vXCI+czxzdWIgY2xhc3M9XCJtb25vXCI+JHtpbmRleH08L3N1Yj4g4omIICR7c29sdXRpb25zfTwvcD5gXHJcbiAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAuam9pbihcIlwiKTtcclxuXHJcbiAgICAgICAgICAgIGVyUmVzdWx0LmlubmVySFRNTCA9IGBcclxuICAgICAgPGRpdiBjbGFzcz1cInJlc3VsdC1ncm91cCBjb2xvci1ncmVlblwiPlxyXG4gICAgICAgIDxzcGFuIGNsYXNzPVwiY29sb3ItZ3JleVwiPlxyXG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJtb25vXCI+JHtzb2x1dGlvbnMubGVuZ3RofTwvc3Bhbj4gc29sdXRpb25zIHRyb3V2w6llcyAoZW4gJHtlbGFwc2VkIC8gMTAwMH0gc2Vjb25kZXMpOlxyXG4gICAgICAgIDwvc3Bhbj5cclxuICAgICAgICA8ZGV0YWlscyAke3NvbHV0aW9ucy5sZW5ndGggPiAyMCA/IFwiXCIgOiBcIm9wZW5cIn0+XHJcbiAgICAgICAgICA8c3VtbWFyeT5BZmZpY2hlci9tYXNxdWVyIHRvdXRlcyBsZXMgc29sdXRpb25zPC9zdW1tYXJ5PlxyXG4gICAgICAgICAgJHtyZXN1bHRzfVxyXG4gICAgICAgIDwvZGV0YWlscz5cclxuICAgICAgPC9kaXY+XHJcbiAgICAgIGA7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZXJSZXN1bHQuaW5uZXJIVE1MID0gYFxyXG4gICAgICA8ZGl2IGNsYXNzPVwicmVzdWx0LWdyb3VwXCI+XHJcbiAgICAgICAgPHNwYW4gY2xhc3M9XCJjb2xvci1yZWRcIj5cclxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwibW9ub1wiPkxlIHN5c3TDqG1lIGQnw6lxdWF0aW9ucyBsaW7DqWFpcmUgYSB1bmUgaW5maW5pdMOpIG91IGF1Y3VuZSBzb2x1dGlvbiAhPC9zcGFuPlxyXG4gICAgICA8L2Rpdj5cclxuICAgICAgYDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNvbnZlcnQoZGltOiBudW1iZXIsIGNvbXBvbmVudHM6IG51bWJlcltdKSB7XHJcbiAgICBsZXQgcm93cyA9IFtdO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb21wb25lbnRzLmxlbmd0aCAvIGRpbTsgaSsrKSB7XHJcbiAgICAgICAgbGV0IHJvdyA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgZGltOyBqKyspIHtcclxuICAgICAgICAgICAgcm93LnB1c2goY29tcG9uZW50c1tpICogZGltICsgal0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByb3dzLnB1c2gocm93KTtcclxuICAgIH1cclxuICAgIHJldHVybiByb3dzO1xyXG59XHJcblxyXG5mdW5jdGlvbiBvbkNoYW5nZU1hdHJpeEEoKSB7XHJcbiAgICBtYXRyaXhBID0gbnVsbDtcclxuICAgIHJlYWRGaWxlKGVySnNvbi5maWxlc1swXSkudGhlbihmdW5jdGlvbiAoanNvbjogYW55KSB7XHJcbiAgICAgICAgY29uc3QgZGltID0ganNvblsnbiddO1xyXG4gICAgICAgIG1hdHJpeEEgPSBuZXcgTWF0cml4KGNvbnZlcnQoZGltLCBqc29uW1wiQVwiXSkpO1xyXG4gICAgICAgIG1hdHJpeEIgPSBuZXcgTWF0cml4KGNvbnZlcnQoMSwganNvbltcIkJcIl0pKTtcclxuICAgICAgICBmaW5kU29sdXRpb25zKCk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuZXJKc29uLmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgb25DaGFuZ2VNYXRyaXhBKTtcclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9
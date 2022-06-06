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
        if (this._m != matrix.m) {
            throw "The matrices should have the same number of rows";
        }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQU4yMDIyX0xhYm8zX1N5c0xpbkVxLmpzIiwibWFwcGluZ3MiOiI7Ozs7O0FBQUE7Ozs7Ozs7R0FPRztBQUVIOztHQUVHO0FBQ0g7SUFLSSxnQkFBWSxVQUFzQixFQUFFLFdBQXFCO1FBQ3JELHdDQUF3QztRQUN4QyxJQUFJLFVBQVUsQ0FBQyxNQUFNLElBQUksQ0FBQztZQUN0QixNQUFNLCtCQUErQixDQUFDO1FBRTFDLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDO1FBQ2QsSUFBSSxDQUFDLEVBQUUsR0FBRyxVQUFVLENBQUMsTUFBTSxDQUFDO1FBQzVCLElBQUksQ0FBQyxFQUFFLEdBQUcsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQztRQUMvQixJQUFJLENBQUMsV0FBVyxHQUFHLFVBQVUsQ0FBQztRQUM5QixJQUFJLENBQUMsWUFBWSxHQUFHLFdBQVcsYUFBWCxXQUFXLGNBQVgsV0FBVyxHQUFJLEtBQUssQ0FBQztJQUM3QyxDQUFDO0lBT0Qsc0JBQUkscUJBQUM7UUFITDs7V0FFRzthQUNIO1lBQ0ksT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDO1FBQ25CLENBQUM7OztPQUFBO0lBT0Qsc0JBQUkscUJBQUM7UUFITDs7V0FFRzthQUNIO1lBQ0ksT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDO1FBQ25CLENBQUM7OztPQUFBO0lBT0Qsc0JBQUksdUJBQUc7UUFIUDs7V0FFRzthQUNIO1lBQ0ksT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQ3JCLENBQUM7OztPQUFBO0lBT0Qsc0JBQUksOEJBQVU7UUFIZDs7V0FFRzthQUNIO1lBQ0ksT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDO1FBQzVCLENBQUM7OztPQUFBO0lBT0Qsc0JBQUksK0JBQVc7UUFIZjs7V0FFRzthQUNIO1lBQ0ksT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDO1FBQzdCLENBQUM7OztPQUFBO0lBRUQsdUJBQXVCO0lBRXZCOztPQUVHO0lBQ0ksb0JBQUcsR0FBVixVQUFXLE1BQWM7UUFDckIsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3BDLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNJLDBCQUFTLEdBQWhCLFVBQWlCLE1BQWMsRUFBRSxNQUFjO1FBQzNDLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUM1QyxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNJLDRCQUFXLEdBQWxCLFVBQW1CLE1BQWMsRUFBRSxLQUFhO1FBQzVDLHNDQUFzQztRQUN0QyxLQUFLLElBQUksSUFBSSxHQUFHLENBQUMsRUFBRSxJQUFJLEdBQUcsSUFBSSxDQUFDLEVBQUUsRUFBRSxJQUFJLEVBQUUsRUFBRTtZQUN2QyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssQ0FBQztTQUMzQztJQUNMLENBQUM7SUFFRDs7O09BR0c7SUFDSSx3QkFBTyxHQUFkLFVBQWUsTUFBYztRQUV6QixvQ0FBb0M7UUFDcEMsSUFBSSxJQUFJLENBQUMsRUFBRSxJQUFJLE1BQU0sQ0FBQyxDQUFDLEVBQUU7WUFDckIsTUFBTSxrREFBa0QsQ0FBQztTQUM1RDtRQUVELEtBQUssSUFBSSxNQUFNLEdBQUcsQ0FBQyxFQUFFLE1BQU0sR0FBRyxJQUFJLENBQUMsRUFBRSxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBQzdDLEtBQUssSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLEVBQUUsRUFBRSxNQUFNLEdBQUcsSUFBSSxDQUFDLEVBQUUsR0FBRyxNQUFNLENBQUMsQ0FBQyxFQUFFLE1BQU0sRUFBRSxFQUFFO2dCQUM5RCxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLE1BQU0sR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7YUFDakY7U0FDSjtRQUVELElBQUksQ0FBQyxFQUFFLElBQUksTUFBTSxDQUFDLENBQUMsQ0FBQztRQUNwQixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztJQUM3QixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNJLDJCQUFVLEdBQWpCLFVBQWtCLElBQVksRUFBRSxJQUFZO1FBQ3hDLGtCQUFrQjtRQUNsQixJQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNoRCxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxHQUFHLE9BQU8sQ0FBQztJQUNyQyxDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksc0NBQXFCLEdBQTVCO1FBQ0ksSUFBSSxZQUFZLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDdEIsSUFBSSxZQUFZLEdBQUcsQ0FBQyxDQUFDO1FBRXJCLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDO1FBRWQsSUFBTSxXQUFXLEdBQUcsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDO1FBRWhFLEtBQUssSUFBSSxJQUFJLEdBQUcsQ0FBQyxFQUFFLElBQUksR0FBRyxXQUFXLEVBQUUsSUFBSSxFQUFFLEVBQUU7WUFDM0MsSUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLEVBQUUsWUFBWSxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBRS9ELDRCQUE0QjtZQUM1QixJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7WUFFL0MsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRTtnQkFFeEMsMENBQTBDO2dCQUMxQyxJQUFJLFlBQVksR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLEVBQUU7b0JBQzFCLFlBQVksRUFBRSxDQUFDO2dCQUVuQixxRUFBcUU7Z0JBQ3JFLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxFQUFFLEdBQUcsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBRXJFLElBQUksU0FBUyxJQUFJLFlBQVksRUFBRTtvQkFDM0IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLEVBQUUsWUFBWSxDQUFDLENBQUM7b0JBQ3pDLFlBQVksRUFBRSxDQUFDO2lCQUNsQjtnQkFFRCwyQkFBMkI7Z0JBQzNCLEtBQUssSUFBSSxJQUFJLEdBQUcsQ0FBQyxFQUFFLElBQUksR0FBRyxJQUFJLENBQUMsRUFBRSxFQUFFLElBQUksRUFBRSxFQUFFO29CQUN2QyxJQUFJLElBQUksSUFBSSxZQUFZLEVBQUU7d0JBQ3RCLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO3FCQUNqRjtpQkFDSjthQUNKO1NBQ0o7UUFFRCxrQ0FBa0M7UUFDbEMsSUFBSSxDQUFDLElBQUksSUFBSSxVQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUksWUFBWSxFQUFDO0lBQ3RDLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNJLHNDQUFxQixHQUE1QixVQUE2QixRQUFnQixFQUFFLEtBQWEsRUFBRSxNQUFjO1FBQ3hFLEtBQUssSUFBSSxJQUFJLEdBQUcsQ0FBQyxFQUFFLElBQUksR0FBRyxJQUFJLENBQUMsRUFBRSxFQUFFLElBQUksRUFBRSxFQUFFO1lBQ3ZDLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxLQUFLLENBQUM7U0FDOUU7SUFDTCxDQUFDO0lBRUQ7Ozs7OztPQU1HO0lBQ0ksZ0NBQWUsR0FBdEIsVUFBdUIsTUFBYyxFQUFFLFdBQW1CO1FBQ3RELElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBQy9ELElBQUksUUFBUSxHQUFHLFdBQVcsQ0FBQztRQUUzQixzREFBc0Q7UUFDdEQsS0FBSyxJQUFJLElBQUksR0FBRyxXQUFXLEdBQUcsQ0FBQyxFQUFFLElBQUksR0FBRyxJQUFJLENBQUMsRUFBRSxFQUFFLElBQUksRUFBRSxFQUFFO1lBQ3JELElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsUUFBUSxFQUFFO2dCQUNyRCxRQUFRLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7Z0JBQ3BELFFBQVEsR0FBRyxJQUFJLENBQUM7YUFDbkI7U0FDSjtRQUNELE9BQU8sUUFBUSxDQUFDO0lBQ3BCLENBQUM7SUFDTCxhQUFDO0FBQUQsQ0FBQzs7OztBQ3ZORDs7Ozs7OztHQU9HO0FBSUg7O0dBRUc7QUFDSDtJQUlJLCtCQUFZLENBQVMsRUFBRSxDQUFTO1FBQzVCLElBQUksQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ1osSUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDaEIsQ0FBQztJQUVEOzs7T0FHRztJQUNJLHlDQUFTLEdBQWhCO1FBQ0ksSUFBTSxTQUFTLEdBQWEsRUFBRSxDQUFDO1FBRS9CLElBQUksQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUN6QixJQUFJLENBQUMsRUFBRSxDQUFDLHFCQUFxQixFQUFFLENBQUM7UUFFaEMsSUFBSSxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLEVBQUU7WUFDbEIsc0RBQXNEO1lBQ3RELEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDaEMsU0FBUyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2FBQ3ZEO1NBQ0o7UUFFRCxPQUFPLFNBQVMsQ0FBQztJQUNyQixDQUFDO0lBQ0wsNEJBQUM7QUFBRCxDQUFDOzs7O0FDMUNEOzs7Ozs7O0dBT0c7QUFFcUM7QUFDOEI7QUFFdEUsSUFBTSxNQUFNLEdBQXFCLFFBQVEsQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDcEUsSUFBTSxRQUFRLEdBQXFCLFFBQVEsQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFDLENBQUM7QUFFeEUsSUFBSSxPQUFPLEdBQVcsSUFBSSxDQUFDO0FBQzNCLElBQUksT0FBTyxHQUFXLElBQUksQ0FBQztBQUUzQixTQUFTLFFBQVEsQ0FBQyxJQUFTO0lBQ3ZCLE9BQU8sSUFBSSxPQUFPLENBQUMsVUFBVSxPQUFPO1FBQ2hDLElBQU0sTUFBTSxHQUFHLElBQUksVUFBVSxFQUFFLENBQUM7UUFDaEMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN4QixNQUFNLENBQUMsTUFBTSxHQUFHO1lBQ1osT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDbEQsQ0FBQyxDQUFDO0lBQ04sQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDO0FBRUQsU0FBUyxhQUFhO0lBQ2xCLElBQUksT0FBTyxJQUFJLE9BQU8sRUFBRTtRQUVwQixJQUFNLEtBQUssR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBRW5DLElBQUksUUFBUSxHQUFHLElBQUkscUJBQXFCLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQzNELElBQUksU0FBUyxHQUFhLFFBQVEsQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUUvQyxJQUFJLE9BQU8sR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxHQUFHLEtBQUssQ0FBQztRQUUzQyw4QkFBOEI7UUFDOUIsSUFBSSxTQUFTLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUN0QixJQUFJLE9BQU8sR0FBRyxTQUFTO2lCQUNsQixHQUFHLENBQ0EsVUFBQyxTQUFTLEVBQUUsS0FBSyxJQUFLLHdEQUFzQyxLQUFLLDJCQUFZLFNBQVMsU0FBTSxFQUF0RSxDQUFzRSxDQUMvRjtpQkFDQSxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7WUFFZCxRQUFRLENBQUMsU0FBUyxHQUFHLGdJQUdGLFNBQVMsQ0FBQyxNQUFNLGlEQUFrQyxPQUFPLEdBQUcsSUFBSSw0REFFNUUsU0FBUyxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSw4RkFFMUMsT0FBTywrQ0FHWixDQUFDO1NBQ0M7YUFBTTtZQUNILFFBQVEsQ0FBQyxTQUFTLEdBQUcsK05BSzFCLENBQUM7U0FDQztLQUNKO0FBQ0wsQ0FBQztBQUVELFNBQVMsT0FBTyxDQUFDLEdBQVcsRUFBRSxVQUFvQjtJQUM5QyxJQUFJLElBQUksR0FBRyxFQUFFLENBQUM7SUFDZCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsVUFBVSxDQUFDLE1BQU0sR0FBRyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDOUMsSUFBSSxHQUFHLEdBQUcsRUFBRSxDQUFDO1FBQ2IsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUMxQixHQUFHLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDckM7UUFDRCxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0tBQ2xCO0lBQ0QsT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQztBQUVELFNBQVMsZUFBZTtJQUNwQixPQUFPLEdBQUcsSUFBSSxDQUFDO0lBQ2YsUUFBUSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxJQUFTO1FBQzlDLElBQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN0QixPQUFPLEdBQUcsSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzlDLE9BQU8sR0FBRyxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDNUMsYUFBYSxFQUFFLENBQUM7SUFDcEIsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDO0FBRUQsTUFBTSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxlQUFlLENBQUMsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL21hdGhfc3BlLy4vc3JjL2NsYXNzZXMvTWF0cml4LnRzIiwid2VicGFjazovL21hdGhfc3BlLy4vc3JjL2NsYXNzZXMvTGluZWFyRXF1YXRpb25zU3lzdGVtLnRzIiwid2VicGFjazovL21hdGhfc3BlLy4vc3JjL0FOMjAyMl9MYWJvM19TeXNMaW5FcS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogTGFibzogMyAoTGluZWFyIHN5c3RlbXMpXHJcbiAqIEF1dGhvcnM6IE93ZW4gR29tYmFzLCBEYXZpZCBEYXJtYW5nZXIsIEp1bGllbiBWYXVjaGVyLCBDbMOpbWVudCBQZXRpZ25hdFxyXG4gKiBUZWFtOiAyXHJcbiAqIFNjaG9vbDogSEUtQXJjXHJcbiAqIERhdGU6IDYgbWFpIDIwMjJcclxuICogQ291cnNlOiBNYXRow6ltYXRpcXVlcyBzcMOpY2lmaXF1ZXMgKE1vZHVsZSAyMjM0KSAtIE0uIFN0w6lwaGFuZSBHb2Jyb25cclxuICovXHJcblxyXG4vKipcclxuICogUmVwcmVzZW50IGEgbWF0cml4IHdpdGggYSAyZCBhcnJheSBvZiBpdHMgY29tcG9uZW50c1xyXG4gKi9cclxuZXhwb3J0IGNsYXNzIE1hdHJpeCB7XHJcbiAgICBjb25zdHJ1Y3Rvcihjb21wb25lbnRzOiBudW1iZXJbXVtdKTtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihjb21wb25lbnRzOiBudW1iZXJbXVtdLCBpc0F1Z21lbnRlZDogYm9vbGVhbik7XHJcblxyXG4gICAgY29uc3RydWN0b3IoY29tcG9uZW50czogbnVtYmVyW11bXSwgaXNBdWdtZW50ZWQ/OiBib29sZWFuKSB7XHJcbiAgICAgICAgLy8gUHJldmVudCBmcm9tIGNyZWF0aW5nIGFuIGVtcHR5IG1hdHJpeFxyXG4gICAgICAgIGlmIChjb21wb25lbnRzLmxlbmd0aCA9PSAwKVxyXG4gICAgICAgICAgICB0aHJvdyBcIkVycm9yIHdoaWxlIGNyZWF0aW5nIGEgbWF0cml4XCI7XHJcblxyXG4gICAgICAgIHRoaXMuX2RldCA9IDA7XHJcbiAgICAgICAgdGhpcy5fbSA9IGNvbXBvbmVudHMubGVuZ3RoO1xyXG4gICAgICAgIHRoaXMuX24gPSBjb21wb25lbnRzWzBdLmxlbmd0aDtcclxuICAgICAgICB0aGlzLl9jb21wb25lbnRzID0gY29tcG9uZW50cztcclxuICAgICAgICB0aGlzLl9pc0F1Z21lbnRlZCA9IGlzQXVnbWVudGVkID8/IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcmVhZG9ubHkgX206IG51bWJlcjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybiB0aGUgbnVtYmVyIG9mIHJvd3Mgb2YgdGhlIG1hdHJpeFxyXG4gICAgICovXHJcbiAgICBnZXQgbSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9uOiBudW1iZXI7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm4gdGhlIG51bWJlciBvZiBjb2x1bW5zIG9mIHRoZSBtYXRyaXhcclxuICAgICAqL1xyXG4gICAgZ2V0IG4oKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX247XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfZGV0OiBudW1iZXI7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm4gdGhlIGRldGVybWluYW50IG9mIHRoZSBtYXRyaXhcclxuICAgICAqL1xyXG4gICAgZ2V0IGRldCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZGV0O1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcmVhZG9ubHkgX2NvbXBvbmVudHM6IG51bWJlcltdW107XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm4gdGhlIDJkIGFycmF5IHdobydzIHJlcHJlc2VudGluZyB0aGUgbWF0cml4XHJcbiAgICAgKi9cclxuICAgIGdldCBjb21wb25lbnRzKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jb21wb25lbnRzO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX2lzQXVnbWVudGVkOiBib29sZWFuO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJuIGlmIHRoaXMgbWF0cml4IGlzIGF1Z21lbnRlZCBvciBub3RcclxuICAgICAqL1xyXG4gICAgZ2V0IGlzQXVnbWVudGVkKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9pc0F1Z21lbnRlZDtcclxuICAgIH1cclxuXHJcbiAgICAvKioqIE90aGVyIG1ldGhvZHMgKioqL1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJuIGEgcm93IGJhc2VkIG9uIGl0cyBudW1iZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIHJvdyhyb3dOdW06IG51bWJlcik6IG51bWJlcltdIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY29tcG9uZW50c1tyb3dOdW1dO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJuIGEgY29tcG9uZW50IG9mIHRoZSBtYXRyaXggYmFzZWQgb24gaXRzIHJvdyBhbmQgY29sdW1uXHJcbiAgICAgKiBAcGFyYW0gcm93SWR4IFRoZSBpbmRleCBvZiB0aGUgcm93IHdoZXJlIHRoZSBjb21wb25lbnQgaXNcclxuICAgICAqIEBwYXJhbSBjb2xJZHggVGhlIGluZGV4IG9mIHRoZSBjb2x1bW4gd2hlcmUgdGhlIGNvbXBvbmVudCBpc1xyXG4gICAgICogQHJldHVybnMgVGhlIGNvbXBvbmVudCBpbiB0aGUgZ2l2ZW4gcG9zaXRpb25cclxuICAgICAqL1xyXG4gICAgcHVibGljIGNvbXBvbmVudChyb3dJZHg6IG51bWJlciwgY29sSWR4OiBudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jb21wb25lbnRzW3Jvd0lkeF1bY29sSWR4XTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIE11bHRpcGx5IGEgcm93IG9mIHRoaXMgbWF0cml4IGJ5IGEgc2NhbGFyXHJcbiAgICAgKiBAcGFyYW0gcm93SWR4IFRoZSBudW1iZXIgb2YgdGhlIHJvdyB0byBtdWx0aXBseVxyXG4gICAgICogQHBhcmFtIG11bHRpIFRoZSBzY2FsYXIgdG8gdXNlIGFzIGEgbXVsdGlwbGllclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgbXVsdGlwbHlSb3cocm93SWR4OiBudW1iZXIsIG11bHRpOiBudW1iZXIpIHtcclxuICAgICAgICAvLyBNdWx0aXBseSBldmVyeSBjb21wb25lbnQgb2YgdGhlIHJvd1xyXG4gICAgICAgIGZvciAobGV0IGNvbE4gPSAwOyBjb2xOIDwgdGhpcy5fbjsgY29sTisrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2NvbXBvbmVudHNbcm93SWR4XVtjb2xOXSAqPSBtdWx0aTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBdWdtZW50IHRoaXMgbWF0cml4IHdpdGggYW5vdGhlciBvbmVcclxuICAgICAqIEBwYXJhbSBtYXRyaXggVGhlIHNlY29uZCBtYXRyaXhcclxuICAgICAqL1xyXG4gICAgcHVibGljIGF1Z21lbnQobWF0cml4OiBNYXRyaXgpIHtcclxuXHJcbiAgICAgICAgLy8gQXNzdXJlIHRoZSBtYXRyaXggY2FuIGJlIGFwcGVuZGVkXHJcbiAgICAgICAgaWYgKHRoaXMuX20gIT0gbWF0cml4Lm0pIHtcclxuICAgICAgICAgICAgdGhyb3cgXCJUaGUgbWF0cmljZXMgc2hvdWxkIGhhdmUgdGhlIHNhbWUgbnVtYmVyIG9mIHJvd3NcIjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZvciAobGV0IHJvd0lkeCA9IDA7IHJvd0lkeCA8IHRoaXMuX207IHJvd0lkeCsrKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGNvbElkeCA9IHRoaXMuX207IGNvbElkeCA8IHRoaXMuX20gKyBtYXRyaXgubTsgY29sSWR4KyspIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2NvbXBvbmVudHNbcm93SWR4XVtjb2xJZHhdID0gbWF0cml4LmNvbXBvbmVudChyb3dJZHgsIGNvbElkeCAtIHRoaXMuX20pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9uICs9IG1hdHJpeC5uO1xyXG4gICAgICAgIHRoaXMuX2lzQXVnbWVudGVkID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFN3aXRjaCB0d28gcm93cyBvZiB0aGlzIG1hdHJpeFxyXG4gICAgICogQHBhcmFtIHJvdzEgVGhlIG51bWJlciBvZiB0aGUgZmlyc3Qgcm93IHRvIHN3aXRjaFxyXG4gICAgICogQHBhcmFtIHJvdzIgVGhlIG51bWJlciBvZiB0aGUgc2Vjb25kIHJvdyB0byBzd2l0Y2hcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN3aXRjaFJvd3Mocm93MTogbnVtYmVyLCByb3cyOiBudW1iZXIpIHtcclxuICAgICAgICAvLyBTd2l0Y2ggdGhlIHJvd3NcclxuICAgICAgICBjb25zdCB0ZW1wUm93ID0gdGhpcy5fY29tcG9uZW50c1tyb3cxXTtcclxuICAgICAgICB0aGlzLl9jb21wb25lbnRzW3JvdzFdID0gdGhpcy5fY29tcG9uZW50c1tyb3cyXTtcclxuICAgICAgICB0aGlzLl9jb21wb25lbnRzW3JvdzJdID0gdGVtcFJvdztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEZpbmQgdGhlIHJlZHVjZWQgcm93IGVjaGVsb24gZm9ybSBvZiB0aGlzIG1hdHJpeCBhbmRcclxuICAgICAqIGNhbGN1bGF0ZSB0aGUgZGV0ZXJtaW5hbnQgYXQgdGhlIHNhbWUgdGltZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcmVkdWNlZFJvd0VjaGVsb25Gb3JtKCkge1xyXG4gICAgICAgIGxldCBjdXJyZW50UGl2b3QgPSAtMTtcclxuICAgICAgICBsZXQgc3dpdGNoTnVtYmVyID0gMDtcclxuXHJcbiAgICAgICAgdGhpcy5fZGV0ID0gMTtcclxuXHJcbiAgICAgICAgY29uc3QgTEFTVF9DT0xVTU4gPSAodGhpcy5faXNBdWdtZW50ZWQpID8gdGhpcy5fbiAtIDEgOiB0aGlzLl9uO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBjb2xOID0gMDsgY29sTiA8IExBU1RfQ09MVU1OOyBjb2xOKyspIHtcclxuICAgICAgICAgICAgY29uc3QgY29sTWF4Um93ID0gdGhpcy5jb2x1bW5BYnNNYXhSb3coY29sTiwgY3VycmVudFBpdm90ICsgMSk7XHJcblxyXG4gICAgICAgICAgICAvLyBDYWxjdWxhdGUgdGhlIGRldGVybWluYW50XHJcbiAgICAgICAgICAgIHRoaXMuX2RldCAqPSB0aGlzLl9jb21wb25lbnRzW2NvbE1heFJvd11bY29sTl07XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5fY29tcG9uZW50c1tjb2xNYXhSb3ddW2NvbE5dICE9IDApIHtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBLZWVwIHRoZSBwaXZvdCBiZWxvdyB0aGUgbnVtYmVyIG9mIHJvd3NcclxuICAgICAgICAgICAgICAgIGlmIChjdXJyZW50UGl2b3QgKyAxIDwgdGhpcy5fbSlcclxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50UGl2b3QrKztcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBOb3JtYWxpemUgdGhlIHJvdyBvZiB0aGUgY3VycmVudCBjb2x1bW4gd2l0aCB0aGUgYmlnZ2VzdCBjb21wb25lbnRcclxuICAgICAgICAgICAgICAgIHRoaXMubXVsdGlwbHlSb3coY29sTWF4Um93LCAxLjAgLyB0aGlzLl9jb21wb25lbnRzW2NvbE1heFJvd11bY29sTl0pO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChjb2xNYXhSb3cgIT0gY3VycmVudFBpdm90KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zd2l0Y2hSb3dzKGNvbE1heFJvdywgY3VycmVudFBpdm90KTtcclxuICAgICAgICAgICAgICAgICAgICBzd2l0Y2hOdW1iZXIrKztcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvLyBOb3JtYWxpemUgdGhlIG90aGVyIHJvd3NcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IHJvd04gPSAwOyByb3dOIDwgdGhpcy5fbTsgcm93TisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJvd04gIT0gY3VycmVudFBpdm90KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkTXVsdGlwbGllZFJvd1RvUm93KGN1cnJlbnRQaXZvdCwgLXRoaXMuX2NvbXBvbmVudHNbcm93Tl1bY29sTl0sIHJvd04pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gRml4IHRoZSBzaWduIG9mIHRoZSBkZXRlcm1pbmFudFxyXG4gICAgICAgIHRoaXMuX2RldCAqPSAoLTEpICoqIHN3aXRjaE51bWJlcjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkZCBhIG11bHRpcGxpZWQgcm93IG9mIHRoaXMgbWF0cml4IHRvIGFub3RoZXIgcm93XHJcbiAgICAgKiBAcGFyYW0gbXVsdGlSb3cgVGhlIG51bWJlciBvZiB0aGUgcm93IHRvIG11bHRpcGx5XHJcbiAgICAgKiBAcGFyYW0gbXVsdGkgVGhlIHNjYWxhciB0byB1c2UgYXMgYSBtdWx0aXBsaWVyXHJcbiAgICAgKiBAcGFyYW0gYWRkUm93IFRoZSByb3cgdG8gYWRkIHRoZSBtdWx0aXBsaWVkIHJvdyB0b1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYWRkTXVsdGlwbGllZFJvd1RvUm93KG11bHRpUm93OiBudW1iZXIsIG11bHRpOiBudW1iZXIsIGFkZFJvdzogbnVtYmVyKSB7XHJcbiAgICAgICAgZm9yIChsZXQgY29sTiA9IDA7IGNvbE4gPCB0aGlzLl9uOyBjb2xOKyspIHtcclxuICAgICAgICAgICAgdGhpcy5fY29tcG9uZW50c1thZGRSb3ddW2NvbE5dICs9IHRoaXMuX2NvbXBvbmVudHNbbXVsdGlSb3ddW2NvbE5dICogbXVsdGk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJuIHRoZSBpbmRleCBvZiB0aGUgcm93IGNvbnRhaW5pbmcgdGhlIGFic29sdXRlXHJcbiAgICAgKiBtYXggdmFsdWUgb2YgYSBnaXZlbiBjb2x1bW4gaW4gdGhpcyBtYXRyaXhcclxuICAgICAqIEBwYXJhbSBjb2xJZHggVGhlIGluZGV4IG9mIHRoZSBjb2x1bW4gdG8gc2VhcmNoIGluXHJcbiAgICAgKiBAcGFyYW0gc3RhcnRSb3dJZHggRnJvbSB3aGljaCByb3cgaW5kZXggdG8gc2VhcmNoXHJcbiAgICAgKiBAcmV0dXJucyBUaGUgaW5kZXggb2YgdGhlIHJvdyBjb250YWluaW5nIHRoZSBhYnNvbHV0ZSBtYXggdmFsdWUgb2YgdGhlIGNvbHVtblxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgY29sdW1uQWJzTWF4Um93KGNvbElkeDogbnVtYmVyLCBzdGFydFJvd0lkeDogbnVtYmVyKSB7XHJcbiAgICAgICAgbGV0IG1heFZhbHVlID0gTWF0aC5hYnModGhpcy5fY29tcG9uZW50c1tzdGFydFJvd0lkeF1bY29sSWR4XSk7XHJcbiAgICAgICAgbGV0IG1heEluZGV4ID0gc3RhcnRSb3dJZHg7XHJcblxyXG4gICAgICAgIC8vIEZpbmQgdGhlIHJvdyBpbmRleCB3aXRoIHRoZSBtYXggaW4gdGhlIGdpdmVuIGNvbHVtblxyXG4gICAgICAgIGZvciAobGV0IHJvd04gPSBzdGFydFJvd0lkeCArIDE7IHJvd04gPCB0aGlzLl9tOyByb3dOKyspIHtcclxuICAgICAgICAgICAgaWYgKE1hdGguYWJzKHRoaXMuX2NvbXBvbmVudHNbcm93Tl1bY29sSWR4XSkgPiBtYXhWYWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgbWF4VmFsdWUgPSBNYXRoLmFicyh0aGlzLl9jb21wb25lbnRzW3Jvd05dW2NvbElkeF0pO1xyXG4gICAgICAgICAgICAgICAgbWF4SW5kZXggPSByb3dOO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBtYXhJbmRleDtcclxuICAgIH1cclxufVxyXG4iLCIvKipcbiAqIExhYm86IDMgKExpbmVhciBzeXN0ZW1zKVxuICogQXV0aG9yczogT3dlbiBHb21iYXMsIERhdmlkIERhcm1hbmdlciwgSnVsaWVuIFZhdWNoZXIsIENsw6ltZW50IFBldGlnbmF0XG4gKiBUZWFtOiAyXG4gKiBTY2hvb2w6IEhFLUFyY1xuICogRGF0ZTogNiBtYWkgMjAyMlxuICogQ291cnNlOiBNYXRow6ltYXRpcXVlcyBzcMOpY2lmaXF1ZXMgKE1vZHVsZSAyMjM0KSAtIE0uIFN0w6lwaGFuZSBHb2Jyb25cbiAqL1xuXG5pbXBvcnQge01hdHJpeH0gZnJvbSBcIi4vTWF0cml4XCI7XG5cbi8qKlxuICogUmVwcmVzZW50IGEgbGluZWFyIGVxdWF0aW9uIHN5c3RlbSBvZiB0aGUgZm9ybSBBKlggPSBCIHdpdGggbWF0cmljZXNcbiAqL1xuZXhwb3J0IGNsYXNzIExpbmVhckVxdWF0aW9uc1N5c3RlbSB7XG4gICAgcHJpdmF0ZSBfYTogTWF0cml4O1xuICAgIHByaXZhdGUgcmVhZG9ubHkgX2I6IE1hdHJpeDtcblxuICAgIGNvbnN0cnVjdG9yKGE6IE1hdHJpeCwgYjogTWF0cml4KSB7XG4gICAgICAgIHRoaXMuX2EgPSBhO1xuICAgICAgICB0aGlzLl9iID0gYjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm4gdGhlIHNvbHV0aW9ucyBvZiB0aGlzIGxpbmVhciBlcXVhdGlvbnMgc3lzdGVtXG4gICAgICogQHJldHVybnMgVGhlIHNvbHV0aW9ucyBvZiB0aGlzIGxpbmVhciBlcXVhdGlvbnMgc3lzdGVtXG4gICAgICovXG4gICAgcHVibGljIHNvbHV0aW9ucygpIHtcbiAgICAgICAgY29uc3Qgc29sdXRpb25zOiBudW1iZXJbXSA9IFtdO1xuXG4gICAgICAgIHRoaXMuX2EuYXVnbWVudCh0aGlzLl9iKTtcbiAgICAgICAgdGhpcy5fYS5yZWR1Y2VkUm93RWNoZWxvbkZvcm0oKTtcblxuICAgICAgICBpZiAodGhpcy5fYS5kZXQgIT0gMCkge1xuICAgICAgICAgICAgLy8gRmluZCB0aGUgc29sdXRpb24gaW4gdGhlIHJlZHVjZWQgcm93IGVjaGVsb24gbWF0cml4XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX2EubTsgaSsrKSB7XG4gICAgICAgICAgICAgICAgc29sdXRpb25zW2ldID0gdGhpcy5fYS5jb21wb25lbnRzW2ldW3RoaXMuX2EubiAtIDFdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHNvbHV0aW9ucztcbiAgICB9XG59XG4iLCIvKipcclxuICogTGFibzogMyAoTGluZWFyIHN5c3RlbXMpXHJcbiAqIEF1dGhvcnM6IE93ZW4gR29tYmFzLCBEYXZpZCBEYXJtYW5nZXIsIEp1bGllbiBWYXVjaGVyLCBDbMOpbWVudCBQZXRpZ25hdFxyXG4gKiBUZWFtOiAyXHJcbiAqIFNjaG9vbDogSEUtQXJjXHJcbiAqIERhdGU6IDYgbWFpIDIwMjJcclxuICogQ291cnNlOiBNYXRow6ltYXRpcXVlcyBzcMOpY2lmaXF1ZXMgKE1vZHVsZSAyMjM0KSAtIE0uIFN0w6lwaGFuZSBHb2Jyb25cclxuICovXHJcblxyXG5pbXBvcnQge01hdHJpeH0gZnJvbSBcIi4vY2xhc3Nlcy9NYXRyaXhcIjtcclxuaW1wb3J0IHtMaW5lYXJFcXVhdGlvbnNTeXN0ZW19IGZyb20gXCIuL2NsYXNzZXMvTGluZWFyRXF1YXRpb25zU3lzdGVtXCI7XHJcblxyXG5jb25zdCBlckpzb24gPSA8SFRNTElucHV0RWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImVyLWpzb25cIik7XHJcbmNvbnN0IGVyUmVzdWx0ID0gPEhUTUxJbnB1dEVsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJlci1yZXN1bHRcIik7XHJcblxyXG5sZXQgbWF0cml4QTogTWF0cml4ID0gbnVsbDtcclxubGV0IG1hdHJpeEI6IE1hdHJpeCA9IG51bGw7XHJcblxyXG5mdW5jdGlvbiByZWFkRmlsZShmaWxlOiBhbnkpIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSkge1xyXG4gICAgICAgIGNvbnN0IHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XHJcbiAgICAgICAgcmVhZGVyLnJlYWRBc1RleHQoZmlsZSk7XHJcbiAgICAgICAgcmVhZGVyLm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmVzb2x2ZShKU09OLnBhcnNlKHJlYWRlci5yZXN1bHQudG9TdHJpbmcoKSkpO1xyXG4gICAgICAgIH07XHJcbiAgICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gZmluZFNvbHV0aW9ucygpIHtcclxuICAgIGlmIChtYXRyaXhBICYmIG1hdHJpeEIpIHtcclxuXHJcbiAgICAgICAgY29uc3Qgc3RhcnQgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcclxuXHJcbiAgICAgICAgbGV0IGxpbkVxU3lzID0gbmV3IExpbmVhckVxdWF0aW9uc1N5c3RlbShtYXRyaXhBLCBtYXRyaXhCKTtcclxuICAgICAgICBsZXQgc29sdXRpb25zOiBudW1iZXJbXSA9IGxpbkVxU3lzLnNvbHV0aW9ucygpO1xyXG5cclxuICAgICAgICBsZXQgZWxhcHNlZCA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpIC0gc3RhcnQ7XHJcblxyXG4gICAgICAgIC8vIEFkZCB0aGUgcmVzdWx0cyBpbiB0aGUgSFRNTFxyXG4gICAgICAgIGlmIChzb2x1dGlvbnMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBsZXQgcmVzdWx0cyA9IHNvbHV0aW9uc1xyXG4gICAgICAgICAgICAgICAgLm1hcChcclxuICAgICAgICAgICAgICAgICAgICAoc29sdXRpb25zLCBpbmRleCkgPT4gYDxwIGNsYXNzPVwibW9ub1wiPnM8c3ViIGNsYXNzPVwibW9ub1wiPiR7aW5kZXh9PC9zdWI+IOKJiCAke3NvbHV0aW9uc308L3A+YFxyXG4gICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgLmpvaW4oXCJcIik7XHJcblxyXG4gICAgICAgICAgICBlclJlc3VsdC5pbm5lckhUTUwgPSBgXHJcbiAgICAgIDxkaXYgY2xhc3M9XCJyZXN1bHQtZ3JvdXAgY29sb3ItZ3JlZW5cIj5cclxuICAgICAgICA8c3BhbiBjbGFzcz1cImNvbG9yLWdyZXlcIj5cclxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwibW9ub1wiPiR7c29sdXRpb25zLmxlbmd0aH08L3NwYW4+IHNvbHV0aW9ucyB0cm91dsOpZXMgKGVuICR7ZWxhcHNlZCAvIDEwMDB9IHNlY29uZGVzKTpcclxuICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgPGRldGFpbHMgJHtzb2x1dGlvbnMubGVuZ3RoID4gMjAgPyBcIlwiIDogXCJvcGVuXCJ9PlxyXG4gICAgICAgICAgPHN1bW1hcnk+QWZmaWNoZXIvbWFzcXVlciB0b3V0ZXMgbGVzIHNvbHV0aW9uczwvc3VtbWFyeT5cclxuICAgICAgICAgICR7cmVzdWx0c31cclxuICAgICAgICA8L2RldGFpbHM+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgICBgO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGVyUmVzdWx0LmlubmVySFRNTCA9IGBcclxuICAgICAgPGRpdiBjbGFzcz1cInJlc3VsdC1ncm91cFwiPlxyXG4gICAgICAgIDxzcGFuIGNsYXNzPVwiY29sb3ItcmVkXCI+XHJcbiAgICAgICAgICA8c3BhbiBjbGFzcz1cIm1vbm9cIj5MZSBzeXN0w6htZSBkJ8OpcXVhdGlvbnMgbGluw6lhaXJlIGEgdW5lIGluZmluaXTDqSBvdSBhdWN1bmUgc29sdXRpb24gITwvc3Bhbj5cclxuICAgICAgPC9kaXY+XHJcbiAgICAgIGA7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBjb252ZXJ0KGRpbTogbnVtYmVyLCBjb21wb25lbnRzOiBudW1iZXJbXSkge1xyXG4gICAgbGV0IHJvd3MgPSBbXTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY29tcG9uZW50cy5sZW5ndGggLyBkaW07IGkrKykge1xyXG4gICAgICAgIGxldCByb3cgPSBbXTtcclxuICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGRpbTsgaisrKSB7XHJcbiAgICAgICAgICAgIHJvdy5wdXNoKGNvbXBvbmVudHNbaSAqIGRpbSArIGpdKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcm93cy5wdXNoKHJvdyk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcm93cztcclxufVxyXG5cclxuZnVuY3Rpb24gb25DaGFuZ2VNYXRyaXhBKCkge1xyXG4gICAgbWF0cml4QSA9IG51bGw7XHJcbiAgICByZWFkRmlsZShlckpzb24uZmlsZXNbMF0pLnRoZW4oZnVuY3Rpb24gKGpzb246IGFueSkge1xyXG4gICAgICAgIGNvbnN0IGRpbSA9IGpzb25bJ24nXTtcclxuICAgICAgICBtYXRyaXhBID0gbmV3IE1hdHJpeChjb252ZXJ0KGRpbSwganNvbltcIkFcIl0pKTtcclxuICAgICAgICBtYXRyaXhCID0gbmV3IE1hdHJpeChjb252ZXJ0KDEsIGpzb25bXCJCXCJdKSk7XHJcbiAgICAgICAgZmluZFNvbHV0aW9ucygpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmVySnNvbi5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsIG9uQ2hhbmdlTWF0cml4QSk7XHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==
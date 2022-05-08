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
  private _m: number;
  private _n: number;
  private _components: number[][];
  private _isAugmented: boolean;

  /*********************/
  /*** Class methods ***/
  /*********************/

  /**
   * Return the sub matrix, which is the given
   * matrix without the column and row given
   * @param matrix The matrix to find the sub matrix of
   * @param remRowIdx The index of the row to remove
   * @param remColIdx The index of the column to remove
   */
  static subMatrix(matrix: Matrix, remRowIdx: number, remColIdx: number) {
    let subMatrix = new Array();
    
    // Add the rows to keep
    for(let rowIdx = 0; rowIdx < matrix.m; rowIdx++) {
      if(rowIdx != remRowIdx) {

        // Add the columns to keep
        let subMatrixRow = new Array();
        for(let colIdx = 0; colIdx < matrix.n; colIdx++) {
          if(colIdx != remColIdx) {
            subMatrixRow.push(matrix.component(rowIdx, colIdx));
          }
        }
        subMatrix.push(subMatrixRow);
      }
    }
    return new Matrix(subMatrix);
  }

  /**
   * Return the matrix resulting of switching two rows of a given matrix
   * @param matrix The matrix to switch the rows of
   * @param row1 The number of the first row to switch
   * @param row2 The number of the second row to switch
   * @returns The matrix with the switched rows
   */
  static switchRows(matrix: Matrix, row1: number, row2: number) {
    let cloneMatrix: Matrix = matrix.clone();
    let switchMatrix: number[][] = cloneMatrix.components;

    // Switch the rows
    let tempRow = switchMatrix[row1];
    switchMatrix[row1] = cloneMatrix.row(row2);
    switchMatrix[row2] = tempRow;

    return new Matrix(switchMatrix);
  }

  /**
   * Return the matrix resulting of the multiplication
   * of a row by scalar of a given matrix
   * @param matrix The matrix to multiply a row of
   * @param row The number of the row to multiply
   * @param multi The scalar to use as a multiplier
   * @returns The matrix with the multiplied row
   */
  static mulitplyRow(matrix: Matrix, row: number, multi: number) {
    let cloneMatrix: Matrix = matrix.clone();
    let multiMatrix: number[][] = cloneMatrix.components;

    // Multiply every component of the row
    for(let colN = 0; colN < cloneMatrix.n; colN++) {
      multiMatrix[row][colN] *= multi;
    }
    return new Matrix(multiMatrix);
  }

  /**
   * Return the matrix resulting of the addition
   * of a multiplied row to another row
   * @param matrix The matrix to add the multiplied row to another
   * @param multiRow The number of the row to multiply
   * @param multi The scalar to use as a multiplier
   * @param addRow The row to add the multiplied row to
   * @returns The matrix with the added multiplied row
   */
  static addMultipliedRowToRow(matrix: Matrix, multiRow: number,
                               multi: number, addRow: number) {
    let cloneMatrix: Matrix = matrix.clone();
    let addMatrix: number[][] = cloneMatrix.components;
    let multiMatrix: number[][] = this.mulitplyRow(cloneMatrix, multiRow, multi).components;

    // Add every component of the multiplied row to the matrix
    for(let colN = 0; colN < cloneMatrix.n; colN++) {
      addMatrix[addRow][colN] += multiMatrix[multiRow][colN];
    }
    return new Matrix(addMatrix);
  }

  /**
   * Return the index of the row containing the max value of a given column
   * @param matrix The matrix to find the row index of
   * @param col The index of the column to find the index of
   * @param startRow 
   */

  /**
   * Return the index of the row containing the absolute max value of a given column
   * @param matrix The matrix to find the row index in
   * @param colIdx The index of the column to search in
   * @param startRowIdx From which row index to search
   * @returns The index of the row containing the absolute max value of the column
   */
  static columnAbsMaxRow(matrix: Matrix, colIdx: number, startRowIdx: number) {
    
    let cloneMatrix: Matrix = matrix.clone();
    let maxValue = Math.abs(cloneMatrix.components[startRowIdx][colIdx]);
    let maxIndex = startRowIdx;

    // Find the row index with the max in the given column
    for(let rowN = startRowIdx + 1; rowN < cloneMatrix.m; rowN++) {
      if(Math.abs(cloneMatrix.components[rowN][colIdx]) > maxValue) {
        maxValue = Math.abs(cloneMatrix.components[rowN][colIdx]);
        maxIndex = rowN;
      }
    }
    return maxIndex;
  }

  /**
   * Return the augmented matrix two given matrices
   * @param matrixA The first matrix
   * @param matrixB The second matrix
   * @returns The augmented matrix made with the given matrices
   */
  static augment(matrixA: Matrix, matrixB: Matrix) {

    // Assure the matrix can be appended
    if(matrixA.m != matrixB.m)
      throw "The matrices should have the same number of rows";

    let components: number[][] = [];
    for(let row = 0; row < matrixA.m; row++) {
      components[row] = [];

      // Add the components of the first matrix
      for(let col = 0; col < matrixA.n; col++)
        components[row][col] = matrixA.component(row, col);

      // Add the components of the second matrix
      for(let col = matrixA.n; col < matrixA.n + matrixB.n; col++)
        components[row][col] = matrixB.component(row, col - matrixA.n);
    }
    return new Matrix(components, true);
  }

  /********************/
  /*** Constructors ***/
  /********************/

  constructor(components: number[][]);
  constructor(components: number[][], isAugmented: boolean);
  constructor(components: number[][], isAugmented?: boolean) {

    // Prevent from creating an empty matrix
    if(components.length == 0)
      throw "Error while creating a matrix";

    this._m = components.length;
    this._n = components[0].length;
    this._components = components;
    this._isAugmented = isAugmented ?? false;
  }

  /************************/
  /*** Instance methods ***/
  /************************/

  /*** Getters ***/

  /**
   * Return the number of rows of the matrix
   */
  get m() {
    return this._m;
  }

  /**
   * Return the number of columns of the matrix
   */
  get n() {
    return this._n;
  }

  /**
   * Return the 2d array who's representing the matrix
   */
  get components() {
    return this._components;
  }

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
   * Return the determinant of this matrix
   * @returns The determinant of this matrix
   */
  public det(n: number = this._m): number {
    
    // Prevent from trying to search the determinant of an unsquare matrix
    if(!this.isSquare())
      throw "The matrix should be square to calculate the determinant";

    let det = 0.0;

    // Handle the case of a 2x2 matrix
    if(n == 2) {
      return this.component(0, 0) * this.component(1, 1) - this.component(1, 0) * this.component(0, 1);
    }

    // Handle the case of a triangular matrix
    if(this.isTriangular()) {
      det = 1.0;
      for(let i = 0; i < this._m; i++) {
        det *= this._components[i][i];
      }
      return det;
    }

    // Calculate the determinant
    for(let i = 0; i < n; i++) {
      det += (-1.0)**i * this._components[0][i] * Matrix.subMatrix(this, 0, i).det(n - 1);
    }
    return det;
  }

  /**
   * Return the reduced row echelon form of this matrix
   * @returns The reduced row echelon form of this matrix
   */
  public reducedRowEchelonForm() {
    let cloneMatrix: Matrix = this.clone();
    let currentPivot = -1;

    const LAST_COLUMN = (this._isAugmented) ? cloneMatrix.n - 1 : cloneMatrix.n;

    for(let colN = 0; colN < LAST_COLUMN; colN++) {
      let colMaxRow = Matrix.columnAbsMaxRow(cloneMatrix, colN, currentPivot + 1);

      if(cloneMatrix.components[colMaxRow][colN] != 0) {

        // Keep the pivot below the number of rows
        if(currentPivot + 1 < cloneMatrix.m)
          currentPivot++;

        // Normalize the row of the current column with the biggest component
        cloneMatrix = Matrix.mulitplyRow(cloneMatrix, colMaxRow, 1.0 / cloneMatrix.components[colMaxRow][colN]);
        
        if(colMaxRow != currentPivot) {
          cloneMatrix = Matrix.switchRows(cloneMatrix, colMaxRow, currentPivot)
        }

        // Normalize the other rows
        for(let rowN = 0; rowN < cloneMatrix.m; rowN++) {
          if(rowN != currentPivot) {
            cloneMatrix = Matrix.addMultipliedRowToRow(cloneMatrix, currentPivot, -cloneMatrix.components[rowN][colN], rowN);
          }
        }
      }
    }
    return cloneMatrix;
  }

  /**
   * Return a new matrix copied on this one
   * @returns The new matrix
   */
  public clone(): Matrix {
    let copyComponents: number[][] = [];
    for(let i = 0; i < this._m; i++) {
      copyComponents[i] = [];
      Object.assign(copyComponents[i], this._components[i]);
    }
    return new Matrix(copyComponents);
  }

  /**
   * Return if this matrix has the same number of columns and rows
   * @returns If this matrix has the same number of columns and rows
   */
  public isSquare(): boolean {
    return this._m == this._n;
  }

  /**
   * Return if this matrix is triangular
   * @returns If this matrix is triangular
   */
  public isTriangular(): boolean {
    return this.isUpperTriangular() || this.isLowerTriangular();
  }

  /**
   * Return if this matrix is upper triangular
   * @returns If this matrix is upper triangular
   */
  public isUpperTriangular(): boolean {

    // The matrix must be square
    if(!this.isSquare())
      return false;

    for(let rowIdx = 1; rowIdx < this._m; rowIdx++) {
      for(let colIdx = 0; colIdx < rowIdx; colIdx++) {
        if(this._components[rowIdx][colIdx] != 0) {
          return false;
        }
      }
    }
    return true;
  }

  /**
   * Return if this matrix is lower triangular
   * @returns If this matrix is lower triangular
   */
  public isLowerTriangular(): boolean {

    // The matrix must be square
    if(!this.isSquare())
      return false;

    for(let rowIdx = 0; rowIdx < this._m; rowIdx++) {
      for(let colIdx = rowIdx + 1; colIdx < this._m; colIdx++) {
        if(this._components[rowIdx][colIdx] != 0) {
          return false;
        }
      }
    }
    return true;
  }
}
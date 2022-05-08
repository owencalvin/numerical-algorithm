/**
 * Labo: 3 (Linear systems)
 * Authors: Owen Gombas, David Darmanger, Julien Vaucher, Clément Petignat
 * Team: 2
 * School: HE-Arc
 * Date: 6 mai 2022
 * Course: Mathématiques spécifiques (Module 2234) - M. Stéphane Gobron
 */

import { Matrix } from "./Matrix";

/**
 * Represent a linear equation system of the form A*X = B with matrices
 */
export class LinearEquationsSystem {
  private _a: Matrix;
  private _b: Matrix;

  /********************/
  /*** Constructors ***/
  /********************/

  constructor(a: Matrix, b: Matrix) {
    this._a = a;
    this._b = b;
  }

  /************************/
  /*** Instance methods ***/
  /************************/

  /**
   * Return the solutions of this linear equations system
   * @returns The solutions of this linear equations system
   */
  public solutions() {
    let solutions: number[] = [];

    if(this._a.det() != 0.0) {
      let matrix = Matrix.augment(this._a, this._b);
      matrix = matrix.reducedRowEchelonForm();

      // Find the solution in the reduced row echelon matrix
      for(let i = 0; i < matrix.m; i++) {
        solutions[i] = matrix.components[i][matrix.n - 1];
      }
    }
    return solutions;
  }
}
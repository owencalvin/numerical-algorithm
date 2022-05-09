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

    this._a.augment(this._b);
    this._a.reducedRowEchelonForm();

    if(this._a.det != 0) {
      // Find the solution in the reduced row echelon matrix
      for(let i = 0; i < this._a.m; i++) {
        solutions[i] = this._a.components[i][this._a.n - 1];
      }
    }
    return solutions;
  }
}
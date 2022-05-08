/**
 * Labo: 3 (Linear systems)
 * Authors: Owen Gombas, David Darmanger, Julien Vaucher, Clément Petignat
 * Team: 2
 * School: HE-Arc
 * Date: 6 mai 2022
 * Course: Mathématiques spécifiques (Module 2234) - M. Stéphane Gobron
 */

import { Matrix } from "./classes/Matrix";
import { LinearEquationsSystem } from "./classes/LinearEquationsSystem";

const erMatrixA = <HTMLInputElement>document.getElementById("er-matrixa");
const erMatrixB = <HTMLInputElement>document.getElementById("er-matrixb");
const erResult = <HTMLInputElement>document.getElementById("er-result");

let matrixA: Matrix = null;
let matrixB: Matrix = null;

function readFile(file: any) {
  return new Promise(function(resolve) {
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = function() {
      resolve(JSON.parse(reader.result.toString()));
    }
  })
}

function findSolutions() {
  if(matrixA && matrixB) {
    let linEqSys = new LinearEquationsSystem(matrixA, matrixB);
    let solutions: number[] = linEqSys.solutions();

    // Add the results in the HTML
    if(solutions.length > 0) {
      let results = solutions
      .map(
          (solutions, index) => `<p class="mono">s<sub class="mono">${index}</sub> ≈ ${solutions}</p>`
      )
      .join("");

      erResult.innerHTML = `
      <div class="result-group color-green">
        <span class="color-grey">
          <span class="mono">${solutions.length}</span> solutions trouvées:
        </span>
        <details ${solutions.length > 20 ? "" : "open"}>
          <summary>Afficher/masquer toutes les solutions</summary>
          ${results}
        </details>
      </div>
      `;
    } else {
      erResult.innerHTML = `
      <div class="result-group">
        <span class="color-red">
          <span class="mono">Le système d'équations linéaire a une infinité ou aucune solution !</span>
      </div>
      `;
    }
  }
}

function onChangeMatrixA() {
  matrixA = null;
  readFile(erMatrixA.files[0]).then(function(json: any) {
    matrixA = new Matrix(json["components"]);
    findSolutions();
  });
}

function onChangeMatrixB() {
  matrixB = null;
  readFile(erMatrixB.files[0]).then(function(json: any) {
    matrixB = new Matrix(json["components"]);
    findSolutions();
  });
}

erMatrixA.addEventListener("change", onChangeMatrixA);
erMatrixB.addEventListener("change", onChangeMatrixB);

/**
 * Labo: 3 (Linear systems)
 * Authors: Owen Gombas, David Darmanger, Julien Vaucher, Clément Petignat
 * Team: 2
 * School: HE-Arc
 * Date: 6 mai 2022
 * Course: Mathématiques spécifiques (Module 2234) - M. Stéphane Gobron
 */

import {Matrix} from "./classes/Matrix";
import {LinearEquationsSystem} from "./classes/LinearEquationsSystem";

const erJson = <HTMLInputElement>document.getElementById("er-json");
const erResult = <HTMLInputElement>document.getElementById("er-result");

let matrixA: Matrix = null;
let matrixB: Matrix = null;

function readFile(file: any) {
    return new Promise(function (resolve) {
        const reader = new FileReader();
        reader.readAsText(file);
        reader.onload = function () {
            resolve(JSON.parse(reader.result.toString()));
        };
    });
}

function findSolutions() {
    if (matrixA && matrixB) {

        const start = new Date().getTime();

        let linEqSys = new LinearEquationsSystem(matrixA, matrixB);
        let solutions: number[] = linEqSys.solutions();

        let elapsed = new Date().getTime() - start;

        // Add the results in the HTML
        if (solutions.length > 0) {
            let results = solutions
                .map(
                    (solutions, index) => `<p class="mono">s<sub class="mono">${index}</sub> ≈ ${solutions}</p>`
                )
                .join("");

            erResult.innerHTML = `
      <div class="result-group color-green">
        <span class="color-grey">
          <span class="mono">${solutions.length}</span> solutions trouvées (en ${elapsed / 1000} secondes):
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

function convert(dim: number, components: number[]) {
    let rows = [];
    for (let i = 0; i < components.length / dim; i++) {
        let row = [];
        for (let j = 0; j < dim; j++) {
            row.push(components[i * dim + j]);
        }
        rows.push(row);
    }
    return rows;
}

function onChangeMatrixA() {
    matrixA = null;
    readFile(erJson.files[0]).then(function (json: any) {
        const dim = json['n'];
        matrixA = new Matrix(convert(dim, json["A"]));
        matrixB = new Matrix(convert(1, json["B"]));
        findSolutions();
    });
}

erJson.addEventListener("change", onChangeMatrixA);

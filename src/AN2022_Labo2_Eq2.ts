/**
 * Labo: 2 (Float to binary conversion)
 * Authors: Owen Gombas, David Darmanger, Julien Vaucher, Clément Petignat
 * Team: 2
 * School: HE-Arc
 * Date: 21 mars 2022
 * Course: Mathématiques spécifiques (Module 2234) - M. Stéphane Gobron
 */
import { Dichotomy } from "./classes/Dichotomy";

const erEquationElement = <HTMLInputElement>document.getElementById("er-equation");
const erAElement = <HTMLInputElement>document.getElementById("er-a");
const erBElement = <HTMLInputElement>document.getElementById("er-b");
const erStepElement = <HTMLInputElement>document.getElementById("er-step");
const erResultElement = document.getElementById("er-result");
const erPlotElement = document.getElementById("er-plot");

function removeGraph() {
  erPlotElement.style.display = 'none';
}

function displayGraph(a: number, b: number, roots: number[]) {
  erPlotElement.style.display = 'block';

  const annotations = roots.map((x, index) => ({
    x,
    text: `x${index} ≈ ${x}`
  }));

  const parameters = {
    target: '#er-plot',
    data: [{
      fn: erEquationElement.value.replace(/Math\./gi, "").replace(/\*\*/gi, "^")
    }],
    width: 800,
    height: 500,
    grid: false,
    yAxis: { domain: [-1, 1] },
    xAxis: { domain: [a, b] },
    annotations
  };

  // @ts-ignore
  functionPlot(parameters);
}

function onChangeEquation() {
  let result = "";

  if (
    erAElement.value === "" ||
    erBElement.value === "" ||
    erStepElement.value === ""
  ) {
    erResultElement.innerHTML = `<span class="color-grey">Veuillez renseigner tous les champs</span>`;
    removeGraph();
    return;
  }

  const erA = Number(erAElement.value);
  const erB = Number(erBElement.value);
  const erStep = Number(erStepElement.value);

  if (Number.isNaN(erA) || Number.isNaN(erB) || Number.isNaN(erStep)) {
    erResultElement.innerHTML = `<span class="color-grey">Les valeurs d'intervalle et de step doivent être des nombres</span>`;
    removeGraph();
    return;
  }

  if (erA >= erB) {
    erResultElement.innerHTML = `<span class="color-red">La première valeur de l'intervalle doit être plus grande que la deuxième</span>`;
    removeGraph();
    return;
  }

  const erEquation = (x: number) => eval(erEquationElement.value);
  let roots: number[];

  try {
    roots = Dichotomy.calculateAll(erA, erB, erStep, erEquation);
    result = roots
        .map(
            (x, index) => `<p class="mono">x<sub class="mono">${index}</sub> ≈ ${x}</p>`
        )
        .join("");
  } catch (err) {
    console.log(err);
    erResultElement.innerHTML = `<span class="color-red">Votre équation est invalide</span>`;
    removeGraph();
    return;
  }

  displayGraph(erA, erB, roots);

  erResultElement.innerHTML = `
    <div class="result-group">
      Résultats: ${result}
    </div>
  `;
}

erAElement.addEventListener("change", onChangeEquation);
erBElement.addEventListener("keyup", onChangeEquation);
erEquationElement.addEventListener("change", onChangeEquation);
erEquationElement.addEventListener("keyup", onChangeEquation);
erStepElement.addEventListener("change", onChangeEquation);
erStepElement.addEventListener("keyup", onChangeEquation);

onChangeEquation();

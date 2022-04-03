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
const erResultElement = document.getElementById("er-result");

function onChangeEquation() {
  if (
    erAElement.value === "" ||
    erBElement.value === ""
  ) {
    erResultElement.innerHTML = `<span class="color-grey">Veuillez renseigner tous les champs</span>`;
    return;
  }

  const erEquation = (x: number) => eval(erEquationElement.value);
  const erA = Number(erAElement.value);
  const erB = Number(erBElement.value);

  const result = Dichotomy.calculate(erA, erB, (x: number) => Math.sin(x) - x / 13);

  erResultElement.innerHTML = `
    <div class="result-group color-grey">
      Résultat ${result}
    </div>
  `;
}

erAElement.addEventListener("change", onChangeEquation);
erBElement.addEventListener("keyup", onChangeEquation);
erEquationElement.addEventListener("change", onChangeEquation);
erEquationElement.addEventListener("keyup", onChangeEquation);

onChangeEquation();

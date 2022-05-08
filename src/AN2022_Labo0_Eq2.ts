/**
 * Labo: 0 (Binary operations)
 * Authors: Owen Gombas, David Darmanger, Julien Vaucher, Clément Petignat
 * Team: 2
 * School: HE-Arc
 * Date: 21 mars 2022
 * Course: Mathématiques spécifiques (Module 2234) - M. Stéphane Gobron
 */

import { BinaryHelper } from "./classes/BinaryHelper";

const bh = new BinaryHelper();

const inputA = <HTMLInputElement>document.getElementById("input-a");
const inputB = <HTMLInputElement>document.getElementById("input-b");
const mode = <HTMLSelectElement>document.getElementById("mode");
const result = document.getElementById("result");
const regexBinary = /^[01]+$/;

function onChange() {
  let res = "";
  const a = inputA.value;
  const b = inputB.value;

  if (!a || !b) {
    result.innerHTML = `<span class="color-grey">Veuillez renseigner tous les champs</span>`;
    return;
  }

  if (!regexBinary.test(a) || !regexBinary.test(b)) {
    result.innerHTML = `<span class="color-grey">Vos entrées ne sont pas des nombres binaires</span>`;
    return;
  }

  switch (mode.value) {
    case "add": {
      res = bh.binaryAddition(a, b).reverse().join("");
      res = bh.clean(res);
      break;
    }
    case "mult": {
      res = bh.binaryMultiplication(a, b);
      res = bh.clean(res);
      break;
    }
    case "sub": {
      res = bh.binarySubstraction(a, b)[0];
      res = bh.clean(res);
      break;
    }
  }

  result.innerHTML = res ? `<span class="color-grey">Résultat: </span><span class="mono">${res.match(/.{1,4}/g).join(" ")} (${res.length} bits)<span/>` : "Résultat: ...";
}

inputA.addEventListener("change", onChange);
inputB.addEventListener("change", onChange);
inputA.addEventListener("keyup", onChange);
inputB.addEventListener("keyup", onChange);
mode.addEventListener("change", onChange);

onChange();

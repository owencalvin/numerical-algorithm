/**
 * Labo: 1 (Float to binary conversion)
 * Authors: Owen Gombas, David Darmanger, Julien Vaucher, Clément Petignat
 * Team: 2
 * School: HE-Arc
 * Date: 21 mars 2022
 * Course: Mathématiques spécifiques (Module 2234) - M. Stéphane Gobron
 */

import { BinaryFloat } from "./classes/BinaryFloat";

const bfBinaryNumberElement = <HTMLInputElement>document.getElementById("bf-binary-number");
const bfResultElement = document.getElementById("bf-result");
const regexBinary = /^[01\s]+$/;

function onChangeConverterBf() {
  const binaryNumber = bfBinaryNumberElement.value;
  
  if (bfBinaryNumberElement.value === "" ) {
    bfResultElement.innerHTML = `<span class="color-grey">Veuillez renseigner tous les champs</span>`;
    return;
  }

  if (!regexBinary.test(binaryNumber)) {
    bfResultElement.innerHTML = `<span class="color-red">Ce n'est pas un nombre binaire</span>`;
    return;
  }
  
  const bf = new BinaryFloat(binaryNumber);

  bfResultElement.innerHTML = `
    <div class="result-group">
      Taille en bits total: ${bf.bitsSize}
    </div>

    <div class="result-group">
      Taille en bits de l'exposant: ${bf.exponentBitsSize}
    </div>
    
    <div class="result-group">
      Taille en bits de la mantisse: ${bf.mantissaBitsSize}
    </div>

    <div class="result-group">
      Biais: ${bf.bias}
    </div>
    
    <div class="result-group">
      Signe:
      <span class="color-red mono">${bf.binarySign}</span>
      <span class="mono">(${bf.computedSign > 0 ? "+" : "-"})</span>
    </div>
    
    <div class="result-group">
      Mantisse:
      <span class="color-orange mono">
        ${bf.binaryMantissa}
      </span>
      <span class="mono">(${bf.computedMantissa})</span>
    </div>

    <div class="result-group">
      Exposant: <span class="color-blue mono">${bf.binaryExponent}</span>
      <span class="mono">(2<sup>${bf.computedExponent}</sup>)</span>
    </div>
    
    <div class="result-group">
      Résultat en binaire:
      <span class="color-red mono">${bf.binarySign}</span>
      <span class="color-blue mono">${bf.binaryExponent}</span>
      <span class="color-orange mono">${bf.binaryMantissa}</span>
    </div>
    
    <div class="result-group">
      Résultat: ${bf.computedNumber}
    </div>
  `;
}

bfBinaryNumberElement.addEventListener("change", onChangeConverterBf);
bfBinaryNumberElement.addEventListener("keyup", onChangeConverterBf);

onChangeConverterBf();

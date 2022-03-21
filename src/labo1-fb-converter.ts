/**
 * Labo: 1 (Float to binary conversion)
 * Authors: Owen Gombas, David Darmanger, Julien Vaucher, Clément Petignat
 * Team: 2
 * School: HE-Arc
 * Date: 21 mars 2022
 * Course: Mathématiques spécifiques (Module 2234) - M. Stéphane Gobron
 */

import { BinaryFloat } from "./classes/BinaryFloat";

const fbBitsSizeElement = <HTMLInputElement>document.getElementById("fb-bits-size");
const fbFloatingNumberElement = <HTMLInputElement>document.getElementById("fb-floating-number");
const fbFindAccurateBitsSize = <HTMLInputElement>document.getElementById("fb-find-accurate-bits-size");
const fbResultElement = document.getElementById("fb-result");
const minLength = 8;
const maxLength = 256;

function verifyInputs() {
  const bitsSize = Number(fbBitsSizeElement.value);
  const floatingNumber = Number(fbFloatingNumberElement.value);

  if (bitsSize < minLength) {
    fbResultElement.innerHTML = `<span class="color-red">La taille des bits doit au minimum être ${minLength}</span>`;
    return;
  }

  if (bitsSize > maxLength) {
    fbResultElement.innerHTML = `<span class="color-red">La taille des bits doit au maximum être ${maxLength}</span>`;
    return;
  }
  
  if (fbBitsSizeElement.value === "" || fbFloatingNumberElement.value === "") {
    fbResultElement.innerHTML = `<span class="color-grey">Veuillez renseigner tous les champs</span>`;
    return;
  }
  
  const bf = new BinaryFloat(floatingNumber, bitsSize);
  
  if (bf.overflow) {
    fbResultElement.innerHTML = `<span class="color-red">Votre nombre binaire est trop grand pour être encodé en ${bitsSize} bits</span>`;
    return;
  }

  return bf;
}

function onChangeConverterFb() {
  const bf = verifyInputs();
  updateView(bf);
}

function findAccurateBitSize() {
  const bf = verifyInputs();

  bf.findAccurateBitsSize();
  bf.calculate();

  fbBitsSizeElement.value = bf.bitsSize.toString();

  updateView(bf);
}

function updateView(bf: BinaryFloat) {
  fbResultElement.innerHTML = `
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
      Résultat:
      <span class="color-red mono">${bf.binarySign}</span>
      <span class="color-blue mono">${bf.binaryExponent}</span>
      <span class="color-orange mono">${bf.binaryMantissa}</span>
    </div>
    
    <div class="result-group">
      Nombre réellement codé: ${bf.computedNumber}
    </div>
    
    <div class="result-group">
      Marge d'erreur: ${bf.error}
    </div>
  `;
}

fbBitsSizeElement.addEventListener("change", onChangeConverterFb);
fbBitsSizeElement.addEventListener("keyup", onChangeConverterFb);
fbFloatingNumberElement.addEventListener("change", onChangeConverterFb);
fbFloatingNumberElement.addEventListener("keyup", onChangeConverterFb);
fbFindAccurateBitsSize.addEventListener("click", findAccurateBitSize);

onChangeConverterFb();

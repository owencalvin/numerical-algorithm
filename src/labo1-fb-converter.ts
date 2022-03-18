import { BinaryFloat } from "./classes/BinaryFloat";

const fbBitsSizeElement = <HTMLInputElement>document.getElementById("fb-bits-size");
const fbFloatingNumberElement = <HTMLInputElement>document.getElementById("fb-floating-number");
const fbResultElement = document.getElementById("fb-result");

function onChangeConverterFb() {
  const bitsSize = Number(fbBitsSizeElement.value);
  const floatingNumber = Number(fbFloatingNumberElement.value);
  
  if (fbBitsSizeElement.value === "" || fbFloatingNumberElement.value === "") {
    fbResultElement.innerHTML = `<span class="color-red">Veuillez renseigner tous les champs</span>`;
    return;
  }
  
  const bf = new BinaryFloat(floatingNumber, bitsSize);

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
    </div>
    
    <div class="result-group">
      Mantisse:
      <span class="color-orange mono">
        ${bf.binaryMantissa}
      </span>
    </div>

    <div class="result-group">
      Exposant: <span class="color-blue mono">${bf.binaryExponent}</span>
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

onChangeConverterFb();

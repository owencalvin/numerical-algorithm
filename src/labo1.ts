import { BinaryFloat } from "./classes/BinaryFloat";

const bf = new BinaryFloat();

const bitsSizeElement = <HTMLInputElement>document.getElementById("bits-size");
const floatingNumberElement = <HTMLInputElement>document.getElementById("floating-number");
const result = document.getElementById("result");

function onChange() {
  let res = "";
  const bitsSize = Number(bitsSizeElement.value);
  const floatingNumber = Number(floatingNumberElement.value);

  if (!bitsSize || !floatingNumber) {
    res = "Veuillez renseigner tous les champs";
  }

  bf.bitsSize = bitsSize;
  bf.number = floatingNumber;

  res = `
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
      <span class="color-red">${bf.binarySign}</span>
    </div>
    
    <div class="result-group">
      Mantisse:
      <span class="color-orange">
        ${bf.binaryMantissa}
      </span>
    </div>

    <div class="result-group">
      Exposant: <span class="color-blue">${bf.binaryExponent}</span>
    </div>
    
    <div class="result-group">
      Résultat:
      <span class="color-red">${bf.binarySign}</span>
      <span class="color-blue">${bf.binaryExponent}</span>
      <span class="color-orange">${bf.binaryMantissa}</span>
    </div>
    
    <div class="result-group">
      Nombre réellement codé: ${bf.computedNumber}
    </div>
    
    <div class="result-group">
      Marge d'erreur: ${bf.error}
    </div>
  `;

  result.innerHTML = res || "Resultat...";
}

bitsSizeElement.addEventListener("change", onChange);
bitsSizeElement.addEventListener("keyup", onChange);
floatingNumberElement.addEventListener("change", onChange);
floatingNumberElement.addEventListener("keyup", onChange);

onChange();
import { BinaryFloat } from "./classes/BinaryFloat";

const bitsSizeElement = <HTMLInputElement>document.getElementById("bits-size");
const floatingNumberElement = <HTMLInputElement>document.getElementById("floating-number");
const resultElement = document.getElementById("result");

function onChangeConverter() {
  let res = "";
  const bitsSize = Number(bitsSizeElement.value);
  const floatingNumber = Number(floatingNumberElement.value);
  
  if (!bitsSize || !floatingNumber) {
    res = "Veuillez renseigner tous les champs";
  }
  
  const bf = new BinaryFloat(floatingNumber, bitsSize);

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

  resultElement.innerHTML = res || "Resultat...";
}

bitsSizeElement.addEventListener("change", onChangeConverter);
bitsSizeElement.addEventListener("keyup", onChangeConverter);
floatingNumberElement.addEventListener("change", onChangeConverter);
floatingNumberElement.addEventListener("keyup", onChangeConverter);

onChangeConverter();

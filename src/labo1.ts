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
    Taille en bits de l'exposant: ${bf.exponentBitsSize}
    <br>
    Taille en bits de la mantisse: ${bf.mantissaBitsSize}
    <br>
    Signe: <span class="color-red">${bf.binarySign}</span>
    <br>
    Mantisse: <span class="color-orange">${bf.binaryMantissaFront}.${bf.binaryDecimalMantissa}</span>
    <br>
    Exposant: <span class="color-blue">${bf.binaryExponent}</span>
    <br>
    Résultat:
    <span class="color-red">${bf.binarySign}</span>
    <span class="color-blue">${bf.binaryExponent}</span>
    <span class="color-orange">${bf.binaryMantissaFront}</span>
    <span class="color-orange">${bf.binaryDecimalMantissa}</span>
  `;

  result.innerHTML = res || "Resultat...";
}

bitsSizeElement.addEventListener("change", onChange);
bitsSizeElement.addEventListener("keyup", onChange);
floatingNumberElement.addEventListener("change", onChange);
floatingNumberElement.addEventListener("keyup", onChange);

onChange();
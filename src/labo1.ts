import { BinaryFloat } from "./classes/BinaryFloat";

const bf = new BinaryFloat();

const bitsSizeElement = <HTMLInputElement>document.getElementById("bits-size");
const floatingNumberElement = <HTMLInputElement>document.getElementById("floating-number");
const result = document.getElementById("result");

function onChange() {
  console.log("change");

  let res = "";
  const bitsSize = Number(bitsSizeElement.value);
  const floatingNumber = Number(floatingNumberElement.value);

  if (!bitsSize || !floatingNumber) {
    res = "Veuillez renseigner tous les champs";
  }

  bf.bitsSize = bitsSize;

  res = `
    Taille en bits de l'exposant: ${bf.exponentBitsSize}
    <br>
    Taille en bits de la mantisse: ${bf.mantissaBitsSize}
    <br>
    Résultat: ${bf.binaryFloatingNumber}
  `;

  result.innerHTML = res || "Resultat...";
}

bitsSizeElement.addEventListener("change", onChange);
bitsSizeElement.addEventListener("keyup", onChange);
floatingNumberElement.addEventListener("change", onChange);
floatingNumberElement.addEventListener("keyup", onChange);

onChange();
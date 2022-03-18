import { BinaryFloat } from "./classes/BinaryFloat";

const addBitSizeElement = <HTMLInputElement>document.getElementById("add-bits-size");
const addInputAElement = <HTMLInputElement>document.getElementById("add-input-a");
const addInputBElement = <HTMLInputElement>document.getElementById("add-input-b");
const addResultElement = document.getElementById("add-result");

function onChangeAddition() {
  let res = "";

  const bitsSize = Number(addBitSizeElement.value);
  const inputA = Number(addInputAElement.value);
  const inputB = Number(addInputBElement.value);
  
  if (!inputA || !inputB) {
    res = "Veuillez renseigner tous les champs";
  }
  
  const bfA = new BinaryFloat(inputA, bitsSize);
  const bfB = new BinaryFloat(inputB, bitsSize);

  res = `
    <div class="result-group">
      <span class="mono">${inputA}</span>
      en binaire:
      <span class="color-red mono">${bfA.binarySign}</span>
      <span class="color-blue mono">${bfA.binaryExponent}</span>
      <span class="color-orange mono">${bfA.binaryMantissa}</span>
      (<span class="mono">${bfA.computedNumber}</span>)
    </div>
    <div class="result-group">
      <span class="mono">${inputB}</span>
      en binaire:
      <span class="color-red mono">${bfB.binarySign}</span>
      <span class="color-blue mono">${bfB.binaryExponent}</span>
      <span class="color-orange mono">${bfB.binaryMantissa}</span>
      (<span class="mono">${bfB.computedNumber}</span>)
    </div>
    <div class="result-group">
      Résultat: ${bfA.add(bfB)}
    </div>
  `;

  addResultElement.innerHTML = res || "Resultat...";
}

addInputAElement.addEventListener("change", onChangeAddition);
addInputAElement.addEventListener("keyup", onChangeAddition);
addInputBElement.addEventListener("change", onChangeAddition);
addInputBElement.addEventListener("keyup", onChangeAddition);

onChangeAddition();

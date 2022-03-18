import { BinaryFloat } from "./classes/BinaryFloat";

const addBitSizeElement = <HTMLInputElement>document.getElementById("add-bits-size");
const addInputAElement = <HTMLInputElement>document.getElementById("add-input-a");
const addInputBElement = <HTMLInputElement>document.getElementById("add-input-b");
const addResultElement = document.getElementById("add-result");

function onChangeAddition() {
  const bitsSize = Number(addBitSizeElement.value);
  const inputA = Number(addInputAElement.value);
  const inputB = Number(addInputBElement.value);
  
  if (addBitSizeElement.value === "" || addInputAElement.value === "" || addInputBElement.value === "") {
    addResultElement.innerHTML = `<span class="color-red">Veuillez renseigner tous les champs</span>`;
    return;
  }
  
  const bfA = new BinaryFloat(inputA, bitsSize);
  const bfB = new BinaryFloat(inputB, bitsSize);
  const bfRes = bfA.add(bfB);

  addResultElement.innerHTML = `
    <div class="result-group">
      Nombre <span class="mono">1</span> en binaire:
      <span class="color-red mono">${bfA.binarySign}</span>
      <span class="color-blue mono">${bfA.binaryExponent}</span>
      <span class="color-orange mono">${bfA.binaryMantissa}</span>
      (<span class="mono">${bfA.computedNumber}</span>)
    </div>

    <div class="result-group">
      Nombre <span class="mono">2</span> en binaire:
      <span class="color-red mono">${bfB.binarySign}</span>
      <span class="color-blue mono">${bfB.binaryExponent}</span>
      <span class="color-orange mono">${bfB.binaryMantissa}</span>
      (<span class="mono">${bfB.computedNumber}</span>)
    </div>

    <div class="result-group mt25">
      Résultat en base 10:
      <span class="mono">${bfRes.computedNumber}</span>
    </div>

    <div class="result-group">
      Résultat en binaire:
      <span class="color-red mono">${bfRes.binarySign}</span>
      <span class="color-blue mono">${bfRes.binaryExponent}</span>
      <span class="color-orange mono">${bfRes.binaryMantissa}</span>
    </div>
  `;
}

addInputAElement.addEventListener("change", onChangeAddition);
addInputAElement.addEventListener("keyup", onChangeAddition);
addInputBElement.addEventListener("change", onChangeAddition);
addInputBElement.addEventListener("keyup", onChangeAddition);

onChangeAddition();

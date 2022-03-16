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
    res = "Please fill all the inputs";
  }

  bf.bitsSize = bitsSize;

  res = `
    exponent bits size: ${bf.exponentBitsSize}
    <br>
    precision bits size: ${bf.precisionBitsSize}
    <br>
    result: ${bf.floatingNumber}
  `;

  result.innerHTML = res || "Result...";
}

bitsSizeElement.addEventListener("change", onChange);
bitsSizeElement.addEventListener("keyup", onChange);
floatingNumberElement.addEventListener("change", onChange);
floatingNumberElement.addEventListener("keyup", onChange);

onChange();
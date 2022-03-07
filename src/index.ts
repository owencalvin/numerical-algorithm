import { BinaryHelper } from "./BinaryHelper";

const bh = new BinaryHelper();

const inputA = <HTMLInputElement>document.getElementById("input-a");
const inputB = <HTMLInputElement>document.getElementById("input-b");
const mode = <HTMLSelectElement>document.getElementById("mode");
const result = document.getElementById("result");
const regexBinary = /^[01]+$/;

function onChange() {
  const a = inputA.value;
  const b = inputB.value;

  if (!a || !b) {
    result.innerHTML = "Please enter binary numbers in the inputs";
    return;
  }

  if (!regexBinary.test(a) || !regexBinary.test(b)) {
    result.innerHTML = "Your inputs are not in a binary format";
    return;
  }

  let res = "";

  switch (mode.value) {
    case "add": {
      const [r, c] = bh.binaryAddition(a, b);
      res = r + c;
      res = bh.clean(res);
      break;
    }
    case "mult": {
      res = bh.binaryMultiplication(a, b);
      res = bh.clean(res);
      break;
    }
    case "sub": {
      const [r, c] = bh.binarySubstraction(a, b);
      res = r + c;
      res = bh.clean(res);
      break;
    }
  }

  result.innerHTML = res ? `Result: ${res}` : "Result: ...";
}

inputA.addEventListener("change", onChange);
inputB.addEventListener("change", onChange);
inputA.addEventListener("keyup", onChange);
inputB.addEventListener("keyup", onChange);
mode.addEventListener("change", onChange);

onChange();

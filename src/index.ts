import { BinaryHelper } from "./BinaryHelper";

const bh = new BinaryHelper();

const resAdd = bh.binaryAddition("00111111", "11100011");
const resSub = bh.binarySubstraction("10101000", "11111101");
const resMul = bh.binaryMultiplication("1011", "1111");

console.log(resAdd);
console.log(resSub);
console.log(resMul);

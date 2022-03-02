import { BinaryHelper } from "./BinaryHelper";

const bh = new BinaryHelper(8);

const resAdd = bh.binaryAddition("00111111", "11100011");
const resSub = bh.binarySubstraction("101010000", "11111101");

console.log(resSub)

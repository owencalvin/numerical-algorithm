import { BinaryHelper } from "./BinaryHelper";

/**
 * Encode a floating number with a choosen bit size and IEEE 754
 */
export class BinaryFloat {
  private _bitsSize = 32;
  private _number = 0;
  private _binarySign: "1" | "0" = "0";
  private _binaryMantissa = "";
  private _overflow = false;
  private _mantissaDotPosition = 0;
  private _binaryExponent = "";
  private _bias = 0;
  private _bh = new BinaryHelper();

  constructor(numberOrBinary: string);
  constructor(numberOrBinary: number, bitsSize: number);
  constructor(numberOrBinary: number | string, bitsSize?: number) {
    if (typeof numberOrBinary === "string") {
      // Remove the spaces in the string
      numberOrBinary = numberOrBinary.trim();
      numberOrBinary = numberOrBinary.replace(/\s/g, "");
      this.bitsSize = numberOrBinary.length;
      this.number = 1;

      // Slice the string to assign the binary number to the correct part of the binary representation of the float
      this.binarySign = numberOrBinary[0] as "0" | "1";
      this.binaryExponent = numberOrBinary.slice(1, this.exponentBitsSize + 1);
      this.binaryMantissa = numberOrBinary.slice(this.exponentBitsSize + 1, this.bitsSize);
    } else {
      this.bitsSize = bitsSize;
      this.number = numberOrBinary;
    }
  }

  static getInfinity(bitsSize: number) {
    return new BinaryFloat(Infinity, bitsSize);
  }

  static getNaN(bitsSize: number) {
    return new BinaryFloat(NaN, bitsSize);
  }

  /**
   * The float number to coded with IEEE 754
   */
  get number() {
    return this._number;
  }

  set number(value: number) {
    this._number = value;

    this.calculateBinarySign();
    this.calculateBias();
    this.calculateBinaryMantissa();
    this.calculateBinaryExponent();
  }

  /**
   * The bit size to code the number
   */
  get bitsSize() {
    return this._bitsSize;
  }

  set bitsSize(value: number) {
    this._bitsSize = value;

    if (value > 80) {
      this._bitsSize = 80;
    }

    if (value < 8) {
      this._bitsSize = 8;
    }
  }

  /**
   * Get the mantissa bits size
   */
  get mantissaBitsSize() {
    if (this.bitsSize < 8) {
      return 0;
    }

    return this.bitsSize - this.exponentBitsSize - 1;
  }

  /**
   * Get the exponent bits size with:
   * - The IEEE 754 2019 formula if the bits size is greater or equal to 128
   * - A custom formula if the bit size is less than 128 that matches the IEEE standard
   * 
   * Visualize the function on geogebra:
   * https://www.geogebra.org/calculator/cerrkdfv
   */
  get exponentBitsSize() {
    if (this.bitsSize < 8) {
      return 0;
    }

    // IEEE 754 2019 formula >= 128
    if (this.bitsSize >= 128) {
      return Math.round(4 * Math.log2(this.bitsSize)) - 13;
    }

    // A formula that matches the values for < 128
    // ref: https://stackoverflow.com/a/62632260
    return Math.round((Math.log2(this.bitsSize) - 1) ** (3 / 2));
  }

  get positiveNumber() {
    return Math.abs(this.number);
  }

  /**
   * Calculate the position of the dot in the mantissa
   *            float position
   *                  |
   *                  v
   * mantissa(19.59375) => "0011.1001100000000000000"
   */
  get mantissaDotPosition() {
    return this._mantissaDotPosition;
  }

  /**
   * Get the exponent of the number in binary with the bias
   * mantissa(19.59375) => "10000010"
   */
  get binaryExponent() {
    return this._binaryExponent;
  }

  set binaryExponent(value: string) {
    this._binaryExponent = value;
  }

  /**
   * Return the bias of the number based on the exponent bit size
   * b = 2 ^ (exponentBitsSize - 1) - 1
   */
  get bias() {
    return this._bias;
  }

  /**
   * Get the full mantissa of the number
   */
  get binaryMantissa() {
    return this._binaryMantissa;
  }

  set binaryMantissa(value: string) {
    this._binaryMantissa = value;
    this._overflow = value.length > this.mantissaBitsSize;
  }

  /**
   * Get the full number coded in binary with IEEE 754
   */
  get binaryFloatingNumber() {
    return this.binarySign + this.binaryExponent + this.binaryMantissa;
  }

  /**
   * The sign in it's decimal form
   */
  get computedSign() {
    return this.binarySign === "1" ? -1 : 1;
  }

  /**
   * The exponent in it's decimal form
   */
  get computedExponent() {
    return this._bh.binaryToDecimal(this.binaryExponent) - this.bias;
  }

  /**
   * The mantissa in it's decimal form
   */
  get computedMantissa() {
    return this._bh.binaryToDecimal("1" + this.binaryMantissa) / 2 ** this.mantissaBitsSize;
  }

  /**
   * The number that is coded in memory
   */
  get computedNumber() {
    if (
      Number.isNaN(this.number) ||
      this.number === Infinity ||
      this.number === 0
    ) {
      return this.number;
    }

    if (
      this.binaryExponent.indexOf("0") === -1 &&
      this.binaryMantissa.indexOf("0") === -1 &&
      this.binarySign === "0"
    ) {
      return NaN;
    }

    if (
      this.binaryExponent.indexOf("0") === -1 &&
      this.binaryMantissa.indexOf("1") === -1 &&
      this.binarySign === "0"
    ) {
      return Infinity;
    }

    return this.computedSign * 2 ** this.computedExponent * this.computedMantissa;
  }

  /**
   * Get the margin of error
   */
  get error() {    
    if (Number.isNaN(this.number) || this.number === Infinity || this.number === 0) {
      return 0;
    }

    return Math.abs(this.number - this.computedNumber);
  }

  /**
   * Return the binary representation of the sign
   * 0 if number >= 0
   * 1 if number < 0
   */
  get binarySign(): "0" | "1" {
    return this._binarySign;
  }

  set binarySign(value: "0" | "1") {
    this._binarySign = value;
  }

  /**
   * True if the number cannot be encoded in <bitsSize> bits
   */
  get overflow() {
    return this._overflow;
  }

  /**
   * Determine the binary sign of the number
   */
  private calculateBinarySign() {
    this._binarySign = this.number < 0 ? "1" : "0";
  }

  /**
   * Calculate the exponent bias based on the exponent bit size
   * b = 2 ^ (exponentBitsSize - 1) - 1;
   */
  private calculateBias() {
    this._bias = 2 ** (this.exponentBitsSize - 1) - 1;
  }

  /**
   * Determine the binary mantissa and determine the dot position in the mantissa
   */
  private calculateBinaryMantissa() {
    if (Number.isNaN(this.number)) {
      this._mantissaDotPosition = 0;
      this._binaryMantissa = "".padEnd(this.mantissaBitsSize, "1");
      return;
    }

    // Get the integer part
    const integerPart = Math.trunc(this.positiveNumber);

    // Get the decimals of the number: decimals = 19.59375 - 19 = 0.59375
    let decimalsPart = this.positiveNumber - Math.trunc(this.positiveNumber);

    const binaryIntegerPart = this._bh.decimalToBinary(integerPart);

    // Get the number of bits dedicated to store the decimals in the mantissa
    const decimalsBitsSize = this.mantissaBitsSize - binaryIntegerPart.length - 1;
    
    let binaryDecimalsPart = "";
    // 0.59375 * 2 = 1.1875  => 1
    // 0.1875  * 2 = 0.375   => 0
    // 0.375   * 2 = 0.75    => 0
    // 0.75    * 2 = 1.5     => 1
    // 0.5     * 2 = 1       => 1
    for(let i = 0; i < decimalsBitsSize; i++) {
      decimalsPart *= 2;

      if (decimalsPart >= 1) {
        decimalsPart -= 1;
        binaryDecimalsPart += "1";
      } else {
        binaryDecimalsPart += "0";
      }
    }

    let binaryMantissa = binaryIntegerPart + binaryDecimalsPart;

    // Get the position of the first bit at 1, for only decimals number
    let mantissaDotPosition = -binaryMantissa.indexOf("1");

    // Remove all the leading bit at 0 from the mantissa
    binaryMantissa = this._bh.clean(binaryMantissa);

    // If the position of the first bit at 1 is 0
    // then the dot position is equals to the length of the binary integer part of the mantissa
    if (mantissaDotPosition === 0) {
      mantissaDotPosition = binaryIntegerPart.length - 1;
    }

    // Hide the first bit at 1
    binaryMantissa = binaryMantissa.substring(1);

    // Make sure that the mantissa matches the correct length (23 for 32 bits for example)
    binaryMantissa = binaryMantissa.padEnd(this.mantissaBitsSize, "0");

    this.binaryMantissa = binaryMantissa;
    this._mantissaDotPosition = mantissaDotPosition;
  }

  /**
   * Calculate the exponent in binary
   * e = binary(mantissaFloatPosition + bias)
   */
  private calculateBinaryExponent() {
    // If the number is NaN or Infinity then all the bits of the exponent are equals to 1
    if (Number.isNaN(this.number) || this.number === Infinity) {
      this._binaryExponent = "".padEnd(this.exponentBitsSize, "1");
      return;
    }

    let exponent = this.mantissaDotPosition + this.bias;

    // If the number is 0 then all the bits of the exponent are equals to 0
    if (this.number === 0) {
      exponent = 0;
    }

    // Convert the exponent to binary and add leading 0 to match the exponent bits size
    this._binaryExponent = this._bh.decimalToBinary(exponent).padStart(this.exponentBitsSize, "0");
  }

  /**
   * Add two binary float number
   * @param bf2 The binary float number to add
   * @returns The result of the addition
   */
  add(bf2: BinaryFloat) {
    const bfRes = new BinaryFloat(1, this.bitsSize);

    if (Number.isNaN(this.computedNumber) || Number.isNaN(bf2)) {
      return BinaryFloat.getNaN(this.bitsSize);
    }

    if (this.computedNumber === Infinity || bf2.computedNumber === Infinity) {
      return BinaryFloat.getInfinity(this.bitsSize);
    }

    // Step 1: Determine the lowest exponent between this and the second number
    let bfMinBinaryExponent: BinaryFloat = this;
    let bfMaxBinaryExponent: BinaryFloat = bf2;
    if (this._bh.binaryToDecimal(bf2.binaryExponent) < this._bh.binaryToDecimal(bfMinBinaryExponent.binaryExponent)) {
      bfMinBinaryExponent = bf2;
      bfMaxBinaryExponent = this;
    }

    // Step 2: Shift the mantissa
    const shiftValue = bfMaxBinaryExponent.computedExponent - bfMinBinaryExponent.computedExponent;
    const shiftedMinMantissa = this._bh.shiftRight("1" + bfMinBinaryExponent.binaryMantissa, shiftValue);
    bfRes.binaryMantissa = shiftedMinMantissa;
    
    // Step 3: Put the same exponent
    bfRes.binaryExponent = bfMaxBinaryExponent.binaryExponent;

    // Step 4: Add the mantissa and the shifted one
    if (bfMinBinaryExponent.computedSign === bfMaxBinaryExponent.computedSign) {
      bfRes.binaryMantissa = this._bh.binaryAddition("1" + bfMaxBinaryExponent.binaryMantissa, bfRes.binaryMantissa).reverse().join("");
    } else {
      bfRes.binaryMantissa = this._bh.binarySubstraction(bfRes.binaryMantissa, "1" + bfMaxBinaryExponent.binaryMantissa).reverse().join("");
    }

    // Step 5: Normalise the mantissa
    if (bfRes.binaryMantissa.length - bfRes.mantissaBitsSize === 1) {
      console.log(bfRes.binaryMantissa.length - bfRes.mantissaBitsSize);

      // Hide the first bit
      bfRes.binaryMantissa = bfRes.binaryMantissa.substring(1);
    }

    // Normalize if there is a carry
    if (bfRes.binaryMantissa.length - bfRes.mantissaBitsSize === 2) {
      // Hide the first bit
      bfRes.binaryMantissa = bfRes.binaryMantissa.substring(1);

      // Remove the last bit
      bfRes.binaryMantissa = bfRes.binaryMantissa.slice(0, -1);

      // Add 1 to the exponent
      bfRes.binaryExponent = this._bh.addNumberToBinary(bfRes.binaryExponent, 1)[0];
    }

    return bfRes;
  }
}

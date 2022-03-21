/**
 * Labo: 1 (Float to binary conversion)
 * Authors: Owen Gombas, David Darmanger, Julien Vaucher, Clément Petignat
 * Team: 2
 * School: HE-Arc
 * Date: 21 mars 2022
 * Course: Mathématiques spécifiques (Module 2234) - M. Stéphane Gobron
 */

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
  private static _minBitSize = 8;

  constructor(numberOrBinary: string);
  constructor(numberOrBinary: number);
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

  /**
   * Get the infinity binary representation
   * @param bitsSize The bit size of the number
   * @returns The infinity binary representation
   */
  static getInfinity(bitsSize: number) {
    return new BinaryFloat(Infinity, bitsSize);
  }

  /**
   * Get the NaN binary representation
   * @param bitsSize The bit size of the number
   * @returns The NaN binary representation
   */
  static getNaN(bitsSize: number) {
    return new BinaryFloat(NaN, bitsSize);
  }

  /**
   * Get the zero binary representation
   * @param bitsSize The bit size of the number
   * @returns The zero binary representation
   */
  static getZero(bitsSize: number) {
    return new BinaryFloat(0, bitsSize);
  }

  /**
   * The float number to encode with IEEE 754
   */
  get number() {
    return this._number;
  }

  set number(value: number) {
    this._number = value;

    this.calculate();
  }

  /**
   * The bits size to code the number
   */
  get bitsSize() {
    return this._bitsSize;
  }

  set bitsSize(value: number) {
    this._bitsSize = value;

    if (value < BinaryFloat._minBitSize) {
      this._bitsSize = BinaryFloat._minBitSize;
    }
  }

  /**
   * The mantissa bits size
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

  /**
   * The absolute value of the original number
   */
  get positiveNumber() {
    return Math.abs(this.number);
  }

  /**
   * Calculate the position of the dot in the mantissa
   *                      float position
   *                            |
   *                            v
   * mantissa(19.59375) => "0011.1001100000000000000"
   */
  get mantissaDotPosition() {
    return this._mantissaDotPosition;
  }

  /**
   * Return the bias of the number based on the exponent bits size
   * b = 2 ^ (exponentBitsSize - 1) - 1
   */
  get bias() {
    return this._bias;
  }

  /**
   * The binary representation of the sign
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
   * The exponent of the number in binary with the bias
   * mantissa(19.59375) => "10000010"
   */
   get binaryExponent() {
    return this._binaryExponent;
  }

  set binaryExponent(value: string) {
    this._binaryExponent = value;
  }

  /**
   * The full mantissa of the number
   */
  get binaryMantissa() {
    return this._binaryMantissa;
  }

  set binaryMantissa(value: string) {
    this._binaryMantissa = value;
    this._overflow = value.length > this.mantissaBitsSize;
  }

  /**
   * The full number coded in binary with IEEE 754
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
   * Determine if the number is NaN
   * @returns True if the number is NaN
   */
  get isNaN() {
    const isNaNBinary = (
      this.binaryExponent.indexOf("0") === -1 &&
      this.binaryMantissa.indexOf("0") === -1 &&
      this.binarySign === "0"
    );

    return Number.isNaN(this.number) || isNaNBinary;
  }

  /**
   * Determine if the number is represents the infinity
   * @returns True if the number is Infinity
   */
  get isInfinity() {
    const isInfinityBinary = (
      this.binaryExponent.indexOf("0") === -1 &&
      this.binaryMantissa.indexOf("1") === -1 &&
      this.binarySign === "0"
    );

    return this.number === Infinity || isInfinityBinary;
  }

  /**
   * Determine if the number is zero
   * @returns True if the number is zero
   */
  get isZero() {
    const isZeroBinary = (
      this.binaryExponent.indexOf("1") === -1 &&
      this.binaryMantissa.indexOf("1") === -1 &&
      this.binarySign === "0"
    );

    return this.number === 0 || isZeroBinary;
  }

  /**
   * Get the absolute value of the number in binary
   */
  get binaryAbs() {
    return "0" + this.binaryExponent + this.binaryMantissa;
  }

  /**
   * The number that is coded in memory
   */
  get computedNumber() {
    if (this.isZero) {
      return 0;
    } else if (this.isNaN) {
      return NaN;
    } else if (this.isInfinity) {
      return Infinity;
    }

    return this.computedSign * 2 ** this.computedExponent * this.computedMantissa;
  }

  /**
   * Get the margin of error
   */
  get marginOfError() {    
    if (Number.isNaN(this.number) || this.number === Infinity || this.number === 0) {
      return 0;
    }

    return Math.abs(this.number - this.computedNumber);
  }

  /**
   * True if the number cannot be encoded in <bitsSize> bits
   */
  get overflow() {
    return this._overflow;
  }

  /**
   * Calculate:
   * - Binary sign
   * - The bias
   * - The binary mantissa
   * - The binary exponent
   */
  calculate() {
    this.calculateBinarySign();
    this.calculateBias();
    this.calculateBinaryMantissa();
    this.calculateBinaryExponent();
  }

  /**
   * Determine the binary sign of the number
   */
  calculateBinarySign() {
    this._binarySign = this.number < 0 ? "1" : "0";
  }

  /**
   * Calculate the exponent bias based on the exponent bit size
   * b = 2 ^ (exponentBitsSize - 1) - 1;
   */
  calculateBias() {
    this._bias = 2 ** (this.exponentBitsSize - 1) - 1;
  }

  /**
   * Determine the binary mantissa and determine the dot position in the mantissa
   */
  calculateBinaryMantissa() {
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
  calculateBinaryExponent() {
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

    // Special cases
    if (this.isNaN || bf2.isNaN) {
      return BinaryFloat.getNaN(this.bitsSize);
    }
    if (this.isInfinity || bf2.isInfinity) {
      return BinaryFloat.getInfinity(this.bitsSize);
    }
    if (this.binaryAbs === bf2.binaryAbs && this.binarySign !== bf2.binarySign) {
      return BinaryFloat.getZero(this.bitsSize);
    }

    // Step 1: Determine the lowest exponent between this and the second number
    let bfMinBinaryExponent: BinaryFloat = this;
    let bfMaxBinaryExponent: BinaryFloat = bf2;
    if (this._bh.binaryToDecimal(bf2.binaryExponent) < this._bh.binaryToDecimal(bfMinBinaryExponent.binaryExponent)) {
      bfMinBinaryExponent = bf2;
      bfMaxBinaryExponent = this;
    }
    // Copy the number, do not set by reference
    bfMaxBinaryExponent = new BinaryFloat(bfMaxBinaryExponent.computedNumber, this.bitsSize);
    bfMinBinaryExponent = new BinaryFloat(bfMinBinaryExponent.computedNumber, this.bitsSize);

    // If there is a 0 then return the non-zero number
    if (bfMinBinaryExponent.isZero) {
      return bfMaxBinaryExponent;
    }

    // Add the hidden bit
    bfMinBinaryExponent.binaryMantissa = "1" + bfMinBinaryExponent.binaryMantissa;
    bfMaxBinaryExponent.binaryMantissa = "1" + bfMaxBinaryExponent.binaryMantissa;

    // Step 2: Shift the mantissa
    const shiftValue = bfMaxBinaryExponent.computedExponent - bfMinBinaryExponent.computedExponent;
    const shiftedMinMantissa = this._bh.shiftRight(bfMinBinaryExponent.binaryMantissa, shiftValue);
    bfMinBinaryExponent.binaryMantissa = shiftedMinMantissa;
    
    // Step 3: Put the same exponent
    bfRes.binaryExponent = bfMaxBinaryExponent.binaryExponent;

    // Step 4: 2's complement if negative
    if (bfMinBinaryExponent.computedSign === -1) {
      bfMinBinaryExponent.binaryMantissa = this._bh.c2(bfMinBinaryExponent.binaryMantissa).reverse().join("");
    }
    if (bfMaxBinaryExponent.computedSign === -1) {
      bfMaxBinaryExponent.binaryMantissa = this._bh.c2(bfMaxBinaryExponent.binaryMantissa).reverse().join("");

      if (bfMaxBinaryExponent.computedSign !== bfMinBinaryExponent.computedSign) {
        bfRes.binarySign = "1";
      }
    }

    // Step 5: Add the mantissa and the shifted one
    bfRes.binaryMantissa = this._bh.binaryAddition(
      bfMaxBinaryExponent.binaryMantissa,
      bfMinBinaryExponent.binaryMantissa,
    ).reverse().join("");

    // Step 7: Normalize the mantissa
    // Hide the first bit
    bfRes.binaryMantissa = bfRes.binaryMantissa.substring(1);

    // Normalize the mantissa if there is a carry
    if (bfRes.binaryMantissa.length - bfRes.mantissaBitsSize === 1) {
      // Round the last bit
      const lastBit =  bfRes.binaryMantissa[bfRes.binaryMantissa.length - 1];
      const beforeLastBit =  bfRes.binaryMantissa[bfRes.binaryMantissa.length - 2];
      bfRes.binaryMantissa = bfRes.binaryMantissa.slice(0, -1);
      if (beforeLastBit === "1" && lastBit === "1") {
        bfRes.binaryMantissa = this._bh.binaryAddition(bfRes.binaryMantissa, "1").reverse().join("");
      }

      // Add 1 to the exponent
      bfRes.binaryExponent = this._bh.addNumberToBinary(bfRes.binaryExponent, 1)[0];
    }

    return bfRes;
  }

  /**
   * Find the minimum bits size to match the number almost "perfectly"
   * @param maxBitSize Default 256, the bits size limit
   */
  findAccurateBitsSize(maxBitSize = 256) {
    this.bitsSize = BinaryFloat._minBitSize;
    
    while(this.bitsSize < maxBitSize && this.marginOfError !== 0) {
      this.bitsSize++;
      this.calculate();
    }
  }
}

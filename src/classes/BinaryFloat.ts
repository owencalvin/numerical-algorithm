import { BinaryHelper } from "./BinaryHelper";

/**
 * Code a floating number with a choosen bit size and IEEE 754
 */
export class BinaryFloat {
  private _bitsSize = 32;
  private _number = 0;
  private _binaryIntegerMantissa = "";
  private _binaryDecimalMantissa = "";
  private _binaryMantissa = "";
  private _mantissaFloatPosition = 0;
  private _binaryExponent = "";
  private _bias = 0;
  private _bh = new BinaryHelper();

  constructor(nb: number, bitsSize: number) {
    this.bitsSize = bitsSize;
    this.number = nb;
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
   * The float number to coded with IEEE 754
   */
  get number() {
    return this._number;
  }

  set number(value: number) {
    this._number = value;

    this.calculateBias();
    this.calculateBinaryIntegerMantissa();
    this.calculateBinaryDecimalMantissa();
    this.calculateBinaryMantissa();
    this.calculateBinaryExponent();
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
   * Return the truncated integer part in binary that is coded in the mantissa
   * (The first bit at 1 is hidden)
   * 0.09375  =>     "0"
   * 19.59375 => "0011"
   */
  get binaryIntegerMantissa() {
    return this._binaryIntegerMantissa;
  }

  set binaryIntegerMantissa(value: string) {
    this._binaryIntegerMantissa = value;
  }

  /**
   * The decimal part of the number in binary that is coded in the mantissa
   * 19.59375 => "00111001100000000000000"
   */
  get binaryDecimalMantissa() {
    return this._binaryDecimalMantissa;
  }

  set binaryDecimalMantissa(value: string) {
    this._binaryDecimalMantissa = value;
  }

  /**
   * Calculate the position of the dot in the mantissa
   *            float position
   *                  |
   *                  v
   * mantissa(19.59375) => "0011.1001100000000000000"
   */
  get mantissaFloatPosition() {
    return this._mantissaFloatPosition;
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
   * Get the full mantissa of the number
   */
  get binaryMantissa() {
    return this._binaryMantissa;
  }

  set binaryMantissa(value: string) {
    this._binaryMantissa = value;
  }

  /**
   * Get the full number coded in binary with IEEE 754
   */
  get binaryFloatingNumber() {
    return this.binarySign + this.binaryExponent + this.binaryMantissa;
  }

  /**
   * Return the bias of the number based on the exponent bit size
   * b = 2 ^ (exponentBitsSize - 1) - 1
   */
  get bias() {
    return this._bias;
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

    const sign = this.binarySign === "1" ? -1 : 1;
    const computedExponent = this._bh.binaryToDecimal(this.binaryExponent) - this.bias;
    const mantissa = this._bh.binaryToDecimal("1" + this.binaryMantissa) / 2 ** this.mantissaBitsSize;

    return sign * 2 ** computedExponent * mantissa;
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
    return this.number < 0 ? "1" : "0"; 
  }

  add(bf2: BinaryFloat) {
    const bfRes = new BinaryFloat(0, this.bitsSize);
    bfRes.binaryIntegerMantissa = "";

    // Step 1: Determine the lowest mantissa between this and the second number
    let bfMinBinaryExponent: BinaryFloat = this;
    let bfMaxBinaryExponent: BinaryFloat = bf2;
    if (this._bh.binaryToDecimal(bf2.binaryExponent) < this._bh.binaryToDecimal(bfMinBinaryExponent.binaryExponent)) {
      bfMinBinaryExponent = bf2;
      bfMaxBinaryExponent = this;
    }

    // Step 2: Shift the mantissa
    const shiftedMinMantissa = "0" + this._bh.decimalToBinary(this._bh.binaryToDecimal(bfMinBinaryExponent.binaryMantissa) >> 1);
    
    // Step 3: Put the same exponent
    bfRes.binaryExponent = bfMaxBinaryExponent.binaryExponent;
    
    // Step 4: Add the mantissa and the shifted one
    bfRes.binaryMantissa = this._bh.binaryAddition("1" + bfMaxBinaryExponent.binaryMantissa, shiftedMinMantissa).reverse().join("");

    // Step 5: Normalise the mantissa
    if (bfRes.binaryMantissa.length - bfRes.mantissaBitsSize === 1) {
      bfRes.binaryMantissa = bfRes.binaryMantissa.substring(1);
    }
    if (bfRes.binaryMantissa.length - bfRes.mantissaBitsSize === 2) {
      bfRes.binaryMantissa = bfRes.binaryMantissa.substring(1);
      bfRes.binaryMantissa = bfRes.binaryMantissa.slice(0, -1);
    }

    console.log(
      "max:", bfMinBinaryExponent.number,
      shiftedMinMantissa,
      bfRes.binaryExponent,
      bfRes.binaryMantissa,
      bfRes.binaryMantissa.length,
      bfRes.computedNumber
    );
  }

  /**
   * Calculate the integer part of the number for the mantissa
   * 19.59375 => 19 => "10011"
   */
  private calculateBinaryIntegerMantissa() {
    // Get the integer part
    const front = Math.trunc(this.positiveNumber);
    let res = this._bh.decimalToBinary(front);

    // "10011".length - 1 => 5 - 1 => 4
    // -1 because we hide the first bit
    this._mantissaFloatPosition = res.length - 1;
    
    // Do not hide the first bit if the first bit is 0
    // for number included in [0, 1[
    if (this.positiveNumber >= 1) {
      res = res.substring(1);
    } else {
      // If the number is included in [0, 1[
      // then the position of the dot is calculated by finding the number of "jumps"
      // we have to do to to put this dot behind the first bit at 1
      //
      // Example with 0.09375:
      // binaryDecimalMantissa (0.09375) in binary      => 0|0|0|1|1000000000000000000
      // Get the position of the first bit at 1         => binaryDecimalMantissa.indexOf("1") + 1 => 4
      // We moved to the right so position is negative  => -4
      this._mantissaFloatPosition = -(this.binaryDecimalMantissa.indexOf("1") + 1);
    }

    this._binaryIntegerMantissa = res;

    // If the number is NaN there is no integer part
    if (Number.isNaN(this.number)) {
      this._binaryIntegerMantissa = "";
    }
  }

  /**
   * Calculate the decimal part of the number for the mantissa
   * 
   */
  private calculateBinaryDecimalMantissa() {
    let res = "";

    // Get the decimals of the number: decimals = 19.59375 - 19 = 0.59375
    let decimals = this.positiveNumber - Math.trunc(this.positiveNumber);

    // Get the number of bits dedicated to store the decimals in the mantissa
    const decimalsBitsSize = this.mantissaBitsSize - this.binaryIntegerMantissa.length - 1;

    // 0.59375 * 2 = 1.1875  => 1
    // 0.1875  * 2 = 0.375   => 0
    // 0.375   * 2 = 0.75    => 0
    // 0.75    * 2 = 1.5     => 1
    // 0.5     * 2 = 1       => 1
    for(let i = 0; i < decimalsBitsSize; i++) {
      decimals *= 2;

      if (decimals >= 1) {
        decimals -= 1;
        res += "1";
      } else {
        res += "0";
      }
    }

    // If the number is NaN then all the bit of the mantissa are equals to 1
    if (Number.isNaN(this.number)) {
      res = "".padEnd(decimalsBitsSize + 1, "1");
    }

    this._binaryDecimalMantissa = res;
  }

  /**
   * Concatenate the integer part of the mantissa and the decimals part
   */
  private calculateBinaryMantissa() {
    let res = this.binaryIntegerMantissa + this.binaryDecimalMantissa;
    
    // If the integer part is equal to 0
    // then remove the leading 0 from the complete mantissa
    // and hide the first bit (= 1)
    // 
    // res => "000011000000000000000000"
    // if binaryIntegerMantissa == "0" then:
    //    clean(res)    => removes leading 0 from 000011000000000000000000     => 11000000000000000000
    //    hideBit(res)  => hide the first bit (= 1) from 11000000000000000000  => 1000000000000000000 
    if (this.binaryIntegerMantissa === "0") {
      res = this._bh.clean(res);
      res = res.substring(1);
    }

    // Makes sure that the mantissa makes the right length (mantissaBitsSize) by adding 0 to the end
    res = res.padEnd(this.mantissaBitsSize, "0");

    this._binaryMantissa = res;
  }

  /**
   * Calculate the exponent in binary
   * e = binary(mantissaFloatPosition + bias)
   */
  private calculateBinaryExponent() {
    let exponent = this.mantissaFloatPosition + this.bias;

    // If the number is 0 then all the bits of the exponent are equals to 0
    if (this.number === 0) {
      exponent = 0;
    }

    // Convert the exponent to binary and add leading 0 to match the exponent bits size
    this._binaryExponent = this._bh.decimalToBinary(exponent).padStart(this.exponentBitsSize, "0");

    // If the number is NaN or Infinity then all the bits of the exponent are equals to 1
    if (Number.isNaN(this.number) || this.number === Infinity) {
      this._binaryExponent = "".padEnd(this.exponentBitsSize, "1");
    }
  }

  /**
   * Calculate the exponent bias based on the exponent bit size
   * b = 2 ^ (exponentBitsSize - 1) - 1;
   */
  private calculateBias() {
    this._bias = 2 ** (this.exponentBitsSize - 1) - 1;
  }
}

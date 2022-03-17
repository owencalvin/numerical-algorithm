import { BinaryHelper } from "./BinaryHelper";

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

  get bitsSize(): number {
    return this._bitsSize;
  }

  set bitsSize(value: number) {
    this._bitsSize = value;
  }

  get number(): number {
    return this._number;
  }

  set number(value: number) {
    this._number = value;

    this.calculateBias();
    this.calculateBinaryIntegerMantissa();
    this.calculateBinaryDecimalMantissa();
    this.calculateBinaryMantissa();
    this.calculateMantissaFloatPosition();
    this.calculateBinaryExponent();
  }

  /**
   * Get the mantissa bits size
   */
  get mantissaBitsSize(): number {
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
  get exponentBitsSize(): number {
    if (this.bitsSize < 8) {
      return 0;
    }

    // IEEE 754 2019 formula >= 128
    if (this.bitsSize >= 128) {
      return Math.round(4 * Math.log2(this.bitsSize)) - 13;
    }

    // A formula that matches the values for < 128
    return Math.round((Math.log2(this.bitsSize) - 1) ** (3 / 2));
  }

  get positiveNumber() {
    return Math.abs(this.number);
  }

  /**
   * Return the truncated integer part in binary
   * 0.09375  =>     "0"
   * 19.59375 => "10011"
   */
  get binaryIntegerMantissa() {
    return this._binaryIntegerMantissa;
  }

  get binaryDecimalMantissa(): string {
    return this._binaryDecimalMantissa;
  }

  get mantissaFloatPosition() {
    return this._mantissaFloatPosition;
  }

  get binaryExponent(): string {
    return this._binaryExponent;
  }

  get binaryMantissa(): string {
    return this._binaryMantissa;
  }

  get binaryFloatingNumber(): string {
    return this.binarySign + this.binaryExponent + this.binaryMantissa;
  }

  /**
   * Return the bias of the number based on the exponent bit size
   * b = 2 ^ (exponentBitsSize - 1) - 1
   */
  get bias(): number {
    return this._bias;
  }

  /**
   * Return the binary representation of the sign
   * 0 if number >= 0
   * 1 if number < 0
   */
  get binarySign(): "0" | "1" {
    return this.number < 0 ? "1" : "0"; 
  }

  private calculateBinaryIntegerMantissa() {
    // Get the int part
    const front = Math.trunc(this.positiveNumber);
    let res = this._bh.decimalToBinary(front);
    
    if (res !== "0") {
      res = res.substring(1);
    }

    this._binaryIntegerMantissa = res;
  }

  private calculateBinaryDecimalMantissa() {
    let res = "";
    let decimals = this.positiveNumber - Math.trunc(this.positiveNumber);
    const decimalsBitsSize = this.mantissaBitsSize - this.binaryIntegerMantissa.length - 1;

    for(let i = 0; i < decimalsBitsSize; i++) {
      decimals *= 2;

      if (decimals >= 1) {
        decimals -= 1;
        res += "1";
      } else {
        res += "0";
      }
    }

    this._binaryDecimalMantissa = res;
  }

  private calculateBinaryMantissa() {
    let res = this.binaryIntegerMantissa + this.binaryDecimalMantissa;
    
    if (this.binaryIntegerMantissa === "0") {
      res = this._bh.clean(res);
      res = res.substring(1);
    }

    res = res.padEnd(this.mantissaBitsSize, "0");

    this._binaryMantissa = res;
  }

  private calculateMantissaFloatPosition() {
    this._mantissaFloatPosition = this.binaryIntegerMantissa.length - 1;

    if (this.binaryIntegerMantissa === "0") {
      this._mantissaFloatPosition = -this.binaryDecimalMantissa.indexOf("1") - 1;
      console.log("a", this._mantissaFloatPosition);
    }
  }

  private calculateBinaryExponent() {
    const exponent = this.mantissaFloatPosition + this.bias;
    this._binaryExponent = this._bh.decimalToBinary(exponent).padStart(this.exponentBitsSize, "0");
  }

  private calculateBias() {
    this._bias = 2 ** (this.exponentBitsSize - 1) - 1;
  }
}
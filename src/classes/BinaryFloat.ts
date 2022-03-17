import { BinaryHelper } from "./BinaryHelper";

export class BinaryFloat {
  private _bitsSize = 32;
  private _number = 0;
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

  /**
   * Return the bias of the number based on the exponent bit size
   * b = 2 ^ (exponentBitsSize - 1) - 1
   */
  get bias(): number {
    return 2 ** (this.exponentBitsSize - 1) - 1;
  }

  /**
   * Return the binary representation of the sign
   * 0 if number >= 0
   * 1 if number < 0
   */
  get binarySign(): "0" | "1" {
    return this.number < 0 ? "1" : "0"; 
  }

  get binaryExponent(): string {
    const exponent = this.mantissaFloatPosition + this.bias;
    console.log(this.mantissaFloatPosition);
    return this._bh.decimalToBinary(exponent);
  }

  get binaryMantissaFront() {
    // Get the int part
    const front = Math.trunc(this.number);
    let res = this._bh.decimalToBinary(front);
    
    // Remove the first bit (hidden bit to 1)
    res = res.substring(1);

    return res;
  }

  get mantissaFloatPosition() {
    return this.binaryMantissaFront.length;
  }

  get binaryDecimalMantissa(): string {
    let res = "";
    let decimals = this.number - Math.trunc(this.number);
    const decimalsBitsSize = this.mantissaBitsSize - this.binaryMantissaFront.length;

    for(let i = 0; i < decimalsBitsSize; i++) {
      decimals *= 2;

      if (decimals >= 1) {
        decimals -= 1;
        res += "1";
      } else {
        res += "0";
      }
    }

    return res;
  }

  get binaryMantissa(): string {
    return this.binaryMantissaFront + this.binaryDecimalMantissa;
  }

  get binaryFloatingNumber(): string {
    return this.binarySign + this.binaryExponent + this.binaryMantissaFront + this.binaryDecimalMantissa;
  }
}
export class BinaryFloat {
  private _bitsSize = 64;
  private _number = 0;

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
   * Get the "mantisse" bits size
   */
  get precisionBitsSize(): number {
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

  get binaryExponent(): number {
    return 0;
  }

  get binaryPrecision(): number {
    return 0;
  }

  get binaryFloatingNumber(): string {
    return "";
  }
}
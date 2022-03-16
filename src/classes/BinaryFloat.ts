export class BinaryFloat {
  private _bitsSize = 64;

  get bitsSize(): number {
    return this._bitsSize;
  }

  set bitsSize(value: number) {
    this._bitsSize = value;
  }

  get precisionBitsSize(): number {
    if (this.bitsSize < 8) {
      return 0;
    }

    return this.bitsSize - this.exponentBitsSize - 1;
  }

  get exponentBitsSize(): number {
    if (this.bitsSize < 8) {
      return 0;
    }

    // IEEE 754 2019 formula >= 128
    if (this.bitsSize >= 128) {
      return Math.round(4 * Math.log2(this.bitsSize)) - 13;
    }
    // A formula that matches the values for < 128
    return Math.round((Math.log2(this.bitsSize) - 1) ^ (3 / 2));
  }

  get floatingNumber() {
    return 0;
  }
}
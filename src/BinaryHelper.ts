export class BinaryHelper {
  private _n: number;

  constructor(n: number) {
    this._n = n;
  }

  public getNBit(value: 1 | 0, n = this._n): string {
    let res = "";
    
    for (let i = 0; i < n; i++) {
      res += value;
    }

    return res;
  }

  public addPadding(b: string) {
    const size = this._n - b.length;

    for (let i = 0; i < size; i++) {
      b = "0" + b;
    }

    return b;
  }

  /**
   * Convert a number to it's binary representation
   * @param decimal The 
   * @returns The binary representation of the decimal number
   */
  public decimalToBinary(decimal: number) {
    return (decimal >>> 0).toString(2)
  }

  /**
   * Convert a binary representation of a number to a decimal number
   * @param binary The binary representation of a number
   * @returns The int representation of a binary number
   */
  public binaryToDecimal(binary: string) {
    return parseInt(binary, 2);
  }

  public elementaryAddition(x: string, y: string, carry = "0"): string[] {
    const res = Number(x) + Number(y) + Number(carry);

    switch (res) {
      // c = 1, x = 1, y = 1
      case 3:
        return ["1", "1"];
      case 2:
        return ["0", "1"];
      case 1:
        return ["1", "0"];
      // c = 0, x = 0, y = 0
      case 0:
        return ["0", "0"];
    }
  }

  public binaryAddition(b1: string, b2: string) {
    let res = "";
    let carry = "0";

    for (let i = this._n - 1; i >= 0; i--) {
      const [r, c] = this.elementaryAddition(b1[i], b2[i], carry);
      res = r + res;
      carry = c;
    }

    return [res, carry];
  }

  public invert(b: string) {
    b = this.decimalToBinary(this.binaryToDecimal(b) ^ this.binaryToDecimal(this.getNBit(1)));
    b = this.addPadding(b);
    return b;
  }

  public addOne(b: string) {
    return this.binaryAddition(b, this.getNBit(0, 7) + "1")[0];
  }

  public binarySubstraction(b1: string, b2: string) {
    b2 = this.invert(b2);
    b2 = this.addOne(b2);

    const res = this.binaryAddition(b1, b2);
    res[0] = this.invert(res[0]);
    res[0] = this.addOne(res[0]);
    return res;
  }
}

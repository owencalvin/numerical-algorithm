export class BinaryHelper {
  private _n: number;

  constructor(n: number) {
    this._n = n;
  }

  public getNBit(value: 1 | 0) {
    let res = "";
    
    for (let i = 0; i < this._n; i++) {
      res += value;
    }

    return Number(res);
  }

  /**
   * Convert a number to it's binary representation
   * @param decimal The 
   * @returns The binary representation of the decimal number
   */
  public decimalToBinary(decimal: number) {
    // return (decimal >>> 0).toString(2)
  }

  /**
   * Convert a binary representation of a number to a decimal number
   * @param binary The binary representation of a number
   * @returns The int representation of a binary number
   */
  public binaryToDecimal(binary: string) {
    // return parseInt(binary, 2);
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
}

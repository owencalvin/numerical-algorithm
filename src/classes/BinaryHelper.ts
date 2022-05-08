/**
 * Labo: 0 (Binary operations)
 * Authors: Owen Gombas, David Darmanger, Julien Vaucher, Clément Petignat
 * Team: 2
 * School: HE-Arc
 * Date: 21 mars 2022
 * Course: Mathématiques spécifiques (Module 2234) - M. Stéphane Gobron
 */

/**
 * Performs basic operations on binary numbers
 */
export class BinaryHelper {
  /**
   * Get n bit of 0 or 1
   * @param value 1 or 0
   * @param n The number of bits to retrieve
   * @returns n bit of 0 or 1
   */
  public getNBit(value: 1 | 0, n: number): string {
    let res = "";
    
    for (let i = 0; i < n; i++) {
      res += value;
    }

    return res;
  }

  /**
   * Add n zeros before the binary number
   * @param n The number of 0 to add before the binary number
   * @param b The binary number
   * @returns The binary number with n zeros before
   */
  public addPadding(n: number, b = "") {
    const size = n - b.length;

    for (let i = 0; i < size; i++) {
      b = "0" + b;
    }

    return b;
  }

  /**
   * Removes the zeros before a binary number (000101 becomes 101)
   * @param b The binary number
   * @returns The produced binary number
   */
  public clean(b: string) {
    let res = b;

    for(let i = 0; i < b.length; i++) {
      if (b[i] === "0") {
        res = res.substring(1);
      } else {
        return res;
      }
    }

    if (res === "") {
      return "0";
    }
  }


  /**
   * Add 0 padding to the smallest binary number to match the longest one's length
   * [101, 11001] becomes [00101, 11001]
   * @param b1 The first binary number
   * @param b2 The second binary number
   * @returns [b1, b2] with correct padding
   */
  public addMaxPadding(b1: string, b2: string) {
    if (b2.length > b1.length) {
      b1 = this.addPadding(b2.length, b1);
    } else if (b1.length > b2.length) {
      b2 = this.addPadding(b1.length, b2);
    }

    return [b1, b2];
  }

  /**
   * Get the max length of two binaries numbers
   * @param b1 The first binary number
   * @param b2 The second binary number
   * @returns The max length
   */
  public getMaxLength(b1: string, b2: string) {
    if (b1.length > b2.length) {
      return b1.length;
    }
    return b2.length;
  }

  /**
   * Convert a number to it's binary representation
   * @param decimal The 
   * @returns The binary representation of the decimal number
   */
  public decimalToBinary(decimal: number) {
    const originalNumber = decimal;
    let binaryNumber = (Math.abs(decimal) >>> 0).toString(2);

    if (originalNumber < 0) {
      binaryNumber = this.c2(binaryNumber).reverse().join("");
    }

    return binaryNumber;
  }

  /**
   * Convert a binary representation of a number to a decimal number
   * @param binary The binary representation of a number
   * @returns The int representation of a binary number
   */
  public binaryToDecimal(binary: string) {
    return parseInt(binary, 2);
  }

  /**
   * Add int to a binary number
   * @param b The binary number
   * @param n The int number to add to the binary number
   * @returns The produced result
   */
  public addNumberToBinary(b: string, n: number): string[] {
    return this.binaryAddition(b, this.decimalToBinary(n));
  }

  /**
   * Invert a binary number
   * @param b The binary number to invert
   * @returns The invert binary number
   */
  public invert(b: string) {
    const initialLength = b.length;
    b = this.decimalToBinary(this.binaryToDecimal(b) ^ this.binaryToDecimal(this.getNBit(1, b.length)));
    b = this.addPadding(initialLength, b);
    return b;
  }

  /**
   * Shift the binary number to the right
   * @param b The binary number
   * @param shiftValue The shift value
   * @returns The shifted binary number
   */
  public shiftRight(b: string, shiftValue: number) {
    // "000001010" >> 2 => "000000010"
    // 1. Removes lasts <shiftValue> bits
    // 2. Places <shiftValue> bits at 0 before

    if (shiftValue < 1) {
      return b;
    }

    let res = b;
    res = res.slice(0, -shiftValue);
    res = "".padStart(shiftValue, "0") + res;

    return res;
  }

  /**
   * Shift the binary number to the left
   * @param b The binary number
   * @param shiftValue The shift value
   * @returns The shifted binary number
   */
  public shiftLeft(b: string, shiftValue: number) {
    // "000001010" << 2 => "00000101000"
    // 1. Removes lasts <shiftValue> bits
    // 2. Places <shiftValue> bits at 0 before

    if (shiftValue < 1) {
      return b;
    }

    let res = b;
    res = res.slice(shiftValue);
    res += "".padEnd(shiftValue, "0");

    return res;
  }

  /**
   * Add 2 bit together with the carry
   * @param x The first bit
   * @param y The second bit
   * @param carry The carry
   * @returns The result with the carry [bit, carry]
   */
  public elementaryAddition(x: string, y: string, carry = ""): string[] {
    const res = Number(x) + Number(y) + Number(carry);

    switch (res) {
      // c = 1, x = 1, y = 1
      case 3:
        return ["1", "1"];
      case 2:
        return ["0", "1"];
      case 1:
        return ["1", ""];
      // c = 0, x = 0, y = 0
      case 0:
        return ["0", ""];
    }
  }

  /**
   * Add 2 binary numbers
   * @param b1 The first binary number
   * @param b2 The second binary number
   * @returns The result of the addition [binaryNumber, carryBit]
   */
  public binaryAddition(b1: string, b2: string) {
    let res = "";
    let carry = "";
    const [bp1, bp2] = this.addMaxPadding(b1, b2);

    for (let i = bp1.length - 1; i >= 0; i--) {
      const [r, c] = this.elementaryAddition(bp1[i], bp2[i], carry);
      res = r + res;
      carry = c;
    }

    return [res, carry];
  }

  /**
   * Substract 2 binary numbers
   * @param b1 The first binary number
   * @param b2 The second binary number
   * @returns The result of the substraction [binaryNumber, carryBit]
   */
  public binarySubstraction(b1: string, b2: string) {
    const [bp1, bp2] = this.addMaxPadding(b1, b2);
    return this.binaryAddition(bp1, this.c2(bp2).reverse().join(""));
  }

  /**
   * Perform a 2's complement operation without the carry
   * @param b The binary number
   * @returns The 2's complement of the binary number [binaryNumber, carry]
   */
  public c2(b: string): string[] {
    b = this.invert(b);
    return this.addNumberToBinary(b, 1);
  }

  /**
   * Multiply 2 binary numbers
   * @param b1 The first binary number
   * @param b2 The second binary number
   * @returns The result of the multiplication
   */
  public binaryMultiplication(b1: string, b2: string) {
    let res = "";
    const addResults = [];

    // The binary numbers to mulitply
    // bp1 = 1011
    // bp2 = 1111
    const [bp1, bp2] = this.addMaxPadding(b1, b2);

    // Calculate the operands
    // addResults = [
    //    0000 1011,
    //    0001 0110,
    //    0010 1100,
    //    1011 0000
    // ]
    for (let i = bp1.length - 1; i >= 0; i--) {
      let currentRes = "";

      for (let j = bp1.length - 1; j >= 0; j--) {
        currentRes = (Number(bp1[j]) * Number(bp2[i])) + currentRes;
      }

      const dec = this.binaryToDecimal(currentRes) << (bp1.length - 1 - i);
      currentRes = this.decimalToBinary(dec);
      addResults.push(currentRes);
    }

    // Add everything
    // res =
    //   0000 1011,
    // + 0001 0110,
    // + 0010 1100,
    // + 1011 0000
    for (let i = 0; i < addResults.length; i++) {
      const addResult = this.addPadding(addResults[addResults.length - 1].length, addResults[i]);
      const [r, c] = this.binaryAddition(res, addResult);
      res = c + r;
    }

    // res = 10100101
    return res;
  }
}

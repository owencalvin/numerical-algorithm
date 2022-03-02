export class BinaryHelper {
  /**
   * Convert a number to it's binary representation
   * @param decimal The 
   * @returns The binary representation of the decimal number
   */
  public static toBinary(decimal: number) {
    return (decimal >>> 0).toString(2)
  }
}

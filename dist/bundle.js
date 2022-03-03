/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/BinaryHelper.ts
var BinaryHelper = /** @class */ (function () {
    function BinaryHelper() {
    }
    /**
     * Get n bit of 0 or 1
     * @param value 1 or 0
     * @param n The number of bits to retrieve
     * @returns n bit of 0 or 1
     */
    BinaryHelper.prototype.getNBit = function (value, n) {
        var res = "";
        for (var i = 0; i < n; i++) {
            res += value;
        }
        return res;
    };
    /**
     * Add n zeros before the binary number
     * @param n The number of 0 to add before the binary number
     * @param b The binary number
     * @returns The binary number with n zeros before
     */
    BinaryHelper.prototype.addPadding = function (n, b) {
        if (b === void 0) { b = ""; }
        var size = n - b.length;
        for (var i = 0; i < size; i++) {
            b = "0" + b;
        }
        return b;
    };
    /**
     * Removes the zeros before a binary number (000101 becomes 101)
     * @param b The binary number
     * @returns The produced binary number
     */
    BinaryHelper.prototype.clean = function (b) {
        var res = b;
        for (var i = 0; i < b.length; i++) {
            if (b[i] === "0") {
                res = res.substring(1);
            }
            else {
                return res;
            }
        }
    };
    /**
     * Add 0 padding to the smallest binary number to match the longest one's length
     * [101, 11001] becomes [00101, 11001]
     * @param b1 The first binary number
     * @param b2 The second binary number
     * @returns [b1, b2] with correct padding
     */
    BinaryHelper.prototype.addMaxPadding = function (b1, b2) {
        if (b2.length > b1.length) {
            b1 = this.addPadding(b2.length, b1);
        }
        else if (b1.length > b2.length) {
            b2 = this.addPadding(b1.length, b2);
        }
        return [b1, b2];
    };
    /**
     * Convert a number to it's binary representation
     * @param decimal The
     * @returns The binary representation of the decimal number
     */
    BinaryHelper.prototype.decimalToBinary = function (decimal) {
        return (decimal >>> 0).toString(2);
    };
    /**
     * Convert a binary representation of a number to a decimal number
     * @param binary The binary representation of a number
     * @returns The int representation of a binary number
     */
    BinaryHelper.prototype.binaryToDecimal = function (binary) {
        return parseInt(binary, 2);
    };
    /**
     * Add 1 to a binary number
     * @param b The binary number
     * @param n The int number to add to the binary number
     * @returns The produced result
     */
    BinaryHelper.prototype.add = function (b, n) {
        return this.binaryAddition(b, this.decimalToBinary(n))[0];
    };
    /**
     * Invert a binary number
     * @param b The binary number to invert
     * @returns The invert binary number
     */
    BinaryHelper.prototype.invert = function (b) {
        b = this.decimalToBinary(this.binaryToDecimal(b) ^ this.binaryToDecimal(this.getNBit(1, b.length)));
        return b;
    };
    /**
     * Add 2 bit together with the carry
     * @param x The first bit
     * @param y The second bit
     * @param carry The carry
     * @returns The result with the carry [bit, carry]
     */
    BinaryHelper.prototype.elementaryAddition = function (x, y, carry) {
        if (carry === void 0) { carry = "0"; }
        var res = Number(x) + Number(y) + Number(carry);
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
    };
    /**
     * Add 2 binary numbers
     * @param b1 The first binary number
     * @param b2 The second binary number
     * @returns The result of the addition
     */
    BinaryHelper.prototype.binaryAddition = function (b1, b2) {
        var res = "";
        var carry = "0";
        var _a = this.addMaxPadding(b1, b2), bp1 = _a[0], bp2 = _a[1];
        for (var i = bp1.length - 1; i >= 0; i--) {
            var _b = this.elementaryAddition(bp1[i], bp2[i], carry), r = _b[0], c = _b[1];
            res = r + res;
            carry = c;
        }
        return [res, carry];
    };
    /**
     * Substract 2 binary numbers
     * @param b1 The first binary number
     * @param b2 The second binary number
     * @returns The result of the substraction
     */
    BinaryHelper.prototype.binarySubstraction = function (b1, b2) {
        b2 = this.invert(b2);
        b2 = this.add(b2, 1);
        var res = this.binaryAddition(b1, b2);
        res[0] = this.invert(res[0]);
        res[0] = this.add(res[0], 1);
        return res;
    };
    /**
     * Multiply 2 binary numbers
     * @param b1 The first binary number
     * @param b2 The second binary number
     * @returns The result of the multiplication
     */
    BinaryHelper.prototype.binaryMultiplication = function (b1, b2) {
        var res = "";
        var addResults = [];
        // The binary numbers to mulitply
        // bp1 = 1011
        // bp2 = 1111
        var _a = this.addMaxPadding(b1, b2), bp1 = _a[0], bp2 = _a[1];
        // Calculate the operands
        // addResults = [
        //    0000 1011,
        //    0001 0110,
        //    0010 1100,
        //    1011 0000
        // ]
        for (var i = bp1.length - 1; i >= 0; i--) {
            var currentRes = "";
            for (var j = bp1.length - 1; j >= 0; j--) {
                currentRes = (Number(bp1[j]) * Number(bp2[i])) + currentRes;
            }
            var dec = this.binaryToDecimal(currentRes) << (bp1.length - 1 - i);
            currentRes = this.decimalToBinary(dec);
            addResults.push(currentRes);
        }
        // Add everything
        // res =
        //   0000 1011,
        // + 0001 0110,
        // + 0010 1100,
        // + 1011 0000
        for (var i = 0; i < addResults.length; i++) {
            var addResult = this.addPadding(addResults[addResults.length - 1].length, addResults[i]);
            var _b = this.binaryAddition(res, addResult), r = _b[0], c = _b[1];
            res = c + r;
        }
        // res = 10100101
        return res;
    };
    return BinaryHelper;
}());


;// CONCATENATED MODULE: ./src/index.ts

var bh = new BinaryHelper();
var resAdd = bh.binaryAddition("00111111", "11100011");
var resSub = bh.binarySubstraction("10101000", "11111101");
var resMul = bh.binaryMultiplication("1011", "1111");
console.log(resAdd);
console.log(resSub);
console.log(resMul);

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LENBQUM7SUFDSCxtQkFBQztBQUFELENBQUM7Ozs7QUN2TjZDO0FBRTlDLElBQU0sRUFBRSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7QUFFOUIsSUFBTSxNQUFNLEdBQUcsRUFBRSxDQUFDLGNBQWMsQ0FBQyxVQUFVLEVBQUUsVUFBVSxDQUFDLENBQUM7QUFDekQsSUFBTSxNQUFNLEdBQUcsRUFBRSxDQUFDLGtCQUFrQixDQUFDLFVBQVUsRUFBRSxVQUFVLENBQUMsQ0FBQztBQUM3RCxJQUFNLE1BQU0sR0FBRyxFQUFFLENBQUMsb0JBQW9CLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0FBRXZELE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDcEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUNwQixPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbWF0aF9zcGUvLi9zcmMvQmluYXJ5SGVscGVyLnRzIiwid2VicGFjazovL21hdGhfc3BlLy4vc3JjL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBCaW5hcnlIZWxwZXIge1xuICAvKipcbiAgICogR2V0IG4gYml0IG9mIDAgb3IgMVxuICAgKiBAcGFyYW0gdmFsdWUgMSBvciAwXG4gICAqIEBwYXJhbSBuIFRoZSBudW1iZXIgb2YgYml0cyB0byByZXRyaWV2ZVxuICAgKiBAcmV0dXJucyBuIGJpdCBvZiAwIG9yIDFcbiAgICovXG4gIHB1YmxpYyBnZXROQml0KHZhbHVlOiAxIHwgMCwgbjogbnVtYmVyKTogc3RyaW5nIHtcbiAgICBsZXQgcmVzID0gXCJcIjtcbiAgICBcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG47IGkrKykge1xuICAgICAgcmVzICs9IHZhbHVlO1xuICAgIH1cblxuICAgIHJldHVybiByZXM7XG4gIH1cblxuICAvKipcbiAgICogQWRkIG4gemVyb3MgYmVmb3JlIHRoZSBiaW5hcnkgbnVtYmVyXG4gICAqIEBwYXJhbSBuIFRoZSBudW1iZXIgb2YgMCB0byBhZGQgYmVmb3JlIHRoZSBiaW5hcnkgbnVtYmVyXG4gICAqIEBwYXJhbSBiIFRoZSBiaW5hcnkgbnVtYmVyXG4gICAqIEByZXR1cm5zIFRoZSBiaW5hcnkgbnVtYmVyIHdpdGggbiB6ZXJvcyBiZWZvcmVcbiAgICovXG4gIHB1YmxpYyBhZGRQYWRkaW5nKG46IG51bWJlciwgYiA9IFwiXCIpIHtcbiAgICBjb25zdCBzaXplID0gbiAtIGIubGVuZ3RoO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaXplOyBpKyspIHtcbiAgICAgIGIgPSBcIjBcIiArIGI7XG4gICAgfVxuXG4gICAgcmV0dXJuIGI7XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlcyB0aGUgemVyb3MgYmVmb3JlIGEgYmluYXJ5IG51bWJlciAoMDAwMTAxIGJlY29tZXMgMTAxKVxuICAgKiBAcGFyYW0gYiBUaGUgYmluYXJ5IG51bWJlclxuICAgKiBAcmV0dXJucyBUaGUgcHJvZHVjZWQgYmluYXJ5IG51bWJlclxuICAgKi9cbiAgcHVibGljIGNsZWFuKGI6IHN0cmluZykge1xuICAgIGxldCByZXMgPSBiO1xuXG4gICAgZm9yKGxldCBpID0gMDsgaSA8IGIubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChiW2ldID09PSBcIjBcIikge1xuICAgICAgICByZXMgPSByZXMuc3Vic3RyaW5nKDEpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHJlcztcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuXG4gIC8qKlxuICAgKiBBZGQgMCBwYWRkaW5nIHRvIHRoZSBzbWFsbGVzdCBiaW5hcnkgbnVtYmVyIHRvIG1hdGNoIHRoZSBsb25nZXN0IG9uZSdzIGxlbmd0aFxuICAgKiBbMTAxLCAxMTAwMV0gYmVjb21lcyBbMDAxMDEsIDExMDAxXVxuICAgKiBAcGFyYW0gYjEgVGhlIGZpcnN0IGJpbmFyeSBudW1iZXJcbiAgICogQHBhcmFtIGIyIFRoZSBzZWNvbmQgYmluYXJ5IG51bWJlclxuICAgKiBAcmV0dXJucyBbYjEsIGIyXSB3aXRoIGNvcnJlY3QgcGFkZGluZ1xuICAgKi9cbiAgcHVibGljIGFkZE1heFBhZGRpbmcoYjE6IHN0cmluZywgYjI6IHN0cmluZykge1xuICAgIGlmIChiMi5sZW5ndGggPiBiMS5sZW5ndGgpIHtcbiAgICAgIGIxID0gdGhpcy5hZGRQYWRkaW5nKGIyLmxlbmd0aCwgYjEpO1xuICAgIH0gZWxzZSBpZiAoYjEubGVuZ3RoID4gYjIubGVuZ3RoKSB7XG4gICAgICBiMiA9IHRoaXMuYWRkUGFkZGluZyhiMS5sZW5ndGgsIGIyKTtcbiAgICB9XG5cbiAgICByZXR1cm4gW2IxLCBiMl07XG4gIH1cblxuICAvKipcbiAgICogQ29udmVydCBhIG51bWJlciB0byBpdCdzIGJpbmFyeSByZXByZXNlbnRhdGlvblxuICAgKiBAcGFyYW0gZGVjaW1hbCBUaGUgXG4gICAqIEByZXR1cm5zIFRoZSBiaW5hcnkgcmVwcmVzZW50YXRpb24gb2YgdGhlIGRlY2ltYWwgbnVtYmVyXG4gICAqL1xuICBwdWJsaWMgZGVjaW1hbFRvQmluYXJ5KGRlY2ltYWw6IG51bWJlcikge1xuICAgIHJldHVybiAoZGVjaW1hbCA+Pj4gMCkudG9TdHJpbmcoMik7XG4gIH1cblxuICAvKipcbiAgICogQ29udmVydCBhIGJpbmFyeSByZXByZXNlbnRhdGlvbiBvZiBhIG51bWJlciB0byBhIGRlY2ltYWwgbnVtYmVyXG4gICAqIEBwYXJhbSBiaW5hcnkgVGhlIGJpbmFyeSByZXByZXNlbnRhdGlvbiBvZiBhIG51bWJlclxuICAgKiBAcmV0dXJucyBUaGUgaW50IHJlcHJlc2VudGF0aW9uIG9mIGEgYmluYXJ5IG51bWJlclxuICAgKi9cbiAgcHVibGljIGJpbmFyeVRvRGVjaW1hbChiaW5hcnk6IHN0cmluZykge1xuICAgIHJldHVybiBwYXJzZUludChiaW5hcnksIDIpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZCAxIHRvIGEgYmluYXJ5IG51bWJlclxuICAgKiBAcGFyYW0gYiBUaGUgYmluYXJ5IG51bWJlclxuICAgKiBAcGFyYW0gbiBUaGUgaW50IG51bWJlciB0byBhZGQgdG8gdGhlIGJpbmFyeSBudW1iZXJcbiAgICogQHJldHVybnMgVGhlIHByb2R1Y2VkIHJlc3VsdFxuICAgKi9cbiAgcHVibGljIGFkZChiOiBzdHJpbmcsIG46IG51bWJlcik6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuYmluYXJ5QWRkaXRpb24oYiwgdGhpcy5kZWNpbWFsVG9CaW5hcnkobikpWzBdO1xuICB9XG5cbiAgLyoqXG4gICAqIEludmVydCBhIGJpbmFyeSBudW1iZXJcbiAgICogQHBhcmFtIGIgVGhlIGJpbmFyeSBudW1iZXIgdG8gaW52ZXJ0XG4gICAqIEByZXR1cm5zIFRoZSBpbnZlcnQgYmluYXJ5IG51bWJlclxuICAgKi9cbiAgcHVibGljIGludmVydChiOiBzdHJpbmcpIHtcbiAgICBiID0gdGhpcy5kZWNpbWFsVG9CaW5hcnkodGhpcy5iaW5hcnlUb0RlY2ltYWwoYikgXiB0aGlzLmJpbmFyeVRvRGVjaW1hbCh0aGlzLmdldE5CaXQoMSwgYi5sZW5ndGgpKSk7XG4gICAgcmV0dXJuIGI7XG4gIH1cblxuICAvKipcbiAgICogQWRkIDIgYml0IHRvZ2V0aGVyIHdpdGggdGhlIGNhcnJ5XG4gICAqIEBwYXJhbSB4IFRoZSBmaXJzdCBiaXRcbiAgICogQHBhcmFtIHkgVGhlIHNlY29uZCBiaXRcbiAgICogQHBhcmFtIGNhcnJ5IFRoZSBjYXJyeVxuICAgKiBAcmV0dXJucyBUaGUgcmVzdWx0IHdpdGggdGhlIGNhcnJ5IFtiaXQsIGNhcnJ5XVxuICAgKi9cbiAgcHVibGljIGVsZW1lbnRhcnlBZGRpdGlvbih4OiBzdHJpbmcsIHk6IHN0cmluZywgY2FycnkgPSBcIjBcIik6IHN0cmluZ1tdIHtcbiAgICBjb25zdCByZXMgPSBOdW1iZXIoeCkgKyBOdW1iZXIoeSkgKyBOdW1iZXIoY2FycnkpO1xuXG4gICAgc3dpdGNoIChyZXMpIHtcbiAgICAgIC8vIGMgPSAxLCB4ID0gMSwgeSA9IDFcbiAgICAgIGNhc2UgMzpcbiAgICAgICAgcmV0dXJuIFtcIjFcIiwgXCIxXCJdO1xuICAgICAgY2FzZSAyOlxuICAgICAgICByZXR1cm4gW1wiMFwiLCBcIjFcIl07XG4gICAgICBjYXNlIDE6XG4gICAgICAgIHJldHVybiBbXCIxXCIsIFwiMFwiXTtcbiAgICAgIC8vIGMgPSAwLCB4ID0gMCwgeSA9IDBcbiAgICAgIGNhc2UgMDpcbiAgICAgICAgcmV0dXJuIFtcIjBcIiwgXCIwXCJdO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBBZGQgMiBiaW5hcnkgbnVtYmVyc1xuICAgKiBAcGFyYW0gYjEgVGhlIGZpcnN0IGJpbmFyeSBudW1iZXJcbiAgICogQHBhcmFtIGIyIFRoZSBzZWNvbmQgYmluYXJ5IG51bWJlclxuICAgKiBAcmV0dXJucyBUaGUgcmVzdWx0IG9mIHRoZSBhZGRpdGlvblxuICAgKi9cbiAgcHVibGljIGJpbmFyeUFkZGl0aW9uKGIxOiBzdHJpbmcsIGIyOiBzdHJpbmcpIHtcbiAgICBsZXQgcmVzID0gXCJcIjtcbiAgICBsZXQgY2FycnkgPSBcIjBcIjtcbiAgICBjb25zdCBbYnAxLCBicDJdID0gdGhpcy5hZGRNYXhQYWRkaW5nKGIxLCBiMik7XG5cbiAgICBmb3IgKGxldCBpID0gYnAxLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICBjb25zdCBbciwgY10gPSB0aGlzLmVsZW1lbnRhcnlBZGRpdGlvbihicDFbaV0sIGJwMltpXSwgY2FycnkpO1xuICAgICAgcmVzID0gciArIHJlcztcbiAgICAgIGNhcnJ5ID0gYztcbiAgICB9XG5cbiAgICByZXR1cm4gW3JlcywgY2FycnldO1xuICB9XG5cbiAgLyoqXG4gICAqIFN1YnN0cmFjdCAyIGJpbmFyeSBudW1iZXJzXG4gICAqIEBwYXJhbSBiMSBUaGUgZmlyc3QgYmluYXJ5IG51bWJlclxuICAgKiBAcGFyYW0gYjIgVGhlIHNlY29uZCBiaW5hcnkgbnVtYmVyXG4gICAqIEByZXR1cm5zIFRoZSByZXN1bHQgb2YgdGhlIHN1YnN0cmFjdGlvblxuICAgKi9cbiAgcHVibGljIGJpbmFyeVN1YnN0cmFjdGlvbihiMTogc3RyaW5nLCBiMjogc3RyaW5nKSB7XG4gICAgYjIgPSB0aGlzLmludmVydChiMik7XG4gICAgYjIgPSB0aGlzLmFkZChiMiwgMSk7XG5cbiAgICBjb25zdCByZXMgPSB0aGlzLmJpbmFyeUFkZGl0aW9uKGIxLCBiMik7XG4gICAgcmVzWzBdID0gdGhpcy5pbnZlcnQocmVzWzBdKTtcbiAgICByZXNbMF0gPSB0aGlzLmFkZChyZXNbMF0sIDEpO1xuICAgIHJldHVybiByZXM7XG4gIH1cblxuICAvKipcbiAgICogTXVsdGlwbHkgMiBiaW5hcnkgbnVtYmVyc1xuICAgKiBAcGFyYW0gYjEgVGhlIGZpcnN0IGJpbmFyeSBudW1iZXJcbiAgICogQHBhcmFtIGIyIFRoZSBzZWNvbmQgYmluYXJ5IG51bWJlclxuICAgKiBAcmV0dXJucyBUaGUgcmVzdWx0IG9mIHRoZSBtdWx0aXBsaWNhdGlvblxuICAgKi9cbiAgcHVibGljIGJpbmFyeU11bHRpcGxpY2F0aW9uKGIxOiBzdHJpbmcsIGIyOiBzdHJpbmcpIHtcbiAgICBsZXQgcmVzID0gXCJcIlxuICAgIGNvbnN0IGFkZFJlc3VsdHMgPSBbXTtcblxuICAgIC8vIFRoZSBiaW5hcnkgbnVtYmVycyB0byBtdWxpdHBseVxuICAgIC8vIGJwMSA9IDEwMTFcbiAgICAvLyBicDIgPSAxMTExXG4gICAgY29uc3QgW2JwMSwgYnAyXSA9IHRoaXMuYWRkTWF4UGFkZGluZyhiMSwgYjIpO1xuXG4gICAgLy8gQ2FsY3VsYXRlIHRoZSBvcGVyYW5kc1xuICAgIC8vIGFkZFJlc3VsdHMgPSBbXG4gICAgLy8gICAgMDAwMCAxMDExLFxuICAgIC8vICAgIDAwMDEgMDExMCxcbiAgICAvLyAgICAwMDEwIDExMDAsXG4gICAgLy8gICAgMTAxMSAwMDAwXG4gICAgLy8gXVxuICAgIGZvciAobGV0IGkgPSBicDEubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgIGxldCBjdXJyZW50UmVzID0gXCJcIjtcblxuICAgICAgZm9yIChsZXQgaiA9IGJwMS5sZW5ndGggLSAxOyBqID49IDA7IGotLSkge1xuICAgICAgICBjdXJyZW50UmVzID0gKE51bWJlcihicDFbal0pICogTnVtYmVyKGJwMltpXSkpICsgY3VycmVudFJlcztcbiAgICAgIH1cblxuICAgICAgY29uc3QgZGVjID0gdGhpcy5iaW5hcnlUb0RlY2ltYWwoY3VycmVudFJlcykgPDwgKGJwMS5sZW5ndGggLSAxIC0gaSk7XG4gICAgICBjdXJyZW50UmVzID0gdGhpcy5kZWNpbWFsVG9CaW5hcnkoZGVjKTtcbiAgICAgIGFkZFJlc3VsdHMucHVzaChjdXJyZW50UmVzKTtcbiAgICB9XG5cbiAgICAvLyBBZGQgZXZlcnl0aGluZ1xuICAgIC8vIHJlcyA9XG4gICAgLy8gICAwMDAwIDEwMTEsXG4gICAgLy8gKyAwMDAxIDAxMTAsXG4gICAgLy8gKyAwMDEwIDExMDAsXG4gICAgLy8gKyAxMDExIDAwMDBcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFkZFJlc3VsdHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IGFkZFJlc3VsdCA9IHRoaXMuYWRkUGFkZGluZyhhZGRSZXN1bHRzW2FkZFJlc3VsdHMubGVuZ3RoIC0gMV0ubGVuZ3RoLCBhZGRSZXN1bHRzW2ldKTtcbiAgICAgIGNvbnN0IFtyLCBjXSA9IHRoaXMuYmluYXJ5QWRkaXRpb24ocmVzLCBhZGRSZXN1bHQpO1xuICAgICAgcmVzID0gYyArIHI7XG4gICAgfVxuXG4gICAgLy8gcmVzID0gMTAxMDAxMDFcbiAgICByZXR1cm4gcmVzO1xuICB9XG59XG4iLCJpbXBvcnQgeyBCaW5hcnlIZWxwZXIgfSBmcm9tIFwiLi9CaW5hcnlIZWxwZXJcIjtcblxuY29uc3QgYmggPSBuZXcgQmluYXJ5SGVscGVyKCk7XG5cbmNvbnN0IHJlc0FkZCA9IGJoLmJpbmFyeUFkZGl0aW9uKFwiMDAxMTExMTFcIiwgXCIxMTEwMDAxMVwiKTtcbmNvbnN0IHJlc1N1YiA9IGJoLmJpbmFyeVN1YnN0cmFjdGlvbihcIjEwMTAxMDAwXCIsIFwiMTExMTExMDFcIik7XG5jb25zdCByZXNNdWwgPSBiaC5iaW5hcnlNdWx0aXBsaWNhdGlvbihcIjEwMTFcIiwgXCIxMTExXCIpO1xuXG5jb25zb2xlLmxvZyhyZXNBZGQpO1xuY29uc29sZS5sb2cocmVzU3ViKTtcbmNvbnNvbGUubG9nKHJlc011bCk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=
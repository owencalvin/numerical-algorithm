/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/classes/BinaryHelper.ts
/**
 * Labo: 0 (Binary operations)
 * Authors: Owen Gombas, David Darmanger, Julien Vaucher, Clément Petignat
 * Team: 2
 * School: HE-Arc
 * Date: 21 mars 2022
 * Course: Mathématiques spécifiques (Module 2234) - M. Stéphane Gobron
 */
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
        if (res === "") {
            return "0";
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
     * Get the max length of two binaries numbers
     * @param b1 The first binary number
     * @param b2 The second binary number
     * @returns The max length
     */
    BinaryHelper.prototype.getMaxLength = function (b1, b2) {
        if (b1.length > b2.length) {
            return b1.length;
        }
        return b2.length;
    };
    /**
     * Convert a number to it's binary representation
     * @param decimal The
     * @returns The binary representation of the decimal number
     */
    BinaryHelper.prototype.decimalToBinary = function (decimal) {
        var originalNumber = decimal;
        var binaryNumber = (Math.abs(decimal) >>> 0).toString(2);
        if (originalNumber < 0) {
            binaryNumber = this.c2(binaryNumber).reverse().join("");
        }
        return binaryNumber;
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
     * Add int to a binary number
     * @param b The binary number
     * @param n The int number to add to the binary number
     * @returns The produced result
     */
    BinaryHelper.prototype.addNumberToBinary = function (b, n) {
        return this.binaryAddition(b, this.decimalToBinary(n));
    };
    /**
     * Invert a binary number
     * @param b The binary number to invert
     * @returns The invert binary number
     */
    BinaryHelper.prototype.invert = function (b) {
        var initialLength = b.length;
        b = this.decimalToBinary(this.binaryToDecimal(b) ^ this.binaryToDecimal(this.getNBit(1, b.length)));
        b = this.addPadding(initialLength, b);
        return b;
    };
    /**
     * Shift the binary number to the right
     * @param b The binary number
     * @param shiftValue The shift value
     * @returns The shifted binary number
     */
    BinaryHelper.prototype.shiftRight = function (b, shiftValue) {
        // "000001010" >> 2 => "000000010"
        // 1. Removes lasts <shiftValue> bits
        // 2. Places <shiftValue> bits at 0 before
        if (shiftValue < 1) {
            return b;
        }
        var res = b;
        res = res.slice(0, -shiftValue);
        res = "".padStart(shiftValue, "0") + res;
        return res;
    };
    /**
     * Shift the binary number to the left
     * @param b The binary number
     * @param shiftValue The shift value
     * @returns The shifted binary number
     */
    BinaryHelper.prototype.shiftLeft = function (b, shiftValue) {
        // "000001010" << 2 => "00000101000"
        // 1. Removes lasts <shiftValue> bits
        // 2. Places <shiftValue> bits at 0 before
        if (shiftValue < 1) {
            return b;
        }
        var res = b;
        res = res.slice(shiftValue);
        res += "".padEnd(shiftValue, "0");
        return res;
    };
    /**
     * Add 2 bit together with the carry
     * @param x The first bit
     * @param y The second bit
     * @param carry The carry
     * @returns The result with the carry [bit, carry]
     */
    BinaryHelper.prototype.elementaryAddition = function (x, y, carry) {
        if (carry === void 0) { carry = ""; }
        var res = Number(x) + Number(y) + Number(carry);
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
    };
    /**
     * Add 2 binary numbers
     * @param b1 The first binary number
     * @param b2 The second binary number
     * @returns The result of the addition [binaryNumber, carryBit]
     */
    BinaryHelper.prototype.binaryAddition = function (b1, b2) {
        var res = "";
        var carry = "";
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
     * @returns The result of the substraction [binaryNumber, carryBit]
     */
    BinaryHelper.prototype.binarySubstraction = function (b1, b2) {
        var _a = this.addMaxPadding(b1, b2), bp1 = _a[0], bp2 = _a[1];
        return this.binaryAddition(bp1, this.c2(bp2).reverse().join(""));
    };
    /**
     * Perform a 2's complement operation without the carry
     * @param b The binary number
     * @returns The 2's complement of the binary number [binaryNumber, carry]
     */
    BinaryHelper.prototype.c2 = function (b) {
        b = this.invert(b);
        return this.addNumberToBinary(b, 1);
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


;// CONCATENATED MODULE: ./src/labo0.ts
/**
 * Labo: 0 (Binary operations)
 * Authors: Owen Gombas, David Darmanger, Julien Vaucher, Clément Petignat
 * Team: 2
 * School: HE-Arc
 * Date: 21 mars 2022
 * Course: Mathématiques spécifiques (Module 2234) - M. Stéphane Gobron
 */

var bh = new BinaryHelper();
var inputA = document.getElementById("input-a");
var inputB = document.getElementById("input-b");
var mode = document.getElementById("mode");
var result = document.getElementById("result");
var regexBinary = /^[01]+$/;
function onChange() {
    var res = "";
    var a = inputA.value;
    var b = inputB.value;
    if (!a || !b) {
        result.innerHTML = "<span class=\"color-grey\">Veuillez renseigner tous les champs</span>";
        return;
    }
    if (!regexBinary.test(a) || !regexBinary.test(b)) {
        result.innerHTML = "<span class=\"color-grey\">Vos entr\u00E9es ne sont pas des nombres binaires</span>";
        return;
    }
    switch (mode.value) {
        case "add": {
            res = bh.binaryAddition(a, b).reverse().join("");
            res = bh.clean(res);
            break;
        }
        case "mult": {
            res = bh.binaryMultiplication(a, b);
            res = bh.clean(res);
            break;
        }
        case "sub": {
            res = bh.binarySubstraction(a, b)[0];
            res = bh.clean(res);
            break;
        }
    }
    result.innerHTML = res ? "R\u00E9sultat: <span class=\"mono\">".concat(res, "<span/>") : "Résultat: ...";
}
inputA.addEventListener("change", onChange);
inputB.addEventListener("change", onChange);
inputA.addEventListener("keyup", onChange);
inputB.addEventListener("keyup", onChange);
mode.addEventListener("change", onChange);
onChange();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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TSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxRQUFRLENBQUMsQ0FBQztBQUMzQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0FBQzNDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLENBQUM7QUFFMUMsUUFBUSxFQUFFLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9tYXRoX3NwZS8uL3NyYy9jbGFzc2VzL0JpbmFyeUhlbHBlci50cyIsIndlYnBhY2s6Ly9tYXRoX3NwZS8uL3NyYy9sYWJvMC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIExhYm86IDAgKEJpbmFyeSBvcGVyYXRpb25zKVxuICogQXV0aG9yczogT3dlbiBHb21iYXMsIERhdmlkIERhcm1hbmdlciwgSnVsaWVuIFZhdWNoZXIsIENsw6ltZW50IFBldGlnbmF0XG4gKiBUZWFtOiAyXG4gKiBTY2hvb2w6IEhFLUFyY1xuICogRGF0ZTogMjEgbWFycyAyMDIyXG4gKiBDb3Vyc2U6IE1hdGjDqW1hdGlxdWVzIHNww6ljaWZpcXVlcyAoTW9kdWxlIDIyMzQpIC0gTS4gU3TDqXBoYW5lIEdvYnJvblxuICovXG5cbmV4cG9ydCBjbGFzcyBCaW5hcnlIZWxwZXIge1xuICAvKipcbiAgICogR2V0IG4gYml0IG9mIDAgb3IgMVxuICAgKiBAcGFyYW0gdmFsdWUgMSBvciAwXG4gICAqIEBwYXJhbSBuIFRoZSBudW1iZXIgb2YgYml0cyB0byByZXRyaWV2ZVxuICAgKiBAcmV0dXJucyBuIGJpdCBvZiAwIG9yIDFcbiAgICovXG4gIHB1YmxpYyBnZXROQml0KHZhbHVlOiAxIHwgMCwgbjogbnVtYmVyKTogc3RyaW5nIHtcbiAgICBsZXQgcmVzID0gXCJcIjtcbiAgICBcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG47IGkrKykge1xuICAgICAgcmVzICs9IHZhbHVlO1xuICAgIH1cblxuICAgIHJldHVybiByZXM7XG4gIH1cblxuICAvKipcbiAgICogQWRkIG4gemVyb3MgYmVmb3JlIHRoZSBiaW5hcnkgbnVtYmVyXG4gICAqIEBwYXJhbSBuIFRoZSBudW1iZXIgb2YgMCB0byBhZGQgYmVmb3JlIHRoZSBiaW5hcnkgbnVtYmVyXG4gICAqIEBwYXJhbSBiIFRoZSBiaW5hcnkgbnVtYmVyXG4gICAqIEByZXR1cm5zIFRoZSBiaW5hcnkgbnVtYmVyIHdpdGggbiB6ZXJvcyBiZWZvcmVcbiAgICovXG4gIHB1YmxpYyBhZGRQYWRkaW5nKG46IG51bWJlciwgYiA9IFwiXCIpIHtcbiAgICBjb25zdCBzaXplID0gbiAtIGIubGVuZ3RoO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaXplOyBpKyspIHtcbiAgICAgIGIgPSBcIjBcIiArIGI7XG4gICAgfVxuXG4gICAgcmV0dXJuIGI7XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlcyB0aGUgemVyb3MgYmVmb3JlIGEgYmluYXJ5IG51bWJlciAoMDAwMTAxIGJlY29tZXMgMTAxKVxuICAgKiBAcGFyYW0gYiBUaGUgYmluYXJ5IG51bWJlclxuICAgKiBAcmV0dXJucyBUaGUgcHJvZHVjZWQgYmluYXJ5IG51bWJlclxuICAgKi9cbiAgcHVibGljIGNsZWFuKGI6IHN0cmluZykge1xuICAgIGxldCByZXMgPSBiO1xuXG4gICAgZm9yKGxldCBpID0gMDsgaSA8IGIubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChiW2ldID09PSBcIjBcIikge1xuICAgICAgICByZXMgPSByZXMuc3Vic3RyaW5nKDEpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHJlcztcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAocmVzID09PSBcIlwiKSB7XG4gICAgICByZXR1cm4gXCIwXCI7XG4gICAgfVxuICB9XG5cblxuICAvKipcbiAgICogQWRkIDAgcGFkZGluZyB0byB0aGUgc21hbGxlc3QgYmluYXJ5IG51bWJlciB0byBtYXRjaCB0aGUgbG9uZ2VzdCBvbmUncyBsZW5ndGhcbiAgICogWzEwMSwgMTEwMDFdIGJlY29tZXMgWzAwMTAxLCAxMTAwMV1cbiAgICogQHBhcmFtIGIxIFRoZSBmaXJzdCBiaW5hcnkgbnVtYmVyXG4gICAqIEBwYXJhbSBiMiBUaGUgc2Vjb25kIGJpbmFyeSBudW1iZXJcbiAgICogQHJldHVybnMgW2IxLCBiMl0gd2l0aCBjb3JyZWN0IHBhZGRpbmdcbiAgICovXG4gIHB1YmxpYyBhZGRNYXhQYWRkaW5nKGIxOiBzdHJpbmcsIGIyOiBzdHJpbmcpIHtcbiAgICBpZiAoYjIubGVuZ3RoID4gYjEubGVuZ3RoKSB7XG4gICAgICBiMSA9IHRoaXMuYWRkUGFkZGluZyhiMi5sZW5ndGgsIGIxKTtcbiAgICB9IGVsc2UgaWYgKGIxLmxlbmd0aCA+IGIyLmxlbmd0aCkge1xuICAgICAgYjIgPSB0aGlzLmFkZFBhZGRpbmcoYjEubGVuZ3RoLCBiMik7XG4gICAgfVxuXG4gICAgcmV0dXJuIFtiMSwgYjJdO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgbWF4IGxlbmd0aCBvZiB0d28gYmluYXJpZXMgbnVtYmVyc1xuICAgKiBAcGFyYW0gYjEgVGhlIGZpcnN0IGJpbmFyeSBudW1iZXJcbiAgICogQHBhcmFtIGIyIFRoZSBzZWNvbmQgYmluYXJ5IG51bWJlclxuICAgKiBAcmV0dXJucyBUaGUgbWF4IGxlbmd0aFxuICAgKi9cbiAgcHVibGljIGdldE1heExlbmd0aChiMTogc3RyaW5nLCBiMjogc3RyaW5nKSB7XG4gICAgaWYgKGIxLmxlbmd0aCA+IGIyLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIGIxLmxlbmd0aDtcbiAgICB9XG4gICAgcmV0dXJuIGIyLmxlbmd0aDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDb252ZXJ0IGEgbnVtYmVyIHRvIGl0J3MgYmluYXJ5IHJlcHJlc2VudGF0aW9uXG4gICAqIEBwYXJhbSBkZWNpbWFsIFRoZSBcbiAgICogQHJldHVybnMgVGhlIGJpbmFyeSByZXByZXNlbnRhdGlvbiBvZiB0aGUgZGVjaW1hbCBudW1iZXJcbiAgICovXG4gIHB1YmxpYyBkZWNpbWFsVG9CaW5hcnkoZGVjaW1hbDogbnVtYmVyKSB7XG4gICAgY29uc3Qgb3JpZ2luYWxOdW1iZXIgPSBkZWNpbWFsO1xuICAgIGxldCBiaW5hcnlOdW1iZXIgPSAoTWF0aC5hYnMoZGVjaW1hbCkgPj4+IDApLnRvU3RyaW5nKDIpO1xuXG4gICAgaWYgKG9yaWdpbmFsTnVtYmVyIDwgMCkge1xuICAgICAgYmluYXJ5TnVtYmVyID0gdGhpcy5jMihiaW5hcnlOdW1iZXIpLnJldmVyc2UoKS5qb2luKFwiXCIpO1xuICAgIH1cblxuICAgIHJldHVybiBiaW5hcnlOdW1iZXI7XG4gIH1cblxuICAvKipcbiAgICogQ29udmVydCBhIGJpbmFyeSByZXByZXNlbnRhdGlvbiBvZiBhIG51bWJlciB0byBhIGRlY2ltYWwgbnVtYmVyXG4gICAqIEBwYXJhbSBiaW5hcnkgVGhlIGJpbmFyeSByZXByZXNlbnRhdGlvbiBvZiBhIG51bWJlclxuICAgKiBAcmV0dXJucyBUaGUgaW50IHJlcHJlc2VudGF0aW9uIG9mIGEgYmluYXJ5IG51bWJlclxuICAgKi9cbiAgcHVibGljIGJpbmFyeVRvRGVjaW1hbChiaW5hcnk6IHN0cmluZykge1xuICAgIHJldHVybiBwYXJzZUludChiaW5hcnksIDIpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZCBpbnQgdG8gYSBiaW5hcnkgbnVtYmVyXG4gICAqIEBwYXJhbSBiIFRoZSBiaW5hcnkgbnVtYmVyXG4gICAqIEBwYXJhbSBuIFRoZSBpbnQgbnVtYmVyIHRvIGFkZCB0byB0aGUgYmluYXJ5IG51bWJlclxuICAgKiBAcmV0dXJucyBUaGUgcHJvZHVjZWQgcmVzdWx0XG4gICAqL1xuICBwdWJsaWMgYWRkTnVtYmVyVG9CaW5hcnkoYjogc3RyaW5nLCBuOiBudW1iZXIpOiBzdHJpbmdbXSB7XG4gICAgcmV0dXJuIHRoaXMuYmluYXJ5QWRkaXRpb24oYiwgdGhpcy5kZWNpbWFsVG9CaW5hcnkobikpO1xuICB9XG5cbiAgLyoqXG4gICAqIEludmVydCBhIGJpbmFyeSBudW1iZXJcbiAgICogQHBhcmFtIGIgVGhlIGJpbmFyeSBudW1iZXIgdG8gaW52ZXJ0XG4gICAqIEByZXR1cm5zIFRoZSBpbnZlcnQgYmluYXJ5IG51bWJlclxuICAgKi9cbiAgcHVibGljIGludmVydChiOiBzdHJpbmcpIHtcbiAgICBjb25zdCBpbml0aWFsTGVuZ3RoID0gYi5sZW5ndGg7XG4gICAgYiA9IHRoaXMuZGVjaW1hbFRvQmluYXJ5KHRoaXMuYmluYXJ5VG9EZWNpbWFsKGIpIF4gdGhpcy5iaW5hcnlUb0RlY2ltYWwodGhpcy5nZXROQml0KDEsIGIubGVuZ3RoKSkpO1xuICAgIGIgPSB0aGlzLmFkZFBhZGRpbmcoaW5pdGlhbExlbmd0aCwgYik7XG4gICAgcmV0dXJuIGI7XG4gIH1cblxuICAvKipcbiAgICogU2hpZnQgdGhlIGJpbmFyeSBudW1iZXIgdG8gdGhlIHJpZ2h0XG4gICAqIEBwYXJhbSBiIFRoZSBiaW5hcnkgbnVtYmVyXG4gICAqIEBwYXJhbSBzaGlmdFZhbHVlIFRoZSBzaGlmdCB2YWx1ZVxuICAgKiBAcmV0dXJucyBUaGUgc2hpZnRlZCBiaW5hcnkgbnVtYmVyXG4gICAqL1xuICBwdWJsaWMgc2hpZnRSaWdodChiOiBzdHJpbmcsIHNoaWZ0VmFsdWU6IG51bWJlcikge1xuICAgIC8vIFwiMDAwMDAxMDEwXCIgPj4gMiA9PiBcIjAwMDAwMDAxMFwiXG4gICAgLy8gMS4gUmVtb3ZlcyBsYXN0cyA8c2hpZnRWYWx1ZT4gYml0c1xuICAgIC8vIDIuIFBsYWNlcyA8c2hpZnRWYWx1ZT4gYml0cyBhdCAwIGJlZm9yZVxuXG4gICAgaWYgKHNoaWZ0VmFsdWUgPCAxKSB7XG4gICAgICByZXR1cm4gYjtcbiAgICB9XG5cbiAgICBsZXQgcmVzID0gYjtcbiAgICByZXMgPSByZXMuc2xpY2UoMCwgLXNoaWZ0VmFsdWUpO1xuICAgIHJlcyA9IFwiXCIucGFkU3RhcnQoc2hpZnRWYWx1ZSwgXCIwXCIpICsgcmVzO1xuXG4gICAgcmV0dXJuIHJlcztcbiAgfVxuXG4gIC8qKlxuICAgKiBTaGlmdCB0aGUgYmluYXJ5IG51bWJlciB0byB0aGUgbGVmdFxuICAgKiBAcGFyYW0gYiBUaGUgYmluYXJ5IG51bWJlclxuICAgKiBAcGFyYW0gc2hpZnRWYWx1ZSBUaGUgc2hpZnQgdmFsdWVcbiAgICogQHJldHVybnMgVGhlIHNoaWZ0ZWQgYmluYXJ5IG51bWJlclxuICAgKi9cbiAgcHVibGljIHNoaWZ0TGVmdChiOiBzdHJpbmcsIHNoaWZ0VmFsdWU6IG51bWJlcikge1xuICAgIC8vIFwiMDAwMDAxMDEwXCIgPDwgMiA9PiBcIjAwMDAwMTAxMDAwXCJcbiAgICAvLyAxLiBSZW1vdmVzIGxhc3RzIDxzaGlmdFZhbHVlPiBiaXRzXG4gICAgLy8gMi4gUGxhY2VzIDxzaGlmdFZhbHVlPiBiaXRzIGF0IDAgYmVmb3JlXG5cbiAgICBpZiAoc2hpZnRWYWx1ZSA8IDEpIHtcbiAgICAgIHJldHVybiBiO1xuICAgIH1cblxuICAgIGxldCByZXMgPSBiO1xuICAgIHJlcyA9IHJlcy5zbGljZShzaGlmdFZhbHVlKTtcbiAgICByZXMgKz0gXCJcIi5wYWRFbmQoc2hpZnRWYWx1ZSwgXCIwXCIpO1xuXG4gICAgcmV0dXJuIHJlcztcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGQgMiBiaXQgdG9nZXRoZXIgd2l0aCB0aGUgY2FycnlcbiAgICogQHBhcmFtIHggVGhlIGZpcnN0IGJpdFxuICAgKiBAcGFyYW0geSBUaGUgc2Vjb25kIGJpdFxuICAgKiBAcGFyYW0gY2FycnkgVGhlIGNhcnJ5XG4gICAqIEByZXR1cm5zIFRoZSByZXN1bHQgd2l0aCB0aGUgY2FycnkgW2JpdCwgY2FycnldXG4gICAqL1xuICBwdWJsaWMgZWxlbWVudGFyeUFkZGl0aW9uKHg6IHN0cmluZywgeTogc3RyaW5nLCBjYXJyeSA9IFwiXCIpOiBzdHJpbmdbXSB7XG4gICAgY29uc3QgcmVzID0gTnVtYmVyKHgpICsgTnVtYmVyKHkpICsgTnVtYmVyKGNhcnJ5KTtcblxuICAgIHN3aXRjaCAocmVzKSB7XG4gICAgICAvLyBjID0gMSwgeCA9IDEsIHkgPSAxXG4gICAgICBjYXNlIDM6XG4gICAgICAgIHJldHVybiBbXCIxXCIsIFwiMVwiXTtcbiAgICAgIGNhc2UgMjpcbiAgICAgICAgcmV0dXJuIFtcIjBcIiwgXCIxXCJdO1xuICAgICAgY2FzZSAxOlxuICAgICAgICByZXR1cm4gW1wiMVwiLCBcIlwiXTtcbiAgICAgIC8vIGMgPSAwLCB4ID0gMCwgeSA9IDBcbiAgICAgIGNhc2UgMDpcbiAgICAgICAgcmV0dXJuIFtcIjBcIiwgXCJcIl07XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEFkZCAyIGJpbmFyeSBudW1iZXJzXG4gICAqIEBwYXJhbSBiMSBUaGUgZmlyc3QgYmluYXJ5IG51bWJlclxuICAgKiBAcGFyYW0gYjIgVGhlIHNlY29uZCBiaW5hcnkgbnVtYmVyXG4gICAqIEByZXR1cm5zIFRoZSByZXN1bHQgb2YgdGhlIGFkZGl0aW9uIFtiaW5hcnlOdW1iZXIsIGNhcnJ5Qml0XVxuICAgKi9cbiAgcHVibGljIGJpbmFyeUFkZGl0aW9uKGIxOiBzdHJpbmcsIGIyOiBzdHJpbmcpIHtcbiAgICBsZXQgcmVzID0gXCJcIjtcbiAgICBsZXQgY2FycnkgPSBcIlwiO1xuICAgIGNvbnN0IFticDEsIGJwMl0gPSB0aGlzLmFkZE1heFBhZGRpbmcoYjEsIGIyKTtcblxuICAgIGZvciAobGV0IGkgPSBicDEubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgIGNvbnN0IFtyLCBjXSA9IHRoaXMuZWxlbWVudGFyeUFkZGl0aW9uKGJwMVtpXSwgYnAyW2ldLCBjYXJyeSk7XG4gICAgICByZXMgPSByICsgcmVzO1xuICAgICAgY2FycnkgPSBjO1xuICAgIH1cblxuICAgIHJldHVybiBbcmVzLCBjYXJyeV07XG4gIH1cblxuICAvKipcbiAgICogU3Vic3RyYWN0IDIgYmluYXJ5IG51bWJlcnNcbiAgICogQHBhcmFtIGIxIFRoZSBmaXJzdCBiaW5hcnkgbnVtYmVyXG4gICAqIEBwYXJhbSBiMiBUaGUgc2Vjb25kIGJpbmFyeSBudW1iZXJcbiAgICogQHJldHVybnMgVGhlIHJlc3VsdCBvZiB0aGUgc3Vic3RyYWN0aW9uIFtiaW5hcnlOdW1iZXIsIGNhcnJ5Qml0XVxuICAgKi9cbiAgcHVibGljIGJpbmFyeVN1YnN0cmFjdGlvbihiMTogc3RyaW5nLCBiMjogc3RyaW5nKSB7XG4gICAgY29uc3QgW2JwMSwgYnAyXSA9IHRoaXMuYWRkTWF4UGFkZGluZyhiMSwgYjIpO1xuICAgIHJldHVybiB0aGlzLmJpbmFyeUFkZGl0aW9uKGJwMSwgdGhpcy5jMihicDIpLnJldmVyc2UoKS5qb2luKFwiXCIpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQZXJmb3JtIGEgMidzIGNvbXBsZW1lbnQgb3BlcmF0aW9uIHdpdGhvdXQgdGhlIGNhcnJ5XG4gICAqIEBwYXJhbSBiIFRoZSBiaW5hcnkgbnVtYmVyXG4gICAqIEByZXR1cm5zIFRoZSAyJ3MgY29tcGxlbWVudCBvZiB0aGUgYmluYXJ5IG51bWJlciBbYmluYXJ5TnVtYmVyLCBjYXJyeV1cbiAgICovXG4gIHB1YmxpYyBjMihiOiBzdHJpbmcpOiBzdHJpbmdbXSB7XG4gICAgYiA9IHRoaXMuaW52ZXJ0KGIpO1xuICAgIHJldHVybiB0aGlzLmFkZE51bWJlclRvQmluYXJ5KGIsIDEpO1xuICB9XG5cbiAgLyoqXG4gICAqIE11bHRpcGx5IDIgYmluYXJ5IG51bWJlcnNcbiAgICogQHBhcmFtIGIxIFRoZSBmaXJzdCBiaW5hcnkgbnVtYmVyXG4gICAqIEBwYXJhbSBiMiBUaGUgc2Vjb25kIGJpbmFyeSBudW1iZXJcbiAgICogQHJldHVybnMgVGhlIHJlc3VsdCBvZiB0aGUgbXVsdGlwbGljYXRpb25cbiAgICovXG4gIHB1YmxpYyBiaW5hcnlNdWx0aXBsaWNhdGlvbihiMTogc3RyaW5nLCBiMjogc3RyaW5nKSB7XG4gICAgbGV0IHJlcyA9IFwiXCI7XG4gICAgY29uc3QgYWRkUmVzdWx0cyA9IFtdO1xuXG4gICAgLy8gVGhlIGJpbmFyeSBudW1iZXJzIHRvIG11bGl0cGx5XG4gICAgLy8gYnAxID0gMTAxMVxuICAgIC8vIGJwMiA9IDExMTFcbiAgICBjb25zdCBbYnAxLCBicDJdID0gdGhpcy5hZGRNYXhQYWRkaW5nKGIxLCBiMik7XG5cbiAgICAvLyBDYWxjdWxhdGUgdGhlIG9wZXJhbmRzXG4gICAgLy8gYWRkUmVzdWx0cyA9IFtcbiAgICAvLyAgICAwMDAwIDEwMTEsXG4gICAgLy8gICAgMDAwMSAwMTEwLFxuICAgIC8vICAgIDAwMTAgMTEwMCxcbiAgICAvLyAgICAxMDExIDAwMDBcbiAgICAvLyBdXG4gICAgZm9yIChsZXQgaSA9IGJwMS5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgbGV0IGN1cnJlbnRSZXMgPSBcIlwiO1xuXG4gICAgICBmb3IgKGxldCBqID0gYnAxLmxlbmd0aCAtIDE7IGogPj0gMDsgai0tKSB7XG4gICAgICAgIGN1cnJlbnRSZXMgPSAoTnVtYmVyKGJwMVtqXSkgKiBOdW1iZXIoYnAyW2ldKSkgKyBjdXJyZW50UmVzO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBkZWMgPSB0aGlzLmJpbmFyeVRvRGVjaW1hbChjdXJyZW50UmVzKSA8PCAoYnAxLmxlbmd0aCAtIDEgLSBpKTtcbiAgICAgIGN1cnJlbnRSZXMgPSB0aGlzLmRlY2ltYWxUb0JpbmFyeShkZWMpO1xuICAgICAgYWRkUmVzdWx0cy5wdXNoKGN1cnJlbnRSZXMpO1xuICAgIH1cblxuICAgIC8vIEFkZCBldmVyeXRoaW5nXG4gICAgLy8gcmVzID1cbiAgICAvLyAgIDAwMDAgMTAxMSxcbiAgICAvLyArIDAwMDEgMDExMCxcbiAgICAvLyArIDAwMTAgMTEwMCxcbiAgICAvLyArIDEwMTEgMDAwMFxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYWRkUmVzdWx0cy5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgYWRkUmVzdWx0ID0gdGhpcy5hZGRQYWRkaW5nKGFkZFJlc3VsdHNbYWRkUmVzdWx0cy5sZW5ndGggLSAxXS5sZW5ndGgsIGFkZFJlc3VsdHNbaV0pO1xuICAgICAgY29uc3QgW3IsIGNdID0gdGhpcy5iaW5hcnlBZGRpdGlvbihyZXMsIGFkZFJlc3VsdCk7XG4gICAgICByZXMgPSBjICsgcjtcbiAgICB9XG5cbiAgICAvLyByZXMgPSAxMDEwMDEwMVxuICAgIHJldHVybiByZXM7XG4gIH1cbn1cbiIsIi8qKlxuICogTGFibzogMCAoQmluYXJ5IG9wZXJhdGlvbnMpXG4gKiBBdXRob3JzOiBPd2VuIEdvbWJhcywgRGF2aWQgRGFybWFuZ2VyLCBKdWxpZW4gVmF1Y2hlciwgQ2zDqW1lbnQgUGV0aWduYXRcbiAqIFRlYW06IDJcbiAqIFNjaG9vbDogSEUtQXJjXG4gKiBEYXRlOiAyMSBtYXJzIDIwMjJcbiAqIENvdXJzZTogTWF0aMOpbWF0aXF1ZXMgc3DDqWNpZmlxdWVzIChNb2R1bGUgMjIzNCkgLSBNLiBTdMOpcGhhbmUgR29icm9uXG4gKi9cblxuaW1wb3J0IHsgQmluYXJ5SGVscGVyIH0gZnJvbSBcIi4vY2xhc3Nlcy9CaW5hcnlIZWxwZXJcIjtcblxuY29uc3QgYmggPSBuZXcgQmluYXJ5SGVscGVyKCk7XG5cbmNvbnN0IGlucHV0QSA9IDxIVE1MSW5wdXRFbGVtZW50PmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaW5wdXQtYVwiKTtcbmNvbnN0IGlucHV0QiA9IDxIVE1MSW5wdXRFbGVtZW50PmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaW5wdXQtYlwiKTtcbmNvbnN0IG1vZGUgPSA8SFRNTFNlbGVjdEVsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtb2RlXCIpO1xuY29uc3QgcmVzdWx0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyZXN1bHRcIik7XG5jb25zdCByZWdleEJpbmFyeSA9IC9eWzAxXSskLztcblxuZnVuY3Rpb24gb25DaGFuZ2UoKSB7XG4gIGxldCByZXMgPSBcIlwiO1xuICBjb25zdCBhID0gaW5wdXRBLnZhbHVlO1xuICBjb25zdCBiID0gaW5wdXRCLnZhbHVlO1xuXG4gIGlmICghYSB8fCAhYikge1xuICAgIHJlc3VsdC5pbm5lckhUTUwgPSBgPHNwYW4gY2xhc3M9XCJjb2xvci1ncmV5XCI+VmV1aWxsZXogcmVuc2VpZ25lciB0b3VzIGxlcyBjaGFtcHM8L3NwYW4+YDtcbiAgICByZXR1cm47XG4gIH1cblxuICBpZiAoIXJlZ2V4QmluYXJ5LnRlc3QoYSkgfHwgIXJlZ2V4QmluYXJ5LnRlc3QoYikpIHtcbiAgICByZXN1bHQuaW5uZXJIVE1MID0gYDxzcGFuIGNsYXNzPVwiY29sb3ItZ3JleVwiPlZvcyBlbnRyw6llcyBuZSBzb250IHBhcyBkZXMgbm9tYnJlcyBiaW5haXJlczwvc3Bhbj5gO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHN3aXRjaCAobW9kZS52YWx1ZSkge1xuICAgIGNhc2UgXCJhZGRcIjoge1xuICAgICAgcmVzID0gYmguYmluYXJ5QWRkaXRpb24oYSwgYikucmV2ZXJzZSgpLmpvaW4oXCJcIik7XG4gICAgICByZXMgPSBiaC5jbGVhbihyZXMpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICAgIGNhc2UgXCJtdWx0XCI6IHtcbiAgICAgIHJlcyA9IGJoLmJpbmFyeU11bHRpcGxpY2F0aW9uKGEsIGIpO1xuICAgICAgcmVzID0gYmguY2xlYW4ocmVzKTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBjYXNlIFwic3ViXCI6IHtcbiAgICAgIHJlcyA9IGJoLmJpbmFyeVN1YnN0cmFjdGlvbihhLCBiKVswXTtcbiAgICAgIHJlcyA9IGJoLmNsZWFuKHJlcyk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICByZXN1bHQuaW5uZXJIVE1MID0gcmVzID8gYFLDqXN1bHRhdDogPHNwYW4gY2xhc3M9XCJtb25vXCI+JHtyZXN9PHNwYW4vPmAgOiBcIlLDqXN1bHRhdDogLi4uXCI7XG59XG5cbmlucHV0QS5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsIG9uQ2hhbmdlKTtcbmlucHV0Qi5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsIG9uQ2hhbmdlKTtcbmlucHV0QS5hZGRFdmVudExpc3RlbmVyKFwia2V5dXBcIiwgb25DaGFuZ2UpO1xuaW5wdXRCLmFkZEV2ZW50TGlzdGVuZXIoXCJrZXl1cFwiLCBvbkNoYW5nZSk7XG5tb2RlLmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgb25DaGFuZ2UpO1xuXG5vbkNoYW5nZSgpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9
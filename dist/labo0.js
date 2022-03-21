/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/classes/BinaryHelper.ts
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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USxDQUFDLENBQUM7QUFDM0MsTUFBTSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxRQUFRLENBQUMsQ0FBQztBQUMzQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0FBRTFDLFFBQVEsRUFBRSxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbWF0aF9zcGUvLi9zcmMvY2xhc3Nlcy9CaW5hcnlIZWxwZXIudHMiLCJ3ZWJwYWNrOi8vbWF0aF9zcGUvLi9zcmMvbGFibzAudHMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNsYXNzIEJpbmFyeUhlbHBlciB7XG4gIC8qKlxuICAgKiBHZXQgbiBiaXQgb2YgMCBvciAxXG4gICAqIEBwYXJhbSB2YWx1ZSAxIG9yIDBcbiAgICogQHBhcmFtIG4gVGhlIG51bWJlciBvZiBiaXRzIHRvIHJldHJpZXZlXG4gICAqIEByZXR1cm5zIG4gYml0IG9mIDAgb3IgMVxuICAgKi9cbiAgcHVibGljIGdldE5CaXQodmFsdWU6IDEgfCAwLCBuOiBudW1iZXIpOiBzdHJpbmcge1xuICAgIGxldCByZXMgPSBcIlwiO1xuICAgIFxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbjsgaSsrKSB7XG4gICAgICByZXMgKz0gdmFsdWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlcztcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGQgbiB6ZXJvcyBiZWZvcmUgdGhlIGJpbmFyeSBudW1iZXJcbiAgICogQHBhcmFtIG4gVGhlIG51bWJlciBvZiAwIHRvIGFkZCBiZWZvcmUgdGhlIGJpbmFyeSBudW1iZXJcbiAgICogQHBhcmFtIGIgVGhlIGJpbmFyeSBudW1iZXJcbiAgICogQHJldHVybnMgVGhlIGJpbmFyeSBudW1iZXIgd2l0aCBuIHplcm9zIGJlZm9yZVxuICAgKi9cbiAgcHVibGljIGFkZFBhZGRpbmcobjogbnVtYmVyLCBiID0gXCJcIikge1xuICAgIGNvbnN0IHNpemUgPSBuIC0gYi5sZW5ndGg7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNpemU7IGkrKykge1xuICAgICAgYiA9IFwiMFwiICsgYjtcbiAgICB9XG5cbiAgICByZXR1cm4gYjtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmVzIHRoZSB6ZXJvcyBiZWZvcmUgYSBiaW5hcnkgbnVtYmVyICgwMDAxMDEgYmVjb21lcyAxMDEpXG4gICAqIEBwYXJhbSBiIFRoZSBiaW5hcnkgbnVtYmVyXG4gICAqIEByZXR1cm5zIFRoZSBwcm9kdWNlZCBiaW5hcnkgbnVtYmVyXG4gICAqL1xuICBwdWJsaWMgY2xlYW4oYjogc3RyaW5nKSB7XG4gICAgbGV0IHJlcyA9IGI7XG5cbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgYi5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKGJbaV0gPT09IFwiMFwiKSB7XG4gICAgICAgIHJlcyA9IHJlcy5zdWJzdHJpbmcoMSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gcmVzO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChyZXMgPT09IFwiXCIpIHtcbiAgICAgIHJldHVybiBcIjBcIjtcbiAgICB9XG4gIH1cblxuXG4gIC8qKlxuICAgKiBBZGQgMCBwYWRkaW5nIHRvIHRoZSBzbWFsbGVzdCBiaW5hcnkgbnVtYmVyIHRvIG1hdGNoIHRoZSBsb25nZXN0IG9uZSdzIGxlbmd0aFxuICAgKiBbMTAxLCAxMTAwMV0gYmVjb21lcyBbMDAxMDEsIDExMDAxXVxuICAgKiBAcGFyYW0gYjEgVGhlIGZpcnN0IGJpbmFyeSBudW1iZXJcbiAgICogQHBhcmFtIGIyIFRoZSBzZWNvbmQgYmluYXJ5IG51bWJlclxuICAgKiBAcmV0dXJucyBbYjEsIGIyXSB3aXRoIGNvcnJlY3QgcGFkZGluZ1xuICAgKi9cbiAgcHVibGljIGFkZE1heFBhZGRpbmcoYjE6IHN0cmluZywgYjI6IHN0cmluZykge1xuICAgIGlmIChiMi5sZW5ndGggPiBiMS5sZW5ndGgpIHtcbiAgICAgIGIxID0gdGhpcy5hZGRQYWRkaW5nKGIyLmxlbmd0aCwgYjEpO1xuICAgIH0gZWxzZSBpZiAoYjEubGVuZ3RoID4gYjIubGVuZ3RoKSB7XG4gICAgICBiMiA9IHRoaXMuYWRkUGFkZGluZyhiMS5sZW5ndGgsIGIyKTtcbiAgICB9XG5cbiAgICByZXR1cm4gW2IxLCBiMl07XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBtYXggbGVuZ3RoIG9mIHR3byBiaW5hcmllcyBudW1iZXJzXG4gICAqIEBwYXJhbSBiMSBUaGUgZmlyc3QgYmluYXJ5IG51bWJlclxuICAgKiBAcGFyYW0gYjIgVGhlIHNlY29uZCBiaW5hcnkgbnVtYmVyXG4gICAqIEByZXR1cm5zIFRoZSBtYXggbGVuZ3RoXG4gICAqL1xuICBwdWJsaWMgZ2V0TWF4TGVuZ3RoKGIxOiBzdHJpbmcsIGIyOiBzdHJpbmcpIHtcbiAgICBpZiAoYjEubGVuZ3RoID4gYjIubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gYjEubGVuZ3RoO1xuICAgIH1cbiAgICByZXR1cm4gYjIubGVuZ3RoO1xuICB9XG5cbiAgLyoqXG4gICAqIENvbnZlcnQgYSBudW1iZXIgdG8gaXQncyBiaW5hcnkgcmVwcmVzZW50YXRpb25cbiAgICogQHBhcmFtIGRlY2ltYWwgVGhlIFxuICAgKiBAcmV0dXJucyBUaGUgYmluYXJ5IHJlcHJlc2VudGF0aW9uIG9mIHRoZSBkZWNpbWFsIG51bWJlclxuICAgKi9cbiAgcHVibGljIGRlY2ltYWxUb0JpbmFyeShkZWNpbWFsOiBudW1iZXIpIHtcbiAgICBjb25zdCBvcmlnaW5hbE51bWJlciA9IGRlY2ltYWw7XG4gICAgbGV0IGJpbmFyeU51bWJlciA9IChNYXRoLmFicyhkZWNpbWFsKSA+Pj4gMCkudG9TdHJpbmcoMik7XG5cbiAgICBpZiAob3JpZ2luYWxOdW1iZXIgPCAwKSB7XG4gICAgICBiaW5hcnlOdW1iZXIgPSB0aGlzLmMyKGJpbmFyeU51bWJlcikucmV2ZXJzZSgpLmpvaW4oXCJcIik7XG4gICAgfVxuXG4gICAgcmV0dXJuIGJpbmFyeU51bWJlcjtcbiAgfVxuXG4gIC8qKlxuICAgKiBDb252ZXJ0IGEgYmluYXJ5IHJlcHJlc2VudGF0aW9uIG9mIGEgbnVtYmVyIHRvIGEgZGVjaW1hbCBudW1iZXJcbiAgICogQHBhcmFtIGJpbmFyeSBUaGUgYmluYXJ5IHJlcHJlc2VudGF0aW9uIG9mIGEgbnVtYmVyXG4gICAqIEByZXR1cm5zIFRoZSBpbnQgcmVwcmVzZW50YXRpb24gb2YgYSBiaW5hcnkgbnVtYmVyXG4gICAqL1xuICBwdWJsaWMgYmluYXJ5VG9EZWNpbWFsKGJpbmFyeTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHBhcnNlSW50KGJpbmFyeSwgMik7XG4gIH1cblxuICAvKipcbiAgICogQWRkIGludCB0byBhIGJpbmFyeSBudW1iZXJcbiAgICogQHBhcmFtIGIgVGhlIGJpbmFyeSBudW1iZXJcbiAgICogQHBhcmFtIG4gVGhlIGludCBudW1iZXIgdG8gYWRkIHRvIHRoZSBiaW5hcnkgbnVtYmVyXG4gICAqIEByZXR1cm5zIFRoZSBwcm9kdWNlZCByZXN1bHRcbiAgICovXG4gIHB1YmxpYyBhZGROdW1iZXJUb0JpbmFyeShiOiBzdHJpbmcsIG46IG51bWJlcik6IHN0cmluZ1tdIHtcbiAgICByZXR1cm4gdGhpcy5iaW5hcnlBZGRpdGlvbihiLCB0aGlzLmRlY2ltYWxUb0JpbmFyeShuKSk7XG4gIH1cblxuICAvKipcbiAgICogSW52ZXJ0IGEgYmluYXJ5IG51bWJlclxuICAgKiBAcGFyYW0gYiBUaGUgYmluYXJ5IG51bWJlciB0byBpbnZlcnRcbiAgICogQHJldHVybnMgVGhlIGludmVydCBiaW5hcnkgbnVtYmVyXG4gICAqL1xuICBwdWJsaWMgaW52ZXJ0KGI6IHN0cmluZykge1xuICAgIGNvbnN0IGluaXRpYWxMZW5ndGggPSBiLmxlbmd0aDtcbiAgICBiID0gdGhpcy5kZWNpbWFsVG9CaW5hcnkodGhpcy5iaW5hcnlUb0RlY2ltYWwoYikgXiB0aGlzLmJpbmFyeVRvRGVjaW1hbCh0aGlzLmdldE5CaXQoMSwgYi5sZW5ndGgpKSk7XG4gICAgYiA9IHRoaXMuYWRkUGFkZGluZyhpbml0aWFsTGVuZ3RoLCBiKTtcbiAgICByZXR1cm4gYjtcbiAgfVxuXG4gIC8qKlxuICAgKiBTaGlmdCB0aGUgYmluYXJ5IG51bWJlciB0byB0aGUgcmlnaHRcbiAgICogQHBhcmFtIGIgVGhlIGJpbmFyeSBudW1iZXJcbiAgICogQHBhcmFtIHNoaWZ0VmFsdWUgVGhlIHNoaWZ0IHZhbHVlXG4gICAqIEByZXR1cm5zIFRoZSBzaGlmdGVkIGJpbmFyeSBudW1iZXJcbiAgICovXG4gIHB1YmxpYyBzaGlmdFJpZ2h0KGI6IHN0cmluZywgc2hpZnRWYWx1ZTogbnVtYmVyKSB7XG4gICAgLy8gXCIwMDAwMDEwMTBcIiA+PiAyID0+IFwiMDAwMDAwMDEwXCJcbiAgICAvLyAxLiBSZW1vdmVzIGxhc3RzIDxzaGlmdFZhbHVlPiBiaXRzXG4gICAgLy8gMi4gUGxhY2VzIDxzaGlmdFZhbHVlPiBiaXRzIGF0IDAgYmVmb3JlXG5cbiAgICBpZiAoc2hpZnRWYWx1ZSA8IDEpIHtcbiAgICAgIHJldHVybiBiO1xuICAgIH1cblxuICAgIGxldCByZXMgPSBiO1xuICAgIHJlcyA9IHJlcy5zbGljZSgwLCAtc2hpZnRWYWx1ZSk7XG4gICAgcmVzID0gXCJcIi5wYWRTdGFydChzaGlmdFZhbHVlLCBcIjBcIikgKyByZXM7XG5cbiAgICByZXR1cm4gcmVzO1xuICB9XG5cbiAgLyoqXG4gICAqIFNoaWZ0IHRoZSBiaW5hcnkgbnVtYmVyIHRvIHRoZSBsZWZ0XG4gICAqIEBwYXJhbSBiIFRoZSBiaW5hcnkgbnVtYmVyXG4gICAqIEBwYXJhbSBzaGlmdFZhbHVlIFRoZSBzaGlmdCB2YWx1ZVxuICAgKiBAcmV0dXJucyBUaGUgc2hpZnRlZCBiaW5hcnkgbnVtYmVyXG4gICAqL1xuICBwdWJsaWMgc2hpZnRMZWZ0KGI6IHN0cmluZywgc2hpZnRWYWx1ZTogbnVtYmVyKSB7XG4gICAgLy8gXCIwMDAwMDEwMTBcIiA8PCAyID0+IFwiMDAwMDAxMDEwMDBcIlxuICAgIC8vIDEuIFJlbW92ZXMgbGFzdHMgPHNoaWZ0VmFsdWU+IGJpdHNcbiAgICAvLyAyLiBQbGFjZXMgPHNoaWZ0VmFsdWU+IGJpdHMgYXQgMCBiZWZvcmVcblxuICAgIGlmIChzaGlmdFZhbHVlIDwgMSkge1xuICAgICAgcmV0dXJuIGI7XG4gICAgfVxuXG4gICAgbGV0IHJlcyA9IGI7XG4gICAgcmVzID0gcmVzLnNsaWNlKHNoaWZ0VmFsdWUpO1xuICAgIHJlcyArPSBcIlwiLnBhZEVuZChzaGlmdFZhbHVlLCBcIjBcIik7XG5cbiAgICByZXR1cm4gcmVzO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZCAyIGJpdCB0b2dldGhlciB3aXRoIHRoZSBjYXJyeVxuICAgKiBAcGFyYW0geCBUaGUgZmlyc3QgYml0XG4gICAqIEBwYXJhbSB5IFRoZSBzZWNvbmQgYml0XG4gICAqIEBwYXJhbSBjYXJyeSBUaGUgY2FycnlcbiAgICogQHJldHVybnMgVGhlIHJlc3VsdCB3aXRoIHRoZSBjYXJyeSBbYml0LCBjYXJyeV1cbiAgICovXG4gIHB1YmxpYyBlbGVtZW50YXJ5QWRkaXRpb24oeDogc3RyaW5nLCB5OiBzdHJpbmcsIGNhcnJ5ID0gXCJcIik6IHN0cmluZ1tdIHtcbiAgICBjb25zdCByZXMgPSBOdW1iZXIoeCkgKyBOdW1iZXIoeSkgKyBOdW1iZXIoY2FycnkpO1xuXG4gICAgc3dpdGNoIChyZXMpIHtcbiAgICAgIC8vIGMgPSAxLCB4ID0gMSwgeSA9IDFcbiAgICAgIGNhc2UgMzpcbiAgICAgICAgcmV0dXJuIFtcIjFcIiwgXCIxXCJdO1xuICAgICAgY2FzZSAyOlxuICAgICAgICByZXR1cm4gW1wiMFwiLCBcIjFcIl07XG4gICAgICBjYXNlIDE6XG4gICAgICAgIHJldHVybiBbXCIxXCIsIFwiXCJdO1xuICAgICAgLy8gYyA9IDAsIHggPSAwLCB5ID0gMFxuICAgICAgY2FzZSAwOlxuICAgICAgICByZXR1cm4gW1wiMFwiLCBcIlwiXTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQWRkIDIgYmluYXJ5IG51bWJlcnNcbiAgICogQHBhcmFtIGIxIFRoZSBmaXJzdCBiaW5hcnkgbnVtYmVyXG4gICAqIEBwYXJhbSBiMiBUaGUgc2Vjb25kIGJpbmFyeSBudW1iZXJcbiAgICogQHJldHVybnMgVGhlIHJlc3VsdCBvZiB0aGUgYWRkaXRpb24gW2JpbmFyeU51bWJlciwgY2FycnlCaXRdXG4gICAqL1xuICBwdWJsaWMgYmluYXJ5QWRkaXRpb24oYjE6IHN0cmluZywgYjI6IHN0cmluZykge1xuICAgIGxldCByZXMgPSBcIlwiO1xuICAgIGxldCBjYXJyeSA9IFwiXCI7XG4gICAgY29uc3QgW2JwMSwgYnAyXSA9IHRoaXMuYWRkTWF4UGFkZGluZyhiMSwgYjIpO1xuXG4gICAgZm9yIChsZXQgaSA9IGJwMS5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgY29uc3QgW3IsIGNdID0gdGhpcy5lbGVtZW50YXJ5QWRkaXRpb24oYnAxW2ldLCBicDJbaV0sIGNhcnJ5KTtcbiAgICAgIHJlcyA9IHIgKyByZXM7XG4gICAgICBjYXJyeSA9IGM7XG4gICAgfVxuXG4gICAgcmV0dXJuIFtyZXMsIGNhcnJ5XTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTdWJzdHJhY3QgMiBiaW5hcnkgbnVtYmVyc1xuICAgKiBAcGFyYW0gYjEgVGhlIGZpcnN0IGJpbmFyeSBudW1iZXJcbiAgICogQHBhcmFtIGIyIFRoZSBzZWNvbmQgYmluYXJ5IG51bWJlclxuICAgKiBAcmV0dXJucyBUaGUgcmVzdWx0IG9mIHRoZSBzdWJzdHJhY3Rpb24gW2JpbmFyeU51bWJlciwgY2FycnlCaXRdXG4gICAqL1xuICBwdWJsaWMgYmluYXJ5U3Vic3RyYWN0aW9uKGIxOiBzdHJpbmcsIGIyOiBzdHJpbmcpIHtcbiAgICBjb25zdCBbYnAxLCBicDJdID0gdGhpcy5hZGRNYXhQYWRkaW5nKGIxLCBiMik7XG4gICAgcmV0dXJuIHRoaXMuYmluYXJ5QWRkaXRpb24oYnAxLCB0aGlzLmMyKGJwMikucmV2ZXJzZSgpLmpvaW4oXCJcIikpO1xuICB9XG5cbiAgLyoqXG4gICAqIFBlcmZvcm0gYSAyJ3MgY29tcGxlbWVudCBvcGVyYXRpb24gd2l0aG91dCB0aGUgY2FycnlcbiAgICogQHBhcmFtIGIgVGhlIGJpbmFyeSBudW1iZXJcbiAgICogQHJldHVybnMgVGhlIDIncyBjb21wbGVtZW50IG9mIHRoZSBiaW5hcnkgbnVtYmVyIFtiaW5hcnlOdW1iZXIsIGNhcnJ5XVxuICAgKi9cbiAgcHVibGljIGMyKGI6IHN0cmluZyk6IHN0cmluZ1tdIHtcbiAgICBiID0gdGhpcy5pbnZlcnQoYik7XG4gICAgcmV0dXJuIHRoaXMuYWRkTnVtYmVyVG9CaW5hcnkoYiwgMSk7XG4gIH1cblxuICAvKipcbiAgICogTXVsdGlwbHkgMiBiaW5hcnkgbnVtYmVyc1xuICAgKiBAcGFyYW0gYjEgVGhlIGZpcnN0IGJpbmFyeSBudW1iZXJcbiAgICogQHBhcmFtIGIyIFRoZSBzZWNvbmQgYmluYXJ5IG51bWJlclxuICAgKiBAcmV0dXJucyBUaGUgcmVzdWx0IG9mIHRoZSBtdWx0aXBsaWNhdGlvblxuICAgKi9cbiAgcHVibGljIGJpbmFyeU11bHRpcGxpY2F0aW9uKGIxOiBzdHJpbmcsIGIyOiBzdHJpbmcpIHtcbiAgICBsZXQgcmVzID0gXCJcIjtcbiAgICBjb25zdCBhZGRSZXN1bHRzID0gW107XG5cbiAgICAvLyBUaGUgYmluYXJ5IG51bWJlcnMgdG8gbXVsaXRwbHlcbiAgICAvLyBicDEgPSAxMDExXG4gICAgLy8gYnAyID0gMTExMVxuICAgIGNvbnN0IFticDEsIGJwMl0gPSB0aGlzLmFkZE1heFBhZGRpbmcoYjEsIGIyKTtcblxuICAgIC8vIENhbGN1bGF0ZSB0aGUgb3BlcmFuZHNcbiAgICAvLyBhZGRSZXN1bHRzID0gW1xuICAgIC8vICAgIDAwMDAgMTAxMSxcbiAgICAvLyAgICAwMDAxIDAxMTAsXG4gICAgLy8gICAgMDAxMCAxMTAwLFxuICAgIC8vICAgIDEwMTEgMDAwMFxuICAgIC8vIF1cbiAgICBmb3IgKGxldCBpID0gYnAxLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICBsZXQgY3VycmVudFJlcyA9IFwiXCI7XG5cbiAgICAgIGZvciAobGV0IGogPSBicDEubGVuZ3RoIC0gMTsgaiA+PSAwOyBqLS0pIHtcbiAgICAgICAgY3VycmVudFJlcyA9IChOdW1iZXIoYnAxW2pdKSAqIE51bWJlcihicDJbaV0pKSArIGN1cnJlbnRSZXM7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGRlYyA9IHRoaXMuYmluYXJ5VG9EZWNpbWFsKGN1cnJlbnRSZXMpIDw8IChicDEubGVuZ3RoIC0gMSAtIGkpO1xuICAgICAgY3VycmVudFJlcyA9IHRoaXMuZGVjaW1hbFRvQmluYXJ5KGRlYyk7XG4gICAgICBhZGRSZXN1bHRzLnB1c2goY3VycmVudFJlcyk7XG4gICAgfVxuXG4gICAgLy8gQWRkIGV2ZXJ5dGhpbmdcbiAgICAvLyByZXMgPVxuICAgIC8vICAgMDAwMCAxMDExLFxuICAgIC8vICsgMDAwMSAwMTEwLFxuICAgIC8vICsgMDAxMCAxMTAwLFxuICAgIC8vICsgMTAxMSAwMDAwXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhZGRSZXN1bHRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBhZGRSZXN1bHQgPSB0aGlzLmFkZFBhZGRpbmcoYWRkUmVzdWx0c1thZGRSZXN1bHRzLmxlbmd0aCAtIDFdLmxlbmd0aCwgYWRkUmVzdWx0c1tpXSk7XG4gICAgICBjb25zdCBbciwgY10gPSB0aGlzLmJpbmFyeUFkZGl0aW9uKHJlcywgYWRkUmVzdWx0KTtcbiAgICAgIHJlcyA9IGMgKyByO1xuICAgIH1cblxuICAgIC8vIHJlcyA9IDEwMTAwMTAxXG4gICAgcmV0dXJuIHJlcztcbiAgfVxufVxuIiwiaW1wb3J0IHsgQmluYXJ5SGVscGVyIH0gZnJvbSBcIi4vY2xhc3Nlcy9CaW5hcnlIZWxwZXJcIjtcblxuY29uc3QgYmggPSBuZXcgQmluYXJ5SGVscGVyKCk7XG5cbmNvbnN0IGlucHV0QSA9IDxIVE1MSW5wdXRFbGVtZW50PmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaW5wdXQtYVwiKTtcbmNvbnN0IGlucHV0QiA9IDxIVE1MSW5wdXRFbGVtZW50PmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaW5wdXQtYlwiKTtcbmNvbnN0IG1vZGUgPSA8SFRNTFNlbGVjdEVsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtb2RlXCIpO1xuY29uc3QgcmVzdWx0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyZXN1bHRcIik7XG5jb25zdCByZWdleEJpbmFyeSA9IC9eWzAxXSskLztcblxuZnVuY3Rpb24gb25DaGFuZ2UoKSB7XG4gIGxldCByZXMgPSBcIlwiO1xuICBjb25zdCBhID0gaW5wdXRBLnZhbHVlO1xuICBjb25zdCBiID0gaW5wdXRCLnZhbHVlO1xuXG4gIGlmICghYSB8fCAhYikge1xuICAgIHJlc3VsdC5pbm5lckhUTUwgPSBgPHNwYW4gY2xhc3M9XCJjb2xvci1ncmV5XCI+VmV1aWxsZXogcmVuc2VpZ25lciB0b3VzIGxlcyBjaGFtcHM8L3NwYW4+YDtcbiAgICByZXR1cm47XG4gIH1cblxuICBpZiAoIXJlZ2V4QmluYXJ5LnRlc3QoYSkgfHwgIXJlZ2V4QmluYXJ5LnRlc3QoYikpIHtcbiAgICByZXN1bHQuaW5uZXJIVE1MID0gYDxzcGFuIGNsYXNzPVwiY29sb3ItZ3JleVwiPlZvcyBlbnRyw6llcyBuZSBzb250IHBhcyBkZXMgbm9tYnJlcyBiaW5haXJlczwvc3Bhbj5gO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHN3aXRjaCAobW9kZS52YWx1ZSkge1xuICAgIGNhc2UgXCJhZGRcIjoge1xuICAgICAgcmVzID0gYmguYmluYXJ5QWRkaXRpb24oYSwgYikucmV2ZXJzZSgpLmpvaW4oXCJcIik7XG4gICAgICByZXMgPSBiaC5jbGVhbihyZXMpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICAgIGNhc2UgXCJtdWx0XCI6IHtcbiAgICAgIHJlcyA9IGJoLmJpbmFyeU11bHRpcGxpY2F0aW9uKGEsIGIpO1xuICAgICAgcmVzID0gYmguY2xlYW4ocmVzKTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBjYXNlIFwic3ViXCI6IHtcbiAgICAgIHJlcyA9IGJoLmJpbmFyeVN1YnN0cmFjdGlvbihhLCBiKVswXTtcbiAgICAgIHJlcyA9IGJoLmNsZWFuKHJlcyk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICByZXN1bHQuaW5uZXJIVE1MID0gcmVzID8gYFLDqXN1bHRhdDogPHNwYW4gY2xhc3M9XCJtb25vXCI+JHtyZXN9PHNwYW4vPmAgOiBcIlLDqXN1bHRhdDogLi4uXCI7XG59XG5cbmlucHV0QS5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsIG9uQ2hhbmdlKTtcbmlucHV0Qi5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsIG9uQ2hhbmdlKTtcbmlucHV0QS5hZGRFdmVudExpc3RlbmVyKFwia2V5dXBcIiwgb25DaGFuZ2UpO1xuaW5wdXRCLmFkZEV2ZW50TGlzdGVuZXIoXCJrZXl1cFwiLCBvbkNoYW5nZSk7XG5tb2RlLmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgb25DaGFuZ2UpO1xuXG5vbkNoYW5nZSgpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9
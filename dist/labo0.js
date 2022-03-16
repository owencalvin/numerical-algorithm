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
     * @returns The result of the addition
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
     * @returns The result of the substraction
     */
    BinaryHelper.prototype.binarySubstraction = function (b1, b2) {
        var _a = this.addMaxPadding(b1, b2), bp1 = _a[0], bp2 = _a[1];
        return this.binaryAddition(bp1, this.c2(bp2));
    };
    BinaryHelper.prototype.c2 = function (b) {
        b = this.invert(b);
        return this.binaryAddition(b, "1").reverse().join("");
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
    var a = inputA.value;
    var b = inputB.value;
    if (!a || !b) {
        result.innerHTML = "Please enter binary numbers in the inputs";
        return;
    }
    if (!regexBinary.test(a) || !regexBinary.test(b)) {
        result.innerHTML = "Your inputs are not in a binary format";
        return;
    }
    var res = "";
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
    result.innerHTML = res ? "Result: ".concat(res) : "Result: ...";
}
inputA.addEventListener("change", onChange);
inputB.addEventListener("change", onChange);
inputA.addEventListener("keyup", onChange);
inputB.addEventListener("keyup", onChange);
mode.addEventListener("change", onChange);
onChange();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQzNDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsUUFBUSxDQUFDLENBQUM7QUFDM0MsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsQ0FBQztBQUUxQyxRQUFRLEVBQUUsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL21hdGhfc3BlLy4vc3JjL0JpbmFyeUhlbHBlci50cyIsIndlYnBhY2s6Ly9tYXRoX3NwZS8uL3NyYy9sYWJvMC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgQmluYXJ5SGVscGVyIHtcbiAgLyoqXG4gICAqIEdldCBuIGJpdCBvZiAwIG9yIDFcbiAgICogQHBhcmFtIHZhbHVlIDEgb3IgMFxuICAgKiBAcGFyYW0gbiBUaGUgbnVtYmVyIG9mIGJpdHMgdG8gcmV0cmlldmVcbiAgICogQHJldHVybnMgbiBiaXQgb2YgMCBvciAxXG4gICAqL1xuICBwdWJsaWMgZ2V0TkJpdCh2YWx1ZTogMSB8IDAsIG46IG51bWJlcik6IHN0cmluZyB7XG4gICAgbGV0IHJlcyA9IFwiXCI7XG4gICAgXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuOyBpKyspIHtcbiAgICAgIHJlcyArPSB2YWx1ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZCBuIHplcm9zIGJlZm9yZSB0aGUgYmluYXJ5IG51bWJlclxuICAgKiBAcGFyYW0gbiBUaGUgbnVtYmVyIG9mIDAgdG8gYWRkIGJlZm9yZSB0aGUgYmluYXJ5IG51bWJlclxuICAgKiBAcGFyYW0gYiBUaGUgYmluYXJ5IG51bWJlclxuICAgKiBAcmV0dXJucyBUaGUgYmluYXJ5IG51bWJlciB3aXRoIG4gemVyb3MgYmVmb3JlXG4gICAqL1xuICBwdWJsaWMgYWRkUGFkZGluZyhuOiBudW1iZXIsIGIgPSBcIlwiKSB7XG4gICAgY29uc3Qgc2l6ZSA9IG4gLSBiLmxlbmd0aDtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2l6ZTsgaSsrKSB7XG4gICAgICBiID0gXCIwXCIgKyBiO1xuICAgIH1cblxuICAgIHJldHVybiBiO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgdGhlIHplcm9zIGJlZm9yZSBhIGJpbmFyeSBudW1iZXIgKDAwMDEwMSBiZWNvbWVzIDEwMSlcbiAgICogQHBhcmFtIGIgVGhlIGJpbmFyeSBudW1iZXJcbiAgICogQHJldHVybnMgVGhlIHByb2R1Y2VkIGJpbmFyeSBudW1iZXJcbiAgICovXG4gIHB1YmxpYyBjbGVhbihiOiBzdHJpbmcpIHtcbiAgICBsZXQgcmVzID0gYjtcblxuICAgIGZvcihsZXQgaSA9IDA7IGkgPCBiLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoYltpXSA9PT0gXCIwXCIpIHtcbiAgICAgICAgcmVzID0gcmVzLnN1YnN0cmluZygxKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiByZXM7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHJlcyA9PT0gXCJcIikge1xuICAgICAgcmV0dXJuIFwiMFwiO1xuICAgIH1cbiAgfVxuXG5cbiAgLyoqXG4gICAqIEFkZCAwIHBhZGRpbmcgdG8gdGhlIHNtYWxsZXN0IGJpbmFyeSBudW1iZXIgdG8gbWF0Y2ggdGhlIGxvbmdlc3Qgb25lJ3MgbGVuZ3RoXG4gICAqIFsxMDEsIDExMDAxXSBiZWNvbWVzIFswMDEwMSwgMTEwMDFdXG4gICAqIEBwYXJhbSBiMSBUaGUgZmlyc3QgYmluYXJ5IG51bWJlclxuICAgKiBAcGFyYW0gYjIgVGhlIHNlY29uZCBiaW5hcnkgbnVtYmVyXG4gICAqIEByZXR1cm5zIFtiMSwgYjJdIHdpdGggY29ycmVjdCBwYWRkaW5nXG4gICAqL1xuICBwdWJsaWMgYWRkTWF4UGFkZGluZyhiMTogc3RyaW5nLCBiMjogc3RyaW5nKSB7XG4gICAgaWYgKGIyLmxlbmd0aCA+IGIxLmxlbmd0aCkge1xuICAgICAgYjEgPSB0aGlzLmFkZFBhZGRpbmcoYjIubGVuZ3RoLCBiMSk7XG4gICAgfSBlbHNlIGlmIChiMS5sZW5ndGggPiBiMi5sZW5ndGgpIHtcbiAgICAgIGIyID0gdGhpcy5hZGRQYWRkaW5nKGIxLmxlbmd0aCwgYjIpO1xuICAgIH1cblxuICAgIHJldHVybiBbYjEsIGIyXTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRNYXhMZW5ndGgoYjE6IHN0cmluZywgYjI6IHN0cmluZykge1xuICAgIGlmIChiMS5sZW5ndGggPiBiMi5sZW5ndGgpIHtcbiAgICAgIHJldHVybiBiMS5sZW5ndGg7XG4gICAgfVxuICAgIHJldHVybiBiMi5sZW5ndGg7XG4gIH1cblxuICAvKipcbiAgICogQ29udmVydCBhIG51bWJlciB0byBpdCdzIGJpbmFyeSByZXByZXNlbnRhdGlvblxuICAgKiBAcGFyYW0gZGVjaW1hbCBUaGUgXG4gICAqIEByZXR1cm5zIFRoZSBiaW5hcnkgcmVwcmVzZW50YXRpb24gb2YgdGhlIGRlY2ltYWwgbnVtYmVyXG4gICAqL1xuICBwdWJsaWMgZGVjaW1hbFRvQmluYXJ5KGRlY2ltYWw6IG51bWJlcikge1xuICAgIHJldHVybiAoZGVjaW1hbCA+Pj4gMCkudG9TdHJpbmcoMik7XG4gIH1cblxuICAvKipcbiAgICogQ29udmVydCBhIGJpbmFyeSByZXByZXNlbnRhdGlvbiBvZiBhIG51bWJlciB0byBhIGRlY2ltYWwgbnVtYmVyXG4gICAqIEBwYXJhbSBiaW5hcnkgVGhlIGJpbmFyeSByZXByZXNlbnRhdGlvbiBvZiBhIG51bWJlclxuICAgKiBAcmV0dXJucyBUaGUgaW50IHJlcHJlc2VudGF0aW9uIG9mIGEgYmluYXJ5IG51bWJlclxuICAgKi9cbiAgcHVibGljIGJpbmFyeVRvRGVjaW1hbChiaW5hcnk6IHN0cmluZykge1xuICAgIHJldHVybiBwYXJzZUludChiaW5hcnksIDIpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZCBpbnQgdG8gYSBiaW5hcnkgbnVtYmVyXG4gICAqIEBwYXJhbSBiIFRoZSBiaW5hcnkgbnVtYmVyXG4gICAqIEBwYXJhbSBuIFRoZSBpbnQgbnVtYmVyIHRvIGFkZCB0byB0aGUgYmluYXJ5IG51bWJlclxuICAgKiBAcmV0dXJucyBUaGUgcHJvZHVjZWQgcmVzdWx0XG4gICAqL1xuICBwdWJsaWMgYWRkTnVtYmVyVG9CaW5hcnkoYjogc3RyaW5nLCBuOiBudW1iZXIpOiBzdHJpbmdbXSB7XG4gICAgcmV0dXJuIHRoaXMuYmluYXJ5QWRkaXRpb24oYiwgdGhpcy5kZWNpbWFsVG9CaW5hcnkobikpO1xuICB9XG5cbiAgLyoqXG4gICAqIEludmVydCBhIGJpbmFyeSBudW1iZXJcbiAgICogQHBhcmFtIGIgVGhlIGJpbmFyeSBudW1iZXIgdG8gaW52ZXJ0XG4gICAqIEByZXR1cm5zIFRoZSBpbnZlcnQgYmluYXJ5IG51bWJlclxuICAgKi9cbiAgcHVibGljIGludmVydChiOiBzdHJpbmcpIHtcbiAgICBjb25zdCBpbml0aWFsTGVuZ3RoID0gYi5sZW5ndGg7XG4gICAgYiA9IHRoaXMuZGVjaW1hbFRvQmluYXJ5KHRoaXMuYmluYXJ5VG9EZWNpbWFsKGIpIF4gdGhpcy5iaW5hcnlUb0RlY2ltYWwodGhpcy5nZXROQml0KDEsIGIubGVuZ3RoKSkpO1xuICAgIGIgPSB0aGlzLmFkZFBhZGRpbmcoaW5pdGlhbExlbmd0aCwgYik7XG4gICAgcmV0dXJuIGI7XG4gIH1cblxuICAvKipcbiAgICogQWRkIDIgYml0IHRvZ2V0aGVyIHdpdGggdGhlIGNhcnJ5XG4gICAqIEBwYXJhbSB4IFRoZSBmaXJzdCBiaXRcbiAgICogQHBhcmFtIHkgVGhlIHNlY29uZCBiaXRcbiAgICogQHBhcmFtIGNhcnJ5IFRoZSBjYXJyeVxuICAgKiBAcmV0dXJucyBUaGUgcmVzdWx0IHdpdGggdGhlIGNhcnJ5IFtiaXQsIGNhcnJ5XVxuICAgKi9cbiAgcHVibGljIGVsZW1lbnRhcnlBZGRpdGlvbih4OiBzdHJpbmcsIHk6IHN0cmluZywgY2FycnkgPSBcIlwiKTogc3RyaW5nW10ge1xuICAgIGNvbnN0IHJlcyA9IE51bWJlcih4KSArIE51bWJlcih5KSArIE51bWJlcihjYXJyeSk7XG5cbiAgICBzd2l0Y2ggKHJlcykge1xuICAgICAgLy8gYyA9IDEsIHggPSAxLCB5ID0gMVxuICAgICAgY2FzZSAzOlxuICAgICAgICByZXR1cm4gW1wiMVwiLCBcIjFcIl07XG4gICAgICBjYXNlIDI6XG4gICAgICAgIHJldHVybiBbXCIwXCIsIFwiMVwiXTtcbiAgICAgIGNhc2UgMTpcbiAgICAgICAgcmV0dXJuIFtcIjFcIiwgXCJcIl07XG4gICAgICAvLyBjID0gMCwgeCA9IDAsIHkgPSAwXG4gICAgICBjYXNlIDA6XG4gICAgICAgIHJldHVybiBbXCIwXCIsIFwiXCJdO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBBZGQgMiBiaW5hcnkgbnVtYmVyc1xuICAgKiBAcGFyYW0gYjEgVGhlIGZpcnN0IGJpbmFyeSBudW1iZXJcbiAgICogQHBhcmFtIGIyIFRoZSBzZWNvbmQgYmluYXJ5IG51bWJlclxuICAgKiBAcmV0dXJucyBUaGUgcmVzdWx0IG9mIHRoZSBhZGRpdGlvblxuICAgKi9cbiAgcHVibGljIGJpbmFyeUFkZGl0aW9uKGIxOiBzdHJpbmcsIGIyOiBzdHJpbmcpIHtcbiAgICBsZXQgcmVzID0gXCJcIjtcbiAgICBsZXQgY2FycnkgPSBcIlwiO1xuICAgIGNvbnN0IFticDEsIGJwMl0gPSB0aGlzLmFkZE1heFBhZGRpbmcoYjEsIGIyKTtcblxuICAgIGZvciAobGV0IGkgPSBicDEubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgIGNvbnN0IFtyLCBjXSA9IHRoaXMuZWxlbWVudGFyeUFkZGl0aW9uKGJwMVtpXSwgYnAyW2ldLCBjYXJyeSk7XG4gICAgICByZXMgPSByICsgcmVzO1xuICAgICAgY2FycnkgPSBjO1xuICAgIH1cblxuICAgIHJldHVybiBbcmVzLCBjYXJyeV07XG4gIH1cblxuICAvKipcbiAgICogU3Vic3RyYWN0IDIgYmluYXJ5IG51bWJlcnNcbiAgICogQHBhcmFtIGIxIFRoZSBmaXJzdCBiaW5hcnkgbnVtYmVyXG4gICAqIEBwYXJhbSBiMiBUaGUgc2Vjb25kIGJpbmFyeSBudW1iZXJcbiAgICogQHJldHVybnMgVGhlIHJlc3VsdCBvZiB0aGUgc3Vic3RyYWN0aW9uXG4gICAqL1xuICBwdWJsaWMgYmluYXJ5U3Vic3RyYWN0aW9uKGIxOiBzdHJpbmcsIGIyOiBzdHJpbmcpIHtcbiAgICBjb25zdCBbYnAxLCBicDJdID0gdGhpcy5hZGRNYXhQYWRkaW5nKGIxLCBiMik7XG4gICAgcmV0dXJuIHRoaXMuYmluYXJ5QWRkaXRpb24oYnAxLCB0aGlzLmMyKGJwMikpO1xuICB9XG5cbiAgcHVibGljIGMyKGI6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgYiA9IHRoaXMuaW52ZXJ0KGIpO1xuICAgIHJldHVybiB0aGlzLmJpbmFyeUFkZGl0aW9uKGIsIFwiMVwiKS5yZXZlcnNlKCkuam9pbihcIlwiKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBNdWx0aXBseSAyIGJpbmFyeSBudW1iZXJzXG4gICAqIEBwYXJhbSBiMSBUaGUgZmlyc3QgYmluYXJ5IG51bWJlclxuICAgKiBAcGFyYW0gYjIgVGhlIHNlY29uZCBiaW5hcnkgbnVtYmVyXG4gICAqIEByZXR1cm5zIFRoZSByZXN1bHQgb2YgdGhlIG11bHRpcGxpY2F0aW9uXG4gICAqL1xuICBwdWJsaWMgYmluYXJ5TXVsdGlwbGljYXRpb24oYjE6IHN0cmluZywgYjI6IHN0cmluZykge1xuICAgIGxldCByZXMgPSBcIlwiO1xuICAgIGNvbnN0IGFkZFJlc3VsdHMgPSBbXTtcblxuICAgIC8vIFRoZSBiaW5hcnkgbnVtYmVycyB0byBtdWxpdHBseVxuICAgIC8vIGJwMSA9IDEwMTFcbiAgICAvLyBicDIgPSAxMTExXG4gICAgY29uc3QgW2JwMSwgYnAyXSA9IHRoaXMuYWRkTWF4UGFkZGluZyhiMSwgYjIpO1xuXG4gICAgLy8gQ2FsY3VsYXRlIHRoZSBvcGVyYW5kc1xuICAgIC8vIGFkZFJlc3VsdHMgPSBbXG4gICAgLy8gICAgMDAwMCAxMDExLFxuICAgIC8vICAgIDAwMDEgMDExMCxcbiAgICAvLyAgICAwMDEwIDExMDAsXG4gICAgLy8gICAgMTAxMSAwMDAwXG4gICAgLy8gXVxuICAgIGZvciAobGV0IGkgPSBicDEubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgIGxldCBjdXJyZW50UmVzID0gXCJcIjtcblxuICAgICAgZm9yIChsZXQgaiA9IGJwMS5sZW5ndGggLSAxOyBqID49IDA7IGotLSkge1xuICAgICAgICBjdXJyZW50UmVzID0gKE51bWJlcihicDFbal0pICogTnVtYmVyKGJwMltpXSkpICsgY3VycmVudFJlcztcbiAgICAgIH1cblxuICAgICAgY29uc3QgZGVjID0gdGhpcy5iaW5hcnlUb0RlY2ltYWwoY3VycmVudFJlcykgPDwgKGJwMS5sZW5ndGggLSAxIC0gaSk7XG4gICAgICBjdXJyZW50UmVzID0gdGhpcy5kZWNpbWFsVG9CaW5hcnkoZGVjKTtcbiAgICAgIGFkZFJlc3VsdHMucHVzaChjdXJyZW50UmVzKTtcbiAgICB9XG5cbiAgICAvLyBBZGQgZXZlcnl0aGluZ1xuICAgIC8vIHJlcyA9XG4gICAgLy8gICAwMDAwIDEwMTEsXG4gICAgLy8gKyAwMDAxIDAxMTAsXG4gICAgLy8gKyAwMDEwIDExMDAsXG4gICAgLy8gKyAxMDExIDAwMDBcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFkZFJlc3VsdHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IGFkZFJlc3VsdCA9IHRoaXMuYWRkUGFkZGluZyhhZGRSZXN1bHRzW2FkZFJlc3VsdHMubGVuZ3RoIC0gMV0ubGVuZ3RoLCBhZGRSZXN1bHRzW2ldKTtcbiAgICAgIGNvbnN0IFtyLCBjXSA9IHRoaXMuYmluYXJ5QWRkaXRpb24ocmVzLCBhZGRSZXN1bHQpO1xuICAgICAgcmVzID0gYyArIHI7XG4gICAgfVxuXG4gICAgLy8gcmVzID0gMTAxMDAxMDFcbiAgICByZXR1cm4gcmVzO1xuICB9XG59XG4iLCJpbXBvcnQgeyBCaW5hcnlIZWxwZXIgfSBmcm9tIFwiLi9CaW5hcnlIZWxwZXJcIjtcblxuY29uc3QgYmggPSBuZXcgQmluYXJ5SGVscGVyKCk7XG5cbmNvbnN0IGlucHV0QSA9IDxIVE1MSW5wdXRFbGVtZW50PmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaW5wdXQtYVwiKTtcbmNvbnN0IGlucHV0QiA9IDxIVE1MSW5wdXRFbGVtZW50PmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaW5wdXQtYlwiKTtcbmNvbnN0IG1vZGUgPSA8SFRNTFNlbGVjdEVsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtb2RlXCIpO1xuY29uc3QgcmVzdWx0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyZXN1bHRcIik7XG5jb25zdCByZWdleEJpbmFyeSA9IC9eWzAxXSskLztcblxuZnVuY3Rpb24gb25DaGFuZ2UoKSB7XG4gIGNvbnN0IGEgPSBpbnB1dEEudmFsdWU7XG4gIGNvbnN0IGIgPSBpbnB1dEIudmFsdWU7XG5cbiAgaWYgKCFhIHx8ICFiKSB7XG4gICAgcmVzdWx0LmlubmVySFRNTCA9IFwiUGxlYXNlIGVudGVyIGJpbmFyeSBudW1iZXJzIGluIHRoZSBpbnB1dHNcIjtcbiAgICByZXR1cm47XG4gIH1cblxuICBpZiAoIXJlZ2V4QmluYXJ5LnRlc3QoYSkgfHwgIXJlZ2V4QmluYXJ5LnRlc3QoYikpIHtcbiAgICByZXN1bHQuaW5uZXJIVE1MID0gXCJZb3VyIGlucHV0cyBhcmUgbm90IGluIGEgYmluYXJ5IGZvcm1hdFwiO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGxldCByZXMgPSBcIlwiO1xuXG4gIHN3aXRjaCAobW9kZS52YWx1ZSkge1xuICAgIGNhc2UgXCJhZGRcIjoge1xuICAgICAgcmVzID0gYmguYmluYXJ5QWRkaXRpb24oYSwgYikucmV2ZXJzZSgpLmpvaW4oXCJcIik7XG4gICAgICByZXMgPSBiaC5jbGVhbihyZXMpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICAgIGNhc2UgXCJtdWx0XCI6IHtcbiAgICAgIHJlcyA9IGJoLmJpbmFyeU11bHRpcGxpY2F0aW9uKGEsIGIpO1xuICAgICAgcmVzID0gYmguY2xlYW4ocmVzKTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBjYXNlIFwic3ViXCI6IHtcbiAgICAgIHJlcyA9IGJoLmJpbmFyeVN1YnN0cmFjdGlvbihhLCBiKVswXTtcbiAgICAgIHJlcyA9IGJoLmNsZWFuKHJlcyk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICByZXN1bHQuaW5uZXJIVE1MID0gcmVzID8gYFJlc3VsdDogJHtyZXN9YCA6IFwiUmVzdWx0OiAuLi5cIjtcbn1cblxuaW5wdXRBLmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgb25DaGFuZ2UpO1xuaW5wdXRCLmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgb25DaGFuZ2UpO1xuaW5wdXRBLmFkZEV2ZW50TGlzdGVuZXIoXCJrZXl1cFwiLCBvbkNoYW5nZSk7XG5pbnB1dEIuYWRkRXZlbnRMaXN0ZW5lcihcImtleXVwXCIsIG9uQ2hhbmdlKTtcbm1vZGUuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCBvbkNoYW5nZSk7XG5cbm9uQ2hhbmdlKCk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=
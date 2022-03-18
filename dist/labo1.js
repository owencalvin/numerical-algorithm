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


;// CONCATENATED MODULE: ./src/classes/BinaryFloat.ts

/**
 * Code a floating number with a choosen bit size and IEEE 754
 */
var BinaryFloat = /** @class */ (function () {
    function BinaryFloat() {
        this._bitsSize = 32;
        this._number = 0;
        this._binaryIntegerMantissa = "";
        this._binaryDecimalMantissa = "";
        this._binaryMantissa = "";
        this._mantissaFloatPosition = 0;
        this._binaryExponent = "";
        this._bias = 0;
        this._bh = new BinaryHelper();
    }
    Object.defineProperty(BinaryFloat.prototype, "bitsSize", {
        /**
         * The bit size to code the number
         */
        get: function () {
            return this._bitsSize;
        },
        set: function (value) {
            this._bitsSize = value;
            if (value > 80) {
                this._bitsSize = 80;
            }
            if (value < 8) {
                this._bitsSize = 8;
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BinaryFloat.prototype, "number", {
        /**
         * The float number to coded with IEEE 754
         */
        get: function () {
            return this._number;
        },
        set: function (value) {
            this._number = value;
            this.calculateBias();
            this.calculateBinaryIntegerMantissa();
            this.calculateBinaryDecimalMantissa();
            this.calculateBinaryMantissa();
            this.calculateMantissaFloatPosition();
            this.calculateBinaryExponent();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BinaryFloat.prototype, "mantissaBitsSize", {
        /**
         * Get the mantissa bits size
         */
        get: function () {
            if (this.bitsSize < 8) {
                return 0;
            }
            return this.bitsSize - this.exponentBitsSize - 1;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BinaryFloat.prototype, "exponentBitsSize", {
        /**
         * Get the exponent bits size with:
         * - The IEEE 754 2019 formula if the bits size is greater or equal to 128
         * - A custom formula if the bit size is less than 128 that matches the IEEE standard
         */
        get: function () {
            if (this.bitsSize < 8) {
                return 0;
            }
            // IEEE 754 2019 formula >= 128
            if (this.bitsSize >= 128) {
                return Math.round(4 * Math.log2(this.bitsSize)) - 13;
            }
            // A formula that matches the values for < 128
            // ref: https://stackoverflow.com/a/62632260
            return Math.round(Math.pow((Math.log2(this.bitsSize) - 1), (3 / 2)));
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BinaryFloat.prototype, "positiveNumber", {
        get: function () {
            return Math.abs(this.number);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BinaryFloat.prototype, "binaryIntegerMantissa", {
        /**
         * Return the truncated integer part in binary that is coded in the mantissa
         * (The first bit at 1 is hidden)
         * 0.09375  =>     "0"
         * 19.59375 => "0011"
         */
        get: function () {
            return this._binaryIntegerMantissa;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BinaryFloat.prototype, "binaryDecimalMantissa", {
        /**
         * The decimal part of the number in binary that is coded in the mantissa
         * 19.59375 => "00111001100000000000000"
         */
        get: function () {
            return this._binaryDecimalMantissa;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BinaryFloat.prototype, "mantissaFloatPosition", {
        /**
         * Calculate the position of the dot in the mantissa
         *            float position
         *                  |
         *                  v
         * mantissa(19.59375) => "0011.1001100000000000000"
         */
        get: function () {
            return this._mantissaFloatPosition;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BinaryFloat.prototype, "binaryExponent", {
        /**
         * Get the exponent of the number in binary with the bias
         * mantissa(19.59375) => "10000010"
         */
        get: function () {
            return this._binaryExponent;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BinaryFloat.prototype, "binaryMantissa", {
        /**
         * Get the full mantissa of the number
         */
        get: function () {
            return this._binaryMantissa;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BinaryFloat.prototype, "binaryFloatingNumber", {
        /**
         * Get the full number coded in binary with IEEE 754
         */
        get: function () {
            return this.binarySign + this.binaryExponent + this.binaryMantissa;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BinaryFloat.prototype, "bias", {
        /**
         * Return the bias of the number based on the exponent bit size
         * b = 2 ^ (exponentBitsSize - 1) - 1
         */
        get: function () {
            return this._bias;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BinaryFloat.prototype, "computedNumber", {
        /**
         * The number that is coded in memory
         */
        get: function () {
            if (Number.isNaN(this.number) ||
                this.number === Infinity ||
                this.number === 0) {
                return this.number;
            }
            var sign = this.binarySign === "1" ? -1 : 1;
            var computedExponent = this._bh.binaryToDecimal(this.binaryExponent) - this.bias + 1;
            var mantissa = this._bh.binaryToDecimal("1" + this.binaryMantissa) / Math.pow(2, this.mantissaBitsSize);
            if (this.number > 0 && this.number < 1) {
                computedExponent -= 1;
            }
            return sign * Math.pow(2, computedExponent) * mantissa;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BinaryFloat.prototype, "error", {
        /**
         * Get the margin of error
         */
        get: function () {
            if (Number.isNaN(this.number) || this.number === Infinity || this.number === 0) {
                return 0;
            }
            return Math.abs(this.number - this.computedNumber);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BinaryFloat.prototype, "binarySign", {
        /**
         * Return the binary representation of the sign
         * 0 if number >= 0
         * 1 if number < 0
         */
        get: function () {
            return this.number < 0 ? "1" : "0";
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Calculate the integer part of the number for the mantissa
     * 19.59375 => 19 => "10011"
     */
    BinaryFloat.prototype.calculateBinaryIntegerMantissa = function () {
        // Get the integer part
        var front = Math.trunc(this.positiveNumber);
        var res = this._bh.decimalToBinary(front);
        // Do not hide the first bit if the first bit is 0
        // for number included in [0, 1[
        if (res !== "0") {
            res = res.substring(1);
        }
        this._binaryIntegerMantissa = res;
        // If the number is NaN there is no integer part
        if (Number.isNaN(this.number)) {
            this._binaryIntegerMantissa = "";
        }
    };
    /**
     * Calculate the decimal part of the number for the mantissa
     *
     */
    BinaryFloat.prototype.calculateBinaryDecimalMantissa = function () {
        var res = "";
        // Get the decimals of the number: decimals = 19.59375 - 19 = 0.59375
        var decimals = this.positiveNumber - Math.trunc(this.positiveNumber);
        // Get the number of bits dedicated to store the decimals in the mantissa
        var decimalsBitsSize = this.mantissaBitsSize - this.binaryIntegerMantissa.length - 1;
        // 0.59375 * 2 = 1.1875  => 1
        // 0.1875  * 2 = 0.375   => 0
        // 0.375   * 2 = 0.75    => 0
        // 0.75    * 2 = 1.5     => 1
        // 0.5     * 2 = 1       => 1
        for (var i = 0; i < decimalsBitsSize; i++) {
            decimals *= 2;
            if (decimals >= 1) {
                decimals -= 1;
                res += "1";
            }
            else {
                res += "0";
            }
        }
        // If the number is NaN then all the bit of the mantissa are equals to 1
        if (Number.isNaN(this.number)) {
            res = "".padEnd(decimalsBitsSize + 1, "1");
        }
        this._binaryDecimalMantissa = res;
    };
    /**
     * Concatenate the integer part of the mantissa and the decimals part
     */
    BinaryFloat.prototype.calculateBinaryMantissa = function () {
        var res = this.binaryIntegerMantissa + this.binaryDecimalMantissa;
        // If the integer part is equal to 0
        // then remove the leading 0 from the complete mantissa
        // and hide the first bit (= 1)
        // 
        // res => "000011000000000000000000"
        // if binaryIntegerMantissa == "0" then:
        //    clean(res)    => removes leading 0 from 000011000000000000000000     => 11000000000000000000
        //    hideBit(res)  => hide the first bit (= 1) from 11000000000000000000  => 1000000000000000000 
        if (this.binaryIntegerMantissa === "0") {
            res = this._bh.clean(res);
            res = res.substring(1);
        }
        // Makes sure that the mantissa makes the right length (mantissaBitsSize) by adding 0 to the end
        res = res.padEnd(this.mantissaBitsSize, "0");
        this._binaryMantissa = res;
    };
    /**
     * Calculate the position of the floating point in the mantissa
     *
     *                  float position
     *                       |
     *                       v
     * binaryIntegerMantissa . binaryDecimalMantissa
     */
    BinaryFloat.prototype.calculateMantissaFloatPosition = function () {
        // "10011".length - 1 => 5 - 1 => 4
        // (-1 because we have hidden the first bit)
        this._mantissaFloatPosition = this.binaryIntegerMantissa.length - 1;
        // If the number is included in [0, 1[
        // then the position of the dot is calculated by finding the number of "jumps"
        // we have to do to to put this dot behind the first bit at 1
        //
        // Example with 0.09375:
        // binaryDecimalMantissa (0.09375) in binary      => 0|0|0|1|1000000000000000000
        // Get the position of the first bit at 1         => binaryDecimalMantissa.indexOf("1") + 1 => 4
        // We moved to the right so position is negative  => -4
        if (this.binaryIntegerMantissa === "0") {
            this._mantissaFloatPosition = -(this.binaryDecimalMantissa.indexOf("1") + 1);
        }
    };
    /**
     * Calculate the exponent in binary
     * e = binary(mantissaFloatPosition + bias)
     */
    BinaryFloat.prototype.calculateBinaryExponent = function () {
        var exponent = this.mantissaFloatPosition + this.bias;
        // If the number is 1 then all the bits of the exponent are equals to 0
        if (this.number === 0) {
            exponent = 0;
        }
        // Convert the exponent to binary and add leading 0 to match the exponent bits size
        this._binaryExponent = this._bh.decimalToBinary(exponent).padStart(this.exponentBitsSize, "0");
        // If the number is NaN or Infinity then all the bits of the exponent are equals to 1
        if (Number.isNaN(this.number) || this.number === Infinity) {
            this._binaryExponent = "".padEnd(this.exponentBitsSize, "1");
        }
    };
    /**
     * Calculate the exponent bias based on the exponent bit size
     * b = 2 ^ (exponentBitsSize - 1) - 1;
     */
    BinaryFloat.prototype.calculateBias = function () {
        this._bias = Math.pow(2, (this.exponentBitsSize - 1)) - 1;
    };
    return BinaryFloat;
}());


;// CONCATENATED MODULE: ./src/labo1.ts

var bf = new BinaryFloat();
var bitsSizeElement = document.getElementById("bits-size");
var floatingNumberElement = document.getElementById("floating-number");
var result = document.getElementById("result");
function onChange() {
    var res = "";
    var bitsSize = Number(bitsSizeElement.value);
    var floatingNumber = Number(floatingNumberElement.value);
    if (!bitsSize || !floatingNumber) {
        res = "Veuillez renseigner tous les champs";
    }
    bf.bitsSize = bitsSize;
    bf.number = floatingNumber;
    res = "\n    <div class=\"result-group\">\n      Taille en bits de l'exposant: ".concat(bf.exponentBitsSize, "\n    </div>\n    \n    <div class=\"result-group\">\n      Taille en bits de la mantisse: ").concat(bf.mantissaBitsSize, "\n    </div>\n\n    <div class=\"result-group\">\n      Biais: ").concat(bf.bias, "\n    </div>\n    \n    <div class=\"result-group\">\n      Signe:\n      <span class=\"color-red\">").concat(bf.binarySign, "</span>\n    </div>\n    \n    <div class=\"result-group\">\n      Mantisse:\n      <span class=\"color-orange\">\n        ").concat(bf.binaryMantissa, "\n      </span>\n    </div>\n\n    <div class=\"result-group\">\n      Exposant: <span class=\"color-blue\">").concat(bf.binaryExponent, "</span>\n    </div>\n    \n    <div class=\"result-group\">\n      R\u00E9sultat:\n      <span class=\"color-red\">").concat(bf.binarySign, "</span>\n      <span class=\"color-blue\">").concat(bf.binaryExponent, "</span>\n      <span class=\"color-orange\">").concat(bf.binaryMantissa, "</span>\n    </div>\n    \n    <div class=\"result-group\">\n      Nombre r\u00E9ellement cod\u00E9: ").concat(bf.computedNumber, "\n    </div>\n    \n    <div class=\"result-group\">\n      Marge d'erreur: ").concat(bf.error, "\n    </div>\n  ");
    result.innerHTML = res || "Resultat...";
}
bitsSizeElement.addEventListener("change", onChange);
bitsSizeElement.addEventListener("keyup", onChange);
floatingNumberElement.addEventListener("change", onChange);
floatingNumberElement.addEventListener("keyup", onChange);
onChange();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0FBQztJQUVGLE1BQU0sQ0FBQyxTQUFTLEdBQUcsR0FBRyxJQUFJLGFBQWEsQ0FBQztBQUMxQyxDQUFDO0FBRUQsZUFBZSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsQ0FBQztBQUNyRCxlQUFlLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0FBQ3BELHFCQUFxQixDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsQ0FBQztBQUMzRCxxQkFBcUIsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsUUFBUSxDQUFDLENBQUM7QUFFMUQsUUFBUSxFQUFFLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9tYXRoX3NwZS8uL3NyYy9jbGFzc2VzL0JpbmFyeUhlbHBlci50cyIsIndlYnBhY2s6Ly9tYXRoX3NwZS8uL3NyYy9jbGFzc2VzL0JpbmFyeUZsb2F0LnRzIiwid2VicGFjazovL21hdGhfc3BlLy4vc3JjL2xhYm8xLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBCaW5hcnlIZWxwZXIge1xuICAvKipcbiAgICogR2V0IG4gYml0IG9mIDAgb3IgMVxuICAgKiBAcGFyYW0gdmFsdWUgMSBvciAwXG4gICAqIEBwYXJhbSBuIFRoZSBudW1iZXIgb2YgYml0cyB0byByZXRyaWV2ZVxuICAgKiBAcmV0dXJucyBuIGJpdCBvZiAwIG9yIDFcbiAgICovXG4gIHB1YmxpYyBnZXROQml0KHZhbHVlOiAxIHwgMCwgbjogbnVtYmVyKTogc3RyaW5nIHtcbiAgICBsZXQgcmVzID0gXCJcIjtcbiAgICBcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG47IGkrKykge1xuICAgICAgcmVzICs9IHZhbHVlO1xuICAgIH1cblxuICAgIHJldHVybiByZXM7XG4gIH1cblxuICAvKipcbiAgICogQWRkIG4gemVyb3MgYmVmb3JlIHRoZSBiaW5hcnkgbnVtYmVyXG4gICAqIEBwYXJhbSBuIFRoZSBudW1iZXIgb2YgMCB0byBhZGQgYmVmb3JlIHRoZSBiaW5hcnkgbnVtYmVyXG4gICAqIEBwYXJhbSBiIFRoZSBiaW5hcnkgbnVtYmVyXG4gICAqIEByZXR1cm5zIFRoZSBiaW5hcnkgbnVtYmVyIHdpdGggbiB6ZXJvcyBiZWZvcmVcbiAgICovXG4gIHB1YmxpYyBhZGRQYWRkaW5nKG46IG51bWJlciwgYiA9IFwiXCIpIHtcbiAgICBjb25zdCBzaXplID0gbiAtIGIubGVuZ3RoO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaXplOyBpKyspIHtcbiAgICAgIGIgPSBcIjBcIiArIGI7XG4gICAgfVxuXG4gICAgcmV0dXJuIGI7XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlcyB0aGUgemVyb3MgYmVmb3JlIGEgYmluYXJ5IG51bWJlciAoMDAwMTAxIGJlY29tZXMgMTAxKVxuICAgKiBAcGFyYW0gYiBUaGUgYmluYXJ5IG51bWJlclxuICAgKiBAcmV0dXJucyBUaGUgcHJvZHVjZWQgYmluYXJ5IG51bWJlclxuICAgKi9cbiAgcHVibGljIGNsZWFuKGI6IHN0cmluZykge1xuICAgIGxldCByZXMgPSBiO1xuXG4gICAgZm9yKGxldCBpID0gMDsgaSA8IGIubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChiW2ldID09PSBcIjBcIikge1xuICAgICAgICByZXMgPSByZXMuc3Vic3RyaW5nKDEpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHJlcztcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAocmVzID09PSBcIlwiKSB7XG4gICAgICByZXR1cm4gXCIwXCI7XG4gICAgfVxuICB9XG5cblxuICAvKipcbiAgICogQWRkIDAgcGFkZGluZyB0byB0aGUgc21hbGxlc3QgYmluYXJ5IG51bWJlciB0byBtYXRjaCB0aGUgbG9uZ2VzdCBvbmUncyBsZW5ndGhcbiAgICogWzEwMSwgMTEwMDFdIGJlY29tZXMgWzAwMTAxLCAxMTAwMV1cbiAgICogQHBhcmFtIGIxIFRoZSBmaXJzdCBiaW5hcnkgbnVtYmVyXG4gICAqIEBwYXJhbSBiMiBUaGUgc2Vjb25kIGJpbmFyeSBudW1iZXJcbiAgICogQHJldHVybnMgW2IxLCBiMl0gd2l0aCBjb3JyZWN0IHBhZGRpbmdcbiAgICovXG4gIHB1YmxpYyBhZGRNYXhQYWRkaW5nKGIxOiBzdHJpbmcsIGIyOiBzdHJpbmcpIHtcbiAgICBpZiAoYjIubGVuZ3RoID4gYjEubGVuZ3RoKSB7XG4gICAgICBiMSA9IHRoaXMuYWRkUGFkZGluZyhiMi5sZW5ndGgsIGIxKTtcbiAgICB9IGVsc2UgaWYgKGIxLmxlbmd0aCA+IGIyLmxlbmd0aCkge1xuICAgICAgYjIgPSB0aGlzLmFkZFBhZGRpbmcoYjEubGVuZ3RoLCBiMik7XG4gICAgfVxuXG4gICAgcmV0dXJuIFtiMSwgYjJdO1xuICB9XG5cbiAgcHVibGljIGdldE1heExlbmd0aChiMTogc3RyaW5nLCBiMjogc3RyaW5nKSB7XG4gICAgaWYgKGIxLmxlbmd0aCA+IGIyLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIGIxLmxlbmd0aDtcbiAgICB9XG4gICAgcmV0dXJuIGIyLmxlbmd0aDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDb252ZXJ0IGEgbnVtYmVyIHRvIGl0J3MgYmluYXJ5IHJlcHJlc2VudGF0aW9uXG4gICAqIEBwYXJhbSBkZWNpbWFsIFRoZSBcbiAgICogQHJldHVybnMgVGhlIGJpbmFyeSByZXByZXNlbnRhdGlvbiBvZiB0aGUgZGVjaW1hbCBudW1iZXJcbiAgICovXG4gIHB1YmxpYyBkZWNpbWFsVG9CaW5hcnkoZGVjaW1hbDogbnVtYmVyKSB7XG4gICAgcmV0dXJuIChkZWNpbWFsID4+PiAwKS50b1N0cmluZygyKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDb252ZXJ0IGEgYmluYXJ5IHJlcHJlc2VudGF0aW9uIG9mIGEgbnVtYmVyIHRvIGEgZGVjaW1hbCBudW1iZXJcbiAgICogQHBhcmFtIGJpbmFyeSBUaGUgYmluYXJ5IHJlcHJlc2VudGF0aW9uIG9mIGEgbnVtYmVyXG4gICAqIEByZXR1cm5zIFRoZSBpbnQgcmVwcmVzZW50YXRpb24gb2YgYSBiaW5hcnkgbnVtYmVyXG4gICAqL1xuICBwdWJsaWMgYmluYXJ5VG9EZWNpbWFsKGJpbmFyeTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHBhcnNlSW50KGJpbmFyeSwgMik7XG4gIH1cblxuICAvKipcbiAgICogQWRkIGludCB0byBhIGJpbmFyeSBudW1iZXJcbiAgICogQHBhcmFtIGIgVGhlIGJpbmFyeSBudW1iZXJcbiAgICogQHBhcmFtIG4gVGhlIGludCBudW1iZXIgdG8gYWRkIHRvIHRoZSBiaW5hcnkgbnVtYmVyXG4gICAqIEByZXR1cm5zIFRoZSBwcm9kdWNlZCByZXN1bHRcbiAgICovXG4gIHB1YmxpYyBhZGROdW1iZXJUb0JpbmFyeShiOiBzdHJpbmcsIG46IG51bWJlcik6IHN0cmluZ1tdIHtcbiAgICByZXR1cm4gdGhpcy5iaW5hcnlBZGRpdGlvbihiLCB0aGlzLmRlY2ltYWxUb0JpbmFyeShuKSk7XG4gIH1cblxuICAvKipcbiAgICogSW52ZXJ0IGEgYmluYXJ5IG51bWJlclxuICAgKiBAcGFyYW0gYiBUaGUgYmluYXJ5IG51bWJlciB0byBpbnZlcnRcbiAgICogQHJldHVybnMgVGhlIGludmVydCBiaW5hcnkgbnVtYmVyXG4gICAqL1xuICBwdWJsaWMgaW52ZXJ0KGI6IHN0cmluZykge1xuICAgIGNvbnN0IGluaXRpYWxMZW5ndGggPSBiLmxlbmd0aDtcbiAgICBiID0gdGhpcy5kZWNpbWFsVG9CaW5hcnkodGhpcy5iaW5hcnlUb0RlY2ltYWwoYikgXiB0aGlzLmJpbmFyeVRvRGVjaW1hbCh0aGlzLmdldE5CaXQoMSwgYi5sZW5ndGgpKSk7XG4gICAgYiA9IHRoaXMuYWRkUGFkZGluZyhpbml0aWFsTGVuZ3RoLCBiKTtcbiAgICByZXR1cm4gYjtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGQgMiBiaXQgdG9nZXRoZXIgd2l0aCB0aGUgY2FycnlcbiAgICogQHBhcmFtIHggVGhlIGZpcnN0IGJpdFxuICAgKiBAcGFyYW0geSBUaGUgc2Vjb25kIGJpdFxuICAgKiBAcGFyYW0gY2FycnkgVGhlIGNhcnJ5XG4gICAqIEByZXR1cm5zIFRoZSByZXN1bHQgd2l0aCB0aGUgY2FycnkgW2JpdCwgY2FycnldXG4gICAqL1xuICBwdWJsaWMgZWxlbWVudGFyeUFkZGl0aW9uKHg6IHN0cmluZywgeTogc3RyaW5nLCBjYXJyeSA9IFwiXCIpOiBzdHJpbmdbXSB7XG4gICAgY29uc3QgcmVzID0gTnVtYmVyKHgpICsgTnVtYmVyKHkpICsgTnVtYmVyKGNhcnJ5KTtcblxuICAgIHN3aXRjaCAocmVzKSB7XG4gICAgICAvLyBjID0gMSwgeCA9IDEsIHkgPSAxXG4gICAgICBjYXNlIDM6XG4gICAgICAgIHJldHVybiBbXCIxXCIsIFwiMVwiXTtcbiAgICAgIGNhc2UgMjpcbiAgICAgICAgcmV0dXJuIFtcIjBcIiwgXCIxXCJdO1xuICAgICAgY2FzZSAxOlxuICAgICAgICByZXR1cm4gW1wiMVwiLCBcIlwiXTtcbiAgICAgIC8vIGMgPSAwLCB4ID0gMCwgeSA9IDBcbiAgICAgIGNhc2UgMDpcbiAgICAgICAgcmV0dXJuIFtcIjBcIiwgXCJcIl07XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEFkZCAyIGJpbmFyeSBudW1iZXJzXG4gICAqIEBwYXJhbSBiMSBUaGUgZmlyc3QgYmluYXJ5IG51bWJlclxuICAgKiBAcGFyYW0gYjIgVGhlIHNlY29uZCBiaW5hcnkgbnVtYmVyXG4gICAqIEByZXR1cm5zIFRoZSByZXN1bHQgb2YgdGhlIGFkZGl0aW9uXG4gICAqL1xuICBwdWJsaWMgYmluYXJ5QWRkaXRpb24oYjE6IHN0cmluZywgYjI6IHN0cmluZykge1xuICAgIGxldCByZXMgPSBcIlwiO1xuICAgIGxldCBjYXJyeSA9IFwiXCI7XG4gICAgY29uc3QgW2JwMSwgYnAyXSA9IHRoaXMuYWRkTWF4UGFkZGluZyhiMSwgYjIpO1xuXG4gICAgZm9yIChsZXQgaSA9IGJwMS5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgY29uc3QgW3IsIGNdID0gdGhpcy5lbGVtZW50YXJ5QWRkaXRpb24oYnAxW2ldLCBicDJbaV0sIGNhcnJ5KTtcbiAgICAgIHJlcyA9IHIgKyByZXM7XG4gICAgICBjYXJyeSA9IGM7XG4gICAgfVxuXG4gICAgcmV0dXJuIFtyZXMsIGNhcnJ5XTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTdWJzdHJhY3QgMiBiaW5hcnkgbnVtYmVyc1xuICAgKiBAcGFyYW0gYjEgVGhlIGZpcnN0IGJpbmFyeSBudW1iZXJcbiAgICogQHBhcmFtIGIyIFRoZSBzZWNvbmQgYmluYXJ5IG51bWJlclxuICAgKiBAcmV0dXJucyBUaGUgcmVzdWx0IG9mIHRoZSBzdWJzdHJhY3Rpb25cbiAgICovXG4gIHB1YmxpYyBiaW5hcnlTdWJzdHJhY3Rpb24oYjE6IHN0cmluZywgYjI6IHN0cmluZykge1xuICAgIGNvbnN0IFticDEsIGJwMl0gPSB0aGlzLmFkZE1heFBhZGRpbmcoYjEsIGIyKTtcbiAgICByZXR1cm4gdGhpcy5iaW5hcnlBZGRpdGlvbihicDEsIHRoaXMuYzIoYnAyKSk7XG4gIH1cblxuICBwdWJsaWMgYzIoYjogc3RyaW5nKTogc3RyaW5nIHtcbiAgICBiID0gdGhpcy5pbnZlcnQoYik7XG4gICAgcmV0dXJuIHRoaXMuYmluYXJ5QWRkaXRpb24oYiwgXCIxXCIpLnJldmVyc2UoKS5qb2luKFwiXCIpO1xuICB9XG5cbiAgLyoqXG4gICAqIE11bHRpcGx5IDIgYmluYXJ5IG51bWJlcnNcbiAgICogQHBhcmFtIGIxIFRoZSBmaXJzdCBiaW5hcnkgbnVtYmVyXG4gICAqIEBwYXJhbSBiMiBUaGUgc2Vjb25kIGJpbmFyeSBudW1iZXJcbiAgICogQHJldHVybnMgVGhlIHJlc3VsdCBvZiB0aGUgbXVsdGlwbGljYXRpb25cbiAgICovXG4gIHB1YmxpYyBiaW5hcnlNdWx0aXBsaWNhdGlvbihiMTogc3RyaW5nLCBiMjogc3RyaW5nKSB7XG4gICAgbGV0IHJlcyA9IFwiXCI7XG4gICAgY29uc3QgYWRkUmVzdWx0cyA9IFtdO1xuXG4gICAgLy8gVGhlIGJpbmFyeSBudW1iZXJzIHRvIG11bGl0cGx5XG4gICAgLy8gYnAxID0gMTAxMVxuICAgIC8vIGJwMiA9IDExMTFcbiAgICBjb25zdCBbYnAxLCBicDJdID0gdGhpcy5hZGRNYXhQYWRkaW5nKGIxLCBiMik7XG5cbiAgICAvLyBDYWxjdWxhdGUgdGhlIG9wZXJhbmRzXG4gICAgLy8gYWRkUmVzdWx0cyA9IFtcbiAgICAvLyAgICAwMDAwIDEwMTEsXG4gICAgLy8gICAgMDAwMSAwMTEwLFxuICAgIC8vICAgIDAwMTAgMTEwMCxcbiAgICAvLyAgICAxMDExIDAwMDBcbiAgICAvLyBdXG4gICAgZm9yIChsZXQgaSA9IGJwMS5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgbGV0IGN1cnJlbnRSZXMgPSBcIlwiO1xuXG4gICAgICBmb3IgKGxldCBqID0gYnAxLmxlbmd0aCAtIDE7IGogPj0gMDsgai0tKSB7XG4gICAgICAgIGN1cnJlbnRSZXMgPSAoTnVtYmVyKGJwMVtqXSkgKiBOdW1iZXIoYnAyW2ldKSkgKyBjdXJyZW50UmVzO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBkZWMgPSB0aGlzLmJpbmFyeVRvRGVjaW1hbChjdXJyZW50UmVzKSA8PCAoYnAxLmxlbmd0aCAtIDEgLSBpKTtcbiAgICAgIGN1cnJlbnRSZXMgPSB0aGlzLmRlY2ltYWxUb0JpbmFyeShkZWMpO1xuICAgICAgYWRkUmVzdWx0cy5wdXNoKGN1cnJlbnRSZXMpO1xuICAgIH1cblxuICAgIC8vIEFkZCBldmVyeXRoaW5nXG4gICAgLy8gcmVzID1cbiAgICAvLyAgIDAwMDAgMTAxMSxcbiAgICAvLyArIDAwMDEgMDExMCxcbiAgICAvLyArIDAwMTAgMTEwMCxcbiAgICAvLyArIDEwMTEgMDAwMFxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYWRkUmVzdWx0cy5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgYWRkUmVzdWx0ID0gdGhpcy5hZGRQYWRkaW5nKGFkZFJlc3VsdHNbYWRkUmVzdWx0cy5sZW5ndGggLSAxXS5sZW5ndGgsIGFkZFJlc3VsdHNbaV0pO1xuICAgICAgY29uc3QgW3IsIGNdID0gdGhpcy5iaW5hcnlBZGRpdGlvbihyZXMsIGFkZFJlc3VsdCk7XG4gICAgICByZXMgPSBjICsgcjtcbiAgICB9XG5cbiAgICAvLyByZXMgPSAxMDEwMDEwMVxuICAgIHJldHVybiByZXM7XG4gIH1cbn1cbiIsImltcG9ydCB7IEJpbmFyeUhlbHBlciB9IGZyb20gXCIuL0JpbmFyeUhlbHBlclwiO1xuXG4vKipcbiAqIENvZGUgYSBmbG9hdGluZyBudW1iZXIgd2l0aCBhIGNob29zZW4gYml0IHNpemUgYW5kIElFRUUgNzU0XG4gKi9cbmV4cG9ydCBjbGFzcyBCaW5hcnlGbG9hdCB7XG4gIHByaXZhdGUgX2JpdHNTaXplID0gMzI7XG4gIHByaXZhdGUgX251bWJlciA9IDA7XG4gIHByaXZhdGUgX2JpbmFyeUludGVnZXJNYW50aXNzYSA9IFwiXCI7XG4gIHByaXZhdGUgX2JpbmFyeURlY2ltYWxNYW50aXNzYSA9IFwiXCI7XG4gIHByaXZhdGUgX2JpbmFyeU1hbnRpc3NhID0gXCJcIjtcbiAgcHJpdmF0ZSBfbWFudGlzc2FGbG9hdFBvc2l0aW9uID0gMDtcbiAgcHJpdmF0ZSBfYmluYXJ5RXhwb25lbnQgPSBcIlwiO1xuICBwcml2YXRlIF9iaWFzID0gMDtcbiAgcHJpdmF0ZSBfYmggPSBuZXcgQmluYXJ5SGVscGVyKCk7XG5cbiAgLyoqXG4gICAqIFRoZSBiaXQgc2l6ZSB0byBjb2RlIHRoZSBudW1iZXJcbiAgICovXG4gIGdldCBiaXRzU2l6ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fYml0c1NpemU7XG4gIH1cblxuICBzZXQgYml0c1NpemUodmFsdWU6IG51bWJlcikge1xuICAgIHRoaXMuX2JpdHNTaXplID0gdmFsdWU7XG5cbiAgICBpZiAodmFsdWUgPiA4MCkge1xuICAgICAgdGhpcy5fYml0c1NpemUgPSA4MDtcbiAgICB9XG5cbiAgICBpZiAodmFsdWUgPCA4KSB7XG4gICAgICB0aGlzLl9iaXRzU2l6ZSA9IDg7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFRoZSBmbG9hdCBudW1iZXIgdG8gY29kZWQgd2l0aCBJRUVFIDc1NFxuICAgKi9cbiAgZ2V0IG51bWJlcigpIHtcbiAgICByZXR1cm4gdGhpcy5fbnVtYmVyO1xuICB9XG5cbiAgc2V0IG51bWJlcih2YWx1ZTogbnVtYmVyKSB7XG4gICAgdGhpcy5fbnVtYmVyID0gdmFsdWU7XG5cbiAgICB0aGlzLmNhbGN1bGF0ZUJpYXMoKTtcbiAgICB0aGlzLmNhbGN1bGF0ZUJpbmFyeUludGVnZXJNYW50aXNzYSgpO1xuICAgIHRoaXMuY2FsY3VsYXRlQmluYXJ5RGVjaW1hbE1hbnRpc3NhKCk7XG4gICAgdGhpcy5jYWxjdWxhdGVCaW5hcnlNYW50aXNzYSgpO1xuICAgIHRoaXMuY2FsY3VsYXRlTWFudGlzc2FGbG9hdFBvc2l0aW9uKCk7XG4gICAgdGhpcy5jYWxjdWxhdGVCaW5hcnlFeHBvbmVudCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgbWFudGlzc2EgYml0cyBzaXplXG4gICAqL1xuICBnZXQgbWFudGlzc2FCaXRzU2l6ZSgpIHtcbiAgICBpZiAodGhpcy5iaXRzU2l6ZSA8IDgpIHtcbiAgICAgIHJldHVybiAwO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmJpdHNTaXplIC0gdGhpcy5leHBvbmVudEJpdHNTaXplIC0gMTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIGV4cG9uZW50IGJpdHMgc2l6ZSB3aXRoOlxuICAgKiAtIFRoZSBJRUVFIDc1NCAyMDE5IGZvcm11bGEgaWYgdGhlIGJpdHMgc2l6ZSBpcyBncmVhdGVyIG9yIGVxdWFsIHRvIDEyOFxuICAgKiAtIEEgY3VzdG9tIGZvcm11bGEgaWYgdGhlIGJpdCBzaXplIGlzIGxlc3MgdGhhbiAxMjggdGhhdCBtYXRjaGVzIHRoZSBJRUVFIHN0YW5kYXJkXG4gICAqL1xuICBnZXQgZXhwb25lbnRCaXRzU2l6ZSgpIHtcbiAgICBpZiAodGhpcy5iaXRzU2l6ZSA8IDgpIHtcbiAgICAgIHJldHVybiAwO1xuICAgIH1cblxuICAgIC8vIElFRUUgNzU0IDIwMTkgZm9ybXVsYSA+PSAxMjhcbiAgICBpZiAodGhpcy5iaXRzU2l6ZSA+PSAxMjgpIHtcbiAgICAgIHJldHVybiBNYXRoLnJvdW5kKDQgKiBNYXRoLmxvZzIodGhpcy5iaXRzU2l6ZSkpIC0gMTM7XG4gICAgfVxuXG4gICAgLy8gQSBmb3JtdWxhIHRoYXQgbWF0Y2hlcyB0aGUgdmFsdWVzIGZvciA8IDEyOFxuICAgIC8vIHJlZjogaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9hLzYyNjMyMjYwXG4gICAgcmV0dXJuIE1hdGgucm91bmQoKE1hdGgubG9nMih0aGlzLmJpdHNTaXplKSAtIDEpICoqICgzIC8gMikpO1xuICB9XG5cbiAgZ2V0IHBvc2l0aXZlTnVtYmVyKCkge1xuICAgIHJldHVybiBNYXRoLmFicyh0aGlzLm51bWJlcik7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJuIHRoZSB0cnVuY2F0ZWQgaW50ZWdlciBwYXJ0IGluIGJpbmFyeSB0aGF0IGlzIGNvZGVkIGluIHRoZSBtYW50aXNzYVxuICAgKiAoVGhlIGZpcnN0IGJpdCBhdCAxIGlzIGhpZGRlbilcbiAgICogMC4wOTM3NSAgPT4gICAgIFwiMFwiXG4gICAqIDE5LjU5Mzc1ID0+IFwiMDAxMVwiXG4gICAqL1xuICBnZXQgYmluYXJ5SW50ZWdlck1hbnRpc3NhKCkge1xuICAgIHJldHVybiB0aGlzLl9iaW5hcnlJbnRlZ2VyTWFudGlzc2E7XG4gIH1cblxuICAvKipcbiAgICogVGhlIGRlY2ltYWwgcGFydCBvZiB0aGUgbnVtYmVyIGluIGJpbmFyeSB0aGF0IGlzIGNvZGVkIGluIHRoZSBtYW50aXNzYVxuICAgKiAxOS41OTM3NSA9PiBcIjAwMTExMDAxMTAwMDAwMDAwMDAwMDAwXCJcbiAgICovXG4gIGdldCBiaW5hcnlEZWNpbWFsTWFudGlzc2EoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2JpbmFyeURlY2ltYWxNYW50aXNzYTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDYWxjdWxhdGUgdGhlIHBvc2l0aW9uIG9mIHRoZSBkb3QgaW4gdGhlIG1hbnRpc3NhXG4gICAqICAgICAgICAgICAgZmxvYXQgcG9zaXRpb25cbiAgICogICAgICAgICAgICAgICAgICB8XG4gICAqICAgICAgICAgICAgICAgICAgdlxuICAgKiBtYW50aXNzYSgxOS41OTM3NSkgPT4gXCIwMDExLjEwMDExMDAwMDAwMDAwMDAwMDBcIlxuICAgKi9cbiAgZ2V0IG1hbnRpc3NhRmxvYXRQb3NpdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5fbWFudGlzc2FGbG9hdFBvc2l0aW9uO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgZXhwb25lbnQgb2YgdGhlIG51bWJlciBpbiBiaW5hcnkgd2l0aCB0aGUgYmlhc1xuICAgKiBtYW50aXNzYSgxOS41OTM3NSkgPT4gXCIxMDAwMDAxMFwiXG4gICAqL1xuICBnZXQgYmluYXJ5RXhwb25lbnQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2JpbmFyeUV4cG9uZW50O1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgZnVsbCBtYW50aXNzYSBvZiB0aGUgbnVtYmVyXG4gICAqL1xuICBnZXQgYmluYXJ5TWFudGlzc2EoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2JpbmFyeU1hbnRpc3NhO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgZnVsbCBudW1iZXIgY29kZWQgaW4gYmluYXJ5IHdpdGggSUVFRSA3NTRcbiAgICovXG4gIGdldCBiaW5hcnlGbG9hdGluZ051bWJlcigpIHtcbiAgICByZXR1cm4gdGhpcy5iaW5hcnlTaWduICsgdGhpcy5iaW5hcnlFeHBvbmVudCArIHRoaXMuYmluYXJ5TWFudGlzc2E7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJuIHRoZSBiaWFzIG9mIHRoZSBudW1iZXIgYmFzZWQgb24gdGhlIGV4cG9uZW50IGJpdCBzaXplXG4gICAqIGIgPSAyIF4gKGV4cG9uZW50Qml0c1NpemUgLSAxKSAtIDFcbiAgICovXG4gIGdldCBiaWFzKCkge1xuICAgIHJldHVybiB0aGlzLl9iaWFzO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoZSBudW1iZXIgdGhhdCBpcyBjb2RlZCBpbiBtZW1vcnlcbiAgICovXG4gIGdldCBjb21wdXRlZE51bWJlcigpIHtcbiAgICBpZiAoXG4gICAgICBOdW1iZXIuaXNOYU4odGhpcy5udW1iZXIpIHx8XG4gICAgICB0aGlzLm51bWJlciA9PT0gSW5maW5pdHkgfHxcbiAgICAgIHRoaXMubnVtYmVyID09PSAwXG4gICAgKSB7XG4gICAgICByZXR1cm4gdGhpcy5udW1iZXI7XG4gICAgfVxuXG4gICAgY29uc3Qgc2lnbiA9IHRoaXMuYmluYXJ5U2lnbiA9PT0gXCIxXCIgPyAtMSA6IDE7XG4gICAgbGV0IGNvbXB1dGVkRXhwb25lbnQgPSB0aGlzLl9iaC5iaW5hcnlUb0RlY2ltYWwodGhpcy5iaW5hcnlFeHBvbmVudCkgLSB0aGlzLmJpYXMgKyAxO1xuICAgIGNvbnN0IG1hbnRpc3NhID0gdGhpcy5fYmguYmluYXJ5VG9EZWNpbWFsKFwiMVwiICsgdGhpcy5iaW5hcnlNYW50aXNzYSkgLyAyICoqIHRoaXMubWFudGlzc2FCaXRzU2l6ZTtcblxuICAgIGlmICh0aGlzLm51bWJlciA+IDAgJiYgdGhpcy5udW1iZXIgPCAxKSB7XG4gICAgICBjb21wdXRlZEV4cG9uZW50IC09IDE7XG4gICAgfVxuXG4gICAgcmV0dXJuIHNpZ24gKiAyICoqIGNvbXB1dGVkRXhwb25lbnQgKiBtYW50aXNzYTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIG1hcmdpbiBvZiBlcnJvclxuICAgKi9cbiAgZ2V0IGVycm9yKCkgeyAgICBcbiAgICBpZiAoTnVtYmVyLmlzTmFOKHRoaXMubnVtYmVyKSB8fCB0aGlzLm51bWJlciA9PT0gSW5maW5pdHkgfHwgdGhpcy5udW1iZXIgPT09IDApIHtcbiAgICAgIHJldHVybiAwO1xuICAgIH1cblxuICAgIHJldHVybiBNYXRoLmFicyh0aGlzLm51bWJlciAtIHRoaXMuY29tcHV0ZWROdW1iZXIpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybiB0aGUgYmluYXJ5IHJlcHJlc2VudGF0aW9uIG9mIHRoZSBzaWduXG4gICAqIDAgaWYgbnVtYmVyID49IDBcbiAgICogMSBpZiBudW1iZXIgPCAwXG4gICAqL1xuICBnZXQgYmluYXJ5U2lnbigpOiBcIjBcIiB8IFwiMVwiIHtcbiAgICByZXR1cm4gdGhpcy5udW1iZXIgPCAwID8gXCIxXCIgOiBcIjBcIjsgXG4gIH1cblxuICAvKipcbiAgICogQ2FsY3VsYXRlIHRoZSBpbnRlZ2VyIHBhcnQgb2YgdGhlIG51bWJlciBmb3IgdGhlIG1hbnRpc3NhXG4gICAqIDE5LjU5Mzc1ID0+IDE5ID0+IFwiMTAwMTFcIlxuICAgKi9cbiAgcHJpdmF0ZSBjYWxjdWxhdGVCaW5hcnlJbnRlZ2VyTWFudGlzc2EoKSB7XG4gICAgLy8gR2V0IHRoZSBpbnRlZ2VyIHBhcnRcbiAgICBjb25zdCBmcm9udCA9IE1hdGgudHJ1bmModGhpcy5wb3NpdGl2ZU51bWJlcik7XG4gICAgbGV0IHJlcyA9IHRoaXMuX2JoLmRlY2ltYWxUb0JpbmFyeShmcm9udCk7XG4gICAgXG4gICAgLy8gRG8gbm90IGhpZGUgdGhlIGZpcnN0IGJpdCBpZiB0aGUgZmlyc3QgYml0IGlzIDBcbiAgICAvLyBmb3IgbnVtYmVyIGluY2x1ZGVkIGluIFswLCAxW1xuICAgIGlmIChyZXMgIT09IFwiMFwiKSB7XG4gICAgICByZXMgPSByZXMuc3Vic3RyaW5nKDEpO1xuICAgIH1cblxuICAgIHRoaXMuX2JpbmFyeUludGVnZXJNYW50aXNzYSA9IHJlcztcblxuICAgIC8vIElmIHRoZSBudW1iZXIgaXMgTmFOIHRoZXJlIGlzIG5vIGludGVnZXIgcGFydFxuICAgIGlmIChOdW1iZXIuaXNOYU4odGhpcy5udW1iZXIpKSB7XG4gICAgICB0aGlzLl9iaW5hcnlJbnRlZ2VyTWFudGlzc2EgPSBcIlwiO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDYWxjdWxhdGUgdGhlIGRlY2ltYWwgcGFydCBvZiB0aGUgbnVtYmVyIGZvciB0aGUgbWFudGlzc2FcbiAgICogXG4gICAqL1xuICBwcml2YXRlIGNhbGN1bGF0ZUJpbmFyeURlY2ltYWxNYW50aXNzYSgpIHtcbiAgICBsZXQgcmVzID0gXCJcIjtcblxuICAgIC8vIEdldCB0aGUgZGVjaW1hbHMgb2YgdGhlIG51bWJlcjogZGVjaW1hbHMgPSAxOS41OTM3NSAtIDE5ID0gMC41OTM3NVxuICAgIGxldCBkZWNpbWFscyA9IHRoaXMucG9zaXRpdmVOdW1iZXIgLSBNYXRoLnRydW5jKHRoaXMucG9zaXRpdmVOdW1iZXIpO1xuXG4gICAgLy8gR2V0IHRoZSBudW1iZXIgb2YgYml0cyBkZWRpY2F0ZWQgdG8gc3RvcmUgdGhlIGRlY2ltYWxzIGluIHRoZSBtYW50aXNzYVxuICAgIGNvbnN0IGRlY2ltYWxzQml0c1NpemUgPSB0aGlzLm1hbnRpc3NhQml0c1NpemUgLSB0aGlzLmJpbmFyeUludGVnZXJNYW50aXNzYS5sZW5ndGggLSAxO1xuXG4gICAgLy8gMC41OTM3NSAqIDIgPSAxLjE4NzUgID0+IDFcbiAgICAvLyAwLjE4NzUgICogMiA9IDAuMzc1ICAgPT4gMFxuICAgIC8vIDAuMzc1ICAgKiAyID0gMC43NSAgICA9PiAwXG4gICAgLy8gMC43NSAgICAqIDIgPSAxLjUgICAgID0+IDFcbiAgICAvLyAwLjUgICAgICogMiA9IDEgICAgICAgPT4gMVxuICAgIGZvcihsZXQgaSA9IDA7IGkgPCBkZWNpbWFsc0JpdHNTaXplOyBpKyspIHtcbiAgICAgIGRlY2ltYWxzICo9IDI7XG5cbiAgICAgIGlmIChkZWNpbWFscyA+PSAxKSB7XG4gICAgICAgIGRlY2ltYWxzIC09IDE7XG4gICAgICAgIHJlcyArPSBcIjFcIjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlcyArPSBcIjBcIjtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBJZiB0aGUgbnVtYmVyIGlzIE5hTiB0aGVuIGFsbCB0aGUgYml0IG9mIHRoZSBtYW50aXNzYSBhcmUgZXF1YWxzIHRvIDFcbiAgICBpZiAoTnVtYmVyLmlzTmFOKHRoaXMubnVtYmVyKSkge1xuICAgICAgcmVzID0gXCJcIi5wYWRFbmQoZGVjaW1hbHNCaXRzU2l6ZSArIDEsIFwiMVwiKTtcbiAgICB9XG5cbiAgICB0aGlzLl9iaW5hcnlEZWNpbWFsTWFudGlzc2EgPSByZXM7XG4gIH1cblxuICAvKipcbiAgICogQ29uY2F0ZW5hdGUgdGhlIGludGVnZXIgcGFydCBvZiB0aGUgbWFudGlzc2EgYW5kIHRoZSBkZWNpbWFscyBwYXJ0XG4gICAqL1xuICBwcml2YXRlIGNhbGN1bGF0ZUJpbmFyeU1hbnRpc3NhKCkge1xuICAgIGxldCByZXMgPSB0aGlzLmJpbmFyeUludGVnZXJNYW50aXNzYSArIHRoaXMuYmluYXJ5RGVjaW1hbE1hbnRpc3NhO1xuICAgIFxuICAgIC8vIElmIHRoZSBpbnRlZ2VyIHBhcnQgaXMgZXF1YWwgdG8gMFxuICAgIC8vIHRoZW4gcmVtb3ZlIHRoZSBsZWFkaW5nIDAgZnJvbSB0aGUgY29tcGxldGUgbWFudGlzc2FcbiAgICAvLyBhbmQgaGlkZSB0aGUgZmlyc3QgYml0ICg9IDEpXG4gICAgLy8gXG4gICAgLy8gcmVzID0+IFwiMDAwMDExMDAwMDAwMDAwMDAwMDAwMDAwXCJcbiAgICAvLyBpZiBiaW5hcnlJbnRlZ2VyTWFudGlzc2EgPT0gXCIwXCIgdGhlbjpcbiAgICAvLyAgICBjbGVhbihyZXMpICAgID0+IHJlbW92ZXMgbGVhZGluZyAwIGZyb20gMDAwMDExMDAwMDAwMDAwMDAwMDAwMDAwICAgICA9PiAxMTAwMDAwMDAwMDAwMDAwMDAwMFxuICAgIC8vICAgIGhpZGVCaXQocmVzKSAgPT4gaGlkZSB0aGUgZmlyc3QgYml0ICg9IDEpIGZyb20gMTEwMDAwMDAwMDAwMDAwMDAwMDAgID0+IDEwMDAwMDAwMDAwMDAwMDAwMDAgXG4gICAgaWYgKHRoaXMuYmluYXJ5SW50ZWdlck1hbnRpc3NhID09PSBcIjBcIikge1xuICAgICAgcmVzID0gdGhpcy5fYmguY2xlYW4ocmVzKTtcbiAgICAgIHJlcyA9IHJlcy5zdWJzdHJpbmcoMSk7XG4gICAgfVxuXG4gICAgLy8gTWFrZXMgc3VyZSB0aGF0IHRoZSBtYW50aXNzYSBtYWtlcyB0aGUgcmlnaHQgbGVuZ3RoIChtYW50aXNzYUJpdHNTaXplKSBieSBhZGRpbmcgMCB0byB0aGUgZW5kXG4gICAgcmVzID0gcmVzLnBhZEVuZCh0aGlzLm1hbnRpc3NhQml0c1NpemUsIFwiMFwiKTtcblxuICAgIHRoaXMuX2JpbmFyeU1hbnRpc3NhID0gcmVzO1xuICB9XG5cbiAgLyoqXG4gICAqIENhbGN1bGF0ZSB0aGUgcG9zaXRpb24gb2YgdGhlIGZsb2F0aW5nIHBvaW50IGluIHRoZSBtYW50aXNzYVxuICAgKiBcbiAgICogICAgICAgICAgICAgICAgICBmbG9hdCBwb3NpdGlvblxuICAgKiAgICAgICAgICAgICAgICAgICAgICAgfFxuICAgKiAgICAgICAgICAgICAgICAgICAgICAgdlxuICAgKiBiaW5hcnlJbnRlZ2VyTWFudGlzc2EgLiBiaW5hcnlEZWNpbWFsTWFudGlzc2FcbiAgICovXG4gIHByaXZhdGUgY2FsY3VsYXRlTWFudGlzc2FGbG9hdFBvc2l0aW9uKCkge1xuICAgIC8vIFwiMTAwMTFcIi5sZW5ndGggLSAxID0+IDUgLSAxID0+IDRcbiAgICAvLyAoLTEgYmVjYXVzZSB3ZSBoYXZlIGhpZGRlbiB0aGUgZmlyc3QgYml0KVxuICAgIHRoaXMuX21hbnRpc3NhRmxvYXRQb3NpdGlvbiA9IHRoaXMuYmluYXJ5SW50ZWdlck1hbnRpc3NhLmxlbmd0aCAtIDE7XG5cbiAgICAvLyBJZiB0aGUgbnVtYmVyIGlzIGluY2x1ZGVkIGluIFswLCAxW1xuICAgIC8vIHRoZW4gdGhlIHBvc2l0aW9uIG9mIHRoZSBkb3QgaXMgY2FsY3VsYXRlZCBieSBmaW5kaW5nIHRoZSBudW1iZXIgb2YgXCJqdW1wc1wiXG4gICAgLy8gd2UgaGF2ZSB0byBkbyB0byB0byBwdXQgdGhpcyBkb3QgYmVoaW5kIHRoZSBmaXJzdCBiaXQgYXQgMVxuICAgIC8vXG4gICAgLy8gRXhhbXBsZSB3aXRoIDAuMDkzNzU6XG4gICAgLy8gYmluYXJ5RGVjaW1hbE1hbnRpc3NhICgwLjA5Mzc1KSBpbiBiaW5hcnkgICAgICA9PiAwfDB8MHwxfDEwMDAwMDAwMDAwMDAwMDAwMDBcbiAgICAvLyBHZXQgdGhlIHBvc2l0aW9uIG9mIHRoZSBmaXJzdCBiaXQgYXQgMSAgICAgICAgID0+IGJpbmFyeURlY2ltYWxNYW50aXNzYS5pbmRleE9mKFwiMVwiKSArIDEgPT4gNFxuICAgIC8vIFdlIG1vdmVkIHRvIHRoZSByaWdodCBzbyBwb3NpdGlvbiBpcyBuZWdhdGl2ZSAgPT4gLTRcbiAgICBpZiAodGhpcy5iaW5hcnlJbnRlZ2VyTWFudGlzc2EgPT09IFwiMFwiKSB7XG4gICAgICB0aGlzLl9tYW50aXNzYUZsb2F0UG9zaXRpb24gPSAtKHRoaXMuYmluYXJ5RGVjaW1hbE1hbnRpc3NhLmluZGV4T2YoXCIxXCIpICsgMSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENhbGN1bGF0ZSB0aGUgZXhwb25lbnQgaW4gYmluYXJ5XG4gICAqIGUgPSBiaW5hcnkobWFudGlzc2FGbG9hdFBvc2l0aW9uICsgYmlhcylcbiAgICovXG4gIHByaXZhdGUgY2FsY3VsYXRlQmluYXJ5RXhwb25lbnQoKSB7XG4gICAgbGV0IGV4cG9uZW50ID0gdGhpcy5tYW50aXNzYUZsb2F0UG9zaXRpb24gKyB0aGlzLmJpYXM7XG5cbiAgICAvLyBJZiB0aGUgbnVtYmVyIGlzIDEgdGhlbiBhbGwgdGhlIGJpdHMgb2YgdGhlIGV4cG9uZW50IGFyZSBlcXVhbHMgdG8gMFxuICAgIGlmICh0aGlzLm51bWJlciA9PT0gMCkge1xuICAgICAgZXhwb25lbnQgPSAwO1xuICAgIH1cblxuICAgIC8vIENvbnZlcnQgdGhlIGV4cG9uZW50IHRvIGJpbmFyeSBhbmQgYWRkIGxlYWRpbmcgMCB0byBtYXRjaCB0aGUgZXhwb25lbnQgYml0cyBzaXplXG4gICAgdGhpcy5fYmluYXJ5RXhwb25lbnQgPSB0aGlzLl9iaC5kZWNpbWFsVG9CaW5hcnkoZXhwb25lbnQpLnBhZFN0YXJ0KHRoaXMuZXhwb25lbnRCaXRzU2l6ZSwgXCIwXCIpO1xuXG4gICAgLy8gSWYgdGhlIG51bWJlciBpcyBOYU4gb3IgSW5maW5pdHkgdGhlbiBhbGwgdGhlIGJpdHMgb2YgdGhlIGV4cG9uZW50IGFyZSBlcXVhbHMgdG8gMVxuICAgIGlmIChOdW1iZXIuaXNOYU4odGhpcy5udW1iZXIpIHx8IHRoaXMubnVtYmVyID09PSBJbmZpbml0eSkge1xuICAgICAgdGhpcy5fYmluYXJ5RXhwb25lbnQgPSBcIlwiLnBhZEVuZCh0aGlzLmV4cG9uZW50Qml0c1NpemUsIFwiMVwiKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ2FsY3VsYXRlIHRoZSBleHBvbmVudCBiaWFzIGJhc2VkIG9uIHRoZSBleHBvbmVudCBiaXQgc2l6ZVxuICAgKiBiID0gMiBeIChleHBvbmVudEJpdHNTaXplIC0gMSkgLSAxO1xuICAgKi9cbiAgcHJpdmF0ZSBjYWxjdWxhdGVCaWFzKCkge1xuICAgIHRoaXMuX2JpYXMgPSAyICoqICh0aGlzLmV4cG9uZW50Qml0c1NpemUgLSAxKSAtIDE7XG4gIH1cbn1cbiIsImltcG9ydCB7IEJpbmFyeUZsb2F0IH0gZnJvbSBcIi4vY2xhc3Nlcy9CaW5hcnlGbG9hdFwiO1xuXG5jb25zdCBiZiA9IG5ldyBCaW5hcnlGbG9hdCgpO1xuXG5jb25zdCBiaXRzU2l6ZUVsZW1lbnQgPSA8SFRNTElucHV0RWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImJpdHMtc2l6ZVwiKTtcbmNvbnN0IGZsb2F0aW5nTnVtYmVyRWxlbWVudCA9IDxIVE1MSW5wdXRFbGVtZW50PmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZmxvYXRpbmctbnVtYmVyXCIpO1xuY29uc3QgcmVzdWx0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyZXN1bHRcIik7XG5cbmZ1bmN0aW9uIG9uQ2hhbmdlKCkge1xuICBsZXQgcmVzID0gXCJcIjtcbiAgY29uc3QgYml0c1NpemUgPSBOdW1iZXIoYml0c1NpemVFbGVtZW50LnZhbHVlKTtcbiAgY29uc3QgZmxvYXRpbmdOdW1iZXIgPSBOdW1iZXIoZmxvYXRpbmdOdW1iZXJFbGVtZW50LnZhbHVlKTtcblxuICBpZiAoIWJpdHNTaXplIHx8ICFmbG9hdGluZ051bWJlcikge1xuICAgIHJlcyA9IFwiVmV1aWxsZXogcmVuc2VpZ25lciB0b3VzIGxlcyBjaGFtcHNcIjtcbiAgfVxuXG4gIGJmLmJpdHNTaXplID0gYml0c1NpemU7XG4gIGJmLm51bWJlciA9IGZsb2F0aW5nTnVtYmVyO1xuXG4gIHJlcyA9IGBcbiAgICA8ZGl2IGNsYXNzPVwicmVzdWx0LWdyb3VwXCI+XG4gICAgICBUYWlsbGUgZW4gYml0cyBkZSBsJ2V4cG9zYW50OiAke2JmLmV4cG9uZW50Qml0c1NpemV9XG4gICAgPC9kaXY+XG4gICAgXG4gICAgPGRpdiBjbGFzcz1cInJlc3VsdC1ncm91cFwiPlxuICAgICAgVGFpbGxlIGVuIGJpdHMgZGUgbGEgbWFudGlzc2U6ICR7YmYubWFudGlzc2FCaXRzU2l6ZX1cbiAgICA8L2Rpdj5cblxuICAgIDxkaXYgY2xhc3M9XCJyZXN1bHQtZ3JvdXBcIj5cbiAgICAgIEJpYWlzOiAke2JmLmJpYXN9XG4gICAgPC9kaXY+XG4gICAgXG4gICAgPGRpdiBjbGFzcz1cInJlc3VsdC1ncm91cFwiPlxuICAgICAgU2lnbmU6XG4gICAgICA8c3BhbiBjbGFzcz1cImNvbG9yLXJlZFwiPiR7YmYuYmluYXJ5U2lnbn08L3NwYW4+XG4gICAgPC9kaXY+XG4gICAgXG4gICAgPGRpdiBjbGFzcz1cInJlc3VsdC1ncm91cFwiPlxuICAgICAgTWFudGlzc2U6XG4gICAgICA8c3BhbiBjbGFzcz1cImNvbG9yLW9yYW5nZVwiPlxuICAgICAgICAke2JmLmJpbmFyeU1hbnRpc3NhfVxuICAgICAgPC9zcGFuPlxuICAgIDwvZGl2PlxuXG4gICAgPGRpdiBjbGFzcz1cInJlc3VsdC1ncm91cFwiPlxuICAgICAgRXhwb3NhbnQ6IDxzcGFuIGNsYXNzPVwiY29sb3ItYmx1ZVwiPiR7YmYuYmluYXJ5RXhwb25lbnR9PC9zcGFuPlxuICAgIDwvZGl2PlxuICAgIFxuICAgIDxkaXYgY2xhc3M9XCJyZXN1bHQtZ3JvdXBcIj5cbiAgICAgIFLDqXN1bHRhdDpcbiAgICAgIDxzcGFuIGNsYXNzPVwiY29sb3ItcmVkXCI+JHtiZi5iaW5hcnlTaWdufTwvc3Bhbj5cbiAgICAgIDxzcGFuIGNsYXNzPVwiY29sb3ItYmx1ZVwiPiR7YmYuYmluYXJ5RXhwb25lbnR9PC9zcGFuPlxuICAgICAgPHNwYW4gY2xhc3M9XCJjb2xvci1vcmFuZ2VcIj4ke2JmLmJpbmFyeU1hbnRpc3NhfTwvc3Bhbj5cbiAgICA8L2Rpdj5cbiAgICBcbiAgICA8ZGl2IGNsYXNzPVwicmVzdWx0LWdyb3VwXCI+XG4gICAgICBOb21icmUgcsOpZWxsZW1lbnQgY29kw6k6ICR7YmYuY29tcHV0ZWROdW1iZXJ9XG4gICAgPC9kaXY+XG4gICAgXG4gICAgPGRpdiBjbGFzcz1cInJlc3VsdC1ncm91cFwiPlxuICAgICAgTWFyZ2UgZCdlcnJldXI6ICR7YmYuZXJyb3J9XG4gICAgPC9kaXY+XG4gIGA7XG5cbiAgcmVzdWx0LmlubmVySFRNTCA9IHJlcyB8fCBcIlJlc3VsdGF0Li4uXCI7XG59XG5cbmJpdHNTaXplRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsIG9uQ2hhbmdlKTtcbmJpdHNTaXplRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwia2V5dXBcIiwgb25DaGFuZ2UpO1xuZmxvYXRpbmdOdW1iZXJFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgb25DaGFuZ2UpO1xuZmxvYXRpbmdOdW1iZXJFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXl1cFwiLCBvbkNoYW5nZSk7XG5cbm9uQ2hhbmdlKCk7Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9
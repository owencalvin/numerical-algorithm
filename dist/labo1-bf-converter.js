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
        return this.decimalToBinary(this.binaryToDecimal(b) * Math.pow(2, shiftValue));
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
 * Encode a floating number with a choosen bit size and IEEE 754
 */
var BinaryFloat = /** @class */ (function () {
    function BinaryFloat(numberOrBinary, bitsSize) {
        this._bitsSize = 32;
        this._number = 0;
        this._binarySign = "0";
        this._binaryMantissa = "";
        this._overflow = false;
        this._mantissaDotPosition = 0;
        this._binaryExponent = "";
        this._bias = 0;
        this._bh = new BinaryHelper();
        if (typeof numberOrBinary === "string") {
            // Remove the spaces in the string
            numberOrBinary = numberOrBinary.trim();
            numberOrBinary = numberOrBinary.replace(/\s/g, "");
            this.bitsSize = numberOrBinary.length;
            this.number = 1;
            // Slice the string to assign the binary number to the correct part of the binary representation of the float
            this.binarySign = numberOrBinary[0];
            this.binaryExponent = numberOrBinary.slice(1, this.exponentBitsSize + 1);
            this.binaryMantissa = numberOrBinary.slice(this.exponentBitsSize + 1, this.bitsSize);
        }
        else {
            this.bitsSize = bitsSize;
            this.number = numberOrBinary;
        }
    }
    BinaryFloat.getInfinity = function (bitsSize) {
        return new BinaryFloat(Infinity, bitsSize);
    };
    BinaryFloat.getNaN = function (bitsSize) {
        return new BinaryFloat(NaN, bitsSize);
    };
    Object.defineProperty(BinaryFloat.prototype, "number", {
        /**
         * The float number to coded with IEEE 754
         */
        get: function () {
            return this._number;
        },
        set: function (value) {
            this._number = value;
            this.calculateBinarySign();
            this.calculateBias();
            this.calculateBinaryMantissa();
            this.calculateBinaryExponent();
        },
        enumerable: false,
        configurable: true
    });
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
         *
         * Visualize the function on geogebra:
         * https://www.geogebra.org/calculator/cerrkdfv
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
    Object.defineProperty(BinaryFloat.prototype, "mantissaDotPosition", {
        /**
         * Calculate the position of the dot in the mantissa
         *            float position
         *                  |
         *                  v
         * mantissa(19.59375) => "0011.1001100000000000000"
         */
        get: function () {
            return this._mantissaDotPosition;
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
        set: function (value) {
            this._binaryExponent = value;
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
    Object.defineProperty(BinaryFloat.prototype, "binaryMantissa", {
        /**
         * Get the full mantissa of the number
         */
        get: function () {
            return this._binaryMantissa;
        },
        set: function (value) {
            this._binaryMantissa = value;
            this._overflow = value.length > this.mantissaBitsSize;
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
    Object.defineProperty(BinaryFloat.prototype, "computedSign", {
        /**
         * The sign in it's decimal form
         */
        get: function () {
            return this.binarySign === "1" ? -1 : 1;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BinaryFloat.prototype, "computedExponent", {
        /**
         * The exponent in it's decimal form
         */
        get: function () {
            return this._bh.binaryToDecimal(this.binaryExponent) - this.bias;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BinaryFloat.prototype, "computedMantissa", {
        /**
         * The mantissa in it's decimal form
         */
        get: function () {
            return this._bh.binaryToDecimal("1" + this.binaryMantissa) / Math.pow(2, this.mantissaBitsSize);
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
            if (this.binaryExponent.indexOf("0") === -1 &&
                this.binaryMantissa.indexOf("0") === -1 &&
                this.binarySign === "0") {
                return NaN;
            }
            if (this.binaryExponent.indexOf("0") === -1 &&
                this.binaryMantissa.indexOf("1") === -1 &&
                this.binarySign === "0") {
                return Infinity;
            }
            return this.computedSign * Math.pow(2, this.computedExponent) * this.computedMantissa;
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
            return this._binarySign;
        },
        set: function (value) {
            this._binarySign = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BinaryFloat.prototype, "overflow", {
        /**
         * True if the number cannot be encoded in <bitsSize> bits
         */
        get: function () {
            return this._overflow;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Determine the binary sign of the number
     */
    BinaryFloat.prototype.calculateBinarySign = function () {
        this._binarySign = this.number < 0 ? "1" : "0";
    };
    /**
     * Calculate the exponent bias based on the exponent bit size
     * b = 2 ^ (exponentBitsSize - 1) - 1;
     */
    BinaryFloat.prototype.calculateBias = function () {
        this._bias = Math.pow(2, (this.exponentBitsSize - 1)) - 1;
    };
    /**
     * Determine the binary mantissa and determine the dot position in the mantissa
     */
    BinaryFloat.prototype.calculateBinaryMantissa = function () {
        if (Number.isNaN(this.number)) {
            this._mantissaDotPosition = 0;
            this._binaryMantissa = "".padEnd(this.mantissaBitsSize, "1");
            return;
        }
        // Get the integer part
        var integerPart = Math.trunc(this.positiveNumber);
        // Get the decimals of the number: decimals = 19.59375 - 19 = 0.59375
        var decimalsPart = this.positiveNumber - Math.trunc(this.positiveNumber);
        var binaryIntegerPart = this._bh.decimalToBinary(integerPart);
        // Get the number of bits dedicated to store the decimals in the mantissa
        var decimalsBitsSize = this.mantissaBitsSize - binaryIntegerPart.length - 1;
        var binaryDecimalsPart = "";
        // 0.59375 * 2 = 1.1875  => 1
        // 0.1875  * 2 = 0.375   => 0
        // 0.375   * 2 = 0.75    => 0
        // 0.75    * 2 = 1.5     => 1
        // 0.5     * 2 = 1       => 1
        for (var i = 0; i < decimalsBitsSize; i++) {
            decimalsPart *= 2;
            if (decimalsPart >= 1) {
                decimalsPart -= 1;
                binaryDecimalsPart += "1";
            }
            else {
                binaryDecimalsPart += "0";
            }
        }
        var binaryMantissa = binaryIntegerPart + binaryDecimalsPart;
        // Get the position of the first bit at 1, for only decimals number
        var mantissaDotPosition = -binaryMantissa.indexOf("1");
        // Remove all the leading bit at 0 from the mantissa
        binaryMantissa = this._bh.clean(binaryMantissa);
        // If the position of the first bit at 1 is 0
        // then the dot position is equals to the length of the binary integer part of the mantissa
        if (mantissaDotPosition === 0) {
            mantissaDotPosition = binaryIntegerPart.length - 1;
        }
        // Hide the first bit at 1
        binaryMantissa = binaryMantissa.substring(1);
        // Make sure that the mantissa matches the correct length (23 for 32 bits for example)
        binaryMantissa = binaryMantissa.padEnd(this.mantissaBitsSize, "0");
        this.binaryMantissa = binaryMantissa;
        this._mantissaDotPosition = mantissaDotPosition;
    };
    /**
     * Calculate the exponent in binary
     * e = binary(mantissaFloatPosition + bias)
     */
    BinaryFloat.prototype.calculateBinaryExponent = function () {
        // If the number is NaN or Infinity then all the bits of the exponent are equals to 1
        if (Number.isNaN(this.number) || this.number === Infinity) {
            this._binaryExponent = "".padEnd(this.exponentBitsSize, "1");
            return;
        }
        var exponent = this.mantissaDotPosition + this.bias;
        // If the number is 0 then all the bits of the exponent are equals to 0
        if (this.number === 0) {
            exponent = 0;
        }
        // Convert the exponent to binary and add leading 0 to match the exponent bits size
        this._binaryExponent = this._bh.decimalToBinary(exponent).padStart(this.exponentBitsSize, "0");
    };
    /**
     * Add two binary float number
     * @param bf2 The binary float number to add
     * @returns The result of the addition
     */
    BinaryFloat.prototype.add = function (bf2) {
        var bfRes = new BinaryFloat(1, this.bitsSize);
        if (Number.isNaN(this.computedNumber) || Number.isNaN(bf2)) {
            return BinaryFloat.getNaN(this.bitsSize);
        }
        if (this.computedNumber === Infinity || bf2.computedNumber === Infinity) {
            return BinaryFloat.getInfinity(this.bitsSize);
        }
        // Step 1: Determine the lowest exponent between this and the second number
        var bfMinBinaryExponent = this;
        var bfMaxBinaryExponent = bf2;
        if (this._bh.binaryToDecimal(bf2.binaryExponent) < this._bh.binaryToDecimal(bfMinBinaryExponent.binaryExponent)) {
            bfMinBinaryExponent = bf2;
            bfMaxBinaryExponent = this;
        }
        // Step 2: Shift the mantissa
        var shiftValue = bfMaxBinaryExponent.computedExponent - bfMinBinaryExponent.computedExponent;
        var shiftedMinMantissa = this._bh.shiftRight("1" + bfMinBinaryExponent.binaryMantissa, shiftValue);
        bfRes.binaryMantissa = shiftedMinMantissa;
        // Step 3: Put the same exponent
        bfRes.binaryExponent = bfMaxBinaryExponent.binaryExponent;
        // Step 4: Add the mantissa and the shifted one
        if (bfMinBinaryExponent.computedSign === bfMaxBinaryExponent.computedSign) {
            bfRes.binaryMantissa = this._bh.binaryAddition("1" + bfMaxBinaryExponent.binaryMantissa, bfRes.binaryMantissa).reverse().join("");
        }
        else {
            bfRes.binaryMantissa = this._bh.binarySubstraction(bfRes.binaryMantissa, "1" + bfMaxBinaryExponent.binaryMantissa).reverse().join("");
        }
        // Step 5: Normalise the mantissa
        if (bfRes.binaryMantissa.length - bfRes.mantissaBitsSize === 1) {
            console.log(bfRes.binaryMantissa.length - bfRes.mantissaBitsSize);
            // Hide the first bit
            bfRes.binaryMantissa = bfRes.binaryMantissa.substring(1);
        }
        // Normalize if there is a carry
        if (bfRes.binaryMantissa.length - bfRes.mantissaBitsSize === 2) {
            // Hide the first bit
            bfRes.binaryMantissa = bfRes.binaryMantissa.substring(1);
            // Remove the last bit
            bfRes.binaryMantissa = bfRes.binaryMantissa.slice(0, -1);
            // Add 1 to the exponent
            bfRes.binaryExponent = this._bh.addNumberToBinary(bfRes.binaryExponent, 1)[0];
        }
        return bfRes;
    };
    return BinaryFloat;
}());


;// CONCATENATED MODULE: ./src/labo1-bf-converter.ts

var bfBinaryNumberElement = document.getElementById("bf-binary-number");
var bfResultElement = document.getElementById("bf-result");
var regexBinary = /^[01\s]+$/;
function onChangeConverterBf() {
    var binaryNumber = bfBinaryNumberElement.value;
    if (bfBinaryNumberElement.value === "") {
        bfResultElement.innerHTML = "<span class=\"color-grey\">Veuillez renseigner tous les champs</span>";
        return;
    }
    if (!regexBinary.test(binaryNumber)) {
        bfResultElement.innerHTML = "<span class=\"color-red\">Ce n'est pas un nombre binaire</span>";
        return;
    }
    var bf = new BinaryFloat(binaryNumber);
    bfResultElement.innerHTML = "\n    <div class=\"result-group\">\n      Taille en bits total: ".concat(bf.bitsSize, "\n    </div>\n\n    <div class=\"result-group\">\n      Taille en bits de l'exposant: ").concat(bf.exponentBitsSize, "\n    </div>\n    \n    <div class=\"result-group\">\n      Taille en bits de la mantisse: ").concat(bf.mantissaBitsSize, "\n    </div>\n\n    <div class=\"result-group\">\n      Biais: ").concat(bf.bias, "\n    </div>\n    \n    <div class=\"result-group\">\n      Signe:\n      <span class=\"color-red mono\">").concat(bf.binarySign, "</span>\n      <span class=\"mono\">(").concat(bf.computedSign, ")</span>\n    </div>\n    \n    <div class=\"result-group\">\n      Mantisse:\n      <span class=\"color-orange mono\">\n        ").concat(bf.binaryMantissa, "\n      </span>\n      <span class=\"mono\">(").concat(bf.computedMantissa, ")</span>\n    </div>\n\n    <div class=\"result-group\">\n      Exposant: <span class=\"color-blue mono\">").concat(bf.binaryExponent, "</span>\n      <span class=\"mono\">(2<sup>").concat(bf.computedExponent, "</sup>)</span>\n    </div>\n    \n    <div class=\"result-group\">\n      R\u00E9sultat en binaire:\n      <span class=\"color-red mono\">").concat(bf.binarySign, "</span>\n      <span class=\"color-blue mono\">").concat(bf.binaryExponent, "</span>\n      <span class=\"color-orange mono\">").concat(bf.binaryMantissa, "</span>\n    </div>\n    \n    <div class=\"result-group\">\n      R\u00E9sultat: ").concat(bf.computedNumber, "\n    </div>\n  ");
}
bfBinaryNumberElement.addEventListener("change", onChangeConverterBf);
bfBinaryNumberElement.addEventListener("keyup", onChangeConverterBf);
onChangeConverterBf();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QzFCLElBQU0sWUFBWSxHQUFHLHFCQUFxQixDQUFDLEtBQUssQ0FBQztJQUVqRCxJQUFJLHFCQUFxQixDQUFDLEtBQUssS0FBSyxFQUFFLEVBQUc7UUFDdkMsZUFBZSxDQUFDLFNBQVMsR0FBRyx1RUFBcUUsQ0FBQztRQUNsRyxPQUFPO0tBQ1I7SUFFRCxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRTtRQUNuQyxlQUFlLENBQUMsU0FBUyxHQUFHLGlFQUErRCxDQUFDO1FBQzVGLE9BQU87S0FDUjtJQUVELElBQU0sRUFBRSxHQUFHLElBQUksV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBRXpDLGVBQWUsQ0FBQyxTQUFTLEdBQUcsMEVBRUEsRUFBRSxDQUFDLFFBQVEsbUdBSUgsRUFBRSxDQUFDLGdCQUFnQix3R0FJbEIsRUFBRSxDQUFDLGdCQUFnQiw0RUFJM0MsRUFBRSxDQUFDLElBQUksc0hBS2UsRUFBRSxDQUFDLFVBQVUsa0RBQ3RCLEVBQUUsQ0FBQyxZQUFZLDhJQU1qQyxFQUFFLENBQUMsY0FBYywwREFFQyxFQUFFLENBQUMsZ0JBQWdCLHVIQUlDLEVBQUUsQ0FBQyxjQUFjLHdEQUMvQixFQUFFLENBQUMsZ0JBQWdCLHVKQUtoQixFQUFFLENBQUMsVUFBVSw0REFDWixFQUFFLENBQUMsY0FBYyw4REFDZixFQUFFLENBQUMsY0FBYywrRkFJdkMsRUFBRSxDQUFDLGNBQWMscUJBRWhDLENBQUM7QUFDSixDQUFDO0FBRUQscUJBQXFCLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLG1CQUFtQixDQUFDLENBQUM7QUFDdEUscUJBQXFCLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLG1CQUFtQixDQUFDLENBQUM7QUFFckUsbUJBQW1CLEVBQUUsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL21hdGhfc3BlLy4vc3JjL2NsYXNzZXMvQmluYXJ5SGVscGVyLnRzIiwid2VicGFjazovL21hdGhfc3BlLy4vc3JjL2NsYXNzZXMvQmluYXJ5RmxvYXQudHMiLCJ3ZWJwYWNrOi8vbWF0aF9zcGUvLi9zcmMvbGFibzEtYmYtY29udmVydGVyLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBCaW5hcnlIZWxwZXIge1xuICAvKipcbiAgICogR2V0IG4gYml0IG9mIDAgb3IgMVxuICAgKiBAcGFyYW0gdmFsdWUgMSBvciAwXG4gICAqIEBwYXJhbSBuIFRoZSBudW1iZXIgb2YgYml0cyB0byByZXRyaWV2ZVxuICAgKiBAcmV0dXJucyBuIGJpdCBvZiAwIG9yIDFcbiAgICovXG4gIHB1YmxpYyBnZXROQml0KHZhbHVlOiAxIHwgMCwgbjogbnVtYmVyKTogc3RyaW5nIHtcbiAgICBsZXQgcmVzID0gXCJcIjtcbiAgICBcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG47IGkrKykge1xuICAgICAgcmVzICs9IHZhbHVlO1xuICAgIH1cblxuICAgIHJldHVybiByZXM7XG4gIH1cblxuICAvKipcbiAgICogQWRkIG4gemVyb3MgYmVmb3JlIHRoZSBiaW5hcnkgbnVtYmVyXG4gICAqIEBwYXJhbSBuIFRoZSBudW1iZXIgb2YgMCB0byBhZGQgYmVmb3JlIHRoZSBiaW5hcnkgbnVtYmVyXG4gICAqIEBwYXJhbSBiIFRoZSBiaW5hcnkgbnVtYmVyXG4gICAqIEByZXR1cm5zIFRoZSBiaW5hcnkgbnVtYmVyIHdpdGggbiB6ZXJvcyBiZWZvcmVcbiAgICovXG4gIHB1YmxpYyBhZGRQYWRkaW5nKG46IG51bWJlciwgYiA9IFwiXCIpIHtcbiAgICBjb25zdCBzaXplID0gbiAtIGIubGVuZ3RoO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaXplOyBpKyspIHtcbiAgICAgIGIgPSBcIjBcIiArIGI7XG4gICAgfVxuXG4gICAgcmV0dXJuIGI7XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlcyB0aGUgemVyb3MgYmVmb3JlIGEgYmluYXJ5IG51bWJlciAoMDAwMTAxIGJlY29tZXMgMTAxKVxuICAgKiBAcGFyYW0gYiBUaGUgYmluYXJ5IG51bWJlclxuICAgKiBAcmV0dXJucyBUaGUgcHJvZHVjZWQgYmluYXJ5IG51bWJlclxuICAgKi9cbiAgcHVibGljIGNsZWFuKGI6IHN0cmluZykge1xuICAgIGxldCByZXMgPSBiO1xuXG4gICAgZm9yKGxldCBpID0gMDsgaSA8IGIubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChiW2ldID09PSBcIjBcIikge1xuICAgICAgICByZXMgPSByZXMuc3Vic3RyaW5nKDEpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHJlcztcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAocmVzID09PSBcIlwiKSB7XG4gICAgICByZXR1cm4gXCIwXCI7XG4gICAgfVxuICB9XG5cblxuICAvKipcbiAgICogQWRkIDAgcGFkZGluZyB0byB0aGUgc21hbGxlc3QgYmluYXJ5IG51bWJlciB0byBtYXRjaCB0aGUgbG9uZ2VzdCBvbmUncyBsZW5ndGhcbiAgICogWzEwMSwgMTEwMDFdIGJlY29tZXMgWzAwMTAxLCAxMTAwMV1cbiAgICogQHBhcmFtIGIxIFRoZSBmaXJzdCBiaW5hcnkgbnVtYmVyXG4gICAqIEBwYXJhbSBiMiBUaGUgc2Vjb25kIGJpbmFyeSBudW1iZXJcbiAgICogQHJldHVybnMgW2IxLCBiMl0gd2l0aCBjb3JyZWN0IHBhZGRpbmdcbiAgICovXG4gIHB1YmxpYyBhZGRNYXhQYWRkaW5nKGIxOiBzdHJpbmcsIGIyOiBzdHJpbmcpIHtcbiAgICBpZiAoYjIubGVuZ3RoID4gYjEubGVuZ3RoKSB7XG4gICAgICBiMSA9IHRoaXMuYWRkUGFkZGluZyhiMi5sZW5ndGgsIGIxKTtcbiAgICB9IGVsc2UgaWYgKGIxLmxlbmd0aCA+IGIyLmxlbmd0aCkge1xuICAgICAgYjIgPSB0aGlzLmFkZFBhZGRpbmcoYjEubGVuZ3RoLCBiMik7XG4gICAgfVxuXG4gICAgcmV0dXJuIFtiMSwgYjJdO1xuICB9XG5cbiAgcHVibGljIGdldE1heExlbmd0aChiMTogc3RyaW5nLCBiMjogc3RyaW5nKSB7XG4gICAgaWYgKGIxLmxlbmd0aCA+IGIyLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIGIxLmxlbmd0aDtcbiAgICB9XG4gICAgcmV0dXJuIGIyLmxlbmd0aDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDb252ZXJ0IGEgbnVtYmVyIHRvIGl0J3MgYmluYXJ5IHJlcHJlc2VudGF0aW9uXG4gICAqIEBwYXJhbSBkZWNpbWFsIFRoZSBcbiAgICogQHJldHVybnMgVGhlIGJpbmFyeSByZXByZXNlbnRhdGlvbiBvZiB0aGUgZGVjaW1hbCBudW1iZXJcbiAgICovXG4gIHB1YmxpYyBkZWNpbWFsVG9CaW5hcnkoZGVjaW1hbDogbnVtYmVyKSB7XG4gICAgcmV0dXJuIChkZWNpbWFsID4+PiAwKS50b1N0cmluZygyKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDb252ZXJ0IGEgYmluYXJ5IHJlcHJlc2VudGF0aW9uIG9mIGEgbnVtYmVyIHRvIGEgZGVjaW1hbCBudW1iZXJcbiAgICogQHBhcmFtIGJpbmFyeSBUaGUgYmluYXJ5IHJlcHJlc2VudGF0aW9uIG9mIGEgbnVtYmVyXG4gICAqIEByZXR1cm5zIFRoZSBpbnQgcmVwcmVzZW50YXRpb24gb2YgYSBiaW5hcnkgbnVtYmVyXG4gICAqL1xuICBwdWJsaWMgYmluYXJ5VG9EZWNpbWFsKGJpbmFyeTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHBhcnNlSW50KGJpbmFyeSwgMik7XG4gIH1cblxuICAvKipcbiAgICogQWRkIGludCB0byBhIGJpbmFyeSBudW1iZXJcbiAgICogQHBhcmFtIGIgVGhlIGJpbmFyeSBudW1iZXJcbiAgICogQHBhcmFtIG4gVGhlIGludCBudW1iZXIgdG8gYWRkIHRvIHRoZSBiaW5hcnkgbnVtYmVyXG4gICAqIEByZXR1cm5zIFRoZSBwcm9kdWNlZCByZXN1bHRcbiAgICovXG4gIHB1YmxpYyBhZGROdW1iZXJUb0JpbmFyeShiOiBzdHJpbmcsIG46IG51bWJlcik6IHN0cmluZ1tdIHtcbiAgICByZXR1cm4gdGhpcy5iaW5hcnlBZGRpdGlvbihiLCB0aGlzLmRlY2ltYWxUb0JpbmFyeShuKSk7XG4gIH1cblxuICAvKipcbiAgICogSW52ZXJ0IGEgYmluYXJ5IG51bWJlclxuICAgKiBAcGFyYW0gYiBUaGUgYmluYXJ5IG51bWJlciB0byBpbnZlcnRcbiAgICogQHJldHVybnMgVGhlIGludmVydCBiaW5hcnkgbnVtYmVyXG4gICAqL1xuICBwdWJsaWMgaW52ZXJ0KGI6IHN0cmluZykge1xuICAgIGNvbnN0IGluaXRpYWxMZW5ndGggPSBiLmxlbmd0aDtcbiAgICBiID0gdGhpcy5kZWNpbWFsVG9CaW5hcnkodGhpcy5iaW5hcnlUb0RlY2ltYWwoYikgXiB0aGlzLmJpbmFyeVRvRGVjaW1hbCh0aGlzLmdldE5CaXQoMSwgYi5sZW5ndGgpKSk7XG4gICAgYiA9IHRoaXMuYWRkUGFkZGluZyhpbml0aWFsTGVuZ3RoLCBiKTtcbiAgICByZXR1cm4gYjtcbiAgfVxuXG4gIC8qKlxuICAgKiBTaGlmdCB0aGUgYmluYXJ5IG51bWJlciB0byB0aGUgcmlnaHRcbiAgICogQHBhcmFtIGIgVGhlIGJpbmFyeSBudW1iZXJcbiAgICogQHBhcmFtIHNoaWZ0VmFsdWUgVGhlIHNoaWZ0IHZhbHVlXG4gICAqIEByZXR1cm5zIFRoZSBzaGlmdGVkIGJpbmFyeSBudW1iZXJcbiAgICovXG4gIHB1YmxpYyBzaGlmdFJpZ2h0KGI6IHN0cmluZywgc2hpZnRWYWx1ZTogbnVtYmVyKSB7XG4gICAgLy8gXCIwMDAwMDEwMTBcIiA+PiAyID0+IFwiMDAwMDAwMDEwXCJcbiAgICAvLyAxLiBSZW1vdmVzIGxhc3RzIDxzaGlmdFZhbHVlPiBiaXRzXG4gICAgLy8gMi4gUGxhY2VzIDxzaGlmdFZhbHVlPiBiaXRzIGF0IDAgYmVmb3JlXG5cbiAgICBpZiAoc2hpZnRWYWx1ZSA8IDEpIHtcbiAgICAgIHJldHVybiBiO1xuICAgIH1cblxuICAgIGxldCByZXMgPSBiO1xuICAgIHJlcyA9IHJlcy5zbGljZSgwLCAtc2hpZnRWYWx1ZSk7XG4gICAgcmVzID0gXCJcIi5wYWRTdGFydChzaGlmdFZhbHVlLCBcIjBcIikgKyByZXM7XG5cbiAgICByZXR1cm4gcmVzO1xuICB9XG5cbiAgLyoqXG4gICAqIFNoaWZ0IHRoZSBiaW5hcnkgbnVtYmVyIHRvIHRoZSBsZWZ0XG4gICAqIEBwYXJhbSBiIFRoZSBiaW5hcnkgbnVtYmVyXG4gICAqIEBwYXJhbSBzaGlmdFZhbHVlIFRoZSBzaGlmdCB2YWx1ZVxuICAgKiBAcmV0dXJucyBUaGUgc2hpZnRlZCBiaW5hcnkgbnVtYmVyXG4gICAqL1xuICBwdWJsaWMgc2hpZnRMZWZ0KGI6IHN0cmluZywgc2hpZnRWYWx1ZTogbnVtYmVyKSB7XG4gICAgcmV0dXJuIHRoaXMuZGVjaW1hbFRvQmluYXJ5KHRoaXMuYmluYXJ5VG9EZWNpbWFsKGIpICogTWF0aC5wb3coMiwgc2hpZnRWYWx1ZSkpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZCAyIGJpdCB0b2dldGhlciB3aXRoIHRoZSBjYXJyeVxuICAgKiBAcGFyYW0geCBUaGUgZmlyc3QgYml0XG4gICAqIEBwYXJhbSB5IFRoZSBzZWNvbmQgYml0XG4gICAqIEBwYXJhbSBjYXJyeSBUaGUgY2FycnlcbiAgICogQHJldHVybnMgVGhlIHJlc3VsdCB3aXRoIHRoZSBjYXJyeSBbYml0LCBjYXJyeV1cbiAgICovXG4gIHB1YmxpYyBlbGVtZW50YXJ5QWRkaXRpb24oeDogc3RyaW5nLCB5OiBzdHJpbmcsIGNhcnJ5ID0gXCJcIik6IHN0cmluZ1tdIHtcbiAgICBjb25zdCByZXMgPSBOdW1iZXIoeCkgKyBOdW1iZXIoeSkgKyBOdW1iZXIoY2FycnkpO1xuXG4gICAgc3dpdGNoIChyZXMpIHtcbiAgICAgIC8vIGMgPSAxLCB4ID0gMSwgeSA9IDFcbiAgICAgIGNhc2UgMzpcbiAgICAgICAgcmV0dXJuIFtcIjFcIiwgXCIxXCJdO1xuICAgICAgY2FzZSAyOlxuICAgICAgICByZXR1cm4gW1wiMFwiLCBcIjFcIl07XG4gICAgICBjYXNlIDE6XG4gICAgICAgIHJldHVybiBbXCIxXCIsIFwiXCJdO1xuICAgICAgLy8gYyA9IDAsIHggPSAwLCB5ID0gMFxuICAgICAgY2FzZSAwOlxuICAgICAgICByZXR1cm4gW1wiMFwiLCBcIlwiXTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQWRkIDIgYmluYXJ5IG51bWJlcnNcbiAgICogQHBhcmFtIGIxIFRoZSBmaXJzdCBiaW5hcnkgbnVtYmVyXG4gICAqIEBwYXJhbSBiMiBUaGUgc2Vjb25kIGJpbmFyeSBudW1iZXJcbiAgICogQHJldHVybnMgVGhlIHJlc3VsdCBvZiB0aGUgYWRkaXRpb24gW2JpbmFyeU51bWJlciwgY2FycnlCaXRdXG4gICAqL1xuICBwdWJsaWMgYmluYXJ5QWRkaXRpb24oYjE6IHN0cmluZywgYjI6IHN0cmluZykge1xuICAgIGxldCByZXMgPSBcIlwiO1xuICAgIGxldCBjYXJyeSA9IFwiXCI7XG4gICAgY29uc3QgW2JwMSwgYnAyXSA9IHRoaXMuYWRkTWF4UGFkZGluZyhiMSwgYjIpO1xuXG4gICAgZm9yIChsZXQgaSA9IGJwMS5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgY29uc3QgW3IsIGNdID0gdGhpcy5lbGVtZW50YXJ5QWRkaXRpb24oYnAxW2ldLCBicDJbaV0sIGNhcnJ5KTtcbiAgICAgIHJlcyA9IHIgKyByZXM7XG4gICAgICBjYXJyeSA9IGM7XG4gICAgfVxuXG4gICAgcmV0dXJuIFtyZXMsIGNhcnJ5XTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTdWJzdHJhY3QgMiBiaW5hcnkgbnVtYmVyc1xuICAgKiBAcGFyYW0gYjEgVGhlIGZpcnN0IGJpbmFyeSBudW1iZXJcbiAgICogQHBhcmFtIGIyIFRoZSBzZWNvbmQgYmluYXJ5IG51bWJlclxuICAgKiBAcmV0dXJucyBUaGUgcmVzdWx0IG9mIHRoZSBzdWJzdHJhY3Rpb24gW2JpbmFyeU51bWJlciwgY2FycnlCaXRdXG4gICAqL1xuICBwdWJsaWMgYmluYXJ5U3Vic3RyYWN0aW9uKGIxOiBzdHJpbmcsIGIyOiBzdHJpbmcpIHtcbiAgICBjb25zdCBbYnAxLCBicDJdID0gdGhpcy5hZGRNYXhQYWRkaW5nKGIxLCBiMik7XG4gICAgcmV0dXJuIHRoaXMuYmluYXJ5QWRkaXRpb24oYnAxLCB0aGlzLmMyKGJwMikpO1xuICB9XG5cbiAgcHVibGljIGMyKGI6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgYiA9IHRoaXMuaW52ZXJ0KGIpO1xuICAgIHJldHVybiB0aGlzLmJpbmFyeUFkZGl0aW9uKGIsIFwiMVwiKS5yZXZlcnNlKCkuam9pbihcIlwiKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBNdWx0aXBseSAyIGJpbmFyeSBudW1iZXJzXG4gICAqIEBwYXJhbSBiMSBUaGUgZmlyc3QgYmluYXJ5IG51bWJlclxuICAgKiBAcGFyYW0gYjIgVGhlIHNlY29uZCBiaW5hcnkgbnVtYmVyXG4gICAqIEByZXR1cm5zIFRoZSByZXN1bHQgb2YgdGhlIG11bHRpcGxpY2F0aW9uXG4gICAqL1xuICBwdWJsaWMgYmluYXJ5TXVsdGlwbGljYXRpb24oYjE6IHN0cmluZywgYjI6IHN0cmluZykge1xuICAgIGxldCByZXMgPSBcIlwiO1xuICAgIGNvbnN0IGFkZFJlc3VsdHMgPSBbXTtcblxuICAgIC8vIFRoZSBiaW5hcnkgbnVtYmVycyB0byBtdWxpdHBseVxuICAgIC8vIGJwMSA9IDEwMTFcbiAgICAvLyBicDIgPSAxMTExXG4gICAgY29uc3QgW2JwMSwgYnAyXSA9IHRoaXMuYWRkTWF4UGFkZGluZyhiMSwgYjIpO1xuXG4gICAgLy8gQ2FsY3VsYXRlIHRoZSBvcGVyYW5kc1xuICAgIC8vIGFkZFJlc3VsdHMgPSBbXG4gICAgLy8gICAgMDAwMCAxMDExLFxuICAgIC8vICAgIDAwMDEgMDExMCxcbiAgICAvLyAgICAwMDEwIDExMDAsXG4gICAgLy8gICAgMTAxMSAwMDAwXG4gICAgLy8gXVxuICAgIGZvciAobGV0IGkgPSBicDEubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgIGxldCBjdXJyZW50UmVzID0gXCJcIjtcblxuICAgICAgZm9yIChsZXQgaiA9IGJwMS5sZW5ndGggLSAxOyBqID49IDA7IGotLSkge1xuICAgICAgICBjdXJyZW50UmVzID0gKE51bWJlcihicDFbal0pICogTnVtYmVyKGJwMltpXSkpICsgY3VycmVudFJlcztcbiAgICAgIH1cblxuICAgICAgY29uc3QgZGVjID0gdGhpcy5iaW5hcnlUb0RlY2ltYWwoY3VycmVudFJlcykgPDwgKGJwMS5sZW5ndGggLSAxIC0gaSk7XG4gICAgICBjdXJyZW50UmVzID0gdGhpcy5kZWNpbWFsVG9CaW5hcnkoZGVjKTtcbiAgICAgIGFkZFJlc3VsdHMucHVzaChjdXJyZW50UmVzKTtcbiAgICB9XG5cbiAgICAvLyBBZGQgZXZlcnl0aGluZ1xuICAgIC8vIHJlcyA9XG4gICAgLy8gICAwMDAwIDEwMTEsXG4gICAgLy8gKyAwMDAxIDAxMTAsXG4gICAgLy8gKyAwMDEwIDExMDAsXG4gICAgLy8gKyAxMDExIDAwMDBcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFkZFJlc3VsdHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IGFkZFJlc3VsdCA9IHRoaXMuYWRkUGFkZGluZyhhZGRSZXN1bHRzW2FkZFJlc3VsdHMubGVuZ3RoIC0gMV0ubGVuZ3RoLCBhZGRSZXN1bHRzW2ldKTtcbiAgICAgIGNvbnN0IFtyLCBjXSA9IHRoaXMuYmluYXJ5QWRkaXRpb24ocmVzLCBhZGRSZXN1bHQpO1xuICAgICAgcmVzID0gYyArIHI7XG4gICAgfVxuXG4gICAgLy8gcmVzID0gMTAxMDAxMDFcbiAgICByZXR1cm4gcmVzO1xuICB9XG59XG4iLCJpbXBvcnQgeyBCaW5hcnlIZWxwZXIgfSBmcm9tIFwiLi9CaW5hcnlIZWxwZXJcIjtcblxuLyoqXG4gKiBFbmNvZGUgYSBmbG9hdGluZyBudW1iZXIgd2l0aCBhIGNob29zZW4gYml0IHNpemUgYW5kIElFRUUgNzU0XG4gKi9cbmV4cG9ydCBjbGFzcyBCaW5hcnlGbG9hdCB7XG4gIHByaXZhdGUgX2JpdHNTaXplID0gMzI7XG4gIHByaXZhdGUgX251bWJlciA9IDA7XG4gIHByaXZhdGUgX2JpbmFyeVNpZ246IFwiMVwiIHwgXCIwXCIgPSBcIjBcIjtcbiAgcHJpdmF0ZSBfYmluYXJ5TWFudGlzc2EgPSBcIlwiO1xuICBwcml2YXRlIF9vdmVyZmxvdyA9IGZhbHNlO1xuICBwcml2YXRlIF9tYW50aXNzYURvdFBvc2l0aW9uID0gMDtcbiAgcHJpdmF0ZSBfYmluYXJ5RXhwb25lbnQgPSBcIlwiO1xuICBwcml2YXRlIF9iaWFzID0gMDtcbiAgcHJpdmF0ZSBfYmggPSBuZXcgQmluYXJ5SGVscGVyKCk7XG5cbiAgY29uc3RydWN0b3IobnVtYmVyT3JCaW5hcnk6IHN0cmluZyk7XG4gIGNvbnN0cnVjdG9yKG51bWJlck9yQmluYXJ5OiBudW1iZXIsIGJpdHNTaXplOiBudW1iZXIpO1xuICBjb25zdHJ1Y3RvcihudW1iZXJPckJpbmFyeTogbnVtYmVyIHwgc3RyaW5nLCBiaXRzU2l6ZT86IG51bWJlcikge1xuICAgIGlmICh0eXBlb2YgbnVtYmVyT3JCaW5hcnkgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIC8vIFJlbW92ZSB0aGUgc3BhY2VzIGluIHRoZSBzdHJpbmdcbiAgICAgIG51bWJlck9yQmluYXJ5ID0gbnVtYmVyT3JCaW5hcnkudHJpbSgpO1xuICAgICAgbnVtYmVyT3JCaW5hcnkgPSBudW1iZXJPckJpbmFyeS5yZXBsYWNlKC9cXHMvZywgXCJcIik7XG4gICAgICB0aGlzLmJpdHNTaXplID0gbnVtYmVyT3JCaW5hcnkubGVuZ3RoO1xuICAgICAgdGhpcy5udW1iZXIgPSAxO1xuXG4gICAgICAvLyBTbGljZSB0aGUgc3RyaW5nIHRvIGFzc2lnbiB0aGUgYmluYXJ5IG51bWJlciB0byB0aGUgY29ycmVjdCBwYXJ0IG9mIHRoZSBiaW5hcnkgcmVwcmVzZW50YXRpb24gb2YgdGhlIGZsb2F0XG4gICAgICB0aGlzLmJpbmFyeVNpZ24gPSBudW1iZXJPckJpbmFyeVswXSBhcyBcIjBcIiB8IFwiMVwiO1xuICAgICAgdGhpcy5iaW5hcnlFeHBvbmVudCA9IG51bWJlck9yQmluYXJ5LnNsaWNlKDEsIHRoaXMuZXhwb25lbnRCaXRzU2l6ZSArIDEpO1xuICAgICAgdGhpcy5iaW5hcnlNYW50aXNzYSA9IG51bWJlck9yQmluYXJ5LnNsaWNlKHRoaXMuZXhwb25lbnRCaXRzU2l6ZSArIDEsIHRoaXMuYml0c1NpemUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmJpdHNTaXplID0gYml0c1NpemU7XG4gICAgICB0aGlzLm51bWJlciA9IG51bWJlck9yQmluYXJ5O1xuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBnZXRJbmZpbml0eShiaXRzU2l6ZTogbnVtYmVyKSB7XG4gICAgcmV0dXJuIG5ldyBCaW5hcnlGbG9hdChJbmZpbml0eSwgYml0c1NpemUpO1xuICB9XG5cbiAgc3RhdGljIGdldE5hTihiaXRzU2l6ZTogbnVtYmVyKSB7XG4gICAgcmV0dXJuIG5ldyBCaW5hcnlGbG9hdChOYU4sIGJpdHNTaXplKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgZmxvYXQgbnVtYmVyIHRvIGNvZGVkIHdpdGggSUVFRSA3NTRcbiAgICovXG4gIGdldCBudW1iZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMuX251bWJlcjtcbiAgfVxuXG4gIHNldCBudW1iZXIodmFsdWU6IG51bWJlcikge1xuICAgIHRoaXMuX251bWJlciA9IHZhbHVlO1xuXG4gICAgdGhpcy5jYWxjdWxhdGVCaW5hcnlTaWduKCk7XG4gICAgdGhpcy5jYWxjdWxhdGVCaWFzKCk7XG4gICAgdGhpcy5jYWxjdWxhdGVCaW5hcnlNYW50aXNzYSgpO1xuICAgIHRoaXMuY2FsY3VsYXRlQmluYXJ5RXhwb25lbnQoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgYml0IHNpemUgdG8gY29kZSB0aGUgbnVtYmVyXG4gICAqL1xuICBnZXQgYml0c1NpemUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2JpdHNTaXplO1xuICB9XG5cbiAgc2V0IGJpdHNTaXplKHZhbHVlOiBudW1iZXIpIHtcbiAgICB0aGlzLl9iaXRzU2l6ZSA9IHZhbHVlO1xuXG4gICAgaWYgKHZhbHVlID4gODApIHtcbiAgICAgIHRoaXMuX2JpdHNTaXplID0gODA7XG4gICAgfVxuXG4gICAgaWYgKHZhbHVlIDwgOCkge1xuICAgICAgdGhpcy5fYml0c1NpemUgPSA4O1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIG1hbnRpc3NhIGJpdHMgc2l6ZVxuICAgKi9cbiAgZ2V0IG1hbnRpc3NhQml0c1NpemUoKSB7XG4gICAgaWYgKHRoaXMuYml0c1NpemUgPCA4KSB7XG4gICAgICByZXR1cm4gMDtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5iaXRzU2l6ZSAtIHRoaXMuZXhwb25lbnRCaXRzU2l6ZSAtIDE7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBleHBvbmVudCBiaXRzIHNpemUgd2l0aDpcbiAgICogLSBUaGUgSUVFRSA3NTQgMjAxOSBmb3JtdWxhIGlmIHRoZSBiaXRzIHNpemUgaXMgZ3JlYXRlciBvciBlcXVhbCB0byAxMjhcbiAgICogLSBBIGN1c3RvbSBmb3JtdWxhIGlmIHRoZSBiaXQgc2l6ZSBpcyBsZXNzIHRoYW4gMTI4IHRoYXQgbWF0Y2hlcyB0aGUgSUVFRSBzdGFuZGFyZFxuICAgKiBcbiAgICogVmlzdWFsaXplIHRoZSBmdW5jdGlvbiBvbiBnZW9nZWJyYTpcbiAgICogaHR0cHM6Ly93d3cuZ2VvZ2VicmEub3JnL2NhbGN1bGF0b3IvY2VycmtkZnZcbiAgICovXG4gIGdldCBleHBvbmVudEJpdHNTaXplKCkge1xuICAgIGlmICh0aGlzLmJpdHNTaXplIDwgOCkge1xuICAgICAgcmV0dXJuIDA7XG4gICAgfVxuXG4gICAgLy8gSUVFRSA3NTQgMjAxOSBmb3JtdWxhID49IDEyOFxuICAgIGlmICh0aGlzLmJpdHNTaXplID49IDEyOCkge1xuICAgICAgcmV0dXJuIE1hdGgucm91bmQoNCAqIE1hdGgubG9nMih0aGlzLmJpdHNTaXplKSkgLSAxMztcbiAgICB9XG5cbiAgICAvLyBBIGZvcm11bGEgdGhhdCBtYXRjaGVzIHRoZSB2YWx1ZXMgZm9yIDwgMTI4XG4gICAgLy8gcmVmOiBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL2EvNjI2MzIyNjBcbiAgICByZXR1cm4gTWF0aC5yb3VuZCgoTWF0aC5sb2cyKHRoaXMuYml0c1NpemUpIC0gMSkgKiogKDMgLyAyKSk7XG4gIH1cblxuICBnZXQgcG9zaXRpdmVOdW1iZXIoKSB7XG4gICAgcmV0dXJuIE1hdGguYWJzKHRoaXMubnVtYmVyKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDYWxjdWxhdGUgdGhlIHBvc2l0aW9uIG9mIHRoZSBkb3QgaW4gdGhlIG1hbnRpc3NhXG4gICAqICAgICAgICAgICAgZmxvYXQgcG9zaXRpb25cbiAgICogICAgICAgICAgICAgICAgICB8XG4gICAqICAgICAgICAgICAgICAgICAgdlxuICAgKiBtYW50aXNzYSgxOS41OTM3NSkgPT4gXCIwMDExLjEwMDExMDAwMDAwMDAwMDAwMDBcIlxuICAgKi9cbiAgZ2V0IG1hbnRpc3NhRG90UG9zaXRpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuX21hbnRpc3NhRG90UG9zaXRpb247XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBleHBvbmVudCBvZiB0aGUgbnVtYmVyIGluIGJpbmFyeSB3aXRoIHRoZSBiaWFzXG4gICAqIG1hbnRpc3NhKDE5LjU5Mzc1KSA9PiBcIjEwMDAwMDEwXCJcbiAgICovXG4gIGdldCBiaW5hcnlFeHBvbmVudCgpIHtcbiAgICByZXR1cm4gdGhpcy5fYmluYXJ5RXhwb25lbnQ7XG4gIH1cblxuICBzZXQgYmluYXJ5RXhwb25lbnQodmFsdWU6IHN0cmluZykge1xuICAgIHRoaXMuX2JpbmFyeUV4cG9uZW50ID0gdmFsdWU7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJuIHRoZSBiaWFzIG9mIHRoZSBudW1iZXIgYmFzZWQgb24gdGhlIGV4cG9uZW50IGJpdCBzaXplXG4gICAqIGIgPSAyIF4gKGV4cG9uZW50Qml0c1NpemUgLSAxKSAtIDFcbiAgICovXG4gIGdldCBiaWFzKCkge1xuICAgIHJldHVybiB0aGlzLl9iaWFzO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgZnVsbCBtYW50aXNzYSBvZiB0aGUgbnVtYmVyXG4gICAqL1xuICBnZXQgYmluYXJ5TWFudGlzc2EoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2JpbmFyeU1hbnRpc3NhO1xuICB9XG5cbiAgc2V0IGJpbmFyeU1hbnRpc3NhKHZhbHVlOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9iaW5hcnlNYW50aXNzYSA9IHZhbHVlO1xuICAgIHRoaXMuX292ZXJmbG93ID0gdmFsdWUubGVuZ3RoID4gdGhpcy5tYW50aXNzYUJpdHNTaXplO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgZnVsbCBudW1iZXIgY29kZWQgaW4gYmluYXJ5IHdpdGggSUVFRSA3NTRcbiAgICovXG4gIGdldCBiaW5hcnlGbG9hdGluZ051bWJlcigpIHtcbiAgICByZXR1cm4gdGhpcy5iaW5hcnlTaWduICsgdGhpcy5iaW5hcnlFeHBvbmVudCArIHRoaXMuYmluYXJ5TWFudGlzc2E7XG4gIH1cblxuICAvKipcbiAgICogVGhlIHNpZ24gaW4gaXQncyBkZWNpbWFsIGZvcm1cbiAgICovXG4gIGdldCBjb21wdXRlZFNpZ24oKSB7XG4gICAgcmV0dXJuIHRoaXMuYmluYXJ5U2lnbiA9PT0gXCIxXCIgPyAtMSA6IDE7XG4gIH1cblxuICAvKipcbiAgICogVGhlIGV4cG9uZW50IGluIGl0J3MgZGVjaW1hbCBmb3JtXG4gICAqL1xuICBnZXQgY29tcHV0ZWRFeHBvbmVudCgpIHtcbiAgICByZXR1cm4gdGhpcy5fYmguYmluYXJ5VG9EZWNpbWFsKHRoaXMuYmluYXJ5RXhwb25lbnQpIC0gdGhpcy5iaWFzO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoZSBtYW50aXNzYSBpbiBpdCdzIGRlY2ltYWwgZm9ybVxuICAgKi9cbiAgZ2V0IGNvbXB1dGVkTWFudGlzc2EoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2JoLmJpbmFyeVRvRGVjaW1hbChcIjFcIiArIHRoaXMuYmluYXJ5TWFudGlzc2EpIC8gMiAqKiB0aGlzLm1hbnRpc3NhQml0c1NpemU7XG4gIH1cblxuICAvKipcbiAgICogVGhlIG51bWJlciB0aGF0IGlzIGNvZGVkIGluIG1lbW9yeVxuICAgKi9cbiAgZ2V0IGNvbXB1dGVkTnVtYmVyKCkge1xuICAgIGlmIChcbiAgICAgIE51bWJlci5pc05hTih0aGlzLm51bWJlcikgfHxcbiAgICAgIHRoaXMubnVtYmVyID09PSBJbmZpbml0eSB8fFxuICAgICAgdGhpcy5udW1iZXIgPT09IDBcbiAgICApIHtcbiAgICAgIHJldHVybiB0aGlzLm51bWJlcjtcbiAgICB9XG5cbiAgICBpZiAoXG4gICAgICB0aGlzLmJpbmFyeUV4cG9uZW50LmluZGV4T2YoXCIwXCIpID09PSAtMSAmJlxuICAgICAgdGhpcy5iaW5hcnlNYW50aXNzYS5pbmRleE9mKFwiMFwiKSA9PT0gLTEgJiZcbiAgICAgIHRoaXMuYmluYXJ5U2lnbiA9PT0gXCIwXCJcbiAgICApIHtcbiAgICAgIHJldHVybiBOYU47XG4gICAgfVxuXG4gICAgaWYgKFxuICAgICAgdGhpcy5iaW5hcnlFeHBvbmVudC5pbmRleE9mKFwiMFwiKSA9PT0gLTEgJiZcbiAgICAgIHRoaXMuYmluYXJ5TWFudGlzc2EuaW5kZXhPZihcIjFcIikgPT09IC0xICYmXG4gICAgICB0aGlzLmJpbmFyeVNpZ24gPT09IFwiMFwiXG4gICAgKSB7XG4gICAgICByZXR1cm4gSW5maW5pdHk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuY29tcHV0ZWRTaWduICogMiAqKiB0aGlzLmNvbXB1dGVkRXhwb25lbnQgKiB0aGlzLmNvbXB1dGVkTWFudGlzc2E7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBtYXJnaW4gb2YgZXJyb3JcbiAgICovXG4gIGdldCBlcnJvcigpIHsgICAgXG4gICAgaWYgKE51bWJlci5pc05hTih0aGlzLm51bWJlcikgfHwgdGhpcy5udW1iZXIgPT09IEluZmluaXR5IHx8IHRoaXMubnVtYmVyID09PSAwKSB7XG4gICAgICByZXR1cm4gMDtcbiAgICB9XG5cbiAgICByZXR1cm4gTWF0aC5hYnModGhpcy5udW1iZXIgLSB0aGlzLmNvbXB1dGVkTnVtYmVyKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gdGhlIGJpbmFyeSByZXByZXNlbnRhdGlvbiBvZiB0aGUgc2lnblxuICAgKiAwIGlmIG51bWJlciA+PSAwXG4gICAqIDEgaWYgbnVtYmVyIDwgMFxuICAgKi9cbiAgZ2V0IGJpbmFyeVNpZ24oKTogXCIwXCIgfCBcIjFcIiB7XG4gICAgcmV0dXJuIHRoaXMuX2JpbmFyeVNpZ247XG4gIH1cblxuICBzZXQgYmluYXJ5U2lnbih2YWx1ZTogXCIwXCIgfCBcIjFcIikge1xuICAgIHRoaXMuX2JpbmFyeVNpZ24gPSB2YWx1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUcnVlIGlmIHRoZSBudW1iZXIgY2Fubm90IGJlIGVuY29kZWQgaW4gPGJpdHNTaXplPiBiaXRzXG4gICAqL1xuICBnZXQgb3ZlcmZsb3coKSB7XG4gICAgcmV0dXJuIHRoaXMuX292ZXJmbG93O1xuICB9XG5cbiAgLyoqXG4gICAqIERldGVybWluZSB0aGUgYmluYXJ5IHNpZ24gb2YgdGhlIG51bWJlclxuICAgKi9cbiAgcHJpdmF0ZSBjYWxjdWxhdGVCaW5hcnlTaWduKCkge1xuICAgIHRoaXMuX2JpbmFyeVNpZ24gPSB0aGlzLm51bWJlciA8IDAgPyBcIjFcIiA6IFwiMFwiO1xuICB9XG5cbiAgLyoqXG4gICAqIENhbGN1bGF0ZSB0aGUgZXhwb25lbnQgYmlhcyBiYXNlZCBvbiB0aGUgZXhwb25lbnQgYml0IHNpemVcbiAgICogYiA9IDIgXiAoZXhwb25lbnRCaXRzU2l6ZSAtIDEpIC0gMTtcbiAgICovXG4gIHByaXZhdGUgY2FsY3VsYXRlQmlhcygpIHtcbiAgICB0aGlzLl9iaWFzID0gMiAqKiAodGhpcy5leHBvbmVudEJpdHNTaXplIC0gMSkgLSAxO1xuICB9XG5cbiAgLyoqXG4gICAqIERldGVybWluZSB0aGUgYmluYXJ5IG1hbnRpc3NhIGFuZCBkZXRlcm1pbmUgdGhlIGRvdCBwb3NpdGlvbiBpbiB0aGUgbWFudGlzc2FcbiAgICovXG4gIHByaXZhdGUgY2FsY3VsYXRlQmluYXJ5TWFudGlzc2EoKSB7XG4gICAgaWYgKE51bWJlci5pc05hTih0aGlzLm51bWJlcikpIHtcbiAgICAgIHRoaXMuX21hbnRpc3NhRG90UG9zaXRpb24gPSAwO1xuICAgICAgdGhpcy5fYmluYXJ5TWFudGlzc2EgPSBcIlwiLnBhZEVuZCh0aGlzLm1hbnRpc3NhQml0c1NpemUsIFwiMVwiKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBHZXQgdGhlIGludGVnZXIgcGFydFxuICAgIGNvbnN0IGludGVnZXJQYXJ0ID0gTWF0aC50cnVuYyh0aGlzLnBvc2l0aXZlTnVtYmVyKTtcblxuICAgIC8vIEdldCB0aGUgZGVjaW1hbHMgb2YgdGhlIG51bWJlcjogZGVjaW1hbHMgPSAxOS41OTM3NSAtIDE5ID0gMC41OTM3NVxuICAgIGxldCBkZWNpbWFsc1BhcnQgPSB0aGlzLnBvc2l0aXZlTnVtYmVyIC0gTWF0aC50cnVuYyh0aGlzLnBvc2l0aXZlTnVtYmVyKTtcblxuICAgIGNvbnN0IGJpbmFyeUludGVnZXJQYXJ0ID0gdGhpcy5fYmguZGVjaW1hbFRvQmluYXJ5KGludGVnZXJQYXJ0KTtcblxuICAgIC8vIEdldCB0aGUgbnVtYmVyIG9mIGJpdHMgZGVkaWNhdGVkIHRvIHN0b3JlIHRoZSBkZWNpbWFscyBpbiB0aGUgbWFudGlzc2FcbiAgICBjb25zdCBkZWNpbWFsc0JpdHNTaXplID0gdGhpcy5tYW50aXNzYUJpdHNTaXplIC0gYmluYXJ5SW50ZWdlclBhcnQubGVuZ3RoIC0gMTtcbiAgICBcbiAgICBsZXQgYmluYXJ5RGVjaW1hbHNQYXJ0ID0gXCJcIjtcbiAgICAvLyAwLjU5Mzc1ICogMiA9IDEuMTg3NSAgPT4gMVxuICAgIC8vIDAuMTg3NSAgKiAyID0gMC4zNzUgICA9PiAwXG4gICAgLy8gMC4zNzUgICAqIDIgPSAwLjc1ICAgID0+IDBcbiAgICAvLyAwLjc1ICAgICogMiA9IDEuNSAgICAgPT4gMVxuICAgIC8vIDAuNSAgICAgKiAyID0gMSAgICAgICA9PiAxXG4gICAgZm9yKGxldCBpID0gMDsgaSA8IGRlY2ltYWxzQml0c1NpemU7IGkrKykge1xuICAgICAgZGVjaW1hbHNQYXJ0ICo9IDI7XG5cbiAgICAgIGlmIChkZWNpbWFsc1BhcnQgPj0gMSkge1xuICAgICAgICBkZWNpbWFsc1BhcnQgLT0gMTtcbiAgICAgICAgYmluYXJ5RGVjaW1hbHNQYXJ0ICs9IFwiMVwiO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYmluYXJ5RGVjaW1hbHNQYXJ0ICs9IFwiMFwiO1xuICAgICAgfVxuICAgIH1cblxuICAgIGxldCBiaW5hcnlNYW50aXNzYSA9IGJpbmFyeUludGVnZXJQYXJ0ICsgYmluYXJ5RGVjaW1hbHNQYXJ0O1xuXG4gICAgLy8gR2V0IHRoZSBwb3NpdGlvbiBvZiB0aGUgZmlyc3QgYml0IGF0IDEsIGZvciBvbmx5IGRlY2ltYWxzIG51bWJlclxuICAgIGxldCBtYW50aXNzYURvdFBvc2l0aW9uID0gLWJpbmFyeU1hbnRpc3NhLmluZGV4T2YoXCIxXCIpO1xuXG4gICAgLy8gUmVtb3ZlIGFsbCB0aGUgbGVhZGluZyBiaXQgYXQgMCBmcm9tIHRoZSBtYW50aXNzYVxuICAgIGJpbmFyeU1hbnRpc3NhID0gdGhpcy5fYmguY2xlYW4oYmluYXJ5TWFudGlzc2EpO1xuXG4gICAgLy8gSWYgdGhlIHBvc2l0aW9uIG9mIHRoZSBmaXJzdCBiaXQgYXQgMSBpcyAwXG4gICAgLy8gdGhlbiB0aGUgZG90IHBvc2l0aW9uIGlzIGVxdWFscyB0byB0aGUgbGVuZ3RoIG9mIHRoZSBiaW5hcnkgaW50ZWdlciBwYXJ0IG9mIHRoZSBtYW50aXNzYVxuICAgIGlmIChtYW50aXNzYURvdFBvc2l0aW9uID09PSAwKSB7XG4gICAgICBtYW50aXNzYURvdFBvc2l0aW9uID0gYmluYXJ5SW50ZWdlclBhcnQubGVuZ3RoIC0gMTtcbiAgICB9XG5cbiAgICAvLyBIaWRlIHRoZSBmaXJzdCBiaXQgYXQgMVxuICAgIGJpbmFyeU1hbnRpc3NhID0gYmluYXJ5TWFudGlzc2Euc3Vic3RyaW5nKDEpO1xuXG4gICAgLy8gTWFrZSBzdXJlIHRoYXQgdGhlIG1hbnRpc3NhIG1hdGNoZXMgdGhlIGNvcnJlY3QgbGVuZ3RoICgyMyBmb3IgMzIgYml0cyBmb3IgZXhhbXBsZSlcbiAgICBiaW5hcnlNYW50aXNzYSA9IGJpbmFyeU1hbnRpc3NhLnBhZEVuZCh0aGlzLm1hbnRpc3NhQml0c1NpemUsIFwiMFwiKTtcblxuICAgIHRoaXMuYmluYXJ5TWFudGlzc2EgPSBiaW5hcnlNYW50aXNzYTtcbiAgICB0aGlzLl9tYW50aXNzYURvdFBvc2l0aW9uID0gbWFudGlzc2FEb3RQb3NpdGlvbjtcbiAgfVxuXG4gIC8qKlxuICAgKiBDYWxjdWxhdGUgdGhlIGV4cG9uZW50IGluIGJpbmFyeVxuICAgKiBlID0gYmluYXJ5KG1hbnRpc3NhRmxvYXRQb3NpdGlvbiArIGJpYXMpXG4gICAqL1xuICBwcml2YXRlIGNhbGN1bGF0ZUJpbmFyeUV4cG9uZW50KCkge1xuICAgIC8vIElmIHRoZSBudW1iZXIgaXMgTmFOIG9yIEluZmluaXR5IHRoZW4gYWxsIHRoZSBiaXRzIG9mIHRoZSBleHBvbmVudCBhcmUgZXF1YWxzIHRvIDFcbiAgICBpZiAoTnVtYmVyLmlzTmFOKHRoaXMubnVtYmVyKSB8fCB0aGlzLm51bWJlciA9PT0gSW5maW5pdHkpIHtcbiAgICAgIHRoaXMuX2JpbmFyeUV4cG9uZW50ID0gXCJcIi5wYWRFbmQodGhpcy5leHBvbmVudEJpdHNTaXplLCBcIjFcIik7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbGV0IGV4cG9uZW50ID0gdGhpcy5tYW50aXNzYURvdFBvc2l0aW9uICsgdGhpcy5iaWFzO1xuXG4gICAgLy8gSWYgdGhlIG51bWJlciBpcyAwIHRoZW4gYWxsIHRoZSBiaXRzIG9mIHRoZSBleHBvbmVudCBhcmUgZXF1YWxzIHRvIDBcbiAgICBpZiAodGhpcy5udW1iZXIgPT09IDApIHtcbiAgICAgIGV4cG9uZW50ID0gMDtcbiAgICB9XG5cbiAgICAvLyBDb252ZXJ0IHRoZSBleHBvbmVudCB0byBiaW5hcnkgYW5kIGFkZCBsZWFkaW5nIDAgdG8gbWF0Y2ggdGhlIGV4cG9uZW50IGJpdHMgc2l6ZVxuICAgIHRoaXMuX2JpbmFyeUV4cG9uZW50ID0gdGhpcy5fYmguZGVjaW1hbFRvQmluYXJ5KGV4cG9uZW50KS5wYWRTdGFydCh0aGlzLmV4cG9uZW50Qml0c1NpemUsIFwiMFwiKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGQgdHdvIGJpbmFyeSBmbG9hdCBudW1iZXJcbiAgICogQHBhcmFtIGJmMiBUaGUgYmluYXJ5IGZsb2F0IG51bWJlciB0byBhZGRcbiAgICogQHJldHVybnMgVGhlIHJlc3VsdCBvZiB0aGUgYWRkaXRpb25cbiAgICovXG4gIGFkZChiZjI6IEJpbmFyeUZsb2F0KSB7XG4gICAgY29uc3QgYmZSZXMgPSBuZXcgQmluYXJ5RmxvYXQoMSwgdGhpcy5iaXRzU2l6ZSk7XG5cbiAgICBpZiAoTnVtYmVyLmlzTmFOKHRoaXMuY29tcHV0ZWROdW1iZXIpIHx8IE51bWJlci5pc05hTihiZjIpKSB7XG4gICAgICByZXR1cm4gQmluYXJ5RmxvYXQuZ2V0TmFOKHRoaXMuYml0c1NpemUpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmNvbXB1dGVkTnVtYmVyID09PSBJbmZpbml0eSB8fCBiZjIuY29tcHV0ZWROdW1iZXIgPT09IEluZmluaXR5KSB7XG4gICAgICByZXR1cm4gQmluYXJ5RmxvYXQuZ2V0SW5maW5pdHkodGhpcy5iaXRzU2l6ZSk7XG4gICAgfVxuXG4gICAgLy8gU3RlcCAxOiBEZXRlcm1pbmUgdGhlIGxvd2VzdCBleHBvbmVudCBiZXR3ZWVuIHRoaXMgYW5kIHRoZSBzZWNvbmQgbnVtYmVyXG4gICAgbGV0IGJmTWluQmluYXJ5RXhwb25lbnQ6IEJpbmFyeUZsb2F0ID0gdGhpcztcbiAgICBsZXQgYmZNYXhCaW5hcnlFeHBvbmVudDogQmluYXJ5RmxvYXQgPSBiZjI7XG4gICAgaWYgKHRoaXMuX2JoLmJpbmFyeVRvRGVjaW1hbChiZjIuYmluYXJ5RXhwb25lbnQpIDwgdGhpcy5fYmguYmluYXJ5VG9EZWNpbWFsKGJmTWluQmluYXJ5RXhwb25lbnQuYmluYXJ5RXhwb25lbnQpKSB7XG4gICAgICBiZk1pbkJpbmFyeUV4cG9uZW50ID0gYmYyO1xuICAgICAgYmZNYXhCaW5hcnlFeHBvbmVudCA9IHRoaXM7XG4gICAgfVxuXG4gICAgLy8gU3RlcCAyOiBTaGlmdCB0aGUgbWFudGlzc2FcbiAgICBjb25zdCBzaGlmdFZhbHVlID0gYmZNYXhCaW5hcnlFeHBvbmVudC5jb21wdXRlZEV4cG9uZW50IC0gYmZNaW5CaW5hcnlFeHBvbmVudC5jb21wdXRlZEV4cG9uZW50O1xuICAgIGNvbnN0IHNoaWZ0ZWRNaW5NYW50aXNzYSA9IHRoaXMuX2JoLnNoaWZ0UmlnaHQoXCIxXCIgKyBiZk1pbkJpbmFyeUV4cG9uZW50LmJpbmFyeU1hbnRpc3NhLCBzaGlmdFZhbHVlKTtcbiAgICBiZlJlcy5iaW5hcnlNYW50aXNzYSA9IHNoaWZ0ZWRNaW5NYW50aXNzYTtcbiAgICBcbiAgICAvLyBTdGVwIDM6IFB1dCB0aGUgc2FtZSBleHBvbmVudFxuICAgIGJmUmVzLmJpbmFyeUV4cG9uZW50ID0gYmZNYXhCaW5hcnlFeHBvbmVudC5iaW5hcnlFeHBvbmVudDtcblxuICAgIC8vIFN0ZXAgNDogQWRkIHRoZSBtYW50aXNzYSBhbmQgdGhlIHNoaWZ0ZWQgb25lXG4gICAgaWYgKGJmTWluQmluYXJ5RXhwb25lbnQuY29tcHV0ZWRTaWduID09PSBiZk1heEJpbmFyeUV4cG9uZW50LmNvbXB1dGVkU2lnbikge1xuICAgICAgYmZSZXMuYmluYXJ5TWFudGlzc2EgPSB0aGlzLl9iaC5iaW5hcnlBZGRpdGlvbihcIjFcIiArIGJmTWF4QmluYXJ5RXhwb25lbnQuYmluYXJ5TWFudGlzc2EsIGJmUmVzLmJpbmFyeU1hbnRpc3NhKS5yZXZlcnNlKCkuam9pbihcIlwiKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYmZSZXMuYmluYXJ5TWFudGlzc2EgPSB0aGlzLl9iaC5iaW5hcnlTdWJzdHJhY3Rpb24oYmZSZXMuYmluYXJ5TWFudGlzc2EsIFwiMVwiICsgYmZNYXhCaW5hcnlFeHBvbmVudC5iaW5hcnlNYW50aXNzYSkucmV2ZXJzZSgpLmpvaW4oXCJcIik7XG4gICAgfVxuXG4gICAgLy8gU3RlcCA1OiBOb3JtYWxpc2UgdGhlIG1hbnRpc3NhXG4gICAgaWYgKGJmUmVzLmJpbmFyeU1hbnRpc3NhLmxlbmd0aCAtIGJmUmVzLm1hbnRpc3NhQml0c1NpemUgPT09IDEpIHtcbiAgICAgIGNvbnNvbGUubG9nKGJmUmVzLmJpbmFyeU1hbnRpc3NhLmxlbmd0aCAtIGJmUmVzLm1hbnRpc3NhQml0c1NpemUpO1xuXG4gICAgICAvLyBIaWRlIHRoZSBmaXJzdCBiaXRcbiAgICAgIGJmUmVzLmJpbmFyeU1hbnRpc3NhID0gYmZSZXMuYmluYXJ5TWFudGlzc2Euc3Vic3RyaW5nKDEpO1xuICAgIH1cblxuICAgIC8vIE5vcm1hbGl6ZSBpZiB0aGVyZSBpcyBhIGNhcnJ5XG4gICAgaWYgKGJmUmVzLmJpbmFyeU1hbnRpc3NhLmxlbmd0aCAtIGJmUmVzLm1hbnRpc3NhQml0c1NpemUgPT09IDIpIHtcbiAgICAgIC8vIEhpZGUgdGhlIGZpcnN0IGJpdFxuICAgICAgYmZSZXMuYmluYXJ5TWFudGlzc2EgPSBiZlJlcy5iaW5hcnlNYW50aXNzYS5zdWJzdHJpbmcoMSk7XG5cbiAgICAgIC8vIFJlbW92ZSB0aGUgbGFzdCBiaXRcbiAgICAgIGJmUmVzLmJpbmFyeU1hbnRpc3NhID0gYmZSZXMuYmluYXJ5TWFudGlzc2Euc2xpY2UoMCwgLTEpO1xuXG4gICAgICAvLyBBZGQgMSB0byB0aGUgZXhwb25lbnRcbiAgICAgIGJmUmVzLmJpbmFyeUV4cG9uZW50ID0gdGhpcy5fYmguYWRkTnVtYmVyVG9CaW5hcnkoYmZSZXMuYmluYXJ5RXhwb25lbnQsIDEpWzBdO1xuICAgIH1cblxuICAgIHJldHVybiBiZlJlcztcbiAgfVxufVxuIiwiaW1wb3J0IHsgQmluYXJ5RmxvYXQgfSBmcm9tIFwiLi9jbGFzc2VzL0JpbmFyeUZsb2F0XCI7XG5cbmNvbnN0IGJmQmluYXJ5TnVtYmVyRWxlbWVudCA9IDxIVE1MSW5wdXRFbGVtZW50PmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYmYtYmluYXJ5LW51bWJlclwiKTtcbmNvbnN0IGJmUmVzdWx0RWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYmYtcmVzdWx0XCIpO1xuY29uc3QgcmVnZXhCaW5hcnkgPSAvXlswMVxcc10rJC87XG5cbmZ1bmN0aW9uIG9uQ2hhbmdlQ29udmVydGVyQmYoKSB7XG4gIGNvbnN0IGJpbmFyeU51bWJlciA9IGJmQmluYXJ5TnVtYmVyRWxlbWVudC52YWx1ZTtcbiAgXG4gIGlmIChiZkJpbmFyeU51bWJlckVsZW1lbnQudmFsdWUgPT09IFwiXCIgKSB7XG4gICAgYmZSZXN1bHRFbGVtZW50LmlubmVySFRNTCA9IGA8c3BhbiBjbGFzcz1cImNvbG9yLWdyZXlcIj5WZXVpbGxleiByZW5zZWlnbmVyIHRvdXMgbGVzIGNoYW1wczwvc3Bhbj5gO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGlmICghcmVnZXhCaW5hcnkudGVzdChiaW5hcnlOdW1iZXIpKSB7XG4gICAgYmZSZXN1bHRFbGVtZW50LmlubmVySFRNTCA9IGA8c3BhbiBjbGFzcz1cImNvbG9yLXJlZFwiPkNlIG4nZXN0IHBhcyB1biBub21icmUgYmluYWlyZTwvc3Bhbj5gO1xuICAgIHJldHVybjtcbiAgfVxuICBcbiAgY29uc3QgYmYgPSBuZXcgQmluYXJ5RmxvYXQoYmluYXJ5TnVtYmVyKTtcblxuICBiZlJlc3VsdEVsZW1lbnQuaW5uZXJIVE1MID0gYFxuICAgIDxkaXYgY2xhc3M9XCJyZXN1bHQtZ3JvdXBcIj5cbiAgICAgIFRhaWxsZSBlbiBiaXRzIHRvdGFsOiAke2JmLmJpdHNTaXplfVxuICAgIDwvZGl2PlxuXG4gICAgPGRpdiBjbGFzcz1cInJlc3VsdC1ncm91cFwiPlxuICAgICAgVGFpbGxlIGVuIGJpdHMgZGUgbCdleHBvc2FudDogJHtiZi5leHBvbmVudEJpdHNTaXplfVxuICAgIDwvZGl2PlxuICAgIFxuICAgIDxkaXYgY2xhc3M9XCJyZXN1bHQtZ3JvdXBcIj5cbiAgICAgIFRhaWxsZSBlbiBiaXRzIGRlIGxhIG1hbnRpc3NlOiAke2JmLm1hbnRpc3NhQml0c1NpemV9XG4gICAgPC9kaXY+XG5cbiAgICA8ZGl2IGNsYXNzPVwicmVzdWx0LWdyb3VwXCI+XG4gICAgICBCaWFpczogJHtiZi5iaWFzfVxuICAgIDwvZGl2PlxuICAgIFxuICAgIDxkaXYgY2xhc3M9XCJyZXN1bHQtZ3JvdXBcIj5cbiAgICAgIFNpZ25lOlxuICAgICAgPHNwYW4gY2xhc3M9XCJjb2xvci1yZWQgbW9ub1wiPiR7YmYuYmluYXJ5U2lnbn08L3NwYW4+XG4gICAgICA8c3BhbiBjbGFzcz1cIm1vbm9cIj4oJHtiZi5jb21wdXRlZFNpZ259KTwvc3Bhbj5cbiAgICA8L2Rpdj5cbiAgICBcbiAgICA8ZGl2IGNsYXNzPVwicmVzdWx0LWdyb3VwXCI+XG4gICAgICBNYW50aXNzZTpcbiAgICAgIDxzcGFuIGNsYXNzPVwiY29sb3Itb3JhbmdlIG1vbm9cIj5cbiAgICAgICAgJHtiZi5iaW5hcnlNYW50aXNzYX1cbiAgICAgIDwvc3Bhbj5cbiAgICAgIDxzcGFuIGNsYXNzPVwibW9ub1wiPigke2JmLmNvbXB1dGVkTWFudGlzc2F9KTwvc3Bhbj5cbiAgICA8L2Rpdj5cblxuICAgIDxkaXYgY2xhc3M9XCJyZXN1bHQtZ3JvdXBcIj5cbiAgICAgIEV4cG9zYW50OiA8c3BhbiBjbGFzcz1cImNvbG9yLWJsdWUgbW9ub1wiPiR7YmYuYmluYXJ5RXhwb25lbnR9PC9zcGFuPlxuICAgICAgPHNwYW4gY2xhc3M9XCJtb25vXCI+KDI8c3VwPiR7YmYuY29tcHV0ZWRFeHBvbmVudH08L3N1cD4pPC9zcGFuPlxuICAgIDwvZGl2PlxuICAgIFxuICAgIDxkaXYgY2xhc3M9XCJyZXN1bHQtZ3JvdXBcIj5cbiAgICAgIFLDqXN1bHRhdCBlbiBiaW5haXJlOlxuICAgICAgPHNwYW4gY2xhc3M9XCJjb2xvci1yZWQgbW9ub1wiPiR7YmYuYmluYXJ5U2lnbn08L3NwYW4+XG4gICAgICA8c3BhbiBjbGFzcz1cImNvbG9yLWJsdWUgbW9ub1wiPiR7YmYuYmluYXJ5RXhwb25lbnR9PC9zcGFuPlxuICAgICAgPHNwYW4gY2xhc3M9XCJjb2xvci1vcmFuZ2UgbW9ub1wiPiR7YmYuYmluYXJ5TWFudGlzc2F9PC9zcGFuPlxuICAgIDwvZGl2PlxuICAgIFxuICAgIDxkaXYgY2xhc3M9XCJyZXN1bHQtZ3JvdXBcIj5cbiAgICAgIFLDqXN1bHRhdDogJHtiZi5jb21wdXRlZE51bWJlcn1cbiAgICA8L2Rpdj5cbiAgYDtcbn1cblxuYmZCaW5hcnlOdW1iZXJFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgb25DaGFuZ2VDb252ZXJ0ZXJCZik7XG5iZkJpbmFyeU51bWJlckVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImtleXVwXCIsIG9uQ2hhbmdlQ29udmVydGVyQmYpO1xuXG5vbkNoYW5nZUNvbnZlcnRlckJmKCk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=
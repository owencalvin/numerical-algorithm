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


;// CONCATENATED MODULE: ./src/classes/BinaryFloat.ts
/**
 * Labo: 1 (Float to binary conversion)
 * Authors: Owen Gombas, David Darmanger, Julien Vaucher, Clément Petignat
 * Team: 2
 * School: HE-Arc
 * Date: 21 mars 2022
 * Course: Mathématiques spécifiques (Module 2234) - M. Stéphane Gobron
 */

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
    BinaryFloat.getZero = function (bitsSize) {
        return new BinaryFloat(0, bitsSize);
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
    Object.defineProperty(BinaryFloat.prototype, "isNaN", {
        get: function () {
            var isNaNBinary = (this.binaryExponent.indexOf("0") === -1 &&
                this.binaryMantissa.indexOf("0") === -1 &&
                this.binarySign === "0");
            return Number.isNaN(this.number) || isNaNBinary;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BinaryFloat.prototype, "isInfinity", {
        get: function () {
            var isInfinityBinary = (this.binaryExponent.indexOf("0") === -1 &&
                this.binaryMantissa.indexOf("1") === -1 &&
                this.binarySign === "0");
            return this.number === Infinity || isInfinityBinary;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BinaryFloat.prototype, "isZero", {
        get: function () {
            var isZeroBinary = (this.binaryExponent.indexOf("1") === -1 &&
                this.binaryMantissa.indexOf("1") === -1 &&
                this.binarySign === "0");
            return this.number === 0 || isZeroBinary;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BinaryFloat.prototype, "binaryAbs", {
        /**
         * Get the absolute value of the number in binary
         */
        get: function () {
            return "0" + this.binaryExponent + this.binaryMantissa;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BinaryFloat.prototype, "computedNumber", {
        /**
         * The number that is coded in memory
         */
        get: function () {
            if (this.isZero) {
                return 0;
            }
            else if (this.isNaN) {
                return NaN;
            }
            else if (this.isInfinity) {
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
        // Special cases
        if (this.isNaN || bf2.isNaN) {
            return BinaryFloat.getNaN(this.bitsSize);
        }
        if (this.isInfinity || bf2.isInfinity) {
            return BinaryFloat.getInfinity(this.bitsSize);
        }
        if (this.binaryAbs === bf2.binaryAbs && this.binarySign !== bf2.binarySign) {
            return BinaryFloat.getZero(this.bitsSize);
        }
        // Step 1: Determine the lowest exponent between this and the second number
        var bfMinBinaryExponent = this;
        var bfMaxBinaryExponent = bf2;
        if (this._bh.binaryToDecimal(bf2.binaryExponent) < this._bh.binaryToDecimal(bfMinBinaryExponent.binaryExponent)) {
            bfMinBinaryExponent = bf2;
            bfMaxBinaryExponent = this;
        }
        // Copy the number, do not set by reference
        bfMaxBinaryExponent = new BinaryFloat(bfMaxBinaryExponent.computedNumber, this.bitsSize);
        bfMinBinaryExponent = new BinaryFloat(bfMinBinaryExponent.computedNumber, this.bitsSize);
        // If there is a 0 then return the non-zero number
        if (bfMinBinaryExponent.isZero) {
            return bfMaxBinaryExponent;
        }
        // Add the hidden bit
        bfMinBinaryExponent.binaryMantissa = "1" + bfMinBinaryExponent.binaryMantissa;
        bfMaxBinaryExponent.binaryMantissa = "1" + bfMaxBinaryExponent.binaryMantissa;
        // Step 2: Shift the mantissa
        var shiftValue = bfMaxBinaryExponent.computedExponent - bfMinBinaryExponent.computedExponent;
        var shiftedMinMantissa = this._bh.shiftRight(bfMinBinaryExponent.binaryMantissa, shiftValue);
        bfMinBinaryExponent.binaryMantissa = shiftedMinMantissa;
        // Step 3: Put the same exponent
        bfRes.binaryExponent = bfMaxBinaryExponent.binaryExponent;
        // Step 4: 2's complement if negative
        if (bfMinBinaryExponent.computedSign === -1) {
            bfMinBinaryExponent.binaryMantissa = this._bh.c2(bfMinBinaryExponent.binaryMantissa).reverse().join("");
        }
        if (bfMaxBinaryExponent.computedSign === -1) {
            bfMaxBinaryExponent.binaryMantissa = this._bh.c2(bfMaxBinaryExponent.binaryMantissa).reverse().join("");
            if (bfMaxBinaryExponent.computedSign !== bfMinBinaryExponent.computedSign) {
                bfRes.binarySign = "1";
            }
        }
        // Step 5: Add the mantissa and the shifted one
        bfRes.binaryMantissa = this._bh.binaryAddition(bfMaxBinaryExponent.binaryMantissa, bfMinBinaryExponent.binaryMantissa).reverse().join("");
        // Step 7: Normalize the mantissa
        // Hide the first bit
        bfRes.binaryMantissa = bfRes.binaryMantissa.substring(1);
        // Normalize the mantissa if there is a carry
        if (bfRes.binaryMantissa.length - bfRes.mantissaBitsSize === 1) {
            // Round the last bit
            var lastBit = bfRes.binaryMantissa[bfRes.binaryMantissa.length - 1];
            var beforeLastBit = bfRes.binaryMantissa[bfRes.binaryMantissa.length - 2];
            bfRes.binaryMantissa = bfRes.binaryMantissa.slice(0, -1);
            if (beforeLastBit === "1" && lastBit === "1") {
                bfRes.binaryMantissa = this._bh.binaryAddition(bfRes.binaryMantissa, "1").reverse().join("");
            }
            // Add 1 to the exponent
            bfRes.binaryExponent = this._bh.addNumberToBinary(bfRes.binaryExponent, 1)[0];
        }
        return bfRes;
    };
    return BinaryFloat;
}());


;// CONCATENATED MODULE: ./src/labo1-bf-converter.ts
/**
 * Labo: 1 (Float to binary conversion)
 * Authors: Owen Gombas, David Darmanger, Julien Vaucher, Clément Petignat
 * Team: 2
 * School: HE-Arc
 * Date: 21 mars 2022
 * Course: Mathématiques spécifiques (Module 2234) - M. Stéphane Gobron
 */

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
    bfResultElement.innerHTML = "\n    <div class=\"result-group\">\n      Taille en bits total: ".concat(bf.bitsSize, "\n    </div>\n\n    <div class=\"result-group\">\n      Taille en bits de l'exposant: ").concat(bf.exponentBitsSize, "\n    </div>\n    \n    <div class=\"result-group\">\n      Taille en bits de la mantisse: ").concat(bf.mantissaBitsSize, "\n    </div>\n\n    <div class=\"result-group\">\n      Biais: ").concat(bf.bias, "\n    </div>\n    \n    <div class=\"result-group\">\n      Signe:\n      <span class=\"color-red mono\">").concat(bf.binarySign, "</span>\n      <span class=\"mono\">(").concat(bf.computedSign > 0 ? "+" : "-", ")</span>\n    </div>\n    \n    <div class=\"result-group\">\n      Mantisse:\n      <span class=\"color-orange mono\">\n        ").concat(bf.binaryMantissa, "\n      </span>\n      <span class=\"mono\">(").concat(bf.computedMantissa, ")</span>\n    </div>\n\n    <div class=\"result-group\">\n      Exposant: <span class=\"color-blue mono\">").concat(bf.binaryExponent, "</span>\n      <span class=\"mono\">(2<sup>").concat(bf.computedExponent, "</sup>)</span>\n    </div>\n    \n    <div class=\"result-group\">\n      R\u00E9sultat en binaire:\n      <span class=\"color-red mono\">").concat(bf.binarySign, "</span>\n      <span class=\"color-blue mono\">").concat(bf.binaryExponent, "</span>\n      <span class=\"color-orange mono\">").concat(bf.binaryMantissa, "</span>\n    </div>\n    \n    <div class=\"result-group\">\n      R\u00E9sultat: ").concat(bf.computedNumber, "\n    </div>\n  ");
}
bfBinaryNumberElement.addEventListener("change", onChangeConverterBf);
bfBinaryNumberElement.addEventListener("keyup", onChangeConverterBf);
onChangeConverterBf();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LHFCQUFxQixDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxtQkFBbUIsQ0FBQyxDQUFDO0FBRXJFLG1CQUFtQixFQUFFLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9tYXRoX3NwZS8uL3NyYy9jbGFzc2VzL0JpbmFyeUhlbHBlci50cyIsIndlYnBhY2s6Ly9tYXRoX3NwZS8uL3NyYy9jbGFzc2VzL0JpbmFyeUZsb2F0LnRzIiwid2VicGFjazovL21hdGhfc3BlLy4vc3JjL2xhYm8xLWJmLWNvbnZlcnRlci50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIExhYm86IDAgKEJpbmFyeSBvcGVyYXRpb25zKVxuICogQXV0aG9yczogT3dlbiBHb21iYXMsIERhdmlkIERhcm1hbmdlciwgSnVsaWVuIFZhdWNoZXIsIENsw6ltZW50IFBldGlnbmF0XG4gKiBUZWFtOiAyXG4gKiBTY2hvb2w6IEhFLUFyY1xuICogRGF0ZTogMjEgbWFycyAyMDIyXG4gKiBDb3Vyc2U6IE1hdGjDqW1hdGlxdWVzIHNww6ljaWZpcXVlcyAoTW9kdWxlIDIyMzQpIC0gTS4gU3TDqXBoYW5lIEdvYnJvblxuICovXG5cbmV4cG9ydCBjbGFzcyBCaW5hcnlIZWxwZXIge1xuICAvKipcbiAgICogR2V0IG4gYml0IG9mIDAgb3IgMVxuICAgKiBAcGFyYW0gdmFsdWUgMSBvciAwXG4gICAqIEBwYXJhbSBuIFRoZSBudW1iZXIgb2YgYml0cyB0byByZXRyaWV2ZVxuICAgKiBAcmV0dXJucyBuIGJpdCBvZiAwIG9yIDFcbiAgICovXG4gIHB1YmxpYyBnZXROQml0KHZhbHVlOiAxIHwgMCwgbjogbnVtYmVyKTogc3RyaW5nIHtcbiAgICBsZXQgcmVzID0gXCJcIjtcbiAgICBcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG47IGkrKykge1xuICAgICAgcmVzICs9IHZhbHVlO1xuICAgIH1cblxuICAgIHJldHVybiByZXM7XG4gIH1cblxuICAvKipcbiAgICogQWRkIG4gemVyb3MgYmVmb3JlIHRoZSBiaW5hcnkgbnVtYmVyXG4gICAqIEBwYXJhbSBuIFRoZSBudW1iZXIgb2YgMCB0byBhZGQgYmVmb3JlIHRoZSBiaW5hcnkgbnVtYmVyXG4gICAqIEBwYXJhbSBiIFRoZSBiaW5hcnkgbnVtYmVyXG4gICAqIEByZXR1cm5zIFRoZSBiaW5hcnkgbnVtYmVyIHdpdGggbiB6ZXJvcyBiZWZvcmVcbiAgICovXG4gIHB1YmxpYyBhZGRQYWRkaW5nKG46IG51bWJlciwgYiA9IFwiXCIpIHtcbiAgICBjb25zdCBzaXplID0gbiAtIGIubGVuZ3RoO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaXplOyBpKyspIHtcbiAgICAgIGIgPSBcIjBcIiArIGI7XG4gICAgfVxuXG4gICAgcmV0dXJuIGI7XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlcyB0aGUgemVyb3MgYmVmb3JlIGEgYmluYXJ5IG51bWJlciAoMDAwMTAxIGJlY29tZXMgMTAxKVxuICAgKiBAcGFyYW0gYiBUaGUgYmluYXJ5IG51bWJlclxuICAgKiBAcmV0dXJucyBUaGUgcHJvZHVjZWQgYmluYXJ5IG51bWJlclxuICAgKi9cbiAgcHVibGljIGNsZWFuKGI6IHN0cmluZykge1xuICAgIGxldCByZXMgPSBiO1xuXG4gICAgZm9yKGxldCBpID0gMDsgaSA8IGIubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChiW2ldID09PSBcIjBcIikge1xuICAgICAgICByZXMgPSByZXMuc3Vic3RyaW5nKDEpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHJlcztcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAocmVzID09PSBcIlwiKSB7XG4gICAgICByZXR1cm4gXCIwXCI7XG4gICAgfVxuICB9XG5cblxuICAvKipcbiAgICogQWRkIDAgcGFkZGluZyB0byB0aGUgc21hbGxlc3QgYmluYXJ5IG51bWJlciB0byBtYXRjaCB0aGUgbG9uZ2VzdCBvbmUncyBsZW5ndGhcbiAgICogWzEwMSwgMTEwMDFdIGJlY29tZXMgWzAwMTAxLCAxMTAwMV1cbiAgICogQHBhcmFtIGIxIFRoZSBmaXJzdCBiaW5hcnkgbnVtYmVyXG4gICAqIEBwYXJhbSBiMiBUaGUgc2Vjb25kIGJpbmFyeSBudW1iZXJcbiAgICogQHJldHVybnMgW2IxLCBiMl0gd2l0aCBjb3JyZWN0IHBhZGRpbmdcbiAgICovXG4gIHB1YmxpYyBhZGRNYXhQYWRkaW5nKGIxOiBzdHJpbmcsIGIyOiBzdHJpbmcpIHtcbiAgICBpZiAoYjIubGVuZ3RoID4gYjEubGVuZ3RoKSB7XG4gICAgICBiMSA9IHRoaXMuYWRkUGFkZGluZyhiMi5sZW5ndGgsIGIxKTtcbiAgICB9IGVsc2UgaWYgKGIxLmxlbmd0aCA+IGIyLmxlbmd0aCkge1xuICAgICAgYjIgPSB0aGlzLmFkZFBhZGRpbmcoYjEubGVuZ3RoLCBiMik7XG4gICAgfVxuXG4gICAgcmV0dXJuIFtiMSwgYjJdO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgbWF4IGxlbmd0aCBvZiB0d28gYmluYXJpZXMgbnVtYmVyc1xuICAgKiBAcGFyYW0gYjEgVGhlIGZpcnN0IGJpbmFyeSBudW1iZXJcbiAgICogQHBhcmFtIGIyIFRoZSBzZWNvbmQgYmluYXJ5IG51bWJlclxuICAgKiBAcmV0dXJucyBUaGUgbWF4IGxlbmd0aFxuICAgKi9cbiAgcHVibGljIGdldE1heExlbmd0aChiMTogc3RyaW5nLCBiMjogc3RyaW5nKSB7XG4gICAgaWYgKGIxLmxlbmd0aCA+IGIyLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIGIxLmxlbmd0aDtcbiAgICB9XG4gICAgcmV0dXJuIGIyLmxlbmd0aDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDb252ZXJ0IGEgbnVtYmVyIHRvIGl0J3MgYmluYXJ5IHJlcHJlc2VudGF0aW9uXG4gICAqIEBwYXJhbSBkZWNpbWFsIFRoZSBcbiAgICogQHJldHVybnMgVGhlIGJpbmFyeSByZXByZXNlbnRhdGlvbiBvZiB0aGUgZGVjaW1hbCBudW1iZXJcbiAgICovXG4gIHB1YmxpYyBkZWNpbWFsVG9CaW5hcnkoZGVjaW1hbDogbnVtYmVyKSB7XG4gICAgY29uc3Qgb3JpZ2luYWxOdW1iZXIgPSBkZWNpbWFsO1xuICAgIGxldCBiaW5hcnlOdW1iZXIgPSAoTWF0aC5hYnMoZGVjaW1hbCkgPj4+IDApLnRvU3RyaW5nKDIpO1xuXG4gICAgaWYgKG9yaWdpbmFsTnVtYmVyIDwgMCkge1xuICAgICAgYmluYXJ5TnVtYmVyID0gdGhpcy5jMihiaW5hcnlOdW1iZXIpLnJldmVyc2UoKS5qb2luKFwiXCIpO1xuICAgIH1cblxuICAgIHJldHVybiBiaW5hcnlOdW1iZXI7XG4gIH1cblxuICAvKipcbiAgICogQ29udmVydCBhIGJpbmFyeSByZXByZXNlbnRhdGlvbiBvZiBhIG51bWJlciB0byBhIGRlY2ltYWwgbnVtYmVyXG4gICAqIEBwYXJhbSBiaW5hcnkgVGhlIGJpbmFyeSByZXByZXNlbnRhdGlvbiBvZiBhIG51bWJlclxuICAgKiBAcmV0dXJucyBUaGUgaW50IHJlcHJlc2VudGF0aW9uIG9mIGEgYmluYXJ5IG51bWJlclxuICAgKi9cbiAgcHVibGljIGJpbmFyeVRvRGVjaW1hbChiaW5hcnk6IHN0cmluZykge1xuICAgIHJldHVybiBwYXJzZUludChiaW5hcnksIDIpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZCBpbnQgdG8gYSBiaW5hcnkgbnVtYmVyXG4gICAqIEBwYXJhbSBiIFRoZSBiaW5hcnkgbnVtYmVyXG4gICAqIEBwYXJhbSBuIFRoZSBpbnQgbnVtYmVyIHRvIGFkZCB0byB0aGUgYmluYXJ5IG51bWJlclxuICAgKiBAcmV0dXJucyBUaGUgcHJvZHVjZWQgcmVzdWx0XG4gICAqL1xuICBwdWJsaWMgYWRkTnVtYmVyVG9CaW5hcnkoYjogc3RyaW5nLCBuOiBudW1iZXIpOiBzdHJpbmdbXSB7XG4gICAgcmV0dXJuIHRoaXMuYmluYXJ5QWRkaXRpb24oYiwgdGhpcy5kZWNpbWFsVG9CaW5hcnkobikpO1xuICB9XG5cbiAgLyoqXG4gICAqIEludmVydCBhIGJpbmFyeSBudW1iZXJcbiAgICogQHBhcmFtIGIgVGhlIGJpbmFyeSBudW1iZXIgdG8gaW52ZXJ0XG4gICAqIEByZXR1cm5zIFRoZSBpbnZlcnQgYmluYXJ5IG51bWJlclxuICAgKi9cbiAgcHVibGljIGludmVydChiOiBzdHJpbmcpIHtcbiAgICBjb25zdCBpbml0aWFsTGVuZ3RoID0gYi5sZW5ndGg7XG4gICAgYiA9IHRoaXMuZGVjaW1hbFRvQmluYXJ5KHRoaXMuYmluYXJ5VG9EZWNpbWFsKGIpIF4gdGhpcy5iaW5hcnlUb0RlY2ltYWwodGhpcy5nZXROQml0KDEsIGIubGVuZ3RoKSkpO1xuICAgIGIgPSB0aGlzLmFkZFBhZGRpbmcoaW5pdGlhbExlbmd0aCwgYik7XG4gICAgcmV0dXJuIGI7XG4gIH1cblxuICAvKipcbiAgICogU2hpZnQgdGhlIGJpbmFyeSBudW1iZXIgdG8gdGhlIHJpZ2h0XG4gICAqIEBwYXJhbSBiIFRoZSBiaW5hcnkgbnVtYmVyXG4gICAqIEBwYXJhbSBzaGlmdFZhbHVlIFRoZSBzaGlmdCB2YWx1ZVxuICAgKiBAcmV0dXJucyBUaGUgc2hpZnRlZCBiaW5hcnkgbnVtYmVyXG4gICAqL1xuICBwdWJsaWMgc2hpZnRSaWdodChiOiBzdHJpbmcsIHNoaWZ0VmFsdWU6IG51bWJlcikge1xuICAgIC8vIFwiMDAwMDAxMDEwXCIgPj4gMiA9PiBcIjAwMDAwMDAxMFwiXG4gICAgLy8gMS4gUmVtb3ZlcyBsYXN0cyA8c2hpZnRWYWx1ZT4gYml0c1xuICAgIC8vIDIuIFBsYWNlcyA8c2hpZnRWYWx1ZT4gYml0cyBhdCAwIGJlZm9yZVxuXG4gICAgaWYgKHNoaWZ0VmFsdWUgPCAxKSB7XG4gICAgICByZXR1cm4gYjtcbiAgICB9XG5cbiAgICBsZXQgcmVzID0gYjtcbiAgICByZXMgPSByZXMuc2xpY2UoMCwgLXNoaWZ0VmFsdWUpO1xuICAgIHJlcyA9IFwiXCIucGFkU3RhcnQoc2hpZnRWYWx1ZSwgXCIwXCIpICsgcmVzO1xuXG4gICAgcmV0dXJuIHJlcztcbiAgfVxuXG4gIC8qKlxuICAgKiBTaGlmdCB0aGUgYmluYXJ5IG51bWJlciB0byB0aGUgbGVmdFxuICAgKiBAcGFyYW0gYiBUaGUgYmluYXJ5IG51bWJlclxuICAgKiBAcGFyYW0gc2hpZnRWYWx1ZSBUaGUgc2hpZnQgdmFsdWVcbiAgICogQHJldHVybnMgVGhlIHNoaWZ0ZWQgYmluYXJ5IG51bWJlclxuICAgKi9cbiAgcHVibGljIHNoaWZ0TGVmdChiOiBzdHJpbmcsIHNoaWZ0VmFsdWU6IG51bWJlcikge1xuICAgIC8vIFwiMDAwMDAxMDEwXCIgPDwgMiA9PiBcIjAwMDAwMTAxMDAwXCJcbiAgICAvLyAxLiBSZW1vdmVzIGxhc3RzIDxzaGlmdFZhbHVlPiBiaXRzXG4gICAgLy8gMi4gUGxhY2VzIDxzaGlmdFZhbHVlPiBiaXRzIGF0IDAgYmVmb3JlXG5cbiAgICBpZiAoc2hpZnRWYWx1ZSA8IDEpIHtcbiAgICAgIHJldHVybiBiO1xuICAgIH1cblxuICAgIGxldCByZXMgPSBiO1xuICAgIHJlcyA9IHJlcy5zbGljZShzaGlmdFZhbHVlKTtcbiAgICByZXMgKz0gXCJcIi5wYWRFbmQoc2hpZnRWYWx1ZSwgXCIwXCIpO1xuXG4gICAgcmV0dXJuIHJlcztcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGQgMiBiaXQgdG9nZXRoZXIgd2l0aCB0aGUgY2FycnlcbiAgICogQHBhcmFtIHggVGhlIGZpcnN0IGJpdFxuICAgKiBAcGFyYW0geSBUaGUgc2Vjb25kIGJpdFxuICAgKiBAcGFyYW0gY2FycnkgVGhlIGNhcnJ5XG4gICAqIEByZXR1cm5zIFRoZSByZXN1bHQgd2l0aCB0aGUgY2FycnkgW2JpdCwgY2FycnldXG4gICAqL1xuICBwdWJsaWMgZWxlbWVudGFyeUFkZGl0aW9uKHg6IHN0cmluZywgeTogc3RyaW5nLCBjYXJyeSA9IFwiXCIpOiBzdHJpbmdbXSB7XG4gICAgY29uc3QgcmVzID0gTnVtYmVyKHgpICsgTnVtYmVyKHkpICsgTnVtYmVyKGNhcnJ5KTtcblxuICAgIHN3aXRjaCAocmVzKSB7XG4gICAgICAvLyBjID0gMSwgeCA9IDEsIHkgPSAxXG4gICAgICBjYXNlIDM6XG4gICAgICAgIHJldHVybiBbXCIxXCIsIFwiMVwiXTtcbiAgICAgIGNhc2UgMjpcbiAgICAgICAgcmV0dXJuIFtcIjBcIiwgXCIxXCJdO1xuICAgICAgY2FzZSAxOlxuICAgICAgICByZXR1cm4gW1wiMVwiLCBcIlwiXTtcbiAgICAgIC8vIGMgPSAwLCB4ID0gMCwgeSA9IDBcbiAgICAgIGNhc2UgMDpcbiAgICAgICAgcmV0dXJuIFtcIjBcIiwgXCJcIl07XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEFkZCAyIGJpbmFyeSBudW1iZXJzXG4gICAqIEBwYXJhbSBiMSBUaGUgZmlyc3QgYmluYXJ5IG51bWJlclxuICAgKiBAcGFyYW0gYjIgVGhlIHNlY29uZCBiaW5hcnkgbnVtYmVyXG4gICAqIEByZXR1cm5zIFRoZSByZXN1bHQgb2YgdGhlIGFkZGl0aW9uIFtiaW5hcnlOdW1iZXIsIGNhcnJ5Qml0XVxuICAgKi9cbiAgcHVibGljIGJpbmFyeUFkZGl0aW9uKGIxOiBzdHJpbmcsIGIyOiBzdHJpbmcpIHtcbiAgICBsZXQgcmVzID0gXCJcIjtcbiAgICBsZXQgY2FycnkgPSBcIlwiO1xuICAgIGNvbnN0IFticDEsIGJwMl0gPSB0aGlzLmFkZE1heFBhZGRpbmcoYjEsIGIyKTtcblxuICAgIGZvciAobGV0IGkgPSBicDEubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgIGNvbnN0IFtyLCBjXSA9IHRoaXMuZWxlbWVudGFyeUFkZGl0aW9uKGJwMVtpXSwgYnAyW2ldLCBjYXJyeSk7XG4gICAgICByZXMgPSByICsgcmVzO1xuICAgICAgY2FycnkgPSBjO1xuICAgIH1cblxuICAgIHJldHVybiBbcmVzLCBjYXJyeV07XG4gIH1cblxuICAvKipcbiAgICogU3Vic3RyYWN0IDIgYmluYXJ5IG51bWJlcnNcbiAgICogQHBhcmFtIGIxIFRoZSBmaXJzdCBiaW5hcnkgbnVtYmVyXG4gICAqIEBwYXJhbSBiMiBUaGUgc2Vjb25kIGJpbmFyeSBudW1iZXJcbiAgICogQHJldHVybnMgVGhlIHJlc3VsdCBvZiB0aGUgc3Vic3RyYWN0aW9uIFtiaW5hcnlOdW1iZXIsIGNhcnJ5Qml0XVxuICAgKi9cbiAgcHVibGljIGJpbmFyeVN1YnN0cmFjdGlvbihiMTogc3RyaW5nLCBiMjogc3RyaW5nKSB7XG4gICAgY29uc3QgW2JwMSwgYnAyXSA9IHRoaXMuYWRkTWF4UGFkZGluZyhiMSwgYjIpO1xuICAgIHJldHVybiB0aGlzLmJpbmFyeUFkZGl0aW9uKGJwMSwgdGhpcy5jMihicDIpLnJldmVyc2UoKS5qb2luKFwiXCIpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQZXJmb3JtIGEgMidzIGNvbXBsZW1lbnQgb3BlcmF0aW9uIHdpdGhvdXQgdGhlIGNhcnJ5XG4gICAqIEBwYXJhbSBiIFRoZSBiaW5hcnkgbnVtYmVyXG4gICAqIEByZXR1cm5zIFRoZSAyJ3MgY29tcGxlbWVudCBvZiB0aGUgYmluYXJ5IG51bWJlciBbYmluYXJ5TnVtYmVyLCBjYXJyeV1cbiAgICovXG4gIHB1YmxpYyBjMihiOiBzdHJpbmcpOiBzdHJpbmdbXSB7XG4gICAgYiA9IHRoaXMuaW52ZXJ0KGIpO1xuICAgIHJldHVybiB0aGlzLmFkZE51bWJlclRvQmluYXJ5KGIsIDEpO1xuICB9XG5cbiAgLyoqXG4gICAqIE11bHRpcGx5IDIgYmluYXJ5IG51bWJlcnNcbiAgICogQHBhcmFtIGIxIFRoZSBmaXJzdCBiaW5hcnkgbnVtYmVyXG4gICAqIEBwYXJhbSBiMiBUaGUgc2Vjb25kIGJpbmFyeSBudW1iZXJcbiAgICogQHJldHVybnMgVGhlIHJlc3VsdCBvZiB0aGUgbXVsdGlwbGljYXRpb25cbiAgICovXG4gIHB1YmxpYyBiaW5hcnlNdWx0aXBsaWNhdGlvbihiMTogc3RyaW5nLCBiMjogc3RyaW5nKSB7XG4gICAgbGV0IHJlcyA9IFwiXCI7XG4gICAgY29uc3QgYWRkUmVzdWx0cyA9IFtdO1xuXG4gICAgLy8gVGhlIGJpbmFyeSBudW1iZXJzIHRvIG11bGl0cGx5XG4gICAgLy8gYnAxID0gMTAxMVxuICAgIC8vIGJwMiA9IDExMTFcbiAgICBjb25zdCBbYnAxLCBicDJdID0gdGhpcy5hZGRNYXhQYWRkaW5nKGIxLCBiMik7XG5cbiAgICAvLyBDYWxjdWxhdGUgdGhlIG9wZXJhbmRzXG4gICAgLy8gYWRkUmVzdWx0cyA9IFtcbiAgICAvLyAgICAwMDAwIDEwMTEsXG4gICAgLy8gICAgMDAwMSAwMTEwLFxuICAgIC8vICAgIDAwMTAgMTEwMCxcbiAgICAvLyAgICAxMDExIDAwMDBcbiAgICAvLyBdXG4gICAgZm9yIChsZXQgaSA9IGJwMS5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgbGV0IGN1cnJlbnRSZXMgPSBcIlwiO1xuXG4gICAgICBmb3IgKGxldCBqID0gYnAxLmxlbmd0aCAtIDE7IGogPj0gMDsgai0tKSB7XG4gICAgICAgIGN1cnJlbnRSZXMgPSAoTnVtYmVyKGJwMVtqXSkgKiBOdW1iZXIoYnAyW2ldKSkgKyBjdXJyZW50UmVzO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBkZWMgPSB0aGlzLmJpbmFyeVRvRGVjaW1hbChjdXJyZW50UmVzKSA8PCAoYnAxLmxlbmd0aCAtIDEgLSBpKTtcbiAgICAgIGN1cnJlbnRSZXMgPSB0aGlzLmRlY2ltYWxUb0JpbmFyeShkZWMpO1xuICAgICAgYWRkUmVzdWx0cy5wdXNoKGN1cnJlbnRSZXMpO1xuICAgIH1cblxuICAgIC8vIEFkZCBldmVyeXRoaW5nXG4gICAgLy8gcmVzID1cbiAgICAvLyAgIDAwMDAgMTAxMSxcbiAgICAvLyArIDAwMDEgMDExMCxcbiAgICAvLyArIDAwMTAgMTEwMCxcbiAgICAvLyArIDEwMTEgMDAwMFxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYWRkUmVzdWx0cy5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgYWRkUmVzdWx0ID0gdGhpcy5hZGRQYWRkaW5nKGFkZFJlc3VsdHNbYWRkUmVzdWx0cy5sZW5ndGggLSAxXS5sZW5ndGgsIGFkZFJlc3VsdHNbaV0pO1xuICAgICAgY29uc3QgW3IsIGNdID0gdGhpcy5iaW5hcnlBZGRpdGlvbihyZXMsIGFkZFJlc3VsdCk7XG4gICAgICByZXMgPSBjICsgcjtcbiAgICB9XG5cbiAgICAvLyByZXMgPSAxMDEwMDEwMVxuICAgIHJldHVybiByZXM7XG4gIH1cbn1cbiIsIi8qKlxuICogTGFibzogMSAoRmxvYXQgdG8gYmluYXJ5IGNvbnZlcnNpb24pXG4gKiBBdXRob3JzOiBPd2VuIEdvbWJhcywgRGF2aWQgRGFybWFuZ2VyLCBKdWxpZW4gVmF1Y2hlciwgQ2zDqW1lbnQgUGV0aWduYXRcbiAqIFRlYW06IDJcbiAqIFNjaG9vbDogSEUtQXJjXG4gKiBEYXRlOiAyMSBtYXJzIDIwMjJcbiAqIENvdXJzZTogTWF0aMOpbWF0aXF1ZXMgc3DDqWNpZmlxdWVzIChNb2R1bGUgMjIzNCkgLSBNLiBTdMOpcGhhbmUgR29icm9uXG4gKi9cblxuaW1wb3J0IHsgQmluYXJ5SGVscGVyIH0gZnJvbSBcIi4vQmluYXJ5SGVscGVyXCI7XG5cbi8qKlxuICogRW5jb2RlIGEgZmxvYXRpbmcgbnVtYmVyIHdpdGggYSBjaG9vc2VuIGJpdCBzaXplIGFuZCBJRUVFIDc1NFxuICovXG5leHBvcnQgY2xhc3MgQmluYXJ5RmxvYXQge1xuICBwcml2YXRlIF9iaXRzU2l6ZSA9IDMyO1xuICBwcml2YXRlIF9udW1iZXIgPSAwO1xuICBwcml2YXRlIF9iaW5hcnlTaWduOiBcIjFcIiB8IFwiMFwiID0gXCIwXCI7XG4gIHByaXZhdGUgX2JpbmFyeU1hbnRpc3NhID0gXCJcIjtcbiAgcHJpdmF0ZSBfb3ZlcmZsb3cgPSBmYWxzZTtcbiAgcHJpdmF0ZSBfbWFudGlzc2FEb3RQb3NpdGlvbiA9IDA7XG4gIHByaXZhdGUgX2JpbmFyeUV4cG9uZW50ID0gXCJcIjtcbiAgcHJpdmF0ZSBfYmlhcyA9IDA7XG4gIHByaXZhdGUgX2JoID0gbmV3IEJpbmFyeUhlbHBlcigpO1xuXG4gIGNvbnN0cnVjdG9yKG51bWJlck9yQmluYXJ5OiBzdHJpbmcpO1xuICBjb25zdHJ1Y3RvcihudW1iZXJPckJpbmFyeTogbnVtYmVyLCBiaXRzU2l6ZTogbnVtYmVyKTtcbiAgY29uc3RydWN0b3IobnVtYmVyT3JCaW5hcnk6IG51bWJlciB8IHN0cmluZywgYml0c1NpemU/OiBudW1iZXIpIHtcbiAgICBpZiAodHlwZW9mIG51bWJlck9yQmluYXJ5ID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAvLyBSZW1vdmUgdGhlIHNwYWNlcyBpbiB0aGUgc3RyaW5nXG4gICAgICBudW1iZXJPckJpbmFyeSA9IG51bWJlck9yQmluYXJ5LnRyaW0oKTtcbiAgICAgIG51bWJlck9yQmluYXJ5ID0gbnVtYmVyT3JCaW5hcnkucmVwbGFjZSgvXFxzL2csIFwiXCIpO1xuICAgICAgdGhpcy5iaXRzU2l6ZSA9IG51bWJlck9yQmluYXJ5Lmxlbmd0aDtcbiAgICAgIHRoaXMubnVtYmVyID0gMTtcblxuICAgICAgLy8gU2xpY2UgdGhlIHN0cmluZyB0byBhc3NpZ24gdGhlIGJpbmFyeSBudW1iZXIgdG8gdGhlIGNvcnJlY3QgcGFydCBvZiB0aGUgYmluYXJ5IHJlcHJlc2VudGF0aW9uIG9mIHRoZSBmbG9hdFxuICAgICAgdGhpcy5iaW5hcnlTaWduID0gbnVtYmVyT3JCaW5hcnlbMF0gYXMgXCIwXCIgfCBcIjFcIjtcbiAgICAgIHRoaXMuYmluYXJ5RXhwb25lbnQgPSBudW1iZXJPckJpbmFyeS5zbGljZSgxLCB0aGlzLmV4cG9uZW50Qml0c1NpemUgKyAxKTtcbiAgICAgIHRoaXMuYmluYXJ5TWFudGlzc2EgPSBudW1iZXJPckJpbmFyeS5zbGljZSh0aGlzLmV4cG9uZW50Qml0c1NpemUgKyAxLCB0aGlzLmJpdHNTaXplKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5iaXRzU2l6ZSA9IGJpdHNTaXplO1xuICAgICAgdGhpcy5udW1iZXIgPSBudW1iZXJPckJpbmFyeTtcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgZ2V0SW5maW5pdHkoYml0c1NpemU6IG51bWJlcikge1xuICAgIHJldHVybiBuZXcgQmluYXJ5RmxvYXQoSW5maW5pdHksIGJpdHNTaXplKTtcbiAgfVxuXG4gIHN0YXRpYyBnZXROYU4oYml0c1NpemU6IG51bWJlcikge1xuICAgIHJldHVybiBuZXcgQmluYXJ5RmxvYXQoTmFOLCBiaXRzU2l6ZSk7XG4gIH1cblxuICBzdGF0aWMgZ2V0WmVybyhiaXRzU2l6ZTogbnVtYmVyKSB7XG4gICAgcmV0dXJuIG5ldyBCaW5hcnlGbG9hdCgwLCBiaXRzU2l6ZSk7XG4gIH1cblxuICAvKipcbiAgICogVGhlIGZsb2F0IG51bWJlciB0byBjb2RlZCB3aXRoIElFRUUgNzU0XG4gICAqL1xuICBnZXQgbnVtYmVyKCkge1xuICAgIHJldHVybiB0aGlzLl9udW1iZXI7XG4gIH1cblxuICBzZXQgbnVtYmVyKHZhbHVlOiBudW1iZXIpIHtcbiAgICB0aGlzLl9udW1iZXIgPSB2YWx1ZTtcblxuICAgIHRoaXMuY2FsY3VsYXRlQmluYXJ5U2lnbigpO1xuICAgIHRoaXMuY2FsY3VsYXRlQmlhcygpO1xuICAgIHRoaXMuY2FsY3VsYXRlQmluYXJ5TWFudGlzc2EoKTtcbiAgICB0aGlzLmNhbGN1bGF0ZUJpbmFyeUV4cG9uZW50KCk7XG4gIH1cblxuICAvKipcbiAgICogVGhlIGJpdCBzaXplIHRvIGNvZGUgdGhlIG51bWJlclxuICAgKi9cbiAgZ2V0IGJpdHNTaXplKCkge1xuICAgIHJldHVybiB0aGlzLl9iaXRzU2l6ZTtcbiAgfVxuXG4gIHNldCBiaXRzU2l6ZSh2YWx1ZTogbnVtYmVyKSB7XG4gICAgdGhpcy5fYml0c1NpemUgPSB2YWx1ZTtcblxuICAgIGlmICh2YWx1ZSA+IDgwKSB7XG4gICAgICB0aGlzLl9iaXRzU2l6ZSA9IDgwO1xuICAgIH1cblxuICAgIGlmICh2YWx1ZSA8IDgpIHtcbiAgICAgIHRoaXMuX2JpdHNTaXplID0gODtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBtYW50aXNzYSBiaXRzIHNpemVcbiAgICovXG4gIGdldCBtYW50aXNzYUJpdHNTaXplKCkge1xuICAgIGlmICh0aGlzLmJpdHNTaXplIDwgOCkge1xuICAgICAgcmV0dXJuIDA7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuYml0c1NpemUgLSB0aGlzLmV4cG9uZW50Qml0c1NpemUgLSAxO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgZXhwb25lbnQgYml0cyBzaXplIHdpdGg6XG4gICAqIC0gVGhlIElFRUUgNzU0IDIwMTkgZm9ybXVsYSBpZiB0aGUgYml0cyBzaXplIGlzIGdyZWF0ZXIgb3IgZXF1YWwgdG8gMTI4XG4gICAqIC0gQSBjdXN0b20gZm9ybXVsYSBpZiB0aGUgYml0IHNpemUgaXMgbGVzcyB0aGFuIDEyOCB0aGF0IG1hdGNoZXMgdGhlIElFRUUgc3RhbmRhcmRcbiAgICogXG4gICAqIFZpc3VhbGl6ZSB0aGUgZnVuY3Rpb24gb24gZ2VvZ2VicmE6XG4gICAqIGh0dHBzOi8vd3d3Lmdlb2dlYnJhLm9yZy9jYWxjdWxhdG9yL2NlcnJrZGZ2XG4gICAqL1xuICBnZXQgZXhwb25lbnRCaXRzU2l6ZSgpIHtcbiAgICBpZiAodGhpcy5iaXRzU2l6ZSA8IDgpIHtcbiAgICAgIHJldHVybiAwO1xuICAgIH1cblxuICAgIC8vIElFRUUgNzU0IDIwMTkgZm9ybXVsYSA+PSAxMjhcbiAgICBpZiAodGhpcy5iaXRzU2l6ZSA+PSAxMjgpIHtcbiAgICAgIHJldHVybiBNYXRoLnJvdW5kKDQgKiBNYXRoLmxvZzIodGhpcy5iaXRzU2l6ZSkpIC0gMTM7XG4gICAgfVxuXG4gICAgLy8gQSBmb3JtdWxhIHRoYXQgbWF0Y2hlcyB0aGUgdmFsdWVzIGZvciA8IDEyOFxuICAgIC8vIHJlZjogaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9hLzYyNjMyMjYwXG4gICAgcmV0dXJuIE1hdGgucm91bmQoKE1hdGgubG9nMih0aGlzLmJpdHNTaXplKSAtIDEpICoqICgzIC8gMikpO1xuICB9XG5cbiAgZ2V0IHBvc2l0aXZlTnVtYmVyKCkge1xuICAgIHJldHVybiBNYXRoLmFicyh0aGlzLm51bWJlcik7XG4gIH1cblxuICAvKipcbiAgICogQ2FsY3VsYXRlIHRoZSBwb3NpdGlvbiBvZiB0aGUgZG90IGluIHRoZSBtYW50aXNzYVxuICAgKiAgICAgICAgICAgIGZsb2F0IHBvc2l0aW9uXG4gICAqICAgICAgICAgICAgICAgICAgfFxuICAgKiAgICAgICAgICAgICAgICAgIHZcbiAgICogbWFudGlzc2EoMTkuNTkzNzUpID0+IFwiMDAxMS4xMDAxMTAwMDAwMDAwMDAwMDAwXCJcbiAgICovXG4gIGdldCBtYW50aXNzYURvdFBvc2l0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLl9tYW50aXNzYURvdFBvc2l0aW9uO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgZXhwb25lbnQgb2YgdGhlIG51bWJlciBpbiBiaW5hcnkgd2l0aCB0aGUgYmlhc1xuICAgKiBtYW50aXNzYSgxOS41OTM3NSkgPT4gXCIxMDAwMDAxMFwiXG4gICAqL1xuICBnZXQgYmluYXJ5RXhwb25lbnQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2JpbmFyeUV4cG9uZW50O1xuICB9XG5cbiAgc2V0IGJpbmFyeUV4cG9uZW50KHZhbHVlOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9iaW5hcnlFeHBvbmVudCA9IHZhbHVlO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybiB0aGUgYmlhcyBvZiB0aGUgbnVtYmVyIGJhc2VkIG9uIHRoZSBleHBvbmVudCBiaXQgc2l6ZVxuICAgKiBiID0gMiBeIChleHBvbmVudEJpdHNTaXplIC0gMSkgLSAxXG4gICAqL1xuICBnZXQgYmlhcygpIHtcbiAgICByZXR1cm4gdGhpcy5fYmlhcztcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIGZ1bGwgbWFudGlzc2Egb2YgdGhlIG51bWJlclxuICAgKi9cbiAgZ2V0IGJpbmFyeU1hbnRpc3NhKCkge1xuICAgIHJldHVybiB0aGlzLl9iaW5hcnlNYW50aXNzYTtcbiAgfVxuXG4gIHNldCBiaW5hcnlNYW50aXNzYSh2YWx1ZTogc3RyaW5nKSB7XG4gICAgdGhpcy5fYmluYXJ5TWFudGlzc2EgPSB2YWx1ZTtcbiAgICB0aGlzLl9vdmVyZmxvdyA9IHZhbHVlLmxlbmd0aCA+IHRoaXMubWFudGlzc2FCaXRzU2l6ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIGZ1bGwgbnVtYmVyIGNvZGVkIGluIGJpbmFyeSB3aXRoIElFRUUgNzU0XG4gICAqL1xuICBnZXQgYmluYXJ5RmxvYXRpbmdOdW1iZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMuYmluYXJ5U2lnbiArIHRoaXMuYmluYXJ5RXhwb25lbnQgKyB0aGlzLmJpbmFyeU1hbnRpc3NhO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoZSBzaWduIGluIGl0J3MgZGVjaW1hbCBmb3JtXG4gICAqL1xuICBnZXQgY29tcHV0ZWRTaWduKCkge1xuICAgIHJldHVybiB0aGlzLmJpbmFyeVNpZ24gPT09IFwiMVwiID8gLTEgOiAxO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoZSBleHBvbmVudCBpbiBpdCdzIGRlY2ltYWwgZm9ybVxuICAgKi9cbiAgZ2V0IGNvbXB1dGVkRXhwb25lbnQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2JoLmJpbmFyeVRvRGVjaW1hbCh0aGlzLmJpbmFyeUV4cG9uZW50KSAtIHRoaXMuYmlhcztcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgbWFudGlzc2EgaW4gaXQncyBkZWNpbWFsIGZvcm1cbiAgICovXG4gIGdldCBjb21wdXRlZE1hbnRpc3NhKCkge1xuICAgIHJldHVybiB0aGlzLl9iaC5iaW5hcnlUb0RlY2ltYWwoXCIxXCIgKyB0aGlzLmJpbmFyeU1hbnRpc3NhKSAvIDIgKiogdGhpcy5tYW50aXNzYUJpdHNTaXplO1xuICB9XG5cbiAgZ2V0IGlzTmFOKCkge1xuICAgIGNvbnN0IGlzTmFOQmluYXJ5ID0gKFxuICAgICAgdGhpcy5iaW5hcnlFeHBvbmVudC5pbmRleE9mKFwiMFwiKSA9PT0gLTEgJiZcbiAgICAgIHRoaXMuYmluYXJ5TWFudGlzc2EuaW5kZXhPZihcIjBcIikgPT09IC0xICYmXG4gICAgICB0aGlzLmJpbmFyeVNpZ24gPT09IFwiMFwiXG4gICAgKTtcblxuICAgIHJldHVybiBOdW1iZXIuaXNOYU4odGhpcy5udW1iZXIpIHx8IGlzTmFOQmluYXJ5O1xuICB9XG5cbiAgZ2V0IGlzSW5maW5pdHkoKSB7XG4gICAgY29uc3QgaXNJbmZpbml0eUJpbmFyeSA9IChcbiAgICAgIHRoaXMuYmluYXJ5RXhwb25lbnQuaW5kZXhPZihcIjBcIikgPT09IC0xICYmXG4gICAgICB0aGlzLmJpbmFyeU1hbnRpc3NhLmluZGV4T2YoXCIxXCIpID09PSAtMSAmJlxuICAgICAgdGhpcy5iaW5hcnlTaWduID09PSBcIjBcIlxuICAgICk7XG5cbiAgICByZXR1cm4gdGhpcy5udW1iZXIgPT09IEluZmluaXR5IHx8IGlzSW5maW5pdHlCaW5hcnk7XG4gIH1cblxuICBnZXQgaXNaZXJvKCkge1xuICAgIGNvbnN0IGlzWmVyb0JpbmFyeSA9IChcbiAgICAgIHRoaXMuYmluYXJ5RXhwb25lbnQuaW5kZXhPZihcIjFcIikgPT09IC0xICYmXG4gICAgICB0aGlzLmJpbmFyeU1hbnRpc3NhLmluZGV4T2YoXCIxXCIpID09PSAtMSAmJlxuICAgICAgdGhpcy5iaW5hcnlTaWduID09PSBcIjBcIlxuICAgICk7XG5cbiAgICByZXR1cm4gdGhpcy5udW1iZXIgPT09IDAgfHwgaXNaZXJvQmluYXJ5O1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgYWJzb2x1dGUgdmFsdWUgb2YgdGhlIG51bWJlciBpbiBiaW5hcnlcbiAgICovXG4gIGdldCBiaW5hcnlBYnMoKSB7XG4gICAgcmV0dXJuIFwiMFwiICsgdGhpcy5iaW5hcnlFeHBvbmVudCArIHRoaXMuYmluYXJ5TWFudGlzc2E7XG4gIH1cblxuICAvKipcbiAgICogVGhlIG51bWJlciB0aGF0IGlzIGNvZGVkIGluIG1lbW9yeVxuICAgKi9cbiAgZ2V0IGNvbXB1dGVkTnVtYmVyKCkge1xuICAgIGlmICh0aGlzLmlzWmVybykge1xuICAgICAgcmV0dXJuIDA7XG4gICAgfSBlbHNlIGlmICh0aGlzLmlzTmFOKSB7XG4gICAgICByZXR1cm4gTmFOO1xuICAgIH0gZWxzZSBpZiAodGhpcy5pc0luZmluaXR5KSB7XG4gICAgICByZXR1cm4gSW5maW5pdHk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuY29tcHV0ZWRTaWduICogMiAqKiB0aGlzLmNvbXB1dGVkRXhwb25lbnQgKiB0aGlzLmNvbXB1dGVkTWFudGlzc2E7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBtYXJnaW4gb2YgZXJyb3JcbiAgICovXG4gIGdldCBlcnJvcigpIHsgICAgXG4gICAgaWYgKE51bWJlci5pc05hTih0aGlzLm51bWJlcikgfHwgdGhpcy5udW1iZXIgPT09IEluZmluaXR5IHx8IHRoaXMubnVtYmVyID09PSAwKSB7XG4gICAgICByZXR1cm4gMDtcbiAgICB9XG5cbiAgICByZXR1cm4gTWF0aC5hYnModGhpcy5udW1iZXIgLSB0aGlzLmNvbXB1dGVkTnVtYmVyKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gdGhlIGJpbmFyeSByZXByZXNlbnRhdGlvbiBvZiB0aGUgc2lnblxuICAgKiAwIGlmIG51bWJlciA+PSAwXG4gICAqIDEgaWYgbnVtYmVyIDwgMFxuICAgKi9cbiAgZ2V0IGJpbmFyeVNpZ24oKTogXCIwXCIgfCBcIjFcIiB7XG4gICAgcmV0dXJuIHRoaXMuX2JpbmFyeVNpZ247XG4gIH1cblxuICBzZXQgYmluYXJ5U2lnbih2YWx1ZTogXCIwXCIgfCBcIjFcIikge1xuICAgIHRoaXMuX2JpbmFyeVNpZ24gPSB2YWx1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUcnVlIGlmIHRoZSBudW1iZXIgY2Fubm90IGJlIGVuY29kZWQgaW4gPGJpdHNTaXplPiBiaXRzXG4gICAqL1xuICBnZXQgb3ZlcmZsb3coKSB7XG4gICAgcmV0dXJuIHRoaXMuX292ZXJmbG93O1xuICB9XG5cbiAgLyoqXG4gICAqIERldGVybWluZSB0aGUgYmluYXJ5IHNpZ24gb2YgdGhlIG51bWJlclxuICAgKi9cbiAgcHJpdmF0ZSBjYWxjdWxhdGVCaW5hcnlTaWduKCkge1xuICAgIHRoaXMuX2JpbmFyeVNpZ24gPSB0aGlzLm51bWJlciA8IDAgPyBcIjFcIiA6IFwiMFwiO1xuICB9XG5cbiAgLyoqXG4gICAqIENhbGN1bGF0ZSB0aGUgZXhwb25lbnQgYmlhcyBiYXNlZCBvbiB0aGUgZXhwb25lbnQgYml0IHNpemVcbiAgICogYiA9IDIgXiAoZXhwb25lbnRCaXRzU2l6ZSAtIDEpIC0gMTtcbiAgICovXG4gIHByaXZhdGUgY2FsY3VsYXRlQmlhcygpIHtcbiAgICB0aGlzLl9iaWFzID0gMiAqKiAodGhpcy5leHBvbmVudEJpdHNTaXplIC0gMSkgLSAxO1xuICB9XG5cbiAgLyoqXG4gICAqIERldGVybWluZSB0aGUgYmluYXJ5IG1hbnRpc3NhIGFuZCBkZXRlcm1pbmUgdGhlIGRvdCBwb3NpdGlvbiBpbiB0aGUgbWFudGlzc2FcbiAgICovXG4gIHByaXZhdGUgY2FsY3VsYXRlQmluYXJ5TWFudGlzc2EoKSB7XG4gICAgaWYgKE51bWJlci5pc05hTih0aGlzLm51bWJlcikpIHtcbiAgICAgIHRoaXMuX21hbnRpc3NhRG90UG9zaXRpb24gPSAwO1xuICAgICAgdGhpcy5fYmluYXJ5TWFudGlzc2EgPSBcIlwiLnBhZEVuZCh0aGlzLm1hbnRpc3NhQml0c1NpemUsIFwiMVwiKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBHZXQgdGhlIGludGVnZXIgcGFydFxuICAgIGNvbnN0IGludGVnZXJQYXJ0ID0gTWF0aC50cnVuYyh0aGlzLnBvc2l0aXZlTnVtYmVyKTtcblxuICAgIC8vIEdldCB0aGUgZGVjaW1hbHMgb2YgdGhlIG51bWJlcjogZGVjaW1hbHMgPSAxOS41OTM3NSAtIDE5ID0gMC41OTM3NVxuICAgIGxldCBkZWNpbWFsc1BhcnQgPSB0aGlzLnBvc2l0aXZlTnVtYmVyIC0gTWF0aC50cnVuYyh0aGlzLnBvc2l0aXZlTnVtYmVyKTtcblxuICAgIGNvbnN0IGJpbmFyeUludGVnZXJQYXJ0ID0gdGhpcy5fYmguZGVjaW1hbFRvQmluYXJ5KGludGVnZXJQYXJ0KTtcblxuICAgIC8vIEdldCB0aGUgbnVtYmVyIG9mIGJpdHMgZGVkaWNhdGVkIHRvIHN0b3JlIHRoZSBkZWNpbWFscyBpbiB0aGUgbWFudGlzc2FcbiAgICBjb25zdCBkZWNpbWFsc0JpdHNTaXplID0gdGhpcy5tYW50aXNzYUJpdHNTaXplIC0gYmluYXJ5SW50ZWdlclBhcnQubGVuZ3RoIC0gMTtcbiAgICBcbiAgICBsZXQgYmluYXJ5RGVjaW1hbHNQYXJ0ID0gXCJcIjtcbiAgICAvLyAwLjU5Mzc1ICogMiA9IDEuMTg3NSAgPT4gMVxuICAgIC8vIDAuMTg3NSAgKiAyID0gMC4zNzUgICA9PiAwXG4gICAgLy8gMC4zNzUgICAqIDIgPSAwLjc1ICAgID0+IDBcbiAgICAvLyAwLjc1ICAgICogMiA9IDEuNSAgICAgPT4gMVxuICAgIC8vIDAuNSAgICAgKiAyID0gMSAgICAgICA9PiAxXG4gICAgZm9yKGxldCBpID0gMDsgaSA8IGRlY2ltYWxzQml0c1NpemU7IGkrKykge1xuICAgICAgZGVjaW1hbHNQYXJ0ICo9IDI7XG5cbiAgICAgIGlmIChkZWNpbWFsc1BhcnQgPj0gMSkge1xuICAgICAgICBkZWNpbWFsc1BhcnQgLT0gMTtcbiAgICAgICAgYmluYXJ5RGVjaW1hbHNQYXJ0ICs9IFwiMVwiO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYmluYXJ5RGVjaW1hbHNQYXJ0ICs9IFwiMFwiO1xuICAgICAgfVxuICAgIH1cblxuICAgIGxldCBiaW5hcnlNYW50aXNzYSA9IGJpbmFyeUludGVnZXJQYXJ0ICsgYmluYXJ5RGVjaW1hbHNQYXJ0O1xuXG4gICAgLy8gR2V0IHRoZSBwb3NpdGlvbiBvZiB0aGUgZmlyc3QgYml0IGF0IDEsIGZvciBvbmx5IGRlY2ltYWxzIG51bWJlclxuICAgIGxldCBtYW50aXNzYURvdFBvc2l0aW9uID0gLWJpbmFyeU1hbnRpc3NhLmluZGV4T2YoXCIxXCIpO1xuXG4gICAgLy8gUmVtb3ZlIGFsbCB0aGUgbGVhZGluZyBiaXQgYXQgMCBmcm9tIHRoZSBtYW50aXNzYVxuICAgIGJpbmFyeU1hbnRpc3NhID0gdGhpcy5fYmguY2xlYW4oYmluYXJ5TWFudGlzc2EpO1xuXG4gICAgLy8gSWYgdGhlIHBvc2l0aW9uIG9mIHRoZSBmaXJzdCBiaXQgYXQgMSBpcyAwXG4gICAgLy8gdGhlbiB0aGUgZG90IHBvc2l0aW9uIGlzIGVxdWFscyB0byB0aGUgbGVuZ3RoIG9mIHRoZSBiaW5hcnkgaW50ZWdlciBwYXJ0IG9mIHRoZSBtYW50aXNzYVxuICAgIGlmIChtYW50aXNzYURvdFBvc2l0aW9uID09PSAwKSB7XG4gICAgICBtYW50aXNzYURvdFBvc2l0aW9uID0gYmluYXJ5SW50ZWdlclBhcnQubGVuZ3RoIC0gMTtcbiAgICB9XG5cbiAgICAvLyBIaWRlIHRoZSBmaXJzdCBiaXQgYXQgMVxuICAgIGJpbmFyeU1hbnRpc3NhID0gYmluYXJ5TWFudGlzc2Euc3Vic3RyaW5nKDEpO1xuXG4gICAgLy8gTWFrZSBzdXJlIHRoYXQgdGhlIG1hbnRpc3NhIG1hdGNoZXMgdGhlIGNvcnJlY3QgbGVuZ3RoICgyMyBmb3IgMzIgYml0cyBmb3IgZXhhbXBsZSlcbiAgICBiaW5hcnlNYW50aXNzYSA9IGJpbmFyeU1hbnRpc3NhLnBhZEVuZCh0aGlzLm1hbnRpc3NhQml0c1NpemUsIFwiMFwiKTtcblxuICAgIHRoaXMuYmluYXJ5TWFudGlzc2EgPSBiaW5hcnlNYW50aXNzYTtcbiAgICB0aGlzLl9tYW50aXNzYURvdFBvc2l0aW9uID0gbWFudGlzc2FEb3RQb3NpdGlvbjtcbiAgfVxuXG4gIC8qKlxuICAgKiBDYWxjdWxhdGUgdGhlIGV4cG9uZW50IGluIGJpbmFyeVxuICAgKiBlID0gYmluYXJ5KG1hbnRpc3NhRmxvYXRQb3NpdGlvbiArIGJpYXMpXG4gICAqL1xuICBwcml2YXRlIGNhbGN1bGF0ZUJpbmFyeUV4cG9uZW50KCkge1xuICAgIC8vIElmIHRoZSBudW1iZXIgaXMgTmFOIG9yIEluZmluaXR5IHRoZW4gYWxsIHRoZSBiaXRzIG9mIHRoZSBleHBvbmVudCBhcmUgZXF1YWxzIHRvIDFcbiAgICBpZiAoTnVtYmVyLmlzTmFOKHRoaXMubnVtYmVyKSB8fCB0aGlzLm51bWJlciA9PT0gSW5maW5pdHkpIHtcbiAgICAgIHRoaXMuX2JpbmFyeUV4cG9uZW50ID0gXCJcIi5wYWRFbmQodGhpcy5leHBvbmVudEJpdHNTaXplLCBcIjFcIik7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbGV0IGV4cG9uZW50ID0gdGhpcy5tYW50aXNzYURvdFBvc2l0aW9uICsgdGhpcy5iaWFzO1xuXG4gICAgLy8gSWYgdGhlIG51bWJlciBpcyAwIHRoZW4gYWxsIHRoZSBiaXRzIG9mIHRoZSBleHBvbmVudCBhcmUgZXF1YWxzIHRvIDBcbiAgICBpZiAodGhpcy5udW1iZXIgPT09IDApIHtcbiAgICAgIGV4cG9uZW50ID0gMDtcbiAgICB9XG5cbiAgICAvLyBDb252ZXJ0IHRoZSBleHBvbmVudCB0byBiaW5hcnkgYW5kIGFkZCBsZWFkaW5nIDAgdG8gbWF0Y2ggdGhlIGV4cG9uZW50IGJpdHMgc2l6ZVxuICAgIHRoaXMuX2JpbmFyeUV4cG9uZW50ID0gdGhpcy5fYmguZGVjaW1hbFRvQmluYXJ5KGV4cG9uZW50KS5wYWRTdGFydCh0aGlzLmV4cG9uZW50Qml0c1NpemUsIFwiMFwiKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGQgdHdvIGJpbmFyeSBmbG9hdCBudW1iZXJcbiAgICogQHBhcmFtIGJmMiBUaGUgYmluYXJ5IGZsb2F0IG51bWJlciB0byBhZGRcbiAgICogQHJldHVybnMgVGhlIHJlc3VsdCBvZiB0aGUgYWRkaXRpb25cbiAgICovXG4gIGFkZChiZjI6IEJpbmFyeUZsb2F0KSB7XG4gICAgY29uc3QgYmZSZXMgPSBuZXcgQmluYXJ5RmxvYXQoMSwgdGhpcy5iaXRzU2l6ZSk7XG5cbiAgICAvLyBTcGVjaWFsIGNhc2VzXG4gICAgaWYgKHRoaXMuaXNOYU4gfHwgYmYyLmlzTmFOKSB7XG4gICAgICByZXR1cm4gQmluYXJ5RmxvYXQuZ2V0TmFOKHRoaXMuYml0c1NpemUpO1xuICAgIH1cbiAgICBpZiAodGhpcy5pc0luZmluaXR5IHx8IGJmMi5pc0luZmluaXR5KSB7XG4gICAgICByZXR1cm4gQmluYXJ5RmxvYXQuZ2V0SW5maW5pdHkodGhpcy5iaXRzU2l6ZSk7XG4gICAgfVxuICAgIGlmICh0aGlzLmJpbmFyeUFicyA9PT0gYmYyLmJpbmFyeUFicyAmJiB0aGlzLmJpbmFyeVNpZ24gIT09IGJmMi5iaW5hcnlTaWduKSB7XG4gICAgICByZXR1cm4gQmluYXJ5RmxvYXQuZ2V0WmVybyh0aGlzLmJpdHNTaXplKTtcbiAgICB9XG5cbiAgICAvLyBTdGVwIDE6IERldGVybWluZSB0aGUgbG93ZXN0IGV4cG9uZW50IGJldHdlZW4gdGhpcyBhbmQgdGhlIHNlY29uZCBudW1iZXJcbiAgICBsZXQgYmZNaW5CaW5hcnlFeHBvbmVudDogQmluYXJ5RmxvYXQgPSB0aGlzO1xuICAgIGxldCBiZk1heEJpbmFyeUV4cG9uZW50OiBCaW5hcnlGbG9hdCA9IGJmMjtcbiAgICBpZiAodGhpcy5fYmguYmluYXJ5VG9EZWNpbWFsKGJmMi5iaW5hcnlFeHBvbmVudCkgPCB0aGlzLl9iaC5iaW5hcnlUb0RlY2ltYWwoYmZNaW5CaW5hcnlFeHBvbmVudC5iaW5hcnlFeHBvbmVudCkpIHtcbiAgICAgIGJmTWluQmluYXJ5RXhwb25lbnQgPSBiZjI7XG4gICAgICBiZk1heEJpbmFyeUV4cG9uZW50ID0gdGhpcztcbiAgICB9XG4gICAgLy8gQ29weSB0aGUgbnVtYmVyLCBkbyBub3Qgc2V0IGJ5IHJlZmVyZW5jZVxuICAgIGJmTWF4QmluYXJ5RXhwb25lbnQgPSBuZXcgQmluYXJ5RmxvYXQoYmZNYXhCaW5hcnlFeHBvbmVudC5jb21wdXRlZE51bWJlciwgdGhpcy5iaXRzU2l6ZSk7XG4gICAgYmZNaW5CaW5hcnlFeHBvbmVudCA9IG5ldyBCaW5hcnlGbG9hdChiZk1pbkJpbmFyeUV4cG9uZW50LmNvbXB1dGVkTnVtYmVyLCB0aGlzLmJpdHNTaXplKTtcblxuICAgIC8vIElmIHRoZXJlIGlzIGEgMCB0aGVuIHJldHVybiB0aGUgbm9uLXplcm8gbnVtYmVyXG4gICAgaWYgKGJmTWluQmluYXJ5RXhwb25lbnQuaXNaZXJvKSB7XG4gICAgICByZXR1cm4gYmZNYXhCaW5hcnlFeHBvbmVudDtcbiAgICB9XG5cbiAgICAvLyBBZGQgdGhlIGhpZGRlbiBiaXRcbiAgICBiZk1pbkJpbmFyeUV4cG9uZW50LmJpbmFyeU1hbnRpc3NhID0gXCIxXCIgKyBiZk1pbkJpbmFyeUV4cG9uZW50LmJpbmFyeU1hbnRpc3NhO1xuICAgIGJmTWF4QmluYXJ5RXhwb25lbnQuYmluYXJ5TWFudGlzc2EgPSBcIjFcIiArIGJmTWF4QmluYXJ5RXhwb25lbnQuYmluYXJ5TWFudGlzc2E7XG5cbiAgICAvLyBTdGVwIDI6IFNoaWZ0IHRoZSBtYW50aXNzYVxuICAgIGNvbnN0IHNoaWZ0VmFsdWUgPSBiZk1heEJpbmFyeUV4cG9uZW50LmNvbXB1dGVkRXhwb25lbnQgLSBiZk1pbkJpbmFyeUV4cG9uZW50LmNvbXB1dGVkRXhwb25lbnQ7XG4gICAgY29uc3Qgc2hpZnRlZE1pbk1hbnRpc3NhID0gdGhpcy5fYmguc2hpZnRSaWdodChiZk1pbkJpbmFyeUV4cG9uZW50LmJpbmFyeU1hbnRpc3NhLCBzaGlmdFZhbHVlKTtcbiAgICBiZk1pbkJpbmFyeUV4cG9uZW50LmJpbmFyeU1hbnRpc3NhID0gc2hpZnRlZE1pbk1hbnRpc3NhO1xuICAgIFxuICAgIC8vIFN0ZXAgMzogUHV0IHRoZSBzYW1lIGV4cG9uZW50XG4gICAgYmZSZXMuYmluYXJ5RXhwb25lbnQgPSBiZk1heEJpbmFyeUV4cG9uZW50LmJpbmFyeUV4cG9uZW50O1xuXG4gICAgLy8gU3RlcCA0OiAyJ3MgY29tcGxlbWVudCBpZiBuZWdhdGl2ZVxuICAgIGlmIChiZk1pbkJpbmFyeUV4cG9uZW50LmNvbXB1dGVkU2lnbiA9PT0gLTEpIHtcbiAgICAgIGJmTWluQmluYXJ5RXhwb25lbnQuYmluYXJ5TWFudGlzc2EgPSB0aGlzLl9iaC5jMihiZk1pbkJpbmFyeUV4cG9uZW50LmJpbmFyeU1hbnRpc3NhKS5yZXZlcnNlKCkuam9pbihcIlwiKTtcbiAgICB9XG4gICAgaWYgKGJmTWF4QmluYXJ5RXhwb25lbnQuY29tcHV0ZWRTaWduID09PSAtMSkge1xuICAgICAgYmZNYXhCaW5hcnlFeHBvbmVudC5iaW5hcnlNYW50aXNzYSA9IHRoaXMuX2JoLmMyKGJmTWF4QmluYXJ5RXhwb25lbnQuYmluYXJ5TWFudGlzc2EpLnJldmVyc2UoKS5qb2luKFwiXCIpO1xuXG4gICAgICBpZiAoYmZNYXhCaW5hcnlFeHBvbmVudC5jb21wdXRlZFNpZ24gIT09IGJmTWluQmluYXJ5RXhwb25lbnQuY29tcHV0ZWRTaWduKSB7XG4gICAgICAgIGJmUmVzLmJpbmFyeVNpZ24gPSBcIjFcIjtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBTdGVwIDU6IEFkZCB0aGUgbWFudGlzc2EgYW5kIHRoZSBzaGlmdGVkIG9uZVxuICAgIGJmUmVzLmJpbmFyeU1hbnRpc3NhID0gdGhpcy5fYmguYmluYXJ5QWRkaXRpb24oXG4gICAgICBiZk1heEJpbmFyeUV4cG9uZW50LmJpbmFyeU1hbnRpc3NhLFxuICAgICAgYmZNaW5CaW5hcnlFeHBvbmVudC5iaW5hcnlNYW50aXNzYSxcbiAgICApLnJldmVyc2UoKS5qb2luKFwiXCIpO1xuXG4gICAgLy8gU3RlcCA3OiBOb3JtYWxpemUgdGhlIG1hbnRpc3NhXG4gICAgLy8gSGlkZSB0aGUgZmlyc3QgYml0XG4gICAgYmZSZXMuYmluYXJ5TWFudGlzc2EgPSBiZlJlcy5iaW5hcnlNYW50aXNzYS5zdWJzdHJpbmcoMSk7XG5cbiAgICAvLyBOb3JtYWxpemUgdGhlIG1hbnRpc3NhIGlmIHRoZXJlIGlzIGEgY2FycnlcbiAgICBpZiAoYmZSZXMuYmluYXJ5TWFudGlzc2EubGVuZ3RoIC0gYmZSZXMubWFudGlzc2FCaXRzU2l6ZSA9PT0gMSkge1xuICAgICAgLy8gUm91bmQgdGhlIGxhc3QgYml0XG4gICAgICBjb25zdCBsYXN0Qml0ID0gIGJmUmVzLmJpbmFyeU1hbnRpc3NhW2JmUmVzLmJpbmFyeU1hbnRpc3NhLmxlbmd0aCAtIDFdO1xuICAgICAgY29uc3QgYmVmb3JlTGFzdEJpdCA9ICBiZlJlcy5iaW5hcnlNYW50aXNzYVtiZlJlcy5iaW5hcnlNYW50aXNzYS5sZW5ndGggLSAyXTtcbiAgICAgIGJmUmVzLmJpbmFyeU1hbnRpc3NhID0gYmZSZXMuYmluYXJ5TWFudGlzc2Euc2xpY2UoMCwgLTEpO1xuXG4gICAgICBpZiAoYmVmb3JlTGFzdEJpdCA9PT0gXCIxXCIgJiYgbGFzdEJpdCA9PT0gXCIxXCIpIHtcbiAgICAgICAgYmZSZXMuYmluYXJ5TWFudGlzc2EgPSB0aGlzLl9iaC5iaW5hcnlBZGRpdGlvbihiZlJlcy5iaW5hcnlNYW50aXNzYSwgXCIxXCIpLnJldmVyc2UoKS5qb2luKFwiXCIpO1xuICAgICAgfVxuXG4gICAgICAvLyBBZGQgMSB0byB0aGUgZXhwb25lbnRcbiAgICAgIGJmUmVzLmJpbmFyeUV4cG9uZW50ID0gdGhpcy5fYmguYWRkTnVtYmVyVG9CaW5hcnkoYmZSZXMuYmluYXJ5RXhwb25lbnQsIDEpWzBdO1xuICAgIH1cblxuICAgIHJldHVybiBiZlJlcztcbiAgfVxufVxuIiwiLyoqXG4gKiBMYWJvOiAxIChGbG9hdCB0byBiaW5hcnkgY29udmVyc2lvbilcbiAqIEF1dGhvcnM6IE93ZW4gR29tYmFzLCBEYXZpZCBEYXJtYW5nZXIsIEp1bGllbiBWYXVjaGVyLCBDbMOpbWVudCBQZXRpZ25hdFxuICogVGVhbTogMlxuICogU2Nob29sOiBIRS1BcmNcbiAqIERhdGU6IDIxIG1hcnMgMjAyMlxuICogQ291cnNlOiBNYXRow6ltYXRpcXVlcyBzcMOpY2lmaXF1ZXMgKE1vZHVsZSAyMjM0KSAtIE0uIFN0w6lwaGFuZSBHb2Jyb25cbiAqL1xuXG5pbXBvcnQgeyBCaW5hcnlGbG9hdCB9IGZyb20gXCIuL2NsYXNzZXMvQmluYXJ5RmxvYXRcIjtcblxuY29uc3QgYmZCaW5hcnlOdW1iZXJFbGVtZW50ID0gPEhUTUxJbnB1dEVsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJiZi1iaW5hcnktbnVtYmVyXCIpO1xuY29uc3QgYmZSZXN1bHRFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJiZi1yZXN1bHRcIik7XG5jb25zdCByZWdleEJpbmFyeSA9IC9eWzAxXFxzXSskLztcblxuZnVuY3Rpb24gb25DaGFuZ2VDb252ZXJ0ZXJCZigpIHtcbiAgY29uc3QgYmluYXJ5TnVtYmVyID0gYmZCaW5hcnlOdW1iZXJFbGVtZW50LnZhbHVlO1xuICBcbiAgaWYgKGJmQmluYXJ5TnVtYmVyRWxlbWVudC52YWx1ZSA9PT0gXCJcIiApIHtcbiAgICBiZlJlc3VsdEVsZW1lbnQuaW5uZXJIVE1MID0gYDxzcGFuIGNsYXNzPVwiY29sb3ItZ3JleVwiPlZldWlsbGV6IHJlbnNlaWduZXIgdG91cyBsZXMgY2hhbXBzPC9zcGFuPmA7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgaWYgKCFyZWdleEJpbmFyeS50ZXN0KGJpbmFyeU51bWJlcikpIHtcbiAgICBiZlJlc3VsdEVsZW1lbnQuaW5uZXJIVE1MID0gYDxzcGFuIGNsYXNzPVwiY29sb3ItcmVkXCI+Q2Ugbidlc3QgcGFzIHVuIG5vbWJyZSBiaW5haXJlPC9zcGFuPmA7XG4gICAgcmV0dXJuO1xuICB9XG4gIFxuICBjb25zdCBiZiA9IG5ldyBCaW5hcnlGbG9hdChiaW5hcnlOdW1iZXIpO1xuXG4gIGJmUmVzdWx0RWxlbWVudC5pbm5lckhUTUwgPSBgXG4gICAgPGRpdiBjbGFzcz1cInJlc3VsdC1ncm91cFwiPlxuICAgICAgVGFpbGxlIGVuIGJpdHMgdG90YWw6ICR7YmYuYml0c1NpemV9XG4gICAgPC9kaXY+XG5cbiAgICA8ZGl2IGNsYXNzPVwicmVzdWx0LWdyb3VwXCI+XG4gICAgICBUYWlsbGUgZW4gYml0cyBkZSBsJ2V4cG9zYW50OiAke2JmLmV4cG9uZW50Qml0c1NpemV9XG4gICAgPC9kaXY+XG4gICAgXG4gICAgPGRpdiBjbGFzcz1cInJlc3VsdC1ncm91cFwiPlxuICAgICAgVGFpbGxlIGVuIGJpdHMgZGUgbGEgbWFudGlzc2U6ICR7YmYubWFudGlzc2FCaXRzU2l6ZX1cbiAgICA8L2Rpdj5cblxuICAgIDxkaXYgY2xhc3M9XCJyZXN1bHQtZ3JvdXBcIj5cbiAgICAgIEJpYWlzOiAke2JmLmJpYXN9XG4gICAgPC9kaXY+XG4gICAgXG4gICAgPGRpdiBjbGFzcz1cInJlc3VsdC1ncm91cFwiPlxuICAgICAgU2lnbmU6XG4gICAgICA8c3BhbiBjbGFzcz1cImNvbG9yLXJlZCBtb25vXCI+JHtiZi5iaW5hcnlTaWdufTwvc3Bhbj5cbiAgICAgIDxzcGFuIGNsYXNzPVwibW9ub1wiPigke2JmLmNvbXB1dGVkU2lnbiA+IDAgPyBcIitcIiA6IFwiLVwifSk8L3NwYW4+XG4gICAgPC9kaXY+XG4gICAgXG4gICAgPGRpdiBjbGFzcz1cInJlc3VsdC1ncm91cFwiPlxuICAgICAgTWFudGlzc2U6XG4gICAgICA8c3BhbiBjbGFzcz1cImNvbG9yLW9yYW5nZSBtb25vXCI+XG4gICAgICAgICR7YmYuYmluYXJ5TWFudGlzc2F9XG4gICAgICA8L3NwYW4+XG4gICAgICA8c3BhbiBjbGFzcz1cIm1vbm9cIj4oJHtiZi5jb21wdXRlZE1hbnRpc3NhfSk8L3NwYW4+XG4gICAgPC9kaXY+XG5cbiAgICA8ZGl2IGNsYXNzPVwicmVzdWx0LWdyb3VwXCI+XG4gICAgICBFeHBvc2FudDogPHNwYW4gY2xhc3M9XCJjb2xvci1ibHVlIG1vbm9cIj4ke2JmLmJpbmFyeUV4cG9uZW50fTwvc3Bhbj5cbiAgICAgIDxzcGFuIGNsYXNzPVwibW9ub1wiPigyPHN1cD4ke2JmLmNvbXB1dGVkRXhwb25lbnR9PC9zdXA+KTwvc3Bhbj5cbiAgICA8L2Rpdj5cbiAgICBcbiAgICA8ZGl2IGNsYXNzPVwicmVzdWx0LWdyb3VwXCI+XG4gICAgICBSw6lzdWx0YXQgZW4gYmluYWlyZTpcbiAgICAgIDxzcGFuIGNsYXNzPVwiY29sb3ItcmVkIG1vbm9cIj4ke2JmLmJpbmFyeVNpZ259PC9zcGFuPlxuICAgICAgPHNwYW4gY2xhc3M9XCJjb2xvci1ibHVlIG1vbm9cIj4ke2JmLmJpbmFyeUV4cG9uZW50fTwvc3Bhbj5cbiAgICAgIDxzcGFuIGNsYXNzPVwiY29sb3Itb3JhbmdlIG1vbm9cIj4ke2JmLmJpbmFyeU1hbnRpc3NhfTwvc3Bhbj5cbiAgICA8L2Rpdj5cbiAgICBcbiAgICA8ZGl2IGNsYXNzPVwicmVzdWx0LWdyb3VwXCI+XG4gICAgICBSw6lzdWx0YXQ6ICR7YmYuY29tcHV0ZWROdW1iZXJ9XG4gICAgPC9kaXY+XG4gIGA7XG59XG5cbmJmQmluYXJ5TnVtYmVyRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsIG9uQ2hhbmdlQ29udmVydGVyQmYpO1xuYmZCaW5hcnlOdW1iZXJFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXl1cFwiLCBvbkNoYW5nZUNvbnZlcnRlckJmKTtcblxub25DaGFuZ2VDb252ZXJ0ZXJCZigpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9
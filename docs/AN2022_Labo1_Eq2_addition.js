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
/**
 * Performs basic operations on binary numbers
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
    /**
     * Get the infinity binary representation
     * @param bitsSize The bit size of the number
     * @returns The infinity binary representation
     */
    BinaryFloat.getInfinity = function (bitsSize) {
        return new BinaryFloat(Infinity, bitsSize);
    };
    /**
     * Get the NaN binary representation
     * @param bitsSize The bit size of the number
     * @returns The NaN binary representation
     */
    BinaryFloat.getNaN = function (bitsSize) {
        return new BinaryFloat(NaN, bitsSize);
    };
    /**
     * Get the zero binary representation
     * @param bitsSize The bit size of the number
     * @returns The zero binary representation
     */
    BinaryFloat.getZero = function (bitsSize) {
        return new BinaryFloat(0, bitsSize);
    };
    Object.defineProperty(BinaryFloat.prototype, "number", {
        /**
         * The float number to encode with IEEE 754
         */
        get: function () {
            return this._number;
        },
        set: function (value) {
            this._number = value;
            this.calculate();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BinaryFloat.prototype, "bitsSize", {
        /**
         * The bits size to code the number
         */
        get: function () {
            return this._bitsSize;
        },
        set: function (value) {
            this._bitsSize = value;
            if (value < BinaryFloat._minBitSize) {
                this._bitsSize = BinaryFloat._minBitSize;
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BinaryFloat.prototype, "mantissaBitsSize", {
        /**
         * The mantissa bits size
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
        /**
         * The absolute value of the original number
         */
        get: function () {
            return Math.abs(this.number);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BinaryFloat.prototype, "mantissaDotPosition", {
        /**
         * Calculate the position of the dot in the mantissa
         *                      float position
         *                            |
         *                            v
         * mantissa(19.59375) => "0011.1001100000000000000"
         */
        get: function () {
            return this._mantissaDotPosition;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BinaryFloat.prototype, "bias", {
        /**
         * Return the bias of the number based on the exponent bits size
         * b = 2 ^ (exponentBitsSize - 1) - 1
         */
        get: function () {
            return this._bias;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BinaryFloat.prototype, "binarySign", {
        /**
         * The binary representation of the sign
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
    Object.defineProperty(BinaryFloat.prototype, "binaryExponent", {
        /**
         * The exponent of the number in binary with the bias
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
    Object.defineProperty(BinaryFloat.prototype, "binaryMantissa", {
        /**
         * The full mantissa of the number
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
         * The full number coded in binary with IEEE 754
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
        /**
         * Determine if the number is NaN
         * @returns True if the number is NaN
         */
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
        /**
         * Determine if the number is represents the infinity
         * @returns True if the number is Infinity
         */
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
        /**
         * Determine if the number is zero
         * @returns True if the number is zero
         */
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
    Object.defineProperty(BinaryFloat.prototype, "marginOfError", {
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
     * Calculate:
     * - Binary sign
     * - The bias
     * - The binary mantissa
     * - The binary exponent
     */
    BinaryFloat.prototype.calculate = function () {
        this.calculateBinarySign();
        this.calculateBias();
        this.calculateBinaryMantissa();
        this.calculateBinaryExponent();
    };
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
    /**
     * Find the minimum bits size to match the number almost "perfectly"
     * @param maxBitSize Default 256, the bits size limit
     */
    BinaryFloat.prototype.findAccurateBitsSize = function (maxBitSize) {
        if (maxBitSize === void 0) { maxBitSize = 256; }
        this.bitsSize = BinaryFloat._minBitSize;
        while (this.bitsSize < maxBitSize && this.marginOfError !== 0) {
            this.bitsSize++;
            this.calculate();
        }
    };
    BinaryFloat._minBitSize = 8;
    return BinaryFloat;
}());


;// CONCATENATED MODULE: ./src/AN2022_Labo1_Eq2_addition.ts
/**
 * Labo: 1 (Float to binary conversion)
 * Authors: Owen Gombas, David Darmanger, Julien Vaucher, Clément Petignat
 * Team: 2
 * School: HE-Arc
 * Date: 21 mars 2022
 * Course: Mathématiques spécifiques (Module 2234) - M. Stéphane Gobron
 */

var addBitSizeElement = document.getElementById("add-bits-size");
var addInputAElement = document.getElementById("add-input-a");
var addInputBElement = document.getElementById("add-input-b");
var addResultElement = document.getElementById("add-result");
var minLength = 8;
var maxLength = 256;
function onChangeAddition() {
    var bitsSize = Number(addBitSizeElement.value);
    var inputA = Number(addInputAElement.value);
    var inputB = Number(addInputBElement.value);
    if (bitsSize < minLength) {
        addResultElement.innerHTML = "<span class=\"color-red\">La taille des bits doit au minimum \u00EAtre ".concat(minLength, "</span>");
        return;
    }
    if (bitsSize > maxLength) {
        addResultElement.innerHTML = "<span class=\"color-red\">La taille des bits doit au maximum \u00EAtre ".concat(maxLength, "</span>");
        return;
    }
    if (addBitSizeElement.value === "" || addInputAElement.value === "" || addInputBElement.value === "") {
        addResultElement.innerHTML = "<span class=\"color-grey\">Veuillez renseigner tous les champs</span>";
        return;
    }
    if (inputA < 0 || inputB < 0) {
        addResultElement.innerHTML = "<span class=\"color-red\">Nous ne supportons que les additions pour le moment</span>";
        return;
    }
    var bfA = new BinaryFloat(inputA, bitsSize);
    var bfB = new BinaryFloat(inputB, bitsSize);
    var bfRes = bfA.add(bfB);
    var getOverFlowError = function (nb) { return "<span class=\"color-red\">".concat(nb, " est trop grand pour \u00EAtre encod\u00E9 en ").concat(bitsSize, " bits</span>"); };
    if (bfA.overflow) {
        addResultElement.innerHTML = getOverFlowError(bfA.number);
        return;
    }
    if (bfB.overflow) {
        addResultElement.innerHTML = getOverFlowError(bfB.number);
        return;
    }
    if (bfRes.overflow) {
        addResultElement.innerHTML = getOverFlowError("Le résultat");
        return;
    }
    addResultElement.innerHTML = "\n    <div class=\"result-group color-grey\">\n      R\u00E9sultat \"exact\":\n      <span class=\"mono\">".concat(inputA + inputB, "</span>\n    </div>\n\n    <div class=\"result-group mt25\">\n      Nombre <span class=\"mono\">1</span> en binaire:\n      <span class=\"color-red mono\">").concat(bfA.binarySign, "</span>\n      <span class=\"color-blue mono\">").concat(bfA.binaryExponent, "</span>\n      <span class=\"color-orange mono\">").concat(bfA.binaryMantissa, "</span>\n      (<span class=\"mono\">").concat(bfA.computedNumber, "</span>)\n    </div>\n\n    <div class=\"result-group\">\n      Nombre <span class=\"mono\">2</span> en binaire:\n      <span class=\"color-red mono\">").concat(bfB.binarySign, "</span>\n      <span class=\"color-blue mono\">").concat(bfB.binaryExponent, "</span>\n      <span class=\"color-orange mono\">").concat(bfB.binaryMantissa, "</span>\n      (<span class=\"mono\">").concat(bfB.computedNumber, "</span>)\n    </div>\n\n    <div class=\"result-group mt25\">\n      R\u00E9sultat en binaire:\n      <span class=\"color-red mono\">").concat(bfRes.binarySign, "</span>\n      <span class=\"color-blue mono\">").concat(bfRes.binaryExponent, "</span>\n      <span class=\"color-orange mono\">").concat(bfRes.binaryMantissa, "</span>\n    </div>\n\n    <div class=\"result-group\">\n      R\u00E9sultat calcul\u00E9:\n      <span class=\"mono\">").concat(bfRes.computedNumber, "</span>\n    </div>\n\n    <div class=\"result-group\">\n      Marge d'erreur:\n      <span class=\"mono\">").concat(Math.abs(inputA + inputB - bfRes.computedNumber), "</span>\n    </div>\n  ");
}
addBitSizeElement.addEventListener("change", onChangeAddition);
addBitSizeElement.addEventListener("keyup", onChangeAddition);
addInputAElement.addEventListener("change", onChangeAddition);
addInputAElement.addEventListener("keyup", onChangeAddition);
addInputBElement.addEventListener("change", onChangeAddition);
addInputBElement.addEventListener("keyup", onChangeAddition);
onChangeAddition();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQU4yMDIyX0xhYm8xX0VxMl9hZGRpdGlvbi5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUFBOzs7Ozs7O0dBT0c7QUFFSDs7R0FFRztBQUNIO0lBQUE7SUFrU0EsQ0FBQztJQWpTQzs7Ozs7T0FLRztJQUNJLDhCQUFPLEdBQWQsVUFBZSxLQUFZLEVBQUUsQ0FBUztRQUNwQyxJQUFJLEdBQUcsR0FBRyxFQUFFLENBQUM7UUFFYixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQzFCLEdBQUcsSUFBSSxLQUFLLENBQUM7U0FDZDtRQUVELE9BQU8sR0FBRyxDQUFDO0lBQ2IsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0ksaUNBQVUsR0FBakIsVUFBa0IsQ0FBUyxFQUFFLENBQU07UUFBTiwwQkFBTTtRQUNqQyxJQUFNLElBQUksR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQztRQUUxQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQzdCLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1NBQ2I7UUFFRCxPQUFPLENBQUMsQ0FBQztJQUNYLENBQUM7SUFFRDs7OztPQUlHO0lBQ0ksNEJBQUssR0FBWixVQUFhLENBQVM7UUFDcEIsSUFBSSxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBRVosS0FBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDaEMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxFQUFFO2dCQUNoQixHQUFHLEdBQUcsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUN4QjtpQkFBTTtnQkFDTCxPQUFPLEdBQUcsQ0FBQzthQUNaO1NBQ0Y7UUFFRCxJQUFJLEdBQUcsS0FBSyxFQUFFLEVBQUU7WUFDZCxPQUFPLEdBQUcsQ0FBQztTQUNaO0lBQ0gsQ0FBQztJQUdEOzs7Ozs7T0FNRztJQUNJLG9DQUFhLEdBQXBCLFVBQXFCLEVBQVUsRUFBRSxFQUFVO1FBQ3pDLElBQUksRUFBRSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUMsTUFBTSxFQUFFO1lBQ3pCLEVBQUUsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLENBQUM7U0FDckM7YUFBTSxJQUFJLEVBQUUsQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDLE1BQU0sRUFBRTtZQUNoQyxFQUFFLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1NBQ3JDO1FBRUQsT0FBTyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUNsQixDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSSxtQ0FBWSxHQUFuQixVQUFvQixFQUFVLEVBQUUsRUFBVTtRQUN4QyxJQUFJLEVBQUUsQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDLE1BQU0sRUFBRTtZQUN6QixPQUFPLEVBQUUsQ0FBQyxNQUFNLENBQUM7U0FDbEI7UUFDRCxPQUFPLEVBQUUsQ0FBQyxNQUFNLENBQUM7SUFDbkIsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSxzQ0FBZSxHQUF0QixVQUF1QixPQUFlO1FBQ3BDLElBQU0sY0FBYyxHQUFHLE9BQU8sQ0FBQztRQUMvQixJQUFJLFlBQVksR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRXpELElBQUksY0FBYyxHQUFHLENBQUMsRUFBRTtZQUN0QixZQUFZLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxZQUFZLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7U0FDekQ7UUFFRCxPQUFPLFlBQVksQ0FBQztJQUN0QixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNJLHNDQUFlLEdBQXRCLFVBQXVCLE1BQWM7UUFDbkMsT0FBTyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQzdCLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNJLHdDQUFpQixHQUF4QixVQUF5QixDQUFTLEVBQUUsQ0FBUztRQUMzQyxPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN6RCxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNJLDZCQUFNLEdBQWIsVUFBYyxDQUFTO1FBQ3JCLElBQU0sYUFBYSxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUM7UUFDL0IsQ0FBQyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDcEcsQ0FBQyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3RDLE9BQU8sQ0FBQyxDQUFDO0lBQ1gsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0ksaUNBQVUsR0FBakIsVUFBa0IsQ0FBUyxFQUFFLFVBQWtCO1FBQzdDLGtDQUFrQztRQUNsQyxxQ0FBcUM7UUFDckMsMENBQTBDO1FBRTFDLElBQUksVUFBVSxHQUFHLENBQUMsRUFBRTtZQUNsQixPQUFPLENBQUMsQ0FBQztTQUNWO1FBRUQsSUFBSSxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQ1osR0FBRyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDaEMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxRQUFRLENBQUMsVUFBVSxFQUFFLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQztRQUV6QyxPQUFPLEdBQUcsQ0FBQztJQUNiLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNJLGdDQUFTLEdBQWhCLFVBQWlCLENBQVMsRUFBRSxVQUFrQjtRQUM1QyxvQ0FBb0M7UUFDcEMscUNBQXFDO1FBQ3JDLDBDQUEwQztRQUUxQyxJQUFJLFVBQVUsR0FBRyxDQUFDLEVBQUU7WUFDbEIsT0FBTyxDQUFDLENBQUM7U0FDVjtRQUVELElBQUksR0FBRyxHQUFHLENBQUMsQ0FBQztRQUNaLEdBQUcsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQzVCLEdBQUcsSUFBSSxFQUFFLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUVsQyxPQUFPLEdBQUcsQ0FBQztJQUNiLENBQUM7SUFFRDs7Ozs7O09BTUc7SUFDSSx5Q0FBa0IsR0FBekIsVUFBMEIsQ0FBUyxFQUFFLENBQVMsRUFBRSxLQUFVO1FBQVYsa0NBQVU7UUFDeEQsSUFBTSxHQUFHLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFbEQsUUFBUSxHQUFHLEVBQUU7WUFDWCxzQkFBc0I7WUFDdEIsS0FBSyxDQUFDO2dCQUNKLE9BQU8sQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDcEIsS0FBSyxDQUFDO2dCQUNKLE9BQU8sQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDcEIsS0FBSyxDQUFDO2dCQUNKLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDbkIsc0JBQXNCO1lBQ3RCLEtBQUssQ0FBQztnQkFDSixPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1NBQ3BCO0lBQ0gsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0kscUNBQWMsR0FBckIsVUFBc0IsRUFBVSxFQUFFLEVBQVU7UUFDMUMsSUFBSSxHQUFHLEdBQUcsRUFBRSxDQUFDO1FBQ2IsSUFBSSxLQUFLLEdBQUcsRUFBRSxDQUFDO1FBQ1QsU0FBYSxJQUFJLENBQUMsYUFBYSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBdEMsR0FBRyxVQUFFLEdBQUcsUUFBOEIsQ0FBQztRQUU5QyxLQUFLLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDbEMsU0FBUyxJQUFJLENBQUMsa0JBQWtCLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsRUFBdEQsQ0FBQyxVQUFFLENBQUMsUUFBa0QsQ0FBQztZQUM5RCxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQztZQUNkLEtBQUssR0FBRyxDQUFDLENBQUM7U0FDWDtRQUVELE9BQU8sQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDdEIsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0kseUNBQWtCLEdBQXpCLFVBQTBCLEVBQVUsRUFBRSxFQUFVO1FBQ3hDLFNBQWEsSUFBSSxDQUFDLGFBQWEsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQXRDLEdBQUcsVUFBRSxHQUFHLFFBQThCLENBQUM7UUFDOUMsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ25FLENBQUM7SUFFRDs7OztPQUlHO0lBQ0kseUJBQUUsR0FBVCxVQUFVLENBQVM7UUFDakIsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbkIsT0FBTyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ3RDLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNJLDJDQUFvQixHQUEzQixVQUE0QixFQUFVLEVBQUUsRUFBVTtRQUNoRCxJQUFJLEdBQUcsR0FBRyxFQUFFLENBQUM7UUFDYixJQUFNLFVBQVUsR0FBRyxFQUFFLENBQUM7UUFFdEIsaUNBQWlDO1FBQ2pDLGFBQWE7UUFDYixhQUFhO1FBQ1AsU0FBYSxJQUFJLENBQUMsYUFBYSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBdEMsR0FBRyxVQUFFLEdBQUcsUUFBOEIsQ0FBQztRQUU5Qyx5QkFBeUI7UUFDekIsaUJBQWlCO1FBQ2pCLGdCQUFnQjtRQUNoQixnQkFBZ0I7UUFDaEIsZ0JBQWdCO1FBQ2hCLGVBQWU7UUFDZixJQUFJO1FBQ0osS0FBSyxJQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ3hDLElBQUksVUFBVSxHQUFHLEVBQUUsQ0FBQztZQUVwQixLQUFLLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQ3hDLFVBQVUsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxVQUFVLENBQUM7YUFDN0Q7WUFFRCxJQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDckUsVUFBVSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDdkMsVUFBVSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztTQUM3QjtRQUVELGlCQUFpQjtRQUNqQixRQUFRO1FBQ1IsZUFBZTtRQUNmLGVBQWU7UUFDZixlQUFlO1FBQ2YsY0FBYztRQUNkLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxVQUFVLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQzFDLElBQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFFLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3JGLFNBQVMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLEVBQUUsU0FBUyxDQUFDLEVBQTNDLENBQUMsVUFBRSxDQUFDLFFBQXVDLENBQUM7WUFDbkQsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDYjtRQUVELGlCQUFpQjtRQUNqQixPQUFPLEdBQUcsQ0FBQztJQUNiLENBQUM7SUFDSCxtQkFBQztBQUFELENBQUM7Ozs7QUM5U0Q7Ozs7Ozs7R0FPRztBQUUyQztBQUU5Qzs7R0FFRztBQUNIO0lBZUUscUJBQVksY0FBK0IsRUFBRSxRQUFpQjtRQWR0RCxjQUFTLEdBQUcsRUFBRSxDQUFDO1FBQ2YsWUFBTyxHQUFHLENBQUMsQ0FBQztRQUNaLGdCQUFXLEdBQWMsR0FBRyxDQUFDO1FBQzdCLG9CQUFlLEdBQUcsRUFBRSxDQUFDO1FBQ3JCLGNBQVMsR0FBRyxLQUFLLENBQUM7UUFDbEIseUJBQW9CLEdBQUcsQ0FBQyxDQUFDO1FBQ3pCLG9CQUFlLEdBQUcsRUFBRSxDQUFDO1FBQ3JCLFVBQUssR0FBRyxDQUFDLENBQUM7UUFDVixRQUFHLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQU8vQixJQUFJLE9BQU8sY0FBYyxLQUFLLFFBQVEsRUFBRTtZQUN0QyxrQ0FBa0M7WUFDbEMsY0FBYyxHQUFHLGNBQWMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUN2QyxjQUFjLEdBQUcsY0FBYyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDbkQsSUFBSSxDQUFDLFFBQVEsR0FBRyxjQUFjLENBQUMsTUFBTSxDQUFDO1lBQ3RDLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1lBRWhCLDZHQUE2RztZQUM3RyxJQUFJLENBQUMsVUFBVSxHQUFHLGNBQWMsQ0FBQyxDQUFDLENBQWMsQ0FBQztZQUNqRCxJQUFJLENBQUMsY0FBYyxHQUFHLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUN6RSxJQUFJLENBQUMsY0FBYyxHQUFHLGNBQWMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGdCQUFnQixHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDdEY7YUFBTTtZQUNMLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1lBQ3pCLElBQUksQ0FBQyxNQUFNLEdBQUcsY0FBYyxDQUFDO1NBQzlCO0lBQ0gsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSx1QkFBVyxHQUFsQixVQUFtQixRQUFnQjtRQUNqQyxPQUFPLElBQUksV0FBVyxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsQ0FBQztJQUM3QyxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNJLGtCQUFNLEdBQWIsVUFBYyxRQUFnQjtRQUM1QixPQUFPLElBQUksV0FBVyxDQUFDLEdBQUcsRUFBRSxRQUFRLENBQUMsQ0FBQztJQUN4QyxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNJLG1CQUFPLEdBQWQsVUFBZSxRQUFnQjtRQUM3QixPQUFPLElBQUksV0FBVyxDQUFDLENBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQztJQUN0QyxDQUFDO0lBS0Qsc0JBQUksK0JBQU07UUFIVjs7V0FFRzthQUNIO1lBQ0UsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQ3RCLENBQUM7YUFFRCxVQUFXLEtBQWE7WUFDdEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7WUFFckIsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ25CLENBQUM7OztPQU5BO0lBV0Qsc0JBQUksaUNBQVE7UUFIWjs7V0FFRzthQUNIO1lBQ0UsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQ3hCLENBQUM7YUFFRCxVQUFhLEtBQWE7WUFDeEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7WUFFdkIsSUFBSSxLQUFLLEdBQUcsV0FBVyxDQUFDLFdBQVcsRUFBRTtnQkFDbkMsSUFBSSxDQUFDLFNBQVMsR0FBRyxXQUFXLENBQUMsV0FBVyxDQUFDO2FBQzFDO1FBQ0gsQ0FBQzs7O09BUkE7SUFhRCxzQkFBSSx5Q0FBZ0I7UUFIcEI7O1dBRUc7YUFDSDtZQUNFLElBQUksSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLEVBQUU7Z0JBQ3JCLE9BQU8sQ0FBQyxDQUFDO2FBQ1Y7WUFFRCxPQUFPLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixHQUFHLENBQUMsQ0FBQztRQUNuRCxDQUFDOzs7T0FBQTtJQVVELHNCQUFJLHlDQUFnQjtRQVJwQjs7Ozs7OztXQU9HO2FBQ0g7WUFDRSxJQUFJLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxFQUFFO2dCQUNyQixPQUFPLENBQUMsQ0FBQzthQUNWO1lBRUQsK0JBQStCO1lBQy9CLElBQUksSUFBSSxDQUFDLFFBQVEsSUFBSSxHQUFHLEVBQUU7Z0JBQ3hCLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7YUFDdEQ7WUFFRCw4Q0FBOEM7WUFDOUMsNENBQTRDO1lBQzVDLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFDLENBQUM7UUFDL0QsQ0FBQzs7O09BQUE7SUFLRCxzQkFBSSx1Q0FBYztRQUhsQjs7V0FFRzthQUNIO1lBQ0UsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMvQixDQUFDOzs7T0FBQTtJQVNELHNCQUFJLDRDQUFtQjtRQVB2Qjs7Ozs7O1dBTUc7YUFDSDtZQUNFLE9BQU8sSUFBSSxDQUFDLG9CQUFvQixDQUFDO1FBQ25DLENBQUM7OztPQUFBO0lBTUQsc0JBQUksNkJBQUk7UUFKUjs7O1dBR0c7YUFDSDtZQUNFLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQztRQUNwQixDQUFDOzs7T0FBQTtJQU9ELHNCQUFJLG1DQUFVO1FBTGQ7Ozs7V0FJRzthQUNIO1lBQ0UsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDO1FBQzFCLENBQUM7YUFFRCxVQUFlLEtBQWdCO1lBQzdCLElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO1FBQzNCLENBQUM7OztPQUpBO0lBVUEsc0JBQUksdUNBQWM7UUFKbkI7OztXQUdHO2FBQ0Y7WUFDQyxPQUFPLElBQUksQ0FBQyxlQUFlLENBQUM7UUFDOUIsQ0FBQzthQUVELFVBQW1CLEtBQWE7WUFDOUIsSUFBSSxDQUFDLGVBQWUsR0FBRyxLQUFLLENBQUM7UUFDL0IsQ0FBQzs7O09BSkE7SUFTRCxzQkFBSSx1Q0FBYztRQUhsQjs7V0FFRzthQUNIO1lBQ0UsT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDO1FBQzlCLENBQUM7YUFFRCxVQUFtQixLQUFhO1lBQzlCLElBQUksQ0FBQyxlQUFlLEdBQUcsS0FBSyxDQUFDO1lBQzdCLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUM7UUFDeEQsQ0FBQzs7O09BTEE7SUFVRCxzQkFBSSw2Q0FBb0I7UUFIeEI7O1dBRUc7YUFDSDtZQUNFLE9BQU8sSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUM7UUFDckUsQ0FBQzs7O09BQUE7SUFLRCxzQkFBSSxxQ0FBWTtRQUhoQjs7V0FFRzthQUNIO1lBQ0UsT0FBTyxJQUFJLENBQUMsVUFBVSxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMxQyxDQUFDOzs7T0FBQTtJQUtELHNCQUFJLHlDQUFnQjtRQUhwQjs7V0FFRzthQUNIO1lBQ0UsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztRQUNuRSxDQUFDOzs7T0FBQTtJQUtELHNCQUFJLHlDQUFnQjtRQUhwQjs7V0FFRzthQUNIO1lBQ0UsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLFVBQUMsRUFBSSxJQUFJLENBQUMsZ0JBQWdCLEVBQUM7UUFDMUYsQ0FBQzs7O09BQUE7SUFNRCxzQkFBSSw4QkFBSztRQUpUOzs7V0FHRzthQUNIO1lBQ0UsSUFBTSxXQUFXLEdBQUcsQ0FDbEIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUN2QyxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ3ZDLElBQUksQ0FBQyxVQUFVLEtBQUssR0FBRyxDQUN4QixDQUFDO1lBRUYsT0FBTyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxXQUFXLENBQUM7UUFDbEQsQ0FBQzs7O09BQUE7SUFNRCxzQkFBSSxtQ0FBVTtRQUpkOzs7V0FHRzthQUNIO1lBQ0UsSUFBTSxnQkFBZ0IsR0FBRyxDQUN2QixJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ3ZDLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDdkMsSUFBSSxDQUFDLFVBQVUsS0FBSyxHQUFHLENBQ3hCLENBQUM7WUFFRixPQUFPLElBQUksQ0FBQyxNQUFNLEtBQUssUUFBUSxJQUFJLGdCQUFnQixDQUFDO1FBQ3RELENBQUM7OztPQUFBO0lBTUQsc0JBQUksK0JBQU07UUFKVjs7O1dBR0c7YUFDSDtZQUNFLElBQU0sWUFBWSxHQUFHLENBQ25CLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDdkMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUN2QyxJQUFJLENBQUMsVUFBVSxLQUFLLEdBQUcsQ0FDeEIsQ0FBQztZQUVGLE9BQU8sSUFBSSxDQUFDLE1BQU0sS0FBSyxDQUFDLElBQUksWUFBWSxDQUFDO1FBQzNDLENBQUM7OztPQUFBO0lBS0Qsc0JBQUksa0NBQVM7UUFIYjs7V0FFRzthQUNIO1lBQ0UsT0FBTyxHQUFHLEdBQUcsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDO1FBQ3pELENBQUM7OztPQUFBO0lBS0Qsc0JBQUksdUNBQWM7UUFIbEI7O1dBRUc7YUFDSDtZQUNFLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtnQkFDZixPQUFPLENBQUMsQ0FBQzthQUNWO2lCQUFNLElBQUksSUFBSSxDQUFDLEtBQUssRUFBRTtnQkFDckIsT0FBTyxHQUFHLENBQUM7YUFDWjtpQkFBTSxJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUU7Z0JBQzFCLE9BQU8sUUFBUSxDQUFDO2FBQ2pCO1lBRUQsT0FBTyxJQUFJLENBQUMsWUFBWSxHQUFHLFVBQUMsRUFBSSxJQUFJLENBQUMsZ0JBQWdCLElBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDO1FBQ2hGLENBQUM7OztPQUFBO0lBS0Qsc0JBQUksc0NBQWE7UUFIakI7O1dBRUc7YUFDSDtZQUNFLElBQUksTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksSUFBSSxDQUFDLE1BQU0sS0FBSyxRQUFRLElBQUksSUFBSSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7Z0JBQzlFLE9BQU8sQ0FBQyxDQUFDO2FBQ1Y7WUFFRCxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDckQsQ0FBQzs7O09BQUE7SUFLRCxzQkFBSSxpQ0FBUTtRQUhaOztXQUVHO2FBQ0g7WUFDRSxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDeEIsQ0FBQzs7O09BQUE7SUFFRDs7Ozs7O09BTUc7SUFDSCwrQkFBUyxHQUFUO1FBQ0UsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUM7UUFDM0IsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQ3JCLElBQUksQ0FBQyx1QkFBdUIsRUFBRSxDQUFDO1FBQy9CLElBQUksQ0FBQyx1QkFBdUIsRUFBRSxDQUFDO0lBQ2pDLENBQUM7SUFFRDs7T0FFRztJQUNILHlDQUFtQixHQUFuQjtRQUNFLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDO0lBQ2pELENBQUM7SUFFRDs7O09BR0c7SUFDSCxtQ0FBYSxHQUFiO1FBQ0UsSUFBSSxDQUFDLEtBQUssR0FBRyxVQUFDLEVBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsQ0FBQyxDQUFDLElBQUcsQ0FBQyxDQUFDO0lBQ3BELENBQUM7SUFFRDs7T0FFRztJQUNILDZDQUF1QixHQUF2QjtRQUNFLElBQUksTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUU7WUFDN0IsSUFBSSxDQUFDLG9CQUFvQixHQUFHLENBQUMsQ0FBQztZQUM5QixJQUFJLENBQUMsZUFBZSxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQzdELE9BQU87U0FDUjtRQUVELHVCQUF1QjtRQUN2QixJQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUVwRCxxRUFBcUU7UUFDckUsSUFBSSxZQUFZLEdBQUcsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUV6RSxJQUFNLGlCQUFpQixHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBRWhFLHlFQUF5RTtRQUN6RSxJQUFNLGdCQUFnQixHQUFHLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxpQkFBaUIsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1FBRTlFLElBQUksa0JBQWtCLEdBQUcsRUFBRSxDQUFDO1FBQzVCLDZCQUE2QjtRQUM3Qiw2QkFBNkI7UUFDN0IsNkJBQTZCO1FBQzdCLDZCQUE2QjtRQUM3Qiw2QkFBNkI7UUFDN0IsS0FBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLGdCQUFnQixFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ3hDLFlBQVksSUFBSSxDQUFDLENBQUM7WUFFbEIsSUFBSSxZQUFZLElBQUksQ0FBQyxFQUFFO2dCQUNyQixZQUFZLElBQUksQ0FBQyxDQUFDO2dCQUNsQixrQkFBa0IsSUFBSSxHQUFHLENBQUM7YUFDM0I7aUJBQU07Z0JBQ0wsa0JBQWtCLElBQUksR0FBRyxDQUFDO2FBQzNCO1NBQ0Y7UUFFRCxJQUFJLGNBQWMsR0FBRyxpQkFBaUIsR0FBRyxrQkFBa0IsQ0FBQztRQUU1RCxtRUFBbUU7UUFDbkUsSUFBSSxtQkFBbUIsR0FBRyxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFdkQsb0RBQW9EO1FBQ3BELGNBQWMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUVoRCw2Q0FBNkM7UUFDN0MsMkZBQTJGO1FBQzNGLElBQUksbUJBQW1CLEtBQUssQ0FBQyxFQUFFO1lBQzdCLG1CQUFtQixHQUFHLGlCQUFpQixDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7U0FDcEQ7UUFFRCwwQkFBMEI7UUFDMUIsY0FBYyxHQUFHLGNBQWMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFN0Msc0ZBQXNGO1FBQ3RGLGNBQWMsR0FBRyxjQUFjLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUVuRSxJQUFJLENBQUMsY0FBYyxHQUFHLGNBQWMsQ0FBQztRQUNyQyxJQUFJLENBQUMsb0JBQW9CLEdBQUcsbUJBQW1CLENBQUM7SUFDbEQsQ0FBQztJQUVEOzs7T0FHRztJQUNILDZDQUF1QixHQUF2QjtRQUNFLHFGQUFxRjtRQUNyRixJQUFJLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLElBQUksQ0FBQyxNQUFNLEtBQUssUUFBUSxFQUFFO1lBQ3pELElBQUksQ0FBQyxlQUFlLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDN0QsT0FBTztTQUNSO1FBRUQsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7UUFFcEQsdUVBQXVFO1FBQ3ZFLElBQUksSUFBSSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7WUFDckIsUUFBUSxHQUFHLENBQUMsQ0FBQztTQUNkO1FBRUQsbUZBQW1GO1FBQ25GLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUNqRyxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILHlCQUFHLEdBQUgsVUFBSSxHQUFnQjtRQUNsQixJQUFNLEtBQUssR0FBRyxJQUFJLFdBQVcsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBRWhELGdCQUFnQjtRQUNoQixJQUFJLElBQUksQ0FBQyxLQUFLLElBQUksR0FBRyxDQUFDLEtBQUssRUFBRTtZQUMzQixPQUFPLFdBQVcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQzFDO1FBQ0QsSUFBSSxJQUFJLENBQUMsVUFBVSxJQUFJLEdBQUcsQ0FBQyxVQUFVLEVBQUU7WUFDckMsT0FBTyxXQUFXLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUMvQztRQUNELElBQUksSUFBSSxDQUFDLFNBQVMsS0FBSyxHQUFHLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxVQUFVLEtBQUssR0FBRyxDQUFDLFVBQVUsRUFBRTtZQUMxRSxPQUFPLFdBQVcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQzNDO1FBRUQsMkVBQTJFO1FBQzNFLElBQUksbUJBQW1CLEdBQWdCLElBQUksQ0FBQztRQUM1QyxJQUFJLG1CQUFtQixHQUFnQixHQUFHLENBQUM7UUFDM0MsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsbUJBQW1CLENBQUMsY0FBYyxDQUFDLEVBQUU7WUFDL0csbUJBQW1CLEdBQUcsR0FBRyxDQUFDO1lBQzFCLG1CQUFtQixHQUFHLElBQUksQ0FBQztTQUM1QjtRQUNELDJDQUEyQztRQUMzQyxtQkFBbUIsR0FBRyxJQUFJLFdBQVcsQ0FBQyxtQkFBbUIsQ0FBQyxjQUFjLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3pGLG1CQUFtQixHQUFHLElBQUksV0FBVyxDQUFDLG1CQUFtQixDQUFDLGNBQWMsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFekYsa0RBQWtEO1FBQ2xELElBQUksbUJBQW1CLENBQUMsTUFBTSxFQUFFO1lBQzlCLE9BQU8sbUJBQW1CLENBQUM7U0FDNUI7UUFFRCxxQkFBcUI7UUFDckIsbUJBQW1CLENBQUMsY0FBYyxHQUFHLEdBQUcsR0FBRyxtQkFBbUIsQ0FBQyxjQUFjLENBQUM7UUFDOUUsbUJBQW1CLENBQUMsY0FBYyxHQUFHLEdBQUcsR0FBRyxtQkFBbUIsQ0FBQyxjQUFjLENBQUM7UUFFOUUsNkJBQTZCO1FBQzdCLElBQU0sVUFBVSxHQUFHLG1CQUFtQixDQUFDLGdCQUFnQixHQUFHLG1CQUFtQixDQUFDLGdCQUFnQixDQUFDO1FBQy9GLElBQU0sa0JBQWtCLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsbUJBQW1CLENBQUMsY0FBYyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQy9GLG1CQUFtQixDQUFDLGNBQWMsR0FBRyxrQkFBa0IsQ0FBQztRQUV4RCxnQ0FBZ0M7UUFDaEMsS0FBSyxDQUFDLGNBQWMsR0FBRyxtQkFBbUIsQ0FBQyxjQUFjLENBQUM7UUFFMUQscUNBQXFDO1FBQ3JDLElBQUksbUJBQW1CLENBQUMsWUFBWSxLQUFLLENBQUMsQ0FBQyxFQUFFO1lBQzNDLG1CQUFtQixDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxtQkFBbUIsQ0FBQyxjQUFjLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7U0FDekc7UUFDRCxJQUFJLG1CQUFtQixDQUFDLFlBQVksS0FBSyxDQUFDLENBQUMsRUFBRTtZQUMzQyxtQkFBbUIsQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsbUJBQW1CLENBQUMsY0FBYyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBRXhHLElBQUksbUJBQW1CLENBQUMsWUFBWSxLQUFLLG1CQUFtQixDQUFDLFlBQVksRUFBRTtnQkFDekUsS0FBSyxDQUFDLFVBQVUsR0FBRyxHQUFHLENBQUM7YUFDeEI7U0FDRjtRQUVELCtDQUErQztRQUMvQyxLQUFLLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUM1QyxtQkFBbUIsQ0FBQyxjQUFjLEVBQ2xDLG1CQUFtQixDQUFDLGNBQWMsQ0FDbkMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7UUFFckIsaUNBQWlDO1FBQ2pDLHFCQUFxQjtRQUNyQixLQUFLLENBQUMsY0FBYyxHQUFHLEtBQUssQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRXpELDZDQUE2QztRQUM3QyxJQUFJLEtBQUssQ0FBQyxjQUFjLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQyxnQkFBZ0IsS0FBSyxDQUFDLEVBQUU7WUFDOUQscUJBQXFCO1lBQ3JCLElBQU0sT0FBTyxHQUFJLEtBQUssQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDdkUsSUFBTSxhQUFhLEdBQUksS0FBSyxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQztZQUM3RSxLQUFLLENBQUMsY0FBYyxHQUFHLEtBQUssQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3pELElBQUksYUFBYSxLQUFLLEdBQUcsSUFBSSxPQUFPLEtBQUssR0FBRyxFQUFFO2dCQUM1QyxLQUFLLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxjQUFjLEVBQUUsR0FBRyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2FBQzlGO1lBRUQsd0JBQXdCO1lBQ3hCLEtBQUssQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQy9FO1FBRUQsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsMENBQW9CLEdBQXBCLFVBQXFCLFVBQWdCO1FBQWhCLDZDQUFnQjtRQUNuQyxJQUFJLENBQUMsUUFBUSxHQUFHLFdBQVcsQ0FBQyxXQUFXLENBQUM7UUFFeEMsT0FBTSxJQUFJLENBQUMsUUFBUSxHQUFHLFVBQVUsSUFBSSxJQUFJLENBQUMsYUFBYSxLQUFLLENBQUMsRUFBRTtZQUM1RCxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDaEIsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1NBQ2xCO0lBQ0gsQ0FBQztJQS9lYyx1QkFBVyxHQUFHLENBQUMsQ0FBQztJQWdmakMsa0JBQUM7Q0FBQTtBQTFmdUI7OztBQ2R4Qjs7Ozs7OztHQU9HO0FBRWlEO0FBRXBELElBQU0saUJBQWlCLEdBQXFCLFFBQVEsQ0FBQyxjQUFjLENBQUMsZUFBZSxDQUFDLENBQUM7QUFDckYsSUFBTSxnQkFBZ0IsR0FBcUIsUUFBUSxDQUFDLGNBQWMsQ0FBQyxhQUFhLENBQUMsQ0FBQztBQUNsRixJQUFNLGdCQUFnQixHQUFxQixRQUFRLENBQUMsY0FBYyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0FBQ2xGLElBQU0sZ0JBQWdCLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUMvRCxJQUFNLFNBQVMsR0FBRyxDQUFDLENBQUM7QUFDcEIsSUFBTSxTQUFTLEdBQUcsR0FBRyxDQUFDO0FBRXRCLFNBQVMsZ0JBQWdCO0lBQ3ZCLElBQU0sUUFBUSxHQUFHLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNqRCxJQUFNLE1BQU0sR0FBRyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDOUMsSUFBTSxNQUFNLEdBQUcsTUFBTSxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxDQUFDO0lBRTlDLElBQUksUUFBUSxHQUFHLFNBQVMsRUFBRTtRQUN4QixnQkFBZ0IsQ0FBQyxTQUFTLEdBQUcsaUZBQW1FLFNBQVMsWUFBUyxDQUFDO1FBQ25ILE9BQU87S0FDUjtJQUVELElBQUksUUFBUSxHQUFHLFNBQVMsRUFBRTtRQUN4QixnQkFBZ0IsQ0FBQyxTQUFTLEdBQUcsaUZBQW1FLFNBQVMsWUFBUyxDQUFDO1FBQ25ILE9BQU87S0FDUjtJQUVELElBQUksaUJBQWlCLENBQUMsS0FBSyxLQUFLLEVBQUUsSUFBSSxnQkFBZ0IsQ0FBQyxLQUFLLEtBQUssRUFBRSxJQUFJLGdCQUFnQixDQUFDLEtBQUssS0FBSyxFQUFFLEVBQUU7UUFDcEcsZ0JBQWdCLENBQUMsU0FBUyxHQUFHLHVFQUFxRSxDQUFDO1FBQ25HLE9BQU87S0FDUjtJQUVELElBQUksTUFBTSxHQUFHLENBQUMsSUFBSSxNQUFNLEdBQUcsQ0FBQyxFQUFFO1FBQzVCLGdCQUFnQixDQUFDLFNBQVMsR0FBRyxzRkFBb0YsQ0FBQztRQUNsSCxPQUFPO0tBQ1I7SUFFRCxJQUFNLEdBQUcsR0FBRyxJQUFJLFdBQVcsQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDOUMsSUFBTSxHQUFHLEdBQUcsSUFBSSxXQUFXLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQzlDLElBQU0sS0FBSyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDM0IsSUFBTSxnQkFBZ0IsR0FBRyxVQUFDLEVBQW1CLElBQUssMkNBQTJCLEVBQUUsMkRBQXVDLFFBQVEsaUJBQWMsRUFBMUYsQ0FBMEYsQ0FBQztJQUU3SSxJQUFJLEdBQUcsQ0FBQyxRQUFRLEVBQUU7UUFDaEIsZ0JBQWdCLENBQUMsU0FBUyxHQUFHLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMxRCxPQUFPO0tBQ1I7SUFFRCxJQUFJLEdBQUcsQ0FBQyxRQUFRLEVBQUU7UUFDaEIsZ0JBQWdCLENBQUMsU0FBUyxHQUFHLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMxRCxPQUFPO0tBQ1I7SUFFRCxJQUFJLEtBQUssQ0FBQyxRQUFRLEVBQUU7UUFDbEIsZ0JBQWdCLENBQUMsU0FBUyxHQUFHLGdCQUFnQixDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQzdELE9BQU87S0FDUjtJQUVELGdCQUFnQixDQUFDLFNBQVMsR0FBRyxvSEFHSixNQUFNLEdBQUcsTUFBTSx3S0FLTCxHQUFHLENBQUMsVUFBVSw0REFDYixHQUFHLENBQUMsY0FBYyw4REFDaEIsR0FBRyxDQUFDLGNBQWMsa0RBQzlCLEdBQUcsQ0FBQyxjQUFjLG9LQUtULEdBQUcsQ0FBQyxVQUFVLDREQUNiLEdBQUcsQ0FBQyxjQUFjLDhEQUNoQixHQUFHLENBQUMsY0FBYyxrREFDOUIsR0FBRyxDQUFDLGNBQWMsa0pBS1QsS0FBSyxDQUFDLFVBQVUsNERBQ2YsS0FBSyxDQUFDLGNBQWMsOERBQ2xCLEtBQUssQ0FBQyxjQUFjLG9JQUtqQyxLQUFLLENBQUMsY0FBYyx3SEFLcEIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEdBQUcsTUFBTSxHQUFHLEtBQUssQ0FBQyxjQUFjLENBQUMsNEJBRXhFLENBQUM7QUFDSixDQUFDO0FBRUQsaUJBQWlCLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLGdCQUFnQixDQUFDLENBQUM7QUFDL0QsaUJBQWlCLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLGdCQUFnQixDQUFDLENBQUM7QUFDOUQsZ0JBQWdCLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLGdCQUFnQixDQUFDLENBQUM7QUFDOUQsZ0JBQWdCLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLGdCQUFnQixDQUFDLENBQUM7QUFDN0QsZ0JBQWdCLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLGdCQUFnQixDQUFDLENBQUM7QUFDOUQsZ0JBQWdCLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLGdCQUFnQixDQUFDLENBQUM7QUFFN0QsZ0JBQWdCLEVBQUUsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL21hdGhfc3BlLy4vc3JjL2NsYXNzZXMvQmluYXJ5SGVscGVyLnRzIiwid2VicGFjazovL21hdGhfc3BlLy4vc3JjL2NsYXNzZXMvQmluYXJ5RmxvYXQudHMiLCJ3ZWJwYWNrOi8vbWF0aF9zcGUvLi9zcmMvQU4yMDIyX0xhYm8xX0VxMl9hZGRpdGlvbi50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogTGFibzogMCAoQmluYXJ5IG9wZXJhdGlvbnMpXHJcbiAqIEF1dGhvcnM6IE93ZW4gR29tYmFzLCBEYXZpZCBEYXJtYW5nZXIsIEp1bGllbiBWYXVjaGVyLCBDbMOpbWVudCBQZXRpZ25hdFxyXG4gKiBUZWFtOiAyXHJcbiAqIFNjaG9vbDogSEUtQXJjXHJcbiAqIERhdGU6IDIxIG1hcnMgMjAyMlxyXG4gKiBDb3Vyc2U6IE1hdGjDqW1hdGlxdWVzIHNww6ljaWZpcXVlcyAoTW9kdWxlIDIyMzQpIC0gTS4gU3TDqXBoYW5lIEdvYnJvblxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBQZXJmb3JtcyBiYXNpYyBvcGVyYXRpb25zIG9uIGJpbmFyeSBudW1iZXJzXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgQmluYXJ5SGVscGVyIHtcclxuICAvKipcclxuICAgKiBHZXQgbiBiaXQgb2YgMCBvciAxXHJcbiAgICogQHBhcmFtIHZhbHVlIDEgb3IgMFxyXG4gICAqIEBwYXJhbSBuIFRoZSBudW1iZXIgb2YgYml0cyB0byByZXRyaWV2ZVxyXG4gICAqIEByZXR1cm5zIG4gYml0IG9mIDAgb3IgMVxyXG4gICAqL1xyXG4gIHB1YmxpYyBnZXROQml0KHZhbHVlOiAxIHwgMCwgbjogbnVtYmVyKTogc3RyaW5nIHtcclxuICAgIGxldCByZXMgPSBcIlwiO1xyXG4gICAgXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG47IGkrKykge1xyXG4gICAgICByZXMgKz0gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHJlcztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEFkZCBuIHplcm9zIGJlZm9yZSB0aGUgYmluYXJ5IG51bWJlclxyXG4gICAqIEBwYXJhbSBuIFRoZSBudW1iZXIgb2YgMCB0byBhZGQgYmVmb3JlIHRoZSBiaW5hcnkgbnVtYmVyXHJcbiAgICogQHBhcmFtIGIgVGhlIGJpbmFyeSBudW1iZXJcclxuICAgKiBAcmV0dXJucyBUaGUgYmluYXJ5IG51bWJlciB3aXRoIG4gemVyb3MgYmVmb3JlXHJcbiAgICovXHJcbiAgcHVibGljIGFkZFBhZGRpbmcobjogbnVtYmVyLCBiID0gXCJcIikge1xyXG4gICAgY29uc3Qgc2l6ZSA9IG4gLSBiLmxlbmd0aDtcclxuXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNpemU7IGkrKykge1xyXG4gICAgICBiID0gXCIwXCIgKyBiO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBiO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmVtb3ZlcyB0aGUgemVyb3MgYmVmb3JlIGEgYmluYXJ5IG51bWJlciAoMDAwMTAxIGJlY29tZXMgMTAxKVxyXG4gICAqIEBwYXJhbSBiIFRoZSBiaW5hcnkgbnVtYmVyXHJcbiAgICogQHJldHVybnMgVGhlIHByb2R1Y2VkIGJpbmFyeSBudW1iZXJcclxuICAgKi9cclxuICBwdWJsaWMgY2xlYW4oYjogc3RyaW5nKSB7XHJcbiAgICBsZXQgcmVzID0gYjtcclxuXHJcbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgYi5sZW5ndGg7IGkrKykge1xyXG4gICAgICBpZiAoYltpXSA9PT0gXCIwXCIpIHtcclxuICAgICAgICByZXMgPSByZXMuc3Vic3RyaW5nKDEpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJldHVybiByZXM7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpZiAocmVzID09PSBcIlwiKSB7XHJcbiAgICAgIHJldHVybiBcIjBcIjtcclxuICAgIH1cclxuICB9XHJcblxyXG5cclxuICAvKipcclxuICAgKiBBZGQgMCBwYWRkaW5nIHRvIHRoZSBzbWFsbGVzdCBiaW5hcnkgbnVtYmVyIHRvIG1hdGNoIHRoZSBsb25nZXN0IG9uZSdzIGxlbmd0aFxyXG4gICAqIFsxMDEsIDExMDAxXSBiZWNvbWVzIFswMDEwMSwgMTEwMDFdXHJcbiAgICogQHBhcmFtIGIxIFRoZSBmaXJzdCBiaW5hcnkgbnVtYmVyXHJcbiAgICogQHBhcmFtIGIyIFRoZSBzZWNvbmQgYmluYXJ5IG51bWJlclxyXG4gICAqIEByZXR1cm5zIFtiMSwgYjJdIHdpdGggY29ycmVjdCBwYWRkaW5nXHJcbiAgICovXHJcbiAgcHVibGljIGFkZE1heFBhZGRpbmcoYjE6IHN0cmluZywgYjI6IHN0cmluZykge1xyXG4gICAgaWYgKGIyLmxlbmd0aCA+IGIxLmxlbmd0aCkge1xyXG4gICAgICBiMSA9IHRoaXMuYWRkUGFkZGluZyhiMi5sZW5ndGgsIGIxKTtcclxuICAgIH0gZWxzZSBpZiAoYjEubGVuZ3RoID4gYjIubGVuZ3RoKSB7XHJcbiAgICAgIGIyID0gdGhpcy5hZGRQYWRkaW5nKGIxLmxlbmd0aCwgYjIpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBbYjEsIGIyXTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldCB0aGUgbWF4IGxlbmd0aCBvZiB0d28gYmluYXJpZXMgbnVtYmVyc1xyXG4gICAqIEBwYXJhbSBiMSBUaGUgZmlyc3QgYmluYXJ5IG51bWJlclxyXG4gICAqIEBwYXJhbSBiMiBUaGUgc2Vjb25kIGJpbmFyeSBudW1iZXJcclxuICAgKiBAcmV0dXJucyBUaGUgbWF4IGxlbmd0aFxyXG4gICAqL1xyXG4gIHB1YmxpYyBnZXRNYXhMZW5ndGgoYjE6IHN0cmluZywgYjI6IHN0cmluZykge1xyXG4gICAgaWYgKGIxLmxlbmd0aCA+IGIyLmxlbmd0aCkge1xyXG4gICAgICByZXR1cm4gYjEubGVuZ3RoO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGIyLmxlbmd0aDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENvbnZlcnQgYSBudW1iZXIgdG8gaXQncyBiaW5hcnkgcmVwcmVzZW50YXRpb25cclxuICAgKiBAcGFyYW0gZGVjaW1hbCBUaGUgXHJcbiAgICogQHJldHVybnMgVGhlIGJpbmFyeSByZXByZXNlbnRhdGlvbiBvZiB0aGUgZGVjaW1hbCBudW1iZXJcclxuICAgKi9cclxuICBwdWJsaWMgZGVjaW1hbFRvQmluYXJ5KGRlY2ltYWw6IG51bWJlcikge1xyXG4gICAgY29uc3Qgb3JpZ2luYWxOdW1iZXIgPSBkZWNpbWFsO1xyXG4gICAgbGV0IGJpbmFyeU51bWJlciA9IChNYXRoLmFicyhkZWNpbWFsKSA+Pj4gMCkudG9TdHJpbmcoMik7XHJcblxyXG4gICAgaWYgKG9yaWdpbmFsTnVtYmVyIDwgMCkge1xyXG4gICAgICBiaW5hcnlOdW1iZXIgPSB0aGlzLmMyKGJpbmFyeU51bWJlcikucmV2ZXJzZSgpLmpvaW4oXCJcIik7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGJpbmFyeU51bWJlcjtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENvbnZlcnQgYSBiaW5hcnkgcmVwcmVzZW50YXRpb24gb2YgYSBudW1iZXIgdG8gYSBkZWNpbWFsIG51bWJlclxyXG4gICAqIEBwYXJhbSBiaW5hcnkgVGhlIGJpbmFyeSByZXByZXNlbnRhdGlvbiBvZiBhIG51bWJlclxyXG4gICAqIEByZXR1cm5zIFRoZSBpbnQgcmVwcmVzZW50YXRpb24gb2YgYSBiaW5hcnkgbnVtYmVyXHJcbiAgICovXHJcbiAgcHVibGljIGJpbmFyeVRvRGVjaW1hbChiaW5hcnk6IHN0cmluZykge1xyXG4gICAgcmV0dXJuIHBhcnNlSW50KGJpbmFyeSwgMik7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBZGQgaW50IHRvIGEgYmluYXJ5IG51bWJlclxyXG4gICAqIEBwYXJhbSBiIFRoZSBiaW5hcnkgbnVtYmVyXHJcbiAgICogQHBhcmFtIG4gVGhlIGludCBudW1iZXIgdG8gYWRkIHRvIHRoZSBiaW5hcnkgbnVtYmVyXHJcbiAgICogQHJldHVybnMgVGhlIHByb2R1Y2VkIHJlc3VsdFxyXG4gICAqL1xyXG4gIHB1YmxpYyBhZGROdW1iZXJUb0JpbmFyeShiOiBzdHJpbmcsIG46IG51bWJlcik6IHN0cmluZ1tdIHtcclxuICAgIHJldHVybiB0aGlzLmJpbmFyeUFkZGl0aW9uKGIsIHRoaXMuZGVjaW1hbFRvQmluYXJ5KG4pKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEludmVydCBhIGJpbmFyeSBudW1iZXJcclxuICAgKiBAcGFyYW0gYiBUaGUgYmluYXJ5IG51bWJlciB0byBpbnZlcnRcclxuICAgKiBAcmV0dXJucyBUaGUgaW52ZXJ0IGJpbmFyeSBudW1iZXJcclxuICAgKi9cclxuICBwdWJsaWMgaW52ZXJ0KGI6IHN0cmluZykge1xyXG4gICAgY29uc3QgaW5pdGlhbExlbmd0aCA9IGIubGVuZ3RoO1xyXG4gICAgYiA9IHRoaXMuZGVjaW1hbFRvQmluYXJ5KHRoaXMuYmluYXJ5VG9EZWNpbWFsKGIpIF4gdGhpcy5iaW5hcnlUb0RlY2ltYWwodGhpcy5nZXROQml0KDEsIGIubGVuZ3RoKSkpO1xyXG4gICAgYiA9IHRoaXMuYWRkUGFkZGluZyhpbml0aWFsTGVuZ3RoLCBiKTtcclxuICAgIHJldHVybiBiO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2hpZnQgdGhlIGJpbmFyeSBudW1iZXIgdG8gdGhlIHJpZ2h0XHJcbiAgICogQHBhcmFtIGIgVGhlIGJpbmFyeSBudW1iZXJcclxuICAgKiBAcGFyYW0gc2hpZnRWYWx1ZSBUaGUgc2hpZnQgdmFsdWVcclxuICAgKiBAcmV0dXJucyBUaGUgc2hpZnRlZCBiaW5hcnkgbnVtYmVyXHJcbiAgICovXHJcbiAgcHVibGljIHNoaWZ0UmlnaHQoYjogc3RyaW5nLCBzaGlmdFZhbHVlOiBudW1iZXIpIHtcclxuICAgIC8vIFwiMDAwMDAxMDEwXCIgPj4gMiA9PiBcIjAwMDAwMDAxMFwiXHJcbiAgICAvLyAxLiBSZW1vdmVzIGxhc3RzIDxzaGlmdFZhbHVlPiBiaXRzXHJcbiAgICAvLyAyLiBQbGFjZXMgPHNoaWZ0VmFsdWU+IGJpdHMgYXQgMCBiZWZvcmVcclxuXHJcbiAgICBpZiAoc2hpZnRWYWx1ZSA8IDEpIHtcclxuICAgICAgcmV0dXJuIGI7XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IHJlcyA9IGI7XHJcbiAgICByZXMgPSByZXMuc2xpY2UoMCwgLXNoaWZ0VmFsdWUpO1xyXG4gICAgcmVzID0gXCJcIi5wYWRTdGFydChzaGlmdFZhbHVlLCBcIjBcIikgKyByZXM7XHJcblxyXG4gICAgcmV0dXJuIHJlcztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNoaWZ0IHRoZSBiaW5hcnkgbnVtYmVyIHRvIHRoZSBsZWZ0XHJcbiAgICogQHBhcmFtIGIgVGhlIGJpbmFyeSBudW1iZXJcclxuICAgKiBAcGFyYW0gc2hpZnRWYWx1ZSBUaGUgc2hpZnQgdmFsdWVcclxuICAgKiBAcmV0dXJucyBUaGUgc2hpZnRlZCBiaW5hcnkgbnVtYmVyXHJcbiAgICovXHJcbiAgcHVibGljIHNoaWZ0TGVmdChiOiBzdHJpbmcsIHNoaWZ0VmFsdWU6IG51bWJlcikge1xyXG4gICAgLy8gXCIwMDAwMDEwMTBcIiA8PCAyID0+IFwiMDAwMDAxMDEwMDBcIlxyXG4gICAgLy8gMS4gUmVtb3ZlcyBsYXN0cyA8c2hpZnRWYWx1ZT4gYml0c1xyXG4gICAgLy8gMi4gUGxhY2VzIDxzaGlmdFZhbHVlPiBiaXRzIGF0IDAgYmVmb3JlXHJcblxyXG4gICAgaWYgKHNoaWZ0VmFsdWUgPCAxKSB7XHJcbiAgICAgIHJldHVybiBiO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCByZXMgPSBiO1xyXG4gICAgcmVzID0gcmVzLnNsaWNlKHNoaWZ0VmFsdWUpO1xyXG4gICAgcmVzICs9IFwiXCIucGFkRW5kKHNoaWZ0VmFsdWUsIFwiMFwiKTtcclxuXHJcbiAgICByZXR1cm4gcmVzO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQWRkIDIgYml0IHRvZ2V0aGVyIHdpdGggdGhlIGNhcnJ5XHJcbiAgICogQHBhcmFtIHggVGhlIGZpcnN0IGJpdFxyXG4gICAqIEBwYXJhbSB5IFRoZSBzZWNvbmQgYml0XHJcbiAgICogQHBhcmFtIGNhcnJ5IFRoZSBjYXJyeVxyXG4gICAqIEByZXR1cm5zIFRoZSByZXN1bHQgd2l0aCB0aGUgY2FycnkgW2JpdCwgY2FycnldXHJcbiAgICovXHJcbiAgcHVibGljIGVsZW1lbnRhcnlBZGRpdGlvbih4OiBzdHJpbmcsIHk6IHN0cmluZywgY2FycnkgPSBcIlwiKTogc3RyaW5nW10ge1xyXG4gICAgY29uc3QgcmVzID0gTnVtYmVyKHgpICsgTnVtYmVyKHkpICsgTnVtYmVyKGNhcnJ5KTtcclxuXHJcbiAgICBzd2l0Y2ggKHJlcykge1xyXG4gICAgICAvLyBjID0gMSwgeCA9IDEsIHkgPSAxXHJcbiAgICAgIGNhc2UgMzpcclxuICAgICAgICByZXR1cm4gW1wiMVwiLCBcIjFcIl07XHJcbiAgICAgIGNhc2UgMjpcclxuICAgICAgICByZXR1cm4gW1wiMFwiLCBcIjFcIl07XHJcbiAgICAgIGNhc2UgMTpcclxuICAgICAgICByZXR1cm4gW1wiMVwiLCBcIlwiXTtcclxuICAgICAgLy8gYyA9IDAsIHggPSAwLCB5ID0gMFxyXG4gICAgICBjYXNlIDA6XHJcbiAgICAgICAgcmV0dXJuIFtcIjBcIiwgXCJcIl07XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBZGQgMiBiaW5hcnkgbnVtYmVyc1xyXG4gICAqIEBwYXJhbSBiMSBUaGUgZmlyc3QgYmluYXJ5IG51bWJlclxyXG4gICAqIEBwYXJhbSBiMiBUaGUgc2Vjb25kIGJpbmFyeSBudW1iZXJcclxuICAgKiBAcmV0dXJucyBUaGUgcmVzdWx0IG9mIHRoZSBhZGRpdGlvbiBbYmluYXJ5TnVtYmVyLCBjYXJyeUJpdF1cclxuICAgKi9cclxuICBwdWJsaWMgYmluYXJ5QWRkaXRpb24oYjE6IHN0cmluZywgYjI6IHN0cmluZykge1xyXG4gICAgbGV0IHJlcyA9IFwiXCI7XHJcbiAgICBsZXQgY2FycnkgPSBcIlwiO1xyXG4gICAgY29uc3QgW2JwMSwgYnAyXSA9IHRoaXMuYWRkTWF4UGFkZGluZyhiMSwgYjIpO1xyXG5cclxuICAgIGZvciAobGV0IGkgPSBicDEubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcclxuICAgICAgY29uc3QgW3IsIGNdID0gdGhpcy5lbGVtZW50YXJ5QWRkaXRpb24oYnAxW2ldLCBicDJbaV0sIGNhcnJ5KTtcclxuICAgICAgcmVzID0gciArIHJlcztcclxuICAgICAgY2FycnkgPSBjO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBbcmVzLCBjYXJyeV07XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTdWJzdHJhY3QgMiBiaW5hcnkgbnVtYmVyc1xyXG4gICAqIEBwYXJhbSBiMSBUaGUgZmlyc3QgYmluYXJ5IG51bWJlclxyXG4gICAqIEBwYXJhbSBiMiBUaGUgc2Vjb25kIGJpbmFyeSBudW1iZXJcclxuICAgKiBAcmV0dXJucyBUaGUgcmVzdWx0IG9mIHRoZSBzdWJzdHJhY3Rpb24gW2JpbmFyeU51bWJlciwgY2FycnlCaXRdXHJcbiAgICovXHJcbiAgcHVibGljIGJpbmFyeVN1YnN0cmFjdGlvbihiMTogc3RyaW5nLCBiMjogc3RyaW5nKSB7XHJcbiAgICBjb25zdCBbYnAxLCBicDJdID0gdGhpcy5hZGRNYXhQYWRkaW5nKGIxLCBiMik7XHJcbiAgICByZXR1cm4gdGhpcy5iaW5hcnlBZGRpdGlvbihicDEsIHRoaXMuYzIoYnAyKS5yZXZlcnNlKCkuam9pbihcIlwiKSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBQZXJmb3JtIGEgMidzIGNvbXBsZW1lbnQgb3BlcmF0aW9uIHdpdGhvdXQgdGhlIGNhcnJ5XHJcbiAgICogQHBhcmFtIGIgVGhlIGJpbmFyeSBudW1iZXJcclxuICAgKiBAcmV0dXJucyBUaGUgMidzIGNvbXBsZW1lbnQgb2YgdGhlIGJpbmFyeSBudW1iZXIgW2JpbmFyeU51bWJlciwgY2FycnldXHJcbiAgICovXHJcbiAgcHVibGljIGMyKGI6IHN0cmluZyk6IHN0cmluZ1tdIHtcclxuICAgIGIgPSB0aGlzLmludmVydChiKTtcclxuICAgIHJldHVybiB0aGlzLmFkZE51bWJlclRvQmluYXJ5KGIsIDEpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogTXVsdGlwbHkgMiBiaW5hcnkgbnVtYmVyc1xyXG4gICAqIEBwYXJhbSBiMSBUaGUgZmlyc3QgYmluYXJ5IG51bWJlclxyXG4gICAqIEBwYXJhbSBiMiBUaGUgc2Vjb25kIGJpbmFyeSBudW1iZXJcclxuICAgKiBAcmV0dXJucyBUaGUgcmVzdWx0IG9mIHRoZSBtdWx0aXBsaWNhdGlvblxyXG4gICAqL1xyXG4gIHB1YmxpYyBiaW5hcnlNdWx0aXBsaWNhdGlvbihiMTogc3RyaW5nLCBiMjogc3RyaW5nKSB7XHJcbiAgICBsZXQgcmVzID0gXCJcIjtcclxuICAgIGNvbnN0IGFkZFJlc3VsdHMgPSBbXTtcclxuXHJcbiAgICAvLyBUaGUgYmluYXJ5IG51bWJlcnMgdG8gbXVsaXRwbHlcclxuICAgIC8vIGJwMSA9IDEwMTFcclxuICAgIC8vIGJwMiA9IDExMTFcclxuICAgIGNvbnN0IFticDEsIGJwMl0gPSB0aGlzLmFkZE1heFBhZGRpbmcoYjEsIGIyKTtcclxuXHJcbiAgICAvLyBDYWxjdWxhdGUgdGhlIG9wZXJhbmRzXHJcbiAgICAvLyBhZGRSZXN1bHRzID0gW1xyXG4gICAgLy8gICAgMDAwMCAxMDExLFxyXG4gICAgLy8gICAgMDAwMSAwMTEwLFxyXG4gICAgLy8gICAgMDAxMCAxMTAwLFxyXG4gICAgLy8gICAgMTAxMSAwMDAwXHJcbiAgICAvLyBdXHJcbiAgICBmb3IgKGxldCBpID0gYnAxLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XHJcbiAgICAgIGxldCBjdXJyZW50UmVzID0gXCJcIjtcclxuXHJcbiAgICAgIGZvciAobGV0IGogPSBicDEubGVuZ3RoIC0gMTsgaiA+PSAwOyBqLS0pIHtcclxuICAgICAgICBjdXJyZW50UmVzID0gKE51bWJlcihicDFbal0pICogTnVtYmVyKGJwMltpXSkpICsgY3VycmVudFJlcztcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3QgZGVjID0gdGhpcy5iaW5hcnlUb0RlY2ltYWwoY3VycmVudFJlcykgPDwgKGJwMS5sZW5ndGggLSAxIC0gaSk7XHJcbiAgICAgIGN1cnJlbnRSZXMgPSB0aGlzLmRlY2ltYWxUb0JpbmFyeShkZWMpO1xyXG4gICAgICBhZGRSZXN1bHRzLnB1c2goY3VycmVudFJlcyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQWRkIGV2ZXJ5dGhpbmdcclxuICAgIC8vIHJlcyA9XHJcbiAgICAvLyAgIDAwMDAgMTAxMSxcclxuICAgIC8vICsgMDAwMSAwMTEwLFxyXG4gICAgLy8gKyAwMDEwIDExMDAsXHJcbiAgICAvLyArIDEwMTEgMDAwMFxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhZGRSZXN1bHRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGNvbnN0IGFkZFJlc3VsdCA9IHRoaXMuYWRkUGFkZGluZyhhZGRSZXN1bHRzW2FkZFJlc3VsdHMubGVuZ3RoIC0gMV0ubGVuZ3RoLCBhZGRSZXN1bHRzW2ldKTtcclxuICAgICAgY29uc3QgW3IsIGNdID0gdGhpcy5iaW5hcnlBZGRpdGlvbihyZXMsIGFkZFJlc3VsdCk7XHJcbiAgICAgIHJlcyA9IGMgKyByO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIHJlcyA9IDEwMTAwMTAxXHJcbiAgICByZXR1cm4gcmVzO1xyXG4gIH1cclxufVxyXG4iLCIvKipcclxuICogTGFibzogMSAoRmxvYXQgdG8gYmluYXJ5IGNvbnZlcnNpb24pXHJcbiAqIEF1dGhvcnM6IE93ZW4gR29tYmFzLCBEYXZpZCBEYXJtYW5nZXIsIEp1bGllbiBWYXVjaGVyLCBDbMOpbWVudCBQZXRpZ25hdFxyXG4gKiBUZWFtOiAyXHJcbiAqIFNjaG9vbDogSEUtQXJjXHJcbiAqIERhdGU6IDIxIG1hcnMgMjAyMlxyXG4gKiBDb3Vyc2U6IE1hdGjDqW1hdGlxdWVzIHNww6ljaWZpcXVlcyAoTW9kdWxlIDIyMzQpIC0gTS4gU3TDqXBoYW5lIEdvYnJvblxyXG4gKi9cclxuXHJcbmltcG9ydCB7IEJpbmFyeUhlbHBlciB9IGZyb20gXCIuL0JpbmFyeUhlbHBlclwiO1xyXG5cclxuLyoqXHJcbiAqIEVuY29kZSBhIGZsb2F0aW5nIG51bWJlciB3aXRoIGEgY2hvb3NlbiBiaXQgc2l6ZSBhbmQgSUVFRSA3NTRcclxuICovXHJcbmV4cG9ydCBjbGFzcyBCaW5hcnlGbG9hdCB7XHJcbiAgcHJpdmF0ZSBfYml0c1NpemUgPSAzMjtcclxuICBwcml2YXRlIF9udW1iZXIgPSAwO1xyXG4gIHByaXZhdGUgX2JpbmFyeVNpZ246IFwiMVwiIHwgXCIwXCIgPSBcIjBcIjtcclxuICBwcml2YXRlIF9iaW5hcnlNYW50aXNzYSA9IFwiXCI7XHJcbiAgcHJpdmF0ZSBfb3ZlcmZsb3cgPSBmYWxzZTtcclxuICBwcml2YXRlIF9tYW50aXNzYURvdFBvc2l0aW9uID0gMDtcclxuICBwcml2YXRlIF9iaW5hcnlFeHBvbmVudCA9IFwiXCI7XHJcbiAgcHJpdmF0ZSBfYmlhcyA9IDA7XHJcbiAgcHJpdmF0ZSBfYmggPSBuZXcgQmluYXJ5SGVscGVyKCk7XHJcbiAgcHJpdmF0ZSBzdGF0aWMgX21pbkJpdFNpemUgPSA4O1xyXG5cclxuICBjb25zdHJ1Y3RvcihudW1iZXJPckJpbmFyeTogc3RyaW5nKTtcclxuICBjb25zdHJ1Y3RvcihudW1iZXJPckJpbmFyeTogbnVtYmVyKTtcclxuICBjb25zdHJ1Y3RvcihudW1iZXJPckJpbmFyeTogbnVtYmVyLCBiaXRzU2l6ZTogbnVtYmVyKTtcclxuICBjb25zdHJ1Y3RvcihudW1iZXJPckJpbmFyeTogbnVtYmVyIHwgc3RyaW5nLCBiaXRzU2l6ZT86IG51bWJlcikge1xyXG4gICAgaWYgKHR5cGVvZiBudW1iZXJPckJpbmFyeSA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgICAvLyBSZW1vdmUgdGhlIHNwYWNlcyBpbiB0aGUgc3RyaW5nXHJcbiAgICAgIG51bWJlck9yQmluYXJ5ID0gbnVtYmVyT3JCaW5hcnkudHJpbSgpO1xyXG4gICAgICBudW1iZXJPckJpbmFyeSA9IG51bWJlck9yQmluYXJ5LnJlcGxhY2UoL1xccy9nLCBcIlwiKTtcclxuICAgICAgdGhpcy5iaXRzU2l6ZSA9IG51bWJlck9yQmluYXJ5Lmxlbmd0aDtcclxuICAgICAgdGhpcy5udW1iZXIgPSAxO1xyXG5cclxuICAgICAgLy8gU2xpY2UgdGhlIHN0cmluZyB0byBhc3NpZ24gdGhlIGJpbmFyeSBudW1iZXIgdG8gdGhlIGNvcnJlY3QgcGFydCBvZiB0aGUgYmluYXJ5IHJlcHJlc2VudGF0aW9uIG9mIHRoZSBmbG9hdFxyXG4gICAgICB0aGlzLmJpbmFyeVNpZ24gPSBudW1iZXJPckJpbmFyeVswXSBhcyBcIjBcIiB8IFwiMVwiO1xyXG4gICAgICB0aGlzLmJpbmFyeUV4cG9uZW50ID0gbnVtYmVyT3JCaW5hcnkuc2xpY2UoMSwgdGhpcy5leHBvbmVudEJpdHNTaXplICsgMSk7XHJcbiAgICAgIHRoaXMuYmluYXJ5TWFudGlzc2EgPSBudW1iZXJPckJpbmFyeS5zbGljZSh0aGlzLmV4cG9uZW50Qml0c1NpemUgKyAxLCB0aGlzLmJpdHNTaXplKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuYml0c1NpemUgPSBiaXRzU2l6ZTtcclxuICAgICAgdGhpcy5udW1iZXIgPSBudW1iZXJPckJpbmFyeTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldCB0aGUgaW5maW5pdHkgYmluYXJ5IHJlcHJlc2VudGF0aW9uXHJcbiAgICogQHBhcmFtIGJpdHNTaXplIFRoZSBiaXQgc2l6ZSBvZiB0aGUgbnVtYmVyXHJcbiAgICogQHJldHVybnMgVGhlIGluZmluaXR5IGJpbmFyeSByZXByZXNlbnRhdGlvblxyXG4gICAqL1xyXG4gIHN0YXRpYyBnZXRJbmZpbml0eShiaXRzU2l6ZTogbnVtYmVyKSB7XHJcbiAgICByZXR1cm4gbmV3IEJpbmFyeUZsb2F0KEluZmluaXR5LCBiaXRzU2l6ZSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXQgdGhlIE5hTiBiaW5hcnkgcmVwcmVzZW50YXRpb25cclxuICAgKiBAcGFyYW0gYml0c1NpemUgVGhlIGJpdCBzaXplIG9mIHRoZSBudW1iZXJcclxuICAgKiBAcmV0dXJucyBUaGUgTmFOIGJpbmFyeSByZXByZXNlbnRhdGlvblxyXG4gICAqL1xyXG4gIHN0YXRpYyBnZXROYU4oYml0c1NpemU6IG51bWJlcikge1xyXG4gICAgcmV0dXJuIG5ldyBCaW5hcnlGbG9hdChOYU4sIGJpdHNTaXplKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldCB0aGUgemVybyBiaW5hcnkgcmVwcmVzZW50YXRpb25cclxuICAgKiBAcGFyYW0gYml0c1NpemUgVGhlIGJpdCBzaXplIG9mIHRoZSBudW1iZXJcclxuICAgKiBAcmV0dXJucyBUaGUgemVybyBiaW5hcnkgcmVwcmVzZW50YXRpb25cclxuICAgKi9cclxuICBzdGF0aWMgZ2V0WmVybyhiaXRzU2l6ZTogbnVtYmVyKSB7XHJcbiAgICByZXR1cm4gbmV3IEJpbmFyeUZsb2F0KDAsIGJpdHNTaXplKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBmbG9hdCBudW1iZXIgdG8gZW5jb2RlIHdpdGggSUVFRSA3NTRcclxuICAgKi9cclxuICBnZXQgbnVtYmVyKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX251bWJlcjtcclxuICB9XHJcblxyXG4gIHNldCBudW1iZXIodmFsdWU6IG51bWJlcikge1xyXG4gICAgdGhpcy5fbnVtYmVyID0gdmFsdWU7XHJcblxyXG4gICAgdGhpcy5jYWxjdWxhdGUoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBiaXRzIHNpemUgdG8gY29kZSB0aGUgbnVtYmVyXHJcbiAgICovXHJcbiAgZ2V0IGJpdHNTaXplKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX2JpdHNTaXplO1xyXG4gIH1cclxuXHJcbiAgc2V0IGJpdHNTaXplKHZhbHVlOiBudW1iZXIpIHtcclxuICAgIHRoaXMuX2JpdHNTaXplID0gdmFsdWU7XHJcblxyXG4gICAgaWYgKHZhbHVlIDwgQmluYXJ5RmxvYXQuX21pbkJpdFNpemUpIHtcclxuICAgICAgdGhpcy5fYml0c1NpemUgPSBCaW5hcnlGbG9hdC5fbWluQml0U2l6ZTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBtYW50aXNzYSBiaXRzIHNpemVcclxuICAgKi9cclxuICBnZXQgbWFudGlzc2FCaXRzU2l6ZSgpIHtcclxuICAgIGlmICh0aGlzLmJpdHNTaXplIDwgOCkge1xyXG4gICAgICByZXR1cm4gMDtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGhpcy5iaXRzU2l6ZSAtIHRoaXMuZXhwb25lbnRCaXRzU2l6ZSAtIDE7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXQgdGhlIGV4cG9uZW50IGJpdHMgc2l6ZSB3aXRoOlxyXG4gICAqIC0gVGhlIElFRUUgNzU0IDIwMTkgZm9ybXVsYSBpZiB0aGUgYml0cyBzaXplIGlzIGdyZWF0ZXIgb3IgZXF1YWwgdG8gMTI4XHJcbiAgICogLSBBIGN1c3RvbSBmb3JtdWxhIGlmIHRoZSBiaXQgc2l6ZSBpcyBsZXNzIHRoYW4gMTI4IHRoYXQgbWF0Y2hlcyB0aGUgSUVFRSBzdGFuZGFyZFxyXG4gICAqIFxyXG4gICAqIFZpc3VhbGl6ZSB0aGUgZnVuY3Rpb24gb24gZ2VvZ2VicmE6XHJcbiAgICogaHR0cHM6Ly93d3cuZ2VvZ2VicmEub3JnL2NhbGN1bGF0b3IvY2VycmtkZnZcclxuICAgKi9cclxuICBnZXQgZXhwb25lbnRCaXRzU2l6ZSgpIHtcclxuICAgIGlmICh0aGlzLmJpdHNTaXplIDwgOCkge1xyXG4gICAgICByZXR1cm4gMDtcclxuICAgIH1cclxuXHJcbiAgICAvLyBJRUVFIDc1NCAyMDE5IGZvcm11bGEgPj0gMTI4XHJcbiAgICBpZiAodGhpcy5iaXRzU2l6ZSA+PSAxMjgpIHtcclxuICAgICAgcmV0dXJuIE1hdGgucm91bmQoNCAqIE1hdGgubG9nMih0aGlzLmJpdHNTaXplKSkgLSAxMztcclxuICAgIH1cclxuXHJcbiAgICAvLyBBIGZvcm11bGEgdGhhdCBtYXRjaGVzIHRoZSB2YWx1ZXMgZm9yIDwgMTI4XHJcbiAgICAvLyByZWY6IGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vYS82MjYzMjI2MFxyXG4gICAgcmV0dXJuIE1hdGgucm91bmQoKE1hdGgubG9nMih0aGlzLmJpdHNTaXplKSAtIDEpICoqICgzIC8gMikpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIGFic29sdXRlIHZhbHVlIG9mIHRoZSBvcmlnaW5hbCBudW1iZXJcclxuICAgKi9cclxuICBnZXQgcG9zaXRpdmVOdW1iZXIoKSB7XHJcbiAgICByZXR1cm4gTWF0aC5hYnModGhpcy5udW1iZXIpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ2FsY3VsYXRlIHRoZSBwb3NpdGlvbiBvZiB0aGUgZG90IGluIHRoZSBtYW50aXNzYVxyXG4gICAqICAgICAgICAgICAgICAgICAgICAgIGZsb2F0IHBvc2l0aW9uXHJcbiAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgfFxyXG4gICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZcclxuICAgKiBtYW50aXNzYSgxOS41OTM3NSkgPT4gXCIwMDExLjEwMDExMDAwMDAwMDAwMDAwMDBcIlxyXG4gICAqL1xyXG4gIGdldCBtYW50aXNzYURvdFBvc2l0aW9uKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX21hbnRpc3NhRG90UG9zaXRpb247XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZXR1cm4gdGhlIGJpYXMgb2YgdGhlIG51bWJlciBiYXNlZCBvbiB0aGUgZXhwb25lbnQgYml0cyBzaXplXHJcbiAgICogYiA9IDIgXiAoZXhwb25lbnRCaXRzU2l6ZSAtIDEpIC0gMVxyXG4gICAqL1xyXG4gIGdldCBiaWFzKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX2JpYXM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBUaGUgYmluYXJ5IHJlcHJlc2VudGF0aW9uIG9mIHRoZSBzaWduXHJcbiAgICogMCBpZiBudW1iZXIgPj0gMFxyXG4gICAqIDEgaWYgbnVtYmVyIDwgMFxyXG4gICAqL1xyXG4gIGdldCBiaW5hcnlTaWduKCk6IFwiMFwiIHwgXCIxXCIge1xyXG4gICAgcmV0dXJuIHRoaXMuX2JpbmFyeVNpZ247XHJcbiAgfVxyXG5cclxuICBzZXQgYmluYXJ5U2lnbih2YWx1ZTogXCIwXCIgfCBcIjFcIikge1xyXG4gICAgdGhpcy5fYmluYXJ5U2lnbiA9IHZhbHVlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIGV4cG9uZW50IG9mIHRoZSBudW1iZXIgaW4gYmluYXJ5IHdpdGggdGhlIGJpYXNcclxuICAgKiBtYW50aXNzYSgxOS41OTM3NSkgPT4gXCIxMDAwMDAxMFwiXHJcbiAgICovXHJcbiAgIGdldCBiaW5hcnlFeHBvbmVudCgpIHtcclxuICAgIHJldHVybiB0aGlzLl9iaW5hcnlFeHBvbmVudDtcclxuICB9XHJcblxyXG4gIHNldCBiaW5hcnlFeHBvbmVudCh2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICB0aGlzLl9iaW5hcnlFeHBvbmVudCA9IHZhbHVlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIGZ1bGwgbWFudGlzc2Egb2YgdGhlIG51bWJlclxyXG4gICAqL1xyXG4gIGdldCBiaW5hcnlNYW50aXNzYSgpIHtcclxuICAgIHJldHVybiB0aGlzLl9iaW5hcnlNYW50aXNzYTtcclxuICB9XHJcblxyXG4gIHNldCBiaW5hcnlNYW50aXNzYSh2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICB0aGlzLl9iaW5hcnlNYW50aXNzYSA9IHZhbHVlO1xyXG4gICAgdGhpcy5fb3ZlcmZsb3cgPSB2YWx1ZS5sZW5ndGggPiB0aGlzLm1hbnRpc3NhQml0c1NpemU7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBUaGUgZnVsbCBudW1iZXIgY29kZWQgaW4gYmluYXJ5IHdpdGggSUVFRSA3NTRcclxuICAgKi9cclxuICBnZXQgYmluYXJ5RmxvYXRpbmdOdW1iZXIoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5iaW5hcnlTaWduICsgdGhpcy5iaW5hcnlFeHBvbmVudCArIHRoaXMuYmluYXJ5TWFudGlzc2E7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBUaGUgc2lnbiBpbiBpdCdzIGRlY2ltYWwgZm9ybVxyXG4gICAqL1xyXG4gIGdldCBjb21wdXRlZFNpZ24oKSB7XHJcbiAgICByZXR1cm4gdGhpcy5iaW5hcnlTaWduID09PSBcIjFcIiA/IC0xIDogMTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBleHBvbmVudCBpbiBpdCdzIGRlY2ltYWwgZm9ybVxyXG4gICAqL1xyXG4gIGdldCBjb21wdXRlZEV4cG9uZW50KCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX2JoLmJpbmFyeVRvRGVjaW1hbCh0aGlzLmJpbmFyeUV4cG9uZW50KSAtIHRoaXMuYmlhcztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBtYW50aXNzYSBpbiBpdCdzIGRlY2ltYWwgZm9ybVxyXG4gICAqL1xyXG4gIGdldCBjb21wdXRlZE1hbnRpc3NhKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX2JoLmJpbmFyeVRvRGVjaW1hbChcIjFcIiArIHRoaXMuYmluYXJ5TWFudGlzc2EpIC8gMiAqKiB0aGlzLm1hbnRpc3NhQml0c1NpemU7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBEZXRlcm1pbmUgaWYgdGhlIG51bWJlciBpcyBOYU5cclxuICAgKiBAcmV0dXJucyBUcnVlIGlmIHRoZSBudW1iZXIgaXMgTmFOXHJcbiAgICovXHJcbiAgZ2V0IGlzTmFOKCkge1xyXG4gICAgY29uc3QgaXNOYU5CaW5hcnkgPSAoXHJcbiAgICAgIHRoaXMuYmluYXJ5RXhwb25lbnQuaW5kZXhPZihcIjBcIikgPT09IC0xICYmXHJcbiAgICAgIHRoaXMuYmluYXJ5TWFudGlzc2EuaW5kZXhPZihcIjBcIikgPT09IC0xICYmXHJcbiAgICAgIHRoaXMuYmluYXJ5U2lnbiA9PT0gXCIwXCJcclxuICAgICk7XHJcblxyXG4gICAgcmV0dXJuIE51bWJlci5pc05hTih0aGlzLm51bWJlcikgfHwgaXNOYU5CaW5hcnk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBEZXRlcm1pbmUgaWYgdGhlIG51bWJlciBpcyByZXByZXNlbnRzIHRoZSBpbmZpbml0eVxyXG4gICAqIEByZXR1cm5zIFRydWUgaWYgdGhlIG51bWJlciBpcyBJbmZpbml0eVxyXG4gICAqL1xyXG4gIGdldCBpc0luZmluaXR5KCkge1xyXG4gICAgY29uc3QgaXNJbmZpbml0eUJpbmFyeSA9IChcclxuICAgICAgdGhpcy5iaW5hcnlFeHBvbmVudC5pbmRleE9mKFwiMFwiKSA9PT0gLTEgJiZcclxuICAgICAgdGhpcy5iaW5hcnlNYW50aXNzYS5pbmRleE9mKFwiMVwiKSA9PT0gLTEgJiZcclxuICAgICAgdGhpcy5iaW5hcnlTaWduID09PSBcIjBcIlxyXG4gICAgKTtcclxuXHJcbiAgICByZXR1cm4gdGhpcy5udW1iZXIgPT09IEluZmluaXR5IHx8IGlzSW5maW5pdHlCaW5hcnk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBEZXRlcm1pbmUgaWYgdGhlIG51bWJlciBpcyB6ZXJvXHJcbiAgICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgbnVtYmVyIGlzIHplcm9cclxuICAgKi9cclxuICBnZXQgaXNaZXJvKCkge1xyXG4gICAgY29uc3QgaXNaZXJvQmluYXJ5ID0gKFxyXG4gICAgICB0aGlzLmJpbmFyeUV4cG9uZW50LmluZGV4T2YoXCIxXCIpID09PSAtMSAmJlxyXG4gICAgICB0aGlzLmJpbmFyeU1hbnRpc3NhLmluZGV4T2YoXCIxXCIpID09PSAtMSAmJlxyXG4gICAgICB0aGlzLmJpbmFyeVNpZ24gPT09IFwiMFwiXHJcbiAgICApO1xyXG5cclxuICAgIHJldHVybiB0aGlzLm51bWJlciA9PT0gMCB8fCBpc1plcm9CaW5hcnk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXQgdGhlIGFic29sdXRlIHZhbHVlIG9mIHRoZSBudW1iZXIgaW4gYmluYXJ5XHJcbiAgICovXHJcbiAgZ2V0IGJpbmFyeUFicygpIHtcclxuICAgIHJldHVybiBcIjBcIiArIHRoaXMuYmluYXJ5RXhwb25lbnQgKyB0aGlzLmJpbmFyeU1hbnRpc3NhO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIG51bWJlciB0aGF0IGlzIGNvZGVkIGluIG1lbW9yeVxyXG4gICAqL1xyXG4gIGdldCBjb21wdXRlZE51bWJlcigpIHtcclxuICAgIGlmICh0aGlzLmlzWmVybykge1xyXG4gICAgICByZXR1cm4gMDtcclxuICAgIH0gZWxzZSBpZiAodGhpcy5pc05hTikge1xyXG4gICAgICByZXR1cm4gTmFOO1xyXG4gICAgfSBlbHNlIGlmICh0aGlzLmlzSW5maW5pdHkpIHtcclxuICAgICAgcmV0dXJuIEluZmluaXR5O1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0aGlzLmNvbXB1dGVkU2lnbiAqIDIgKiogdGhpcy5jb21wdXRlZEV4cG9uZW50ICogdGhpcy5jb21wdXRlZE1hbnRpc3NhO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IHRoZSBtYXJnaW4gb2YgZXJyb3JcclxuICAgKi9cclxuICBnZXQgbWFyZ2luT2ZFcnJvcigpIHsgICAgXHJcbiAgICBpZiAoTnVtYmVyLmlzTmFOKHRoaXMubnVtYmVyKSB8fCB0aGlzLm51bWJlciA9PT0gSW5maW5pdHkgfHwgdGhpcy5udW1iZXIgPT09IDApIHtcclxuICAgICAgcmV0dXJuIDA7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIE1hdGguYWJzKHRoaXMubnVtYmVyIC0gdGhpcy5jb21wdXRlZE51bWJlcik7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBUcnVlIGlmIHRoZSBudW1iZXIgY2Fubm90IGJlIGVuY29kZWQgaW4gPGJpdHNTaXplPiBiaXRzXHJcbiAgICovXHJcbiAgZ2V0IG92ZXJmbG93KCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX292ZXJmbG93O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ2FsY3VsYXRlOlxyXG4gICAqIC0gQmluYXJ5IHNpZ25cclxuICAgKiAtIFRoZSBiaWFzXHJcbiAgICogLSBUaGUgYmluYXJ5IG1hbnRpc3NhXHJcbiAgICogLSBUaGUgYmluYXJ5IGV4cG9uZW50XHJcbiAgICovXHJcbiAgY2FsY3VsYXRlKCkge1xyXG4gICAgdGhpcy5jYWxjdWxhdGVCaW5hcnlTaWduKCk7XHJcbiAgICB0aGlzLmNhbGN1bGF0ZUJpYXMoKTtcclxuICAgIHRoaXMuY2FsY3VsYXRlQmluYXJ5TWFudGlzc2EoKTtcclxuICAgIHRoaXMuY2FsY3VsYXRlQmluYXJ5RXhwb25lbnQoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIERldGVybWluZSB0aGUgYmluYXJ5IHNpZ24gb2YgdGhlIG51bWJlclxyXG4gICAqL1xyXG4gIGNhbGN1bGF0ZUJpbmFyeVNpZ24oKSB7XHJcbiAgICB0aGlzLl9iaW5hcnlTaWduID0gdGhpcy5udW1iZXIgPCAwID8gXCIxXCIgOiBcIjBcIjtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENhbGN1bGF0ZSB0aGUgZXhwb25lbnQgYmlhcyBiYXNlZCBvbiB0aGUgZXhwb25lbnQgYml0IHNpemVcclxuICAgKiBiID0gMiBeIChleHBvbmVudEJpdHNTaXplIC0gMSkgLSAxO1xyXG4gICAqL1xyXG4gIGNhbGN1bGF0ZUJpYXMoKSB7XHJcbiAgICB0aGlzLl9iaWFzID0gMiAqKiAodGhpcy5leHBvbmVudEJpdHNTaXplIC0gMSkgLSAxO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRGV0ZXJtaW5lIHRoZSBiaW5hcnkgbWFudGlzc2EgYW5kIGRldGVybWluZSB0aGUgZG90IHBvc2l0aW9uIGluIHRoZSBtYW50aXNzYVxyXG4gICAqL1xyXG4gIGNhbGN1bGF0ZUJpbmFyeU1hbnRpc3NhKCkge1xyXG4gICAgaWYgKE51bWJlci5pc05hTih0aGlzLm51bWJlcikpIHtcclxuICAgICAgdGhpcy5fbWFudGlzc2FEb3RQb3NpdGlvbiA9IDA7XHJcbiAgICAgIHRoaXMuX2JpbmFyeU1hbnRpc3NhID0gXCJcIi5wYWRFbmQodGhpcy5tYW50aXNzYUJpdHNTaXplLCBcIjFcIik7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICAvLyBHZXQgdGhlIGludGVnZXIgcGFydFxyXG4gICAgY29uc3QgaW50ZWdlclBhcnQgPSBNYXRoLnRydW5jKHRoaXMucG9zaXRpdmVOdW1iZXIpO1xyXG5cclxuICAgIC8vIEdldCB0aGUgZGVjaW1hbHMgb2YgdGhlIG51bWJlcjogZGVjaW1hbHMgPSAxOS41OTM3NSAtIDE5ID0gMC41OTM3NVxyXG4gICAgbGV0IGRlY2ltYWxzUGFydCA9IHRoaXMucG9zaXRpdmVOdW1iZXIgLSBNYXRoLnRydW5jKHRoaXMucG9zaXRpdmVOdW1iZXIpO1xyXG5cclxuICAgIGNvbnN0IGJpbmFyeUludGVnZXJQYXJ0ID0gdGhpcy5fYmguZGVjaW1hbFRvQmluYXJ5KGludGVnZXJQYXJ0KTtcclxuXHJcbiAgICAvLyBHZXQgdGhlIG51bWJlciBvZiBiaXRzIGRlZGljYXRlZCB0byBzdG9yZSB0aGUgZGVjaW1hbHMgaW4gdGhlIG1hbnRpc3NhXHJcbiAgICBjb25zdCBkZWNpbWFsc0JpdHNTaXplID0gdGhpcy5tYW50aXNzYUJpdHNTaXplIC0gYmluYXJ5SW50ZWdlclBhcnQubGVuZ3RoIC0gMTtcclxuICAgIFxyXG4gICAgbGV0IGJpbmFyeURlY2ltYWxzUGFydCA9IFwiXCI7XHJcbiAgICAvLyAwLjU5Mzc1ICogMiA9IDEuMTg3NSAgPT4gMVxyXG4gICAgLy8gMC4xODc1ICAqIDIgPSAwLjM3NSAgID0+IDBcclxuICAgIC8vIDAuMzc1ICAgKiAyID0gMC43NSAgICA9PiAwXHJcbiAgICAvLyAwLjc1ICAgICogMiA9IDEuNSAgICAgPT4gMVxyXG4gICAgLy8gMC41ICAgICAqIDIgPSAxICAgICAgID0+IDFcclxuICAgIGZvcihsZXQgaSA9IDA7IGkgPCBkZWNpbWFsc0JpdHNTaXplOyBpKyspIHtcclxuICAgICAgZGVjaW1hbHNQYXJ0ICo9IDI7XHJcblxyXG4gICAgICBpZiAoZGVjaW1hbHNQYXJ0ID49IDEpIHtcclxuICAgICAgICBkZWNpbWFsc1BhcnQgLT0gMTtcclxuICAgICAgICBiaW5hcnlEZWNpbWFsc1BhcnQgKz0gXCIxXCI7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgYmluYXJ5RGVjaW1hbHNQYXJ0ICs9IFwiMFwiO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IGJpbmFyeU1hbnRpc3NhID0gYmluYXJ5SW50ZWdlclBhcnQgKyBiaW5hcnlEZWNpbWFsc1BhcnQ7XHJcblxyXG4gICAgLy8gR2V0IHRoZSBwb3NpdGlvbiBvZiB0aGUgZmlyc3QgYml0IGF0IDEsIGZvciBvbmx5IGRlY2ltYWxzIG51bWJlclxyXG4gICAgbGV0IG1hbnRpc3NhRG90UG9zaXRpb24gPSAtYmluYXJ5TWFudGlzc2EuaW5kZXhPZihcIjFcIik7XHJcblxyXG4gICAgLy8gUmVtb3ZlIGFsbCB0aGUgbGVhZGluZyBiaXQgYXQgMCBmcm9tIHRoZSBtYW50aXNzYVxyXG4gICAgYmluYXJ5TWFudGlzc2EgPSB0aGlzLl9iaC5jbGVhbihiaW5hcnlNYW50aXNzYSk7XHJcblxyXG4gICAgLy8gSWYgdGhlIHBvc2l0aW9uIG9mIHRoZSBmaXJzdCBiaXQgYXQgMSBpcyAwXHJcbiAgICAvLyB0aGVuIHRoZSBkb3QgcG9zaXRpb24gaXMgZXF1YWxzIHRvIHRoZSBsZW5ndGggb2YgdGhlIGJpbmFyeSBpbnRlZ2VyIHBhcnQgb2YgdGhlIG1hbnRpc3NhXHJcbiAgICBpZiAobWFudGlzc2FEb3RQb3NpdGlvbiA9PT0gMCkge1xyXG4gICAgICBtYW50aXNzYURvdFBvc2l0aW9uID0gYmluYXJ5SW50ZWdlclBhcnQubGVuZ3RoIC0gMTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBIaWRlIHRoZSBmaXJzdCBiaXQgYXQgMVxyXG4gICAgYmluYXJ5TWFudGlzc2EgPSBiaW5hcnlNYW50aXNzYS5zdWJzdHJpbmcoMSk7XHJcblxyXG4gICAgLy8gTWFrZSBzdXJlIHRoYXQgdGhlIG1hbnRpc3NhIG1hdGNoZXMgdGhlIGNvcnJlY3QgbGVuZ3RoICgyMyBmb3IgMzIgYml0cyBmb3IgZXhhbXBsZSlcclxuICAgIGJpbmFyeU1hbnRpc3NhID0gYmluYXJ5TWFudGlzc2EucGFkRW5kKHRoaXMubWFudGlzc2FCaXRzU2l6ZSwgXCIwXCIpO1xyXG5cclxuICAgIHRoaXMuYmluYXJ5TWFudGlzc2EgPSBiaW5hcnlNYW50aXNzYTtcclxuICAgIHRoaXMuX21hbnRpc3NhRG90UG9zaXRpb24gPSBtYW50aXNzYURvdFBvc2l0aW9uO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ2FsY3VsYXRlIHRoZSBleHBvbmVudCBpbiBiaW5hcnlcclxuICAgKiBlID0gYmluYXJ5KG1hbnRpc3NhRmxvYXRQb3NpdGlvbiArIGJpYXMpXHJcbiAgICovXHJcbiAgY2FsY3VsYXRlQmluYXJ5RXhwb25lbnQoKSB7XHJcbiAgICAvLyBJZiB0aGUgbnVtYmVyIGlzIE5hTiBvciBJbmZpbml0eSB0aGVuIGFsbCB0aGUgYml0cyBvZiB0aGUgZXhwb25lbnQgYXJlIGVxdWFscyB0byAxXHJcbiAgICBpZiAoTnVtYmVyLmlzTmFOKHRoaXMubnVtYmVyKSB8fCB0aGlzLm51bWJlciA9PT0gSW5maW5pdHkpIHtcclxuICAgICAgdGhpcy5fYmluYXJ5RXhwb25lbnQgPSBcIlwiLnBhZEVuZCh0aGlzLmV4cG9uZW50Qml0c1NpemUsIFwiMVwiKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCBleHBvbmVudCA9IHRoaXMubWFudGlzc2FEb3RQb3NpdGlvbiArIHRoaXMuYmlhcztcclxuXHJcbiAgICAvLyBJZiB0aGUgbnVtYmVyIGlzIDAgdGhlbiBhbGwgdGhlIGJpdHMgb2YgdGhlIGV4cG9uZW50IGFyZSBlcXVhbHMgdG8gMFxyXG4gICAgaWYgKHRoaXMubnVtYmVyID09PSAwKSB7XHJcbiAgICAgIGV4cG9uZW50ID0gMDtcclxuICAgIH1cclxuXHJcbiAgICAvLyBDb252ZXJ0IHRoZSBleHBvbmVudCB0byBiaW5hcnkgYW5kIGFkZCBsZWFkaW5nIDAgdG8gbWF0Y2ggdGhlIGV4cG9uZW50IGJpdHMgc2l6ZVxyXG4gICAgdGhpcy5fYmluYXJ5RXhwb25lbnQgPSB0aGlzLl9iaC5kZWNpbWFsVG9CaW5hcnkoZXhwb25lbnQpLnBhZFN0YXJ0KHRoaXMuZXhwb25lbnRCaXRzU2l6ZSwgXCIwXCIpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQWRkIHR3byBiaW5hcnkgZmxvYXQgbnVtYmVyXHJcbiAgICogQHBhcmFtIGJmMiBUaGUgYmluYXJ5IGZsb2F0IG51bWJlciB0byBhZGRcclxuICAgKiBAcmV0dXJucyBUaGUgcmVzdWx0IG9mIHRoZSBhZGRpdGlvblxyXG4gICAqL1xyXG4gIGFkZChiZjI6IEJpbmFyeUZsb2F0KSB7XHJcbiAgICBjb25zdCBiZlJlcyA9IG5ldyBCaW5hcnlGbG9hdCgxLCB0aGlzLmJpdHNTaXplKTtcclxuXHJcbiAgICAvLyBTcGVjaWFsIGNhc2VzXHJcbiAgICBpZiAodGhpcy5pc05hTiB8fCBiZjIuaXNOYU4pIHtcclxuICAgICAgcmV0dXJuIEJpbmFyeUZsb2F0LmdldE5hTih0aGlzLmJpdHNTaXplKTtcclxuICAgIH1cclxuICAgIGlmICh0aGlzLmlzSW5maW5pdHkgfHwgYmYyLmlzSW5maW5pdHkpIHtcclxuICAgICAgcmV0dXJuIEJpbmFyeUZsb2F0LmdldEluZmluaXR5KHRoaXMuYml0c1NpemUpO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMuYmluYXJ5QWJzID09PSBiZjIuYmluYXJ5QWJzICYmIHRoaXMuYmluYXJ5U2lnbiAhPT0gYmYyLmJpbmFyeVNpZ24pIHtcclxuICAgICAgcmV0dXJuIEJpbmFyeUZsb2F0LmdldFplcm8odGhpcy5iaXRzU2l6ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gU3RlcCAxOiBEZXRlcm1pbmUgdGhlIGxvd2VzdCBleHBvbmVudCBiZXR3ZWVuIHRoaXMgYW5kIHRoZSBzZWNvbmQgbnVtYmVyXHJcbiAgICBsZXQgYmZNaW5CaW5hcnlFeHBvbmVudDogQmluYXJ5RmxvYXQgPSB0aGlzO1xyXG4gICAgbGV0IGJmTWF4QmluYXJ5RXhwb25lbnQ6IEJpbmFyeUZsb2F0ID0gYmYyO1xyXG4gICAgaWYgKHRoaXMuX2JoLmJpbmFyeVRvRGVjaW1hbChiZjIuYmluYXJ5RXhwb25lbnQpIDwgdGhpcy5fYmguYmluYXJ5VG9EZWNpbWFsKGJmTWluQmluYXJ5RXhwb25lbnQuYmluYXJ5RXhwb25lbnQpKSB7XHJcbiAgICAgIGJmTWluQmluYXJ5RXhwb25lbnQgPSBiZjI7XHJcbiAgICAgIGJmTWF4QmluYXJ5RXhwb25lbnQgPSB0aGlzO1xyXG4gICAgfVxyXG4gICAgLy8gQ29weSB0aGUgbnVtYmVyLCBkbyBub3Qgc2V0IGJ5IHJlZmVyZW5jZVxyXG4gICAgYmZNYXhCaW5hcnlFeHBvbmVudCA9IG5ldyBCaW5hcnlGbG9hdChiZk1heEJpbmFyeUV4cG9uZW50LmNvbXB1dGVkTnVtYmVyLCB0aGlzLmJpdHNTaXplKTtcclxuICAgIGJmTWluQmluYXJ5RXhwb25lbnQgPSBuZXcgQmluYXJ5RmxvYXQoYmZNaW5CaW5hcnlFeHBvbmVudC5jb21wdXRlZE51bWJlciwgdGhpcy5iaXRzU2l6ZSk7XHJcblxyXG4gICAgLy8gSWYgdGhlcmUgaXMgYSAwIHRoZW4gcmV0dXJuIHRoZSBub24temVybyBudW1iZXJcclxuICAgIGlmIChiZk1pbkJpbmFyeUV4cG9uZW50LmlzWmVybykge1xyXG4gICAgICByZXR1cm4gYmZNYXhCaW5hcnlFeHBvbmVudDtcclxuICAgIH1cclxuXHJcbiAgICAvLyBBZGQgdGhlIGhpZGRlbiBiaXRcclxuICAgIGJmTWluQmluYXJ5RXhwb25lbnQuYmluYXJ5TWFudGlzc2EgPSBcIjFcIiArIGJmTWluQmluYXJ5RXhwb25lbnQuYmluYXJ5TWFudGlzc2E7XHJcbiAgICBiZk1heEJpbmFyeUV4cG9uZW50LmJpbmFyeU1hbnRpc3NhID0gXCIxXCIgKyBiZk1heEJpbmFyeUV4cG9uZW50LmJpbmFyeU1hbnRpc3NhO1xyXG5cclxuICAgIC8vIFN0ZXAgMjogU2hpZnQgdGhlIG1hbnRpc3NhXHJcbiAgICBjb25zdCBzaGlmdFZhbHVlID0gYmZNYXhCaW5hcnlFeHBvbmVudC5jb21wdXRlZEV4cG9uZW50IC0gYmZNaW5CaW5hcnlFeHBvbmVudC5jb21wdXRlZEV4cG9uZW50O1xyXG4gICAgY29uc3Qgc2hpZnRlZE1pbk1hbnRpc3NhID0gdGhpcy5fYmguc2hpZnRSaWdodChiZk1pbkJpbmFyeUV4cG9uZW50LmJpbmFyeU1hbnRpc3NhLCBzaGlmdFZhbHVlKTtcclxuICAgIGJmTWluQmluYXJ5RXhwb25lbnQuYmluYXJ5TWFudGlzc2EgPSBzaGlmdGVkTWluTWFudGlzc2E7XHJcbiAgICBcclxuICAgIC8vIFN0ZXAgMzogUHV0IHRoZSBzYW1lIGV4cG9uZW50XHJcbiAgICBiZlJlcy5iaW5hcnlFeHBvbmVudCA9IGJmTWF4QmluYXJ5RXhwb25lbnQuYmluYXJ5RXhwb25lbnQ7XHJcblxyXG4gICAgLy8gU3RlcCA0OiAyJ3MgY29tcGxlbWVudCBpZiBuZWdhdGl2ZVxyXG4gICAgaWYgKGJmTWluQmluYXJ5RXhwb25lbnQuY29tcHV0ZWRTaWduID09PSAtMSkge1xyXG4gICAgICBiZk1pbkJpbmFyeUV4cG9uZW50LmJpbmFyeU1hbnRpc3NhID0gdGhpcy5fYmguYzIoYmZNaW5CaW5hcnlFeHBvbmVudC5iaW5hcnlNYW50aXNzYSkucmV2ZXJzZSgpLmpvaW4oXCJcIik7XHJcbiAgICB9XHJcbiAgICBpZiAoYmZNYXhCaW5hcnlFeHBvbmVudC5jb21wdXRlZFNpZ24gPT09IC0xKSB7XHJcbiAgICAgIGJmTWF4QmluYXJ5RXhwb25lbnQuYmluYXJ5TWFudGlzc2EgPSB0aGlzLl9iaC5jMihiZk1heEJpbmFyeUV4cG9uZW50LmJpbmFyeU1hbnRpc3NhKS5yZXZlcnNlKCkuam9pbihcIlwiKTtcclxuXHJcbiAgICAgIGlmIChiZk1heEJpbmFyeUV4cG9uZW50LmNvbXB1dGVkU2lnbiAhPT0gYmZNaW5CaW5hcnlFeHBvbmVudC5jb21wdXRlZFNpZ24pIHtcclxuICAgICAgICBiZlJlcy5iaW5hcnlTaWduID0gXCIxXCI7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBTdGVwIDU6IEFkZCB0aGUgbWFudGlzc2EgYW5kIHRoZSBzaGlmdGVkIG9uZVxyXG4gICAgYmZSZXMuYmluYXJ5TWFudGlzc2EgPSB0aGlzLl9iaC5iaW5hcnlBZGRpdGlvbihcclxuICAgICAgYmZNYXhCaW5hcnlFeHBvbmVudC5iaW5hcnlNYW50aXNzYSxcclxuICAgICAgYmZNaW5CaW5hcnlFeHBvbmVudC5iaW5hcnlNYW50aXNzYSxcclxuICAgICkucmV2ZXJzZSgpLmpvaW4oXCJcIik7XHJcblxyXG4gICAgLy8gU3RlcCA3OiBOb3JtYWxpemUgdGhlIG1hbnRpc3NhXHJcbiAgICAvLyBIaWRlIHRoZSBmaXJzdCBiaXRcclxuICAgIGJmUmVzLmJpbmFyeU1hbnRpc3NhID0gYmZSZXMuYmluYXJ5TWFudGlzc2Euc3Vic3RyaW5nKDEpO1xyXG5cclxuICAgIC8vIE5vcm1hbGl6ZSB0aGUgbWFudGlzc2EgaWYgdGhlcmUgaXMgYSBjYXJyeVxyXG4gICAgaWYgKGJmUmVzLmJpbmFyeU1hbnRpc3NhLmxlbmd0aCAtIGJmUmVzLm1hbnRpc3NhQml0c1NpemUgPT09IDEpIHtcclxuICAgICAgLy8gUm91bmQgdGhlIGxhc3QgYml0XHJcbiAgICAgIGNvbnN0IGxhc3RCaXQgPSAgYmZSZXMuYmluYXJ5TWFudGlzc2FbYmZSZXMuYmluYXJ5TWFudGlzc2EubGVuZ3RoIC0gMV07XHJcbiAgICAgIGNvbnN0IGJlZm9yZUxhc3RCaXQgPSAgYmZSZXMuYmluYXJ5TWFudGlzc2FbYmZSZXMuYmluYXJ5TWFudGlzc2EubGVuZ3RoIC0gMl07XHJcbiAgICAgIGJmUmVzLmJpbmFyeU1hbnRpc3NhID0gYmZSZXMuYmluYXJ5TWFudGlzc2Euc2xpY2UoMCwgLTEpO1xyXG4gICAgICBpZiAoYmVmb3JlTGFzdEJpdCA9PT0gXCIxXCIgJiYgbGFzdEJpdCA9PT0gXCIxXCIpIHtcclxuICAgICAgICBiZlJlcy5iaW5hcnlNYW50aXNzYSA9IHRoaXMuX2JoLmJpbmFyeUFkZGl0aW9uKGJmUmVzLmJpbmFyeU1hbnRpc3NhLCBcIjFcIikucmV2ZXJzZSgpLmpvaW4oXCJcIik7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIEFkZCAxIHRvIHRoZSBleHBvbmVudFxyXG4gICAgICBiZlJlcy5iaW5hcnlFeHBvbmVudCA9IHRoaXMuX2JoLmFkZE51bWJlclRvQmluYXJ5KGJmUmVzLmJpbmFyeUV4cG9uZW50LCAxKVswXTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gYmZSZXM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBGaW5kIHRoZSBtaW5pbXVtIGJpdHMgc2l6ZSB0byBtYXRjaCB0aGUgbnVtYmVyIGFsbW9zdCBcInBlcmZlY3RseVwiXHJcbiAgICogQHBhcmFtIG1heEJpdFNpemUgRGVmYXVsdCAyNTYsIHRoZSBiaXRzIHNpemUgbGltaXRcclxuICAgKi9cclxuICBmaW5kQWNjdXJhdGVCaXRzU2l6ZShtYXhCaXRTaXplID0gMjU2KSB7XHJcbiAgICB0aGlzLmJpdHNTaXplID0gQmluYXJ5RmxvYXQuX21pbkJpdFNpemU7XHJcbiAgICBcclxuICAgIHdoaWxlKHRoaXMuYml0c1NpemUgPCBtYXhCaXRTaXplICYmIHRoaXMubWFyZ2luT2ZFcnJvciAhPT0gMCkge1xyXG4gICAgICB0aGlzLmJpdHNTaXplKys7XHJcbiAgICAgIHRoaXMuY2FsY3VsYXRlKCk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiIsIi8qKlxyXG4gKiBMYWJvOiAxIChGbG9hdCB0byBiaW5hcnkgY29udmVyc2lvbilcclxuICogQXV0aG9yczogT3dlbiBHb21iYXMsIERhdmlkIERhcm1hbmdlciwgSnVsaWVuIFZhdWNoZXIsIENsw6ltZW50IFBldGlnbmF0XHJcbiAqIFRlYW06IDJcclxuICogU2Nob29sOiBIRS1BcmNcclxuICogRGF0ZTogMjEgbWFycyAyMDIyXHJcbiAqIENvdXJzZTogTWF0aMOpbWF0aXF1ZXMgc3DDqWNpZmlxdWVzIChNb2R1bGUgMjIzNCkgLSBNLiBTdMOpcGhhbmUgR29icm9uXHJcbiAqL1xyXG5cclxuaW1wb3J0IHsgQmluYXJ5RmxvYXQgfSBmcm9tIFwiLi9jbGFzc2VzL0JpbmFyeUZsb2F0XCI7XHJcblxyXG5jb25zdCBhZGRCaXRTaXplRWxlbWVudCA9IDxIVE1MSW5wdXRFbGVtZW50PmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYWRkLWJpdHMtc2l6ZVwiKTtcclxuY29uc3QgYWRkSW5wdXRBRWxlbWVudCA9IDxIVE1MSW5wdXRFbGVtZW50PmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYWRkLWlucHV0LWFcIik7XHJcbmNvbnN0IGFkZElucHV0QkVsZW1lbnQgPSA8SFRNTElucHV0RWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFkZC1pbnB1dC1iXCIpO1xyXG5jb25zdCBhZGRSZXN1bHRFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhZGQtcmVzdWx0XCIpO1xyXG5jb25zdCBtaW5MZW5ndGggPSA4O1xyXG5jb25zdCBtYXhMZW5ndGggPSAyNTY7XHJcblxyXG5mdW5jdGlvbiBvbkNoYW5nZUFkZGl0aW9uKCkge1xyXG4gIGNvbnN0IGJpdHNTaXplID0gTnVtYmVyKGFkZEJpdFNpemVFbGVtZW50LnZhbHVlKTtcclxuICBjb25zdCBpbnB1dEEgPSBOdW1iZXIoYWRkSW5wdXRBRWxlbWVudC52YWx1ZSk7XHJcbiAgY29uc3QgaW5wdXRCID0gTnVtYmVyKGFkZElucHV0QkVsZW1lbnQudmFsdWUpO1xyXG5cclxuICBpZiAoYml0c1NpemUgPCBtaW5MZW5ndGgpIHtcclxuICAgIGFkZFJlc3VsdEVsZW1lbnQuaW5uZXJIVE1MID0gYDxzcGFuIGNsYXNzPVwiY29sb3ItcmVkXCI+TGEgdGFpbGxlIGRlcyBiaXRzIGRvaXQgYXUgbWluaW11bSDDqnRyZSAke21pbkxlbmd0aH08L3NwYW4+YDtcclxuICAgIHJldHVybjtcclxuICB9XHJcblxyXG4gIGlmIChiaXRzU2l6ZSA+IG1heExlbmd0aCkge1xyXG4gICAgYWRkUmVzdWx0RWxlbWVudC5pbm5lckhUTUwgPSBgPHNwYW4gY2xhc3M9XCJjb2xvci1yZWRcIj5MYSB0YWlsbGUgZGVzIGJpdHMgZG9pdCBhdSBtYXhpbXVtIMOqdHJlICR7bWF4TGVuZ3RofTwvc3Bhbj5gO1xyXG4gICAgcmV0dXJuO1xyXG4gIH1cclxuICAgIFxyXG4gIGlmIChhZGRCaXRTaXplRWxlbWVudC52YWx1ZSA9PT0gXCJcIiB8fCBhZGRJbnB1dEFFbGVtZW50LnZhbHVlID09PSBcIlwiIHx8IGFkZElucHV0QkVsZW1lbnQudmFsdWUgPT09IFwiXCIpIHtcclxuICAgIGFkZFJlc3VsdEVsZW1lbnQuaW5uZXJIVE1MID0gYDxzcGFuIGNsYXNzPVwiY29sb3ItZ3JleVwiPlZldWlsbGV6IHJlbnNlaWduZXIgdG91cyBsZXMgY2hhbXBzPC9zcGFuPmA7XHJcbiAgICByZXR1cm47XHJcbiAgfVxyXG5cclxuICBpZiAoaW5wdXRBIDwgMCB8fCBpbnB1dEIgPCAwKSB7XHJcbiAgICBhZGRSZXN1bHRFbGVtZW50LmlubmVySFRNTCA9IGA8c3BhbiBjbGFzcz1cImNvbG9yLXJlZFwiPk5vdXMgbmUgc3VwcG9ydG9ucyBxdWUgbGVzIGFkZGl0aW9ucyBwb3VyIGxlIG1vbWVudDwvc3Bhbj5gO1xyXG4gICAgcmV0dXJuO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgYmZBID0gbmV3IEJpbmFyeUZsb2F0KGlucHV0QSwgYml0c1NpemUpO1xyXG4gIGNvbnN0IGJmQiA9IG5ldyBCaW5hcnlGbG9hdChpbnB1dEIsIGJpdHNTaXplKTtcclxuICBjb25zdCBiZlJlcyA9IGJmQS5hZGQoYmZCKTtcclxuICBjb25zdCBnZXRPdmVyRmxvd0Vycm9yID0gKG5iOiBzdHJpbmcgfCBudW1iZXIpID0+IGA8c3BhbiBjbGFzcz1cImNvbG9yLXJlZFwiPiR7bmJ9IGVzdCB0cm9wIGdyYW5kIHBvdXIgw6p0cmUgZW5jb2TDqSBlbiAke2JpdHNTaXplfSBiaXRzPC9zcGFuPmA7XHJcblxyXG4gIGlmIChiZkEub3ZlcmZsb3cpIHtcclxuICAgIGFkZFJlc3VsdEVsZW1lbnQuaW5uZXJIVE1MID0gZ2V0T3ZlckZsb3dFcnJvcihiZkEubnVtYmVyKTtcclxuICAgIHJldHVybjtcclxuICB9XHJcblxyXG4gIGlmIChiZkIub3ZlcmZsb3cpIHtcclxuICAgIGFkZFJlc3VsdEVsZW1lbnQuaW5uZXJIVE1MID0gZ2V0T3ZlckZsb3dFcnJvcihiZkIubnVtYmVyKTtcclxuICAgIHJldHVybjtcclxuICB9XHJcblxyXG4gIGlmIChiZlJlcy5vdmVyZmxvdykge1xyXG4gICAgYWRkUmVzdWx0RWxlbWVudC5pbm5lckhUTUwgPSBnZXRPdmVyRmxvd0Vycm9yKFwiTGUgcsOpc3VsdGF0XCIpO1xyXG4gICAgcmV0dXJuO1xyXG4gIH1cclxuXHJcbiAgYWRkUmVzdWx0RWxlbWVudC5pbm5lckhUTUwgPSBgXHJcbiAgICA8ZGl2IGNsYXNzPVwicmVzdWx0LWdyb3VwIGNvbG9yLWdyZXlcIj5cclxuICAgICAgUsOpc3VsdGF0IFwiZXhhY3RcIjpcclxuICAgICAgPHNwYW4gY2xhc3M9XCJtb25vXCI+JHtpbnB1dEEgKyBpbnB1dEJ9PC9zcGFuPlxyXG4gICAgPC9kaXY+XHJcblxyXG4gICAgPGRpdiBjbGFzcz1cInJlc3VsdC1ncm91cCBtdDI1XCI+XHJcbiAgICAgIE5vbWJyZSA8c3BhbiBjbGFzcz1cIm1vbm9cIj4xPC9zcGFuPiBlbiBiaW5haXJlOlxyXG4gICAgICA8c3BhbiBjbGFzcz1cImNvbG9yLXJlZCBtb25vXCI+JHtiZkEuYmluYXJ5U2lnbn08L3NwYW4+XHJcbiAgICAgIDxzcGFuIGNsYXNzPVwiY29sb3ItYmx1ZSBtb25vXCI+JHtiZkEuYmluYXJ5RXhwb25lbnR9PC9zcGFuPlxyXG4gICAgICA8c3BhbiBjbGFzcz1cImNvbG9yLW9yYW5nZSBtb25vXCI+JHtiZkEuYmluYXJ5TWFudGlzc2F9PC9zcGFuPlxyXG4gICAgICAoPHNwYW4gY2xhc3M9XCJtb25vXCI+JHtiZkEuY29tcHV0ZWROdW1iZXJ9PC9zcGFuPilcclxuICAgIDwvZGl2PlxyXG5cclxuICAgIDxkaXYgY2xhc3M9XCJyZXN1bHQtZ3JvdXBcIj5cclxuICAgICAgTm9tYnJlIDxzcGFuIGNsYXNzPVwibW9ub1wiPjI8L3NwYW4+IGVuIGJpbmFpcmU6XHJcbiAgICAgIDxzcGFuIGNsYXNzPVwiY29sb3ItcmVkIG1vbm9cIj4ke2JmQi5iaW5hcnlTaWdufTwvc3Bhbj5cclxuICAgICAgPHNwYW4gY2xhc3M9XCJjb2xvci1ibHVlIG1vbm9cIj4ke2JmQi5iaW5hcnlFeHBvbmVudH08L3NwYW4+XHJcbiAgICAgIDxzcGFuIGNsYXNzPVwiY29sb3Itb3JhbmdlIG1vbm9cIj4ke2JmQi5iaW5hcnlNYW50aXNzYX08L3NwYW4+XHJcbiAgICAgICg8c3BhbiBjbGFzcz1cIm1vbm9cIj4ke2JmQi5jb21wdXRlZE51bWJlcn08L3NwYW4+KVxyXG4gICAgPC9kaXY+XHJcblxyXG4gICAgPGRpdiBjbGFzcz1cInJlc3VsdC1ncm91cCBtdDI1XCI+XHJcbiAgICAgIFLDqXN1bHRhdCBlbiBiaW5haXJlOlxyXG4gICAgICA8c3BhbiBjbGFzcz1cImNvbG9yLXJlZCBtb25vXCI+JHtiZlJlcy5iaW5hcnlTaWdufTwvc3Bhbj5cclxuICAgICAgPHNwYW4gY2xhc3M9XCJjb2xvci1ibHVlIG1vbm9cIj4ke2JmUmVzLmJpbmFyeUV4cG9uZW50fTwvc3Bhbj5cclxuICAgICAgPHNwYW4gY2xhc3M9XCJjb2xvci1vcmFuZ2UgbW9ub1wiPiR7YmZSZXMuYmluYXJ5TWFudGlzc2F9PC9zcGFuPlxyXG4gICAgPC9kaXY+XHJcblxyXG4gICAgPGRpdiBjbGFzcz1cInJlc3VsdC1ncm91cFwiPlxyXG4gICAgICBSw6lzdWx0YXQgY2FsY3Vsw6k6XHJcbiAgICAgIDxzcGFuIGNsYXNzPVwibW9ub1wiPiR7YmZSZXMuY29tcHV0ZWROdW1iZXJ9PC9zcGFuPlxyXG4gICAgPC9kaXY+XHJcblxyXG4gICAgPGRpdiBjbGFzcz1cInJlc3VsdC1ncm91cFwiPlxyXG4gICAgICBNYXJnZSBkJ2VycmV1cjpcclxuICAgICAgPHNwYW4gY2xhc3M9XCJtb25vXCI+JHtNYXRoLmFicyhpbnB1dEEgKyBpbnB1dEIgLSBiZlJlcy5jb21wdXRlZE51bWJlcil9PC9zcGFuPlxyXG4gICAgPC9kaXY+XHJcbiAgYDtcclxufVxyXG5cclxuYWRkQml0U2l6ZUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCBvbkNoYW5nZUFkZGl0aW9uKTtcclxuYWRkQml0U2l6ZUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImtleXVwXCIsIG9uQ2hhbmdlQWRkaXRpb24pO1xyXG5hZGRJbnB1dEFFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgb25DaGFuZ2VBZGRpdGlvbik7XHJcbmFkZElucHV0QUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImtleXVwXCIsIG9uQ2hhbmdlQWRkaXRpb24pO1xyXG5hZGRJbnB1dEJFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgb25DaGFuZ2VBZGRpdGlvbik7XHJcbmFkZElucHV0QkVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImtleXVwXCIsIG9uQ2hhbmdlQWRkaXRpb24pO1xyXG5cclxub25DaGFuZ2VBZGRpdGlvbigpO1xyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=
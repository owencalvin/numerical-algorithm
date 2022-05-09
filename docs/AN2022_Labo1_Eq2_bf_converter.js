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


;// CONCATENATED MODULE: ./src/AN2022_Labo1_Eq2_bf_converter.ts
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
var minLength = 8;
var maxLength = 256;
function onChangeConverterBf() {
    var binaryNumber = bfBinaryNumberElement.value;
    if (binaryNumber.length < minLength && binaryNumber !== "") {
        bfResultElement.innerHTML = "<span class=\"color-red\">La taille des bits doit au minimum \u00EAtre ".concat(minLength, "</span>");
        return;
    }
    if (binaryNumber.length > maxLength) {
        bfResultElement.innerHTML = "<span class=\"color-red\">La taille des bits doit au maximum \u00EAtre ".concat(maxLength, "</span>");
        return;
    }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QyxLQUFLLEtBQUssRUFBRSxFQUFHO1FBQ3ZDLGVBQWUsQ0FBQyxTQUFTLEdBQUcsdUVBQXFFLENBQUM7UUFDbEcsT0FBTztLQUNSO0lBRUQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUU7UUFDbkMsZUFBZSxDQUFDLFNBQVMsR0FBRyxpRUFBK0QsQ0FBQztRQUM1RixPQUFPO0tBQ1I7SUFFRCxJQUFNLEVBQUUsR0FBRyxJQUFJLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUV6QyxlQUFlLENBQUMsU0FBUyxHQUFHLDBFQUVBLEVBQUUsQ0FBQyxRQUFRLG1HQUlILEVBQUUsQ0FBQyxnQkFBZ0Isd0dBSWxCLEVBQUUsQ0FBQyxnQkFBZ0IsNEVBSTNDLEVBQUUsQ0FBQyxJQUFJLHNIQUtlLEVBQUUsQ0FBQyxVQUFVLGtEQUN0QixFQUFFLENBQUMsWUFBWSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLDhJQU1qRCxFQUFFLENBQUMsY0FBYywwREFFQyxFQUFFLENBQUMsZ0JBQWdCLHVIQUlDLEVBQUUsQ0FBQyxjQUFjLHdEQUMvQixFQUFFLENBQUMsZ0JBQWdCLHVKQUtoQixFQUFFLENBQUMsVUFBVSw0REFDWixFQUFFLENBQUMsY0FBYyw4REFDZixFQUFFLENBQUMsY0FBYywrRkFJdkMsRUFBRSxDQUFDLGNBQWMscUJBRWhDLENBQUM7QUFDSixDQUFDO0FBRUQscUJBQXFCLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLG1CQUFtQixDQUFDLENBQUM7QUFDdEUscUJBQXFCLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLG1CQUFtQixDQUFDLENBQUM7QUFFckUsbUJBQW1CLEVBQUUsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL21hdGhfc3BlLy4vc3JjL2NsYXNzZXMvQmluYXJ5SGVscGVyLnRzIiwid2VicGFjazovL21hdGhfc3BlLy4vc3JjL2NsYXNzZXMvQmluYXJ5RmxvYXQudHMiLCJ3ZWJwYWNrOi8vbWF0aF9zcGUvLi9zcmMvQU4yMDIyX0xhYm8xX0VxMl9iZl9jb252ZXJ0ZXIudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIExhYm86IDAgKEJpbmFyeSBvcGVyYXRpb25zKVxyXG4gKiBBdXRob3JzOiBPd2VuIEdvbWJhcywgRGF2aWQgRGFybWFuZ2VyLCBKdWxpZW4gVmF1Y2hlciwgQ2zDqW1lbnQgUGV0aWduYXRcclxuICogVGVhbTogMlxyXG4gKiBTY2hvb2w6IEhFLUFyY1xyXG4gKiBEYXRlOiAyMSBtYXJzIDIwMjJcclxuICogQ291cnNlOiBNYXRow6ltYXRpcXVlcyBzcMOpY2lmaXF1ZXMgKE1vZHVsZSAyMjM0KSAtIE0uIFN0w6lwaGFuZSBHb2Jyb25cclxuICovXHJcblxyXG4vKipcclxuICogUGVyZm9ybXMgYmFzaWMgb3BlcmF0aW9ucyBvbiBiaW5hcnkgbnVtYmVyc1xyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEJpbmFyeUhlbHBlciB7XHJcbiAgLyoqXHJcbiAgICogR2V0IG4gYml0IG9mIDAgb3IgMVxyXG4gICAqIEBwYXJhbSB2YWx1ZSAxIG9yIDBcclxuICAgKiBAcGFyYW0gbiBUaGUgbnVtYmVyIG9mIGJpdHMgdG8gcmV0cmlldmVcclxuICAgKiBAcmV0dXJucyBuIGJpdCBvZiAwIG9yIDFcclxuICAgKi9cclxuICBwdWJsaWMgZ2V0TkJpdCh2YWx1ZTogMSB8IDAsIG46IG51bWJlcik6IHN0cmluZyB7XHJcbiAgICBsZXQgcmVzID0gXCJcIjtcclxuICAgIFxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuOyBpKyspIHtcclxuICAgICAgcmVzICs9IHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiByZXM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBZGQgbiB6ZXJvcyBiZWZvcmUgdGhlIGJpbmFyeSBudW1iZXJcclxuICAgKiBAcGFyYW0gbiBUaGUgbnVtYmVyIG9mIDAgdG8gYWRkIGJlZm9yZSB0aGUgYmluYXJ5IG51bWJlclxyXG4gICAqIEBwYXJhbSBiIFRoZSBiaW5hcnkgbnVtYmVyXHJcbiAgICogQHJldHVybnMgVGhlIGJpbmFyeSBudW1iZXIgd2l0aCBuIHplcm9zIGJlZm9yZVxyXG4gICAqL1xyXG4gIHB1YmxpYyBhZGRQYWRkaW5nKG46IG51bWJlciwgYiA9IFwiXCIpIHtcclxuICAgIGNvbnN0IHNpemUgPSBuIC0gYi5sZW5ndGg7XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaXplOyBpKyspIHtcclxuICAgICAgYiA9IFwiMFwiICsgYjtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gYjtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJlbW92ZXMgdGhlIHplcm9zIGJlZm9yZSBhIGJpbmFyeSBudW1iZXIgKDAwMDEwMSBiZWNvbWVzIDEwMSlcclxuICAgKiBAcGFyYW0gYiBUaGUgYmluYXJ5IG51bWJlclxyXG4gICAqIEByZXR1cm5zIFRoZSBwcm9kdWNlZCBiaW5hcnkgbnVtYmVyXHJcbiAgICovXHJcbiAgcHVibGljIGNsZWFuKGI6IHN0cmluZykge1xyXG4gICAgbGV0IHJlcyA9IGI7XHJcblxyXG4gICAgZm9yKGxldCBpID0gMDsgaSA8IGIubGVuZ3RoOyBpKyspIHtcclxuICAgICAgaWYgKGJbaV0gPT09IFwiMFwiKSB7XHJcbiAgICAgICAgcmVzID0gcmVzLnN1YnN0cmluZygxKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm4gcmVzO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHJlcyA9PT0gXCJcIikge1xyXG4gICAgICByZXR1cm4gXCIwXCI7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuXHJcbiAgLyoqXHJcbiAgICogQWRkIDAgcGFkZGluZyB0byB0aGUgc21hbGxlc3QgYmluYXJ5IG51bWJlciB0byBtYXRjaCB0aGUgbG9uZ2VzdCBvbmUncyBsZW5ndGhcclxuICAgKiBbMTAxLCAxMTAwMV0gYmVjb21lcyBbMDAxMDEsIDExMDAxXVxyXG4gICAqIEBwYXJhbSBiMSBUaGUgZmlyc3QgYmluYXJ5IG51bWJlclxyXG4gICAqIEBwYXJhbSBiMiBUaGUgc2Vjb25kIGJpbmFyeSBudW1iZXJcclxuICAgKiBAcmV0dXJucyBbYjEsIGIyXSB3aXRoIGNvcnJlY3QgcGFkZGluZ1xyXG4gICAqL1xyXG4gIHB1YmxpYyBhZGRNYXhQYWRkaW5nKGIxOiBzdHJpbmcsIGIyOiBzdHJpbmcpIHtcclxuICAgIGlmIChiMi5sZW5ndGggPiBiMS5sZW5ndGgpIHtcclxuICAgICAgYjEgPSB0aGlzLmFkZFBhZGRpbmcoYjIubGVuZ3RoLCBiMSk7XHJcbiAgICB9IGVsc2UgaWYgKGIxLmxlbmd0aCA+IGIyLmxlbmd0aCkge1xyXG4gICAgICBiMiA9IHRoaXMuYWRkUGFkZGluZyhiMS5sZW5ndGgsIGIyKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gW2IxLCBiMl07XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXQgdGhlIG1heCBsZW5ndGggb2YgdHdvIGJpbmFyaWVzIG51bWJlcnNcclxuICAgKiBAcGFyYW0gYjEgVGhlIGZpcnN0IGJpbmFyeSBudW1iZXJcclxuICAgKiBAcGFyYW0gYjIgVGhlIHNlY29uZCBiaW5hcnkgbnVtYmVyXHJcbiAgICogQHJldHVybnMgVGhlIG1heCBsZW5ndGhcclxuICAgKi9cclxuICBwdWJsaWMgZ2V0TWF4TGVuZ3RoKGIxOiBzdHJpbmcsIGIyOiBzdHJpbmcpIHtcclxuICAgIGlmIChiMS5sZW5ndGggPiBiMi5sZW5ndGgpIHtcclxuICAgICAgcmV0dXJuIGIxLmxlbmd0aDtcclxuICAgIH1cclxuICAgIHJldHVybiBiMi5sZW5ndGg7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDb252ZXJ0IGEgbnVtYmVyIHRvIGl0J3MgYmluYXJ5IHJlcHJlc2VudGF0aW9uXHJcbiAgICogQHBhcmFtIGRlY2ltYWwgVGhlIFxyXG4gICAqIEByZXR1cm5zIFRoZSBiaW5hcnkgcmVwcmVzZW50YXRpb24gb2YgdGhlIGRlY2ltYWwgbnVtYmVyXHJcbiAgICovXHJcbiAgcHVibGljIGRlY2ltYWxUb0JpbmFyeShkZWNpbWFsOiBudW1iZXIpIHtcclxuICAgIGNvbnN0IG9yaWdpbmFsTnVtYmVyID0gZGVjaW1hbDtcclxuICAgIGxldCBiaW5hcnlOdW1iZXIgPSAoTWF0aC5hYnMoZGVjaW1hbCkgPj4+IDApLnRvU3RyaW5nKDIpO1xyXG5cclxuICAgIGlmIChvcmlnaW5hbE51bWJlciA8IDApIHtcclxuICAgICAgYmluYXJ5TnVtYmVyID0gdGhpcy5jMihiaW5hcnlOdW1iZXIpLnJldmVyc2UoKS5qb2luKFwiXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBiaW5hcnlOdW1iZXI7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDb252ZXJ0IGEgYmluYXJ5IHJlcHJlc2VudGF0aW9uIG9mIGEgbnVtYmVyIHRvIGEgZGVjaW1hbCBudW1iZXJcclxuICAgKiBAcGFyYW0gYmluYXJ5IFRoZSBiaW5hcnkgcmVwcmVzZW50YXRpb24gb2YgYSBudW1iZXJcclxuICAgKiBAcmV0dXJucyBUaGUgaW50IHJlcHJlc2VudGF0aW9uIG9mIGEgYmluYXJ5IG51bWJlclxyXG4gICAqL1xyXG4gIHB1YmxpYyBiaW5hcnlUb0RlY2ltYWwoYmluYXJ5OiBzdHJpbmcpIHtcclxuICAgIHJldHVybiBwYXJzZUludChiaW5hcnksIDIpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQWRkIGludCB0byBhIGJpbmFyeSBudW1iZXJcclxuICAgKiBAcGFyYW0gYiBUaGUgYmluYXJ5IG51bWJlclxyXG4gICAqIEBwYXJhbSBuIFRoZSBpbnQgbnVtYmVyIHRvIGFkZCB0byB0aGUgYmluYXJ5IG51bWJlclxyXG4gICAqIEByZXR1cm5zIFRoZSBwcm9kdWNlZCByZXN1bHRcclxuICAgKi9cclxuICBwdWJsaWMgYWRkTnVtYmVyVG9CaW5hcnkoYjogc3RyaW5nLCBuOiBudW1iZXIpOiBzdHJpbmdbXSB7XHJcbiAgICByZXR1cm4gdGhpcy5iaW5hcnlBZGRpdGlvbihiLCB0aGlzLmRlY2ltYWxUb0JpbmFyeShuKSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBJbnZlcnQgYSBiaW5hcnkgbnVtYmVyXHJcbiAgICogQHBhcmFtIGIgVGhlIGJpbmFyeSBudW1iZXIgdG8gaW52ZXJ0XHJcbiAgICogQHJldHVybnMgVGhlIGludmVydCBiaW5hcnkgbnVtYmVyXHJcbiAgICovXHJcbiAgcHVibGljIGludmVydChiOiBzdHJpbmcpIHtcclxuICAgIGNvbnN0IGluaXRpYWxMZW5ndGggPSBiLmxlbmd0aDtcclxuICAgIGIgPSB0aGlzLmRlY2ltYWxUb0JpbmFyeSh0aGlzLmJpbmFyeVRvRGVjaW1hbChiKSBeIHRoaXMuYmluYXJ5VG9EZWNpbWFsKHRoaXMuZ2V0TkJpdCgxLCBiLmxlbmd0aCkpKTtcclxuICAgIGIgPSB0aGlzLmFkZFBhZGRpbmcoaW5pdGlhbExlbmd0aCwgYik7XHJcbiAgICByZXR1cm4gYjtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNoaWZ0IHRoZSBiaW5hcnkgbnVtYmVyIHRvIHRoZSByaWdodFxyXG4gICAqIEBwYXJhbSBiIFRoZSBiaW5hcnkgbnVtYmVyXHJcbiAgICogQHBhcmFtIHNoaWZ0VmFsdWUgVGhlIHNoaWZ0IHZhbHVlXHJcbiAgICogQHJldHVybnMgVGhlIHNoaWZ0ZWQgYmluYXJ5IG51bWJlclxyXG4gICAqL1xyXG4gIHB1YmxpYyBzaGlmdFJpZ2h0KGI6IHN0cmluZywgc2hpZnRWYWx1ZTogbnVtYmVyKSB7XHJcbiAgICAvLyBcIjAwMDAwMTAxMFwiID4+IDIgPT4gXCIwMDAwMDAwMTBcIlxyXG4gICAgLy8gMS4gUmVtb3ZlcyBsYXN0cyA8c2hpZnRWYWx1ZT4gYml0c1xyXG4gICAgLy8gMi4gUGxhY2VzIDxzaGlmdFZhbHVlPiBiaXRzIGF0IDAgYmVmb3JlXHJcblxyXG4gICAgaWYgKHNoaWZ0VmFsdWUgPCAxKSB7XHJcbiAgICAgIHJldHVybiBiO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCByZXMgPSBiO1xyXG4gICAgcmVzID0gcmVzLnNsaWNlKDAsIC1zaGlmdFZhbHVlKTtcclxuICAgIHJlcyA9IFwiXCIucGFkU3RhcnQoc2hpZnRWYWx1ZSwgXCIwXCIpICsgcmVzO1xyXG5cclxuICAgIHJldHVybiByZXM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTaGlmdCB0aGUgYmluYXJ5IG51bWJlciB0byB0aGUgbGVmdFxyXG4gICAqIEBwYXJhbSBiIFRoZSBiaW5hcnkgbnVtYmVyXHJcbiAgICogQHBhcmFtIHNoaWZ0VmFsdWUgVGhlIHNoaWZ0IHZhbHVlXHJcbiAgICogQHJldHVybnMgVGhlIHNoaWZ0ZWQgYmluYXJ5IG51bWJlclxyXG4gICAqL1xyXG4gIHB1YmxpYyBzaGlmdExlZnQoYjogc3RyaW5nLCBzaGlmdFZhbHVlOiBudW1iZXIpIHtcclxuICAgIC8vIFwiMDAwMDAxMDEwXCIgPDwgMiA9PiBcIjAwMDAwMTAxMDAwXCJcclxuICAgIC8vIDEuIFJlbW92ZXMgbGFzdHMgPHNoaWZ0VmFsdWU+IGJpdHNcclxuICAgIC8vIDIuIFBsYWNlcyA8c2hpZnRWYWx1ZT4gYml0cyBhdCAwIGJlZm9yZVxyXG5cclxuICAgIGlmIChzaGlmdFZhbHVlIDwgMSkge1xyXG4gICAgICByZXR1cm4gYjtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgcmVzID0gYjtcclxuICAgIHJlcyA9IHJlcy5zbGljZShzaGlmdFZhbHVlKTtcclxuICAgIHJlcyArPSBcIlwiLnBhZEVuZChzaGlmdFZhbHVlLCBcIjBcIik7XHJcblxyXG4gICAgcmV0dXJuIHJlcztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEFkZCAyIGJpdCB0b2dldGhlciB3aXRoIHRoZSBjYXJyeVxyXG4gICAqIEBwYXJhbSB4IFRoZSBmaXJzdCBiaXRcclxuICAgKiBAcGFyYW0geSBUaGUgc2Vjb25kIGJpdFxyXG4gICAqIEBwYXJhbSBjYXJyeSBUaGUgY2FycnlcclxuICAgKiBAcmV0dXJucyBUaGUgcmVzdWx0IHdpdGggdGhlIGNhcnJ5IFtiaXQsIGNhcnJ5XVxyXG4gICAqL1xyXG4gIHB1YmxpYyBlbGVtZW50YXJ5QWRkaXRpb24oeDogc3RyaW5nLCB5OiBzdHJpbmcsIGNhcnJ5ID0gXCJcIik6IHN0cmluZ1tdIHtcclxuICAgIGNvbnN0IHJlcyA9IE51bWJlcih4KSArIE51bWJlcih5KSArIE51bWJlcihjYXJyeSk7XHJcblxyXG4gICAgc3dpdGNoIChyZXMpIHtcclxuICAgICAgLy8gYyA9IDEsIHggPSAxLCB5ID0gMVxyXG4gICAgICBjYXNlIDM6XHJcbiAgICAgICAgcmV0dXJuIFtcIjFcIiwgXCIxXCJdO1xyXG4gICAgICBjYXNlIDI6XHJcbiAgICAgICAgcmV0dXJuIFtcIjBcIiwgXCIxXCJdO1xyXG4gICAgICBjYXNlIDE6XHJcbiAgICAgICAgcmV0dXJuIFtcIjFcIiwgXCJcIl07XHJcbiAgICAgIC8vIGMgPSAwLCB4ID0gMCwgeSA9IDBcclxuICAgICAgY2FzZSAwOlxyXG4gICAgICAgIHJldHVybiBbXCIwXCIsIFwiXCJdO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQWRkIDIgYmluYXJ5IG51bWJlcnNcclxuICAgKiBAcGFyYW0gYjEgVGhlIGZpcnN0IGJpbmFyeSBudW1iZXJcclxuICAgKiBAcGFyYW0gYjIgVGhlIHNlY29uZCBiaW5hcnkgbnVtYmVyXHJcbiAgICogQHJldHVybnMgVGhlIHJlc3VsdCBvZiB0aGUgYWRkaXRpb24gW2JpbmFyeU51bWJlciwgY2FycnlCaXRdXHJcbiAgICovXHJcbiAgcHVibGljIGJpbmFyeUFkZGl0aW9uKGIxOiBzdHJpbmcsIGIyOiBzdHJpbmcpIHtcclxuICAgIGxldCByZXMgPSBcIlwiO1xyXG4gICAgbGV0IGNhcnJ5ID0gXCJcIjtcclxuICAgIGNvbnN0IFticDEsIGJwMl0gPSB0aGlzLmFkZE1heFBhZGRpbmcoYjEsIGIyKTtcclxuXHJcbiAgICBmb3IgKGxldCBpID0gYnAxLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XHJcbiAgICAgIGNvbnN0IFtyLCBjXSA9IHRoaXMuZWxlbWVudGFyeUFkZGl0aW9uKGJwMVtpXSwgYnAyW2ldLCBjYXJyeSk7XHJcbiAgICAgIHJlcyA9IHIgKyByZXM7XHJcbiAgICAgIGNhcnJ5ID0gYztcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gW3JlcywgY2FycnldO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU3Vic3RyYWN0IDIgYmluYXJ5IG51bWJlcnNcclxuICAgKiBAcGFyYW0gYjEgVGhlIGZpcnN0IGJpbmFyeSBudW1iZXJcclxuICAgKiBAcGFyYW0gYjIgVGhlIHNlY29uZCBiaW5hcnkgbnVtYmVyXHJcbiAgICogQHJldHVybnMgVGhlIHJlc3VsdCBvZiB0aGUgc3Vic3RyYWN0aW9uIFtiaW5hcnlOdW1iZXIsIGNhcnJ5Qml0XVxyXG4gICAqL1xyXG4gIHB1YmxpYyBiaW5hcnlTdWJzdHJhY3Rpb24oYjE6IHN0cmluZywgYjI6IHN0cmluZykge1xyXG4gICAgY29uc3QgW2JwMSwgYnAyXSA9IHRoaXMuYWRkTWF4UGFkZGluZyhiMSwgYjIpO1xyXG4gICAgcmV0dXJuIHRoaXMuYmluYXJ5QWRkaXRpb24oYnAxLCB0aGlzLmMyKGJwMikucmV2ZXJzZSgpLmpvaW4oXCJcIikpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUGVyZm9ybSBhIDIncyBjb21wbGVtZW50IG9wZXJhdGlvbiB3aXRob3V0IHRoZSBjYXJyeVxyXG4gICAqIEBwYXJhbSBiIFRoZSBiaW5hcnkgbnVtYmVyXHJcbiAgICogQHJldHVybnMgVGhlIDIncyBjb21wbGVtZW50IG9mIHRoZSBiaW5hcnkgbnVtYmVyIFtiaW5hcnlOdW1iZXIsIGNhcnJ5XVxyXG4gICAqL1xyXG4gIHB1YmxpYyBjMihiOiBzdHJpbmcpOiBzdHJpbmdbXSB7XHJcbiAgICBiID0gdGhpcy5pbnZlcnQoYik7XHJcbiAgICByZXR1cm4gdGhpcy5hZGROdW1iZXJUb0JpbmFyeShiLCAxKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIE11bHRpcGx5IDIgYmluYXJ5IG51bWJlcnNcclxuICAgKiBAcGFyYW0gYjEgVGhlIGZpcnN0IGJpbmFyeSBudW1iZXJcclxuICAgKiBAcGFyYW0gYjIgVGhlIHNlY29uZCBiaW5hcnkgbnVtYmVyXHJcbiAgICogQHJldHVybnMgVGhlIHJlc3VsdCBvZiB0aGUgbXVsdGlwbGljYXRpb25cclxuICAgKi9cclxuICBwdWJsaWMgYmluYXJ5TXVsdGlwbGljYXRpb24oYjE6IHN0cmluZywgYjI6IHN0cmluZykge1xyXG4gICAgbGV0IHJlcyA9IFwiXCI7XHJcbiAgICBjb25zdCBhZGRSZXN1bHRzID0gW107XHJcblxyXG4gICAgLy8gVGhlIGJpbmFyeSBudW1iZXJzIHRvIG11bGl0cGx5XHJcbiAgICAvLyBicDEgPSAxMDExXHJcbiAgICAvLyBicDIgPSAxMTExXHJcbiAgICBjb25zdCBbYnAxLCBicDJdID0gdGhpcy5hZGRNYXhQYWRkaW5nKGIxLCBiMik7XHJcblxyXG4gICAgLy8gQ2FsY3VsYXRlIHRoZSBvcGVyYW5kc1xyXG4gICAgLy8gYWRkUmVzdWx0cyA9IFtcclxuICAgIC8vICAgIDAwMDAgMTAxMSxcclxuICAgIC8vICAgIDAwMDEgMDExMCxcclxuICAgIC8vICAgIDAwMTAgMTEwMCxcclxuICAgIC8vICAgIDEwMTEgMDAwMFxyXG4gICAgLy8gXVxyXG4gICAgZm9yIChsZXQgaSA9IGJwMS5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xyXG4gICAgICBsZXQgY3VycmVudFJlcyA9IFwiXCI7XHJcblxyXG4gICAgICBmb3IgKGxldCBqID0gYnAxLmxlbmd0aCAtIDE7IGogPj0gMDsgai0tKSB7XHJcbiAgICAgICAgY3VycmVudFJlcyA9IChOdW1iZXIoYnAxW2pdKSAqIE51bWJlcihicDJbaV0pKSArIGN1cnJlbnRSZXM7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnN0IGRlYyA9IHRoaXMuYmluYXJ5VG9EZWNpbWFsKGN1cnJlbnRSZXMpIDw8IChicDEubGVuZ3RoIC0gMSAtIGkpO1xyXG4gICAgICBjdXJyZW50UmVzID0gdGhpcy5kZWNpbWFsVG9CaW5hcnkoZGVjKTtcclxuICAgICAgYWRkUmVzdWx0cy5wdXNoKGN1cnJlbnRSZXMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEFkZCBldmVyeXRoaW5nXHJcbiAgICAvLyByZXMgPVxyXG4gICAgLy8gICAwMDAwIDEwMTEsXHJcbiAgICAvLyArIDAwMDEgMDExMCxcclxuICAgIC8vICsgMDAxMCAxMTAwLFxyXG4gICAgLy8gKyAxMDExIDAwMDBcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYWRkUmVzdWx0cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICBjb25zdCBhZGRSZXN1bHQgPSB0aGlzLmFkZFBhZGRpbmcoYWRkUmVzdWx0c1thZGRSZXN1bHRzLmxlbmd0aCAtIDFdLmxlbmd0aCwgYWRkUmVzdWx0c1tpXSk7XHJcbiAgICAgIGNvbnN0IFtyLCBjXSA9IHRoaXMuYmluYXJ5QWRkaXRpb24ocmVzLCBhZGRSZXN1bHQpO1xyXG4gICAgICByZXMgPSBjICsgcjtcclxuICAgIH1cclxuXHJcbiAgICAvLyByZXMgPSAxMDEwMDEwMVxyXG4gICAgcmV0dXJuIHJlcztcclxuICB9XHJcbn1cclxuIiwiLyoqXHJcbiAqIExhYm86IDEgKEZsb2F0IHRvIGJpbmFyeSBjb252ZXJzaW9uKVxyXG4gKiBBdXRob3JzOiBPd2VuIEdvbWJhcywgRGF2aWQgRGFybWFuZ2VyLCBKdWxpZW4gVmF1Y2hlciwgQ2zDqW1lbnQgUGV0aWduYXRcclxuICogVGVhbTogMlxyXG4gKiBTY2hvb2w6IEhFLUFyY1xyXG4gKiBEYXRlOiAyMSBtYXJzIDIwMjJcclxuICogQ291cnNlOiBNYXRow6ltYXRpcXVlcyBzcMOpY2lmaXF1ZXMgKE1vZHVsZSAyMjM0KSAtIE0uIFN0w6lwaGFuZSBHb2Jyb25cclxuICovXHJcblxyXG5pbXBvcnQgeyBCaW5hcnlIZWxwZXIgfSBmcm9tIFwiLi9CaW5hcnlIZWxwZXJcIjtcclxuXHJcbi8qKlxyXG4gKiBFbmNvZGUgYSBmbG9hdGluZyBudW1iZXIgd2l0aCBhIGNob29zZW4gYml0IHNpemUgYW5kIElFRUUgNzU0XHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgQmluYXJ5RmxvYXQge1xyXG4gIHByaXZhdGUgX2JpdHNTaXplID0gMzI7XHJcbiAgcHJpdmF0ZSBfbnVtYmVyID0gMDtcclxuICBwcml2YXRlIF9iaW5hcnlTaWduOiBcIjFcIiB8IFwiMFwiID0gXCIwXCI7XHJcbiAgcHJpdmF0ZSBfYmluYXJ5TWFudGlzc2EgPSBcIlwiO1xyXG4gIHByaXZhdGUgX292ZXJmbG93ID0gZmFsc2U7XHJcbiAgcHJpdmF0ZSBfbWFudGlzc2FEb3RQb3NpdGlvbiA9IDA7XHJcbiAgcHJpdmF0ZSBfYmluYXJ5RXhwb25lbnQgPSBcIlwiO1xyXG4gIHByaXZhdGUgX2JpYXMgPSAwO1xyXG4gIHByaXZhdGUgX2JoID0gbmV3IEJpbmFyeUhlbHBlcigpO1xyXG4gIHByaXZhdGUgc3RhdGljIF9taW5CaXRTaXplID0gODtcclxuXHJcbiAgY29uc3RydWN0b3IobnVtYmVyT3JCaW5hcnk6IHN0cmluZyk7XHJcbiAgY29uc3RydWN0b3IobnVtYmVyT3JCaW5hcnk6IG51bWJlcik7XHJcbiAgY29uc3RydWN0b3IobnVtYmVyT3JCaW5hcnk6IG51bWJlciwgYml0c1NpemU6IG51bWJlcik7XHJcbiAgY29uc3RydWN0b3IobnVtYmVyT3JCaW5hcnk6IG51bWJlciB8IHN0cmluZywgYml0c1NpemU/OiBudW1iZXIpIHtcclxuICAgIGlmICh0eXBlb2YgbnVtYmVyT3JCaW5hcnkgPT09IFwic3RyaW5nXCIpIHtcclxuICAgICAgLy8gUmVtb3ZlIHRoZSBzcGFjZXMgaW4gdGhlIHN0cmluZ1xyXG4gICAgICBudW1iZXJPckJpbmFyeSA9IG51bWJlck9yQmluYXJ5LnRyaW0oKTtcclxuICAgICAgbnVtYmVyT3JCaW5hcnkgPSBudW1iZXJPckJpbmFyeS5yZXBsYWNlKC9cXHMvZywgXCJcIik7XHJcbiAgICAgIHRoaXMuYml0c1NpemUgPSBudW1iZXJPckJpbmFyeS5sZW5ndGg7XHJcbiAgICAgIHRoaXMubnVtYmVyID0gMTtcclxuXHJcbiAgICAgIC8vIFNsaWNlIHRoZSBzdHJpbmcgdG8gYXNzaWduIHRoZSBiaW5hcnkgbnVtYmVyIHRvIHRoZSBjb3JyZWN0IHBhcnQgb2YgdGhlIGJpbmFyeSByZXByZXNlbnRhdGlvbiBvZiB0aGUgZmxvYXRcclxuICAgICAgdGhpcy5iaW5hcnlTaWduID0gbnVtYmVyT3JCaW5hcnlbMF0gYXMgXCIwXCIgfCBcIjFcIjtcclxuICAgICAgdGhpcy5iaW5hcnlFeHBvbmVudCA9IG51bWJlck9yQmluYXJ5LnNsaWNlKDEsIHRoaXMuZXhwb25lbnRCaXRzU2l6ZSArIDEpO1xyXG4gICAgICB0aGlzLmJpbmFyeU1hbnRpc3NhID0gbnVtYmVyT3JCaW5hcnkuc2xpY2UodGhpcy5leHBvbmVudEJpdHNTaXplICsgMSwgdGhpcy5iaXRzU2l6ZSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmJpdHNTaXplID0gYml0c1NpemU7XHJcbiAgICAgIHRoaXMubnVtYmVyID0gbnVtYmVyT3JCaW5hcnk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXQgdGhlIGluZmluaXR5IGJpbmFyeSByZXByZXNlbnRhdGlvblxyXG4gICAqIEBwYXJhbSBiaXRzU2l6ZSBUaGUgYml0IHNpemUgb2YgdGhlIG51bWJlclxyXG4gICAqIEByZXR1cm5zIFRoZSBpbmZpbml0eSBiaW5hcnkgcmVwcmVzZW50YXRpb25cclxuICAgKi9cclxuICBzdGF0aWMgZ2V0SW5maW5pdHkoYml0c1NpemU6IG51bWJlcikge1xyXG4gICAgcmV0dXJuIG5ldyBCaW5hcnlGbG9hdChJbmZpbml0eSwgYml0c1NpemUpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IHRoZSBOYU4gYmluYXJ5IHJlcHJlc2VudGF0aW9uXHJcbiAgICogQHBhcmFtIGJpdHNTaXplIFRoZSBiaXQgc2l6ZSBvZiB0aGUgbnVtYmVyXHJcbiAgICogQHJldHVybnMgVGhlIE5hTiBiaW5hcnkgcmVwcmVzZW50YXRpb25cclxuICAgKi9cclxuICBzdGF0aWMgZ2V0TmFOKGJpdHNTaXplOiBudW1iZXIpIHtcclxuICAgIHJldHVybiBuZXcgQmluYXJ5RmxvYXQoTmFOLCBiaXRzU2l6ZSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXQgdGhlIHplcm8gYmluYXJ5IHJlcHJlc2VudGF0aW9uXHJcbiAgICogQHBhcmFtIGJpdHNTaXplIFRoZSBiaXQgc2l6ZSBvZiB0aGUgbnVtYmVyXHJcbiAgICogQHJldHVybnMgVGhlIHplcm8gYmluYXJ5IHJlcHJlc2VudGF0aW9uXHJcbiAgICovXHJcbiAgc3RhdGljIGdldFplcm8oYml0c1NpemU6IG51bWJlcikge1xyXG4gICAgcmV0dXJuIG5ldyBCaW5hcnlGbG9hdCgwLCBiaXRzU2l6ZSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBUaGUgZmxvYXQgbnVtYmVyIHRvIGVuY29kZSB3aXRoIElFRUUgNzU0XHJcbiAgICovXHJcbiAgZ2V0IG51bWJlcigpIHtcclxuICAgIHJldHVybiB0aGlzLl9udW1iZXI7XHJcbiAgfVxyXG5cclxuICBzZXQgbnVtYmVyKHZhbHVlOiBudW1iZXIpIHtcclxuICAgIHRoaXMuX251bWJlciA9IHZhbHVlO1xyXG5cclxuICAgIHRoaXMuY2FsY3VsYXRlKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBUaGUgYml0cyBzaXplIHRvIGNvZGUgdGhlIG51bWJlclxyXG4gICAqL1xyXG4gIGdldCBiaXRzU2l6ZSgpIHtcclxuICAgIHJldHVybiB0aGlzLl9iaXRzU2l6ZTtcclxuICB9XHJcblxyXG4gIHNldCBiaXRzU2l6ZSh2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICB0aGlzLl9iaXRzU2l6ZSA9IHZhbHVlO1xyXG5cclxuICAgIGlmICh2YWx1ZSA8IEJpbmFyeUZsb2F0Ll9taW5CaXRTaXplKSB7XHJcbiAgICAgIHRoaXMuX2JpdHNTaXplID0gQmluYXJ5RmxvYXQuX21pbkJpdFNpemU7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBUaGUgbWFudGlzc2EgYml0cyBzaXplXHJcbiAgICovXHJcbiAgZ2V0IG1hbnRpc3NhQml0c1NpemUoKSB7XHJcbiAgICBpZiAodGhpcy5iaXRzU2l6ZSA8IDgpIHtcclxuICAgICAgcmV0dXJuIDA7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRoaXMuYml0c1NpemUgLSB0aGlzLmV4cG9uZW50Qml0c1NpemUgLSAxO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IHRoZSBleHBvbmVudCBiaXRzIHNpemUgd2l0aDpcclxuICAgKiAtIFRoZSBJRUVFIDc1NCAyMDE5IGZvcm11bGEgaWYgdGhlIGJpdHMgc2l6ZSBpcyBncmVhdGVyIG9yIGVxdWFsIHRvIDEyOFxyXG4gICAqIC0gQSBjdXN0b20gZm9ybXVsYSBpZiB0aGUgYml0IHNpemUgaXMgbGVzcyB0aGFuIDEyOCB0aGF0IG1hdGNoZXMgdGhlIElFRUUgc3RhbmRhcmRcclxuICAgKiBcclxuICAgKiBWaXN1YWxpemUgdGhlIGZ1bmN0aW9uIG9uIGdlb2dlYnJhOlxyXG4gICAqIGh0dHBzOi8vd3d3Lmdlb2dlYnJhLm9yZy9jYWxjdWxhdG9yL2NlcnJrZGZ2XHJcbiAgICovXHJcbiAgZ2V0IGV4cG9uZW50Qml0c1NpemUoKSB7XHJcbiAgICBpZiAodGhpcy5iaXRzU2l6ZSA8IDgpIHtcclxuICAgICAgcmV0dXJuIDA7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gSUVFRSA3NTQgMjAxOSBmb3JtdWxhID49IDEyOFxyXG4gICAgaWYgKHRoaXMuYml0c1NpemUgPj0gMTI4KSB7XHJcbiAgICAgIHJldHVybiBNYXRoLnJvdW5kKDQgKiBNYXRoLmxvZzIodGhpcy5iaXRzU2l6ZSkpIC0gMTM7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQSBmb3JtdWxhIHRoYXQgbWF0Y2hlcyB0aGUgdmFsdWVzIGZvciA8IDEyOFxyXG4gICAgLy8gcmVmOiBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL2EvNjI2MzIyNjBcclxuICAgIHJldHVybiBNYXRoLnJvdW5kKChNYXRoLmxvZzIodGhpcy5iaXRzU2l6ZSkgLSAxKSAqKiAoMyAvIDIpKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBhYnNvbHV0ZSB2YWx1ZSBvZiB0aGUgb3JpZ2luYWwgbnVtYmVyXHJcbiAgICovXHJcbiAgZ2V0IHBvc2l0aXZlTnVtYmVyKCkge1xyXG4gICAgcmV0dXJuIE1hdGguYWJzKHRoaXMubnVtYmVyKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENhbGN1bGF0ZSB0aGUgcG9zaXRpb24gb2YgdGhlIGRvdCBpbiB0aGUgbWFudGlzc2FcclxuICAgKiAgICAgICAgICAgICAgICAgICAgICBmbG9hdCBwb3NpdGlvblxyXG4gICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgIHxcclxuICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2XHJcbiAgICogbWFudGlzc2EoMTkuNTkzNzUpID0+IFwiMDAxMS4xMDAxMTAwMDAwMDAwMDAwMDAwXCJcclxuICAgKi9cclxuICBnZXQgbWFudGlzc2FEb3RQb3NpdGlvbigpIHtcclxuICAgIHJldHVybiB0aGlzLl9tYW50aXNzYURvdFBvc2l0aW9uO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmV0dXJuIHRoZSBiaWFzIG9mIHRoZSBudW1iZXIgYmFzZWQgb24gdGhlIGV4cG9uZW50IGJpdHMgc2l6ZVxyXG4gICAqIGIgPSAyIF4gKGV4cG9uZW50Qml0c1NpemUgLSAxKSAtIDFcclxuICAgKi9cclxuICBnZXQgYmlhcygpIHtcclxuICAgIHJldHVybiB0aGlzLl9iaWFzO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIGJpbmFyeSByZXByZXNlbnRhdGlvbiBvZiB0aGUgc2lnblxyXG4gICAqIDAgaWYgbnVtYmVyID49IDBcclxuICAgKiAxIGlmIG51bWJlciA8IDBcclxuICAgKi9cclxuICBnZXQgYmluYXJ5U2lnbigpOiBcIjBcIiB8IFwiMVwiIHtcclxuICAgIHJldHVybiB0aGlzLl9iaW5hcnlTaWduO1xyXG4gIH1cclxuXHJcbiAgc2V0IGJpbmFyeVNpZ24odmFsdWU6IFwiMFwiIHwgXCIxXCIpIHtcclxuICAgIHRoaXMuX2JpbmFyeVNpZ24gPSB2YWx1ZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBleHBvbmVudCBvZiB0aGUgbnVtYmVyIGluIGJpbmFyeSB3aXRoIHRoZSBiaWFzXHJcbiAgICogbWFudGlzc2EoMTkuNTkzNzUpID0+IFwiMTAwMDAwMTBcIlxyXG4gICAqL1xyXG4gICBnZXQgYmluYXJ5RXhwb25lbnQoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fYmluYXJ5RXhwb25lbnQ7XHJcbiAgfVxyXG5cclxuICBzZXQgYmluYXJ5RXhwb25lbnQodmFsdWU6IHN0cmluZykge1xyXG4gICAgdGhpcy5fYmluYXJ5RXhwb25lbnQgPSB2YWx1ZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBmdWxsIG1hbnRpc3NhIG9mIHRoZSBudW1iZXJcclxuICAgKi9cclxuICBnZXQgYmluYXJ5TWFudGlzc2EoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fYmluYXJ5TWFudGlzc2E7XHJcbiAgfVxyXG5cclxuICBzZXQgYmluYXJ5TWFudGlzc2EodmFsdWU6IHN0cmluZykge1xyXG4gICAgdGhpcy5fYmluYXJ5TWFudGlzc2EgPSB2YWx1ZTtcclxuICAgIHRoaXMuX292ZXJmbG93ID0gdmFsdWUubGVuZ3RoID4gdGhpcy5tYW50aXNzYUJpdHNTaXplO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIGZ1bGwgbnVtYmVyIGNvZGVkIGluIGJpbmFyeSB3aXRoIElFRUUgNzU0XHJcbiAgICovXHJcbiAgZ2V0IGJpbmFyeUZsb2F0aW5nTnVtYmVyKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuYmluYXJ5U2lnbiArIHRoaXMuYmluYXJ5RXhwb25lbnQgKyB0aGlzLmJpbmFyeU1hbnRpc3NhO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIHNpZ24gaW4gaXQncyBkZWNpbWFsIGZvcm1cclxuICAgKi9cclxuICBnZXQgY29tcHV0ZWRTaWduKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuYmluYXJ5U2lnbiA9PT0gXCIxXCIgPyAtMSA6IDE7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBUaGUgZXhwb25lbnQgaW4gaXQncyBkZWNpbWFsIGZvcm1cclxuICAgKi9cclxuICBnZXQgY29tcHV0ZWRFeHBvbmVudCgpIHtcclxuICAgIHJldHVybiB0aGlzLl9iaC5iaW5hcnlUb0RlY2ltYWwodGhpcy5iaW5hcnlFeHBvbmVudCkgLSB0aGlzLmJpYXM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBUaGUgbWFudGlzc2EgaW4gaXQncyBkZWNpbWFsIGZvcm1cclxuICAgKi9cclxuICBnZXQgY29tcHV0ZWRNYW50aXNzYSgpIHtcclxuICAgIHJldHVybiB0aGlzLl9iaC5iaW5hcnlUb0RlY2ltYWwoXCIxXCIgKyB0aGlzLmJpbmFyeU1hbnRpc3NhKSAvIDIgKiogdGhpcy5tYW50aXNzYUJpdHNTaXplO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRGV0ZXJtaW5lIGlmIHRoZSBudW1iZXIgaXMgTmFOXHJcbiAgICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgbnVtYmVyIGlzIE5hTlxyXG4gICAqL1xyXG4gIGdldCBpc05hTigpIHtcclxuICAgIGNvbnN0IGlzTmFOQmluYXJ5ID0gKFxyXG4gICAgICB0aGlzLmJpbmFyeUV4cG9uZW50LmluZGV4T2YoXCIwXCIpID09PSAtMSAmJlxyXG4gICAgICB0aGlzLmJpbmFyeU1hbnRpc3NhLmluZGV4T2YoXCIwXCIpID09PSAtMSAmJlxyXG4gICAgICB0aGlzLmJpbmFyeVNpZ24gPT09IFwiMFwiXHJcbiAgICApO1xyXG5cclxuICAgIHJldHVybiBOdW1iZXIuaXNOYU4odGhpcy5udW1iZXIpIHx8IGlzTmFOQmluYXJ5O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRGV0ZXJtaW5lIGlmIHRoZSBudW1iZXIgaXMgcmVwcmVzZW50cyB0aGUgaW5maW5pdHlcclxuICAgKiBAcmV0dXJucyBUcnVlIGlmIHRoZSBudW1iZXIgaXMgSW5maW5pdHlcclxuICAgKi9cclxuICBnZXQgaXNJbmZpbml0eSgpIHtcclxuICAgIGNvbnN0IGlzSW5maW5pdHlCaW5hcnkgPSAoXHJcbiAgICAgIHRoaXMuYmluYXJ5RXhwb25lbnQuaW5kZXhPZihcIjBcIikgPT09IC0xICYmXHJcbiAgICAgIHRoaXMuYmluYXJ5TWFudGlzc2EuaW5kZXhPZihcIjFcIikgPT09IC0xICYmXHJcbiAgICAgIHRoaXMuYmluYXJ5U2lnbiA9PT0gXCIwXCJcclxuICAgICk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXMubnVtYmVyID09PSBJbmZpbml0eSB8fCBpc0luZmluaXR5QmluYXJ5O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRGV0ZXJtaW5lIGlmIHRoZSBudW1iZXIgaXMgemVyb1xyXG4gICAqIEByZXR1cm5zIFRydWUgaWYgdGhlIG51bWJlciBpcyB6ZXJvXHJcbiAgICovXHJcbiAgZ2V0IGlzWmVybygpIHtcclxuICAgIGNvbnN0IGlzWmVyb0JpbmFyeSA9IChcclxuICAgICAgdGhpcy5iaW5hcnlFeHBvbmVudC5pbmRleE9mKFwiMVwiKSA9PT0gLTEgJiZcclxuICAgICAgdGhpcy5iaW5hcnlNYW50aXNzYS5pbmRleE9mKFwiMVwiKSA9PT0gLTEgJiZcclxuICAgICAgdGhpcy5iaW5hcnlTaWduID09PSBcIjBcIlxyXG4gICAgKTtcclxuXHJcbiAgICByZXR1cm4gdGhpcy5udW1iZXIgPT09IDAgfHwgaXNaZXJvQmluYXJ5O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IHRoZSBhYnNvbHV0ZSB2YWx1ZSBvZiB0aGUgbnVtYmVyIGluIGJpbmFyeVxyXG4gICAqL1xyXG4gIGdldCBiaW5hcnlBYnMoKSB7XHJcbiAgICByZXR1cm4gXCIwXCIgKyB0aGlzLmJpbmFyeUV4cG9uZW50ICsgdGhpcy5iaW5hcnlNYW50aXNzYTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBudW1iZXIgdGhhdCBpcyBjb2RlZCBpbiBtZW1vcnlcclxuICAgKi9cclxuICBnZXQgY29tcHV0ZWROdW1iZXIoKSB7XHJcbiAgICBpZiAodGhpcy5pc1plcm8pIHtcclxuICAgICAgcmV0dXJuIDA7XHJcbiAgICB9IGVsc2UgaWYgKHRoaXMuaXNOYU4pIHtcclxuICAgICAgcmV0dXJuIE5hTjtcclxuICAgIH0gZWxzZSBpZiAodGhpcy5pc0luZmluaXR5KSB7XHJcbiAgICAgIHJldHVybiBJbmZpbml0eTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGhpcy5jb21wdXRlZFNpZ24gKiAyICoqIHRoaXMuY29tcHV0ZWRFeHBvbmVudCAqIHRoaXMuY29tcHV0ZWRNYW50aXNzYTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldCB0aGUgbWFyZ2luIG9mIGVycm9yXHJcbiAgICovXHJcbiAgZ2V0IG1hcmdpbk9mRXJyb3IoKSB7ICAgIFxyXG4gICAgaWYgKE51bWJlci5pc05hTih0aGlzLm51bWJlcikgfHwgdGhpcy5udW1iZXIgPT09IEluZmluaXR5IHx8IHRoaXMubnVtYmVyID09PSAwKSB7XHJcbiAgICAgIHJldHVybiAwO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBNYXRoLmFicyh0aGlzLm51bWJlciAtIHRoaXMuY29tcHV0ZWROdW1iZXIpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVHJ1ZSBpZiB0aGUgbnVtYmVyIGNhbm5vdCBiZSBlbmNvZGVkIGluIDxiaXRzU2l6ZT4gYml0c1xyXG4gICAqL1xyXG4gIGdldCBvdmVyZmxvdygpIHtcclxuICAgIHJldHVybiB0aGlzLl9vdmVyZmxvdztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENhbGN1bGF0ZTpcclxuICAgKiAtIEJpbmFyeSBzaWduXHJcbiAgICogLSBUaGUgYmlhc1xyXG4gICAqIC0gVGhlIGJpbmFyeSBtYW50aXNzYVxyXG4gICAqIC0gVGhlIGJpbmFyeSBleHBvbmVudFxyXG4gICAqL1xyXG4gIGNhbGN1bGF0ZSgpIHtcclxuICAgIHRoaXMuY2FsY3VsYXRlQmluYXJ5U2lnbigpO1xyXG4gICAgdGhpcy5jYWxjdWxhdGVCaWFzKCk7XHJcbiAgICB0aGlzLmNhbGN1bGF0ZUJpbmFyeU1hbnRpc3NhKCk7XHJcbiAgICB0aGlzLmNhbGN1bGF0ZUJpbmFyeUV4cG9uZW50KCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBEZXRlcm1pbmUgdGhlIGJpbmFyeSBzaWduIG9mIHRoZSBudW1iZXJcclxuICAgKi9cclxuICBjYWxjdWxhdGVCaW5hcnlTaWduKCkge1xyXG4gICAgdGhpcy5fYmluYXJ5U2lnbiA9IHRoaXMubnVtYmVyIDwgMCA/IFwiMVwiIDogXCIwXCI7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDYWxjdWxhdGUgdGhlIGV4cG9uZW50IGJpYXMgYmFzZWQgb24gdGhlIGV4cG9uZW50IGJpdCBzaXplXHJcbiAgICogYiA9IDIgXiAoZXhwb25lbnRCaXRzU2l6ZSAtIDEpIC0gMTtcclxuICAgKi9cclxuICBjYWxjdWxhdGVCaWFzKCkge1xyXG4gICAgdGhpcy5fYmlhcyA9IDIgKiogKHRoaXMuZXhwb25lbnRCaXRzU2l6ZSAtIDEpIC0gMTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIERldGVybWluZSB0aGUgYmluYXJ5IG1hbnRpc3NhIGFuZCBkZXRlcm1pbmUgdGhlIGRvdCBwb3NpdGlvbiBpbiB0aGUgbWFudGlzc2FcclxuICAgKi9cclxuICBjYWxjdWxhdGVCaW5hcnlNYW50aXNzYSgpIHtcclxuICAgIGlmIChOdW1iZXIuaXNOYU4odGhpcy5udW1iZXIpKSB7XHJcbiAgICAgIHRoaXMuX21hbnRpc3NhRG90UG9zaXRpb24gPSAwO1xyXG4gICAgICB0aGlzLl9iaW5hcnlNYW50aXNzYSA9IFwiXCIucGFkRW5kKHRoaXMubWFudGlzc2FCaXRzU2l6ZSwgXCIxXCIpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgLy8gR2V0IHRoZSBpbnRlZ2VyIHBhcnRcclxuICAgIGNvbnN0IGludGVnZXJQYXJ0ID0gTWF0aC50cnVuYyh0aGlzLnBvc2l0aXZlTnVtYmVyKTtcclxuXHJcbiAgICAvLyBHZXQgdGhlIGRlY2ltYWxzIG9mIHRoZSBudW1iZXI6IGRlY2ltYWxzID0gMTkuNTkzNzUgLSAxOSA9IDAuNTkzNzVcclxuICAgIGxldCBkZWNpbWFsc1BhcnQgPSB0aGlzLnBvc2l0aXZlTnVtYmVyIC0gTWF0aC50cnVuYyh0aGlzLnBvc2l0aXZlTnVtYmVyKTtcclxuXHJcbiAgICBjb25zdCBiaW5hcnlJbnRlZ2VyUGFydCA9IHRoaXMuX2JoLmRlY2ltYWxUb0JpbmFyeShpbnRlZ2VyUGFydCk7XHJcblxyXG4gICAgLy8gR2V0IHRoZSBudW1iZXIgb2YgYml0cyBkZWRpY2F0ZWQgdG8gc3RvcmUgdGhlIGRlY2ltYWxzIGluIHRoZSBtYW50aXNzYVxyXG4gICAgY29uc3QgZGVjaW1hbHNCaXRzU2l6ZSA9IHRoaXMubWFudGlzc2FCaXRzU2l6ZSAtIGJpbmFyeUludGVnZXJQYXJ0Lmxlbmd0aCAtIDE7XHJcbiAgICBcclxuICAgIGxldCBiaW5hcnlEZWNpbWFsc1BhcnQgPSBcIlwiO1xyXG4gICAgLy8gMC41OTM3NSAqIDIgPSAxLjE4NzUgID0+IDFcclxuICAgIC8vIDAuMTg3NSAgKiAyID0gMC4zNzUgICA9PiAwXHJcbiAgICAvLyAwLjM3NSAgICogMiA9IDAuNzUgICAgPT4gMFxyXG4gICAgLy8gMC43NSAgICAqIDIgPSAxLjUgICAgID0+IDFcclxuICAgIC8vIDAuNSAgICAgKiAyID0gMSAgICAgICA9PiAxXHJcbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgZGVjaW1hbHNCaXRzU2l6ZTsgaSsrKSB7XHJcbiAgICAgIGRlY2ltYWxzUGFydCAqPSAyO1xyXG5cclxuICAgICAgaWYgKGRlY2ltYWxzUGFydCA+PSAxKSB7XHJcbiAgICAgICAgZGVjaW1hbHNQYXJ0IC09IDE7XHJcbiAgICAgICAgYmluYXJ5RGVjaW1hbHNQYXJ0ICs9IFwiMVwiO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGJpbmFyeURlY2ltYWxzUGFydCArPSBcIjBcIjtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGxldCBiaW5hcnlNYW50aXNzYSA9IGJpbmFyeUludGVnZXJQYXJ0ICsgYmluYXJ5RGVjaW1hbHNQYXJ0O1xyXG5cclxuICAgIC8vIEdldCB0aGUgcG9zaXRpb24gb2YgdGhlIGZpcnN0IGJpdCBhdCAxLCBmb3Igb25seSBkZWNpbWFscyBudW1iZXJcclxuICAgIGxldCBtYW50aXNzYURvdFBvc2l0aW9uID0gLWJpbmFyeU1hbnRpc3NhLmluZGV4T2YoXCIxXCIpO1xyXG5cclxuICAgIC8vIFJlbW92ZSBhbGwgdGhlIGxlYWRpbmcgYml0IGF0IDAgZnJvbSB0aGUgbWFudGlzc2FcclxuICAgIGJpbmFyeU1hbnRpc3NhID0gdGhpcy5fYmguY2xlYW4oYmluYXJ5TWFudGlzc2EpO1xyXG5cclxuICAgIC8vIElmIHRoZSBwb3NpdGlvbiBvZiB0aGUgZmlyc3QgYml0IGF0IDEgaXMgMFxyXG4gICAgLy8gdGhlbiB0aGUgZG90IHBvc2l0aW9uIGlzIGVxdWFscyB0byB0aGUgbGVuZ3RoIG9mIHRoZSBiaW5hcnkgaW50ZWdlciBwYXJ0IG9mIHRoZSBtYW50aXNzYVxyXG4gICAgaWYgKG1hbnRpc3NhRG90UG9zaXRpb24gPT09IDApIHtcclxuICAgICAgbWFudGlzc2FEb3RQb3NpdGlvbiA9IGJpbmFyeUludGVnZXJQYXJ0Lmxlbmd0aCAtIDE7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gSGlkZSB0aGUgZmlyc3QgYml0IGF0IDFcclxuICAgIGJpbmFyeU1hbnRpc3NhID0gYmluYXJ5TWFudGlzc2Euc3Vic3RyaW5nKDEpO1xyXG5cclxuICAgIC8vIE1ha2Ugc3VyZSB0aGF0IHRoZSBtYW50aXNzYSBtYXRjaGVzIHRoZSBjb3JyZWN0IGxlbmd0aCAoMjMgZm9yIDMyIGJpdHMgZm9yIGV4YW1wbGUpXHJcbiAgICBiaW5hcnlNYW50aXNzYSA9IGJpbmFyeU1hbnRpc3NhLnBhZEVuZCh0aGlzLm1hbnRpc3NhQml0c1NpemUsIFwiMFwiKTtcclxuXHJcbiAgICB0aGlzLmJpbmFyeU1hbnRpc3NhID0gYmluYXJ5TWFudGlzc2E7XHJcbiAgICB0aGlzLl9tYW50aXNzYURvdFBvc2l0aW9uID0gbWFudGlzc2FEb3RQb3NpdGlvbjtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENhbGN1bGF0ZSB0aGUgZXhwb25lbnQgaW4gYmluYXJ5XHJcbiAgICogZSA9IGJpbmFyeShtYW50aXNzYUZsb2F0UG9zaXRpb24gKyBiaWFzKVxyXG4gICAqL1xyXG4gIGNhbGN1bGF0ZUJpbmFyeUV4cG9uZW50KCkge1xyXG4gICAgLy8gSWYgdGhlIG51bWJlciBpcyBOYU4gb3IgSW5maW5pdHkgdGhlbiBhbGwgdGhlIGJpdHMgb2YgdGhlIGV4cG9uZW50IGFyZSBlcXVhbHMgdG8gMVxyXG4gICAgaWYgKE51bWJlci5pc05hTih0aGlzLm51bWJlcikgfHwgdGhpcy5udW1iZXIgPT09IEluZmluaXR5KSB7XHJcbiAgICAgIHRoaXMuX2JpbmFyeUV4cG9uZW50ID0gXCJcIi5wYWRFbmQodGhpcy5leHBvbmVudEJpdHNTaXplLCBcIjFcIik7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgZXhwb25lbnQgPSB0aGlzLm1hbnRpc3NhRG90UG9zaXRpb24gKyB0aGlzLmJpYXM7XHJcblxyXG4gICAgLy8gSWYgdGhlIG51bWJlciBpcyAwIHRoZW4gYWxsIHRoZSBiaXRzIG9mIHRoZSBleHBvbmVudCBhcmUgZXF1YWxzIHRvIDBcclxuICAgIGlmICh0aGlzLm51bWJlciA9PT0gMCkge1xyXG4gICAgICBleHBvbmVudCA9IDA7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQ29udmVydCB0aGUgZXhwb25lbnQgdG8gYmluYXJ5IGFuZCBhZGQgbGVhZGluZyAwIHRvIG1hdGNoIHRoZSBleHBvbmVudCBiaXRzIHNpemVcclxuICAgIHRoaXMuX2JpbmFyeUV4cG9uZW50ID0gdGhpcy5fYmguZGVjaW1hbFRvQmluYXJ5KGV4cG9uZW50KS5wYWRTdGFydCh0aGlzLmV4cG9uZW50Qml0c1NpemUsIFwiMFwiKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEFkZCB0d28gYmluYXJ5IGZsb2F0IG51bWJlclxyXG4gICAqIEBwYXJhbSBiZjIgVGhlIGJpbmFyeSBmbG9hdCBudW1iZXIgdG8gYWRkXHJcbiAgICogQHJldHVybnMgVGhlIHJlc3VsdCBvZiB0aGUgYWRkaXRpb25cclxuICAgKi9cclxuICBhZGQoYmYyOiBCaW5hcnlGbG9hdCkge1xyXG4gICAgY29uc3QgYmZSZXMgPSBuZXcgQmluYXJ5RmxvYXQoMSwgdGhpcy5iaXRzU2l6ZSk7XHJcblxyXG4gICAgLy8gU3BlY2lhbCBjYXNlc1xyXG4gICAgaWYgKHRoaXMuaXNOYU4gfHwgYmYyLmlzTmFOKSB7XHJcbiAgICAgIHJldHVybiBCaW5hcnlGbG9hdC5nZXROYU4odGhpcy5iaXRzU2l6ZSk7XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5pc0luZmluaXR5IHx8IGJmMi5pc0luZmluaXR5KSB7XHJcbiAgICAgIHJldHVybiBCaW5hcnlGbG9hdC5nZXRJbmZpbml0eSh0aGlzLmJpdHNTaXplKTtcclxuICAgIH1cclxuICAgIGlmICh0aGlzLmJpbmFyeUFicyA9PT0gYmYyLmJpbmFyeUFicyAmJiB0aGlzLmJpbmFyeVNpZ24gIT09IGJmMi5iaW5hcnlTaWduKSB7XHJcbiAgICAgIHJldHVybiBCaW5hcnlGbG9hdC5nZXRaZXJvKHRoaXMuYml0c1NpemUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFN0ZXAgMTogRGV0ZXJtaW5lIHRoZSBsb3dlc3QgZXhwb25lbnQgYmV0d2VlbiB0aGlzIGFuZCB0aGUgc2Vjb25kIG51bWJlclxyXG4gICAgbGV0IGJmTWluQmluYXJ5RXhwb25lbnQ6IEJpbmFyeUZsb2F0ID0gdGhpcztcclxuICAgIGxldCBiZk1heEJpbmFyeUV4cG9uZW50OiBCaW5hcnlGbG9hdCA9IGJmMjtcclxuICAgIGlmICh0aGlzLl9iaC5iaW5hcnlUb0RlY2ltYWwoYmYyLmJpbmFyeUV4cG9uZW50KSA8IHRoaXMuX2JoLmJpbmFyeVRvRGVjaW1hbChiZk1pbkJpbmFyeUV4cG9uZW50LmJpbmFyeUV4cG9uZW50KSkge1xyXG4gICAgICBiZk1pbkJpbmFyeUV4cG9uZW50ID0gYmYyO1xyXG4gICAgICBiZk1heEJpbmFyeUV4cG9uZW50ID0gdGhpcztcclxuICAgIH1cclxuICAgIC8vIENvcHkgdGhlIG51bWJlciwgZG8gbm90IHNldCBieSByZWZlcmVuY2VcclxuICAgIGJmTWF4QmluYXJ5RXhwb25lbnQgPSBuZXcgQmluYXJ5RmxvYXQoYmZNYXhCaW5hcnlFeHBvbmVudC5jb21wdXRlZE51bWJlciwgdGhpcy5iaXRzU2l6ZSk7XHJcbiAgICBiZk1pbkJpbmFyeUV4cG9uZW50ID0gbmV3IEJpbmFyeUZsb2F0KGJmTWluQmluYXJ5RXhwb25lbnQuY29tcHV0ZWROdW1iZXIsIHRoaXMuYml0c1NpemUpO1xyXG5cclxuICAgIC8vIElmIHRoZXJlIGlzIGEgMCB0aGVuIHJldHVybiB0aGUgbm9uLXplcm8gbnVtYmVyXHJcbiAgICBpZiAoYmZNaW5CaW5hcnlFeHBvbmVudC5pc1plcm8pIHtcclxuICAgICAgcmV0dXJuIGJmTWF4QmluYXJ5RXhwb25lbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQWRkIHRoZSBoaWRkZW4gYml0XHJcbiAgICBiZk1pbkJpbmFyeUV4cG9uZW50LmJpbmFyeU1hbnRpc3NhID0gXCIxXCIgKyBiZk1pbkJpbmFyeUV4cG9uZW50LmJpbmFyeU1hbnRpc3NhO1xyXG4gICAgYmZNYXhCaW5hcnlFeHBvbmVudC5iaW5hcnlNYW50aXNzYSA9IFwiMVwiICsgYmZNYXhCaW5hcnlFeHBvbmVudC5iaW5hcnlNYW50aXNzYTtcclxuXHJcbiAgICAvLyBTdGVwIDI6IFNoaWZ0IHRoZSBtYW50aXNzYVxyXG4gICAgY29uc3Qgc2hpZnRWYWx1ZSA9IGJmTWF4QmluYXJ5RXhwb25lbnQuY29tcHV0ZWRFeHBvbmVudCAtIGJmTWluQmluYXJ5RXhwb25lbnQuY29tcHV0ZWRFeHBvbmVudDtcclxuICAgIGNvbnN0IHNoaWZ0ZWRNaW5NYW50aXNzYSA9IHRoaXMuX2JoLnNoaWZ0UmlnaHQoYmZNaW5CaW5hcnlFeHBvbmVudC5iaW5hcnlNYW50aXNzYSwgc2hpZnRWYWx1ZSk7XHJcbiAgICBiZk1pbkJpbmFyeUV4cG9uZW50LmJpbmFyeU1hbnRpc3NhID0gc2hpZnRlZE1pbk1hbnRpc3NhO1xyXG4gICAgXHJcbiAgICAvLyBTdGVwIDM6IFB1dCB0aGUgc2FtZSBleHBvbmVudFxyXG4gICAgYmZSZXMuYmluYXJ5RXhwb25lbnQgPSBiZk1heEJpbmFyeUV4cG9uZW50LmJpbmFyeUV4cG9uZW50O1xyXG5cclxuICAgIC8vIFN0ZXAgNDogMidzIGNvbXBsZW1lbnQgaWYgbmVnYXRpdmVcclxuICAgIGlmIChiZk1pbkJpbmFyeUV4cG9uZW50LmNvbXB1dGVkU2lnbiA9PT0gLTEpIHtcclxuICAgICAgYmZNaW5CaW5hcnlFeHBvbmVudC5iaW5hcnlNYW50aXNzYSA9IHRoaXMuX2JoLmMyKGJmTWluQmluYXJ5RXhwb25lbnQuYmluYXJ5TWFudGlzc2EpLnJldmVyc2UoKS5qb2luKFwiXCIpO1xyXG4gICAgfVxyXG4gICAgaWYgKGJmTWF4QmluYXJ5RXhwb25lbnQuY29tcHV0ZWRTaWduID09PSAtMSkge1xyXG4gICAgICBiZk1heEJpbmFyeUV4cG9uZW50LmJpbmFyeU1hbnRpc3NhID0gdGhpcy5fYmguYzIoYmZNYXhCaW5hcnlFeHBvbmVudC5iaW5hcnlNYW50aXNzYSkucmV2ZXJzZSgpLmpvaW4oXCJcIik7XHJcblxyXG4gICAgICBpZiAoYmZNYXhCaW5hcnlFeHBvbmVudC5jb21wdXRlZFNpZ24gIT09IGJmTWluQmluYXJ5RXhwb25lbnQuY29tcHV0ZWRTaWduKSB7XHJcbiAgICAgICAgYmZSZXMuYmluYXJ5U2lnbiA9IFwiMVwiO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gU3RlcCA1OiBBZGQgdGhlIG1hbnRpc3NhIGFuZCB0aGUgc2hpZnRlZCBvbmVcclxuICAgIGJmUmVzLmJpbmFyeU1hbnRpc3NhID0gdGhpcy5fYmguYmluYXJ5QWRkaXRpb24oXHJcbiAgICAgIGJmTWF4QmluYXJ5RXhwb25lbnQuYmluYXJ5TWFudGlzc2EsXHJcbiAgICAgIGJmTWluQmluYXJ5RXhwb25lbnQuYmluYXJ5TWFudGlzc2EsXHJcbiAgICApLnJldmVyc2UoKS5qb2luKFwiXCIpO1xyXG5cclxuICAgIC8vIFN0ZXAgNzogTm9ybWFsaXplIHRoZSBtYW50aXNzYVxyXG4gICAgLy8gSGlkZSB0aGUgZmlyc3QgYml0XHJcbiAgICBiZlJlcy5iaW5hcnlNYW50aXNzYSA9IGJmUmVzLmJpbmFyeU1hbnRpc3NhLnN1YnN0cmluZygxKTtcclxuXHJcbiAgICAvLyBOb3JtYWxpemUgdGhlIG1hbnRpc3NhIGlmIHRoZXJlIGlzIGEgY2FycnlcclxuICAgIGlmIChiZlJlcy5iaW5hcnlNYW50aXNzYS5sZW5ndGggLSBiZlJlcy5tYW50aXNzYUJpdHNTaXplID09PSAxKSB7XHJcbiAgICAgIC8vIFJvdW5kIHRoZSBsYXN0IGJpdFxyXG4gICAgICBjb25zdCBsYXN0Qml0ID0gIGJmUmVzLmJpbmFyeU1hbnRpc3NhW2JmUmVzLmJpbmFyeU1hbnRpc3NhLmxlbmd0aCAtIDFdO1xyXG4gICAgICBjb25zdCBiZWZvcmVMYXN0Qml0ID0gIGJmUmVzLmJpbmFyeU1hbnRpc3NhW2JmUmVzLmJpbmFyeU1hbnRpc3NhLmxlbmd0aCAtIDJdO1xyXG4gICAgICBiZlJlcy5iaW5hcnlNYW50aXNzYSA9IGJmUmVzLmJpbmFyeU1hbnRpc3NhLnNsaWNlKDAsIC0xKTtcclxuICAgICAgaWYgKGJlZm9yZUxhc3RCaXQgPT09IFwiMVwiICYmIGxhc3RCaXQgPT09IFwiMVwiKSB7XHJcbiAgICAgICAgYmZSZXMuYmluYXJ5TWFudGlzc2EgPSB0aGlzLl9iaC5iaW5hcnlBZGRpdGlvbihiZlJlcy5iaW5hcnlNYW50aXNzYSwgXCIxXCIpLnJldmVyc2UoKS5qb2luKFwiXCIpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBBZGQgMSB0byB0aGUgZXhwb25lbnRcclxuICAgICAgYmZSZXMuYmluYXJ5RXhwb25lbnQgPSB0aGlzLl9iaC5hZGROdW1iZXJUb0JpbmFyeShiZlJlcy5iaW5hcnlFeHBvbmVudCwgMSlbMF07XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGJmUmVzO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRmluZCB0aGUgbWluaW11bSBiaXRzIHNpemUgdG8gbWF0Y2ggdGhlIG51bWJlciBhbG1vc3QgXCJwZXJmZWN0bHlcIlxyXG4gICAqIEBwYXJhbSBtYXhCaXRTaXplIERlZmF1bHQgMjU2LCB0aGUgYml0cyBzaXplIGxpbWl0XHJcbiAgICovXHJcbiAgZmluZEFjY3VyYXRlQml0c1NpemUobWF4Qml0U2l6ZSA9IDI1Nikge1xyXG4gICAgdGhpcy5iaXRzU2l6ZSA9IEJpbmFyeUZsb2F0Ll9taW5CaXRTaXplO1xyXG4gICAgXHJcbiAgICB3aGlsZSh0aGlzLmJpdHNTaXplIDwgbWF4Qml0U2l6ZSAmJiB0aGlzLm1hcmdpbk9mRXJyb3IgIT09IDApIHtcclxuICAgICAgdGhpcy5iaXRzU2l6ZSsrO1xyXG4gICAgICB0aGlzLmNhbGN1bGF0ZSgpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iLCIvKipcclxuICogTGFibzogMSAoRmxvYXQgdG8gYmluYXJ5IGNvbnZlcnNpb24pXHJcbiAqIEF1dGhvcnM6IE93ZW4gR29tYmFzLCBEYXZpZCBEYXJtYW5nZXIsIEp1bGllbiBWYXVjaGVyLCBDbMOpbWVudCBQZXRpZ25hdFxyXG4gKiBUZWFtOiAyXHJcbiAqIFNjaG9vbDogSEUtQXJjXHJcbiAqIERhdGU6IDIxIG1hcnMgMjAyMlxyXG4gKiBDb3Vyc2U6IE1hdGjDqW1hdGlxdWVzIHNww6ljaWZpcXVlcyAoTW9kdWxlIDIyMzQpIC0gTS4gU3TDqXBoYW5lIEdvYnJvblxyXG4gKi9cclxuXHJcbmltcG9ydCB7IEJpbmFyeUZsb2F0IH0gZnJvbSBcIi4vY2xhc3Nlcy9CaW5hcnlGbG9hdFwiO1xyXG5cclxuY29uc3QgYmZCaW5hcnlOdW1iZXJFbGVtZW50ID0gPEhUTUxJbnB1dEVsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJiZi1iaW5hcnktbnVtYmVyXCIpO1xyXG5jb25zdCBiZlJlc3VsdEVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImJmLXJlc3VsdFwiKTtcclxuY29uc3QgcmVnZXhCaW5hcnkgPSAvXlswMVxcc10rJC87XHJcbmNvbnN0IG1pbkxlbmd0aCA9IDg7XHJcbmNvbnN0IG1heExlbmd0aCA9IDI1NjtcclxuXHJcbmZ1bmN0aW9uIG9uQ2hhbmdlQ29udmVydGVyQmYoKSB7XHJcbiAgY29uc3QgYmluYXJ5TnVtYmVyID0gYmZCaW5hcnlOdW1iZXJFbGVtZW50LnZhbHVlO1xyXG5cclxuICBpZiAoYmluYXJ5TnVtYmVyLmxlbmd0aCA8IG1pbkxlbmd0aCAmJiBiaW5hcnlOdW1iZXIgIT09IFwiXCIpIHtcclxuICAgIGJmUmVzdWx0RWxlbWVudC5pbm5lckhUTUwgPSBgPHNwYW4gY2xhc3M9XCJjb2xvci1yZWRcIj5MYSB0YWlsbGUgZGVzIGJpdHMgZG9pdCBhdSBtaW5pbXVtIMOqdHJlICR7bWluTGVuZ3RofTwvc3Bhbj5gO1xyXG4gICAgcmV0dXJuO1xyXG4gIH1cclxuXHJcbiAgaWYgKGJpbmFyeU51bWJlci5sZW5ndGggPiBtYXhMZW5ndGgpIHtcclxuICAgIGJmUmVzdWx0RWxlbWVudC5pbm5lckhUTUwgPSBgPHNwYW4gY2xhc3M9XCJjb2xvci1yZWRcIj5MYSB0YWlsbGUgZGVzIGJpdHMgZG9pdCBhdSBtYXhpbXVtIMOqdHJlICR7bWF4TGVuZ3RofTwvc3Bhbj5gO1xyXG4gICAgcmV0dXJuO1xyXG4gIH1cclxuICBcclxuICBpZiAoYmZCaW5hcnlOdW1iZXJFbGVtZW50LnZhbHVlID09PSBcIlwiICkge1xyXG4gICAgYmZSZXN1bHRFbGVtZW50LmlubmVySFRNTCA9IGA8c3BhbiBjbGFzcz1cImNvbG9yLWdyZXlcIj5WZXVpbGxleiByZW5zZWlnbmVyIHRvdXMgbGVzIGNoYW1wczwvc3Bhbj5gO1xyXG4gICAgcmV0dXJuO1xyXG4gIH1cclxuXHJcbiAgaWYgKCFyZWdleEJpbmFyeS50ZXN0KGJpbmFyeU51bWJlcikpIHtcclxuICAgIGJmUmVzdWx0RWxlbWVudC5pbm5lckhUTUwgPSBgPHNwYW4gY2xhc3M9XCJjb2xvci1yZWRcIj5DZSBuJ2VzdCBwYXMgdW4gbm9tYnJlIGJpbmFpcmU8L3NwYW4+YDtcclxuICAgIHJldHVybjtcclxuICB9XHJcbiAgXHJcbiAgY29uc3QgYmYgPSBuZXcgQmluYXJ5RmxvYXQoYmluYXJ5TnVtYmVyKTtcclxuXHJcbiAgYmZSZXN1bHRFbGVtZW50LmlubmVySFRNTCA9IGBcclxuICAgIDxkaXYgY2xhc3M9XCJyZXN1bHQtZ3JvdXBcIj5cclxuICAgICAgVGFpbGxlIGVuIGJpdHMgdG90YWw6ICR7YmYuYml0c1NpemV9XHJcbiAgICA8L2Rpdj5cclxuXHJcbiAgICA8ZGl2IGNsYXNzPVwicmVzdWx0LWdyb3VwXCI+XHJcbiAgICAgIFRhaWxsZSBlbiBiaXRzIGRlIGwnZXhwb3NhbnQ6ICR7YmYuZXhwb25lbnRCaXRzU2l6ZX1cclxuICAgIDwvZGl2PlxyXG4gICAgXHJcbiAgICA8ZGl2IGNsYXNzPVwicmVzdWx0LWdyb3VwXCI+XHJcbiAgICAgIFRhaWxsZSBlbiBiaXRzIGRlIGxhIG1hbnRpc3NlOiAke2JmLm1hbnRpc3NhQml0c1NpemV9XHJcbiAgICA8L2Rpdj5cclxuXHJcbiAgICA8ZGl2IGNsYXNzPVwicmVzdWx0LWdyb3VwXCI+XHJcbiAgICAgIEJpYWlzOiAke2JmLmJpYXN9XHJcbiAgICA8L2Rpdj5cclxuICAgIFxyXG4gICAgPGRpdiBjbGFzcz1cInJlc3VsdC1ncm91cFwiPlxyXG4gICAgICBTaWduZTpcclxuICAgICAgPHNwYW4gY2xhc3M9XCJjb2xvci1yZWQgbW9ub1wiPiR7YmYuYmluYXJ5U2lnbn08L3NwYW4+XHJcbiAgICAgIDxzcGFuIGNsYXNzPVwibW9ub1wiPigke2JmLmNvbXB1dGVkU2lnbiA+IDAgPyBcIitcIiA6IFwiLVwifSk8L3NwYW4+XHJcbiAgICA8L2Rpdj5cclxuICAgIFxyXG4gICAgPGRpdiBjbGFzcz1cInJlc3VsdC1ncm91cFwiPlxyXG4gICAgICBNYW50aXNzZTpcclxuICAgICAgPHNwYW4gY2xhc3M9XCJjb2xvci1vcmFuZ2UgbW9ub1wiPlxyXG4gICAgICAgICR7YmYuYmluYXJ5TWFudGlzc2F9XHJcbiAgICAgIDwvc3Bhbj5cclxuICAgICAgPHNwYW4gY2xhc3M9XCJtb25vXCI+KCR7YmYuY29tcHV0ZWRNYW50aXNzYX0pPC9zcGFuPlxyXG4gICAgPC9kaXY+XHJcblxyXG4gICAgPGRpdiBjbGFzcz1cInJlc3VsdC1ncm91cFwiPlxyXG4gICAgICBFeHBvc2FudDogPHNwYW4gY2xhc3M9XCJjb2xvci1ibHVlIG1vbm9cIj4ke2JmLmJpbmFyeUV4cG9uZW50fTwvc3Bhbj5cclxuICAgICAgPHNwYW4gY2xhc3M9XCJtb25vXCI+KDI8c3VwPiR7YmYuY29tcHV0ZWRFeHBvbmVudH08L3N1cD4pPC9zcGFuPlxyXG4gICAgPC9kaXY+XHJcbiAgICBcclxuICAgIDxkaXYgY2xhc3M9XCJyZXN1bHQtZ3JvdXBcIj5cclxuICAgICAgUsOpc3VsdGF0IGVuIGJpbmFpcmU6XHJcbiAgICAgIDxzcGFuIGNsYXNzPVwiY29sb3ItcmVkIG1vbm9cIj4ke2JmLmJpbmFyeVNpZ259PC9zcGFuPlxyXG4gICAgICA8c3BhbiBjbGFzcz1cImNvbG9yLWJsdWUgbW9ub1wiPiR7YmYuYmluYXJ5RXhwb25lbnR9PC9zcGFuPlxyXG4gICAgICA8c3BhbiBjbGFzcz1cImNvbG9yLW9yYW5nZSBtb25vXCI+JHtiZi5iaW5hcnlNYW50aXNzYX08L3NwYW4+XHJcbiAgICA8L2Rpdj5cclxuICAgIFxyXG4gICAgPGRpdiBjbGFzcz1cInJlc3VsdC1ncm91cFwiPlxyXG4gICAgICBSw6lzdWx0YXQ6ICR7YmYuY29tcHV0ZWROdW1iZXJ9XHJcbiAgICA8L2Rpdj5cclxuICBgO1xyXG59XHJcblxyXG5iZkJpbmFyeU51bWJlckVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCBvbkNoYW5nZUNvbnZlcnRlckJmKTtcclxuYmZCaW5hcnlOdW1iZXJFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXl1cFwiLCBvbkNoYW5nZUNvbnZlcnRlckJmKTtcclxuXHJcbm9uQ2hhbmdlQ29udmVydGVyQmYoKTtcclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9
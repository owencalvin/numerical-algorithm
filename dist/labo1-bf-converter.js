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
            this.calculate();
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
            if (value < BinaryFloat._minBitSize) {
                this._bitsSize = BinaryFloat._minBitSize;
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
    Object.defineProperty(BinaryFloat.prototype, "marginOfError", {
        get: function () {
            return Math.abs(this.number - this.computedNumber);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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RUQsSUFBSSxxQkFBcUIsQ0FBQyxLQUFLLEtBQUssRUFBRSxFQUFHO1FBQ3ZDLGVBQWUsQ0FBQyxTQUFTLEdBQUcsdUVBQXFFLENBQUM7UUFDbEcsT0FBTztLQUNSO0lBRUQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUU7UUFDbkMsZUFBZSxDQUFDLFNBQVMsR0FBRyxpRUFBK0QsQ0FBQztRQUM1RixPQUFPO0tBQ1I7SUFFRCxJQUFNLEVBQUUsR0FBRyxJQUFJLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUV6QyxlQUFlLENBQUMsU0FBUyxHQUFHLDBFQUVBLEVBQUUsQ0FBQyxRQUFRLG1HQUlILEVBQUUsQ0FBQyxnQkFBZ0Isd0dBSWxCLEVBQUUsQ0FBQyxnQkFBZ0IsNEVBSTNDLEVBQUUsQ0FBQyxJQUFJLHNIQUtlLEVBQUUsQ0FBQyxVQUFVLGtEQUN0QixFQUFFLENBQUMsWUFBWSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLDhJQU1qRCxFQUFFLENBQUMsY0FBYywwREFFQyxFQUFFLENBQUMsZ0JBQWdCLHVIQUlDLEVBQUUsQ0FBQyxjQUFjLHdEQUMvQixFQUFFLENBQUMsZ0JBQWdCLHVKQUtoQixFQUFFLENBQUMsVUFBVSw0REFDWixFQUFFLENBQUMsY0FBYyw4REFDZixFQUFFLENBQUMsY0FBYywrRkFJdkMsRUFBRSxDQUFDLGNBQWMscUJBRWhDLENBQUM7QUFDSixDQUFDO0FBRUQscUJBQXFCLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLG1CQUFtQixDQUFDLENBQUM7QUFDdEUscUJBQXFCLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLG1CQUFtQixDQUFDLENBQUM7QUFFckUsbUJBQW1CLEVBQUUsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL21hdGhfc3BlLy4vc3JjL2NsYXNzZXMvQmluYXJ5SGVscGVyLnRzIiwid2VicGFjazovL21hdGhfc3BlLy4vc3JjL2NsYXNzZXMvQmluYXJ5RmxvYXQudHMiLCJ3ZWJwYWNrOi8vbWF0aF9zcGUvLi9zcmMvbGFibzEtYmYtY29udmVydGVyLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogTGFibzogMCAoQmluYXJ5IG9wZXJhdGlvbnMpXG4gKiBBdXRob3JzOiBPd2VuIEdvbWJhcywgRGF2aWQgRGFybWFuZ2VyLCBKdWxpZW4gVmF1Y2hlciwgQ2zDqW1lbnQgUGV0aWduYXRcbiAqIFRlYW06IDJcbiAqIFNjaG9vbDogSEUtQXJjXG4gKiBEYXRlOiAyMSBtYXJzIDIwMjJcbiAqIENvdXJzZTogTWF0aMOpbWF0aXF1ZXMgc3DDqWNpZmlxdWVzIChNb2R1bGUgMjIzNCkgLSBNLiBTdMOpcGhhbmUgR29icm9uXG4gKi9cblxuLyoqXG4gKiBQZXJmb3JtcyBiYXNpYyBvcGVyYXRpb25zIG9uIGJpbmFyeSBudW1iZXJzXG4gKi9cbmV4cG9ydCBjbGFzcyBCaW5hcnlIZWxwZXIge1xuICAvKipcbiAgICogR2V0IG4gYml0IG9mIDAgb3IgMVxuICAgKiBAcGFyYW0gdmFsdWUgMSBvciAwXG4gICAqIEBwYXJhbSBuIFRoZSBudW1iZXIgb2YgYml0cyB0byByZXRyaWV2ZVxuICAgKiBAcmV0dXJucyBuIGJpdCBvZiAwIG9yIDFcbiAgICovXG4gIHB1YmxpYyBnZXROQml0KHZhbHVlOiAxIHwgMCwgbjogbnVtYmVyKTogc3RyaW5nIHtcbiAgICBsZXQgcmVzID0gXCJcIjtcbiAgICBcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG47IGkrKykge1xuICAgICAgcmVzICs9IHZhbHVlO1xuICAgIH1cblxuICAgIHJldHVybiByZXM7XG4gIH1cblxuICAvKipcbiAgICogQWRkIG4gemVyb3MgYmVmb3JlIHRoZSBiaW5hcnkgbnVtYmVyXG4gICAqIEBwYXJhbSBuIFRoZSBudW1iZXIgb2YgMCB0byBhZGQgYmVmb3JlIHRoZSBiaW5hcnkgbnVtYmVyXG4gICAqIEBwYXJhbSBiIFRoZSBiaW5hcnkgbnVtYmVyXG4gICAqIEByZXR1cm5zIFRoZSBiaW5hcnkgbnVtYmVyIHdpdGggbiB6ZXJvcyBiZWZvcmVcbiAgICovXG4gIHB1YmxpYyBhZGRQYWRkaW5nKG46IG51bWJlciwgYiA9IFwiXCIpIHtcbiAgICBjb25zdCBzaXplID0gbiAtIGIubGVuZ3RoO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaXplOyBpKyspIHtcbiAgICAgIGIgPSBcIjBcIiArIGI7XG4gICAgfVxuXG4gICAgcmV0dXJuIGI7XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlcyB0aGUgemVyb3MgYmVmb3JlIGEgYmluYXJ5IG51bWJlciAoMDAwMTAxIGJlY29tZXMgMTAxKVxuICAgKiBAcGFyYW0gYiBUaGUgYmluYXJ5IG51bWJlclxuICAgKiBAcmV0dXJucyBUaGUgcHJvZHVjZWQgYmluYXJ5IG51bWJlclxuICAgKi9cbiAgcHVibGljIGNsZWFuKGI6IHN0cmluZykge1xuICAgIGxldCByZXMgPSBiO1xuXG4gICAgZm9yKGxldCBpID0gMDsgaSA8IGIubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChiW2ldID09PSBcIjBcIikge1xuICAgICAgICByZXMgPSByZXMuc3Vic3RyaW5nKDEpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHJlcztcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAocmVzID09PSBcIlwiKSB7XG4gICAgICByZXR1cm4gXCIwXCI7XG4gICAgfVxuICB9XG5cblxuICAvKipcbiAgICogQWRkIDAgcGFkZGluZyB0byB0aGUgc21hbGxlc3QgYmluYXJ5IG51bWJlciB0byBtYXRjaCB0aGUgbG9uZ2VzdCBvbmUncyBsZW5ndGhcbiAgICogWzEwMSwgMTEwMDFdIGJlY29tZXMgWzAwMTAxLCAxMTAwMV1cbiAgICogQHBhcmFtIGIxIFRoZSBmaXJzdCBiaW5hcnkgbnVtYmVyXG4gICAqIEBwYXJhbSBiMiBUaGUgc2Vjb25kIGJpbmFyeSBudW1iZXJcbiAgICogQHJldHVybnMgW2IxLCBiMl0gd2l0aCBjb3JyZWN0IHBhZGRpbmdcbiAgICovXG4gIHB1YmxpYyBhZGRNYXhQYWRkaW5nKGIxOiBzdHJpbmcsIGIyOiBzdHJpbmcpIHtcbiAgICBpZiAoYjIubGVuZ3RoID4gYjEubGVuZ3RoKSB7XG4gICAgICBiMSA9IHRoaXMuYWRkUGFkZGluZyhiMi5sZW5ndGgsIGIxKTtcbiAgICB9IGVsc2UgaWYgKGIxLmxlbmd0aCA+IGIyLmxlbmd0aCkge1xuICAgICAgYjIgPSB0aGlzLmFkZFBhZGRpbmcoYjEubGVuZ3RoLCBiMik7XG4gICAgfVxuXG4gICAgcmV0dXJuIFtiMSwgYjJdO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgbWF4IGxlbmd0aCBvZiB0d28gYmluYXJpZXMgbnVtYmVyc1xuICAgKiBAcGFyYW0gYjEgVGhlIGZpcnN0IGJpbmFyeSBudW1iZXJcbiAgICogQHBhcmFtIGIyIFRoZSBzZWNvbmQgYmluYXJ5IG51bWJlclxuICAgKiBAcmV0dXJucyBUaGUgbWF4IGxlbmd0aFxuICAgKi9cbiAgcHVibGljIGdldE1heExlbmd0aChiMTogc3RyaW5nLCBiMjogc3RyaW5nKSB7XG4gICAgaWYgKGIxLmxlbmd0aCA+IGIyLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIGIxLmxlbmd0aDtcbiAgICB9XG4gICAgcmV0dXJuIGIyLmxlbmd0aDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDb252ZXJ0IGEgbnVtYmVyIHRvIGl0J3MgYmluYXJ5IHJlcHJlc2VudGF0aW9uXG4gICAqIEBwYXJhbSBkZWNpbWFsIFRoZSBcbiAgICogQHJldHVybnMgVGhlIGJpbmFyeSByZXByZXNlbnRhdGlvbiBvZiB0aGUgZGVjaW1hbCBudW1iZXJcbiAgICovXG4gIHB1YmxpYyBkZWNpbWFsVG9CaW5hcnkoZGVjaW1hbDogbnVtYmVyKSB7XG4gICAgY29uc3Qgb3JpZ2luYWxOdW1iZXIgPSBkZWNpbWFsO1xuICAgIGxldCBiaW5hcnlOdW1iZXIgPSAoTWF0aC5hYnMoZGVjaW1hbCkgPj4+IDApLnRvU3RyaW5nKDIpO1xuXG4gICAgaWYgKG9yaWdpbmFsTnVtYmVyIDwgMCkge1xuICAgICAgYmluYXJ5TnVtYmVyID0gdGhpcy5jMihiaW5hcnlOdW1iZXIpLnJldmVyc2UoKS5qb2luKFwiXCIpO1xuICAgIH1cblxuICAgIHJldHVybiBiaW5hcnlOdW1iZXI7XG4gIH1cblxuICAvKipcbiAgICogQ29udmVydCBhIGJpbmFyeSByZXByZXNlbnRhdGlvbiBvZiBhIG51bWJlciB0byBhIGRlY2ltYWwgbnVtYmVyXG4gICAqIEBwYXJhbSBiaW5hcnkgVGhlIGJpbmFyeSByZXByZXNlbnRhdGlvbiBvZiBhIG51bWJlclxuICAgKiBAcmV0dXJucyBUaGUgaW50IHJlcHJlc2VudGF0aW9uIG9mIGEgYmluYXJ5IG51bWJlclxuICAgKi9cbiAgcHVibGljIGJpbmFyeVRvRGVjaW1hbChiaW5hcnk6IHN0cmluZykge1xuICAgIHJldHVybiBwYXJzZUludChiaW5hcnksIDIpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZCBpbnQgdG8gYSBiaW5hcnkgbnVtYmVyXG4gICAqIEBwYXJhbSBiIFRoZSBiaW5hcnkgbnVtYmVyXG4gICAqIEBwYXJhbSBuIFRoZSBpbnQgbnVtYmVyIHRvIGFkZCB0byB0aGUgYmluYXJ5IG51bWJlclxuICAgKiBAcmV0dXJucyBUaGUgcHJvZHVjZWQgcmVzdWx0XG4gICAqL1xuICBwdWJsaWMgYWRkTnVtYmVyVG9CaW5hcnkoYjogc3RyaW5nLCBuOiBudW1iZXIpOiBzdHJpbmdbXSB7XG4gICAgcmV0dXJuIHRoaXMuYmluYXJ5QWRkaXRpb24oYiwgdGhpcy5kZWNpbWFsVG9CaW5hcnkobikpO1xuICB9XG5cbiAgLyoqXG4gICAqIEludmVydCBhIGJpbmFyeSBudW1iZXJcbiAgICogQHBhcmFtIGIgVGhlIGJpbmFyeSBudW1iZXIgdG8gaW52ZXJ0XG4gICAqIEByZXR1cm5zIFRoZSBpbnZlcnQgYmluYXJ5IG51bWJlclxuICAgKi9cbiAgcHVibGljIGludmVydChiOiBzdHJpbmcpIHtcbiAgICBjb25zdCBpbml0aWFsTGVuZ3RoID0gYi5sZW5ndGg7XG4gICAgYiA9IHRoaXMuZGVjaW1hbFRvQmluYXJ5KHRoaXMuYmluYXJ5VG9EZWNpbWFsKGIpIF4gdGhpcy5iaW5hcnlUb0RlY2ltYWwodGhpcy5nZXROQml0KDEsIGIubGVuZ3RoKSkpO1xuICAgIGIgPSB0aGlzLmFkZFBhZGRpbmcoaW5pdGlhbExlbmd0aCwgYik7XG4gICAgcmV0dXJuIGI7XG4gIH1cblxuICAvKipcbiAgICogU2hpZnQgdGhlIGJpbmFyeSBudW1iZXIgdG8gdGhlIHJpZ2h0XG4gICAqIEBwYXJhbSBiIFRoZSBiaW5hcnkgbnVtYmVyXG4gICAqIEBwYXJhbSBzaGlmdFZhbHVlIFRoZSBzaGlmdCB2YWx1ZVxuICAgKiBAcmV0dXJucyBUaGUgc2hpZnRlZCBiaW5hcnkgbnVtYmVyXG4gICAqL1xuICBwdWJsaWMgc2hpZnRSaWdodChiOiBzdHJpbmcsIHNoaWZ0VmFsdWU6IG51bWJlcikge1xuICAgIC8vIFwiMDAwMDAxMDEwXCIgPj4gMiA9PiBcIjAwMDAwMDAxMFwiXG4gICAgLy8gMS4gUmVtb3ZlcyBsYXN0cyA8c2hpZnRWYWx1ZT4gYml0c1xuICAgIC8vIDIuIFBsYWNlcyA8c2hpZnRWYWx1ZT4gYml0cyBhdCAwIGJlZm9yZVxuXG4gICAgaWYgKHNoaWZ0VmFsdWUgPCAxKSB7XG4gICAgICByZXR1cm4gYjtcbiAgICB9XG5cbiAgICBsZXQgcmVzID0gYjtcbiAgICByZXMgPSByZXMuc2xpY2UoMCwgLXNoaWZ0VmFsdWUpO1xuICAgIHJlcyA9IFwiXCIucGFkU3RhcnQoc2hpZnRWYWx1ZSwgXCIwXCIpICsgcmVzO1xuXG4gICAgcmV0dXJuIHJlcztcbiAgfVxuXG4gIC8qKlxuICAgKiBTaGlmdCB0aGUgYmluYXJ5IG51bWJlciB0byB0aGUgbGVmdFxuICAgKiBAcGFyYW0gYiBUaGUgYmluYXJ5IG51bWJlclxuICAgKiBAcGFyYW0gc2hpZnRWYWx1ZSBUaGUgc2hpZnQgdmFsdWVcbiAgICogQHJldHVybnMgVGhlIHNoaWZ0ZWQgYmluYXJ5IG51bWJlclxuICAgKi9cbiAgcHVibGljIHNoaWZ0TGVmdChiOiBzdHJpbmcsIHNoaWZ0VmFsdWU6IG51bWJlcikge1xuICAgIC8vIFwiMDAwMDAxMDEwXCIgPDwgMiA9PiBcIjAwMDAwMTAxMDAwXCJcbiAgICAvLyAxLiBSZW1vdmVzIGxhc3RzIDxzaGlmdFZhbHVlPiBiaXRzXG4gICAgLy8gMi4gUGxhY2VzIDxzaGlmdFZhbHVlPiBiaXRzIGF0IDAgYmVmb3JlXG5cbiAgICBpZiAoc2hpZnRWYWx1ZSA8IDEpIHtcbiAgICAgIHJldHVybiBiO1xuICAgIH1cblxuICAgIGxldCByZXMgPSBiO1xuICAgIHJlcyA9IHJlcy5zbGljZShzaGlmdFZhbHVlKTtcbiAgICByZXMgKz0gXCJcIi5wYWRFbmQoc2hpZnRWYWx1ZSwgXCIwXCIpO1xuXG4gICAgcmV0dXJuIHJlcztcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGQgMiBiaXQgdG9nZXRoZXIgd2l0aCB0aGUgY2FycnlcbiAgICogQHBhcmFtIHggVGhlIGZpcnN0IGJpdFxuICAgKiBAcGFyYW0geSBUaGUgc2Vjb25kIGJpdFxuICAgKiBAcGFyYW0gY2FycnkgVGhlIGNhcnJ5XG4gICAqIEByZXR1cm5zIFRoZSByZXN1bHQgd2l0aCB0aGUgY2FycnkgW2JpdCwgY2FycnldXG4gICAqL1xuICBwdWJsaWMgZWxlbWVudGFyeUFkZGl0aW9uKHg6IHN0cmluZywgeTogc3RyaW5nLCBjYXJyeSA9IFwiXCIpOiBzdHJpbmdbXSB7XG4gICAgY29uc3QgcmVzID0gTnVtYmVyKHgpICsgTnVtYmVyKHkpICsgTnVtYmVyKGNhcnJ5KTtcblxuICAgIHN3aXRjaCAocmVzKSB7XG4gICAgICAvLyBjID0gMSwgeCA9IDEsIHkgPSAxXG4gICAgICBjYXNlIDM6XG4gICAgICAgIHJldHVybiBbXCIxXCIsIFwiMVwiXTtcbiAgICAgIGNhc2UgMjpcbiAgICAgICAgcmV0dXJuIFtcIjBcIiwgXCIxXCJdO1xuICAgICAgY2FzZSAxOlxuICAgICAgICByZXR1cm4gW1wiMVwiLCBcIlwiXTtcbiAgICAgIC8vIGMgPSAwLCB4ID0gMCwgeSA9IDBcbiAgICAgIGNhc2UgMDpcbiAgICAgICAgcmV0dXJuIFtcIjBcIiwgXCJcIl07XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEFkZCAyIGJpbmFyeSBudW1iZXJzXG4gICAqIEBwYXJhbSBiMSBUaGUgZmlyc3QgYmluYXJ5IG51bWJlclxuICAgKiBAcGFyYW0gYjIgVGhlIHNlY29uZCBiaW5hcnkgbnVtYmVyXG4gICAqIEByZXR1cm5zIFRoZSByZXN1bHQgb2YgdGhlIGFkZGl0aW9uIFtiaW5hcnlOdW1iZXIsIGNhcnJ5Qml0XVxuICAgKi9cbiAgcHVibGljIGJpbmFyeUFkZGl0aW9uKGIxOiBzdHJpbmcsIGIyOiBzdHJpbmcpIHtcbiAgICBsZXQgcmVzID0gXCJcIjtcbiAgICBsZXQgY2FycnkgPSBcIlwiO1xuICAgIGNvbnN0IFticDEsIGJwMl0gPSB0aGlzLmFkZE1heFBhZGRpbmcoYjEsIGIyKTtcblxuICAgIGZvciAobGV0IGkgPSBicDEubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgIGNvbnN0IFtyLCBjXSA9IHRoaXMuZWxlbWVudGFyeUFkZGl0aW9uKGJwMVtpXSwgYnAyW2ldLCBjYXJyeSk7XG4gICAgICByZXMgPSByICsgcmVzO1xuICAgICAgY2FycnkgPSBjO1xuICAgIH1cblxuICAgIHJldHVybiBbcmVzLCBjYXJyeV07XG4gIH1cblxuICAvKipcbiAgICogU3Vic3RyYWN0IDIgYmluYXJ5IG51bWJlcnNcbiAgICogQHBhcmFtIGIxIFRoZSBmaXJzdCBiaW5hcnkgbnVtYmVyXG4gICAqIEBwYXJhbSBiMiBUaGUgc2Vjb25kIGJpbmFyeSBudW1iZXJcbiAgICogQHJldHVybnMgVGhlIHJlc3VsdCBvZiB0aGUgc3Vic3RyYWN0aW9uIFtiaW5hcnlOdW1iZXIsIGNhcnJ5Qml0XVxuICAgKi9cbiAgcHVibGljIGJpbmFyeVN1YnN0cmFjdGlvbihiMTogc3RyaW5nLCBiMjogc3RyaW5nKSB7XG4gICAgY29uc3QgW2JwMSwgYnAyXSA9IHRoaXMuYWRkTWF4UGFkZGluZyhiMSwgYjIpO1xuICAgIHJldHVybiB0aGlzLmJpbmFyeUFkZGl0aW9uKGJwMSwgdGhpcy5jMihicDIpLnJldmVyc2UoKS5qb2luKFwiXCIpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQZXJmb3JtIGEgMidzIGNvbXBsZW1lbnQgb3BlcmF0aW9uIHdpdGhvdXQgdGhlIGNhcnJ5XG4gICAqIEBwYXJhbSBiIFRoZSBiaW5hcnkgbnVtYmVyXG4gICAqIEByZXR1cm5zIFRoZSAyJ3MgY29tcGxlbWVudCBvZiB0aGUgYmluYXJ5IG51bWJlciBbYmluYXJ5TnVtYmVyLCBjYXJyeV1cbiAgICovXG4gIHB1YmxpYyBjMihiOiBzdHJpbmcpOiBzdHJpbmdbXSB7XG4gICAgYiA9IHRoaXMuaW52ZXJ0KGIpO1xuICAgIHJldHVybiB0aGlzLmFkZE51bWJlclRvQmluYXJ5KGIsIDEpO1xuICB9XG5cbiAgLyoqXG4gICAqIE11bHRpcGx5IDIgYmluYXJ5IG51bWJlcnNcbiAgICogQHBhcmFtIGIxIFRoZSBmaXJzdCBiaW5hcnkgbnVtYmVyXG4gICAqIEBwYXJhbSBiMiBUaGUgc2Vjb25kIGJpbmFyeSBudW1iZXJcbiAgICogQHJldHVybnMgVGhlIHJlc3VsdCBvZiB0aGUgbXVsdGlwbGljYXRpb25cbiAgICovXG4gIHB1YmxpYyBiaW5hcnlNdWx0aXBsaWNhdGlvbihiMTogc3RyaW5nLCBiMjogc3RyaW5nKSB7XG4gICAgbGV0IHJlcyA9IFwiXCI7XG4gICAgY29uc3QgYWRkUmVzdWx0cyA9IFtdO1xuXG4gICAgLy8gVGhlIGJpbmFyeSBudW1iZXJzIHRvIG11bGl0cGx5XG4gICAgLy8gYnAxID0gMTAxMVxuICAgIC8vIGJwMiA9IDExMTFcbiAgICBjb25zdCBbYnAxLCBicDJdID0gdGhpcy5hZGRNYXhQYWRkaW5nKGIxLCBiMik7XG5cbiAgICAvLyBDYWxjdWxhdGUgdGhlIG9wZXJhbmRzXG4gICAgLy8gYWRkUmVzdWx0cyA9IFtcbiAgICAvLyAgICAwMDAwIDEwMTEsXG4gICAgLy8gICAgMDAwMSAwMTEwLFxuICAgIC8vICAgIDAwMTAgMTEwMCxcbiAgICAvLyAgICAxMDExIDAwMDBcbiAgICAvLyBdXG4gICAgZm9yIChsZXQgaSA9IGJwMS5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgbGV0IGN1cnJlbnRSZXMgPSBcIlwiO1xuXG4gICAgICBmb3IgKGxldCBqID0gYnAxLmxlbmd0aCAtIDE7IGogPj0gMDsgai0tKSB7XG4gICAgICAgIGN1cnJlbnRSZXMgPSAoTnVtYmVyKGJwMVtqXSkgKiBOdW1iZXIoYnAyW2ldKSkgKyBjdXJyZW50UmVzO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBkZWMgPSB0aGlzLmJpbmFyeVRvRGVjaW1hbChjdXJyZW50UmVzKSA8PCAoYnAxLmxlbmd0aCAtIDEgLSBpKTtcbiAgICAgIGN1cnJlbnRSZXMgPSB0aGlzLmRlY2ltYWxUb0JpbmFyeShkZWMpO1xuICAgICAgYWRkUmVzdWx0cy5wdXNoKGN1cnJlbnRSZXMpO1xuICAgIH1cblxuICAgIC8vIEFkZCBldmVyeXRoaW5nXG4gICAgLy8gcmVzID1cbiAgICAvLyAgIDAwMDAgMTAxMSxcbiAgICAvLyArIDAwMDEgMDExMCxcbiAgICAvLyArIDAwMTAgMTEwMCxcbiAgICAvLyArIDEwMTEgMDAwMFxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYWRkUmVzdWx0cy5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgYWRkUmVzdWx0ID0gdGhpcy5hZGRQYWRkaW5nKGFkZFJlc3VsdHNbYWRkUmVzdWx0cy5sZW5ndGggLSAxXS5sZW5ndGgsIGFkZFJlc3VsdHNbaV0pO1xuICAgICAgY29uc3QgW3IsIGNdID0gdGhpcy5iaW5hcnlBZGRpdGlvbihyZXMsIGFkZFJlc3VsdCk7XG4gICAgICByZXMgPSBjICsgcjtcbiAgICB9XG5cbiAgICAvLyByZXMgPSAxMDEwMDEwMVxuICAgIHJldHVybiByZXM7XG4gIH1cbn1cbiIsIi8qKlxuICogTGFibzogMSAoRmxvYXQgdG8gYmluYXJ5IGNvbnZlcnNpb24pXG4gKiBBdXRob3JzOiBPd2VuIEdvbWJhcywgRGF2aWQgRGFybWFuZ2VyLCBKdWxpZW4gVmF1Y2hlciwgQ2zDqW1lbnQgUGV0aWduYXRcbiAqIFRlYW06IDJcbiAqIFNjaG9vbDogSEUtQXJjXG4gKiBEYXRlOiAyMSBtYXJzIDIwMjJcbiAqIENvdXJzZTogTWF0aMOpbWF0aXF1ZXMgc3DDqWNpZmlxdWVzIChNb2R1bGUgMjIzNCkgLSBNLiBTdMOpcGhhbmUgR29icm9uXG4gKi9cblxuaW1wb3J0IHsgQmluYXJ5SGVscGVyIH0gZnJvbSBcIi4vQmluYXJ5SGVscGVyXCI7XG5cbi8qKlxuICogRW5jb2RlIGEgZmxvYXRpbmcgbnVtYmVyIHdpdGggYSBjaG9vc2VuIGJpdCBzaXplIGFuZCBJRUVFIDc1NFxuICovXG5leHBvcnQgY2xhc3MgQmluYXJ5RmxvYXQge1xuICBwcml2YXRlIF9iaXRzU2l6ZSA9IDMyO1xuICBwcml2YXRlIF9udW1iZXIgPSAwO1xuICBwcml2YXRlIF9iaW5hcnlTaWduOiBcIjFcIiB8IFwiMFwiID0gXCIwXCI7XG4gIHByaXZhdGUgX2JpbmFyeU1hbnRpc3NhID0gXCJcIjtcbiAgcHJpdmF0ZSBfb3ZlcmZsb3cgPSBmYWxzZTtcbiAgcHJpdmF0ZSBfbWFudGlzc2FEb3RQb3NpdGlvbiA9IDA7XG4gIHByaXZhdGUgX2JpbmFyeUV4cG9uZW50ID0gXCJcIjtcbiAgcHJpdmF0ZSBfYmlhcyA9IDA7XG4gIHByaXZhdGUgX2JoID0gbmV3IEJpbmFyeUhlbHBlcigpO1xuICBwcml2YXRlIHN0YXRpYyBfbWluQml0U2l6ZSA9IDg7XG5cbiAgY29uc3RydWN0b3IobnVtYmVyT3JCaW5hcnk6IHN0cmluZyk7XG4gIGNvbnN0cnVjdG9yKG51bWJlck9yQmluYXJ5OiBudW1iZXIpO1xuICBjb25zdHJ1Y3RvcihudW1iZXJPckJpbmFyeTogbnVtYmVyLCBiaXRzU2l6ZTogbnVtYmVyKTtcbiAgY29uc3RydWN0b3IobnVtYmVyT3JCaW5hcnk6IG51bWJlciB8IHN0cmluZywgYml0c1NpemU/OiBudW1iZXIpIHtcbiAgICBpZiAodHlwZW9mIG51bWJlck9yQmluYXJ5ID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAvLyBSZW1vdmUgdGhlIHNwYWNlcyBpbiB0aGUgc3RyaW5nXG4gICAgICBudW1iZXJPckJpbmFyeSA9IG51bWJlck9yQmluYXJ5LnRyaW0oKTtcbiAgICAgIG51bWJlck9yQmluYXJ5ID0gbnVtYmVyT3JCaW5hcnkucmVwbGFjZSgvXFxzL2csIFwiXCIpO1xuICAgICAgdGhpcy5iaXRzU2l6ZSA9IG51bWJlck9yQmluYXJ5Lmxlbmd0aDtcbiAgICAgIHRoaXMubnVtYmVyID0gMTtcblxuICAgICAgLy8gU2xpY2UgdGhlIHN0cmluZyB0byBhc3NpZ24gdGhlIGJpbmFyeSBudW1iZXIgdG8gdGhlIGNvcnJlY3QgcGFydCBvZiB0aGUgYmluYXJ5IHJlcHJlc2VudGF0aW9uIG9mIHRoZSBmbG9hdFxuICAgICAgdGhpcy5iaW5hcnlTaWduID0gbnVtYmVyT3JCaW5hcnlbMF0gYXMgXCIwXCIgfCBcIjFcIjtcbiAgICAgIHRoaXMuYmluYXJ5RXhwb25lbnQgPSBudW1iZXJPckJpbmFyeS5zbGljZSgxLCB0aGlzLmV4cG9uZW50Qml0c1NpemUgKyAxKTtcbiAgICAgIHRoaXMuYmluYXJ5TWFudGlzc2EgPSBudW1iZXJPckJpbmFyeS5zbGljZSh0aGlzLmV4cG9uZW50Qml0c1NpemUgKyAxLCB0aGlzLmJpdHNTaXplKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5iaXRzU2l6ZSA9IGJpdHNTaXplO1xuICAgICAgdGhpcy5udW1iZXIgPSBudW1iZXJPckJpbmFyeTtcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgZ2V0SW5maW5pdHkoYml0c1NpemU6IG51bWJlcikge1xuICAgIHJldHVybiBuZXcgQmluYXJ5RmxvYXQoSW5maW5pdHksIGJpdHNTaXplKTtcbiAgfVxuXG4gIHN0YXRpYyBnZXROYU4oYml0c1NpemU6IG51bWJlcikge1xuICAgIHJldHVybiBuZXcgQmluYXJ5RmxvYXQoTmFOLCBiaXRzU2l6ZSk7XG4gIH1cblxuICBzdGF0aWMgZ2V0WmVybyhiaXRzU2l6ZTogbnVtYmVyKSB7XG4gICAgcmV0dXJuIG5ldyBCaW5hcnlGbG9hdCgwLCBiaXRzU2l6ZSk7XG4gIH1cblxuICAvKipcbiAgICogVGhlIGZsb2F0IG51bWJlciB0byBjb2RlZCB3aXRoIElFRUUgNzU0XG4gICAqL1xuICBnZXQgbnVtYmVyKCkge1xuICAgIHJldHVybiB0aGlzLl9udW1iZXI7XG4gIH1cblxuICBzZXQgbnVtYmVyKHZhbHVlOiBudW1iZXIpIHtcbiAgICB0aGlzLl9udW1iZXIgPSB2YWx1ZTtcblxuICAgIHRoaXMuY2FsY3VsYXRlKCk7XG4gIH1cblxuICAvKipcbiAgICogVGhlIGJpdCBzaXplIHRvIGNvZGUgdGhlIG51bWJlclxuICAgKi9cbiAgZ2V0IGJpdHNTaXplKCkge1xuICAgIHJldHVybiB0aGlzLl9iaXRzU2l6ZTtcbiAgfVxuXG4gIHNldCBiaXRzU2l6ZSh2YWx1ZTogbnVtYmVyKSB7XG4gICAgdGhpcy5fYml0c1NpemUgPSB2YWx1ZTtcblxuICAgIGlmICh2YWx1ZSA8IEJpbmFyeUZsb2F0Ll9taW5CaXRTaXplKSB7XG4gICAgICB0aGlzLl9iaXRzU2l6ZSA9IEJpbmFyeUZsb2F0Ll9taW5CaXRTaXplO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIG1hbnRpc3NhIGJpdHMgc2l6ZVxuICAgKi9cbiAgZ2V0IG1hbnRpc3NhQml0c1NpemUoKSB7XG4gICAgaWYgKHRoaXMuYml0c1NpemUgPCA4KSB7XG4gICAgICByZXR1cm4gMDtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5iaXRzU2l6ZSAtIHRoaXMuZXhwb25lbnRCaXRzU2l6ZSAtIDE7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBleHBvbmVudCBiaXRzIHNpemUgd2l0aDpcbiAgICogLSBUaGUgSUVFRSA3NTQgMjAxOSBmb3JtdWxhIGlmIHRoZSBiaXRzIHNpemUgaXMgZ3JlYXRlciBvciBlcXVhbCB0byAxMjhcbiAgICogLSBBIGN1c3RvbSBmb3JtdWxhIGlmIHRoZSBiaXQgc2l6ZSBpcyBsZXNzIHRoYW4gMTI4IHRoYXQgbWF0Y2hlcyB0aGUgSUVFRSBzdGFuZGFyZFxuICAgKiBcbiAgICogVmlzdWFsaXplIHRoZSBmdW5jdGlvbiBvbiBnZW9nZWJyYTpcbiAgICogaHR0cHM6Ly93d3cuZ2VvZ2VicmEub3JnL2NhbGN1bGF0b3IvY2VycmtkZnZcbiAgICovXG4gIGdldCBleHBvbmVudEJpdHNTaXplKCkge1xuICAgIGlmICh0aGlzLmJpdHNTaXplIDwgOCkge1xuICAgICAgcmV0dXJuIDA7XG4gICAgfVxuXG4gICAgLy8gSUVFRSA3NTQgMjAxOSBmb3JtdWxhID49IDEyOFxuICAgIGlmICh0aGlzLmJpdHNTaXplID49IDEyOCkge1xuICAgICAgcmV0dXJuIE1hdGgucm91bmQoNCAqIE1hdGgubG9nMih0aGlzLmJpdHNTaXplKSkgLSAxMztcbiAgICB9XG5cbiAgICAvLyBBIGZvcm11bGEgdGhhdCBtYXRjaGVzIHRoZSB2YWx1ZXMgZm9yIDwgMTI4XG4gICAgLy8gcmVmOiBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL2EvNjI2MzIyNjBcbiAgICByZXR1cm4gTWF0aC5yb3VuZCgoTWF0aC5sb2cyKHRoaXMuYml0c1NpemUpIC0gMSkgKiogKDMgLyAyKSk7XG4gIH1cblxuICBnZXQgcG9zaXRpdmVOdW1iZXIoKSB7XG4gICAgcmV0dXJuIE1hdGguYWJzKHRoaXMubnVtYmVyKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDYWxjdWxhdGUgdGhlIHBvc2l0aW9uIG9mIHRoZSBkb3QgaW4gdGhlIG1hbnRpc3NhXG4gICAqICAgICAgICAgICAgZmxvYXQgcG9zaXRpb25cbiAgICogICAgICAgICAgICAgICAgICB8XG4gICAqICAgICAgICAgICAgICAgICAgdlxuICAgKiBtYW50aXNzYSgxOS41OTM3NSkgPT4gXCIwMDExLjEwMDExMDAwMDAwMDAwMDAwMDBcIlxuICAgKi9cbiAgZ2V0IG1hbnRpc3NhRG90UG9zaXRpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuX21hbnRpc3NhRG90UG9zaXRpb247XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBleHBvbmVudCBvZiB0aGUgbnVtYmVyIGluIGJpbmFyeSB3aXRoIHRoZSBiaWFzXG4gICAqIG1hbnRpc3NhKDE5LjU5Mzc1KSA9PiBcIjEwMDAwMDEwXCJcbiAgICovXG4gIGdldCBiaW5hcnlFeHBvbmVudCgpIHtcbiAgICByZXR1cm4gdGhpcy5fYmluYXJ5RXhwb25lbnQ7XG4gIH1cblxuICBzZXQgYmluYXJ5RXhwb25lbnQodmFsdWU6IHN0cmluZykge1xuICAgIHRoaXMuX2JpbmFyeUV4cG9uZW50ID0gdmFsdWU7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJuIHRoZSBiaWFzIG9mIHRoZSBudW1iZXIgYmFzZWQgb24gdGhlIGV4cG9uZW50IGJpdCBzaXplXG4gICAqIGIgPSAyIF4gKGV4cG9uZW50Qml0c1NpemUgLSAxKSAtIDFcbiAgICovXG4gIGdldCBiaWFzKCkge1xuICAgIHJldHVybiB0aGlzLl9iaWFzO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgZnVsbCBtYW50aXNzYSBvZiB0aGUgbnVtYmVyXG4gICAqL1xuICBnZXQgYmluYXJ5TWFudGlzc2EoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2JpbmFyeU1hbnRpc3NhO1xuICB9XG5cbiAgc2V0IGJpbmFyeU1hbnRpc3NhKHZhbHVlOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9iaW5hcnlNYW50aXNzYSA9IHZhbHVlO1xuICAgIHRoaXMuX292ZXJmbG93ID0gdmFsdWUubGVuZ3RoID4gdGhpcy5tYW50aXNzYUJpdHNTaXplO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgZnVsbCBudW1iZXIgY29kZWQgaW4gYmluYXJ5IHdpdGggSUVFRSA3NTRcbiAgICovXG4gIGdldCBiaW5hcnlGbG9hdGluZ051bWJlcigpIHtcbiAgICByZXR1cm4gdGhpcy5iaW5hcnlTaWduICsgdGhpcy5iaW5hcnlFeHBvbmVudCArIHRoaXMuYmluYXJ5TWFudGlzc2E7XG4gIH1cblxuICAvKipcbiAgICogVGhlIHNpZ24gaW4gaXQncyBkZWNpbWFsIGZvcm1cbiAgICovXG4gIGdldCBjb21wdXRlZFNpZ24oKSB7XG4gICAgcmV0dXJuIHRoaXMuYmluYXJ5U2lnbiA9PT0gXCIxXCIgPyAtMSA6IDE7XG4gIH1cblxuICAvKipcbiAgICogVGhlIGV4cG9uZW50IGluIGl0J3MgZGVjaW1hbCBmb3JtXG4gICAqL1xuICBnZXQgY29tcHV0ZWRFeHBvbmVudCgpIHtcbiAgICByZXR1cm4gdGhpcy5fYmguYmluYXJ5VG9EZWNpbWFsKHRoaXMuYmluYXJ5RXhwb25lbnQpIC0gdGhpcy5iaWFzO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoZSBtYW50aXNzYSBpbiBpdCdzIGRlY2ltYWwgZm9ybVxuICAgKi9cbiAgZ2V0IGNvbXB1dGVkTWFudGlzc2EoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2JoLmJpbmFyeVRvRGVjaW1hbChcIjFcIiArIHRoaXMuYmluYXJ5TWFudGlzc2EpIC8gMiAqKiB0aGlzLm1hbnRpc3NhQml0c1NpemU7XG4gIH1cblxuICBnZXQgbWFyZ2luT2ZFcnJvcigpIHtcbiAgICByZXR1cm4gTWF0aC5hYnModGhpcy5udW1iZXIgLSB0aGlzLmNvbXB1dGVkTnVtYmVyKTtcbiAgfVxuXG4gIGdldCBpc05hTigpIHtcbiAgICBjb25zdCBpc05hTkJpbmFyeSA9IChcbiAgICAgIHRoaXMuYmluYXJ5RXhwb25lbnQuaW5kZXhPZihcIjBcIikgPT09IC0xICYmXG4gICAgICB0aGlzLmJpbmFyeU1hbnRpc3NhLmluZGV4T2YoXCIwXCIpID09PSAtMSAmJlxuICAgICAgdGhpcy5iaW5hcnlTaWduID09PSBcIjBcIlxuICAgICk7XG5cbiAgICByZXR1cm4gTnVtYmVyLmlzTmFOKHRoaXMubnVtYmVyKSB8fCBpc05hTkJpbmFyeTtcbiAgfVxuXG4gIGdldCBpc0luZmluaXR5KCkge1xuICAgIGNvbnN0IGlzSW5maW5pdHlCaW5hcnkgPSAoXG4gICAgICB0aGlzLmJpbmFyeUV4cG9uZW50LmluZGV4T2YoXCIwXCIpID09PSAtMSAmJlxuICAgICAgdGhpcy5iaW5hcnlNYW50aXNzYS5pbmRleE9mKFwiMVwiKSA9PT0gLTEgJiZcbiAgICAgIHRoaXMuYmluYXJ5U2lnbiA9PT0gXCIwXCJcbiAgICApO1xuXG4gICAgcmV0dXJuIHRoaXMubnVtYmVyID09PSBJbmZpbml0eSB8fCBpc0luZmluaXR5QmluYXJ5O1xuICB9XG5cbiAgZ2V0IGlzWmVybygpIHtcbiAgICBjb25zdCBpc1plcm9CaW5hcnkgPSAoXG4gICAgICB0aGlzLmJpbmFyeUV4cG9uZW50LmluZGV4T2YoXCIxXCIpID09PSAtMSAmJlxuICAgICAgdGhpcy5iaW5hcnlNYW50aXNzYS5pbmRleE9mKFwiMVwiKSA9PT0gLTEgJiZcbiAgICAgIHRoaXMuYmluYXJ5U2lnbiA9PT0gXCIwXCJcbiAgICApO1xuXG4gICAgcmV0dXJuIHRoaXMubnVtYmVyID09PSAwIHx8IGlzWmVyb0JpbmFyeTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIGFic29sdXRlIHZhbHVlIG9mIHRoZSBudW1iZXIgaW4gYmluYXJ5XG4gICAqL1xuICBnZXQgYmluYXJ5QWJzKCkge1xuICAgIHJldHVybiBcIjBcIiArIHRoaXMuYmluYXJ5RXhwb25lbnQgKyB0aGlzLmJpbmFyeU1hbnRpc3NhO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoZSBudW1iZXIgdGhhdCBpcyBjb2RlZCBpbiBtZW1vcnlcbiAgICovXG4gIGdldCBjb21wdXRlZE51bWJlcigpIHtcbiAgICBpZiAodGhpcy5pc1plcm8pIHtcbiAgICAgIHJldHVybiAwO1xuICAgIH0gZWxzZSBpZiAodGhpcy5pc05hTikge1xuICAgICAgcmV0dXJuIE5hTjtcbiAgICB9IGVsc2UgaWYgKHRoaXMuaXNJbmZpbml0eSkge1xuICAgICAgcmV0dXJuIEluZmluaXR5O1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmNvbXB1dGVkU2lnbiAqIDIgKiogdGhpcy5jb21wdXRlZEV4cG9uZW50ICogdGhpcy5jb21wdXRlZE1hbnRpc3NhO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgbWFyZ2luIG9mIGVycm9yXG4gICAqL1xuICBnZXQgZXJyb3IoKSB7ICAgIFxuICAgIGlmIChOdW1iZXIuaXNOYU4odGhpcy5udW1iZXIpIHx8IHRoaXMubnVtYmVyID09PSBJbmZpbml0eSB8fCB0aGlzLm51bWJlciA9PT0gMCkge1xuICAgICAgcmV0dXJuIDA7XG4gICAgfVxuXG4gICAgcmV0dXJuIE1hdGguYWJzKHRoaXMubnVtYmVyIC0gdGhpcy5jb21wdXRlZE51bWJlcik7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJuIHRoZSBiaW5hcnkgcmVwcmVzZW50YXRpb24gb2YgdGhlIHNpZ25cbiAgICogMCBpZiBudW1iZXIgPj0gMFxuICAgKiAxIGlmIG51bWJlciA8IDBcbiAgICovXG4gIGdldCBiaW5hcnlTaWduKCk6IFwiMFwiIHwgXCIxXCIge1xuICAgIHJldHVybiB0aGlzLl9iaW5hcnlTaWduO1xuICB9XG5cbiAgc2V0IGJpbmFyeVNpZ24odmFsdWU6IFwiMFwiIHwgXCIxXCIpIHtcbiAgICB0aGlzLl9iaW5hcnlTaWduID0gdmFsdWU7XG4gIH1cblxuICAvKipcbiAgICogVHJ1ZSBpZiB0aGUgbnVtYmVyIGNhbm5vdCBiZSBlbmNvZGVkIGluIDxiaXRzU2l6ZT4gYml0c1xuICAgKi9cbiAgZ2V0IG92ZXJmbG93KCkge1xuICAgIHJldHVybiB0aGlzLl9vdmVyZmxvdztcbiAgfVxuXG4gIC8qKlxuICAgKiBDYWxjdWxhdGU6XG4gICAqIC0gQmluYXJ5IHNpZ25cbiAgICogLSBUaGUgYmlhc1xuICAgKiAtIFRoZSBiaW5hcnkgbWFudGlzc2FcbiAgICogLSBUaGUgYmluYXJ5IGV4cG9uZW50XG4gICAqL1xuICBjYWxjdWxhdGUoKSB7XG4gICAgdGhpcy5jYWxjdWxhdGVCaW5hcnlTaWduKCk7XG4gICAgdGhpcy5jYWxjdWxhdGVCaWFzKCk7XG4gICAgdGhpcy5jYWxjdWxhdGVCaW5hcnlNYW50aXNzYSgpO1xuICAgIHRoaXMuY2FsY3VsYXRlQmluYXJ5RXhwb25lbnQoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZXRlcm1pbmUgdGhlIGJpbmFyeSBzaWduIG9mIHRoZSBudW1iZXJcbiAgICovXG4gIGNhbGN1bGF0ZUJpbmFyeVNpZ24oKSB7XG4gICAgdGhpcy5fYmluYXJ5U2lnbiA9IHRoaXMubnVtYmVyIDwgMCA/IFwiMVwiIDogXCIwXCI7XG4gIH1cblxuICAvKipcbiAgICogQ2FsY3VsYXRlIHRoZSBleHBvbmVudCBiaWFzIGJhc2VkIG9uIHRoZSBleHBvbmVudCBiaXQgc2l6ZVxuICAgKiBiID0gMiBeIChleHBvbmVudEJpdHNTaXplIC0gMSkgLSAxO1xuICAgKi9cbiAgY2FsY3VsYXRlQmlhcygpIHtcbiAgICB0aGlzLl9iaWFzID0gMiAqKiAodGhpcy5leHBvbmVudEJpdHNTaXplIC0gMSkgLSAxO1xuICB9XG5cbiAgLyoqXG4gICAqIERldGVybWluZSB0aGUgYmluYXJ5IG1hbnRpc3NhIGFuZCBkZXRlcm1pbmUgdGhlIGRvdCBwb3NpdGlvbiBpbiB0aGUgbWFudGlzc2FcbiAgICovXG4gIGNhbGN1bGF0ZUJpbmFyeU1hbnRpc3NhKCkge1xuICAgIGlmIChOdW1iZXIuaXNOYU4odGhpcy5udW1iZXIpKSB7XG4gICAgICB0aGlzLl9tYW50aXNzYURvdFBvc2l0aW9uID0gMDtcbiAgICAgIHRoaXMuX2JpbmFyeU1hbnRpc3NhID0gXCJcIi5wYWRFbmQodGhpcy5tYW50aXNzYUJpdHNTaXplLCBcIjFcIik7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gR2V0IHRoZSBpbnRlZ2VyIHBhcnRcbiAgICBjb25zdCBpbnRlZ2VyUGFydCA9IE1hdGgudHJ1bmModGhpcy5wb3NpdGl2ZU51bWJlcik7XG5cbiAgICAvLyBHZXQgdGhlIGRlY2ltYWxzIG9mIHRoZSBudW1iZXI6IGRlY2ltYWxzID0gMTkuNTkzNzUgLSAxOSA9IDAuNTkzNzVcbiAgICBsZXQgZGVjaW1hbHNQYXJ0ID0gdGhpcy5wb3NpdGl2ZU51bWJlciAtIE1hdGgudHJ1bmModGhpcy5wb3NpdGl2ZU51bWJlcik7XG5cbiAgICBjb25zdCBiaW5hcnlJbnRlZ2VyUGFydCA9IHRoaXMuX2JoLmRlY2ltYWxUb0JpbmFyeShpbnRlZ2VyUGFydCk7XG5cbiAgICAvLyBHZXQgdGhlIG51bWJlciBvZiBiaXRzIGRlZGljYXRlZCB0byBzdG9yZSB0aGUgZGVjaW1hbHMgaW4gdGhlIG1hbnRpc3NhXG4gICAgY29uc3QgZGVjaW1hbHNCaXRzU2l6ZSA9IHRoaXMubWFudGlzc2FCaXRzU2l6ZSAtIGJpbmFyeUludGVnZXJQYXJ0Lmxlbmd0aCAtIDE7XG4gICAgXG4gICAgbGV0IGJpbmFyeURlY2ltYWxzUGFydCA9IFwiXCI7XG4gICAgLy8gMC41OTM3NSAqIDIgPSAxLjE4NzUgID0+IDFcbiAgICAvLyAwLjE4NzUgICogMiA9IDAuMzc1ICAgPT4gMFxuICAgIC8vIDAuMzc1ICAgKiAyID0gMC43NSAgICA9PiAwXG4gICAgLy8gMC43NSAgICAqIDIgPSAxLjUgICAgID0+IDFcbiAgICAvLyAwLjUgICAgICogMiA9IDEgICAgICAgPT4gMVxuICAgIGZvcihsZXQgaSA9IDA7IGkgPCBkZWNpbWFsc0JpdHNTaXplOyBpKyspIHtcbiAgICAgIGRlY2ltYWxzUGFydCAqPSAyO1xuXG4gICAgICBpZiAoZGVjaW1hbHNQYXJ0ID49IDEpIHtcbiAgICAgICAgZGVjaW1hbHNQYXJ0IC09IDE7XG4gICAgICAgIGJpbmFyeURlY2ltYWxzUGFydCArPSBcIjFcIjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGJpbmFyeURlY2ltYWxzUGFydCArPSBcIjBcIjtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBsZXQgYmluYXJ5TWFudGlzc2EgPSBiaW5hcnlJbnRlZ2VyUGFydCArIGJpbmFyeURlY2ltYWxzUGFydDtcblxuICAgIC8vIEdldCB0aGUgcG9zaXRpb24gb2YgdGhlIGZpcnN0IGJpdCBhdCAxLCBmb3Igb25seSBkZWNpbWFscyBudW1iZXJcbiAgICBsZXQgbWFudGlzc2FEb3RQb3NpdGlvbiA9IC1iaW5hcnlNYW50aXNzYS5pbmRleE9mKFwiMVwiKTtcblxuICAgIC8vIFJlbW92ZSBhbGwgdGhlIGxlYWRpbmcgYml0IGF0IDAgZnJvbSB0aGUgbWFudGlzc2FcbiAgICBiaW5hcnlNYW50aXNzYSA9IHRoaXMuX2JoLmNsZWFuKGJpbmFyeU1hbnRpc3NhKTtcblxuICAgIC8vIElmIHRoZSBwb3NpdGlvbiBvZiB0aGUgZmlyc3QgYml0IGF0IDEgaXMgMFxuICAgIC8vIHRoZW4gdGhlIGRvdCBwb3NpdGlvbiBpcyBlcXVhbHMgdG8gdGhlIGxlbmd0aCBvZiB0aGUgYmluYXJ5IGludGVnZXIgcGFydCBvZiB0aGUgbWFudGlzc2FcbiAgICBpZiAobWFudGlzc2FEb3RQb3NpdGlvbiA9PT0gMCkge1xuICAgICAgbWFudGlzc2FEb3RQb3NpdGlvbiA9IGJpbmFyeUludGVnZXJQYXJ0Lmxlbmd0aCAtIDE7XG4gICAgfVxuXG4gICAgLy8gSGlkZSB0aGUgZmlyc3QgYml0IGF0IDFcbiAgICBiaW5hcnlNYW50aXNzYSA9IGJpbmFyeU1hbnRpc3NhLnN1YnN0cmluZygxKTtcblxuICAgIC8vIE1ha2Ugc3VyZSB0aGF0IHRoZSBtYW50aXNzYSBtYXRjaGVzIHRoZSBjb3JyZWN0IGxlbmd0aCAoMjMgZm9yIDMyIGJpdHMgZm9yIGV4YW1wbGUpXG4gICAgYmluYXJ5TWFudGlzc2EgPSBiaW5hcnlNYW50aXNzYS5wYWRFbmQodGhpcy5tYW50aXNzYUJpdHNTaXplLCBcIjBcIik7XG5cbiAgICB0aGlzLmJpbmFyeU1hbnRpc3NhID0gYmluYXJ5TWFudGlzc2E7XG4gICAgdGhpcy5fbWFudGlzc2FEb3RQb3NpdGlvbiA9IG1hbnRpc3NhRG90UG9zaXRpb247XG4gIH1cblxuICAvKipcbiAgICogQ2FsY3VsYXRlIHRoZSBleHBvbmVudCBpbiBiaW5hcnlcbiAgICogZSA9IGJpbmFyeShtYW50aXNzYUZsb2F0UG9zaXRpb24gKyBiaWFzKVxuICAgKi9cbiAgY2FsY3VsYXRlQmluYXJ5RXhwb25lbnQoKSB7XG4gICAgLy8gSWYgdGhlIG51bWJlciBpcyBOYU4gb3IgSW5maW5pdHkgdGhlbiBhbGwgdGhlIGJpdHMgb2YgdGhlIGV4cG9uZW50IGFyZSBlcXVhbHMgdG8gMVxuICAgIGlmIChOdW1iZXIuaXNOYU4odGhpcy5udW1iZXIpIHx8IHRoaXMubnVtYmVyID09PSBJbmZpbml0eSkge1xuICAgICAgdGhpcy5fYmluYXJ5RXhwb25lbnQgPSBcIlwiLnBhZEVuZCh0aGlzLmV4cG9uZW50Qml0c1NpemUsIFwiMVwiKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBsZXQgZXhwb25lbnQgPSB0aGlzLm1hbnRpc3NhRG90UG9zaXRpb24gKyB0aGlzLmJpYXM7XG5cbiAgICAvLyBJZiB0aGUgbnVtYmVyIGlzIDAgdGhlbiBhbGwgdGhlIGJpdHMgb2YgdGhlIGV4cG9uZW50IGFyZSBlcXVhbHMgdG8gMFxuICAgIGlmICh0aGlzLm51bWJlciA9PT0gMCkge1xuICAgICAgZXhwb25lbnQgPSAwO1xuICAgIH1cblxuICAgIC8vIENvbnZlcnQgdGhlIGV4cG9uZW50IHRvIGJpbmFyeSBhbmQgYWRkIGxlYWRpbmcgMCB0byBtYXRjaCB0aGUgZXhwb25lbnQgYml0cyBzaXplXG4gICAgdGhpcy5fYmluYXJ5RXhwb25lbnQgPSB0aGlzLl9iaC5kZWNpbWFsVG9CaW5hcnkoZXhwb25lbnQpLnBhZFN0YXJ0KHRoaXMuZXhwb25lbnRCaXRzU2l6ZSwgXCIwXCIpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZCB0d28gYmluYXJ5IGZsb2F0IG51bWJlclxuICAgKiBAcGFyYW0gYmYyIFRoZSBiaW5hcnkgZmxvYXQgbnVtYmVyIHRvIGFkZFxuICAgKiBAcmV0dXJucyBUaGUgcmVzdWx0IG9mIHRoZSBhZGRpdGlvblxuICAgKi9cbiAgYWRkKGJmMjogQmluYXJ5RmxvYXQpIHtcbiAgICBjb25zdCBiZlJlcyA9IG5ldyBCaW5hcnlGbG9hdCgxLCB0aGlzLmJpdHNTaXplKTtcblxuICAgIC8vIFNwZWNpYWwgY2FzZXNcbiAgICBpZiAodGhpcy5pc05hTiB8fCBiZjIuaXNOYU4pIHtcbiAgICAgIHJldHVybiBCaW5hcnlGbG9hdC5nZXROYU4odGhpcy5iaXRzU2l6ZSk7XG4gICAgfVxuICAgIGlmICh0aGlzLmlzSW5maW5pdHkgfHwgYmYyLmlzSW5maW5pdHkpIHtcbiAgICAgIHJldHVybiBCaW5hcnlGbG9hdC5nZXRJbmZpbml0eSh0aGlzLmJpdHNTaXplKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuYmluYXJ5QWJzID09PSBiZjIuYmluYXJ5QWJzICYmIHRoaXMuYmluYXJ5U2lnbiAhPT0gYmYyLmJpbmFyeVNpZ24pIHtcbiAgICAgIHJldHVybiBCaW5hcnlGbG9hdC5nZXRaZXJvKHRoaXMuYml0c1NpemUpO1xuICAgIH1cblxuICAgIC8vIFN0ZXAgMTogRGV0ZXJtaW5lIHRoZSBsb3dlc3QgZXhwb25lbnQgYmV0d2VlbiB0aGlzIGFuZCB0aGUgc2Vjb25kIG51bWJlclxuICAgIGxldCBiZk1pbkJpbmFyeUV4cG9uZW50OiBCaW5hcnlGbG9hdCA9IHRoaXM7XG4gICAgbGV0IGJmTWF4QmluYXJ5RXhwb25lbnQ6IEJpbmFyeUZsb2F0ID0gYmYyO1xuICAgIGlmICh0aGlzLl9iaC5iaW5hcnlUb0RlY2ltYWwoYmYyLmJpbmFyeUV4cG9uZW50KSA8IHRoaXMuX2JoLmJpbmFyeVRvRGVjaW1hbChiZk1pbkJpbmFyeUV4cG9uZW50LmJpbmFyeUV4cG9uZW50KSkge1xuICAgICAgYmZNaW5CaW5hcnlFeHBvbmVudCA9IGJmMjtcbiAgICAgIGJmTWF4QmluYXJ5RXhwb25lbnQgPSB0aGlzO1xuICAgIH1cbiAgICAvLyBDb3B5IHRoZSBudW1iZXIsIGRvIG5vdCBzZXQgYnkgcmVmZXJlbmNlXG4gICAgYmZNYXhCaW5hcnlFeHBvbmVudCA9IG5ldyBCaW5hcnlGbG9hdChiZk1heEJpbmFyeUV4cG9uZW50LmNvbXB1dGVkTnVtYmVyLCB0aGlzLmJpdHNTaXplKTtcbiAgICBiZk1pbkJpbmFyeUV4cG9uZW50ID0gbmV3IEJpbmFyeUZsb2F0KGJmTWluQmluYXJ5RXhwb25lbnQuY29tcHV0ZWROdW1iZXIsIHRoaXMuYml0c1NpemUpO1xuXG4gICAgLy8gSWYgdGhlcmUgaXMgYSAwIHRoZW4gcmV0dXJuIHRoZSBub24temVybyBudW1iZXJcbiAgICBpZiAoYmZNaW5CaW5hcnlFeHBvbmVudC5pc1plcm8pIHtcbiAgICAgIHJldHVybiBiZk1heEJpbmFyeUV4cG9uZW50O1xuICAgIH1cblxuICAgIC8vIEFkZCB0aGUgaGlkZGVuIGJpdFxuICAgIGJmTWluQmluYXJ5RXhwb25lbnQuYmluYXJ5TWFudGlzc2EgPSBcIjFcIiArIGJmTWluQmluYXJ5RXhwb25lbnQuYmluYXJ5TWFudGlzc2E7XG4gICAgYmZNYXhCaW5hcnlFeHBvbmVudC5iaW5hcnlNYW50aXNzYSA9IFwiMVwiICsgYmZNYXhCaW5hcnlFeHBvbmVudC5iaW5hcnlNYW50aXNzYTtcblxuICAgIC8vIFN0ZXAgMjogU2hpZnQgdGhlIG1hbnRpc3NhXG4gICAgY29uc3Qgc2hpZnRWYWx1ZSA9IGJmTWF4QmluYXJ5RXhwb25lbnQuY29tcHV0ZWRFeHBvbmVudCAtIGJmTWluQmluYXJ5RXhwb25lbnQuY29tcHV0ZWRFeHBvbmVudDtcbiAgICBjb25zdCBzaGlmdGVkTWluTWFudGlzc2EgPSB0aGlzLl9iaC5zaGlmdFJpZ2h0KGJmTWluQmluYXJ5RXhwb25lbnQuYmluYXJ5TWFudGlzc2EsIHNoaWZ0VmFsdWUpO1xuICAgIGJmTWluQmluYXJ5RXhwb25lbnQuYmluYXJ5TWFudGlzc2EgPSBzaGlmdGVkTWluTWFudGlzc2E7XG4gICAgXG4gICAgLy8gU3RlcCAzOiBQdXQgdGhlIHNhbWUgZXhwb25lbnRcbiAgICBiZlJlcy5iaW5hcnlFeHBvbmVudCA9IGJmTWF4QmluYXJ5RXhwb25lbnQuYmluYXJ5RXhwb25lbnQ7XG5cbiAgICAvLyBTdGVwIDQ6IDIncyBjb21wbGVtZW50IGlmIG5lZ2F0aXZlXG4gICAgaWYgKGJmTWluQmluYXJ5RXhwb25lbnQuY29tcHV0ZWRTaWduID09PSAtMSkge1xuICAgICAgYmZNaW5CaW5hcnlFeHBvbmVudC5iaW5hcnlNYW50aXNzYSA9IHRoaXMuX2JoLmMyKGJmTWluQmluYXJ5RXhwb25lbnQuYmluYXJ5TWFudGlzc2EpLnJldmVyc2UoKS5qb2luKFwiXCIpO1xuICAgIH1cbiAgICBpZiAoYmZNYXhCaW5hcnlFeHBvbmVudC5jb21wdXRlZFNpZ24gPT09IC0xKSB7XG4gICAgICBiZk1heEJpbmFyeUV4cG9uZW50LmJpbmFyeU1hbnRpc3NhID0gdGhpcy5fYmguYzIoYmZNYXhCaW5hcnlFeHBvbmVudC5iaW5hcnlNYW50aXNzYSkucmV2ZXJzZSgpLmpvaW4oXCJcIik7XG5cbiAgICAgIGlmIChiZk1heEJpbmFyeUV4cG9uZW50LmNvbXB1dGVkU2lnbiAhPT0gYmZNaW5CaW5hcnlFeHBvbmVudC5jb21wdXRlZFNpZ24pIHtcbiAgICAgICAgYmZSZXMuYmluYXJ5U2lnbiA9IFwiMVwiO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIFN0ZXAgNTogQWRkIHRoZSBtYW50aXNzYSBhbmQgdGhlIHNoaWZ0ZWQgb25lXG4gICAgYmZSZXMuYmluYXJ5TWFudGlzc2EgPSB0aGlzLl9iaC5iaW5hcnlBZGRpdGlvbihcbiAgICAgIGJmTWF4QmluYXJ5RXhwb25lbnQuYmluYXJ5TWFudGlzc2EsXG4gICAgICBiZk1pbkJpbmFyeUV4cG9uZW50LmJpbmFyeU1hbnRpc3NhLFxuICAgICkucmV2ZXJzZSgpLmpvaW4oXCJcIik7XG5cbiAgICAvLyBTdGVwIDc6IE5vcm1hbGl6ZSB0aGUgbWFudGlzc2FcbiAgICAvLyBIaWRlIHRoZSBmaXJzdCBiaXRcbiAgICBiZlJlcy5iaW5hcnlNYW50aXNzYSA9IGJmUmVzLmJpbmFyeU1hbnRpc3NhLnN1YnN0cmluZygxKTtcblxuICAgIC8vIE5vcm1hbGl6ZSB0aGUgbWFudGlzc2EgaWYgdGhlcmUgaXMgYSBjYXJyeVxuICAgIGlmIChiZlJlcy5iaW5hcnlNYW50aXNzYS5sZW5ndGggLSBiZlJlcy5tYW50aXNzYUJpdHNTaXplID09PSAxKSB7XG4gICAgICAvLyBSb3VuZCB0aGUgbGFzdCBiaXRcbiAgICAgIGNvbnN0IGxhc3RCaXQgPSAgYmZSZXMuYmluYXJ5TWFudGlzc2FbYmZSZXMuYmluYXJ5TWFudGlzc2EubGVuZ3RoIC0gMV07XG4gICAgICBjb25zdCBiZWZvcmVMYXN0Qml0ID0gIGJmUmVzLmJpbmFyeU1hbnRpc3NhW2JmUmVzLmJpbmFyeU1hbnRpc3NhLmxlbmd0aCAtIDJdO1xuICAgICAgYmZSZXMuYmluYXJ5TWFudGlzc2EgPSBiZlJlcy5iaW5hcnlNYW50aXNzYS5zbGljZSgwLCAtMSk7XG4gICAgICBpZiAoYmVmb3JlTGFzdEJpdCA9PT0gXCIxXCIgJiYgbGFzdEJpdCA9PT0gXCIxXCIpIHtcbiAgICAgICAgYmZSZXMuYmluYXJ5TWFudGlzc2EgPSB0aGlzLl9iaC5iaW5hcnlBZGRpdGlvbihiZlJlcy5iaW5hcnlNYW50aXNzYSwgXCIxXCIpLnJldmVyc2UoKS5qb2luKFwiXCIpO1xuICAgICAgfVxuXG4gICAgICAvLyBBZGQgMSB0byB0aGUgZXhwb25lbnRcbiAgICAgIGJmUmVzLmJpbmFyeUV4cG9uZW50ID0gdGhpcy5fYmguYWRkTnVtYmVyVG9CaW5hcnkoYmZSZXMuYmluYXJ5RXhwb25lbnQsIDEpWzBdO1xuICAgIH1cblxuICAgIHJldHVybiBiZlJlcztcbiAgfVxuXG4gIC8qKlxuICAgKiBGaW5kIHRoZSBtaW5pbXVtIGJpdHMgc2l6ZSB0byBtYXRjaCB0aGUgbnVtYmVyIGFsbW9zdCBcInBlcmZlY3RseVwiXG4gICAqIEBwYXJhbSBtYXhCaXRTaXplIERlZmF1bHQgMjU2LCB0aGUgYml0cyBzaXplIGxpbWl0XG4gICAqL1xuICBmaW5kQWNjdXJhdGVCaXRzU2l6ZShtYXhCaXRTaXplID0gMjU2KSB7XG4gICAgdGhpcy5iaXRzU2l6ZSA9IEJpbmFyeUZsb2F0Ll9taW5CaXRTaXplO1xuICAgIFxuICAgIHdoaWxlKHRoaXMuYml0c1NpemUgPCBtYXhCaXRTaXplICYmIHRoaXMubWFyZ2luT2ZFcnJvciAhPT0gMCkge1xuICAgICAgdGhpcy5iaXRzU2l6ZSsrO1xuICAgICAgdGhpcy5jYWxjdWxhdGUoKTtcbiAgICB9XG4gIH1cbn1cbiIsIi8qKlxuICogTGFibzogMSAoRmxvYXQgdG8gYmluYXJ5IGNvbnZlcnNpb24pXG4gKiBBdXRob3JzOiBPd2VuIEdvbWJhcywgRGF2aWQgRGFybWFuZ2VyLCBKdWxpZW4gVmF1Y2hlciwgQ2zDqW1lbnQgUGV0aWduYXRcbiAqIFRlYW06IDJcbiAqIFNjaG9vbDogSEUtQXJjXG4gKiBEYXRlOiAyMSBtYXJzIDIwMjJcbiAqIENvdXJzZTogTWF0aMOpbWF0aXF1ZXMgc3DDqWNpZmlxdWVzIChNb2R1bGUgMjIzNCkgLSBNLiBTdMOpcGhhbmUgR29icm9uXG4gKi9cblxuaW1wb3J0IHsgQmluYXJ5RmxvYXQgfSBmcm9tIFwiLi9jbGFzc2VzL0JpbmFyeUZsb2F0XCI7XG5cbmNvbnN0IGJmQmluYXJ5TnVtYmVyRWxlbWVudCA9IDxIVE1MSW5wdXRFbGVtZW50PmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYmYtYmluYXJ5LW51bWJlclwiKTtcbmNvbnN0IGJmUmVzdWx0RWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYmYtcmVzdWx0XCIpO1xuY29uc3QgcmVnZXhCaW5hcnkgPSAvXlswMVxcc10rJC87XG5jb25zdCBtaW5MZW5ndGggPSA4O1xuY29uc3QgbWF4TGVuZ3RoID0gMjU2O1xuXG5mdW5jdGlvbiBvbkNoYW5nZUNvbnZlcnRlckJmKCkge1xuICBjb25zdCBiaW5hcnlOdW1iZXIgPSBiZkJpbmFyeU51bWJlckVsZW1lbnQudmFsdWU7XG5cbiAgaWYgKGJpbmFyeU51bWJlci5sZW5ndGggPCBtaW5MZW5ndGggJiYgYmluYXJ5TnVtYmVyICE9PSBcIlwiKSB7XG4gICAgYmZSZXN1bHRFbGVtZW50LmlubmVySFRNTCA9IGA8c3BhbiBjbGFzcz1cImNvbG9yLXJlZFwiPkxhIHRhaWxsZSBkZXMgYml0cyBkb2l0IGF1IG1pbmltdW0gw6p0cmUgJHttaW5MZW5ndGh9PC9zcGFuPmA7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgaWYgKGJpbmFyeU51bWJlci5sZW5ndGggPiBtYXhMZW5ndGgpIHtcbiAgICBiZlJlc3VsdEVsZW1lbnQuaW5uZXJIVE1MID0gYDxzcGFuIGNsYXNzPVwiY29sb3ItcmVkXCI+TGEgdGFpbGxlIGRlcyBiaXRzIGRvaXQgYXUgbWF4aW11bSDDqnRyZSAke21heExlbmd0aH08L3NwYW4+YDtcbiAgICByZXR1cm47XG4gIH1cbiAgXG4gIGlmIChiZkJpbmFyeU51bWJlckVsZW1lbnQudmFsdWUgPT09IFwiXCIgKSB7XG4gICAgYmZSZXN1bHRFbGVtZW50LmlubmVySFRNTCA9IGA8c3BhbiBjbGFzcz1cImNvbG9yLWdyZXlcIj5WZXVpbGxleiByZW5zZWlnbmVyIHRvdXMgbGVzIGNoYW1wczwvc3Bhbj5gO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGlmICghcmVnZXhCaW5hcnkudGVzdChiaW5hcnlOdW1iZXIpKSB7XG4gICAgYmZSZXN1bHRFbGVtZW50LmlubmVySFRNTCA9IGA8c3BhbiBjbGFzcz1cImNvbG9yLXJlZFwiPkNlIG4nZXN0IHBhcyB1biBub21icmUgYmluYWlyZTwvc3Bhbj5gO1xuICAgIHJldHVybjtcbiAgfVxuICBcbiAgY29uc3QgYmYgPSBuZXcgQmluYXJ5RmxvYXQoYmluYXJ5TnVtYmVyKTtcblxuICBiZlJlc3VsdEVsZW1lbnQuaW5uZXJIVE1MID0gYFxuICAgIDxkaXYgY2xhc3M9XCJyZXN1bHQtZ3JvdXBcIj5cbiAgICAgIFRhaWxsZSBlbiBiaXRzIHRvdGFsOiAke2JmLmJpdHNTaXplfVxuICAgIDwvZGl2PlxuXG4gICAgPGRpdiBjbGFzcz1cInJlc3VsdC1ncm91cFwiPlxuICAgICAgVGFpbGxlIGVuIGJpdHMgZGUgbCdleHBvc2FudDogJHtiZi5leHBvbmVudEJpdHNTaXplfVxuICAgIDwvZGl2PlxuICAgIFxuICAgIDxkaXYgY2xhc3M9XCJyZXN1bHQtZ3JvdXBcIj5cbiAgICAgIFRhaWxsZSBlbiBiaXRzIGRlIGxhIG1hbnRpc3NlOiAke2JmLm1hbnRpc3NhQml0c1NpemV9XG4gICAgPC9kaXY+XG5cbiAgICA8ZGl2IGNsYXNzPVwicmVzdWx0LWdyb3VwXCI+XG4gICAgICBCaWFpczogJHtiZi5iaWFzfVxuICAgIDwvZGl2PlxuICAgIFxuICAgIDxkaXYgY2xhc3M9XCJyZXN1bHQtZ3JvdXBcIj5cbiAgICAgIFNpZ25lOlxuICAgICAgPHNwYW4gY2xhc3M9XCJjb2xvci1yZWQgbW9ub1wiPiR7YmYuYmluYXJ5U2lnbn08L3NwYW4+XG4gICAgICA8c3BhbiBjbGFzcz1cIm1vbm9cIj4oJHtiZi5jb21wdXRlZFNpZ24gPiAwID8gXCIrXCIgOiBcIi1cIn0pPC9zcGFuPlxuICAgIDwvZGl2PlxuICAgIFxuICAgIDxkaXYgY2xhc3M9XCJyZXN1bHQtZ3JvdXBcIj5cbiAgICAgIE1hbnRpc3NlOlxuICAgICAgPHNwYW4gY2xhc3M9XCJjb2xvci1vcmFuZ2UgbW9ub1wiPlxuICAgICAgICAke2JmLmJpbmFyeU1hbnRpc3NhfVxuICAgICAgPC9zcGFuPlxuICAgICAgPHNwYW4gY2xhc3M9XCJtb25vXCI+KCR7YmYuY29tcHV0ZWRNYW50aXNzYX0pPC9zcGFuPlxuICAgIDwvZGl2PlxuXG4gICAgPGRpdiBjbGFzcz1cInJlc3VsdC1ncm91cFwiPlxuICAgICAgRXhwb3NhbnQ6IDxzcGFuIGNsYXNzPVwiY29sb3ItYmx1ZSBtb25vXCI+JHtiZi5iaW5hcnlFeHBvbmVudH08L3NwYW4+XG4gICAgICA8c3BhbiBjbGFzcz1cIm1vbm9cIj4oMjxzdXA+JHtiZi5jb21wdXRlZEV4cG9uZW50fTwvc3VwPik8L3NwYW4+XG4gICAgPC9kaXY+XG4gICAgXG4gICAgPGRpdiBjbGFzcz1cInJlc3VsdC1ncm91cFwiPlxuICAgICAgUsOpc3VsdGF0IGVuIGJpbmFpcmU6XG4gICAgICA8c3BhbiBjbGFzcz1cImNvbG9yLXJlZCBtb25vXCI+JHtiZi5iaW5hcnlTaWdufTwvc3Bhbj5cbiAgICAgIDxzcGFuIGNsYXNzPVwiY29sb3ItYmx1ZSBtb25vXCI+JHtiZi5iaW5hcnlFeHBvbmVudH08L3NwYW4+XG4gICAgICA8c3BhbiBjbGFzcz1cImNvbG9yLW9yYW5nZSBtb25vXCI+JHtiZi5iaW5hcnlNYW50aXNzYX08L3NwYW4+XG4gICAgPC9kaXY+XG4gICAgXG4gICAgPGRpdiBjbGFzcz1cInJlc3VsdC1ncm91cFwiPlxuICAgICAgUsOpc3VsdGF0OiAke2JmLmNvbXB1dGVkTnVtYmVyfVxuICAgIDwvZGl2PlxuICBgO1xufVxuXG5iZkJpbmFyeU51bWJlckVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCBvbkNoYW5nZUNvbnZlcnRlckJmKTtcbmJmQmluYXJ5TnVtYmVyRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwia2V5dXBcIiwgb25DaGFuZ2VDb252ZXJ0ZXJCZik7XG5cbm9uQ2hhbmdlQ29udmVydGVyQmYoKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==
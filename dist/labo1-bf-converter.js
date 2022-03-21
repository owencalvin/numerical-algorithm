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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Z0IsdUhBSUMsRUFBRSxDQUFDLGNBQWMsd0RBQy9CLEVBQUUsQ0FBQyxnQkFBZ0IsdUpBS2hCLEVBQUUsQ0FBQyxVQUFVLDREQUNaLEVBQUUsQ0FBQyxjQUFjLDhEQUNmLEVBQUUsQ0FBQyxjQUFjLCtGQUl2QyxFQUFFLENBQUMsY0FBYyxxQkFFaEMsQ0FBQztBQUNKLENBQUM7QUFFRCxxQkFBcUIsQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsbUJBQW1CLENBQUMsQ0FBQztBQUN0RSxxQkFBcUIsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsbUJBQW1CLENBQUMsQ0FBQztBQUVyRSxtQkFBbUIsRUFBRSxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbWF0aF9zcGUvLi9zcmMvY2xhc3Nlcy9CaW5hcnlIZWxwZXIudHMiLCJ3ZWJwYWNrOi8vbWF0aF9zcGUvLi9zcmMvY2xhc3Nlcy9CaW5hcnlGbG9hdC50cyIsIndlYnBhY2s6Ly9tYXRoX3NwZS8uL3NyYy9sYWJvMS1iZi1jb252ZXJ0ZXIudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBMYWJvOiAwIChCaW5hcnkgb3BlcmF0aW9ucylcbiAqIEF1dGhvcnM6IE93ZW4gR29tYmFzLCBEYXZpZCBEYXJtYW5nZXIsIEp1bGllbiBWYXVjaGVyLCBDbMOpbWVudCBQZXRpZ25hdFxuICogVGVhbTogMlxuICogU2Nob29sOiBIRS1BcmNcbiAqIERhdGU6IDIxIG1hcnMgMjAyMlxuICogQ291cnNlOiBNYXRow6ltYXRpcXVlcyBzcMOpY2lmaXF1ZXMgKE1vZHVsZSAyMjM0KSAtIE0uIFN0w6lwaGFuZSBHb2Jyb25cbiAqL1xuXG5leHBvcnQgY2xhc3MgQmluYXJ5SGVscGVyIHtcbiAgLyoqXG4gICAqIEdldCBuIGJpdCBvZiAwIG9yIDFcbiAgICogQHBhcmFtIHZhbHVlIDEgb3IgMFxuICAgKiBAcGFyYW0gbiBUaGUgbnVtYmVyIG9mIGJpdHMgdG8gcmV0cmlldmVcbiAgICogQHJldHVybnMgbiBiaXQgb2YgMCBvciAxXG4gICAqL1xuICBwdWJsaWMgZ2V0TkJpdCh2YWx1ZTogMSB8IDAsIG46IG51bWJlcik6IHN0cmluZyB7XG4gICAgbGV0IHJlcyA9IFwiXCI7XG4gICAgXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuOyBpKyspIHtcbiAgICAgIHJlcyArPSB2YWx1ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZCBuIHplcm9zIGJlZm9yZSB0aGUgYmluYXJ5IG51bWJlclxuICAgKiBAcGFyYW0gbiBUaGUgbnVtYmVyIG9mIDAgdG8gYWRkIGJlZm9yZSB0aGUgYmluYXJ5IG51bWJlclxuICAgKiBAcGFyYW0gYiBUaGUgYmluYXJ5IG51bWJlclxuICAgKiBAcmV0dXJucyBUaGUgYmluYXJ5IG51bWJlciB3aXRoIG4gemVyb3MgYmVmb3JlXG4gICAqL1xuICBwdWJsaWMgYWRkUGFkZGluZyhuOiBudW1iZXIsIGIgPSBcIlwiKSB7XG4gICAgY29uc3Qgc2l6ZSA9IG4gLSBiLmxlbmd0aDtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2l6ZTsgaSsrKSB7XG4gICAgICBiID0gXCIwXCIgKyBiO1xuICAgIH1cblxuICAgIHJldHVybiBiO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgdGhlIHplcm9zIGJlZm9yZSBhIGJpbmFyeSBudW1iZXIgKDAwMDEwMSBiZWNvbWVzIDEwMSlcbiAgICogQHBhcmFtIGIgVGhlIGJpbmFyeSBudW1iZXJcbiAgICogQHJldHVybnMgVGhlIHByb2R1Y2VkIGJpbmFyeSBudW1iZXJcbiAgICovXG4gIHB1YmxpYyBjbGVhbihiOiBzdHJpbmcpIHtcbiAgICBsZXQgcmVzID0gYjtcblxuICAgIGZvcihsZXQgaSA9IDA7IGkgPCBiLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoYltpXSA9PT0gXCIwXCIpIHtcbiAgICAgICAgcmVzID0gcmVzLnN1YnN0cmluZygxKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiByZXM7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHJlcyA9PT0gXCJcIikge1xuICAgICAgcmV0dXJuIFwiMFwiO1xuICAgIH1cbiAgfVxuXG5cbiAgLyoqXG4gICAqIEFkZCAwIHBhZGRpbmcgdG8gdGhlIHNtYWxsZXN0IGJpbmFyeSBudW1iZXIgdG8gbWF0Y2ggdGhlIGxvbmdlc3Qgb25lJ3MgbGVuZ3RoXG4gICAqIFsxMDEsIDExMDAxXSBiZWNvbWVzIFswMDEwMSwgMTEwMDFdXG4gICAqIEBwYXJhbSBiMSBUaGUgZmlyc3QgYmluYXJ5IG51bWJlclxuICAgKiBAcGFyYW0gYjIgVGhlIHNlY29uZCBiaW5hcnkgbnVtYmVyXG4gICAqIEByZXR1cm5zIFtiMSwgYjJdIHdpdGggY29ycmVjdCBwYWRkaW5nXG4gICAqL1xuICBwdWJsaWMgYWRkTWF4UGFkZGluZyhiMTogc3RyaW5nLCBiMjogc3RyaW5nKSB7XG4gICAgaWYgKGIyLmxlbmd0aCA+IGIxLmxlbmd0aCkge1xuICAgICAgYjEgPSB0aGlzLmFkZFBhZGRpbmcoYjIubGVuZ3RoLCBiMSk7XG4gICAgfSBlbHNlIGlmIChiMS5sZW5ndGggPiBiMi5sZW5ndGgpIHtcbiAgICAgIGIyID0gdGhpcy5hZGRQYWRkaW5nKGIxLmxlbmd0aCwgYjIpO1xuICAgIH1cblxuICAgIHJldHVybiBbYjEsIGIyXTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIG1heCBsZW5ndGggb2YgdHdvIGJpbmFyaWVzIG51bWJlcnNcbiAgICogQHBhcmFtIGIxIFRoZSBmaXJzdCBiaW5hcnkgbnVtYmVyXG4gICAqIEBwYXJhbSBiMiBUaGUgc2Vjb25kIGJpbmFyeSBudW1iZXJcbiAgICogQHJldHVybnMgVGhlIG1heCBsZW5ndGhcbiAgICovXG4gIHB1YmxpYyBnZXRNYXhMZW5ndGgoYjE6IHN0cmluZywgYjI6IHN0cmluZykge1xuICAgIGlmIChiMS5sZW5ndGggPiBiMi5sZW5ndGgpIHtcbiAgICAgIHJldHVybiBiMS5sZW5ndGg7XG4gICAgfVxuICAgIHJldHVybiBiMi5sZW5ndGg7XG4gIH1cblxuICAvKipcbiAgICogQ29udmVydCBhIG51bWJlciB0byBpdCdzIGJpbmFyeSByZXByZXNlbnRhdGlvblxuICAgKiBAcGFyYW0gZGVjaW1hbCBUaGUgXG4gICAqIEByZXR1cm5zIFRoZSBiaW5hcnkgcmVwcmVzZW50YXRpb24gb2YgdGhlIGRlY2ltYWwgbnVtYmVyXG4gICAqL1xuICBwdWJsaWMgZGVjaW1hbFRvQmluYXJ5KGRlY2ltYWw6IG51bWJlcikge1xuICAgIGNvbnN0IG9yaWdpbmFsTnVtYmVyID0gZGVjaW1hbDtcbiAgICBsZXQgYmluYXJ5TnVtYmVyID0gKE1hdGguYWJzKGRlY2ltYWwpID4+PiAwKS50b1N0cmluZygyKTtcblxuICAgIGlmIChvcmlnaW5hbE51bWJlciA8IDApIHtcbiAgICAgIGJpbmFyeU51bWJlciA9IHRoaXMuYzIoYmluYXJ5TnVtYmVyKS5yZXZlcnNlKCkuam9pbihcIlwiKTtcbiAgICB9XG5cbiAgICByZXR1cm4gYmluYXJ5TnVtYmVyO1xuICB9XG5cbiAgLyoqXG4gICAqIENvbnZlcnQgYSBiaW5hcnkgcmVwcmVzZW50YXRpb24gb2YgYSBudW1iZXIgdG8gYSBkZWNpbWFsIG51bWJlclxuICAgKiBAcGFyYW0gYmluYXJ5IFRoZSBiaW5hcnkgcmVwcmVzZW50YXRpb24gb2YgYSBudW1iZXJcbiAgICogQHJldHVybnMgVGhlIGludCByZXByZXNlbnRhdGlvbiBvZiBhIGJpbmFyeSBudW1iZXJcbiAgICovXG4gIHB1YmxpYyBiaW5hcnlUb0RlY2ltYWwoYmluYXJ5OiBzdHJpbmcpIHtcbiAgICByZXR1cm4gcGFyc2VJbnQoYmluYXJ5LCAyKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGQgaW50IHRvIGEgYmluYXJ5IG51bWJlclxuICAgKiBAcGFyYW0gYiBUaGUgYmluYXJ5IG51bWJlclxuICAgKiBAcGFyYW0gbiBUaGUgaW50IG51bWJlciB0byBhZGQgdG8gdGhlIGJpbmFyeSBudW1iZXJcbiAgICogQHJldHVybnMgVGhlIHByb2R1Y2VkIHJlc3VsdFxuICAgKi9cbiAgcHVibGljIGFkZE51bWJlclRvQmluYXJ5KGI6IHN0cmluZywgbjogbnVtYmVyKTogc3RyaW5nW10ge1xuICAgIHJldHVybiB0aGlzLmJpbmFyeUFkZGl0aW9uKGIsIHRoaXMuZGVjaW1hbFRvQmluYXJ5KG4pKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbnZlcnQgYSBiaW5hcnkgbnVtYmVyXG4gICAqIEBwYXJhbSBiIFRoZSBiaW5hcnkgbnVtYmVyIHRvIGludmVydFxuICAgKiBAcmV0dXJucyBUaGUgaW52ZXJ0IGJpbmFyeSBudW1iZXJcbiAgICovXG4gIHB1YmxpYyBpbnZlcnQoYjogc3RyaW5nKSB7XG4gICAgY29uc3QgaW5pdGlhbExlbmd0aCA9IGIubGVuZ3RoO1xuICAgIGIgPSB0aGlzLmRlY2ltYWxUb0JpbmFyeSh0aGlzLmJpbmFyeVRvRGVjaW1hbChiKSBeIHRoaXMuYmluYXJ5VG9EZWNpbWFsKHRoaXMuZ2V0TkJpdCgxLCBiLmxlbmd0aCkpKTtcbiAgICBiID0gdGhpcy5hZGRQYWRkaW5nKGluaXRpYWxMZW5ndGgsIGIpO1xuICAgIHJldHVybiBiO1xuICB9XG5cbiAgLyoqXG4gICAqIFNoaWZ0IHRoZSBiaW5hcnkgbnVtYmVyIHRvIHRoZSByaWdodFxuICAgKiBAcGFyYW0gYiBUaGUgYmluYXJ5IG51bWJlclxuICAgKiBAcGFyYW0gc2hpZnRWYWx1ZSBUaGUgc2hpZnQgdmFsdWVcbiAgICogQHJldHVybnMgVGhlIHNoaWZ0ZWQgYmluYXJ5IG51bWJlclxuICAgKi9cbiAgcHVibGljIHNoaWZ0UmlnaHQoYjogc3RyaW5nLCBzaGlmdFZhbHVlOiBudW1iZXIpIHtcbiAgICAvLyBcIjAwMDAwMTAxMFwiID4+IDIgPT4gXCIwMDAwMDAwMTBcIlxuICAgIC8vIDEuIFJlbW92ZXMgbGFzdHMgPHNoaWZ0VmFsdWU+IGJpdHNcbiAgICAvLyAyLiBQbGFjZXMgPHNoaWZ0VmFsdWU+IGJpdHMgYXQgMCBiZWZvcmVcblxuICAgIGlmIChzaGlmdFZhbHVlIDwgMSkge1xuICAgICAgcmV0dXJuIGI7XG4gICAgfVxuXG4gICAgbGV0IHJlcyA9IGI7XG4gICAgcmVzID0gcmVzLnNsaWNlKDAsIC1zaGlmdFZhbHVlKTtcbiAgICByZXMgPSBcIlwiLnBhZFN0YXJ0KHNoaWZ0VmFsdWUsIFwiMFwiKSArIHJlcztcblxuICAgIHJldHVybiByZXM7XG4gIH1cblxuICAvKipcbiAgICogU2hpZnQgdGhlIGJpbmFyeSBudW1iZXIgdG8gdGhlIGxlZnRcbiAgICogQHBhcmFtIGIgVGhlIGJpbmFyeSBudW1iZXJcbiAgICogQHBhcmFtIHNoaWZ0VmFsdWUgVGhlIHNoaWZ0IHZhbHVlXG4gICAqIEByZXR1cm5zIFRoZSBzaGlmdGVkIGJpbmFyeSBudW1iZXJcbiAgICovXG4gIHB1YmxpYyBzaGlmdExlZnQoYjogc3RyaW5nLCBzaGlmdFZhbHVlOiBudW1iZXIpIHtcbiAgICAvLyBcIjAwMDAwMTAxMFwiIDw8IDIgPT4gXCIwMDAwMDEwMTAwMFwiXG4gICAgLy8gMS4gUmVtb3ZlcyBsYXN0cyA8c2hpZnRWYWx1ZT4gYml0c1xuICAgIC8vIDIuIFBsYWNlcyA8c2hpZnRWYWx1ZT4gYml0cyBhdCAwIGJlZm9yZVxuXG4gICAgaWYgKHNoaWZ0VmFsdWUgPCAxKSB7XG4gICAgICByZXR1cm4gYjtcbiAgICB9XG5cbiAgICBsZXQgcmVzID0gYjtcbiAgICByZXMgPSByZXMuc2xpY2Uoc2hpZnRWYWx1ZSk7XG4gICAgcmVzICs9IFwiXCIucGFkRW5kKHNoaWZ0VmFsdWUsIFwiMFwiKTtcblxuICAgIHJldHVybiByZXM7XG4gIH1cblxuICAvKipcbiAgICogQWRkIDIgYml0IHRvZ2V0aGVyIHdpdGggdGhlIGNhcnJ5XG4gICAqIEBwYXJhbSB4IFRoZSBmaXJzdCBiaXRcbiAgICogQHBhcmFtIHkgVGhlIHNlY29uZCBiaXRcbiAgICogQHBhcmFtIGNhcnJ5IFRoZSBjYXJyeVxuICAgKiBAcmV0dXJucyBUaGUgcmVzdWx0IHdpdGggdGhlIGNhcnJ5IFtiaXQsIGNhcnJ5XVxuICAgKi9cbiAgcHVibGljIGVsZW1lbnRhcnlBZGRpdGlvbih4OiBzdHJpbmcsIHk6IHN0cmluZywgY2FycnkgPSBcIlwiKTogc3RyaW5nW10ge1xuICAgIGNvbnN0IHJlcyA9IE51bWJlcih4KSArIE51bWJlcih5KSArIE51bWJlcihjYXJyeSk7XG5cbiAgICBzd2l0Y2ggKHJlcykge1xuICAgICAgLy8gYyA9IDEsIHggPSAxLCB5ID0gMVxuICAgICAgY2FzZSAzOlxuICAgICAgICByZXR1cm4gW1wiMVwiLCBcIjFcIl07XG4gICAgICBjYXNlIDI6XG4gICAgICAgIHJldHVybiBbXCIwXCIsIFwiMVwiXTtcbiAgICAgIGNhc2UgMTpcbiAgICAgICAgcmV0dXJuIFtcIjFcIiwgXCJcIl07XG4gICAgICAvLyBjID0gMCwgeCA9IDAsIHkgPSAwXG4gICAgICBjYXNlIDA6XG4gICAgICAgIHJldHVybiBbXCIwXCIsIFwiXCJdO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBBZGQgMiBiaW5hcnkgbnVtYmVyc1xuICAgKiBAcGFyYW0gYjEgVGhlIGZpcnN0IGJpbmFyeSBudW1iZXJcbiAgICogQHBhcmFtIGIyIFRoZSBzZWNvbmQgYmluYXJ5IG51bWJlclxuICAgKiBAcmV0dXJucyBUaGUgcmVzdWx0IG9mIHRoZSBhZGRpdGlvbiBbYmluYXJ5TnVtYmVyLCBjYXJyeUJpdF1cbiAgICovXG4gIHB1YmxpYyBiaW5hcnlBZGRpdGlvbihiMTogc3RyaW5nLCBiMjogc3RyaW5nKSB7XG4gICAgbGV0IHJlcyA9IFwiXCI7XG4gICAgbGV0IGNhcnJ5ID0gXCJcIjtcbiAgICBjb25zdCBbYnAxLCBicDJdID0gdGhpcy5hZGRNYXhQYWRkaW5nKGIxLCBiMik7XG5cbiAgICBmb3IgKGxldCBpID0gYnAxLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICBjb25zdCBbciwgY10gPSB0aGlzLmVsZW1lbnRhcnlBZGRpdGlvbihicDFbaV0sIGJwMltpXSwgY2FycnkpO1xuICAgICAgcmVzID0gciArIHJlcztcbiAgICAgIGNhcnJ5ID0gYztcbiAgICB9XG5cbiAgICByZXR1cm4gW3JlcywgY2FycnldO1xuICB9XG5cbiAgLyoqXG4gICAqIFN1YnN0cmFjdCAyIGJpbmFyeSBudW1iZXJzXG4gICAqIEBwYXJhbSBiMSBUaGUgZmlyc3QgYmluYXJ5IG51bWJlclxuICAgKiBAcGFyYW0gYjIgVGhlIHNlY29uZCBiaW5hcnkgbnVtYmVyXG4gICAqIEByZXR1cm5zIFRoZSByZXN1bHQgb2YgdGhlIHN1YnN0cmFjdGlvbiBbYmluYXJ5TnVtYmVyLCBjYXJyeUJpdF1cbiAgICovXG4gIHB1YmxpYyBiaW5hcnlTdWJzdHJhY3Rpb24oYjE6IHN0cmluZywgYjI6IHN0cmluZykge1xuICAgIGNvbnN0IFticDEsIGJwMl0gPSB0aGlzLmFkZE1heFBhZGRpbmcoYjEsIGIyKTtcbiAgICByZXR1cm4gdGhpcy5iaW5hcnlBZGRpdGlvbihicDEsIHRoaXMuYzIoYnAyKS5yZXZlcnNlKCkuam9pbihcIlwiKSk7XG4gIH1cblxuICAvKipcbiAgICogUGVyZm9ybSBhIDIncyBjb21wbGVtZW50IG9wZXJhdGlvbiB3aXRob3V0IHRoZSBjYXJyeVxuICAgKiBAcGFyYW0gYiBUaGUgYmluYXJ5IG51bWJlclxuICAgKiBAcmV0dXJucyBUaGUgMidzIGNvbXBsZW1lbnQgb2YgdGhlIGJpbmFyeSBudW1iZXIgW2JpbmFyeU51bWJlciwgY2FycnldXG4gICAqL1xuICBwdWJsaWMgYzIoYjogc3RyaW5nKTogc3RyaW5nW10ge1xuICAgIGIgPSB0aGlzLmludmVydChiKTtcbiAgICByZXR1cm4gdGhpcy5hZGROdW1iZXJUb0JpbmFyeShiLCAxKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBNdWx0aXBseSAyIGJpbmFyeSBudW1iZXJzXG4gICAqIEBwYXJhbSBiMSBUaGUgZmlyc3QgYmluYXJ5IG51bWJlclxuICAgKiBAcGFyYW0gYjIgVGhlIHNlY29uZCBiaW5hcnkgbnVtYmVyXG4gICAqIEByZXR1cm5zIFRoZSByZXN1bHQgb2YgdGhlIG11bHRpcGxpY2F0aW9uXG4gICAqL1xuICBwdWJsaWMgYmluYXJ5TXVsdGlwbGljYXRpb24oYjE6IHN0cmluZywgYjI6IHN0cmluZykge1xuICAgIGxldCByZXMgPSBcIlwiO1xuICAgIGNvbnN0IGFkZFJlc3VsdHMgPSBbXTtcblxuICAgIC8vIFRoZSBiaW5hcnkgbnVtYmVycyB0byBtdWxpdHBseVxuICAgIC8vIGJwMSA9IDEwMTFcbiAgICAvLyBicDIgPSAxMTExXG4gICAgY29uc3QgW2JwMSwgYnAyXSA9IHRoaXMuYWRkTWF4UGFkZGluZyhiMSwgYjIpO1xuXG4gICAgLy8gQ2FsY3VsYXRlIHRoZSBvcGVyYW5kc1xuICAgIC8vIGFkZFJlc3VsdHMgPSBbXG4gICAgLy8gICAgMDAwMCAxMDExLFxuICAgIC8vICAgIDAwMDEgMDExMCxcbiAgICAvLyAgICAwMDEwIDExMDAsXG4gICAgLy8gICAgMTAxMSAwMDAwXG4gICAgLy8gXVxuICAgIGZvciAobGV0IGkgPSBicDEubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgIGxldCBjdXJyZW50UmVzID0gXCJcIjtcblxuICAgICAgZm9yIChsZXQgaiA9IGJwMS5sZW5ndGggLSAxOyBqID49IDA7IGotLSkge1xuICAgICAgICBjdXJyZW50UmVzID0gKE51bWJlcihicDFbal0pICogTnVtYmVyKGJwMltpXSkpICsgY3VycmVudFJlcztcbiAgICAgIH1cblxuICAgICAgY29uc3QgZGVjID0gdGhpcy5iaW5hcnlUb0RlY2ltYWwoY3VycmVudFJlcykgPDwgKGJwMS5sZW5ndGggLSAxIC0gaSk7XG4gICAgICBjdXJyZW50UmVzID0gdGhpcy5kZWNpbWFsVG9CaW5hcnkoZGVjKTtcbiAgICAgIGFkZFJlc3VsdHMucHVzaChjdXJyZW50UmVzKTtcbiAgICB9XG5cbiAgICAvLyBBZGQgZXZlcnl0aGluZ1xuICAgIC8vIHJlcyA9XG4gICAgLy8gICAwMDAwIDEwMTEsXG4gICAgLy8gKyAwMDAxIDAxMTAsXG4gICAgLy8gKyAwMDEwIDExMDAsXG4gICAgLy8gKyAxMDExIDAwMDBcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFkZFJlc3VsdHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IGFkZFJlc3VsdCA9IHRoaXMuYWRkUGFkZGluZyhhZGRSZXN1bHRzW2FkZFJlc3VsdHMubGVuZ3RoIC0gMV0ubGVuZ3RoLCBhZGRSZXN1bHRzW2ldKTtcbiAgICAgIGNvbnN0IFtyLCBjXSA9IHRoaXMuYmluYXJ5QWRkaXRpb24ocmVzLCBhZGRSZXN1bHQpO1xuICAgICAgcmVzID0gYyArIHI7XG4gICAgfVxuXG4gICAgLy8gcmVzID0gMTAxMDAxMDFcbiAgICByZXR1cm4gcmVzO1xuICB9XG59XG4iLCIvKipcbiAqIExhYm86IDEgKEZsb2F0IHRvIGJpbmFyeSBjb252ZXJzaW9uKVxuICogQXV0aG9yczogT3dlbiBHb21iYXMsIERhdmlkIERhcm1hbmdlciwgSnVsaWVuIFZhdWNoZXIsIENsw6ltZW50IFBldGlnbmF0XG4gKiBUZWFtOiAyXG4gKiBTY2hvb2w6IEhFLUFyY1xuICogRGF0ZTogMjEgbWFycyAyMDIyXG4gKiBDb3Vyc2U6IE1hdGjDqW1hdGlxdWVzIHNww6ljaWZpcXVlcyAoTW9kdWxlIDIyMzQpIC0gTS4gU3TDqXBoYW5lIEdvYnJvblxuICovXG5cbmltcG9ydCB7IEJpbmFyeUhlbHBlciB9IGZyb20gXCIuL0JpbmFyeUhlbHBlclwiO1xuXG4vKipcbiAqIEVuY29kZSBhIGZsb2F0aW5nIG51bWJlciB3aXRoIGEgY2hvb3NlbiBiaXQgc2l6ZSBhbmQgSUVFRSA3NTRcbiAqL1xuZXhwb3J0IGNsYXNzIEJpbmFyeUZsb2F0IHtcbiAgcHJpdmF0ZSBfYml0c1NpemUgPSAzMjtcbiAgcHJpdmF0ZSBfbnVtYmVyID0gMDtcbiAgcHJpdmF0ZSBfYmluYXJ5U2lnbjogXCIxXCIgfCBcIjBcIiA9IFwiMFwiO1xuICBwcml2YXRlIF9iaW5hcnlNYW50aXNzYSA9IFwiXCI7XG4gIHByaXZhdGUgX292ZXJmbG93ID0gZmFsc2U7XG4gIHByaXZhdGUgX21hbnRpc3NhRG90UG9zaXRpb24gPSAwO1xuICBwcml2YXRlIF9iaW5hcnlFeHBvbmVudCA9IFwiXCI7XG4gIHByaXZhdGUgX2JpYXMgPSAwO1xuICBwcml2YXRlIF9iaCA9IG5ldyBCaW5hcnlIZWxwZXIoKTtcblxuICBjb25zdHJ1Y3RvcihudW1iZXJPckJpbmFyeTogc3RyaW5nKTtcbiAgY29uc3RydWN0b3IobnVtYmVyT3JCaW5hcnk6IG51bWJlciwgYml0c1NpemU6IG51bWJlcik7XG4gIGNvbnN0cnVjdG9yKG51bWJlck9yQmluYXJ5OiBudW1iZXIgfCBzdHJpbmcsIGJpdHNTaXplPzogbnVtYmVyKSB7XG4gICAgaWYgKHR5cGVvZiBudW1iZXJPckJpbmFyeSA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgLy8gUmVtb3ZlIHRoZSBzcGFjZXMgaW4gdGhlIHN0cmluZ1xuICAgICAgbnVtYmVyT3JCaW5hcnkgPSBudW1iZXJPckJpbmFyeS50cmltKCk7XG4gICAgICBudW1iZXJPckJpbmFyeSA9IG51bWJlck9yQmluYXJ5LnJlcGxhY2UoL1xccy9nLCBcIlwiKTtcbiAgICAgIHRoaXMuYml0c1NpemUgPSBudW1iZXJPckJpbmFyeS5sZW5ndGg7XG4gICAgICB0aGlzLm51bWJlciA9IDE7XG5cbiAgICAgIC8vIFNsaWNlIHRoZSBzdHJpbmcgdG8gYXNzaWduIHRoZSBiaW5hcnkgbnVtYmVyIHRvIHRoZSBjb3JyZWN0IHBhcnQgb2YgdGhlIGJpbmFyeSByZXByZXNlbnRhdGlvbiBvZiB0aGUgZmxvYXRcbiAgICAgIHRoaXMuYmluYXJ5U2lnbiA9IG51bWJlck9yQmluYXJ5WzBdIGFzIFwiMFwiIHwgXCIxXCI7XG4gICAgICB0aGlzLmJpbmFyeUV4cG9uZW50ID0gbnVtYmVyT3JCaW5hcnkuc2xpY2UoMSwgdGhpcy5leHBvbmVudEJpdHNTaXplICsgMSk7XG4gICAgICB0aGlzLmJpbmFyeU1hbnRpc3NhID0gbnVtYmVyT3JCaW5hcnkuc2xpY2UodGhpcy5leHBvbmVudEJpdHNTaXplICsgMSwgdGhpcy5iaXRzU2l6ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuYml0c1NpemUgPSBiaXRzU2l6ZTtcbiAgICAgIHRoaXMubnVtYmVyID0gbnVtYmVyT3JCaW5hcnk7XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIGdldEluZmluaXR5KGJpdHNTaXplOiBudW1iZXIpIHtcbiAgICByZXR1cm4gbmV3IEJpbmFyeUZsb2F0KEluZmluaXR5LCBiaXRzU2l6ZSk7XG4gIH1cblxuICBzdGF0aWMgZ2V0TmFOKGJpdHNTaXplOiBudW1iZXIpIHtcbiAgICByZXR1cm4gbmV3IEJpbmFyeUZsb2F0KE5hTiwgYml0c1NpemUpO1xuICB9XG5cbiAgc3RhdGljIGdldFplcm8oYml0c1NpemU6IG51bWJlcikge1xuICAgIHJldHVybiBuZXcgQmluYXJ5RmxvYXQoMCwgYml0c1NpemUpO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoZSBmbG9hdCBudW1iZXIgdG8gY29kZWQgd2l0aCBJRUVFIDc1NFxuICAgKi9cbiAgZ2V0IG51bWJlcigpIHtcbiAgICByZXR1cm4gdGhpcy5fbnVtYmVyO1xuICB9XG5cbiAgc2V0IG51bWJlcih2YWx1ZTogbnVtYmVyKSB7XG4gICAgdGhpcy5fbnVtYmVyID0gdmFsdWU7XG5cbiAgICB0aGlzLmNhbGN1bGF0ZUJpbmFyeVNpZ24oKTtcbiAgICB0aGlzLmNhbGN1bGF0ZUJpYXMoKTtcbiAgICB0aGlzLmNhbGN1bGF0ZUJpbmFyeU1hbnRpc3NhKCk7XG4gICAgdGhpcy5jYWxjdWxhdGVCaW5hcnlFeHBvbmVudCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoZSBiaXQgc2l6ZSB0byBjb2RlIHRoZSBudW1iZXJcbiAgICovXG4gIGdldCBiaXRzU2l6ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fYml0c1NpemU7XG4gIH1cblxuICBzZXQgYml0c1NpemUodmFsdWU6IG51bWJlcikge1xuICAgIHRoaXMuX2JpdHNTaXplID0gdmFsdWU7XG5cbiAgICBpZiAodmFsdWUgPCA4KSB7XG4gICAgICB0aGlzLl9iaXRzU2l6ZSA9IDg7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgbWFudGlzc2EgYml0cyBzaXplXG4gICAqL1xuICBnZXQgbWFudGlzc2FCaXRzU2l6ZSgpIHtcbiAgICBpZiAodGhpcy5iaXRzU2l6ZSA8IDgpIHtcbiAgICAgIHJldHVybiAwO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmJpdHNTaXplIC0gdGhpcy5leHBvbmVudEJpdHNTaXplIC0gMTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIGV4cG9uZW50IGJpdHMgc2l6ZSB3aXRoOlxuICAgKiAtIFRoZSBJRUVFIDc1NCAyMDE5IGZvcm11bGEgaWYgdGhlIGJpdHMgc2l6ZSBpcyBncmVhdGVyIG9yIGVxdWFsIHRvIDEyOFxuICAgKiAtIEEgY3VzdG9tIGZvcm11bGEgaWYgdGhlIGJpdCBzaXplIGlzIGxlc3MgdGhhbiAxMjggdGhhdCBtYXRjaGVzIHRoZSBJRUVFIHN0YW5kYXJkXG4gICAqIFxuICAgKiBWaXN1YWxpemUgdGhlIGZ1bmN0aW9uIG9uIGdlb2dlYnJhOlxuICAgKiBodHRwczovL3d3dy5nZW9nZWJyYS5vcmcvY2FsY3VsYXRvci9jZXJya2RmdlxuICAgKi9cbiAgZ2V0IGV4cG9uZW50Qml0c1NpemUoKSB7XG4gICAgaWYgKHRoaXMuYml0c1NpemUgPCA4KSB7XG4gICAgICByZXR1cm4gMDtcbiAgICB9XG5cbiAgICAvLyBJRUVFIDc1NCAyMDE5IGZvcm11bGEgPj0gMTI4XG4gICAgaWYgKHRoaXMuYml0c1NpemUgPj0gMTI4KSB7XG4gICAgICByZXR1cm4gTWF0aC5yb3VuZCg0ICogTWF0aC5sb2cyKHRoaXMuYml0c1NpemUpKSAtIDEzO1xuICAgIH1cblxuICAgIC8vIEEgZm9ybXVsYSB0aGF0IG1hdGNoZXMgdGhlIHZhbHVlcyBmb3IgPCAxMjhcbiAgICAvLyByZWY6IGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vYS82MjYzMjI2MFxuICAgIHJldHVybiBNYXRoLnJvdW5kKChNYXRoLmxvZzIodGhpcy5iaXRzU2l6ZSkgLSAxKSAqKiAoMyAvIDIpKTtcbiAgfVxuXG4gIGdldCBwb3NpdGl2ZU51bWJlcigpIHtcbiAgICByZXR1cm4gTWF0aC5hYnModGhpcy5udW1iZXIpO1xuICB9XG5cbiAgLyoqXG4gICAqIENhbGN1bGF0ZSB0aGUgcG9zaXRpb24gb2YgdGhlIGRvdCBpbiB0aGUgbWFudGlzc2FcbiAgICogICAgICAgICAgICBmbG9hdCBwb3NpdGlvblxuICAgKiAgICAgICAgICAgICAgICAgIHxcbiAgICogICAgICAgICAgICAgICAgICB2XG4gICAqIG1hbnRpc3NhKDE5LjU5Mzc1KSA9PiBcIjAwMTEuMTAwMTEwMDAwMDAwMDAwMDAwMFwiXG4gICAqL1xuICBnZXQgbWFudGlzc2FEb3RQb3NpdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5fbWFudGlzc2FEb3RQb3NpdGlvbjtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIGV4cG9uZW50IG9mIHRoZSBudW1iZXIgaW4gYmluYXJ5IHdpdGggdGhlIGJpYXNcbiAgICogbWFudGlzc2EoMTkuNTkzNzUpID0+IFwiMTAwMDAwMTBcIlxuICAgKi9cbiAgZ2V0IGJpbmFyeUV4cG9uZW50KCkge1xuICAgIHJldHVybiB0aGlzLl9iaW5hcnlFeHBvbmVudDtcbiAgfVxuXG4gIHNldCBiaW5hcnlFeHBvbmVudCh2YWx1ZTogc3RyaW5nKSB7XG4gICAgdGhpcy5fYmluYXJ5RXhwb25lbnQgPSB2YWx1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gdGhlIGJpYXMgb2YgdGhlIG51bWJlciBiYXNlZCBvbiB0aGUgZXhwb25lbnQgYml0IHNpemVcbiAgICogYiA9IDIgXiAoZXhwb25lbnRCaXRzU2l6ZSAtIDEpIC0gMVxuICAgKi9cbiAgZ2V0IGJpYXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2JpYXM7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBmdWxsIG1hbnRpc3NhIG9mIHRoZSBudW1iZXJcbiAgICovXG4gIGdldCBiaW5hcnlNYW50aXNzYSgpIHtcbiAgICByZXR1cm4gdGhpcy5fYmluYXJ5TWFudGlzc2E7XG4gIH1cblxuICBzZXQgYmluYXJ5TWFudGlzc2EodmFsdWU6IHN0cmluZykge1xuICAgIHRoaXMuX2JpbmFyeU1hbnRpc3NhID0gdmFsdWU7XG4gICAgdGhpcy5fb3ZlcmZsb3cgPSB2YWx1ZS5sZW5ndGggPiB0aGlzLm1hbnRpc3NhQml0c1NpemU7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBmdWxsIG51bWJlciBjb2RlZCBpbiBiaW5hcnkgd2l0aCBJRUVFIDc1NFxuICAgKi9cbiAgZ2V0IGJpbmFyeUZsb2F0aW5nTnVtYmVyKCkge1xuICAgIHJldHVybiB0aGlzLmJpbmFyeVNpZ24gKyB0aGlzLmJpbmFyeUV4cG9uZW50ICsgdGhpcy5iaW5hcnlNYW50aXNzYTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgc2lnbiBpbiBpdCdzIGRlY2ltYWwgZm9ybVxuICAgKi9cbiAgZ2V0IGNvbXB1dGVkU2lnbigpIHtcbiAgICByZXR1cm4gdGhpcy5iaW5hcnlTaWduID09PSBcIjFcIiA/IC0xIDogMTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgZXhwb25lbnQgaW4gaXQncyBkZWNpbWFsIGZvcm1cbiAgICovXG4gIGdldCBjb21wdXRlZEV4cG9uZW50KCkge1xuICAgIHJldHVybiB0aGlzLl9iaC5iaW5hcnlUb0RlY2ltYWwodGhpcy5iaW5hcnlFeHBvbmVudCkgLSB0aGlzLmJpYXM7XG4gIH1cblxuICAvKipcbiAgICogVGhlIG1hbnRpc3NhIGluIGl0J3MgZGVjaW1hbCBmb3JtXG4gICAqL1xuICBnZXQgY29tcHV0ZWRNYW50aXNzYSgpIHtcbiAgICByZXR1cm4gdGhpcy5fYmguYmluYXJ5VG9EZWNpbWFsKFwiMVwiICsgdGhpcy5iaW5hcnlNYW50aXNzYSkgLyAyICoqIHRoaXMubWFudGlzc2FCaXRzU2l6ZTtcbiAgfVxuXG4gIGdldCBpc05hTigpIHtcbiAgICBjb25zdCBpc05hTkJpbmFyeSA9IChcbiAgICAgIHRoaXMuYmluYXJ5RXhwb25lbnQuaW5kZXhPZihcIjBcIikgPT09IC0xICYmXG4gICAgICB0aGlzLmJpbmFyeU1hbnRpc3NhLmluZGV4T2YoXCIwXCIpID09PSAtMSAmJlxuICAgICAgdGhpcy5iaW5hcnlTaWduID09PSBcIjBcIlxuICAgICk7XG5cbiAgICByZXR1cm4gTnVtYmVyLmlzTmFOKHRoaXMubnVtYmVyKSB8fCBpc05hTkJpbmFyeTtcbiAgfVxuXG4gIGdldCBpc0luZmluaXR5KCkge1xuICAgIGNvbnN0IGlzSW5maW5pdHlCaW5hcnkgPSAoXG4gICAgICB0aGlzLmJpbmFyeUV4cG9uZW50LmluZGV4T2YoXCIwXCIpID09PSAtMSAmJlxuICAgICAgdGhpcy5iaW5hcnlNYW50aXNzYS5pbmRleE9mKFwiMVwiKSA9PT0gLTEgJiZcbiAgICAgIHRoaXMuYmluYXJ5U2lnbiA9PT0gXCIwXCJcbiAgICApO1xuXG4gICAgcmV0dXJuIHRoaXMubnVtYmVyID09PSBJbmZpbml0eSB8fCBpc0luZmluaXR5QmluYXJ5O1xuICB9XG5cbiAgZ2V0IGlzWmVybygpIHtcbiAgICBjb25zdCBpc1plcm9CaW5hcnkgPSAoXG4gICAgICB0aGlzLmJpbmFyeUV4cG9uZW50LmluZGV4T2YoXCIxXCIpID09PSAtMSAmJlxuICAgICAgdGhpcy5iaW5hcnlNYW50aXNzYS5pbmRleE9mKFwiMVwiKSA9PT0gLTEgJiZcbiAgICAgIHRoaXMuYmluYXJ5U2lnbiA9PT0gXCIwXCJcbiAgICApO1xuXG4gICAgcmV0dXJuIHRoaXMubnVtYmVyID09PSAwIHx8IGlzWmVyb0JpbmFyeTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIGFic29sdXRlIHZhbHVlIG9mIHRoZSBudW1iZXIgaW4gYmluYXJ5XG4gICAqL1xuICBnZXQgYmluYXJ5QWJzKCkge1xuICAgIHJldHVybiBcIjBcIiArIHRoaXMuYmluYXJ5RXhwb25lbnQgKyB0aGlzLmJpbmFyeU1hbnRpc3NhO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoZSBudW1iZXIgdGhhdCBpcyBjb2RlZCBpbiBtZW1vcnlcbiAgICovXG4gIGdldCBjb21wdXRlZE51bWJlcigpIHtcbiAgICBpZiAodGhpcy5pc1plcm8pIHtcbiAgICAgIHJldHVybiAwO1xuICAgIH0gZWxzZSBpZiAodGhpcy5pc05hTikge1xuICAgICAgcmV0dXJuIE5hTjtcbiAgICB9IGVsc2UgaWYgKHRoaXMuaXNJbmZpbml0eSkge1xuICAgICAgcmV0dXJuIEluZmluaXR5O1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmNvbXB1dGVkU2lnbiAqIDIgKiogdGhpcy5jb21wdXRlZEV4cG9uZW50ICogdGhpcy5jb21wdXRlZE1hbnRpc3NhO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgbWFyZ2luIG9mIGVycm9yXG4gICAqL1xuICBnZXQgZXJyb3IoKSB7ICAgIFxuICAgIGlmIChOdW1iZXIuaXNOYU4odGhpcy5udW1iZXIpIHx8IHRoaXMubnVtYmVyID09PSBJbmZpbml0eSB8fCB0aGlzLm51bWJlciA9PT0gMCkge1xuICAgICAgcmV0dXJuIDA7XG4gICAgfVxuXG4gICAgcmV0dXJuIE1hdGguYWJzKHRoaXMubnVtYmVyIC0gdGhpcy5jb21wdXRlZE51bWJlcik7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJuIHRoZSBiaW5hcnkgcmVwcmVzZW50YXRpb24gb2YgdGhlIHNpZ25cbiAgICogMCBpZiBudW1iZXIgPj0gMFxuICAgKiAxIGlmIG51bWJlciA8IDBcbiAgICovXG4gIGdldCBiaW5hcnlTaWduKCk6IFwiMFwiIHwgXCIxXCIge1xuICAgIHJldHVybiB0aGlzLl9iaW5hcnlTaWduO1xuICB9XG5cbiAgc2V0IGJpbmFyeVNpZ24odmFsdWU6IFwiMFwiIHwgXCIxXCIpIHtcbiAgICB0aGlzLl9iaW5hcnlTaWduID0gdmFsdWU7XG4gIH1cblxuICAvKipcbiAgICogVHJ1ZSBpZiB0aGUgbnVtYmVyIGNhbm5vdCBiZSBlbmNvZGVkIGluIDxiaXRzU2l6ZT4gYml0c1xuICAgKi9cbiAgZ2V0IG92ZXJmbG93KCkge1xuICAgIHJldHVybiB0aGlzLl9vdmVyZmxvdztcbiAgfVxuXG4gIC8qKlxuICAgKiBEZXRlcm1pbmUgdGhlIGJpbmFyeSBzaWduIG9mIHRoZSBudW1iZXJcbiAgICovXG4gIHByaXZhdGUgY2FsY3VsYXRlQmluYXJ5U2lnbigpIHtcbiAgICB0aGlzLl9iaW5hcnlTaWduID0gdGhpcy5udW1iZXIgPCAwID8gXCIxXCIgOiBcIjBcIjtcbiAgfVxuXG4gIC8qKlxuICAgKiBDYWxjdWxhdGUgdGhlIGV4cG9uZW50IGJpYXMgYmFzZWQgb24gdGhlIGV4cG9uZW50IGJpdCBzaXplXG4gICAqIGIgPSAyIF4gKGV4cG9uZW50Qml0c1NpemUgLSAxKSAtIDE7XG4gICAqL1xuICBwcml2YXRlIGNhbGN1bGF0ZUJpYXMoKSB7XG4gICAgdGhpcy5fYmlhcyA9IDIgKiogKHRoaXMuZXhwb25lbnRCaXRzU2l6ZSAtIDEpIC0gMTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZXRlcm1pbmUgdGhlIGJpbmFyeSBtYW50aXNzYSBhbmQgZGV0ZXJtaW5lIHRoZSBkb3QgcG9zaXRpb24gaW4gdGhlIG1hbnRpc3NhXG4gICAqL1xuICBwcml2YXRlIGNhbGN1bGF0ZUJpbmFyeU1hbnRpc3NhKCkge1xuICAgIGlmIChOdW1iZXIuaXNOYU4odGhpcy5udW1iZXIpKSB7XG4gICAgICB0aGlzLl9tYW50aXNzYURvdFBvc2l0aW9uID0gMDtcbiAgICAgIHRoaXMuX2JpbmFyeU1hbnRpc3NhID0gXCJcIi5wYWRFbmQodGhpcy5tYW50aXNzYUJpdHNTaXplLCBcIjFcIik7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gR2V0IHRoZSBpbnRlZ2VyIHBhcnRcbiAgICBjb25zdCBpbnRlZ2VyUGFydCA9IE1hdGgudHJ1bmModGhpcy5wb3NpdGl2ZU51bWJlcik7XG5cbiAgICAvLyBHZXQgdGhlIGRlY2ltYWxzIG9mIHRoZSBudW1iZXI6IGRlY2ltYWxzID0gMTkuNTkzNzUgLSAxOSA9IDAuNTkzNzVcbiAgICBsZXQgZGVjaW1hbHNQYXJ0ID0gdGhpcy5wb3NpdGl2ZU51bWJlciAtIE1hdGgudHJ1bmModGhpcy5wb3NpdGl2ZU51bWJlcik7XG5cbiAgICBjb25zdCBiaW5hcnlJbnRlZ2VyUGFydCA9IHRoaXMuX2JoLmRlY2ltYWxUb0JpbmFyeShpbnRlZ2VyUGFydCk7XG5cbiAgICAvLyBHZXQgdGhlIG51bWJlciBvZiBiaXRzIGRlZGljYXRlZCB0byBzdG9yZSB0aGUgZGVjaW1hbHMgaW4gdGhlIG1hbnRpc3NhXG4gICAgY29uc3QgZGVjaW1hbHNCaXRzU2l6ZSA9IHRoaXMubWFudGlzc2FCaXRzU2l6ZSAtIGJpbmFyeUludGVnZXJQYXJ0Lmxlbmd0aCAtIDE7XG4gICAgXG4gICAgbGV0IGJpbmFyeURlY2ltYWxzUGFydCA9IFwiXCI7XG4gICAgLy8gMC41OTM3NSAqIDIgPSAxLjE4NzUgID0+IDFcbiAgICAvLyAwLjE4NzUgICogMiA9IDAuMzc1ICAgPT4gMFxuICAgIC8vIDAuMzc1ICAgKiAyID0gMC43NSAgICA9PiAwXG4gICAgLy8gMC43NSAgICAqIDIgPSAxLjUgICAgID0+IDFcbiAgICAvLyAwLjUgICAgICogMiA9IDEgICAgICAgPT4gMVxuICAgIGZvcihsZXQgaSA9IDA7IGkgPCBkZWNpbWFsc0JpdHNTaXplOyBpKyspIHtcbiAgICAgIGRlY2ltYWxzUGFydCAqPSAyO1xuXG4gICAgICBpZiAoZGVjaW1hbHNQYXJ0ID49IDEpIHtcbiAgICAgICAgZGVjaW1hbHNQYXJ0IC09IDE7XG4gICAgICAgIGJpbmFyeURlY2ltYWxzUGFydCArPSBcIjFcIjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGJpbmFyeURlY2ltYWxzUGFydCArPSBcIjBcIjtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBsZXQgYmluYXJ5TWFudGlzc2EgPSBiaW5hcnlJbnRlZ2VyUGFydCArIGJpbmFyeURlY2ltYWxzUGFydDtcblxuICAgIC8vIEdldCB0aGUgcG9zaXRpb24gb2YgdGhlIGZpcnN0IGJpdCBhdCAxLCBmb3Igb25seSBkZWNpbWFscyBudW1iZXJcbiAgICBsZXQgbWFudGlzc2FEb3RQb3NpdGlvbiA9IC1iaW5hcnlNYW50aXNzYS5pbmRleE9mKFwiMVwiKTtcblxuICAgIC8vIFJlbW92ZSBhbGwgdGhlIGxlYWRpbmcgYml0IGF0IDAgZnJvbSB0aGUgbWFudGlzc2FcbiAgICBiaW5hcnlNYW50aXNzYSA9IHRoaXMuX2JoLmNsZWFuKGJpbmFyeU1hbnRpc3NhKTtcblxuICAgIC8vIElmIHRoZSBwb3NpdGlvbiBvZiB0aGUgZmlyc3QgYml0IGF0IDEgaXMgMFxuICAgIC8vIHRoZW4gdGhlIGRvdCBwb3NpdGlvbiBpcyBlcXVhbHMgdG8gdGhlIGxlbmd0aCBvZiB0aGUgYmluYXJ5IGludGVnZXIgcGFydCBvZiB0aGUgbWFudGlzc2FcbiAgICBpZiAobWFudGlzc2FEb3RQb3NpdGlvbiA9PT0gMCkge1xuICAgICAgbWFudGlzc2FEb3RQb3NpdGlvbiA9IGJpbmFyeUludGVnZXJQYXJ0Lmxlbmd0aCAtIDE7XG4gICAgfVxuXG4gICAgLy8gSGlkZSB0aGUgZmlyc3QgYml0IGF0IDFcbiAgICBiaW5hcnlNYW50aXNzYSA9IGJpbmFyeU1hbnRpc3NhLnN1YnN0cmluZygxKTtcblxuICAgIC8vIE1ha2Ugc3VyZSB0aGF0IHRoZSBtYW50aXNzYSBtYXRjaGVzIHRoZSBjb3JyZWN0IGxlbmd0aCAoMjMgZm9yIDMyIGJpdHMgZm9yIGV4YW1wbGUpXG4gICAgYmluYXJ5TWFudGlzc2EgPSBiaW5hcnlNYW50aXNzYS5wYWRFbmQodGhpcy5tYW50aXNzYUJpdHNTaXplLCBcIjBcIik7XG5cbiAgICB0aGlzLmJpbmFyeU1hbnRpc3NhID0gYmluYXJ5TWFudGlzc2E7XG4gICAgdGhpcy5fbWFudGlzc2FEb3RQb3NpdGlvbiA9IG1hbnRpc3NhRG90UG9zaXRpb247XG4gIH1cblxuICAvKipcbiAgICogQ2FsY3VsYXRlIHRoZSBleHBvbmVudCBpbiBiaW5hcnlcbiAgICogZSA9IGJpbmFyeShtYW50aXNzYUZsb2F0UG9zaXRpb24gKyBiaWFzKVxuICAgKi9cbiAgcHJpdmF0ZSBjYWxjdWxhdGVCaW5hcnlFeHBvbmVudCgpIHtcbiAgICAvLyBJZiB0aGUgbnVtYmVyIGlzIE5hTiBvciBJbmZpbml0eSB0aGVuIGFsbCB0aGUgYml0cyBvZiB0aGUgZXhwb25lbnQgYXJlIGVxdWFscyB0byAxXG4gICAgaWYgKE51bWJlci5pc05hTih0aGlzLm51bWJlcikgfHwgdGhpcy5udW1iZXIgPT09IEluZmluaXR5KSB7XG4gICAgICB0aGlzLl9iaW5hcnlFeHBvbmVudCA9IFwiXCIucGFkRW5kKHRoaXMuZXhwb25lbnRCaXRzU2l6ZSwgXCIxXCIpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGxldCBleHBvbmVudCA9IHRoaXMubWFudGlzc2FEb3RQb3NpdGlvbiArIHRoaXMuYmlhcztcblxuICAgIC8vIElmIHRoZSBudW1iZXIgaXMgMCB0aGVuIGFsbCB0aGUgYml0cyBvZiB0aGUgZXhwb25lbnQgYXJlIGVxdWFscyB0byAwXG4gICAgaWYgKHRoaXMubnVtYmVyID09PSAwKSB7XG4gICAgICBleHBvbmVudCA9IDA7XG4gICAgfVxuXG4gICAgLy8gQ29udmVydCB0aGUgZXhwb25lbnQgdG8gYmluYXJ5IGFuZCBhZGQgbGVhZGluZyAwIHRvIG1hdGNoIHRoZSBleHBvbmVudCBiaXRzIHNpemVcbiAgICB0aGlzLl9iaW5hcnlFeHBvbmVudCA9IHRoaXMuX2JoLmRlY2ltYWxUb0JpbmFyeShleHBvbmVudCkucGFkU3RhcnQodGhpcy5leHBvbmVudEJpdHNTaXplLCBcIjBcIik7XG4gIH1cblxuICAvKipcbiAgICogQWRkIHR3byBiaW5hcnkgZmxvYXQgbnVtYmVyXG4gICAqIEBwYXJhbSBiZjIgVGhlIGJpbmFyeSBmbG9hdCBudW1iZXIgdG8gYWRkXG4gICAqIEByZXR1cm5zIFRoZSByZXN1bHQgb2YgdGhlIGFkZGl0aW9uXG4gICAqL1xuICBhZGQoYmYyOiBCaW5hcnlGbG9hdCkge1xuICAgIGNvbnN0IGJmUmVzID0gbmV3IEJpbmFyeUZsb2F0KDEsIHRoaXMuYml0c1NpemUpO1xuXG4gICAgLy8gU3BlY2lhbCBjYXNlc1xuICAgIGlmICh0aGlzLmlzTmFOIHx8IGJmMi5pc05hTikge1xuICAgICAgcmV0dXJuIEJpbmFyeUZsb2F0LmdldE5hTih0aGlzLmJpdHNTaXplKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuaXNJbmZpbml0eSB8fCBiZjIuaXNJbmZpbml0eSkge1xuICAgICAgcmV0dXJuIEJpbmFyeUZsb2F0LmdldEluZmluaXR5KHRoaXMuYml0c1NpemUpO1xuICAgIH1cbiAgICBpZiAodGhpcy5iaW5hcnlBYnMgPT09IGJmMi5iaW5hcnlBYnMgJiYgdGhpcy5iaW5hcnlTaWduICE9PSBiZjIuYmluYXJ5U2lnbikge1xuICAgICAgcmV0dXJuIEJpbmFyeUZsb2F0LmdldFplcm8odGhpcy5iaXRzU2l6ZSk7XG4gICAgfVxuXG4gICAgLy8gU3RlcCAxOiBEZXRlcm1pbmUgdGhlIGxvd2VzdCBleHBvbmVudCBiZXR3ZWVuIHRoaXMgYW5kIHRoZSBzZWNvbmQgbnVtYmVyXG4gICAgbGV0IGJmTWluQmluYXJ5RXhwb25lbnQ6IEJpbmFyeUZsb2F0ID0gdGhpcztcbiAgICBsZXQgYmZNYXhCaW5hcnlFeHBvbmVudDogQmluYXJ5RmxvYXQgPSBiZjI7XG4gICAgaWYgKHRoaXMuX2JoLmJpbmFyeVRvRGVjaW1hbChiZjIuYmluYXJ5RXhwb25lbnQpIDwgdGhpcy5fYmguYmluYXJ5VG9EZWNpbWFsKGJmTWluQmluYXJ5RXhwb25lbnQuYmluYXJ5RXhwb25lbnQpKSB7XG4gICAgICBiZk1pbkJpbmFyeUV4cG9uZW50ID0gYmYyO1xuICAgICAgYmZNYXhCaW5hcnlFeHBvbmVudCA9IHRoaXM7XG4gICAgfVxuICAgIC8vIENvcHkgdGhlIG51bWJlciwgZG8gbm90IHNldCBieSByZWZlcmVuY2VcbiAgICBiZk1heEJpbmFyeUV4cG9uZW50ID0gbmV3IEJpbmFyeUZsb2F0KGJmTWF4QmluYXJ5RXhwb25lbnQuY29tcHV0ZWROdW1iZXIsIHRoaXMuYml0c1NpemUpO1xuICAgIGJmTWluQmluYXJ5RXhwb25lbnQgPSBuZXcgQmluYXJ5RmxvYXQoYmZNaW5CaW5hcnlFeHBvbmVudC5jb21wdXRlZE51bWJlciwgdGhpcy5iaXRzU2l6ZSk7XG5cbiAgICAvLyBJZiB0aGVyZSBpcyBhIDAgdGhlbiByZXR1cm4gdGhlIG5vbi16ZXJvIG51bWJlclxuICAgIGlmIChiZk1pbkJpbmFyeUV4cG9uZW50LmlzWmVybykge1xuICAgICAgcmV0dXJuIGJmTWF4QmluYXJ5RXhwb25lbnQ7XG4gICAgfVxuXG4gICAgLy8gQWRkIHRoZSBoaWRkZW4gYml0XG4gICAgYmZNaW5CaW5hcnlFeHBvbmVudC5iaW5hcnlNYW50aXNzYSA9IFwiMVwiICsgYmZNaW5CaW5hcnlFeHBvbmVudC5iaW5hcnlNYW50aXNzYTtcbiAgICBiZk1heEJpbmFyeUV4cG9uZW50LmJpbmFyeU1hbnRpc3NhID0gXCIxXCIgKyBiZk1heEJpbmFyeUV4cG9uZW50LmJpbmFyeU1hbnRpc3NhO1xuXG4gICAgLy8gU3RlcCAyOiBTaGlmdCB0aGUgbWFudGlzc2FcbiAgICBjb25zdCBzaGlmdFZhbHVlID0gYmZNYXhCaW5hcnlFeHBvbmVudC5jb21wdXRlZEV4cG9uZW50IC0gYmZNaW5CaW5hcnlFeHBvbmVudC5jb21wdXRlZEV4cG9uZW50O1xuICAgIGNvbnN0IHNoaWZ0ZWRNaW5NYW50aXNzYSA9IHRoaXMuX2JoLnNoaWZ0UmlnaHQoYmZNaW5CaW5hcnlFeHBvbmVudC5iaW5hcnlNYW50aXNzYSwgc2hpZnRWYWx1ZSk7XG4gICAgYmZNaW5CaW5hcnlFeHBvbmVudC5iaW5hcnlNYW50aXNzYSA9IHNoaWZ0ZWRNaW5NYW50aXNzYTtcbiAgICBcbiAgICAvLyBTdGVwIDM6IFB1dCB0aGUgc2FtZSBleHBvbmVudFxuICAgIGJmUmVzLmJpbmFyeUV4cG9uZW50ID0gYmZNYXhCaW5hcnlFeHBvbmVudC5iaW5hcnlFeHBvbmVudDtcblxuICAgIC8vIFN0ZXAgNDogMidzIGNvbXBsZW1lbnQgaWYgbmVnYXRpdmVcbiAgICBpZiAoYmZNaW5CaW5hcnlFeHBvbmVudC5jb21wdXRlZFNpZ24gPT09IC0xKSB7XG4gICAgICBiZk1pbkJpbmFyeUV4cG9uZW50LmJpbmFyeU1hbnRpc3NhID0gdGhpcy5fYmguYzIoYmZNaW5CaW5hcnlFeHBvbmVudC5iaW5hcnlNYW50aXNzYSkucmV2ZXJzZSgpLmpvaW4oXCJcIik7XG4gICAgfVxuICAgIGlmIChiZk1heEJpbmFyeUV4cG9uZW50LmNvbXB1dGVkU2lnbiA9PT0gLTEpIHtcbiAgICAgIGJmTWF4QmluYXJ5RXhwb25lbnQuYmluYXJ5TWFudGlzc2EgPSB0aGlzLl9iaC5jMihiZk1heEJpbmFyeUV4cG9uZW50LmJpbmFyeU1hbnRpc3NhKS5yZXZlcnNlKCkuam9pbihcIlwiKTtcblxuICAgICAgaWYgKGJmTWF4QmluYXJ5RXhwb25lbnQuY29tcHV0ZWRTaWduICE9PSBiZk1pbkJpbmFyeUV4cG9uZW50LmNvbXB1dGVkU2lnbikge1xuICAgICAgICBiZlJlcy5iaW5hcnlTaWduID0gXCIxXCI7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gU3RlcCA1OiBBZGQgdGhlIG1hbnRpc3NhIGFuZCB0aGUgc2hpZnRlZCBvbmVcbiAgICBiZlJlcy5iaW5hcnlNYW50aXNzYSA9IHRoaXMuX2JoLmJpbmFyeUFkZGl0aW9uKFxuICAgICAgYmZNYXhCaW5hcnlFeHBvbmVudC5iaW5hcnlNYW50aXNzYSxcbiAgICAgIGJmTWluQmluYXJ5RXhwb25lbnQuYmluYXJ5TWFudGlzc2EsXG4gICAgKS5yZXZlcnNlKCkuam9pbihcIlwiKTtcblxuICAgIC8vIFN0ZXAgNzogTm9ybWFsaXplIHRoZSBtYW50aXNzYVxuICAgIC8vIEhpZGUgdGhlIGZpcnN0IGJpdFxuICAgIGJmUmVzLmJpbmFyeU1hbnRpc3NhID0gYmZSZXMuYmluYXJ5TWFudGlzc2Euc3Vic3RyaW5nKDEpO1xuXG4gICAgLy8gTm9ybWFsaXplIHRoZSBtYW50aXNzYSBpZiB0aGVyZSBpcyBhIGNhcnJ5XG4gICAgaWYgKGJmUmVzLmJpbmFyeU1hbnRpc3NhLmxlbmd0aCAtIGJmUmVzLm1hbnRpc3NhQml0c1NpemUgPT09IDEpIHtcbiAgICAgIC8vIFJvdW5kIHRoZSBsYXN0IGJpdFxuICAgICAgY29uc3QgbGFzdEJpdCA9ICBiZlJlcy5iaW5hcnlNYW50aXNzYVtiZlJlcy5iaW5hcnlNYW50aXNzYS5sZW5ndGggLSAxXTtcbiAgICAgIGNvbnN0IGJlZm9yZUxhc3RCaXQgPSAgYmZSZXMuYmluYXJ5TWFudGlzc2FbYmZSZXMuYmluYXJ5TWFudGlzc2EubGVuZ3RoIC0gMl07XG4gICAgICBiZlJlcy5iaW5hcnlNYW50aXNzYSA9IGJmUmVzLmJpbmFyeU1hbnRpc3NhLnNsaWNlKDAsIC0xKTtcbiAgICAgIGlmIChiZWZvcmVMYXN0Qml0ID09PSBcIjFcIiAmJiBsYXN0Qml0ID09PSBcIjFcIikge1xuICAgICAgICBiZlJlcy5iaW5hcnlNYW50aXNzYSA9IHRoaXMuX2JoLmJpbmFyeUFkZGl0aW9uKGJmUmVzLmJpbmFyeU1hbnRpc3NhLCBcIjFcIikucmV2ZXJzZSgpLmpvaW4oXCJcIik7XG4gICAgICB9XG5cbiAgICAgIC8vIEFkZCAxIHRvIHRoZSBleHBvbmVudFxuICAgICAgYmZSZXMuYmluYXJ5RXhwb25lbnQgPSB0aGlzLl9iaC5hZGROdW1iZXJUb0JpbmFyeShiZlJlcy5iaW5hcnlFeHBvbmVudCwgMSlbMF07XG4gICAgfVxuXG4gICAgcmV0dXJuIGJmUmVzO1xuICB9XG59XG4iLCIvKipcbiAqIExhYm86IDEgKEZsb2F0IHRvIGJpbmFyeSBjb252ZXJzaW9uKVxuICogQXV0aG9yczogT3dlbiBHb21iYXMsIERhdmlkIERhcm1hbmdlciwgSnVsaWVuIFZhdWNoZXIsIENsw6ltZW50IFBldGlnbmF0XG4gKiBUZWFtOiAyXG4gKiBTY2hvb2w6IEhFLUFyY1xuICogRGF0ZTogMjEgbWFycyAyMDIyXG4gKiBDb3Vyc2U6IE1hdGjDqW1hdGlxdWVzIHNww6ljaWZpcXVlcyAoTW9kdWxlIDIyMzQpIC0gTS4gU3TDqXBoYW5lIEdvYnJvblxuICovXG5cbmltcG9ydCB7IEJpbmFyeUZsb2F0IH0gZnJvbSBcIi4vY2xhc3Nlcy9CaW5hcnlGbG9hdFwiO1xuXG5jb25zdCBiZkJpbmFyeU51bWJlckVsZW1lbnQgPSA8SFRNTElucHV0RWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImJmLWJpbmFyeS1udW1iZXJcIik7XG5jb25zdCBiZlJlc3VsdEVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImJmLXJlc3VsdFwiKTtcbmNvbnN0IHJlZ2V4QmluYXJ5ID0gL15bMDFcXHNdKyQvO1xuY29uc3QgbWluTGVuZ3RoID0gODtcbmNvbnN0IG1heExlbmd0aCA9IDI1NjtcblxuZnVuY3Rpb24gb25DaGFuZ2VDb252ZXJ0ZXJCZigpIHtcbiAgY29uc3QgYmluYXJ5TnVtYmVyID0gYmZCaW5hcnlOdW1iZXJFbGVtZW50LnZhbHVlO1xuXG4gIGlmIChiaW5hcnlOdW1iZXIubGVuZ3RoIDwgbWluTGVuZ3RoICYmIGJpbmFyeU51bWJlciAhPT0gXCJcIikge1xuICAgIGJmUmVzdWx0RWxlbWVudC5pbm5lckhUTUwgPSBgPHNwYW4gY2xhc3M9XCJjb2xvci1yZWRcIj5MYSB0YWlsbGUgZGVzIGJpdHMgZG9pdCBhdSBtaW5pbXVtIMOqdHJlICR7bWluTGVuZ3RofTwvc3Bhbj5gO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGlmIChiaW5hcnlOdW1iZXIubGVuZ3RoID4gbWF4TGVuZ3RoKSB7XG4gICAgYmZSZXN1bHRFbGVtZW50LmlubmVySFRNTCA9IGA8c3BhbiBjbGFzcz1cImNvbG9yLXJlZFwiPkxhIHRhaWxsZSBkZXMgYml0cyBkb2l0IGF1IG1heGltdW0gw6p0cmUgJHttYXhMZW5ndGh9PC9zcGFuPmA7XG4gICAgcmV0dXJuO1xuICB9XG4gIFxuICBpZiAoYmZCaW5hcnlOdW1iZXJFbGVtZW50LnZhbHVlID09PSBcIlwiICkge1xuICAgIGJmUmVzdWx0RWxlbWVudC5pbm5lckhUTUwgPSBgPHNwYW4gY2xhc3M9XCJjb2xvci1ncmV5XCI+VmV1aWxsZXogcmVuc2VpZ25lciB0b3VzIGxlcyBjaGFtcHM8L3NwYW4+YDtcbiAgICByZXR1cm47XG4gIH1cblxuICBpZiAoIXJlZ2V4QmluYXJ5LnRlc3QoYmluYXJ5TnVtYmVyKSkge1xuICAgIGJmUmVzdWx0RWxlbWVudC5pbm5lckhUTUwgPSBgPHNwYW4gY2xhc3M9XCJjb2xvci1yZWRcIj5DZSBuJ2VzdCBwYXMgdW4gbm9tYnJlIGJpbmFpcmU8L3NwYW4+YDtcbiAgICByZXR1cm47XG4gIH1cbiAgXG4gIGNvbnN0IGJmID0gbmV3IEJpbmFyeUZsb2F0KGJpbmFyeU51bWJlcik7XG5cbiAgYmZSZXN1bHRFbGVtZW50LmlubmVySFRNTCA9IGBcbiAgICA8ZGl2IGNsYXNzPVwicmVzdWx0LWdyb3VwXCI+XG4gICAgICBUYWlsbGUgZW4gYml0cyB0b3RhbDogJHtiZi5iaXRzU2l6ZX1cbiAgICA8L2Rpdj5cblxuICAgIDxkaXYgY2xhc3M9XCJyZXN1bHQtZ3JvdXBcIj5cbiAgICAgIFRhaWxsZSBlbiBiaXRzIGRlIGwnZXhwb3NhbnQ6ICR7YmYuZXhwb25lbnRCaXRzU2l6ZX1cbiAgICA8L2Rpdj5cbiAgICBcbiAgICA8ZGl2IGNsYXNzPVwicmVzdWx0LWdyb3VwXCI+XG4gICAgICBUYWlsbGUgZW4gYml0cyBkZSBsYSBtYW50aXNzZTogJHtiZi5tYW50aXNzYUJpdHNTaXplfVxuICAgIDwvZGl2PlxuXG4gICAgPGRpdiBjbGFzcz1cInJlc3VsdC1ncm91cFwiPlxuICAgICAgQmlhaXM6ICR7YmYuYmlhc31cbiAgICA8L2Rpdj5cbiAgICBcbiAgICA8ZGl2IGNsYXNzPVwicmVzdWx0LWdyb3VwXCI+XG4gICAgICBTaWduZTpcbiAgICAgIDxzcGFuIGNsYXNzPVwiY29sb3ItcmVkIG1vbm9cIj4ke2JmLmJpbmFyeVNpZ259PC9zcGFuPlxuICAgICAgPHNwYW4gY2xhc3M9XCJtb25vXCI+KCR7YmYuY29tcHV0ZWRTaWduID4gMCA/IFwiK1wiIDogXCItXCJ9KTwvc3Bhbj5cbiAgICA8L2Rpdj5cbiAgICBcbiAgICA8ZGl2IGNsYXNzPVwicmVzdWx0LWdyb3VwXCI+XG4gICAgICBNYW50aXNzZTpcbiAgICAgIDxzcGFuIGNsYXNzPVwiY29sb3Itb3JhbmdlIG1vbm9cIj5cbiAgICAgICAgJHtiZi5iaW5hcnlNYW50aXNzYX1cbiAgICAgIDwvc3Bhbj5cbiAgICAgIDxzcGFuIGNsYXNzPVwibW9ub1wiPigke2JmLmNvbXB1dGVkTWFudGlzc2F9KTwvc3Bhbj5cbiAgICA8L2Rpdj5cblxuICAgIDxkaXYgY2xhc3M9XCJyZXN1bHQtZ3JvdXBcIj5cbiAgICAgIEV4cG9zYW50OiA8c3BhbiBjbGFzcz1cImNvbG9yLWJsdWUgbW9ub1wiPiR7YmYuYmluYXJ5RXhwb25lbnR9PC9zcGFuPlxuICAgICAgPHNwYW4gY2xhc3M9XCJtb25vXCI+KDI8c3VwPiR7YmYuY29tcHV0ZWRFeHBvbmVudH08L3N1cD4pPC9zcGFuPlxuICAgIDwvZGl2PlxuICAgIFxuICAgIDxkaXYgY2xhc3M9XCJyZXN1bHQtZ3JvdXBcIj5cbiAgICAgIFLDqXN1bHRhdCBlbiBiaW5haXJlOlxuICAgICAgPHNwYW4gY2xhc3M9XCJjb2xvci1yZWQgbW9ub1wiPiR7YmYuYmluYXJ5U2lnbn08L3NwYW4+XG4gICAgICA8c3BhbiBjbGFzcz1cImNvbG9yLWJsdWUgbW9ub1wiPiR7YmYuYmluYXJ5RXhwb25lbnR9PC9zcGFuPlxuICAgICAgPHNwYW4gY2xhc3M9XCJjb2xvci1vcmFuZ2UgbW9ub1wiPiR7YmYuYmluYXJ5TWFudGlzc2F9PC9zcGFuPlxuICAgIDwvZGl2PlxuICAgIFxuICAgIDxkaXYgY2xhc3M9XCJyZXN1bHQtZ3JvdXBcIj5cbiAgICAgIFLDqXN1bHRhdDogJHtiZi5jb21wdXRlZE51bWJlcn1cbiAgICA8L2Rpdj5cbiAgYDtcbn1cblxuYmZCaW5hcnlOdW1iZXJFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgb25DaGFuZ2VDb252ZXJ0ZXJCZik7XG5iZkJpbmFyeU51bWJlckVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImtleXVwXCIsIG9uQ2hhbmdlQ29udmVydGVyQmYpO1xuXG5vbkNoYW5nZUNvbnZlcnRlckJmKCk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=
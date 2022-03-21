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


;// CONCATENATED MODULE: ./src/labo1-addition.ts
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Ly9tYXRoX3NwZS8uL3NyYy9jbGFzc2VzL0JpbmFyeUhlbHBlci50cyIsIndlYnBhY2s6Ly9tYXRoX3NwZS8uL3NyYy9jbGFzc2VzL0JpbmFyeUZsb2F0LnRzIiwid2VicGFjazovL21hdGhfc3BlLy4vc3JjL2xhYm8xLWFkZGl0aW9uLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogTGFibzogMCAoQmluYXJ5IG9wZXJhdGlvbnMpXG4gKiBBdXRob3JzOiBPd2VuIEdvbWJhcywgRGF2aWQgRGFybWFuZ2VyLCBKdWxpZW4gVmF1Y2hlciwgQ2zDqW1lbnQgUGV0aWduYXRcbiAqIFRlYW06IDJcbiAqIFNjaG9vbDogSEUtQXJjXG4gKiBEYXRlOiAyMSBtYXJzIDIwMjJcbiAqIENvdXJzZTogTWF0aMOpbWF0aXF1ZXMgc3DDqWNpZmlxdWVzIChNb2R1bGUgMjIzNCkgLSBNLiBTdMOpcGhhbmUgR29icm9uXG4gKi9cblxuZXhwb3J0IGNsYXNzIEJpbmFyeUhlbHBlciB7XG4gIC8qKlxuICAgKiBHZXQgbiBiaXQgb2YgMCBvciAxXG4gICAqIEBwYXJhbSB2YWx1ZSAxIG9yIDBcbiAgICogQHBhcmFtIG4gVGhlIG51bWJlciBvZiBiaXRzIHRvIHJldHJpZXZlXG4gICAqIEByZXR1cm5zIG4gYml0IG9mIDAgb3IgMVxuICAgKi9cbiAgcHVibGljIGdldE5CaXQodmFsdWU6IDEgfCAwLCBuOiBudW1iZXIpOiBzdHJpbmcge1xuICAgIGxldCByZXMgPSBcIlwiO1xuICAgIFxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbjsgaSsrKSB7XG4gICAgICByZXMgKz0gdmFsdWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlcztcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGQgbiB6ZXJvcyBiZWZvcmUgdGhlIGJpbmFyeSBudW1iZXJcbiAgICogQHBhcmFtIG4gVGhlIG51bWJlciBvZiAwIHRvIGFkZCBiZWZvcmUgdGhlIGJpbmFyeSBudW1iZXJcbiAgICogQHBhcmFtIGIgVGhlIGJpbmFyeSBudW1iZXJcbiAgICogQHJldHVybnMgVGhlIGJpbmFyeSBudW1iZXIgd2l0aCBuIHplcm9zIGJlZm9yZVxuICAgKi9cbiAgcHVibGljIGFkZFBhZGRpbmcobjogbnVtYmVyLCBiID0gXCJcIikge1xuICAgIGNvbnN0IHNpemUgPSBuIC0gYi5sZW5ndGg7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNpemU7IGkrKykge1xuICAgICAgYiA9IFwiMFwiICsgYjtcbiAgICB9XG5cbiAgICByZXR1cm4gYjtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmVzIHRoZSB6ZXJvcyBiZWZvcmUgYSBiaW5hcnkgbnVtYmVyICgwMDAxMDEgYmVjb21lcyAxMDEpXG4gICAqIEBwYXJhbSBiIFRoZSBiaW5hcnkgbnVtYmVyXG4gICAqIEByZXR1cm5zIFRoZSBwcm9kdWNlZCBiaW5hcnkgbnVtYmVyXG4gICAqL1xuICBwdWJsaWMgY2xlYW4oYjogc3RyaW5nKSB7XG4gICAgbGV0IHJlcyA9IGI7XG5cbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgYi5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKGJbaV0gPT09IFwiMFwiKSB7XG4gICAgICAgIHJlcyA9IHJlcy5zdWJzdHJpbmcoMSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gcmVzO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChyZXMgPT09IFwiXCIpIHtcbiAgICAgIHJldHVybiBcIjBcIjtcbiAgICB9XG4gIH1cblxuXG4gIC8qKlxuICAgKiBBZGQgMCBwYWRkaW5nIHRvIHRoZSBzbWFsbGVzdCBiaW5hcnkgbnVtYmVyIHRvIG1hdGNoIHRoZSBsb25nZXN0IG9uZSdzIGxlbmd0aFxuICAgKiBbMTAxLCAxMTAwMV0gYmVjb21lcyBbMDAxMDEsIDExMDAxXVxuICAgKiBAcGFyYW0gYjEgVGhlIGZpcnN0IGJpbmFyeSBudW1iZXJcbiAgICogQHBhcmFtIGIyIFRoZSBzZWNvbmQgYmluYXJ5IG51bWJlclxuICAgKiBAcmV0dXJucyBbYjEsIGIyXSB3aXRoIGNvcnJlY3QgcGFkZGluZ1xuICAgKi9cbiAgcHVibGljIGFkZE1heFBhZGRpbmcoYjE6IHN0cmluZywgYjI6IHN0cmluZykge1xuICAgIGlmIChiMi5sZW5ndGggPiBiMS5sZW5ndGgpIHtcbiAgICAgIGIxID0gdGhpcy5hZGRQYWRkaW5nKGIyLmxlbmd0aCwgYjEpO1xuICAgIH0gZWxzZSBpZiAoYjEubGVuZ3RoID4gYjIubGVuZ3RoKSB7XG4gICAgICBiMiA9IHRoaXMuYWRkUGFkZGluZyhiMS5sZW5ndGgsIGIyKTtcbiAgICB9XG5cbiAgICByZXR1cm4gW2IxLCBiMl07XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBtYXggbGVuZ3RoIG9mIHR3byBiaW5hcmllcyBudW1iZXJzXG4gICAqIEBwYXJhbSBiMSBUaGUgZmlyc3QgYmluYXJ5IG51bWJlclxuICAgKiBAcGFyYW0gYjIgVGhlIHNlY29uZCBiaW5hcnkgbnVtYmVyXG4gICAqIEByZXR1cm5zIFRoZSBtYXggbGVuZ3RoXG4gICAqL1xuICBwdWJsaWMgZ2V0TWF4TGVuZ3RoKGIxOiBzdHJpbmcsIGIyOiBzdHJpbmcpIHtcbiAgICBpZiAoYjEubGVuZ3RoID4gYjIubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gYjEubGVuZ3RoO1xuICAgIH1cbiAgICByZXR1cm4gYjIubGVuZ3RoO1xuICB9XG5cbiAgLyoqXG4gICAqIENvbnZlcnQgYSBudW1iZXIgdG8gaXQncyBiaW5hcnkgcmVwcmVzZW50YXRpb25cbiAgICogQHBhcmFtIGRlY2ltYWwgVGhlIFxuICAgKiBAcmV0dXJucyBUaGUgYmluYXJ5IHJlcHJlc2VudGF0aW9uIG9mIHRoZSBkZWNpbWFsIG51bWJlclxuICAgKi9cbiAgcHVibGljIGRlY2ltYWxUb0JpbmFyeShkZWNpbWFsOiBudW1iZXIpIHtcbiAgICBjb25zdCBvcmlnaW5hbE51bWJlciA9IGRlY2ltYWw7XG4gICAgbGV0IGJpbmFyeU51bWJlciA9IChNYXRoLmFicyhkZWNpbWFsKSA+Pj4gMCkudG9TdHJpbmcoMik7XG5cbiAgICBpZiAob3JpZ2luYWxOdW1iZXIgPCAwKSB7XG4gICAgICBiaW5hcnlOdW1iZXIgPSB0aGlzLmMyKGJpbmFyeU51bWJlcikucmV2ZXJzZSgpLmpvaW4oXCJcIik7XG4gICAgfVxuXG4gICAgcmV0dXJuIGJpbmFyeU51bWJlcjtcbiAgfVxuXG4gIC8qKlxuICAgKiBDb252ZXJ0IGEgYmluYXJ5IHJlcHJlc2VudGF0aW9uIG9mIGEgbnVtYmVyIHRvIGEgZGVjaW1hbCBudW1iZXJcbiAgICogQHBhcmFtIGJpbmFyeSBUaGUgYmluYXJ5IHJlcHJlc2VudGF0aW9uIG9mIGEgbnVtYmVyXG4gICAqIEByZXR1cm5zIFRoZSBpbnQgcmVwcmVzZW50YXRpb24gb2YgYSBiaW5hcnkgbnVtYmVyXG4gICAqL1xuICBwdWJsaWMgYmluYXJ5VG9EZWNpbWFsKGJpbmFyeTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHBhcnNlSW50KGJpbmFyeSwgMik7XG4gIH1cblxuICAvKipcbiAgICogQWRkIGludCB0byBhIGJpbmFyeSBudW1iZXJcbiAgICogQHBhcmFtIGIgVGhlIGJpbmFyeSBudW1iZXJcbiAgICogQHBhcmFtIG4gVGhlIGludCBudW1iZXIgdG8gYWRkIHRvIHRoZSBiaW5hcnkgbnVtYmVyXG4gICAqIEByZXR1cm5zIFRoZSBwcm9kdWNlZCByZXN1bHRcbiAgICovXG4gIHB1YmxpYyBhZGROdW1iZXJUb0JpbmFyeShiOiBzdHJpbmcsIG46IG51bWJlcik6IHN0cmluZ1tdIHtcbiAgICByZXR1cm4gdGhpcy5iaW5hcnlBZGRpdGlvbihiLCB0aGlzLmRlY2ltYWxUb0JpbmFyeShuKSk7XG4gIH1cblxuICAvKipcbiAgICogSW52ZXJ0IGEgYmluYXJ5IG51bWJlclxuICAgKiBAcGFyYW0gYiBUaGUgYmluYXJ5IG51bWJlciB0byBpbnZlcnRcbiAgICogQHJldHVybnMgVGhlIGludmVydCBiaW5hcnkgbnVtYmVyXG4gICAqL1xuICBwdWJsaWMgaW52ZXJ0KGI6IHN0cmluZykge1xuICAgIGNvbnN0IGluaXRpYWxMZW5ndGggPSBiLmxlbmd0aDtcbiAgICBiID0gdGhpcy5kZWNpbWFsVG9CaW5hcnkodGhpcy5iaW5hcnlUb0RlY2ltYWwoYikgXiB0aGlzLmJpbmFyeVRvRGVjaW1hbCh0aGlzLmdldE5CaXQoMSwgYi5sZW5ndGgpKSk7XG4gICAgYiA9IHRoaXMuYWRkUGFkZGluZyhpbml0aWFsTGVuZ3RoLCBiKTtcbiAgICByZXR1cm4gYjtcbiAgfVxuXG4gIC8qKlxuICAgKiBTaGlmdCB0aGUgYmluYXJ5IG51bWJlciB0byB0aGUgcmlnaHRcbiAgICogQHBhcmFtIGIgVGhlIGJpbmFyeSBudW1iZXJcbiAgICogQHBhcmFtIHNoaWZ0VmFsdWUgVGhlIHNoaWZ0IHZhbHVlXG4gICAqIEByZXR1cm5zIFRoZSBzaGlmdGVkIGJpbmFyeSBudW1iZXJcbiAgICovXG4gIHB1YmxpYyBzaGlmdFJpZ2h0KGI6IHN0cmluZywgc2hpZnRWYWx1ZTogbnVtYmVyKSB7XG4gICAgLy8gXCIwMDAwMDEwMTBcIiA+PiAyID0+IFwiMDAwMDAwMDEwXCJcbiAgICAvLyAxLiBSZW1vdmVzIGxhc3RzIDxzaGlmdFZhbHVlPiBiaXRzXG4gICAgLy8gMi4gUGxhY2VzIDxzaGlmdFZhbHVlPiBiaXRzIGF0IDAgYmVmb3JlXG5cbiAgICBpZiAoc2hpZnRWYWx1ZSA8IDEpIHtcbiAgICAgIHJldHVybiBiO1xuICAgIH1cblxuICAgIGxldCByZXMgPSBiO1xuICAgIHJlcyA9IHJlcy5zbGljZSgwLCAtc2hpZnRWYWx1ZSk7XG4gICAgcmVzID0gXCJcIi5wYWRTdGFydChzaGlmdFZhbHVlLCBcIjBcIikgKyByZXM7XG5cbiAgICByZXR1cm4gcmVzO1xuICB9XG5cbiAgLyoqXG4gICAqIFNoaWZ0IHRoZSBiaW5hcnkgbnVtYmVyIHRvIHRoZSBsZWZ0XG4gICAqIEBwYXJhbSBiIFRoZSBiaW5hcnkgbnVtYmVyXG4gICAqIEBwYXJhbSBzaGlmdFZhbHVlIFRoZSBzaGlmdCB2YWx1ZVxuICAgKiBAcmV0dXJucyBUaGUgc2hpZnRlZCBiaW5hcnkgbnVtYmVyXG4gICAqL1xuICBwdWJsaWMgc2hpZnRMZWZ0KGI6IHN0cmluZywgc2hpZnRWYWx1ZTogbnVtYmVyKSB7XG4gICAgLy8gXCIwMDAwMDEwMTBcIiA8PCAyID0+IFwiMDAwMDAxMDEwMDBcIlxuICAgIC8vIDEuIFJlbW92ZXMgbGFzdHMgPHNoaWZ0VmFsdWU+IGJpdHNcbiAgICAvLyAyLiBQbGFjZXMgPHNoaWZ0VmFsdWU+IGJpdHMgYXQgMCBiZWZvcmVcblxuICAgIGlmIChzaGlmdFZhbHVlIDwgMSkge1xuICAgICAgcmV0dXJuIGI7XG4gICAgfVxuXG4gICAgbGV0IHJlcyA9IGI7XG4gICAgcmVzID0gcmVzLnNsaWNlKHNoaWZ0VmFsdWUpO1xuICAgIHJlcyArPSBcIlwiLnBhZEVuZChzaGlmdFZhbHVlLCBcIjBcIik7XG5cbiAgICByZXR1cm4gcmVzO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZCAyIGJpdCB0b2dldGhlciB3aXRoIHRoZSBjYXJyeVxuICAgKiBAcGFyYW0geCBUaGUgZmlyc3QgYml0XG4gICAqIEBwYXJhbSB5IFRoZSBzZWNvbmQgYml0XG4gICAqIEBwYXJhbSBjYXJyeSBUaGUgY2FycnlcbiAgICogQHJldHVybnMgVGhlIHJlc3VsdCB3aXRoIHRoZSBjYXJyeSBbYml0LCBjYXJyeV1cbiAgICovXG4gIHB1YmxpYyBlbGVtZW50YXJ5QWRkaXRpb24oeDogc3RyaW5nLCB5OiBzdHJpbmcsIGNhcnJ5ID0gXCJcIik6IHN0cmluZ1tdIHtcbiAgICBjb25zdCByZXMgPSBOdW1iZXIoeCkgKyBOdW1iZXIoeSkgKyBOdW1iZXIoY2FycnkpO1xuXG4gICAgc3dpdGNoIChyZXMpIHtcbiAgICAgIC8vIGMgPSAxLCB4ID0gMSwgeSA9IDFcbiAgICAgIGNhc2UgMzpcbiAgICAgICAgcmV0dXJuIFtcIjFcIiwgXCIxXCJdO1xuICAgICAgY2FzZSAyOlxuICAgICAgICByZXR1cm4gW1wiMFwiLCBcIjFcIl07XG4gICAgICBjYXNlIDE6XG4gICAgICAgIHJldHVybiBbXCIxXCIsIFwiXCJdO1xuICAgICAgLy8gYyA9IDAsIHggPSAwLCB5ID0gMFxuICAgICAgY2FzZSAwOlxuICAgICAgICByZXR1cm4gW1wiMFwiLCBcIlwiXTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQWRkIDIgYmluYXJ5IG51bWJlcnNcbiAgICogQHBhcmFtIGIxIFRoZSBmaXJzdCBiaW5hcnkgbnVtYmVyXG4gICAqIEBwYXJhbSBiMiBUaGUgc2Vjb25kIGJpbmFyeSBudW1iZXJcbiAgICogQHJldHVybnMgVGhlIHJlc3VsdCBvZiB0aGUgYWRkaXRpb24gW2JpbmFyeU51bWJlciwgY2FycnlCaXRdXG4gICAqL1xuICBwdWJsaWMgYmluYXJ5QWRkaXRpb24oYjE6IHN0cmluZywgYjI6IHN0cmluZykge1xuICAgIGxldCByZXMgPSBcIlwiO1xuICAgIGxldCBjYXJyeSA9IFwiXCI7XG4gICAgY29uc3QgW2JwMSwgYnAyXSA9IHRoaXMuYWRkTWF4UGFkZGluZyhiMSwgYjIpO1xuXG4gICAgZm9yIChsZXQgaSA9IGJwMS5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgY29uc3QgW3IsIGNdID0gdGhpcy5lbGVtZW50YXJ5QWRkaXRpb24oYnAxW2ldLCBicDJbaV0sIGNhcnJ5KTtcbiAgICAgIHJlcyA9IHIgKyByZXM7XG4gICAgICBjYXJyeSA9IGM7XG4gICAgfVxuXG4gICAgcmV0dXJuIFtyZXMsIGNhcnJ5XTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTdWJzdHJhY3QgMiBiaW5hcnkgbnVtYmVyc1xuICAgKiBAcGFyYW0gYjEgVGhlIGZpcnN0IGJpbmFyeSBudW1iZXJcbiAgICogQHBhcmFtIGIyIFRoZSBzZWNvbmQgYmluYXJ5IG51bWJlclxuICAgKiBAcmV0dXJucyBUaGUgcmVzdWx0IG9mIHRoZSBzdWJzdHJhY3Rpb24gW2JpbmFyeU51bWJlciwgY2FycnlCaXRdXG4gICAqL1xuICBwdWJsaWMgYmluYXJ5U3Vic3RyYWN0aW9uKGIxOiBzdHJpbmcsIGIyOiBzdHJpbmcpIHtcbiAgICBjb25zdCBbYnAxLCBicDJdID0gdGhpcy5hZGRNYXhQYWRkaW5nKGIxLCBiMik7XG4gICAgcmV0dXJuIHRoaXMuYmluYXJ5QWRkaXRpb24oYnAxLCB0aGlzLmMyKGJwMikucmV2ZXJzZSgpLmpvaW4oXCJcIikpO1xuICB9XG5cbiAgLyoqXG4gICAqIFBlcmZvcm0gYSAyJ3MgY29tcGxlbWVudCBvcGVyYXRpb24gd2l0aG91dCB0aGUgY2FycnlcbiAgICogQHBhcmFtIGIgVGhlIGJpbmFyeSBudW1iZXJcbiAgICogQHJldHVybnMgVGhlIDIncyBjb21wbGVtZW50IG9mIHRoZSBiaW5hcnkgbnVtYmVyIFtiaW5hcnlOdW1iZXIsIGNhcnJ5XVxuICAgKi9cbiAgcHVibGljIGMyKGI6IHN0cmluZyk6IHN0cmluZ1tdIHtcbiAgICBiID0gdGhpcy5pbnZlcnQoYik7XG4gICAgcmV0dXJuIHRoaXMuYWRkTnVtYmVyVG9CaW5hcnkoYiwgMSk7XG4gIH1cblxuICAvKipcbiAgICogTXVsdGlwbHkgMiBiaW5hcnkgbnVtYmVyc1xuICAgKiBAcGFyYW0gYjEgVGhlIGZpcnN0IGJpbmFyeSBudW1iZXJcbiAgICogQHBhcmFtIGIyIFRoZSBzZWNvbmQgYmluYXJ5IG51bWJlclxuICAgKiBAcmV0dXJucyBUaGUgcmVzdWx0IG9mIHRoZSBtdWx0aXBsaWNhdGlvblxuICAgKi9cbiAgcHVibGljIGJpbmFyeU11bHRpcGxpY2F0aW9uKGIxOiBzdHJpbmcsIGIyOiBzdHJpbmcpIHtcbiAgICBsZXQgcmVzID0gXCJcIjtcbiAgICBjb25zdCBhZGRSZXN1bHRzID0gW107XG5cbiAgICAvLyBUaGUgYmluYXJ5IG51bWJlcnMgdG8gbXVsaXRwbHlcbiAgICAvLyBicDEgPSAxMDExXG4gICAgLy8gYnAyID0gMTExMVxuICAgIGNvbnN0IFticDEsIGJwMl0gPSB0aGlzLmFkZE1heFBhZGRpbmcoYjEsIGIyKTtcblxuICAgIC8vIENhbGN1bGF0ZSB0aGUgb3BlcmFuZHNcbiAgICAvLyBhZGRSZXN1bHRzID0gW1xuICAgIC8vICAgIDAwMDAgMTAxMSxcbiAgICAvLyAgICAwMDAxIDAxMTAsXG4gICAgLy8gICAgMDAxMCAxMTAwLFxuICAgIC8vICAgIDEwMTEgMDAwMFxuICAgIC8vIF1cbiAgICBmb3IgKGxldCBpID0gYnAxLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICBsZXQgY3VycmVudFJlcyA9IFwiXCI7XG5cbiAgICAgIGZvciAobGV0IGogPSBicDEubGVuZ3RoIC0gMTsgaiA+PSAwOyBqLS0pIHtcbiAgICAgICAgY3VycmVudFJlcyA9IChOdW1iZXIoYnAxW2pdKSAqIE51bWJlcihicDJbaV0pKSArIGN1cnJlbnRSZXM7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGRlYyA9IHRoaXMuYmluYXJ5VG9EZWNpbWFsKGN1cnJlbnRSZXMpIDw8IChicDEubGVuZ3RoIC0gMSAtIGkpO1xuICAgICAgY3VycmVudFJlcyA9IHRoaXMuZGVjaW1hbFRvQmluYXJ5KGRlYyk7XG4gICAgICBhZGRSZXN1bHRzLnB1c2goY3VycmVudFJlcyk7XG4gICAgfVxuXG4gICAgLy8gQWRkIGV2ZXJ5dGhpbmdcbiAgICAvLyByZXMgPVxuICAgIC8vICAgMDAwMCAxMDExLFxuICAgIC8vICsgMDAwMSAwMTEwLFxuICAgIC8vICsgMDAxMCAxMTAwLFxuICAgIC8vICsgMTAxMSAwMDAwXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhZGRSZXN1bHRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBhZGRSZXN1bHQgPSB0aGlzLmFkZFBhZGRpbmcoYWRkUmVzdWx0c1thZGRSZXN1bHRzLmxlbmd0aCAtIDFdLmxlbmd0aCwgYWRkUmVzdWx0c1tpXSk7XG4gICAgICBjb25zdCBbciwgY10gPSB0aGlzLmJpbmFyeUFkZGl0aW9uKHJlcywgYWRkUmVzdWx0KTtcbiAgICAgIHJlcyA9IGMgKyByO1xuICAgIH1cblxuICAgIC8vIHJlcyA9IDEwMTAwMTAxXG4gICAgcmV0dXJuIHJlcztcbiAgfVxufVxuIiwiLyoqXG4gKiBMYWJvOiAxIChGbG9hdCB0byBiaW5hcnkgY29udmVyc2lvbilcbiAqIEF1dGhvcnM6IE93ZW4gR29tYmFzLCBEYXZpZCBEYXJtYW5nZXIsIEp1bGllbiBWYXVjaGVyLCBDbMOpbWVudCBQZXRpZ25hdFxuICogVGVhbTogMlxuICogU2Nob29sOiBIRS1BcmNcbiAqIERhdGU6IDIxIG1hcnMgMjAyMlxuICogQ291cnNlOiBNYXRow6ltYXRpcXVlcyBzcMOpY2lmaXF1ZXMgKE1vZHVsZSAyMjM0KSAtIE0uIFN0w6lwaGFuZSBHb2Jyb25cbiAqL1xuXG5pbXBvcnQgeyBCaW5hcnlIZWxwZXIgfSBmcm9tIFwiLi9CaW5hcnlIZWxwZXJcIjtcblxuLyoqXG4gKiBFbmNvZGUgYSBmbG9hdGluZyBudW1iZXIgd2l0aCBhIGNob29zZW4gYml0IHNpemUgYW5kIElFRUUgNzU0XG4gKi9cbmV4cG9ydCBjbGFzcyBCaW5hcnlGbG9hdCB7XG4gIHByaXZhdGUgX2JpdHNTaXplID0gMzI7XG4gIHByaXZhdGUgX251bWJlciA9IDA7XG4gIHByaXZhdGUgX2JpbmFyeVNpZ246IFwiMVwiIHwgXCIwXCIgPSBcIjBcIjtcbiAgcHJpdmF0ZSBfYmluYXJ5TWFudGlzc2EgPSBcIlwiO1xuICBwcml2YXRlIF9vdmVyZmxvdyA9IGZhbHNlO1xuICBwcml2YXRlIF9tYW50aXNzYURvdFBvc2l0aW9uID0gMDtcbiAgcHJpdmF0ZSBfYmluYXJ5RXhwb25lbnQgPSBcIlwiO1xuICBwcml2YXRlIF9iaWFzID0gMDtcbiAgcHJpdmF0ZSBfYmggPSBuZXcgQmluYXJ5SGVscGVyKCk7XG4gIHByaXZhdGUgc3RhdGljIF9taW5CaXRTaXplID0gODtcblxuICBjb25zdHJ1Y3RvcihudW1iZXJPckJpbmFyeTogc3RyaW5nKTtcbiAgY29uc3RydWN0b3IobnVtYmVyT3JCaW5hcnk6IG51bWJlcik7XG4gIGNvbnN0cnVjdG9yKG51bWJlck9yQmluYXJ5OiBudW1iZXIsIGJpdHNTaXplOiBudW1iZXIpO1xuICBjb25zdHJ1Y3RvcihudW1iZXJPckJpbmFyeTogbnVtYmVyIHwgc3RyaW5nLCBiaXRzU2l6ZT86IG51bWJlcikge1xuICAgIGlmICh0eXBlb2YgbnVtYmVyT3JCaW5hcnkgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIC8vIFJlbW92ZSB0aGUgc3BhY2VzIGluIHRoZSBzdHJpbmdcbiAgICAgIG51bWJlck9yQmluYXJ5ID0gbnVtYmVyT3JCaW5hcnkudHJpbSgpO1xuICAgICAgbnVtYmVyT3JCaW5hcnkgPSBudW1iZXJPckJpbmFyeS5yZXBsYWNlKC9cXHMvZywgXCJcIik7XG4gICAgICB0aGlzLmJpdHNTaXplID0gbnVtYmVyT3JCaW5hcnkubGVuZ3RoO1xuICAgICAgdGhpcy5udW1iZXIgPSAxO1xuXG4gICAgICAvLyBTbGljZSB0aGUgc3RyaW5nIHRvIGFzc2lnbiB0aGUgYmluYXJ5IG51bWJlciB0byB0aGUgY29ycmVjdCBwYXJ0IG9mIHRoZSBiaW5hcnkgcmVwcmVzZW50YXRpb24gb2YgdGhlIGZsb2F0XG4gICAgICB0aGlzLmJpbmFyeVNpZ24gPSBudW1iZXJPckJpbmFyeVswXSBhcyBcIjBcIiB8IFwiMVwiO1xuICAgICAgdGhpcy5iaW5hcnlFeHBvbmVudCA9IG51bWJlck9yQmluYXJ5LnNsaWNlKDEsIHRoaXMuZXhwb25lbnRCaXRzU2l6ZSArIDEpO1xuICAgICAgdGhpcy5iaW5hcnlNYW50aXNzYSA9IG51bWJlck9yQmluYXJ5LnNsaWNlKHRoaXMuZXhwb25lbnRCaXRzU2l6ZSArIDEsIHRoaXMuYml0c1NpemUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmJpdHNTaXplID0gYml0c1NpemU7XG4gICAgICB0aGlzLm51bWJlciA9IG51bWJlck9yQmluYXJ5O1xuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBnZXRJbmZpbml0eShiaXRzU2l6ZTogbnVtYmVyKSB7XG4gICAgcmV0dXJuIG5ldyBCaW5hcnlGbG9hdChJbmZpbml0eSwgYml0c1NpemUpO1xuICB9XG5cbiAgc3RhdGljIGdldE5hTihiaXRzU2l6ZTogbnVtYmVyKSB7XG4gICAgcmV0dXJuIG5ldyBCaW5hcnlGbG9hdChOYU4sIGJpdHNTaXplKTtcbiAgfVxuXG4gIHN0YXRpYyBnZXRaZXJvKGJpdHNTaXplOiBudW1iZXIpIHtcbiAgICByZXR1cm4gbmV3IEJpbmFyeUZsb2F0KDAsIGJpdHNTaXplKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgZmxvYXQgbnVtYmVyIHRvIGNvZGVkIHdpdGggSUVFRSA3NTRcbiAgICovXG4gIGdldCBudW1iZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMuX251bWJlcjtcbiAgfVxuXG4gIHNldCBudW1iZXIodmFsdWU6IG51bWJlcikge1xuICAgIHRoaXMuX251bWJlciA9IHZhbHVlO1xuXG4gICAgdGhpcy5jYWxjdWxhdGUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgYml0IHNpemUgdG8gY29kZSB0aGUgbnVtYmVyXG4gICAqL1xuICBnZXQgYml0c1NpemUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2JpdHNTaXplO1xuICB9XG5cbiAgc2V0IGJpdHNTaXplKHZhbHVlOiBudW1iZXIpIHtcbiAgICB0aGlzLl9iaXRzU2l6ZSA9IHZhbHVlO1xuXG4gICAgaWYgKHZhbHVlIDwgQmluYXJ5RmxvYXQuX21pbkJpdFNpemUpIHtcbiAgICAgIHRoaXMuX2JpdHNTaXplID0gQmluYXJ5RmxvYXQuX21pbkJpdFNpemU7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgbWFudGlzc2EgYml0cyBzaXplXG4gICAqL1xuICBnZXQgbWFudGlzc2FCaXRzU2l6ZSgpIHtcbiAgICBpZiAodGhpcy5iaXRzU2l6ZSA8IDgpIHtcbiAgICAgIHJldHVybiAwO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmJpdHNTaXplIC0gdGhpcy5leHBvbmVudEJpdHNTaXplIC0gMTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIGV4cG9uZW50IGJpdHMgc2l6ZSB3aXRoOlxuICAgKiAtIFRoZSBJRUVFIDc1NCAyMDE5IGZvcm11bGEgaWYgdGhlIGJpdHMgc2l6ZSBpcyBncmVhdGVyIG9yIGVxdWFsIHRvIDEyOFxuICAgKiAtIEEgY3VzdG9tIGZvcm11bGEgaWYgdGhlIGJpdCBzaXplIGlzIGxlc3MgdGhhbiAxMjggdGhhdCBtYXRjaGVzIHRoZSBJRUVFIHN0YW5kYXJkXG4gICAqIFxuICAgKiBWaXN1YWxpemUgdGhlIGZ1bmN0aW9uIG9uIGdlb2dlYnJhOlxuICAgKiBodHRwczovL3d3dy5nZW9nZWJyYS5vcmcvY2FsY3VsYXRvci9jZXJya2RmdlxuICAgKi9cbiAgZ2V0IGV4cG9uZW50Qml0c1NpemUoKSB7XG4gICAgaWYgKHRoaXMuYml0c1NpemUgPCA4KSB7XG4gICAgICByZXR1cm4gMDtcbiAgICB9XG5cbiAgICAvLyBJRUVFIDc1NCAyMDE5IGZvcm11bGEgPj0gMTI4XG4gICAgaWYgKHRoaXMuYml0c1NpemUgPj0gMTI4KSB7XG4gICAgICByZXR1cm4gTWF0aC5yb3VuZCg0ICogTWF0aC5sb2cyKHRoaXMuYml0c1NpemUpKSAtIDEzO1xuICAgIH1cblxuICAgIC8vIEEgZm9ybXVsYSB0aGF0IG1hdGNoZXMgdGhlIHZhbHVlcyBmb3IgPCAxMjhcbiAgICAvLyByZWY6IGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vYS82MjYzMjI2MFxuICAgIHJldHVybiBNYXRoLnJvdW5kKChNYXRoLmxvZzIodGhpcy5iaXRzU2l6ZSkgLSAxKSAqKiAoMyAvIDIpKTtcbiAgfVxuXG4gIGdldCBwb3NpdGl2ZU51bWJlcigpIHtcbiAgICByZXR1cm4gTWF0aC5hYnModGhpcy5udW1iZXIpO1xuICB9XG5cbiAgLyoqXG4gICAqIENhbGN1bGF0ZSB0aGUgcG9zaXRpb24gb2YgdGhlIGRvdCBpbiB0aGUgbWFudGlzc2FcbiAgICogICAgICAgICAgICBmbG9hdCBwb3NpdGlvblxuICAgKiAgICAgICAgICAgICAgICAgIHxcbiAgICogICAgICAgICAgICAgICAgICB2XG4gICAqIG1hbnRpc3NhKDE5LjU5Mzc1KSA9PiBcIjAwMTEuMTAwMTEwMDAwMDAwMDAwMDAwMFwiXG4gICAqL1xuICBnZXQgbWFudGlzc2FEb3RQb3NpdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5fbWFudGlzc2FEb3RQb3NpdGlvbjtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIGV4cG9uZW50IG9mIHRoZSBudW1iZXIgaW4gYmluYXJ5IHdpdGggdGhlIGJpYXNcbiAgICogbWFudGlzc2EoMTkuNTkzNzUpID0+IFwiMTAwMDAwMTBcIlxuICAgKi9cbiAgZ2V0IGJpbmFyeUV4cG9uZW50KCkge1xuICAgIHJldHVybiB0aGlzLl9iaW5hcnlFeHBvbmVudDtcbiAgfVxuXG4gIHNldCBiaW5hcnlFeHBvbmVudCh2YWx1ZTogc3RyaW5nKSB7XG4gICAgdGhpcy5fYmluYXJ5RXhwb25lbnQgPSB2YWx1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gdGhlIGJpYXMgb2YgdGhlIG51bWJlciBiYXNlZCBvbiB0aGUgZXhwb25lbnQgYml0IHNpemVcbiAgICogYiA9IDIgXiAoZXhwb25lbnRCaXRzU2l6ZSAtIDEpIC0gMVxuICAgKi9cbiAgZ2V0IGJpYXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2JpYXM7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBmdWxsIG1hbnRpc3NhIG9mIHRoZSBudW1iZXJcbiAgICovXG4gIGdldCBiaW5hcnlNYW50aXNzYSgpIHtcbiAgICByZXR1cm4gdGhpcy5fYmluYXJ5TWFudGlzc2E7XG4gIH1cblxuICBzZXQgYmluYXJ5TWFudGlzc2EodmFsdWU6IHN0cmluZykge1xuICAgIHRoaXMuX2JpbmFyeU1hbnRpc3NhID0gdmFsdWU7XG4gICAgdGhpcy5fb3ZlcmZsb3cgPSB2YWx1ZS5sZW5ndGggPiB0aGlzLm1hbnRpc3NhQml0c1NpemU7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBmdWxsIG51bWJlciBjb2RlZCBpbiBiaW5hcnkgd2l0aCBJRUVFIDc1NFxuICAgKi9cbiAgZ2V0IGJpbmFyeUZsb2F0aW5nTnVtYmVyKCkge1xuICAgIHJldHVybiB0aGlzLmJpbmFyeVNpZ24gKyB0aGlzLmJpbmFyeUV4cG9uZW50ICsgdGhpcy5iaW5hcnlNYW50aXNzYTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgc2lnbiBpbiBpdCdzIGRlY2ltYWwgZm9ybVxuICAgKi9cbiAgZ2V0IGNvbXB1dGVkU2lnbigpIHtcbiAgICByZXR1cm4gdGhpcy5iaW5hcnlTaWduID09PSBcIjFcIiA/IC0xIDogMTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgZXhwb25lbnQgaW4gaXQncyBkZWNpbWFsIGZvcm1cbiAgICovXG4gIGdldCBjb21wdXRlZEV4cG9uZW50KCkge1xuICAgIHJldHVybiB0aGlzLl9iaC5iaW5hcnlUb0RlY2ltYWwodGhpcy5iaW5hcnlFeHBvbmVudCkgLSB0aGlzLmJpYXM7XG4gIH1cblxuICAvKipcbiAgICogVGhlIG1hbnRpc3NhIGluIGl0J3MgZGVjaW1hbCBmb3JtXG4gICAqL1xuICBnZXQgY29tcHV0ZWRNYW50aXNzYSgpIHtcbiAgICByZXR1cm4gdGhpcy5fYmguYmluYXJ5VG9EZWNpbWFsKFwiMVwiICsgdGhpcy5iaW5hcnlNYW50aXNzYSkgLyAyICoqIHRoaXMubWFudGlzc2FCaXRzU2l6ZTtcbiAgfVxuXG4gIGdldCBtYXJnaW5PZkVycm9yKCkge1xuICAgIHJldHVybiBNYXRoLmFicyh0aGlzLm51bWJlciAtIHRoaXMuY29tcHV0ZWROdW1iZXIpO1xuICB9XG5cbiAgZ2V0IGlzTmFOKCkge1xuICAgIGNvbnN0IGlzTmFOQmluYXJ5ID0gKFxuICAgICAgdGhpcy5iaW5hcnlFeHBvbmVudC5pbmRleE9mKFwiMFwiKSA9PT0gLTEgJiZcbiAgICAgIHRoaXMuYmluYXJ5TWFudGlzc2EuaW5kZXhPZihcIjBcIikgPT09IC0xICYmXG4gICAgICB0aGlzLmJpbmFyeVNpZ24gPT09IFwiMFwiXG4gICAgKTtcblxuICAgIHJldHVybiBOdW1iZXIuaXNOYU4odGhpcy5udW1iZXIpIHx8IGlzTmFOQmluYXJ5O1xuICB9XG5cbiAgZ2V0IGlzSW5maW5pdHkoKSB7XG4gICAgY29uc3QgaXNJbmZpbml0eUJpbmFyeSA9IChcbiAgICAgIHRoaXMuYmluYXJ5RXhwb25lbnQuaW5kZXhPZihcIjBcIikgPT09IC0xICYmXG4gICAgICB0aGlzLmJpbmFyeU1hbnRpc3NhLmluZGV4T2YoXCIxXCIpID09PSAtMSAmJlxuICAgICAgdGhpcy5iaW5hcnlTaWduID09PSBcIjBcIlxuICAgICk7XG5cbiAgICByZXR1cm4gdGhpcy5udW1iZXIgPT09IEluZmluaXR5IHx8IGlzSW5maW5pdHlCaW5hcnk7XG4gIH1cblxuICBnZXQgaXNaZXJvKCkge1xuICAgIGNvbnN0IGlzWmVyb0JpbmFyeSA9IChcbiAgICAgIHRoaXMuYmluYXJ5RXhwb25lbnQuaW5kZXhPZihcIjFcIikgPT09IC0xICYmXG4gICAgICB0aGlzLmJpbmFyeU1hbnRpc3NhLmluZGV4T2YoXCIxXCIpID09PSAtMSAmJlxuICAgICAgdGhpcy5iaW5hcnlTaWduID09PSBcIjBcIlxuICAgICk7XG5cbiAgICByZXR1cm4gdGhpcy5udW1iZXIgPT09IDAgfHwgaXNaZXJvQmluYXJ5O1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgYWJzb2x1dGUgdmFsdWUgb2YgdGhlIG51bWJlciBpbiBiaW5hcnlcbiAgICovXG4gIGdldCBiaW5hcnlBYnMoKSB7XG4gICAgcmV0dXJuIFwiMFwiICsgdGhpcy5iaW5hcnlFeHBvbmVudCArIHRoaXMuYmluYXJ5TWFudGlzc2E7XG4gIH1cblxuICAvKipcbiAgICogVGhlIG51bWJlciB0aGF0IGlzIGNvZGVkIGluIG1lbW9yeVxuICAgKi9cbiAgZ2V0IGNvbXB1dGVkTnVtYmVyKCkge1xuICAgIGlmICh0aGlzLmlzWmVybykge1xuICAgICAgcmV0dXJuIDA7XG4gICAgfSBlbHNlIGlmICh0aGlzLmlzTmFOKSB7XG4gICAgICByZXR1cm4gTmFOO1xuICAgIH0gZWxzZSBpZiAodGhpcy5pc0luZmluaXR5KSB7XG4gICAgICByZXR1cm4gSW5maW5pdHk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuY29tcHV0ZWRTaWduICogMiAqKiB0aGlzLmNvbXB1dGVkRXhwb25lbnQgKiB0aGlzLmNvbXB1dGVkTWFudGlzc2E7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBtYXJnaW4gb2YgZXJyb3JcbiAgICovXG4gIGdldCBlcnJvcigpIHsgICAgXG4gICAgaWYgKE51bWJlci5pc05hTih0aGlzLm51bWJlcikgfHwgdGhpcy5udW1iZXIgPT09IEluZmluaXR5IHx8IHRoaXMubnVtYmVyID09PSAwKSB7XG4gICAgICByZXR1cm4gMDtcbiAgICB9XG5cbiAgICByZXR1cm4gTWF0aC5hYnModGhpcy5udW1iZXIgLSB0aGlzLmNvbXB1dGVkTnVtYmVyKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gdGhlIGJpbmFyeSByZXByZXNlbnRhdGlvbiBvZiB0aGUgc2lnblxuICAgKiAwIGlmIG51bWJlciA+PSAwXG4gICAqIDEgaWYgbnVtYmVyIDwgMFxuICAgKi9cbiAgZ2V0IGJpbmFyeVNpZ24oKTogXCIwXCIgfCBcIjFcIiB7XG4gICAgcmV0dXJuIHRoaXMuX2JpbmFyeVNpZ247XG4gIH1cblxuICBzZXQgYmluYXJ5U2lnbih2YWx1ZTogXCIwXCIgfCBcIjFcIikge1xuICAgIHRoaXMuX2JpbmFyeVNpZ24gPSB2YWx1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUcnVlIGlmIHRoZSBudW1iZXIgY2Fubm90IGJlIGVuY29kZWQgaW4gPGJpdHNTaXplPiBiaXRzXG4gICAqL1xuICBnZXQgb3ZlcmZsb3coKSB7XG4gICAgcmV0dXJuIHRoaXMuX292ZXJmbG93O1xuICB9XG5cbiAgLyoqXG4gICAqIENhbGN1bGF0ZTpcbiAgICogLSBCaW5hcnkgc2lnblxuICAgKiAtIFRoZSBiaWFzXG4gICAqIC0gVGhlIGJpbmFyeSBtYW50aXNzYVxuICAgKiAtIFRoZSBiaW5hcnkgZXhwb25lbnRcbiAgICovXG4gIGNhbGN1bGF0ZSgpIHtcbiAgICB0aGlzLmNhbGN1bGF0ZUJpbmFyeVNpZ24oKTtcbiAgICB0aGlzLmNhbGN1bGF0ZUJpYXMoKTtcbiAgICB0aGlzLmNhbGN1bGF0ZUJpbmFyeU1hbnRpc3NhKCk7XG4gICAgdGhpcy5jYWxjdWxhdGVCaW5hcnlFeHBvbmVudCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIERldGVybWluZSB0aGUgYmluYXJ5IHNpZ24gb2YgdGhlIG51bWJlclxuICAgKi9cbiAgY2FsY3VsYXRlQmluYXJ5U2lnbigpIHtcbiAgICB0aGlzLl9iaW5hcnlTaWduID0gdGhpcy5udW1iZXIgPCAwID8gXCIxXCIgOiBcIjBcIjtcbiAgfVxuXG4gIC8qKlxuICAgKiBDYWxjdWxhdGUgdGhlIGV4cG9uZW50IGJpYXMgYmFzZWQgb24gdGhlIGV4cG9uZW50IGJpdCBzaXplXG4gICAqIGIgPSAyIF4gKGV4cG9uZW50Qml0c1NpemUgLSAxKSAtIDE7XG4gICAqL1xuICBjYWxjdWxhdGVCaWFzKCkge1xuICAgIHRoaXMuX2JpYXMgPSAyICoqICh0aGlzLmV4cG9uZW50Qml0c1NpemUgLSAxKSAtIDE7XG4gIH1cblxuICAvKipcbiAgICogRGV0ZXJtaW5lIHRoZSBiaW5hcnkgbWFudGlzc2EgYW5kIGRldGVybWluZSB0aGUgZG90IHBvc2l0aW9uIGluIHRoZSBtYW50aXNzYVxuICAgKi9cbiAgY2FsY3VsYXRlQmluYXJ5TWFudGlzc2EoKSB7XG4gICAgaWYgKE51bWJlci5pc05hTih0aGlzLm51bWJlcikpIHtcbiAgICAgIHRoaXMuX21hbnRpc3NhRG90UG9zaXRpb24gPSAwO1xuICAgICAgdGhpcy5fYmluYXJ5TWFudGlzc2EgPSBcIlwiLnBhZEVuZCh0aGlzLm1hbnRpc3NhQml0c1NpemUsIFwiMVwiKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBHZXQgdGhlIGludGVnZXIgcGFydFxuICAgIGNvbnN0IGludGVnZXJQYXJ0ID0gTWF0aC50cnVuYyh0aGlzLnBvc2l0aXZlTnVtYmVyKTtcblxuICAgIC8vIEdldCB0aGUgZGVjaW1hbHMgb2YgdGhlIG51bWJlcjogZGVjaW1hbHMgPSAxOS41OTM3NSAtIDE5ID0gMC41OTM3NVxuICAgIGxldCBkZWNpbWFsc1BhcnQgPSB0aGlzLnBvc2l0aXZlTnVtYmVyIC0gTWF0aC50cnVuYyh0aGlzLnBvc2l0aXZlTnVtYmVyKTtcblxuICAgIGNvbnN0IGJpbmFyeUludGVnZXJQYXJ0ID0gdGhpcy5fYmguZGVjaW1hbFRvQmluYXJ5KGludGVnZXJQYXJ0KTtcblxuICAgIC8vIEdldCB0aGUgbnVtYmVyIG9mIGJpdHMgZGVkaWNhdGVkIHRvIHN0b3JlIHRoZSBkZWNpbWFscyBpbiB0aGUgbWFudGlzc2FcbiAgICBjb25zdCBkZWNpbWFsc0JpdHNTaXplID0gdGhpcy5tYW50aXNzYUJpdHNTaXplIC0gYmluYXJ5SW50ZWdlclBhcnQubGVuZ3RoIC0gMTtcbiAgICBcbiAgICBsZXQgYmluYXJ5RGVjaW1hbHNQYXJ0ID0gXCJcIjtcbiAgICAvLyAwLjU5Mzc1ICogMiA9IDEuMTg3NSAgPT4gMVxuICAgIC8vIDAuMTg3NSAgKiAyID0gMC4zNzUgICA9PiAwXG4gICAgLy8gMC4zNzUgICAqIDIgPSAwLjc1ICAgID0+IDBcbiAgICAvLyAwLjc1ICAgICogMiA9IDEuNSAgICAgPT4gMVxuICAgIC8vIDAuNSAgICAgKiAyID0gMSAgICAgICA9PiAxXG4gICAgZm9yKGxldCBpID0gMDsgaSA8IGRlY2ltYWxzQml0c1NpemU7IGkrKykge1xuICAgICAgZGVjaW1hbHNQYXJ0ICo9IDI7XG5cbiAgICAgIGlmIChkZWNpbWFsc1BhcnQgPj0gMSkge1xuICAgICAgICBkZWNpbWFsc1BhcnQgLT0gMTtcbiAgICAgICAgYmluYXJ5RGVjaW1hbHNQYXJ0ICs9IFwiMVwiO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYmluYXJ5RGVjaW1hbHNQYXJ0ICs9IFwiMFwiO1xuICAgICAgfVxuICAgIH1cblxuICAgIGxldCBiaW5hcnlNYW50aXNzYSA9IGJpbmFyeUludGVnZXJQYXJ0ICsgYmluYXJ5RGVjaW1hbHNQYXJ0O1xuXG4gICAgLy8gR2V0IHRoZSBwb3NpdGlvbiBvZiB0aGUgZmlyc3QgYml0IGF0IDEsIGZvciBvbmx5IGRlY2ltYWxzIG51bWJlclxuICAgIGxldCBtYW50aXNzYURvdFBvc2l0aW9uID0gLWJpbmFyeU1hbnRpc3NhLmluZGV4T2YoXCIxXCIpO1xuXG4gICAgLy8gUmVtb3ZlIGFsbCB0aGUgbGVhZGluZyBiaXQgYXQgMCBmcm9tIHRoZSBtYW50aXNzYVxuICAgIGJpbmFyeU1hbnRpc3NhID0gdGhpcy5fYmguY2xlYW4oYmluYXJ5TWFudGlzc2EpO1xuXG4gICAgLy8gSWYgdGhlIHBvc2l0aW9uIG9mIHRoZSBmaXJzdCBiaXQgYXQgMSBpcyAwXG4gICAgLy8gdGhlbiB0aGUgZG90IHBvc2l0aW9uIGlzIGVxdWFscyB0byB0aGUgbGVuZ3RoIG9mIHRoZSBiaW5hcnkgaW50ZWdlciBwYXJ0IG9mIHRoZSBtYW50aXNzYVxuICAgIGlmIChtYW50aXNzYURvdFBvc2l0aW9uID09PSAwKSB7XG4gICAgICBtYW50aXNzYURvdFBvc2l0aW9uID0gYmluYXJ5SW50ZWdlclBhcnQubGVuZ3RoIC0gMTtcbiAgICB9XG5cbiAgICAvLyBIaWRlIHRoZSBmaXJzdCBiaXQgYXQgMVxuICAgIGJpbmFyeU1hbnRpc3NhID0gYmluYXJ5TWFudGlzc2Euc3Vic3RyaW5nKDEpO1xuXG4gICAgLy8gTWFrZSBzdXJlIHRoYXQgdGhlIG1hbnRpc3NhIG1hdGNoZXMgdGhlIGNvcnJlY3QgbGVuZ3RoICgyMyBmb3IgMzIgYml0cyBmb3IgZXhhbXBsZSlcbiAgICBiaW5hcnlNYW50aXNzYSA9IGJpbmFyeU1hbnRpc3NhLnBhZEVuZCh0aGlzLm1hbnRpc3NhQml0c1NpemUsIFwiMFwiKTtcblxuICAgIHRoaXMuYmluYXJ5TWFudGlzc2EgPSBiaW5hcnlNYW50aXNzYTtcbiAgICB0aGlzLl9tYW50aXNzYURvdFBvc2l0aW9uID0gbWFudGlzc2FEb3RQb3NpdGlvbjtcbiAgfVxuXG4gIC8qKlxuICAgKiBDYWxjdWxhdGUgdGhlIGV4cG9uZW50IGluIGJpbmFyeVxuICAgKiBlID0gYmluYXJ5KG1hbnRpc3NhRmxvYXRQb3NpdGlvbiArIGJpYXMpXG4gICAqL1xuICBjYWxjdWxhdGVCaW5hcnlFeHBvbmVudCgpIHtcbiAgICAvLyBJZiB0aGUgbnVtYmVyIGlzIE5hTiBvciBJbmZpbml0eSB0aGVuIGFsbCB0aGUgYml0cyBvZiB0aGUgZXhwb25lbnQgYXJlIGVxdWFscyB0byAxXG4gICAgaWYgKE51bWJlci5pc05hTih0aGlzLm51bWJlcikgfHwgdGhpcy5udW1iZXIgPT09IEluZmluaXR5KSB7XG4gICAgICB0aGlzLl9iaW5hcnlFeHBvbmVudCA9IFwiXCIucGFkRW5kKHRoaXMuZXhwb25lbnRCaXRzU2l6ZSwgXCIxXCIpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGxldCBleHBvbmVudCA9IHRoaXMubWFudGlzc2FEb3RQb3NpdGlvbiArIHRoaXMuYmlhcztcblxuICAgIC8vIElmIHRoZSBudW1iZXIgaXMgMCB0aGVuIGFsbCB0aGUgYml0cyBvZiB0aGUgZXhwb25lbnQgYXJlIGVxdWFscyB0byAwXG4gICAgaWYgKHRoaXMubnVtYmVyID09PSAwKSB7XG4gICAgICBleHBvbmVudCA9IDA7XG4gICAgfVxuXG4gICAgLy8gQ29udmVydCB0aGUgZXhwb25lbnQgdG8gYmluYXJ5IGFuZCBhZGQgbGVhZGluZyAwIHRvIG1hdGNoIHRoZSBleHBvbmVudCBiaXRzIHNpemVcbiAgICB0aGlzLl9iaW5hcnlFeHBvbmVudCA9IHRoaXMuX2JoLmRlY2ltYWxUb0JpbmFyeShleHBvbmVudCkucGFkU3RhcnQodGhpcy5leHBvbmVudEJpdHNTaXplLCBcIjBcIik7XG4gIH1cblxuICAvKipcbiAgICogQWRkIHR3byBiaW5hcnkgZmxvYXQgbnVtYmVyXG4gICAqIEBwYXJhbSBiZjIgVGhlIGJpbmFyeSBmbG9hdCBudW1iZXIgdG8gYWRkXG4gICAqIEByZXR1cm5zIFRoZSByZXN1bHQgb2YgdGhlIGFkZGl0aW9uXG4gICAqL1xuICBhZGQoYmYyOiBCaW5hcnlGbG9hdCkge1xuICAgIGNvbnN0IGJmUmVzID0gbmV3IEJpbmFyeUZsb2F0KDEsIHRoaXMuYml0c1NpemUpO1xuXG4gICAgLy8gU3BlY2lhbCBjYXNlc1xuICAgIGlmICh0aGlzLmlzTmFOIHx8IGJmMi5pc05hTikge1xuICAgICAgcmV0dXJuIEJpbmFyeUZsb2F0LmdldE5hTih0aGlzLmJpdHNTaXplKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuaXNJbmZpbml0eSB8fCBiZjIuaXNJbmZpbml0eSkge1xuICAgICAgcmV0dXJuIEJpbmFyeUZsb2F0LmdldEluZmluaXR5KHRoaXMuYml0c1NpemUpO1xuICAgIH1cbiAgICBpZiAodGhpcy5iaW5hcnlBYnMgPT09IGJmMi5iaW5hcnlBYnMgJiYgdGhpcy5iaW5hcnlTaWduICE9PSBiZjIuYmluYXJ5U2lnbikge1xuICAgICAgcmV0dXJuIEJpbmFyeUZsb2F0LmdldFplcm8odGhpcy5iaXRzU2l6ZSk7XG4gICAgfVxuXG4gICAgLy8gU3RlcCAxOiBEZXRlcm1pbmUgdGhlIGxvd2VzdCBleHBvbmVudCBiZXR3ZWVuIHRoaXMgYW5kIHRoZSBzZWNvbmQgbnVtYmVyXG4gICAgbGV0IGJmTWluQmluYXJ5RXhwb25lbnQ6IEJpbmFyeUZsb2F0ID0gdGhpcztcbiAgICBsZXQgYmZNYXhCaW5hcnlFeHBvbmVudDogQmluYXJ5RmxvYXQgPSBiZjI7XG4gICAgaWYgKHRoaXMuX2JoLmJpbmFyeVRvRGVjaW1hbChiZjIuYmluYXJ5RXhwb25lbnQpIDwgdGhpcy5fYmguYmluYXJ5VG9EZWNpbWFsKGJmTWluQmluYXJ5RXhwb25lbnQuYmluYXJ5RXhwb25lbnQpKSB7XG4gICAgICBiZk1pbkJpbmFyeUV4cG9uZW50ID0gYmYyO1xuICAgICAgYmZNYXhCaW5hcnlFeHBvbmVudCA9IHRoaXM7XG4gICAgfVxuICAgIC8vIENvcHkgdGhlIG51bWJlciwgZG8gbm90IHNldCBieSByZWZlcmVuY2VcbiAgICBiZk1heEJpbmFyeUV4cG9uZW50ID0gbmV3IEJpbmFyeUZsb2F0KGJmTWF4QmluYXJ5RXhwb25lbnQuY29tcHV0ZWROdW1iZXIsIHRoaXMuYml0c1NpemUpO1xuICAgIGJmTWluQmluYXJ5RXhwb25lbnQgPSBuZXcgQmluYXJ5RmxvYXQoYmZNaW5CaW5hcnlFeHBvbmVudC5jb21wdXRlZE51bWJlciwgdGhpcy5iaXRzU2l6ZSk7XG5cbiAgICAvLyBJZiB0aGVyZSBpcyBhIDAgdGhlbiByZXR1cm4gdGhlIG5vbi16ZXJvIG51bWJlclxuICAgIGlmIChiZk1pbkJpbmFyeUV4cG9uZW50LmlzWmVybykge1xuICAgICAgcmV0dXJuIGJmTWF4QmluYXJ5RXhwb25lbnQ7XG4gICAgfVxuXG4gICAgLy8gQWRkIHRoZSBoaWRkZW4gYml0XG4gICAgYmZNaW5CaW5hcnlFeHBvbmVudC5iaW5hcnlNYW50aXNzYSA9IFwiMVwiICsgYmZNaW5CaW5hcnlFeHBvbmVudC5iaW5hcnlNYW50aXNzYTtcbiAgICBiZk1heEJpbmFyeUV4cG9uZW50LmJpbmFyeU1hbnRpc3NhID0gXCIxXCIgKyBiZk1heEJpbmFyeUV4cG9uZW50LmJpbmFyeU1hbnRpc3NhO1xuXG4gICAgLy8gU3RlcCAyOiBTaGlmdCB0aGUgbWFudGlzc2FcbiAgICBjb25zdCBzaGlmdFZhbHVlID0gYmZNYXhCaW5hcnlFeHBvbmVudC5jb21wdXRlZEV4cG9uZW50IC0gYmZNaW5CaW5hcnlFeHBvbmVudC5jb21wdXRlZEV4cG9uZW50O1xuICAgIGNvbnN0IHNoaWZ0ZWRNaW5NYW50aXNzYSA9IHRoaXMuX2JoLnNoaWZ0UmlnaHQoYmZNaW5CaW5hcnlFeHBvbmVudC5iaW5hcnlNYW50aXNzYSwgc2hpZnRWYWx1ZSk7XG4gICAgYmZNaW5CaW5hcnlFeHBvbmVudC5iaW5hcnlNYW50aXNzYSA9IHNoaWZ0ZWRNaW5NYW50aXNzYTtcbiAgICBcbiAgICAvLyBTdGVwIDM6IFB1dCB0aGUgc2FtZSBleHBvbmVudFxuICAgIGJmUmVzLmJpbmFyeUV4cG9uZW50ID0gYmZNYXhCaW5hcnlFeHBvbmVudC5iaW5hcnlFeHBvbmVudDtcblxuICAgIC8vIFN0ZXAgNDogMidzIGNvbXBsZW1lbnQgaWYgbmVnYXRpdmVcbiAgICBpZiAoYmZNaW5CaW5hcnlFeHBvbmVudC5jb21wdXRlZFNpZ24gPT09IC0xKSB7XG4gICAgICBiZk1pbkJpbmFyeUV4cG9uZW50LmJpbmFyeU1hbnRpc3NhID0gdGhpcy5fYmguYzIoYmZNaW5CaW5hcnlFeHBvbmVudC5iaW5hcnlNYW50aXNzYSkucmV2ZXJzZSgpLmpvaW4oXCJcIik7XG4gICAgfVxuICAgIGlmIChiZk1heEJpbmFyeUV4cG9uZW50LmNvbXB1dGVkU2lnbiA9PT0gLTEpIHtcbiAgICAgIGJmTWF4QmluYXJ5RXhwb25lbnQuYmluYXJ5TWFudGlzc2EgPSB0aGlzLl9iaC5jMihiZk1heEJpbmFyeUV4cG9uZW50LmJpbmFyeU1hbnRpc3NhKS5yZXZlcnNlKCkuam9pbihcIlwiKTtcblxuICAgICAgaWYgKGJmTWF4QmluYXJ5RXhwb25lbnQuY29tcHV0ZWRTaWduICE9PSBiZk1pbkJpbmFyeUV4cG9uZW50LmNvbXB1dGVkU2lnbikge1xuICAgICAgICBiZlJlcy5iaW5hcnlTaWduID0gXCIxXCI7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gU3RlcCA1OiBBZGQgdGhlIG1hbnRpc3NhIGFuZCB0aGUgc2hpZnRlZCBvbmVcbiAgICBiZlJlcy5iaW5hcnlNYW50aXNzYSA9IHRoaXMuX2JoLmJpbmFyeUFkZGl0aW9uKFxuICAgICAgYmZNYXhCaW5hcnlFeHBvbmVudC5iaW5hcnlNYW50aXNzYSxcbiAgICAgIGJmTWluQmluYXJ5RXhwb25lbnQuYmluYXJ5TWFudGlzc2EsXG4gICAgKS5yZXZlcnNlKCkuam9pbihcIlwiKTtcblxuICAgIC8vIFN0ZXAgNzogTm9ybWFsaXplIHRoZSBtYW50aXNzYVxuICAgIC8vIEhpZGUgdGhlIGZpcnN0IGJpdFxuICAgIGJmUmVzLmJpbmFyeU1hbnRpc3NhID0gYmZSZXMuYmluYXJ5TWFudGlzc2Euc3Vic3RyaW5nKDEpO1xuXG4gICAgLy8gTm9ybWFsaXplIHRoZSBtYW50aXNzYSBpZiB0aGVyZSBpcyBhIGNhcnJ5XG4gICAgaWYgKGJmUmVzLmJpbmFyeU1hbnRpc3NhLmxlbmd0aCAtIGJmUmVzLm1hbnRpc3NhQml0c1NpemUgPT09IDEpIHtcbiAgICAgIC8vIFJvdW5kIHRoZSBsYXN0IGJpdFxuICAgICAgY29uc3QgbGFzdEJpdCA9ICBiZlJlcy5iaW5hcnlNYW50aXNzYVtiZlJlcy5iaW5hcnlNYW50aXNzYS5sZW5ndGggLSAxXTtcbiAgICAgIGNvbnN0IGJlZm9yZUxhc3RCaXQgPSAgYmZSZXMuYmluYXJ5TWFudGlzc2FbYmZSZXMuYmluYXJ5TWFudGlzc2EubGVuZ3RoIC0gMl07XG4gICAgICBiZlJlcy5iaW5hcnlNYW50aXNzYSA9IGJmUmVzLmJpbmFyeU1hbnRpc3NhLnNsaWNlKDAsIC0xKTtcbiAgICAgIGlmIChiZWZvcmVMYXN0Qml0ID09PSBcIjFcIiAmJiBsYXN0Qml0ID09PSBcIjFcIikge1xuICAgICAgICBiZlJlcy5iaW5hcnlNYW50aXNzYSA9IHRoaXMuX2JoLmJpbmFyeUFkZGl0aW9uKGJmUmVzLmJpbmFyeU1hbnRpc3NhLCBcIjFcIikucmV2ZXJzZSgpLmpvaW4oXCJcIik7XG4gICAgICB9XG5cbiAgICAgIC8vIEFkZCAxIHRvIHRoZSBleHBvbmVudFxuICAgICAgYmZSZXMuYmluYXJ5RXhwb25lbnQgPSB0aGlzLl9iaC5hZGROdW1iZXJUb0JpbmFyeShiZlJlcy5iaW5hcnlFeHBvbmVudCwgMSlbMF07XG4gICAgfVxuXG4gICAgcmV0dXJuIGJmUmVzO1xuICB9XG5cbiAgLyoqXG4gICAqIEZpbmQgdGhlIG1pbmltdW0gYml0cyBzaXplIHRvIG1hdGNoIHRoZSBudW1iZXIgYWxtb3N0IFwicGVyZmVjdGx5XCJcbiAgICogQHBhcmFtIG1heEJpdFNpemUgRGVmYXVsdCAyNTYsIHRoZSBiaXRzIHNpemUgbGltaXRcbiAgICovXG4gIGZpbmRBY2N1cmF0ZUJpdHNTaXplKG1heEJpdFNpemUgPSAyNTYpIHtcbiAgICB0aGlzLmJpdHNTaXplID0gQmluYXJ5RmxvYXQuX21pbkJpdFNpemU7XG4gICAgXG4gICAgd2hpbGUodGhpcy5iaXRzU2l6ZSA8IG1heEJpdFNpemUgJiYgdGhpcy5tYXJnaW5PZkVycm9yICE9PSAwKSB7XG4gICAgICB0aGlzLmJpdHNTaXplKys7XG4gICAgICB0aGlzLmNhbGN1bGF0ZSgpO1xuICAgIH1cbiAgfVxufVxuIiwiLyoqXG4gKiBMYWJvOiAxIChGbG9hdCB0byBiaW5hcnkgY29udmVyc2lvbilcbiAqIEF1dGhvcnM6IE93ZW4gR29tYmFzLCBEYXZpZCBEYXJtYW5nZXIsIEp1bGllbiBWYXVjaGVyLCBDbMOpbWVudCBQZXRpZ25hdFxuICogVGVhbTogMlxuICogU2Nob29sOiBIRS1BcmNcbiAqIERhdGU6IDIxIG1hcnMgMjAyMlxuICogQ291cnNlOiBNYXRow6ltYXRpcXVlcyBzcMOpY2lmaXF1ZXMgKE1vZHVsZSAyMjM0KSAtIE0uIFN0w6lwaGFuZSBHb2Jyb25cbiAqL1xuXG5pbXBvcnQgeyBCaW5hcnlGbG9hdCB9IGZyb20gXCIuL2NsYXNzZXMvQmluYXJ5RmxvYXRcIjtcblxuY29uc3QgYWRkQml0U2l6ZUVsZW1lbnQgPSA8SFRNTElucHV0RWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFkZC1iaXRzLXNpemVcIik7XG5jb25zdCBhZGRJbnB1dEFFbGVtZW50ID0gPEhUTUxJbnB1dEVsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhZGQtaW5wdXQtYVwiKTtcbmNvbnN0IGFkZElucHV0QkVsZW1lbnQgPSA8SFRNTElucHV0RWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFkZC1pbnB1dC1iXCIpO1xuY29uc3QgYWRkUmVzdWx0RWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYWRkLXJlc3VsdFwiKTtcbmNvbnN0IG1pbkxlbmd0aCA9IDg7XG5jb25zdCBtYXhMZW5ndGggPSAyNTY7XG5cbmZ1bmN0aW9uIG9uQ2hhbmdlQWRkaXRpb24oKSB7XG4gIGNvbnN0IGJpdHNTaXplID0gTnVtYmVyKGFkZEJpdFNpemVFbGVtZW50LnZhbHVlKTtcbiAgY29uc3QgaW5wdXRBID0gTnVtYmVyKGFkZElucHV0QUVsZW1lbnQudmFsdWUpO1xuICBjb25zdCBpbnB1dEIgPSBOdW1iZXIoYWRkSW5wdXRCRWxlbWVudC52YWx1ZSk7XG5cbiAgaWYgKGJpdHNTaXplIDwgbWluTGVuZ3RoKSB7XG4gICAgYWRkUmVzdWx0RWxlbWVudC5pbm5lckhUTUwgPSBgPHNwYW4gY2xhc3M9XCJjb2xvci1yZWRcIj5MYSB0YWlsbGUgZGVzIGJpdHMgZG9pdCBhdSBtaW5pbXVtIMOqdHJlICR7bWluTGVuZ3RofTwvc3Bhbj5gO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGlmIChiaXRzU2l6ZSA+IG1heExlbmd0aCkge1xuICAgIGFkZFJlc3VsdEVsZW1lbnQuaW5uZXJIVE1MID0gYDxzcGFuIGNsYXNzPVwiY29sb3ItcmVkXCI+TGEgdGFpbGxlIGRlcyBiaXRzIGRvaXQgYXUgbWF4aW11bSDDqnRyZSAke21heExlbmd0aH08L3NwYW4+YDtcbiAgICByZXR1cm47XG4gIH1cbiAgICBcbiAgaWYgKGFkZEJpdFNpemVFbGVtZW50LnZhbHVlID09PSBcIlwiIHx8IGFkZElucHV0QUVsZW1lbnQudmFsdWUgPT09IFwiXCIgfHwgYWRkSW5wdXRCRWxlbWVudC52YWx1ZSA9PT0gXCJcIikge1xuICAgIGFkZFJlc3VsdEVsZW1lbnQuaW5uZXJIVE1MID0gYDxzcGFuIGNsYXNzPVwiY29sb3ItZ3JleVwiPlZldWlsbGV6IHJlbnNlaWduZXIgdG91cyBsZXMgY2hhbXBzPC9zcGFuPmA7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgaWYgKGlucHV0QSA8IDAgfHwgaW5wdXRCIDwgMCkge1xuICAgIGFkZFJlc3VsdEVsZW1lbnQuaW5uZXJIVE1MID0gYDxzcGFuIGNsYXNzPVwiY29sb3ItcmVkXCI+Tm91cyBuZSBzdXBwb3J0b25zIHF1ZSBsZXMgYWRkaXRpb25zIHBvdXIgbGUgbW9tZW50PC9zcGFuPmA7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY29uc3QgYmZBID0gbmV3IEJpbmFyeUZsb2F0KGlucHV0QSwgYml0c1NpemUpO1xuICBjb25zdCBiZkIgPSBuZXcgQmluYXJ5RmxvYXQoaW5wdXRCLCBiaXRzU2l6ZSk7XG4gIGNvbnN0IGJmUmVzID0gYmZBLmFkZChiZkIpO1xuICBjb25zdCBnZXRPdmVyRmxvd0Vycm9yID0gKG5iOiBzdHJpbmcgfCBudW1iZXIpID0+IGA8c3BhbiBjbGFzcz1cImNvbG9yLXJlZFwiPiR7bmJ9IGVzdCB0cm9wIGdyYW5kIHBvdXIgw6p0cmUgZW5jb2TDqSBlbiAke2JpdHNTaXplfSBiaXRzPC9zcGFuPmA7XG5cbiAgaWYgKGJmQS5vdmVyZmxvdykge1xuICAgIGFkZFJlc3VsdEVsZW1lbnQuaW5uZXJIVE1MID0gZ2V0T3ZlckZsb3dFcnJvcihiZkEubnVtYmVyKTtcbiAgICByZXR1cm47XG4gIH1cblxuICBpZiAoYmZCLm92ZXJmbG93KSB7XG4gICAgYWRkUmVzdWx0RWxlbWVudC5pbm5lckhUTUwgPSBnZXRPdmVyRmxvd0Vycm9yKGJmQi5udW1iZXIpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGlmIChiZlJlcy5vdmVyZmxvdykge1xuICAgIGFkZFJlc3VsdEVsZW1lbnQuaW5uZXJIVE1MID0gZ2V0T3ZlckZsb3dFcnJvcihcIkxlIHLDqXN1bHRhdFwiKTtcbiAgICByZXR1cm47XG4gIH1cblxuICBhZGRSZXN1bHRFbGVtZW50LmlubmVySFRNTCA9IGBcbiAgICA8ZGl2IGNsYXNzPVwicmVzdWx0LWdyb3VwIGNvbG9yLWdyZXlcIj5cbiAgICAgIFLDqXN1bHRhdCBcImV4YWN0XCI6XG4gICAgICA8c3BhbiBjbGFzcz1cIm1vbm9cIj4ke2lucHV0QSArIGlucHV0Qn08L3NwYW4+XG4gICAgPC9kaXY+XG5cbiAgICA8ZGl2IGNsYXNzPVwicmVzdWx0LWdyb3VwIG10MjVcIj5cbiAgICAgIE5vbWJyZSA8c3BhbiBjbGFzcz1cIm1vbm9cIj4xPC9zcGFuPiBlbiBiaW5haXJlOlxuICAgICAgPHNwYW4gY2xhc3M9XCJjb2xvci1yZWQgbW9ub1wiPiR7YmZBLmJpbmFyeVNpZ259PC9zcGFuPlxuICAgICAgPHNwYW4gY2xhc3M9XCJjb2xvci1ibHVlIG1vbm9cIj4ke2JmQS5iaW5hcnlFeHBvbmVudH08L3NwYW4+XG4gICAgICA8c3BhbiBjbGFzcz1cImNvbG9yLW9yYW5nZSBtb25vXCI+JHtiZkEuYmluYXJ5TWFudGlzc2F9PC9zcGFuPlxuICAgICAgKDxzcGFuIGNsYXNzPVwibW9ub1wiPiR7YmZBLmNvbXB1dGVkTnVtYmVyfTwvc3Bhbj4pXG4gICAgPC9kaXY+XG5cbiAgICA8ZGl2IGNsYXNzPVwicmVzdWx0LWdyb3VwXCI+XG4gICAgICBOb21icmUgPHNwYW4gY2xhc3M9XCJtb25vXCI+Mjwvc3Bhbj4gZW4gYmluYWlyZTpcbiAgICAgIDxzcGFuIGNsYXNzPVwiY29sb3ItcmVkIG1vbm9cIj4ke2JmQi5iaW5hcnlTaWdufTwvc3Bhbj5cbiAgICAgIDxzcGFuIGNsYXNzPVwiY29sb3ItYmx1ZSBtb25vXCI+JHtiZkIuYmluYXJ5RXhwb25lbnR9PC9zcGFuPlxuICAgICAgPHNwYW4gY2xhc3M9XCJjb2xvci1vcmFuZ2UgbW9ub1wiPiR7YmZCLmJpbmFyeU1hbnRpc3NhfTwvc3Bhbj5cbiAgICAgICg8c3BhbiBjbGFzcz1cIm1vbm9cIj4ke2JmQi5jb21wdXRlZE51bWJlcn08L3NwYW4+KVxuICAgIDwvZGl2PlxuXG4gICAgPGRpdiBjbGFzcz1cInJlc3VsdC1ncm91cCBtdDI1XCI+XG4gICAgICBSw6lzdWx0YXQgZW4gYmluYWlyZTpcbiAgICAgIDxzcGFuIGNsYXNzPVwiY29sb3ItcmVkIG1vbm9cIj4ke2JmUmVzLmJpbmFyeVNpZ259PC9zcGFuPlxuICAgICAgPHNwYW4gY2xhc3M9XCJjb2xvci1ibHVlIG1vbm9cIj4ke2JmUmVzLmJpbmFyeUV4cG9uZW50fTwvc3Bhbj5cbiAgICAgIDxzcGFuIGNsYXNzPVwiY29sb3Itb3JhbmdlIG1vbm9cIj4ke2JmUmVzLmJpbmFyeU1hbnRpc3NhfTwvc3Bhbj5cbiAgICA8L2Rpdj5cblxuICAgIDxkaXYgY2xhc3M9XCJyZXN1bHQtZ3JvdXBcIj5cbiAgICAgIFLDqXN1bHRhdCBjYWxjdWzDqTpcbiAgICAgIDxzcGFuIGNsYXNzPVwibW9ub1wiPiR7YmZSZXMuY29tcHV0ZWROdW1iZXJ9PC9zcGFuPlxuICAgIDwvZGl2PlxuXG4gICAgPGRpdiBjbGFzcz1cInJlc3VsdC1ncm91cFwiPlxuICAgICAgTWFyZ2UgZCdlcnJldXI6XG4gICAgICA8c3BhbiBjbGFzcz1cIm1vbm9cIj4ke01hdGguYWJzKGlucHV0QSArIGlucHV0QiAtIGJmUmVzLmNvbXB1dGVkTnVtYmVyKX08L3NwYW4+XG4gICAgPC9kaXY+XG4gIGA7XG59XG5cbmFkZEJpdFNpemVFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgb25DaGFuZ2VBZGRpdGlvbik7XG5hZGRCaXRTaXplRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwia2V5dXBcIiwgb25DaGFuZ2VBZGRpdGlvbik7XG5hZGRJbnB1dEFFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgb25DaGFuZ2VBZGRpdGlvbik7XG5hZGRJbnB1dEFFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXl1cFwiLCBvbkNoYW5nZUFkZGl0aW9uKTtcbmFkZElucHV0QkVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCBvbkNoYW5nZUFkZGl0aW9uKTtcbmFkZElucHV0QkVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImtleXVwXCIsIG9uQ2hhbmdlQWRkaXRpb24pO1xuXG5vbkNoYW5nZUFkZGl0aW9uKCk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=
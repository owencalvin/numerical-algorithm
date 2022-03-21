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
        }
        // Step 5: Add the mantissa and the shifted one
        bfRes.binaryMantissa = this._bh.binaryAddition(bfMaxBinaryExponent.binaryMantissa, bfMinBinaryExponent.binaryMantissa).reverse().join("");
        // Step 6: Determine the sign of the result
        if (bfMaxBinaryExponent.computedSign !== bfMinBinaryExponent.computedSign) {
            if (bfMaxBinaryExponent.computedSign === -1) {
                bfRes.binarySign = "1";
            }
        }
        // Step 7: Normalize the mantissa
        // Hide the first bit
        bfRes.binaryMantissa = bfRes.binaryMantissa.substring(1);
        // Normalize the mantissa if there is a carry
        if (bfRes.binaryMantissa.length - bfRes.mantissaBitsSize === 1) {
            // Remove the last bit
            bfRes.binaryMantissa = bfRes.binaryMantissa.slice(0, -1);
            // Add 1 to the exponent
            bfRes.binaryExponent = this._bh.addNumberToBinary(bfRes.binaryExponent, 1)[0];
        }
        return bfRes;
    };
    return BinaryFloat;
}());


;// CONCATENATED MODULE: ./src/labo1-addition.ts

var addBitSizeElement = document.getElementById("add-bits-size");
var addInputAElement = document.getElementById("add-input-a");
var addInputBElement = document.getElementById("add-input-b");
var addResultElement = document.getElementById("add-result");
function onChangeAddition() {
    var bitsSize = Number(addBitSizeElement.value);
    var inputA = Number(addInputAElement.value);
    var inputB = Number(addInputBElement.value);
    if (addBitSizeElement.value === "" || addInputAElement.value === "" || addInputBElement.value === "") {
        addResultElement.innerHTML = "<span class=\"color-grey\">Veuillez renseigner tous les champs</span>";
        return;
    }
    if (bitsSize > 80) {
        addResultElement.innerHTML = "<span class=\"color-red\">La taille des bits doit au maximum \u00EAtre 80</span>";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QmluYXJ5SGVscGVyLnRzIiwid2VicGFjazovL21hdGhfc3BlLy4vc3JjL2NsYXNzZXMvQmluYXJ5RmxvYXQudHMiLCJ3ZWJwYWNrOi8vbWF0aF9zcGUvLi9zcmMvbGFibzEtYWRkaXRpb24udHMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNsYXNzIEJpbmFyeUhlbHBlciB7XG4gIC8qKlxuICAgKiBHZXQgbiBiaXQgb2YgMCBvciAxXG4gICAqIEBwYXJhbSB2YWx1ZSAxIG9yIDBcbiAgICogQHBhcmFtIG4gVGhlIG51bWJlciBvZiBiaXRzIHRvIHJldHJpZXZlXG4gICAqIEByZXR1cm5zIG4gYml0IG9mIDAgb3IgMVxuICAgKi9cbiAgcHVibGljIGdldE5CaXQodmFsdWU6IDEgfCAwLCBuOiBudW1iZXIpOiBzdHJpbmcge1xuICAgIGxldCByZXMgPSBcIlwiO1xuICAgIFxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbjsgaSsrKSB7XG4gICAgICByZXMgKz0gdmFsdWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlcztcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGQgbiB6ZXJvcyBiZWZvcmUgdGhlIGJpbmFyeSBudW1iZXJcbiAgICogQHBhcmFtIG4gVGhlIG51bWJlciBvZiAwIHRvIGFkZCBiZWZvcmUgdGhlIGJpbmFyeSBudW1iZXJcbiAgICogQHBhcmFtIGIgVGhlIGJpbmFyeSBudW1iZXJcbiAgICogQHJldHVybnMgVGhlIGJpbmFyeSBudW1iZXIgd2l0aCBuIHplcm9zIGJlZm9yZVxuICAgKi9cbiAgcHVibGljIGFkZFBhZGRpbmcobjogbnVtYmVyLCBiID0gXCJcIikge1xuICAgIGNvbnN0IHNpemUgPSBuIC0gYi5sZW5ndGg7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNpemU7IGkrKykge1xuICAgICAgYiA9IFwiMFwiICsgYjtcbiAgICB9XG5cbiAgICByZXR1cm4gYjtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmVzIHRoZSB6ZXJvcyBiZWZvcmUgYSBiaW5hcnkgbnVtYmVyICgwMDAxMDEgYmVjb21lcyAxMDEpXG4gICAqIEBwYXJhbSBiIFRoZSBiaW5hcnkgbnVtYmVyXG4gICAqIEByZXR1cm5zIFRoZSBwcm9kdWNlZCBiaW5hcnkgbnVtYmVyXG4gICAqL1xuICBwdWJsaWMgY2xlYW4oYjogc3RyaW5nKSB7XG4gICAgbGV0IHJlcyA9IGI7XG5cbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgYi5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKGJbaV0gPT09IFwiMFwiKSB7XG4gICAgICAgIHJlcyA9IHJlcy5zdWJzdHJpbmcoMSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gcmVzO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChyZXMgPT09IFwiXCIpIHtcbiAgICAgIHJldHVybiBcIjBcIjtcbiAgICB9XG4gIH1cblxuXG4gIC8qKlxuICAgKiBBZGQgMCBwYWRkaW5nIHRvIHRoZSBzbWFsbGVzdCBiaW5hcnkgbnVtYmVyIHRvIG1hdGNoIHRoZSBsb25nZXN0IG9uZSdzIGxlbmd0aFxuICAgKiBbMTAxLCAxMTAwMV0gYmVjb21lcyBbMDAxMDEsIDExMDAxXVxuICAgKiBAcGFyYW0gYjEgVGhlIGZpcnN0IGJpbmFyeSBudW1iZXJcbiAgICogQHBhcmFtIGIyIFRoZSBzZWNvbmQgYmluYXJ5IG51bWJlclxuICAgKiBAcmV0dXJucyBbYjEsIGIyXSB3aXRoIGNvcnJlY3QgcGFkZGluZ1xuICAgKi9cbiAgcHVibGljIGFkZE1heFBhZGRpbmcoYjE6IHN0cmluZywgYjI6IHN0cmluZykge1xuICAgIGlmIChiMi5sZW5ndGggPiBiMS5sZW5ndGgpIHtcbiAgICAgIGIxID0gdGhpcy5hZGRQYWRkaW5nKGIyLmxlbmd0aCwgYjEpO1xuICAgIH0gZWxzZSBpZiAoYjEubGVuZ3RoID4gYjIubGVuZ3RoKSB7XG4gICAgICBiMiA9IHRoaXMuYWRkUGFkZGluZyhiMS5sZW5ndGgsIGIyKTtcbiAgICB9XG5cbiAgICByZXR1cm4gW2IxLCBiMl07XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBtYXggbGVuZ3RoIG9mIHR3byBiaW5hcmllcyBudW1iZXJzXG4gICAqIEBwYXJhbSBiMSBUaGUgZmlyc3QgYmluYXJ5IG51bWJlclxuICAgKiBAcGFyYW0gYjIgVGhlIHNlY29uZCBiaW5hcnkgbnVtYmVyXG4gICAqIEByZXR1cm5zIFRoZSBtYXggbGVuZ3RoXG4gICAqL1xuICBwdWJsaWMgZ2V0TWF4TGVuZ3RoKGIxOiBzdHJpbmcsIGIyOiBzdHJpbmcpIHtcbiAgICBpZiAoYjEubGVuZ3RoID4gYjIubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gYjEubGVuZ3RoO1xuICAgIH1cbiAgICByZXR1cm4gYjIubGVuZ3RoO1xuICB9XG5cbiAgLyoqXG4gICAqIENvbnZlcnQgYSBudW1iZXIgdG8gaXQncyBiaW5hcnkgcmVwcmVzZW50YXRpb25cbiAgICogQHBhcmFtIGRlY2ltYWwgVGhlIFxuICAgKiBAcmV0dXJucyBUaGUgYmluYXJ5IHJlcHJlc2VudGF0aW9uIG9mIHRoZSBkZWNpbWFsIG51bWJlclxuICAgKi9cbiAgcHVibGljIGRlY2ltYWxUb0JpbmFyeShkZWNpbWFsOiBudW1iZXIpIHtcbiAgICBjb25zdCBvcmlnaW5hbE51bWJlciA9IGRlY2ltYWw7XG4gICAgbGV0IGJpbmFyeU51bWJlciA9IChNYXRoLmFicyhkZWNpbWFsKSA+Pj4gMCkudG9TdHJpbmcoMik7XG5cbiAgICBpZiAob3JpZ2luYWxOdW1iZXIgPCAwKSB7XG4gICAgICBiaW5hcnlOdW1iZXIgPSB0aGlzLmMyKGJpbmFyeU51bWJlcikucmV2ZXJzZSgpLmpvaW4oXCJcIik7XG4gICAgfVxuXG4gICAgcmV0dXJuIGJpbmFyeU51bWJlcjtcbiAgfVxuXG4gIC8qKlxuICAgKiBDb252ZXJ0IGEgYmluYXJ5IHJlcHJlc2VudGF0aW9uIG9mIGEgbnVtYmVyIHRvIGEgZGVjaW1hbCBudW1iZXJcbiAgICogQHBhcmFtIGJpbmFyeSBUaGUgYmluYXJ5IHJlcHJlc2VudGF0aW9uIG9mIGEgbnVtYmVyXG4gICAqIEByZXR1cm5zIFRoZSBpbnQgcmVwcmVzZW50YXRpb24gb2YgYSBiaW5hcnkgbnVtYmVyXG4gICAqL1xuICBwdWJsaWMgYmluYXJ5VG9EZWNpbWFsKGJpbmFyeTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHBhcnNlSW50KGJpbmFyeSwgMik7XG4gIH1cblxuICAvKipcbiAgICogQWRkIGludCB0byBhIGJpbmFyeSBudW1iZXJcbiAgICogQHBhcmFtIGIgVGhlIGJpbmFyeSBudW1iZXJcbiAgICogQHBhcmFtIG4gVGhlIGludCBudW1iZXIgdG8gYWRkIHRvIHRoZSBiaW5hcnkgbnVtYmVyXG4gICAqIEByZXR1cm5zIFRoZSBwcm9kdWNlZCByZXN1bHRcbiAgICovXG4gIHB1YmxpYyBhZGROdW1iZXJUb0JpbmFyeShiOiBzdHJpbmcsIG46IG51bWJlcik6IHN0cmluZ1tdIHtcbiAgICByZXR1cm4gdGhpcy5iaW5hcnlBZGRpdGlvbihiLCB0aGlzLmRlY2ltYWxUb0JpbmFyeShuKSk7XG4gIH1cblxuICAvKipcbiAgICogSW52ZXJ0IGEgYmluYXJ5IG51bWJlclxuICAgKiBAcGFyYW0gYiBUaGUgYmluYXJ5IG51bWJlciB0byBpbnZlcnRcbiAgICogQHJldHVybnMgVGhlIGludmVydCBiaW5hcnkgbnVtYmVyXG4gICAqL1xuICBwdWJsaWMgaW52ZXJ0KGI6IHN0cmluZykge1xuICAgIGNvbnN0IGluaXRpYWxMZW5ndGggPSBiLmxlbmd0aDtcbiAgICBiID0gdGhpcy5kZWNpbWFsVG9CaW5hcnkodGhpcy5iaW5hcnlUb0RlY2ltYWwoYikgXiB0aGlzLmJpbmFyeVRvRGVjaW1hbCh0aGlzLmdldE5CaXQoMSwgYi5sZW5ndGgpKSk7XG4gICAgYiA9IHRoaXMuYWRkUGFkZGluZyhpbml0aWFsTGVuZ3RoLCBiKTtcbiAgICByZXR1cm4gYjtcbiAgfVxuXG4gIC8qKlxuICAgKiBTaGlmdCB0aGUgYmluYXJ5IG51bWJlciB0byB0aGUgcmlnaHRcbiAgICogQHBhcmFtIGIgVGhlIGJpbmFyeSBudW1iZXJcbiAgICogQHBhcmFtIHNoaWZ0VmFsdWUgVGhlIHNoaWZ0IHZhbHVlXG4gICAqIEByZXR1cm5zIFRoZSBzaGlmdGVkIGJpbmFyeSBudW1iZXJcbiAgICovXG4gIHB1YmxpYyBzaGlmdFJpZ2h0KGI6IHN0cmluZywgc2hpZnRWYWx1ZTogbnVtYmVyKSB7XG4gICAgLy8gXCIwMDAwMDEwMTBcIiA+PiAyID0+IFwiMDAwMDAwMDEwXCJcbiAgICAvLyAxLiBSZW1vdmVzIGxhc3RzIDxzaGlmdFZhbHVlPiBiaXRzXG4gICAgLy8gMi4gUGxhY2VzIDxzaGlmdFZhbHVlPiBiaXRzIGF0IDAgYmVmb3JlXG5cbiAgICBpZiAoc2hpZnRWYWx1ZSA8IDEpIHtcbiAgICAgIHJldHVybiBiO1xuICAgIH1cblxuICAgIGxldCByZXMgPSBiO1xuICAgIHJlcyA9IHJlcy5zbGljZSgwLCAtc2hpZnRWYWx1ZSk7XG4gICAgcmVzID0gXCJcIi5wYWRTdGFydChzaGlmdFZhbHVlLCBcIjBcIikgKyByZXM7XG5cbiAgICByZXR1cm4gcmVzO1xuICB9XG5cbiAgLyoqXG4gICAqIFNoaWZ0IHRoZSBiaW5hcnkgbnVtYmVyIHRvIHRoZSBsZWZ0XG4gICAqIEBwYXJhbSBiIFRoZSBiaW5hcnkgbnVtYmVyXG4gICAqIEBwYXJhbSBzaGlmdFZhbHVlIFRoZSBzaGlmdCB2YWx1ZVxuICAgKiBAcmV0dXJucyBUaGUgc2hpZnRlZCBiaW5hcnkgbnVtYmVyXG4gICAqL1xuICBwdWJsaWMgc2hpZnRMZWZ0KGI6IHN0cmluZywgc2hpZnRWYWx1ZTogbnVtYmVyKSB7XG4gICAgLy8gXCIwMDAwMDEwMTBcIiA8PCAyID0+IFwiMDAwMDAxMDEwMDBcIlxuICAgIC8vIDEuIFJlbW92ZXMgbGFzdHMgPHNoaWZ0VmFsdWU+IGJpdHNcbiAgICAvLyAyLiBQbGFjZXMgPHNoaWZ0VmFsdWU+IGJpdHMgYXQgMCBiZWZvcmVcblxuICAgIGlmIChzaGlmdFZhbHVlIDwgMSkge1xuICAgICAgcmV0dXJuIGI7XG4gICAgfVxuXG4gICAgbGV0IHJlcyA9IGI7XG4gICAgcmVzID0gcmVzLnNsaWNlKHNoaWZ0VmFsdWUpO1xuICAgIHJlcyArPSBcIlwiLnBhZEVuZChzaGlmdFZhbHVlLCBcIjBcIik7XG5cbiAgICByZXR1cm4gcmVzO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZCAyIGJpdCB0b2dldGhlciB3aXRoIHRoZSBjYXJyeVxuICAgKiBAcGFyYW0geCBUaGUgZmlyc3QgYml0XG4gICAqIEBwYXJhbSB5IFRoZSBzZWNvbmQgYml0XG4gICAqIEBwYXJhbSBjYXJyeSBUaGUgY2FycnlcbiAgICogQHJldHVybnMgVGhlIHJlc3VsdCB3aXRoIHRoZSBjYXJyeSBbYml0LCBjYXJyeV1cbiAgICovXG4gIHB1YmxpYyBlbGVtZW50YXJ5QWRkaXRpb24oeDogc3RyaW5nLCB5OiBzdHJpbmcsIGNhcnJ5ID0gXCJcIik6IHN0cmluZ1tdIHtcbiAgICBjb25zdCByZXMgPSBOdW1iZXIoeCkgKyBOdW1iZXIoeSkgKyBOdW1iZXIoY2FycnkpO1xuXG4gICAgc3dpdGNoIChyZXMpIHtcbiAgICAgIC8vIGMgPSAxLCB4ID0gMSwgeSA9IDFcbiAgICAgIGNhc2UgMzpcbiAgICAgICAgcmV0dXJuIFtcIjFcIiwgXCIxXCJdO1xuICAgICAgY2FzZSAyOlxuICAgICAgICByZXR1cm4gW1wiMFwiLCBcIjFcIl07XG4gICAgICBjYXNlIDE6XG4gICAgICAgIHJldHVybiBbXCIxXCIsIFwiXCJdO1xuICAgICAgLy8gYyA9IDAsIHggPSAwLCB5ID0gMFxuICAgICAgY2FzZSAwOlxuICAgICAgICByZXR1cm4gW1wiMFwiLCBcIlwiXTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQWRkIDIgYmluYXJ5IG51bWJlcnNcbiAgICogQHBhcmFtIGIxIFRoZSBmaXJzdCBiaW5hcnkgbnVtYmVyXG4gICAqIEBwYXJhbSBiMiBUaGUgc2Vjb25kIGJpbmFyeSBudW1iZXJcbiAgICogQHJldHVybnMgVGhlIHJlc3VsdCBvZiB0aGUgYWRkaXRpb24gW2JpbmFyeU51bWJlciwgY2FycnlCaXRdXG4gICAqL1xuICBwdWJsaWMgYmluYXJ5QWRkaXRpb24oYjE6IHN0cmluZywgYjI6IHN0cmluZykge1xuICAgIGxldCByZXMgPSBcIlwiO1xuICAgIGxldCBjYXJyeSA9IFwiXCI7XG4gICAgY29uc3QgW2JwMSwgYnAyXSA9IHRoaXMuYWRkTWF4UGFkZGluZyhiMSwgYjIpO1xuXG4gICAgZm9yIChsZXQgaSA9IGJwMS5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgY29uc3QgW3IsIGNdID0gdGhpcy5lbGVtZW50YXJ5QWRkaXRpb24oYnAxW2ldLCBicDJbaV0sIGNhcnJ5KTtcbiAgICAgIHJlcyA9IHIgKyByZXM7XG4gICAgICBjYXJyeSA9IGM7XG4gICAgfVxuXG4gICAgcmV0dXJuIFtyZXMsIGNhcnJ5XTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTdWJzdHJhY3QgMiBiaW5hcnkgbnVtYmVyc1xuICAgKiBAcGFyYW0gYjEgVGhlIGZpcnN0IGJpbmFyeSBudW1iZXJcbiAgICogQHBhcmFtIGIyIFRoZSBzZWNvbmQgYmluYXJ5IG51bWJlclxuICAgKiBAcmV0dXJucyBUaGUgcmVzdWx0IG9mIHRoZSBzdWJzdHJhY3Rpb24gW2JpbmFyeU51bWJlciwgY2FycnlCaXRdXG4gICAqL1xuICBwdWJsaWMgYmluYXJ5U3Vic3RyYWN0aW9uKGIxOiBzdHJpbmcsIGIyOiBzdHJpbmcpIHtcbiAgICBjb25zdCBbYnAxLCBicDJdID0gdGhpcy5hZGRNYXhQYWRkaW5nKGIxLCBiMik7XG4gICAgcmV0dXJuIHRoaXMuYmluYXJ5QWRkaXRpb24oYnAxLCB0aGlzLmMyKGJwMikucmV2ZXJzZSgpLmpvaW4oXCJcIikpO1xuICB9XG5cbiAgLyoqXG4gICAqIFBlcmZvcm0gYSAyJ3MgY29tcGxlbWVudCBvcGVyYXRpb24gd2l0aG91dCB0aGUgY2FycnlcbiAgICogQHBhcmFtIGIgVGhlIGJpbmFyeSBudW1iZXJcbiAgICogQHJldHVybnMgVGhlIDIncyBjb21wbGVtZW50IG9mIHRoZSBiaW5hcnkgbnVtYmVyIFtiaW5hcnlOdW1iZXIsIGNhcnJ5XVxuICAgKi9cbiAgcHVibGljIGMyKGI6IHN0cmluZyk6IHN0cmluZ1tdIHtcbiAgICBiID0gdGhpcy5pbnZlcnQoYik7XG4gICAgcmV0dXJuIHRoaXMuYWRkTnVtYmVyVG9CaW5hcnkoYiwgMSk7XG4gIH1cblxuICAvKipcbiAgICogTXVsdGlwbHkgMiBiaW5hcnkgbnVtYmVyc1xuICAgKiBAcGFyYW0gYjEgVGhlIGZpcnN0IGJpbmFyeSBudW1iZXJcbiAgICogQHBhcmFtIGIyIFRoZSBzZWNvbmQgYmluYXJ5IG51bWJlclxuICAgKiBAcmV0dXJucyBUaGUgcmVzdWx0IG9mIHRoZSBtdWx0aXBsaWNhdGlvblxuICAgKi9cbiAgcHVibGljIGJpbmFyeU11bHRpcGxpY2F0aW9uKGIxOiBzdHJpbmcsIGIyOiBzdHJpbmcpIHtcbiAgICBsZXQgcmVzID0gXCJcIjtcbiAgICBjb25zdCBhZGRSZXN1bHRzID0gW107XG5cbiAgICAvLyBUaGUgYmluYXJ5IG51bWJlcnMgdG8gbXVsaXRwbHlcbiAgICAvLyBicDEgPSAxMDExXG4gICAgLy8gYnAyID0gMTExMVxuICAgIGNvbnN0IFticDEsIGJwMl0gPSB0aGlzLmFkZE1heFBhZGRpbmcoYjEsIGIyKTtcblxuICAgIC8vIENhbGN1bGF0ZSB0aGUgb3BlcmFuZHNcbiAgICAvLyBhZGRSZXN1bHRzID0gW1xuICAgIC8vICAgIDAwMDAgMTAxMSxcbiAgICAvLyAgICAwMDAxIDAxMTAsXG4gICAgLy8gICAgMDAxMCAxMTAwLFxuICAgIC8vICAgIDEwMTEgMDAwMFxuICAgIC8vIF1cbiAgICBmb3IgKGxldCBpID0gYnAxLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICBsZXQgY3VycmVudFJlcyA9IFwiXCI7XG5cbiAgICAgIGZvciAobGV0IGogPSBicDEubGVuZ3RoIC0gMTsgaiA+PSAwOyBqLS0pIHtcbiAgICAgICAgY3VycmVudFJlcyA9IChOdW1iZXIoYnAxW2pdKSAqIE51bWJlcihicDJbaV0pKSArIGN1cnJlbnRSZXM7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGRlYyA9IHRoaXMuYmluYXJ5VG9EZWNpbWFsKGN1cnJlbnRSZXMpIDw8IChicDEubGVuZ3RoIC0gMSAtIGkpO1xuICAgICAgY3VycmVudFJlcyA9IHRoaXMuZGVjaW1hbFRvQmluYXJ5KGRlYyk7XG4gICAgICBhZGRSZXN1bHRzLnB1c2goY3VycmVudFJlcyk7XG4gICAgfVxuXG4gICAgLy8gQWRkIGV2ZXJ5dGhpbmdcbiAgICAvLyByZXMgPVxuICAgIC8vICAgMDAwMCAxMDExLFxuICAgIC8vICsgMDAwMSAwMTEwLFxuICAgIC8vICsgMDAxMCAxMTAwLFxuICAgIC8vICsgMTAxMSAwMDAwXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhZGRSZXN1bHRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBhZGRSZXN1bHQgPSB0aGlzLmFkZFBhZGRpbmcoYWRkUmVzdWx0c1thZGRSZXN1bHRzLmxlbmd0aCAtIDFdLmxlbmd0aCwgYWRkUmVzdWx0c1tpXSk7XG4gICAgICBjb25zdCBbciwgY10gPSB0aGlzLmJpbmFyeUFkZGl0aW9uKHJlcywgYWRkUmVzdWx0KTtcbiAgICAgIHJlcyA9IGMgKyByO1xuICAgIH1cblxuICAgIC8vIHJlcyA9IDEwMTAwMTAxXG4gICAgcmV0dXJuIHJlcztcbiAgfVxufVxuIiwiaW1wb3J0IHsgQmluYXJ5SGVscGVyIH0gZnJvbSBcIi4vQmluYXJ5SGVscGVyXCI7XG5cbi8qKlxuICogRW5jb2RlIGEgZmxvYXRpbmcgbnVtYmVyIHdpdGggYSBjaG9vc2VuIGJpdCBzaXplIGFuZCBJRUVFIDc1NFxuICovXG5leHBvcnQgY2xhc3MgQmluYXJ5RmxvYXQge1xuICBwcml2YXRlIF9iaXRzU2l6ZSA9IDMyO1xuICBwcml2YXRlIF9udW1iZXIgPSAwO1xuICBwcml2YXRlIF9iaW5hcnlTaWduOiBcIjFcIiB8IFwiMFwiID0gXCIwXCI7XG4gIHByaXZhdGUgX2JpbmFyeU1hbnRpc3NhID0gXCJcIjtcbiAgcHJpdmF0ZSBfb3ZlcmZsb3cgPSBmYWxzZTtcbiAgcHJpdmF0ZSBfbWFudGlzc2FEb3RQb3NpdGlvbiA9IDA7XG4gIHByaXZhdGUgX2JpbmFyeUV4cG9uZW50ID0gXCJcIjtcbiAgcHJpdmF0ZSBfYmlhcyA9IDA7XG4gIHByaXZhdGUgX2JoID0gbmV3IEJpbmFyeUhlbHBlcigpO1xuXG4gIGNvbnN0cnVjdG9yKG51bWJlck9yQmluYXJ5OiBzdHJpbmcpO1xuICBjb25zdHJ1Y3RvcihudW1iZXJPckJpbmFyeTogbnVtYmVyLCBiaXRzU2l6ZTogbnVtYmVyKTtcbiAgY29uc3RydWN0b3IobnVtYmVyT3JCaW5hcnk6IG51bWJlciB8IHN0cmluZywgYml0c1NpemU/OiBudW1iZXIpIHtcbiAgICBpZiAodHlwZW9mIG51bWJlck9yQmluYXJ5ID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAvLyBSZW1vdmUgdGhlIHNwYWNlcyBpbiB0aGUgc3RyaW5nXG4gICAgICBudW1iZXJPckJpbmFyeSA9IG51bWJlck9yQmluYXJ5LnRyaW0oKTtcbiAgICAgIG51bWJlck9yQmluYXJ5ID0gbnVtYmVyT3JCaW5hcnkucmVwbGFjZSgvXFxzL2csIFwiXCIpO1xuICAgICAgdGhpcy5iaXRzU2l6ZSA9IG51bWJlck9yQmluYXJ5Lmxlbmd0aDtcbiAgICAgIHRoaXMubnVtYmVyID0gMTtcblxuICAgICAgLy8gU2xpY2UgdGhlIHN0cmluZyB0byBhc3NpZ24gdGhlIGJpbmFyeSBudW1iZXIgdG8gdGhlIGNvcnJlY3QgcGFydCBvZiB0aGUgYmluYXJ5IHJlcHJlc2VudGF0aW9uIG9mIHRoZSBmbG9hdFxuICAgICAgdGhpcy5iaW5hcnlTaWduID0gbnVtYmVyT3JCaW5hcnlbMF0gYXMgXCIwXCIgfCBcIjFcIjtcbiAgICAgIHRoaXMuYmluYXJ5RXhwb25lbnQgPSBudW1iZXJPckJpbmFyeS5zbGljZSgxLCB0aGlzLmV4cG9uZW50Qml0c1NpemUgKyAxKTtcbiAgICAgIHRoaXMuYmluYXJ5TWFudGlzc2EgPSBudW1iZXJPckJpbmFyeS5zbGljZSh0aGlzLmV4cG9uZW50Qml0c1NpemUgKyAxLCB0aGlzLmJpdHNTaXplKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5iaXRzU2l6ZSA9IGJpdHNTaXplO1xuICAgICAgdGhpcy5udW1iZXIgPSBudW1iZXJPckJpbmFyeTtcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgZ2V0SW5maW5pdHkoYml0c1NpemU6IG51bWJlcikge1xuICAgIHJldHVybiBuZXcgQmluYXJ5RmxvYXQoSW5maW5pdHksIGJpdHNTaXplKTtcbiAgfVxuXG4gIHN0YXRpYyBnZXROYU4oYml0c1NpemU6IG51bWJlcikge1xuICAgIHJldHVybiBuZXcgQmluYXJ5RmxvYXQoTmFOLCBiaXRzU2l6ZSk7XG4gIH1cblxuICBzdGF0aWMgZ2V0WmVybyhiaXRzU2l6ZTogbnVtYmVyKSB7XG4gICAgcmV0dXJuIG5ldyBCaW5hcnlGbG9hdCgwLCBiaXRzU2l6ZSk7XG4gIH1cblxuICAvKipcbiAgICogVGhlIGZsb2F0IG51bWJlciB0byBjb2RlZCB3aXRoIElFRUUgNzU0XG4gICAqL1xuICBnZXQgbnVtYmVyKCkge1xuICAgIHJldHVybiB0aGlzLl9udW1iZXI7XG4gIH1cblxuICBzZXQgbnVtYmVyKHZhbHVlOiBudW1iZXIpIHtcbiAgICB0aGlzLl9udW1iZXIgPSB2YWx1ZTtcblxuICAgIHRoaXMuY2FsY3VsYXRlQmluYXJ5U2lnbigpO1xuICAgIHRoaXMuY2FsY3VsYXRlQmlhcygpO1xuICAgIHRoaXMuY2FsY3VsYXRlQmluYXJ5TWFudGlzc2EoKTtcbiAgICB0aGlzLmNhbGN1bGF0ZUJpbmFyeUV4cG9uZW50KCk7XG4gIH1cblxuICAvKipcbiAgICogVGhlIGJpdCBzaXplIHRvIGNvZGUgdGhlIG51bWJlclxuICAgKi9cbiAgZ2V0IGJpdHNTaXplKCkge1xuICAgIHJldHVybiB0aGlzLl9iaXRzU2l6ZTtcbiAgfVxuXG4gIHNldCBiaXRzU2l6ZSh2YWx1ZTogbnVtYmVyKSB7XG4gICAgdGhpcy5fYml0c1NpemUgPSB2YWx1ZTtcblxuICAgIGlmICh2YWx1ZSA+IDgwKSB7XG4gICAgICB0aGlzLl9iaXRzU2l6ZSA9IDgwO1xuICAgIH1cblxuICAgIGlmICh2YWx1ZSA8IDgpIHtcbiAgICAgIHRoaXMuX2JpdHNTaXplID0gODtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBtYW50aXNzYSBiaXRzIHNpemVcbiAgICovXG4gIGdldCBtYW50aXNzYUJpdHNTaXplKCkge1xuICAgIGlmICh0aGlzLmJpdHNTaXplIDwgOCkge1xuICAgICAgcmV0dXJuIDA7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuYml0c1NpemUgLSB0aGlzLmV4cG9uZW50Qml0c1NpemUgLSAxO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgZXhwb25lbnQgYml0cyBzaXplIHdpdGg6XG4gICAqIC0gVGhlIElFRUUgNzU0IDIwMTkgZm9ybXVsYSBpZiB0aGUgYml0cyBzaXplIGlzIGdyZWF0ZXIgb3IgZXF1YWwgdG8gMTI4XG4gICAqIC0gQSBjdXN0b20gZm9ybXVsYSBpZiB0aGUgYml0IHNpemUgaXMgbGVzcyB0aGFuIDEyOCB0aGF0IG1hdGNoZXMgdGhlIElFRUUgc3RhbmRhcmRcbiAgICogXG4gICAqIFZpc3VhbGl6ZSB0aGUgZnVuY3Rpb24gb24gZ2VvZ2VicmE6XG4gICAqIGh0dHBzOi8vd3d3Lmdlb2dlYnJhLm9yZy9jYWxjdWxhdG9yL2NlcnJrZGZ2XG4gICAqL1xuICBnZXQgZXhwb25lbnRCaXRzU2l6ZSgpIHtcbiAgICBpZiAodGhpcy5iaXRzU2l6ZSA8IDgpIHtcbiAgICAgIHJldHVybiAwO1xuICAgIH1cblxuICAgIC8vIElFRUUgNzU0IDIwMTkgZm9ybXVsYSA+PSAxMjhcbiAgICBpZiAodGhpcy5iaXRzU2l6ZSA+PSAxMjgpIHtcbiAgICAgIHJldHVybiBNYXRoLnJvdW5kKDQgKiBNYXRoLmxvZzIodGhpcy5iaXRzU2l6ZSkpIC0gMTM7XG4gICAgfVxuXG4gICAgLy8gQSBmb3JtdWxhIHRoYXQgbWF0Y2hlcyB0aGUgdmFsdWVzIGZvciA8IDEyOFxuICAgIC8vIHJlZjogaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9hLzYyNjMyMjYwXG4gICAgcmV0dXJuIE1hdGgucm91bmQoKE1hdGgubG9nMih0aGlzLmJpdHNTaXplKSAtIDEpICoqICgzIC8gMikpO1xuICB9XG5cbiAgZ2V0IHBvc2l0aXZlTnVtYmVyKCkge1xuICAgIHJldHVybiBNYXRoLmFicyh0aGlzLm51bWJlcik7XG4gIH1cblxuICAvKipcbiAgICogQ2FsY3VsYXRlIHRoZSBwb3NpdGlvbiBvZiB0aGUgZG90IGluIHRoZSBtYW50aXNzYVxuICAgKiAgICAgICAgICAgIGZsb2F0IHBvc2l0aW9uXG4gICAqICAgICAgICAgICAgICAgICAgfFxuICAgKiAgICAgICAgICAgICAgICAgIHZcbiAgICogbWFudGlzc2EoMTkuNTkzNzUpID0+IFwiMDAxMS4xMDAxMTAwMDAwMDAwMDAwMDAwXCJcbiAgICovXG4gIGdldCBtYW50aXNzYURvdFBvc2l0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLl9tYW50aXNzYURvdFBvc2l0aW9uO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgZXhwb25lbnQgb2YgdGhlIG51bWJlciBpbiBiaW5hcnkgd2l0aCB0aGUgYmlhc1xuICAgKiBtYW50aXNzYSgxOS41OTM3NSkgPT4gXCIxMDAwMDAxMFwiXG4gICAqL1xuICBnZXQgYmluYXJ5RXhwb25lbnQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2JpbmFyeUV4cG9uZW50O1xuICB9XG5cbiAgc2V0IGJpbmFyeUV4cG9uZW50KHZhbHVlOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9iaW5hcnlFeHBvbmVudCA9IHZhbHVlO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybiB0aGUgYmlhcyBvZiB0aGUgbnVtYmVyIGJhc2VkIG9uIHRoZSBleHBvbmVudCBiaXQgc2l6ZVxuICAgKiBiID0gMiBeIChleHBvbmVudEJpdHNTaXplIC0gMSkgLSAxXG4gICAqL1xuICBnZXQgYmlhcygpIHtcbiAgICByZXR1cm4gdGhpcy5fYmlhcztcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIGZ1bGwgbWFudGlzc2Egb2YgdGhlIG51bWJlclxuICAgKi9cbiAgZ2V0IGJpbmFyeU1hbnRpc3NhKCkge1xuICAgIHJldHVybiB0aGlzLl9iaW5hcnlNYW50aXNzYTtcbiAgfVxuXG4gIHNldCBiaW5hcnlNYW50aXNzYSh2YWx1ZTogc3RyaW5nKSB7XG4gICAgdGhpcy5fYmluYXJ5TWFudGlzc2EgPSB2YWx1ZTtcbiAgICB0aGlzLl9vdmVyZmxvdyA9IHZhbHVlLmxlbmd0aCA+IHRoaXMubWFudGlzc2FCaXRzU2l6ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIGZ1bGwgbnVtYmVyIGNvZGVkIGluIGJpbmFyeSB3aXRoIElFRUUgNzU0XG4gICAqL1xuICBnZXQgYmluYXJ5RmxvYXRpbmdOdW1iZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMuYmluYXJ5U2lnbiArIHRoaXMuYmluYXJ5RXhwb25lbnQgKyB0aGlzLmJpbmFyeU1hbnRpc3NhO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoZSBzaWduIGluIGl0J3MgZGVjaW1hbCBmb3JtXG4gICAqL1xuICBnZXQgY29tcHV0ZWRTaWduKCkge1xuICAgIHJldHVybiB0aGlzLmJpbmFyeVNpZ24gPT09IFwiMVwiID8gLTEgOiAxO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoZSBleHBvbmVudCBpbiBpdCdzIGRlY2ltYWwgZm9ybVxuICAgKi9cbiAgZ2V0IGNvbXB1dGVkRXhwb25lbnQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2JoLmJpbmFyeVRvRGVjaW1hbCh0aGlzLmJpbmFyeUV4cG9uZW50KSAtIHRoaXMuYmlhcztcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgbWFudGlzc2EgaW4gaXQncyBkZWNpbWFsIGZvcm1cbiAgICovXG4gIGdldCBjb21wdXRlZE1hbnRpc3NhKCkge1xuICAgIHJldHVybiB0aGlzLl9iaC5iaW5hcnlUb0RlY2ltYWwoXCIxXCIgKyB0aGlzLmJpbmFyeU1hbnRpc3NhKSAvIDIgKiogdGhpcy5tYW50aXNzYUJpdHNTaXplO1xuICB9XG5cbiAgZ2V0IGlzTmFOKCkge1xuICAgIGNvbnN0IGlzTmFOQmluYXJ5ID0gKFxuICAgICAgdGhpcy5iaW5hcnlFeHBvbmVudC5pbmRleE9mKFwiMFwiKSA9PT0gLTEgJiZcbiAgICAgIHRoaXMuYmluYXJ5TWFudGlzc2EuaW5kZXhPZihcIjBcIikgPT09IC0xICYmXG4gICAgICB0aGlzLmJpbmFyeVNpZ24gPT09IFwiMFwiXG4gICAgKTtcblxuICAgIHJldHVybiBOdW1iZXIuaXNOYU4odGhpcy5udW1iZXIpIHx8IGlzTmFOQmluYXJ5O1xuICB9XG5cbiAgZ2V0IGlzSW5maW5pdHkoKSB7XG4gICAgY29uc3QgaXNJbmZpbml0eUJpbmFyeSA9IChcbiAgICAgIHRoaXMuYmluYXJ5RXhwb25lbnQuaW5kZXhPZihcIjBcIikgPT09IC0xICYmXG4gICAgICB0aGlzLmJpbmFyeU1hbnRpc3NhLmluZGV4T2YoXCIxXCIpID09PSAtMSAmJlxuICAgICAgdGhpcy5iaW5hcnlTaWduID09PSBcIjBcIlxuICAgICk7XG5cbiAgICByZXR1cm4gdGhpcy5udW1iZXIgPT09IEluZmluaXR5IHx8IGlzSW5maW5pdHlCaW5hcnk7XG4gIH1cblxuICBnZXQgaXNaZXJvKCkge1xuICAgIGNvbnN0IGlzWmVyb0JpbmFyeSA9IChcbiAgICAgIHRoaXMuYmluYXJ5RXhwb25lbnQuaW5kZXhPZihcIjFcIikgPT09IC0xICYmXG4gICAgICB0aGlzLmJpbmFyeU1hbnRpc3NhLmluZGV4T2YoXCIxXCIpID09PSAtMSAmJlxuICAgICAgdGhpcy5iaW5hcnlTaWduID09PSBcIjBcIlxuICAgICk7XG5cbiAgICByZXR1cm4gdGhpcy5udW1iZXIgPT09IDAgfHwgaXNaZXJvQmluYXJ5O1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgYWJzb2x1dGUgdmFsdWUgb2YgdGhlIG51bWJlciBpbiBiaW5hcnlcbiAgICovXG4gIGdldCBiaW5hcnlBYnMoKSB7XG4gICAgcmV0dXJuIFwiMFwiICsgdGhpcy5iaW5hcnlFeHBvbmVudCArIHRoaXMuYmluYXJ5TWFudGlzc2E7XG4gIH1cblxuICAvKipcbiAgICogVGhlIG51bWJlciB0aGF0IGlzIGNvZGVkIGluIG1lbW9yeVxuICAgKi9cbiAgZ2V0IGNvbXB1dGVkTnVtYmVyKCkge1xuICAgIGlmICh0aGlzLmlzWmVybykge1xuICAgICAgcmV0dXJuIDA7XG4gICAgfSBlbHNlIGlmICh0aGlzLmlzTmFOKSB7XG4gICAgICByZXR1cm4gTmFOO1xuICAgIH0gZWxzZSBpZiAodGhpcy5pc0luZmluaXR5KSB7XG4gICAgICByZXR1cm4gSW5maW5pdHk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuY29tcHV0ZWRTaWduICogMiAqKiB0aGlzLmNvbXB1dGVkRXhwb25lbnQgKiB0aGlzLmNvbXB1dGVkTWFudGlzc2E7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBtYXJnaW4gb2YgZXJyb3JcbiAgICovXG4gIGdldCBlcnJvcigpIHsgICAgXG4gICAgaWYgKE51bWJlci5pc05hTih0aGlzLm51bWJlcikgfHwgdGhpcy5udW1iZXIgPT09IEluZmluaXR5IHx8IHRoaXMubnVtYmVyID09PSAwKSB7XG4gICAgICByZXR1cm4gMDtcbiAgICB9XG5cbiAgICByZXR1cm4gTWF0aC5hYnModGhpcy5udW1iZXIgLSB0aGlzLmNvbXB1dGVkTnVtYmVyKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gdGhlIGJpbmFyeSByZXByZXNlbnRhdGlvbiBvZiB0aGUgc2lnblxuICAgKiAwIGlmIG51bWJlciA+PSAwXG4gICAqIDEgaWYgbnVtYmVyIDwgMFxuICAgKi9cbiAgZ2V0IGJpbmFyeVNpZ24oKTogXCIwXCIgfCBcIjFcIiB7XG4gICAgcmV0dXJuIHRoaXMuX2JpbmFyeVNpZ247XG4gIH1cblxuICBzZXQgYmluYXJ5U2lnbih2YWx1ZTogXCIwXCIgfCBcIjFcIikge1xuICAgIHRoaXMuX2JpbmFyeVNpZ24gPSB2YWx1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUcnVlIGlmIHRoZSBudW1iZXIgY2Fubm90IGJlIGVuY29kZWQgaW4gPGJpdHNTaXplPiBiaXRzXG4gICAqL1xuICBnZXQgb3ZlcmZsb3coKSB7XG4gICAgcmV0dXJuIHRoaXMuX292ZXJmbG93O1xuICB9XG5cbiAgLyoqXG4gICAqIERldGVybWluZSB0aGUgYmluYXJ5IHNpZ24gb2YgdGhlIG51bWJlclxuICAgKi9cbiAgcHJpdmF0ZSBjYWxjdWxhdGVCaW5hcnlTaWduKCkge1xuICAgIHRoaXMuX2JpbmFyeVNpZ24gPSB0aGlzLm51bWJlciA8IDAgPyBcIjFcIiA6IFwiMFwiO1xuICB9XG5cbiAgLyoqXG4gICAqIENhbGN1bGF0ZSB0aGUgZXhwb25lbnQgYmlhcyBiYXNlZCBvbiB0aGUgZXhwb25lbnQgYml0IHNpemVcbiAgICogYiA9IDIgXiAoZXhwb25lbnRCaXRzU2l6ZSAtIDEpIC0gMTtcbiAgICovXG4gIHByaXZhdGUgY2FsY3VsYXRlQmlhcygpIHtcbiAgICB0aGlzLl9iaWFzID0gMiAqKiAodGhpcy5leHBvbmVudEJpdHNTaXplIC0gMSkgLSAxO1xuICB9XG5cbiAgLyoqXG4gICAqIERldGVybWluZSB0aGUgYmluYXJ5IG1hbnRpc3NhIGFuZCBkZXRlcm1pbmUgdGhlIGRvdCBwb3NpdGlvbiBpbiB0aGUgbWFudGlzc2FcbiAgICovXG4gIHByaXZhdGUgY2FsY3VsYXRlQmluYXJ5TWFudGlzc2EoKSB7XG4gICAgaWYgKE51bWJlci5pc05hTih0aGlzLm51bWJlcikpIHtcbiAgICAgIHRoaXMuX21hbnRpc3NhRG90UG9zaXRpb24gPSAwO1xuICAgICAgdGhpcy5fYmluYXJ5TWFudGlzc2EgPSBcIlwiLnBhZEVuZCh0aGlzLm1hbnRpc3NhQml0c1NpemUsIFwiMVwiKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBHZXQgdGhlIGludGVnZXIgcGFydFxuICAgIGNvbnN0IGludGVnZXJQYXJ0ID0gTWF0aC50cnVuYyh0aGlzLnBvc2l0aXZlTnVtYmVyKTtcblxuICAgIC8vIEdldCB0aGUgZGVjaW1hbHMgb2YgdGhlIG51bWJlcjogZGVjaW1hbHMgPSAxOS41OTM3NSAtIDE5ID0gMC41OTM3NVxuICAgIGxldCBkZWNpbWFsc1BhcnQgPSB0aGlzLnBvc2l0aXZlTnVtYmVyIC0gTWF0aC50cnVuYyh0aGlzLnBvc2l0aXZlTnVtYmVyKTtcblxuICAgIGNvbnN0IGJpbmFyeUludGVnZXJQYXJ0ID0gdGhpcy5fYmguZGVjaW1hbFRvQmluYXJ5KGludGVnZXJQYXJ0KTtcblxuICAgIC8vIEdldCB0aGUgbnVtYmVyIG9mIGJpdHMgZGVkaWNhdGVkIHRvIHN0b3JlIHRoZSBkZWNpbWFscyBpbiB0aGUgbWFudGlzc2FcbiAgICBjb25zdCBkZWNpbWFsc0JpdHNTaXplID0gdGhpcy5tYW50aXNzYUJpdHNTaXplIC0gYmluYXJ5SW50ZWdlclBhcnQubGVuZ3RoIC0gMTtcbiAgICBcbiAgICBsZXQgYmluYXJ5RGVjaW1hbHNQYXJ0ID0gXCJcIjtcbiAgICAvLyAwLjU5Mzc1ICogMiA9IDEuMTg3NSAgPT4gMVxuICAgIC8vIDAuMTg3NSAgKiAyID0gMC4zNzUgICA9PiAwXG4gICAgLy8gMC4zNzUgICAqIDIgPSAwLjc1ICAgID0+IDBcbiAgICAvLyAwLjc1ICAgICogMiA9IDEuNSAgICAgPT4gMVxuICAgIC8vIDAuNSAgICAgKiAyID0gMSAgICAgICA9PiAxXG4gICAgZm9yKGxldCBpID0gMDsgaSA8IGRlY2ltYWxzQml0c1NpemU7IGkrKykge1xuICAgICAgZGVjaW1hbHNQYXJ0ICo9IDI7XG5cbiAgICAgIGlmIChkZWNpbWFsc1BhcnQgPj0gMSkge1xuICAgICAgICBkZWNpbWFsc1BhcnQgLT0gMTtcbiAgICAgICAgYmluYXJ5RGVjaW1hbHNQYXJ0ICs9IFwiMVwiO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYmluYXJ5RGVjaW1hbHNQYXJ0ICs9IFwiMFwiO1xuICAgICAgfVxuICAgIH1cblxuICAgIGxldCBiaW5hcnlNYW50aXNzYSA9IGJpbmFyeUludGVnZXJQYXJ0ICsgYmluYXJ5RGVjaW1hbHNQYXJ0O1xuXG4gICAgLy8gR2V0IHRoZSBwb3NpdGlvbiBvZiB0aGUgZmlyc3QgYml0IGF0IDEsIGZvciBvbmx5IGRlY2ltYWxzIG51bWJlclxuICAgIGxldCBtYW50aXNzYURvdFBvc2l0aW9uID0gLWJpbmFyeU1hbnRpc3NhLmluZGV4T2YoXCIxXCIpO1xuXG4gICAgLy8gUmVtb3ZlIGFsbCB0aGUgbGVhZGluZyBiaXQgYXQgMCBmcm9tIHRoZSBtYW50aXNzYVxuICAgIGJpbmFyeU1hbnRpc3NhID0gdGhpcy5fYmguY2xlYW4oYmluYXJ5TWFudGlzc2EpO1xuXG4gICAgLy8gSWYgdGhlIHBvc2l0aW9uIG9mIHRoZSBmaXJzdCBiaXQgYXQgMSBpcyAwXG4gICAgLy8gdGhlbiB0aGUgZG90IHBvc2l0aW9uIGlzIGVxdWFscyB0byB0aGUgbGVuZ3RoIG9mIHRoZSBiaW5hcnkgaW50ZWdlciBwYXJ0IG9mIHRoZSBtYW50aXNzYVxuICAgIGlmIChtYW50aXNzYURvdFBvc2l0aW9uID09PSAwKSB7XG4gICAgICBtYW50aXNzYURvdFBvc2l0aW9uID0gYmluYXJ5SW50ZWdlclBhcnQubGVuZ3RoIC0gMTtcbiAgICB9XG5cbiAgICAvLyBIaWRlIHRoZSBmaXJzdCBiaXQgYXQgMVxuICAgIGJpbmFyeU1hbnRpc3NhID0gYmluYXJ5TWFudGlzc2Euc3Vic3RyaW5nKDEpO1xuXG4gICAgLy8gTWFrZSBzdXJlIHRoYXQgdGhlIG1hbnRpc3NhIG1hdGNoZXMgdGhlIGNvcnJlY3QgbGVuZ3RoICgyMyBmb3IgMzIgYml0cyBmb3IgZXhhbXBsZSlcbiAgICBiaW5hcnlNYW50aXNzYSA9IGJpbmFyeU1hbnRpc3NhLnBhZEVuZCh0aGlzLm1hbnRpc3NhQml0c1NpemUsIFwiMFwiKTtcblxuICAgIHRoaXMuYmluYXJ5TWFudGlzc2EgPSBiaW5hcnlNYW50aXNzYTtcbiAgICB0aGlzLl9tYW50aXNzYURvdFBvc2l0aW9uID0gbWFudGlzc2FEb3RQb3NpdGlvbjtcbiAgfVxuXG4gIC8qKlxuICAgKiBDYWxjdWxhdGUgdGhlIGV4cG9uZW50IGluIGJpbmFyeVxuICAgKiBlID0gYmluYXJ5KG1hbnRpc3NhRmxvYXRQb3NpdGlvbiArIGJpYXMpXG4gICAqL1xuICBwcml2YXRlIGNhbGN1bGF0ZUJpbmFyeUV4cG9uZW50KCkge1xuICAgIC8vIElmIHRoZSBudW1iZXIgaXMgTmFOIG9yIEluZmluaXR5IHRoZW4gYWxsIHRoZSBiaXRzIG9mIHRoZSBleHBvbmVudCBhcmUgZXF1YWxzIHRvIDFcbiAgICBpZiAoTnVtYmVyLmlzTmFOKHRoaXMubnVtYmVyKSB8fCB0aGlzLm51bWJlciA9PT0gSW5maW5pdHkpIHtcbiAgICAgIHRoaXMuX2JpbmFyeUV4cG9uZW50ID0gXCJcIi5wYWRFbmQodGhpcy5leHBvbmVudEJpdHNTaXplLCBcIjFcIik7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbGV0IGV4cG9uZW50ID0gdGhpcy5tYW50aXNzYURvdFBvc2l0aW9uICsgdGhpcy5iaWFzO1xuXG4gICAgLy8gSWYgdGhlIG51bWJlciBpcyAwIHRoZW4gYWxsIHRoZSBiaXRzIG9mIHRoZSBleHBvbmVudCBhcmUgZXF1YWxzIHRvIDBcbiAgICBpZiAodGhpcy5udW1iZXIgPT09IDApIHtcbiAgICAgIGV4cG9uZW50ID0gMDtcbiAgICB9XG5cbiAgICAvLyBDb252ZXJ0IHRoZSBleHBvbmVudCB0byBiaW5hcnkgYW5kIGFkZCBsZWFkaW5nIDAgdG8gbWF0Y2ggdGhlIGV4cG9uZW50IGJpdHMgc2l6ZVxuICAgIHRoaXMuX2JpbmFyeUV4cG9uZW50ID0gdGhpcy5fYmguZGVjaW1hbFRvQmluYXJ5KGV4cG9uZW50KS5wYWRTdGFydCh0aGlzLmV4cG9uZW50Qml0c1NpemUsIFwiMFwiKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGQgdHdvIGJpbmFyeSBmbG9hdCBudW1iZXJcbiAgICogQHBhcmFtIGJmMiBUaGUgYmluYXJ5IGZsb2F0IG51bWJlciB0byBhZGRcbiAgICogQHJldHVybnMgVGhlIHJlc3VsdCBvZiB0aGUgYWRkaXRpb25cbiAgICovXG4gIGFkZChiZjI6IEJpbmFyeUZsb2F0KSB7XG4gICAgY29uc3QgYmZSZXMgPSBuZXcgQmluYXJ5RmxvYXQoMSwgdGhpcy5iaXRzU2l6ZSk7XG5cbiAgICAvLyBTcGVjaWFsIGNhc2VzXG4gICAgaWYgKHRoaXMuaXNOYU4gfHwgYmYyLmlzTmFOKSB7XG4gICAgICByZXR1cm4gQmluYXJ5RmxvYXQuZ2V0TmFOKHRoaXMuYml0c1NpemUpO1xuICAgIH1cbiAgICBpZiAodGhpcy5pc0luZmluaXR5IHx8IGJmMi5pc0luZmluaXR5KSB7XG4gICAgICByZXR1cm4gQmluYXJ5RmxvYXQuZ2V0SW5maW5pdHkodGhpcy5iaXRzU2l6ZSk7XG4gICAgfVxuICAgIGlmICh0aGlzLmJpbmFyeUFicyA9PT0gYmYyLmJpbmFyeUFicyAmJiB0aGlzLmJpbmFyeVNpZ24gIT09IGJmMi5iaW5hcnlTaWduKSB7XG4gICAgICByZXR1cm4gQmluYXJ5RmxvYXQuZ2V0WmVybyh0aGlzLmJpdHNTaXplKTtcbiAgICB9XG5cbiAgICAvLyBTdGVwIDE6IERldGVybWluZSB0aGUgbG93ZXN0IGV4cG9uZW50IGJldHdlZW4gdGhpcyBhbmQgdGhlIHNlY29uZCBudW1iZXJcbiAgICBsZXQgYmZNaW5CaW5hcnlFeHBvbmVudDogQmluYXJ5RmxvYXQgPSB0aGlzO1xuICAgIGxldCBiZk1heEJpbmFyeUV4cG9uZW50OiBCaW5hcnlGbG9hdCA9IGJmMjtcbiAgICBpZiAodGhpcy5fYmguYmluYXJ5VG9EZWNpbWFsKGJmMi5iaW5hcnlFeHBvbmVudCkgPCB0aGlzLl9iaC5iaW5hcnlUb0RlY2ltYWwoYmZNaW5CaW5hcnlFeHBvbmVudC5iaW5hcnlFeHBvbmVudCkpIHtcbiAgICAgIGJmTWluQmluYXJ5RXhwb25lbnQgPSBiZjI7XG4gICAgICBiZk1heEJpbmFyeUV4cG9uZW50ID0gdGhpcztcbiAgICB9XG4gICAgLy8gQ29weSB0aGUgbnVtYmVyLCBkbyBub3Qgc2V0IGJ5IHJlZmVyZW5jZVxuICAgIGJmTWF4QmluYXJ5RXhwb25lbnQgPSBuZXcgQmluYXJ5RmxvYXQoYmZNYXhCaW5hcnlFeHBvbmVudC5jb21wdXRlZE51bWJlciwgdGhpcy5iaXRzU2l6ZSk7XG4gICAgYmZNaW5CaW5hcnlFeHBvbmVudCA9IG5ldyBCaW5hcnlGbG9hdChiZk1pbkJpbmFyeUV4cG9uZW50LmNvbXB1dGVkTnVtYmVyLCB0aGlzLmJpdHNTaXplKTtcblxuICAgIC8vIElmIHRoZXJlIGlzIGEgMCB0aGVuIHJldHVybiB0aGUgbm9uLXplcm8gbnVtYmVyXG4gICAgaWYgKGJmTWluQmluYXJ5RXhwb25lbnQuaXNaZXJvKSB7XG4gICAgICByZXR1cm4gYmZNYXhCaW5hcnlFeHBvbmVudDtcbiAgICB9XG5cbiAgICAvLyBBZGQgdGhlIGhpZGRlbiBiaXRcbiAgICBiZk1pbkJpbmFyeUV4cG9uZW50LmJpbmFyeU1hbnRpc3NhID0gXCIxXCIgKyBiZk1pbkJpbmFyeUV4cG9uZW50LmJpbmFyeU1hbnRpc3NhO1xuICAgIGJmTWF4QmluYXJ5RXhwb25lbnQuYmluYXJ5TWFudGlzc2EgPSBcIjFcIiArIGJmTWF4QmluYXJ5RXhwb25lbnQuYmluYXJ5TWFudGlzc2E7XG5cbiAgICAvLyBTdGVwIDI6IFNoaWZ0IHRoZSBtYW50aXNzYVxuICAgIGNvbnN0IHNoaWZ0VmFsdWUgPSBiZk1heEJpbmFyeUV4cG9uZW50LmNvbXB1dGVkRXhwb25lbnQgLSBiZk1pbkJpbmFyeUV4cG9uZW50LmNvbXB1dGVkRXhwb25lbnQ7XG4gICAgY29uc3Qgc2hpZnRlZE1pbk1hbnRpc3NhID0gdGhpcy5fYmguc2hpZnRSaWdodChiZk1pbkJpbmFyeUV4cG9uZW50LmJpbmFyeU1hbnRpc3NhLCBzaGlmdFZhbHVlKTtcbiAgICBiZk1pbkJpbmFyeUV4cG9uZW50LmJpbmFyeU1hbnRpc3NhID0gc2hpZnRlZE1pbk1hbnRpc3NhO1xuICAgIFxuICAgIC8vIFN0ZXAgMzogUHV0IHRoZSBzYW1lIGV4cG9uZW50XG4gICAgYmZSZXMuYmluYXJ5RXhwb25lbnQgPSBiZk1heEJpbmFyeUV4cG9uZW50LmJpbmFyeUV4cG9uZW50O1xuXG4gICAgLy8gU3RlcCA0OiAyJ3MgY29tcGxlbWVudCBpZiBuZWdhdGl2ZVxuICAgIGlmIChiZk1pbkJpbmFyeUV4cG9uZW50LmNvbXB1dGVkU2lnbiA9PT0gLTEpIHtcbiAgICAgIGJmTWluQmluYXJ5RXhwb25lbnQuYmluYXJ5TWFudGlzc2EgPSB0aGlzLl9iaC5jMihiZk1pbkJpbmFyeUV4cG9uZW50LmJpbmFyeU1hbnRpc3NhKS5yZXZlcnNlKCkuam9pbihcIlwiKTtcbiAgICB9XG4gICAgaWYgKGJmTWF4QmluYXJ5RXhwb25lbnQuY29tcHV0ZWRTaWduID09PSAtMSkge1xuICAgICAgYmZNYXhCaW5hcnlFeHBvbmVudC5iaW5hcnlNYW50aXNzYSA9IHRoaXMuX2JoLmMyKGJmTWF4QmluYXJ5RXhwb25lbnQuYmluYXJ5TWFudGlzc2EpLnJldmVyc2UoKS5qb2luKFwiXCIpO1xuICAgIH1cblxuICAgIC8vIFN0ZXAgNTogQWRkIHRoZSBtYW50aXNzYSBhbmQgdGhlIHNoaWZ0ZWQgb25lXG4gICAgYmZSZXMuYmluYXJ5TWFudGlzc2EgPSB0aGlzLl9iaC5iaW5hcnlBZGRpdGlvbihcbiAgICAgIGJmTWF4QmluYXJ5RXhwb25lbnQuYmluYXJ5TWFudGlzc2EsXG4gICAgICBiZk1pbkJpbmFyeUV4cG9uZW50LmJpbmFyeU1hbnRpc3NhLFxuICAgICkucmV2ZXJzZSgpLmpvaW4oXCJcIik7XG5cbiAgICAvLyBTdGVwIDY6IERldGVybWluZSB0aGUgc2lnbiBvZiB0aGUgcmVzdWx0XG4gICAgaWYgKGJmTWF4QmluYXJ5RXhwb25lbnQuY29tcHV0ZWRTaWduICE9PSBiZk1pbkJpbmFyeUV4cG9uZW50LmNvbXB1dGVkU2lnbikge1xuICAgICAgaWYgKGJmTWF4QmluYXJ5RXhwb25lbnQuY29tcHV0ZWRTaWduID09PSAtMSkge1xuICAgICAgICBiZlJlcy5iaW5hcnlTaWduID0gXCIxXCI7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gU3RlcCA3OiBOb3JtYWxpemUgdGhlIG1hbnRpc3NhXG4gICAgLy8gSGlkZSB0aGUgZmlyc3QgYml0XG4gICAgYmZSZXMuYmluYXJ5TWFudGlzc2EgPSBiZlJlcy5iaW5hcnlNYW50aXNzYS5zdWJzdHJpbmcoMSk7XG5cbiAgICAvLyBOb3JtYWxpemUgdGhlIG1hbnRpc3NhIGlmIHRoZXJlIGlzIGEgY2FycnlcbiAgICBpZiAoYmZSZXMuYmluYXJ5TWFudGlzc2EubGVuZ3RoIC0gYmZSZXMubWFudGlzc2FCaXRzU2l6ZSA9PT0gMSkge1xuICAgICAgLy8gUmVtb3ZlIHRoZSBsYXN0IGJpdFxuICAgICAgYmZSZXMuYmluYXJ5TWFudGlzc2EgPSBiZlJlcy5iaW5hcnlNYW50aXNzYS5zbGljZSgwLCAtMSk7XG5cbiAgICAgIC8vIEFkZCAxIHRvIHRoZSBleHBvbmVudFxuICAgICAgYmZSZXMuYmluYXJ5RXhwb25lbnQgPSB0aGlzLl9iaC5hZGROdW1iZXJUb0JpbmFyeShiZlJlcy5iaW5hcnlFeHBvbmVudCwgMSlbMF07XG4gICAgfVxuXG4gICAgcmV0dXJuIGJmUmVzO1xuICB9XG59XG4iLCJpbXBvcnQgeyBCaW5hcnlGbG9hdCB9IGZyb20gXCIuL2NsYXNzZXMvQmluYXJ5RmxvYXRcIjtcblxuY29uc3QgYWRkQml0U2l6ZUVsZW1lbnQgPSA8SFRNTElucHV0RWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFkZC1iaXRzLXNpemVcIik7XG5jb25zdCBhZGRJbnB1dEFFbGVtZW50ID0gPEhUTUxJbnB1dEVsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhZGQtaW5wdXQtYVwiKTtcbmNvbnN0IGFkZElucHV0QkVsZW1lbnQgPSA8SFRNTElucHV0RWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFkZC1pbnB1dC1iXCIpO1xuY29uc3QgYWRkUmVzdWx0RWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYWRkLXJlc3VsdFwiKTtcblxuZnVuY3Rpb24gb25DaGFuZ2VBZGRpdGlvbigpIHtcbiAgY29uc3QgYml0c1NpemUgPSBOdW1iZXIoYWRkQml0U2l6ZUVsZW1lbnQudmFsdWUpO1xuICBjb25zdCBpbnB1dEEgPSBOdW1iZXIoYWRkSW5wdXRBRWxlbWVudC52YWx1ZSk7XG4gIGNvbnN0IGlucHV0QiA9IE51bWJlcihhZGRJbnB1dEJFbGVtZW50LnZhbHVlKTtcbiAgICBcbiAgaWYgKGFkZEJpdFNpemVFbGVtZW50LnZhbHVlID09PSBcIlwiIHx8IGFkZElucHV0QUVsZW1lbnQudmFsdWUgPT09IFwiXCIgfHwgYWRkSW5wdXRCRWxlbWVudC52YWx1ZSA9PT0gXCJcIikge1xuICAgIGFkZFJlc3VsdEVsZW1lbnQuaW5uZXJIVE1MID0gYDxzcGFuIGNsYXNzPVwiY29sb3ItZ3JleVwiPlZldWlsbGV6IHJlbnNlaWduZXIgdG91cyBsZXMgY2hhbXBzPC9zcGFuPmA7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgaWYgKGJpdHNTaXplID4gODApIHtcbiAgICBhZGRSZXN1bHRFbGVtZW50LmlubmVySFRNTCA9IGA8c3BhbiBjbGFzcz1cImNvbG9yLXJlZFwiPkxhIHRhaWxsZSBkZXMgYml0cyBkb2l0IGF1IG1heGltdW0gw6p0cmUgODA8L3NwYW4+YDtcbiAgICByZXR1cm47XG4gIH1cblxuICBpZiAoaW5wdXRBIDwgMCB8fCBpbnB1dEIgPCAwKSB7XG4gICAgYWRkUmVzdWx0RWxlbWVudC5pbm5lckhUTUwgPSBgPHNwYW4gY2xhc3M9XCJjb2xvci1yZWRcIj5Ob3VzIG5lIHN1cHBvcnRvbnMgcXVlIGxlcyBhZGRpdGlvbnMgcG91ciBsZSBtb21lbnQ8L3NwYW4+YDtcbiAgICByZXR1cm47XG4gIH1cblxuICBjb25zdCBiZkEgPSBuZXcgQmluYXJ5RmxvYXQoaW5wdXRBLCBiaXRzU2l6ZSk7XG4gIGNvbnN0IGJmQiA9IG5ldyBCaW5hcnlGbG9hdChpbnB1dEIsIGJpdHNTaXplKTtcbiAgY29uc3QgYmZSZXMgPSBiZkEuYWRkKGJmQik7XG4gIGNvbnN0IGdldE92ZXJGbG93RXJyb3IgPSAobmI6IHN0cmluZyB8IG51bWJlcikgPT4gYDxzcGFuIGNsYXNzPVwiY29sb3ItcmVkXCI+JHtuYn0gZXN0IHRyb3AgZ3JhbmQgcG91ciDDqnRyZSBlbmNvZMOpIGVuICR7Yml0c1NpemV9IGJpdHM8L3NwYW4+YDtcblxuXG4gIGlmIChiZkEub3ZlcmZsb3cpIHtcbiAgICBhZGRSZXN1bHRFbGVtZW50LmlubmVySFRNTCA9IGdldE92ZXJGbG93RXJyb3IoYmZBLm51bWJlcik7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgaWYgKGJmQi5vdmVyZmxvdykge1xuICAgIGFkZFJlc3VsdEVsZW1lbnQuaW5uZXJIVE1MID0gZ2V0T3ZlckZsb3dFcnJvcihiZkIubnVtYmVyKTtcbiAgICByZXR1cm47XG4gIH1cblxuICBpZiAoYmZSZXMub3ZlcmZsb3cpIHtcbiAgICBhZGRSZXN1bHRFbGVtZW50LmlubmVySFRNTCA9IGdldE92ZXJGbG93RXJyb3IoXCJMZSByw6lzdWx0YXRcIik7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgYWRkUmVzdWx0RWxlbWVudC5pbm5lckhUTUwgPSBgXG4gICAgPGRpdiBjbGFzcz1cInJlc3VsdC1ncm91cCBjb2xvci1ncmV5XCI+XG4gICAgICBSw6lzdWx0YXQgXCJleGFjdFwiOlxuICAgICAgPHNwYW4gY2xhc3M9XCJtb25vXCI+JHtpbnB1dEEgKyBpbnB1dEJ9PC9zcGFuPlxuICAgIDwvZGl2PlxuXG4gICAgPGRpdiBjbGFzcz1cInJlc3VsdC1ncm91cCBtdDI1XCI+XG4gICAgICBOb21icmUgPHNwYW4gY2xhc3M9XCJtb25vXCI+MTwvc3Bhbj4gZW4gYmluYWlyZTpcbiAgICAgIDxzcGFuIGNsYXNzPVwiY29sb3ItcmVkIG1vbm9cIj4ke2JmQS5iaW5hcnlTaWdufTwvc3Bhbj5cbiAgICAgIDxzcGFuIGNsYXNzPVwiY29sb3ItYmx1ZSBtb25vXCI+JHtiZkEuYmluYXJ5RXhwb25lbnR9PC9zcGFuPlxuICAgICAgPHNwYW4gY2xhc3M9XCJjb2xvci1vcmFuZ2UgbW9ub1wiPiR7YmZBLmJpbmFyeU1hbnRpc3NhfTwvc3Bhbj5cbiAgICAgICg8c3BhbiBjbGFzcz1cIm1vbm9cIj4ke2JmQS5jb21wdXRlZE51bWJlcn08L3NwYW4+KVxuICAgIDwvZGl2PlxuXG4gICAgPGRpdiBjbGFzcz1cInJlc3VsdC1ncm91cFwiPlxuICAgICAgTm9tYnJlIDxzcGFuIGNsYXNzPVwibW9ub1wiPjI8L3NwYW4+IGVuIGJpbmFpcmU6XG4gICAgICA8c3BhbiBjbGFzcz1cImNvbG9yLXJlZCBtb25vXCI+JHtiZkIuYmluYXJ5U2lnbn08L3NwYW4+XG4gICAgICA8c3BhbiBjbGFzcz1cImNvbG9yLWJsdWUgbW9ub1wiPiR7YmZCLmJpbmFyeUV4cG9uZW50fTwvc3Bhbj5cbiAgICAgIDxzcGFuIGNsYXNzPVwiY29sb3Itb3JhbmdlIG1vbm9cIj4ke2JmQi5iaW5hcnlNYW50aXNzYX08L3NwYW4+XG4gICAgICAoPHNwYW4gY2xhc3M9XCJtb25vXCI+JHtiZkIuY29tcHV0ZWROdW1iZXJ9PC9zcGFuPilcbiAgICA8L2Rpdj5cblxuICAgIDxkaXYgY2xhc3M9XCJyZXN1bHQtZ3JvdXAgbXQyNVwiPlxuICAgICAgUsOpc3VsdGF0IGVuIGJpbmFpcmU6XG4gICAgICA8c3BhbiBjbGFzcz1cImNvbG9yLXJlZCBtb25vXCI+JHtiZlJlcy5iaW5hcnlTaWdufTwvc3Bhbj5cbiAgICAgIDxzcGFuIGNsYXNzPVwiY29sb3ItYmx1ZSBtb25vXCI+JHtiZlJlcy5iaW5hcnlFeHBvbmVudH08L3NwYW4+XG4gICAgICA8c3BhbiBjbGFzcz1cImNvbG9yLW9yYW5nZSBtb25vXCI+JHtiZlJlcy5iaW5hcnlNYW50aXNzYX08L3NwYW4+XG4gICAgPC9kaXY+XG5cbiAgICA8ZGl2IGNsYXNzPVwicmVzdWx0LWdyb3VwXCI+XG4gICAgICBSw6lzdWx0YXQgY2FsY3Vsw6k6XG4gICAgICA8c3BhbiBjbGFzcz1cIm1vbm9cIj4ke2JmUmVzLmNvbXB1dGVkTnVtYmVyfTwvc3Bhbj5cbiAgICA8L2Rpdj5cblxuICAgIDxkaXYgY2xhc3M9XCJyZXN1bHQtZ3JvdXBcIj5cbiAgICAgIE1hcmdlIGQnZXJyZXVyOlxuICAgICAgPHNwYW4gY2xhc3M9XCJtb25vXCI+JHtNYXRoLmFicyhpbnB1dEEgKyBpbnB1dEIgLSBiZlJlcy5jb21wdXRlZE51bWJlcil9PC9zcGFuPlxuICAgIDwvZGl2PlxuICBgO1xufVxuXG5hZGRCaXRTaXplRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsIG9uQ2hhbmdlQWRkaXRpb24pO1xuYWRkQml0U2l6ZUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImtleXVwXCIsIG9uQ2hhbmdlQWRkaXRpb24pO1xuYWRkSW5wdXRBRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsIG9uQ2hhbmdlQWRkaXRpb24pO1xuYWRkSW5wdXRBRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwia2V5dXBcIiwgb25DaGFuZ2VBZGRpdGlvbik7XG5hZGRJbnB1dEJFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgb25DaGFuZ2VBZGRpdGlvbik7XG5hZGRJbnB1dEJFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXl1cFwiLCBvbkNoYW5nZUFkZGl0aW9uKTtcblxub25DaGFuZ2VBZGRpdGlvbigpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9
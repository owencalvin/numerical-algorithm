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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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cyIsIndlYnBhY2s6Ly9tYXRoX3NwZS8uL3NyYy9jbGFzc2VzL0JpbmFyeUZsb2F0LnRzIiwid2VicGFjazovL21hdGhfc3BlLy4vc3JjL2xhYm8xLWFkZGl0aW9uLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBCaW5hcnlIZWxwZXIge1xuICAvKipcbiAgICogR2V0IG4gYml0IG9mIDAgb3IgMVxuICAgKiBAcGFyYW0gdmFsdWUgMSBvciAwXG4gICAqIEBwYXJhbSBuIFRoZSBudW1iZXIgb2YgYml0cyB0byByZXRyaWV2ZVxuICAgKiBAcmV0dXJucyBuIGJpdCBvZiAwIG9yIDFcbiAgICovXG4gIHB1YmxpYyBnZXROQml0KHZhbHVlOiAxIHwgMCwgbjogbnVtYmVyKTogc3RyaW5nIHtcbiAgICBsZXQgcmVzID0gXCJcIjtcbiAgICBcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG47IGkrKykge1xuICAgICAgcmVzICs9IHZhbHVlO1xuICAgIH1cblxuICAgIHJldHVybiByZXM7XG4gIH1cblxuICAvKipcbiAgICogQWRkIG4gemVyb3MgYmVmb3JlIHRoZSBiaW5hcnkgbnVtYmVyXG4gICAqIEBwYXJhbSBuIFRoZSBudW1iZXIgb2YgMCB0byBhZGQgYmVmb3JlIHRoZSBiaW5hcnkgbnVtYmVyXG4gICAqIEBwYXJhbSBiIFRoZSBiaW5hcnkgbnVtYmVyXG4gICAqIEByZXR1cm5zIFRoZSBiaW5hcnkgbnVtYmVyIHdpdGggbiB6ZXJvcyBiZWZvcmVcbiAgICovXG4gIHB1YmxpYyBhZGRQYWRkaW5nKG46IG51bWJlciwgYiA9IFwiXCIpIHtcbiAgICBjb25zdCBzaXplID0gbiAtIGIubGVuZ3RoO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaXplOyBpKyspIHtcbiAgICAgIGIgPSBcIjBcIiArIGI7XG4gICAgfVxuXG4gICAgcmV0dXJuIGI7XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlcyB0aGUgemVyb3MgYmVmb3JlIGEgYmluYXJ5IG51bWJlciAoMDAwMTAxIGJlY29tZXMgMTAxKVxuICAgKiBAcGFyYW0gYiBUaGUgYmluYXJ5IG51bWJlclxuICAgKiBAcmV0dXJucyBUaGUgcHJvZHVjZWQgYmluYXJ5IG51bWJlclxuICAgKi9cbiAgcHVibGljIGNsZWFuKGI6IHN0cmluZykge1xuICAgIGxldCByZXMgPSBiO1xuXG4gICAgZm9yKGxldCBpID0gMDsgaSA8IGIubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChiW2ldID09PSBcIjBcIikge1xuICAgICAgICByZXMgPSByZXMuc3Vic3RyaW5nKDEpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHJlcztcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAocmVzID09PSBcIlwiKSB7XG4gICAgICByZXR1cm4gXCIwXCI7XG4gICAgfVxuICB9XG5cblxuICAvKipcbiAgICogQWRkIDAgcGFkZGluZyB0byB0aGUgc21hbGxlc3QgYmluYXJ5IG51bWJlciB0byBtYXRjaCB0aGUgbG9uZ2VzdCBvbmUncyBsZW5ndGhcbiAgICogWzEwMSwgMTEwMDFdIGJlY29tZXMgWzAwMTAxLCAxMTAwMV1cbiAgICogQHBhcmFtIGIxIFRoZSBmaXJzdCBiaW5hcnkgbnVtYmVyXG4gICAqIEBwYXJhbSBiMiBUaGUgc2Vjb25kIGJpbmFyeSBudW1iZXJcbiAgICogQHJldHVybnMgW2IxLCBiMl0gd2l0aCBjb3JyZWN0IHBhZGRpbmdcbiAgICovXG4gIHB1YmxpYyBhZGRNYXhQYWRkaW5nKGIxOiBzdHJpbmcsIGIyOiBzdHJpbmcpIHtcbiAgICBpZiAoYjIubGVuZ3RoID4gYjEubGVuZ3RoKSB7XG4gICAgICBiMSA9IHRoaXMuYWRkUGFkZGluZyhiMi5sZW5ndGgsIGIxKTtcbiAgICB9IGVsc2UgaWYgKGIxLmxlbmd0aCA+IGIyLmxlbmd0aCkge1xuICAgICAgYjIgPSB0aGlzLmFkZFBhZGRpbmcoYjEubGVuZ3RoLCBiMik7XG4gICAgfVxuXG4gICAgcmV0dXJuIFtiMSwgYjJdO1xuICB9XG5cbiAgcHVibGljIGdldE1heExlbmd0aChiMTogc3RyaW5nLCBiMjogc3RyaW5nKSB7XG4gICAgaWYgKGIxLmxlbmd0aCA+IGIyLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIGIxLmxlbmd0aDtcbiAgICB9XG4gICAgcmV0dXJuIGIyLmxlbmd0aDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDb252ZXJ0IGEgbnVtYmVyIHRvIGl0J3MgYmluYXJ5IHJlcHJlc2VudGF0aW9uXG4gICAqIEBwYXJhbSBkZWNpbWFsIFRoZSBcbiAgICogQHJldHVybnMgVGhlIGJpbmFyeSByZXByZXNlbnRhdGlvbiBvZiB0aGUgZGVjaW1hbCBudW1iZXJcbiAgICovXG4gIHB1YmxpYyBkZWNpbWFsVG9CaW5hcnkoZGVjaW1hbDogbnVtYmVyKSB7XG4gICAgY29uc3Qgb3JpZ2luYWxOdW1iZXIgPSBkZWNpbWFsO1xuICAgIGxldCBiaW5hcnlOdW1iZXIgPSAoTWF0aC5hYnMoZGVjaW1hbCkgPj4+IDApLnRvU3RyaW5nKDIpO1xuXG4gICAgaWYgKG9yaWdpbmFsTnVtYmVyIDwgMCkge1xuICAgICAgYmluYXJ5TnVtYmVyID0gdGhpcy5jMihiaW5hcnlOdW1iZXIpLnJldmVyc2UoKS5qb2luKFwiXCIpO1xuICAgIH1cblxuICAgIHJldHVybiBiaW5hcnlOdW1iZXI7XG4gIH1cblxuICAvKipcbiAgICogQ29udmVydCBhIGJpbmFyeSByZXByZXNlbnRhdGlvbiBvZiBhIG51bWJlciB0byBhIGRlY2ltYWwgbnVtYmVyXG4gICAqIEBwYXJhbSBiaW5hcnkgVGhlIGJpbmFyeSByZXByZXNlbnRhdGlvbiBvZiBhIG51bWJlclxuICAgKiBAcmV0dXJucyBUaGUgaW50IHJlcHJlc2VudGF0aW9uIG9mIGEgYmluYXJ5IG51bWJlclxuICAgKi9cbiAgcHVibGljIGJpbmFyeVRvRGVjaW1hbChiaW5hcnk6IHN0cmluZykge1xuICAgIHJldHVybiBwYXJzZUludChiaW5hcnksIDIpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZCBpbnQgdG8gYSBiaW5hcnkgbnVtYmVyXG4gICAqIEBwYXJhbSBiIFRoZSBiaW5hcnkgbnVtYmVyXG4gICAqIEBwYXJhbSBuIFRoZSBpbnQgbnVtYmVyIHRvIGFkZCB0byB0aGUgYmluYXJ5IG51bWJlclxuICAgKiBAcmV0dXJucyBUaGUgcHJvZHVjZWQgcmVzdWx0XG4gICAqL1xuICBwdWJsaWMgYWRkTnVtYmVyVG9CaW5hcnkoYjogc3RyaW5nLCBuOiBudW1iZXIpOiBzdHJpbmdbXSB7XG4gICAgcmV0dXJuIHRoaXMuYmluYXJ5QWRkaXRpb24oYiwgdGhpcy5kZWNpbWFsVG9CaW5hcnkobikpO1xuICB9XG5cbiAgLyoqXG4gICAqIEludmVydCBhIGJpbmFyeSBudW1iZXJcbiAgICogQHBhcmFtIGIgVGhlIGJpbmFyeSBudW1iZXIgdG8gaW52ZXJ0XG4gICAqIEByZXR1cm5zIFRoZSBpbnZlcnQgYmluYXJ5IG51bWJlclxuICAgKi9cbiAgcHVibGljIGludmVydChiOiBzdHJpbmcpIHtcbiAgICBjb25zdCBpbml0aWFsTGVuZ3RoID0gYi5sZW5ndGg7XG4gICAgYiA9IHRoaXMuZGVjaW1hbFRvQmluYXJ5KHRoaXMuYmluYXJ5VG9EZWNpbWFsKGIpIF4gdGhpcy5iaW5hcnlUb0RlY2ltYWwodGhpcy5nZXROQml0KDEsIGIubGVuZ3RoKSkpO1xuICAgIGIgPSB0aGlzLmFkZFBhZGRpbmcoaW5pdGlhbExlbmd0aCwgYik7XG4gICAgcmV0dXJuIGI7XG4gIH1cblxuICAvKipcbiAgICogU2hpZnQgdGhlIGJpbmFyeSBudW1iZXIgdG8gdGhlIHJpZ2h0XG4gICAqIEBwYXJhbSBiIFRoZSBiaW5hcnkgbnVtYmVyXG4gICAqIEBwYXJhbSBzaGlmdFZhbHVlIFRoZSBzaGlmdCB2YWx1ZVxuICAgKiBAcmV0dXJucyBUaGUgc2hpZnRlZCBiaW5hcnkgbnVtYmVyXG4gICAqL1xuICBwdWJsaWMgc2hpZnRSaWdodChiOiBzdHJpbmcsIHNoaWZ0VmFsdWU6IG51bWJlcikge1xuICAgIC8vIFwiMDAwMDAxMDEwXCIgPj4gMiA9PiBcIjAwMDAwMDAxMFwiXG4gICAgLy8gMS4gUmVtb3ZlcyBsYXN0cyA8c2hpZnRWYWx1ZT4gYml0c1xuICAgIC8vIDIuIFBsYWNlcyA8c2hpZnRWYWx1ZT4gYml0cyBhdCAwIGJlZm9yZVxuXG4gICAgaWYgKHNoaWZ0VmFsdWUgPCAxKSB7XG4gICAgICByZXR1cm4gYjtcbiAgICB9XG5cbiAgICBsZXQgcmVzID0gYjtcbiAgICByZXMgPSByZXMuc2xpY2UoMCwgLXNoaWZ0VmFsdWUpO1xuICAgIHJlcyA9IFwiXCIucGFkU3RhcnQoc2hpZnRWYWx1ZSwgXCIwXCIpICsgcmVzO1xuXG4gICAgcmV0dXJuIHJlcztcbiAgfVxuXG4gIC8qKlxuICAgKiBTaGlmdCB0aGUgYmluYXJ5IG51bWJlciB0byB0aGUgbGVmdFxuICAgKiBAcGFyYW0gYiBUaGUgYmluYXJ5IG51bWJlclxuICAgKiBAcGFyYW0gc2hpZnRWYWx1ZSBUaGUgc2hpZnQgdmFsdWVcbiAgICogQHJldHVybnMgVGhlIHNoaWZ0ZWQgYmluYXJ5IG51bWJlclxuICAgKi9cbiAgcHVibGljIHNoaWZ0TGVmdChiOiBzdHJpbmcsIHNoaWZ0VmFsdWU6IG51bWJlcikge1xuICAgIC8vIFwiMDAwMDAxMDEwXCIgPDwgMiA9PiBcIjAwMDAwMTAxMDAwXCJcbiAgICAvLyAxLiBSZW1vdmVzIGxhc3RzIDxzaGlmdFZhbHVlPiBiaXRzXG4gICAgLy8gMi4gUGxhY2VzIDxzaGlmdFZhbHVlPiBiaXRzIGF0IDAgYmVmb3JlXG5cbiAgICBpZiAoc2hpZnRWYWx1ZSA8IDEpIHtcbiAgICAgIHJldHVybiBiO1xuICAgIH1cblxuICAgIGxldCByZXMgPSBiO1xuICAgIHJlcyA9IHJlcy5zbGljZShzaGlmdFZhbHVlKTtcbiAgICByZXMgKz0gXCJcIi5wYWRFbmQoc2hpZnRWYWx1ZSwgXCIwXCIpO1xuXG4gICAgcmV0dXJuIHJlcztcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGQgMiBiaXQgdG9nZXRoZXIgd2l0aCB0aGUgY2FycnlcbiAgICogQHBhcmFtIHggVGhlIGZpcnN0IGJpdFxuICAgKiBAcGFyYW0geSBUaGUgc2Vjb25kIGJpdFxuICAgKiBAcGFyYW0gY2FycnkgVGhlIGNhcnJ5XG4gICAqIEByZXR1cm5zIFRoZSByZXN1bHQgd2l0aCB0aGUgY2FycnkgW2JpdCwgY2FycnldXG4gICAqL1xuICBwdWJsaWMgZWxlbWVudGFyeUFkZGl0aW9uKHg6IHN0cmluZywgeTogc3RyaW5nLCBjYXJyeSA9IFwiXCIpOiBzdHJpbmdbXSB7XG4gICAgY29uc3QgcmVzID0gTnVtYmVyKHgpICsgTnVtYmVyKHkpICsgTnVtYmVyKGNhcnJ5KTtcblxuICAgIHN3aXRjaCAocmVzKSB7XG4gICAgICAvLyBjID0gMSwgeCA9IDEsIHkgPSAxXG4gICAgICBjYXNlIDM6XG4gICAgICAgIHJldHVybiBbXCIxXCIsIFwiMVwiXTtcbiAgICAgIGNhc2UgMjpcbiAgICAgICAgcmV0dXJuIFtcIjBcIiwgXCIxXCJdO1xuICAgICAgY2FzZSAxOlxuICAgICAgICByZXR1cm4gW1wiMVwiLCBcIlwiXTtcbiAgICAgIC8vIGMgPSAwLCB4ID0gMCwgeSA9IDBcbiAgICAgIGNhc2UgMDpcbiAgICAgICAgcmV0dXJuIFtcIjBcIiwgXCJcIl07XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEFkZCAyIGJpbmFyeSBudW1iZXJzXG4gICAqIEBwYXJhbSBiMSBUaGUgZmlyc3QgYmluYXJ5IG51bWJlclxuICAgKiBAcGFyYW0gYjIgVGhlIHNlY29uZCBiaW5hcnkgbnVtYmVyXG4gICAqIEByZXR1cm5zIFRoZSByZXN1bHQgb2YgdGhlIGFkZGl0aW9uIFtiaW5hcnlOdW1iZXIsIGNhcnJ5Qml0XVxuICAgKi9cbiAgcHVibGljIGJpbmFyeUFkZGl0aW9uKGIxOiBzdHJpbmcsIGIyOiBzdHJpbmcpIHtcbiAgICBsZXQgcmVzID0gXCJcIjtcbiAgICBsZXQgY2FycnkgPSBcIlwiO1xuICAgIGNvbnN0IFticDEsIGJwMl0gPSB0aGlzLmFkZE1heFBhZGRpbmcoYjEsIGIyKTtcblxuICAgIGZvciAobGV0IGkgPSBicDEubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgIGNvbnN0IFtyLCBjXSA9IHRoaXMuZWxlbWVudGFyeUFkZGl0aW9uKGJwMVtpXSwgYnAyW2ldLCBjYXJyeSk7XG4gICAgICByZXMgPSByICsgcmVzO1xuICAgICAgY2FycnkgPSBjO1xuICAgIH1cblxuICAgIHJldHVybiBbcmVzLCBjYXJyeV07XG4gIH1cblxuICAvKipcbiAgICogU3Vic3RyYWN0IDIgYmluYXJ5IG51bWJlcnNcbiAgICogQHBhcmFtIGIxIFRoZSBmaXJzdCBiaW5hcnkgbnVtYmVyXG4gICAqIEBwYXJhbSBiMiBUaGUgc2Vjb25kIGJpbmFyeSBudW1iZXJcbiAgICogQHJldHVybnMgVGhlIHJlc3VsdCBvZiB0aGUgc3Vic3RyYWN0aW9uIFtiaW5hcnlOdW1iZXIsIGNhcnJ5Qml0XVxuICAgKi9cbiAgcHVibGljIGJpbmFyeVN1YnN0cmFjdGlvbihiMTogc3RyaW5nLCBiMjogc3RyaW5nKSB7XG4gICAgY29uc3QgW2JwMSwgYnAyXSA9IHRoaXMuYWRkTWF4UGFkZGluZyhiMSwgYjIpO1xuICAgIHJldHVybiB0aGlzLmJpbmFyeUFkZGl0aW9uKGJwMSwgdGhpcy5jMihicDIpLnJldmVyc2UoKS5qb2luKFwiXCIpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQZXJmb3JtIGEgMidzIGNvbXBsZW1lbnQgb3BlcmF0aW9uIHdpdGhvdXQgdGhlIGNhcnJ5XG4gICAqIEBwYXJhbSBiIFRoZSBiaW5hcnkgbnVtYmVyXG4gICAqIEByZXR1cm5zIFRoZSAyJ3MgY29tcGxlbWVudCBvZiB0aGUgYmluYXJ5IG51bWJlciBbYmluYXJ5TnVtYmVyLCBjYXJyeV1cbiAgICovXG4gIHB1YmxpYyBjMihiOiBzdHJpbmcpOiBzdHJpbmdbXSB7XG4gICAgYiA9IHRoaXMuaW52ZXJ0KGIpO1xuICAgIHJldHVybiB0aGlzLmFkZE51bWJlclRvQmluYXJ5KGIsIDEpO1xuICB9XG5cbiAgLyoqXG4gICAqIE11bHRpcGx5IDIgYmluYXJ5IG51bWJlcnNcbiAgICogQHBhcmFtIGIxIFRoZSBmaXJzdCBiaW5hcnkgbnVtYmVyXG4gICAqIEBwYXJhbSBiMiBUaGUgc2Vjb25kIGJpbmFyeSBudW1iZXJcbiAgICogQHJldHVybnMgVGhlIHJlc3VsdCBvZiB0aGUgbXVsdGlwbGljYXRpb25cbiAgICovXG4gIHB1YmxpYyBiaW5hcnlNdWx0aXBsaWNhdGlvbihiMTogc3RyaW5nLCBiMjogc3RyaW5nKSB7XG4gICAgbGV0IHJlcyA9IFwiXCI7XG4gICAgY29uc3QgYWRkUmVzdWx0cyA9IFtdO1xuXG4gICAgLy8gVGhlIGJpbmFyeSBudW1iZXJzIHRvIG11bGl0cGx5XG4gICAgLy8gYnAxID0gMTAxMVxuICAgIC8vIGJwMiA9IDExMTFcbiAgICBjb25zdCBbYnAxLCBicDJdID0gdGhpcy5hZGRNYXhQYWRkaW5nKGIxLCBiMik7XG5cbiAgICAvLyBDYWxjdWxhdGUgdGhlIG9wZXJhbmRzXG4gICAgLy8gYWRkUmVzdWx0cyA9IFtcbiAgICAvLyAgICAwMDAwIDEwMTEsXG4gICAgLy8gICAgMDAwMSAwMTEwLFxuICAgIC8vICAgIDAwMTAgMTEwMCxcbiAgICAvLyAgICAxMDExIDAwMDBcbiAgICAvLyBdXG4gICAgZm9yIChsZXQgaSA9IGJwMS5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgbGV0IGN1cnJlbnRSZXMgPSBcIlwiO1xuXG4gICAgICBmb3IgKGxldCBqID0gYnAxLmxlbmd0aCAtIDE7IGogPj0gMDsgai0tKSB7XG4gICAgICAgIGN1cnJlbnRSZXMgPSAoTnVtYmVyKGJwMVtqXSkgKiBOdW1iZXIoYnAyW2ldKSkgKyBjdXJyZW50UmVzO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBkZWMgPSB0aGlzLmJpbmFyeVRvRGVjaW1hbChjdXJyZW50UmVzKSA8PCAoYnAxLmxlbmd0aCAtIDEgLSBpKTtcbiAgICAgIGN1cnJlbnRSZXMgPSB0aGlzLmRlY2ltYWxUb0JpbmFyeShkZWMpO1xuICAgICAgYWRkUmVzdWx0cy5wdXNoKGN1cnJlbnRSZXMpO1xuICAgIH1cblxuICAgIC8vIEFkZCBldmVyeXRoaW5nXG4gICAgLy8gcmVzID1cbiAgICAvLyAgIDAwMDAgMTAxMSxcbiAgICAvLyArIDAwMDEgMDExMCxcbiAgICAvLyArIDAwMTAgMTEwMCxcbiAgICAvLyArIDEwMTEgMDAwMFxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYWRkUmVzdWx0cy5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgYWRkUmVzdWx0ID0gdGhpcy5hZGRQYWRkaW5nKGFkZFJlc3VsdHNbYWRkUmVzdWx0cy5sZW5ndGggLSAxXS5sZW5ndGgsIGFkZFJlc3VsdHNbaV0pO1xuICAgICAgY29uc3QgW3IsIGNdID0gdGhpcy5iaW5hcnlBZGRpdGlvbihyZXMsIGFkZFJlc3VsdCk7XG4gICAgICByZXMgPSBjICsgcjtcbiAgICB9XG5cbiAgICAvLyByZXMgPSAxMDEwMDEwMVxuICAgIHJldHVybiByZXM7XG4gIH1cbn1cbiIsImltcG9ydCB7IEJpbmFyeUhlbHBlciB9IGZyb20gXCIuL0JpbmFyeUhlbHBlclwiO1xuXG4vKipcbiAqIEVuY29kZSBhIGZsb2F0aW5nIG51bWJlciB3aXRoIGEgY2hvb3NlbiBiaXQgc2l6ZSBhbmQgSUVFRSA3NTRcbiAqL1xuZXhwb3J0IGNsYXNzIEJpbmFyeUZsb2F0IHtcbiAgcHJpdmF0ZSBfYml0c1NpemUgPSAzMjtcbiAgcHJpdmF0ZSBfbnVtYmVyID0gMDtcbiAgcHJpdmF0ZSBfYmluYXJ5U2lnbjogXCIxXCIgfCBcIjBcIiA9IFwiMFwiO1xuICBwcml2YXRlIF9iaW5hcnlNYW50aXNzYSA9IFwiXCI7XG4gIHByaXZhdGUgX292ZXJmbG93ID0gZmFsc2U7XG4gIHByaXZhdGUgX21hbnRpc3NhRG90UG9zaXRpb24gPSAwO1xuICBwcml2YXRlIF9iaW5hcnlFeHBvbmVudCA9IFwiXCI7XG4gIHByaXZhdGUgX2JpYXMgPSAwO1xuICBwcml2YXRlIF9iaCA9IG5ldyBCaW5hcnlIZWxwZXIoKTtcblxuICBjb25zdHJ1Y3RvcihudW1iZXJPckJpbmFyeTogc3RyaW5nKTtcbiAgY29uc3RydWN0b3IobnVtYmVyT3JCaW5hcnk6IG51bWJlciwgYml0c1NpemU6IG51bWJlcik7XG4gIGNvbnN0cnVjdG9yKG51bWJlck9yQmluYXJ5OiBudW1iZXIgfCBzdHJpbmcsIGJpdHNTaXplPzogbnVtYmVyKSB7XG4gICAgaWYgKHR5cGVvZiBudW1iZXJPckJpbmFyeSA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgLy8gUmVtb3ZlIHRoZSBzcGFjZXMgaW4gdGhlIHN0cmluZ1xuICAgICAgbnVtYmVyT3JCaW5hcnkgPSBudW1iZXJPckJpbmFyeS50cmltKCk7XG4gICAgICBudW1iZXJPckJpbmFyeSA9IG51bWJlck9yQmluYXJ5LnJlcGxhY2UoL1xccy9nLCBcIlwiKTtcbiAgICAgIHRoaXMuYml0c1NpemUgPSBudW1iZXJPckJpbmFyeS5sZW5ndGg7XG4gICAgICB0aGlzLm51bWJlciA9IDE7XG5cbiAgICAgIC8vIFNsaWNlIHRoZSBzdHJpbmcgdG8gYXNzaWduIHRoZSBiaW5hcnkgbnVtYmVyIHRvIHRoZSBjb3JyZWN0IHBhcnQgb2YgdGhlIGJpbmFyeSByZXByZXNlbnRhdGlvbiBvZiB0aGUgZmxvYXRcbiAgICAgIHRoaXMuYmluYXJ5U2lnbiA9IG51bWJlck9yQmluYXJ5WzBdIGFzIFwiMFwiIHwgXCIxXCI7XG4gICAgICB0aGlzLmJpbmFyeUV4cG9uZW50ID0gbnVtYmVyT3JCaW5hcnkuc2xpY2UoMSwgdGhpcy5leHBvbmVudEJpdHNTaXplICsgMSk7XG4gICAgICB0aGlzLmJpbmFyeU1hbnRpc3NhID0gbnVtYmVyT3JCaW5hcnkuc2xpY2UodGhpcy5leHBvbmVudEJpdHNTaXplICsgMSwgdGhpcy5iaXRzU2l6ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuYml0c1NpemUgPSBiaXRzU2l6ZTtcbiAgICAgIHRoaXMubnVtYmVyID0gbnVtYmVyT3JCaW5hcnk7XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIGdldEluZmluaXR5KGJpdHNTaXplOiBudW1iZXIpIHtcbiAgICByZXR1cm4gbmV3IEJpbmFyeUZsb2F0KEluZmluaXR5LCBiaXRzU2l6ZSk7XG4gIH1cblxuICBzdGF0aWMgZ2V0TmFOKGJpdHNTaXplOiBudW1iZXIpIHtcbiAgICByZXR1cm4gbmV3IEJpbmFyeUZsb2F0KE5hTiwgYml0c1NpemUpO1xuICB9XG5cbiAgc3RhdGljIGdldFplcm8oYml0c1NpemU6IG51bWJlcikge1xuICAgIHJldHVybiBuZXcgQmluYXJ5RmxvYXQoMCwgYml0c1NpemUpO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoZSBmbG9hdCBudW1iZXIgdG8gY29kZWQgd2l0aCBJRUVFIDc1NFxuICAgKi9cbiAgZ2V0IG51bWJlcigpIHtcbiAgICByZXR1cm4gdGhpcy5fbnVtYmVyO1xuICB9XG5cbiAgc2V0IG51bWJlcih2YWx1ZTogbnVtYmVyKSB7XG4gICAgdGhpcy5fbnVtYmVyID0gdmFsdWU7XG5cbiAgICB0aGlzLmNhbGN1bGF0ZUJpbmFyeVNpZ24oKTtcbiAgICB0aGlzLmNhbGN1bGF0ZUJpYXMoKTtcbiAgICB0aGlzLmNhbGN1bGF0ZUJpbmFyeU1hbnRpc3NhKCk7XG4gICAgdGhpcy5jYWxjdWxhdGVCaW5hcnlFeHBvbmVudCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoZSBiaXQgc2l6ZSB0byBjb2RlIHRoZSBudW1iZXJcbiAgICovXG4gIGdldCBiaXRzU2l6ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fYml0c1NpemU7XG4gIH1cblxuICBzZXQgYml0c1NpemUodmFsdWU6IG51bWJlcikge1xuICAgIHRoaXMuX2JpdHNTaXplID0gdmFsdWU7XG5cbiAgICBpZiAodmFsdWUgPiA4MCkge1xuICAgICAgdGhpcy5fYml0c1NpemUgPSA4MDtcbiAgICB9XG5cbiAgICBpZiAodmFsdWUgPCA4KSB7XG4gICAgICB0aGlzLl9iaXRzU2l6ZSA9IDg7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgbWFudGlzc2EgYml0cyBzaXplXG4gICAqL1xuICBnZXQgbWFudGlzc2FCaXRzU2l6ZSgpIHtcbiAgICBpZiAodGhpcy5iaXRzU2l6ZSA8IDgpIHtcbiAgICAgIHJldHVybiAwO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmJpdHNTaXplIC0gdGhpcy5leHBvbmVudEJpdHNTaXplIC0gMTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIGV4cG9uZW50IGJpdHMgc2l6ZSB3aXRoOlxuICAgKiAtIFRoZSBJRUVFIDc1NCAyMDE5IGZvcm11bGEgaWYgdGhlIGJpdHMgc2l6ZSBpcyBncmVhdGVyIG9yIGVxdWFsIHRvIDEyOFxuICAgKiAtIEEgY3VzdG9tIGZvcm11bGEgaWYgdGhlIGJpdCBzaXplIGlzIGxlc3MgdGhhbiAxMjggdGhhdCBtYXRjaGVzIHRoZSBJRUVFIHN0YW5kYXJkXG4gICAqIFxuICAgKiBWaXN1YWxpemUgdGhlIGZ1bmN0aW9uIG9uIGdlb2dlYnJhOlxuICAgKiBodHRwczovL3d3dy5nZW9nZWJyYS5vcmcvY2FsY3VsYXRvci9jZXJya2RmdlxuICAgKi9cbiAgZ2V0IGV4cG9uZW50Qml0c1NpemUoKSB7XG4gICAgaWYgKHRoaXMuYml0c1NpemUgPCA4KSB7XG4gICAgICByZXR1cm4gMDtcbiAgICB9XG5cbiAgICAvLyBJRUVFIDc1NCAyMDE5IGZvcm11bGEgPj0gMTI4XG4gICAgaWYgKHRoaXMuYml0c1NpemUgPj0gMTI4KSB7XG4gICAgICByZXR1cm4gTWF0aC5yb3VuZCg0ICogTWF0aC5sb2cyKHRoaXMuYml0c1NpemUpKSAtIDEzO1xuICAgIH1cblxuICAgIC8vIEEgZm9ybXVsYSB0aGF0IG1hdGNoZXMgdGhlIHZhbHVlcyBmb3IgPCAxMjhcbiAgICAvLyByZWY6IGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vYS82MjYzMjI2MFxuICAgIHJldHVybiBNYXRoLnJvdW5kKChNYXRoLmxvZzIodGhpcy5iaXRzU2l6ZSkgLSAxKSAqKiAoMyAvIDIpKTtcbiAgfVxuXG4gIGdldCBwb3NpdGl2ZU51bWJlcigpIHtcbiAgICByZXR1cm4gTWF0aC5hYnModGhpcy5udW1iZXIpO1xuICB9XG5cbiAgLyoqXG4gICAqIENhbGN1bGF0ZSB0aGUgcG9zaXRpb24gb2YgdGhlIGRvdCBpbiB0aGUgbWFudGlzc2FcbiAgICogICAgICAgICAgICBmbG9hdCBwb3NpdGlvblxuICAgKiAgICAgICAgICAgICAgICAgIHxcbiAgICogICAgICAgICAgICAgICAgICB2XG4gICAqIG1hbnRpc3NhKDE5LjU5Mzc1KSA9PiBcIjAwMTEuMTAwMTEwMDAwMDAwMDAwMDAwMFwiXG4gICAqL1xuICBnZXQgbWFudGlzc2FEb3RQb3NpdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5fbWFudGlzc2FEb3RQb3NpdGlvbjtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIGV4cG9uZW50IG9mIHRoZSBudW1iZXIgaW4gYmluYXJ5IHdpdGggdGhlIGJpYXNcbiAgICogbWFudGlzc2EoMTkuNTkzNzUpID0+IFwiMTAwMDAwMTBcIlxuICAgKi9cbiAgZ2V0IGJpbmFyeUV4cG9uZW50KCkge1xuICAgIHJldHVybiB0aGlzLl9iaW5hcnlFeHBvbmVudDtcbiAgfVxuXG4gIHNldCBiaW5hcnlFeHBvbmVudCh2YWx1ZTogc3RyaW5nKSB7XG4gICAgdGhpcy5fYmluYXJ5RXhwb25lbnQgPSB2YWx1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gdGhlIGJpYXMgb2YgdGhlIG51bWJlciBiYXNlZCBvbiB0aGUgZXhwb25lbnQgYml0IHNpemVcbiAgICogYiA9IDIgXiAoZXhwb25lbnRCaXRzU2l6ZSAtIDEpIC0gMVxuICAgKi9cbiAgZ2V0IGJpYXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2JpYXM7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBmdWxsIG1hbnRpc3NhIG9mIHRoZSBudW1iZXJcbiAgICovXG4gIGdldCBiaW5hcnlNYW50aXNzYSgpIHtcbiAgICByZXR1cm4gdGhpcy5fYmluYXJ5TWFudGlzc2E7XG4gIH1cblxuICBzZXQgYmluYXJ5TWFudGlzc2EodmFsdWU6IHN0cmluZykge1xuICAgIHRoaXMuX2JpbmFyeU1hbnRpc3NhID0gdmFsdWU7XG4gICAgdGhpcy5fb3ZlcmZsb3cgPSB2YWx1ZS5sZW5ndGggPiB0aGlzLm1hbnRpc3NhQml0c1NpemU7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBmdWxsIG51bWJlciBjb2RlZCBpbiBiaW5hcnkgd2l0aCBJRUVFIDc1NFxuICAgKi9cbiAgZ2V0IGJpbmFyeUZsb2F0aW5nTnVtYmVyKCkge1xuICAgIHJldHVybiB0aGlzLmJpbmFyeVNpZ24gKyB0aGlzLmJpbmFyeUV4cG9uZW50ICsgdGhpcy5iaW5hcnlNYW50aXNzYTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgc2lnbiBpbiBpdCdzIGRlY2ltYWwgZm9ybVxuICAgKi9cbiAgZ2V0IGNvbXB1dGVkU2lnbigpIHtcbiAgICByZXR1cm4gdGhpcy5iaW5hcnlTaWduID09PSBcIjFcIiA/IC0xIDogMTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgZXhwb25lbnQgaW4gaXQncyBkZWNpbWFsIGZvcm1cbiAgICovXG4gIGdldCBjb21wdXRlZEV4cG9uZW50KCkge1xuICAgIHJldHVybiB0aGlzLl9iaC5iaW5hcnlUb0RlY2ltYWwodGhpcy5iaW5hcnlFeHBvbmVudCkgLSB0aGlzLmJpYXM7XG4gIH1cblxuICAvKipcbiAgICogVGhlIG1hbnRpc3NhIGluIGl0J3MgZGVjaW1hbCBmb3JtXG4gICAqL1xuICBnZXQgY29tcHV0ZWRNYW50aXNzYSgpIHtcbiAgICByZXR1cm4gdGhpcy5fYmguYmluYXJ5VG9EZWNpbWFsKFwiMVwiICsgdGhpcy5iaW5hcnlNYW50aXNzYSkgLyAyICoqIHRoaXMubWFudGlzc2FCaXRzU2l6ZTtcbiAgfVxuXG4gIGdldCBpc05hTigpIHtcbiAgICBjb25zdCBpc05hTkJpbmFyeSA9IChcbiAgICAgIHRoaXMuYmluYXJ5RXhwb25lbnQuaW5kZXhPZihcIjBcIikgPT09IC0xICYmXG4gICAgICB0aGlzLmJpbmFyeU1hbnRpc3NhLmluZGV4T2YoXCIwXCIpID09PSAtMSAmJlxuICAgICAgdGhpcy5iaW5hcnlTaWduID09PSBcIjBcIlxuICAgICk7XG5cbiAgICByZXR1cm4gTnVtYmVyLmlzTmFOKHRoaXMubnVtYmVyKSB8fCBpc05hTkJpbmFyeTtcbiAgfVxuXG4gIGdldCBpc0luZmluaXR5KCkge1xuICAgIGNvbnN0IGlzSW5maW5pdHlCaW5hcnkgPSAoXG4gICAgICB0aGlzLmJpbmFyeUV4cG9uZW50LmluZGV4T2YoXCIwXCIpID09PSAtMSAmJlxuICAgICAgdGhpcy5iaW5hcnlNYW50aXNzYS5pbmRleE9mKFwiMVwiKSA9PT0gLTEgJiZcbiAgICAgIHRoaXMuYmluYXJ5U2lnbiA9PT0gXCIwXCJcbiAgICApO1xuXG4gICAgcmV0dXJuIHRoaXMubnVtYmVyID09PSBJbmZpbml0eSB8fCBpc0luZmluaXR5QmluYXJ5O1xuICB9XG5cbiAgZ2V0IGlzWmVybygpIHtcbiAgICBjb25zdCBpc1plcm9CaW5hcnkgPSAoXG4gICAgICB0aGlzLmJpbmFyeUV4cG9uZW50LmluZGV4T2YoXCIxXCIpID09PSAtMSAmJlxuICAgICAgdGhpcy5iaW5hcnlNYW50aXNzYS5pbmRleE9mKFwiMVwiKSA9PT0gLTEgJiZcbiAgICAgIHRoaXMuYmluYXJ5U2lnbiA9PT0gXCIwXCJcbiAgICApO1xuXG4gICAgcmV0dXJuIHRoaXMubnVtYmVyID09PSAwIHx8IGlzWmVyb0JpbmFyeTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIGFic29sdXRlIHZhbHVlIG9mIHRoZSBudW1iZXIgaW4gYmluYXJ5XG4gICAqL1xuICBnZXQgYmluYXJ5QWJzKCkge1xuICAgIHJldHVybiBcIjBcIiArIHRoaXMuYmluYXJ5RXhwb25lbnQgKyB0aGlzLmJpbmFyeU1hbnRpc3NhO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoZSBudW1iZXIgdGhhdCBpcyBjb2RlZCBpbiBtZW1vcnlcbiAgICovXG4gIGdldCBjb21wdXRlZE51bWJlcigpIHtcbiAgICBpZiAodGhpcy5pc1plcm8pIHtcbiAgICAgIHJldHVybiAwO1xuICAgIH0gZWxzZSBpZiAodGhpcy5pc05hTikge1xuICAgICAgcmV0dXJuIE5hTjtcbiAgICB9IGVsc2UgaWYgKHRoaXMuaXNJbmZpbml0eSkge1xuICAgICAgcmV0dXJuIEluZmluaXR5O1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmNvbXB1dGVkU2lnbiAqIDIgKiogdGhpcy5jb21wdXRlZEV4cG9uZW50ICogdGhpcy5jb21wdXRlZE1hbnRpc3NhO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgbWFyZ2luIG9mIGVycm9yXG4gICAqL1xuICBnZXQgZXJyb3IoKSB7ICAgIFxuICAgIGlmIChOdW1iZXIuaXNOYU4odGhpcy5udW1iZXIpIHx8IHRoaXMubnVtYmVyID09PSBJbmZpbml0eSB8fCB0aGlzLm51bWJlciA9PT0gMCkge1xuICAgICAgcmV0dXJuIDA7XG4gICAgfVxuXG4gICAgcmV0dXJuIE1hdGguYWJzKHRoaXMubnVtYmVyIC0gdGhpcy5jb21wdXRlZE51bWJlcik7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJuIHRoZSBiaW5hcnkgcmVwcmVzZW50YXRpb24gb2YgdGhlIHNpZ25cbiAgICogMCBpZiBudW1iZXIgPj0gMFxuICAgKiAxIGlmIG51bWJlciA8IDBcbiAgICovXG4gIGdldCBiaW5hcnlTaWduKCk6IFwiMFwiIHwgXCIxXCIge1xuICAgIHJldHVybiB0aGlzLl9iaW5hcnlTaWduO1xuICB9XG5cbiAgc2V0IGJpbmFyeVNpZ24odmFsdWU6IFwiMFwiIHwgXCIxXCIpIHtcbiAgICB0aGlzLl9iaW5hcnlTaWduID0gdmFsdWU7XG4gIH1cblxuICAvKipcbiAgICogVHJ1ZSBpZiB0aGUgbnVtYmVyIGNhbm5vdCBiZSBlbmNvZGVkIGluIDxiaXRzU2l6ZT4gYml0c1xuICAgKi9cbiAgZ2V0IG92ZXJmbG93KCkge1xuICAgIHJldHVybiB0aGlzLl9vdmVyZmxvdztcbiAgfVxuXG4gIC8qKlxuICAgKiBEZXRlcm1pbmUgdGhlIGJpbmFyeSBzaWduIG9mIHRoZSBudW1iZXJcbiAgICovXG4gIHByaXZhdGUgY2FsY3VsYXRlQmluYXJ5U2lnbigpIHtcbiAgICB0aGlzLl9iaW5hcnlTaWduID0gdGhpcy5udW1iZXIgPCAwID8gXCIxXCIgOiBcIjBcIjtcbiAgfVxuXG4gIC8qKlxuICAgKiBDYWxjdWxhdGUgdGhlIGV4cG9uZW50IGJpYXMgYmFzZWQgb24gdGhlIGV4cG9uZW50IGJpdCBzaXplXG4gICAqIGIgPSAyIF4gKGV4cG9uZW50Qml0c1NpemUgLSAxKSAtIDE7XG4gICAqL1xuICBwcml2YXRlIGNhbGN1bGF0ZUJpYXMoKSB7XG4gICAgdGhpcy5fYmlhcyA9IDIgKiogKHRoaXMuZXhwb25lbnRCaXRzU2l6ZSAtIDEpIC0gMTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZXRlcm1pbmUgdGhlIGJpbmFyeSBtYW50aXNzYSBhbmQgZGV0ZXJtaW5lIHRoZSBkb3QgcG9zaXRpb24gaW4gdGhlIG1hbnRpc3NhXG4gICAqL1xuICBwcml2YXRlIGNhbGN1bGF0ZUJpbmFyeU1hbnRpc3NhKCkge1xuICAgIGlmIChOdW1iZXIuaXNOYU4odGhpcy5udW1iZXIpKSB7XG4gICAgICB0aGlzLl9tYW50aXNzYURvdFBvc2l0aW9uID0gMDtcbiAgICAgIHRoaXMuX2JpbmFyeU1hbnRpc3NhID0gXCJcIi5wYWRFbmQodGhpcy5tYW50aXNzYUJpdHNTaXplLCBcIjFcIik7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gR2V0IHRoZSBpbnRlZ2VyIHBhcnRcbiAgICBjb25zdCBpbnRlZ2VyUGFydCA9IE1hdGgudHJ1bmModGhpcy5wb3NpdGl2ZU51bWJlcik7XG5cbiAgICAvLyBHZXQgdGhlIGRlY2ltYWxzIG9mIHRoZSBudW1iZXI6IGRlY2ltYWxzID0gMTkuNTkzNzUgLSAxOSA9IDAuNTkzNzVcbiAgICBsZXQgZGVjaW1hbHNQYXJ0ID0gdGhpcy5wb3NpdGl2ZU51bWJlciAtIE1hdGgudHJ1bmModGhpcy5wb3NpdGl2ZU51bWJlcik7XG5cbiAgICBjb25zdCBiaW5hcnlJbnRlZ2VyUGFydCA9IHRoaXMuX2JoLmRlY2ltYWxUb0JpbmFyeShpbnRlZ2VyUGFydCk7XG5cbiAgICAvLyBHZXQgdGhlIG51bWJlciBvZiBiaXRzIGRlZGljYXRlZCB0byBzdG9yZSB0aGUgZGVjaW1hbHMgaW4gdGhlIG1hbnRpc3NhXG4gICAgY29uc3QgZGVjaW1hbHNCaXRzU2l6ZSA9IHRoaXMubWFudGlzc2FCaXRzU2l6ZSAtIGJpbmFyeUludGVnZXJQYXJ0Lmxlbmd0aCAtIDE7XG4gICAgXG4gICAgbGV0IGJpbmFyeURlY2ltYWxzUGFydCA9IFwiXCI7XG4gICAgLy8gMC41OTM3NSAqIDIgPSAxLjE4NzUgID0+IDFcbiAgICAvLyAwLjE4NzUgICogMiA9IDAuMzc1ICAgPT4gMFxuICAgIC8vIDAuMzc1ICAgKiAyID0gMC43NSAgICA9PiAwXG4gICAgLy8gMC43NSAgICAqIDIgPSAxLjUgICAgID0+IDFcbiAgICAvLyAwLjUgICAgICogMiA9IDEgICAgICAgPT4gMVxuICAgIGZvcihsZXQgaSA9IDA7IGkgPCBkZWNpbWFsc0JpdHNTaXplOyBpKyspIHtcbiAgICAgIGRlY2ltYWxzUGFydCAqPSAyO1xuXG4gICAgICBpZiAoZGVjaW1hbHNQYXJ0ID49IDEpIHtcbiAgICAgICAgZGVjaW1hbHNQYXJ0IC09IDE7XG4gICAgICAgIGJpbmFyeURlY2ltYWxzUGFydCArPSBcIjFcIjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGJpbmFyeURlY2ltYWxzUGFydCArPSBcIjBcIjtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBsZXQgYmluYXJ5TWFudGlzc2EgPSBiaW5hcnlJbnRlZ2VyUGFydCArIGJpbmFyeURlY2ltYWxzUGFydDtcblxuICAgIC8vIEdldCB0aGUgcG9zaXRpb24gb2YgdGhlIGZpcnN0IGJpdCBhdCAxLCBmb3Igb25seSBkZWNpbWFscyBudW1iZXJcbiAgICBsZXQgbWFudGlzc2FEb3RQb3NpdGlvbiA9IC1iaW5hcnlNYW50aXNzYS5pbmRleE9mKFwiMVwiKTtcblxuICAgIC8vIFJlbW92ZSBhbGwgdGhlIGxlYWRpbmcgYml0IGF0IDAgZnJvbSB0aGUgbWFudGlzc2FcbiAgICBiaW5hcnlNYW50aXNzYSA9IHRoaXMuX2JoLmNsZWFuKGJpbmFyeU1hbnRpc3NhKTtcblxuICAgIC8vIElmIHRoZSBwb3NpdGlvbiBvZiB0aGUgZmlyc3QgYml0IGF0IDEgaXMgMFxuICAgIC8vIHRoZW4gdGhlIGRvdCBwb3NpdGlvbiBpcyBlcXVhbHMgdG8gdGhlIGxlbmd0aCBvZiB0aGUgYmluYXJ5IGludGVnZXIgcGFydCBvZiB0aGUgbWFudGlzc2FcbiAgICBpZiAobWFudGlzc2FEb3RQb3NpdGlvbiA9PT0gMCkge1xuICAgICAgbWFudGlzc2FEb3RQb3NpdGlvbiA9IGJpbmFyeUludGVnZXJQYXJ0Lmxlbmd0aCAtIDE7XG4gICAgfVxuXG4gICAgLy8gSGlkZSB0aGUgZmlyc3QgYml0IGF0IDFcbiAgICBiaW5hcnlNYW50aXNzYSA9IGJpbmFyeU1hbnRpc3NhLnN1YnN0cmluZygxKTtcblxuICAgIC8vIE1ha2Ugc3VyZSB0aGF0IHRoZSBtYW50aXNzYSBtYXRjaGVzIHRoZSBjb3JyZWN0IGxlbmd0aCAoMjMgZm9yIDMyIGJpdHMgZm9yIGV4YW1wbGUpXG4gICAgYmluYXJ5TWFudGlzc2EgPSBiaW5hcnlNYW50aXNzYS5wYWRFbmQodGhpcy5tYW50aXNzYUJpdHNTaXplLCBcIjBcIik7XG5cbiAgICB0aGlzLmJpbmFyeU1hbnRpc3NhID0gYmluYXJ5TWFudGlzc2E7XG4gICAgdGhpcy5fbWFudGlzc2FEb3RQb3NpdGlvbiA9IG1hbnRpc3NhRG90UG9zaXRpb247XG4gIH1cblxuICAvKipcbiAgICogQ2FsY3VsYXRlIHRoZSBleHBvbmVudCBpbiBiaW5hcnlcbiAgICogZSA9IGJpbmFyeShtYW50aXNzYUZsb2F0UG9zaXRpb24gKyBiaWFzKVxuICAgKi9cbiAgcHJpdmF0ZSBjYWxjdWxhdGVCaW5hcnlFeHBvbmVudCgpIHtcbiAgICAvLyBJZiB0aGUgbnVtYmVyIGlzIE5hTiBvciBJbmZpbml0eSB0aGVuIGFsbCB0aGUgYml0cyBvZiB0aGUgZXhwb25lbnQgYXJlIGVxdWFscyB0byAxXG4gICAgaWYgKE51bWJlci5pc05hTih0aGlzLm51bWJlcikgfHwgdGhpcy5udW1iZXIgPT09IEluZmluaXR5KSB7XG4gICAgICB0aGlzLl9iaW5hcnlFeHBvbmVudCA9IFwiXCIucGFkRW5kKHRoaXMuZXhwb25lbnRCaXRzU2l6ZSwgXCIxXCIpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGxldCBleHBvbmVudCA9IHRoaXMubWFudGlzc2FEb3RQb3NpdGlvbiArIHRoaXMuYmlhcztcblxuICAgIC8vIElmIHRoZSBudW1iZXIgaXMgMCB0aGVuIGFsbCB0aGUgYml0cyBvZiB0aGUgZXhwb25lbnQgYXJlIGVxdWFscyB0byAwXG4gICAgaWYgKHRoaXMubnVtYmVyID09PSAwKSB7XG4gICAgICBleHBvbmVudCA9IDA7XG4gICAgfVxuXG4gICAgLy8gQ29udmVydCB0aGUgZXhwb25lbnQgdG8gYmluYXJ5IGFuZCBhZGQgbGVhZGluZyAwIHRvIG1hdGNoIHRoZSBleHBvbmVudCBiaXRzIHNpemVcbiAgICB0aGlzLl9iaW5hcnlFeHBvbmVudCA9IHRoaXMuX2JoLmRlY2ltYWxUb0JpbmFyeShleHBvbmVudCkucGFkU3RhcnQodGhpcy5leHBvbmVudEJpdHNTaXplLCBcIjBcIik7XG4gIH1cblxuICAvKipcbiAgICogQWRkIHR3byBiaW5hcnkgZmxvYXQgbnVtYmVyXG4gICAqIEBwYXJhbSBiZjIgVGhlIGJpbmFyeSBmbG9hdCBudW1iZXIgdG8gYWRkXG4gICAqIEByZXR1cm5zIFRoZSByZXN1bHQgb2YgdGhlIGFkZGl0aW9uXG4gICAqL1xuICBhZGQoYmYyOiBCaW5hcnlGbG9hdCkge1xuICAgIGNvbnN0IGJmUmVzID0gbmV3IEJpbmFyeUZsb2F0KDEsIHRoaXMuYml0c1NpemUpO1xuXG4gICAgLy8gU3BlY2lhbCBjYXNlc1xuICAgIGlmICh0aGlzLmlzTmFOIHx8IGJmMi5pc05hTikge1xuICAgICAgcmV0dXJuIEJpbmFyeUZsb2F0LmdldE5hTih0aGlzLmJpdHNTaXplKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuaXNJbmZpbml0eSB8fCBiZjIuaXNJbmZpbml0eSkge1xuICAgICAgcmV0dXJuIEJpbmFyeUZsb2F0LmdldEluZmluaXR5KHRoaXMuYml0c1NpemUpO1xuICAgIH1cbiAgICBpZiAodGhpcy5iaW5hcnlBYnMgPT09IGJmMi5iaW5hcnlBYnMgJiYgdGhpcy5iaW5hcnlTaWduICE9PSBiZjIuYmluYXJ5U2lnbikge1xuICAgICAgcmV0dXJuIEJpbmFyeUZsb2F0LmdldFplcm8odGhpcy5iaXRzU2l6ZSk7XG4gICAgfVxuXG4gICAgLy8gU3RlcCAxOiBEZXRlcm1pbmUgdGhlIGxvd2VzdCBleHBvbmVudCBiZXR3ZWVuIHRoaXMgYW5kIHRoZSBzZWNvbmQgbnVtYmVyXG4gICAgbGV0IGJmTWluQmluYXJ5RXhwb25lbnQ6IEJpbmFyeUZsb2F0ID0gdGhpcztcbiAgICBsZXQgYmZNYXhCaW5hcnlFeHBvbmVudDogQmluYXJ5RmxvYXQgPSBiZjI7XG4gICAgaWYgKHRoaXMuX2JoLmJpbmFyeVRvRGVjaW1hbChiZjIuYmluYXJ5RXhwb25lbnQpIDwgdGhpcy5fYmguYmluYXJ5VG9EZWNpbWFsKGJmTWluQmluYXJ5RXhwb25lbnQuYmluYXJ5RXhwb25lbnQpKSB7XG4gICAgICBiZk1pbkJpbmFyeUV4cG9uZW50ID0gYmYyO1xuICAgICAgYmZNYXhCaW5hcnlFeHBvbmVudCA9IHRoaXM7XG4gICAgfVxuICAgIC8vIENvcHkgdGhlIG51bWJlciwgZG8gbm90IHNldCBieSByZWZlcmVuY2VcbiAgICBiZk1heEJpbmFyeUV4cG9uZW50ID0gbmV3IEJpbmFyeUZsb2F0KGJmTWF4QmluYXJ5RXhwb25lbnQuY29tcHV0ZWROdW1iZXIsIHRoaXMuYml0c1NpemUpO1xuICAgIGJmTWluQmluYXJ5RXhwb25lbnQgPSBuZXcgQmluYXJ5RmxvYXQoYmZNaW5CaW5hcnlFeHBvbmVudC5jb21wdXRlZE51bWJlciwgdGhpcy5iaXRzU2l6ZSk7XG5cbiAgICAvLyBJZiB0aGVyZSBpcyBhIDAgdGhlbiByZXR1cm4gdGhlIG5vbi16ZXJvIG51bWJlclxuICAgIGlmIChiZk1pbkJpbmFyeUV4cG9uZW50LmlzWmVybykge1xuICAgICAgcmV0dXJuIGJmTWF4QmluYXJ5RXhwb25lbnQ7XG4gICAgfVxuXG4gICAgLy8gQWRkIHRoZSBoaWRkZW4gYml0XG4gICAgYmZNaW5CaW5hcnlFeHBvbmVudC5iaW5hcnlNYW50aXNzYSA9IFwiMVwiICsgYmZNaW5CaW5hcnlFeHBvbmVudC5iaW5hcnlNYW50aXNzYTtcbiAgICBiZk1heEJpbmFyeUV4cG9uZW50LmJpbmFyeU1hbnRpc3NhID0gXCIxXCIgKyBiZk1heEJpbmFyeUV4cG9uZW50LmJpbmFyeU1hbnRpc3NhO1xuXG4gICAgLy8gU3RlcCAyOiBTaGlmdCB0aGUgbWFudGlzc2FcbiAgICBjb25zdCBzaGlmdFZhbHVlID0gYmZNYXhCaW5hcnlFeHBvbmVudC5jb21wdXRlZEV4cG9uZW50IC0gYmZNaW5CaW5hcnlFeHBvbmVudC5jb21wdXRlZEV4cG9uZW50O1xuICAgIGNvbnN0IHNoaWZ0ZWRNaW5NYW50aXNzYSA9IHRoaXMuX2JoLnNoaWZ0UmlnaHQoYmZNaW5CaW5hcnlFeHBvbmVudC5iaW5hcnlNYW50aXNzYSwgc2hpZnRWYWx1ZSk7XG4gICAgYmZNaW5CaW5hcnlFeHBvbmVudC5iaW5hcnlNYW50aXNzYSA9IHNoaWZ0ZWRNaW5NYW50aXNzYTtcbiAgICBcbiAgICAvLyBTdGVwIDM6IFB1dCB0aGUgc2FtZSBleHBvbmVudFxuICAgIGJmUmVzLmJpbmFyeUV4cG9uZW50ID0gYmZNYXhCaW5hcnlFeHBvbmVudC5iaW5hcnlFeHBvbmVudDtcblxuICAgIC8vIFN0ZXAgNDogMidzIGNvbXBsZW1lbnQgaWYgbmVnYXRpdmVcbiAgICBpZiAoYmZNaW5CaW5hcnlFeHBvbmVudC5jb21wdXRlZFNpZ24gPT09IC0xKSB7XG4gICAgICBiZk1pbkJpbmFyeUV4cG9uZW50LmJpbmFyeU1hbnRpc3NhID0gdGhpcy5fYmguYzIoYmZNaW5CaW5hcnlFeHBvbmVudC5iaW5hcnlNYW50aXNzYSkucmV2ZXJzZSgpLmpvaW4oXCJcIik7XG4gICAgfVxuICAgIGlmIChiZk1heEJpbmFyeUV4cG9uZW50LmNvbXB1dGVkU2lnbiA9PT0gLTEpIHtcbiAgICAgIGJmTWF4QmluYXJ5RXhwb25lbnQuYmluYXJ5TWFudGlzc2EgPSB0aGlzLl9iaC5jMihiZk1heEJpbmFyeUV4cG9uZW50LmJpbmFyeU1hbnRpc3NhKS5yZXZlcnNlKCkuam9pbihcIlwiKTtcbiAgICB9XG5cbiAgICAvLyBTdGVwIDU6IEFkZCB0aGUgbWFudGlzc2EgYW5kIHRoZSBzaGlmdGVkIG9uZVxuICAgIGJmUmVzLmJpbmFyeU1hbnRpc3NhID0gdGhpcy5fYmguYmluYXJ5QWRkaXRpb24oXG4gICAgICBiZk1heEJpbmFyeUV4cG9uZW50LmJpbmFyeU1hbnRpc3NhLFxuICAgICAgYmZNaW5CaW5hcnlFeHBvbmVudC5iaW5hcnlNYW50aXNzYSxcbiAgICApLnJldmVyc2UoKS5qb2luKFwiXCIpO1xuXG4gICAgLy8gU3RlcCA2OiBEZXRlcm1pbmUgdGhlIHNpZ24gb2YgdGhlIHJlc3VsdFxuICAgIGlmIChiZk1heEJpbmFyeUV4cG9uZW50LmNvbXB1dGVkU2lnbiAhPT0gYmZNaW5CaW5hcnlFeHBvbmVudC5jb21wdXRlZFNpZ24pIHtcbiAgICAgIGlmIChiZk1heEJpbmFyeUV4cG9uZW50LmNvbXB1dGVkU2lnbiA9PT0gLTEpIHtcbiAgICAgICAgYmZSZXMuYmluYXJ5U2lnbiA9IFwiMVwiO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIFN0ZXAgNzogTm9ybWFsaXplIHRoZSBtYW50aXNzYVxuICAgIC8vIEhpZGUgdGhlIGZpcnN0IGJpdFxuICAgIGJmUmVzLmJpbmFyeU1hbnRpc3NhID0gYmZSZXMuYmluYXJ5TWFudGlzc2Euc3Vic3RyaW5nKDEpO1xuXG4gICAgLy8gTm9ybWFsaXplIHRoZSBtYW50aXNzYSBpZiB0aGVyZSBpcyBhIGNhcnJ5XG4gICAgaWYgKGJmUmVzLmJpbmFyeU1hbnRpc3NhLmxlbmd0aCAtIGJmUmVzLm1hbnRpc3NhQml0c1NpemUgPT09IDEpIHtcbiAgICAgIC8vIFJlbW92ZSB0aGUgbGFzdCBiaXRcbiAgICAgIGJmUmVzLmJpbmFyeU1hbnRpc3NhID0gYmZSZXMuYmluYXJ5TWFudGlzc2Euc2xpY2UoMCwgLTEpO1xuXG4gICAgICAvLyBBZGQgMSB0byB0aGUgZXhwb25lbnRcbiAgICAgIGJmUmVzLmJpbmFyeUV4cG9uZW50ID0gdGhpcy5fYmguYWRkTnVtYmVyVG9CaW5hcnkoYmZSZXMuYmluYXJ5RXhwb25lbnQsIDEpWzBdO1xuICAgIH1cblxuICAgIHJldHVybiBiZlJlcztcbiAgfVxufVxuIiwiaW1wb3J0IHsgQmluYXJ5RmxvYXQgfSBmcm9tIFwiLi9jbGFzc2VzL0JpbmFyeUZsb2F0XCI7XG5cbmNvbnN0IGFkZEJpdFNpemVFbGVtZW50ID0gPEhUTUxJbnB1dEVsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhZGQtYml0cy1zaXplXCIpO1xuY29uc3QgYWRkSW5wdXRBRWxlbWVudCA9IDxIVE1MSW5wdXRFbGVtZW50PmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYWRkLWlucHV0LWFcIik7XG5jb25zdCBhZGRJbnB1dEJFbGVtZW50ID0gPEhUTUxJbnB1dEVsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhZGQtaW5wdXQtYlwiKTtcbmNvbnN0IGFkZFJlc3VsdEVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFkZC1yZXN1bHRcIik7XG5cbmZ1bmN0aW9uIG9uQ2hhbmdlQWRkaXRpb24oKSB7XG4gIGNvbnN0IGJpdHNTaXplID0gTnVtYmVyKGFkZEJpdFNpemVFbGVtZW50LnZhbHVlKTtcbiAgY29uc3QgaW5wdXRBID0gTnVtYmVyKGFkZElucHV0QUVsZW1lbnQudmFsdWUpO1xuICBjb25zdCBpbnB1dEIgPSBOdW1iZXIoYWRkSW5wdXRCRWxlbWVudC52YWx1ZSk7XG4gICAgXG4gIGlmIChhZGRCaXRTaXplRWxlbWVudC52YWx1ZSA9PT0gXCJcIiB8fCBhZGRJbnB1dEFFbGVtZW50LnZhbHVlID09PSBcIlwiIHx8IGFkZElucHV0QkVsZW1lbnQudmFsdWUgPT09IFwiXCIpIHtcbiAgICBhZGRSZXN1bHRFbGVtZW50LmlubmVySFRNTCA9IGA8c3BhbiBjbGFzcz1cImNvbG9yLWdyZXlcIj5WZXVpbGxleiByZW5zZWlnbmVyIHRvdXMgbGVzIGNoYW1wczwvc3Bhbj5gO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGlmIChiaXRzU2l6ZSA+IDgwKSB7XG4gICAgYWRkUmVzdWx0RWxlbWVudC5pbm5lckhUTUwgPSBgPHNwYW4gY2xhc3M9XCJjb2xvci1yZWRcIj5MYSB0YWlsbGUgZGVzIGJpdHMgZG9pdCBhdSBtYXhpbXVtIMOqdHJlIDgwPC9zcGFuPmA7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgaWYgKGlucHV0QSA8IDAgfHwgaW5wdXRCIDwgMCkge1xuICAgIGFkZFJlc3VsdEVsZW1lbnQuaW5uZXJIVE1MID0gYDxzcGFuIGNsYXNzPVwiY29sb3ItcmVkXCI+Tm91cyBuZSBzdXBwb3J0b25zIHF1ZSBsZXMgYWRkaXRpb25zIHBvdXIgbGUgbW9tZW50PC9zcGFuPmA7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY29uc3QgYmZBID0gbmV3IEJpbmFyeUZsb2F0KGlucHV0QSwgYml0c1NpemUpO1xuICBjb25zdCBiZkIgPSBuZXcgQmluYXJ5RmxvYXQoaW5wdXRCLCBiaXRzU2l6ZSk7XG4gIGNvbnN0IGJmUmVzID0gYmZBLmFkZChiZkIpO1xuICBjb25zdCBnZXRPdmVyRmxvd0Vycm9yID0gKG5iOiBzdHJpbmcgfCBudW1iZXIpID0+IGA8c3BhbiBjbGFzcz1cImNvbG9yLXJlZFwiPiR7bmJ9IGVzdCB0cm9wIGdyYW5kIHBvdXIgw6p0cmUgZW5jb2TDqSBlbiAke2JpdHNTaXplfSBiaXRzPC9zcGFuPmA7XG5cblxuICBpZiAoYmZBLm92ZXJmbG93KSB7XG4gICAgYWRkUmVzdWx0RWxlbWVudC5pbm5lckhUTUwgPSBnZXRPdmVyRmxvd0Vycm9yKGJmQS5udW1iZXIpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGlmIChiZkIub3ZlcmZsb3cpIHtcbiAgICBhZGRSZXN1bHRFbGVtZW50LmlubmVySFRNTCA9IGdldE92ZXJGbG93RXJyb3IoYmZCLm51bWJlcik7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgaWYgKGJmUmVzLm92ZXJmbG93KSB7XG4gICAgYWRkUmVzdWx0RWxlbWVudC5pbm5lckhUTUwgPSBnZXRPdmVyRmxvd0Vycm9yKFwiTGUgcsOpc3VsdGF0XCIpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGFkZFJlc3VsdEVsZW1lbnQuaW5uZXJIVE1MID0gYFxuICAgIDxkaXYgY2xhc3M9XCJyZXN1bHQtZ3JvdXAgY29sb3ItZ3JleVwiPlxuICAgICAgUsOpc3VsdGF0IFwiZXhhY3RcIjpcbiAgICAgIDxzcGFuIGNsYXNzPVwibW9ub1wiPiR7aW5wdXRBICsgaW5wdXRCfTwvc3Bhbj5cbiAgICA8L2Rpdj5cblxuICAgIDxkaXYgY2xhc3M9XCJyZXN1bHQtZ3JvdXAgbXQyNVwiPlxuICAgICAgTm9tYnJlIDxzcGFuIGNsYXNzPVwibW9ub1wiPjE8L3NwYW4+IGVuIGJpbmFpcmU6XG4gICAgICA8c3BhbiBjbGFzcz1cImNvbG9yLXJlZCBtb25vXCI+JHtiZkEuYmluYXJ5U2lnbn08L3NwYW4+XG4gICAgICA8c3BhbiBjbGFzcz1cImNvbG9yLWJsdWUgbW9ub1wiPiR7YmZBLmJpbmFyeUV4cG9uZW50fTwvc3Bhbj5cbiAgICAgIDxzcGFuIGNsYXNzPVwiY29sb3Itb3JhbmdlIG1vbm9cIj4ke2JmQS5iaW5hcnlNYW50aXNzYX08L3NwYW4+XG4gICAgICAoPHNwYW4gY2xhc3M9XCJtb25vXCI+JHtiZkEuY29tcHV0ZWROdW1iZXJ9PC9zcGFuPilcbiAgICA8L2Rpdj5cblxuICAgIDxkaXYgY2xhc3M9XCJyZXN1bHQtZ3JvdXBcIj5cbiAgICAgIE5vbWJyZSA8c3BhbiBjbGFzcz1cIm1vbm9cIj4yPC9zcGFuPiBlbiBiaW5haXJlOlxuICAgICAgPHNwYW4gY2xhc3M9XCJjb2xvci1yZWQgbW9ub1wiPiR7YmZCLmJpbmFyeVNpZ259PC9zcGFuPlxuICAgICAgPHNwYW4gY2xhc3M9XCJjb2xvci1ibHVlIG1vbm9cIj4ke2JmQi5iaW5hcnlFeHBvbmVudH08L3NwYW4+XG4gICAgICA8c3BhbiBjbGFzcz1cImNvbG9yLW9yYW5nZSBtb25vXCI+JHtiZkIuYmluYXJ5TWFudGlzc2F9PC9zcGFuPlxuICAgICAgKDxzcGFuIGNsYXNzPVwibW9ub1wiPiR7YmZCLmNvbXB1dGVkTnVtYmVyfTwvc3Bhbj4pXG4gICAgPC9kaXY+XG5cbiAgICA8ZGl2IGNsYXNzPVwicmVzdWx0LWdyb3VwIG10MjVcIj5cbiAgICAgIFLDqXN1bHRhdCBlbiBiaW5haXJlOlxuICAgICAgPHNwYW4gY2xhc3M9XCJjb2xvci1yZWQgbW9ub1wiPiR7YmZSZXMuYmluYXJ5U2lnbn08L3NwYW4+XG4gICAgICA8c3BhbiBjbGFzcz1cImNvbG9yLWJsdWUgbW9ub1wiPiR7YmZSZXMuYmluYXJ5RXhwb25lbnR9PC9zcGFuPlxuICAgICAgPHNwYW4gY2xhc3M9XCJjb2xvci1vcmFuZ2UgbW9ub1wiPiR7YmZSZXMuYmluYXJ5TWFudGlzc2F9PC9zcGFuPlxuICAgIDwvZGl2PlxuXG4gICAgPGRpdiBjbGFzcz1cInJlc3VsdC1ncm91cFwiPlxuICAgICAgUsOpc3VsdGF0IGNhbGN1bMOpOlxuICAgICAgPHNwYW4gY2xhc3M9XCJtb25vXCI+JHtiZlJlcy5jb21wdXRlZE51bWJlcn08L3NwYW4+XG4gICAgPC9kaXY+XG5cbiAgICA8ZGl2IGNsYXNzPVwicmVzdWx0LWdyb3VwXCI+XG4gICAgICBNYXJnZSBkJ2VycmV1cjpcbiAgICAgIDxzcGFuIGNsYXNzPVwibW9ub1wiPiR7TWF0aC5hYnMoaW5wdXRBICsgaW5wdXRCIC0gYmZSZXMuY29tcHV0ZWROdW1iZXIpfTwvc3Bhbj5cbiAgICA8L2Rpdj5cbiAgYDtcbn1cblxuYWRkQml0U2l6ZUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCBvbkNoYW5nZUFkZGl0aW9uKTtcbmFkZEJpdFNpemVFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXl1cFwiLCBvbkNoYW5nZUFkZGl0aW9uKTtcbmFkZElucHV0QUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCBvbkNoYW5nZUFkZGl0aW9uKTtcbmFkZElucHV0QUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImtleXVwXCIsIG9uQ2hhbmdlQWRkaXRpb24pO1xuYWRkSW5wdXRCRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsIG9uQ2hhbmdlQWRkaXRpb24pO1xuYWRkSW5wdXRCRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwia2V5dXBcIiwgb25DaGFuZ2VBZGRpdGlvbik7XG5cbm9uQ2hhbmdlQWRkaXRpb24oKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==
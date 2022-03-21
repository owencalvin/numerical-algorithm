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
    bfResultElement.innerHTML = "\n    <div class=\"result-group\">\n      Taille en bits total: ".concat(bf.bitsSize, "\n    </div>\n\n    <div class=\"result-group\">\n      Taille en bits de l'exposant: ").concat(bf.exponentBitsSize, "\n    </div>\n    \n    <div class=\"result-group\">\n      Taille en bits de la mantisse: ").concat(bf.mantissaBitsSize, "\n    </div>\n\n    <div class=\"result-group\">\n      Biais: ").concat(bf.bias, "\n    </div>\n    \n    <div class=\"result-group\">\n      Signe:\n      <span class=\"color-red mono\">").concat(bf.binarySign, "</span>\n      <span class=\"mono\">(").concat(bf.computedSign > 0 ? "+" : "-", ")</span>\n    </div>\n    \n    <div class=\"result-group\">\n      Mantisse:\n      <span class=\"color-orange mono\">\n        ").concat(bf.binaryMantissa, "\n      </span>\n      <span class=\"mono\">(").concat(bf.computedMantissa, ")</span>\n    </div>\n\n    <div class=\"result-group\">\n      Exposant: <span class=\"color-blue mono\">").concat(bf.binaryExponent, "</span>\n      <span class=\"mono\">(2<sup>").concat(bf.computedExponent, "</sup>)</span>\n    </div>\n    \n    <div class=\"result-group\">\n      R\u00E9sultat en binaire:\n      <span class=\"color-red mono\">").concat(bf.binarySign, "</span>\n      <span class=\"color-blue mono\">").concat(bf.binaryExponent, "</span>\n      <span class=\"color-orange mono\">").concat(bf.binaryMantissa, "</span>\n    </div>\n    \n    <div class=\"result-group\">\n      R\u00E9sultat: ").concat(bf.computedNumber, "\n    </div>\n  ");
}
bfBinaryNumberElement.addEventListener("change", onChangeConverterBf);
bfBinaryNumberElement.addEventListener("keyup", onChangeConverterBf);
onChangeConverterBf();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QyxTQUFTLEdBQUcsaUVBQStELENBQUM7UUFDNUYsT0FBTztLQUNSO0lBRUQsSUFBTSxFQUFFLEdBQUcsSUFBSSxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7SUFFekMsZUFBZSxDQUFDLFNBQVMsR0FBRywwRUFFQSxFQUFFLENBQUMsUUFBUSxtR0FJSCxFQUFFLENBQUMsZ0JBQWdCLHdHQUlsQixFQUFFLENBQUMsZ0JBQWdCLDRFQUkzQyxFQUFFLENBQUMsSUFBSSxzSEFLZSxFQUFFLENBQUMsVUFBVSxrREFDdEIsRUFBRSxDQUFDLFlBQVksR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyw4SUFNakQsRUFBRSxDQUFDLGNBQWMsMERBRUMsRUFBRSxDQUFDLGdCQUFnQix1SEFJQyxFQUFFLENBQUMsY0FBYyx3REFDL0IsRUFBRSxDQUFDLGdCQUFnQix1SkFLaEIsRUFBRSxDQUFDLFVBQVUsNERBQ1osRUFBRSxDQUFDLGNBQWMsOERBQ2YsRUFBRSxDQUFDLGNBQWMsK0ZBSXZDLEVBQUUsQ0FBQyxjQUFjLHFCQUVoQyxDQUFDO0FBQ0osQ0FBQztBQUVELHFCQUFxQixDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxtQkFBbUIsQ0FBQyxDQUFDO0FBQ3RFLHFCQUFxQixDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxtQkFBbUIsQ0FBQyxDQUFDO0FBRXJFLG1CQUFtQixFQUFFLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9tYXRoX3NwZS8uL3NyYy9jbGFzc2VzL0JpbmFyeUhlbHBlci50cyIsIndlYnBhY2s6Ly9tYXRoX3NwZS8uL3NyYy9jbGFzc2VzL0JpbmFyeUZsb2F0LnRzIiwid2VicGFjazovL21hdGhfc3BlLy4vc3JjL2xhYm8xLWJmLWNvbnZlcnRlci50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgQmluYXJ5SGVscGVyIHtcbiAgLyoqXG4gICAqIEdldCBuIGJpdCBvZiAwIG9yIDFcbiAgICogQHBhcmFtIHZhbHVlIDEgb3IgMFxuICAgKiBAcGFyYW0gbiBUaGUgbnVtYmVyIG9mIGJpdHMgdG8gcmV0cmlldmVcbiAgICogQHJldHVybnMgbiBiaXQgb2YgMCBvciAxXG4gICAqL1xuICBwdWJsaWMgZ2V0TkJpdCh2YWx1ZTogMSB8IDAsIG46IG51bWJlcik6IHN0cmluZyB7XG4gICAgbGV0IHJlcyA9IFwiXCI7XG4gICAgXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuOyBpKyspIHtcbiAgICAgIHJlcyArPSB2YWx1ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZCBuIHplcm9zIGJlZm9yZSB0aGUgYmluYXJ5IG51bWJlclxuICAgKiBAcGFyYW0gbiBUaGUgbnVtYmVyIG9mIDAgdG8gYWRkIGJlZm9yZSB0aGUgYmluYXJ5IG51bWJlclxuICAgKiBAcGFyYW0gYiBUaGUgYmluYXJ5IG51bWJlclxuICAgKiBAcmV0dXJucyBUaGUgYmluYXJ5IG51bWJlciB3aXRoIG4gemVyb3MgYmVmb3JlXG4gICAqL1xuICBwdWJsaWMgYWRkUGFkZGluZyhuOiBudW1iZXIsIGIgPSBcIlwiKSB7XG4gICAgY29uc3Qgc2l6ZSA9IG4gLSBiLmxlbmd0aDtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2l6ZTsgaSsrKSB7XG4gICAgICBiID0gXCIwXCIgKyBiO1xuICAgIH1cblxuICAgIHJldHVybiBiO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgdGhlIHplcm9zIGJlZm9yZSBhIGJpbmFyeSBudW1iZXIgKDAwMDEwMSBiZWNvbWVzIDEwMSlcbiAgICogQHBhcmFtIGIgVGhlIGJpbmFyeSBudW1iZXJcbiAgICogQHJldHVybnMgVGhlIHByb2R1Y2VkIGJpbmFyeSBudW1iZXJcbiAgICovXG4gIHB1YmxpYyBjbGVhbihiOiBzdHJpbmcpIHtcbiAgICBsZXQgcmVzID0gYjtcblxuICAgIGZvcihsZXQgaSA9IDA7IGkgPCBiLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoYltpXSA9PT0gXCIwXCIpIHtcbiAgICAgICAgcmVzID0gcmVzLnN1YnN0cmluZygxKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiByZXM7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHJlcyA9PT0gXCJcIikge1xuICAgICAgcmV0dXJuIFwiMFwiO1xuICAgIH1cbiAgfVxuXG5cbiAgLyoqXG4gICAqIEFkZCAwIHBhZGRpbmcgdG8gdGhlIHNtYWxsZXN0IGJpbmFyeSBudW1iZXIgdG8gbWF0Y2ggdGhlIGxvbmdlc3Qgb25lJ3MgbGVuZ3RoXG4gICAqIFsxMDEsIDExMDAxXSBiZWNvbWVzIFswMDEwMSwgMTEwMDFdXG4gICAqIEBwYXJhbSBiMSBUaGUgZmlyc3QgYmluYXJ5IG51bWJlclxuICAgKiBAcGFyYW0gYjIgVGhlIHNlY29uZCBiaW5hcnkgbnVtYmVyXG4gICAqIEByZXR1cm5zIFtiMSwgYjJdIHdpdGggY29ycmVjdCBwYWRkaW5nXG4gICAqL1xuICBwdWJsaWMgYWRkTWF4UGFkZGluZyhiMTogc3RyaW5nLCBiMjogc3RyaW5nKSB7XG4gICAgaWYgKGIyLmxlbmd0aCA+IGIxLmxlbmd0aCkge1xuICAgICAgYjEgPSB0aGlzLmFkZFBhZGRpbmcoYjIubGVuZ3RoLCBiMSk7XG4gICAgfSBlbHNlIGlmIChiMS5sZW5ndGggPiBiMi5sZW5ndGgpIHtcbiAgICAgIGIyID0gdGhpcy5hZGRQYWRkaW5nKGIxLmxlbmd0aCwgYjIpO1xuICAgIH1cblxuICAgIHJldHVybiBbYjEsIGIyXTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIG1heCBsZW5ndGggb2YgdHdvIGJpbmFyaWVzIG51bWJlcnNcbiAgICogQHBhcmFtIGIxIFRoZSBmaXJzdCBiaW5hcnkgbnVtYmVyXG4gICAqIEBwYXJhbSBiMiBUaGUgc2Vjb25kIGJpbmFyeSBudW1iZXJcbiAgICogQHJldHVybnMgVGhlIG1heCBsZW5ndGhcbiAgICovXG4gIHB1YmxpYyBnZXRNYXhMZW5ndGgoYjE6IHN0cmluZywgYjI6IHN0cmluZykge1xuICAgIGlmIChiMS5sZW5ndGggPiBiMi5sZW5ndGgpIHtcbiAgICAgIHJldHVybiBiMS5sZW5ndGg7XG4gICAgfVxuICAgIHJldHVybiBiMi5sZW5ndGg7XG4gIH1cblxuICAvKipcbiAgICogQ29udmVydCBhIG51bWJlciB0byBpdCdzIGJpbmFyeSByZXByZXNlbnRhdGlvblxuICAgKiBAcGFyYW0gZGVjaW1hbCBUaGUgXG4gICAqIEByZXR1cm5zIFRoZSBiaW5hcnkgcmVwcmVzZW50YXRpb24gb2YgdGhlIGRlY2ltYWwgbnVtYmVyXG4gICAqL1xuICBwdWJsaWMgZGVjaW1hbFRvQmluYXJ5KGRlY2ltYWw6IG51bWJlcikge1xuICAgIGNvbnN0IG9yaWdpbmFsTnVtYmVyID0gZGVjaW1hbDtcbiAgICBsZXQgYmluYXJ5TnVtYmVyID0gKE1hdGguYWJzKGRlY2ltYWwpID4+PiAwKS50b1N0cmluZygyKTtcblxuICAgIGlmIChvcmlnaW5hbE51bWJlciA8IDApIHtcbiAgICAgIGJpbmFyeU51bWJlciA9IHRoaXMuYzIoYmluYXJ5TnVtYmVyKS5yZXZlcnNlKCkuam9pbihcIlwiKTtcbiAgICB9XG5cbiAgICByZXR1cm4gYmluYXJ5TnVtYmVyO1xuICB9XG5cbiAgLyoqXG4gICAqIENvbnZlcnQgYSBiaW5hcnkgcmVwcmVzZW50YXRpb24gb2YgYSBudW1iZXIgdG8gYSBkZWNpbWFsIG51bWJlclxuICAgKiBAcGFyYW0gYmluYXJ5IFRoZSBiaW5hcnkgcmVwcmVzZW50YXRpb24gb2YgYSBudW1iZXJcbiAgICogQHJldHVybnMgVGhlIGludCByZXByZXNlbnRhdGlvbiBvZiBhIGJpbmFyeSBudW1iZXJcbiAgICovXG4gIHB1YmxpYyBiaW5hcnlUb0RlY2ltYWwoYmluYXJ5OiBzdHJpbmcpIHtcbiAgICByZXR1cm4gcGFyc2VJbnQoYmluYXJ5LCAyKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGQgaW50IHRvIGEgYmluYXJ5IG51bWJlclxuICAgKiBAcGFyYW0gYiBUaGUgYmluYXJ5IG51bWJlclxuICAgKiBAcGFyYW0gbiBUaGUgaW50IG51bWJlciB0byBhZGQgdG8gdGhlIGJpbmFyeSBudW1iZXJcbiAgICogQHJldHVybnMgVGhlIHByb2R1Y2VkIHJlc3VsdFxuICAgKi9cbiAgcHVibGljIGFkZE51bWJlclRvQmluYXJ5KGI6IHN0cmluZywgbjogbnVtYmVyKTogc3RyaW5nW10ge1xuICAgIHJldHVybiB0aGlzLmJpbmFyeUFkZGl0aW9uKGIsIHRoaXMuZGVjaW1hbFRvQmluYXJ5KG4pKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbnZlcnQgYSBiaW5hcnkgbnVtYmVyXG4gICAqIEBwYXJhbSBiIFRoZSBiaW5hcnkgbnVtYmVyIHRvIGludmVydFxuICAgKiBAcmV0dXJucyBUaGUgaW52ZXJ0IGJpbmFyeSBudW1iZXJcbiAgICovXG4gIHB1YmxpYyBpbnZlcnQoYjogc3RyaW5nKSB7XG4gICAgY29uc3QgaW5pdGlhbExlbmd0aCA9IGIubGVuZ3RoO1xuICAgIGIgPSB0aGlzLmRlY2ltYWxUb0JpbmFyeSh0aGlzLmJpbmFyeVRvRGVjaW1hbChiKSBeIHRoaXMuYmluYXJ5VG9EZWNpbWFsKHRoaXMuZ2V0TkJpdCgxLCBiLmxlbmd0aCkpKTtcbiAgICBiID0gdGhpcy5hZGRQYWRkaW5nKGluaXRpYWxMZW5ndGgsIGIpO1xuICAgIHJldHVybiBiO1xuICB9XG5cbiAgLyoqXG4gICAqIFNoaWZ0IHRoZSBiaW5hcnkgbnVtYmVyIHRvIHRoZSByaWdodFxuICAgKiBAcGFyYW0gYiBUaGUgYmluYXJ5IG51bWJlclxuICAgKiBAcGFyYW0gc2hpZnRWYWx1ZSBUaGUgc2hpZnQgdmFsdWVcbiAgICogQHJldHVybnMgVGhlIHNoaWZ0ZWQgYmluYXJ5IG51bWJlclxuICAgKi9cbiAgcHVibGljIHNoaWZ0UmlnaHQoYjogc3RyaW5nLCBzaGlmdFZhbHVlOiBudW1iZXIpIHtcbiAgICAvLyBcIjAwMDAwMTAxMFwiID4+IDIgPT4gXCIwMDAwMDAwMTBcIlxuICAgIC8vIDEuIFJlbW92ZXMgbGFzdHMgPHNoaWZ0VmFsdWU+IGJpdHNcbiAgICAvLyAyLiBQbGFjZXMgPHNoaWZ0VmFsdWU+IGJpdHMgYXQgMCBiZWZvcmVcblxuICAgIGlmIChzaGlmdFZhbHVlIDwgMSkge1xuICAgICAgcmV0dXJuIGI7XG4gICAgfVxuXG4gICAgbGV0IHJlcyA9IGI7XG4gICAgcmVzID0gcmVzLnNsaWNlKDAsIC1zaGlmdFZhbHVlKTtcbiAgICByZXMgPSBcIlwiLnBhZFN0YXJ0KHNoaWZ0VmFsdWUsIFwiMFwiKSArIHJlcztcblxuICAgIHJldHVybiByZXM7XG4gIH1cblxuICAvKipcbiAgICogU2hpZnQgdGhlIGJpbmFyeSBudW1iZXIgdG8gdGhlIGxlZnRcbiAgICogQHBhcmFtIGIgVGhlIGJpbmFyeSBudW1iZXJcbiAgICogQHBhcmFtIHNoaWZ0VmFsdWUgVGhlIHNoaWZ0IHZhbHVlXG4gICAqIEByZXR1cm5zIFRoZSBzaGlmdGVkIGJpbmFyeSBudW1iZXJcbiAgICovXG4gIHB1YmxpYyBzaGlmdExlZnQoYjogc3RyaW5nLCBzaGlmdFZhbHVlOiBudW1iZXIpIHtcbiAgICAvLyBcIjAwMDAwMTAxMFwiIDw8IDIgPT4gXCIwMDAwMDEwMTAwMFwiXG4gICAgLy8gMS4gUmVtb3ZlcyBsYXN0cyA8c2hpZnRWYWx1ZT4gYml0c1xuICAgIC8vIDIuIFBsYWNlcyA8c2hpZnRWYWx1ZT4gYml0cyBhdCAwIGJlZm9yZVxuXG4gICAgaWYgKHNoaWZ0VmFsdWUgPCAxKSB7XG4gICAgICByZXR1cm4gYjtcbiAgICB9XG5cbiAgICBsZXQgcmVzID0gYjtcbiAgICByZXMgPSByZXMuc2xpY2Uoc2hpZnRWYWx1ZSk7XG4gICAgcmVzICs9IFwiXCIucGFkRW5kKHNoaWZ0VmFsdWUsIFwiMFwiKTtcblxuICAgIHJldHVybiByZXM7XG4gIH1cblxuICAvKipcbiAgICogQWRkIDIgYml0IHRvZ2V0aGVyIHdpdGggdGhlIGNhcnJ5XG4gICAqIEBwYXJhbSB4IFRoZSBmaXJzdCBiaXRcbiAgICogQHBhcmFtIHkgVGhlIHNlY29uZCBiaXRcbiAgICogQHBhcmFtIGNhcnJ5IFRoZSBjYXJyeVxuICAgKiBAcmV0dXJucyBUaGUgcmVzdWx0IHdpdGggdGhlIGNhcnJ5IFtiaXQsIGNhcnJ5XVxuICAgKi9cbiAgcHVibGljIGVsZW1lbnRhcnlBZGRpdGlvbih4OiBzdHJpbmcsIHk6IHN0cmluZywgY2FycnkgPSBcIlwiKTogc3RyaW5nW10ge1xuICAgIGNvbnN0IHJlcyA9IE51bWJlcih4KSArIE51bWJlcih5KSArIE51bWJlcihjYXJyeSk7XG5cbiAgICBzd2l0Y2ggKHJlcykge1xuICAgICAgLy8gYyA9IDEsIHggPSAxLCB5ID0gMVxuICAgICAgY2FzZSAzOlxuICAgICAgICByZXR1cm4gW1wiMVwiLCBcIjFcIl07XG4gICAgICBjYXNlIDI6XG4gICAgICAgIHJldHVybiBbXCIwXCIsIFwiMVwiXTtcbiAgICAgIGNhc2UgMTpcbiAgICAgICAgcmV0dXJuIFtcIjFcIiwgXCJcIl07XG4gICAgICAvLyBjID0gMCwgeCA9IDAsIHkgPSAwXG4gICAgICBjYXNlIDA6XG4gICAgICAgIHJldHVybiBbXCIwXCIsIFwiXCJdO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBBZGQgMiBiaW5hcnkgbnVtYmVyc1xuICAgKiBAcGFyYW0gYjEgVGhlIGZpcnN0IGJpbmFyeSBudW1iZXJcbiAgICogQHBhcmFtIGIyIFRoZSBzZWNvbmQgYmluYXJ5IG51bWJlclxuICAgKiBAcmV0dXJucyBUaGUgcmVzdWx0IG9mIHRoZSBhZGRpdGlvbiBbYmluYXJ5TnVtYmVyLCBjYXJyeUJpdF1cbiAgICovXG4gIHB1YmxpYyBiaW5hcnlBZGRpdGlvbihiMTogc3RyaW5nLCBiMjogc3RyaW5nKSB7XG4gICAgbGV0IHJlcyA9IFwiXCI7XG4gICAgbGV0IGNhcnJ5ID0gXCJcIjtcbiAgICBjb25zdCBbYnAxLCBicDJdID0gdGhpcy5hZGRNYXhQYWRkaW5nKGIxLCBiMik7XG5cbiAgICBmb3IgKGxldCBpID0gYnAxLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICBjb25zdCBbciwgY10gPSB0aGlzLmVsZW1lbnRhcnlBZGRpdGlvbihicDFbaV0sIGJwMltpXSwgY2FycnkpO1xuICAgICAgcmVzID0gciArIHJlcztcbiAgICAgIGNhcnJ5ID0gYztcbiAgICB9XG5cbiAgICByZXR1cm4gW3JlcywgY2FycnldO1xuICB9XG5cbiAgLyoqXG4gICAqIFN1YnN0cmFjdCAyIGJpbmFyeSBudW1iZXJzXG4gICAqIEBwYXJhbSBiMSBUaGUgZmlyc3QgYmluYXJ5IG51bWJlclxuICAgKiBAcGFyYW0gYjIgVGhlIHNlY29uZCBiaW5hcnkgbnVtYmVyXG4gICAqIEByZXR1cm5zIFRoZSByZXN1bHQgb2YgdGhlIHN1YnN0cmFjdGlvbiBbYmluYXJ5TnVtYmVyLCBjYXJyeUJpdF1cbiAgICovXG4gIHB1YmxpYyBiaW5hcnlTdWJzdHJhY3Rpb24oYjE6IHN0cmluZywgYjI6IHN0cmluZykge1xuICAgIGNvbnN0IFticDEsIGJwMl0gPSB0aGlzLmFkZE1heFBhZGRpbmcoYjEsIGIyKTtcbiAgICByZXR1cm4gdGhpcy5iaW5hcnlBZGRpdGlvbihicDEsIHRoaXMuYzIoYnAyKS5yZXZlcnNlKCkuam9pbihcIlwiKSk7XG4gIH1cblxuICAvKipcbiAgICogUGVyZm9ybSBhIDIncyBjb21wbGVtZW50IG9wZXJhdGlvbiB3aXRob3V0IHRoZSBjYXJyeVxuICAgKiBAcGFyYW0gYiBUaGUgYmluYXJ5IG51bWJlclxuICAgKiBAcmV0dXJucyBUaGUgMidzIGNvbXBsZW1lbnQgb2YgdGhlIGJpbmFyeSBudW1iZXIgW2JpbmFyeU51bWJlciwgY2FycnldXG4gICAqL1xuICBwdWJsaWMgYzIoYjogc3RyaW5nKTogc3RyaW5nW10ge1xuICAgIGIgPSB0aGlzLmludmVydChiKTtcbiAgICByZXR1cm4gdGhpcy5hZGROdW1iZXJUb0JpbmFyeShiLCAxKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBNdWx0aXBseSAyIGJpbmFyeSBudW1iZXJzXG4gICAqIEBwYXJhbSBiMSBUaGUgZmlyc3QgYmluYXJ5IG51bWJlclxuICAgKiBAcGFyYW0gYjIgVGhlIHNlY29uZCBiaW5hcnkgbnVtYmVyXG4gICAqIEByZXR1cm5zIFRoZSByZXN1bHQgb2YgdGhlIG11bHRpcGxpY2F0aW9uXG4gICAqL1xuICBwdWJsaWMgYmluYXJ5TXVsdGlwbGljYXRpb24oYjE6IHN0cmluZywgYjI6IHN0cmluZykge1xuICAgIGxldCByZXMgPSBcIlwiO1xuICAgIGNvbnN0IGFkZFJlc3VsdHMgPSBbXTtcblxuICAgIC8vIFRoZSBiaW5hcnkgbnVtYmVycyB0byBtdWxpdHBseVxuICAgIC8vIGJwMSA9IDEwMTFcbiAgICAvLyBicDIgPSAxMTExXG4gICAgY29uc3QgW2JwMSwgYnAyXSA9IHRoaXMuYWRkTWF4UGFkZGluZyhiMSwgYjIpO1xuXG4gICAgLy8gQ2FsY3VsYXRlIHRoZSBvcGVyYW5kc1xuICAgIC8vIGFkZFJlc3VsdHMgPSBbXG4gICAgLy8gICAgMDAwMCAxMDExLFxuICAgIC8vICAgIDAwMDEgMDExMCxcbiAgICAvLyAgICAwMDEwIDExMDAsXG4gICAgLy8gICAgMTAxMSAwMDAwXG4gICAgLy8gXVxuICAgIGZvciAobGV0IGkgPSBicDEubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgIGxldCBjdXJyZW50UmVzID0gXCJcIjtcblxuICAgICAgZm9yIChsZXQgaiA9IGJwMS5sZW5ndGggLSAxOyBqID49IDA7IGotLSkge1xuICAgICAgICBjdXJyZW50UmVzID0gKE51bWJlcihicDFbal0pICogTnVtYmVyKGJwMltpXSkpICsgY3VycmVudFJlcztcbiAgICAgIH1cblxuICAgICAgY29uc3QgZGVjID0gdGhpcy5iaW5hcnlUb0RlY2ltYWwoY3VycmVudFJlcykgPDwgKGJwMS5sZW5ndGggLSAxIC0gaSk7XG4gICAgICBjdXJyZW50UmVzID0gdGhpcy5kZWNpbWFsVG9CaW5hcnkoZGVjKTtcbiAgICAgIGFkZFJlc3VsdHMucHVzaChjdXJyZW50UmVzKTtcbiAgICB9XG5cbiAgICAvLyBBZGQgZXZlcnl0aGluZ1xuICAgIC8vIHJlcyA9XG4gICAgLy8gICAwMDAwIDEwMTEsXG4gICAgLy8gKyAwMDAxIDAxMTAsXG4gICAgLy8gKyAwMDEwIDExMDAsXG4gICAgLy8gKyAxMDExIDAwMDBcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFkZFJlc3VsdHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IGFkZFJlc3VsdCA9IHRoaXMuYWRkUGFkZGluZyhhZGRSZXN1bHRzW2FkZFJlc3VsdHMubGVuZ3RoIC0gMV0ubGVuZ3RoLCBhZGRSZXN1bHRzW2ldKTtcbiAgICAgIGNvbnN0IFtyLCBjXSA9IHRoaXMuYmluYXJ5QWRkaXRpb24ocmVzLCBhZGRSZXN1bHQpO1xuICAgICAgcmVzID0gYyArIHI7XG4gICAgfVxuXG4gICAgLy8gcmVzID0gMTAxMDAxMDFcbiAgICByZXR1cm4gcmVzO1xuICB9XG59XG4iLCJpbXBvcnQgeyBCaW5hcnlIZWxwZXIgfSBmcm9tIFwiLi9CaW5hcnlIZWxwZXJcIjtcblxuLyoqXG4gKiBFbmNvZGUgYSBmbG9hdGluZyBudW1iZXIgd2l0aCBhIGNob29zZW4gYml0IHNpemUgYW5kIElFRUUgNzU0XG4gKi9cbmV4cG9ydCBjbGFzcyBCaW5hcnlGbG9hdCB7XG4gIHByaXZhdGUgX2JpdHNTaXplID0gMzI7XG4gIHByaXZhdGUgX251bWJlciA9IDA7XG4gIHByaXZhdGUgX2JpbmFyeVNpZ246IFwiMVwiIHwgXCIwXCIgPSBcIjBcIjtcbiAgcHJpdmF0ZSBfYmluYXJ5TWFudGlzc2EgPSBcIlwiO1xuICBwcml2YXRlIF9vdmVyZmxvdyA9IGZhbHNlO1xuICBwcml2YXRlIF9tYW50aXNzYURvdFBvc2l0aW9uID0gMDtcbiAgcHJpdmF0ZSBfYmluYXJ5RXhwb25lbnQgPSBcIlwiO1xuICBwcml2YXRlIF9iaWFzID0gMDtcbiAgcHJpdmF0ZSBfYmggPSBuZXcgQmluYXJ5SGVscGVyKCk7XG5cbiAgY29uc3RydWN0b3IobnVtYmVyT3JCaW5hcnk6IHN0cmluZyk7XG4gIGNvbnN0cnVjdG9yKG51bWJlck9yQmluYXJ5OiBudW1iZXIsIGJpdHNTaXplOiBudW1iZXIpO1xuICBjb25zdHJ1Y3RvcihudW1iZXJPckJpbmFyeTogbnVtYmVyIHwgc3RyaW5nLCBiaXRzU2l6ZT86IG51bWJlcikge1xuICAgIGlmICh0eXBlb2YgbnVtYmVyT3JCaW5hcnkgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIC8vIFJlbW92ZSB0aGUgc3BhY2VzIGluIHRoZSBzdHJpbmdcbiAgICAgIG51bWJlck9yQmluYXJ5ID0gbnVtYmVyT3JCaW5hcnkudHJpbSgpO1xuICAgICAgbnVtYmVyT3JCaW5hcnkgPSBudW1iZXJPckJpbmFyeS5yZXBsYWNlKC9cXHMvZywgXCJcIik7XG4gICAgICB0aGlzLmJpdHNTaXplID0gbnVtYmVyT3JCaW5hcnkubGVuZ3RoO1xuICAgICAgdGhpcy5udW1iZXIgPSAxO1xuXG4gICAgICAvLyBTbGljZSB0aGUgc3RyaW5nIHRvIGFzc2lnbiB0aGUgYmluYXJ5IG51bWJlciB0byB0aGUgY29ycmVjdCBwYXJ0IG9mIHRoZSBiaW5hcnkgcmVwcmVzZW50YXRpb24gb2YgdGhlIGZsb2F0XG4gICAgICB0aGlzLmJpbmFyeVNpZ24gPSBudW1iZXJPckJpbmFyeVswXSBhcyBcIjBcIiB8IFwiMVwiO1xuICAgICAgdGhpcy5iaW5hcnlFeHBvbmVudCA9IG51bWJlck9yQmluYXJ5LnNsaWNlKDEsIHRoaXMuZXhwb25lbnRCaXRzU2l6ZSArIDEpO1xuICAgICAgdGhpcy5iaW5hcnlNYW50aXNzYSA9IG51bWJlck9yQmluYXJ5LnNsaWNlKHRoaXMuZXhwb25lbnRCaXRzU2l6ZSArIDEsIHRoaXMuYml0c1NpemUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmJpdHNTaXplID0gYml0c1NpemU7XG4gICAgICB0aGlzLm51bWJlciA9IG51bWJlck9yQmluYXJ5O1xuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBnZXRJbmZpbml0eShiaXRzU2l6ZTogbnVtYmVyKSB7XG4gICAgcmV0dXJuIG5ldyBCaW5hcnlGbG9hdChJbmZpbml0eSwgYml0c1NpemUpO1xuICB9XG5cbiAgc3RhdGljIGdldE5hTihiaXRzU2l6ZTogbnVtYmVyKSB7XG4gICAgcmV0dXJuIG5ldyBCaW5hcnlGbG9hdChOYU4sIGJpdHNTaXplKTtcbiAgfVxuXG4gIHN0YXRpYyBnZXRaZXJvKGJpdHNTaXplOiBudW1iZXIpIHtcbiAgICByZXR1cm4gbmV3IEJpbmFyeUZsb2F0KDAsIGJpdHNTaXplKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgZmxvYXQgbnVtYmVyIHRvIGNvZGVkIHdpdGggSUVFRSA3NTRcbiAgICovXG4gIGdldCBudW1iZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMuX251bWJlcjtcbiAgfVxuXG4gIHNldCBudW1iZXIodmFsdWU6IG51bWJlcikge1xuICAgIHRoaXMuX251bWJlciA9IHZhbHVlO1xuXG4gICAgdGhpcy5jYWxjdWxhdGVCaW5hcnlTaWduKCk7XG4gICAgdGhpcy5jYWxjdWxhdGVCaWFzKCk7XG4gICAgdGhpcy5jYWxjdWxhdGVCaW5hcnlNYW50aXNzYSgpO1xuICAgIHRoaXMuY2FsY3VsYXRlQmluYXJ5RXhwb25lbnQoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgYml0IHNpemUgdG8gY29kZSB0aGUgbnVtYmVyXG4gICAqL1xuICBnZXQgYml0c1NpemUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2JpdHNTaXplO1xuICB9XG5cbiAgc2V0IGJpdHNTaXplKHZhbHVlOiBudW1iZXIpIHtcbiAgICB0aGlzLl9iaXRzU2l6ZSA9IHZhbHVlO1xuXG4gICAgaWYgKHZhbHVlID4gODApIHtcbiAgICAgIHRoaXMuX2JpdHNTaXplID0gODA7XG4gICAgfVxuXG4gICAgaWYgKHZhbHVlIDwgOCkge1xuICAgICAgdGhpcy5fYml0c1NpemUgPSA4O1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIG1hbnRpc3NhIGJpdHMgc2l6ZVxuICAgKi9cbiAgZ2V0IG1hbnRpc3NhQml0c1NpemUoKSB7XG4gICAgaWYgKHRoaXMuYml0c1NpemUgPCA4KSB7XG4gICAgICByZXR1cm4gMDtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5iaXRzU2l6ZSAtIHRoaXMuZXhwb25lbnRCaXRzU2l6ZSAtIDE7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBleHBvbmVudCBiaXRzIHNpemUgd2l0aDpcbiAgICogLSBUaGUgSUVFRSA3NTQgMjAxOSBmb3JtdWxhIGlmIHRoZSBiaXRzIHNpemUgaXMgZ3JlYXRlciBvciBlcXVhbCB0byAxMjhcbiAgICogLSBBIGN1c3RvbSBmb3JtdWxhIGlmIHRoZSBiaXQgc2l6ZSBpcyBsZXNzIHRoYW4gMTI4IHRoYXQgbWF0Y2hlcyB0aGUgSUVFRSBzdGFuZGFyZFxuICAgKiBcbiAgICogVmlzdWFsaXplIHRoZSBmdW5jdGlvbiBvbiBnZW9nZWJyYTpcbiAgICogaHR0cHM6Ly93d3cuZ2VvZ2VicmEub3JnL2NhbGN1bGF0b3IvY2VycmtkZnZcbiAgICovXG4gIGdldCBleHBvbmVudEJpdHNTaXplKCkge1xuICAgIGlmICh0aGlzLmJpdHNTaXplIDwgOCkge1xuICAgICAgcmV0dXJuIDA7XG4gICAgfVxuXG4gICAgLy8gSUVFRSA3NTQgMjAxOSBmb3JtdWxhID49IDEyOFxuICAgIGlmICh0aGlzLmJpdHNTaXplID49IDEyOCkge1xuICAgICAgcmV0dXJuIE1hdGgucm91bmQoNCAqIE1hdGgubG9nMih0aGlzLmJpdHNTaXplKSkgLSAxMztcbiAgICB9XG5cbiAgICAvLyBBIGZvcm11bGEgdGhhdCBtYXRjaGVzIHRoZSB2YWx1ZXMgZm9yIDwgMTI4XG4gICAgLy8gcmVmOiBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL2EvNjI2MzIyNjBcbiAgICByZXR1cm4gTWF0aC5yb3VuZCgoTWF0aC5sb2cyKHRoaXMuYml0c1NpemUpIC0gMSkgKiogKDMgLyAyKSk7XG4gIH1cblxuICBnZXQgcG9zaXRpdmVOdW1iZXIoKSB7XG4gICAgcmV0dXJuIE1hdGguYWJzKHRoaXMubnVtYmVyKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDYWxjdWxhdGUgdGhlIHBvc2l0aW9uIG9mIHRoZSBkb3QgaW4gdGhlIG1hbnRpc3NhXG4gICAqICAgICAgICAgICAgZmxvYXQgcG9zaXRpb25cbiAgICogICAgICAgICAgICAgICAgICB8XG4gICAqICAgICAgICAgICAgICAgICAgdlxuICAgKiBtYW50aXNzYSgxOS41OTM3NSkgPT4gXCIwMDExLjEwMDExMDAwMDAwMDAwMDAwMDBcIlxuICAgKi9cbiAgZ2V0IG1hbnRpc3NhRG90UG9zaXRpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuX21hbnRpc3NhRG90UG9zaXRpb247XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBleHBvbmVudCBvZiB0aGUgbnVtYmVyIGluIGJpbmFyeSB3aXRoIHRoZSBiaWFzXG4gICAqIG1hbnRpc3NhKDE5LjU5Mzc1KSA9PiBcIjEwMDAwMDEwXCJcbiAgICovXG4gIGdldCBiaW5hcnlFeHBvbmVudCgpIHtcbiAgICByZXR1cm4gdGhpcy5fYmluYXJ5RXhwb25lbnQ7XG4gIH1cblxuICBzZXQgYmluYXJ5RXhwb25lbnQodmFsdWU6IHN0cmluZykge1xuICAgIHRoaXMuX2JpbmFyeUV4cG9uZW50ID0gdmFsdWU7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJuIHRoZSBiaWFzIG9mIHRoZSBudW1iZXIgYmFzZWQgb24gdGhlIGV4cG9uZW50IGJpdCBzaXplXG4gICAqIGIgPSAyIF4gKGV4cG9uZW50Qml0c1NpemUgLSAxKSAtIDFcbiAgICovXG4gIGdldCBiaWFzKCkge1xuICAgIHJldHVybiB0aGlzLl9iaWFzO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgZnVsbCBtYW50aXNzYSBvZiB0aGUgbnVtYmVyXG4gICAqL1xuICBnZXQgYmluYXJ5TWFudGlzc2EoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2JpbmFyeU1hbnRpc3NhO1xuICB9XG5cbiAgc2V0IGJpbmFyeU1hbnRpc3NhKHZhbHVlOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9iaW5hcnlNYW50aXNzYSA9IHZhbHVlO1xuICAgIHRoaXMuX292ZXJmbG93ID0gdmFsdWUubGVuZ3RoID4gdGhpcy5tYW50aXNzYUJpdHNTaXplO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgZnVsbCBudW1iZXIgY29kZWQgaW4gYmluYXJ5IHdpdGggSUVFRSA3NTRcbiAgICovXG4gIGdldCBiaW5hcnlGbG9hdGluZ051bWJlcigpIHtcbiAgICByZXR1cm4gdGhpcy5iaW5hcnlTaWduICsgdGhpcy5iaW5hcnlFeHBvbmVudCArIHRoaXMuYmluYXJ5TWFudGlzc2E7XG4gIH1cblxuICAvKipcbiAgICogVGhlIHNpZ24gaW4gaXQncyBkZWNpbWFsIGZvcm1cbiAgICovXG4gIGdldCBjb21wdXRlZFNpZ24oKSB7XG4gICAgcmV0dXJuIHRoaXMuYmluYXJ5U2lnbiA9PT0gXCIxXCIgPyAtMSA6IDE7XG4gIH1cblxuICAvKipcbiAgICogVGhlIGV4cG9uZW50IGluIGl0J3MgZGVjaW1hbCBmb3JtXG4gICAqL1xuICBnZXQgY29tcHV0ZWRFeHBvbmVudCgpIHtcbiAgICByZXR1cm4gdGhpcy5fYmguYmluYXJ5VG9EZWNpbWFsKHRoaXMuYmluYXJ5RXhwb25lbnQpIC0gdGhpcy5iaWFzO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoZSBtYW50aXNzYSBpbiBpdCdzIGRlY2ltYWwgZm9ybVxuICAgKi9cbiAgZ2V0IGNvbXB1dGVkTWFudGlzc2EoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2JoLmJpbmFyeVRvRGVjaW1hbChcIjFcIiArIHRoaXMuYmluYXJ5TWFudGlzc2EpIC8gMiAqKiB0aGlzLm1hbnRpc3NhQml0c1NpemU7XG4gIH1cblxuICBnZXQgaXNOYU4oKSB7XG4gICAgY29uc3QgaXNOYU5CaW5hcnkgPSAoXG4gICAgICB0aGlzLmJpbmFyeUV4cG9uZW50LmluZGV4T2YoXCIwXCIpID09PSAtMSAmJlxuICAgICAgdGhpcy5iaW5hcnlNYW50aXNzYS5pbmRleE9mKFwiMFwiKSA9PT0gLTEgJiZcbiAgICAgIHRoaXMuYmluYXJ5U2lnbiA9PT0gXCIwXCJcbiAgICApO1xuXG4gICAgcmV0dXJuIE51bWJlci5pc05hTih0aGlzLm51bWJlcikgfHwgaXNOYU5CaW5hcnk7XG4gIH1cblxuICBnZXQgaXNJbmZpbml0eSgpIHtcbiAgICBjb25zdCBpc0luZmluaXR5QmluYXJ5ID0gKFxuICAgICAgdGhpcy5iaW5hcnlFeHBvbmVudC5pbmRleE9mKFwiMFwiKSA9PT0gLTEgJiZcbiAgICAgIHRoaXMuYmluYXJ5TWFudGlzc2EuaW5kZXhPZihcIjFcIikgPT09IC0xICYmXG4gICAgICB0aGlzLmJpbmFyeVNpZ24gPT09IFwiMFwiXG4gICAgKTtcblxuICAgIHJldHVybiB0aGlzLm51bWJlciA9PT0gSW5maW5pdHkgfHwgaXNJbmZpbml0eUJpbmFyeTtcbiAgfVxuXG4gIGdldCBpc1plcm8oKSB7XG4gICAgY29uc3QgaXNaZXJvQmluYXJ5ID0gKFxuICAgICAgdGhpcy5iaW5hcnlFeHBvbmVudC5pbmRleE9mKFwiMVwiKSA9PT0gLTEgJiZcbiAgICAgIHRoaXMuYmluYXJ5TWFudGlzc2EuaW5kZXhPZihcIjFcIikgPT09IC0xICYmXG4gICAgICB0aGlzLmJpbmFyeVNpZ24gPT09IFwiMFwiXG4gICAgKTtcblxuICAgIHJldHVybiB0aGlzLm51bWJlciA9PT0gMCB8fCBpc1plcm9CaW5hcnk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBhYnNvbHV0ZSB2YWx1ZSBvZiB0aGUgbnVtYmVyIGluIGJpbmFyeVxuICAgKi9cbiAgZ2V0IGJpbmFyeUFicygpIHtcbiAgICByZXR1cm4gXCIwXCIgKyB0aGlzLmJpbmFyeUV4cG9uZW50ICsgdGhpcy5iaW5hcnlNYW50aXNzYTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgbnVtYmVyIHRoYXQgaXMgY29kZWQgaW4gbWVtb3J5XG4gICAqL1xuICBnZXQgY29tcHV0ZWROdW1iZXIoKSB7XG4gICAgaWYgKHRoaXMuaXNaZXJvKSB7XG4gICAgICByZXR1cm4gMDtcbiAgICB9IGVsc2UgaWYgKHRoaXMuaXNOYU4pIHtcbiAgICAgIHJldHVybiBOYU47XG4gICAgfSBlbHNlIGlmICh0aGlzLmlzSW5maW5pdHkpIHtcbiAgICAgIHJldHVybiBJbmZpbml0eTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5jb21wdXRlZFNpZ24gKiAyICoqIHRoaXMuY29tcHV0ZWRFeHBvbmVudCAqIHRoaXMuY29tcHV0ZWRNYW50aXNzYTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIG1hcmdpbiBvZiBlcnJvclxuICAgKi9cbiAgZ2V0IGVycm9yKCkgeyAgICBcbiAgICBpZiAoTnVtYmVyLmlzTmFOKHRoaXMubnVtYmVyKSB8fCB0aGlzLm51bWJlciA9PT0gSW5maW5pdHkgfHwgdGhpcy5udW1iZXIgPT09IDApIHtcbiAgICAgIHJldHVybiAwO1xuICAgIH1cblxuICAgIHJldHVybiBNYXRoLmFicyh0aGlzLm51bWJlciAtIHRoaXMuY29tcHV0ZWROdW1iZXIpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybiB0aGUgYmluYXJ5IHJlcHJlc2VudGF0aW9uIG9mIHRoZSBzaWduXG4gICAqIDAgaWYgbnVtYmVyID49IDBcbiAgICogMSBpZiBudW1iZXIgPCAwXG4gICAqL1xuICBnZXQgYmluYXJ5U2lnbigpOiBcIjBcIiB8IFwiMVwiIHtcbiAgICByZXR1cm4gdGhpcy5fYmluYXJ5U2lnbjtcbiAgfVxuXG4gIHNldCBiaW5hcnlTaWduKHZhbHVlOiBcIjBcIiB8IFwiMVwiKSB7XG4gICAgdGhpcy5fYmluYXJ5U2lnbiA9IHZhbHVlO1xuICB9XG5cbiAgLyoqXG4gICAqIFRydWUgaWYgdGhlIG51bWJlciBjYW5ub3QgYmUgZW5jb2RlZCBpbiA8Yml0c1NpemU+IGJpdHNcbiAgICovXG4gIGdldCBvdmVyZmxvdygpIHtcbiAgICByZXR1cm4gdGhpcy5fb3ZlcmZsb3c7XG4gIH1cblxuICAvKipcbiAgICogRGV0ZXJtaW5lIHRoZSBiaW5hcnkgc2lnbiBvZiB0aGUgbnVtYmVyXG4gICAqL1xuICBwcml2YXRlIGNhbGN1bGF0ZUJpbmFyeVNpZ24oKSB7XG4gICAgdGhpcy5fYmluYXJ5U2lnbiA9IHRoaXMubnVtYmVyIDwgMCA/IFwiMVwiIDogXCIwXCI7XG4gIH1cblxuICAvKipcbiAgICogQ2FsY3VsYXRlIHRoZSBleHBvbmVudCBiaWFzIGJhc2VkIG9uIHRoZSBleHBvbmVudCBiaXQgc2l6ZVxuICAgKiBiID0gMiBeIChleHBvbmVudEJpdHNTaXplIC0gMSkgLSAxO1xuICAgKi9cbiAgcHJpdmF0ZSBjYWxjdWxhdGVCaWFzKCkge1xuICAgIHRoaXMuX2JpYXMgPSAyICoqICh0aGlzLmV4cG9uZW50Qml0c1NpemUgLSAxKSAtIDE7XG4gIH1cblxuICAvKipcbiAgICogRGV0ZXJtaW5lIHRoZSBiaW5hcnkgbWFudGlzc2EgYW5kIGRldGVybWluZSB0aGUgZG90IHBvc2l0aW9uIGluIHRoZSBtYW50aXNzYVxuICAgKi9cbiAgcHJpdmF0ZSBjYWxjdWxhdGVCaW5hcnlNYW50aXNzYSgpIHtcbiAgICBpZiAoTnVtYmVyLmlzTmFOKHRoaXMubnVtYmVyKSkge1xuICAgICAgdGhpcy5fbWFudGlzc2FEb3RQb3NpdGlvbiA9IDA7XG4gICAgICB0aGlzLl9iaW5hcnlNYW50aXNzYSA9IFwiXCIucGFkRW5kKHRoaXMubWFudGlzc2FCaXRzU2l6ZSwgXCIxXCIpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIEdldCB0aGUgaW50ZWdlciBwYXJ0XG4gICAgY29uc3QgaW50ZWdlclBhcnQgPSBNYXRoLnRydW5jKHRoaXMucG9zaXRpdmVOdW1iZXIpO1xuXG4gICAgLy8gR2V0IHRoZSBkZWNpbWFscyBvZiB0aGUgbnVtYmVyOiBkZWNpbWFscyA9IDE5LjU5Mzc1IC0gMTkgPSAwLjU5Mzc1XG4gICAgbGV0IGRlY2ltYWxzUGFydCA9IHRoaXMucG9zaXRpdmVOdW1iZXIgLSBNYXRoLnRydW5jKHRoaXMucG9zaXRpdmVOdW1iZXIpO1xuXG4gICAgY29uc3QgYmluYXJ5SW50ZWdlclBhcnQgPSB0aGlzLl9iaC5kZWNpbWFsVG9CaW5hcnkoaW50ZWdlclBhcnQpO1xuXG4gICAgLy8gR2V0IHRoZSBudW1iZXIgb2YgYml0cyBkZWRpY2F0ZWQgdG8gc3RvcmUgdGhlIGRlY2ltYWxzIGluIHRoZSBtYW50aXNzYVxuICAgIGNvbnN0IGRlY2ltYWxzQml0c1NpemUgPSB0aGlzLm1hbnRpc3NhQml0c1NpemUgLSBiaW5hcnlJbnRlZ2VyUGFydC5sZW5ndGggLSAxO1xuICAgIFxuICAgIGxldCBiaW5hcnlEZWNpbWFsc1BhcnQgPSBcIlwiO1xuICAgIC8vIDAuNTkzNzUgKiAyID0gMS4xODc1ICA9PiAxXG4gICAgLy8gMC4xODc1ICAqIDIgPSAwLjM3NSAgID0+IDBcbiAgICAvLyAwLjM3NSAgICogMiA9IDAuNzUgICAgPT4gMFxuICAgIC8vIDAuNzUgICAgKiAyID0gMS41ICAgICA9PiAxXG4gICAgLy8gMC41ICAgICAqIDIgPSAxICAgICAgID0+IDFcbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgZGVjaW1hbHNCaXRzU2l6ZTsgaSsrKSB7XG4gICAgICBkZWNpbWFsc1BhcnQgKj0gMjtcblxuICAgICAgaWYgKGRlY2ltYWxzUGFydCA+PSAxKSB7XG4gICAgICAgIGRlY2ltYWxzUGFydCAtPSAxO1xuICAgICAgICBiaW5hcnlEZWNpbWFsc1BhcnQgKz0gXCIxXCI7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBiaW5hcnlEZWNpbWFsc1BhcnQgKz0gXCIwXCI7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbGV0IGJpbmFyeU1hbnRpc3NhID0gYmluYXJ5SW50ZWdlclBhcnQgKyBiaW5hcnlEZWNpbWFsc1BhcnQ7XG5cbiAgICAvLyBHZXQgdGhlIHBvc2l0aW9uIG9mIHRoZSBmaXJzdCBiaXQgYXQgMSwgZm9yIG9ubHkgZGVjaW1hbHMgbnVtYmVyXG4gICAgbGV0IG1hbnRpc3NhRG90UG9zaXRpb24gPSAtYmluYXJ5TWFudGlzc2EuaW5kZXhPZihcIjFcIik7XG5cbiAgICAvLyBSZW1vdmUgYWxsIHRoZSBsZWFkaW5nIGJpdCBhdCAwIGZyb20gdGhlIG1hbnRpc3NhXG4gICAgYmluYXJ5TWFudGlzc2EgPSB0aGlzLl9iaC5jbGVhbihiaW5hcnlNYW50aXNzYSk7XG5cbiAgICAvLyBJZiB0aGUgcG9zaXRpb24gb2YgdGhlIGZpcnN0IGJpdCBhdCAxIGlzIDBcbiAgICAvLyB0aGVuIHRoZSBkb3QgcG9zaXRpb24gaXMgZXF1YWxzIHRvIHRoZSBsZW5ndGggb2YgdGhlIGJpbmFyeSBpbnRlZ2VyIHBhcnQgb2YgdGhlIG1hbnRpc3NhXG4gICAgaWYgKG1hbnRpc3NhRG90UG9zaXRpb24gPT09IDApIHtcbiAgICAgIG1hbnRpc3NhRG90UG9zaXRpb24gPSBiaW5hcnlJbnRlZ2VyUGFydC5sZW5ndGggLSAxO1xuICAgIH1cblxuICAgIC8vIEhpZGUgdGhlIGZpcnN0IGJpdCBhdCAxXG4gICAgYmluYXJ5TWFudGlzc2EgPSBiaW5hcnlNYW50aXNzYS5zdWJzdHJpbmcoMSk7XG5cbiAgICAvLyBNYWtlIHN1cmUgdGhhdCB0aGUgbWFudGlzc2EgbWF0Y2hlcyB0aGUgY29ycmVjdCBsZW5ndGggKDIzIGZvciAzMiBiaXRzIGZvciBleGFtcGxlKVxuICAgIGJpbmFyeU1hbnRpc3NhID0gYmluYXJ5TWFudGlzc2EucGFkRW5kKHRoaXMubWFudGlzc2FCaXRzU2l6ZSwgXCIwXCIpO1xuXG4gICAgdGhpcy5iaW5hcnlNYW50aXNzYSA9IGJpbmFyeU1hbnRpc3NhO1xuICAgIHRoaXMuX21hbnRpc3NhRG90UG9zaXRpb24gPSBtYW50aXNzYURvdFBvc2l0aW9uO1xuICB9XG5cbiAgLyoqXG4gICAqIENhbGN1bGF0ZSB0aGUgZXhwb25lbnQgaW4gYmluYXJ5XG4gICAqIGUgPSBiaW5hcnkobWFudGlzc2FGbG9hdFBvc2l0aW9uICsgYmlhcylcbiAgICovXG4gIHByaXZhdGUgY2FsY3VsYXRlQmluYXJ5RXhwb25lbnQoKSB7XG4gICAgLy8gSWYgdGhlIG51bWJlciBpcyBOYU4gb3IgSW5maW5pdHkgdGhlbiBhbGwgdGhlIGJpdHMgb2YgdGhlIGV4cG9uZW50IGFyZSBlcXVhbHMgdG8gMVxuICAgIGlmIChOdW1iZXIuaXNOYU4odGhpcy5udW1iZXIpIHx8IHRoaXMubnVtYmVyID09PSBJbmZpbml0eSkge1xuICAgICAgdGhpcy5fYmluYXJ5RXhwb25lbnQgPSBcIlwiLnBhZEVuZCh0aGlzLmV4cG9uZW50Qml0c1NpemUsIFwiMVwiKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBsZXQgZXhwb25lbnQgPSB0aGlzLm1hbnRpc3NhRG90UG9zaXRpb24gKyB0aGlzLmJpYXM7XG5cbiAgICAvLyBJZiB0aGUgbnVtYmVyIGlzIDAgdGhlbiBhbGwgdGhlIGJpdHMgb2YgdGhlIGV4cG9uZW50IGFyZSBlcXVhbHMgdG8gMFxuICAgIGlmICh0aGlzLm51bWJlciA9PT0gMCkge1xuICAgICAgZXhwb25lbnQgPSAwO1xuICAgIH1cblxuICAgIC8vIENvbnZlcnQgdGhlIGV4cG9uZW50IHRvIGJpbmFyeSBhbmQgYWRkIGxlYWRpbmcgMCB0byBtYXRjaCB0aGUgZXhwb25lbnQgYml0cyBzaXplXG4gICAgdGhpcy5fYmluYXJ5RXhwb25lbnQgPSB0aGlzLl9iaC5kZWNpbWFsVG9CaW5hcnkoZXhwb25lbnQpLnBhZFN0YXJ0KHRoaXMuZXhwb25lbnRCaXRzU2l6ZSwgXCIwXCIpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZCB0d28gYmluYXJ5IGZsb2F0IG51bWJlclxuICAgKiBAcGFyYW0gYmYyIFRoZSBiaW5hcnkgZmxvYXQgbnVtYmVyIHRvIGFkZFxuICAgKiBAcmV0dXJucyBUaGUgcmVzdWx0IG9mIHRoZSBhZGRpdGlvblxuICAgKi9cbiAgYWRkKGJmMjogQmluYXJ5RmxvYXQpIHtcbiAgICBjb25zdCBiZlJlcyA9IG5ldyBCaW5hcnlGbG9hdCgxLCB0aGlzLmJpdHNTaXplKTtcblxuICAgIC8vIFNwZWNpYWwgY2FzZXNcbiAgICBpZiAodGhpcy5pc05hTiB8fCBiZjIuaXNOYU4pIHtcbiAgICAgIHJldHVybiBCaW5hcnlGbG9hdC5nZXROYU4odGhpcy5iaXRzU2l6ZSk7XG4gICAgfVxuICAgIGlmICh0aGlzLmlzSW5maW5pdHkgfHwgYmYyLmlzSW5maW5pdHkpIHtcbiAgICAgIHJldHVybiBCaW5hcnlGbG9hdC5nZXRJbmZpbml0eSh0aGlzLmJpdHNTaXplKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuYmluYXJ5QWJzID09PSBiZjIuYmluYXJ5QWJzICYmIHRoaXMuYmluYXJ5U2lnbiAhPT0gYmYyLmJpbmFyeVNpZ24pIHtcbiAgICAgIHJldHVybiBCaW5hcnlGbG9hdC5nZXRaZXJvKHRoaXMuYml0c1NpemUpO1xuICAgIH1cblxuICAgIC8vIFN0ZXAgMTogRGV0ZXJtaW5lIHRoZSBsb3dlc3QgZXhwb25lbnQgYmV0d2VlbiB0aGlzIGFuZCB0aGUgc2Vjb25kIG51bWJlclxuICAgIGxldCBiZk1pbkJpbmFyeUV4cG9uZW50OiBCaW5hcnlGbG9hdCA9IHRoaXM7XG4gICAgbGV0IGJmTWF4QmluYXJ5RXhwb25lbnQ6IEJpbmFyeUZsb2F0ID0gYmYyO1xuICAgIGlmICh0aGlzLl9iaC5iaW5hcnlUb0RlY2ltYWwoYmYyLmJpbmFyeUV4cG9uZW50KSA8IHRoaXMuX2JoLmJpbmFyeVRvRGVjaW1hbChiZk1pbkJpbmFyeUV4cG9uZW50LmJpbmFyeUV4cG9uZW50KSkge1xuICAgICAgYmZNaW5CaW5hcnlFeHBvbmVudCA9IGJmMjtcbiAgICAgIGJmTWF4QmluYXJ5RXhwb25lbnQgPSB0aGlzO1xuICAgIH1cbiAgICAvLyBDb3B5IHRoZSBudW1iZXIsIGRvIG5vdCBzZXQgYnkgcmVmZXJlbmNlXG4gICAgYmZNYXhCaW5hcnlFeHBvbmVudCA9IG5ldyBCaW5hcnlGbG9hdChiZk1heEJpbmFyeUV4cG9uZW50LmNvbXB1dGVkTnVtYmVyLCB0aGlzLmJpdHNTaXplKTtcbiAgICBiZk1pbkJpbmFyeUV4cG9uZW50ID0gbmV3IEJpbmFyeUZsb2F0KGJmTWluQmluYXJ5RXhwb25lbnQuY29tcHV0ZWROdW1iZXIsIHRoaXMuYml0c1NpemUpO1xuXG4gICAgLy8gSWYgdGhlcmUgaXMgYSAwIHRoZW4gcmV0dXJuIHRoZSBub24temVybyBudW1iZXJcbiAgICBpZiAoYmZNaW5CaW5hcnlFeHBvbmVudC5pc1plcm8pIHtcbiAgICAgIHJldHVybiBiZk1heEJpbmFyeUV4cG9uZW50O1xuICAgIH1cblxuICAgIC8vIEFkZCB0aGUgaGlkZGVuIGJpdFxuICAgIGJmTWluQmluYXJ5RXhwb25lbnQuYmluYXJ5TWFudGlzc2EgPSBcIjFcIiArIGJmTWluQmluYXJ5RXhwb25lbnQuYmluYXJ5TWFudGlzc2E7XG4gICAgYmZNYXhCaW5hcnlFeHBvbmVudC5iaW5hcnlNYW50aXNzYSA9IFwiMVwiICsgYmZNYXhCaW5hcnlFeHBvbmVudC5iaW5hcnlNYW50aXNzYTtcblxuICAgIC8vIFN0ZXAgMjogU2hpZnQgdGhlIG1hbnRpc3NhXG4gICAgY29uc3Qgc2hpZnRWYWx1ZSA9IGJmTWF4QmluYXJ5RXhwb25lbnQuY29tcHV0ZWRFeHBvbmVudCAtIGJmTWluQmluYXJ5RXhwb25lbnQuY29tcHV0ZWRFeHBvbmVudDtcbiAgICBjb25zdCBzaGlmdGVkTWluTWFudGlzc2EgPSB0aGlzLl9iaC5zaGlmdFJpZ2h0KGJmTWluQmluYXJ5RXhwb25lbnQuYmluYXJ5TWFudGlzc2EsIHNoaWZ0VmFsdWUpO1xuICAgIGJmTWluQmluYXJ5RXhwb25lbnQuYmluYXJ5TWFudGlzc2EgPSBzaGlmdGVkTWluTWFudGlzc2E7XG4gICAgXG4gICAgLy8gU3RlcCAzOiBQdXQgdGhlIHNhbWUgZXhwb25lbnRcbiAgICBiZlJlcy5iaW5hcnlFeHBvbmVudCA9IGJmTWF4QmluYXJ5RXhwb25lbnQuYmluYXJ5RXhwb25lbnQ7XG5cbiAgICAvLyBTdGVwIDQ6IDIncyBjb21wbGVtZW50IGlmIG5lZ2F0aXZlXG4gICAgaWYgKGJmTWluQmluYXJ5RXhwb25lbnQuY29tcHV0ZWRTaWduID09PSAtMSkge1xuICAgICAgYmZNaW5CaW5hcnlFeHBvbmVudC5iaW5hcnlNYW50aXNzYSA9IHRoaXMuX2JoLmMyKGJmTWluQmluYXJ5RXhwb25lbnQuYmluYXJ5TWFudGlzc2EpLnJldmVyc2UoKS5qb2luKFwiXCIpO1xuICAgIH1cbiAgICBpZiAoYmZNYXhCaW5hcnlFeHBvbmVudC5jb21wdXRlZFNpZ24gPT09IC0xKSB7XG4gICAgICBiZk1heEJpbmFyeUV4cG9uZW50LmJpbmFyeU1hbnRpc3NhID0gdGhpcy5fYmguYzIoYmZNYXhCaW5hcnlFeHBvbmVudC5iaW5hcnlNYW50aXNzYSkucmV2ZXJzZSgpLmpvaW4oXCJcIik7XG4gICAgfVxuXG4gICAgLy8gU3RlcCA1OiBBZGQgdGhlIG1hbnRpc3NhIGFuZCB0aGUgc2hpZnRlZCBvbmVcbiAgICBiZlJlcy5iaW5hcnlNYW50aXNzYSA9IHRoaXMuX2JoLmJpbmFyeUFkZGl0aW9uKFxuICAgICAgYmZNYXhCaW5hcnlFeHBvbmVudC5iaW5hcnlNYW50aXNzYSxcbiAgICAgIGJmTWluQmluYXJ5RXhwb25lbnQuYmluYXJ5TWFudGlzc2EsXG4gICAgKS5yZXZlcnNlKCkuam9pbihcIlwiKTtcblxuICAgIC8vIFN0ZXAgNjogRGV0ZXJtaW5lIHRoZSBzaWduIG9mIHRoZSByZXN1bHRcbiAgICBpZiAoYmZNYXhCaW5hcnlFeHBvbmVudC5jb21wdXRlZFNpZ24gIT09IGJmTWluQmluYXJ5RXhwb25lbnQuY29tcHV0ZWRTaWduKSB7XG4gICAgICBpZiAoYmZNYXhCaW5hcnlFeHBvbmVudC5jb21wdXRlZFNpZ24gPT09IC0xKSB7XG4gICAgICAgIGJmUmVzLmJpbmFyeVNpZ24gPSBcIjFcIjtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBTdGVwIDc6IE5vcm1hbGl6ZSB0aGUgbWFudGlzc2FcbiAgICAvLyBIaWRlIHRoZSBmaXJzdCBiaXRcbiAgICBiZlJlcy5iaW5hcnlNYW50aXNzYSA9IGJmUmVzLmJpbmFyeU1hbnRpc3NhLnN1YnN0cmluZygxKTtcblxuICAgIC8vIE5vcm1hbGl6ZSB0aGUgbWFudGlzc2EgaWYgdGhlcmUgaXMgYSBjYXJyeVxuICAgIGlmIChiZlJlcy5iaW5hcnlNYW50aXNzYS5sZW5ndGggLSBiZlJlcy5tYW50aXNzYUJpdHNTaXplID09PSAxKSB7XG4gICAgICAvLyBSZW1vdmUgdGhlIGxhc3QgYml0XG4gICAgICBiZlJlcy5iaW5hcnlNYW50aXNzYSA9IGJmUmVzLmJpbmFyeU1hbnRpc3NhLnNsaWNlKDAsIC0xKTtcblxuICAgICAgLy8gQWRkIDEgdG8gdGhlIGV4cG9uZW50XG4gICAgICBiZlJlcy5iaW5hcnlFeHBvbmVudCA9IHRoaXMuX2JoLmFkZE51bWJlclRvQmluYXJ5KGJmUmVzLmJpbmFyeUV4cG9uZW50LCAxKVswXTtcbiAgICB9XG5cbiAgICByZXR1cm4gYmZSZXM7XG4gIH1cbn1cbiIsImltcG9ydCB7IEJpbmFyeUZsb2F0IH0gZnJvbSBcIi4vY2xhc3Nlcy9CaW5hcnlGbG9hdFwiO1xuXG5jb25zdCBiZkJpbmFyeU51bWJlckVsZW1lbnQgPSA8SFRNTElucHV0RWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImJmLWJpbmFyeS1udW1iZXJcIik7XG5jb25zdCBiZlJlc3VsdEVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImJmLXJlc3VsdFwiKTtcbmNvbnN0IHJlZ2V4QmluYXJ5ID0gL15bMDFcXHNdKyQvO1xuXG5mdW5jdGlvbiBvbkNoYW5nZUNvbnZlcnRlckJmKCkge1xuICBjb25zdCBiaW5hcnlOdW1iZXIgPSBiZkJpbmFyeU51bWJlckVsZW1lbnQudmFsdWU7XG4gIFxuICBpZiAoYmZCaW5hcnlOdW1iZXJFbGVtZW50LnZhbHVlID09PSBcIlwiICkge1xuICAgIGJmUmVzdWx0RWxlbWVudC5pbm5lckhUTUwgPSBgPHNwYW4gY2xhc3M9XCJjb2xvci1ncmV5XCI+VmV1aWxsZXogcmVuc2VpZ25lciB0b3VzIGxlcyBjaGFtcHM8L3NwYW4+YDtcbiAgICByZXR1cm47XG4gIH1cblxuICBpZiAoIXJlZ2V4QmluYXJ5LnRlc3QoYmluYXJ5TnVtYmVyKSkge1xuICAgIGJmUmVzdWx0RWxlbWVudC5pbm5lckhUTUwgPSBgPHNwYW4gY2xhc3M9XCJjb2xvci1yZWRcIj5DZSBuJ2VzdCBwYXMgdW4gbm9tYnJlIGJpbmFpcmU8L3NwYW4+YDtcbiAgICByZXR1cm47XG4gIH1cbiAgXG4gIGNvbnN0IGJmID0gbmV3IEJpbmFyeUZsb2F0KGJpbmFyeU51bWJlcik7XG5cbiAgYmZSZXN1bHRFbGVtZW50LmlubmVySFRNTCA9IGBcbiAgICA8ZGl2IGNsYXNzPVwicmVzdWx0LWdyb3VwXCI+XG4gICAgICBUYWlsbGUgZW4gYml0cyB0b3RhbDogJHtiZi5iaXRzU2l6ZX1cbiAgICA8L2Rpdj5cblxuICAgIDxkaXYgY2xhc3M9XCJyZXN1bHQtZ3JvdXBcIj5cbiAgICAgIFRhaWxsZSBlbiBiaXRzIGRlIGwnZXhwb3NhbnQ6ICR7YmYuZXhwb25lbnRCaXRzU2l6ZX1cbiAgICA8L2Rpdj5cbiAgICBcbiAgICA8ZGl2IGNsYXNzPVwicmVzdWx0LWdyb3VwXCI+XG4gICAgICBUYWlsbGUgZW4gYml0cyBkZSBsYSBtYW50aXNzZTogJHtiZi5tYW50aXNzYUJpdHNTaXplfVxuICAgIDwvZGl2PlxuXG4gICAgPGRpdiBjbGFzcz1cInJlc3VsdC1ncm91cFwiPlxuICAgICAgQmlhaXM6ICR7YmYuYmlhc31cbiAgICA8L2Rpdj5cbiAgICBcbiAgICA8ZGl2IGNsYXNzPVwicmVzdWx0LWdyb3VwXCI+XG4gICAgICBTaWduZTpcbiAgICAgIDxzcGFuIGNsYXNzPVwiY29sb3ItcmVkIG1vbm9cIj4ke2JmLmJpbmFyeVNpZ259PC9zcGFuPlxuICAgICAgPHNwYW4gY2xhc3M9XCJtb25vXCI+KCR7YmYuY29tcHV0ZWRTaWduID4gMCA/IFwiK1wiIDogXCItXCJ9KTwvc3Bhbj5cbiAgICA8L2Rpdj5cbiAgICBcbiAgICA8ZGl2IGNsYXNzPVwicmVzdWx0LWdyb3VwXCI+XG4gICAgICBNYW50aXNzZTpcbiAgICAgIDxzcGFuIGNsYXNzPVwiY29sb3Itb3JhbmdlIG1vbm9cIj5cbiAgICAgICAgJHtiZi5iaW5hcnlNYW50aXNzYX1cbiAgICAgIDwvc3Bhbj5cbiAgICAgIDxzcGFuIGNsYXNzPVwibW9ub1wiPigke2JmLmNvbXB1dGVkTWFudGlzc2F9KTwvc3Bhbj5cbiAgICA8L2Rpdj5cblxuICAgIDxkaXYgY2xhc3M9XCJyZXN1bHQtZ3JvdXBcIj5cbiAgICAgIEV4cG9zYW50OiA8c3BhbiBjbGFzcz1cImNvbG9yLWJsdWUgbW9ub1wiPiR7YmYuYmluYXJ5RXhwb25lbnR9PC9zcGFuPlxuICAgICAgPHNwYW4gY2xhc3M9XCJtb25vXCI+KDI8c3VwPiR7YmYuY29tcHV0ZWRFeHBvbmVudH08L3N1cD4pPC9zcGFuPlxuICAgIDwvZGl2PlxuICAgIFxuICAgIDxkaXYgY2xhc3M9XCJyZXN1bHQtZ3JvdXBcIj5cbiAgICAgIFLDqXN1bHRhdCBlbiBiaW5haXJlOlxuICAgICAgPHNwYW4gY2xhc3M9XCJjb2xvci1yZWQgbW9ub1wiPiR7YmYuYmluYXJ5U2lnbn08L3NwYW4+XG4gICAgICA8c3BhbiBjbGFzcz1cImNvbG9yLWJsdWUgbW9ub1wiPiR7YmYuYmluYXJ5RXhwb25lbnR9PC9zcGFuPlxuICAgICAgPHNwYW4gY2xhc3M9XCJjb2xvci1vcmFuZ2UgbW9ub1wiPiR7YmYuYmluYXJ5TWFudGlzc2F9PC9zcGFuPlxuICAgIDwvZGl2PlxuICAgIFxuICAgIDxkaXYgY2xhc3M9XCJyZXN1bHQtZ3JvdXBcIj5cbiAgICAgIFLDqXN1bHRhdDogJHtiZi5jb21wdXRlZE51bWJlcn1cbiAgICA8L2Rpdj5cbiAgYDtcbn1cblxuYmZCaW5hcnlOdW1iZXJFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgb25DaGFuZ2VDb252ZXJ0ZXJCZik7XG5iZkJpbmFyeU51bWJlckVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImtleXVwXCIsIG9uQ2hhbmdlQ29udmVydGVyQmYpO1xuXG5vbkNoYW5nZUNvbnZlcnRlckJmKCk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=
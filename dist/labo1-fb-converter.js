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
        get: function () {
            return this.binaryExponent + this.binaryMantissa;
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


;// CONCATENATED MODULE: ./src/labo1-fb-converter.ts

var fbBitsSizeElement = document.getElementById("fb-bits-size");
var fbFloatingNumberElement = document.getElementById("fb-floating-number");
var fbResultElement = document.getElementById("fb-result");
function onChangeConverterFb() {
    var bitsSize = Number(fbBitsSizeElement.value);
    var floatingNumber = Number(fbFloatingNumberElement.value);
    if (bitsSize < 8) {
        fbResultElement.innerHTML = "<span class=\"color-red\">La taille des bits doit au minimum \u00EAtre 8</span>";
        return;
    }
    if (bitsSize > 80) {
        fbResultElement.innerHTML = "<span class=\"color-red\">La taille des bits doit au maximum \u00EAtre 80</span>";
        return;
    }
    if (fbBitsSizeElement.value === "" || fbFloatingNumberElement.value === "") {
        fbResultElement.innerHTML = "<span class=\"color-grey\">Veuillez renseigner tous les champs</span>";
        return;
    }
    var bf = new BinaryFloat(floatingNumber, bitsSize);
    if (bf.overflow) {
        fbResultElement.innerHTML = "<span class=\"color-red\">Votre nombre binaire est trop grand pour \u00EAtre encod\u00E9 en ".concat(bitsSize, " bits</span>");
        return;
    }
    fbResultElement.innerHTML = "\n    <div class=\"result-group\">\n      Taille en bits de l'exposant: ".concat(bf.exponentBitsSize, "\n    </div>\n    \n    <div class=\"result-group\">\n      Taille en bits de la mantisse: ").concat(bf.mantissaBitsSize, "\n    </div>\n\n    <div class=\"result-group\">\n      Biais: ").concat(bf.bias, "\n    </div>\n    \n    <div class=\"result-group\">\n      Signe:\n      <span class=\"color-red mono\">").concat(bf.binarySign, "</span>\n      <span class=\"mono\">(").concat(bf.computedSign > 0 ? "+" : "-", ")</span>\n    </div>\n    \n    <div class=\"result-group\">\n      Mantisse:\n      <span class=\"color-orange mono\">\n        ").concat(bf.binaryMantissa, "\n      </span>\n      <span class=\"mono\">(").concat(bf.computedMantissa, ")</span>\n    </div>\n\n    <div class=\"result-group\">\n      Exposant: <span class=\"color-blue mono\">").concat(bf.binaryExponent, "</span>\n      <span class=\"mono\">(2<sup>").concat(bf.computedExponent, "</sup>)</span>\n    </div>\n    \n    <div class=\"result-group\">\n      R\u00E9sultat:\n      <span class=\"color-red mono\">").concat(bf.binarySign, "</span>\n      <span class=\"color-blue mono\">").concat(bf.binaryExponent, "</span>\n      <span class=\"color-orange mono\">").concat(bf.binaryMantissa, "</span>\n    </div>\n    \n    <div class=\"result-group\">\n      Nombre r\u00E9ellement cod\u00E9: ").concat(bf.computedNumber, "\n    </div>\n    \n    <div class=\"result-group\">\n      Marge d'erreur: ").concat(bf.error, "\n    </div>\n  ");
}
fbBitsSizeElement.addEventListener("change", onChangeConverterFb);
fbBitsSizeElement.addEventListener("keyup", onChangeConverterFb);
fbFloatingNumberElement.addEventListener("change", onChangeConverterFb);
fbFloatingNumberElement.addEventListener("keyup", onChangeConverterFb);
onChangeConverterFb();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QixDQUFDLFFBQVEsRUFBRSxtQkFBbUIsQ0FBQyxDQUFDO0FBQ3hFLHVCQUF1QixDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxtQkFBbUIsQ0FBQyxDQUFDO0FBRXZFLG1CQUFtQixFQUFFLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9tYXRoX3NwZS8uL3NyYy9jbGFzc2VzL0JpbmFyeUhlbHBlci50cyIsIndlYnBhY2s6Ly9tYXRoX3NwZS8uL3NyYy9jbGFzc2VzL0JpbmFyeUZsb2F0LnRzIiwid2VicGFjazovL21hdGhfc3BlLy4vc3JjL2xhYm8xLWZiLWNvbnZlcnRlci50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgQmluYXJ5SGVscGVyIHtcbiAgLyoqXG4gICAqIEdldCBuIGJpdCBvZiAwIG9yIDFcbiAgICogQHBhcmFtIHZhbHVlIDEgb3IgMFxuICAgKiBAcGFyYW0gbiBUaGUgbnVtYmVyIG9mIGJpdHMgdG8gcmV0cmlldmVcbiAgICogQHJldHVybnMgbiBiaXQgb2YgMCBvciAxXG4gICAqL1xuICBwdWJsaWMgZ2V0TkJpdCh2YWx1ZTogMSB8IDAsIG46IG51bWJlcik6IHN0cmluZyB7XG4gICAgbGV0IHJlcyA9IFwiXCI7XG4gICAgXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuOyBpKyspIHtcbiAgICAgIHJlcyArPSB2YWx1ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZCBuIHplcm9zIGJlZm9yZSB0aGUgYmluYXJ5IG51bWJlclxuICAgKiBAcGFyYW0gbiBUaGUgbnVtYmVyIG9mIDAgdG8gYWRkIGJlZm9yZSB0aGUgYmluYXJ5IG51bWJlclxuICAgKiBAcGFyYW0gYiBUaGUgYmluYXJ5IG51bWJlclxuICAgKiBAcmV0dXJucyBUaGUgYmluYXJ5IG51bWJlciB3aXRoIG4gemVyb3MgYmVmb3JlXG4gICAqL1xuICBwdWJsaWMgYWRkUGFkZGluZyhuOiBudW1iZXIsIGIgPSBcIlwiKSB7XG4gICAgY29uc3Qgc2l6ZSA9IG4gLSBiLmxlbmd0aDtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2l6ZTsgaSsrKSB7XG4gICAgICBiID0gXCIwXCIgKyBiO1xuICAgIH1cblxuICAgIHJldHVybiBiO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgdGhlIHplcm9zIGJlZm9yZSBhIGJpbmFyeSBudW1iZXIgKDAwMDEwMSBiZWNvbWVzIDEwMSlcbiAgICogQHBhcmFtIGIgVGhlIGJpbmFyeSBudW1iZXJcbiAgICogQHJldHVybnMgVGhlIHByb2R1Y2VkIGJpbmFyeSBudW1iZXJcbiAgICovXG4gIHB1YmxpYyBjbGVhbihiOiBzdHJpbmcpIHtcbiAgICBsZXQgcmVzID0gYjtcblxuICAgIGZvcihsZXQgaSA9IDA7IGkgPCBiLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoYltpXSA9PT0gXCIwXCIpIHtcbiAgICAgICAgcmVzID0gcmVzLnN1YnN0cmluZygxKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiByZXM7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHJlcyA9PT0gXCJcIikge1xuICAgICAgcmV0dXJuIFwiMFwiO1xuICAgIH1cbiAgfVxuXG5cbiAgLyoqXG4gICAqIEFkZCAwIHBhZGRpbmcgdG8gdGhlIHNtYWxsZXN0IGJpbmFyeSBudW1iZXIgdG8gbWF0Y2ggdGhlIGxvbmdlc3Qgb25lJ3MgbGVuZ3RoXG4gICAqIFsxMDEsIDExMDAxXSBiZWNvbWVzIFswMDEwMSwgMTEwMDFdXG4gICAqIEBwYXJhbSBiMSBUaGUgZmlyc3QgYmluYXJ5IG51bWJlclxuICAgKiBAcGFyYW0gYjIgVGhlIHNlY29uZCBiaW5hcnkgbnVtYmVyXG4gICAqIEByZXR1cm5zIFtiMSwgYjJdIHdpdGggY29ycmVjdCBwYWRkaW5nXG4gICAqL1xuICBwdWJsaWMgYWRkTWF4UGFkZGluZyhiMTogc3RyaW5nLCBiMjogc3RyaW5nKSB7XG4gICAgaWYgKGIyLmxlbmd0aCA+IGIxLmxlbmd0aCkge1xuICAgICAgYjEgPSB0aGlzLmFkZFBhZGRpbmcoYjIubGVuZ3RoLCBiMSk7XG4gICAgfSBlbHNlIGlmIChiMS5sZW5ndGggPiBiMi5sZW5ndGgpIHtcbiAgICAgIGIyID0gdGhpcy5hZGRQYWRkaW5nKGIxLmxlbmd0aCwgYjIpO1xuICAgIH1cblxuICAgIHJldHVybiBbYjEsIGIyXTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRNYXhMZW5ndGgoYjE6IHN0cmluZywgYjI6IHN0cmluZykge1xuICAgIGlmIChiMS5sZW5ndGggPiBiMi5sZW5ndGgpIHtcbiAgICAgIHJldHVybiBiMS5sZW5ndGg7XG4gICAgfVxuICAgIHJldHVybiBiMi5sZW5ndGg7XG4gIH1cblxuICAvKipcbiAgICogQ29udmVydCBhIG51bWJlciB0byBpdCdzIGJpbmFyeSByZXByZXNlbnRhdGlvblxuICAgKiBAcGFyYW0gZGVjaW1hbCBUaGUgXG4gICAqIEByZXR1cm5zIFRoZSBiaW5hcnkgcmVwcmVzZW50YXRpb24gb2YgdGhlIGRlY2ltYWwgbnVtYmVyXG4gICAqL1xuICBwdWJsaWMgZGVjaW1hbFRvQmluYXJ5KGRlY2ltYWw6IG51bWJlcikge1xuICAgIGNvbnN0IG9yaWdpbmFsTnVtYmVyID0gZGVjaW1hbDtcbiAgICBsZXQgYmluYXJ5TnVtYmVyID0gKE1hdGguYWJzKGRlY2ltYWwpID4+PiAwKS50b1N0cmluZygyKTtcblxuICAgIGlmIChvcmlnaW5hbE51bWJlciA8IDApIHtcbiAgICAgIGJpbmFyeU51bWJlciA9IHRoaXMuYzIoYmluYXJ5TnVtYmVyKS5yZXZlcnNlKCkuam9pbihcIlwiKTtcbiAgICB9XG5cbiAgICByZXR1cm4gYmluYXJ5TnVtYmVyO1xuICB9XG5cbiAgLyoqXG4gICAqIENvbnZlcnQgYSBiaW5hcnkgcmVwcmVzZW50YXRpb24gb2YgYSBudW1iZXIgdG8gYSBkZWNpbWFsIG51bWJlclxuICAgKiBAcGFyYW0gYmluYXJ5IFRoZSBiaW5hcnkgcmVwcmVzZW50YXRpb24gb2YgYSBudW1iZXJcbiAgICogQHJldHVybnMgVGhlIGludCByZXByZXNlbnRhdGlvbiBvZiBhIGJpbmFyeSBudW1iZXJcbiAgICovXG4gIHB1YmxpYyBiaW5hcnlUb0RlY2ltYWwoYmluYXJ5OiBzdHJpbmcpIHtcbiAgICByZXR1cm4gcGFyc2VJbnQoYmluYXJ5LCAyKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGQgaW50IHRvIGEgYmluYXJ5IG51bWJlclxuICAgKiBAcGFyYW0gYiBUaGUgYmluYXJ5IG51bWJlclxuICAgKiBAcGFyYW0gbiBUaGUgaW50IG51bWJlciB0byBhZGQgdG8gdGhlIGJpbmFyeSBudW1iZXJcbiAgICogQHJldHVybnMgVGhlIHByb2R1Y2VkIHJlc3VsdFxuICAgKi9cbiAgcHVibGljIGFkZE51bWJlclRvQmluYXJ5KGI6IHN0cmluZywgbjogbnVtYmVyKTogc3RyaW5nW10ge1xuICAgIHJldHVybiB0aGlzLmJpbmFyeUFkZGl0aW9uKGIsIHRoaXMuZGVjaW1hbFRvQmluYXJ5KG4pKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbnZlcnQgYSBiaW5hcnkgbnVtYmVyXG4gICAqIEBwYXJhbSBiIFRoZSBiaW5hcnkgbnVtYmVyIHRvIGludmVydFxuICAgKiBAcmV0dXJucyBUaGUgaW52ZXJ0IGJpbmFyeSBudW1iZXJcbiAgICovXG4gIHB1YmxpYyBpbnZlcnQoYjogc3RyaW5nKSB7XG4gICAgY29uc3QgaW5pdGlhbExlbmd0aCA9IGIubGVuZ3RoO1xuICAgIGIgPSB0aGlzLmRlY2ltYWxUb0JpbmFyeSh0aGlzLmJpbmFyeVRvRGVjaW1hbChiKSBeIHRoaXMuYmluYXJ5VG9EZWNpbWFsKHRoaXMuZ2V0TkJpdCgxLCBiLmxlbmd0aCkpKTtcbiAgICBiID0gdGhpcy5hZGRQYWRkaW5nKGluaXRpYWxMZW5ndGgsIGIpO1xuICAgIHJldHVybiBiO1xuICB9XG5cbiAgLyoqXG4gICAqIFNoaWZ0IHRoZSBiaW5hcnkgbnVtYmVyIHRvIHRoZSByaWdodFxuICAgKiBAcGFyYW0gYiBUaGUgYmluYXJ5IG51bWJlclxuICAgKiBAcGFyYW0gc2hpZnRWYWx1ZSBUaGUgc2hpZnQgdmFsdWVcbiAgICogQHJldHVybnMgVGhlIHNoaWZ0ZWQgYmluYXJ5IG51bWJlclxuICAgKi9cbiAgcHVibGljIHNoaWZ0UmlnaHQoYjogc3RyaW5nLCBzaGlmdFZhbHVlOiBudW1iZXIpIHtcbiAgICAvLyBcIjAwMDAwMTAxMFwiID4+IDIgPT4gXCIwMDAwMDAwMTBcIlxuICAgIC8vIDEuIFJlbW92ZXMgbGFzdHMgPHNoaWZ0VmFsdWU+IGJpdHNcbiAgICAvLyAyLiBQbGFjZXMgPHNoaWZ0VmFsdWU+IGJpdHMgYXQgMCBiZWZvcmVcblxuICAgIGlmIChzaGlmdFZhbHVlIDwgMSkge1xuICAgICAgcmV0dXJuIGI7XG4gICAgfVxuXG4gICAgbGV0IHJlcyA9IGI7XG4gICAgcmVzID0gcmVzLnNsaWNlKDAsIC1zaGlmdFZhbHVlKTtcbiAgICByZXMgPSBcIlwiLnBhZFN0YXJ0KHNoaWZ0VmFsdWUsIFwiMFwiKSArIHJlcztcblxuICAgIHJldHVybiByZXM7XG4gIH1cblxuICAvKipcbiAgICogU2hpZnQgdGhlIGJpbmFyeSBudW1iZXIgdG8gdGhlIGxlZnRcbiAgICogQHBhcmFtIGIgVGhlIGJpbmFyeSBudW1iZXJcbiAgICogQHBhcmFtIHNoaWZ0VmFsdWUgVGhlIHNoaWZ0IHZhbHVlXG4gICAqIEByZXR1cm5zIFRoZSBzaGlmdGVkIGJpbmFyeSBudW1iZXJcbiAgICovXG4gIHB1YmxpYyBzaGlmdExlZnQoYjogc3RyaW5nLCBzaGlmdFZhbHVlOiBudW1iZXIpIHtcbiAgICAvLyBcIjAwMDAwMTAxMFwiIDw8IDIgPT4gXCIwMDAwMDEwMTAwMFwiXG4gICAgLy8gMS4gUmVtb3ZlcyBsYXN0cyA8c2hpZnRWYWx1ZT4gYml0c1xuICAgIC8vIDIuIFBsYWNlcyA8c2hpZnRWYWx1ZT4gYml0cyBhdCAwIGJlZm9yZVxuXG4gICAgaWYgKHNoaWZ0VmFsdWUgPCAxKSB7XG4gICAgICByZXR1cm4gYjtcbiAgICB9XG5cbiAgICBsZXQgcmVzID0gYjtcbiAgICByZXMgPSByZXMuc2xpY2Uoc2hpZnRWYWx1ZSk7XG4gICAgcmVzICs9IFwiXCIucGFkRW5kKHNoaWZ0VmFsdWUsIFwiMFwiKTtcblxuICAgIHJldHVybiByZXM7XG4gIH1cblxuICAvKipcbiAgICogQWRkIDIgYml0IHRvZ2V0aGVyIHdpdGggdGhlIGNhcnJ5XG4gICAqIEBwYXJhbSB4IFRoZSBmaXJzdCBiaXRcbiAgICogQHBhcmFtIHkgVGhlIHNlY29uZCBiaXRcbiAgICogQHBhcmFtIGNhcnJ5IFRoZSBjYXJyeVxuICAgKiBAcmV0dXJucyBUaGUgcmVzdWx0IHdpdGggdGhlIGNhcnJ5IFtiaXQsIGNhcnJ5XVxuICAgKi9cbiAgcHVibGljIGVsZW1lbnRhcnlBZGRpdGlvbih4OiBzdHJpbmcsIHk6IHN0cmluZywgY2FycnkgPSBcIlwiKTogc3RyaW5nW10ge1xuICAgIGNvbnN0IHJlcyA9IE51bWJlcih4KSArIE51bWJlcih5KSArIE51bWJlcihjYXJyeSk7XG5cbiAgICBzd2l0Y2ggKHJlcykge1xuICAgICAgLy8gYyA9IDEsIHggPSAxLCB5ID0gMVxuICAgICAgY2FzZSAzOlxuICAgICAgICByZXR1cm4gW1wiMVwiLCBcIjFcIl07XG4gICAgICBjYXNlIDI6XG4gICAgICAgIHJldHVybiBbXCIwXCIsIFwiMVwiXTtcbiAgICAgIGNhc2UgMTpcbiAgICAgICAgcmV0dXJuIFtcIjFcIiwgXCJcIl07XG4gICAgICAvLyBjID0gMCwgeCA9IDAsIHkgPSAwXG4gICAgICBjYXNlIDA6XG4gICAgICAgIHJldHVybiBbXCIwXCIsIFwiXCJdO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBBZGQgMiBiaW5hcnkgbnVtYmVyc1xuICAgKiBAcGFyYW0gYjEgVGhlIGZpcnN0IGJpbmFyeSBudW1iZXJcbiAgICogQHBhcmFtIGIyIFRoZSBzZWNvbmQgYmluYXJ5IG51bWJlclxuICAgKiBAcmV0dXJucyBUaGUgcmVzdWx0IG9mIHRoZSBhZGRpdGlvbiBbYmluYXJ5TnVtYmVyLCBjYXJyeUJpdF1cbiAgICovXG4gIHB1YmxpYyBiaW5hcnlBZGRpdGlvbihiMTogc3RyaW5nLCBiMjogc3RyaW5nKSB7XG4gICAgbGV0IHJlcyA9IFwiXCI7XG4gICAgbGV0IGNhcnJ5ID0gXCJcIjtcbiAgICBjb25zdCBbYnAxLCBicDJdID0gdGhpcy5hZGRNYXhQYWRkaW5nKGIxLCBiMik7XG5cbiAgICBmb3IgKGxldCBpID0gYnAxLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICBjb25zdCBbciwgY10gPSB0aGlzLmVsZW1lbnRhcnlBZGRpdGlvbihicDFbaV0sIGJwMltpXSwgY2FycnkpO1xuICAgICAgcmVzID0gciArIHJlcztcbiAgICAgIGNhcnJ5ID0gYztcbiAgICB9XG5cbiAgICByZXR1cm4gW3JlcywgY2FycnldO1xuICB9XG5cbiAgLyoqXG4gICAqIFN1YnN0cmFjdCAyIGJpbmFyeSBudW1iZXJzXG4gICAqIEBwYXJhbSBiMSBUaGUgZmlyc3QgYmluYXJ5IG51bWJlclxuICAgKiBAcGFyYW0gYjIgVGhlIHNlY29uZCBiaW5hcnkgbnVtYmVyXG4gICAqIEByZXR1cm5zIFRoZSByZXN1bHQgb2YgdGhlIHN1YnN0cmFjdGlvbiBbYmluYXJ5TnVtYmVyLCBjYXJyeUJpdF1cbiAgICovXG4gIHB1YmxpYyBiaW5hcnlTdWJzdHJhY3Rpb24oYjE6IHN0cmluZywgYjI6IHN0cmluZykge1xuICAgIGNvbnN0IFticDEsIGJwMl0gPSB0aGlzLmFkZE1heFBhZGRpbmcoYjEsIGIyKTtcbiAgICByZXR1cm4gdGhpcy5iaW5hcnlBZGRpdGlvbihicDEsIHRoaXMuYzIoYnAyKS5yZXZlcnNlKCkuam9pbihcIlwiKSk7XG4gIH1cblxuICAvKipcbiAgICogUGVyZm9ybSBhIDIncyBjb21wbGVtZW50IG9wZXJhdGlvbiB3aXRob3V0IHRoZSBjYXJyeVxuICAgKiBAcGFyYW0gYiBUaGUgYmluYXJ5IG51bWJlclxuICAgKiBAcmV0dXJucyBUaGUgMidzIGNvbXBsZW1lbnQgb2YgdGhlIGJpbmFyeSBudW1iZXIgW2JpbmFyeU51bWJlciwgY2FycnldXG4gICAqL1xuICBwdWJsaWMgYzIoYjogc3RyaW5nKTogc3RyaW5nW10ge1xuICAgIGIgPSB0aGlzLmludmVydChiKTtcbiAgICByZXR1cm4gdGhpcy5hZGROdW1iZXJUb0JpbmFyeShiLCAxKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBNdWx0aXBseSAyIGJpbmFyeSBudW1iZXJzXG4gICAqIEBwYXJhbSBiMSBUaGUgZmlyc3QgYmluYXJ5IG51bWJlclxuICAgKiBAcGFyYW0gYjIgVGhlIHNlY29uZCBiaW5hcnkgbnVtYmVyXG4gICAqIEByZXR1cm5zIFRoZSByZXN1bHQgb2YgdGhlIG11bHRpcGxpY2F0aW9uXG4gICAqL1xuICBwdWJsaWMgYmluYXJ5TXVsdGlwbGljYXRpb24oYjE6IHN0cmluZywgYjI6IHN0cmluZykge1xuICAgIGxldCByZXMgPSBcIlwiO1xuICAgIGNvbnN0IGFkZFJlc3VsdHMgPSBbXTtcblxuICAgIC8vIFRoZSBiaW5hcnkgbnVtYmVycyB0byBtdWxpdHBseVxuICAgIC8vIGJwMSA9IDEwMTFcbiAgICAvLyBicDIgPSAxMTExXG4gICAgY29uc3QgW2JwMSwgYnAyXSA9IHRoaXMuYWRkTWF4UGFkZGluZyhiMSwgYjIpO1xuXG4gICAgLy8gQ2FsY3VsYXRlIHRoZSBvcGVyYW5kc1xuICAgIC8vIGFkZFJlc3VsdHMgPSBbXG4gICAgLy8gICAgMDAwMCAxMDExLFxuICAgIC8vICAgIDAwMDEgMDExMCxcbiAgICAvLyAgICAwMDEwIDExMDAsXG4gICAgLy8gICAgMTAxMSAwMDAwXG4gICAgLy8gXVxuICAgIGZvciAobGV0IGkgPSBicDEubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgIGxldCBjdXJyZW50UmVzID0gXCJcIjtcblxuICAgICAgZm9yIChsZXQgaiA9IGJwMS5sZW5ndGggLSAxOyBqID49IDA7IGotLSkge1xuICAgICAgICBjdXJyZW50UmVzID0gKE51bWJlcihicDFbal0pICogTnVtYmVyKGJwMltpXSkpICsgY3VycmVudFJlcztcbiAgICAgIH1cblxuICAgICAgY29uc3QgZGVjID0gdGhpcy5iaW5hcnlUb0RlY2ltYWwoY3VycmVudFJlcykgPDwgKGJwMS5sZW5ndGggLSAxIC0gaSk7XG4gICAgICBjdXJyZW50UmVzID0gdGhpcy5kZWNpbWFsVG9CaW5hcnkoZGVjKTtcbiAgICAgIGFkZFJlc3VsdHMucHVzaChjdXJyZW50UmVzKTtcbiAgICB9XG5cbiAgICAvLyBBZGQgZXZlcnl0aGluZ1xuICAgIC8vIHJlcyA9XG4gICAgLy8gICAwMDAwIDEwMTEsXG4gICAgLy8gKyAwMDAxIDAxMTAsXG4gICAgLy8gKyAwMDEwIDExMDAsXG4gICAgLy8gKyAxMDExIDAwMDBcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFkZFJlc3VsdHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IGFkZFJlc3VsdCA9IHRoaXMuYWRkUGFkZGluZyhhZGRSZXN1bHRzW2FkZFJlc3VsdHMubGVuZ3RoIC0gMV0ubGVuZ3RoLCBhZGRSZXN1bHRzW2ldKTtcbiAgICAgIGNvbnN0IFtyLCBjXSA9IHRoaXMuYmluYXJ5QWRkaXRpb24ocmVzLCBhZGRSZXN1bHQpO1xuICAgICAgcmVzID0gYyArIHI7XG4gICAgfVxuXG4gICAgLy8gcmVzID0gMTAxMDAxMDFcbiAgICByZXR1cm4gcmVzO1xuICB9XG59XG4iLCJpbXBvcnQgeyBCaW5hcnlIZWxwZXIgfSBmcm9tIFwiLi9CaW5hcnlIZWxwZXJcIjtcblxuLyoqXG4gKiBFbmNvZGUgYSBmbG9hdGluZyBudW1iZXIgd2l0aCBhIGNob29zZW4gYml0IHNpemUgYW5kIElFRUUgNzU0XG4gKi9cbmV4cG9ydCBjbGFzcyBCaW5hcnlGbG9hdCB7XG4gIHByaXZhdGUgX2JpdHNTaXplID0gMzI7XG4gIHByaXZhdGUgX251bWJlciA9IDA7XG4gIHByaXZhdGUgX2JpbmFyeVNpZ246IFwiMVwiIHwgXCIwXCIgPSBcIjBcIjtcbiAgcHJpdmF0ZSBfYmluYXJ5TWFudGlzc2EgPSBcIlwiO1xuICBwcml2YXRlIF9vdmVyZmxvdyA9IGZhbHNlO1xuICBwcml2YXRlIF9tYW50aXNzYURvdFBvc2l0aW9uID0gMDtcbiAgcHJpdmF0ZSBfYmluYXJ5RXhwb25lbnQgPSBcIlwiO1xuICBwcml2YXRlIF9iaWFzID0gMDtcbiAgcHJpdmF0ZSBfYmggPSBuZXcgQmluYXJ5SGVscGVyKCk7XG5cbiAgY29uc3RydWN0b3IobnVtYmVyT3JCaW5hcnk6IHN0cmluZyk7XG4gIGNvbnN0cnVjdG9yKG51bWJlck9yQmluYXJ5OiBudW1iZXIsIGJpdHNTaXplOiBudW1iZXIpO1xuICBjb25zdHJ1Y3RvcihudW1iZXJPckJpbmFyeTogbnVtYmVyIHwgc3RyaW5nLCBiaXRzU2l6ZT86IG51bWJlcikge1xuICAgIGlmICh0eXBlb2YgbnVtYmVyT3JCaW5hcnkgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIC8vIFJlbW92ZSB0aGUgc3BhY2VzIGluIHRoZSBzdHJpbmdcbiAgICAgIG51bWJlck9yQmluYXJ5ID0gbnVtYmVyT3JCaW5hcnkudHJpbSgpO1xuICAgICAgbnVtYmVyT3JCaW5hcnkgPSBudW1iZXJPckJpbmFyeS5yZXBsYWNlKC9cXHMvZywgXCJcIik7XG4gICAgICB0aGlzLmJpdHNTaXplID0gbnVtYmVyT3JCaW5hcnkubGVuZ3RoO1xuICAgICAgdGhpcy5udW1iZXIgPSAxO1xuXG4gICAgICAvLyBTbGljZSB0aGUgc3RyaW5nIHRvIGFzc2lnbiB0aGUgYmluYXJ5IG51bWJlciB0byB0aGUgY29ycmVjdCBwYXJ0IG9mIHRoZSBiaW5hcnkgcmVwcmVzZW50YXRpb24gb2YgdGhlIGZsb2F0XG4gICAgICB0aGlzLmJpbmFyeVNpZ24gPSBudW1iZXJPckJpbmFyeVswXSBhcyBcIjBcIiB8IFwiMVwiO1xuICAgICAgdGhpcy5iaW5hcnlFeHBvbmVudCA9IG51bWJlck9yQmluYXJ5LnNsaWNlKDEsIHRoaXMuZXhwb25lbnRCaXRzU2l6ZSArIDEpO1xuICAgICAgdGhpcy5iaW5hcnlNYW50aXNzYSA9IG51bWJlck9yQmluYXJ5LnNsaWNlKHRoaXMuZXhwb25lbnRCaXRzU2l6ZSArIDEsIHRoaXMuYml0c1NpemUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmJpdHNTaXplID0gYml0c1NpemU7XG4gICAgICB0aGlzLm51bWJlciA9IG51bWJlck9yQmluYXJ5O1xuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBnZXRJbmZpbml0eShiaXRzU2l6ZTogbnVtYmVyKSB7XG4gICAgcmV0dXJuIG5ldyBCaW5hcnlGbG9hdChJbmZpbml0eSwgYml0c1NpemUpO1xuICB9XG5cbiAgc3RhdGljIGdldE5hTihiaXRzU2l6ZTogbnVtYmVyKSB7XG4gICAgcmV0dXJuIG5ldyBCaW5hcnlGbG9hdChOYU4sIGJpdHNTaXplKTtcbiAgfVxuXG4gIHN0YXRpYyBnZXRaZXJvKGJpdHNTaXplOiBudW1iZXIpIHtcbiAgICByZXR1cm4gbmV3IEJpbmFyeUZsb2F0KDAsIGJpdHNTaXplKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgZmxvYXQgbnVtYmVyIHRvIGNvZGVkIHdpdGggSUVFRSA3NTRcbiAgICovXG4gIGdldCBudW1iZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMuX251bWJlcjtcbiAgfVxuXG4gIHNldCBudW1iZXIodmFsdWU6IG51bWJlcikge1xuICAgIHRoaXMuX251bWJlciA9IHZhbHVlO1xuXG4gICAgdGhpcy5jYWxjdWxhdGVCaW5hcnlTaWduKCk7XG4gICAgdGhpcy5jYWxjdWxhdGVCaWFzKCk7XG4gICAgdGhpcy5jYWxjdWxhdGVCaW5hcnlNYW50aXNzYSgpO1xuICAgIHRoaXMuY2FsY3VsYXRlQmluYXJ5RXhwb25lbnQoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgYml0IHNpemUgdG8gY29kZSB0aGUgbnVtYmVyXG4gICAqL1xuICBnZXQgYml0c1NpemUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2JpdHNTaXplO1xuICB9XG5cbiAgc2V0IGJpdHNTaXplKHZhbHVlOiBudW1iZXIpIHtcbiAgICB0aGlzLl9iaXRzU2l6ZSA9IHZhbHVlO1xuXG4gICAgaWYgKHZhbHVlID4gODApIHtcbiAgICAgIHRoaXMuX2JpdHNTaXplID0gODA7XG4gICAgfVxuXG4gICAgaWYgKHZhbHVlIDwgOCkge1xuICAgICAgdGhpcy5fYml0c1NpemUgPSA4O1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIG1hbnRpc3NhIGJpdHMgc2l6ZVxuICAgKi9cbiAgZ2V0IG1hbnRpc3NhQml0c1NpemUoKSB7XG4gICAgaWYgKHRoaXMuYml0c1NpemUgPCA4KSB7XG4gICAgICByZXR1cm4gMDtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5iaXRzU2l6ZSAtIHRoaXMuZXhwb25lbnRCaXRzU2l6ZSAtIDE7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBleHBvbmVudCBiaXRzIHNpemUgd2l0aDpcbiAgICogLSBUaGUgSUVFRSA3NTQgMjAxOSBmb3JtdWxhIGlmIHRoZSBiaXRzIHNpemUgaXMgZ3JlYXRlciBvciBlcXVhbCB0byAxMjhcbiAgICogLSBBIGN1c3RvbSBmb3JtdWxhIGlmIHRoZSBiaXQgc2l6ZSBpcyBsZXNzIHRoYW4gMTI4IHRoYXQgbWF0Y2hlcyB0aGUgSUVFRSBzdGFuZGFyZFxuICAgKiBcbiAgICogVmlzdWFsaXplIHRoZSBmdW5jdGlvbiBvbiBnZW9nZWJyYTpcbiAgICogaHR0cHM6Ly93d3cuZ2VvZ2VicmEub3JnL2NhbGN1bGF0b3IvY2VycmtkZnZcbiAgICovXG4gIGdldCBleHBvbmVudEJpdHNTaXplKCkge1xuICAgIGlmICh0aGlzLmJpdHNTaXplIDwgOCkge1xuICAgICAgcmV0dXJuIDA7XG4gICAgfVxuXG4gICAgLy8gSUVFRSA3NTQgMjAxOSBmb3JtdWxhID49IDEyOFxuICAgIGlmICh0aGlzLmJpdHNTaXplID49IDEyOCkge1xuICAgICAgcmV0dXJuIE1hdGgucm91bmQoNCAqIE1hdGgubG9nMih0aGlzLmJpdHNTaXplKSkgLSAxMztcbiAgICB9XG5cbiAgICAvLyBBIGZvcm11bGEgdGhhdCBtYXRjaGVzIHRoZSB2YWx1ZXMgZm9yIDwgMTI4XG4gICAgLy8gcmVmOiBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL2EvNjI2MzIyNjBcbiAgICByZXR1cm4gTWF0aC5yb3VuZCgoTWF0aC5sb2cyKHRoaXMuYml0c1NpemUpIC0gMSkgKiogKDMgLyAyKSk7XG4gIH1cblxuICBnZXQgcG9zaXRpdmVOdW1iZXIoKSB7XG4gICAgcmV0dXJuIE1hdGguYWJzKHRoaXMubnVtYmVyKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDYWxjdWxhdGUgdGhlIHBvc2l0aW9uIG9mIHRoZSBkb3QgaW4gdGhlIG1hbnRpc3NhXG4gICAqICAgICAgICAgICAgZmxvYXQgcG9zaXRpb25cbiAgICogICAgICAgICAgICAgICAgICB8XG4gICAqICAgICAgICAgICAgICAgICAgdlxuICAgKiBtYW50aXNzYSgxOS41OTM3NSkgPT4gXCIwMDExLjEwMDExMDAwMDAwMDAwMDAwMDBcIlxuICAgKi9cbiAgZ2V0IG1hbnRpc3NhRG90UG9zaXRpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuX21hbnRpc3NhRG90UG9zaXRpb247XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBleHBvbmVudCBvZiB0aGUgbnVtYmVyIGluIGJpbmFyeSB3aXRoIHRoZSBiaWFzXG4gICAqIG1hbnRpc3NhKDE5LjU5Mzc1KSA9PiBcIjEwMDAwMDEwXCJcbiAgICovXG4gIGdldCBiaW5hcnlFeHBvbmVudCgpIHtcbiAgICByZXR1cm4gdGhpcy5fYmluYXJ5RXhwb25lbnQ7XG4gIH1cblxuICBzZXQgYmluYXJ5RXhwb25lbnQodmFsdWU6IHN0cmluZykge1xuICAgIHRoaXMuX2JpbmFyeUV4cG9uZW50ID0gdmFsdWU7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJuIHRoZSBiaWFzIG9mIHRoZSBudW1iZXIgYmFzZWQgb24gdGhlIGV4cG9uZW50IGJpdCBzaXplXG4gICAqIGIgPSAyIF4gKGV4cG9uZW50Qml0c1NpemUgLSAxKSAtIDFcbiAgICovXG4gIGdldCBiaWFzKCkge1xuICAgIHJldHVybiB0aGlzLl9iaWFzO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgZnVsbCBtYW50aXNzYSBvZiB0aGUgbnVtYmVyXG4gICAqL1xuICBnZXQgYmluYXJ5TWFudGlzc2EoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2JpbmFyeU1hbnRpc3NhO1xuICB9XG5cbiAgc2V0IGJpbmFyeU1hbnRpc3NhKHZhbHVlOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9iaW5hcnlNYW50aXNzYSA9IHZhbHVlO1xuICAgIHRoaXMuX292ZXJmbG93ID0gdmFsdWUubGVuZ3RoID4gdGhpcy5tYW50aXNzYUJpdHNTaXplO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgZnVsbCBudW1iZXIgY29kZWQgaW4gYmluYXJ5IHdpdGggSUVFRSA3NTRcbiAgICovXG4gIGdldCBiaW5hcnlGbG9hdGluZ051bWJlcigpIHtcbiAgICByZXR1cm4gdGhpcy5iaW5hcnlTaWduICsgdGhpcy5iaW5hcnlFeHBvbmVudCArIHRoaXMuYmluYXJ5TWFudGlzc2E7XG4gIH1cblxuICAvKipcbiAgICogVGhlIHNpZ24gaW4gaXQncyBkZWNpbWFsIGZvcm1cbiAgICovXG4gIGdldCBjb21wdXRlZFNpZ24oKSB7XG4gICAgcmV0dXJuIHRoaXMuYmluYXJ5U2lnbiA9PT0gXCIxXCIgPyAtMSA6IDE7XG4gIH1cblxuICAvKipcbiAgICogVGhlIGV4cG9uZW50IGluIGl0J3MgZGVjaW1hbCBmb3JtXG4gICAqL1xuICBnZXQgY29tcHV0ZWRFeHBvbmVudCgpIHtcbiAgICByZXR1cm4gdGhpcy5fYmguYmluYXJ5VG9EZWNpbWFsKHRoaXMuYmluYXJ5RXhwb25lbnQpIC0gdGhpcy5iaWFzO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoZSBtYW50aXNzYSBpbiBpdCdzIGRlY2ltYWwgZm9ybVxuICAgKi9cbiAgZ2V0IGNvbXB1dGVkTWFudGlzc2EoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2JoLmJpbmFyeVRvRGVjaW1hbChcIjFcIiArIHRoaXMuYmluYXJ5TWFudGlzc2EpIC8gMiAqKiB0aGlzLm1hbnRpc3NhQml0c1NpemU7XG4gIH1cblxuICBnZXQgaXNOYU4oKSB7XG4gICAgY29uc3QgaXNOYU5CaW5hcnkgPSAoXG4gICAgICB0aGlzLmJpbmFyeUV4cG9uZW50LmluZGV4T2YoXCIwXCIpID09PSAtMSAmJlxuICAgICAgdGhpcy5iaW5hcnlNYW50aXNzYS5pbmRleE9mKFwiMFwiKSA9PT0gLTEgJiZcbiAgICAgIHRoaXMuYmluYXJ5U2lnbiA9PT0gXCIwXCJcbiAgICApO1xuXG4gICAgcmV0dXJuIE51bWJlci5pc05hTih0aGlzLm51bWJlcikgfHwgaXNOYU5CaW5hcnk7XG4gIH1cblxuICBnZXQgaXNJbmZpbml0eSgpIHtcbiAgICBjb25zdCBpc0luZmluaXR5QmluYXJ5ID0gKFxuICAgICAgdGhpcy5iaW5hcnlFeHBvbmVudC5pbmRleE9mKFwiMFwiKSA9PT0gLTEgJiZcbiAgICAgIHRoaXMuYmluYXJ5TWFudGlzc2EuaW5kZXhPZihcIjFcIikgPT09IC0xICYmXG4gICAgICB0aGlzLmJpbmFyeVNpZ24gPT09IFwiMFwiXG4gICAgKTtcblxuICAgIHJldHVybiB0aGlzLm51bWJlciA9PT0gSW5maW5pdHkgfHwgaXNJbmZpbml0eUJpbmFyeTtcbiAgfVxuXG4gIGdldCBpc1plcm8oKSB7XG4gICAgY29uc3QgaXNaZXJvQmluYXJ5ID0gKFxuICAgICAgdGhpcy5iaW5hcnlFeHBvbmVudC5pbmRleE9mKFwiMVwiKSA9PT0gLTEgJiZcbiAgICAgIHRoaXMuYmluYXJ5TWFudGlzc2EuaW5kZXhPZihcIjFcIikgPT09IC0xICYmXG4gICAgICB0aGlzLmJpbmFyeVNpZ24gPT09IFwiMFwiXG4gICAgKTtcblxuICAgIHJldHVybiB0aGlzLm51bWJlciA9PT0gMCB8fCBpc1plcm9CaW5hcnk7XG4gIH1cblxuICBnZXQgYmluYXJ5QWJzKCkge1xuICAgIHJldHVybiB0aGlzLmJpbmFyeUV4cG9uZW50ICsgdGhpcy5iaW5hcnlNYW50aXNzYTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgbnVtYmVyIHRoYXQgaXMgY29kZWQgaW4gbWVtb3J5XG4gICAqL1xuICBnZXQgY29tcHV0ZWROdW1iZXIoKSB7XG4gICAgaWYgKHRoaXMuaXNaZXJvKSB7XG4gICAgICByZXR1cm4gMDtcbiAgICB9IGVsc2UgaWYgKHRoaXMuaXNOYU4pIHtcbiAgICAgIHJldHVybiBOYU47XG4gICAgfSBlbHNlIGlmICh0aGlzLmlzSW5maW5pdHkpIHtcbiAgICAgIHJldHVybiBJbmZpbml0eTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5jb21wdXRlZFNpZ24gKiAyICoqIHRoaXMuY29tcHV0ZWRFeHBvbmVudCAqIHRoaXMuY29tcHV0ZWRNYW50aXNzYTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIG1hcmdpbiBvZiBlcnJvclxuICAgKi9cbiAgZ2V0IGVycm9yKCkgeyAgICBcbiAgICBpZiAoTnVtYmVyLmlzTmFOKHRoaXMubnVtYmVyKSB8fCB0aGlzLm51bWJlciA9PT0gSW5maW5pdHkgfHwgdGhpcy5udW1iZXIgPT09IDApIHtcbiAgICAgIHJldHVybiAwO1xuICAgIH1cblxuICAgIHJldHVybiBNYXRoLmFicyh0aGlzLm51bWJlciAtIHRoaXMuY29tcHV0ZWROdW1iZXIpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybiB0aGUgYmluYXJ5IHJlcHJlc2VudGF0aW9uIG9mIHRoZSBzaWduXG4gICAqIDAgaWYgbnVtYmVyID49IDBcbiAgICogMSBpZiBudW1iZXIgPCAwXG4gICAqL1xuICBnZXQgYmluYXJ5U2lnbigpOiBcIjBcIiB8IFwiMVwiIHtcbiAgICByZXR1cm4gdGhpcy5fYmluYXJ5U2lnbjtcbiAgfVxuXG4gIHNldCBiaW5hcnlTaWduKHZhbHVlOiBcIjBcIiB8IFwiMVwiKSB7XG4gICAgdGhpcy5fYmluYXJ5U2lnbiA9IHZhbHVlO1xuICB9XG5cbiAgLyoqXG4gICAqIFRydWUgaWYgdGhlIG51bWJlciBjYW5ub3QgYmUgZW5jb2RlZCBpbiA8Yml0c1NpemU+IGJpdHNcbiAgICovXG4gIGdldCBvdmVyZmxvdygpIHtcbiAgICByZXR1cm4gdGhpcy5fb3ZlcmZsb3c7XG4gIH1cblxuICAvKipcbiAgICogRGV0ZXJtaW5lIHRoZSBiaW5hcnkgc2lnbiBvZiB0aGUgbnVtYmVyXG4gICAqL1xuICBwcml2YXRlIGNhbGN1bGF0ZUJpbmFyeVNpZ24oKSB7XG4gICAgdGhpcy5fYmluYXJ5U2lnbiA9IHRoaXMubnVtYmVyIDwgMCA/IFwiMVwiIDogXCIwXCI7XG4gIH1cblxuICAvKipcbiAgICogQ2FsY3VsYXRlIHRoZSBleHBvbmVudCBiaWFzIGJhc2VkIG9uIHRoZSBleHBvbmVudCBiaXQgc2l6ZVxuICAgKiBiID0gMiBeIChleHBvbmVudEJpdHNTaXplIC0gMSkgLSAxO1xuICAgKi9cbiAgcHJpdmF0ZSBjYWxjdWxhdGVCaWFzKCkge1xuICAgIHRoaXMuX2JpYXMgPSAyICoqICh0aGlzLmV4cG9uZW50Qml0c1NpemUgLSAxKSAtIDE7XG4gIH1cblxuICAvKipcbiAgICogRGV0ZXJtaW5lIHRoZSBiaW5hcnkgbWFudGlzc2EgYW5kIGRldGVybWluZSB0aGUgZG90IHBvc2l0aW9uIGluIHRoZSBtYW50aXNzYVxuICAgKi9cbiAgcHJpdmF0ZSBjYWxjdWxhdGVCaW5hcnlNYW50aXNzYSgpIHtcbiAgICBpZiAoTnVtYmVyLmlzTmFOKHRoaXMubnVtYmVyKSkge1xuICAgICAgdGhpcy5fbWFudGlzc2FEb3RQb3NpdGlvbiA9IDA7XG4gICAgICB0aGlzLl9iaW5hcnlNYW50aXNzYSA9IFwiXCIucGFkRW5kKHRoaXMubWFudGlzc2FCaXRzU2l6ZSwgXCIxXCIpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIEdldCB0aGUgaW50ZWdlciBwYXJ0XG4gICAgY29uc3QgaW50ZWdlclBhcnQgPSBNYXRoLnRydW5jKHRoaXMucG9zaXRpdmVOdW1iZXIpO1xuXG4gICAgLy8gR2V0IHRoZSBkZWNpbWFscyBvZiB0aGUgbnVtYmVyOiBkZWNpbWFscyA9IDE5LjU5Mzc1IC0gMTkgPSAwLjU5Mzc1XG4gICAgbGV0IGRlY2ltYWxzUGFydCA9IHRoaXMucG9zaXRpdmVOdW1iZXIgLSBNYXRoLnRydW5jKHRoaXMucG9zaXRpdmVOdW1iZXIpO1xuXG4gICAgY29uc3QgYmluYXJ5SW50ZWdlclBhcnQgPSB0aGlzLl9iaC5kZWNpbWFsVG9CaW5hcnkoaW50ZWdlclBhcnQpO1xuXG4gICAgLy8gR2V0IHRoZSBudW1iZXIgb2YgYml0cyBkZWRpY2F0ZWQgdG8gc3RvcmUgdGhlIGRlY2ltYWxzIGluIHRoZSBtYW50aXNzYVxuICAgIGNvbnN0IGRlY2ltYWxzQml0c1NpemUgPSB0aGlzLm1hbnRpc3NhQml0c1NpemUgLSBiaW5hcnlJbnRlZ2VyUGFydC5sZW5ndGggLSAxO1xuICAgIFxuICAgIGxldCBiaW5hcnlEZWNpbWFsc1BhcnQgPSBcIlwiO1xuICAgIC8vIDAuNTkzNzUgKiAyID0gMS4xODc1ICA9PiAxXG4gICAgLy8gMC4xODc1ICAqIDIgPSAwLjM3NSAgID0+IDBcbiAgICAvLyAwLjM3NSAgICogMiA9IDAuNzUgICAgPT4gMFxuICAgIC8vIDAuNzUgICAgKiAyID0gMS41ICAgICA9PiAxXG4gICAgLy8gMC41ICAgICAqIDIgPSAxICAgICAgID0+IDFcbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgZGVjaW1hbHNCaXRzU2l6ZTsgaSsrKSB7XG4gICAgICBkZWNpbWFsc1BhcnQgKj0gMjtcblxuICAgICAgaWYgKGRlY2ltYWxzUGFydCA+PSAxKSB7XG4gICAgICAgIGRlY2ltYWxzUGFydCAtPSAxO1xuICAgICAgICBiaW5hcnlEZWNpbWFsc1BhcnQgKz0gXCIxXCI7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBiaW5hcnlEZWNpbWFsc1BhcnQgKz0gXCIwXCI7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbGV0IGJpbmFyeU1hbnRpc3NhID0gYmluYXJ5SW50ZWdlclBhcnQgKyBiaW5hcnlEZWNpbWFsc1BhcnQ7XG5cbiAgICAvLyBHZXQgdGhlIHBvc2l0aW9uIG9mIHRoZSBmaXJzdCBiaXQgYXQgMSwgZm9yIG9ubHkgZGVjaW1hbHMgbnVtYmVyXG4gICAgbGV0IG1hbnRpc3NhRG90UG9zaXRpb24gPSAtYmluYXJ5TWFudGlzc2EuaW5kZXhPZihcIjFcIik7XG5cbiAgICAvLyBSZW1vdmUgYWxsIHRoZSBsZWFkaW5nIGJpdCBhdCAwIGZyb20gdGhlIG1hbnRpc3NhXG4gICAgYmluYXJ5TWFudGlzc2EgPSB0aGlzLl9iaC5jbGVhbihiaW5hcnlNYW50aXNzYSk7XG5cbiAgICAvLyBJZiB0aGUgcG9zaXRpb24gb2YgdGhlIGZpcnN0IGJpdCBhdCAxIGlzIDBcbiAgICAvLyB0aGVuIHRoZSBkb3QgcG9zaXRpb24gaXMgZXF1YWxzIHRvIHRoZSBsZW5ndGggb2YgdGhlIGJpbmFyeSBpbnRlZ2VyIHBhcnQgb2YgdGhlIG1hbnRpc3NhXG4gICAgaWYgKG1hbnRpc3NhRG90UG9zaXRpb24gPT09IDApIHtcbiAgICAgIG1hbnRpc3NhRG90UG9zaXRpb24gPSBiaW5hcnlJbnRlZ2VyUGFydC5sZW5ndGggLSAxO1xuICAgIH1cblxuICAgIC8vIEhpZGUgdGhlIGZpcnN0IGJpdCBhdCAxXG4gICAgYmluYXJ5TWFudGlzc2EgPSBiaW5hcnlNYW50aXNzYS5zdWJzdHJpbmcoMSk7XG5cbiAgICAvLyBNYWtlIHN1cmUgdGhhdCB0aGUgbWFudGlzc2EgbWF0Y2hlcyB0aGUgY29ycmVjdCBsZW5ndGggKDIzIGZvciAzMiBiaXRzIGZvciBleGFtcGxlKVxuICAgIGJpbmFyeU1hbnRpc3NhID0gYmluYXJ5TWFudGlzc2EucGFkRW5kKHRoaXMubWFudGlzc2FCaXRzU2l6ZSwgXCIwXCIpO1xuXG4gICAgdGhpcy5iaW5hcnlNYW50aXNzYSA9IGJpbmFyeU1hbnRpc3NhO1xuICAgIHRoaXMuX21hbnRpc3NhRG90UG9zaXRpb24gPSBtYW50aXNzYURvdFBvc2l0aW9uO1xuICB9XG5cbiAgLyoqXG4gICAqIENhbGN1bGF0ZSB0aGUgZXhwb25lbnQgaW4gYmluYXJ5XG4gICAqIGUgPSBiaW5hcnkobWFudGlzc2FGbG9hdFBvc2l0aW9uICsgYmlhcylcbiAgICovXG4gIHByaXZhdGUgY2FsY3VsYXRlQmluYXJ5RXhwb25lbnQoKSB7XG4gICAgLy8gSWYgdGhlIG51bWJlciBpcyBOYU4gb3IgSW5maW5pdHkgdGhlbiBhbGwgdGhlIGJpdHMgb2YgdGhlIGV4cG9uZW50IGFyZSBlcXVhbHMgdG8gMVxuICAgIGlmIChOdW1iZXIuaXNOYU4odGhpcy5udW1iZXIpIHx8IHRoaXMubnVtYmVyID09PSBJbmZpbml0eSkge1xuICAgICAgdGhpcy5fYmluYXJ5RXhwb25lbnQgPSBcIlwiLnBhZEVuZCh0aGlzLmV4cG9uZW50Qml0c1NpemUsIFwiMVwiKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBsZXQgZXhwb25lbnQgPSB0aGlzLm1hbnRpc3NhRG90UG9zaXRpb24gKyB0aGlzLmJpYXM7XG5cbiAgICAvLyBJZiB0aGUgbnVtYmVyIGlzIDAgdGhlbiBhbGwgdGhlIGJpdHMgb2YgdGhlIGV4cG9uZW50IGFyZSBlcXVhbHMgdG8gMFxuICAgIGlmICh0aGlzLm51bWJlciA9PT0gMCkge1xuICAgICAgZXhwb25lbnQgPSAwO1xuICAgIH1cblxuICAgIC8vIENvbnZlcnQgdGhlIGV4cG9uZW50IHRvIGJpbmFyeSBhbmQgYWRkIGxlYWRpbmcgMCB0byBtYXRjaCB0aGUgZXhwb25lbnQgYml0cyBzaXplXG4gICAgdGhpcy5fYmluYXJ5RXhwb25lbnQgPSB0aGlzLl9iaC5kZWNpbWFsVG9CaW5hcnkoZXhwb25lbnQpLnBhZFN0YXJ0KHRoaXMuZXhwb25lbnRCaXRzU2l6ZSwgXCIwXCIpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZCB0d28gYmluYXJ5IGZsb2F0IG51bWJlclxuICAgKiBAcGFyYW0gYmYyIFRoZSBiaW5hcnkgZmxvYXQgbnVtYmVyIHRvIGFkZFxuICAgKiBAcmV0dXJucyBUaGUgcmVzdWx0IG9mIHRoZSBhZGRpdGlvblxuICAgKi9cbiAgYWRkKGJmMjogQmluYXJ5RmxvYXQpIHtcbiAgICBjb25zdCBiZlJlcyA9IG5ldyBCaW5hcnlGbG9hdCgxLCB0aGlzLmJpdHNTaXplKTtcblxuICAgIC8vIFNwZWNpYWwgY2FzZXNcbiAgICBpZiAodGhpcy5pc05hTiB8fCBiZjIuaXNOYU4pIHtcbiAgICAgIHJldHVybiBCaW5hcnlGbG9hdC5nZXROYU4odGhpcy5iaXRzU2l6ZSk7XG4gICAgfVxuICAgIGlmICh0aGlzLmlzSW5maW5pdHkgfHwgYmYyLmlzSW5maW5pdHkpIHtcbiAgICAgIHJldHVybiBCaW5hcnlGbG9hdC5nZXRJbmZpbml0eSh0aGlzLmJpdHNTaXplKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuYmluYXJ5QWJzID09PSBiZjIuYmluYXJ5QWJzICYmIHRoaXMuYmluYXJ5U2lnbiAhPT0gYmYyLmJpbmFyeVNpZ24pIHtcbiAgICAgIHJldHVybiBCaW5hcnlGbG9hdC5nZXRaZXJvKHRoaXMuYml0c1NpemUpO1xuICAgIH1cblxuICAgIC8vIFN0ZXAgMTogRGV0ZXJtaW5lIHRoZSBsb3dlc3QgZXhwb25lbnQgYmV0d2VlbiB0aGlzIGFuZCB0aGUgc2Vjb25kIG51bWJlclxuICAgIGxldCBiZk1pbkJpbmFyeUV4cG9uZW50OiBCaW5hcnlGbG9hdCA9IHRoaXM7XG4gICAgbGV0IGJmTWF4QmluYXJ5RXhwb25lbnQ6IEJpbmFyeUZsb2F0ID0gYmYyO1xuICAgIGlmICh0aGlzLl9iaC5iaW5hcnlUb0RlY2ltYWwoYmYyLmJpbmFyeUV4cG9uZW50KSA8IHRoaXMuX2JoLmJpbmFyeVRvRGVjaW1hbChiZk1pbkJpbmFyeUV4cG9uZW50LmJpbmFyeUV4cG9uZW50KSkge1xuICAgICAgYmZNaW5CaW5hcnlFeHBvbmVudCA9IGJmMjtcbiAgICAgIGJmTWF4QmluYXJ5RXhwb25lbnQgPSB0aGlzO1xuICAgIH1cbiAgICAvLyBDb3B5IHRoZSBudW1iZXIsIGRvIG5vdCBzZXQgYnkgcmVmZXJlbmNlXG4gICAgYmZNYXhCaW5hcnlFeHBvbmVudCA9IG5ldyBCaW5hcnlGbG9hdChiZk1heEJpbmFyeUV4cG9uZW50LmNvbXB1dGVkTnVtYmVyLCB0aGlzLmJpdHNTaXplKTtcbiAgICBiZk1pbkJpbmFyeUV4cG9uZW50ID0gbmV3IEJpbmFyeUZsb2F0KGJmTWluQmluYXJ5RXhwb25lbnQuY29tcHV0ZWROdW1iZXIsIHRoaXMuYml0c1NpemUpO1xuXG4gICAgLy8gSWYgdGhlcmUgaXMgYSAwIHRoZW4gcmV0dXJuIHRoZSBub24temVybyBudW1iZXJcbiAgICBpZiAoYmZNaW5CaW5hcnlFeHBvbmVudC5pc1plcm8pIHtcbiAgICAgIHJldHVybiBiZk1heEJpbmFyeUV4cG9uZW50O1xuICAgIH1cblxuICAgIC8vIEFkZCB0aGUgaGlkZGVuIGJpdFxuICAgIGJmTWluQmluYXJ5RXhwb25lbnQuYmluYXJ5TWFudGlzc2EgPSBcIjFcIiArIGJmTWluQmluYXJ5RXhwb25lbnQuYmluYXJ5TWFudGlzc2E7XG4gICAgYmZNYXhCaW5hcnlFeHBvbmVudC5iaW5hcnlNYW50aXNzYSA9IFwiMVwiICsgYmZNYXhCaW5hcnlFeHBvbmVudC5iaW5hcnlNYW50aXNzYTtcblxuICAgIC8vIFN0ZXAgMjogU2hpZnQgdGhlIG1hbnRpc3NhXG4gICAgY29uc3Qgc2hpZnRWYWx1ZSA9IGJmTWF4QmluYXJ5RXhwb25lbnQuY29tcHV0ZWRFeHBvbmVudCAtIGJmTWluQmluYXJ5RXhwb25lbnQuY29tcHV0ZWRFeHBvbmVudDtcbiAgICBjb25zdCBzaGlmdGVkTWluTWFudGlzc2EgPSB0aGlzLl9iaC5zaGlmdFJpZ2h0KGJmTWluQmluYXJ5RXhwb25lbnQuYmluYXJ5TWFudGlzc2EsIHNoaWZ0VmFsdWUpO1xuICAgIGJmTWluQmluYXJ5RXhwb25lbnQuYmluYXJ5TWFudGlzc2EgPSBzaGlmdGVkTWluTWFudGlzc2E7XG4gICAgXG4gICAgLy8gU3RlcCAzOiBQdXQgdGhlIHNhbWUgZXhwb25lbnRcbiAgICBiZlJlcy5iaW5hcnlFeHBvbmVudCA9IGJmTWF4QmluYXJ5RXhwb25lbnQuYmluYXJ5RXhwb25lbnQ7XG5cbiAgICAvLyBTdGVwIDQ6IDIncyBjb21wbGVtZW50IGlmIG5lZ2F0aXZlXG4gICAgaWYgKGJmTWluQmluYXJ5RXhwb25lbnQuY29tcHV0ZWRTaWduID09PSAtMSkge1xuICAgICAgYmZNaW5CaW5hcnlFeHBvbmVudC5iaW5hcnlNYW50aXNzYSA9IHRoaXMuX2JoLmMyKGJmTWluQmluYXJ5RXhwb25lbnQuYmluYXJ5TWFudGlzc2EpLnJldmVyc2UoKS5qb2luKFwiXCIpO1xuICAgIH1cbiAgICBpZiAoYmZNYXhCaW5hcnlFeHBvbmVudC5jb21wdXRlZFNpZ24gPT09IC0xKSB7XG4gICAgICBiZk1heEJpbmFyeUV4cG9uZW50LmJpbmFyeU1hbnRpc3NhID0gdGhpcy5fYmguYzIoYmZNYXhCaW5hcnlFeHBvbmVudC5iaW5hcnlNYW50aXNzYSkucmV2ZXJzZSgpLmpvaW4oXCJcIik7XG4gICAgfVxuXG4gICAgLy8gU3RlcCA1OiBBZGQgdGhlIG1hbnRpc3NhIGFuZCB0aGUgc2hpZnRlZCBvbmVcbiAgICBiZlJlcy5iaW5hcnlNYW50aXNzYSA9IHRoaXMuX2JoLmJpbmFyeUFkZGl0aW9uKFxuICAgICAgYmZNYXhCaW5hcnlFeHBvbmVudC5iaW5hcnlNYW50aXNzYSxcbiAgICAgIGJmTWluQmluYXJ5RXhwb25lbnQuYmluYXJ5TWFudGlzc2EsXG4gICAgKS5yZXZlcnNlKCkuam9pbihcIlwiKTtcblxuICAgIC8vIFN0ZXAgNjogRGV0ZXJtaW5lIHRoZSBzaWduIG9mIHRoZSByZXN1bHRcbiAgICBpZiAoYmZNYXhCaW5hcnlFeHBvbmVudC5jb21wdXRlZFNpZ24gIT09IGJmTWluQmluYXJ5RXhwb25lbnQuY29tcHV0ZWRTaWduKSB7XG4gICAgICBpZiAoYmZNYXhCaW5hcnlFeHBvbmVudC5jb21wdXRlZFNpZ24gPT09IC0xKSB7XG4gICAgICAgIGJmUmVzLmJpbmFyeVNpZ24gPSBcIjFcIjtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBTdGVwIDc6IE5vcm1hbGl6ZSB0aGUgbWFudGlzc2FcbiAgICAvLyBIaWRlIHRoZSBmaXJzdCBiaXRcbiAgICBiZlJlcy5iaW5hcnlNYW50aXNzYSA9IGJmUmVzLmJpbmFyeU1hbnRpc3NhLnN1YnN0cmluZygxKTtcblxuICAgIC8vIE5vcm1hbGl6ZSB0aGUgbWFudGlzc2EgaWYgdGhlcmUgaXMgYSBjYXJyeVxuICAgIGlmIChiZlJlcy5iaW5hcnlNYW50aXNzYS5sZW5ndGggLSBiZlJlcy5tYW50aXNzYUJpdHNTaXplID09PSAxKSB7XG4gICAgICAvLyBSZW1vdmUgdGhlIGxhc3QgYml0XG4gICAgICBiZlJlcy5iaW5hcnlNYW50aXNzYSA9IGJmUmVzLmJpbmFyeU1hbnRpc3NhLnNsaWNlKDAsIC0xKTtcblxuICAgICAgLy8gQWRkIDEgdG8gdGhlIGV4cG9uZW50XG4gICAgICBiZlJlcy5iaW5hcnlFeHBvbmVudCA9IHRoaXMuX2JoLmFkZE51bWJlclRvQmluYXJ5KGJmUmVzLmJpbmFyeUV4cG9uZW50LCAxKVswXTtcbiAgICB9XG5cbiAgICByZXR1cm4gYmZSZXM7XG4gIH1cbn1cbiIsImltcG9ydCB7IEJpbmFyeUZsb2F0IH0gZnJvbSBcIi4vY2xhc3Nlcy9CaW5hcnlGbG9hdFwiO1xuXG5jb25zdCBmYkJpdHNTaXplRWxlbWVudCA9IDxIVE1MSW5wdXRFbGVtZW50PmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZmItYml0cy1zaXplXCIpO1xuY29uc3QgZmJGbG9hdGluZ051bWJlckVsZW1lbnQgPSA8SFRNTElucHV0RWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImZiLWZsb2F0aW5nLW51bWJlclwiKTtcbmNvbnN0IGZiUmVzdWx0RWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZmItcmVzdWx0XCIpO1xuXG5mdW5jdGlvbiBvbkNoYW5nZUNvbnZlcnRlckZiKCkge1xuICBjb25zdCBiaXRzU2l6ZSA9IE51bWJlcihmYkJpdHNTaXplRWxlbWVudC52YWx1ZSk7XG4gIGNvbnN0IGZsb2F0aW5nTnVtYmVyID0gTnVtYmVyKGZiRmxvYXRpbmdOdW1iZXJFbGVtZW50LnZhbHVlKTtcblxuICBpZiAoYml0c1NpemUgPCA4KSB7XG4gICAgZmJSZXN1bHRFbGVtZW50LmlubmVySFRNTCA9IGA8c3BhbiBjbGFzcz1cImNvbG9yLXJlZFwiPkxhIHRhaWxsZSBkZXMgYml0cyBkb2l0IGF1IG1pbmltdW0gw6p0cmUgODwvc3Bhbj5gO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGlmIChiaXRzU2l6ZSA+IDgwKSB7XG4gICAgZmJSZXN1bHRFbGVtZW50LmlubmVySFRNTCA9IGA8c3BhbiBjbGFzcz1cImNvbG9yLXJlZFwiPkxhIHRhaWxsZSBkZXMgYml0cyBkb2l0IGF1IG1heGltdW0gw6p0cmUgODA8L3NwYW4+YDtcbiAgICByZXR1cm47XG4gIH1cbiAgXG4gIGlmIChmYkJpdHNTaXplRWxlbWVudC52YWx1ZSA9PT0gXCJcIiB8fCBmYkZsb2F0aW5nTnVtYmVyRWxlbWVudC52YWx1ZSA9PT0gXCJcIikge1xuICAgIGZiUmVzdWx0RWxlbWVudC5pbm5lckhUTUwgPSBgPHNwYW4gY2xhc3M9XCJjb2xvci1ncmV5XCI+VmV1aWxsZXogcmVuc2VpZ25lciB0b3VzIGxlcyBjaGFtcHM8L3NwYW4+YDtcbiAgICByZXR1cm47XG4gIH1cbiAgXG4gIGNvbnN0IGJmID0gbmV3IEJpbmFyeUZsb2F0KGZsb2F0aW5nTnVtYmVyLCBiaXRzU2l6ZSk7XG4gIFxuICBpZiAoYmYub3ZlcmZsb3cpIHtcbiAgICBmYlJlc3VsdEVsZW1lbnQuaW5uZXJIVE1MID0gYDxzcGFuIGNsYXNzPVwiY29sb3ItcmVkXCI+Vm90cmUgbm9tYnJlIGJpbmFpcmUgZXN0IHRyb3AgZ3JhbmQgcG91ciDDqnRyZSBlbmNvZMOpIGVuICR7Yml0c1NpemV9IGJpdHM8L3NwYW4+YDtcbiAgICByZXR1cm47XG4gIH1cblxuICBmYlJlc3VsdEVsZW1lbnQuaW5uZXJIVE1MID0gYFxuICAgIDxkaXYgY2xhc3M9XCJyZXN1bHQtZ3JvdXBcIj5cbiAgICAgIFRhaWxsZSBlbiBiaXRzIGRlIGwnZXhwb3NhbnQ6ICR7YmYuZXhwb25lbnRCaXRzU2l6ZX1cbiAgICA8L2Rpdj5cbiAgICBcbiAgICA8ZGl2IGNsYXNzPVwicmVzdWx0LWdyb3VwXCI+XG4gICAgICBUYWlsbGUgZW4gYml0cyBkZSBsYSBtYW50aXNzZTogJHtiZi5tYW50aXNzYUJpdHNTaXplfVxuICAgIDwvZGl2PlxuXG4gICAgPGRpdiBjbGFzcz1cInJlc3VsdC1ncm91cFwiPlxuICAgICAgQmlhaXM6ICR7YmYuYmlhc31cbiAgICA8L2Rpdj5cbiAgICBcbiAgICA8ZGl2IGNsYXNzPVwicmVzdWx0LWdyb3VwXCI+XG4gICAgICBTaWduZTpcbiAgICAgIDxzcGFuIGNsYXNzPVwiY29sb3ItcmVkIG1vbm9cIj4ke2JmLmJpbmFyeVNpZ259PC9zcGFuPlxuICAgICAgPHNwYW4gY2xhc3M9XCJtb25vXCI+KCR7YmYuY29tcHV0ZWRTaWduID4gMCA/IFwiK1wiIDogXCItXCJ9KTwvc3Bhbj5cbiAgICA8L2Rpdj5cbiAgICBcbiAgICA8ZGl2IGNsYXNzPVwicmVzdWx0LWdyb3VwXCI+XG4gICAgICBNYW50aXNzZTpcbiAgICAgIDxzcGFuIGNsYXNzPVwiY29sb3Itb3JhbmdlIG1vbm9cIj5cbiAgICAgICAgJHtiZi5iaW5hcnlNYW50aXNzYX1cbiAgICAgIDwvc3Bhbj5cbiAgICAgIDxzcGFuIGNsYXNzPVwibW9ub1wiPigke2JmLmNvbXB1dGVkTWFudGlzc2F9KTwvc3Bhbj5cbiAgICA8L2Rpdj5cblxuICAgIDxkaXYgY2xhc3M9XCJyZXN1bHQtZ3JvdXBcIj5cbiAgICAgIEV4cG9zYW50OiA8c3BhbiBjbGFzcz1cImNvbG9yLWJsdWUgbW9ub1wiPiR7YmYuYmluYXJ5RXhwb25lbnR9PC9zcGFuPlxuICAgICAgPHNwYW4gY2xhc3M9XCJtb25vXCI+KDI8c3VwPiR7YmYuY29tcHV0ZWRFeHBvbmVudH08L3N1cD4pPC9zcGFuPlxuICAgIDwvZGl2PlxuICAgIFxuICAgIDxkaXYgY2xhc3M9XCJyZXN1bHQtZ3JvdXBcIj5cbiAgICAgIFLDqXN1bHRhdDpcbiAgICAgIDxzcGFuIGNsYXNzPVwiY29sb3ItcmVkIG1vbm9cIj4ke2JmLmJpbmFyeVNpZ259PC9zcGFuPlxuICAgICAgPHNwYW4gY2xhc3M9XCJjb2xvci1ibHVlIG1vbm9cIj4ke2JmLmJpbmFyeUV4cG9uZW50fTwvc3Bhbj5cbiAgICAgIDxzcGFuIGNsYXNzPVwiY29sb3Itb3JhbmdlIG1vbm9cIj4ke2JmLmJpbmFyeU1hbnRpc3NhfTwvc3Bhbj5cbiAgICA8L2Rpdj5cbiAgICBcbiAgICA8ZGl2IGNsYXNzPVwicmVzdWx0LWdyb3VwXCI+XG4gICAgICBOb21icmUgcsOpZWxsZW1lbnQgY29kw6k6ICR7YmYuY29tcHV0ZWROdW1iZXJ9XG4gICAgPC9kaXY+XG4gICAgXG4gICAgPGRpdiBjbGFzcz1cInJlc3VsdC1ncm91cFwiPlxuICAgICAgTWFyZ2UgZCdlcnJldXI6ICR7YmYuZXJyb3J9XG4gICAgPC9kaXY+XG4gIGA7XG59XG5cbmZiQml0c1NpemVFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgb25DaGFuZ2VDb252ZXJ0ZXJGYik7XG5mYkJpdHNTaXplRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwia2V5dXBcIiwgb25DaGFuZ2VDb252ZXJ0ZXJGYik7XG5mYkZsb2F0aW5nTnVtYmVyRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsIG9uQ2hhbmdlQ29udmVydGVyRmIpO1xuZmJGbG9hdGluZ051bWJlckVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImtleXVwXCIsIG9uQ2hhbmdlQ29udmVydGVyRmIpO1xuXG5vbkNoYW5nZUNvbnZlcnRlckZiKCk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=
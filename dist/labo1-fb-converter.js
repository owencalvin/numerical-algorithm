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
        return (decimal >>> 0).toString(2);
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
        return this.decimalToBinary(this.binaryToDecimal(b) * Math.pow(2, shiftValue));
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
        return this.binaryAddition(bp1, this.c2(bp2));
    };
    BinaryHelper.prototype.c2 = function (b) {
        b = this.invert(b);
        return this.binaryAddition(b, "1").reverse().join("");
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
    Object.defineProperty(BinaryFloat.prototype, "computedNumber", {
        /**
         * The number that is coded in memory
         */
        get: function () {
            if (Number.isNaN(this.number) ||
                this.number === Infinity ||
                this.number === 0) {
                return this.number;
            }
            if (this.binaryExponent.indexOf("0") === -1 &&
                this.binaryMantissa.indexOf("0") === -1 &&
                this.binarySign === "0") {
                return NaN;
            }
            if (this.binaryExponent.indexOf("0") === -1 &&
                this.binaryMantissa.indexOf("1") === -1 &&
                this.binarySign === "0") {
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
        if (Number.isNaN(this.computedNumber) || Number.isNaN(bf2)) {
            return BinaryFloat.getNaN(this.bitsSize);
        }
        if (this.computedNumber === Infinity || bf2.computedNumber === Infinity) {
            return BinaryFloat.getInfinity(this.bitsSize);
        }
        // Step 1: Determine the lowest exponent between this and the second number
        var bfMinBinaryExponent = this;
        var bfMaxBinaryExponent = bf2;
        if (this._bh.binaryToDecimal(bf2.binaryExponent) < this._bh.binaryToDecimal(bfMinBinaryExponent.binaryExponent)) {
            bfMinBinaryExponent = bf2;
            bfMaxBinaryExponent = this;
        }
        // Step 2: Shift the mantissa
        var shiftValue = bfMaxBinaryExponent.computedExponent - bfMinBinaryExponent.computedExponent;
        var shiftedMinMantissa = this._bh.shiftRight("1" + bfMinBinaryExponent.binaryMantissa, shiftValue);
        bfMinBinaryExponent = new BinaryFloat(bfMinBinaryExponent.computedNumber, this.bitsSize);
        bfMinBinaryExponent.binaryMantissa = shiftedMinMantissa;
        bfRes.binaryMantissa = shiftedMinMantissa;
        // Step 3: Put the same exponent
        bfRes.binaryExponent = bfMaxBinaryExponent.binaryExponent;
        // Step 4: Add the mantissa and the shifted one
        if (bfMinBinaryExponent.computedSign === bfMaxBinaryExponent.computedSign) {
            bfRes.binaryMantissa = this._bh.binaryAddition("1" + bfMaxBinaryExponent.binaryMantissa, bfRes.binaryMantissa).reverse().join("");
        }
        else {
            var minusBf = "1" + bfMaxBinaryExponent.binaryMantissa;
            var baseBf = bfMinBinaryExponent.binaryMantissa;
            if (bfMinBinaryExponent.computedSign === -1) {
                baseBf = minusBf;
                minusBf = bfMinBinaryExponent.binaryMantissa;
            }
            bfRes.binaryMantissa = this._bh.binarySubstraction(baseBf, minusBf).reverse().join("");
            console.log(baseBf, minusBf, bfRes.binaryMantissa);
        }
        // Step 5: Normalise the mantissa
        if (bfRes.binaryMantissa.length - bfRes.mantissaBitsSize === 1) {
            console.log(bfRes.binaryMantissa.length - bfRes.mantissaBitsSize);
            // Hide the first bit
            bfRes.binaryMantissa = bfRes.binaryMantissa.substring(1);
        }
        // Normalize if there is a carry
        if (bfRes.binaryMantissa.length - bfRes.mantissaBitsSize === 2) {
            // Hide the first bit
            bfRes.binaryMantissa = bfRes.binaryMantissa.substring(1);
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
    fbResultElement.innerHTML = "\n    <div class=\"result-group\">\n      Taille en bits de l'exposant: ".concat(bf.exponentBitsSize, "\n    </div>\n    \n    <div class=\"result-group\">\n      Taille en bits de la mantisse: ").concat(bf.mantissaBitsSize, "\n    </div>\n\n    <div class=\"result-group\">\n      Biais: ").concat(bf.bias, "\n    </div>\n    \n    <div class=\"result-group\">\n      Signe:\n      <span class=\"color-red mono\">").concat(bf.binarySign, "</span>\n      <span class=\"mono\">(").concat(bf.computedSign, ")</span>\n    </div>\n    \n    <div class=\"result-group\">\n      Mantisse:\n      <span class=\"color-orange mono\">\n        ").concat(bf.binaryMantissa, "\n      </span>\n      <span class=\"mono\">(").concat(bf.computedMantissa, ")</span>\n    </div>\n\n    <div class=\"result-group\">\n      Exposant: <span class=\"color-blue mono\">").concat(bf.binaryExponent, "</span>\n      <span class=\"mono\">(2<sup>").concat(bf.computedExponent, "</sup>)</span>\n    </div>\n    \n    <div class=\"result-group\">\n      R\u00E9sultat:\n      <span class=\"color-red mono\">").concat(bf.binarySign, "</span>\n      <span class=\"color-blue mono\">").concat(bf.binaryExponent, "</span>\n      <span class=\"color-orange mono\">").concat(bf.binaryMantissa, "</span>\n    </div>\n    \n    <div class=\"result-group\">\n      Nombre r\u00E9ellement cod\u00E9: ").concat(bf.computedNumber, "\n    </div>\n    \n    <div class=\"result-group\">\n      Marge d'erreur: ").concat(bf.error, "\n    </div>\n  ");
}
fbBitsSizeElement.addEventListener("change", onChangeConverterFb);
fbBitsSizeElement.addEventListener("keyup", onChangeConverterFb);
fbFloatingNumberElement.addEventListener("change", onChangeConverterFb);
fbFloatingNumberElement.addEventListener("keyup", onChangeConverterFb);
onChangeConverterFb();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFFO1FBQ2YsZUFBZSxDQUFDLFNBQVMsR0FBRyxzR0FBbUYsUUFBUSxpQkFBYyxDQUFDO1FBQ3RJLE9BQU87S0FDUjtJQUVELGVBQWUsQ0FBQyxTQUFTLEdBQUcsa0ZBRVEsRUFBRSxDQUFDLGdCQUFnQix3R0FJbEIsRUFBRSxDQUFDLGdCQUFnQiw0RUFJM0MsRUFBRSxDQUFDLElBQUksc0hBS2UsRUFBRSxDQUFDLFVBQVUsa0RBQ3RCLEVBQUUsQ0FBQyxZQUFZLDhJQU1qQyxFQUFFLENBQUMsY0FBYywwREFFQyxFQUFFLENBQUMsZ0JBQWdCLHVIQUlDLEVBQUUsQ0FBQyxjQUFjLHdEQUMvQixFQUFFLENBQUMsZ0JBQWdCLDRJQUtoQixFQUFFLENBQUMsVUFBVSw0REFDWixFQUFFLENBQUMsY0FBYyw4REFDZixFQUFFLENBQUMsY0FBYyxrSEFJekIsRUFBRSxDQUFDLGNBQWMseUZBSXpCLEVBQUUsQ0FBQyxLQUFLLHFCQUU3QixDQUFDO0FBQ0osQ0FBQztBQUVELGlCQUFpQixDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxtQkFBbUIsQ0FBQyxDQUFDO0FBQ2xFLGlCQUFpQixDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxtQkFBbUIsQ0FBQyxDQUFDO0FBQ2pFLHVCQUF1QixDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxtQkFBbUIsQ0FBQyxDQUFDO0FBQ3hFLHVCQUF1QixDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxtQkFBbUIsQ0FBQyxDQUFDO0FBRXZFLG1CQUFtQixFQUFFLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9tYXRoX3NwZS8uL3NyYy9jbGFzc2VzL0JpbmFyeUhlbHBlci50cyIsIndlYnBhY2s6Ly9tYXRoX3NwZS8uL3NyYy9jbGFzc2VzL0JpbmFyeUZsb2F0LnRzIiwid2VicGFjazovL21hdGhfc3BlLy4vc3JjL2xhYm8xLWZiLWNvbnZlcnRlci50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgQmluYXJ5SGVscGVyIHtcbiAgLyoqXG4gICAqIEdldCBuIGJpdCBvZiAwIG9yIDFcbiAgICogQHBhcmFtIHZhbHVlIDEgb3IgMFxuICAgKiBAcGFyYW0gbiBUaGUgbnVtYmVyIG9mIGJpdHMgdG8gcmV0cmlldmVcbiAgICogQHJldHVybnMgbiBiaXQgb2YgMCBvciAxXG4gICAqL1xuICBwdWJsaWMgZ2V0TkJpdCh2YWx1ZTogMSB8IDAsIG46IG51bWJlcik6IHN0cmluZyB7XG4gICAgbGV0IHJlcyA9IFwiXCI7XG4gICAgXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuOyBpKyspIHtcbiAgICAgIHJlcyArPSB2YWx1ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZCBuIHplcm9zIGJlZm9yZSB0aGUgYmluYXJ5IG51bWJlclxuICAgKiBAcGFyYW0gbiBUaGUgbnVtYmVyIG9mIDAgdG8gYWRkIGJlZm9yZSB0aGUgYmluYXJ5IG51bWJlclxuICAgKiBAcGFyYW0gYiBUaGUgYmluYXJ5IG51bWJlclxuICAgKiBAcmV0dXJucyBUaGUgYmluYXJ5IG51bWJlciB3aXRoIG4gemVyb3MgYmVmb3JlXG4gICAqL1xuICBwdWJsaWMgYWRkUGFkZGluZyhuOiBudW1iZXIsIGIgPSBcIlwiKSB7XG4gICAgY29uc3Qgc2l6ZSA9IG4gLSBiLmxlbmd0aDtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2l6ZTsgaSsrKSB7XG4gICAgICBiID0gXCIwXCIgKyBiO1xuICAgIH1cblxuICAgIHJldHVybiBiO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgdGhlIHplcm9zIGJlZm9yZSBhIGJpbmFyeSBudW1iZXIgKDAwMDEwMSBiZWNvbWVzIDEwMSlcbiAgICogQHBhcmFtIGIgVGhlIGJpbmFyeSBudW1iZXJcbiAgICogQHJldHVybnMgVGhlIHByb2R1Y2VkIGJpbmFyeSBudW1iZXJcbiAgICovXG4gIHB1YmxpYyBjbGVhbihiOiBzdHJpbmcpIHtcbiAgICBsZXQgcmVzID0gYjtcblxuICAgIGZvcihsZXQgaSA9IDA7IGkgPCBiLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoYltpXSA9PT0gXCIwXCIpIHtcbiAgICAgICAgcmVzID0gcmVzLnN1YnN0cmluZygxKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiByZXM7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHJlcyA9PT0gXCJcIikge1xuICAgICAgcmV0dXJuIFwiMFwiO1xuICAgIH1cbiAgfVxuXG5cbiAgLyoqXG4gICAqIEFkZCAwIHBhZGRpbmcgdG8gdGhlIHNtYWxsZXN0IGJpbmFyeSBudW1iZXIgdG8gbWF0Y2ggdGhlIGxvbmdlc3Qgb25lJ3MgbGVuZ3RoXG4gICAqIFsxMDEsIDExMDAxXSBiZWNvbWVzIFswMDEwMSwgMTEwMDFdXG4gICAqIEBwYXJhbSBiMSBUaGUgZmlyc3QgYmluYXJ5IG51bWJlclxuICAgKiBAcGFyYW0gYjIgVGhlIHNlY29uZCBiaW5hcnkgbnVtYmVyXG4gICAqIEByZXR1cm5zIFtiMSwgYjJdIHdpdGggY29ycmVjdCBwYWRkaW5nXG4gICAqL1xuICBwdWJsaWMgYWRkTWF4UGFkZGluZyhiMTogc3RyaW5nLCBiMjogc3RyaW5nKSB7XG4gICAgaWYgKGIyLmxlbmd0aCA+IGIxLmxlbmd0aCkge1xuICAgICAgYjEgPSB0aGlzLmFkZFBhZGRpbmcoYjIubGVuZ3RoLCBiMSk7XG4gICAgfSBlbHNlIGlmIChiMS5sZW5ndGggPiBiMi5sZW5ndGgpIHtcbiAgICAgIGIyID0gdGhpcy5hZGRQYWRkaW5nKGIxLmxlbmd0aCwgYjIpO1xuICAgIH1cblxuICAgIHJldHVybiBbYjEsIGIyXTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRNYXhMZW5ndGgoYjE6IHN0cmluZywgYjI6IHN0cmluZykge1xuICAgIGlmIChiMS5sZW5ndGggPiBiMi5sZW5ndGgpIHtcbiAgICAgIHJldHVybiBiMS5sZW5ndGg7XG4gICAgfVxuICAgIHJldHVybiBiMi5sZW5ndGg7XG4gIH1cblxuICAvKipcbiAgICogQ29udmVydCBhIG51bWJlciB0byBpdCdzIGJpbmFyeSByZXByZXNlbnRhdGlvblxuICAgKiBAcGFyYW0gZGVjaW1hbCBUaGUgXG4gICAqIEByZXR1cm5zIFRoZSBiaW5hcnkgcmVwcmVzZW50YXRpb24gb2YgdGhlIGRlY2ltYWwgbnVtYmVyXG4gICAqL1xuICBwdWJsaWMgZGVjaW1hbFRvQmluYXJ5KGRlY2ltYWw6IG51bWJlcikge1xuICAgIHJldHVybiAoZGVjaW1hbCA+Pj4gMCkudG9TdHJpbmcoMik7XG4gIH1cblxuICAvKipcbiAgICogQ29udmVydCBhIGJpbmFyeSByZXByZXNlbnRhdGlvbiBvZiBhIG51bWJlciB0byBhIGRlY2ltYWwgbnVtYmVyXG4gICAqIEBwYXJhbSBiaW5hcnkgVGhlIGJpbmFyeSByZXByZXNlbnRhdGlvbiBvZiBhIG51bWJlclxuICAgKiBAcmV0dXJucyBUaGUgaW50IHJlcHJlc2VudGF0aW9uIG9mIGEgYmluYXJ5IG51bWJlclxuICAgKi9cbiAgcHVibGljIGJpbmFyeVRvRGVjaW1hbChiaW5hcnk6IHN0cmluZykge1xuICAgIHJldHVybiBwYXJzZUludChiaW5hcnksIDIpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZCBpbnQgdG8gYSBiaW5hcnkgbnVtYmVyXG4gICAqIEBwYXJhbSBiIFRoZSBiaW5hcnkgbnVtYmVyXG4gICAqIEBwYXJhbSBuIFRoZSBpbnQgbnVtYmVyIHRvIGFkZCB0byB0aGUgYmluYXJ5IG51bWJlclxuICAgKiBAcmV0dXJucyBUaGUgcHJvZHVjZWQgcmVzdWx0XG4gICAqL1xuICBwdWJsaWMgYWRkTnVtYmVyVG9CaW5hcnkoYjogc3RyaW5nLCBuOiBudW1iZXIpOiBzdHJpbmdbXSB7XG4gICAgcmV0dXJuIHRoaXMuYmluYXJ5QWRkaXRpb24oYiwgdGhpcy5kZWNpbWFsVG9CaW5hcnkobikpO1xuICB9XG5cbiAgLyoqXG4gICAqIEludmVydCBhIGJpbmFyeSBudW1iZXJcbiAgICogQHBhcmFtIGIgVGhlIGJpbmFyeSBudW1iZXIgdG8gaW52ZXJ0XG4gICAqIEByZXR1cm5zIFRoZSBpbnZlcnQgYmluYXJ5IG51bWJlclxuICAgKi9cbiAgcHVibGljIGludmVydChiOiBzdHJpbmcpIHtcbiAgICBjb25zdCBpbml0aWFsTGVuZ3RoID0gYi5sZW5ndGg7XG4gICAgYiA9IHRoaXMuZGVjaW1hbFRvQmluYXJ5KHRoaXMuYmluYXJ5VG9EZWNpbWFsKGIpIF4gdGhpcy5iaW5hcnlUb0RlY2ltYWwodGhpcy5nZXROQml0KDEsIGIubGVuZ3RoKSkpO1xuICAgIGIgPSB0aGlzLmFkZFBhZGRpbmcoaW5pdGlhbExlbmd0aCwgYik7XG4gICAgcmV0dXJuIGI7XG4gIH1cblxuICAvKipcbiAgICogU2hpZnQgdGhlIGJpbmFyeSBudW1iZXIgdG8gdGhlIHJpZ2h0XG4gICAqIEBwYXJhbSBiIFRoZSBiaW5hcnkgbnVtYmVyXG4gICAqIEBwYXJhbSBzaGlmdFZhbHVlIFRoZSBzaGlmdCB2YWx1ZVxuICAgKiBAcmV0dXJucyBUaGUgc2hpZnRlZCBiaW5hcnkgbnVtYmVyXG4gICAqL1xuICBwdWJsaWMgc2hpZnRSaWdodChiOiBzdHJpbmcsIHNoaWZ0VmFsdWU6IG51bWJlcikge1xuICAgIC8vIFwiMDAwMDAxMDEwXCIgPj4gMiA9PiBcIjAwMDAwMDAxMFwiXG4gICAgLy8gMS4gUmVtb3ZlcyBsYXN0cyA8c2hpZnRWYWx1ZT4gYml0c1xuICAgIC8vIDIuIFBsYWNlcyA8c2hpZnRWYWx1ZT4gYml0cyBhdCAwIGJlZm9yZVxuXG4gICAgaWYgKHNoaWZ0VmFsdWUgPCAxKSB7XG4gICAgICByZXR1cm4gYjtcbiAgICB9XG5cbiAgICBsZXQgcmVzID0gYjtcbiAgICByZXMgPSByZXMuc2xpY2UoMCwgLXNoaWZ0VmFsdWUpO1xuICAgIHJlcyA9IFwiXCIucGFkU3RhcnQoc2hpZnRWYWx1ZSwgXCIwXCIpICsgcmVzO1xuXG4gICAgcmV0dXJuIHJlcztcbiAgfVxuXG4gIC8qKlxuICAgKiBTaGlmdCB0aGUgYmluYXJ5IG51bWJlciB0byB0aGUgbGVmdFxuICAgKiBAcGFyYW0gYiBUaGUgYmluYXJ5IG51bWJlclxuICAgKiBAcGFyYW0gc2hpZnRWYWx1ZSBUaGUgc2hpZnQgdmFsdWVcbiAgICogQHJldHVybnMgVGhlIHNoaWZ0ZWQgYmluYXJ5IG51bWJlclxuICAgKi9cbiAgcHVibGljIHNoaWZ0TGVmdChiOiBzdHJpbmcsIHNoaWZ0VmFsdWU6IG51bWJlcikge1xuICAgIHJldHVybiB0aGlzLmRlY2ltYWxUb0JpbmFyeSh0aGlzLmJpbmFyeVRvRGVjaW1hbChiKSAqIE1hdGgucG93KDIsIHNoaWZ0VmFsdWUpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGQgMiBiaXQgdG9nZXRoZXIgd2l0aCB0aGUgY2FycnlcbiAgICogQHBhcmFtIHggVGhlIGZpcnN0IGJpdFxuICAgKiBAcGFyYW0geSBUaGUgc2Vjb25kIGJpdFxuICAgKiBAcGFyYW0gY2FycnkgVGhlIGNhcnJ5XG4gICAqIEByZXR1cm5zIFRoZSByZXN1bHQgd2l0aCB0aGUgY2FycnkgW2JpdCwgY2FycnldXG4gICAqL1xuICBwdWJsaWMgZWxlbWVudGFyeUFkZGl0aW9uKHg6IHN0cmluZywgeTogc3RyaW5nLCBjYXJyeSA9IFwiXCIpOiBzdHJpbmdbXSB7XG4gICAgY29uc3QgcmVzID0gTnVtYmVyKHgpICsgTnVtYmVyKHkpICsgTnVtYmVyKGNhcnJ5KTtcblxuICAgIHN3aXRjaCAocmVzKSB7XG4gICAgICAvLyBjID0gMSwgeCA9IDEsIHkgPSAxXG4gICAgICBjYXNlIDM6XG4gICAgICAgIHJldHVybiBbXCIxXCIsIFwiMVwiXTtcbiAgICAgIGNhc2UgMjpcbiAgICAgICAgcmV0dXJuIFtcIjBcIiwgXCIxXCJdO1xuICAgICAgY2FzZSAxOlxuICAgICAgICByZXR1cm4gW1wiMVwiLCBcIlwiXTtcbiAgICAgIC8vIGMgPSAwLCB4ID0gMCwgeSA9IDBcbiAgICAgIGNhc2UgMDpcbiAgICAgICAgcmV0dXJuIFtcIjBcIiwgXCJcIl07XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEFkZCAyIGJpbmFyeSBudW1iZXJzXG4gICAqIEBwYXJhbSBiMSBUaGUgZmlyc3QgYmluYXJ5IG51bWJlclxuICAgKiBAcGFyYW0gYjIgVGhlIHNlY29uZCBiaW5hcnkgbnVtYmVyXG4gICAqIEByZXR1cm5zIFRoZSByZXN1bHQgb2YgdGhlIGFkZGl0aW9uIFtiaW5hcnlOdW1iZXIsIGNhcnJ5Qml0XVxuICAgKi9cbiAgcHVibGljIGJpbmFyeUFkZGl0aW9uKGIxOiBzdHJpbmcsIGIyOiBzdHJpbmcpIHtcbiAgICBsZXQgcmVzID0gXCJcIjtcbiAgICBsZXQgY2FycnkgPSBcIlwiO1xuICAgIGNvbnN0IFticDEsIGJwMl0gPSB0aGlzLmFkZE1heFBhZGRpbmcoYjEsIGIyKTtcblxuICAgIGZvciAobGV0IGkgPSBicDEubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgIGNvbnN0IFtyLCBjXSA9IHRoaXMuZWxlbWVudGFyeUFkZGl0aW9uKGJwMVtpXSwgYnAyW2ldLCBjYXJyeSk7XG4gICAgICByZXMgPSByICsgcmVzO1xuICAgICAgY2FycnkgPSBjO1xuICAgIH1cblxuICAgIHJldHVybiBbcmVzLCBjYXJyeV07XG4gIH1cblxuICAvKipcbiAgICogU3Vic3RyYWN0IDIgYmluYXJ5IG51bWJlcnNcbiAgICogQHBhcmFtIGIxIFRoZSBmaXJzdCBiaW5hcnkgbnVtYmVyXG4gICAqIEBwYXJhbSBiMiBUaGUgc2Vjb25kIGJpbmFyeSBudW1iZXJcbiAgICogQHJldHVybnMgVGhlIHJlc3VsdCBvZiB0aGUgc3Vic3RyYWN0aW9uIFtiaW5hcnlOdW1iZXIsIGNhcnJ5Qml0XVxuICAgKi9cbiAgcHVibGljIGJpbmFyeVN1YnN0cmFjdGlvbihiMTogc3RyaW5nLCBiMjogc3RyaW5nKSB7XG4gICAgY29uc3QgW2JwMSwgYnAyXSA9IHRoaXMuYWRkTWF4UGFkZGluZyhiMSwgYjIpO1xuICAgIHJldHVybiB0aGlzLmJpbmFyeUFkZGl0aW9uKGJwMSwgdGhpcy5jMihicDIpKTtcbiAgfVxuXG4gIHB1YmxpYyBjMihiOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIGIgPSB0aGlzLmludmVydChiKTtcbiAgICByZXR1cm4gdGhpcy5iaW5hcnlBZGRpdGlvbihiLCBcIjFcIikucmV2ZXJzZSgpLmpvaW4oXCJcIik7XG4gIH1cblxuICAvKipcbiAgICogTXVsdGlwbHkgMiBiaW5hcnkgbnVtYmVyc1xuICAgKiBAcGFyYW0gYjEgVGhlIGZpcnN0IGJpbmFyeSBudW1iZXJcbiAgICogQHBhcmFtIGIyIFRoZSBzZWNvbmQgYmluYXJ5IG51bWJlclxuICAgKiBAcmV0dXJucyBUaGUgcmVzdWx0IG9mIHRoZSBtdWx0aXBsaWNhdGlvblxuICAgKi9cbiAgcHVibGljIGJpbmFyeU11bHRpcGxpY2F0aW9uKGIxOiBzdHJpbmcsIGIyOiBzdHJpbmcpIHtcbiAgICBsZXQgcmVzID0gXCJcIjtcbiAgICBjb25zdCBhZGRSZXN1bHRzID0gW107XG5cbiAgICAvLyBUaGUgYmluYXJ5IG51bWJlcnMgdG8gbXVsaXRwbHlcbiAgICAvLyBicDEgPSAxMDExXG4gICAgLy8gYnAyID0gMTExMVxuICAgIGNvbnN0IFticDEsIGJwMl0gPSB0aGlzLmFkZE1heFBhZGRpbmcoYjEsIGIyKTtcblxuICAgIC8vIENhbGN1bGF0ZSB0aGUgb3BlcmFuZHNcbiAgICAvLyBhZGRSZXN1bHRzID0gW1xuICAgIC8vICAgIDAwMDAgMTAxMSxcbiAgICAvLyAgICAwMDAxIDAxMTAsXG4gICAgLy8gICAgMDAxMCAxMTAwLFxuICAgIC8vICAgIDEwMTEgMDAwMFxuICAgIC8vIF1cbiAgICBmb3IgKGxldCBpID0gYnAxLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICBsZXQgY3VycmVudFJlcyA9IFwiXCI7XG5cbiAgICAgIGZvciAobGV0IGogPSBicDEubGVuZ3RoIC0gMTsgaiA+PSAwOyBqLS0pIHtcbiAgICAgICAgY3VycmVudFJlcyA9IChOdW1iZXIoYnAxW2pdKSAqIE51bWJlcihicDJbaV0pKSArIGN1cnJlbnRSZXM7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGRlYyA9IHRoaXMuYmluYXJ5VG9EZWNpbWFsKGN1cnJlbnRSZXMpIDw8IChicDEubGVuZ3RoIC0gMSAtIGkpO1xuICAgICAgY3VycmVudFJlcyA9IHRoaXMuZGVjaW1hbFRvQmluYXJ5KGRlYyk7XG4gICAgICBhZGRSZXN1bHRzLnB1c2goY3VycmVudFJlcyk7XG4gICAgfVxuXG4gICAgLy8gQWRkIGV2ZXJ5dGhpbmdcbiAgICAvLyByZXMgPVxuICAgIC8vICAgMDAwMCAxMDExLFxuICAgIC8vICsgMDAwMSAwMTEwLFxuICAgIC8vICsgMDAxMCAxMTAwLFxuICAgIC8vICsgMTAxMSAwMDAwXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhZGRSZXN1bHRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBhZGRSZXN1bHQgPSB0aGlzLmFkZFBhZGRpbmcoYWRkUmVzdWx0c1thZGRSZXN1bHRzLmxlbmd0aCAtIDFdLmxlbmd0aCwgYWRkUmVzdWx0c1tpXSk7XG4gICAgICBjb25zdCBbciwgY10gPSB0aGlzLmJpbmFyeUFkZGl0aW9uKHJlcywgYWRkUmVzdWx0KTtcbiAgICAgIHJlcyA9IGMgKyByO1xuICAgIH1cblxuICAgIC8vIHJlcyA9IDEwMTAwMTAxXG4gICAgcmV0dXJuIHJlcztcbiAgfVxufVxuIiwiaW1wb3J0IHsgQmluYXJ5SGVscGVyIH0gZnJvbSBcIi4vQmluYXJ5SGVscGVyXCI7XG5cbi8qKlxuICogRW5jb2RlIGEgZmxvYXRpbmcgbnVtYmVyIHdpdGggYSBjaG9vc2VuIGJpdCBzaXplIGFuZCBJRUVFIDc1NFxuICovXG5leHBvcnQgY2xhc3MgQmluYXJ5RmxvYXQge1xuICBwcml2YXRlIF9iaXRzU2l6ZSA9IDMyO1xuICBwcml2YXRlIF9udW1iZXIgPSAwO1xuICBwcml2YXRlIF9iaW5hcnlTaWduOiBcIjFcIiB8IFwiMFwiID0gXCIwXCI7XG4gIHByaXZhdGUgX2JpbmFyeU1hbnRpc3NhID0gXCJcIjtcbiAgcHJpdmF0ZSBfb3ZlcmZsb3cgPSBmYWxzZTtcbiAgcHJpdmF0ZSBfbWFudGlzc2FEb3RQb3NpdGlvbiA9IDA7XG4gIHByaXZhdGUgX2JpbmFyeUV4cG9uZW50ID0gXCJcIjtcbiAgcHJpdmF0ZSBfYmlhcyA9IDA7XG4gIHByaXZhdGUgX2JoID0gbmV3IEJpbmFyeUhlbHBlcigpO1xuXG4gIGNvbnN0cnVjdG9yKG51bWJlck9yQmluYXJ5OiBzdHJpbmcpO1xuICBjb25zdHJ1Y3RvcihudW1iZXJPckJpbmFyeTogbnVtYmVyLCBiaXRzU2l6ZTogbnVtYmVyKTtcbiAgY29uc3RydWN0b3IobnVtYmVyT3JCaW5hcnk6IG51bWJlciB8IHN0cmluZywgYml0c1NpemU/OiBudW1iZXIpIHtcbiAgICBpZiAodHlwZW9mIG51bWJlck9yQmluYXJ5ID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAvLyBSZW1vdmUgdGhlIHNwYWNlcyBpbiB0aGUgc3RyaW5nXG4gICAgICBudW1iZXJPckJpbmFyeSA9IG51bWJlck9yQmluYXJ5LnRyaW0oKTtcbiAgICAgIG51bWJlck9yQmluYXJ5ID0gbnVtYmVyT3JCaW5hcnkucmVwbGFjZSgvXFxzL2csIFwiXCIpO1xuICAgICAgdGhpcy5iaXRzU2l6ZSA9IG51bWJlck9yQmluYXJ5Lmxlbmd0aDtcbiAgICAgIHRoaXMubnVtYmVyID0gMTtcblxuICAgICAgLy8gU2xpY2UgdGhlIHN0cmluZyB0byBhc3NpZ24gdGhlIGJpbmFyeSBudW1iZXIgdG8gdGhlIGNvcnJlY3QgcGFydCBvZiB0aGUgYmluYXJ5IHJlcHJlc2VudGF0aW9uIG9mIHRoZSBmbG9hdFxuICAgICAgdGhpcy5iaW5hcnlTaWduID0gbnVtYmVyT3JCaW5hcnlbMF0gYXMgXCIwXCIgfCBcIjFcIjtcbiAgICAgIHRoaXMuYmluYXJ5RXhwb25lbnQgPSBudW1iZXJPckJpbmFyeS5zbGljZSgxLCB0aGlzLmV4cG9uZW50Qml0c1NpemUgKyAxKTtcbiAgICAgIHRoaXMuYmluYXJ5TWFudGlzc2EgPSBudW1iZXJPckJpbmFyeS5zbGljZSh0aGlzLmV4cG9uZW50Qml0c1NpemUgKyAxLCB0aGlzLmJpdHNTaXplKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5iaXRzU2l6ZSA9IGJpdHNTaXplO1xuICAgICAgdGhpcy5udW1iZXIgPSBudW1iZXJPckJpbmFyeTtcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgZ2V0SW5maW5pdHkoYml0c1NpemU6IG51bWJlcikge1xuICAgIHJldHVybiBuZXcgQmluYXJ5RmxvYXQoSW5maW5pdHksIGJpdHNTaXplKTtcbiAgfVxuXG4gIHN0YXRpYyBnZXROYU4oYml0c1NpemU6IG51bWJlcikge1xuICAgIHJldHVybiBuZXcgQmluYXJ5RmxvYXQoTmFOLCBiaXRzU2l6ZSk7XG4gIH1cblxuICAvKipcbiAgICogVGhlIGZsb2F0IG51bWJlciB0byBjb2RlZCB3aXRoIElFRUUgNzU0XG4gICAqL1xuICBnZXQgbnVtYmVyKCkge1xuICAgIHJldHVybiB0aGlzLl9udW1iZXI7XG4gIH1cblxuICBzZXQgbnVtYmVyKHZhbHVlOiBudW1iZXIpIHtcbiAgICB0aGlzLl9udW1iZXIgPSB2YWx1ZTtcblxuICAgIHRoaXMuY2FsY3VsYXRlQmluYXJ5U2lnbigpO1xuICAgIHRoaXMuY2FsY3VsYXRlQmlhcygpO1xuICAgIHRoaXMuY2FsY3VsYXRlQmluYXJ5TWFudGlzc2EoKTtcbiAgICB0aGlzLmNhbGN1bGF0ZUJpbmFyeUV4cG9uZW50KCk7XG4gIH1cblxuICAvKipcbiAgICogVGhlIGJpdCBzaXplIHRvIGNvZGUgdGhlIG51bWJlclxuICAgKi9cbiAgZ2V0IGJpdHNTaXplKCkge1xuICAgIHJldHVybiB0aGlzLl9iaXRzU2l6ZTtcbiAgfVxuXG4gIHNldCBiaXRzU2l6ZSh2YWx1ZTogbnVtYmVyKSB7XG4gICAgdGhpcy5fYml0c1NpemUgPSB2YWx1ZTtcblxuICAgIGlmICh2YWx1ZSA+IDgwKSB7XG4gICAgICB0aGlzLl9iaXRzU2l6ZSA9IDgwO1xuICAgIH1cblxuICAgIGlmICh2YWx1ZSA8IDgpIHtcbiAgICAgIHRoaXMuX2JpdHNTaXplID0gODtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBtYW50aXNzYSBiaXRzIHNpemVcbiAgICovXG4gIGdldCBtYW50aXNzYUJpdHNTaXplKCkge1xuICAgIGlmICh0aGlzLmJpdHNTaXplIDwgOCkge1xuICAgICAgcmV0dXJuIDA7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuYml0c1NpemUgLSB0aGlzLmV4cG9uZW50Qml0c1NpemUgLSAxO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgZXhwb25lbnQgYml0cyBzaXplIHdpdGg6XG4gICAqIC0gVGhlIElFRUUgNzU0IDIwMTkgZm9ybXVsYSBpZiB0aGUgYml0cyBzaXplIGlzIGdyZWF0ZXIgb3IgZXF1YWwgdG8gMTI4XG4gICAqIC0gQSBjdXN0b20gZm9ybXVsYSBpZiB0aGUgYml0IHNpemUgaXMgbGVzcyB0aGFuIDEyOCB0aGF0IG1hdGNoZXMgdGhlIElFRUUgc3RhbmRhcmRcbiAgICogXG4gICAqIFZpc3VhbGl6ZSB0aGUgZnVuY3Rpb24gb24gZ2VvZ2VicmE6XG4gICAqIGh0dHBzOi8vd3d3Lmdlb2dlYnJhLm9yZy9jYWxjdWxhdG9yL2NlcnJrZGZ2XG4gICAqL1xuICBnZXQgZXhwb25lbnRCaXRzU2l6ZSgpIHtcbiAgICBpZiAodGhpcy5iaXRzU2l6ZSA8IDgpIHtcbiAgICAgIHJldHVybiAwO1xuICAgIH1cblxuICAgIC8vIElFRUUgNzU0IDIwMTkgZm9ybXVsYSA+PSAxMjhcbiAgICBpZiAodGhpcy5iaXRzU2l6ZSA+PSAxMjgpIHtcbiAgICAgIHJldHVybiBNYXRoLnJvdW5kKDQgKiBNYXRoLmxvZzIodGhpcy5iaXRzU2l6ZSkpIC0gMTM7XG4gICAgfVxuXG4gICAgLy8gQSBmb3JtdWxhIHRoYXQgbWF0Y2hlcyB0aGUgdmFsdWVzIGZvciA8IDEyOFxuICAgIC8vIHJlZjogaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9hLzYyNjMyMjYwXG4gICAgcmV0dXJuIE1hdGgucm91bmQoKE1hdGgubG9nMih0aGlzLmJpdHNTaXplKSAtIDEpICoqICgzIC8gMikpO1xuICB9XG5cbiAgZ2V0IHBvc2l0aXZlTnVtYmVyKCkge1xuICAgIHJldHVybiBNYXRoLmFicyh0aGlzLm51bWJlcik7XG4gIH1cblxuICAvKipcbiAgICogQ2FsY3VsYXRlIHRoZSBwb3NpdGlvbiBvZiB0aGUgZG90IGluIHRoZSBtYW50aXNzYVxuICAgKiAgICAgICAgICAgIGZsb2F0IHBvc2l0aW9uXG4gICAqICAgICAgICAgICAgICAgICAgfFxuICAgKiAgICAgICAgICAgICAgICAgIHZcbiAgICogbWFudGlzc2EoMTkuNTkzNzUpID0+IFwiMDAxMS4xMDAxMTAwMDAwMDAwMDAwMDAwXCJcbiAgICovXG4gIGdldCBtYW50aXNzYURvdFBvc2l0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLl9tYW50aXNzYURvdFBvc2l0aW9uO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgZXhwb25lbnQgb2YgdGhlIG51bWJlciBpbiBiaW5hcnkgd2l0aCB0aGUgYmlhc1xuICAgKiBtYW50aXNzYSgxOS41OTM3NSkgPT4gXCIxMDAwMDAxMFwiXG4gICAqL1xuICBnZXQgYmluYXJ5RXhwb25lbnQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2JpbmFyeUV4cG9uZW50O1xuICB9XG5cbiAgc2V0IGJpbmFyeUV4cG9uZW50KHZhbHVlOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9iaW5hcnlFeHBvbmVudCA9IHZhbHVlO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybiB0aGUgYmlhcyBvZiB0aGUgbnVtYmVyIGJhc2VkIG9uIHRoZSBleHBvbmVudCBiaXQgc2l6ZVxuICAgKiBiID0gMiBeIChleHBvbmVudEJpdHNTaXplIC0gMSkgLSAxXG4gICAqL1xuICBnZXQgYmlhcygpIHtcbiAgICByZXR1cm4gdGhpcy5fYmlhcztcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIGZ1bGwgbWFudGlzc2Egb2YgdGhlIG51bWJlclxuICAgKi9cbiAgZ2V0IGJpbmFyeU1hbnRpc3NhKCkge1xuICAgIHJldHVybiB0aGlzLl9iaW5hcnlNYW50aXNzYTtcbiAgfVxuXG4gIHNldCBiaW5hcnlNYW50aXNzYSh2YWx1ZTogc3RyaW5nKSB7XG4gICAgdGhpcy5fYmluYXJ5TWFudGlzc2EgPSB2YWx1ZTtcbiAgICB0aGlzLl9vdmVyZmxvdyA9IHZhbHVlLmxlbmd0aCA+IHRoaXMubWFudGlzc2FCaXRzU2l6ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIGZ1bGwgbnVtYmVyIGNvZGVkIGluIGJpbmFyeSB3aXRoIElFRUUgNzU0XG4gICAqL1xuICBnZXQgYmluYXJ5RmxvYXRpbmdOdW1iZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMuYmluYXJ5U2lnbiArIHRoaXMuYmluYXJ5RXhwb25lbnQgKyB0aGlzLmJpbmFyeU1hbnRpc3NhO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoZSBzaWduIGluIGl0J3MgZGVjaW1hbCBmb3JtXG4gICAqL1xuICBnZXQgY29tcHV0ZWRTaWduKCkge1xuICAgIHJldHVybiB0aGlzLmJpbmFyeVNpZ24gPT09IFwiMVwiID8gLTEgOiAxO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoZSBleHBvbmVudCBpbiBpdCdzIGRlY2ltYWwgZm9ybVxuICAgKi9cbiAgZ2V0IGNvbXB1dGVkRXhwb25lbnQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2JoLmJpbmFyeVRvRGVjaW1hbCh0aGlzLmJpbmFyeUV4cG9uZW50KSAtIHRoaXMuYmlhcztcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgbWFudGlzc2EgaW4gaXQncyBkZWNpbWFsIGZvcm1cbiAgICovXG4gIGdldCBjb21wdXRlZE1hbnRpc3NhKCkge1xuICAgIHJldHVybiB0aGlzLl9iaC5iaW5hcnlUb0RlY2ltYWwoXCIxXCIgKyB0aGlzLmJpbmFyeU1hbnRpc3NhKSAvIDIgKiogdGhpcy5tYW50aXNzYUJpdHNTaXplO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoZSBudW1iZXIgdGhhdCBpcyBjb2RlZCBpbiBtZW1vcnlcbiAgICovXG4gIGdldCBjb21wdXRlZE51bWJlcigpIHtcbiAgICBpZiAoXG4gICAgICBOdW1iZXIuaXNOYU4odGhpcy5udW1iZXIpIHx8XG4gICAgICB0aGlzLm51bWJlciA9PT0gSW5maW5pdHkgfHxcbiAgICAgIHRoaXMubnVtYmVyID09PSAwXG4gICAgKSB7XG4gICAgICByZXR1cm4gdGhpcy5udW1iZXI7XG4gICAgfVxuXG4gICAgaWYgKFxuICAgICAgdGhpcy5iaW5hcnlFeHBvbmVudC5pbmRleE9mKFwiMFwiKSA9PT0gLTEgJiZcbiAgICAgIHRoaXMuYmluYXJ5TWFudGlzc2EuaW5kZXhPZihcIjBcIikgPT09IC0xICYmXG4gICAgICB0aGlzLmJpbmFyeVNpZ24gPT09IFwiMFwiXG4gICAgKSB7XG4gICAgICByZXR1cm4gTmFOO1xuICAgIH1cblxuICAgIGlmIChcbiAgICAgIHRoaXMuYmluYXJ5RXhwb25lbnQuaW5kZXhPZihcIjBcIikgPT09IC0xICYmXG4gICAgICB0aGlzLmJpbmFyeU1hbnRpc3NhLmluZGV4T2YoXCIxXCIpID09PSAtMSAmJlxuICAgICAgdGhpcy5iaW5hcnlTaWduID09PSBcIjBcIlxuICAgICkge1xuICAgICAgcmV0dXJuIEluZmluaXR5O1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmNvbXB1dGVkU2lnbiAqIDIgKiogdGhpcy5jb21wdXRlZEV4cG9uZW50ICogdGhpcy5jb21wdXRlZE1hbnRpc3NhO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgbWFyZ2luIG9mIGVycm9yXG4gICAqL1xuICBnZXQgZXJyb3IoKSB7ICAgIFxuICAgIGlmIChOdW1iZXIuaXNOYU4odGhpcy5udW1iZXIpIHx8IHRoaXMubnVtYmVyID09PSBJbmZpbml0eSB8fCB0aGlzLm51bWJlciA9PT0gMCkge1xuICAgICAgcmV0dXJuIDA7XG4gICAgfVxuXG4gICAgcmV0dXJuIE1hdGguYWJzKHRoaXMubnVtYmVyIC0gdGhpcy5jb21wdXRlZE51bWJlcik7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJuIHRoZSBiaW5hcnkgcmVwcmVzZW50YXRpb24gb2YgdGhlIHNpZ25cbiAgICogMCBpZiBudW1iZXIgPj0gMFxuICAgKiAxIGlmIG51bWJlciA8IDBcbiAgICovXG4gIGdldCBiaW5hcnlTaWduKCk6IFwiMFwiIHwgXCIxXCIge1xuICAgIHJldHVybiB0aGlzLl9iaW5hcnlTaWduO1xuICB9XG5cbiAgc2V0IGJpbmFyeVNpZ24odmFsdWU6IFwiMFwiIHwgXCIxXCIpIHtcbiAgICB0aGlzLl9iaW5hcnlTaWduID0gdmFsdWU7XG4gIH1cblxuICAvKipcbiAgICogVHJ1ZSBpZiB0aGUgbnVtYmVyIGNhbm5vdCBiZSBlbmNvZGVkIGluIDxiaXRzU2l6ZT4gYml0c1xuICAgKi9cbiAgZ2V0IG92ZXJmbG93KCkge1xuICAgIHJldHVybiB0aGlzLl9vdmVyZmxvdztcbiAgfVxuXG4gIC8qKlxuICAgKiBEZXRlcm1pbmUgdGhlIGJpbmFyeSBzaWduIG9mIHRoZSBudW1iZXJcbiAgICovXG4gIHByaXZhdGUgY2FsY3VsYXRlQmluYXJ5U2lnbigpIHtcbiAgICB0aGlzLl9iaW5hcnlTaWduID0gdGhpcy5udW1iZXIgPCAwID8gXCIxXCIgOiBcIjBcIjtcbiAgfVxuXG4gIC8qKlxuICAgKiBDYWxjdWxhdGUgdGhlIGV4cG9uZW50IGJpYXMgYmFzZWQgb24gdGhlIGV4cG9uZW50IGJpdCBzaXplXG4gICAqIGIgPSAyIF4gKGV4cG9uZW50Qml0c1NpemUgLSAxKSAtIDE7XG4gICAqL1xuICBwcml2YXRlIGNhbGN1bGF0ZUJpYXMoKSB7XG4gICAgdGhpcy5fYmlhcyA9IDIgKiogKHRoaXMuZXhwb25lbnRCaXRzU2l6ZSAtIDEpIC0gMTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZXRlcm1pbmUgdGhlIGJpbmFyeSBtYW50aXNzYSBhbmQgZGV0ZXJtaW5lIHRoZSBkb3QgcG9zaXRpb24gaW4gdGhlIG1hbnRpc3NhXG4gICAqL1xuICBwcml2YXRlIGNhbGN1bGF0ZUJpbmFyeU1hbnRpc3NhKCkge1xuICAgIGlmIChOdW1iZXIuaXNOYU4odGhpcy5udW1iZXIpKSB7XG4gICAgICB0aGlzLl9tYW50aXNzYURvdFBvc2l0aW9uID0gMDtcbiAgICAgIHRoaXMuX2JpbmFyeU1hbnRpc3NhID0gXCJcIi5wYWRFbmQodGhpcy5tYW50aXNzYUJpdHNTaXplLCBcIjFcIik7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gR2V0IHRoZSBpbnRlZ2VyIHBhcnRcbiAgICBjb25zdCBpbnRlZ2VyUGFydCA9IE1hdGgudHJ1bmModGhpcy5wb3NpdGl2ZU51bWJlcik7XG5cbiAgICAvLyBHZXQgdGhlIGRlY2ltYWxzIG9mIHRoZSBudW1iZXI6IGRlY2ltYWxzID0gMTkuNTkzNzUgLSAxOSA9IDAuNTkzNzVcbiAgICBsZXQgZGVjaW1hbHNQYXJ0ID0gdGhpcy5wb3NpdGl2ZU51bWJlciAtIE1hdGgudHJ1bmModGhpcy5wb3NpdGl2ZU51bWJlcik7XG5cbiAgICBjb25zdCBiaW5hcnlJbnRlZ2VyUGFydCA9IHRoaXMuX2JoLmRlY2ltYWxUb0JpbmFyeShpbnRlZ2VyUGFydCk7XG5cbiAgICAvLyBHZXQgdGhlIG51bWJlciBvZiBiaXRzIGRlZGljYXRlZCB0byBzdG9yZSB0aGUgZGVjaW1hbHMgaW4gdGhlIG1hbnRpc3NhXG4gICAgY29uc3QgZGVjaW1hbHNCaXRzU2l6ZSA9IHRoaXMubWFudGlzc2FCaXRzU2l6ZSAtIGJpbmFyeUludGVnZXJQYXJ0Lmxlbmd0aCAtIDE7XG4gICAgXG4gICAgbGV0IGJpbmFyeURlY2ltYWxzUGFydCA9IFwiXCI7XG4gICAgLy8gMC41OTM3NSAqIDIgPSAxLjE4NzUgID0+IDFcbiAgICAvLyAwLjE4NzUgICogMiA9IDAuMzc1ICAgPT4gMFxuICAgIC8vIDAuMzc1ICAgKiAyID0gMC43NSAgICA9PiAwXG4gICAgLy8gMC43NSAgICAqIDIgPSAxLjUgICAgID0+IDFcbiAgICAvLyAwLjUgICAgICogMiA9IDEgICAgICAgPT4gMVxuICAgIGZvcihsZXQgaSA9IDA7IGkgPCBkZWNpbWFsc0JpdHNTaXplOyBpKyspIHtcbiAgICAgIGRlY2ltYWxzUGFydCAqPSAyO1xuXG4gICAgICBpZiAoZGVjaW1hbHNQYXJ0ID49IDEpIHtcbiAgICAgICAgZGVjaW1hbHNQYXJ0IC09IDE7XG4gICAgICAgIGJpbmFyeURlY2ltYWxzUGFydCArPSBcIjFcIjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGJpbmFyeURlY2ltYWxzUGFydCArPSBcIjBcIjtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBsZXQgYmluYXJ5TWFudGlzc2EgPSBiaW5hcnlJbnRlZ2VyUGFydCArIGJpbmFyeURlY2ltYWxzUGFydDtcblxuICAgIC8vIEdldCB0aGUgcG9zaXRpb24gb2YgdGhlIGZpcnN0IGJpdCBhdCAxLCBmb3Igb25seSBkZWNpbWFscyBudW1iZXJcbiAgICBsZXQgbWFudGlzc2FEb3RQb3NpdGlvbiA9IC1iaW5hcnlNYW50aXNzYS5pbmRleE9mKFwiMVwiKTtcblxuICAgIC8vIFJlbW92ZSBhbGwgdGhlIGxlYWRpbmcgYml0IGF0IDAgZnJvbSB0aGUgbWFudGlzc2FcbiAgICBiaW5hcnlNYW50aXNzYSA9IHRoaXMuX2JoLmNsZWFuKGJpbmFyeU1hbnRpc3NhKTtcblxuICAgIC8vIElmIHRoZSBwb3NpdGlvbiBvZiB0aGUgZmlyc3QgYml0IGF0IDEgaXMgMFxuICAgIC8vIHRoZW4gdGhlIGRvdCBwb3NpdGlvbiBpcyBlcXVhbHMgdG8gdGhlIGxlbmd0aCBvZiB0aGUgYmluYXJ5IGludGVnZXIgcGFydCBvZiB0aGUgbWFudGlzc2FcbiAgICBpZiAobWFudGlzc2FEb3RQb3NpdGlvbiA9PT0gMCkge1xuICAgICAgbWFudGlzc2FEb3RQb3NpdGlvbiA9IGJpbmFyeUludGVnZXJQYXJ0Lmxlbmd0aCAtIDE7XG4gICAgfVxuXG4gICAgLy8gSGlkZSB0aGUgZmlyc3QgYml0IGF0IDFcbiAgICBiaW5hcnlNYW50aXNzYSA9IGJpbmFyeU1hbnRpc3NhLnN1YnN0cmluZygxKTtcblxuICAgIC8vIE1ha2Ugc3VyZSB0aGF0IHRoZSBtYW50aXNzYSBtYXRjaGVzIHRoZSBjb3JyZWN0IGxlbmd0aCAoMjMgZm9yIDMyIGJpdHMgZm9yIGV4YW1wbGUpXG4gICAgYmluYXJ5TWFudGlzc2EgPSBiaW5hcnlNYW50aXNzYS5wYWRFbmQodGhpcy5tYW50aXNzYUJpdHNTaXplLCBcIjBcIik7XG5cbiAgICB0aGlzLmJpbmFyeU1hbnRpc3NhID0gYmluYXJ5TWFudGlzc2E7XG4gICAgdGhpcy5fbWFudGlzc2FEb3RQb3NpdGlvbiA9IG1hbnRpc3NhRG90UG9zaXRpb247XG4gIH1cblxuICAvKipcbiAgICogQ2FsY3VsYXRlIHRoZSBleHBvbmVudCBpbiBiaW5hcnlcbiAgICogZSA9IGJpbmFyeShtYW50aXNzYUZsb2F0UG9zaXRpb24gKyBiaWFzKVxuICAgKi9cbiAgcHJpdmF0ZSBjYWxjdWxhdGVCaW5hcnlFeHBvbmVudCgpIHtcbiAgICAvLyBJZiB0aGUgbnVtYmVyIGlzIE5hTiBvciBJbmZpbml0eSB0aGVuIGFsbCB0aGUgYml0cyBvZiB0aGUgZXhwb25lbnQgYXJlIGVxdWFscyB0byAxXG4gICAgaWYgKE51bWJlci5pc05hTih0aGlzLm51bWJlcikgfHwgdGhpcy5udW1iZXIgPT09IEluZmluaXR5KSB7XG4gICAgICB0aGlzLl9iaW5hcnlFeHBvbmVudCA9IFwiXCIucGFkRW5kKHRoaXMuZXhwb25lbnRCaXRzU2l6ZSwgXCIxXCIpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGxldCBleHBvbmVudCA9IHRoaXMubWFudGlzc2FEb3RQb3NpdGlvbiArIHRoaXMuYmlhcztcblxuICAgIC8vIElmIHRoZSBudW1iZXIgaXMgMCB0aGVuIGFsbCB0aGUgYml0cyBvZiB0aGUgZXhwb25lbnQgYXJlIGVxdWFscyB0byAwXG4gICAgaWYgKHRoaXMubnVtYmVyID09PSAwKSB7XG4gICAgICBleHBvbmVudCA9IDA7XG4gICAgfVxuXG4gICAgLy8gQ29udmVydCB0aGUgZXhwb25lbnQgdG8gYmluYXJ5IGFuZCBhZGQgbGVhZGluZyAwIHRvIG1hdGNoIHRoZSBleHBvbmVudCBiaXRzIHNpemVcbiAgICB0aGlzLl9iaW5hcnlFeHBvbmVudCA9IHRoaXMuX2JoLmRlY2ltYWxUb0JpbmFyeShleHBvbmVudCkucGFkU3RhcnQodGhpcy5leHBvbmVudEJpdHNTaXplLCBcIjBcIik7XG4gIH1cblxuICAvKipcbiAgICogQWRkIHR3byBiaW5hcnkgZmxvYXQgbnVtYmVyXG4gICAqIEBwYXJhbSBiZjIgVGhlIGJpbmFyeSBmbG9hdCBudW1iZXIgdG8gYWRkXG4gICAqIEByZXR1cm5zIFRoZSByZXN1bHQgb2YgdGhlIGFkZGl0aW9uXG4gICAqL1xuICBhZGQoYmYyOiBCaW5hcnlGbG9hdCkge1xuICAgIGNvbnN0IGJmUmVzID0gbmV3IEJpbmFyeUZsb2F0KDEsIHRoaXMuYml0c1NpemUpO1xuXG4gICAgaWYgKE51bWJlci5pc05hTih0aGlzLmNvbXB1dGVkTnVtYmVyKSB8fCBOdW1iZXIuaXNOYU4oYmYyKSkge1xuICAgICAgcmV0dXJuIEJpbmFyeUZsb2F0LmdldE5hTih0aGlzLmJpdHNTaXplKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5jb21wdXRlZE51bWJlciA9PT0gSW5maW5pdHkgfHwgYmYyLmNvbXB1dGVkTnVtYmVyID09PSBJbmZpbml0eSkge1xuICAgICAgcmV0dXJuIEJpbmFyeUZsb2F0LmdldEluZmluaXR5KHRoaXMuYml0c1NpemUpO1xuICAgIH1cblxuICAgIC8vIFN0ZXAgMTogRGV0ZXJtaW5lIHRoZSBsb3dlc3QgZXhwb25lbnQgYmV0d2VlbiB0aGlzIGFuZCB0aGUgc2Vjb25kIG51bWJlclxuICAgIGxldCBiZk1pbkJpbmFyeUV4cG9uZW50OiBCaW5hcnlGbG9hdCA9IHRoaXM7XG4gICAgbGV0IGJmTWF4QmluYXJ5RXhwb25lbnQ6IEJpbmFyeUZsb2F0ID0gYmYyO1xuICAgIGlmICh0aGlzLl9iaC5iaW5hcnlUb0RlY2ltYWwoYmYyLmJpbmFyeUV4cG9uZW50KSA8IHRoaXMuX2JoLmJpbmFyeVRvRGVjaW1hbChiZk1pbkJpbmFyeUV4cG9uZW50LmJpbmFyeUV4cG9uZW50KSkge1xuICAgICAgYmZNaW5CaW5hcnlFeHBvbmVudCA9IGJmMjtcbiAgICAgIGJmTWF4QmluYXJ5RXhwb25lbnQgPSB0aGlzO1xuICAgIH1cblxuICAgIC8vIFN0ZXAgMjogU2hpZnQgdGhlIG1hbnRpc3NhXG4gICAgY29uc3Qgc2hpZnRWYWx1ZSA9IGJmTWF4QmluYXJ5RXhwb25lbnQuY29tcHV0ZWRFeHBvbmVudCAtIGJmTWluQmluYXJ5RXhwb25lbnQuY29tcHV0ZWRFeHBvbmVudDtcbiAgICBjb25zdCBzaGlmdGVkTWluTWFudGlzc2EgPSB0aGlzLl9iaC5zaGlmdFJpZ2h0KFwiMVwiICsgYmZNaW5CaW5hcnlFeHBvbmVudC5iaW5hcnlNYW50aXNzYSwgc2hpZnRWYWx1ZSk7XG4gICAgYmZNaW5CaW5hcnlFeHBvbmVudCA9IG5ldyBCaW5hcnlGbG9hdChiZk1pbkJpbmFyeUV4cG9uZW50LmNvbXB1dGVkTnVtYmVyLCB0aGlzLmJpdHNTaXplKTtcbiAgICBiZk1pbkJpbmFyeUV4cG9uZW50LmJpbmFyeU1hbnRpc3NhID0gc2hpZnRlZE1pbk1hbnRpc3NhO1xuICAgIGJmUmVzLmJpbmFyeU1hbnRpc3NhID0gc2hpZnRlZE1pbk1hbnRpc3NhO1xuICAgIFxuICAgIC8vIFN0ZXAgMzogUHV0IHRoZSBzYW1lIGV4cG9uZW50XG4gICAgYmZSZXMuYmluYXJ5RXhwb25lbnQgPSBiZk1heEJpbmFyeUV4cG9uZW50LmJpbmFyeUV4cG9uZW50O1xuXG4gICAgLy8gU3RlcCA0OiBBZGQgdGhlIG1hbnRpc3NhIGFuZCB0aGUgc2hpZnRlZCBvbmVcbiAgICBpZiAoYmZNaW5CaW5hcnlFeHBvbmVudC5jb21wdXRlZFNpZ24gPT09IGJmTWF4QmluYXJ5RXhwb25lbnQuY29tcHV0ZWRTaWduKSB7XG4gICAgICBiZlJlcy5iaW5hcnlNYW50aXNzYSA9IHRoaXMuX2JoLmJpbmFyeUFkZGl0aW9uKFwiMVwiICsgYmZNYXhCaW5hcnlFeHBvbmVudC5iaW5hcnlNYW50aXNzYSwgYmZSZXMuYmluYXJ5TWFudGlzc2EpLnJldmVyc2UoKS5qb2luKFwiXCIpO1xuICAgIH0gZWxzZSB7XG4gICAgICBsZXQgbWludXNCZiA9IFwiMVwiICsgYmZNYXhCaW5hcnlFeHBvbmVudC5iaW5hcnlNYW50aXNzYTtcbiAgICAgIGxldCBiYXNlQmYgPSBiZk1pbkJpbmFyeUV4cG9uZW50LmJpbmFyeU1hbnRpc3NhO1xuXG4gICAgICBpZiAoYmZNaW5CaW5hcnlFeHBvbmVudC5jb21wdXRlZFNpZ24gPT09IC0xKSB7XG4gICAgICAgIGJhc2VCZiA9IG1pbnVzQmY7XG4gICAgICAgIG1pbnVzQmYgPSBiZk1pbkJpbmFyeUV4cG9uZW50LmJpbmFyeU1hbnRpc3NhO1xuICAgICAgfVxuXG4gICAgICBiZlJlcy5iaW5hcnlNYW50aXNzYSA9IHRoaXMuX2JoLmJpbmFyeVN1YnN0cmFjdGlvbihiYXNlQmYsIG1pbnVzQmYpLnJldmVyc2UoKS5qb2luKFwiXCIpO1xuXG4gICAgICBjb25zb2xlLmxvZyhiYXNlQmYsIG1pbnVzQmYsIGJmUmVzLmJpbmFyeU1hbnRpc3NhKTtcbiAgICB9XG5cbiAgICAvLyBTdGVwIDU6IE5vcm1hbGlzZSB0aGUgbWFudGlzc2FcbiAgICBpZiAoYmZSZXMuYmluYXJ5TWFudGlzc2EubGVuZ3RoIC0gYmZSZXMubWFudGlzc2FCaXRzU2l6ZSA9PT0gMSkge1xuICAgICAgY29uc29sZS5sb2coYmZSZXMuYmluYXJ5TWFudGlzc2EubGVuZ3RoIC0gYmZSZXMubWFudGlzc2FCaXRzU2l6ZSk7XG5cbiAgICAgIC8vIEhpZGUgdGhlIGZpcnN0IGJpdFxuICAgICAgYmZSZXMuYmluYXJ5TWFudGlzc2EgPSBiZlJlcy5iaW5hcnlNYW50aXNzYS5zdWJzdHJpbmcoMSk7XG4gICAgfVxuXG4gICAgLy8gTm9ybWFsaXplIGlmIHRoZXJlIGlzIGEgY2FycnlcbiAgICBpZiAoYmZSZXMuYmluYXJ5TWFudGlzc2EubGVuZ3RoIC0gYmZSZXMubWFudGlzc2FCaXRzU2l6ZSA9PT0gMikge1xuICAgICAgLy8gSGlkZSB0aGUgZmlyc3QgYml0XG4gICAgICBiZlJlcy5iaW5hcnlNYW50aXNzYSA9IGJmUmVzLmJpbmFyeU1hbnRpc3NhLnN1YnN0cmluZygxKTtcblxuICAgICAgLy8gUmVtb3ZlIHRoZSBsYXN0IGJpdFxuICAgICAgYmZSZXMuYmluYXJ5TWFudGlzc2EgPSBiZlJlcy5iaW5hcnlNYW50aXNzYS5zbGljZSgwLCAtMSk7XG5cbiAgICAgIC8vIEFkZCAxIHRvIHRoZSBleHBvbmVudFxuICAgICAgYmZSZXMuYmluYXJ5RXhwb25lbnQgPSB0aGlzLl9iaC5hZGROdW1iZXJUb0JpbmFyeShiZlJlcy5iaW5hcnlFeHBvbmVudCwgMSlbMF07XG4gICAgfVxuXG4gICAgcmV0dXJuIGJmUmVzO1xuICB9XG59XG4iLCJpbXBvcnQgeyBCaW5hcnlGbG9hdCB9IGZyb20gXCIuL2NsYXNzZXMvQmluYXJ5RmxvYXRcIjtcblxuY29uc3QgZmJCaXRzU2l6ZUVsZW1lbnQgPSA8SFRNTElucHV0RWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImZiLWJpdHMtc2l6ZVwiKTtcbmNvbnN0IGZiRmxvYXRpbmdOdW1iZXJFbGVtZW50ID0gPEhUTUxJbnB1dEVsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJmYi1mbG9hdGluZy1udW1iZXJcIik7XG5jb25zdCBmYlJlc3VsdEVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImZiLXJlc3VsdFwiKTtcblxuZnVuY3Rpb24gb25DaGFuZ2VDb252ZXJ0ZXJGYigpIHtcbiAgY29uc3QgYml0c1NpemUgPSBOdW1iZXIoZmJCaXRzU2l6ZUVsZW1lbnQudmFsdWUpO1xuICBjb25zdCBmbG9hdGluZ051bWJlciA9IE51bWJlcihmYkZsb2F0aW5nTnVtYmVyRWxlbWVudC52YWx1ZSk7XG5cbiAgaWYgKGJpdHNTaXplIDwgOCkge1xuICAgIGZiUmVzdWx0RWxlbWVudC5pbm5lckhUTUwgPSBgPHNwYW4gY2xhc3M9XCJjb2xvci1yZWRcIj5MYSB0YWlsbGUgZGVzIGJpdHMgZG9pdCBhdSBtaW5pbXVtIMOqdHJlIDg8L3NwYW4+YDtcbiAgICByZXR1cm47XG4gIH1cblxuICBpZiAoYml0c1NpemUgPiA4MCkge1xuICAgIGZiUmVzdWx0RWxlbWVudC5pbm5lckhUTUwgPSBgPHNwYW4gY2xhc3M9XCJjb2xvci1yZWRcIj5MYSB0YWlsbGUgZGVzIGJpdHMgZG9pdCBhdSBtYXhpbXVtIMOqdHJlIDgwPC9zcGFuPmA7XG4gICAgcmV0dXJuO1xuICB9XG4gIFxuICBpZiAoZmJCaXRzU2l6ZUVsZW1lbnQudmFsdWUgPT09IFwiXCIgfHwgZmJGbG9hdGluZ051bWJlckVsZW1lbnQudmFsdWUgPT09IFwiXCIpIHtcbiAgICBmYlJlc3VsdEVsZW1lbnQuaW5uZXJIVE1MID0gYDxzcGFuIGNsYXNzPVwiY29sb3ItZ3JleVwiPlZldWlsbGV6IHJlbnNlaWduZXIgdG91cyBsZXMgY2hhbXBzPC9zcGFuPmA7XG4gICAgcmV0dXJuO1xuICB9XG4gIFxuICBjb25zdCBiZiA9IG5ldyBCaW5hcnlGbG9hdChmbG9hdGluZ051bWJlciwgYml0c1NpemUpO1xuICBcbiAgaWYgKGJmLm92ZXJmbG93KSB7XG4gICAgZmJSZXN1bHRFbGVtZW50LmlubmVySFRNTCA9IGA8c3BhbiBjbGFzcz1cImNvbG9yLXJlZFwiPlZvdHJlIG5vbWJyZSBiaW5haXJlIGVzdCB0cm9wIGdyYW5kIHBvdXIgw6p0cmUgZW5jb2TDqSBlbiAke2JpdHNTaXplfSBiaXRzPC9zcGFuPmA7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgZmJSZXN1bHRFbGVtZW50LmlubmVySFRNTCA9IGBcbiAgICA8ZGl2IGNsYXNzPVwicmVzdWx0LWdyb3VwXCI+XG4gICAgICBUYWlsbGUgZW4gYml0cyBkZSBsJ2V4cG9zYW50OiAke2JmLmV4cG9uZW50Qml0c1NpemV9XG4gICAgPC9kaXY+XG4gICAgXG4gICAgPGRpdiBjbGFzcz1cInJlc3VsdC1ncm91cFwiPlxuICAgICAgVGFpbGxlIGVuIGJpdHMgZGUgbGEgbWFudGlzc2U6ICR7YmYubWFudGlzc2FCaXRzU2l6ZX1cbiAgICA8L2Rpdj5cblxuICAgIDxkaXYgY2xhc3M9XCJyZXN1bHQtZ3JvdXBcIj5cbiAgICAgIEJpYWlzOiAke2JmLmJpYXN9XG4gICAgPC9kaXY+XG4gICAgXG4gICAgPGRpdiBjbGFzcz1cInJlc3VsdC1ncm91cFwiPlxuICAgICAgU2lnbmU6XG4gICAgICA8c3BhbiBjbGFzcz1cImNvbG9yLXJlZCBtb25vXCI+JHtiZi5iaW5hcnlTaWdufTwvc3Bhbj5cbiAgICAgIDxzcGFuIGNsYXNzPVwibW9ub1wiPigke2JmLmNvbXB1dGVkU2lnbn0pPC9zcGFuPlxuICAgIDwvZGl2PlxuICAgIFxuICAgIDxkaXYgY2xhc3M9XCJyZXN1bHQtZ3JvdXBcIj5cbiAgICAgIE1hbnRpc3NlOlxuICAgICAgPHNwYW4gY2xhc3M9XCJjb2xvci1vcmFuZ2UgbW9ub1wiPlxuICAgICAgICAke2JmLmJpbmFyeU1hbnRpc3NhfVxuICAgICAgPC9zcGFuPlxuICAgICAgPHNwYW4gY2xhc3M9XCJtb25vXCI+KCR7YmYuY29tcHV0ZWRNYW50aXNzYX0pPC9zcGFuPlxuICAgIDwvZGl2PlxuXG4gICAgPGRpdiBjbGFzcz1cInJlc3VsdC1ncm91cFwiPlxuICAgICAgRXhwb3NhbnQ6IDxzcGFuIGNsYXNzPVwiY29sb3ItYmx1ZSBtb25vXCI+JHtiZi5iaW5hcnlFeHBvbmVudH08L3NwYW4+XG4gICAgICA8c3BhbiBjbGFzcz1cIm1vbm9cIj4oMjxzdXA+JHtiZi5jb21wdXRlZEV4cG9uZW50fTwvc3VwPik8L3NwYW4+XG4gICAgPC9kaXY+XG4gICAgXG4gICAgPGRpdiBjbGFzcz1cInJlc3VsdC1ncm91cFwiPlxuICAgICAgUsOpc3VsdGF0OlxuICAgICAgPHNwYW4gY2xhc3M9XCJjb2xvci1yZWQgbW9ub1wiPiR7YmYuYmluYXJ5U2lnbn08L3NwYW4+XG4gICAgICA8c3BhbiBjbGFzcz1cImNvbG9yLWJsdWUgbW9ub1wiPiR7YmYuYmluYXJ5RXhwb25lbnR9PC9zcGFuPlxuICAgICAgPHNwYW4gY2xhc3M9XCJjb2xvci1vcmFuZ2UgbW9ub1wiPiR7YmYuYmluYXJ5TWFudGlzc2F9PC9zcGFuPlxuICAgIDwvZGl2PlxuICAgIFxuICAgIDxkaXYgY2xhc3M9XCJyZXN1bHQtZ3JvdXBcIj5cbiAgICAgIE5vbWJyZSByw6llbGxlbWVudCBjb2TDqTogJHtiZi5jb21wdXRlZE51bWJlcn1cbiAgICA8L2Rpdj5cbiAgICBcbiAgICA8ZGl2IGNsYXNzPVwicmVzdWx0LWdyb3VwXCI+XG4gICAgICBNYXJnZSBkJ2VycmV1cjogJHtiZi5lcnJvcn1cbiAgICA8L2Rpdj5cbiAgYDtcbn1cblxuZmJCaXRzU2l6ZUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCBvbkNoYW5nZUNvbnZlcnRlckZiKTtcbmZiQml0c1NpemVFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXl1cFwiLCBvbkNoYW5nZUNvbnZlcnRlckZiKTtcbmZiRmxvYXRpbmdOdW1iZXJFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgb25DaGFuZ2VDb252ZXJ0ZXJGYik7XG5mYkZsb2F0aW5nTnVtYmVyRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwia2V5dXBcIiwgb25DaGFuZ2VDb252ZXJ0ZXJGYik7XG5cbm9uQ2hhbmdlQ29udmVydGVyRmIoKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==
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
        if (this.isNaN || bf2.isNaN) {
            return BinaryFloat.getNaN(this.bitsSize);
        }
        if (this.isInfinity || bf2.isInfinity) {
            return BinaryFloat.getInfinity(this.bitsSize);
        }
        // Step 1: Determine the lowest exponent between this and the second number
        var bfMinBinaryExponent = this;
        var bfMaxBinaryExponent = bf2;
        if (this._bh.binaryToDecimal(bf2.binaryExponent) < this._bh.binaryToDecimal(bfMinBinaryExponent.binaryExponent)) {
            bfMinBinaryExponent = bf2;
            bfMaxBinaryExponent = this;
        }
        if (bfMinBinaryExponent.isZero) {
            return bfMaxBinaryExponent;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LENBQUM7QUFFRCxpQkFBaUIsQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsbUJBQW1CLENBQUMsQ0FBQztBQUNsRSxpQkFBaUIsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsbUJBQW1CLENBQUMsQ0FBQztBQUNqRSx1QkFBdUIsQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsbUJBQW1CLENBQUMsQ0FBQztBQUN4RSx1QkFBdUIsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsbUJBQW1CLENBQUMsQ0FBQztBQUV2RSxtQkFBbUIsRUFBRSxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbWF0aF9zcGUvLi9zcmMvY2xhc3Nlcy9CaW5hcnlIZWxwZXIudHMiLCJ3ZWJwYWNrOi8vbWF0aF9zcGUvLi9zcmMvY2xhc3Nlcy9CaW5hcnlGbG9hdC50cyIsIndlYnBhY2s6Ly9tYXRoX3NwZS8uL3NyYy9sYWJvMS1mYi1jb252ZXJ0ZXIudHMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNsYXNzIEJpbmFyeUhlbHBlciB7XG4gIC8qKlxuICAgKiBHZXQgbiBiaXQgb2YgMCBvciAxXG4gICAqIEBwYXJhbSB2YWx1ZSAxIG9yIDBcbiAgICogQHBhcmFtIG4gVGhlIG51bWJlciBvZiBiaXRzIHRvIHJldHJpZXZlXG4gICAqIEByZXR1cm5zIG4gYml0IG9mIDAgb3IgMVxuICAgKi9cbiAgcHVibGljIGdldE5CaXQodmFsdWU6IDEgfCAwLCBuOiBudW1iZXIpOiBzdHJpbmcge1xuICAgIGxldCByZXMgPSBcIlwiO1xuICAgIFxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbjsgaSsrKSB7XG4gICAgICByZXMgKz0gdmFsdWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlcztcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGQgbiB6ZXJvcyBiZWZvcmUgdGhlIGJpbmFyeSBudW1iZXJcbiAgICogQHBhcmFtIG4gVGhlIG51bWJlciBvZiAwIHRvIGFkZCBiZWZvcmUgdGhlIGJpbmFyeSBudW1iZXJcbiAgICogQHBhcmFtIGIgVGhlIGJpbmFyeSBudW1iZXJcbiAgICogQHJldHVybnMgVGhlIGJpbmFyeSBudW1iZXIgd2l0aCBuIHplcm9zIGJlZm9yZVxuICAgKi9cbiAgcHVibGljIGFkZFBhZGRpbmcobjogbnVtYmVyLCBiID0gXCJcIikge1xuICAgIGNvbnN0IHNpemUgPSBuIC0gYi5sZW5ndGg7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNpemU7IGkrKykge1xuICAgICAgYiA9IFwiMFwiICsgYjtcbiAgICB9XG5cbiAgICByZXR1cm4gYjtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmVzIHRoZSB6ZXJvcyBiZWZvcmUgYSBiaW5hcnkgbnVtYmVyICgwMDAxMDEgYmVjb21lcyAxMDEpXG4gICAqIEBwYXJhbSBiIFRoZSBiaW5hcnkgbnVtYmVyXG4gICAqIEByZXR1cm5zIFRoZSBwcm9kdWNlZCBiaW5hcnkgbnVtYmVyXG4gICAqL1xuICBwdWJsaWMgY2xlYW4oYjogc3RyaW5nKSB7XG4gICAgbGV0IHJlcyA9IGI7XG5cbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgYi5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKGJbaV0gPT09IFwiMFwiKSB7XG4gICAgICAgIHJlcyA9IHJlcy5zdWJzdHJpbmcoMSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gcmVzO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChyZXMgPT09IFwiXCIpIHtcbiAgICAgIHJldHVybiBcIjBcIjtcbiAgICB9XG4gIH1cblxuXG4gIC8qKlxuICAgKiBBZGQgMCBwYWRkaW5nIHRvIHRoZSBzbWFsbGVzdCBiaW5hcnkgbnVtYmVyIHRvIG1hdGNoIHRoZSBsb25nZXN0IG9uZSdzIGxlbmd0aFxuICAgKiBbMTAxLCAxMTAwMV0gYmVjb21lcyBbMDAxMDEsIDExMDAxXVxuICAgKiBAcGFyYW0gYjEgVGhlIGZpcnN0IGJpbmFyeSBudW1iZXJcbiAgICogQHBhcmFtIGIyIFRoZSBzZWNvbmQgYmluYXJ5IG51bWJlclxuICAgKiBAcmV0dXJucyBbYjEsIGIyXSB3aXRoIGNvcnJlY3QgcGFkZGluZ1xuICAgKi9cbiAgcHVibGljIGFkZE1heFBhZGRpbmcoYjE6IHN0cmluZywgYjI6IHN0cmluZykge1xuICAgIGlmIChiMi5sZW5ndGggPiBiMS5sZW5ndGgpIHtcbiAgICAgIGIxID0gdGhpcy5hZGRQYWRkaW5nKGIyLmxlbmd0aCwgYjEpO1xuICAgIH0gZWxzZSBpZiAoYjEubGVuZ3RoID4gYjIubGVuZ3RoKSB7XG4gICAgICBiMiA9IHRoaXMuYWRkUGFkZGluZyhiMS5sZW5ndGgsIGIyKTtcbiAgICB9XG5cbiAgICByZXR1cm4gW2IxLCBiMl07XG4gIH1cblxuICBwdWJsaWMgZ2V0TWF4TGVuZ3RoKGIxOiBzdHJpbmcsIGIyOiBzdHJpbmcpIHtcbiAgICBpZiAoYjEubGVuZ3RoID4gYjIubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gYjEubGVuZ3RoO1xuICAgIH1cbiAgICByZXR1cm4gYjIubGVuZ3RoO1xuICB9XG5cbiAgLyoqXG4gICAqIENvbnZlcnQgYSBudW1iZXIgdG8gaXQncyBiaW5hcnkgcmVwcmVzZW50YXRpb25cbiAgICogQHBhcmFtIGRlY2ltYWwgVGhlIFxuICAgKiBAcmV0dXJucyBUaGUgYmluYXJ5IHJlcHJlc2VudGF0aW9uIG9mIHRoZSBkZWNpbWFsIG51bWJlclxuICAgKi9cbiAgcHVibGljIGRlY2ltYWxUb0JpbmFyeShkZWNpbWFsOiBudW1iZXIpIHtcbiAgICByZXR1cm4gKGRlY2ltYWwgPj4+IDApLnRvU3RyaW5nKDIpO1xuICB9XG5cbiAgLyoqXG4gICAqIENvbnZlcnQgYSBiaW5hcnkgcmVwcmVzZW50YXRpb24gb2YgYSBudW1iZXIgdG8gYSBkZWNpbWFsIG51bWJlclxuICAgKiBAcGFyYW0gYmluYXJ5IFRoZSBiaW5hcnkgcmVwcmVzZW50YXRpb24gb2YgYSBudW1iZXJcbiAgICogQHJldHVybnMgVGhlIGludCByZXByZXNlbnRhdGlvbiBvZiBhIGJpbmFyeSBudW1iZXJcbiAgICovXG4gIHB1YmxpYyBiaW5hcnlUb0RlY2ltYWwoYmluYXJ5OiBzdHJpbmcpIHtcbiAgICByZXR1cm4gcGFyc2VJbnQoYmluYXJ5LCAyKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGQgaW50IHRvIGEgYmluYXJ5IG51bWJlclxuICAgKiBAcGFyYW0gYiBUaGUgYmluYXJ5IG51bWJlclxuICAgKiBAcGFyYW0gbiBUaGUgaW50IG51bWJlciB0byBhZGQgdG8gdGhlIGJpbmFyeSBudW1iZXJcbiAgICogQHJldHVybnMgVGhlIHByb2R1Y2VkIHJlc3VsdFxuICAgKi9cbiAgcHVibGljIGFkZE51bWJlclRvQmluYXJ5KGI6IHN0cmluZywgbjogbnVtYmVyKTogc3RyaW5nW10ge1xuICAgIHJldHVybiB0aGlzLmJpbmFyeUFkZGl0aW9uKGIsIHRoaXMuZGVjaW1hbFRvQmluYXJ5KG4pKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbnZlcnQgYSBiaW5hcnkgbnVtYmVyXG4gICAqIEBwYXJhbSBiIFRoZSBiaW5hcnkgbnVtYmVyIHRvIGludmVydFxuICAgKiBAcmV0dXJucyBUaGUgaW52ZXJ0IGJpbmFyeSBudW1iZXJcbiAgICovXG4gIHB1YmxpYyBpbnZlcnQoYjogc3RyaW5nKSB7XG4gICAgY29uc3QgaW5pdGlhbExlbmd0aCA9IGIubGVuZ3RoO1xuICAgIGIgPSB0aGlzLmRlY2ltYWxUb0JpbmFyeSh0aGlzLmJpbmFyeVRvRGVjaW1hbChiKSBeIHRoaXMuYmluYXJ5VG9EZWNpbWFsKHRoaXMuZ2V0TkJpdCgxLCBiLmxlbmd0aCkpKTtcbiAgICBiID0gdGhpcy5hZGRQYWRkaW5nKGluaXRpYWxMZW5ndGgsIGIpO1xuICAgIHJldHVybiBiO1xuICB9XG5cbiAgLyoqXG4gICAqIFNoaWZ0IHRoZSBiaW5hcnkgbnVtYmVyIHRvIHRoZSByaWdodFxuICAgKiBAcGFyYW0gYiBUaGUgYmluYXJ5IG51bWJlclxuICAgKiBAcGFyYW0gc2hpZnRWYWx1ZSBUaGUgc2hpZnQgdmFsdWVcbiAgICogQHJldHVybnMgVGhlIHNoaWZ0ZWQgYmluYXJ5IG51bWJlclxuICAgKi9cbiAgcHVibGljIHNoaWZ0UmlnaHQoYjogc3RyaW5nLCBzaGlmdFZhbHVlOiBudW1iZXIpIHtcbiAgICAvLyBcIjAwMDAwMTAxMFwiID4+IDIgPT4gXCIwMDAwMDAwMTBcIlxuICAgIC8vIDEuIFJlbW92ZXMgbGFzdHMgPHNoaWZ0VmFsdWU+IGJpdHNcbiAgICAvLyAyLiBQbGFjZXMgPHNoaWZ0VmFsdWU+IGJpdHMgYXQgMCBiZWZvcmVcblxuICAgIGlmIChzaGlmdFZhbHVlIDwgMSkge1xuICAgICAgcmV0dXJuIGI7XG4gICAgfVxuXG4gICAgbGV0IHJlcyA9IGI7XG4gICAgcmVzID0gcmVzLnNsaWNlKDAsIC1zaGlmdFZhbHVlKTtcbiAgICByZXMgPSBcIlwiLnBhZFN0YXJ0KHNoaWZ0VmFsdWUsIFwiMFwiKSArIHJlcztcblxuICAgIHJldHVybiByZXM7XG4gIH1cblxuICAvKipcbiAgICogU2hpZnQgdGhlIGJpbmFyeSBudW1iZXIgdG8gdGhlIGxlZnRcbiAgICogQHBhcmFtIGIgVGhlIGJpbmFyeSBudW1iZXJcbiAgICogQHBhcmFtIHNoaWZ0VmFsdWUgVGhlIHNoaWZ0IHZhbHVlXG4gICAqIEByZXR1cm5zIFRoZSBzaGlmdGVkIGJpbmFyeSBudW1iZXJcbiAgICovXG4gIHB1YmxpYyBzaGlmdExlZnQoYjogc3RyaW5nLCBzaGlmdFZhbHVlOiBudW1iZXIpIHtcbiAgICByZXR1cm4gdGhpcy5kZWNpbWFsVG9CaW5hcnkodGhpcy5iaW5hcnlUb0RlY2ltYWwoYikgKiBNYXRoLnBvdygyLCBzaGlmdFZhbHVlKSk7XG4gIH1cblxuICAvKipcbiAgICogQWRkIDIgYml0IHRvZ2V0aGVyIHdpdGggdGhlIGNhcnJ5XG4gICAqIEBwYXJhbSB4IFRoZSBmaXJzdCBiaXRcbiAgICogQHBhcmFtIHkgVGhlIHNlY29uZCBiaXRcbiAgICogQHBhcmFtIGNhcnJ5IFRoZSBjYXJyeVxuICAgKiBAcmV0dXJucyBUaGUgcmVzdWx0IHdpdGggdGhlIGNhcnJ5IFtiaXQsIGNhcnJ5XVxuICAgKi9cbiAgcHVibGljIGVsZW1lbnRhcnlBZGRpdGlvbih4OiBzdHJpbmcsIHk6IHN0cmluZywgY2FycnkgPSBcIlwiKTogc3RyaW5nW10ge1xuICAgIGNvbnN0IHJlcyA9IE51bWJlcih4KSArIE51bWJlcih5KSArIE51bWJlcihjYXJyeSk7XG5cbiAgICBzd2l0Y2ggKHJlcykge1xuICAgICAgLy8gYyA9IDEsIHggPSAxLCB5ID0gMVxuICAgICAgY2FzZSAzOlxuICAgICAgICByZXR1cm4gW1wiMVwiLCBcIjFcIl07XG4gICAgICBjYXNlIDI6XG4gICAgICAgIHJldHVybiBbXCIwXCIsIFwiMVwiXTtcbiAgICAgIGNhc2UgMTpcbiAgICAgICAgcmV0dXJuIFtcIjFcIiwgXCJcIl07XG4gICAgICAvLyBjID0gMCwgeCA9IDAsIHkgPSAwXG4gICAgICBjYXNlIDA6XG4gICAgICAgIHJldHVybiBbXCIwXCIsIFwiXCJdO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBBZGQgMiBiaW5hcnkgbnVtYmVyc1xuICAgKiBAcGFyYW0gYjEgVGhlIGZpcnN0IGJpbmFyeSBudW1iZXJcbiAgICogQHBhcmFtIGIyIFRoZSBzZWNvbmQgYmluYXJ5IG51bWJlclxuICAgKiBAcmV0dXJucyBUaGUgcmVzdWx0IG9mIHRoZSBhZGRpdGlvbiBbYmluYXJ5TnVtYmVyLCBjYXJyeUJpdF1cbiAgICovXG4gIHB1YmxpYyBiaW5hcnlBZGRpdGlvbihiMTogc3RyaW5nLCBiMjogc3RyaW5nKSB7XG4gICAgbGV0IHJlcyA9IFwiXCI7XG4gICAgbGV0IGNhcnJ5ID0gXCJcIjtcbiAgICBjb25zdCBbYnAxLCBicDJdID0gdGhpcy5hZGRNYXhQYWRkaW5nKGIxLCBiMik7XG5cbiAgICBmb3IgKGxldCBpID0gYnAxLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICBjb25zdCBbciwgY10gPSB0aGlzLmVsZW1lbnRhcnlBZGRpdGlvbihicDFbaV0sIGJwMltpXSwgY2FycnkpO1xuICAgICAgcmVzID0gciArIHJlcztcbiAgICAgIGNhcnJ5ID0gYztcbiAgICB9XG5cbiAgICByZXR1cm4gW3JlcywgY2FycnldO1xuICB9XG5cbiAgLyoqXG4gICAqIFN1YnN0cmFjdCAyIGJpbmFyeSBudW1iZXJzXG4gICAqIEBwYXJhbSBiMSBUaGUgZmlyc3QgYmluYXJ5IG51bWJlclxuICAgKiBAcGFyYW0gYjIgVGhlIHNlY29uZCBiaW5hcnkgbnVtYmVyXG4gICAqIEByZXR1cm5zIFRoZSByZXN1bHQgb2YgdGhlIHN1YnN0cmFjdGlvbiBbYmluYXJ5TnVtYmVyLCBjYXJyeUJpdF1cbiAgICovXG4gIHB1YmxpYyBiaW5hcnlTdWJzdHJhY3Rpb24oYjE6IHN0cmluZywgYjI6IHN0cmluZykge1xuICAgIGNvbnN0IFticDEsIGJwMl0gPSB0aGlzLmFkZE1heFBhZGRpbmcoYjEsIGIyKTtcbiAgICByZXR1cm4gdGhpcy5iaW5hcnlBZGRpdGlvbihicDEsIHRoaXMuYzIoYnAyKSk7XG4gIH1cblxuICBwdWJsaWMgYzIoYjogc3RyaW5nKTogc3RyaW5nIHtcbiAgICBiID0gdGhpcy5pbnZlcnQoYik7XG4gICAgcmV0dXJuIHRoaXMuYmluYXJ5QWRkaXRpb24oYiwgXCIxXCIpLnJldmVyc2UoKS5qb2luKFwiXCIpO1xuICB9XG5cbiAgLyoqXG4gICAqIE11bHRpcGx5IDIgYmluYXJ5IG51bWJlcnNcbiAgICogQHBhcmFtIGIxIFRoZSBmaXJzdCBiaW5hcnkgbnVtYmVyXG4gICAqIEBwYXJhbSBiMiBUaGUgc2Vjb25kIGJpbmFyeSBudW1iZXJcbiAgICogQHJldHVybnMgVGhlIHJlc3VsdCBvZiB0aGUgbXVsdGlwbGljYXRpb25cbiAgICovXG4gIHB1YmxpYyBiaW5hcnlNdWx0aXBsaWNhdGlvbihiMTogc3RyaW5nLCBiMjogc3RyaW5nKSB7XG4gICAgbGV0IHJlcyA9IFwiXCI7XG4gICAgY29uc3QgYWRkUmVzdWx0cyA9IFtdO1xuXG4gICAgLy8gVGhlIGJpbmFyeSBudW1iZXJzIHRvIG11bGl0cGx5XG4gICAgLy8gYnAxID0gMTAxMVxuICAgIC8vIGJwMiA9IDExMTFcbiAgICBjb25zdCBbYnAxLCBicDJdID0gdGhpcy5hZGRNYXhQYWRkaW5nKGIxLCBiMik7XG5cbiAgICAvLyBDYWxjdWxhdGUgdGhlIG9wZXJhbmRzXG4gICAgLy8gYWRkUmVzdWx0cyA9IFtcbiAgICAvLyAgICAwMDAwIDEwMTEsXG4gICAgLy8gICAgMDAwMSAwMTEwLFxuICAgIC8vICAgIDAwMTAgMTEwMCxcbiAgICAvLyAgICAxMDExIDAwMDBcbiAgICAvLyBdXG4gICAgZm9yIChsZXQgaSA9IGJwMS5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgbGV0IGN1cnJlbnRSZXMgPSBcIlwiO1xuXG4gICAgICBmb3IgKGxldCBqID0gYnAxLmxlbmd0aCAtIDE7IGogPj0gMDsgai0tKSB7XG4gICAgICAgIGN1cnJlbnRSZXMgPSAoTnVtYmVyKGJwMVtqXSkgKiBOdW1iZXIoYnAyW2ldKSkgKyBjdXJyZW50UmVzO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBkZWMgPSB0aGlzLmJpbmFyeVRvRGVjaW1hbChjdXJyZW50UmVzKSA8PCAoYnAxLmxlbmd0aCAtIDEgLSBpKTtcbiAgICAgIGN1cnJlbnRSZXMgPSB0aGlzLmRlY2ltYWxUb0JpbmFyeShkZWMpO1xuICAgICAgYWRkUmVzdWx0cy5wdXNoKGN1cnJlbnRSZXMpO1xuICAgIH1cblxuICAgIC8vIEFkZCBldmVyeXRoaW5nXG4gICAgLy8gcmVzID1cbiAgICAvLyAgIDAwMDAgMTAxMSxcbiAgICAvLyArIDAwMDEgMDExMCxcbiAgICAvLyArIDAwMTAgMTEwMCxcbiAgICAvLyArIDEwMTEgMDAwMFxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYWRkUmVzdWx0cy5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgYWRkUmVzdWx0ID0gdGhpcy5hZGRQYWRkaW5nKGFkZFJlc3VsdHNbYWRkUmVzdWx0cy5sZW5ndGggLSAxXS5sZW5ndGgsIGFkZFJlc3VsdHNbaV0pO1xuICAgICAgY29uc3QgW3IsIGNdID0gdGhpcy5iaW5hcnlBZGRpdGlvbihyZXMsIGFkZFJlc3VsdCk7XG4gICAgICByZXMgPSBjICsgcjtcbiAgICB9XG5cbiAgICAvLyByZXMgPSAxMDEwMDEwMVxuICAgIHJldHVybiByZXM7XG4gIH1cbn1cbiIsImltcG9ydCB7IEJpbmFyeUhlbHBlciB9IGZyb20gXCIuL0JpbmFyeUhlbHBlclwiO1xuXG4vKipcbiAqIEVuY29kZSBhIGZsb2F0aW5nIG51bWJlciB3aXRoIGEgY2hvb3NlbiBiaXQgc2l6ZSBhbmQgSUVFRSA3NTRcbiAqL1xuZXhwb3J0IGNsYXNzIEJpbmFyeUZsb2F0IHtcbiAgcHJpdmF0ZSBfYml0c1NpemUgPSAzMjtcbiAgcHJpdmF0ZSBfbnVtYmVyID0gMDtcbiAgcHJpdmF0ZSBfYmluYXJ5U2lnbjogXCIxXCIgfCBcIjBcIiA9IFwiMFwiO1xuICBwcml2YXRlIF9iaW5hcnlNYW50aXNzYSA9IFwiXCI7XG4gIHByaXZhdGUgX292ZXJmbG93ID0gZmFsc2U7XG4gIHByaXZhdGUgX21hbnRpc3NhRG90UG9zaXRpb24gPSAwO1xuICBwcml2YXRlIF9iaW5hcnlFeHBvbmVudCA9IFwiXCI7XG4gIHByaXZhdGUgX2JpYXMgPSAwO1xuICBwcml2YXRlIF9iaCA9IG5ldyBCaW5hcnlIZWxwZXIoKTtcblxuICBjb25zdHJ1Y3RvcihudW1iZXJPckJpbmFyeTogc3RyaW5nKTtcbiAgY29uc3RydWN0b3IobnVtYmVyT3JCaW5hcnk6IG51bWJlciwgYml0c1NpemU6IG51bWJlcik7XG4gIGNvbnN0cnVjdG9yKG51bWJlck9yQmluYXJ5OiBudW1iZXIgfCBzdHJpbmcsIGJpdHNTaXplPzogbnVtYmVyKSB7XG4gICAgaWYgKHR5cGVvZiBudW1iZXJPckJpbmFyeSA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgLy8gUmVtb3ZlIHRoZSBzcGFjZXMgaW4gdGhlIHN0cmluZ1xuICAgICAgbnVtYmVyT3JCaW5hcnkgPSBudW1iZXJPckJpbmFyeS50cmltKCk7XG4gICAgICBudW1iZXJPckJpbmFyeSA9IG51bWJlck9yQmluYXJ5LnJlcGxhY2UoL1xccy9nLCBcIlwiKTtcbiAgICAgIHRoaXMuYml0c1NpemUgPSBudW1iZXJPckJpbmFyeS5sZW5ndGg7XG4gICAgICB0aGlzLm51bWJlciA9IDE7XG5cbiAgICAgIC8vIFNsaWNlIHRoZSBzdHJpbmcgdG8gYXNzaWduIHRoZSBiaW5hcnkgbnVtYmVyIHRvIHRoZSBjb3JyZWN0IHBhcnQgb2YgdGhlIGJpbmFyeSByZXByZXNlbnRhdGlvbiBvZiB0aGUgZmxvYXRcbiAgICAgIHRoaXMuYmluYXJ5U2lnbiA9IG51bWJlck9yQmluYXJ5WzBdIGFzIFwiMFwiIHwgXCIxXCI7XG4gICAgICB0aGlzLmJpbmFyeUV4cG9uZW50ID0gbnVtYmVyT3JCaW5hcnkuc2xpY2UoMSwgdGhpcy5leHBvbmVudEJpdHNTaXplICsgMSk7XG4gICAgICB0aGlzLmJpbmFyeU1hbnRpc3NhID0gbnVtYmVyT3JCaW5hcnkuc2xpY2UodGhpcy5leHBvbmVudEJpdHNTaXplICsgMSwgdGhpcy5iaXRzU2l6ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuYml0c1NpemUgPSBiaXRzU2l6ZTtcbiAgICAgIHRoaXMubnVtYmVyID0gbnVtYmVyT3JCaW5hcnk7XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIGdldEluZmluaXR5KGJpdHNTaXplOiBudW1iZXIpIHtcbiAgICByZXR1cm4gbmV3IEJpbmFyeUZsb2F0KEluZmluaXR5LCBiaXRzU2l6ZSk7XG4gIH1cblxuICBzdGF0aWMgZ2V0TmFOKGJpdHNTaXplOiBudW1iZXIpIHtcbiAgICByZXR1cm4gbmV3IEJpbmFyeUZsb2F0KE5hTiwgYml0c1NpemUpO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoZSBmbG9hdCBudW1iZXIgdG8gY29kZWQgd2l0aCBJRUVFIDc1NFxuICAgKi9cbiAgZ2V0IG51bWJlcigpIHtcbiAgICByZXR1cm4gdGhpcy5fbnVtYmVyO1xuICB9XG5cbiAgc2V0IG51bWJlcih2YWx1ZTogbnVtYmVyKSB7XG4gICAgdGhpcy5fbnVtYmVyID0gdmFsdWU7XG5cbiAgICB0aGlzLmNhbGN1bGF0ZUJpbmFyeVNpZ24oKTtcbiAgICB0aGlzLmNhbGN1bGF0ZUJpYXMoKTtcbiAgICB0aGlzLmNhbGN1bGF0ZUJpbmFyeU1hbnRpc3NhKCk7XG4gICAgdGhpcy5jYWxjdWxhdGVCaW5hcnlFeHBvbmVudCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoZSBiaXQgc2l6ZSB0byBjb2RlIHRoZSBudW1iZXJcbiAgICovXG4gIGdldCBiaXRzU2l6ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fYml0c1NpemU7XG4gIH1cblxuICBzZXQgYml0c1NpemUodmFsdWU6IG51bWJlcikge1xuICAgIHRoaXMuX2JpdHNTaXplID0gdmFsdWU7XG5cbiAgICBpZiAodmFsdWUgPiA4MCkge1xuICAgICAgdGhpcy5fYml0c1NpemUgPSA4MDtcbiAgICB9XG5cbiAgICBpZiAodmFsdWUgPCA4KSB7XG4gICAgICB0aGlzLl9iaXRzU2l6ZSA9IDg7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgbWFudGlzc2EgYml0cyBzaXplXG4gICAqL1xuICBnZXQgbWFudGlzc2FCaXRzU2l6ZSgpIHtcbiAgICBpZiAodGhpcy5iaXRzU2l6ZSA8IDgpIHtcbiAgICAgIHJldHVybiAwO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmJpdHNTaXplIC0gdGhpcy5leHBvbmVudEJpdHNTaXplIC0gMTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIGV4cG9uZW50IGJpdHMgc2l6ZSB3aXRoOlxuICAgKiAtIFRoZSBJRUVFIDc1NCAyMDE5IGZvcm11bGEgaWYgdGhlIGJpdHMgc2l6ZSBpcyBncmVhdGVyIG9yIGVxdWFsIHRvIDEyOFxuICAgKiAtIEEgY3VzdG9tIGZvcm11bGEgaWYgdGhlIGJpdCBzaXplIGlzIGxlc3MgdGhhbiAxMjggdGhhdCBtYXRjaGVzIHRoZSBJRUVFIHN0YW5kYXJkXG4gICAqIFxuICAgKiBWaXN1YWxpemUgdGhlIGZ1bmN0aW9uIG9uIGdlb2dlYnJhOlxuICAgKiBodHRwczovL3d3dy5nZW9nZWJyYS5vcmcvY2FsY3VsYXRvci9jZXJya2RmdlxuICAgKi9cbiAgZ2V0IGV4cG9uZW50Qml0c1NpemUoKSB7XG4gICAgaWYgKHRoaXMuYml0c1NpemUgPCA4KSB7XG4gICAgICByZXR1cm4gMDtcbiAgICB9XG5cbiAgICAvLyBJRUVFIDc1NCAyMDE5IGZvcm11bGEgPj0gMTI4XG4gICAgaWYgKHRoaXMuYml0c1NpemUgPj0gMTI4KSB7XG4gICAgICByZXR1cm4gTWF0aC5yb3VuZCg0ICogTWF0aC5sb2cyKHRoaXMuYml0c1NpemUpKSAtIDEzO1xuICAgIH1cblxuICAgIC8vIEEgZm9ybXVsYSB0aGF0IG1hdGNoZXMgdGhlIHZhbHVlcyBmb3IgPCAxMjhcbiAgICAvLyByZWY6IGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vYS82MjYzMjI2MFxuICAgIHJldHVybiBNYXRoLnJvdW5kKChNYXRoLmxvZzIodGhpcy5iaXRzU2l6ZSkgLSAxKSAqKiAoMyAvIDIpKTtcbiAgfVxuXG4gIGdldCBwb3NpdGl2ZU51bWJlcigpIHtcbiAgICByZXR1cm4gTWF0aC5hYnModGhpcy5udW1iZXIpO1xuICB9XG5cbiAgLyoqXG4gICAqIENhbGN1bGF0ZSB0aGUgcG9zaXRpb24gb2YgdGhlIGRvdCBpbiB0aGUgbWFudGlzc2FcbiAgICogICAgICAgICAgICBmbG9hdCBwb3NpdGlvblxuICAgKiAgICAgICAgICAgICAgICAgIHxcbiAgICogICAgICAgICAgICAgICAgICB2XG4gICAqIG1hbnRpc3NhKDE5LjU5Mzc1KSA9PiBcIjAwMTEuMTAwMTEwMDAwMDAwMDAwMDAwMFwiXG4gICAqL1xuICBnZXQgbWFudGlzc2FEb3RQb3NpdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5fbWFudGlzc2FEb3RQb3NpdGlvbjtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIGV4cG9uZW50IG9mIHRoZSBudW1iZXIgaW4gYmluYXJ5IHdpdGggdGhlIGJpYXNcbiAgICogbWFudGlzc2EoMTkuNTkzNzUpID0+IFwiMTAwMDAwMTBcIlxuICAgKi9cbiAgZ2V0IGJpbmFyeUV4cG9uZW50KCkge1xuICAgIHJldHVybiB0aGlzLl9iaW5hcnlFeHBvbmVudDtcbiAgfVxuXG4gIHNldCBiaW5hcnlFeHBvbmVudCh2YWx1ZTogc3RyaW5nKSB7XG4gICAgdGhpcy5fYmluYXJ5RXhwb25lbnQgPSB2YWx1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gdGhlIGJpYXMgb2YgdGhlIG51bWJlciBiYXNlZCBvbiB0aGUgZXhwb25lbnQgYml0IHNpemVcbiAgICogYiA9IDIgXiAoZXhwb25lbnRCaXRzU2l6ZSAtIDEpIC0gMVxuICAgKi9cbiAgZ2V0IGJpYXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2JpYXM7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBmdWxsIG1hbnRpc3NhIG9mIHRoZSBudW1iZXJcbiAgICovXG4gIGdldCBiaW5hcnlNYW50aXNzYSgpIHtcbiAgICByZXR1cm4gdGhpcy5fYmluYXJ5TWFudGlzc2E7XG4gIH1cblxuICBzZXQgYmluYXJ5TWFudGlzc2EodmFsdWU6IHN0cmluZykge1xuICAgIHRoaXMuX2JpbmFyeU1hbnRpc3NhID0gdmFsdWU7XG4gICAgdGhpcy5fb3ZlcmZsb3cgPSB2YWx1ZS5sZW5ndGggPiB0aGlzLm1hbnRpc3NhQml0c1NpemU7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBmdWxsIG51bWJlciBjb2RlZCBpbiBiaW5hcnkgd2l0aCBJRUVFIDc1NFxuICAgKi9cbiAgZ2V0IGJpbmFyeUZsb2F0aW5nTnVtYmVyKCkge1xuICAgIHJldHVybiB0aGlzLmJpbmFyeVNpZ24gKyB0aGlzLmJpbmFyeUV4cG9uZW50ICsgdGhpcy5iaW5hcnlNYW50aXNzYTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgc2lnbiBpbiBpdCdzIGRlY2ltYWwgZm9ybVxuICAgKi9cbiAgZ2V0IGNvbXB1dGVkU2lnbigpIHtcbiAgICByZXR1cm4gdGhpcy5iaW5hcnlTaWduID09PSBcIjFcIiA/IC0xIDogMTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgZXhwb25lbnQgaW4gaXQncyBkZWNpbWFsIGZvcm1cbiAgICovXG4gIGdldCBjb21wdXRlZEV4cG9uZW50KCkge1xuICAgIHJldHVybiB0aGlzLl9iaC5iaW5hcnlUb0RlY2ltYWwodGhpcy5iaW5hcnlFeHBvbmVudCkgLSB0aGlzLmJpYXM7XG4gIH1cblxuICAvKipcbiAgICogVGhlIG1hbnRpc3NhIGluIGl0J3MgZGVjaW1hbCBmb3JtXG4gICAqL1xuICBnZXQgY29tcHV0ZWRNYW50aXNzYSgpIHtcbiAgICByZXR1cm4gdGhpcy5fYmguYmluYXJ5VG9EZWNpbWFsKFwiMVwiICsgdGhpcy5iaW5hcnlNYW50aXNzYSkgLyAyICoqIHRoaXMubWFudGlzc2FCaXRzU2l6ZTtcbiAgfVxuXG4gIGdldCBpc05hTigpIHtcbiAgICBjb25zdCBpc05hTkJpbmFyeSA9IChcbiAgICAgIHRoaXMuYmluYXJ5RXhwb25lbnQuaW5kZXhPZihcIjBcIikgPT09IC0xICYmXG4gICAgICB0aGlzLmJpbmFyeU1hbnRpc3NhLmluZGV4T2YoXCIwXCIpID09PSAtMSAmJlxuICAgICAgdGhpcy5iaW5hcnlTaWduID09PSBcIjBcIlxuICAgICk7XG5cbiAgICByZXR1cm4gTnVtYmVyLmlzTmFOKHRoaXMubnVtYmVyKSB8fCBpc05hTkJpbmFyeTtcbiAgfVxuXG4gIGdldCBpc0luZmluaXR5KCkge1xuICAgIGNvbnN0IGlzSW5maW5pdHlCaW5hcnkgPSAoXG4gICAgICB0aGlzLmJpbmFyeUV4cG9uZW50LmluZGV4T2YoXCIwXCIpID09PSAtMSAmJlxuICAgICAgdGhpcy5iaW5hcnlNYW50aXNzYS5pbmRleE9mKFwiMVwiKSA9PT0gLTEgJiZcbiAgICAgIHRoaXMuYmluYXJ5U2lnbiA9PT0gXCIwXCJcbiAgICApO1xuXG4gICAgcmV0dXJuIHRoaXMubnVtYmVyID09PSBJbmZpbml0eSB8fCBpc0luZmluaXR5QmluYXJ5O1xuICB9XG5cbiAgZ2V0IGlzWmVybygpIHtcbiAgICBjb25zdCBpc1plcm9CaW5hcnkgPSAoXG4gICAgICB0aGlzLmJpbmFyeUV4cG9uZW50LmluZGV4T2YoXCIxXCIpID09PSAtMSAmJlxuICAgICAgdGhpcy5iaW5hcnlNYW50aXNzYS5pbmRleE9mKFwiMVwiKSA9PT0gLTEgJiZcbiAgICAgIHRoaXMuYmluYXJ5U2lnbiA9PT0gXCIwXCJcbiAgICApO1xuXG4gICAgcmV0dXJuIHRoaXMubnVtYmVyID09PSAwIHx8IGlzWmVyb0JpbmFyeTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgbnVtYmVyIHRoYXQgaXMgY29kZWQgaW4gbWVtb3J5XG4gICAqL1xuICBnZXQgY29tcHV0ZWROdW1iZXIoKSB7XG4gICAgaWYgKHRoaXMuaXNaZXJvKSB7XG4gICAgICByZXR1cm4gMDtcbiAgICB9IGVsc2UgaWYgKHRoaXMuaXNOYU4pIHtcbiAgICAgIHJldHVybiBOYU47XG4gICAgfSBlbHNlIGlmICh0aGlzLmlzSW5maW5pdHkpIHtcbiAgICAgIHJldHVybiBJbmZpbml0eTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5jb21wdXRlZFNpZ24gKiAyICoqIHRoaXMuY29tcHV0ZWRFeHBvbmVudCAqIHRoaXMuY29tcHV0ZWRNYW50aXNzYTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIG1hcmdpbiBvZiBlcnJvclxuICAgKi9cbiAgZ2V0IGVycm9yKCkgeyAgICBcbiAgICBpZiAoTnVtYmVyLmlzTmFOKHRoaXMubnVtYmVyKSB8fCB0aGlzLm51bWJlciA9PT0gSW5maW5pdHkgfHwgdGhpcy5udW1iZXIgPT09IDApIHtcbiAgICAgIHJldHVybiAwO1xuICAgIH1cblxuICAgIHJldHVybiBNYXRoLmFicyh0aGlzLm51bWJlciAtIHRoaXMuY29tcHV0ZWROdW1iZXIpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybiB0aGUgYmluYXJ5IHJlcHJlc2VudGF0aW9uIG9mIHRoZSBzaWduXG4gICAqIDAgaWYgbnVtYmVyID49IDBcbiAgICogMSBpZiBudW1iZXIgPCAwXG4gICAqL1xuICBnZXQgYmluYXJ5U2lnbigpOiBcIjBcIiB8IFwiMVwiIHtcbiAgICByZXR1cm4gdGhpcy5fYmluYXJ5U2lnbjtcbiAgfVxuXG4gIHNldCBiaW5hcnlTaWduKHZhbHVlOiBcIjBcIiB8IFwiMVwiKSB7XG4gICAgdGhpcy5fYmluYXJ5U2lnbiA9IHZhbHVlO1xuICB9XG5cbiAgLyoqXG4gICAqIFRydWUgaWYgdGhlIG51bWJlciBjYW5ub3QgYmUgZW5jb2RlZCBpbiA8Yml0c1NpemU+IGJpdHNcbiAgICovXG4gIGdldCBvdmVyZmxvdygpIHtcbiAgICByZXR1cm4gdGhpcy5fb3ZlcmZsb3c7XG4gIH1cblxuICAvKipcbiAgICogRGV0ZXJtaW5lIHRoZSBiaW5hcnkgc2lnbiBvZiB0aGUgbnVtYmVyXG4gICAqL1xuICBwcml2YXRlIGNhbGN1bGF0ZUJpbmFyeVNpZ24oKSB7XG4gICAgdGhpcy5fYmluYXJ5U2lnbiA9IHRoaXMubnVtYmVyIDwgMCA/IFwiMVwiIDogXCIwXCI7XG4gIH1cblxuICAvKipcbiAgICogQ2FsY3VsYXRlIHRoZSBleHBvbmVudCBiaWFzIGJhc2VkIG9uIHRoZSBleHBvbmVudCBiaXQgc2l6ZVxuICAgKiBiID0gMiBeIChleHBvbmVudEJpdHNTaXplIC0gMSkgLSAxO1xuICAgKi9cbiAgcHJpdmF0ZSBjYWxjdWxhdGVCaWFzKCkge1xuICAgIHRoaXMuX2JpYXMgPSAyICoqICh0aGlzLmV4cG9uZW50Qml0c1NpemUgLSAxKSAtIDE7XG4gIH1cblxuICAvKipcbiAgICogRGV0ZXJtaW5lIHRoZSBiaW5hcnkgbWFudGlzc2EgYW5kIGRldGVybWluZSB0aGUgZG90IHBvc2l0aW9uIGluIHRoZSBtYW50aXNzYVxuICAgKi9cbiAgcHJpdmF0ZSBjYWxjdWxhdGVCaW5hcnlNYW50aXNzYSgpIHtcbiAgICBpZiAoTnVtYmVyLmlzTmFOKHRoaXMubnVtYmVyKSkge1xuICAgICAgdGhpcy5fbWFudGlzc2FEb3RQb3NpdGlvbiA9IDA7XG4gICAgICB0aGlzLl9iaW5hcnlNYW50aXNzYSA9IFwiXCIucGFkRW5kKHRoaXMubWFudGlzc2FCaXRzU2l6ZSwgXCIxXCIpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIEdldCB0aGUgaW50ZWdlciBwYXJ0XG4gICAgY29uc3QgaW50ZWdlclBhcnQgPSBNYXRoLnRydW5jKHRoaXMucG9zaXRpdmVOdW1iZXIpO1xuXG4gICAgLy8gR2V0IHRoZSBkZWNpbWFscyBvZiB0aGUgbnVtYmVyOiBkZWNpbWFscyA9IDE5LjU5Mzc1IC0gMTkgPSAwLjU5Mzc1XG4gICAgbGV0IGRlY2ltYWxzUGFydCA9IHRoaXMucG9zaXRpdmVOdW1iZXIgLSBNYXRoLnRydW5jKHRoaXMucG9zaXRpdmVOdW1iZXIpO1xuXG4gICAgY29uc3QgYmluYXJ5SW50ZWdlclBhcnQgPSB0aGlzLl9iaC5kZWNpbWFsVG9CaW5hcnkoaW50ZWdlclBhcnQpO1xuXG4gICAgLy8gR2V0IHRoZSBudW1iZXIgb2YgYml0cyBkZWRpY2F0ZWQgdG8gc3RvcmUgdGhlIGRlY2ltYWxzIGluIHRoZSBtYW50aXNzYVxuICAgIGNvbnN0IGRlY2ltYWxzQml0c1NpemUgPSB0aGlzLm1hbnRpc3NhQml0c1NpemUgLSBiaW5hcnlJbnRlZ2VyUGFydC5sZW5ndGggLSAxO1xuICAgIFxuICAgIGxldCBiaW5hcnlEZWNpbWFsc1BhcnQgPSBcIlwiO1xuICAgIC8vIDAuNTkzNzUgKiAyID0gMS4xODc1ICA9PiAxXG4gICAgLy8gMC4xODc1ICAqIDIgPSAwLjM3NSAgID0+IDBcbiAgICAvLyAwLjM3NSAgICogMiA9IDAuNzUgICAgPT4gMFxuICAgIC8vIDAuNzUgICAgKiAyID0gMS41ICAgICA9PiAxXG4gICAgLy8gMC41ICAgICAqIDIgPSAxICAgICAgID0+IDFcbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgZGVjaW1hbHNCaXRzU2l6ZTsgaSsrKSB7XG4gICAgICBkZWNpbWFsc1BhcnQgKj0gMjtcblxuICAgICAgaWYgKGRlY2ltYWxzUGFydCA+PSAxKSB7XG4gICAgICAgIGRlY2ltYWxzUGFydCAtPSAxO1xuICAgICAgICBiaW5hcnlEZWNpbWFsc1BhcnQgKz0gXCIxXCI7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBiaW5hcnlEZWNpbWFsc1BhcnQgKz0gXCIwXCI7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbGV0IGJpbmFyeU1hbnRpc3NhID0gYmluYXJ5SW50ZWdlclBhcnQgKyBiaW5hcnlEZWNpbWFsc1BhcnQ7XG5cbiAgICAvLyBHZXQgdGhlIHBvc2l0aW9uIG9mIHRoZSBmaXJzdCBiaXQgYXQgMSwgZm9yIG9ubHkgZGVjaW1hbHMgbnVtYmVyXG4gICAgbGV0IG1hbnRpc3NhRG90UG9zaXRpb24gPSAtYmluYXJ5TWFudGlzc2EuaW5kZXhPZihcIjFcIik7XG5cbiAgICAvLyBSZW1vdmUgYWxsIHRoZSBsZWFkaW5nIGJpdCBhdCAwIGZyb20gdGhlIG1hbnRpc3NhXG4gICAgYmluYXJ5TWFudGlzc2EgPSB0aGlzLl9iaC5jbGVhbihiaW5hcnlNYW50aXNzYSk7XG5cbiAgICAvLyBJZiB0aGUgcG9zaXRpb24gb2YgdGhlIGZpcnN0IGJpdCBhdCAxIGlzIDBcbiAgICAvLyB0aGVuIHRoZSBkb3QgcG9zaXRpb24gaXMgZXF1YWxzIHRvIHRoZSBsZW5ndGggb2YgdGhlIGJpbmFyeSBpbnRlZ2VyIHBhcnQgb2YgdGhlIG1hbnRpc3NhXG4gICAgaWYgKG1hbnRpc3NhRG90UG9zaXRpb24gPT09IDApIHtcbiAgICAgIG1hbnRpc3NhRG90UG9zaXRpb24gPSBiaW5hcnlJbnRlZ2VyUGFydC5sZW5ndGggLSAxO1xuICAgIH1cblxuICAgIC8vIEhpZGUgdGhlIGZpcnN0IGJpdCBhdCAxXG4gICAgYmluYXJ5TWFudGlzc2EgPSBiaW5hcnlNYW50aXNzYS5zdWJzdHJpbmcoMSk7XG5cbiAgICAvLyBNYWtlIHN1cmUgdGhhdCB0aGUgbWFudGlzc2EgbWF0Y2hlcyB0aGUgY29ycmVjdCBsZW5ndGggKDIzIGZvciAzMiBiaXRzIGZvciBleGFtcGxlKVxuICAgIGJpbmFyeU1hbnRpc3NhID0gYmluYXJ5TWFudGlzc2EucGFkRW5kKHRoaXMubWFudGlzc2FCaXRzU2l6ZSwgXCIwXCIpO1xuXG4gICAgdGhpcy5iaW5hcnlNYW50aXNzYSA9IGJpbmFyeU1hbnRpc3NhO1xuICAgIHRoaXMuX21hbnRpc3NhRG90UG9zaXRpb24gPSBtYW50aXNzYURvdFBvc2l0aW9uO1xuICB9XG5cbiAgLyoqXG4gICAqIENhbGN1bGF0ZSB0aGUgZXhwb25lbnQgaW4gYmluYXJ5XG4gICAqIGUgPSBiaW5hcnkobWFudGlzc2FGbG9hdFBvc2l0aW9uICsgYmlhcylcbiAgICovXG4gIHByaXZhdGUgY2FsY3VsYXRlQmluYXJ5RXhwb25lbnQoKSB7XG4gICAgLy8gSWYgdGhlIG51bWJlciBpcyBOYU4gb3IgSW5maW5pdHkgdGhlbiBhbGwgdGhlIGJpdHMgb2YgdGhlIGV4cG9uZW50IGFyZSBlcXVhbHMgdG8gMVxuICAgIGlmIChOdW1iZXIuaXNOYU4odGhpcy5udW1iZXIpIHx8IHRoaXMubnVtYmVyID09PSBJbmZpbml0eSkge1xuICAgICAgdGhpcy5fYmluYXJ5RXhwb25lbnQgPSBcIlwiLnBhZEVuZCh0aGlzLmV4cG9uZW50Qml0c1NpemUsIFwiMVwiKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBsZXQgZXhwb25lbnQgPSB0aGlzLm1hbnRpc3NhRG90UG9zaXRpb24gKyB0aGlzLmJpYXM7XG5cbiAgICAvLyBJZiB0aGUgbnVtYmVyIGlzIDAgdGhlbiBhbGwgdGhlIGJpdHMgb2YgdGhlIGV4cG9uZW50IGFyZSBlcXVhbHMgdG8gMFxuICAgIGlmICh0aGlzLm51bWJlciA9PT0gMCkge1xuICAgICAgZXhwb25lbnQgPSAwO1xuICAgIH1cblxuICAgIC8vIENvbnZlcnQgdGhlIGV4cG9uZW50IHRvIGJpbmFyeSBhbmQgYWRkIGxlYWRpbmcgMCB0byBtYXRjaCB0aGUgZXhwb25lbnQgYml0cyBzaXplXG4gICAgdGhpcy5fYmluYXJ5RXhwb25lbnQgPSB0aGlzLl9iaC5kZWNpbWFsVG9CaW5hcnkoZXhwb25lbnQpLnBhZFN0YXJ0KHRoaXMuZXhwb25lbnRCaXRzU2l6ZSwgXCIwXCIpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZCB0d28gYmluYXJ5IGZsb2F0IG51bWJlclxuICAgKiBAcGFyYW0gYmYyIFRoZSBiaW5hcnkgZmxvYXQgbnVtYmVyIHRvIGFkZFxuICAgKiBAcmV0dXJucyBUaGUgcmVzdWx0IG9mIHRoZSBhZGRpdGlvblxuICAgKi9cbiAgYWRkKGJmMjogQmluYXJ5RmxvYXQpIHtcbiAgICBjb25zdCBiZlJlcyA9IG5ldyBCaW5hcnlGbG9hdCgxLCB0aGlzLmJpdHNTaXplKTtcblxuICAgIGlmICh0aGlzLmlzTmFOIHx8IGJmMi5pc05hTikge1xuICAgICAgcmV0dXJuIEJpbmFyeUZsb2F0LmdldE5hTih0aGlzLmJpdHNTaXplKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5pc0luZmluaXR5IHx8IGJmMi5pc0luZmluaXR5KSB7XG4gICAgICByZXR1cm4gQmluYXJ5RmxvYXQuZ2V0SW5maW5pdHkodGhpcy5iaXRzU2l6ZSk7XG4gICAgfVxuXG4gICAgLy8gU3RlcCAxOiBEZXRlcm1pbmUgdGhlIGxvd2VzdCBleHBvbmVudCBiZXR3ZWVuIHRoaXMgYW5kIHRoZSBzZWNvbmQgbnVtYmVyXG4gICAgbGV0IGJmTWluQmluYXJ5RXhwb25lbnQ6IEJpbmFyeUZsb2F0ID0gdGhpcztcbiAgICBsZXQgYmZNYXhCaW5hcnlFeHBvbmVudDogQmluYXJ5RmxvYXQgPSBiZjI7XG4gICAgaWYgKHRoaXMuX2JoLmJpbmFyeVRvRGVjaW1hbChiZjIuYmluYXJ5RXhwb25lbnQpIDwgdGhpcy5fYmguYmluYXJ5VG9EZWNpbWFsKGJmTWluQmluYXJ5RXhwb25lbnQuYmluYXJ5RXhwb25lbnQpKSB7XG4gICAgICBiZk1pbkJpbmFyeUV4cG9uZW50ID0gYmYyO1xuICAgICAgYmZNYXhCaW5hcnlFeHBvbmVudCA9IHRoaXM7XG4gICAgfVxuXG4gICAgaWYgKGJmTWluQmluYXJ5RXhwb25lbnQuaXNaZXJvKSB7XG4gICAgICByZXR1cm4gYmZNYXhCaW5hcnlFeHBvbmVudDtcbiAgICB9XG5cbiAgICAvLyBTdGVwIDI6IFNoaWZ0IHRoZSBtYW50aXNzYVxuICAgIGNvbnN0IHNoaWZ0VmFsdWUgPSBiZk1heEJpbmFyeUV4cG9uZW50LmNvbXB1dGVkRXhwb25lbnQgLSBiZk1pbkJpbmFyeUV4cG9uZW50LmNvbXB1dGVkRXhwb25lbnQ7XG4gICAgY29uc3Qgc2hpZnRlZE1pbk1hbnRpc3NhID0gdGhpcy5fYmguc2hpZnRSaWdodChcIjFcIiArIGJmTWluQmluYXJ5RXhwb25lbnQuYmluYXJ5TWFudGlzc2EsIHNoaWZ0VmFsdWUpO1xuICAgIGJmTWluQmluYXJ5RXhwb25lbnQgPSBuZXcgQmluYXJ5RmxvYXQoYmZNaW5CaW5hcnlFeHBvbmVudC5jb21wdXRlZE51bWJlciwgdGhpcy5iaXRzU2l6ZSk7XG4gICAgYmZNaW5CaW5hcnlFeHBvbmVudC5iaW5hcnlNYW50aXNzYSA9IHNoaWZ0ZWRNaW5NYW50aXNzYTtcbiAgICBiZlJlcy5iaW5hcnlNYW50aXNzYSA9IHNoaWZ0ZWRNaW5NYW50aXNzYTtcbiAgICBcbiAgICAvLyBTdGVwIDM6IFB1dCB0aGUgc2FtZSBleHBvbmVudFxuICAgIGJmUmVzLmJpbmFyeUV4cG9uZW50ID0gYmZNYXhCaW5hcnlFeHBvbmVudC5iaW5hcnlFeHBvbmVudDtcblxuICAgIC8vIFN0ZXAgNDogQWRkIHRoZSBtYW50aXNzYSBhbmQgdGhlIHNoaWZ0ZWQgb25lXG4gICAgaWYgKGJmTWluQmluYXJ5RXhwb25lbnQuY29tcHV0ZWRTaWduID09PSBiZk1heEJpbmFyeUV4cG9uZW50LmNvbXB1dGVkU2lnbikge1xuICAgICAgYmZSZXMuYmluYXJ5TWFudGlzc2EgPSB0aGlzLl9iaC5iaW5hcnlBZGRpdGlvbihcIjFcIiArIGJmTWF4QmluYXJ5RXhwb25lbnQuYmluYXJ5TWFudGlzc2EsIGJmUmVzLmJpbmFyeU1hbnRpc3NhKS5yZXZlcnNlKCkuam9pbihcIlwiKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbGV0IG1pbnVzQmYgPSBcIjFcIiArIGJmTWF4QmluYXJ5RXhwb25lbnQuYmluYXJ5TWFudGlzc2E7XG4gICAgICBsZXQgYmFzZUJmID0gYmZNaW5CaW5hcnlFeHBvbmVudC5iaW5hcnlNYW50aXNzYTtcblxuICAgICAgaWYgKGJmTWluQmluYXJ5RXhwb25lbnQuY29tcHV0ZWRTaWduID09PSAtMSkge1xuICAgICAgICBiYXNlQmYgPSBtaW51c0JmO1xuICAgICAgICBtaW51c0JmID0gYmZNaW5CaW5hcnlFeHBvbmVudC5iaW5hcnlNYW50aXNzYTtcbiAgICAgIH1cblxuICAgICAgYmZSZXMuYmluYXJ5TWFudGlzc2EgPSB0aGlzLl9iaC5iaW5hcnlTdWJzdHJhY3Rpb24oYmFzZUJmLCBtaW51c0JmKS5yZXZlcnNlKCkuam9pbihcIlwiKTtcblxuICAgICAgY29uc29sZS5sb2coYmFzZUJmLCBtaW51c0JmLCBiZlJlcy5iaW5hcnlNYW50aXNzYSk7XG4gICAgfVxuXG4gICAgLy8gU3RlcCA1OiBOb3JtYWxpc2UgdGhlIG1hbnRpc3NhXG4gICAgaWYgKGJmUmVzLmJpbmFyeU1hbnRpc3NhLmxlbmd0aCAtIGJmUmVzLm1hbnRpc3NhQml0c1NpemUgPT09IDEpIHtcbiAgICAgIGNvbnNvbGUubG9nKGJmUmVzLmJpbmFyeU1hbnRpc3NhLmxlbmd0aCAtIGJmUmVzLm1hbnRpc3NhQml0c1NpemUpO1xuXG4gICAgICAvLyBIaWRlIHRoZSBmaXJzdCBiaXRcbiAgICAgIGJmUmVzLmJpbmFyeU1hbnRpc3NhID0gYmZSZXMuYmluYXJ5TWFudGlzc2Euc3Vic3RyaW5nKDEpO1xuICAgIH1cblxuICAgIC8vIE5vcm1hbGl6ZSBpZiB0aGVyZSBpcyBhIGNhcnJ5XG4gICAgaWYgKGJmUmVzLmJpbmFyeU1hbnRpc3NhLmxlbmd0aCAtIGJmUmVzLm1hbnRpc3NhQml0c1NpemUgPT09IDIpIHtcbiAgICAgIC8vIEhpZGUgdGhlIGZpcnN0IGJpdFxuICAgICAgYmZSZXMuYmluYXJ5TWFudGlzc2EgPSBiZlJlcy5iaW5hcnlNYW50aXNzYS5zdWJzdHJpbmcoMSk7XG5cbiAgICAgIC8vIFJlbW92ZSB0aGUgbGFzdCBiaXRcbiAgICAgIGJmUmVzLmJpbmFyeU1hbnRpc3NhID0gYmZSZXMuYmluYXJ5TWFudGlzc2Euc2xpY2UoMCwgLTEpO1xuXG4gICAgICAvLyBBZGQgMSB0byB0aGUgZXhwb25lbnRcbiAgICAgIGJmUmVzLmJpbmFyeUV4cG9uZW50ID0gdGhpcy5fYmguYWRkTnVtYmVyVG9CaW5hcnkoYmZSZXMuYmluYXJ5RXhwb25lbnQsIDEpWzBdO1xuICAgIH1cblxuICAgIHJldHVybiBiZlJlcztcbiAgfVxufVxuIiwiaW1wb3J0IHsgQmluYXJ5RmxvYXQgfSBmcm9tIFwiLi9jbGFzc2VzL0JpbmFyeUZsb2F0XCI7XG5cbmNvbnN0IGZiQml0c1NpemVFbGVtZW50ID0gPEhUTUxJbnB1dEVsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJmYi1iaXRzLXNpemVcIik7XG5jb25zdCBmYkZsb2F0aW5nTnVtYmVyRWxlbWVudCA9IDxIVE1MSW5wdXRFbGVtZW50PmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZmItZmxvYXRpbmctbnVtYmVyXCIpO1xuY29uc3QgZmJSZXN1bHRFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJmYi1yZXN1bHRcIik7XG5cbmZ1bmN0aW9uIG9uQ2hhbmdlQ29udmVydGVyRmIoKSB7XG4gIGNvbnN0IGJpdHNTaXplID0gTnVtYmVyKGZiQml0c1NpemVFbGVtZW50LnZhbHVlKTtcbiAgY29uc3QgZmxvYXRpbmdOdW1iZXIgPSBOdW1iZXIoZmJGbG9hdGluZ051bWJlckVsZW1lbnQudmFsdWUpO1xuXG4gIGlmIChiaXRzU2l6ZSA8IDgpIHtcbiAgICBmYlJlc3VsdEVsZW1lbnQuaW5uZXJIVE1MID0gYDxzcGFuIGNsYXNzPVwiY29sb3ItcmVkXCI+TGEgdGFpbGxlIGRlcyBiaXRzIGRvaXQgYXUgbWluaW11bSDDqnRyZSA4PC9zcGFuPmA7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgaWYgKGJpdHNTaXplID4gODApIHtcbiAgICBmYlJlc3VsdEVsZW1lbnQuaW5uZXJIVE1MID0gYDxzcGFuIGNsYXNzPVwiY29sb3ItcmVkXCI+TGEgdGFpbGxlIGRlcyBiaXRzIGRvaXQgYXUgbWF4aW11bSDDqnRyZSA4MDwvc3Bhbj5gO1xuICAgIHJldHVybjtcbiAgfVxuICBcbiAgaWYgKGZiQml0c1NpemVFbGVtZW50LnZhbHVlID09PSBcIlwiIHx8IGZiRmxvYXRpbmdOdW1iZXJFbGVtZW50LnZhbHVlID09PSBcIlwiKSB7XG4gICAgZmJSZXN1bHRFbGVtZW50LmlubmVySFRNTCA9IGA8c3BhbiBjbGFzcz1cImNvbG9yLWdyZXlcIj5WZXVpbGxleiByZW5zZWlnbmVyIHRvdXMgbGVzIGNoYW1wczwvc3Bhbj5gO1xuICAgIHJldHVybjtcbiAgfVxuICBcbiAgY29uc3QgYmYgPSBuZXcgQmluYXJ5RmxvYXQoZmxvYXRpbmdOdW1iZXIsIGJpdHNTaXplKTtcbiAgXG4gIGlmIChiZi5vdmVyZmxvdykge1xuICAgIGZiUmVzdWx0RWxlbWVudC5pbm5lckhUTUwgPSBgPHNwYW4gY2xhc3M9XCJjb2xvci1yZWRcIj5Wb3RyZSBub21icmUgYmluYWlyZSBlc3QgdHJvcCBncmFuZCBwb3VyIMOqdHJlIGVuY29kw6kgZW4gJHtiaXRzU2l6ZX0gYml0czwvc3Bhbj5gO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGZiUmVzdWx0RWxlbWVudC5pbm5lckhUTUwgPSBgXG4gICAgPGRpdiBjbGFzcz1cInJlc3VsdC1ncm91cFwiPlxuICAgICAgVGFpbGxlIGVuIGJpdHMgZGUgbCdleHBvc2FudDogJHtiZi5leHBvbmVudEJpdHNTaXplfVxuICAgIDwvZGl2PlxuICAgIFxuICAgIDxkaXYgY2xhc3M9XCJyZXN1bHQtZ3JvdXBcIj5cbiAgICAgIFRhaWxsZSBlbiBiaXRzIGRlIGxhIG1hbnRpc3NlOiAke2JmLm1hbnRpc3NhQml0c1NpemV9XG4gICAgPC9kaXY+XG5cbiAgICA8ZGl2IGNsYXNzPVwicmVzdWx0LWdyb3VwXCI+XG4gICAgICBCaWFpczogJHtiZi5iaWFzfVxuICAgIDwvZGl2PlxuICAgIFxuICAgIDxkaXYgY2xhc3M9XCJyZXN1bHQtZ3JvdXBcIj5cbiAgICAgIFNpZ25lOlxuICAgICAgPHNwYW4gY2xhc3M9XCJjb2xvci1yZWQgbW9ub1wiPiR7YmYuYmluYXJ5U2lnbn08L3NwYW4+XG4gICAgICA8c3BhbiBjbGFzcz1cIm1vbm9cIj4oJHtiZi5jb21wdXRlZFNpZ259KTwvc3Bhbj5cbiAgICA8L2Rpdj5cbiAgICBcbiAgICA8ZGl2IGNsYXNzPVwicmVzdWx0LWdyb3VwXCI+XG4gICAgICBNYW50aXNzZTpcbiAgICAgIDxzcGFuIGNsYXNzPVwiY29sb3Itb3JhbmdlIG1vbm9cIj5cbiAgICAgICAgJHtiZi5iaW5hcnlNYW50aXNzYX1cbiAgICAgIDwvc3Bhbj5cbiAgICAgIDxzcGFuIGNsYXNzPVwibW9ub1wiPigke2JmLmNvbXB1dGVkTWFudGlzc2F9KTwvc3Bhbj5cbiAgICA8L2Rpdj5cblxuICAgIDxkaXYgY2xhc3M9XCJyZXN1bHQtZ3JvdXBcIj5cbiAgICAgIEV4cG9zYW50OiA8c3BhbiBjbGFzcz1cImNvbG9yLWJsdWUgbW9ub1wiPiR7YmYuYmluYXJ5RXhwb25lbnR9PC9zcGFuPlxuICAgICAgPHNwYW4gY2xhc3M9XCJtb25vXCI+KDI8c3VwPiR7YmYuY29tcHV0ZWRFeHBvbmVudH08L3N1cD4pPC9zcGFuPlxuICAgIDwvZGl2PlxuICAgIFxuICAgIDxkaXYgY2xhc3M9XCJyZXN1bHQtZ3JvdXBcIj5cbiAgICAgIFLDqXN1bHRhdDpcbiAgICAgIDxzcGFuIGNsYXNzPVwiY29sb3ItcmVkIG1vbm9cIj4ke2JmLmJpbmFyeVNpZ259PC9zcGFuPlxuICAgICAgPHNwYW4gY2xhc3M9XCJjb2xvci1ibHVlIG1vbm9cIj4ke2JmLmJpbmFyeUV4cG9uZW50fTwvc3Bhbj5cbiAgICAgIDxzcGFuIGNsYXNzPVwiY29sb3Itb3JhbmdlIG1vbm9cIj4ke2JmLmJpbmFyeU1hbnRpc3NhfTwvc3Bhbj5cbiAgICA8L2Rpdj5cbiAgICBcbiAgICA8ZGl2IGNsYXNzPVwicmVzdWx0LWdyb3VwXCI+XG4gICAgICBOb21icmUgcsOpZWxsZW1lbnQgY29kw6k6ICR7YmYuY29tcHV0ZWROdW1iZXJ9XG4gICAgPC9kaXY+XG4gICAgXG4gICAgPGRpdiBjbGFzcz1cInJlc3VsdC1ncm91cFwiPlxuICAgICAgTWFyZ2UgZCdlcnJldXI6ICR7YmYuZXJyb3J9XG4gICAgPC9kaXY+XG4gIGA7XG59XG5cbmZiQml0c1NpemVFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgb25DaGFuZ2VDb252ZXJ0ZXJGYik7XG5mYkJpdHNTaXplRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwia2V5dXBcIiwgb25DaGFuZ2VDb252ZXJ0ZXJGYik7XG5mYkZsb2F0aW5nTnVtYmVyRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsIG9uQ2hhbmdlQ29udmVydGVyRmIpO1xuZmJGbG9hdGluZ051bWJlckVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImtleXVwXCIsIG9uQ2hhbmdlQ29udmVydGVyRmIpO1xuXG5vbkNoYW5nZUNvbnZlcnRlckZiKCk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/BinaryHelper.ts
var BinaryHelper = /** @class */ (function () {
    function BinaryHelper() {
    }
    /**
     * Convert a number to it's binary representation
     * @param decimal The
     * @returns The binary representation of the decimal number
     */
    BinaryHelper.toBinary = function (decimal) {
        return (decimal >>> 0).toString(2);
    };
    return BinaryHelper;
}());


;// CONCATENATED MODULE: ./src/index.ts

console.log(BinaryHelper.toBinary(5));

/******/ })()
;
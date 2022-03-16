/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/classes/BinaryFloat.ts
var BinaryFloat = /** @class */ (function () {
    function BinaryFloat() {
        this._bitsSize = 64;
    }
    Object.defineProperty(BinaryFloat.prototype, "bitsSize", {
        get: function () {
            return this._bitsSize;
        },
        set: function (value) {
            this._bitsSize = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BinaryFloat.prototype, "precisionBitsSize", {
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
        get: function () {
            if (this.bitsSize < 8) {
                return 0;
            }
            // IEEE 754 2019 formula >= 128
            if (this.bitsSize >= 128) {
                return Math.round(4 * Math.log2(this.bitsSize)) - 13;
            }
            // A formula that matches the values for < 128
            return Math.round((Math.log2(this.bitsSize) - 1) ^ (3 / 2));
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BinaryFloat.prototype, "floatingNumber", {
        get: function () {
            return 0;
        },
        enumerable: false,
        configurable: true
    });
    return BinaryFloat;
}());


;// CONCATENATED MODULE: ./src/labo1.ts

var bf = new BinaryFloat();
var bitsSizeElement = document.getElementById("bits-size");
var floatingNumberElement = document.getElementById("floating-number");
var result = document.getElementById("result");
function onChange() {
    console.log("change");
    var res = "";
    var bitsSize = Number(bitsSizeElement.value);
    var floatingNumber = Number(floatingNumberElement.value);
    if (!bitsSize || !floatingNumber) {
        res = "Please fill all the inputs";
    }
    bf.bitsSize = bitsSize;
    res = "\n    exponent bits size: ".concat(bf.exponentBitsSize, "\n    <br>\n    precision bits size: ").concat(bf.precisionBitsSize, "\n    <br>\n    result: ").concat(bf.floatingNumber, "\n  ");
    result.innerHTML = res || "Result...";
}
bitsSizeElement.addEventListener("change", onChange);
bitsSizeElement.addEventListener("keyup", onChange);
floatingNumberElement.addEventListener("change", onChange);
floatingNumberElement.addEventListener("keyup", onChange);
onChange();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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RCxRQUFRLEVBQUUsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL21hdGhfc3BlLy4vc3JjL2NsYXNzZXMvQmluYXJ5RmxvYXQudHMiLCJ3ZWJwYWNrOi8vbWF0aF9zcGUvLi9zcmMvbGFibzEudHMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNsYXNzIEJpbmFyeUZsb2F0IHtcbiAgcHJpdmF0ZSBfYml0c1NpemUgPSA2NDtcblxuICBnZXQgYml0c1NpemUoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fYml0c1NpemU7XG4gIH1cblxuICBzZXQgYml0c1NpemUodmFsdWU6IG51bWJlcikge1xuICAgIHRoaXMuX2JpdHNTaXplID0gdmFsdWU7XG4gIH1cblxuICBnZXQgcHJlY2lzaW9uQml0c1NpemUoKTogbnVtYmVyIHtcbiAgICBpZiAodGhpcy5iaXRzU2l6ZSA8IDgpIHtcbiAgICAgIHJldHVybiAwO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmJpdHNTaXplIC0gdGhpcy5leHBvbmVudEJpdHNTaXplIC0gMTtcbiAgfVxuXG4gIGdldCBleHBvbmVudEJpdHNTaXplKCk6IG51bWJlciB7XG4gICAgaWYgKHRoaXMuYml0c1NpemUgPCA4KSB7XG4gICAgICByZXR1cm4gMDtcbiAgICB9XG5cbiAgICAvLyBJRUVFIDc1NCAyMDE5IGZvcm11bGEgPj0gMTI4XG4gICAgaWYgKHRoaXMuYml0c1NpemUgPj0gMTI4KSB7XG4gICAgICByZXR1cm4gTWF0aC5yb3VuZCg0ICogTWF0aC5sb2cyKHRoaXMuYml0c1NpemUpKSAtIDEzO1xuICAgIH1cbiAgICAvLyBBIGZvcm11bGEgdGhhdCBtYXRjaGVzIHRoZSB2YWx1ZXMgZm9yIDwgMTI4XG4gICAgcmV0dXJuIE1hdGgucm91bmQoKE1hdGgubG9nMih0aGlzLmJpdHNTaXplKSAtIDEpIF4gKDMgLyAyKSk7XG4gIH1cblxuICBnZXQgZmxvYXRpbmdOdW1iZXIoKSB7XG4gICAgcmV0dXJuIDA7XG4gIH1cbn0iLCJpbXBvcnQgeyBCaW5hcnlGbG9hdCB9IGZyb20gXCIuL2NsYXNzZXMvQmluYXJ5RmxvYXRcIjtcblxuY29uc3QgYmYgPSBuZXcgQmluYXJ5RmxvYXQoKTtcblxuY29uc3QgYml0c1NpemVFbGVtZW50ID0gPEhUTUxJbnB1dEVsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJiaXRzLXNpemVcIik7XG5jb25zdCBmbG9hdGluZ051bWJlckVsZW1lbnQgPSA8SFRNTElucHV0RWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImZsb2F0aW5nLW51bWJlclwiKTtcbmNvbnN0IHJlc3VsdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicmVzdWx0XCIpO1xuXG5mdW5jdGlvbiBvbkNoYW5nZSgpIHtcbiAgY29uc29sZS5sb2coXCJjaGFuZ2VcIik7XG5cbiAgbGV0IHJlcyA9IFwiXCI7XG4gIGNvbnN0IGJpdHNTaXplID0gTnVtYmVyKGJpdHNTaXplRWxlbWVudC52YWx1ZSk7XG4gIGNvbnN0IGZsb2F0aW5nTnVtYmVyID0gTnVtYmVyKGZsb2F0aW5nTnVtYmVyRWxlbWVudC52YWx1ZSk7XG5cbiAgaWYgKCFiaXRzU2l6ZSB8fCAhZmxvYXRpbmdOdW1iZXIpIHtcbiAgICByZXMgPSBcIlBsZWFzZSBmaWxsIGFsbCB0aGUgaW5wdXRzXCI7XG4gIH1cblxuICBiZi5iaXRzU2l6ZSA9IGJpdHNTaXplO1xuXG4gIHJlcyA9IGBcbiAgICBleHBvbmVudCBiaXRzIHNpemU6ICR7YmYuZXhwb25lbnRCaXRzU2l6ZX1cbiAgICA8YnI+XG4gICAgcHJlY2lzaW9uIGJpdHMgc2l6ZTogJHtiZi5wcmVjaXNpb25CaXRzU2l6ZX1cbiAgICA8YnI+XG4gICAgcmVzdWx0OiAke2JmLmZsb2F0aW5nTnVtYmVyfVxuICBgO1xuXG4gIHJlc3VsdC5pbm5lckhUTUwgPSByZXMgfHwgXCJSZXN1bHQuLi5cIjtcbn1cblxuYml0c1NpemVFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgb25DaGFuZ2UpO1xuYml0c1NpemVFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXl1cFwiLCBvbkNoYW5nZSk7XG5mbG9hdGluZ051bWJlckVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCBvbkNoYW5nZSk7XG5mbG9hdGluZ051bWJlckVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImtleXVwXCIsIG9uQ2hhbmdlKTtcblxub25DaGFuZ2UoKTsiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/classes/BinaryFloat.ts
var BinaryFloat = /** @class */ (function () {
    function BinaryFloat() {
        this._bitsSize = 64;
        this._number = 0;
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
    Object.defineProperty(BinaryFloat.prototype, "number", {
        get: function () {
            return this._number;
        },
        set: function (value) {
            this._number = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BinaryFloat.prototype, "precisionBitsSize", {
        /**
         * Get the "mantisse" bits size
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
            return Math.round(Math.pow((Math.log2(this.bitsSize) - 1), (3 / 2)));
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
            return Math.pow(2, (this.exponentBitsSize - 1)) - 1;
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
            return this.number < 0 ? "1" : "0";
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BinaryFloat.prototype, "binaryExponent", {
        get: function () {
            return 0;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BinaryFloat.prototype, "binaryPrecision", {
        get: function () {
            return 0;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BinaryFloat.prototype, "binaryFloatingNumber", {
        get: function () {
            return "";
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
        res = "Veuillez renseigner tous les champs";
    }
    bf.bitsSize = bitsSize;
    res = "\n    Taille en bits de l'exposant: ".concat(bf.exponentBitsSize, "\n    <br>\n    Taille en bits de la mantisse: ").concat(bf.precisionBitsSize, "\n    <br>\n    R\u00E9sultat: ").concat(bf.binaryFloatingNumber, "\n  ");
    result.innerHTML = res || "Resultat...";
}
bitsSizeElement.addEventListener("change", onChange);
bitsSizeElement.addEventListener("keyup", onChange);
floatingNumberElement.addEventListener("change", onChange);
floatingNumberElement.addEventListener("keyup", onChange);
onChange();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDLEtBQUssQ0FBQyxDQUFDO0lBQy9DLElBQU0sY0FBYyxHQUFHLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUUzRCxJQUFJLENBQUMsUUFBUSxJQUFJLENBQUMsY0FBYyxFQUFFO1FBQ2hDLEdBQUcsR0FBRyxxQ0FBcUMsQ0FBQztLQUM3QztJQUVELEVBQUUsQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO0lBRXZCLEdBQUcsR0FBRyw4Q0FDNEIsRUFBRSxDQUFDLGdCQUFnQiw0REFFbEIsRUFBRSxDQUFDLGlCQUFpQiw0Q0FFekMsRUFBRSxDQUFDLG9CQUFvQixTQUNwQyxDQUFDO0lBRUYsTUFBTSxDQUFDLFNBQVMsR0FBRyxHQUFHLElBQUksYUFBYSxDQUFDO0FBQzFDLENBQUM7QUFFRCxlQUFlLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0FBQ3JELGVBQWUsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsUUFBUSxDQUFDLENBQUM7QUFDcEQscUJBQXFCLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0FBQzNELHFCQUFxQixDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxRQUFRLENBQUMsQ0FBQztBQUUxRCxRQUFRLEVBQUUsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL21hdGhfc3BlLy4vc3JjL2NsYXNzZXMvQmluYXJ5RmxvYXQudHMiLCJ3ZWJwYWNrOi8vbWF0aF9zcGUvLi9zcmMvbGFibzEudHMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNsYXNzIEJpbmFyeUZsb2F0IHtcbiAgcHJpdmF0ZSBfYml0c1NpemUgPSA2NDtcbiAgcHJpdmF0ZSBfbnVtYmVyID0gMDtcblxuICBnZXQgYml0c1NpemUoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fYml0c1NpemU7XG4gIH1cblxuICBzZXQgYml0c1NpemUodmFsdWU6IG51bWJlcikge1xuICAgIHRoaXMuX2JpdHNTaXplID0gdmFsdWU7XG4gIH1cblxuICBnZXQgbnVtYmVyKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX251bWJlcjtcbiAgfVxuXG4gIHNldCBudW1iZXIodmFsdWU6IG51bWJlcikge1xuICAgIHRoaXMuX251bWJlciA9IHZhbHVlO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgXCJtYW50aXNzZVwiIGJpdHMgc2l6ZVxuICAgKi9cbiAgZ2V0IHByZWNpc2lvbkJpdHNTaXplKCk6IG51bWJlciB7XG4gICAgaWYgKHRoaXMuYml0c1NpemUgPCA4KSB7XG4gICAgICByZXR1cm4gMDtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5iaXRzU2l6ZSAtIHRoaXMuZXhwb25lbnRCaXRzU2l6ZSAtIDE7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBleHBvbmVudCBiaXRzIHNpemUgd2l0aDpcbiAgICogLSBUaGUgSUVFRSA3NTQgMjAxOSBmb3JtdWxhIGlmIHRoZSBiaXRzIHNpemUgaXMgZ3JlYXRlciBvciBlcXVhbCB0byAxMjhcbiAgICogLSBBIGN1c3RvbSBmb3JtdWxhIGlmIHRoZSBiaXQgc2l6ZSBpcyBsZXNzIHRoYW4gMTI4IHRoYXQgbWF0Y2hlcyB0aGUgSUVFRSBzdGFuZGFyZFxuICAgKi9cbiAgZ2V0IGV4cG9uZW50Qml0c1NpemUoKTogbnVtYmVyIHtcbiAgICBpZiAodGhpcy5iaXRzU2l6ZSA8IDgpIHtcbiAgICAgIHJldHVybiAwO1xuICAgIH1cblxuICAgIC8vIElFRUUgNzU0IDIwMTkgZm9ybXVsYSA+PSAxMjhcbiAgICBpZiAodGhpcy5iaXRzU2l6ZSA+PSAxMjgpIHtcbiAgICAgIHJldHVybiBNYXRoLnJvdW5kKDQgKiBNYXRoLmxvZzIodGhpcy5iaXRzU2l6ZSkpIC0gMTM7XG4gICAgfVxuXG4gICAgLy8gQSBmb3JtdWxhIHRoYXQgbWF0Y2hlcyB0aGUgdmFsdWVzIGZvciA8IDEyOFxuICAgIHJldHVybiBNYXRoLnJvdW5kKChNYXRoLmxvZzIodGhpcy5iaXRzU2l6ZSkgLSAxKSAqKiAoMyAvIDIpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gdGhlIGJpYXMgb2YgdGhlIG51bWJlciBiYXNlZCBvbiB0aGUgZXhwb25lbnQgYml0IHNpemVcbiAgICogYiA9IDIgXiAoZXhwb25lbnRCaXRzU2l6ZSAtIDEpIC0gMVxuICAgKi9cbiAgZ2V0IGJpYXMoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gMiAqKiAodGhpcy5leHBvbmVudEJpdHNTaXplIC0gMSkgLSAxO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybiB0aGUgYmluYXJ5IHJlcHJlc2VudGF0aW9uIG9mIHRoZSBzaWduXG4gICAqIDAgaWYgbnVtYmVyID49IDBcbiAgICogMSBpZiBudW1iZXIgPCAwXG4gICAqL1xuICBnZXQgYmluYXJ5U2lnbigpOiBcIjBcIiB8IFwiMVwiIHtcbiAgICByZXR1cm4gdGhpcy5udW1iZXIgPCAwID8gXCIxXCIgOiBcIjBcIjsgXG4gIH1cblxuICBnZXQgYmluYXJ5RXhwb25lbnQoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gMDtcbiAgfVxuXG4gIGdldCBiaW5hcnlQcmVjaXNpb24oKTogbnVtYmVyIHtcbiAgICByZXR1cm4gMDtcbiAgfVxuXG4gIGdldCBiaW5hcnlGbG9hdGluZ051bWJlcigpOiBzdHJpbmcge1xuICAgIHJldHVybiBcIlwiO1xuICB9XG59IiwiaW1wb3J0IHsgQmluYXJ5RmxvYXQgfSBmcm9tIFwiLi9jbGFzc2VzL0JpbmFyeUZsb2F0XCI7XG5cbmNvbnN0IGJmID0gbmV3IEJpbmFyeUZsb2F0KCk7XG5cbmNvbnN0IGJpdHNTaXplRWxlbWVudCA9IDxIVE1MSW5wdXRFbGVtZW50PmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYml0cy1zaXplXCIpO1xuY29uc3QgZmxvYXRpbmdOdW1iZXJFbGVtZW50ID0gPEhUTUxJbnB1dEVsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJmbG9hdGluZy1udW1iZXJcIik7XG5jb25zdCByZXN1bHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInJlc3VsdFwiKTtcblxuZnVuY3Rpb24gb25DaGFuZ2UoKSB7XG4gIGNvbnNvbGUubG9nKFwiY2hhbmdlXCIpO1xuXG4gIGxldCByZXMgPSBcIlwiO1xuICBjb25zdCBiaXRzU2l6ZSA9IE51bWJlcihiaXRzU2l6ZUVsZW1lbnQudmFsdWUpO1xuICBjb25zdCBmbG9hdGluZ051bWJlciA9IE51bWJlcihmbG9hdGluZ051bWJlckVsZW1lbnQudmFsdWUpO1xuXG4gIGlmICghYml0c1NpemUgfHwgIWZsb2F0aW5nTnVtYmVyKSB7XG4gICAgcmVzID0gXCJWZXVpbGxleiByZW5zZWlnbmVyIHRvdXMgbGVzIGNoYW1wc1wiO1xuICB9XG5cbiAgYmYuYml0c1NpemUgPSBiaXRzU2l6ZTtcblxuICByZXMgPSBgXG4gICAgVGFpbGxlIGVuIGJpdHMgZGUgbCdleHBvc2FudDogJHtiZi5leHBvbmVudEJpdHNTaXplfVxuICAgIDxicj5cbiAgICBUYWlsbGUgZW4gYml0cyBkZSBsYSBtYW50aXNzZTogJHtiZi5wcmVjaXNpb25CaXRzU2l6ZX1cbiAgICA8YnI+XG4gICAgUsOpc3VsdGF0OiAke2JmLmJpbmFyeUZsb2F0aW5nTnVtYmVyfVxuICBgO1xuXG4gIHJlc3VsdC5pbm5lckhUTUwgPSByZXMgfHwgXCJSZXN1bHRhdC4uLlwiO1xufVxuXG5iaXRzU2l6ZUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCBvbkNoYW5nZSk7XG5iaXRzU2l6ZUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImtleXVwXCIsIG9uQ2hhbmdlKTtcbmZsb2F0aW5nTnVtYmVyRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsIG9uQ2hhbmdlKTtcbmZsb2F0aW5nTnVtYmVyRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwia2V5dXBcIiwgb25DaGFuZ2UpO1xuXG5vbkNoYW5nZSgpOyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==
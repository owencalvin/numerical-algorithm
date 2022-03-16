/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/BinaryFloat.ts
var BinaryFloat = /** @class */ (function () {
    function BinaryFloat() {
        this._bitsNumber = 64;
    }
    Object.defineProperty(BinaryFloat.prototype, "bitsNumber", {
        get: function () {
            return this._bitsNumber;
        },
        set: function (value) {
            this._bitsNumber = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BinaryFloat.prototype, "precisionBitsSize", {
        get: function () {
            return this.exponentBitsSize - this.bitsNumber - 1;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BinaryFloat.prototype, "exponentBitsSize", {
        get: function () {
            // IEEE 754 2019 formula >= 128
            if (this.bitsNumber >= 128) {
                return Math.round(4 * Math.log2(this.bitsNumber)) - 13;
            }
            // A formula that matches the values for < 128
            return Math.round((Math.log2(this.bitsNumber) - 1) ^ (3 / 2));
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
    var res = "";
    var bitsSize = Number(bitsSizeElement.value);
    var floatingNumber = Number(floatingNumberElement.value);
    if (!bitsSize || !floatingNumber) {
        res = "Please fill all the inputs";
    }
    bf.bitsNumber = floatingNumber;
    result.innerHTML = (res ?
        "\n      e: ".concat(bf.exponentBitsSize, "\n      <br>\n      m: ").concat(bf.precisionBitsSize, "\n      ")
        :
            "Result: ...");
}
bitsSizeElement.addEventListener("change", onChange);
bitsSizeElement.addEventListener("keyup", onChange);
floatingNumberElement.addEventListener("change", onChange);
floatingNumberElement.addEventListener("keyup", onChange);
onChange();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGFibzEuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQTtJQUFBO1FBQ1UsZ0JBQVcsR0FBRyxFQUFFLENBQUM7SUFzQjNCLENBQUM7SUFwQkMsc0JBQUksbUNBQVU7YUFBZDtZQUNFLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQztRQUMxQixDQUFDO2FBRUQsVUFBZSxLQUFhO1lBQzFCLElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO1FBQzNCLENBQUM7OztPQUpBO0lBTUQsc0JBQUksMENBQWlCO2FBQXJCO1lBQ0UsT0FBTyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUM7UUFDckQsQ0FBQzs7O09BQUE7SUFFRCxzQkFBSSx5Q0FBZ0I7YUFBcEI7WUFDRSwrQkFBK0I7WUFDL0IsSUFBSSxJQUFJLENBQUMsVUFBVSxJQUFJLEdBQUcsRUFBRTtnQkFDMUIsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQzthQUN4RDtZQUNELDhDQUE4QztZQUM5QyxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2hFLENBQUM7OztPQUFBO0lBQ0gsa0JBQUM7QUFBRCxDQUFDOzs7O0FDdkIyQztBQUU1QyxJQUFNLEVBQUUsR0FBRyxJQUFJLFdBQVcsRUFBRSxDQUFDO0FBRTdCLElBQU0sZUFBZSxHQUFxQixRQUFRLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBQy9FLElBQU0scUJBQXFCLEdBQXFCLFFBQVEsQ0FBQyxjQUFjLENBQUMsaUJBQWlCLENBQUMsQ0FBQztBQUMzRixJQUFNLE1BQU0sR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBRWpELFNBQVMsUUFBUTtJQUNmLElBQUksR0FBRyxHQUFHLEVBQUUsQ0FBQztJQUNiLElBQU0sUUFBUSxHQUFHLE1BQU0sQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDL0MsSUFBTSxjQUFjLEdBQUcsTUFBTSxDQUFDLHFCQUFxQixDQUFDLEtBQUssQ0FBQyxDQUFDO0lBRTNELElBQUksQ0FBQyxRQUFRLElBQUksQ0FBQyxjQUFjLEVBQUU7UUFDaEMsR0FBRyxHQUFHLDRCQUE0QixDQUFDO0tBQ3BDO0lBRUQsRUFBRSxDQUFDLFVBQVUsR0FBRyxjQUFjLENBQUM7SUFFL0IsTUFBTSxDQUFDLFNBQVMsR0FBRyxDQUNqQixHQUFHLENBQUMsQ0FBQztRQUNILHFCQUNLLEVBQUUsQ0FBQyxnQkFBZ0Isb0NBRW5CLEVBQUUsQ0FBQyxpQkFBaUIsYUFDeEI7UUFDSCxDQUFDO1lBQ0MsYUFBYSxDQUNoQixDQUFDO0FBQ0osQ0FBQztBQUVELGVBQWUsQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLENBQUM7QUFDckQsZUFBZSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxRQUFRLENBQUMsQ0FBQztBQUNwRCxxQkFBcUIsQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLENBQUM7QUFDM0QscUJBQXFCLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0FBRTFELFFBQVEsRUFBRSxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbWF0aF9zcGUvLi9zcmMvQmluYXJ5RmxvYXQudHMiLCJ3ZWJwYWNrOi8vbWF0aF9zcGUvLi9zcmMvbGFibzEudHMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNsYXNzIEJpbmFyeUZsb2F0IHtcbiAgcHJpdmF0ZSBfYml0c051bWJlciA9IDY0O1xuXG4gIGdldCBiaXRzTnVtYmVyKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX2JpdHNOdW1iZXI7XG4gIH1cblxuICBzZXQgYml0c051bWJlcih2YWx1ZTogbnVtYmVyKSB7XG4gICAgdGhpcy5fYml0c051bWJlciA9IHZhbHVlO1xuICB9XG5cbiAgZ2V0IHByZWNpc2lvbkJpdHNTaXplKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuZXhwb25lbnRCaXRzU2l6ZSAtIHRoaXMuYml0c051bWJlciAtIDE7XG4gIH1cblxuICBnZXQgZXhwb25lbnRCaXRzU2l6ZSgpOiBudW1iZXIge1xuICAgIC8vIElFRUUgNzU0IDIwMTkgZm9ybXVsYSA+PSAxMjhcbiAgICBpZiAodGhpcy5iaXRzTnVtYmVyID49IDEyOCkge1xuICAgICAgcmV0dXJuIE1hdGgucm91bmQoNCAqIE1hdGgubG9nMih0aGlzLmJpdHNOdW1iZXIpKSAtIDEzO1xuICAgIH1cbiAgICAvLyBBIGZvcm11bGEgdGhhdCBtYXRjaGVzIHRoZSB2YWx1ZXMgZm9yIDwgMTI4XG4gICAgcmV0dXJuIE1hdGgucm91bmQoKE1hdGgubG9nMih0aGlzLmJpdHNOdW1iZXIpIC0gMSkgXiAoMyAvIDIpKTtcbiAgfVxufSIsImltcG9ydCB7IEJpbmFyeUZsb2F0IH0gZnJvbSBcIi4vQmluYXJ5RmxvYXRcIjtcblxuY29uc3QgYmYgPSBuZXcgQmluYXJ5RmxvYXQoKTtcblxuY29uc3QgYml0c1NpemVFbGVtZW50ID0gPEhUTUxJbnB1dEVsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJiaXRzLXNpemVcIik7XG5jb25zdCBmbG9hdGluZ051bWJlckVsZW1lbnQgPSA8SFRNTElucHV0RWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImZsb2F0aW5nLW51bWJlclwiKTtcbmNvbnN0IHJlc3VsdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicmVzdWx0XCIpO1xuXG5mdW5jdGlvbiBvbkNoYW5nZSgpIHtcbiAgbGV0IHJlcyA9IFwiXCI7XG4gIGNvbnN0IGJpdHNTaXplID0gTnVtYmVyKGJpdHNTaXplRWxlbWVudC52YWx1ZSk7XG4gIGNvbnN0IGZsb2F0aW5nTnVtYmVyID0gTnVtYmVyKGZsb2F0aW5nTnVtYmVyRWxlbWVudC52YWx1ZSk7XG5cbiAgaWYgKCFiaXRzU2l6ZSB8fCAhZmxvYXRpbmdOdW1iZXIpIHtcbiAgICByZXMgPSBcIlBsZWFzZSBmaWxsIGFsbCB0aGUgaW5wdXRzXCI7XG4gIH1cblxuICBiZi5iaXRzTnVtYmVyID0gZmxvYXRpbmdOdW1iZXI7XG5cbiAgcmVzdWx0LmlubmVySFRNTCA9IChcbiAgICByZXMgP1xuICAgICAgYFxuICAgICAgZTogJHtiZi5leHBvbmVudEJpdHNTaXplfVxuICAgICAgPGJyPlxuICAgICAgbTogJHtiZi5wcmVjaXNpb25CaXRzU2l6ZX1cbiAgICAgIGBcbiAgICA6XG4gICAgICBcIlJlc3VsdDogLi4uXCJcbiAgKTtcbn1cblxuYml0c1NpemVFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgb25DaGFuZ2UpO1xuYml0c1NpemVFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXl1cFwiLCBvbkNoYW5nZSk7XG5mbG9hdGluZ051bWJlckVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCBvbkNoYW5nZSk7XG5mbG9hdGluZ051bWJlckVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImtleXVwXCIsIG9uQ2hhbmdlKTtcblxub25DaGFuZ2UoKTsiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=
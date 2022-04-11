/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 936:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "e": () => (/* binding */ Bisection)
/* harmony export */ });
/**
 * Determine the roots of functions with the bisection method
 */
var Bisection = /** @class */ (function () {
    function Bisection() {
    }
    /**
     * Determine the root of a function in a interval of [a, b].
     * This function gives only one root in this interval, to determine all the roots in this interval use calculateAllRoots
     * @param a The first value of the interval
     * @param b The second value of the interval
     * @param f The function
     */
    Bisection.calculateRoot = function (a, b, f) {
        var fA = f(a);
        var mNew = a + b;
        var mOld = 2 * mNew;
        while (Math.abs(mNew - mOld) > Number.EPSILON) {
            mOld = mNew;
            mNew = (a + b) / 2;
            var fM = f(mNew);
            if (fM * fA <= 0) {
                b = mNew;
            }
            else {
                a = mNew;
                fA = fM;
            }
        }
        return mNew;
    };
    /**
     * Determine all intervals of x in the function f that have images f(x) with opposite signs in an interval [a, b].
     * The closer the step is to zero, the longer the calculation time will be but the more the result will be guaranteed.
     * @param a The first value of the interval
     * @param b The second value of the interval
     * @param step The step that determines the precision
     * @param f The function
     */
    Bisection.calculateIntervals = function (a, b, step, f) {
        // Limit the complexity
        if (step < 0.0001) {
            step = 0.0001;
        }
        /**
         * intervalsCoordinates gives a list of coordinates with a f(x) that is alternatively positive and negatives
         * so it means that between each x values there is a root
         * the while just under calculate for each x separated by a "little step" it's f(x) value.
         * And if f(x) has a different sign than f(x) of the previous x, then we add the coordinates in the list.
         *
         * intervalsCoordinates = [
         *      [  x                    |  f(x)                 ]
         *      -------------------------------------------------
         *      [  -100,                   8.198673333417451    ],
         *      [  -8.649999999999078,    -0.034172813218782294 ],
         *      [  -6.699999999999074,     0.11053469476879291  ],
         *      [  -2.7999999999990686,   -0.11960353477223878  ],
         *      [  0.05000000000093055,    0.04613301542538229  ],
         *      [  3.0500000000009297,    -0.14315074238394498  ],
         *      [  6.950000000000936,      0.08387074354830293  ],
         *      [  8.75000000000094,      -0.04835296932353672  ]
         * ]
         */
        var intervalsCoordinates = [
            [a, f(a)]
        ];
        var j = a + step;
        while (j < b) {
            var _a = intervalsCoordinates[intervalsCoordinates.length - 1], _ = _a[0], fi = _a[1];
            var fj = f(j);
            if (fi * fj < 0) {
                intervalsCoordinates.push([
                    j,
                    fj
                ]);
            }
            j += step;
        }
        /**
         * intervals merge the intervalsCoordinates's x values to create a list
         * of intervals that contains a root value, so now we juste have to call the method calculate(a, b, f)
         * to determine all the root values
         *
         * intervalsCoordinates = [                                       |         intervals = [
         *      [  x                    |  f(x)                      ]    |         [ a                  | b                   ]
         *      ------------------------------------------------------    |         --------------------------------------------
         *      [  ---> -100,                  8.198673333417451     ],   |
         *                                                                | -------> [ -100,                -8.649999999999078  ]
         *      [  ---> -8.649999999999078,    -0.034172813218782294 ],   |
         *                                                                | -------> [ -8.649999999999078,  -6.699999999999074  ]
         *      [  ----> -6.699999999999074,   0.11053469476879291   ],   |
         *                                                                | -------> [ -6.699999999999074,  -2.7999999999990686 ]
         *      [  ----> -2.7999999999990686,  -0.11960353477223878  ],   |
         *                                                                | -------> [ -2.7999999999990686, 0.05000000000093055 ]
         *      [  ----> 0.05000000000093055,  0.04613301542538229   ],   |
         *                                                                | -------> [ 0.05000000000093055, 3.0500000000009297  ]
         *      [  ----> 3.0500000000009297,   -0.14315074238394498  ],   |
         *                                                                | -------> [ 3.0500000000009297,  6.950000000000936   ]
         *      [  ----> 6.950000000000936,    0.08387074354830293   ],   |
         *                                                                | -------> [ 6.950000000000936,   8.75000000000094    ]
         *      [  ----> 8.75000000000094,     -0.04835296932353672  ]    |          ]
         * ]
         *
         * So intervals gives:
         * intervals = [
         *      [  a                     |   b                    ]
         *      ---------------------------------------------------
         *      [  -100,                     -8.649999999999078   ],
         *      [  -8.649999999999078,       -6.699999999999074   ],
         *      [  -6.699999999999074,       -2.7999999999990686  ],
         *      [  -2.7999999999990686,      0.05000000000093055  ],
         *      [  0.05000000000093055,      3.0500000000009297   ],
         *      [  3.0500000000009297,       6.950000000000936    ],
         *      [  6.950000000000936,        8.75000000000094     ]
         * ]
         */
        var intervals = intervalsCoordinates.reduce(function (prev, value) {
            var last = prev[prev.length - 1];
            if (last.length >= 2) {
                prev.push([last[1], value[0]]);
                prev.push([value[0]]);
            }
            else {
                last.push(value[0]);
            }
            return prev;
        }, [[]]);
        return intervals;
    };
    /**
     * Calculate all the roots of a function f, in the interval [a, b] with a specified step.
     * The closer the step is to zero, the longer the calculation time will be but the more the result will be guaranteed.
     * @param a The first value of the interval
     * @param b The second value of the interval
     * @param step The step that determines the precision
     * @param f The function
     */
    Bisection.calculateAllRoots = function (a, b, step, f) {
        var roots = [];
        var intervals = this.calculateIntervals(a, b, step, f);
        for (var _i = 0, intervals_1 = intervals; _i < intervals_1.length; _i++) {
            var _a = intervals_1[_i], a_1 = _a[0], b_1 = _a[1];
            var x = this.calculateRoot(a_1, b_1, f);
            var fx = this.round(f(x));
            if (fx === 0) {
                roots.push(this.round(x));
            }
        }
        return roots;
    };
    /**
     * Round the number to avoid values that are near 0 to be not equal to the exact zero.
     * @param x The value to round
     */
    Bisection.round = function (x) {
        return Math.round((x + Number.EPSILON) * 1000000000) / 1000000000;
    };
    return Bisection;
}());



/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/* harmony import */ var _classes_Bisection__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(936);
/**
 * Labo: 2 (Float to binary conversion)
 * Authors: Owen Gombas, David Darmanger, Julien Vaucher, Clément Petignat
 * Team: 2
 * School: HE-Arc
 * Date: 21 mars 2022
 * Course: Mathématiques spécifiques (Module 2234) - M. Stéphane Gobron
 */

var erEquationElement = document.getElementById("er-equation");
var erAElement = document.getElementById("er-a");
var erBElement = document.getElementById("er-b");
var erStepElement = document.getElementById("er-step");
var erResultElement = document.getElementById("er-result");
var erPlotElement = document.getElementById("er-plot");
function removeGraph() {
    erPlotElement.style.display = 'none';
}
function displayGraph(a, b, roots) {
    erPlotElement.style.display = 'block';
    var annotations = roots.map(function (x, index) { return ({
        x: x,
        text: "x".concat(index, " \u2248 ").concat(x)
    }); });
    var parameters = {
        target: '#er-plot',
        data: [{
                fn: erEquationElement.value.replace(/Math\./gi, "").replace(/\*\*/gi, "^")
            }],
        width: 800,
        height: 500,
        grid: false,
        yAxis: { domain: [-1, 1] },
        xAxis: { domain: [a, b] },
        annotations: annotations
    };
    // @ts-ignore
    functionPlot(parameters);
}
function onChangeEquation() {
    var result = "";
    if (erAElement.value === "" ||
        erBElement.value === "" ||
        erStepElement.value === "") {
        erResultElement.innerHTML = "<span class=\"color-grey\">Veuillez renseigner tous les champs</span>";
        removeGraph();
        return;
    }
    var erA = Number(erAElement.value);
    var erB = Number(erBElement.value);
    var erStep = Number(erStepElement.value);
    if (Number.isNaN(erA) || Number.isNaN(erB) || Number.isNaN(erStep)) {
        erResultElement.innerHTML = "<span class=\"color-red\">Les valeurs d'intervalle et de step doivent \u00EAtre des nombres</span>";
        removeGraph();
        return;
    }
    if (erStep <= 0) {
        erResultElement.innerHTML = "<span class=\"color-red\">Le step doit \u00EAtre plus grand que 0</span>";
        removeGraph();
        return;
    }
    if (erA >= erB) {
        erResultElement.innerHTML = "<span class=\"color-red\">La premi\u00E8re valeur de l'intervalle doit \u00EAtre plus grande que la deuxi\u00E8me</span>";
        removeGraph();
        return;
    }
    var erEquation = function (x) { return eval(erEquationElement.value); };
    var roots;
    try {
        roots = _classes_Bisection__WEBPACK_IMPORTED_MODULE_0__/* .Bisection.calculateAllRoots */ .e.calculateAllRoots(erA, erB, erStep, erEquation);
        result = roots
            .map(function (x, index) { return "<p class=\"mono\">x<sub class=\"mono\">".concat(index, "</sub> \u2248 ").concat(x, "</p>"); })
            .join("");
    }
    catch (err) {
        console.log(err);
        erResultElement.innerHTML = "<span class=\"color-red\">Votre \u00E9quation est invalide</span>";
        removeGraph();
        return;
    }
    displayGraph(erA, erB, roots);
    erResultElement.innerHTML = "\n  <div class=\"result-group color-green\">\n    <span class=\"color-grey\">\n      <span class=\"mono\">".concat(roots.length, "</span> z\u00E9ros trouv\u00E9es:\n    </span>\n    <details ").concat(roots.length > 20 ? "" : "open", ">\n      <summary>Afficher/masquer tous les z\u00E9ros</summary>\n      ").concat(result, "\n    </details>\n  </div>\n  ");
}
erAElement.addEventListener("change", onChangeEquation);
erBElement.addEventListener("keyup", onChangeEquation);
erEquationElement.addEventListener("change", onChangeEquation);
erEquationElement.addEventListener("keyup", onChangeEquation);
erStepElement.addEventListener("change", onChangeEquation);
erStepElement.addEventListener("keyup", onChangeEquation);
onChangeEquation();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0FBQztBQUN2RCxpQkFBaUIsQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztBQUMvRCxpQkFBaUIsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztBQUM5RCxhQUFhLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLGdCQUFnQixDQUFDLENBQUM7QUFDM0QsYUFBYSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO0FBRTFELGdCQUFnQixFQUFFLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9tYXRoX3NwZS8uL3NyYy9jbGFzc2VzL0Jpc2VjdGlvbi50cyIsIndlYnBhY2s6Ly9tYXRoX3NwZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9tYXRoX3NwZS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vbWF0aF9zcGUvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9tYXRoX3NwZS8uL3NyYy9BTjIwMjJfTGFibzJfRXEyLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogRGV0ZXJtaW5lIHRoZSByb290cyBvZiBmdW5jdGlvbnMgd2l0aCB0aGUgYmlzZWN0aW9uIG1ldGhvZFxuICovXG5leHBvcnQgY2xhc3MgQmlzZWN0aW9uIHtcbiAgICAvKipcbiAgICAgKiBEZXRlcm1pbmUgdGhlIHJvb3Qgb2YgYSBmdW5jdGlvbiBpbiBhIGludGVydmFsIG9mIFthLCBiXS5cbiAgICAgKiBUaGlzIGZ1bmN0aW9uIGdpdmVzIG9ubHkgb25lIHJvb3QgaW4gdGhpcyBpbnRlcnZhbCwgdG8gZGV0ZXJtaW5lIGFsbCB0aGUgcm9vdHMgaW4gdGhpcyBpbnRlcnZhbCB1c2UgY2FsY3VsYXRlQWxsUm9vdHNcbiAgICAgKiBAcGFyYW0gYSBUaGUgZmlyc3QgdmFsdWUgb2YgdGhlIGludGVydmFsXG4gICAgICogQHBhcmFtIGIgVGhlIHNlY29uZCB2YWx1ZSBvZiB0aGUgaW50ZXJ2YWxcbiAgICAgKiBAcGFyYW0gZiBUaGUgZnVuY3Rpb25cbiAgICAgKi9cbiAgICBzdGF0aWMgY2FsY3VsYXRlUm9vdChhOiBudW1iZXIsIGI6IG51bWJlciwgZjogKHg6IG51bWJlcikgPT4gbnVtYmVyKSB7XG4gICAgICAgIGxldCBmQSA9IGYoYSk7XG4gICAgICAgIGxldCBtTmV3ID0gYSArIGI7XG4gICAgICAgIGxldCBtT2xkID0gMiAqIG1OZXc7XG5cbiAgICAgICAgd2hpbGUgKE1hdGguYWJzKG1OZXcgLSBtT2xkKSA+IE51bWJlci5FUFNJTE9OKSB7XG4gICAgICAgICAgICBtT2xkID0gbU5ldztcbiAgICAgICAgICAgIG1OZXcgPSAoYSArIGIpIC8gMjtcbiAgICAgICAgICAgIGNvbnN0IGZNID0gZihtTmV3KTtcblxuICAgICAgICAgICAgaWYgKGZNICogZkEgPD0gMCkge1xuICAgICAgICAgICAgICAgIGIgPSBtTmV3O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBhID0gbU5ldztcbiAgICAgICAgICAgICAgICBmQSA9IGZNO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG1OZXc7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRGV0ZXJtaW5lIGFsbCBpbnRlcnZhbHMgb2YgeCBpbiB0aGUgZnVuY3Rpb24gZiB0aGF0IGhhdmUgaW1hZ2VzIGYoeCkgd2l0aCBvcHBvc2l0ZSBzaWducyBpbiBhbiBpbnRlcnZhbCBbYSwgYl0uXG4gICAgICogVGhlIGNsb3NlciB0aGUgc3RlcCBpcyB0byB6ZXJvLCB0aGUgbG9uZ2VyIHRoZSBjYWxjdWxhdGlvbiB0aW1lIHdpbGwgYmUgYnV0IHRoZSBtb3JlIHRoZSByZXN1bHQgd2lsbCBiZSBndWFyYW50ZWVkLlxuICAgICAqIEBwYXJhbSBhIFRoZSBmaXJzdCB2YWx1ZSBvZiB0aGUgaW50ZXJ2YWxcbiAgICAgKiBAcGFyYW0gYiBUaGUgc2Vjb25kIHZhbHVlIG9mIHRoZSBpbnRlcnZhbFxuICAgICAqIEBwYXJhbSBzdGVwIFRoZSBzdGVwIHRoYXQgZGV0ZXJtaW5lcyB0aGUgcHJlY2lzaW9uXG4gICAgICogQHBhcmFtIGYgVGhlIGZ1bmN0aW9uXG4gICAgICovXG4gICAgc3RhdGljIGNhbGN1bGF0ZUludGVydmFscyhhOiBudW1iZXIsIGI6IG51bWJlciwgc3RlcDogbnVtYmVyLCBmOiAoeDogbnVtYmVyKSA9PiBudW1iZXIpOiBudW1iZXJbXVtdIHtcbiAgICAgICAgLy8gTGltaXQgdGhlIGNvbXBsZXhpdHlcbiAgICAgICAgaWYgKHN0ZXAgPCAwLjAwMDEpIHtcbiAgICAgICAgICAgIHN0ZXAgPSAwLjAwMDE7XG4gICAgICAgIH1cblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBpbnRlcnZhbHNDb29yZGluYXRlcyBnaXZlcyBhIGxpc3Qgb2YgY29vcmRpbmF0ZXMgd2l0aCBhIGYoeCkgdGhhdCBpcyBhbHRlcm5hdGl2ZWx5IHBvc2l0aXZlIGFuZCBuZWdhdGl2ZXNcbiAgICAgICAgICogc28gaXQgbWVhbnMgdGhhdCBiZXR3ZWVuIGVhY2ggeCB2YWx1ZXMgdGhlcmUgaXMgYSByb290XG4gICAgICAgICAqIHRoZSB3aGlsZSBqdXN0IHVuZGVyIGNhbGN1bGF0ZSBmb3IgZWFjaCB4IHNlcGFyYXRlZCBieSBhIFwibGl0dGxlIHN0ZXBcIiBpdCdzIGYoeCkgdmFsdWUuXG4gICAgICAgICAqIEFuZCBpZiBmKHgpIGhhcyBhIGRpZmZlcmVudCBzaWduIHRoYW4gZih4KSBvZiB0aGUgcHJldmlvdXMgeCwgdGhlbiB3ZSBhZGQgdGhlIGNvb3JkaW5hdGVzIGluIHRoZSBsaXN0LlxuICAgICAgICAgKlxuICAgICAgICAgKiBpbnRlcnZhbHNDb29yZGluYXRlcyA9IFtcbiAgICAgICAgICogICAgICBbICB4ICAgICAgICAgICAgICAgICAgICB8ICBmKHgpICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAqICAgICAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAgICAgKiAgICAgIFsgIC0xMDAsICAgICAgICAgICAgICAgICAgIDguMTk4NjczMzMzNDE3NDUxICAgIF0sXG4gICAgICAgICAqICAgICAgWyAgLTguNjQ5OTk5OTk5OTk5MDc4LCAgICAtMC4wMzQxNzI4MTMyMTg3ODIyOTQgXSxcbiAgICAgICAgICogICAgICBbICAtNi42OTk5OTk5OTk5OTkwNzQsICAgICAwLjExMDUzNDY5NDc2ODc5MjkxICBdLFxuICAgICAgICAgKiAgICAgIFsgIC0yLjc5OTk5OTk5OTk5OTA2ODYsICAgLTAuMTE5NjAzNTM0NzcyMjM4NzggIF0sXG4gICAgICAgICAqICAgICAgWyAgMC4wNTAwMDAwMDAwMDA5MzA1NSwgICAgMC4wNDYxMzMwMTU0MjUzODIyOSAgXSxcbiAgICAgICAgICogICAgICBbICAzLjA1MDAwMDAwMDAwMDkyOTcsICAgIC0wLjE0MzE1MDc0MjM4Mzk0NDk4ICBdLFxuICAgICAgICAgKiAgICAgIFsgIDYuOTUwMDAwMDAwMDAwOTM2LCAgICAgIDAuMDgzODcwNzQzNTQ4MzAyOTMgIF0sXG4gICAgICAgICAqICAgICAgWyAgOC43NTAwMDAwMDAwMDA5NCwgICAgICAtMC4wNDgzNTI5NjkzMjM1MzY3MiAgXVxuICAgICAgICAgKiBdXG4gICAgICAgICAqL1xuICAgICAgICBjb25zdCBpbnRlcnZhbHNDb29yZGluYXRlcyA9IFtcbiAgICAgICAgICAgIFthLCBmKGEpXVxuICAgICAgICBdO1xuICAgICAgICBsZXQgaiA9IGEgKyBzdGVwO1xuXG4gICAgICAgIHdoaWxlIChqIDwgYikge1xuICAgICAgICAgICAgY29uc3QgW18sIGZpXSA9IGludGVydmFsc0Nvb3JkaW5hdGVzW2ludGVydmFsc0Nvb3JkaW5hdGVzLmxlbmd0aCAtIDFdO1xuICAgICAgICAgICAgY29uc3QgZmogPSBmKGopO1xuXG4gICAgICAgICAgICBpZiAoZmkgKiBmaiA8IDApIHtcbiAgICAgICAgICAgICAgICBpbnRlcnZhbHNDb29yZGluYXRlcy5wdXNoKFtcbiAgICAgICAgICAgICAgICAgICAgaixcbiAgICAgICAgICAgICAgICAgICAgZmpcbiAgICAgICAgICAgICAgICBdKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaiArPSBzdGVwO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIGludGVydmFscyBtZXJnZSB0aGUgaW50ZXJ2YWxzQ29vcmRpbmF0ZXMncyB4IHZhbHVlcyB0byBjcmVhdGUgYSBsaXN0XG4gICAgICAgICAqIG9mIGludGVydmFscyB0aGF0IGNvbnRhaW5zIGEgcm9vdCB2YWx1ZSwgc28gbm93IHdlIGp1c3RlIGhhdmUgdG8gY2FsbCB0aGUgbWV0aG9kIGNhbGN1bGF0ZShhLCBiLCBmKVxuICAgICAgICAgKiB0byBkZXRlcm1pbmUgYWxsIHRoZSByb290IHZhbHVlc1xuICAgICAgICAgKlxuICAgICAgICAgKiBpbnRlcnZhbHNDb29yZGluYXRlcyA9IFsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8ICAgICAgICAgaW50ZXJ2YWxzID0gW1xuICAgICAgICAgKiAgICAgIFsgIHggICAgICAgICAgICAgICAgICAgIHwgIGYoeCkgICAgICAgICAgICAgICAgICAgICAgXSAgICB8ICAgICAgICAgWyBhICAgICAgICAgICAgICAgICAgfCBiICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICogICAgICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gICAgfCAgICAgICAgIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICAgICAqICAgICAgWyAgLS0tPiAtMTAwLCAgICAgICAgICAgICAgICAgIDguMTk4NjczMzMzNDE3NDUxICAgICBdLCAgIHxcbiAgICAgICAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCAtLS0tLS0tPiBbIC0xMDAsICAgICAgICAgICAgICAgIC04LjY0OTk5OTk5OTk5OTA3OCAgXVxuICAgICAgICAgKiAgICAgIFsgIC0tLT4gLTguNjQ5OTk5OTk5OTk5MDc4LCAgICAtMC4wMzQxNzI4MTMyMTg3ODIyOTQgXSwgICB8XG4gICAgICAgICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgLS0tLS0tLT4gWyAtOC42NDk5OTk5OTk5OTkwNzgsICAtNi42OTk5OTk5OTk5OTkwNzQgIF1cbiAgICAgICAgICogICAgICBbICAtLS0tPiAtNi42OTk5OTk5OTk5OTkwNzQsICAgMC4xMTA1MzQ2OTQ3Njg3OTI5MSAgIF0sICAgfFxuICAgICAgICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IC0tLS0tLS0+IFsgLTYuNjk5OTk5OTk5OTk5MDc0LCAgLTIuNzk5OTk5OTk5OTk5MDY4NiBdXG4gICAgICAgICAqICAgICAgWyAgLS0tLT4gLTIuNzk5OTk5OTk5OTk5MDY4NiwgIC0wLjExOTYwMzUzNDc3MjIzODc4ICBdLCAgIHxcbiAgICAgICAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCAtLS0tLS0tPiBbIC0yLjc5OTk5OTk5OTk5OTA2ODYsIDAuMDUwMDAwMDAwMDAwOTMwNTUgXVxuICAgICAgICAgKiAgICAgIFsgIC0tLS0+IDAuMDUwMDAwMDAwMDAwOTMwNTUsICAwLjA0NjEzMzAxNTQyNTM4MjI5ICAgXSwgICB8XG4gICAgICAgICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgLS0tLS0tLT4gWyAwLjA1MDAwMDAwMDAwMDkzMDU1LCAzLjA1MDAwMDAwMDAwMDkyOTcgIF1cbiAgICAgICAgICogICAgICBbICAtLS0tPiAzLjA1MDAwMDAwMDAwMDkyOTcsICAgLTAuMTQzMTUwNzQyMzgzOTQ0OTggIF0sICAgfFxuICAgICAgICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IC0tLS0tLS0+IFsgMy4wNTAwMDAwMDAwMDA5Mjk3LCAgNi45NTAwMDAwMDAwMDA5MzYgICBdXG4gICAgICAgICAqICAgICAgWyAgLS0tLT4gNi45NTAwMDAwMDAwMDA5MzYsICAgIDAuMDgzODcwNzQzNTQ4MzAyOTMgICBdLCAgIHxcbiAgICAgICAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCAtLS0tLS0tPiBbIDYuOTUwMDAwMDAwMDAwOTM2LCAgIDguNzUwMDAwMDAwMDAwOTQgICAgXVxuICAgICAgICAgKiAgICAgIFsgIC0tLS0+IDguNzUwMDAwMDAwMDAwOTQsICAgICAtMC4wNDgzNTI5NjkzMjM1MzY3MiAgXSAgICB8ICAgICAgICAgIF1cbiAgICAgICAgICogXVxuICAgICAgICAgKlxuICAgICAgICAgKiBTbyBpbnRlcnZhbHMgZ2l2ZXM6XG4gICAgICAgICAqIGludGVydmFscyA9IFtcbiAgICAgICAgICogICAgICBbICBhICAgICAgICAgICAgICAgICAgICAgfCAgIGIgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICogICAgICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgICAgICogICAgICBbICAtMTAwLCAgICAgICAgICAgICAgICAgICAgIC04LjY0OTk5OTk5OTk5OTA3OCAgIF0sXG4gICAgICAgICAqICAgICAgWyAgLTguNjQ5OTk5OTk5OTk5MDc4LCAgICAgICAtNi42OTk5OTk5OTk5OTkwNzQgICBdLFxuICAgICAgICAgKiAgICAgIFsgIC02LjY5OTk5OTk5OTk5OTA3NCwgICAgICAgLTIuNzk5OTk5OTk5OTk5MDY4NiAgXSxcbiAgICAgICAgICogICAgICBbICAtMi43OTk5OTk5OTk5OTkwNjg2LCAgICAgIDAuMDUwMDAwMDAwMDAwOTMwNTUgIF0sXG4gICAgICAgICAqICAgICAgWyAgMC4wNTAwMDAwMDAwMDA5MzA1NSwgICAgICAzLjA1MDAwMDAwMDAwMDkyOTcgICBdLFxuICAgICAgICAgKiAgICAgIFsgIDMuMDUwMDAwMDAwMDAwOTI5NywgICAgICAgNi45NTAwMDAwMDAwMDA5MzYgICAgXSxcbiAgICAgICAgICogICAgICBbICA2Ljk1MDAwMDAwMDAwMDkzNiwgICAgICAgIDguNzUwMDAwMDAwMDAwOTQgICAgIF1cbiAgICAgICAgICogXVxuICAgICAgICAgKi9cbiAgICAgICAgY29uc3QgaW50ZXJ2YWxzID0gaW50ZXJ2YWxzQ29vcmRpbmF0ZXMucmVkdWNlKChwcmV2LCB2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgbGFzdCA9IHByZXZbcHJldi5sZW5ndGggLSAxXTtcbiAgICAgICAgICAgIGlmIChsYXN0Lmxlbmd0aCA+PSAyKSB7XG4gICAgICAgICAgICAgICAgcHJldi5wdXNoKFtsYXN0WzFdLCB2YWx1ZVswXV0pO1xuICAgICAgICAgICAgICAgIHByZXYucHVzaChbdmFsdWVbMF1dKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbGFzdC5wdXNoKHZhbHVlWzBdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBwcmV2O1xuICAgICAgICB9LCBbW11dKTtcblxuICAgICAgICByZXR1cm4gaW50ZXJ2YWxzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENhbGN1bGF0ZSBhbGwgdGhlIHJvb3RzIG9mIGEgZnVuY3Rpb24gZiwgaW4gdGhlIGludGVydmFsIFthLCBiXSB3aXRoIGEgc3BlY2lmaWVkIHN0ZXAuXG4gICAgICogVGhlIGNsb3NlciB0aGUgc3RlcCBpcyB0byB6ZXJvLCB0aGUgbG9uZ2VyIHRoZSBjYWxjdWxhdGlvbiB0aW1lIHdpbGwgYmUgYnV0IHRoZSBtb3JlIHRoZSByZXN1bHQgd2lsbCBiZSBndWFyYW50ZWVkLlxuICAgICAqIEBwYXJhbSBhIFRoZSBmaXJzdCB2YWx1ZSBvZiB0aGUgaW50ZXJ2YWxcbiAgICAgKiBAcGFyYW0gYiBUaGUgc2Vjb25kIHZhbHVlIG9mIHRoZSBpbnRlcnZhbFxuICAgICAqIEBwYXJhbSBzdGVwIFRoZSBzdGVwIHRoYXQgZGV0ZXJtaW5lcyB0aGUgcHJlY2lzaW9uXG4gICAgICogQHBhcmFtIGYgVGhlIGZ1bmN0aW9uXG4gICAgICovXG4gICAgc3RhdGljIGNhbGN1bGF0ZUFsbFJvb3RzKGE6IG51bWJlciwgYjogbnVtYmVyLCBzdGVwOiBudW1iZXIsIGY6ICh4OiBudW1iZXIpID0+IG51bWJlcikge1xuICAgICAgICBjb25zdCByb290cyA9IFtdO1xuICAgICAgICBjb25zdCBpbnRlcnZhbHMgPSB0aGlzLmNhbGN1bGF0ZUludGVydmFscyhhLCBiLCBzdGVwLCBmKTtcblxuICAgICAgICBmb3IgKGNvbnN0IFthLCBiXSBvZiBpbnRlcnZhbHMpIHtcbiAgICAgICAgICAgIGNvbnN0IHggPSB0aGlzLmNhbGN1bGF0ZVJvb3QoYSwgYiwgZik7XG4gICAgICAgICAgICBjb25zdCBmeCA9IHRoaXMucm91bmQoZih4KSk7XG5cbiAgICAgICAgICAgIGlmIChmeCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHJvb3RzLnB1c2godGhpcy5yb3VuZCh4KSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcm9vdHM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUm91bmQgdGhlIG51bWJlciB0byBhdm9pZCB2YWx1ZXMgdGhhdCBhcmUgbmVhciAwIHRvIGJlIG5vdCBlcXVhbCB0byB0aGUgZXhhY3QgemVyby5cbiAgICAgKiBAcGFyYW0geCBUaGUgdmFsdWUgdG8gcm91bmRcbiAgICAgKi9cbiAgICBzdGF0aWMgcm91bmQoeDogbnVtYmVyKSB7XG4gICAgICAgIHJldHVybiBNYXRoLnJvdW5kKCh4ICsgTnVtYmVyLkVQU0lMT04pICogMTAwMDAwMDAwMCkgLyAxMDAwMDAwMDAwO1xuICAgIH1cbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLyoqXG4gKiBMYWJvOiAyIChGbG9hdCB0byBiaW5hcnkgY29udmVyc2lvbilcbiAqIEF1dGhvcnM6IE93ZW4gR29tYmFzLCBEYXZpZCBEYXJtYW5nZXIsIEp1bGllbiBWYXVjaGVyLCBDbMOpbWVudCBQZXRpZ25hdFxuICogVGVhbTogMlxuICogU2Nob29sOiBIRS1BcmNcbiAqIERhdGU6IDIxIG1hcnMgMjAyMlxuICogQ291cnNlOiBNYXRow6ltYXRpcXVlcyBzcMOpY2lmaXF1ZXMgKE1vZHVsZSAyMjM0KSAtIE0uIFN0w6lwaGFuZSBHb2Jyb25cbiAqL1xuaW1wb3J0IHsgQmlzZWN0aW9uIH0gZnJvbSBcIi4vY2xhc3Nlcy9CaXNlY3Rpb25cIjtcblxuY29uc3QgZXJFcXVhdGlvbkVsZW1lbnQgPSA8SFRNTElucHV0RWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImVyLWVxdWF0aW9uXCIpO1xuY29uc3QgZXJBRWxlbWVudCA9IDxIVE1MSW5wdXRFbGVtZW50PmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZXItYVwiKTtcbmNvbnN0IGVyQkVsZW1lbnQgPSA8SFRNTElucHV0RWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImVyLWJcIik7XG5jb25zdCBlclN0ZXBFbGVtZW50ID0gPEhUTUxJbnB1dEVsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJlci1zdGVwXCIpO1xuY29uc3QgZXJSZXN1bHRFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJlci1yZXN1bHRcIik7XG5jb25zdCBlclBsb3RFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJlci1wbG90XCIpO1xuXG5mdW5jdGlvbiByZW1vdmVHcmFwaCgpIHtcbiAgZXJQbG90RWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xufVxuXG5mdW5jdGlvbiBkaXNwbGF5R3JhcGgoYTogbnVtYmVyLCBiOiBudW1iZXIsIHJvb3RzOiBudW1iZXJbXSkge1xuICBlclBsb3RFbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuXG4gIGNvbnN0IGFubm90YXRpb25zID0gcm9vdHMubWFwKCh4LCBpbmRleCkgPT4gKHtcbiAgICB4LFxuICAgIHRleHQ6IGB4JHtpbmRleH0g4omIICR7eH1gXG4gIH0pKTtcblxuICBjb25zdCBwYXJhbWV0ZXJzID0ge1xuICAgIHRhcmdldDogJyNlci1wbG90JyxcbiAgICBkYXRhOiBbe1xuICAgICAgZm46IGVyRXF1YXRpb25FbGVtZW50LnZhbHVlLnJlcGxhY2UoL01hdGhcXC4vZ2ksIFwiXCIpLnJlcGxhY2UoL1xcKlxcKi9naSwgXCJeXCIpXG4gICAgfV0sXG4gICAgd2lkdGg6IDgwMCxcbiAgICBoZWlnaHQ6IDUwMCxcbiAgICBncmlkOiBmYWxzZSxcbiAgICB5QXhpczogeyBkb21haW46IFstMSwgMV0gfSxcbiAgICB4QXhpczogeyBkb21haW46IFthLCBiXSB9LFxuICAgIGFubm90YXRpb25zXG4gIH07XG5cbiAgLy8gQHRzLWlnbm9yZVxuICBmdW5jdGlvblBsb3QocGFyYW1ldGVycyk7XG59XG5cbmZ1bmN0aW9uIG9uQ2hhbmdlRXF1YXRpb24oKSB7XG4gIGxldCByZXN1bHQgPSBcIlwiO1xuXG4gIGlmIChcbiAgICBlckFFbGVtZW50LnZhbHVlID09PSBcIlwiIHx8XG4gICAgZXJCRWxlbWVudC52YWx1ZSA9PT0gXCJcIiB8fFxuICAgIGVyU3RlcEVsZW1lbnQudmFsdWUgPT09IFwiXCJcbiAgKSB7XG4gICAgZXJSZXN1bHRFbGVtZW50LmlubmVySFRNTCA9IGA8c3BhbiBjbGFzcz1cImNvbG9yLWdyZXlcIj5WZXVpbGxleiByZW5zZWlnbmVyIHRvdXMgbGVzIGNoYW1wczwvc3Bhbj5gO1xuICAgIHJlbW92ZUdyYXBoKCk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY29uc3QgZXJBID0gTnVtYmVyKGVyQUVsZW1lbnQudmFsdWUpO1xuICBjb25zdCBlckIgPSBOdW1iZXIoZXJCRWxlbWVudC52YWx1ZSk7XG4gIGNvbnN0IGVyU3RlcCA9IE51bWJlcihlclN0ZXBFbGVtZW50LnZhbHVlKTtcblxuICBpZiAoTnVtYmVyLmlzTmFOKGVyQSkgfHwgTnVtYmVyLmlzTmFOKGVyQikgfHwgTnVtYmVyLmlzTmFOKGVyU3RlcCkpIHtcbiAgICBlclJlc3VsdEVsZW1lbnQuaW5uZXJIVE1MID0gYDxzcGFuIGNsYXNzPVwiY29sb3ItcmVkXCI+TGVzIHZhbGV1cnMgZCdpbnRlcnZhbGxlIGV0IGRlIHN0ZXAgZG9pdmVudCDDqnRyZSBkZXMgbm9tYnJlczwvc3Bhbj5gO1xuICAgIHJlbW92ZUdyYXBoKCk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgaWYgKGVyU3RlcCA8PSAwKSB7XG4gICAgZXJSZXN1bHRFbGVtZW50LmlubmVySFRNTCA9IGA8c3BhbiBjbGFzcz1cImNvbG9yLXJlZFwiPkxlIHN0ZXAgZG9pdCDDqnRyZSBwbHVzIGdyYW5kIHF1ZSAwPC9zcGFuPmA7XG4gICAgcmVtb3ZlR3JhcGgoKTtcbiAgICByZXR1cm47XG4gIH1cblxuICBpZiAoZXJBID49IGVyQikge1xuICAgIGVyUmVzdWx0RWxlbWVudC5pbm5lckhUTUwgPSBgPHNwYW4gY2xhc3M9XCJjb2xvci1yZWRcIj5MYSBwcmVtacOocmUgdmFsZXVyIGRlIGwnaW50ZXJ2YWxsZSBkb2l0IMOqdHJlIHBsdXMgZ3JhbmRlIHF1ZSBsYSBkZXV4acOobWU8L3NwYW4+YDtcbiAgICByZW1vdmVHcmFwaCgpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGNvbnN0IGVyRXF1YXRpb24gPSAoeDogbnVtYmVyKSA9PiBldmFsKGVyRXF1YXRpb25FbGVtZW50LnZhbHVlKTtcbiAgbGV0IHJvb3RzOiBudW1iZXJbXTtcblxuICB0cnkge1xuICAgIHJvb3RzID0gQmlzZWN0aW9uLmNhbGN1bGF0ZUFsbFJvb3RzKGVyQSwgZXJCLCBlclN0ZXAsIGVyRXF1YXRpb24pO1xuICAgIHJlc3VsdCA9IHJvb3RzXG4gICAgICAgIC5tYXAoXG4gICAgICAgICAgICAoeCwgaW5kZXgpID0+IGA8cCBjbGFzcz1cIm1vbm9cIj54PHN1YiBjbGFzcz1cIm1vbm9cIj4ke2luZGV4fTwvc3ViPiDiiYggJHt4fTwvcD5gXG4gICAgICAgIClcbiAgICAgICAgLmpvaW4oXCJcIik7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgZXJSZXN1bHRFbGVtZW50LmlubmVySFRNTCA9IGA8c3BhbiBjbGFzcz1cImNvbG9yLXJlZFwiPlZvdHJlIMOpcXVhdGlvbiBlc3QgaW52YWxpZGU8L3NwYW4+YDtcbiAgICByZW1vdmVHcmFwaCgpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGRpc3BsYXlHcmFwaChlckEsIGVyQiwgcm9vdHMpO1xuXG4gIGVyUmVzdWx0RWxlbWVudC5pbm5lckhUTUwgPSBgXG4gIDxkaXYgY2xhc3M9XCJyZXN1bHQtZ3JvdXAgY29sb3ItZ3JlZW5cIj5cbiAgICA8c3BhbiBjbGFzcz1cImNvbG9yLWdyZXlcIj5cbiAgICAgIDxzcGFuIGNsYXNzPVwibW9ub1wiPiR7cm9vdHMubGVuZ3RofTwvc3Bhbj4gesOpcm9zIHRyb3V2w6llczpcbiAgICA8L3NwYW4+XG4gICAgPGRldGFpbHMgJHtyb290cy5sZW5ndGggPiAyMCA/IFwiXCIgOiBcIm9wZW5cIn0+XG4gICAgICA8c3VtbWFyeT5BZmZpY2hlci9tYXNxdWVyIHRvdXMgbGVzIHrDqXJvczwvc3VtbWFyeT5cbiAgICAgICR7cmVzdWx0fVxuICAgIDwvZGV0YWlscz5cbiAgPC9kaXY+XG4gIGA7XG59XG5cbmVyQUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCBvbkNoYW5nZUVxdWF0aW9uKTtcbmVyQkVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImtleXVwXCIsIG9uQ2hhbmdlRXF1YXRpb24pO1xuZXJFcXVhdGlvbkVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCBvbkNoYW5nZUVxdWF0aW9uKTtcbmVyRXF1YXRpb25FbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXl1cFwiLCBvbkNoYW5nZUVxdWF0aW9uKTtcbmVyU3RlcEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCBvbkNoYW5nZUVxdWF0aW9uKTtcbmVyU3RlcEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImtleXVwXCIsIG9uQ2hhbmdlRXF1YXRpb24pO1xuXG5vbkNoYW5nZUVxdWF0aW9uKCk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=
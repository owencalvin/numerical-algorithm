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
        var error = Math.abs(mNew - mOld);
        while (error > Number.EPSILON) {
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
            error = Math.abs(mNew - mOld);
        }
        return [mNew, error];
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
            var _b = this.calculateRoot(a_1, b_1, f), x = _b[0], error = _b[1];
            if (Math.abs(f(x)) <= Number.EPSILON * 1000) {
                roots.push([x, error]);
            }
        }
        return roots;
    };
    /**
     * Round the number to avoid values that are "near" 0 to be not equal to the exact zero.
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
    var annotations = roots.map(function (_a, index) {
        var x = _a[0], fx = _a[1];
        return ({
            x: x,
            text: "x".concat(index, " \u2248 ").concat(x)
        });
    });
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
            .map(function (_a, index) {
            var x = _a[0], error = _a[1];
            return "<p class=\"mono\">x<sub class=\"mono\">".concat(index, "</sub> \u2248 ").concat(x, " \u00B1 ").concat(error, "</p>");
        })
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxxRkFFdEMsTUFBTSxtQ0FHWCxDQUFDO0FBQ0osQ0FBQztBQUVELFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztBQUN4RCxVQUFVLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLGdCQUFnQixDQUFDLENBQUM7QUFDdkQsaUJBQWlCLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLGdCQUFnQixDQUFDLENBQUM7QUFDL0QsaUJBQWlCLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLGdCQUFnQixDQUFDLENBQUM7QUFDOUQsYUFBYSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO0FBQzNELGFBQWEsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztBQUUxRCxnQkFBZ0IsRUFBRSxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbWF0aF9zcGUvLi9zcmMvY2xhc3Nlcy9CaXNlY3Rpb24udHMiLCJ3ZWJwYWNrOi8vbWF0aF9zcGUvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vbWF0aF9zcGUvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL21hdGhfc3BlL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vbWF0aF9zcGUvLi9zcmMvQU4yMDIyX0xhYm8yX0VxMi50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIERldGVybWluZSB0aGUgcm9vdHMgb2YgZnVuY3Rpb25zIHdpdGggdGhlIGJpc2VjdGlvbiBtZXRob2RcbiAqL1xuZXhwb3J0IGNsYXNzIEJpc2VjdGlvbiB7XG4gICAgLyoqXG4gICAgICogRGV0ZXJtaW5lIHRoZSByb290IG9mIGEgZnVuY3Rpb24gaW4gYSBpbnRlcnZhbCBvZiBbYSwgYl0uXG4gICAgICogVGhpcyBmdW5jdGlvbiBnaXZlcyBvbmx5IG9uZSByb290IGluIHRoaXMgaW50ZXJ2YWwsIHRvIGRldGVybWluZSBhbGwgdGhlIHJvb3RzIGluIHRoaXMgaW50ZXJ2YWwgdXNlIGNhbGN1bGF0ZUFsbFJvb3RzXG4gICAgICogQHBhcmFtIGEgVGhlIGZpcnN0IHZhbHVlIG9mIHRoZSBpbnRlcnZhbFxuICAgICAqIEBwYXJhbSBiIFRoZSBzZWNvbmQgdmFsdWUgb2YgdGhlIGludGVydmFsXG4gICAgICogQHBhcmFtIGYgVGhlIGZ1bmN0aW9uXG4gICAgICovXG4gICAgc3RhdGljIGNhbGN1bGF0ZVJvb3QoYTogbnVtYmVyLCBiOiBudW1iZXIsIGY6ICh4OiBudW1iZXIpID0+IG51bWJlcikge1xuICAgICAgICBsZXQgZkEgPSBmKGEpO1xuICAgICAgICBsZXQgbU5ldyA9IGEgKyBiO1xuICAgICAgICBsZXQgbU9sZCA9IDIgKiBtTmV3O1xuICAgICAgICBsZXQgZXJyb3IgPSBNYXRoLmFicyhtTmV3IC0gbU9sZCk7XG5cbiAgICAgICAgd2hpbGUgKGVycm9yID4gTnVtYmVyLkVQU0lMT04pIHtcbiAgICAgICAgICAgIG1PbGQgPSBtTmV3O1xuICAgICAgICAgICAgbU5ldyA9IChhICsgYikgLyAyO1xuICAgICAgICAgICAgY29uc3QgZk0gPSBmKG1OZXcpO1xuXG4gICAgICAgICAgICBpZiAoZk0gKiBmQSA8PSAwKSB7XG4gICAgICAgICAgICAgICAgYiA9IG1OZXc7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGEgPSBtTmV3O1xuICAgICAgICAgICAgICAgIGZBID0gZk07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGVycm9yID0gTWF0aC5hYnMobU5ldyAtIG1PbGQpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIFttTmV3LCBlcnJvcl07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRGV0ZXJtaW5lIGFsbCBpbnRlcnZhbHMgb2YgeCBpbiB0aGUgZnVuY3Rpb24gZiB0aGF0IGhhdmUgaW1hZ2VzIGYoeCkgd2l0aCBvcHBvc2l0ZSBzaWducyBpbiBhbiBpbnRlcnZhbCBbYSwgYl0uXG4gICAgICogVGhlIGNsb3NlciB0aGUgc3RlcCBpcyB0byB6ZXJvLCB0aGUgbG9uZ2VyIHRoZSBjYWxjdWxhdGlvbiB0aW1lIHdpbGwgYmUgYnV0IHRoZSBtb3JlIHRoZSByZXN1bHQgd2lsbCBiZSBndWFyYW50ZWVkLlxuICAgICAqIEBwYXJhbSBhIFRoZSBmaXJzdCB2YWx1ZSBvZiB0aGUgaW50ZXJ2YWxcbiAgICAgKiBAcGFyYW0gYiBUaGUgc2Vjb25kIHZhbHVlIG9mIHRoZSBpbnRlcnZhbFxuICAgICAqIEBwYXJhbSBzdGVwIFRoZSBzdGVwIHRoYXQgZGV0ZXJtaW5lcyB0aGUgcHJlY2lzaW9uXG4gICAgICogQHBhcmFtIGYgVGhlIGZ1bmN0aW9uXG4gICAgICovXG4gICAgc3RhdGljIGNhbGN1bGF0ZUludGVydmFscyhhOiBudW1iZXIsIGI6IG51bWJlciwgc3RlcDogbnVtYmVyLCBmOiAoeDogbnVtYmVyKSA9PiBudW1iZXIpOiBudW1iZXJbXVtdIHtcbiAgICAgICAgLy8gTGltaXQgdGhlIGNvbXBsZXhpdHlcbiAgICAgICAgaWYgKHN0ZXAgPCAwLjAwMDEpIHtcbiAgICAgICAgICAgIHN0ZXAgPSAwLjAwMDE7XG4gICAgICAgIH1cblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBpbnRlcnZhbHNDb29yZGluYXRlcyBnaXZlcyBhIGxpc3Qgb2YgY29vcmRpbmF0ZXMgd2l0aCBhIGYoeCkgdGhhdCBpcyBhbHRlcm5hdGl2ZWx5IHBvc2l0aXZlIGFuZCBuZWdhdGl2ZXNcbiAgICAgICAgICogc28gaXQgbWVhbnMgdGhhdCBiZXR3ZWVuIGVhY2ggeCB2YWx1ZXMgdGhlcmUgaXMgYSByb290XG4gICAgICAgICAqIHRoZSB3aGlsZSBqdXN0IHVuZGVyIGNhbGN1bGF0ZSBmb3IgZWFjaCB4IHNlcGFyYXRlZCBieSBhIFwibGl0dGxlIHN0ZXBcIiBpdCdzIGYoeCkgdmFsdWUuXG4gICAgICAgICAqIEFuZCBpZiBmKHgpIGhhcyBhIGRpZmZlcmVudCBzaWduIHRoYW4gZih4KSBvZiB0aGUgcHJldmlvdXMgeCwgdGhlbiB3ZSBhZGQgdGhlIGNvb3JkaW5hdGVzIGluIHRoZSBsaXN0LlxuICAgICAgICAgKlxuICAgICAgICAgKiBpbnRlcnZhbHNDb29yZGluYXRlcyA9IFtcbiAgICAgICAgICogICAgICBbICB4ICAgICAgICAgICAgICAgICAgICB8ICBmKHgpICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAqICAgICAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAgICAgKiAgICAgIFsgIC0xMDAsICAgICAgICAgICAgICAgICAgIDguMTk4NjczMzMzNDE3NDUxICAgIF0sXG4gICAgICAgICAqICAgICAgWyAgLTguNjQ5OTk5OTk5OTk5MDc4LCAgICAtMC4wMzQxNzI4MTMyMTg3ODIyOTQgXSxcbiAgICAgICAgICogICAgICBbICAtNi42OTk5OTk5OTk5OTkwNzQsICAgICAwLjExMDUzNDY5NDc2ODc5MjkxICBdLFxuICAgICAgICAgKiAgICAgIFsgIC0yLjc5OTk5OTk5OTk5OTA2ODYsICAgLTAuMTE5NjAzNTM0NzcyMjM4NzggIF0sXG4gICAgICAgICAqICAgICAgWyAgMC4wNTAwMDAwMDAwMDA5MzA1NSwgICAgMC4wNDYxMzMwMTU0MjUzODIyOSAgXSxcbiAgICAgICAgICogICAgICBbICAzLjA1MDAwMDAwMDAwMDkyOTcsICAgIC0wLjE0MzE1MDc0MjM4Mzk0NDk4ICBdLFxuICAgICAgICAgKiAgICAgIFsgIDYuOTUwMDAwMDAwMDAwOTM2LCAgICAgIDAuMDgzODcwNzQzNTQ4MzAyOTMgIF0sXG4gICAgICAgICAqICAgICAgWyAgOC43NTAwMDAwMDAwMDA5NCwgICAgICAtMC4wNDgzNTI5NjkzMjM1MzY3MiAgXVxuICAgICAgICAgKiBdXG4gICAgICAgICAqL1xuICAgICAgICBjb25zdCBpbnRlcnZhbHNDb29yZGluYXRlcyA9IFtcbiAgICAgICAgICAgIFthLCBmKGEpXVxuICAgICAgICBdO1xuICAgICAgICBsZXQgaiA9IGEgKyBzdGVwO1xuXG4gICAgICAgIHdoaWxlIChqIDwgYikge1xuICAgICAgICAgICAgY29uc3QgW18sIGZpXSA9IGludGVydmFsc0Nvb3JkaW5hdGVzW2ludGVydmFsc0Nvb3JkaW5hdGVzLmxlbmd0aCAtIDFdO1xuICAgICAgICAgICAgY29uc3QgZmogPSBmKGopO1xuXG4gICAgICAgICAgICBpZiAoZmkgKiBmaiA8IDApIHtcbiAgICAgICAgICAgICAgICBpbnRlcnZhbHNDb29yZGluYXRlcy5wdXNoKFtcbiAgICAgICAgICAgICAgICAgICAgaixcbiAgICAgICAgICAgICAgICAgICAgZmpcbiAgICAgICAgICAgICAgICBdKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaiArPSBzdGVwO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIGludGVydmFscyBtZXJnZSB0aGUgaW50ZXJ2YWxzQ29vcmRpbmF0ZXMncyB4IHZhbHVlcyB0byBjcmVhdGUgYSBsaXN0XG4gICAgICAgICAqIG9mIGludGVydmFscyB0aGF0IGNvbnRhaW5zIGEgcm9vdCB2YWx1ZSwgc28gbm93IHdlIGp1c3RlIGhhdmUgdG8gY2FsbCB0aGUgbWV0aG9kIGNhbGN1bGF0ZShhLCBiLCBmKVxuICAgICAgICAgKiB0byBkZXRlcm1pbmUgYWxsIHRoZSByb290IHZhbHVlc1xuICAgICAgICAgKlxuICAgICAgICAgKiBpbnRlcnZhbHNDb29yZGluYXRlcyA9IFsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8ICAgICAgICAgaW50ZXJ2YWxzID0gW1xuICAgICAgICAgKiAgICAgIFsgIHggICAgICAgICAgICAgICAgICAgIHwgIGYoeCkgICAgICAgICAgICAgICAgICAgICAgXSAgICB8ICAgICAgICAgWyBhICAgICAgICAgICAgICAgICAgfCBiICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICogICAgICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gICAgfCAgICAgICAgIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICAgICAqICAgICAgWyAgLS0tPiAtMTAwLCAgICAgICAgICAgICAgICAgIDguMTk4NjczMzMzNDE3NDUxICAgICBdLCAgIHxcbiAgICAgICAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCAtLS0tLS0tPiBbIC0xMDAsICAgICAgICAgICAgICAgIC04LjY0OTk5OTk5OTk5OTA3OCAgXVxuICAgICAgICAgKiAgICAgIFsgIC0tLT4gLTguNjQ5OTk5OTk5OTk5MDc4LCAgICAtMC4wMzQxNzI4MTMyMTg3ODIyOTQgXSwgICB8XG4gICAgICAgICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgLS0tLS0tLT4gWyAtOC42NDk5OTk5OTk5OTkwNzgsICAtNi42OTk5OTk5OTk5OTkwNzQgIF1cbiAgICAgICAgICogICAgICBbICAtLS0tPiAtNi42OTk5OTk5OTk5OTkwNzQsICAgMC4xMTA1MzQ2OTQ3Njg3OTI5MSAgIF0sICAgfFxuICAgICAgICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IC0tLS0tLS0+IFsgLTYuNjk5OTk5OTk5OTk5MDc0LCAgLTIuNzk5OTk5OTk5OTk5MDY4NiBdXG4gICAgICAgICAqICAgICAgWyAgLS0tLT4gLTIuNzk5OTk5OTk5OTk5MDY4NiwgIC0wLjExOTYwMzUzNDc3MjIzODc4ICBdLCAgIHxcbiAgICAgICAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCAtLS0tLS0tPiBbIC0yLjc5OTk5OTk5OTk5OTA2ODYsIDAuMDUwMDAwMDAwMDAwOTMwNTUgXVxuICAgICAgICAgKiAgICAgIFsgIC0tLS0+IDAuMDUwMDAwMDAwMDAwOTMwNTUsICAwLjA0NjEzMzAxNTQyNTM4MjI5ICAgXSwgICB8XG4gICAgICAgICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgLS0tLS0tLT4gWyAwLjA1MDAwMDAwMDAwMDkzMDU1LCAzLjA1MDAwMDAwMDAwMDkyOTcgIF1cbiAgICAgICAgICogICAgICBbICAtLS0tPiAzLjA1MDAwMDAwMDAwMDkyOTcsICAgLTAuMTQzMTUwNzQyMzgzOTQ0OTggIF0sICAgfFxuICAgICAgICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IC0tLS0tLS0+IFsgMy4wNTAwMDAwMDAwMDA5Mjk3LCAgNi45NTAwMDAwMDAwMDA5MzYgICBdXG4gICAgICAgICAqICAgICAgWyAgLS0tLT4gNi45NTAwMDAwMDAwMDA5MzYsICAgIDAuMDgzODcwNzQzNTQ4MzAyOTMgICBdLCAgIHxcbiAgICAgICAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCAtLS0tLS0tPiBbIDYuOTUwMDAwMDAwMDAwOTM2LCAgIDguNzUwMDAwMDAwMDAwOTQgICAgXVxuICAgICAgICAgKiAgICAgIFsgIC0tLS0+IDguNzUwMDAwMDAwMDAwOTQsICAgICAtMC4wNDgzNTI5NjkzMjM1MzY3MiAgXSAgICB8ICAgICAgICAgIF1cbiAgICAgICAgICogXVxuICAgICAgICAgKlxuICAgICAgICAgKiBTbyBpbnRlcnZhbHMgZ2l2ZXM6XG4gICAgICAgICAqIGludGVydmFscyA9IFtcbiAgICAgICAgICogICAgICBbICBhICAgICAgICAgICAgICAgICAgICAgfCAgIGIgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICogICAgICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgICAgICogICAgICBbICAtMTAwLCAgICAgICAgICAgICAgICAgICAgIC04LjY0OTk5OTk5OTk5OTA3OCAgIF0sXG4gICAgICAgICAqICAgICAgWyAgLTguNjQ5OTk5OTk5OTk5MDc4LCAgICAgICAtNi42OTk5OTk5OTk5OTkwNzQgICBdLFxuICAgICAgICAgKiAgICAgIFsgIC02LjY5OTk5OTk5OTk5OTA3NCwgICAgICAgLTIuNzk5OTk5OTk5OTk5MDY4NiAgXSxcbiAgICAgICAgICogICAgICBbICAtMi43OTk5OTk5OTk5OTkwNjg2LCAgICAgIDAuMDUwMDAwMDAwMDAwOTMwNTUgIF0sXG4gICAgICAgICAqICAgICAgWyAgMC4wNTAwMDAwMDAwMDA5MzA1NSwgICAgICAzLjA1MDAwMDAwMDAwMDkyOTcgICBdLFxuICAgICAgICAgKiAgICAgIFsgIDMuMDUwMDAwMDAwMDAwOTI5NywgICAgICAgNi45NTAwMDAwMDAwMDA5MzYgICAgXSxcbiAgICAgICAgICogICAgICBbICA2Ljk1MDAwMDAwMDAwMDkzNiwgICAgICAgIDguNzUwMDAwMDAwMDAwOTQgICAgIF1cbiAgICAgICAgICogXVxuICAgICAgICAgKi9cbiAgICAgICAgY29uc3QgaW50ZXJ2YWxzID0gaW50ZXJ2YWxzQ29vcmRpbmF0ZXMucmVkdWNlKChwcmV2LCB2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgbGFzdCA9IHByZXZbcHJldi5sZW5ndGggLSAxXTtcbiAgICAgICAgICAgIGlmIChsYXN0Lmxlbmd0aCA+PSAyKSB7XG4gICAgICAgICAgICAgICAgcHJldi5wdXNoKFtsYXN0WzFdLCB2YWx1ZVswXV0pO1xuICAgICAgICAgICAgICAgIHByZXYucHVzaChbdmFsdWVbMF1dKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbGFzdC5wdXNoKHZhbHVlWzBdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBwcmV2O1xuICAgICAgICB9LCBbW11dKTtcblxuICAgICAgICByZXR1cm4gaW50ZXJ2YWxzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENhbGN1bGF0ZSBhbGwgdGhlIHJvb3RzIG9mIGEgZnVuY3Rpb24gZiwgaW4gdGhlIGludGVydmFsIFthLCBiXSB3aXRoIGEgc3BlY2lmaWVkIHN0ZXAuXG4gICAgICogVGhlIGNsb3NlciB0aGUgc3RlcCBpcyB0byB6ZXJvLCB0aGUgbG9uZ2VyIHRoZSBjYWxjdWxhdGlvbiB0aW1lIHdpbGwgYmUgYnV0IHRoZSBtb3JlIHRoZSByZXN1bHQgd2lsbCBiZSBndWFyYW50ZWVkLlxuICAgICAqIEBwYXJhbSBhIFRoZSBmaXJzdCB2YWx1ZSBvZiB0aGUgaW50ZXJ2YWxcbiAgICAgKiBAcGFyYW0gYiBUaGUgc2Vjb25kIHZhbHVlIG9mIHRoZSBpbnRlcnZhbFxuICAgICAqIEBwYXJhbSBzdGVwIFRoZSBzdGVwIHRoYXQgZGV0ZXJtaW5lcyB0aGUgcHJlY2lzaW9uXG4gICAgICogQHBhcmFtIGYgVGhlIGZ1bmN0aW9uXG4gICAgICovXG4gICAgc3RhdGljIGNhbGN1bGF0ZUFsbFJvb3RzKGE6IG51bWJlciwgYjogbnVtYmVyLCBzdGVwOiBudW1iZXIsIGY6ICh4OiBudW1iZXIpID0+IG51bWJlcikge1xuICAgICAgICBjb25zdCByb290czogbnVtYmVyW11bXSA9IFtdO1xuICAgICAgICBjb25zdCBpbnRlcnZhbHMgPSB0aGlzLmNhbGN1bGF0ZUludGVydmFscyhhLCBiLCBzdGVwLCBmKTtcblxuICAgICAgICBmb3IgKGNvbnN0IFthLCBiXSBvZiBpbnRlcnZhbHMpIHtcbiAgICAgICAgICAgIGNvbnN0IFt4LCBlcnJvcl0gPSB0aGlzLmNhbGN1bGF0ZVJvb3QoYSwgYiwgZik7XG5cbiAgICAgICAgICAgIGlmIChNYXRoLmFicyhmKHgpKSA8PSBOdW1iZXIuRVBTSUxPTiAqIDEwMDApIHtcbiAgICAgICAgICAgICAgICAgcm9vdHMucHVzaChbeCwgZXJyb3JdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByb290cztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSb3VuZCB0aGUgbnVtYmVyIHRvIGF2b2lkIHZhbHVlcyB0aGF0IGFyZSBcIm5lYXJcIiAwIHRvIGJlIG5vdCBlcXVhbCB0byB0aGUgZXhhY3QgemVyby5cbiAgICAgKiBAcGFyYW0geCBUaGUgdmFsdWUgdG8gcm91bmRcbiAgICAgKi9cbiAgICBzdGF0aWMgcm91bmQoeDogbnVtYmVyKSB7XG4gICAgICAgIHJldHVybiBNYXRoLnJvdW5kKCh4ICsgTnVtYmVyLkVQU0lMT04pICogMTAwMDAwMDAwMCkgLyAxMDAwMDAwMDAwO1xuICAgIH1cbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLyoqXG4gKiBMYWJvOiAyIChGbG9hdCB0byBiaW5hcnkgY29udmVyc2lvbilcbiAqIEF1dGhvcnM6IE93ZW4gR29tYmFzLCBEYXZpZCBEYXJtYW5nZXIsIEp1bGllbiBWYXVjaGVyLCBDbMOpbWVudCBQZXRpZ25hdFxuICogVGVhbTogMlxuICogU2Nob29sOiBIRS1BcmNcbiAqIERhdGU6IDIxIG1hcnMgMjAyMlxuICogQ291cnNlOiBNYXRow6ltYXRpcXVlcyBzcMOpY2lmaXF1ZXMgKE1vZHVsZSAyMjM0KSAtIE0uIFN0w6lwaGFuZSBHb2Jyb25cbiAqL1xuaW1wb3J0IHsgQmlzZWN0aW9uIH0gZnJvbSBcIi4vY2xhc3Nlcy9CaXNlY3Rpb25cIjtcblxuY29uc3QgZXJFcXVhdGlvbkVsZW1lbnQgPSA8SFRNTElucHV0RWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImVyLWVxdWF0aW9uXCIpO1xuY29uc3QgZXJBRWxlbWVudCA9IDxIVE1MSW5wdXRFbGVtZW50PmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZXItYVwiKTtcbmNvbnN0IGVyQkVsZW1lbnQgPSA8SFRNTElucHV0RWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImVyLWJcIik7XG5jb25zdCBlclN0ZXBFbGVtZW50ID0gPEhUTUxJbnB1dEVsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJlci1zdGVwXCIpO1xuY29uc3QgZXJSZXN1bHRFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJlci1yZXN1bHRcIik7XG5jb25zdCBlclBsb3RFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJlci1wbG90XCIpO1xuXG5mdW5jdGlvbiByZW1vdmVHcmFwaCgpIHtcbiAgZXJQbG90RWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xufVxuXG5mdW5jdGlvbiBkaXNwbGF5R3JhcGgoYTogbnVtYmVyLCBiOiBudW1iZXIsIHJvb3RzOiBudW1iZXJbXVtdKSB7XG4gIGVyUGxvdEVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG5cbiAgY29uc3QgYW5ub3RhdGlvbnMgPSByb290cy5tYXAoKFt4LCBmeF0sIGluZGV4KSA9PiAoe1xuICAgIHgsXG4gICAgdGV4dDogYHgke2luZGV4fSDiiYggJHt4fWBcbiAgfSkpO1xuXG4gIGNvbnN0IHBhcmFtZXRlcnMgPSB7XG4gICAgdGFyZ2V0OiAnI2VyLXBsb3QnLFxuICAgIGRhdGE6IFt7XG4gICAgICBmbjogZXJFcXVhdGlvbkVsZW1lbnQudmFsdWUucmVwbGFjZSgvTWF0aFxcLi9naSwgXCJcIikucmVwbGFjZSgvXFwqXFwqL2dpLCBcIl5cIilcbiAgICB9XSxcbiAgICB3aWR0aDogODAwLFxuICAgIGhlaWdodDogNTAwLFxuICAgIGdyaWQ6IGZhbHNlLFxuICAgIHlBeGlzOiB7IGRvbWFpbjogWy0xLCAxXSB9LFxuICAgIHhBeGlzOiB7IGRvbWFpbjogW2EsIGJdIH0sXG4gICAgYW5ub3RhdGlvbnNcbiAgfTtcblxuICAvLyBAdHMtaWdub3JlXG4gIGZ1bmN0aW9uUGxvdChwYXJhbWV0ZXJzKTtcbn1cblxuZnVuY3Rpb24gb25DaGFuZ2VFcXVhdGlvbigpIHtcbiAgbGV0IHJlc3VsdCA9IFwiXCI7XG5cbiAgaWYgKFxuICAgIGVyQUVsZW1lbnQudmFsdWUgPT09IFwiXCIgfHxcbiAgICBlckJFbGVtZW50LnZhbHVlID09PSBcIlwiIHx8XG4gICAgZXJTdGVwRWxlbWVudC52YWx1ZSA9PT0gXCJcIlxuICApIHtcbiAgICBlclJlc3VsdEVsZW1lbnQuaW5uZXJIVE1MID0gYDxzcGFuIGNsYXNzPVwiY29sb3ItZ3JleVwiPlZldWlsbGV6IHJlbnNlaWduZXIgdG91cyBsZXMgY2hhbXBzPC9zcGFuPmA7XG4gICAgcmVtb3ZlR3JhcGgoKTtcbiAgICByZXR1cm47XG4gIH1cblxuICBjb25zdCBlckEgPSBOdW1iZXIoZXJBRWxlbWVudC52YWx1ZSk7XG4gIGNvbnN0IGVyQiA9IE51bWJlcihlckJFbGVtZW50LnZhbHVlKTtcbiAgY29uc3QgZXJTdGVwID0gTnVtYmVyKGVyU3RlcEVsZW1lbnQudmFsdWUpO1xuXG4gIGlmIChOdW1iZXIuaXNOYU4oZXJBKSB8fCBOdW1iZXIuaXNOYU4oZXJCKSB8fCBOdW1iZXIuaXNOYU4oZXJTdGVwKSkge1xuICAgIGVyUmVzdWx0RWxlbWVudC5pbm5lckhUTUwgPSBgPHNwYW4gY2xhc3M9XCJjb2xvci1yZWRcIj5MZXMgdmFsZXVycyBkJ2ludGVydmFsbGUgZXQgZGUgc3RlcCBkb2l2ZW50IMOqdHJlIGRlcyBub21icmVzPC9zcGFuPmA7XG4gICAgcmVtb3ZlR3JhcGgoKTtcbiAgICByZXR1cm47XG4gIH1cblxuICBpZiAoZXJTdGVwIDw9IDApIHtcbiAgICBlclJlc3VsdEVsZW1lbnQuaW5uZXJIVE1MID0gYDxzcGFuIGNsYXNzPVwiY29sb3ItcmVkXCI+TGUgc3RlcCBkb2l0IMOqdHJlIHBsdXMgZ3JhbmQgcXVlIDA8L3NwYW4+YDtcbiAgICByZW1vdmVHcmFwaCgpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGlmIChlckEgPj0gZXJCKSB7XG4gICAgZXJSZXN1bHRFbGVtZW50LmlubmVySFRNTCA9IGA8c3BhbiBjbGFzcz1cImNvbG9yLXJlZFwiPkxhIHByZW1pw6hyZSB2YWxldXIgZGUgbCdpbnRlcnZhbGxlIGRvaXQgw6p0cmUgcGx1cyBncmFuZGUgcXVlIGxhIGRldXhpw6htZTwvc3Bhbj5gO1xuICAgIHJlbW92ZUdyYXBoKCk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY29uc3QgZXJFcXVhdGlvbiA9ICh4OiBudW1iZXIpID0+IGV2YWwoZXJFcXVhdGlvbkVsZW1lbnQudmFsdWUpO1xuICBsZXQgcm9vdHM6IG51bWJlcltdW107XG5cbiAgdHJ5IHtcbiAgICByb290cyA9IEJpc2VjdGlvbi5jYWxjdWxhdGVBbGxSb290cyhlckEsIGVyQiwgZXJTdGVwLCBlckVxdWF0aW9uKTtcbiAgICByZXN1bHQgPSByb290c1xuICAgICAgICAubWFwKFxuICAgICAgICAgICAgKFt4LCBlcnJvcl0sIGluZGV4KSA9PiBgPHAgY2xhc3M9XCJtb25vXCI+eDxzdWIgY2xhc3M9XCJtb25vXCI+JHtpbmRleH08L3N1Yj4g4omIICR7eH0gwrEgJHtlcnJvcn08L3A+YFxuICAgICAgICApXG4gICAgICAgIC5qb2luKFwiXCIpO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgIGVyUmVzdWx0RWxlbWVudC5pbm5lckhUTUwgPSBgPHNwYW4gY2xhc3M9XCJjb2xvci1yZWRcIj5Wb3RyZSDDqXF1YXRpb24gZXN0IGludmFsaWRlPC9zcGFuPmA7XG4gICAgcmVtb3ZlR3JhcGgoKTtcbiAgICByZXR1cm47XG4gIH1cblxuICBkaXNwbGF5R3JhcGgoZXJBLCBlckIsIHJvb3RzKTtcblxuICBlclJlc3VsdEVsZW1lbnQuaW5uZXJIVE1MID0gYFxuICA8ZGl2IGNsYXNzPVwicmVzdWx0LWdyb3VwIGNvbG9yLWdyZWVuXCI+XG4gICAgPHNwYW4gY2xhc3M9XCJjb2xvci1ncmV5XCI+XG4gICAgICA8c3BhbiBjbGFzcz1cIm1vbm9cIj4ke3Jvb3RzLmxlbmd0aH08L3NwYW4+IHrDqXJvcyB0cm91dsOpZXM6XG4gICAgPC9zcGFuPlxuICAgIDxkZXRhaWxzICR7cm9vdHMubGVuZ3RoID4gMjAgPyBcIlwiIDogXCJvcGVuXCJ9PlxuICAgICAgPHN1bW1hcnk+QWZmaWNoZXIvbWFzcXVlciB0b3VzIGxlcyB6w6lyb3M8L3N1bW1hcnk+XG4gICAgICAke3Jlc3VsdH1cbiAgICA8L2RldGFpbHM+XG4gIDwvZGl2PlxuICBgO1xufVxuXG5lckFFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgb25DaGFuZ2VFcXVhdGlvbik7XG5lckJFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXl1cFwiLCBvbkNoYW5nZUVxdWF0aW9uKTtcbmVyRXF1YXRpb25FbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgb25DaGFuZ2VFcXVhdGlvbik7XG5lckVxdWF0aW9uRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwia2V5dXBcIiwgb25DaGFuZ2VFcXVhdGlvbik7XG5lclN0ZXBFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgb25DaGFuZ2VFcXVhdGlvbik7XG5lclN0ZXBFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXl1cFwiLCBvbkNoYW5nZUVxdWF0aW9uKTtcblxub25DaGFuZ2VFcXVhdGlvbigpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxxRkFFdEMsTUFBTSxtQ0FHWCxDQUFDO0FBQ0osQ0FBQztBQUVELFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztBQUN4RCxVQUFVLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLGdCQUFnQixDQUFDLENBQUM7QUFDdkQsaUJBQWlCLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLGdCQUFnQixDQUFDLENBQUM7QUFDL0QsaUJBQWlCLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLGdCQUFnQixDQUFDLENBQUM7QUFDOUQsYUFBYSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO0FBQzNELGFBQWEsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztBQUUxRCxnQkFBZ0IsRUFBRSxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbWF0aF9zcGUvLi9zcmMvY2xhc3Nlcy9CaXNlY3Rpb24udHMiLCJ3ZWJwYWNrOi8vbWF0aF9zcGUvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vbWF0aF9zcGUvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL21hdGhfc3BlL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vbWF0aF9zcGUvLi9zcmMvQU4yMDIyX0xhYm8yX0VxMi50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogRGV0ZXJtaW5lIHRoZSByb290cyBvZiBmdW5jdGlvbnMgd2l0aCB0aGUgYmlzZWN0aW9uIG1ldGhvZFxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEJpc2VjdGlvbiB7XHJcbiAgICAvKipcclxuICAgICAqIERldGVybWluZSB0aGUgcm9vdCBvZiBhIGZ1bmN0aW9uIGluIGEgaW50ZXJ2YWwgb2YgW2EsIGJdLlxyXG4gICAgICogVGhpcyBmdW5jdGlvbiBnaXZlcyBvbmx5IG9uZSByb290IGluIHRoaXMgaW50ZXJ2YWwsIHRvIGRldGVybWluZSBhbGwgdGhlIHJvb3RzIGluIHRoaXMgaW50ZXJ2YWwgdXNlIGNhbGN1bGF0ZUFsbFJvb3RzXHJcbiAgICAgKiBAcGFyYW0gYSBUaGUgZmlyc3QgdmFsdWUgb2YgdGhlIGludGVydmFsXHJcbiAgICAgKiBAcGFyYW0gYiBUaGUgc2Vjb25kIHZhbHVlIG9mIHRoZSBpbnRlcnZhbFxyXG4gICAgICogQHBhcmFtIGYgVGhlIGZ1bmN0aW9uXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBjYWxjdWxhdGVSb290KGE6IG51bWJlciwgYjogbnVtYmVyLCBmOiAoeDogbnVtYmVyKSA9PiBudW1iZXIpIHtcclxuICAgICAgICBsZXQgZkEgPSBmKGEpO1xyXG4gICAgICAgIGxldCBtTmV3ID0gYSArIGI7XHJcbiAgICAgICAgbGV0IG1PbGQgPSAyICogbU5ldztcclxuICAgICAgICBsZXQgZXJyb3IgPSBNYXRoLmFicyhtTmV3IC0gbU9sZCk7XHJcblxyXG4gICAgICAgIHdoaWxlIChlcnJvciA+IE51bWJlci5FUFNJTE9OKSB7XHJcbiAgICAgICAgICAgIG1PbGQgPSBtTmV3O1xyXG4gICAgICAgICAgICBtTmV3ID0gKGEgKyBiKSAvIDI7XHJcbiAgICAgICAgICAgIGNvbnN0IGZNID0gZihtTmV3KTtcclxuXHJcbiAgICAgICAgICAgIGlmIChmTSAqIGZBIDw9IDApIHtcclxuICAgICAgICAgICAgICAgIGIgPSBtTmV3O1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgYSA9IG1OZXc7XHJcbiAgICAgICAgICAgICAgICBmQSA9IGZNO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBlcnJvciA9IE1hdGguYWJzKG1OZXcgLSBtT2xkKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBbbU5ldywgZXJyb3JdO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGV0ZXJtaW5lIGFsbCBpbnRlcnZhbHMgb2YgeCBpbiB0aGUgZnVuY3Rpb24gZiB0aGF0IGhhdmUgaW1hZ2VzIGYoeCkgd2l0aCBvcHBvc2l0ZSBzaWducyBpbiBhbiBpbnRlcnZhbCBbYSwgYl0uXHJcbiAgICAgKiBUaGUgY2xvc2VyIHRoZSBzdGVwIGlzIHRvIHplcm8sIHRoZSBsb25nZXIgdGhlIGNhbGN1bGF0aW9uIHRpbWUgd2lsbCBiZSBidXQgdGhlIG1vcmUgdGhlIHJlc3VsdCB3aWxsIGJlIGd1YXJhbnRlZWQuXHJcbiAgICAgKiBAcGFyYW0gYSBUaGUgZmlyc3QgdmFsdWUgb2YgdGhlIGludGVydmFsXHJcbiAgICAgKiBAcGFyYW0gYiBUaGUgc2Vjb25kIHZhbHVlIG9mIHRoZSBpbnRlcnZhbFxyXG4gICAgICogQHBhcmFtIHN0ZXAgVGhlIHN0ZXAgdGhhdCBkZXRlcm1pbmVzIHRoZSBwcmVjaXNpb25cclxuICAgICAqIEBwYXJhbSBmIFRoZSBmdW5jdGlvblxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgY2FsY3VsYXRlSW50ZXJ2YWxzKGE6IG51bWJlciwgYjogbnVtYmVyLCBzdGVwOiBudW1iZXIsIGY6ICh4OiBudW1iZXIpID0+IG51bWJlcik6IG51bWJlcltdW10ge1xyXG4gICAgICAgIC8vIExpbWl0IHRoZSBjb21wbGV4aXR5XHJcbiAgICAgICAgaWYgKHN0ZXAgPCAwLjAwMDEpIHtcclxuICAgICAgICAgICAgc3RlcCA9IDAuMDAwMTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBpbnRlcnZhbHNDb29yZGluYXRlcyBnaXZlcyBhIGxpc3Qgb2YgY29vcmRpbmF0ZXMgd2l0aCBhIGYoeCkgdGhhdCBpcyBhbHRlcm5hdGl2ZWx5IHBvc2l0aXZlIGFuZCBuZWdhdGl2ZXNcclxuICAgICAgICAgKiBzbyBpdCBtZWFucyB0aGF0IGJldHdlZW4gZWFjaCB4IHZhbHVlcyB0aGVyZSBpcyBhIHJvb3RcclxuICAgICAgICAgKiB0aGUgd2hpbGUganVzdCB1bmRlciBjYWxjdWxhdGUgZm9yIGVhY2ggeCBzZXBhcmF0ZWQgYnkgYSBcImxpdHRsZSBzdGVwXCIgaXQncyBmKHgpIHZhbHVlLlxyXG4gICAgICAgICAqIEFuZCBpZiBmKHgpIGhhcyBhIGRpZmZlcmVudCBzaWduIHRoYW4gZih4KSBvZiB0aGUgcHJldmlvdXMgeCwgdGhlbiB3ZSBhZGQgdGhlIGNvb3JkaW5hdGVzIGluIHRoZSBsaXN0LlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogaW50ZXJ2YWxzQ29vcmRpbmF0ZXMgPSBbXHJcbiAgICAgICAgICogICAgICBbICB4ICAgICAgICAgICAgICAgICAgICB8ICBmKHgpICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICogICAgICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAgICAgICogICAgICBbICAtMTAwLCAgICAgICAgICAgICAgICAgICA4LjE5ODY3MzMzMzQxNzQ1MSAgICBdLFxyXG4gICAgICAgICAqICAgICAgWyAgLTguNjQ5OTk5OTk5OTk5MDc4LCAgICAtMC4wMzQxNzI4MTMyMTg3ODIyOTQgXSxcclxuICAgICAgICAgKiAgICAgIFsgIC02LjY5OTk5OTk5OTk5OTA3NCwgICAgIDAuMTEwNTM0Njk0NzY4NzkyOTEgIF0sXHJcbiAgICAgICAgICogICAgICBbICAtMi43OTk5OTk5OTk5OTkwNjg2LCAgIC0wLjExOTYwMzUzNDc3MjIzODc4ICBdLFxyXG4gICAgICAgICAqICAgICAgWyAgMC4wNTAwMDAwMDAwMDA5MzA1NSwgICAgMC4wNDYxMzMwMTU0MjUzODIyOSAgXSxcclxuICAgICAgICAgKiAgICAgIFsgIDMuMDUwMDAwMDAwMDAwOTI5NywgICAgLTAuMTQzMTUwNzQyMzgzOTQ0OTggIF0sXHJcbiAgICAgICAgICogICAgICBbICA2Ljk1MDAwMDAwMDAwMDkzNiwgICAgICAwLjA4Mzg3MDc0MzU0ODMwMjkzICBdLFxyXG4gICAgICAgICAqICAgICAgWyAgOC43NTAwMDAwMDAwMDA5NCwgICAgICAtMC4wNDgzNTI5NjkzMjM1MzY3MiAgXVxyXG4gICAgICAgICAqIF1cclxuICAgICAgICAgKi9cclxuICAgICAgICBjb25zdCBpbnRlcnZhbHNDb29yZGluYXRlcyA9IFtcclxuICAgICAgICAgICAgW2EsIGYoYSldXHJcbiAgICAgICAgXTtcclxuICAgICAgICBsZXQgaiA9IGEgKyBzdGVwO1xyXG5cclxuICAgICAgICB3aGlsZSAoaiA8IGIpIHtcclxuICAgICAgICAgICAgY29uc3QgW18sIGZpXSA9IGludGVydmFsc0Nvb3JkaW5hdGVzW2ludGVydmFsc0Nvb3JkaW5hdGVzLmxlbmd0aCAtIDFdO1xyXG4gICAgICAgICAgICBjb25zdCBmaiA9IGYoaik7XHJcblxyXG4gICAgICAgICAgICBpZiAoZmkgKiBmaiA8IDApIHtcclxuICAgICAgICAgICAgICAgIGludGVydmFsc0Nvb3JkaW5hdGVzLnB1c2goW1xyXG4gICAgICAgICAgICAgICAgICAgIGosXHJcbiAgICAgICAgICAgICAgICAgICAgZmpcclxuICAgICAgICAgICAgICAgIF0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBqICs9IHN0ZXA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBpbnRlcnZhbHMgbWVyZ2UgdGhlIGludGVydmFsc0Nvb3JkaW5hdGVzJ3MgeCB2YWx1ZXMgdG8gY3JlYXRlIGEgbGlzdFxyXG4gICAgICAgICAqIG9mIGludGVydmFscyB0aGF0IGNvbnRhaW5zIGEgcm9vdCB2YWx1ZSwgc28gbm93IHdlIGp1c3RlIGhhdmUgdG8gY2FsbCB0aGUgbWV0aG9kIGNhbGN1bGF0ZShhLCBiLCBmKVxyXG4gICAgICAgICAqIHRvIGRldGVybWluZSBhbGwgdGhlIHJvb3QgdmFsdWVzXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBpbnRlcnZhbHNDb29yZGluYXRlcyA9IFsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8ICAgICAgICAgaW50ZXJ2YWxzID0gW1xyXG4gICAgICAgICAqICAgICAgWyAgeCAgICAgICAgICAgICAgICAgICAgfCAgZih4KSAgICAgICAgICAgICAgICAgICAgICBdICAgIHwgICAgICAgICBbIGEgICAgICAgICAgICAgICAgICB8IGIgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAqICAgICAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICAgIHwgICAgICAgICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgICAgICAqICAgICAgWyAgLS0tPiAtMTAwLCAgICAgICAgICAgICAgICAgIDguMTk4NjczMzMzNDE3NDUxICAgICBdLCAgIHxcclxuICAgICAgICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IC0tLS0tLS0+IFsgLTEwMCwgICAgICAgICAgICAgICAgLTguNjQ5OTk5OTk5OTk5MDc4ICBdXHJcbiAgICAgICAgICogICAgICBbICAtLS0+IC04LjY0OTk5OTk5OTk5OTA3OCwgICAgLTAuMDM0MTcyODEzMjE4NzgyMjk0IF0sICAgfFxyXG4gICAgICAgICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgLS0tLS0tLT4gWyAtOC42NDk5OTk5OTk5OTkwNzgsICAtNi42OTk5OTk5OTk5OTkwNzQgIF1cclxuICAgICAgICAgKiAgICAgIFsgIC0tLS0+IC02LjY5OTk5OTk5OTk5OTA3NCwgICAwLjExMDUzNDY5NDc2ODc5MjkxICAgXSwgICB8XHJcbiAgICAgICAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCAtLS0tLS0tPiBbIC02LjY5OTk5OTk5OTk5OTA3NCwgIC0yLjc5OTk5OTk5OTk5OTA2ODYgXVxyXG4gICAgICAgICAqICAgICAgWyAgLS0tLT4gLTIuNzk5OTk5OTk5OTk5MDY4NiwgIC0wLjExOTYwMzUzNDc3MjIzODc4ICBdLCAgIHxcclxuICAgICAgICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IC0tLS0tLS0+IFsgLTIuNzk5OTk5OTk5OTk5MDY4NiwgMC4wNTAwMDAwMDAwMDA5MzA1NSBdXHJcbiAgICAgICAgICogICAgICBbICAtLS0tPiAwLjA1MDAwMDAwMDAwMDkzMDU1LCAgMC4wNDYxMzMwMTU0MjUzODIyOSAgIF0sICAgfFxyXG4gICAgICAgICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgLS0tLS0tLT4gWyAwLjA1MDAwMDAwMDAwMDkzMDU1LCAzLjA1MDAwMDAwMDAwMDkyOTcgIF1cclxuICAgICAgICAgKiAgICAgIFsgIC0tLS0+IDMuMDUwMDAwMDAwMDAwOTI5NywgICAtMC4xNDMxNTA3NDIzODM5NDQ5OCAgXSwgICB8XHJcbiAgICAgICAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCAtLS0tLS0tPiBbIDMuMDUwMDAwMDAwMDAwOTI5NywgIDYuOTUwMDAwMDAwMDAwOTM2ICAgXVxyXG4gICAgICAgICAqICAgICAgWyAgLS0tLT4gNi45NTAwMDAwMDAwMDA5MzYsICAgIDAuMDgzODcwNzQzNTQ4MzAyOTMgICBdLCAgIHxcclxuICAgICAgICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IC0tLS0tLS0+IFsgNi45NTAwMDAwMDAwMDA5MzYsICAgOC43NTAwMDAwMDAwMDA5NCAgICBdXHJcbiAgICAgICAgICogICAgICBbICAtLS0tPiA4Ljc1MDAwMDAwMDAwMDk0LCAgICAgLTAuMDQ4MzUyOTY5MzIzNTM2NzIgIF0gICAgfCAgICAgICAgICBdXHJcbiAgICAgICAgICogXVxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogU28gaW50ZXJ2YWxzIGdpdmVzOlxyXG4gICAgICAgICAqIGludGVydmFscyA9IFtcclxuICAgICAgICAgKiAgICAgIFsgIGEgICAgICAgICAgICAgICAgICAgICB8ICAgYiAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAqICAgICAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAgICAgICogICAgICBbICAtMTAwLCAgICAgICAgICAgICAgICAgICAgIC04LjY0OTk5OTk5OTk5OTA3OCAgIF0sXHJcbiAgICAgICAgICogICAgICBbICAtOC42NDk5OTk5OTk5OTkwNzgsICAgICAgIC02LjY5OTk5OTk5OTk5OTA3NCAgIF0sXHJcbiAgICAgICAgICogICAgICBbICAtNi42OTk5OTk5OTk5OTkwNzQsICAgICAgIC0yLjc5OTk5OTk5OTk5OTA2ODYgIF0sXHJcbiAgICAgICAgICogICAgICBbICAtMi43OTk5OTk5OTk5OTkwNjg2LCAgICAgIDAuMDUwMDAwMDAwMDAwOTMwNTUgIF0sXHJcbiAgICAgICAgICogICAgICBbICAwLjA1MDAwMDAwMDAwMDkzMDU1LCAgICAgIDMuMDUwMDAwMDAwMDAwOTI5NyAgIF0sXHJcbiAgICAgICAgICogICAgICBbICAzLjA1MDAwMDAwMDAwMDkyOTcsICAgICAgIDYuOTUwMDAwMDAwMDAwOTM2ICAgIF0sXHJcbiAgICAgICAgICogICAgICBbICA2Ljk1MDAwMDAwMDAwMDkzNiwgICAgICAgIDguNzUwMDAwMDAwMDAwOTQgICAgIF1cclxuICAgICAgICAgKiBdXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgY29uc3QgaW50ZXJ2YWxzID0gaW50ZXJ2YWxzQ29vcmRpbmF0ZXMucmVkdWNlKChwcmV2LCB2YWx1ZSkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBsYXN0ID0gcHJldltwcmV2Lmxlbmd0aCAtIDFdO1xyXG4gICAgICAgICAgICBpZiAobGFzdC5sZW5ndGggPj0gMikge1xyXG4gICAgICAgICAgICAgICAgcHJldi5wdXNoKFtsYXN0WzFdLCB2YWx1ZVswXV0pO1xyXG4gICAgICAgICAgICAgICAgcHJldi5wdXNoKFt2YWx1ZVswXV0pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbGFzdC5wdXNoKHZhbHVlWzBdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gcHJldjtcclxuICAgICAgICB9LCBbW11dKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGludGVydmFscztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENhbGN1bGF0ZSBhbGwgdGhlIHJvb3RzIG9mIGEgZnVuY3Rpb24gZiwgaW4gdGhlIGludGVydmFsIFthLCBiXSB3aXRoIGEgc3BlY2lmaWVkIHN0ZXAuXHJcbiAgICAgKiBUaGUgY2xvc2VyIHRoZSBzdGVwIGlzIHRvIHplcm8sIHRoZSBsb25nZXIgdGhlIGNhbGN1bGF0aW9uIHRpbWUgd2lsbCBiZSBidXQgdGhlIG1vcmUgdGhlIHJlc3VsdCB3aWxsIGJlIGd1YXJhbnRlZWQuXHJcbiAgICAgKiBAcGFyYW0gYSBUaGUgZmlyc3QgdmFsdWUgb2YgdGhlIGludGVydmFsXHJcbiAgICAgKiBAcGFyYW0gYiBUaGUgc2Vjb25kIHZhbHVlIG9mIHRoZSBpbnRlcnZhbFxyXG4gICAgICogQHBhcmFtIHN0ZXAgVGhlIHN0ZXAgdGhhdCBkZXRlcm1pbmVzIHRoZSBwcmVjaXNpb25cclxuICAgICAqIEBwYXJhbSBmIFRoZSBmdW5jdGlvblxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgY2FsY3VsYXRlQWxsUm9vdHMoYTogbnVtYmVyLCBiOiBudW1iZXIsIHN0ZXA6IG51bWJlciwgZjogKHg6IG51bWJlcikgPT4gbnVtYmVyKSB7XHJcbiAgICAgICAgY29uc3Qgcm9vdHM6IG51bWJlcltdW10gPSBbXTtcclxuICAgICAgICBjb25zdCBpbnRlcnZhbHMgPSB0aGlzLmNhbGN1bGF0ZUludGVydmFscyhhLCBiLCBzdGVwLCBmKTtcclxuXHJcbiAgICAgICAgZm9yIChjb25zdCBbYSwgYl0gb2YgaW50ZXJ2YWxzKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IFt4LCBlcnJvcl0gPSB0aGlzLmNhbGN1bGF0ZVJvb3QoYSwgYiwgZik7XHJcblxyXG4gICAgICAgICAgICBpZiAoTWF0aC5hYnMoZih4KSkgPD0gTnVtYmVyLkVQU0lMT04gKiAxMDAwKSB7XHJcbiAgICAgICAgICAgICAgICAgcm9vdHMucHVzaChbeCwgZXJyb3JdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHJvb3RzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUm91bmQgdGhlIG51bWJlciB0byBhdm9pZCB2YWx1ZXMgdGhhdCBhcmUgXCJuZWFyXCIgMCB0byBiZSBub3QgZXF1YWwgdG8gdGhlIGV4YWN0IHplcm8uXHJcbiAgICAgKiBAcGFyYW0geCBUaGUgdmFsdWUgdG8gcm91bmRcclxuICAgICAqL1xyXG4gICAgc3RhdGljIHJvdW5kKHg6IG51bWJlcikge1xyXG4gICAgICAgIHJldHVybiBNYXRoLnJvdW5kKCh4ICsgTnVtYmVyLkVQU0lMT04pICogMTAwMDAwMDAwMCkgLyAxMDAwMDAwMDAwO1xyXG4gICAgfVxyXG59XHJcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLyoqXHJcbiAqIExhYm86IDIgKEZsb2F0IHRvIGJpbmFyeSBjb252ZXJzaW9uKVxyXG4gKiBBdXRob3JzOiBPd2VuIEdvbWJhcywgRGF2aWQgRGFybWFuZ2VyLCBKdWxpZW4gVmF1Y2hlciwgQ2zDqW1lbnQgUGV0aWduYXRcclxuICogVGVhbTogMlxyXG4gKiBTY2hvb2w6IEhFLUFyY1xyXG4gKiBEYXRlOiAyMSBtYXJzIDIwMjJcclxuICogQ291cnNlOiBNYXRow6ltYXRpcXVlcyBzcMOpY2lmaXF1ZXMgKE1vZHVsZSAyMjM0KSAtIE0uIFN0w6lwaGFuZSBHb2Jyb25cclxuICovXHJcbmltcG9ydCB7IEJpc2VjdGlvbiB9IGZyb20gXCIuL2NsYXNzZXMvQmlzZWN0aW9uXCI7XHJcblxyXG5jb25zdCBlckVxdWF0aW9uRWxlbWVudCA9IDxIVE1MSW5wdXRFbGVtZW50PmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZXItZXF1YXRpb25cIik7XHJcbmNvbnN0IGVyQUVsZW1lbnQgPSA8SFRNTElucHV0RWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImVyLWFcIik7XHJcbmNvbnN0IGVyQkVsZW1lbnQgPSA8SFRNTElucHV0RWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImVyLWJcIik7XHJcbmNvbnN0IGVyU3RlcEVsZW1lbnQgPSA8SFRNTElucHV0RWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImVyLXN0ZXBcIik7XHJcbmNvbnN0IGVyUmVzdWx0RWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZXItcmVzdWx0XCIpO1xyXG5jb25zdCBlclBsb3RFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJlci1wbG90XCIpO1xyXG5cclxuZnVuY3Rpb24gcmVtb3ZlR3JhcGgoKSB7XHJcbiAgZXJQbG90RWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG59XHJcblxyXG5mdW5jdGlvbiBkaXNwbGF5R3JhcGgoYTogbnVtYmVyLCBiOiBudW1iZXIsIHJvb3RzOiBudW1iZXJbXVtdKSB7XHJcbiAgZXJQbG90RWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcclxuXHJcbiAgY29uc3QgYW5ub3RhdGlvbnMgPSByb290cy5tYXAoKFt4LCBmeF0sIGluZGV4KSA9PiAoe1xyXG4gICAgeCxcclxuICAgIHRleHQ6IGB4JHtpbmRleH0g4omIICR7eH1gXHJcbiAgfSkpO1xyXG5cclxuICBjb25zdCBwYXJhbWV0ZXJzID0ge1xyXG4gICAgdGFyZ2V0OiAnI2VyLXBsb3QnLFxyXG4gICAgZGF0YTogW3tcclxuICAgICAgZm46IGVyRXF1YXRpb25FbGVtZW50LnZhbHVlLnJlcGxhY2UoL01hdGhcXC4vZ2ksIFwiXCIpLnJlcGxhY2UoL1xcKlxcKi9naSwgXCJeXCIpXHJcbiAgICB9XSxcclxuICAgIHdpZHRoOiA4MDAsXHJcbiAgICBoZWlnaHQ6IDUwMCxcclxuICAgIGdyaWQ6IGZhbHNlLFxyXG4gICAgeUF4aXM6IHsgZG9tYWluOiBbLTEsIDFdIH0sXHJcbiAgICB4QXhpczogeyBkb21haW46IFthLCBiXSB9LFxyXG4gICAgYW5ub3RhdGlvbnNcclxuICB9O1xyXG5cclxuICAvLyBAdHMtaWdub3JlXHJcbiAgZnVuY3Rpb25QbG90KHBhcmFtZXRlcnMpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBvbkNoYW5nZUVxdWF0aW9uKCkge1xyXG4gIGxldCByZXN1bHQgPSBcIlwiO1xyXG5cclxuICBpZiAoXHJcbiAgICBlckFFbGVtZW50LnZhbHVlID09PSBcIlwiIHx8XHJcbiAgICBlckJFbGVtZW50LnZhbHVlID09PSBcIlwiIHx8XHJcbiAgICBlclN0ZXBFbGVtZW50LnZhbHVlID09PSBcIlwiXHJcbiAgKSB7XHJcbiAgICBlclJlc3VsdEVsZW1lbnQuaW5uZXJIVE1MID0gYDxzcGFuIGNsYXNzPVwiY29sb3ItZ3JleVwiPlZldWlsbGV6IHJlbnNlaWduZXIgdG91cyBsZXMgY2hhbXBzPC9zcGFuPmA7XHJcbiAgICByZW1vdmVHcmFwaCgpO1xyXG4gICAgcmV0dXJuO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgZXJBID0gTnVtYmVyKGVyQUVsZW1lbnQudmFsdWUpO1xyXG4gIGNvbnN0IGVyQiA9IE51bWJlcihlckJFbGVtZW50LnZhbHVlKTtcclxuICBjb25zdCBlclN0ZXAgPSBOdW1iZXIoZXJTdGVwRWxlbWVudC52YWx1ZSk7XHJcblxyXG4gIGlmIChOdW1iZXIuaXNOYU4oZXJBKSB8fCBOdW1iZXIuaXNOYU4oZXJCKSB8fCBOdW1iZXIuaXNOYU4oZXJTdGVwKSkge1xyXG4gICAgZXJSZXN1bHRFbGVtZW50LmlubmVySFRNTCA9IGA8c3BhbiBjbGFzcz1cImNvbG9yLXJlZFwiPkxlcyB2YWxldXJzIGQnaW50ZXJ2YWxsZSBldCBkZSBzdGVwIGRvaXZlbnQgw6p0cmUgZGVzIG5vbWJyZXM8L3NwYW4+YDtcclxuICAgIHJlbW92ZUdyYXBoKCk7XHJcbiAgICByZXR1cm47XHJcbiAgfVxyXG5cclxuICBpZiAoZXJTdGVwIDw9IDApIHtcclxuICAgIGVyUmVzdWx0RWxlbWVudC5pbm5lckhUTUwgPSBgPHNwYW4gY2xhc3M9XCJjb2xvci1yZWRcIj5MZSBzdGVwIGRvaXQgw6p0cmUgcGx1cyBncmFuZCBxdWUgMDwvc3Bhbj5gO1xyXG4gICAgcmVtb3ZlR3JhcGgoKTtcclxuICAgIHJldHVybjtcclxuICB9XHJcblxyXG4gIGlmIChlckEgPj0gZXJCKSB7XHJcbiAgICBlclJlc3VsdEVsZW1lbnQuaW5uZXJIVE1MID0gYDxzcGFuIGNsYXNzPVwiY29sb3ItcmVkXCI+TGEgcHJlbWnDqHJlIHZhbGV1ciBkZSBsJ2ludGVydmFsbGUgZG9pdCDDqnRyZSBwbHVzIGdyYW5kZSBxdWUgbGEgZGV1eGnDqG1lPC9zcGFuPmA7XHJcbiAgICByZW1vdmVHcmFwaCgpO1xyXG4gICAgcmV0dXJuO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgZXJFcXVhdGlvbiA9ICh4OiBudW1iZXIpID0+IGV2YWwoZXJFcXVhdGlvbkVsZW1lbnQudmFsdWUpO1xyXG4gIGxldCByb290czogbnVtYmVyW11bXTtcclxuXHJcbiAgdHJ5IHtcclxuICAgIHJvb3RzID0gQmlzZWN0aW9uLmNhbGN1bGF0ZUFsbFJvb3RzKGVyQSwgZXJCLCBlclN0ZXAsIGVyRXF1YXRpb24pO1xyXG4gICAgcmVzdWx0ID0gcm9vdHNcclxuICAgICAgICAubWFwKFxyXG4gICAgICAgICAgICAoW3gsIGVycm9yXSwgaW5kZXgpID0+IGA8cCBjbGFzcz1cIm1vbm9cIj54PHN1YiBjbGFzcz1cIm1vbm9cIj4ke2luZGV4fTwvc3ViPiDiiYggJHt4fSDCsSAke2Vycm9yfTwvcD5gXHJcbiAgICAgICAgKVxyXG4gICAgICAgIC5qb2luKFwiXCIpO1xyXG4gIH0gY2F0Y2ggKGVycikge1xyXG4gICAgY29uc29sZS5sb2coZXJyKTtcclxuICAgIGVyUmVzdWx0RWxlbWVudC5pbm5lckhUTUwgPSBgPHNwYW4gY2xhc3M9XCJjb2xvci1yZWRcIj5Wb3RyZSDDqXF1YXRpb24gZXN0IGludmFsaWRlPC9zcGFuPmA7XHJcbiAgICByZW1vdmVHcmFwaCgpO1xyXG4gICAgcmV0dXJuO1xyXG4gIH1cclxuXHJcbiAgZGlzcGxheUdyYXBoKGVyQSwgZXJCLCByb290cyk7XHJcblxyXG4gIGVyUmVzdWx0RWxlbWVudC5pbm5lckhUTUwgPSBgXHJcbiAgPGRpdiBjbGFzcz1cInJlc3VsdC1ncm91cCBjb2xvci1ncmVlblwiPlxyXG4gICAgPHNwYW4gY2xhc3M9XCJjb2xvci1ncmV5XCI+XHJcbiAgICAgIDxzcGFuIGNsYXNzPVwibW9ub1wiPiR7cm9vdHMubGVuZ3RofTwvc3Bhbj4gesOpcm9zIHRyb3V2w6llczpcclxuICAgIDwvc3Bhbj5cclxuICAgIDxkZXRhaWxzICR7cm9vdHMubGVuZ3RoID4gMjAgPyBcIlwiIDogXCJvcGVuXCJ9PlxyXG4gICAgICA8c3VtbWFyeT5BZmZpY2hlci9tYXNxdWVyIHRvdXMgbGVzIHrDqXJvczwvc3VtbWFyeT5cclxuICAgICAgJHtyZXN1bHR9XHJcbiAgICA8L2RldGFpbHM+XHJcbiAgPC9kaXY+XHJcbiAgYDtcclxufVxyXG5cclxuZXJBRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsIG9uQ2hhbmdlRXF1YXRpb24pO1xyXG5lckJFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXl1cFwiLCBvbkNoYW5nZUVxdWF0aW9uKTtcclxuZXJFcXVhdGlvbkVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCBvbkNoYW5nZUVxdWF0aW9uKTtcclxuZXJFcXVhdGlvbkVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImtleXVwXCIsIG9uQ2hhbmdlRXF1YXRpb24pO1xyXG5lclN0ZXBFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgb25DaGFuZ2VFcXVhdGlvbik7XHJcbmVyU3RlcEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImtleXVwXCIsIG9uQ2hhbmdlRXF1YXRpb24pO1xyXG5cclxub25DaGFuZ2VFcXVhdGlvbigpO1xyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=
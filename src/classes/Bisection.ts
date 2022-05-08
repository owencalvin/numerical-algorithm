/**
 * Determine the roots of functions with the bisection method
 */
export class Bisection {
    /**
     * Determine the root of a function in a interval of [a, b].
     * This function gives only one root in this interval, to determine all the roots in this interval use calculateAllRoots
     * @param a The first value of the interval
     * @param b The second value of the interval
     * @param f The function
     */
    static calculateRoot(a: number, b: number, f: (x: number) => number) {
        let fA = f(a);
        let mNew = a + b;
        let mOld = 2 * mNew;
        let error = Math.abs(mNew - mOld);

        while (error > Number.EPSILON) {
            mOld = mNew;
            mNew = (a + b) / 2;
            const fM = f(mNew);

            if (fM * fA <= 0) {
                b = mNew;
            } else {
                a = mNew;
                fA = fM;
            }

            error = Math.abs(mNew - mOld);
        }

        return [mNew, error];
    }

    /**
     * Determine all intervals of x in the function f that have images f(x) with opposite signs in an interval [a, b].
     * The closer the step is to zero, the longer the calculation time will be but the more the result will be guaranteed.
     * @param a The first value of the interval
     * @param b The second value of the interval
     * @param step The step that determines the precision
     * @param f The function
     */
    static calculateIntervals(a: number, b: number, step: number, f: (x: number) => number): number[][] {
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
        const intervalsCoordinates = [
            [a, f(a)]
        ];
        let j = a + step;

        while (j < b) {
            const [_, fi] = intervalsCoordinates[intervalsCoordinates.length - 1];
            const fj = f(j);

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
        const intervals = intervalsCoordinates.reduce((prev, value) => {
            const last = prev[prev.length - 1];
            if (last.length >= 2) {
                prev.push([last[1], value[0]]);
                prev.push([value[0]]);
            } else {
                last.push(value[0]);
            }
            return prev;
        }, [[]]);

        return intervals;
    }

    /**
     * Calculate all the roots of a function f, in the interval [a, b] with a specified step.
     * The closer the step is to zero, the longer the calculation time will be but the more the result will be guaranteed.
     * @param a The first value of the interval
     * @param b The second value of the interval
     * @param step The step that determines the precision
     * @param f The function
     */
    static calculateAllRoots(a: number, b: number, step: number, f: (x: number) => number) {
        const roots: number[][] = [];
        const intervals = this.calculateIntervals(a, b, step, f);

        for (const [a, b] of intervals) {
            const [x, error] = this.calculateRoot(a, b, f);

            if (Math.abs(f(x)) <= Number.EPSILON * 1000) {
                 roots.push([x, error]);
            }
        }

        return roots;
    }

    /**
     * Round the number to avoid values that are "near" 0 to be not equal to the exact zero.
     * @param x The value to round
     */
    static round(x: number) {
        return Math.round((x + Number.EPSILON) * 1000000000) / 1000000000;
    }
}

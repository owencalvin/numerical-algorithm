export class Dichotomy {
    static calculate(a: number, b: number, f: (x: number) => number) {
        if (a > b) {
            return null;
        }

        if (a === b) {
            return null;
        }

        let fA = f(a);
        let mNew = a + b;
        let mOld = 2 * mNew;

        while (Math.abs(mNew - mOld) > Number.EPSILON) {
            mOld = mNew;
            mNew = (a + b) / 2;
            const fM = f(mNew);

            if (fM * fA <= 0) {
                b = mNew;
            } else {
                a = mNew;
                fA = fM;
            }
        }

        return mNew;
    }
}

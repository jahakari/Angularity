
export const Range = function (min: number, max: number): PropertyDecorator {
    return function (target: object, key: string | symbol) {
        let _value: number;

        return Object.defineProperty(target, key, {
            get: function () { return _value; },
            set: function (value: number) {
                if (value < min || value > max) {
                    throw new Error(`Value must be between ${min} and ${max}.`);
                }

                _value = value;
            }
        });
    }
}

interface Array<T> {
    pushIf(condition: boolean, value: T): Array<T>;
}

Array.prototype.pushIf = function<T>(condition: boolean, value: T): Array<T> {
    if (condition) {
        this.push(value);
    }

    return this;
}

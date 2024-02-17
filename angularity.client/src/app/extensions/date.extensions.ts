interface Date {
    addDays(days: number): Date;
    endOfMonth(): Date;
}

Date.prototype.addDays = function (days: number): Date {
    let date = new Date(this);
    date.setDate(date.getDate() + days);

    return date;
};

Date.prototype.endOfMonth = function (): Date {
    return new Date(this.getFullYear(), this.getMonth() + 1, 0);
};

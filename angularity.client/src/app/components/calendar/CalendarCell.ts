import "../../extensions/array.extensions";

export default class CalendarCell {
    constructor(date: Date, calendarMonth: number) {
        this._date = date;
        this._calendarMonth = calendarMonth;
    }

    private _date: Date;
    private _calendarMonth: number;

    public get date(): Date {
        return this._date;
    }

    private _dayOfMonth: number | null = null;

    public get dayOfMonth(): number {
        return this._dayOfMonth ??= this._date.getDate();
    }

    private _dayOfWeek: number | null = null;

    public get dayOfWeek(): number {
        return this._dayOfWeek ??= this._date.getDay();
    }

    private _isWeekend: boolean | null = null;

    public get isWeekend(): boolean {
        return this._isWeekend ??= [0, 6].includes(this._date.getDay());
    }

    private _isToday: boolean | null = null;

    public get isToday(): boolean {
        return this._isToday ??= this._date.setHours(0, 0, 0, 0) == new Date().setHours(0, 0, 0, 0);
    };

    private _isInCalendarMonth: boolean | null = null;

    public get isInCalendarMonth(): boolean {
        return this._isInCalendarMonth ??= this._date.getMonth() == this._calendarMonth;
    }

    private _isDisabled: boolean = false;

    public get isDisabled(): boolean {
        return this._isDisabled;
    }

    public set isDisabled(value: boolean) {
        this._isDisabled = value;
    }

    private _isSelected: boolean = false;

    public get isSelected(): boolean {
        return this._isSelected;
    }

    public set isSelected(value: boolean) {
        this._isSelected = value;
    }

    private _cellClass: string | null = null;

    public get cellClass(): string | null {
        return this._cellClass;
    }

    public set cellClass(value: string | null) {
        this._cellClass = value;
    }

    private _isClickable: boolean = false;

    public get isClickable(): boolean {
        return this._isClickable;
    }

    public set isClickable(value: boolean) {
        this._isClickable = value;
    }

    public get cellClassList(): string[] {
        let list: string[] = ["calendar-cell"];

        return list.pushIf(this.isWeekend, "weekend")
            .pushIf(this.isToday, "today")
            .pushIf(this.isInCalendarMonth, "current-month")
            .pushIf(!this.isInCalendarMonth, "different-month")
            .pushIf(this.isDisabled, "disabled")
            .pushIf(this.isSelected, "selected")
            .pushIf(this.isClickable, "clickable")
            .pushIf(!!this.cellClass, this.cellClass!);
    }
}

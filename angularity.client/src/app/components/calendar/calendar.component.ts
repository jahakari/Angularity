import { Component, Input, Output, OnInit, EventEmitter } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Range } from "../../decorators/Range";
import CalendarCell from "./CalendarCell";
import "../../extensions/date.extensions";

@Component({
    selector: "calendar",
    templateUrl: "./calendar.component.html",
    styleUrls: ["./calendar.component.css"],
    standalone: true,
    imports: [CommonModule]
})
export class CalendarComponent implements OnInit {
    @Input({ required: true })
    @Range(0, 11)
    month!: number;

    @Input({ required: true })
    @Range(1900, 2999)
    year!: number;

    @Input()
    cellModifier = (c: CalendarCell) => { };

    @Output()
    onCellClicked = new EventEmitter<CalendarCell>();

    _months: string[] = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    _weekdays: string[] = ["S", "M", "T", "W", "T", "F", "S"];
    _cells: CalendarCell[] = [];

    get monthName(): string {
        return this._months[this.month];
    }

    ngOnInit() {
        this.generateCells();
    }

    private modifyCell(cell: CalendarCell) {
        if (!!this.onCellClicked.observers.length) {
            cell.isClickable = true;
        }

        this.cellModifier(cell);
    }

    cellClicked(cell: CalendarCell) {
        this.onCellClicked.emit(cell);
    }

    refresh() {
        for (let cell of this._cells) {
            this.modifyCell(cell);
        }
    }

    generateCells() {
        let date = new Date(this.year, this.month);
        let days = date.getDay();

        date = date.addDays(-days);

        let end = new Date(this.year, this.month).endOfMonth();

        days = end.getDay();
        days = 6 - days;

        end = end.addDays(days);
        this._cells = [];

        for (; date <= end; date = date.addDays(1)) {
            let cell = new CalendarCell(date, this.month);
            this.modifyCell(cell);

            this._cells.push(cell);
        }
    }

    offsetMonth(offset: number) {
        let month = this.month;

        month += offset;

        if (month < 0) {
            this.month = 11;
            this.year--;
        } else if (month > 11) {
            this.month = 0;
            this.year++;
        } else {
            this.month = month;
        }

        this.generateCells();
    }
}

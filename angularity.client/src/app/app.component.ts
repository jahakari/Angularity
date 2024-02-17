import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherForecast } from './WeatherForecast';
import { BadgeComponent } from './components/badge.component';
import { CalendarComponent } from "./components/calendar/calendar.component";
import CalendarCell from './components/calendar/CalendarCell';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: true,
    imports: [CommonModule, BadgeComponent, CalendarComponent]
})
export class AppComponent implements OnInit {
    @ViewChild(CalendarComponent)
    calendar!: CalendarComponent;

    selectedDate: Date = new Date();

    public isLoading = false;
    public forecasts: WeatherForecast[] = [];

    constructor(private http: HttpClient) { }

    ngOnInit() {
        this.getForecasts();
    }

    getForecasts() {
        this.isLoading = true;

        this.http.get<WeatherForecast[]>('/weatherforecast')
            .subscribe({
                next: (w) => this.forecasts = w,
                error: (e) => console.log(e),
                complete: () => this.isLoading = false
            });
    }

    modifyCalendarCell = (cell: CalendarCell) => {
        if (cell.dayOfWeek == 1) {
            cell.cellClass = "monday";
        }

        cell.isSelected = (cell.date.getTime() == this.selectedDate?.getTime());
    }

    calendarCellClicked(cell: CalendarCell) {
        this.selectedDate = cell.date;
        this.calendar.refresh();
    }
}

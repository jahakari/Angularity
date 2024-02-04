import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherForecast } from './WeatherForecast';
import { BadgeComponent } from './components/badge.component';
import { CalendarComponent } from "./components/calendar/calendar.component";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: true,
    imports: [CommonModule, BadgeComponent, CalendarComponent]
})
export class AppComponent implements OnInit {
    public isLoading: boolean = false;
    public forecasts: WeatherForecast[] = [];

    constructor(private http: HttpClient) { }

    ngOnInit() {
        this.getForecasts();
    }

    async getForecasts() {
        this.isLoading = true;

        this.http.get<WeatherForecast[]>('/weatherforecast')
            .subscribe({
                next: (w) => this.forecasts = w,
                error: (e) => console.log(e),
                complete: () => this.isLoading = false
            });
    }
}

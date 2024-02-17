
export interface WeatherForecast {
    date: string;
    temperatureC: number;
    temperatureF: number;
    summary: WeatherSummary
}

interface WeatherSummary {
    description: string,
    theme: string
}

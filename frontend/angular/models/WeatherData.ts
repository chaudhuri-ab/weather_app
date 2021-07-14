export interface WeatherData{
    lat: string,
    lon: string,
    weatherDescription: string,
    weatherIcon: string,
    currentTemp: number,
    tempDescription: string
    alerts: any[]
}
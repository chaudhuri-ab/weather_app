import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http:HttpClient) { }

  /**
   * Request API server for weather data based on longitude and latitude
   * provided
   * @param lat - latitude
   * @param lon - longitude
   * returns WeatherData or 
   */
  getWeatherData(lat: number, lon: number){
    return this.http.get('/api/', { params: {lat: lat, lon: lon}});    
  }
}

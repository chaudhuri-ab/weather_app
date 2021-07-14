import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { WeatherData } from 'models/WeatherData';
import { WeatherService } from 'src/app/services/weather-service.service';
import { GPS_CoordinatesValidator } from './gps-coordinates.validator';

@Component({
  selector: 'weather-report',
  templateUrl: './weather-report.component.html',
  styleUrls: ['./weather-report.component.css']
})
export class WeatherReportComponent implements OnInit {

  //HTML Element Visibility Flags & Value Variable
  weatherReportVisible = false;
  apiSpinnerVisible = false;
  apiErrorVisible = false;
  apiErrorMessage = "";

  //

  weatherData = {} as WeatherData;
  //

  form = new FormGroup(
    {
      lat: new FormControl('30.3119', 
      [
        Validators.required,
        GPS_CoordinatesValidator.validLattitude
      ]),
      lon: new FormControl('-95.4561',
      [
        Validators.required,
        GPS_CoordinatesValidator.validLongitude
      ])

    } 
  )

  get lat(){
    return this.form.get("lat");
  }

  get lon(){
    return this.form.get("lon");
  }

  

  constructor(private weatherService: WeatherService) { 


  }

  submit(){

    //Update UI to Initiate API Req State
    this.weatherReportVisible = false;
    this.apiSpinnerVisible = true;
    this.apiErrorVisible = false;
    //

    this.weatherService.getWeatherData(this.lat?.value, this.lon?.value).subscribe(
      data => {
        console.log(data);
        this.weatherData = data as WeatherData;
        this.weatherReportVisible = true;

      },
      err => {
        console.log(err);
        if(err?.status == 502 && err?.error?.message){
          this.apiErrorMessage = err?.error?.message;
        }else{
          this.apiErrorMessage = "Server Failed To Respond";
        }
        this.apiErrorVisible = true;

      }
    ).add(() => {
        console.log("done");
        //Update UI to End API Req State
        this.apiSpinnerVisible = false;
        //
      }
      
    )



  }

  ngOnInit(): void {
  }

}

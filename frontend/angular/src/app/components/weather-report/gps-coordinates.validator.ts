import { AbstractControl, ValidationErrors } from "@angular/forms";


export class GPS_CoordinatesValidator{
    static validLatitude(control:AbstractControl) : ValidationErrors | null{
        let lat = Number(control.value);
        if(lat != NaN && lat >= -90 && lat <= 90){
            return null;
        }else{
            return {invalidLat: true};
        }
    } 

    static validLongitude(control:AbstractControl) : ValidationErrors | null{
        let lon = Number(control.value);
        if(lon != NaN && lon >= -180 && lon <= 180){
            return null;
        }else{
            return {invalidLon: true};
        }
    } 
}
const express = require("express");
const https = require('https')
const formatter = require("../../shared_modules/formatting");



const router = express.Router();
var errorResponseMessage = {message: ""};



/**
 *  Get current weather information and alerts for client request
 */

router.get("/", (req, res) => {
    
    //Validate Input
    if(
        req.query.lon == undefined 
        || req.query.lat == undefined
        || req.query.lat < -90
        || req.query.lat > 90
        || req.query.lon < -180
        || req.query.lon > 180    
    ){

        //Invalid Longitude & Latitude
        errorResponseMessage.message = "Invalid Longitude and/or Latitude"
        res.status(400).json(errorResponseMessage);
        return;
    }

    
    //Get Lon & Lat From query
    let lon = req.query.lon;
    let lat = req.query.lat;
    const appID = "47e9e5bb0bb6ed51f76626fe94c5f32e";

    //Construct Open Weather URL
    let openWeatherURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${appID}&units=imperial&exclude=hourly,daily,minutely`
   

    //Properly Handle JSON Resp
    const openWeatherReq = https.get(
        openWeatherURL, openWeatherRes => {
        
        openWeatherRes.on('data', d => {
            let jsonData;
            try{
                jsonData = JSON.parse(d);
            }catch(error){
                errorResponseMessage.message = "Bad Server Response. Please Try Again"
                res.status(502).json(errorResponseMessage);
                return;
            }

            //Make Sure Critical Data is Present
            if( 
                jsonData?.current?.weather == undefined
                || jsonData.current.weather.length == 0
                || jsonData.current.weather[0]?.description == undefined
                || jsonData.current?.temp == undefined
            ){
                //Open Weather API Failed
                console.log(jsonData);
                let errMessage = jsonData?.message ? jsonData.message : "Bad Server Response. Please Try Again"; 
                errorResponseMessage.message = formatter.capFirstLetter(errMessage);
                res.status(502).json(errorResponseMessage);
                return;
            }

            //Create Temp Description - Based on temp ranges I use to decide what insulation level to wear on a motorcycle
            let currentTemp = Math.round(jsonData.current.temp);
            let tempDescription = ""

            if(currentTemp <= 32){
                tempDescription = "Freezing Cold";
            }else if(currentTemp > 32 && currentTemp <= 45){
                tempDescription = "Cold";
            }else if(currentTemp > 45 && currentTemp <= 65){
                tempDescription = "Slightly Cold";
            }else if(currentTemp > 65 && currentTemp <= 77){
                tempDescription = "Warm";
            }else if(currentTemp > 77 && currentTemp <= 89){
                tempDescription = "Hot";
            }else if(currentTemp > 89 && currentTemp <= 100){
                tempDescription = "Very Hot"
            }else{
                tempDescription = "Extremely Hot"
            }

            //Create JSON Response Object & Return to Client
            let responseJSON = {
                lat: lat,
                lon: lon,
                weatherDescription: formatter.capFirstLetter(jsonData.current.weather[0].description),
                weatherIcon: jsonData.current.weather[0]?.icon,
                currentTemp: currentTemp,
                tempDescription: tempDescription,
                alerts: jsonData?.alerts ? jsonData?.alerts : []
            }

            res.json(responseJSON);            
        })
    });
    
    //Set Up Error Event Listener
    openWeatherReq.on('error', error => {
        console.error("Err " + error)

        //Open Weather API Failed
        errorResponseMessage.message = "Service Not Available. Please Try Again"
        res.status(502).json(errorResponseMessage);
    })
    
    //Flush Request To OpenWeather
    openWeatherReq.end()
      
})



module.exports = router;


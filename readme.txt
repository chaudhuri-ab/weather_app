PROBLEM STATEMENT:

    Weather Service Assignment / Project

    Write an http server that uses the Open Weather API that exposes an endpoint that takes in lat/long coordinates. 

    This endpoint should return what the weather condition is outside in that area:
        - (snow, rain, etc)
        - whether it’s hot, cold, or moderate outside (use your own discretion on what temperature equates to each type)
        - whether there are any weather alerts going on in that area, with what is going on if there is currently an active alert. 
        
        
        
    The API can be found here: https://openweathermap.org/api. 

    The one-call api returns all of the data while the other apis are piece-mealed sections. You may also find the https://openweathermap.org/faq useful.



RUN INSTRUCTIONS:
    Note you will need to install:
        - node - https://nodejs.org/en/download/
        - angular cli: npm install -g @angular/cli

    
    - clone the respo 

    - cd into project root directory

    - run: npm install

    - cd into frontend/angular

    - run npm install

    - run ng build --prod

    - cd into project root directory

    - run: node index.js

    - Now you will have a node server listening on port 3000 on localHost

    - Open a browser and navigate to: http://localhost:3000

    - Enter a valid Longitude and Lattitude (e.g. lat=30.3119&lon=95.4561 for Conroe, TX). The application should query the API server and then the API server will query the OpenWeather API.

    
ISSUES:
    - It seems like the start and end date on alerts were always UNIX timestamps from 1970 so I ommitted them.


NOTES AND REFERENCES:
    - FAQ Long/Lat: https://journeynorth.org/tm/LongitudeIntro.html:
        - Longitude Range = -180 to 180 (neg is West)
        - Lattitude Range = -90 to 90   (neg is South)

    - Sample Data Conroe, TX: https://api.openweathermap.org/data/2.5/onecall?lat=30.3119&lon=-95.4561&appid=47e9e5bb0bb6ed51f76626fe94c5f32e&units=imperial&exclude=hourly,daily,minutely
        - Relevant Values
            - Rain/Snow/ETC
                - current.weather[0].main
                - current.weather[0].description

            - Feels Hot Or Cold = current.temp

            - Alerts = alerts[0].description


    - This api will take in the following URL parameters
        - lon
        - lat


SAMPLE OPENWEATHER DATA:

    NYC 
    weatherData:WeatherData =
    {
    "lat": "40.7128",
    "lon": "-74.0060",
    "weatherDescription": "Clear Sky",
    "weatherIcon": "01d",
    "currentTemp": 81,
    "tempDescription": "Hot",
    "alerts": [
        {
            "sender_name": "NWS New York City - Upton (Long Island and New York City)",
            "event": "Marine Weather Statement",
            "start": 1626299880,
            "end": 1626307200,
            "description": "... STRONG THUNDERSTORMS APPROACHING THE WATERS...\nThe areas affected include...\nSandy Hook NJ to Fire Island Inlet NY out 20 NM...\nNew York Harbor...\nAt 630 PM EDT, Doppler radar indicated strong thunderstorms, capable\nof producing winds to around 30 knots. The thunderstorms were\ncentered about 12 nm southwest of Cliffwood Beach, moving east at 25\nknots.",
            "tags": [
                "Marine event"
            ]
        }
    ]
    }

    Sample Doc Data
     weatherData:WeatherData = {
    "lat": "30.3119",
    "lon": "-95.4561",
    "weatherDescription": "Scattered Clouds",
    "weatherIcon": "03d",
    "currentTemp": 82,
    "tempDescription": "Hot",
    "alerts": [
      {
        "sender_name": "NWS Tulsa",
        "event": "Heat Advisory",
        "start": 1597341600,
        "end": 1597366800,
        "description": "...HEAT ADVISORY REMAINS IN EFFECT FROM 1 PM THIS AFTERNOON TO\n8 PM CDT THIS EVENING...\n* WHAT...Heat index values of 105 to 109 degrees expected.\n* WHERE...Creek, Okfuskee, Okmulgee, McIntosh, Pittsburg,\nLatimer, Pushmataha, and Choctaw Counties.\n* WHEN...From 1 PM to 8 PM CDT Thursday.\n* IMPACTS...The combination of hot temperatures and high\nhumidity will combine to create a dangerous situation in which\nheat illnesses are possible."
      },
      {
        "sender_name": "NWS TX",
        "event": "Storm Advisory",
        "start": 1597341600,
        "end": 1597366800,
        "description": "...HEAT ADVISORY REMAINS IN EFFECT FROM 1 PM THIS AFTERNOON TO\n8 PM CDT THIS EVENING...\n* WHAT...Heat index values of 105 to 109 degrees expected.\n* WHERE...Creek, Okfuskee, Okmulgee, McIntosh, Pittsburg,\nLatimer, Pushmataha, and Choctaw Counties.\n* WHEN...From 1 PM to 8 PM CDT Thursday.\n* IMPACTS...The combination of hot temperatures and high\nhumidity will combine to create a dangerous situation in which\nheat illnesses are possible."
      }
    ]
}
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
        - angular cli (Only if you want to generate dist files for frontend): npm install -g @angular/cli

    
    - cd into project root directory

    - run: npm install

    - cd into frontend/angular

    - run npm install

    - run npm build

    - cd into project root directory

    - run: node index.js

    - Now you will have a node server listening on port 3000 on localHost

    - Open a browswer and navigate to: http://localhost:3000/api?lat=30.3119&lon=95.4561

    - You will see the raw response for weather data in Conroe, Texas

    



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




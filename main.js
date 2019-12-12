/*const clear - giedra; =
const isolated-clouds - mažai debesuota; =
const scattered-clouds - debesuota su pragiedruliais; =
const overcast - debesuota; =
const light-rain - nedidelis lietus; =
const moderate-rain - lietus; =
const heavy-rain - smarkus lietus; =
const sleet - šlapdriba; =
const light-snow - nedidelis sniegas; =
const moderate-snow - sniegas; =
const heavy-snow - smarkus sniegas; =
const fog - rūkas; =
const na - oro sąlygos nenustatytos. =
const windArrow =
*/

//------------------Visos galimos oro salygu ikonos-----------------------------//
let weatherIcons = {
            clear: "wi wi-day-sunny",
            isolatedClouds: "wi wi-day-sunny",
            scatteredClouds: "wi wi-day-cloudy",
            overcast: "wi wi-cloudy",
            lightRain: "wi wi-day-sprinkle",
            moderateRain: "wi wi-day-showers",
            heavyRain: "wi wi-day-rain",
            sleet: "wi wi-day-sleet",
            lightSnow: "wi wi-day-snow",
            moderateSnow: "wi wi-day-snow-wind",
            heavySnow: "wi wi-day-snow-thunderstorm",
            fog: "wi wi-day-fog"
        };

    // other:
    //     {
    //         na: "wi-na",
    //         degreeSymbol: "wi-degrees",
    //         raindropSymbol: "wi-raindrops",
    //         weatherIconClass: 'wi'
    //     }


//----------------------pasiimu duomenis-----------------------//

async function getData(city) {
    let url = 'https://api.meteo.lt/v1/places/' + city + '/forecasts/long-term';
    let response = await fetch(url);
    return await response.json();
}


async function showData() {
    const data = await getData('Kaunas');
    let initialTime = new Date(data['forecastTimestamps'][0]['forecastTimeUtc']);

    async function weatherIcon(conditionCode) {
        // let conditionCode = data.forecastTimestamps[i].conditionCode;
        // if ((newHour.getHours() >6)&&(newHour.getHours() <21)) {
        //      var timeOfDay = weatherIcons.day}
        //     else { var timeOfDay = weatherIcons.night

        switch (conditionCode) {
            case ('clear'):
                return weatherIcons.clear;
            case ('isolated-clouds'):
                return weatherIcons.isolatedClouds;
            case ('scattered-clouds'):
                return weatherIcons.scatteredClouds;
            case ('overcast'):
                return weatherIcons.overcast;
            case ('light-rain'):
                return weatherIcons.lightRain;
            case ('moderate-rain'):
                return weatherIcons.moderateRain;
            case ('heavy-rain'):
                return weatherIcons.heavyRain;
            case ('sleet'):
                return weatherIcons.sleet;
            case ('light-snow'):
                return weatherIcons.lightSnow;
            case ('moderate-snow'):
                return weatherIcons.moderateSnow;
            case ('heavy-snow'):
                return weatherIcons.heavySnow;
            case ('fog'):
                return weatherIcons.fog;
            // default:
            //     return weatherIcons.other.na;
        }
    }


    //--------------išsiivesti septynias dienas--------//
    console.log(data['forecastTimestamps'].length)
     let allWeatherData = [];
     for (let i = 0; i<data['forecastTimestamps'].length; i++) {
         let newHour = new Date(data.forecastTimestamps[i].forecastTimeUtc);
         allWeatherData[i] = data.forecastTimestamps[i];
         let day = newHour.getDate();
         console.log(day);

         // newHour.getDate() = day1




     }



    //-------išsivedu konkrečia temperatūrą-------//
    const hours = document.querySelector(".hours");
    console.log(data.forecastTimestamps[0].forecastTimeUtc);
    let weatherData = [];
    for (let i = 0; i < 24; i++) {
        weatherData[i] = data.forecastTimestamps[i];

        //------------Reikalingi kintamieji-------------------//


        //---------------kuriu stulpelį--------------------------//

        const whatHour = document.createElement("div");
        hours.appendChild(whatHour);
        whatHour.className = "col hour";

        //-------------------Pridedu valandas------//
        let newHour = new Date(data.forecastTimestamps[i].forecastTimeUtc);
        let time = document.createElement('div');
        whatHour.appendChild(time);
        time.className = 'row time';
        time.innerText = newHour.getHours() + ":00";

        //---------------Pridedu condition ikoną-- naudoti switch--------//

        let icons = document.createElement('div');
        whatHour.appendChild(icons);
        icons.className = "row icons";
        let icon = document.createElement('i');
        icons.appendChild(icon);
        icon.className = await weatherIcon(weatherData[i]['conditionCode'])
        // icon.className = weatherIcon();


        //--------------Pridedu laipsius-----------------//

        let temp = document.createElement("div");
        whatHour.appendChild(temp);
        temp.className = "row temperature";
        temp.innerText = data.forecastTimestamps[i].airTemperature + " °";

        //-------------------Kritulių kiekis--------------------------//


        let percipitation = document.createElement("div");
        whatHour.appendChild(percipitation);
        percipitation.className = "row howMuchRain";
        percipitation.innerText = data.forecastTimestamps[i].totalPrecipitation + " mm";

        //---------------------Vėjo stiprumas-----------------------------//
        let wind = document.createElement("div");
        whatHour.appendChild(wind);
        wind.className = "row windSpeed";
        wind.innerText = data.forecastTimestamps[i].windSpeed + " m/s";


        //----------------------Vėjo kryptis-------------------------------//
        let windDirection = document.createElement("div");
        whatHour.appendChild(windDirection);
        wind.className = "row windDirection";
        let windDirIcon = document.createElement("i");
        windDirection.appendChild(windDirIcon);
        let degree = data.forecastTimestamps[i].windDirection;
        windDirIcon.className = "wi wi-wind from-" + degree + "-deg"



    }
}

showData()
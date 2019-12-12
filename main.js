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
    day:
        {
            clear: "wi-day-sunny",
            isolatedClouds: "wi-day-sunny",
            scatteredClouds: "wi-day-cloudy",
            overcast:"wi-cloudy",
            lightRain: "wi-day-sprinkle",
            moderateRain: "wi-day-showers",
            heavyRain: "wi-day-rain",
            sleet: "wi-day-sleet",
            lightSnow: "wi-day-snow",
            moderateSnow: "wi-day-snow-wind",
            heavySnow: "wi-day-snow-thunderstorm",
            fog: "wi-day-fog"
        },
    night:
        {
            clear: "wi-night-clear",
            isolatedClouds: "wi-night-alt-partly-cloudy",
            scatteredClouds: "wi-night-alt-cloudy",
            overcast: "wi-cloudy",
            lightRain: "wi-night-alt-sprinkle",
            moderateRain: "wi-night-alt-showers",
            heavyRain: "wi-night-alt-rain",
            sleet: "wi-night-alt-sleet",
            lightSnow: "wi-night-alt-snow",
            moderateSnow: "wi-night-alt-snow-wind",
            heavySnow: "wi-night-alt-snow-thunderstorm",
            fog: "wi-night-alt-fog"
        },
    other:
        {
            na: "wi-na",
            degreeSymbol: "wi-degrees",
            raindropSymbol: "wi-raindrops",
            weatherIconClass: 'wi'
        }
};
//----------------------pasiimu duomenis-----------------------//

async function getData(city) {
    let url = 'https://api.meteo.lt/v1/places/' + city + '/forecasts/long-term';
    let response = await fetch(url);
    return await response.json();
}


async function showData() {
    const data = await getData('Kaunas');
    let initialTime = new Date(data['forecastTimestamps'][0]['forecastTimeUtc']);
    let day = initialTime.getDate();
    console.log(day)

    //-------išsivedu konkrečia temperatūrą-------//
    let weatherData = [];
    const hours = document.querySelector(".hours")
    console.log(data.forecastTimestamps[0].forecastTimeUtc)
    for (let i = 0; i < 24; i++)  {
        weatherData [i] = data.forecastTimestamps[i];

        //------------Reikalingi kintamieji-------------------//

        let newHour = new Date(data.forecastTimestamps[i].forecastTimeUtc);

        //---------------kuriu stulpelį--------------------------//

        const whatHour = document.createElement("div");
        hours.appendChild(whatHour);
        whatHour.className = "col hour";

        //-------------------Pridedu valandas------//

        let time = document.createElement('div');
        whatHour.appendChild(time);
        time.className = 'row time';
        time.innerText = newHour.getHours() +":00";

        //---------------Pridedu condition ikoną-- naudoti switch--------//

        



        //--------------Pridedu laipsius-----------------//

        let temp = document.createElement("div");
        whatHour.appendChild(temp);
        temp.className = "row temperature";
        temp.innerText = data.forecastTimestamps[i].airTemperature +" °";

        //-------------------Kritulių kiekis--------------------------//


        let percipitation = document.createElement("div")
        whatHour.appendChild(percipitation)
        percipitation.className = "row howMuchRain"
        percipitation.innerText = data.forecastTimestamps[i].totalPrecipitation +" mm"

        //---------------------Vėjo stiprumas-----------------------------//
        let wind = document.createElement("div")
        whatHour.appendChild(wind)
        wind.className = "row windSpeed"
        wind.innerText = data.forecastTimestamps[i].windSpeed +" m/s"


        //----------------------Vėjo kryptis-------------------------------//
        let windDirection = document.createElement("div")
        whatHour.appendChild(windDirection)
        wind.className = "row windDirection"
        let windDirIcon  = document.createElement("i")
        windDirection.appendChild(windDirIcon)
        let degree = data.forecastTimestamps[i].windDirection
        windDirIcon.className = "wi wi-wind from-" +degree+ "-deg"


    }
    
    function weatherIcon() {

            let icon = document.createElement('i');
            let conditionCode = data.forecastTimestamps[i].conditionCode;


            let timeOfDay = day ? weatherIcons.day : weatherIcons.night;
            switch (conditionCode) {
                case (conClear):
                    return timeOfDay.clear;
                case (conIsolatedClouds):
                    return timeOfDay.isolatedClouds;
                case (conScatteredClouds):
                    return timeOfDay.scatteredClouds;
                case (conOvercast):
                    return timeOfDay.overcast;
                case (conLightRain):
                    return timeOfDay.lightRain;
                case (conModerateRain):
                    return timeOfDay.moderateRain;
                case (conHeavyRain):
                    return timeOfDay.heavyRain;
                case (conSleet):
                    return timeOfDay.sleet;
                case (conLightSnow):
                    return timeOfDay.lightSnow;
                case (conModerateSnow):
                    return timeOfDay.moderateSnow;
                case (conHeavySnow):
                    return timeOfDay.heavySnow;
                case (conFog):
                    return timeOfDay.fog;
                default:
                    return weatherIcons.other.na;
            }
        }


    }


}

showData()
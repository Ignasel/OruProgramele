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
        percipitation.innerText = data.forecastTimestamps[i].windSpeed +" m/s"


        //----------------------Vėjo kryptis-------------------------------//


        https://iconify.design/icon-sets/wi/wind-direction-s.html -- Erick flowers (Google)

    }


}

showData()
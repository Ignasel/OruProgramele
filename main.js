

async function getData(city){
    let url = 'https://api.meteo.lt/v1/places/'+city+'/forecasts/long-term';
    let response = await fetch(url);
    return await response.json();
}

async function showData() {
    const data = await getData('Kaunas');
    let date = new Date(data['forecastTimestamps'][0]['forecastTimeUtc']).getTime();
   // - ilgis masyvo console.log(data['forecastTimestamps'].length)
   //  console.log(date);
   //  console.log(data.forecastTimestamps[3])

    let initialTime = new Date(data['forecastTimestamps'][0]['forecastTimeUtc']);
    let day = initialTime.getDate();
    console.log(day)

    //-------išsivedu konkrečia temperatūrą-------//
    let weatherData = [];
    const hours = document.querySelector(".hours")
    console.log(data.forecastTimestamps[0].forecastTimeUtc)
    for(let i=0; i<24; i++) {
        weatherData [i] = data.forecastTimestamps[i];

        //---------------kuriu stulpelį--------------------------//

        const whatHour = document.createElement("div")
        hours.appendChild(whatHour)
        whatHour.className = "col-1 hour";

        let time = document.createElement('div');
        whatHour.appendChild(time);
        time.className = 'row time';
        time.innerText = data.forecastTimestamps[i].forecastTimeUtc
        let temp = document.createElement("div")
        whatHour.appendChild(temp)
        temp.className = "row temperature"
        temp.innerText = data.forecastTimestamps[i].airTemperature
    }
    console.log(weatherData.airTemperature)
    for(weatherItem of weatherData){
           for(ItemValue in weatherItem) {
              // console.log(data.forecastTimestamps[weatherItem].airTemperature)
           }
           }



    // for (let i = 0; i < data['forecastTimestamps'].length ; i++) {
    //     console.log(data['forecastTimestamps'][i]['forecastTimeUtc'])
    // }





//     let weather;
//     const fetchWeather = async () => {
//         weather = await fetch(
//             'https://api.meteo.lt/v1/places/kaunas/forecasts/long-term'
//         ).then(res => res.json());
//     };
//     const showWeather = async () => {
// // getting the weather data from api
//         await fetchWeather();
//         const weatherItems = weather.forecastTimestamps;
//         const weatherUiItems = document.querySelector('ul');
//         let weatherData = [];
//         for(weatherItem in weatherItems){
//             weatherData [weatherItem] = weatherItems[weatherItem];
// //console.log(weatherItems[weatherItem].forecastTimeUtc)
//         }
//         for(weatherItem of weatherData){
//             for(ItemValue in weatherItem){
//                 const li = document.createElement('li');
//                 li.textContent = ItemValue+':'+weatherItem[ItemValue];
//                 document.querySelector('ul').appendChild(li);
//             }
//         }
//     }
//     showWeather()
//     }
//
//
//     await showWeather()




        // for (let hours of date['forecastTimestamps']) {
        //     if (!dayTime) {
        //         let hourTime = new Date(hour['forecastTimeUtc'])
        //         dayTime = hourTime.getDate();
        //         dayData = await filterDataByDate(data, dayTime);
        //     }
        // }

    // let temperature = data['forecastTimestamps'][10]['airTemperature']
    // console.log(temperature)
    //
    // for (let i=0; i<data['forecastTimestamps'].length; i++){
    //     console.log(data['forecastTimestamps'][i]['airTemperature'])

    //







    // let tempNow = (data['forecastTimestamps'][10]['airTemperature']);
    // console.log(tempNow)
    //
    // console.log(date)
    // let dayData = data['forecastTimestamps'].filter(item => new Date(item['forecastTimeUtc']).getDate() === date);
    // console.log(dayData)




    // for (let hours of dayData){
    //     console.log(hours)
    // }


    // for (let rows of data['forecastTimestamps']) {
    //     console.log(rows['ForecastTimeUtc'])
    //
    // }
}
showData()
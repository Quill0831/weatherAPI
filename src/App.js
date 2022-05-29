import React, { useEffect, useState ,useCallback, useMemo , } from 'react'
import "./style/style.css"


import WeatherIcon from "./WeatherIcon.js";
import sunriseAndSunsetData from "./sunrise-sunset.json"

import loading from './img/loading.svg'

import WeatherSetting from './WeatherSetting'

import WeatherCard from './WeatherCard';
import useWeatherApi from './useWeatherApi';
import { findLocation } from './utils.js';










//sunrice and sunset part



// const fetchCurrentWeather =() =>{
//   return fetch(

//        "https://opendata.cwb.gov.tw/api/v1/rest/datastore/O-A0001-001?Authorization=CWB-9C38AE78-2A42-4C59-8257-2DD3BDCDA583&stationId=C0AI30,string"
//    )
//    .then((response) => response.json())
//    .then((data) =>{
//      const locationData = data.records.location[0];

//      const weatherElements = locationData.weatherElement.reduce(
//        (neededElements, item) => {
//          if (['WDSD', 'TEMP', 'HUMD'].includes(item.elementName)) {
//            neededElements[item.elementName] = item.elementValue;
//          }
//          return neededElements;
//        },
//        {}
//      );
//      return {
 
//        observationTime: locationData.time.obsTime,
//        locationName: locationData.locationName,
//        description: '多雲時晴',
//        temperature: weatherElements.TEMP,
//        windSpeed: weatherElements.WDSD,
//        humid: weatherElements.HUMD,
//      };
     
//    })
//  }


// const fetchWeatherForecast = () => {

 

  
//   return fetch(
//     'https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=CWB-9C38AE78-2A42-4C59-8257-2DD3BDCDA583'
//   )
//   .then((response)=> response.json())
//   .then((data) =>  {


//     const locationData = data.records.location[0];
//     const weatherElements = locationData.weatherElement.reduce(
//       (neededElements, item) => {
//         if (['Wx', 'PoP', 'CI'].includes(item.elementName)) {
//           neededElements[item.elementName] = item.time[0].parameter;
//         }
      
//         return neededElements;
  
  
  
//   },{});
//   return {
    
//     description: weatherElements.Wx.parameterName,
//     weatherCode: weatherElements.Wx.parameterValue,
//     rainPossibility: weatherElements.PoP.parameterName,
//     comfortability: weatherElements.CI.parameterName,
//   };
// });

// }

const getMoment = (locationName) =>{
  const location = sunriseAndSunsetData.find(
    (data) => data.locationName === locationName,
  );


  if(!location) return null;

  const now = new Date();

  const nowDate = Intl.DateTimeFormat('zh-TW', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
    .format(now)
    .replace(/\//g, '-');


    const locationDate =
    location.time && location.time.find((time) => time.dataTime === nowDate);

    const sunriseTimestamp = new Date(
      `${locationDate.dataTime} ${locationDate.sunrise}`,
    ).getTime();
    const sunsetTimestamp = new Date(
      `${locationDate.dataTime} ${locationDate.sunset}`,
    ).getTime();
    const nowTimeStamp = now.getTime();

  
    // STEP 8：若當前時間介於日出和日落中間，則表示為白天，否則為晚上
    
    return sunriseTimestamp <= nowTimeStamp && nowTimeStamp <= sunsetTimestamp
      ? 'day'
      : 'night';
     

    
  };



const App = () => {

const storageCity = localStorage.getItem("cityName");

const [currentCity, setCurrentCity] = useState(storageCity || '臺北市');
const currentLocation = findLocation(currentCity) || {};




const [weatherElement, fetchData] = useWeatherApi(currentLocation);
const [currentTheme, setCurrentTheme] = useState('light');
const [currentPage , setCurrentPage] = useState('WeatherCard');


 const moment = useMemo(() => getMoment(currentLocation.sunriseCityName), [
  currentLocation.sunriseCityName,
]);

  useEffect(() => {
    setCurrentTheme(moment === 'day' ? 'light' : 'dark');
  }, [moment]);

  useEffect(() => {
    localStorage.setItem('cityName', currentCity);
  }, [currentCity]);


  return (
 
    <div className='page'>

  {currentPage === 'WeatherCard' && (
          <WeatherCard
            cityName={currentLocation.cityName}
            weatherElement={weatherElement}
            moment={moment}
            fetchData={fetchData}
            setCurrentPage={setCurrentPage}
          />
        )}


        {currentPage === 'WeatherSetting' && (
          <WeatherSetting 
          cityName={currentLocation.cityName}
          setCurrentCity={setCurrentCity}
          setCurrentPage={setCurrentPage} />
        )}
  {console.log(currentCity)}
 
  
    </div>


  )
}

export default App
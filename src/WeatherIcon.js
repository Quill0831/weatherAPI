import React, { useEffect, useMemo, useState } from 'react'
import nightclear from './img/nightclear.svg'
import daythunderstorm from './img/daythunderstorm.svg'
import dayclear from './img/dayclear.svg'
import dayfog from './img/dayfog.svg'
import daycloudy from './img/daycloudy.svg'
import daycloudyfog from './img/daycloudyfog.svg'
import daypartiallyclearwithrain from './img/daypartiallyclearwithrain.svg'
import daysnowing from './img/daysnowing.svg'

import nightthunderstorm from './img/nightthunderstorm.svg'
import nightcloudyfog from './img/nightcloudyfog.svg'
import nightcloudy from './img/nightcloudy.svg'
import nightfog from './img/nightfog.svg'
import nightpartiallyclearwithrain from './img/nightpartiallyclearwithrain.svg'
import nightsnowing from './img/nightsnowing.svg'



const weatherTypes = {
  isThunderstorm: [15, 16, 17, 18, 21, 22, 33, 34, 35, 36, 41],
  isClear: [1],
  isCloudyFog: [25, 26, 27, 28],
  isCloudy: [2, 3, 4, 5, 6, 7],
  isFog: [24],
  isPartiallyClearWithRain: [
    8, 9, 10, 11, 12,
    13, 14, 19, 20, 29, 30,
    31, 32, 38, 39,
  ],
  isSnowing: [23, 37, 42],
};

const weatherIcons = {
  day: {
    isThunderstorm: <img src={daythunderstorm} alt="" className='weatherDescription'/>,
    isClear: <img  src={dayclear} alt="" className='weatherDescription'/>,
    isCloudyFog: <img  src={daycloudyfog} alt="" className='weatherDescription'/>,
    isCloudy: <img  src={daycloudy} alt="" className='weatherDescription'/>,
    isFog: <img  src={dayfog} alt="" className='weatherDescription'/>,
    isPartiallyClearWithRain: <img  src={daypartiallyclearwithrain} alt="" className='weatherDescription'/>,
    isSnowing: <img  src={daysnowing} alt="" className='weatherDescription'/>,
  },
  night: {
    isThunderstorm: <img src={nightthunderstorm} alt="" className='weatherDescription'/>,
    isClear: <img src={nightclear} alt="" className='weatherDescription'/>,
    isCloudyFog: <img src={nightcloudyfog} alt="" className='weatherDescription'/>,
    isCloudy: <img src={nightcloudy} alt="" className='weatherDescription'/>,
    isFog: <img src={nightfog} alt="" className='weatherDescription'/>,
    isPartiallyClearWithRain: <img src={nightpartiallyclearwithrain} alt="" className='weatherDescription'/>,
    isSnowing: <img src={nightsnowing} alt="" className='weatherDescription'/>,
  },
};

const weatherCode2Type = weatherCode =>
  Object.entries(weatherTypes).reduce(
    (currentWeatherType, [weatherType, weatherCodes]) =>
      weatherCodes.includes(Number(weatherCode))
        ? weatherType
        : currentWeatherType,
    '',
  );



const WeatherIcon = ({currentWeatherCode, moment}) => {

const [currentWeatherIcon , setCurrentWeatherIcon] = useState('isClear');


const theWeatherIcon = useMemo(() => weatherCode2Type(currentWeatherCode),
[
  currentWeatherCode,
]);

useEffect(() => {

  setCurrentWeatherIcon(theWeatherIcon);

}, [theWeatherIcon]);


  return (

    
    <div className='weatherIcon'>
       
 {weatherIcons[moment][currentWeatherIcon]}

    </div>
    
  )
}

export default WeatherIcon;
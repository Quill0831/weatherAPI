import React from 'react'
import WeatherIcon from './WeatherIcon'
import loading from './img/loading.svg'


import cog from './img/cog.svg'

const WeatherCard = (props) => {

const { weatherElement, moment, fetchData , setCurrentPage  , cityName  } = props;

const {
    observationTime,

    temperature,
    windSpeed,
    description,
    weatherCode,
    rainPossibility,
    comfortability,
    isLoading,
  } = weatherElement;



  return (
    <div className='page'>
     


    <div  className='weatherCard'>
    <p className='locationName'>{cityName}</p>
    <img src={cog} alt=""  className='cogicon' onClick={()=> setCurrentPage('WeatherSetting')}/>
    <br />
     <p className='description'> {weatherElement.description} {weatherElement.comfortability}</p>
    
        <br />
                <div className='temperPort'>
                     <p className='temperature'>  {Math.round(weatherElement.temperature)}  </p>  <p> °C </p>
                      <WeatherIcon
                      className='WeatherIcon'
                      currentWeatherCode={weatherElement.weatherCode}
                      moment={moment || 'day'}
   
                       />

                </div>
                
          <br />
        <img src={require('./img/speed.png')} alt="wingspeed" className='icon' />{weatherElement.windSpeed} m/h
        <br />
        <img src={require('./img/humidity.png')} alt="rainPossibility" className='icon' /> {Math.round(weatherElement.rainPossibility)} %
        
        
        {weatherElement.isLoading ?  <img src={loading} alt="reset" className='button' onClick={fetchData} />
                                  :  <img src={require('./img/reset.png')} alt="reset" className='button' onClick={fetchData} />  
      }
          最後觀測時間:
        {new Intl.DateTimeFormat('zh-TW', {
          hour: 'numeric',
          minute: 'numeric',
        }).format(new Date(weatherElement.observationTime))}{' '}
        </div>
       
     

  
 </div>
  )
}

export default WeatherCard
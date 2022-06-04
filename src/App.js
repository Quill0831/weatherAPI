/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-filename-extension */
import React, { useEffect, useState, useMemo } from 'react';
import './style/style.css';
import sunriseAndSunsetData from './sunrise-sunset.json';
import WeatherSetting from './WeatherSetting';
import WeatherCard from './WeatherCard';
import useWeatherApi from './useWeatherApi';
import { findLocation } from './utils';

const getMoment = (locationName) => {
  const location = sunriseAndSunsetData.find(
    (data) => data.locationName === locationName,
  );

  if (!location) return null;

  const now = new Date();

  const nowDate = Intl.DateTimeFormat('zh-TW', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
    .format(now)
    .replace(/\//g, '-');

  const locationDate = location.time && location.time.find((time) => time.dataTime === nowDate);

  const sunriseTimestamp = new Date(
    `${locationDate.dataTime} ${locationDate.sunrise}`,
  ).getTime();
  const sunsetTimestamp = new Date(
    `${locationDate.dataTime} ${locationDate.sunset}`,
  ).getTime();
  const nowTimeStamp = now.getTime();

  return sunriseTimestamp <= nowTimeStamp && nowTimeStamp <= sunsetTimestamp
    ? 'day'
    : 'night';
};

function App() {
  const storageCity = localStorage.getItem('cityName');

  const [currentCity, setCurrentCity] = useState(storageCity || '臺北市');
  const currentLocation = findLocation(currentCity) || {};
  const [weatherElement, fetchData] = useWeatherApi(currentLocation);
  const [currentTheme, setCurrentTheme] = useState('light');
  const [currentPage, setCurrentPage] = useState('WeatherCard');
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
    <div className="page">

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
          setCurrentPage={setCurrentPage}
        />
      )}
    </div>
  );
}

export default App;

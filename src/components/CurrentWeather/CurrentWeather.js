import React from 'react';
import './CurrentWeather.css';

const CurrentWeather = ({ data, unit }) => {
  const temp = unit === 'c' ? data.main.temp : (data.main.temp * 9 / 5) + 32;
  const tempUnit = unit === 'c' ? '°C' : '°F';

  return (
    <div className="current-weather">
      <h2>{data.name}</h2>
      <div className="weather-details">
        <div className="weather-temp">
          <h3>{Math.round(temp)}{tempUnit}</h3>
        </div>
        <div className="weather-description">
          <p>{data.weather[0].description}</p>
        </div>
        <div className="weather-icon">
          <img
            src={`https://openweathermap.org/img/wn/${data.weather[0].icon}.png`}
            alt="weather icon"
          />
        </div>
        <div className="additional-info">
          <p>Wind Speed : {data.wind.speed} m/s</p>
          <p>Humidity : {data.main.humidity}%</p>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;

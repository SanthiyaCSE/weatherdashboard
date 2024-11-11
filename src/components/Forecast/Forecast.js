import React from 'react';
import './Forecast.css';

function Forecast({ data, unit }) {
  const convertTemp = (temp) => {
    return unit === 'c'
      ? `${temp}°C`
      : `${(temp * 9) / 5 + 32}°F`;
  };

  return (
    <>
      <h3>5-Day Forecast</h3>
      <div className="forecast-container">
        {data.map((day, index) => (
          <div key={index} className="forecast-item">
            <p className="date">{day.date}</p>
            <div className="detail">
              <p className="temperature">{convertTemp(day.temp)},</p>
              <p className="description">{day.description}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Forecast;

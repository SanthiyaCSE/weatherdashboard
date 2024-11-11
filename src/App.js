import React, { useState } from 'react';
import axios from 'axios';
import SearchBar from './components/SearchBar/SearchBar';
import CurrentWeather from './components/CurrentWeather/CurrentWeather';
import Forecast from './components/Forecast/Forecast';
import logo from './assets/logo.png';
import './App.css';

const API_KEY = process.env.REACT_APP_API_KEY;

function App() {
  const [city, setCity] = useState('');
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [unit, setUnit] = useState('c');
  const [darkMode, setDarkMode] = useState(false);
  const [weatherAlerts, setWeatherAlerts] = useState([]);

  const fetchWeatherData = async (city) => {
    setLoading(true);
    setError('');
    setWeatherAlerts([]);

    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${unit}`
      );
      setCurrentWeather(response.data);
      if (response.data.alerts && response.data.alerts.length > 0) {
        setWeatherAlerts(response.data.alerts);
      }
    } catch (error) {
      setError('City not found');
    }

    setLoading(false);
  };

  const fetchForecastData = async (city) => {
    setLoading(true);
    setError('');

    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=${unit}`
      );
      const forecastData = response.data.list
        .filter((item, index) => index % 8 === 0)
        .map((item) => ({
          date: new Date(item.dt * 1000).toLocaleDateString(),
          temp: item.main.temp.toFixed(1),
          description: item.weather[0].description,
        }));
        

      setForecast(forecastData.slice(0, 5));
    } catch (error) {
      setError('Error fetching forecast data');
    }

    setLoading(false);
  };
  const handleSearch = (city) => {
    setCity(city);
    setCurrentWeather(null);
    setForecast([]);
    setLoading(true);
    fetchWeatherData(city);
    fetchForecastData(city);
  };

  const toggleUnit = () => {
    if (unit === 'c') {
      setUnit('f');
    } else {
      setUnit('c');
    }
  };
  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`App ${darkMode ? 'dark-mode' : ''}`}>
      <header className="fixed-heading">
        <img className="logo" src={logo} alt="Logo" />
        <h1 className="classh1">Weather Dashboard</h1>
        <button className="theme-toggle" onClick={toggleTheme}>
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </header>
      <div className="main-content">
        <SearchBar onSearch={handleSearch} />
        <p>Temperature Units</p>
        <button className="switch-temp-btn" onClick={toggleUnit}>
          Switch to {unit === 'c' ? '°F' : '°C'}
        </button>
        {loading && <p>Loading...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {currentWeather && <CurrentWeather data={currentWeather} unit={unit} />}
        {forecast.length > 0 && <Forecast data={forecast} unit={unit} />}
      </div>
    </div>
  );
}

export default App;

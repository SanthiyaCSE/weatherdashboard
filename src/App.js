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
  const [weatherData, setWeatherData] = useState(null);

  const fetchWeatherData = async (city) => {
    setLoading(true);
    setError('');

    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${unit}`
      );
      setCurrentWeather(response.data);
    } catch (error) {
      setError('City not found');
    }
    setLoading(false);
  };

  const fetchWeather = (latitude, longitude) => {
    const unitParam = unit === 'c' ? '°C' : '°F';
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${unitParam}&appid=${API_KEY}`;

    fetch(url)
      .then(response => response.json())
      .then(data => setWeatherData(data))
      .catch(err => setError('Failed to fetch weather data'));
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
  const getLocationWeather = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeather(latitude, longitude);
        },
        (err) => {
          setError('Geolocation permission denied or unavailable');
        }
      );
    } else {
      setError('Geolocation is not supported by this browser');
    }
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
  const convertTemp = (temp) => {
    return unit === 'c'
      ? `${temp}°C`
      : `${((temp * 9) / 5 + 32).toFixed(1)}°F`;
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
        <button className="location" onClick={getLocationWeather}>Get Location-Based Weather</button>
        <SearchBar onSearch={handleSearch} />
        <p>Temperature Units Switch</p>
        <button className="switch-temp-btn" onClick={toggleUnit}>
          To {unit === 'c' ? '°F' : '°C'}
        </button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {weatherData && (
          <div className="weather-info">
            <h3>Your Location's Current Weather</h3>
            <p>Temperature: {convertTemp(weatherData.main.temp)}</p>
            <p>Conditions: {weatherData.weather[0].description}</p>
            <p>Humidity: {weatherData.main.humidity}%</p>
            <p>Wind Speed: {weatherData.wind.speed} m/s</p>
          </div>
        )}
        {loading && <p>Loading...</p>}
        {currentWeather && <CurrentWeather data={currentWeather} unit={unit} />}
        {forecast.length > 0 && <Forecast data={forecast} unit={unit} />}
      </div>
    </div>
  );
}

export default App;

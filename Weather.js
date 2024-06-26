import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; // Import CSS file

const Weather = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const API_KEY = 'b30d39dd7276bd71578c864cb277e8fc'; // Replace with your OpenWeatherMap API key
  const API_URL = 'https://api.openweathermap.org/data/2.5/weather';

  const fetchWeatherData = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(API_URL, {
        params: {
          q: city,
          appid: API_KEY,
          units: 'metric', // You can change units to imperial if you prefer Fahrenheit
        },
      });
      setWeatherData(response.data);
    } catch (error) {
      setError('Error fetching data. Please try again later.');
    }
    setLoading(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim() !== '') {
      fetchWeatherData();
    } else {
      setError('Please enter a city name.');
    }
  };

  return (
    <div className="App">
      <header>
        <h1>Weather App</h1>
      </header>
      <main>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter city name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="input-text"
          />
          <button type="submit" className="btn-submit">
            Get Weather
          </button>
        </form>
        {loading && <p className="loading">Loading...</p>}
        {error && <p className="error">{error}</p>}
        {weatherData && (
          <div className="weather-info">
            <h2>Weather in {weatherData.name}</h2>
            <p>Temperature: {weatherData.main.temp} °C</p>
            <p>Humidity: {weatherData.main.humidity} %</p>
            <p>Description: {weatherData.weather[0].description}</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Weather;

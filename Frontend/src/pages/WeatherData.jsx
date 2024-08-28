import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Similar.css';
import SearchBox from '../Components/SearchBox/SearchBox';

const WeatherData = () => {
  const [weatherData, setWeatherData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentId, setCurrentId] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    fetchWeatherData();
  }, [currentId]);

  const fetchWeatherData = async () => {
    if (!hasMore) return;

    setLoading(true);
    setError(null);

    try {

      const response = await axios.get(`http://127.0.0.1:8000/weatherdatas/${currentId}`);
      const weather = response.data;
      
      if (weather && !weather.error) {
        console.log('Weathertype_id:', weather.Weathertype_id);

        const typeresponse = await axios.get(`http://127.0.0.1:8000/weathertypes/${weather.Weathertype_id}`);

        const type = typeresponse.data;
        

        const fullWeather = {
          ...weather,
          type: type.Weather || "No weather associated", //here Weather is object in that foreign class 
          
        };


        setWeatherData(prevData => [...prevData, fullWeather]);
        setCurrentId(prevId => prevId + 1);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      setError('Error fetching weather data');
      console.error('Error fetching weather data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <SearchBox />
      <div className="table">
        {loading && <p>Loading weather data...</p>}
        {error && <p>{error}</p>}
        {weatherData.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Date</th>
                <th>Weather</th>
                <th>Wind Speed</th>
                <th>Humidity</th>
                <th>Pressure</th>
              </tr>
            </thead>
            <tbody>
              {weatherData.map((weather) => (
                <tr key={weather.id}>
                  <td>{weather.id}</td>
                  <td>{weather.date}</td>
                  <td>{weather.type}</td>
                  <td>{weather.wind}</td>
                  <td>{weather.humidity}</td>
                  <td>{weather.pressure}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          !loading && <p>No weather data available.</p>
        )}
      </div>
    </div>
  );
};

export default WeatherData;

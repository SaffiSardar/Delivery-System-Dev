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
  const [searchTerm, setSearchTerm] = useState(''); // New state for search term

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
        const typeResponse = await axios.get(`http://127.0.0.1:8000/weathertypes/${weather.Weathertype_id}`);
        const type = typeResponse.data;

        const fullWeather = {
          ...weather,
          type: type.Weather || "No weather associated",
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

  const handleSearch = (term) => {
    setSearchTerm(term); // Update the search term when input changes
  };

  const filteredWeatherData = weatherData.filter((weather) =>
    weather.date.toLowerCase().includes(searchTerm.toLowerCase()) // Filter by date
  );

  return (
    <div className="container">
      <SearchBox onSearch={handleSearch} /> {/* Pass search handler */}
      <div className="table">
        {loading && <p>Loading weather data...</p>}
        {error && <p>{error}</p>}
        {filteredWeatherData.length > 0 ? ( // Use filteredWeatherData for display
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Date ( Search by )</th>
                <th>Weather</th>
                <th>Wind Speed</th>
                <th>Humidity</th>
                <th>Pressure</th>
              </tr>
            </thead>
            <tbody>
              {filteredWeatherData.map((weather) => (
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

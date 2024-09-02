import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBox from '../Components/SearchBox/SearchBox';

const MediumCatalogue = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentId, setCurrentId] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [searchTerm, setSearchTerm] = useState(''); // New state for search term

  useEffect(() => {
    fetchVehicleData();
  }, [currentId]);

  const fetchVehicleData = async () => {
    if (!hasMore) return;

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`http://127.0.0.1:8000/tmediums/${currentId}`);
      const vehicle = response.data;

      if (vehicle && !vehicle.error) {
        const typeResponse = await axios.get(`http://127.0.0.1:8000/mediumtypes/${vehicle.Mediumtype_id}`);
        const type = typeResponse.data;

        const fullVehicle = {
          ...vehicle,
          type: type.type || "No type associated"
        };

        setVehicles(prevVehicles => [...prevVehicles, fullVehicle]);
        setCurrentId(prevId => prevId + 1);
      } else {
        setHasMore(false); 
      }
    } catch (error) {
      setError('Error fetching vehicle data');
      console.error('Error fetching vehicle data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (term) => {
    setSearchTerm(term); // Update the search term when input changes
  };

  const filteredVehicles = vehicles.filter((vehicle) =>
    vehicle.type.toLowerCase().includes(searchTerm.toLowerCase()) || // Filter by type
    vehicle.speed.toString().includes(searchTerm) ||                 // Filter by speed
    vehicle.weightlimit.toString().includes(searchTerm) ||           // Filter by weight limit
    vehicle.quantity.toString().includes(searchTerm)                 // Filter by quantity
  );

  return (
    <div className="container">
      <SearchBox onSearch={handleSearch} /> {/* Pass search handler */}
      <div className="table">
        {loading && <p>Loading vehicle data...</p>}
        {error && <p>{error}</p>}
        {filteredVehicles.length > 0 ? ( // Use filteredVehicles for display
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Type</th>
                <th>Speed</th>
                <th>Need by ( days ) ( Name )</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {filteredVehicles.map((vehicle) => (
                <tr key={vehicle.id}>
                  <td>{vehicle.id}</td>
                  <td>{vehicle.type}</td>
                  <td>{vehicle.speed}</td>
                  <td>{vehicle.weightlimit}</td>
                  <td>{vehicle.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          !loading && <p>No vehicle data available.</p>
        )}
      </div>
    </div>
  );
};

export default MediumCatalogue;

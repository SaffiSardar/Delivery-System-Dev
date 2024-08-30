import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBox from '../Components/SearchBox/SearchBox';

const MediumCatalogue = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentId, setCurrentId] = useState(1);
  const [hasMore, setHasMore] = useState(true);

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

        const typereponse = await axios.get(`http://127.0.0.1:8000/mediumtypes/${vehicle.Mediumtype_id}`)
        const   type = typereponse.data;

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

  return (
    <div className="container">
      <SearchBox />
      <div className="table">
        {loading && <p>Loading vehicle data...</p>}
        {error && <p>{error}</p>}
        {vehicles.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Type</th>
                <th>Speed</th>
                <th>Weight Limit</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {vehicles.map((vehicle) => (
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

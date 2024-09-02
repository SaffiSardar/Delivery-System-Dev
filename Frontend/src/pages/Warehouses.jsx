import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBox from '../Components/SearchBox/SearchBox';

const Warehouses = () => {
  const [warehouses, setWarehouses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentId, setCurrentId] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [searchTerm, setSearchTerm] = useState(''); // New state for search term

  useEffect(() => {
    fetchWarehouseData();
  }, [currentId]);

  const fetchWarehouseData = async () => {
    if (!hasMore) return;

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`http://127.0.0.1:8000/warehouses/${currentId}`);
      const warehouse = response.data;

      if (warehouse && !warehouse.error) {
        const postalResponse = await axios.get(`http://127.0.0.1:8000/warehousepostals/${warehouse.Warehousepostal_id}`);
        const postal = postalResponse.data;

        const locationResponse = await axios.get(`http://127.0.0.1:8000/warehouselocations/${warehouse.Warehouselocation_id}`);
        const location = locationResponse.data;

        const phoneResponse = await axios.get(`http://127.0.0.1:8000/warehousephones/${warehouse.Warehousephone_id}`);
        const phone = phoneResponse.data;

        const fullWarehouse = {
          ...warehouse,
          postal: postal.postal || "No postal associated",
          location: location.location || "No location associated",
          phone: phone.phone || "No phone associated",
        };

        setWarehouses(prevWarehouses => [...prevWarehouses, fullWarehouse]);
        setCurrentId(prevId => prevId + 1);
      } else {
        setHasMore(false); 
      }
    } catch (error) {
      setError('Error fetching warehouse data');
      console.error('Error fetching warehouse data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (term) => {
    setSearchTerm(term); // Update the search term when input changes
  };

  const filteredWarehouses = warehouses.filter((warehouse) =>
    warehouse.name.toLowerCase().includes(searchTerm.toLowerCase()) || // Filter by name
    warehouse.location.toLowerCase().includes(searchTerm.toLowerCase()) || // Filter by location
    warehouse.postal.toLowerCase().includes(searchTerm.toLowerCase()) // Filter by postal code
  );

  return (
    <div className="container">
      <SearchBox onSearch={handleSearch} /> {/* Pass search handler */}
      <div className="table">
        {loading && <p>Loading warehouse data...</p>}
        {error && <p>{error}</p>}
        {filteredWarehouses.length > 0 ? ( // Use filteredWarehouses for display
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Location</th>
                <th>Landline No.</th>
                <th>Postal Code</th>
              </tr>
            </thead>
            <tbody>
              {filteredWarehouses.map((warehouse) => (
                <tr key={warehouse.id}>
                  <td>{warehouse.id}</td>
                  <td>{warehouse.name}</td>
                  <td>{warehouse.location}</td>
                  <td>{warehouse.phone}</td>
                  <td>{warehouse.postal}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          !loading && <p>No warehouse data available.</p>
        )}
      </div>
    </div>
  );
};

export default Warehouses;

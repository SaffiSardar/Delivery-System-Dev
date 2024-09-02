import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBox from '../Components/SearchBox/SearchBox';
import Main from '../Components/Main/Main'; // Import Main component

const DeliveryRecords = () => {
  const [deliveries, setDeliveries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentId, setCurrentId] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [searchTerm, setSearchTerm] = useState(''); 
  const [pendingCount, setPendingCount] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);

  useEffect(() => {
    fetchDeliveryData();
  }, [currentId]);

  useEffect(() => {
    // Calculate counts whenever deliveries change
    const pending = deliveries.filter(delivery => delivery.status === 'Pending').length;
    const completed = deliveries.filter(delivery => delivery.status === 'Completed').length;

    setPendingCount(pending);
    setCompletedCount(completed);
  }, [deliveries]);

  const fetchDeliveryData = async () => {
    if (!hasMore) return;

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`http://127.0.0.1:8000/deliveries/${currentId}`);
      const delivery = response.data;

      if (delivery && !delivery.error) {
        const statusResponse = await axios.get(`http://127.0.0.1:8000/deliverystatuses/${delivery.Deliverystatus_id}`);
        const status = statusResponse.data;

        const fullDelivery = {
          ...delivery,
          status: status.status || "No status associated"
        };

        setDeliveries(prevDeliveries => [...prevDeliveries, fullDelivery]);
        setCurrentId(prevId => prevId + 1);
      } else {
        setHasMore(false); 
      }
    } catch (error) {
      setError('Error fetching delivery data');
      console.error('Error fetching delivery data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (term) => {
    setSearchTerm(term); 
  };

  const filteredDeliveries = deliveries.filter((delivery) =>
    delivery.daddress.toLowerCase().includes(searchTerm.toLowerCase()) || 
    delivery.status.toLowerCase().includes(searchTerm.toLowerCase())       
  );

  return (
    <div className="container">
      {/* <Main completedCount={completedCount} pendingCount={pendingCount} /> Pass counts to Main */}
      <SearchBox onSearch={handleSearch} />
      <div className="table">
        {loading && <p>Loading delivery data...</p>}
        {error && <p>{error}</p>}
        {filteredDeliveries.length > 0 ? ( 
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Delivery Address ( Name )</th>
                <th>Delivery Time</th>
                <th>Delivery Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredDeliveries.map((delivery) => (
                <tr key={delivery.id}>
                  <td>{delivery.id}</td>
                  <td>{delivery.daddress}</td>
                  <td>{delivery.dtime}</td>
                  <td>{delivery.ddate}</td>
                  <td>{delivery.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          !loading && <p>No delivery data available.</p>
        )}
      </div>
    </div>
  );
};

export default DeliveryRecords;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBox from '../Components/SearchBox/SearchBox';

const DeliveryRecords = () => {
  const [deliveries, setDeliveries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentId, setCurrentId] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    fetchDeliveryData();
  }, [currentId]);

  const fetchDeliveryData = async () => {
    if (!hasMore) return;

    setLoading(true);
    setError(null);

    try {

      const response = await axios.get(`http://127.0.0.1:8000/deliveries/${currentId}`);
      const delivery = response.data;

      if (delivery && !delivery.error) {

        const statusresponse = await axios.get(`http://127.0.0.1:8000/deliverystatuses/${delivery.Deliverystatus_id}`)
        const status = statusresponse.data;


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

  return (
    <div className="container">
      <SearchBox />
      <div className="table">
        {loading && <p>Loading delivery data...</p>}
        {error && <p>{error}</p>}
        {deliveries.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Delivery Address</th>
                <th>Delivery Time</th>
                <th>Delivery Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {deliveries.map((delivery) => (
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

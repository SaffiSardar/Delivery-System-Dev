import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBox from '../Components/SearchBox/SearchBox';


const OrderRecords = () => {
  const [orders, setOrders] = useState([]); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentId, setCurrentId] = useState(1); 
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    fetchOrderData();
  }, [currentId]);

  const fetchOrderData = async () => {
    if (!hasMore) return;

    setLoading(true);
    setError(null);

    try {

      const response = await axios.get(`http://127.0.0.1:8000/orders/${currentId}`);
      const order = response.data;

      if (order && !order.error) {

        setOrders(prevOrders => [...prevOrders, order]);
        setCurrentId(prevId => prevId + 1); 
      } else {
        setHasMore(false); 
      }
    } catch (error) {
      setError('Error fetching order data');
      console.error('Error fetching order data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <SearchBox />
      <div className="table">
        {loading && <p>Loading order data...</p>}
        {error && <p>{error}</p>}
        {orders.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Quantity</th>
                <th>Total Price</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.quantity}</td>
                  <td>{order.totalprice}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          !loading && <p>No order data available.</p>
        )}
      </div>
    </div>
  );
};

export default OrderRecords;

import React, { useState, useEffect } from 'react';
import './Main.css';
import { assets } from '../../assets/assets';
import axios from 'axios';
import SearchBox from '../SearchBox/SearchBox'; // Import SearchBox if needed

const Main = () => {
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
    <div className='main'>
      <div className="back">
        <img src={assets.background} alt="" />
      </div>
      <div className="OrderStats">
        <div className="completedorders">
          <div className="heading">Completed Orders :</div>
          <div className="completedpending"><h2>{completedCount}</h2></div>
        </div>
        <div className="div"><h1>Delivery System</h1></div>
        <div className="pendingorders">
          <div className="heading">Pending Orders :</div>
          <div className="completedpending"><h2>{pendingCount}</h2></div>
        </div>
      </div>
    </div>
  );
}

export default Main;
  
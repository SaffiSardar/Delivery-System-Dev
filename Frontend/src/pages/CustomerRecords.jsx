import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBox from '../Components/SearchBox/SearchBox';

const CustomerRecords = () => {
  const [customers, setCustomers] = useState([]); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentId, setCurrentId] = useState(1); 
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    fetchCustomerData();
  }, [currentId]);

  const fetchCustomerData = async () => {
    if (!hasMore) return; // No need to fetch more if there are no more records

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`http://127.0.0.1:8000/customers/${currentId}`);
      const customer = response.data;

      if (customer) {
        setCustomers(prevCustomers => [...prevCustomers, customer]); // Add to existing records
        setCurrentId(prevId => prevId + 1); // Increment ID to fetch the next record
      } else {
        setHasMore(false); // Stop fetching if no more records
      }
    } catch (error) {
      setError('Error fetching customer data');
      console.error('Error fetching customer data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='container'>
      <SearchBox />
      <div className='table'>
        {loading && <p>Loading customer data...</p>}
        {error && <p>{error}</p>}
        {customers.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>CNIC</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr key={customer.id}> {/* Use a unique key */}
                  <td>{customer.name}</td>
                  <td>{customer.Cemail_id}</td>
                  <td>{customer.Ccnic_id}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          !loading && <p>No customer data available.</p>
        )}
      </div>
    </div>
  );
};

export default CustomerRecords;

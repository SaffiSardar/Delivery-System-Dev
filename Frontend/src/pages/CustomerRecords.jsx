import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBox from '../Components/SearchBox/SearchBox';

const CustomerRecords = () => {
  const [customers, setCustomers] = useState([]); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentId, setCurrentId] = useState(1); 
  const [hasMore, setHasMore] = useState(true);
  const [searchTerm, setSearchTerm] = useState(''); // New state for search term

  useEffect(() => {
    fetchCustomerData();
  }, [currentId]);

  const fetchCustomerData = async () => {
    if (!hasMore) return;

    setLoading(true);
    setError(null);

    try {
      const customerResponse = await axios.get(`http://127.0.0.1:8000/customers/${currentId}`);
      const customer = customerResponse.data;

      if (customer && !customer.error) {
        const emailResponse = await axios.get(`http://127.0.0.1:8000/cemails/${customer.Cemail_id}`);
        const email = emailResponse.data;

        const cnicResponse = await axios.get(`http://127.0.0.1:8000/ccnics/${customer.Ccnic_id}`);
        const cnic = cnicResponse.data;

        const fullCustomer = {
          ...customer,
          email: email.email || "No email associated",
          cnic: cnic.cnic || "No CNIC associated"
        };

        setCustomers(prevCustomers => [...prevCustomers, fullCustomer]); 
        setCurrentId(prevId => prevId + 1); 
      } else {
        setHasMore(false); 
      }
    } catch (error) {
      setError('Error fetching customer data');
      console.error('Error fetching customer data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (term) => {
    setSearchTerm(term); // Update the search term when input changes
  };

  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='container'>
      <SearchBox onSearch={handleSearch} /> {/* Pass search handler */}
      <div className='table'>
        {loading && <p>Loading customer data...</p>}
        {error && <p>{error}</p>}
        {filteredCustomers.length > 0 ? ( // Use filteredCustomers for display
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>CNIC</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.map((customer) => (
                <tr key={customer.id}>
                  <td>{customer.name}</td>
                  <td>{customer.email}</td>
                  <td>{customer.cnic}</td>
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

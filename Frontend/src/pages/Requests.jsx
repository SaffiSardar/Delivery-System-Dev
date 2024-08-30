import React, { useState } from 'react';
import axios from 'axios';

const Requests = () => {
  const [mediumData, setMediumData] = useState({
    name: '',
    weightlimit: '',
    speed: '',
    quantity: '',
    Mediumtype_id: '',
  });

  

  const [productData, setProductData] = useState({
    name: '',
    price: '',
    weight: '',
    State_id: '',
    Fragile_id: '',
  });

  const [errorMessage, setErrorMessage] = useState('');

  const handleMediumInputChange = (event) => {
    const { name, value } = event.target;
    setMediumData({
      ...mediumData,
      [name]: value,
    });
  };

  

  const handleProductInputChange = (event) => {
    const { name, value } = event.target;
    setProductData({
      ...productData,
      [name]: value,
    });
  };

  const handleMediumSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/tmediums/', null, {
        params: {
          name: mediumData.name,
          weightlimit: parseInt(mediumData.weightlimit),
          speed: parseInt(mediumData.speed),
          quantity: parseInt(mediumData.quantity),
          Mediumtype_id: mediumData.Mediumtype_id ? parseInt(mediumData.Mediumtype_id) : null,
        },
      });
      console.log('Medium created successfully:', response.data);
      setErrorMessage(''); 
    } catch (error) {
      console.error('Error posting medium data:', error);
      setErrorMessage('Error posting medium data: ' + error.message); 
    }
  };

 

  const handleProductSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/products/', null, {
        params: {
          name: productData.name,
          price: parseInt(productData.price),
          weight: parseInt(productData.weight),
          State_id: productData.State_id ? parseInt(productData.State_id) : null,
          Fragile_id: productData.Fragile_id ? parseInt(productData.Fragile_id) : null,
        },
      });
      console.log('Product created successfully:', response.data);
      setErrorMessage(''); 
    } catch (error) {
      console.error('Error posting product data:', error);
      setErrorMessage('Error posting product data: ' + error.message);
    }
  };

  return (
    <div className="request-container">
      <div className="requestpanel">
        <div className="box1">
          <button type="submit" onClick={handleMediumSubmit}>Request New Medium</button>
          <form onSubmit={handleMediumSubmit}>
            <label>
              Name:
              <input type="text" name="name" value={mediumData.name} onChange={handleMediumInputChange} />
            </label>
            <label>
              Weight Limit:
              <input type="text" name="weightlimit" value={mediumData.weightlimit} onChange={handleMediumInputChange} />
            </label>
            <label>
              Speed Limit:
              <input type="text" name="speed" value={mediumData.speed} onChange={handleMediumInputChange} />
            </label>
            <label>
              Quantity:
              <input type="text" name="quantity" value={mediumData.quantity} onChange={handleMediumInputChange} />
            </label>
            <label>
              Medium Type:
              <select name="Mediumtype_id" value={mediumData.Mediumtype_id} onChange={handleMediumInputChange}>
                <option value="">Select Medium Type</option>
                <option value="1">Drone</option>
                <option value="2">Truck</option>
                <option value="3">Bike</option>
              </select>
            </label>
          </form>
        </div>
        
        <div className="box3">
          <button type="submit" onClick={handleProductSubmit}>New Product</button>
          <form onSubmit={handleProductSubmit}>
            <label>
              Name:
              <input type="text" name="name" value={productData.name} onChange={handleProductInputChange} />
            </label>
            <label>
              Price:
              <input type="text" name="price" value={productData.price} onChange={handleProductInputChange} />
            </label>
            <label>
              Weight:
              <input type="text" name="weight" value={productData.weight} onChange={handleProductInputChange} />
            </label>
            <label>
              State:
              <select name="State_id" value={productData.State_id} onChange={handleProductInputChange}>
                <option value="">Select State</option>
                <option value="1">Liquid</option>
                <option value="2">Gas</option>
                <option value="3">Solid</option>
              </select>
            </label>
            <label>
              Fragile:
              <select name="Fragile_id" value={productData.Fragile_id} onChange={handleProductInputChange}>
                <option value="">Select Fragile Option</option>
                <option value="1">Yes</option>
                <option value="2">No</option>
              </select>
            </label>
          </form>
        </div>
      </div>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
    </div>
  );
};

export default Requests;

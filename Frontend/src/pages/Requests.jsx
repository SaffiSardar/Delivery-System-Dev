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

  const [warehouseData, setWarehouseData] = useState({
    name: '',
    Warehousepostal_id: '',
    Warehouselocation_id: '',
    Warehousephone_id: '',
  });

  const [productData, setProductData] = useState({
    name: '',
    price: '',
    weight: '',
    State_id: '',
    Fragile_id: '',
  });

  const handleMediumInputChange = (event) => {
    const { name, value } = event.target;
    setMediumData({
      ...mediumData,
      [name]: value,
    });
  };

  const handleWarehouseInputChange = (event) => {
    const { name, value } = event.target;
    setWarehouseData({
      ...warehouseData,
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
    } catch (error) {
      console.error('Error posting medium data:', error);
    }
  };

  const handleWarehouseSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/warehouses/', null, {
        params: {
          name: warehouseData.name,
          Warehousepostal_id: warehouseData.Warehousepostal_id ? parseInt(warehouseData.Warehousepostal_id) : null,
          Warehouselocation_id: warehouseData.Warehouselocation_id ? parseInt(warehouseData.Warehouselocation_id) : null,
          Warehousephone_id: warehouseData.Warehousephone_id ? parseInt(warehouseData.Warehousephone_id) : null,
        },
      });
      console.log('Warehouse created successfully:', response.data);
    } catch (error) {
      console.error('Error posting warehouse data:', error);
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
    } catch (error) {
      console.error('Error posting product data:', error);
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
            <button type="submit">Submit</button>
          </form>
        </div>
        <div className="box2">
          <button type="submit" onClick={handleWarehouseSubmit}>New Warehouse</button>
          <form onSubmit={handleWarehouseSubmit}>
            <label>
              Name:
              <input type="text" name="name" value={warehouseData.name} onChange={handleWarehouseInputChange} />
            </label>
            <label>
              Location:
              <input type="text" name="Warehouselocation_id" value={warehouseData.Warehouselocation_id} onChange={handleWarehouseInputChange} />
            </label>
            <label>
              Postal Code:
              <input type="text" name="Warehousepostal_id" value={warehouseData.Warehousepostal_id} onChange={handleWarehouseInputChange} />
            </label>
            <label>
              Landline No:
              <input type="text" name="Warehousephone_id" value={warehouseData.Warehousephone_id} onChange={handleWarehouseInputChange} />
            </label>
            <button type="submit">Submit</button>
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
                <option value="">Is it Fragile?</option>
                <option value="1">Yes</option>
                <option value="2">No</option>
              </select>
            </label>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Requests;

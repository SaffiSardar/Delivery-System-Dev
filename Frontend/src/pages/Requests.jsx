import React, { useState } from 'react';
import axios from 'axios';

const Requests = () => {
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
          <button type="submit">Request New Medium</button>
          <form>
            <label>
              Name:
              <input type="text" name="mediumName" />
            </label>
            <label>
              Type:
              <input type="text" name="mediumType" />
            </label>
            <label>
              Speed Limit:
              <input type="text" name="capacity" />
            </label>
            <label>
              Quantity:
              <input type="text" name="status" />
            </label>
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
              State ID:
              <input type="text" name="State_id" value={productData.State_id} onChange={handleProductInputChange} />
            </label>
            <label>
              Fragile ID:
              <input type="text" name="Fragile_id" value={productData.Fragile_id} onChange={handleProductInputChange} />
            </label>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Requests;

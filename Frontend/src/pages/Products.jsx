import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBox from '../Components/SearchBox/SearchBox';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentId, setCurrentId] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    fetchProductData();
  }, [currentId]);

  const fetchProductData = async () => {
    if (!hasMore) return;

    setLoading(true);
    setError(null);

    try {

      const response = await axios.get(`http://127.0.0.1:8000/products/${currentId}`);
      const product = response.data;

      if (product && !product.error) {

        const stateresponse = await axios.get(`http://127.0.0.1:8000/states/${product.State_id}`);
        const state = stateresponse.data;

        const fragileresponse = await axios.get(`http://127.0.0.1:8000/fragiles/${product.Fragile_id}`);
        const fragile = fragileresponse.data;

        const fullProduct = {
          ...product,
          state: state.stateyn || "No State associated",
          fragile: fragile.fragileyesno || "No Fragile associated"
        };

        console.log("Full product data:", fullProduct);

        setProducts(prevProducts => [...prevProducts, fullProduct]);
        setCurrentId(prevId => prevId + 1);
      } else {
        setHasMore(false); 
      }
    } catch (error) {
      setError('Error fetching product data');
      console.error('Error fetching product data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <SearchBox />
      <div className="table">
        {loading && <p>Loading product data...</p>}
        {error && <p>{error}</p>}
        {products.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>State</th>
                <th>Fragile</th>
                <th>Price</th>
                <th>Weight</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>{product.state}</td>
                  <td>{product.fragile}</td>
                  <td>{product.price}</td>
                  <td>{product.weight}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          !loading && <p>No product data available.</p>
        )}
        {products.length > 0 && (
          <button>Add new product</button>
        )}
      </div>
    </div>
  );
};

export default Products;

import React from 'react'
import { useState , useEffect } from "react"
import productCart from '../components/productCart'




function home() {

  const [products, setProducts] = useState([]);
  const[loading, setLoading] = useState(true);

  useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/products');
      const data = await response.json();
      console.log(data);
      setProducts(data.slice(0, 3)); // Set the first 3 products to state
    } catch (error) {
      console.error('Error fetching data:', error);
    }finally {
      setLoading(false);
    }
  };
  fetchData();
}, [])


  return (
    <div>
      <h1>welcome to E-comHub</h1>
      <h2>Featured Products</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {products.map((product) => (
            <productCart key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}

export default home

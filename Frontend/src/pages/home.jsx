import React from 'react'
import { useState, useEffect } from 'react'
import ProductCart from '../components/productCart'

function Home() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_URL_API}product/`)
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`)
        }

        const data = await response.json()
        setProducts(Array.isArray(data) ? data : [])
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])


  return (
    <div>
      <h1>welcome to E-comHub</h1>
      <h2>Featured Products </h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {products.map((product) => (
            <ProductCart key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Home

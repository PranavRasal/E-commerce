import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import ProductCart from '../components/productCart'

function Home() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  const productDetail = (productId) => {
    navigate(`/product/${productId}`)
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/product/')
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
    <div className='p-4'>
      <h1 className='mb-1 text-2xl font-semibold text-gray-900'>Welcome to E-comHub</h1>
      <h2 className='mb-4 text-lg text-gray-700'>Featured Products</h2>
      {loading ? (
        <p className='text-gray-600'>Loading...</p>
      ) : (
        <div className='grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4'>
          {products.map((product) => (
            <ProductCart
              key={product._id}
              product={product}
              onClick={() => productDetail(product._id)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default Home

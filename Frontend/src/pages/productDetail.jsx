import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addToCart } from '../redux/cardSlice'
import { AuthContext } from '../context/authContract.js'

function ProductDetail({ productId }) {
  const [productData, setProductData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const { id: routeId } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useContext(AuthContext)

  const id = routeId

  const handleAddToCart = async (productData) => {
    if (!user) {
      window.alert('Please log in to add products to your cart.')
      return
    }
    const userId = user._id ?? user.id
    const productId = productData._id ?? productData.id
    const storedUser = JSON.parse(localStorage.getItem('userInfo') || 'null')
    const token = user.generatedToken ?? storedUser?.generatedToken

    if (!userId || !productId || !token) {
      window.alert('Unable to add this product to the cart.')
      return
    }

    const productAdd = await fetch(`/api/auth/user/${userId}/cart/${productId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ 
        name: productData.name,
        price: productData.price, 
        imgUrl: productData.imageUrl
      })
    })

    if (!productAdd.ok) {
      const errorText = await productAdd.text()
      throw new Error(errorText || `Request failed with status ${productAdd.status}`)
    }

    const cartResponse = await productAdd.json()
    console.log('Product data:', cartResponse)
    window.alert('Product added to cart.')
  }

  const handleBuyProduct = () => {
    if (!productData) {
      return
    }

    dispatch(addToCart(productData))
    window.alert('Product added to cart. Checkout flow is not available yet.')
  }

  const handleUpdateProduct = () => {
    navigate(`/product/${id}/edit`)
  }

  const handleDeleteProduct = () => {
    window.alert('Delete product flow is not available yet.')
  }

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/product/${id}`)
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`)
        }

        const data = await response.json()
        setProductData(data)
      } catch (err) {
        console.error('Error fetching product details:', err)
        setError(err.message || 'Unable to load product details')
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchProduct()
    } else {
      setLoading(false)
      setError('No product selected')
    }
  }, [id])

  if (loading) {
    return <div className='p-4'>Loading...</div>
  }

  if (error) {
    return <div className='p-4 text-red-600'>{error}</div>
  }

  if (!productData) {
    return <div className='p-4'>No product found.</div>
  }

  return (
    <div className='min-h-[calc(100vh-5rem)] bg-linear-to-br from-slate-50 via-white to-slate-100 px-4 py-10'>
      <div className='mx-auto max-w-5xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.12)]'>
        <div className='grid gap-0 md:grid-cols-2'>
          <div className='bg-slate-50 p-6 sm:p-8'>
            <div className='overflow-hidden rounded-2xl bg-white ring-1 ring-slate-200'>
              <img
                src={productData.imageUrl}
                alt={productData.name}
                className='h-full w-full object-cover transition duration-500 hover:scale-105'
              />
            </div>
          </div>

          <div className='flex flex-col justify-center p-6 sm:p-8 lg:p-10'>
            <p className='text-sm font-semibold uppercase tracking-[0.3em] text-emerald-600'>Product Details</p>
            <h2 className='mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl'>
              {productData.name}
            </h2>
            <p className='mt-5 text-base leading-7 text-slate-600'>
              {productData.description}
            </p>

            <div className='mt-8 grid gap-4 sm:grid-cols-2'>
              <div className='rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200'>
                <p className='text-xs font-medium uppercase tracking-[0.25em] text-slate-500'>Stock</p>
                <p className='mt-2 text-2xl font-bold text-slate-900'>{productData.stock}</p>
              </div>

              <div className='rounded-2xl bg-slate-900 p-4 text-white shadow-lg shadow-slate-900/20'>
                <p className='text-xs font-medium uppercase tracking-[0.25em] text-slate-300'>Price</p>
                <p className='mt-2 text-2xl font-bold'>${productData.price}</p>
              </div>
            </div>

            <div className='mt-8 flex flex-col gap-3 sm:flex-row'>
              <button
                type='button'
                onClick={() => handleAddToCart(productData)}
                className='inline-flex items-center justify-center rounded-full border border-slate-900 px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-900 hover:text-white'
              >
                Add to Cart
              </button>

              <button
                type='button'
                onClick={handleBuyProduct}
                className='inline-flex items-center justify-center rounded-full bg-emerald-600 ml-6 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700'
              >
                Buy Product
              </button>
            </div>
            {user?.role === 'admin' && (
              <div className='mt-2 flex flex-col gap-3 sm:flex-row'>
                <button
                  type='button'
                  onClick={handleUpdateProduct}
                  className='inline-flex items-center justify-center rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700'
                >
                  Edit Product
                </button>

                <button
                  type='button'
                  onClick={handleDeleteProduct}
                  className='inline-flex items-center justify-center rounded-full bg-red-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-red-600'
                >
                  Delete Product
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      

   


    </div>
  )
}

export default ProductDetail

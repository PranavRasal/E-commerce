import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AuthContext } from '../context/authContract.js'

function ProductMod({ productId: productIdProp }) {
  const { id: routeId } = useParams()
  const navigate = useNavigate()
  const { user } = useContext(AuthContext)
  const productId = productIdProp ?? routeId

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    imageUrl: '',
    description: '',
    price: '',
    stock: '',
  })

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/product/${productId}`)
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`)
        }

        const product = await response.json()
        setFormData({
          name: product.name ?? '',
          imageUrl: product.imageUrl ?? '',
          description: product.description ?? '',
          price: product.price ?? '',
          stock: product.stock ?? '',
        })
      } catch (fetchError) {
        setError(fetchError.message || 'Unable to load product details')
      } finally {
        setLoading(false)
      }
    }

    if (productId) {
      fetchProduct()
    } else {
      setLoading(false)
      setError('No product selected')
    }
  }, [productId])

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((currentFormData) => ({
      ...currentFormData,
      [name]: value,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setSuccess('')

    if (!productId) {
      setError('No product selected')
      return
    }

    const storedUser = JSON.parse(localStorage.getItem('userInfo') || 'null')
    const token = user?.generatedToken ?? storedUser?.generatedToken

    if (!token) {
      setError('You must be logged in to update a product')
      return
    }

    try {
      setSaving(true)

      const payload = new FormData()
      payload.append('name', formData.name)
      payload.append('imageUrl', formData.imageUrl)
      payload.append('description', formData.description)
      payload.append('price', formData.price)
      payload.append('stock', formData.stock)

      const response = await fetch(`/api/product/${productId}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: payload,
      })

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(errorText || `Request failed with status ${response.status}`)
      }

      setSuccess('Product updated successfully')
      navigate(`/product/${productId}`)
    } catch (submitError) {
      setError(submitError.message || 'Unable to update product')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <div className='p-4'>Loading...</div>
  }

  return (
    <div className='min-h-[calc(100vh-5rem)] bg-linear-to-br from-slate-50 via-white to-slate-100 px-4 py-10'>
      <div className='mx-auto max-w-5xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.12)]'>
        <div className='grid gap-0 md:grid-cols-2'>
          <div className='bg-slate-50 p-6 sm:p-8'>
            <div className='overflow-hidden rounded-2xl bg-white ring-1 ring-slate-200'>
              <img
                src={formData.imageUrl}
                alt={formData.name || 'Product preview'}
                className='h-full w-full object-cover transition duration-500 hover:scale-105'
              />
            </div>
          </div>

          <div className='flex flex-col justify-center p-6 sm:p-8 lg:p-10'>
            <p className='text-sm font-semibold uppercase tracking-[0.3em] text-emerald-600'>Edit Product</p>
            <h2 className='mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl'>
              Update product details
            </h2>

            <form className='mt-6 space-y-5' onSubmit={handleSubmit}>
              <div>
                <label htmlFor='name' className='mb-2 block text-sm font-medium text-slate-700'>
                  Product Name
                </label>
                <input
                  id='name'
                  name='name'
                  value={formData.name}
                  onChange={handleChange}
                  className='w-full rounded-2xl border border-slate-200 px-4 py-3 text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200'
                  placeholder='Product name'
                />
              </div>

              <div>
                <label htmlFor='imageUrl' className='mb-2 block text-sm font-medium text-slate-700'>
                  Image URL
                </label>
                <input
                  id='imageUrl'
                  name='imageUrl'
                  value={formData.imageUrl}
                  onChange={handleChange}
                  className='w-full rounded-2xl border border-slate-200 px-4 py-3 text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200'
                  placeholder='https://example.com/image.jpg'
                />
              </div>

              <div>
                <label htmlFor='description' className='mb-2 block text-sm font-medium text-slate-700'>
                  Description
                </label>
                <textarea
                  id='description'
                  name='description'
                  value={formData.description}
                  onChange={handleChange}
                  rows='5'
                  className='w-full rounded-2xl border border-slate-200 px-4 py-3 text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200'
                  placeholder='Write the product description'
                />
              </div>

              <div>
                <label htmlFor='price' className='mb-2 block text-sm font-medium text-slate-700'>
                  Price
                </label>
                <input
                  id='price'
                  name='price'
                  type='number'
                  min='0'
                  step='0.01'
                  value={formData.price}
                  onChange={handleChange}
                  className='w-full rounded-2xl border border-slate-200 px-4 py-3 text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200'
                  placeholder='0.00'
                />
              </div>

              <div>
                <label htmlFor='stock' className='mb-2 block text-sm font-medium text-slate-700'>
                  Stock Value
                </label>
                <input
                  id='stock'
                  name='stock'
                  type='number'
                  min='0'
                  value={formData.stock}
                  onChange={handleChange}
                  className='w-full rounded-2xl border border-slate-200 px-4 py-3 text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200'
                  placeholder='0'
                />
              </div>

              {error ? <p className='text-sm font-medium text-red-600'>{error}</p> : null}
              {success ? <p className='text-sm font-medium text-emerald-600'>{success}</p> : null}

              <div className='flex flex-col gap-3 sm:flex-row'>
                <button
                  type='submit'
                  disabled={saving}
                  className='inline-flex items-center justify-center rounded-full border border-slate-900 px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-900 hover:text-white disabled:cursor-not-allowed disabled:opacity-60'
                >
                  {saving ? 'Saving...' : 'Submit'}
                </button>

                <button
                  type='button'
                  onClick={() => navigate(-1)}
                  className='inline-flex items-center justify-center rounded-full bg-slate-100 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-200'
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductMod

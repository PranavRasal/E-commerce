import React, { useContext, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/authContract.js'

function CreateProduct() {
  const navigate = useNavigate()
  const { user } = useContext(AuthContext)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [imagePreview, setImagePreview] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    stock: '',
    imageFile: null,
  })

  const previewSrc = useMemo(() => imagePreview || '', [imagePreview])

  const handleChange = (event) => {
    const { name, value, files } = event.target

    if (name === 'imageFile') {
      const file = files?.[0] ?? null
      setFormData((currentFormData) => ({
        ...currentFormData,
        imageFile: file,
      }))

      if (file) {
        setImagePreview(URL.createObjectURL(file))
      }

      return
    }

    setFormData((currentFormData) => ({
      ...currentFormData,
      [name]: value,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setSuccess('')

    const storedUser = JSON.parse(localStorage.getItem('userInfo') || 'null')
    const token = user?.generatedToken ?? storedUser?.generatedToken

    if (!token) {
      setError('You must be logged in as an admin to create a product')
      return
    }

    if (!formData.imageFile) {
      setError('Product image is required')
      return
    }

    try {
      setSaving(true)

      const payload = new FormData()
      payload.append('name', formData.name)
      payload.append('description', formData.description)
      payload.append('price', formData.price)
      payload.append('category', formData.category)
      payload.append('stock', formData.stock)
      payload.append('imageUrl', formData.imageFile)

      const response = await fetch('/api/product/', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: payload,
      })

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(errorText || `Request failed with status ${response.status}`)
      }

      setSuccess('Product created successfully')
      navigate('/admin')
    } catch (submitError) {
      setError(submitError.message || 'Unable to create product')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className='min-h-[calc(100vh-5rem)] bg-linear-to-br from-slate-950 via-slate-900 to-slate-800 px-4 py-10'>
      <div className='mx-auto max-w-6xl overflow-hidden rounded-4xl border border-white/10 bg-white shadow-[0_30px_80px_rgba(15,23,42,0.35)]'>
        <div className='grid gap-0 md:grid-cols-2'>
          <div className='relative flex items-center justify-center bg-slate-950 p-8'>
            <div className='absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.25),transparent_40%)]' />
            <div className='relative w-full max-w-md overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/5 p-6 backdrop-blur'>
              {previewSrc ? (
                <img
                  src={previewSrc}
                  alt='Product preview'
                  className='h-105 w-full rounded-3xl object-cover'
                />
              ) : (
                <div className='flex h-105 items-center justify-center rounded-3xl border border-dashed border-white/20 bg-white/5 text-center text-white/70'>
                  Choose an image to preview the product
                </div>
              )}
            </div>
          </div>

          <div className='p-6 sm:p-8 lg:p-10'>
            <p className='text-sm font-semibold uppercase tracking-[0.3em] text-emerald-600'>Create Product</p>
            <h1 className='mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl'>Add a full new product</h1>
            <p className='mt-4 text-slate-600'>Fill in every field and submit the new product to the backend.</p>

            <form className='mt-8 space-y-5' onSubmit={handleSubmit}>
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
                  placeholder='Enter product name'
                />
              </div>

              <div>
                <label htmlFor='imageFile' className='mb-2 block text-sm font-medium text-slate-700'>
                  Product Image
                </label>
                <input
                  id='imageFile'
                  name='imageFile'
                  type='file'
                  accept='image/*'
                  onChange={handleChange}
                  className='w-full rounded-2xl border border-slate-200 px-4 py-3 text-slate-700 outline-none file:mr-4 file:rounded-full file:border-0 file:bg-slate-900 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-slate-800'
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

              <div className='grid gap-5 sm:grid-cols-2'>
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
                    Stock
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
              </div>

              <div>
                <label htmlFor='category' className='mb-2 block text-sm font-medium text-slate-700'>
                  Category
                </label>
                <input
                  id='category'
                  name='category'
                  value={formData.category}
                  onChange={handleChange}
                  className='w-full rounded-2xl border border-slate-200 px-4 py-3 text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200'
                  placeholder='Enter category'
                />
              </div>

              {error ? <p className='text-sm font-medium text-red-600'>{error}</p> : null}
              {success ? <p className='text-sm font-medium text-emerald-600'>{success}</p> : null}

              <div className='flex flex-col gap-3 sm:flex-row'>
                <button
                  type='submit'
                  disabled={saving}
                  className='inline-flex items-center justify-center rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60'
                >
                  {saving ? 'Creating...' : 'Create Product'}
                </button>

                <button
                  type='button'
                  onClick={() => navigate('/admin')}
                  className='inline-flex items-center justify-center rounded-full border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100'
                >
                  Back to Dashboard
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateProduct
import React, { useContext, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/authContract.js'

function UpdateStatus() {
  const location = useLocation()
  const navigate = useNavigate()
  const { user } = useContext(AuthContext)
  const [selectedStatus, setSelectedStatus] = useState('pending')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const orderId = location.state?.orderId

  const statusOptions = [
    { value: 'pending', label: 'Pending', color: 'bg-amber-100 text-amber-700 border-amber-200' },
    { value: 'shipped', label: 'Shipped', color: 'bg-blue-100 text-blue-700 border-blue-200' },
    { value: 'delivered', label: 'Delivered', color: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
    { value: 'cancelled', label: 'Cancelled', color: 'bg-rose-100 text-rose-700 border-rose-200' }
  ]

  if (!orderId) {
    return (
      <div className="min-h-[70vh] bg-slate-50 px-4 py-10">
        <div className="mx-auto max-w-2xl">
          <div className="rounded-3xl border border-dashed border-red-300 bg-white p-10 text-center text-red-600 shadow-sm">
            <p className="text-lg font-semibold">Error: Order ID not found</p>
            <button 
              onClick={() => navigate('/order')}
              className="mt-4 rounded-full bg-blue-500 px-6 py-2 text-sm font-semibold text-white hover:bg-blue-600"
            >
              Back to Orders
            </button>
          </div>
        </div>
      </div>
    )
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess(false)

    try {
      const storedUser = JSON.parse(localStorage.getItem('userInfo') || 'null')
      const token = user?.generatedToken ?? storedUser?.generatedToken

      if (!token) {
        throw new Error('You must be logged in')
      }

      const response = await fetch(`/api/order/${orderId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status: selectedStatus })
      })

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(errorText || `Request failed with status ${response.status}`)
      }

      setSuccess(true)
      setTimeout(() => {
        navigate('/order')
      }, 1500)
    } catch (err) {
      setError(err.message || 'Failed to update order status')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[70vh] bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-2xl">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-600">
            Update Order
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
            Update Order Status
          </h1>
          <p className="mt-3 text-slate-600">
            Order ID: <span className="break-all font-semibold">{orderId}</span>
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white shadow-sm p-8">
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div>
                <label className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                  Select New Status
                </label>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {statusOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setSelectedStatus(option.value)}
                      className={`rounded-2xl border-2 p-4 font-semibold capitalize transition ${
                        selectedStatus === option.value
                          ? `${option.color} border-current scale-105`
                          : 'border-slate-200 bg-slate-50 text-slate-600 hover:border-slate-300'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              {error && (
                <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-red-700">
                  <p className="font-semibold">Error</p>
                  <p className="mt-1 text-sm">{error}</p>
                </div>
              )}

              {success && (
                <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-700">
                  <p className="font-semibold">Success!</p>
                  <p className="mt-1 text-sm">Order status updated successfully. Redirecting...</p>
                </div>
              )}

              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Updating...' : 'Update Status'}
                </button>
                <button
                  type="button"
                  onClick={() => navigate('/order')}
                  className="flex-1 rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default UpdateStatus

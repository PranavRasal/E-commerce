import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/authContract.js'

function Admin() {
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()
  const [analytics, setAnalytics] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem('userInfo') || 'null')
        const token = user?.generatedToken ?? storedUser?.generatedToken

        if (!token) {
          throw new Error('You must be logged in as an admin to view analytics')
        }

        const response = await fetch('/api/analytics', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        if (!response.ok) {
          const errorText = await response.text()
          throw new Error(errorText || `Request failed with status ${response.status}`)
        }

        const data = await response.json()
        setAnalytics(data)
      } catch (fetchError) {
        setError(fetchError.message || 'Unable to load analytics')
      } finally {
        setLoading(false)
      }
    }

    fetchAnalytics()
  }, [user])

  if (loading) {
    return <div className='p-4'>Loading analytics...</div>
  }

  if (error) {
    return <div className='p-4 text-red-600'>{error}</div>
  }

  if (!analytics) {
    return <div className='p-4'>No analytics data found.</div>
  }

  const stats = [
    { label: 'Total Users', value: analytics.totalUsers ?? 0 },
    { label: 'Total Orders', value: analytics.totalOrders ?? 0 },
    { label: 'Total Products', value: analytics.totalProducts ?? 0 },
    { label: 'Total Revenue', value: `$${Number(analytics.totalRevenue ?? 0).toFixed(2)}` },
  ]

  return (
    <div>

    
    <div className='min-h-[70vh] bg-slate-50 px-4 py-10'>
      <div className='mx-auto max-w-6xl'>
        <div className='mb-8'>
          <p className='text-sm font-semibold uppercase tracking-[0.3em] text-emerald-600'>Admin Dashboard</p>
          <h1 className='mt-2 text-3xl font-bold tracking-tight text-slate-900'>Analytics Overview</h1>
          <p className='mt-3 text-slate-600'>Live counts loaded from the analytics API.</p>
        </div>

        <div className='grid gap-4 sm:grid-cols-2 xl:grid-cols-4'>
          {stats.map((stat) => (
            <div key={stat.label} className='rounded-3xl border border-slate-200 bg-white p-6 shadow-sm'>
              <p className='text-sm font-medium uppercase tracking-[0.2em] text-slate-500'>{stat.label}</p>
              <p className='mt-3 text-3xl font-bold text-slate-900'>{stat.value}</p>
            </div>
          ))}
        </div>

        <div className='mt-8 flex '>
          <button
            type='button'
            className='rounded-full bg-emerald-600 px-6 py-3 font-semibold text-white shadow-lg transition hover:bg-emerald-700'
            onClick={() => navigate('/create-product')}
          >
            Create Product
          </button>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Admin

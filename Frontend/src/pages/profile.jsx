import React, { useState, useContext } from 'react'
import { AuthContext } from '../context/authContract.js'

function profile() {
  const { user, setUser } = useContext(AuthContext)
  const [showForm, setShowForm] = useState(false)
  const [fullName, setFullName] = useState(user?.address?.fullName ?? '')
  const [street, setStreet] = useState(user?.address?.street ?? '')
  const [city, setCity] = useState(user?.address?.city ?? '')
  const [state, setState] = useState(user?.address?.state ?? '')
  const [postalCode, setPostalCode] = useState(user?.address?.postalCode ?? '')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  if (!user) {
    return (
      <div className='min-h-[70vh] bg-slate-50 px-4 py-10'>
        <div className='mx-auto max-w-xl rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm'>
          <p className='text-slate-600'>Please log in to view your profile.</p>
        </div>
      </div>
    )
  }

  const handleSave = async (e) => {
    e.preventDefault()
    setSaving(true)
    setError('')
    try {
      const userId = user._id ?? user.id
      const response = await fetch(`/api/auth/user/${userId}/address`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.generatedToken}`,
        },
        body: JSON.stringify({ fullName, street, city, state, postalCode }),
      })

      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.message || `Request failed with status ${response.status}`)
      }

      const updatedUser = { ...user, address: data.address }
      setUser(updatedUser)
      localStorage.setItem('userInfo', JSON.stringify(updatedUser))
      setShowForm(false)
    } catch (err) {
      console.error('Error updating address:', err)
      setError(err.message || 'Unable to update address')
    } finally {
      setSaving(false)
    }
  }

  const inputClass =
    'w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100'

  return (
    <div className='min-h-[70vh] bg-slate-50 px-4 py-10'>
      <div className='mx-auto max-w-xl rounded-2xl border border-slate-200 bg-white p-8 shadow-sm'>
        <h1 className='text-2xl font-semibold text-slate-900'>Profile</h1>

        <div className='mt-6'>
          <p className='text-sm font-medium uppercase tracking-[0.2em] text-slate-500'>Name</p>
          <p className='mt-1 text-lg font-semibold text-slate-900'>{user.name}</p>
        </div>
        <div className='mt-4'>
          <p className='text-sm font-medium uppercase tracking-[0.2em] text-slate-500'>Email</p>
          <p className='mt-1 text-lg font-semibold text-slate-900'>{user.email}</p>
        </div>

        <div className='mt-8'>
          <div className='flex items-center justify-between'>
            <p className='text-sm font-medium uppercase tracking-[0.2em] text-slate-500'>Address</p>
            {user.address?.street && (
              <button
                type='button'
                onClick={() => setShowForm((prev) => !prev)}
                className='rounded-full bg-slate-900 px-4 py-1.5 text-sm font-semibold text-white transition hover:bg-slate-800'
              >
                Edit
              </button>
            )}
          </div>

          {user.address?.street ? (
            <div className='mt-3 rounded-xl border border-slate-200 bg-slate-50 p-4'>
              <p className='font-semibold text-slate-900'>{user.address.fullName}</p>
              <p className='mt-1 text-slate-600'>{user.address.street}</p>
              <p className='text-slate-600'>
                {user.address.city}, {user.address.state} {user.address.postalCode}
              </p>
            </div>
          ) : (
            <p className='mt-3 text-slate-600'>
              You have not added an address yet.
              <button
                type='button'
                onClick={() => setShowForm((prev) => !prev)}
                className='ml-1 font-medium text-blue-600 hover:underline'
              >
                Add address
              </button>
            </p>
          )}
        </div>

        {showForm && (
          <form onSubmit={handleSave} className='mt-6 flex flex-col gap-4'>
            <input
              type='text'
              placeholder='Full Name'
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              className={inputClass}
            />
            <input
              type='text'
              placeholder='Street'
              value={street}
              onChange={(e) => setStreet(e.target.value)}
              required
              className={inputClass}
            />
            <input
              type='text'
              placeholder='City'
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
              className={inputClass}
            />
            <input
              type='text'
              placeholder='State'
              value={state}
              onChange={(e) => setState(e.target.value)}
              required
              className={inputClass}
            />
            <input
              type='text'
              placeholder='Postal Code'
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              required
              className={inputClass}
            />

            {error && <p className='text-sm text-red-600'>{error}</p>}

            <div className='flex gap-3'>
              <button
                type='submit'
                disabled={saving}
                className='w-full rounded-lg bg-slate-900 px-4 py-3 font-semibold text-white transition hover:bg-slate-800 disabled:opacity-50'
              >
                {saving ? 'Saving...' : 'Save Address'}
              </button>
              <button
                type='button'
                onClick={() => {
                  setShowForm(false)
                  setError('')
                }}
                className='w-full rounded-lg border border-slate-300 px-4 py-3 font-semibold text-slate-700 transition hover:bg-slate-100'
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

export default profile
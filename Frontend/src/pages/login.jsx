import React, { useState, useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { AuthContext } from '../context/authContract'

function login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();
      if (data.generatedToken) {
        login(data);
        navigate('/');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  }

  return (
    <div className='min-h-[70vh] bg-slate-50 px-4 py-10 flex items-center justify-center'>
      <div className='w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-xl'>
        <div className='mb-6 text-center'>
          <h2 className='text-2xl font-semibold text-slate-900'>Welcome back</h2>
          <p className='mt-2 text-sm text-slate-500'>Sign in to continue shopping</p>
        </div>

        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
          <input
            type='email'
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className='w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100'
          />
          <input
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className='w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100'
          />
          <button
            type='submit'
            className='w-full rounded-lg bg-slate-900 px-4 py-3 font-semibold text-white transition hover:bg-slate-800'
          >
            Login
          </button>
        </form>

        <p className='mt-5 text-center text-sm text-slate-600'>
          Don&apos;t have an account?{' '}
          <Link to='/register' className='font-medium text-blue-600 hover:underline'>Create one</Link>
        </p>
      </div>
    </div>
  )
}

export default login

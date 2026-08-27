import React, { useState, useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { AuthContext } from '../context/authContract'

const apiUrl = import.meta.env.VITE_URL_API?.replace(/\/$/, '') || '';

function register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [verified, setVerified] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleVerifyEmail = async () => {
    if (!name || !email) {
      alert('Please enter your name and email first.');
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/api/auth/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email })
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.message || `Request failed with status ${response.status}`);
      }

      setVerified(true);
      alert(data.message || 'OTP sent successfully.');
    } catch (error) {
      console.error('Error during email verification:', error);
      alert(error.message || 'Unable to verify email.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!verified) {
      alert('Please verify your email first.');
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, otp })
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.message || `Request failed with status ${response.status}`);
      }

      if (data.generatedToken) {
        login(data);
        navigate('/');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      alert(error.message || 'Registration failed.');
    }
  };

  return (
    <div className='min-h-[70vh] bg-slate-50 px-4 py-10 flex items-center justify-center'>
      <div className='w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-xl'>
        <div className='mb-6 text-center'>
          <h2 className='text-2xl font-semibold text-slate-900'>Create account</h2>
          <p className='mt-2 text-sm text-slate-500'>Join us and start your shopping journey</p>
        </div>

        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
          <input
            type='text'
            placeholder='Name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className='w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100'
          />
          <input
            type='email'
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className='w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100'
          />
          {verified && (
            <input
              type='text'
              placeholder='OTP'
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              className='w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100'
            />
          )}

          {verified && (
            <input
              type='password'
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className='w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100'
            />
          )}

          {!verified && (
            <button
              type='button'
              className='w-full rounded-lg bg-slate-900 px-4 py-3 font-semibold text-white transition hover:bg-slate-800'
              onClick={handleVerifyEmail}
            >
              Verify your email
            </button>
          )}

          {verified && (
            <button
              type='submit'
              className='w-full rounded-lg bg-slate-900 px-4 py-3 font-semibold text-white transition hover:bg-slate-800'
            >
              Register
            </button>
          )}
        </form>

        <p className='mt-5 text-center text-sm text-slate-600'>
          Already have an account?{' '}
          <Link to='/login' className='font-medium text-blue-600 hover:underline'>Login here</Link>
        </p>
      </div>
    </div>
  )
}

export default register

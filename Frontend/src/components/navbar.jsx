import React from 'react'
import { Link , useNavigate } from 'react-router-dom'
import logo from '../assets/logo.png'
import { useContext } from 'react';
import { AuthContext } from '../context/authContract.js';
import { useSelector } from 'react-redux';



function navbar() {
  const { user , setUser , logout} = useContext(AuthContext);
  const cartItems = useSelector((state) => state.cart?.cartItems ?? []);
  const cartCount = cartItems.reduce((total, item) => total + (item.quantity ?? 1), 0);
  const navigate = useNavigate();

  const logoutButton = () => {
    logout();
    navigate('/login');
  }
  return (
    <header className='border-b border-gray-700 bg-gray-800 text-white'>
      <div className='mx-auto flex flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8'>
        <Link to='/' className='flex items-center space-x-2'>
          <img src={logo} alt='logo' className='mr-2 h-8 w-8 rounded-2xl' />
          <span className='text-lg font-semibold'>E-comHub</span>
        </Link>
        {user && (
          <span className='text-sm text-white'>Welcome, {user.name}</span>
        )}

        <nav className='flex flex-wrap items-center justify-end gap-2'>
          <Link to='/' className='rounded-full px-3 py-1 transition hover:bg-white hover:text-gray-800'>Home</Link>
          
          <Link to='/cart' className='rounded-full px-3 py-1 transition hover:bg-white hover:text-gray-800'>Cart </Link>
          <Link to='/order' className='rounded-full px-3 py-1 transition hover:bg-white hover:text-gray-800'>Orders</Link>

          {user ? (
            user.role === 'admin' ? (
              <>
                <Link to='/admin' className='rounded-full px-3 py-1 transition hover:bg-white hover:text-gray-800'>Admin</Link>
                <button onClick={logoutButton} className='rounded-full px-3 py-1 transition hover:bg-white hover:text-gray-800'>Logout</button>
              </>
            ) : (
              <>
                
                <button onClick={logoutButton} className='rounded-full px-3 py-1 transition hover:bg-red-500 hover:text-gray-800'>Logout</button>
              </>
            )
          ) : (
            <Link to='/login' className='rounded-full px-3 py-1 transition hover:bg-green-400 hover:text-gray-800'>Login</Link>
          )}
        </nav>
      </div>
    </header>
  )
}

export default navbar


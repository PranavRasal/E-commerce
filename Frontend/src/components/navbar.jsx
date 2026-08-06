import React from 'react'
import { Link , useNavigate } from 'react-router-dom'
import logo from '../assets/logo.png'
import { useContext } from 'react';
import { AuthContext } from '../context/authContract.js';
import { useSelector } from 'react-redux';



function navbar() {
  const { user , setUser , logout} = useContext(AuthContext);
  const cartItems = useSelector((state) => state.cart.items);
  const navigate = useNavigate();

  const logoutButton = () => {
    logout();
    navigate('/login');
  }
  return (
    <div className='relative flex items-center justify-between p-4 bg-gray-800 text-white'>
        <Link to='/' className='flex items-center space-x-2'>
            <img src={logo} alt="logo" className='h-8 w-8 rounded-2xl mr-2' />
            <span>E-comHub</span>
        </Link>
        
     <div className='absolute left-1/2 -translate-x-1/2 flex items-center'>
        <ul className='flex items-center justify-center space-x-3 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-sm'>
          <li className='flex items-center justify-center rounded-full px-3 py-1 transition duration-200 hover:bg-white hover:text-gray-800 hover:shadow-md'>
            <Link to="/">Home</Link>
          </li>
          <li className='flex items-center justify-center rounded-full px-3 py-1 transition duration-200 hover:bg-white hover:text-gray-800 hover:shadow-md'>
            <Link to="/shop">Shop</Link>
          </li>
          <li className='flex items-center justify-center rounded-full px-3 py-1 transition duration-200 hover:bg-white hover:text-gray-800 hover:shadow-md'>
            <Link to="/cart">Cart ({cartItems.length})</Link>
          </li>
          <li className='flex items-center justify-center rounded-full px-3 py-1 transition duration-200 hover:bg-white hover:text-gray-800 hover:shadow-md'>
            <Link to="/admin">Admin</Link>
          </li>
          <li className='flex items-center justify-center rounded-full px-3 py-1 transition duration-200 hover:bg-white hover:text-gray-800 hover:shadow-md'>
            <Link to="/orders">Orders</Link>
          </li>
          {user ? (
            user.role === 'admin' ? (
              <li className='flex items-center justify-center rounded-full px-3 py-1 transition duration-200 hover:bg-white hover:text-gray-800 hover:shadow-md'>
                <Link to="/admin">Admin</Link>
              </li>
            ) : (
              <div>
                <li className='flex items-center justify-center rounded-full px-3 py-1 transition duration-200 hover:bg-white hover:text-gray-800 hover:shadow-md'>
                <button onClick={profile}>Hi..{user.name} Profile</button>
              </li>
              <li className='flex items-center justify-center rounded-full px-3 py-1 transition duration-200 hover:bg-white hover:text-gray-800 hover:shadow-md'>
                <button onClick={logoutButton}>Logout</button>
              </li>
              </div>
            )
          ) : (
            <li className='flex items-center justify-center rounded-full px-3 py-1 transition duration-200 hover:bg-white hover:text-gray-800 hover:shadow-md'>
              <Link to="/login">Login</Link>
            </li>
          )}
        </ul>
     </div>
    </div>
  )
}

export default navbar


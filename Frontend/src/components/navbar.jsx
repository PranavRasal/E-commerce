import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'


function navbar() {
  return (
    <div className='relative flex items-center justify-between p-4 bg-gray-800 text-white'>
        <div className='flex items-center space-x-2'>
            <img src={logo} alt="logo"
            className='h-8 w-8 rounded-2xl mr-2'/>  E-comHub
        </div>
        
     <div className='absolute left-1/2 -translate-x-1/2 flex items-center'>
        <ul className='flex items-center justify-center space-x-3 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-sm'>
          <li className='flex items-center justify-center rounded-full px-3 py-1 transition duration-200 hover:bg-white hover:text-gray-800 hover:shadow-md'>
            <Link to="/">Home</Link>
          </li>
          <li className='flex items-center justify-center rounded-full px-3 py-1 transition duration-200 hover:bg-white hover:text-gray-800 hover:shadow-md'>
            <Link to="/shop">Shop</Link>
          </li>
          <li className='flex items-center justify-center rounded-full px-3 py-1 transition duration-200 hover:bg-white hover:text-gray-800 hover:shadow-md'>
            <Link to="/cart">Cart</Link>
          </li>
          <li className='flex items-center justify-center rounded-full px-3 py-1 transition duration-200 hover:bg-white hover:text-gray-800 hover:shadow-md'>
            <Link to="/admin">Admin</Link>
          </li>
        </ul>
     </div>
    </div>
  )
}

export default navbar


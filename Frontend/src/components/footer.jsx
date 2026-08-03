import React from 'react'

function Footer() {
  return (
    <footer className='bg-gray-900 text-gray-300'>
      <div className='mx-auto grid max-w-7xl gap-8 px-6 py-12 md:grid-cols-4'>
        <div>
          <h2 className='mb-4 text-xl font-semibold text-white'>E-comHub</h2>
          <p className='text-sm leading-7 text-gray-400'>
            Discover the latest products, exclusive offers, and fast delivery
            for all your shopping needs.
          </p>
        </div>

        <div>
          <h3 className='mb-4 text-lg font-semibold text-white'>Quick Links</h3>
          <ul className='space-y-2 text-sm'>
            <li><a href='/' className='transition hover:text-white'>Home</a></li>
            <li><a href='/shop' className='transition hover:text-white'>Shop</a></li>
            <li><a href='/cart' className='transition hover:text-white'>Cart</a></li>
            <li><a href='/admin' className='transition hover:text-white'>Admin</a></li>
          </ul>
        </div>

        <div>
          <h3 className='mb-4 text-lg font-semibold text-white'>Categories</h3>
          <ul className='space-y-2 text-sm'>
            <li><a href='/' className='transition hover:text-white'>Electronics</a></li>
            <li><a href='/' className='transition hover:text-white'>Fashion</a></li>
            <li><a href='/' className='transition hover:text-white'>Home & Living</a></li>
            <li><a href='/' className='transition hover:text-white'>Accessories</a></li>
          </ul>
        </div>

        <div>
          <h3 className='mb-4 text-lg font-semibold text-white'>Contact Us</h3>
          <ul className='space-y-2 text-sm'>
            <li>Email: support@ecomhub.com</li>
            <li>Phone: +1 234 567 890</li>
            <li>Address: 123 Market Street, New York</li>
          </ul>
        </div>
      </div>

      <div className='border-t border-gray-700'>
        <div className='mx-auto flex flex-col items-center justify-between gap-3 px-6 py-4 text-sm text-gray-400 md:flex-row'>
          <p>© 2026 E-comHub. All rights reserved.</p>
          <div className='flex gap-4'>
            <a href='/' className='transition hover:text-white'>Privacy Policy</a>
            <a href='/' className='transition hover:text-white'>Terms</a>
            <a href='/' className='transition hover:text-white'>Support</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

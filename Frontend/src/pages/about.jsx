import React from 'react'

function About() {
  return (
    <div className='min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8'>
      <div className='mx-auto max-w-6xl rounded-3xl border border-slate-200 bg-white p-8 shadow-sm sm:p-10 lg:p-12'>
        <div className='grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center'>
          <div>
            <p className='mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-sky-600'>About us</p>
            <h1 className='text-3xl font-semibold text-slate-900 sm:text-4xl'>Welcome to E-comHub</h1>
            <p className='mt-4 text-lg leading-8 text-slate-600'>
              E-comHub is a modern online shopping experience built for customers who want quality,
              convenience, and style in one place. From everyday essentials to trending favorites,
              we bring together trusted products and a smooth buying journey.
            </p>
            <p className='mt-4 text-lg leading-8 text-slate-600'>
              Our goal is simple: make shopping easy, enjoyable, and reliable with fast service,
              secure checkout, and a wide selection of products for every lifestyle.
            </p>
            <div className='mt-6 flex flex-wrap gap-3'>
              <span className='rounded-full bg-sky-100 px-4 py-2 text-sm font-medium text-sky-700'>Fast Delivery</span>
              <span className='rounded-full bg-emerald-100 px-4 py-2 text-sm font-medium text-emerald-700'>Secure Payments</span>
              <span className='rounded-full bg-violet-100 px-4 py-2 text-sm font-medium text-violet-700'>Premium Products</span>
            </div>
          </div>

          <div className='rounded-3xl bg-slate-900 p-7 text-white shadow-lg'>
            <h2 className='text-2xl font-semibold'>Why customers love us</h2>
            <ul className='mt-5 space-y-3 text-sm leading-7 text-slate-300'>
              <li>• Easy-to-use online store with a clean design</li>
              <li>• Fresh products updated regularly</li>
              <li>• Friendly support and smooth order experience</li>
              <li>• Great value for modern everyday shopping</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About

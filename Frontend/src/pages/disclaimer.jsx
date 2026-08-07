import React from 'react'

function Disclaimer() {
  return (
    <div className='min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8'>
      <div className='mx-auto max-w-4xl rounded-3xl border border-slate-200 bg-white p-8 shadow-sm'>
        <h1 className='text-3xl font-semibold text-slate-900'>Disclaimer</h1>
        <p className='mt-4 text-lg leading-8 text-slate-600'>
          This website is a demo storefront created for learning and presentation purposes. Product availability,
          pricing, and promotions may change without notice.
        </p>
      </div>
    </div>
  )
}

export default Disclaimer

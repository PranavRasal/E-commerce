import React from 'react'

function ProductCart({ product, onClick }) {
  return (
    <button
      type='button'
      onClick={onClick}
      className='flex h-full w-full flex-col overflow-hidden rounded-lg border border-gray-200 bg-white text-left shadow-sm transition hover:-translate-y-1 hover:shadow-md'
    >
      <img
        src={product.imageUrl}
        alt={product.name}
        className='aspect-square w-full object-cover'
      />

      <div className='flex flex-1 flex-col p-3'>
        <h3 className='text-sm font-semibold text-gray-900'>{product.name}</h3>
        <p className='mt-1 text-xs text-gray-600'>${product.price}</p>
        <p className='mt-1 text-xs text-gray-500'>Qty: {product.stock}</p>
      </div>
    </button>
  )
}

export default ProductCart

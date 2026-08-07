import React from 'react'
import { Link } from 'react-router-dom'

function ProductCart({ product }) {
  return (
    <Link
      to={`/product/${product._id}`}
      className='flex h-full flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md'
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
    </Link>
  )
}

export default ProductCart

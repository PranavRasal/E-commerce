import React from 'react'

function productCart({ product }) {
  return (
    <div>
        <Link to={`/product/${product._id}`} className='flex items-center justify-between p-4 border-b border-gray-300'>
            <div className='flex items-center space-x-4'>

                <img src={product.imageUrl} alt={product.name} className='w-16 h-16 object-cover rounded' />

                <div>
                    <h3 className='text-lg font-semibold'>{product.name}</h3>
                    <p className='text-gray-600'>${product.price}</p>
                    <p className='text-gray-600'>Quantity: {product.stock}</p>
                </div>


            </div>
        </Link>
    </div>
  )
}

export default productCart

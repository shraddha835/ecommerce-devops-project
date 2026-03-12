'use client';

import { formatINR } from '../lib/currency';

export default function ProductCard({ product, onAddToCart }) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow border border-gray-100">
      <div className="h-56 bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = '/fallback-product.svg';
          }}
        />
      </div>
      
      <div className="p-4">
        <p className="inline-block text-xs font-semibold bg-blue-50 text-blue-700 px-2 py-1 rounded-full mb-2">
          {product.category}
        </p>
        <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-3">{product.description}</p>
        
        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold text-blue-600">
            {formatINR(product.price)}
          </span>
          
          <button
            onClick={() => onAddToCart(product)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Add to Cart
          </button>
        </div>
        
        <div className="mt-3 text-sm text-gray-500">
          Stock: {product.stock} units
        </div>
      </div>
    </div>
  );
}

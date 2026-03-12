'use client';

import Link from 'next/link';
import Navbar from './components/Navbar';
import { formatINR } from './lib/currency';
import { PRODUCTS } from './lib/products';

export default function Home() {
  const featuredProducts = PRODUCTS.slice(0, 4);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 py-10">
        <h1 className="text-4xl font-bold mb-2">E-Commerce Platform</h1>
        <p className="text-gray-600 mb-8">Use the cards below to test the features.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link href="/products" className="border p-6 rounded-lg shadow-md bg-white hover:shadow-lg transition">
            <h2 className="text-2xl font-semibold mb-2">Products</h2>
            <p className="text-gray-600">Search, filter, sort, and add items to cart.</p>
          </Link>

          <Link href="/cart" className="border p-6 rounded-lg shadow-md bg-white hover:shadow-lg transition">
            <h2 className="text-2xl font-semibold mb-2">Cart</h2>
            <p className="text-gray-600">Update quantity, remove items, and checkout.</p>
          </Link>

          <Link href="/orders" className="border p-6 rounded-lg shadow-md bg-white hover:shadow-lg transition">
            <h2 className="text-2xl font-semibold mb-2">Orders</h2>
            <p className="text-gray-600">View your recent order list and statuses.</p>
          </Link>

          <Link href="/profile" className="border p-6 rounded-lg shadow-md bg-white hover:shadow-lg transition">
            <h2 className="text-2xl font-semibold mb-2">Profile</h2>
            <p className="text-gray-600">Check account overview and settings.</p>
          </Link>
        </div>

        <div className="mt-8 p-4 rounded-lg bg-blue-50 border border-blue-100 text-blue-900">
          Quick test: open Products → add item → open Cart → verify quantity and total updates.
        </div>

        <div className="mt-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Featured Products</h2>
            <Link href="/products" className="text-blue-600 font-semibold hover:underline">
              View all
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {featuredProducts.map((product) => (
              <div key={product.id} className="bg-white border rounded-lg p-4 shadow-sm">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-36 object-cover rounded-md mb-3"
                />
                <p className="font-semibold">{product.name}</p>
                <p className="text-sm text-gray-500 mb-2">{product.category}</p>
                <p className="text-blue-600 font-bold">{formatINR(product.price)}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

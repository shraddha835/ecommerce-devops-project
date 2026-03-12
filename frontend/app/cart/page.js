'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { getUser } from '../lib/auth';
import {
  clearCart,
  getCart,
  removeCartItem,
  updateCartItemQuantity,
} from '../lib/cart';
import { formatINR } from '../lib/currency';
import { createOrder } from '../lib/orderApi';

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [checkoutMsg, setCheckoutMsg] = useState('');
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const shipping = 99;
  const router = useRouter();

  useEffect(() => {
    setCartItems(getCart());
  }, []);

  const updateQuantity = (id, change) => {
    setCartItems(updateCartItemQuantity(id, change));
  };

  const removeItem = (id) => {
    setCartItems(removeCartItem(id));
  };

  const handleCheckout = async () => {
    const user = getUser();
    if (!user) {
      router.push('/login');
      return;
    }
    setCheckoutLoading(true);
    setCheckoutMsg('');
    try {
      await createOrder({
        userEmail: user.email,
        items: cartItems,
        total: total + shipping,
      });
      clearCart();
      setCartItems([]);
      setCheckoutMsg('Order placed successfully!');
      setTimeout(() => router.push('/orders'), 1500);
    } catch {
      setCheckoutMsg('Failed to place order. Please try again.');
    } finally {
      setCheckoutLoading(false);
    }
  };

  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-lg shadow-md">
            <p className="text-6xl mb-4">🛒</p>
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">Your cart is empty</h3>
            <p className="text-gray-500 mb-4">Add some products to get started!</p>
            <Link href="/products" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition inline-block">
              Browse Products
            </Link>
          </div>
        ) : (
          <>
            <div className="space-y-4 mb-8">
              {cartItems.map((item) => (
                <div key={item.id} className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <img
                      src={item.image || 'https://placehold.co/100x100/e2e8f0/334155?text=Item'}
                      alt={item.name}
                      className="w-16 h-16 rounded-lg object-cover border"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = '/fallback-product.svg';
                      }}
                    />
                    <div>
                      <h3 className="text-xl font-semibold">{item.name}</h3>
                      <p className="text-gray-600">{formatINR(item.price)} each</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
                      >
                        -
                      </button>
                      <span className="px-4 font-semibold">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
                      >
                        +
                      </button>
                    </div>
                    
                    <div className="text-xl font-bold text-blue-600 w-24 text-right">
                      {formatINR(item.price * item.quantity)}
                    </div>
                    
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-red-500 hover:text-red-700 ml-4"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg">Subtotal</span>
                <span className="text-lg">{formatINR(total)}</span>
              </div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg">Shipping</span>
                <span className="text-lg">{formatINR(shipping)}</span>
              </div>
              <div className="border-t pt-4 flex justify-between items-center mb-6">
                <span className="text-2xl font-bold">Total</span>
                <span className="text-2xl font-bold text-blue-600">{formatINR(total + shipping)}</span>
              </div>
              
              <button
                onClick={handleCheckout}
                disabled={checkoutLoading}
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold text-lg disabled:opacity-60"
              >
                {checkoutLoading ? 'Placing Order...' : 'Proceed to Checkout'}
              </button>
              {checkoutMsg && (
                <p className={`mt-3 text-center font-semibold ${
                  checkoutMsg.includes('success') ? 'text-green-600' : 'text-red-600'
                }`}>{checkoutMsg}</p>
              )}
            </div>
          </>
        )}
      </main>
    </div>
  );
}

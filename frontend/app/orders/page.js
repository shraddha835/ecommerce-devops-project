'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { getUser } from '../lib/auth';
import { formatINR } from '../lib/currency';
import { fetchOrders } from '../lib/orderApi';

function statusStyle(status) {
  if (status === 'Delivered') return 'text-green-600 bg-green-100';
  if (status === 'Shipped') return 'text-purple-600 bg-purple-100';
  return 'text-blue-600 bg-blue-100';
}

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const user = getUser();
    if (!user) {
      router.push('/login');
      return;
    }
    fetchOrders(user.email)
      .then(setOrders)
      .catch(() => setOrders([]))
      .finally(() => setLoading(false));
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">My Orders</h1>

        {loading ? (
          <div className="text-center py-20 text-gray-500">Loading orders...</div>
        ) : orders.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-lg shadow-md">
            <p className="text-6xl mb-4">📦</p>
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">No orders yet</h3>
            <p className="text-gray-500 mb-4">Start shopping to see your orders here!</p>
            <a href="/products" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition inline-block">
              Browse Products
            </a>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold mb-1">Order #{order.id}</h3>
                    <p className="text-gray-600 text-sm">
                      Placed on {new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </p>
                  </div>
                  <span className={`px-4 py-1 rounded-full text-sm font-semibold ${statusStyle(order.status)}`}>
                    {order.status}
                  </span>
                </div>

                {/* Item list */}
                {Array.isArray(order.items) && order.items.length > 0 && (
                  <ul className="mb-4 space-y-1">
                    {order.items.map((item, i) => (
                      <li key={i} className="flex justify-between text-sm text-gray-600">
                        <span>{item.name} × {item.quantity}</span>
                        <span>{formatINR(item.price * item.quantity)}</span>
                      </li>
                    ))}
                  </ul>
                )}

                <div className="flex justify-between items-center border-t pt-4">
                  <p className="text-gray-500 text-sm">{Array.isArray(order.items) ? order.items.length : 0} item(s)</p>
                  <p className="text-2xl font-bold text-blue-600">{formatINR(order.total)}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

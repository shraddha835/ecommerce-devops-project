'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { AUTH_UPDATED_EVENT, getUser, logout } from '../lib/auth';
import { CART_UPDATED_EVENT, getCartCount } from '../lib/cart';

export default function Navbar() {
  const [cartCount, setCartCount] = useState(0);
  const [user, setUserState] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const syncCount = () => setCartCount(getCartCount());
    const syncUser = () => setUserState(getUser());

    syncCount();
    syncUser();

    window.addEventListener(CART_UPDATED_EVENT, syncCount);
    window.addEventListener('storage', syncCount);
    window.addEventListener(AUTH_UPDATED_EVENT, syncUser);
    window.addEventListener('storage', syncUser);

    return () => {
      window.removeEventListener(CART_UPDATED_EVENT, syncCount);
      window.removeEventListener('storage', syncCount);
      window.removeEventListener(AUTH_UPDATED_EVENT, syncUser);
      window.removeEventListener('storage', syncUser);
    };
  }, []);

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-2xl font-bold">
            E-Commerce
          </Link>

          <div className="flex items-center space-x-6">
            <Link href="/products" className="hover:text-blue-200 transition">Products</Link>
            <Link href="/orders" className="hover:text-blue-200 transition">Orders</Link>
            <Link href="/cart" className="relative hover:text-blue-200 transition">
              Cart
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {cartCount}
                </span>
              )}
            </Link>
            {user ? (
              <>
                <Link href="/profile" className="hover:text-blue-200 transition text-sm">
                  👤 {user.email}
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-white text-blue-600 px-3 py-1 rounded font-semibold text-sm hover:bg-blue-50 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="hover:text-blue-200 transition">Login</Link>
                <Link href="/signup" className="bg-white text-blue-600 px-3 py-1 rounded font-semibold text-sm hover:bg-blue-50 transition">Sign Up</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

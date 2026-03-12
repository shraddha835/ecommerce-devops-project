'use client';

import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import ProductCard from '../components/ProductCard';
import { addToCart, getCartCount } from '../lib/cart';
import { fetchProducts } from '../lib/productApi';
import { PRODUCTS } from '../lib/products';

export default function ProductsPage() {
  const [notification, setNotification] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('default');
  const [cartCount, setCartCount] = useState(0);
  const [products, setProducts] = useState(PRODUCTS);
  const [isLoading, setIsLoading] = useState(true);
  const [usingFallback, setUsingFallback] = useState(false);

  useEffect(() => {
    setCartCount(getCartCount());

    let isMounted = true;

    const loadProducts = async () => {
      try {
        const remoteProducts = await fetchProducts();

        if (!isMounted) {
          return;
        }

        if (Array.isArray(remoteProducts) && remoteProducts.length > 0) {
          setProducts(remoteProducts);
          setUsingFallback(false);
        } else {
          setProducts(PRODUCTS);
          setUsingFallback(true);
        }
      } catch {
        if (!isMounted) {
          return;
        }

        setProducts(PRODUCTS);
        setUsingFallback(true);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadProducts();

    return () => {
      isMounted = false;
    };
  }, []);

  const categories = ['All', ...new Set(products.map((product) => product.category))];

  const filteredProducts = products
    .filter((product) => {
      const matchSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchCategory =
        selectedCategory === 'All' || product.category === selectedCategory;
      return matchSearch && matchCategory;
    })
    .sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
      return 0;
    });

  const handleAddToCart = (product) => {
    addToCart(product);
    setCartCount(getCartCount());
    setNotification(`${product.name} added to cart!`);
    setTimeout(() => setNotification(''), 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Notification */}
      {notification && (
        <div className="fixed top-20 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-bounce">
          ✓ {notification}
        </div>
      )}

      <main className="max-w-7xl mx-auto px-4 py-8">
        {usingFallback && !isLoading && (
          <div className="mb-4 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-amber-800">
            Backend product API is unavailable. Showing local product catalog.
          </div>
        )}

        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Our Products</h1>
            <p className="text-gray-600">Showing {filteredProducts.length} products</p>
          </div>
          
          <div className="text-right">
            <p className="text-sm text-gray-500">Cart Items</p>
            <p className="text-2xl font-bold text-blue-600">{cartCount}</p>
          </div>
        </div>

        <div className="mb-5">
          <h2 className="text-lg font-semibold mb-3">Shop by Category</h2>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 py-1.5 rounded-full text-sm border transition ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-blue-400'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="default">Sort: Default</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="name-asc">Name: A to Z</option>
          </select>
        </div>

        {/* Products Grid */}
        {isLoading ? (
          <div className="rounded-lg border border-gray-200 bg-white p-8 text-center text-gray-600">
            Loading products...
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        )}

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-6xl mb-4">📦</p>
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">No matching products</h3>
            <p className="text-gray-500">Try a different search or category.</p>
          </div>
        )}
      </main>
    </div>
  );
}

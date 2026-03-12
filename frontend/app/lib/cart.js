import { PRODUCTS } from './products';

const CART_STORAGE_KEY = 'ecommerce_cart';
export const CART_UPDATED_EVENT = 'ecommerce:cart-updated';

const PRODUCT_BY_ID = new Map(PRODUCTS.map((product) => [product.id, product]));

function normalizeCartItems(items) {
  return items.map((item) => {
    const product = PRODUCT_BY_ID.get(item.id);

    if (!product) {
      return item;
    }

    return {
      ...item,
      name: product.name,
      price: product.price,
      image: product.image,
    };
  });
}

export function getCart() {
  if (typeof window === 'undefined') {
    return [];
  }

  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];

    if (!Array.isArray(parsed)) {
      return [];
    }

    const normalized = normalizeCartItems(parsed);

    if (JSON.stringify(parsed) !== JSON.stringify(normalized)) {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(normalized));
    }

    return normalized;
  } catch {
    return [];
  }
}

export function saveCart(items) {
  if (typeof window === 'undefined') {
    return;
  }

  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  window.dispatchEvent(new Event(CART_UPDATED_EVENT));
}

export function addToCart(product) {
  const items = getCart();
  const existing = items.find((item) => item.id === product.id);

  if (existing) {
    const updated = items.map((item) =>
      item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
    );
    saveCart(updated);
    return updated;
  }

  const updated = [
    ...items,
    {
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image,
    },
  ];
  saveCart(updated);
  return updated;
}

export function updateCartItemQuantity(id, change) {
  const items = getCart();
  const updated = items.map((item) =>
    item.id === id
      ? { ...item, quantity: Math.max(1, item.quantity + change) }
      : item
  );
  saveCart(updated);
  return updated;
}

export function removeCartItem(id) {
  const updated = getCart().filter((item) => item.id !== id);
  saveCart(updated);
  return updated;
}

export function clearCart() {
  saveCart([]);
}

export function getCartCount() {
  return getCart().reduce((sum, item) => sum + item.quantity, 0);
}
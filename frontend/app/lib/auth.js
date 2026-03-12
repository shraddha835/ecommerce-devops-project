const AUTH_KEY = 'ecommerce_user';
export const AUTH_UPDATED_EVENT = 'ecommerce:auth-updated';

export function getUser() {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(AUTH_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function setUser(email) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(AUTH_KEY, JSON.stringify({ email }));
  window.dispatchEvent(new Event(AUTH_UPDATED_EVENT));
}

export function logout() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(AUTH_KEY);
  window.dispatchEvent(new Event(AUTH_UPDATED_EVENT));
}

export function isLoggedIn() {
  return getUser() !== null;
}

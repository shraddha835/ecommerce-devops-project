import axios from 'axios';

const PRODUCT_SERVICE_BASE_URL =
  process.env.NEXT_PUBLIC_PRODUCT_SERVICE_URL || 'http://localhost:8082';

export async function fetchProducts(params = {}) {
  const response = await axios.get(`${PRODUCT_SERVICE_BASE_URL}/api/products`, {
    params,
    timeout: 10000,
  });

  return response.data;
}

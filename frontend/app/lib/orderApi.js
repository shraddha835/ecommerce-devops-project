import axios from 'axios';

const USER_SERVICE_BASE_URL = process.env.NEXT_PUBLIC_USER_SERVICE_URL || 'http://localhost:8081';

export async function createOrder({ userEmail, items, total }) {
  const response = await axios.post(
    `${USER_SERVICE_BASE_URL}/api/orders`,
    { userEmail, items, total },
    { timeout: 10000 }
  );
  return response.data;
}

export async function fetchOrders(email) {
  const response = await axios.get(
    `${USER_SERVICE_BASE_URL}/api/orders`,
    { params: { email }, timeout: 10000 }
  );
  return response.data;
}

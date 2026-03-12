import axios from 'axios';

const USER_SERVICE_BASE_URL = process.env.NEXT_PUBLIC_USER_SERVICE_URL || 'http://localhost:8081';

export async function signupUser({ email, password }) {
  const response = await axios.post(
    `${USER_SERVICE_BASE_URL}/api/users/signup`,
    { email, password },
    { timeout: 10000 }
  );
  return response.data;
}

export async function loginUser({ email, password }) {
  const response = await axios.post(
    `${USER_SERVICE_BASE_URL}/api/users/login`,
    { email, password },
    { timeout: 10000 }
  );
  return response.data;
}

import { jwtDecode } from 'jwt-decode';

export const checkAuth = () => {
  const token = localStorage.getItem('authToken');
  if (!token) return false;
  
  try {
    const decoded = jwtDecode(token); // Changed from jwt.decode
    return decoded.exp > Date.now() / 1000;
  } catch {
    return false;
  }
};

export const storeAuthToken = (token) => {
  localStorage.setItem('authToken', token);
};

export const clearAuth = () => {
  localStorage.removeItem('authToken');
};
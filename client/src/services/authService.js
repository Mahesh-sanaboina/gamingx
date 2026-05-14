import api from './api';

export const login = async (credentials) => {
  const response = await api.post('/auth/login', credentials);
  return response.data;
};

export const signup = async (credentials) => {
  const response = await api.post('/auth/register', credentials);
  return response.data;
};

export const fetchProfile = async () => {
  const response = await api.get('/auth/me');
  return response.data;
};

export const getWishlist = async () => {
  const response = await api.get('/auth/wishlist');
  return response.data;
};

export const addWishlistItem = async (productId) => {
  const response = await api.post('/auth/wishlist', { productId });
  return response.data;
};

export const removeWishlistItem = async (productId) => {
  const response = await api.delete(`/auth/wishlist/${productId}`);
  return response.data;
};

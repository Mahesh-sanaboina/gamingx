import api from './api';

export const createPaymentIntent = async (checkoutPayload) => {
  const response = await api.post('/orders/checkout', checkoutPayload);
  return response.data;
};

export const confirmOrder = async (payload) => {
  const response = await api.post('/orders/confirm', payload);
  return response.data;
};

export const getOrders = async () => {
  const response = await api.get('/orders');
  return response.data;
};

export const getAdminOrders = async () => {
  const response = await api.get('/admin/orders');
  return response.data;
};

export const updateOrderStatus = async (orderId, status) => {
  const response = await api.put(`/admin/orders/${orderId}`, { status });
  return response.data;
};

export const getAdminStats = async () => {
  const response = await api.get('/admin/stats');
  return response.data;
};

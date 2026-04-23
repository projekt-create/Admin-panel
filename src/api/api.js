import axios from 'axios';

const BASE_URL = 'http://localhost:3001';

const api = axios.create({ baseURL: BASE_URL });

// Products
export const getProducts = () => api.get('/Products');
export const getProduct = (id) => api.get(`/Products/${id}`);
export const createProduct = (data) => api.post('/Products', data);
export const updateProduct = (id, data) => api.put(`/Products/${id}`, data);
export const deleteProduct = (id) => api.delete(`/Products/${id}`);

// Users
export const getUsers = () => api.get('/Users');
export const getUser = (id) => api.get(`/Users/${id}`);
export const createUser = (data) => api.post('/Users', data);
export const updateUser = (id, data) => api.put(`/Users/${id}`, data);
export const deleteUser = (id) => api.delete(`/Users/${id}`);

// AdminUsers
export const getAdminUsers = () => api.get('/AdminUsers');
export const createAdminUser = (data) => api.post('/AdminUsers', data);
export const updateAdminUser = (id, data) => api.put(`/AdminUsers/${id}`, data);
export const deleteAdminUser = (id) => api.delete(`/AdminUsers/${id}`);

// Orders
export const getOrders = () => api.get('/Orders');
export const createOrder = (data) => api.post('/Orders', data);
export const updateOrder = (id, data) => api.put(`/Orders/${id}`, data);
export const deleteOrder = (id) => api.delete(`/Orders/${id}`);

// Cart
export const getCart = (userId) => api.get(`/Cart?userId=${userId}`);
export const addToCart = (data) => api.post('/Cart', data);
export const updateCartItem = (id, data) => api.put(`/Cart/${id}`, data);
export const removeFromCart = (id) => api.delete(`/Cart/${id}`);

// Reviews
export const getReviews = (productId) => productId ? api.get(`/Reviews?productId=${productId}`) : api.get('/Reviews');

// Supports
export const getSupports = () => api.get('/Supports');
export const createSupport = (data) => api.post('/Supports', data);
export const deleteSupport = (id) => api.delete(`/Supports/${id}`);

// Auth
export const loginUser = (email, password) => api.get(`/Users?email=${email}&password=${password}`);
export const loginAdmin = (email, password) => api.get(`/AdminUsers?email=${email}&password=${password}`);

export default api;

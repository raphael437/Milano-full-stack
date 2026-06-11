'use client'
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';

/* =========================================================
   TYPES
========================================================= */

type LoginData = {
  email: string;
  password: string;
};

type SignupData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirm: string;
  role?: string;
};

type VerifyOtpData = {
  email: string;
  otp: string;
};

/* =========================================================
   AXIOS SETUP & INTERCEPTORS
========================================================= */

// Create an axios instance with base config
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACK_API_URL,
  withCredentials: true, // still send cookies (for dev or fallback)
});

// Request interceptor: add Authorization header if token exists
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: handle 401 and token refresh
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) throw new Error('No refresh token');

        // Call refresh endpoint (sends refresh token in body)
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_BACK_API_URL}/api/v1/users/refreshToken`,
          { refreshToken },
          { withCredentials: true }
        );

        if (res.data.token) {
          localStorage.setItem('accessToken', res.data.token);
          localStorage.setItem('refreshToken', res.data.refreshToken);
          originalRequest.headers.Authorization = `Bearer ${res.data.token}`;
          return apiClient(originalRequest);
        }
      } catch (refreshError) {
        // Refresh failed – log out user
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

/* =========================================================
   TOKEN STORAGE HELPERS
========================================================= */

const storeTokens = (data: any) => {
  if (data.token) localStorage.setItem('accessToken', data.token);
  if (data.refreshToken) localStorage.setItem('refreshToken', data.refreshToken);
};

const clearTokens = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
};

/* =========================================================
   PRODUCTS
========================================================= */

const fetchProducts = async () => {
  try {
    const response = await apiClient.get('/api/v1/products');
    return response.data.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const fetchProduct = async (id: string) => {
  try {
    const response = await apiClient.get(`/api/v1/products/${id}`);
    return response.data.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getMenProductByCategory = async () => {
  try {
    const response = await apiClient.get('/api/v1/products/category/men');
    return response.data.products;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getWomenProductByCategory = async () => {
  try {
    const response = await apiClient.get('/api/v1/products/category/women');
    return response.data.products;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getWatches = async () => {
  try {
    const response = await apiClient.get('/api/v1/products/type/watch');
    return response.data.products;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getBags = async () => {
  try {
    const response = await apiClient.get('/api/v1/products/type/bags');
    return response.data.products;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

/* =========================================================
   AUTH
========================================================= */

const loginUser = async (formData: LoginData) => {
  try {
    const response = await apiClient.post('/api/v1/users/login', {
      email: formData.email,
      password: formData.password,
    });
    storeTokens(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const signupUser = async (formData: SignupData) => {
  try {
    const response = await apiClient.post('/api/v1/users/signup', {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
      passwordConfirm: formData.passwordConfirm,
      role: formData.role || 'user',
    });
    // No tokens returned on signup, only OTP pending message
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const verifyOtp = async (formData: VerifyOtpData) => {
  try {
    const response = await apiClient.post('/api/v1/users/verifyotp', {
      email: formData.email,
      otp: formData.otp,
    });
    storeTokens(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

/* =========================================================
   PASSWORD RESET
========================================================= */

const forgetPassword = async (email: string) => {
  try {
    const response = await apiClient.post('/api/v1/users/forgetPassword', { email });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const resetPassword = async (
  token: string,
  password: string,
  passwordConfirm: string
) => {
  try {
    const response = await apiClient.patch(`/api/v1/users/resetPassword/${token}`, {
      password,
      passwordConfirm,
    });
    storeTokens(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

/* =========================================================
   PAYPAL
========================================================= */
const createPayPalOrder = async (orderData: {
  shipCountry: string;
  shipCity: string;
  shipPostalCode: string;
  shipAddress1: string;
  phone: string;
}) => {
  try {
    const response = await apiClient.post('/api/v1/orders/create-order', orderData);
    return response.data;
  } catch (error) {
    console.log('PAYPAL ERROR:', error);
    throw error;
  }
};

/* =========================================================
   GET ME
========================================================= */
const getMe = async () => {
  try {
    const response = await apiClient.get('/api/v1/users/me');
    // Backend returns { data: { user: {...} } }
    return response.data.data;
  } catch (error: any) {
    if (error?.response?.status === 429) {
      console.warn('Too many requests to /me');
    }
    throw error;
  }
};
/* =========================================================
   LOGOUT
========================================================= */
const logOut = async () => {
  try {
    await apiClient.get('/api/v1/users/logout');
    clearTokens();
  } catch (error) {
    console.log(error);
    throw error;
  }
};

/* =========================================================
   CART
========================================================= */
const addToCart = async (productId: number, quantity = 1) => {
  try {
    const res = await apiClient.post('/api/v1/carts', { productId, quantity });
    return res.data.data.cart;
  } catch (error) {
    console.log('ADD TO CART ERROR:', error);
    throw error;
  }
};

const getCart = async () => {
  try {
    const res = await apiClient.get('/api/v1/carts', {
      headers: { 'Cache-Control': 'no-cache' },
    });
    return res.data.data.cart;
  } catch (error) {
    console.log('GET CART ERROR:', error);
    throw error;
  }
};

const updateCartItem = async (itemId: number, quantity: number) => {
  const res = await apiClient.patch(`/api/v1/carts/${itemId}`, { quantity }, {
    headers: { 'Cache-Control': 'no-cache' },
  });
  return res.data.data.cart;
};

const removeCartItem = async (itemId: number) => {
  const res = await apiClient.delete(`/api/v1/carts/${itemId}`, {
    headers: { 'Cache-Control': 'no-cache' },
  });
  return res.data.data.cart;
};

/* =========================================================
   ORDERS
========================================================= */
const trackOrder = async (trackingNumber: string) => {
  const res = await apiClient.get(`/api/v1/orders/track/${trackingNumber}`, {
    headers: { 'Cache-Control': 'no-cache' },
  });
  return res.data;
};

const getUserOrders = async () => {
  try {
    const res = await apiClient.get('/api/v1/orders/user-orders', {
      headers: { 'Cache-Control': 'no-cache' },
    });
    return res.data.data.orders;
  } catch (error) {
    console.log('GET USER ORDERS ERROR:', error);
    throw error;
  }
};

const getOrderDetails = async (orderId: number) => {
  try {
    const res = await apiClient.get(`/api/v1/orders/${orderId}`, {
      headers: { 'Cache-Control': 'no-cache' },
    });
    return res.data.data.order;
  } catch (error) {
    console.log('GET ORDER DETAILS ERROR:', error);
    throw error;
  }
};

/* =========================================================
   PRODUCT ADMIN
========================================================= */
const addProduct = async (productData: {
  name: string;
  description: string;
  image: string;
  price: number;
  quantity: number;
  type: string;
  category: string;
}) => {
  try {
    const res = await apiClient.post('/api/v1/products', productData, {
      headers: { 'Cache-Control': 'no-cache' },
    });
    return res.data.product;
  } catch (error) {
    console.log('ADD PRODUCT ERROR:', error);
    throw error;
  }
};

const updateProduct = async (
  productId: number,
  updatedData: Partial<{
    name: string;
    description: string;
    image: string;
    price: number;
    quantity: number;
    type: string;
    category: string;
  }>
) => {
  try {
    const res = await apiClient.patch(`/api/v1/products/${productId}`, updatedData, {
      headers: { 'Cache-Control': 'no-cache' },
    });
    return res.data.data || res.data.product;
  } catch (error) {
    console.log('UPDATE PRODUCT ERROR:', error);
    throw error;
  }
};

const deleteProduct = async (productId: number) => {
  try {
    const res = await apiClient.delete(`/api/v1/products/${productId}`, {
      headers: { 'Cache-Control': 'no-cache' },
    });
    return res.data;
  } catch (error) {
    console.log('DELETE PRODUCT ERROR:', error);
    throw error;
  }
};

/* =========================================================
   EXPORTS
========================================================= */
export {
  fetchProducts,
   apiClient ,
  fetchProduct,
  addProduct,
  updateProduct,
  deleteProduct,
  getMenProductByCategory,
  getWomenProductByCategory,
  getWatches,
  getBags,
  getMe,
  getCart,
  updateCartItem,
  removeCartItem,
  loginUser,
  signupUser,
  verifyOtp,
  logOut,
  forgetPassword,
  resetPassword,
  addToCart,
  trackOrder,
  getUserOrders,
  getOrderDetails,
  createPayPalOrder,
};

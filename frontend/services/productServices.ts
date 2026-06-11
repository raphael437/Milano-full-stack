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
   PRODUCTS
========================================================= */

const fetchProducts = async () => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACK_API_URL}/api/v1/products`,
    );

    return response.data.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const fetchProduct = async (id: string) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACK_API_URL}/api/v1/products/${id}`,
    );

    return response.data.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getMenProductByCategory = async () => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACK_API_URL}/api/v1/products/category/men`,
    );

    return response.data.products;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getWomenProductByCategory = async () => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACK_API_URL}/api/v1/products/category/women`,
    );

    return response.data.products;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getWatches = async () => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACK_API_URL}/api/v1/products/type/watch`,
    );

    return response.data.products;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getBags = async () => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACK_API_URL}/api/v1/products/type/bags`,
    );

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
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACK_API_URL}/api/v1/users/login`,
      {
        email: formData.email,
        password: formData.password,
      },
      {
        withCredentials: true,
      },
    );

    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const signupUser = async (formData: SignupData) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACK_API_URL}/api/v1/users/signup`,
      {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        passwordConfirm: formData.passwordConfirm,
        role: formData.role || 'user',
      },
      {
        withCredentials: true,
      },
    );

    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const verifyOtp = async (formData: VerifyOtpData) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACK_API_URL}/api/v1/users/verifyotp`,
      {
        email: formData.email,
        otp: formData.otp,
      },
      {
        withCredentials: true,
      },
    );

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
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACK_API_URL}/api/v1/users/forgetPassword`,
      { email },
    );

    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const resetPassword = async (
  token: string,
  password: string,
  passwordConfirm: string,
) => {
  try {
    const response = await axios.patch(
      `${process.env.NEXT_PUBLIC_BACK_API_URL}/api/v1/users/resetPassword/${token}`,
      {
        password,
        passwordConfirm,
      },
    );

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
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACK_API_URL}/api/v1/orders/create-order`,
      orderData,
      {
        withCredentials: true,
      },
    );

    return response.data;
  } catch (error) {
    console.log('PAYPAL ERROR:', error);
    throw error;
  }
};
/* =========================================================
   getme
========================================================= */
cconst getMe = async () => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACK_API_URL}/api/v1/users/me`,
     {
    withCredentials: true,
  }
    );

    return response.data.data;
  } catch (error: any) {
    if (error?.response?.status === 429) {
      console.warn("Too many requests to /me");
    }

    throw error;
  }
};

/* =========================================================
   logout
========================================================= */

const logOut = async () => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACK_API_URL}/api/v1/users/logout`,
      {
        withCredentials: true, // IMPORTANT (JWT cookie)
      },
    );
  } catch (error) {
    console.log(error);
    throw error;
  }
};
/* =========================================================
   ADD TO CART
========================================================= */

const addToCart = async (productId: number, quantity = 1) => {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BACK_API_URL}/api/v1/carts`,
      {
        productId,
        quantity,
      },
      {
        withCredentials: true,
      },
    );

    return res.data.data.cart;
  } catch (error) {
    console.log('ADD TO CART ERROR:', error);

    throw error;
  }
};

/* =========================================================
   GET CART
========================================================= */

const getCart = async () => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BACK_API_URL}/api/v1/carts`,
      {
        withCredentials: true,

        // PREVENT CACHE
        headers: {
          'Cache-Control': 'no-cache',
        },
      },
    );

    return res.data.data.cart;
  } catch (error) {
    console.log('GET CART ERROR:', error);

    throw error;
  }
};
/* =========================================================
   update cart
========================================================= */
const updateCartItem = async (itemId: number, quantity: number) => {
  const res = await axios.patch(
    `${process.env.NEXT_PUBLIC_BACK_API_URL}/api/v1/carts/${itemId}`,
    { quantity },
    {
      withCredentials: true,
      headers: {
        'Cache-Control': 'no-cache',
      },
    },
  );

  return res.data.data.cart;
};
/* =========================================================
   remove cart
========================================================= */
const removeCartItem = async (itemId: number) => {
  const res = await axios.delete(
    `${process.env.NEXT_PUBLIC_BACK_API_URL}/api/v1/carts/${itemId}`,
    {
      withCredentials: true,
      headers: {
        'Cache-Control': 'no-cache',
      },
    },
  );

  return res.data.data.cart;
};
/* =========================================================
   TRACK ORDER
========================================================= */

const trackOrder = async (
  trackingNumber: string
) => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_BACK_API_URL}/api/v1/orders/track/${trackingNumber}`,
    {
      withCredentials: true,
      headers: {
        'Cache-Control': 'no-cache',
      },
    }
  );

  return res.data;
};
/* =========================================================
get user orders
========================================================= */
const getUserOrders = async () => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BACK_API_URL}/api/v1/orders/user-orders`,
      {
        withCredentials: true,
        headers: {
          "Cache-Control": "no-cache",
        },
      }
    );

    return res.data.data.orders;
  } catch (error) {
    console.log("GET USER ORDERS ERROR:", error);
    throw error;
  }
};
/* =========================================================
get user orders
========================================================= */
const getOrderDetails = async (orderId: number) => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BACK_API_URL}/api/v1/orders/${orderId}`,
      {
        withCredentials: true,
        headers: {
          "Cache-Control": "no-cache",
        },
      }
    );

    return res.data.data.order;
  } catch (error) {
    console.log("GET ORDER DETAILS ERROR:", error);
    throw error;
  }
};
/* =========================================================
   ADD PRODUCT
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
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BACK_API_URL}/api/v1/products`,
      productData,
      {
        withCredentials: true,
        headers: {
          "Cache-Control": "no-cache",
        },
      }
    );

    return res.data.product;
  } catch (error) {
    console.log("ADD PRODUCT ERROR:", error);
    throw error;
  }
};

/* =========================================================
   UPDATE PRODUCT
========================================================= */

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
    const res = await axios.patch(
      `${process.env.NEXT_PUBLIC_BACK_API_URL}/api/v1/products/${productId}`,
      updatedData,
      {
        withCredentials: true,
        headers: {
          "Cache-Control": "no-cache",
        },
      }
    );

    return res.data.data || res.data.product;
  } catch (error) {
    console.log("UPDATE PRODUCT ERROR:", error);
    throw error;
  }
};

/* =========================================================
   DELETE PRODUCT
========================================================= */

const deleteProduct = async (
  productId: number
) => {
  try {
    const res = await axios.delete(
      `${process.env.NEXT_PUBLIC_BACK_API_URL}/api/v1/products/${productId}`,
      {
        withCredentials: true,
        headers: {
          "Cache-Control": "no-cache",
        },
      }
    );

    return res.data;
  } catch (error) {
    console.log("DELETE PRODUCT ERROR:", error);
    throw error;
  }
};


/* =========================================================
   EXPORTS
========================================================= */

export {
  fetchProducts,
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

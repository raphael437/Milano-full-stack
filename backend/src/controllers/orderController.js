const Order = require('../models/order');
const OrderItem = require('../models/orderitem');
const Cart = require('../models/cart');
const CartItem = require('../models/cartItem');
const Product = require('../models/productModel');
const redis = require('../config/redis');
const { createPaypalOrder, capturePayPalOrder } = require('../config/paypal');
const axios = require('axios');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

// --------------------- MOCK SERVICES ---------------------
// Generate a random tracking number
const generateTrackingNumber = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let tracking = '';
  for (let i = 0; i < 12; i++) {
    tracking += chars.charAt(Math.floor(Math.random() * chars.length));
    if ((i + 1) % 4 === 0 && i !== 11) tracking += '-';
  }
  return tracking;
};

// Mock DHL shipment creation
const mockCreateDhlShipment = async order => {
  console.log('Mock DHL shipment creation for order:', order.id);
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  return {
    trackingNumber: generateTrackingNumber(),
    labelBase64: null,
  };
};

// Mock tracking service registration
const mockTmRegister = async (trackingNumber, carrier = 'dhl') => {
  console.log('Mock TrackingMore registration for:', trackingNumber);
  await new Promise(resolve => setTimeout(resolve, 500));
  return { ok: true };
};

// Mock tracking status check
const mockTmGetStatus = async (trackingNumber, carrier = 'dhl') => {
  console.log('Mock TrackingMore status for:', trackingNumber);
  await new Promise(resolve => setTimeout(resolve, 500));

  // Generate random status
  const statuses = ['in_transit', 'out_for_delivery', 'delivered', 'exception'];
  const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];

  return {
    data: {
      tracking_number: trackingNumber,
      carrier_code: carrier,
      status: randomStatus,
      updates: [
        {
          description: `Package is ${randomStatus.replace('_', ' ')}`,
          update_time: new Date().toISOString(),
          location: 'Distribution Center',
        },
      ],
    },
  };
};
// --------------------- END MOCK SERVICES ---------------------

// --------------------- CREATE ORDER (ONLY FROM CART) ---------------------
exports.createOrder = catchAsync(async (req, res, next) => {

  const cart = await Cart.findOne({
    where: { userId: req.user.id },
    include: [
      {
        model: CartItem,
        include: [Product],
      },
    ],
  });

  if (!cart || cart.CartItems.length === 0) {
    return next(new AppError("Cart is empty", 400));
  }

  const {
    shipCountry,
    shipCity,
    shipPostalCode,
    shipAddress1,
    phone,
  } = req.body;

  if (
    !shipCountry ||
    !shipCity ||
    !shipPostalCode ||
    !shipAddress1 ||
    !phone
  ) {
    return next(
      new AppError("Please fill all shipping fields", 400)
    );
  }

  // TOTAL
  let total = 0;

  cart.CartItems.forEach((item) => {
    total += item.Product.price * item.quantity;
  });

  // GET PAYPAL ACCESS TOKEN
  const auth = Buffer.from(
    `${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`
  ).toString("base64");

  const tokenResponse = await axios({
    url: `${process.env.PAYPAL_BASE_URL}/v1/oauth2/token`,
    method: "post",
    data: "grant_type=client_credentials",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  const accessToken = tokenResponse.data.access_token;

  // CREATE PAYPAL ORDER
  const paypalResponse = await axios({
    url: `${process.env.PAYPAL_BASE_URL}/v2/checkout/orders`,
    method: "post",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    data: {
      intent: "CAPTURE",

      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: total.toFixed(2),
          },
        },
      ],

      application_context: {
        brand_name: "Milano Store",
        landing_page: "LOGIN",
        user_action: "PAY_NOW",

        return_url:
          "http://localhost:3000/paypal-success",

        cancel_url:
          "http://localhost:3000/paypal-cancel",
      },
    },
  });

  const approvalUrl = paypalResponse.data.links.find(
    (link) => link.rel === "approve"
  )?.href;

  res.status(200).json({
    ok: true,
    approvalUrl,
  });
});
// --------------------- CAPTURE PAYPAL PAYMENT ---------------------
exports.capturePayment = catchAsync(async (req, res, next) => {
  const { orderId } = req.body;

  if (!orderId) {
    return next(new AppError("PayPal Order ID is required", 400));
  }

  const auth = Buffer.from(
    `${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`
  ).toString("base64");

  const tokenResponse = await axios({
    url: `${process.env.PAYPAL_BASE_URL}/v1/oauth2/token`,
    method: "post",
    data: "grant_type=client_credentials",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  const accessToken = tokenResponse.data.access_token;

  const captureResponse = await axios({
    url: `${process.env.PAYPAL_BASE_URL}/v2/checkout/orders/${orderId}/capture`,
    method: "post",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });

  // ================================
  
  // ================================

  const cart = await Cart.findOne({
    where: { userId: req.user.id },
    include: [{ model: CartItem, include: [Product] }],
  });

  if (!cart || cart.CartItems.length === 0) {
    return next(new AppError("Cart is empty", 400));
  }

  let total = 0;
  cart.CartItems.forEach(item => {
    total += item.Product.price * item.quantity;
  });

  // 1. Generate tracking number
  const trackingNumber = generateTrackingNumber();

  // 2. Create order
  const order = await Order.create({
  userId: req.user.id,

  customerName:
    `${req.user.firstName} ${req.user.lastName}`,

  customerPhone: "0000000000",

  amount: total,

  totalPrice: total,

  status: "paid",

  trackingNumber,
});

  // 3. Create order items
  await Promise.all(
    cart.CartItems.map(item =>
      OrderItem.create({
        orderId: order.id,
        productId: item.Product.id,
        quantity: item.quantity,
        price: item.Product.price,
      })
    )
  );

  // 4. Clear cart
  await CartItem.destroy({ where: { cartId: cart.id } });

  res.status(200).json({
    ok: true,
    message: "Payment successful",
    trackingNumber,
    orderId: order.id,
    data: captureResponse.data,
  });
});
// --------------------- TRACK ORDER ---------------------
exports.trackOrder = catchAsync(async (req, res, next) => {
  try {
    const { trackingNumber } = req.params;

    // 1) Check Redis first
    const cached = await redis.get(`tracking-status:${trackingNumber}`);
    if (cached) {
  const cachedData = JSON.parse(cached);

  return res.json({
    ok: true,
    source: 'redis',
    order: cachedData.order,
    trackingInfo: cachedData.trackingInfo,
  });
}

    // 2) If not cached → DB + Mock Tracking Service
    const order = await Order.findOne({ where: { trackingNumber } });
    if (!order) {
      return res.status(404).json({ ok: false, error: 'Order not found' });
    }

    const trackingInfo = await mockTmGetStatus(trackingNumber, 'dhl');

    // 3) Cache in Redis (expire in 15 min)
    const cachedData = {
  order: {
    id: order.id,
    status: order.status,
  },
  trackingInfo,
};

await redis.setex(
  `tracking-status:${trackingNumber}`,
  900,
  JSON.stringify(cachedData)
);

    res.json({
      ok: true,
      source: 'api',
      order: { id: order.id, status: order.status },
      trackingInfo,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: 'Failed to track order' });
  }
});

// --------------------- DELETE ORDER ---------------------
exports.deleteOrder = catchAsync(async (req, res, next) => {
  try {
    const { id } = req.params;
    const order = await Order.findByPk(id);
    if (!order) {
      return res.status(404).json({ ok: false, error: 'Order not found' });
    }

    await order.destroy();

    // Remove from Redis
    await redis.del(`order:${id}`);
    if (order.trackingNumber) {
      await redis.del(`tracking:${order.trackingNumber}`);
    }

    res.json({ ok: true, message: 'Order deleted' });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

// --------------------- GET USER ORDERS ---------------------
exports.getUserOrders = catchAsync(async (req, res, next) => {
  const orders = await Order.findAll({
    where: { userId: req.user.id },
    include: [
      {
        model: OrderItem,
        include: [Product],
      },
    ],
    order: [['createdAt', 'DESC']],
  });

  res.status(200).json({
    status: 'success',
    results: orders.length,
    data: {
      orders,
    },
  });
});

// --------------------- GET ORDER DETAILS ---------------------
exports.getOrderDetails = catchAsync(async (req, res, next) => {
  const order = await Order.findOne({
    where: { id: req.params.id, userId: req.user.id },
    include: [
      {
        model: OrderItem,
        include: [Product],
      },
    ],
  });

  if (!order) {
    return next(new AppError('Order not found', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      order,
    },
  });
});

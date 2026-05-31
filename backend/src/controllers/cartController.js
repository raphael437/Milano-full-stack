const Cart = require('../models/cart');
const CartItem = require('../models/cartItem');
const Product = require('../models/productModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const redis = require('../config/redis');

/* =========================================================
   GET CART
========================================================= */

exports.getCart = catchAsync(async (req, res, next) => {
  let cart = await Cart.findOne({
    where: { userId: req.user.id },
    include: [
      {
        model: CartItem,
        include: [Product],
      },
    ],
  });

  // EMPTY CART FIRST TIME
  if (!cart) {
    return res.status(200).json({
      status: 'success',
      data: {
        cart: {
          CartItems: [],
        },
      },
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      cart,
    },
  });
});

/* =========================================================
   ADD TO CART
========================================================= */

exports.addToCart = catchAsync(async (req, res, next) => {
  const { productId, quantity = 1 } = req.body;

  let cart = await Cart.findOne({
    where: { userId: req.user.id },
  });

  if (!cart) {
    cart = await Cart.create({
      userId: req.user.id,
    });
  }

  const product = await Product.findByPk(productId);

  if (!product) {
    return next(
      new AppError('Product not found', 404)
    );
  }

  let cartItem = await CartItem.findOne({
    where: {
      cartId: cart.id,
      productId,
    },
  });

  if (cartItem) {
    cartItem.quantity += quantity;

    await cartItem.save();
  } else {
    await CartItem.create({
      cartId: cart.id,
      productId,
      quantity,
    });
  }

  // CLEAR OLD CACHE
  await redis.del(`cart:${req.user.id}`);

  const updatedCart = await Cart.findOne({
    where: { id: cart.id },
    include: [
      {
        model: CartItem,
        include: [Product],
      },
    ],
  });

  res.status(200).json({
    status: 'success',
    data: {
      cart: updatedCart,
    },
  });
});

/* =========================================================
   REMOVE FROM CART
========================================================= */

exports.removeFromCart = catchAsync(async (req, res, next) => {
  const { itemId } = req.params;

  const cart = await Cart.findOne({
    where: { userId: req.user.id },
  });

  if (!cart) {
    return next(
      new AppError('Cart not found', 404)
    );
  }

  const cartItem = await CartItem.findOne({
    where: {
      id: itemId,
      cartId: cart.id,
    },
  });

  if (!cartItem) {
    return next(
      new AppError(
        'Item not found in cart',
        404
      )
    );
  }

  await cartItem.destroy();

  // CLEAR CACHE
  await redis.del(`cart:${req.user.id}`);

  const updatedCart = await Cart.findOne({
    where: { id: cart.id },
    include: [
      {
        model: CartItem,
        include: [Product],
      },
    ],
  });

  res.status(200).json({
    status: 'success',
    data: {
      cart: updatedCart,
    },
  });
});

/* =========================================================
   UPDATE QUANTITY
========================================================= */

exports.updateCartItem = catchAsync(async (req, res, next) => {
  const { itemId } = req.params;

  const { quantity } = req.body;

  const cart = await Cart.findOne({
    where: { userId: req.user.id },
  });

  if (!cart) {
    return next(
      new AppError('Cart not found', 404)
    );
  }

  const cartItem = await CartItem.findOne({
    where: {
      id: itemId,
      cartId: cart.id,
    },
  });

  if (!cartItem) {
    return next(
      new AppError(
        'Item not found in cart',
        404
      )
    );
  }

  if (quantity <= 0) {
    await cartItem.destroy();
  } else {
    cartItem.quantity = quantity;

    await cartItem.save();
  }

  // CLEAR CACHE
  await redis.del(`cart:${req.user.id}`);

  const updatedCart = await Cart.findOne({
    where: { id: cart.id },
    include: [
      {
        model: CartItem,
        include: [Product],
      },
    ],
  });

  res.status(200).json({
    status: 'success',
    data: {
      cart: updatedCart,
    },
  });
});
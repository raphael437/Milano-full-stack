require('dotenv').config();

const express = require('express');
const path = require('path');
const app = express();
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

// Security + utilities
const morgan = require('morgan');
const helmet = require('helmet');
const rateLimiter = require('express-rate-limit');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const compression = require('compression');

// Sequelize models
const Product = require('./models/productModel');
const User = require('./models/userModel');
const Order = require('./models/order');
const OrderItem = require('./models/orderitem');
const Cart = require('./models/cart');
const CartItem = require('./models/cartItem');
const sequelize = require('./config/db');

// Routers
const userRouter = require('./routers/userRouter');
const orderRouter = require('./routers/orderRouter');
const productRouter = require('./routers/productRouter');
const cartRouter = require('./routers/cartRouter');

const passport = require('./config/passport');

// 1. Security middleware first
const cors = require('cors');
app.use(cors({
  origin: 'https://milano-full-stack-front.vercel.app', // no trailing slash
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}));
// 2. Rate limiting (should be early in the chain)
const limiter = rateLimiter({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, try again in an hour',
});
app.use('/api', limiter);

// 3. Body parsers (needed before other middleware that might use parsed bodies)
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true }));

// 4. Cookie parser
app.use(cookieParser());

// 5. Prevent HTTP param pollution
app.use(hpp({ whitelist: ['price'] }));

// 6. Logging
app.use(morgan('dev'));

// 7. Compression
app.use(compression());

// 8. Static files
app.use(express.static(path.join(__dirname, 'public')));

// 9. Other settings
app.set('query parser', 'extended');
app.set('strict routing', true);

// 10. Initialize passport
app.use(passport.initialize());
if (process.env.NODE_ENV === 'development') {
  const swaggerUi = require('swagger-ui-express');
  const YAML = require('yamljs');
  const path = require('path');

  // Load OpenAPI specification
  const openApiDocument = YAML.load(path.join(__dirname, 'openapi.yaml'));

  // Serve Swagger UI
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openApiDocument));

  console.log('Swagger UI available at /api-docs');
}

// Sequelize associations (these are just model definitions, not middleware)
User.hasMany(Product, { foreignKey: 'userId' });
Product.belongsTo(User, { foreignKey: 'userId' });

User.hasOne(Cart, { foreignKey: 'userId' });
Cart.belongsTo(User, { foreignKey: 'userId' });

Cart.hasMany(CartItem, { foreignKey: 'cartId' });
CartItem.belongsTo(Cart, { foreignKey: 'cartId' });
CartItem.belongsTo(Product, { foreignKey: 'productId' });
Cart.belongsToMany(Product, { through: CartItem, foreignKey: 'cartId' });
Product.belongsToMany(Cart, { through: CartItem, foreignKey: 'productId' });

User.hasMany(Order, { foreignKey: 'userId' });
Order.belongsTo(User, { foreignKey: 'userId' });

Order.hasMany(OrderItem, { foreignKey: 'orderId' });
OrderItem.belongsTo(Order, { foreignKey: 'orderId' });
OrderItem.belongsTo(Product, { foreignKey: 'productId' });
Order.belongsToMany(Product, { through: OrderItem, foreignKey: 'orderId' });
Product.belongsToMany(Order, { through: OrderItem, foreignKey: 'productId' });




// Mount routers
console.log('Mounting routers...');

app.use('/api/v1/users', userRouter);
console.log('Mounted user router');

app.use('/api/v1/products', productRouter);
console.log('Mounted product router');

app.use('/api/v1/orders', orderRouter);
console.log('Mounted order router');



app.use('/api/v1/carts', cartRouter);
console.log('Mounted cart router');


// Global error handling
app.use(globalErrorHandler);

module.exports = app;

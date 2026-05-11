const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const logger = require('@platform/logger');
const { connectDB } = require('@platform/database');
const authRoutes = require('./modules/auth/routes');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Database Connection
connectDB(process.env.MONGODB_URI, logger);

// Routes
app.use('/api/v1/auth', authRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const status = err.status || 'error';

  logger.error(err);

  res.status(statusCode).json({
    status,
    message: err.message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

const PORT = process.env.PORT || 4001;
app.listen(PORT, () => {
  logger.info(`Auth service running on port ${PORT}`);
});

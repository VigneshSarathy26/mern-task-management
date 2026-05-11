const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const logger = require('@platform/logger');
const morgan = require('morgan');

dotenv.config();

const app = express();

app.use(morgan('dev'));

// Auth verification middleware
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(); // Proceed as guest
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.headers['x-user-id'] = decoded.id;
    next();
  } catch (error) {
    logger.warn('Invalid token attempt');
    next();
  }
};

app.use(verifyToken);

// Service Routes with Path Stripping
const services = [
  {
    path: '/api/auth',
    target: process.env.AUTH_SERVICE_URL || 'http://localhost:4001',
    rewritePath: '/api/v1/auth'
  },
  {
    path: '/api/tasks',
    target: process.env.TASK_SERVICE_URL || 'http://localhost:4002',
    rewritePath: '/api/v1/tasks'
  },
  {
    path: '/api/collaboration',
    target: process.env.COLLABORATION_SERVICE_URL || 'http://localhost:4003',
    rewritePath: '/api/v1/collaboration'
  }
];

services.forEach(service => {
  app.use(service.path, createProxyMiddleware({
    target: service.target,
    changeOrigin: true,
    pathRewrite: {
      [`^${service.path}`]: service.rewritePath,
    },
    onProxyReq: (proxyReq, req, res) => {
      // Forward the user ID header if present
      if (req.headers['x-user-id']) {
        proxyReq.setHeader('x-user-id', req.headers['x-user-id']);
      }
    }
  }));
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  logger.info(`API Gateway running on port ${PORT}`);
});

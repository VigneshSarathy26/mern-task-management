const express = require('express');
const taskController = require('./controller');

const router = express.Router();

// Mock auth middleware - in production this would be shared or handled by Gateway
const protect = (req, res, next) => {
  // Assume Gateway has verified token and passed user info in headers
  const userId = req.headers['x-user-id'];
  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  req.user = { id: userId };
  next();
};

router.use(protect);

router.post('/', taskController.create);
router.get('/', taskController.getAll);
router.get('/analytics', taskController.getStats);

module.exports = router;

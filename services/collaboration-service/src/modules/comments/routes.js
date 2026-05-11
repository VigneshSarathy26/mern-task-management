const express = require('express');
const Comment = require('./model');

const router = express.Router();

// Mock auth middleware
const protect = (req, res, next) => {
  const userId = req.headers['x-user-id'];
  if (!userId) return res.status(401).json({ message: 'Unauthorized' });
  req.user = { id: userId };
  next();
};

router.use(protect);

router.post('/:taskId', async (req, res, next) => {
  try {
    const comment = await Comment.create({
      taskId: req.params.taskId,
      userId: req.user.id,
      userName: req.body.userName || 'Anonymous',
      content: req.body.content,
      mentions: req.body.mentions || []
    });
    res.status(201).json({ status: 'success', data: { comment } });
  } catch (error) {
    next(error);
  }
});

router.get('/:taskId', async (req, res, next) => {
  try {
    const comments = await Comment.find({ taskId: req.params.taskId }).sort('-createdAt');
    res.status(200).json({ status: 'success', results: comments.length, data: { comments } });
  } catch (error) {
    next(error);
  }
});

module.exports = router;

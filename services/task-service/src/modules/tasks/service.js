const Task = require('./model');
const { NotFoundError } = require('@platform/errors');

const createTask = async (taskData) => {
  return await Task.create(taskData);
};

const getTasks = async (query = {}) => {
  return await Task.find(query);
};

const getTaskAnalytics = async (redisClient) => {
  const cacheKey = 'tasks:analytics';
  
  // Cache-Aside Pattern
  const cachedData = await redisClient.get(cacheKey);
  if (cachedData) {
    return JSON.parse(cachedData);
  }

  const stats = await Task.aggregate([
    {
      $group: {
        _id: '$status',
        count: { $sum: 1 },
      },
    },
  ]);

  // Set cache with 1 hour expiration
  await redisClient.set(cacheKey, JSON.stringify(stats), 'EX', 3600);

  return stats;
};

module.exports = {
  createTask,
  getTasks,
  getTaskAnalytics,
};

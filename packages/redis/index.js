const Redis = require('ioredis');

const createRedisClient = (options, logger) => {
  const client = new Redis(options);

  client.on('connect', () => {
    if (logger) logger.info('Redis connected');
  });

  client.on('error', (err) => {
    if (logger) logger.error('Redis error', err);
  });

  return client;
};

module.exports = { createRedisClient, Redis };

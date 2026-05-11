const amqp = require('amqplib');

const connectQueue = async (url, logger) => {
  try {
    const connection = await amqp.connect(url);
    const channel = await connection.createChannel();
    
    if (logger) logger.info('RabbitMQ Connected');
    
    return { connection, channel };
  } catch (error) {
    if (logger) logger.error('RabbitMQ connection error', error);
    throw error;
  }
};

const publishEvent = async (channel, queue, event) => {
  await channel.assertQueue(queue, { durable: true });
  channel.sendToQueue(queue, Buffer.from(JSON.stringify(event)), {
    persistent: true,
  });
};

const subscribeEvent = async (channel, queue, callback) => {
  await channel.assertQueue(queue, { durable: true });
  channel.consume(queue, (msg) => {
    if (msg !== null) {
      const content = JSON.parse(msg.content.toString());
      callback(content);
      channel.ack(msg);
    }
  });
};

module.exports = { connectQueue, publishEvent, subscribeEvent };

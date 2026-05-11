const mongoose = require('mongoose');

const connectDB = async (uri, logger) => {
  try {
    const conn = await mongoose.connect(uri);

    if (logger) {
      logger.info(`MongoDB Connected: ${conn.connection.host}`);
    } else {
      console.log(`MongoDB Connected: ${conn.connection.host}`);
    }

    return conn;
  } catch (error) {
    if (logger) {
      logger.error(`Error: ${error.message}`);
    } else {
      console.error(`Error: ${error.message}`);
    }
    process.exit(1);
  }
};

module.exports = { connectDB, mongoose };

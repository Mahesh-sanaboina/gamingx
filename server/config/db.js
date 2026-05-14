const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Falls back to local mongodb if URI is not provided in .env
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/gamingx');
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;

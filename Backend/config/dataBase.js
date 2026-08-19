import mongoose from 'mongoose';
import dotenv from 'dotenv';
import dns from "dns";
 dotenv.config();
 dns.setServers(["1.1.1.1","8.8.8.8"]);

const connectDB = async () => {
  try {
    if (!process.env.MONGO_DB_URL) {
      throw new Error('MONGO_DB_URL is not configured');
    }

    if (mongoose.connection.readyState === 1) {
      return;
    }

    await mongoose.connect(process.env.MONGO_DB_URL);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
};

export default connectDB;
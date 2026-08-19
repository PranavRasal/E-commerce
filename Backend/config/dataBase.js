import mongoose from 'mongoose';
import dotenv from 'dotenv';
import dns from "dns";
 dotenv.config();
 dns.setServers(["1.1.1.1","8.8.8.8"]);

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URL);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

export default connectDB;
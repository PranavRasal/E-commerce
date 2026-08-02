import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import connectDB from './config/dataBase.js';
import User from './models/user.model.js';
import Product from './models/product.model.js';

dotenv.config();

const seedDatabase = async () => {
  try {
    const mongoUrl = process.env.MONGO_DB_URL || 'mongodb://127.0.0.1:27017/ecommerce';
    process.env.MONGO_DB_URL = mongoUrl;

    await connectDB();

    await User.deleteMany({});
    await Product.deleteMany({});

    const hashedPassword = await bcrypt.hash('123456', 10);

    const users = [
      {
        name: 'Admin User',
        email: 'admin@example.com',
        password: hashedPassword,
        role: 'admin',
        verified: true,
      },
      {
        name: 'Jane Doe',
        email: 'jane@example.com',
        password: hashedPassword,
        role: 'user',
        verified: true,
      },
      {
        name: 'John Smith',
        email: 'john@example.com',
        password: hashedPassword,
        role: 'user',
        verified: false,
      },
    ];

    const createdUsers = await User.insertMany(users);

    const products = [
      {
        name: 'Wireless Headphones',
        description: 'Noise-cancelling over-ear headphones with 30-hour battery life.',
        price: 129.99,
        imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
        category: 'Electronics',
        stock: 25,
        rating: 4.7,
        numReviews: 120,
      },
      {
        name: 'Smartwatch',
        description: 'Feature-rich smartwatch with fitness tracking and heart-rate monitoring.',
        price: 199.5,
        imageUrl: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80',
        category: 'Wearables',
        stock: 18,
        rating: 4.4,
        numReviews: 84,
      },
      {
        name: 'Ergonomic Chair',
        description: 'Comfortable office chair with adjustable lumbar support.',
        price: 159.0,
        imageUrl: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80',
        category: 'Furniture',
        stock: 12,
        rating: 4.8,
        numReviews: 67,
      },
      {
        name: 'Coffee Maker',
        description: 'Compact coffee machine with programmable brewing settings.',
        price: 89.99,
        imageUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80',
        category: 'Home',
        stock: 30,
        rating: 4.3,
        numReviews: 45,
      },
    ];

    await Product.insertMany(products);

    console.log('Seed data inserted successfully.');
    console.log(`Created ${createdUsers.length} users and ${products.length} products.`);
  } catch (error) {
    console.error('Seeding failed:', error);
  } finally {
    await mongoose.disconnect();
  }
};

seedDatabase();

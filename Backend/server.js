import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
dotenv.config({ quiet: true });
// import connectDB from './config/dataBase.js';
import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';
import analyticsRoutes from './routes/analyticsRoutes.js';

const app = express();
const PORT = process.env.PORT || 6000;

// connectDB();
import dns from "dns";
dns.setServers(["1.1.1.1", "8.8.8.8"]);

    let isConnected = false;
    let connectionPromise = null;

    const connect = async () => {
        if (isConnected) {
            return;
        }

        if (!process.env.MONGO_DB_URL) {
            console.warn('MONGODB_URI is not set; database routes will fail until it is configured.');
            return;
        }

        if (connectionPromise) {
            return connectionPromise;
        }

        connectionPromise = mongoose.connect(process.env.MONGO_DB_URL, {
                serverSelectionTimeoutMS: 10000,
        })
            .then(() => {
                console.log('Connected to MongoDB');
                isConnected = true;
            })
            .catch((error) => {
                connectionPromise = null;
                throw error;
            });

        await connectionPromise;
    };

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(async (req, res, next) => {
        try {
            await connect();
            next();
        } catch (error) {
            console.error('MongoDB connection failed:', error.message);
            res.status(503).json({ message: 'Database unavailable. Please try again later.' });
        }
    });

app.use('/api/auth' , authRoutes);
app.use('/api/product' , productRoutes); 
app.use('/api/order' , orderRoutes);
app.use('/api/payment' , paymentRoutes);
app.use('/api/analytics' , analyticsRoutes);

app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({
      message: 'Invalid JSON payload. Please send valid JSON with double quotes around property names.'
    });
  }
  next(err);
});

    if (!process.env.VERCEL) {
    app.listen(PORT || 3000, async () => {
        console.log(`Server is running on port ${PORT || 3000}`);
    });
}

export default app;

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// })



// app.get('/', (req, res) => {
//   res.send('API is running...');
// })

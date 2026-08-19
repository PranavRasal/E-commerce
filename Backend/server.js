import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
dotenv.config();
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
dotenv.config({
    path : './.env'
});
    dns.setServers(["1.1.1.1","8.8.8.8"]);

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

        connectionPromise = mongoose.connect(process.env.MONGO_DB_URL)
            .then(() => {
                console.log('Connected to MongoDB');
                isConnected = true;
            })
            .catch((error) => {
                connectionPromise = null;
                console.warn('MongoDB connection failed:', error.message);
            });

        try {
            await connectionPromise;
        } catch (error) {
            console.warn('MongoDB connection failed, continuing without a database connection:', error.message);
        }
    };

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

app.use(async (req, res, next) => {
        try {
            await connect();
            next();
        } catch (error) {
            next(error);
        }
    });

    if (!process.env.VERCEL) {
    app.listen(PORT || 3000, async () => {
        console.log(`Server is running on port ${PORT || 3000}`);
        await connect();
    });
}

export default app;

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// })



// app.get('/', (req, res) => {
//   res.send('API is running...');
// })

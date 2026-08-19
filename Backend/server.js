import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './config/dataBase.js';
import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';
import analyticsRoutes from './routes/analyticsRoutes.js';

const app = express();
const PORT = process.env.PORT || 6000;
let databaseConnection;

const ensureDatabaseConnection = async (req, res, next) => {
  try {
    databaseConnection ??= connectDB();
    await databaseConnection;
    next();
  } catch (error) {
    databaseConnection = undefined;
    next(error);
  }
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get('/', (req, res) => {
  res.json({ message: 'API is running' });
});
app.use(ensureDatabaseConnection);

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
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

export default app;

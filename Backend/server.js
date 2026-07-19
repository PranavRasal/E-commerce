import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './config/dataBase.js';
import authRoutes from './routes/authRoutes.js';

const app = express();
const PORT = process.env.PORT || 6000;

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})

app.use('/api/auth' , authRoutes);
// app.get('/', (req, res) => {
//   res.send('API is running...');
// })

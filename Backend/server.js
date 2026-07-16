import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './config/dataBase.js';

const app = express();
const PORT = process.env.PORT || 6000;

connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})
app.get('/', (req, res) => {
  res.send('API is running...');
})

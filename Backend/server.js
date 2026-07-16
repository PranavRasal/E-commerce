import express from 'express';
import 'dotenv/config';
import connectDB from './Database/index.js';

const app = express();
const PORT = process.env.PORT || 6000;

connectDB();

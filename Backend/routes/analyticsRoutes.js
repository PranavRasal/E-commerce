import express from 'express';
import protect from '../middleware/authmiddleware.js';
import admin from '../middleware/adminMiddleware.js';
import { getAnalyticsData } from '../controllers/analyticsController.js';


const router = express.Router();

router.get('/', protect, admin, getAnalyticsData); // Admin-only route for analytics data

export default router;
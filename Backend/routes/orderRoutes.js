import express from 'express';
import protect from '../middleware/authmiddleware.js';
import admin from '../middleware/adminMiddleware.js';
import { createOrder, getAllOrders, getAllUserOrders, updateOrderStatus } from '../controllers/orderController.js';


const router = express.Router();

//user routes
router.post('/', protect, createOrder);
router.get('/my-orders', protect, getAllUserOrders);

//admin routes
router.get('/', protect, admin, getAllOrders);
router.put('/:id/status', protect, admin, updateOrderStatus);

export default router;
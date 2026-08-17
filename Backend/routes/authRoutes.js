import express from 'express';
import { registerUser , loginUser , getAllUsers , updateUserCart , getUserCart, deleteCartItem, verify, updateUserAddress } from '../controllers/authController.js';
import protect from '../middleware/authmiddleware.js';
import admin from '../middleware/adminMiddleware.js';



const router = express.Router(); 

router.post('/register', registerUser);// Public route for user registration
router.post('/verify-otp', verify); // Public route for OTP verification
router.post('/login', loginUser); // Public route for user login
router.get('/users', protect , admin , getAllUsers); // for admin only, you can add role-based authorization later

// Cart routes
router.put('/user/:userId/cart/:productId', protect, updateUserCart); // Update a single cart item by product id
router.get('/user/:userId/cart', protect, getUserCart); // Get the cart for a specific user
router.delete('/user/:userId/cart/:productId', protect, deleteCartItem); // Delete a single cart item by product id

// Address route
router.put('/user/:userId/address', protect, updateUserAddress); // Update the address for a specific user

export default router;

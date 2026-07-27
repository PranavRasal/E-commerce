import express from 'express';
import { registerUser , loginUser , getAllUsers } from '../controllers/authController.js';
import protect from '../middleware/authmiddleware.js';
import admin from '../middleware/adminMiddleware.js';


const router = express.Router();

router.post('/register', registerUser);// Public route for user registration
router.post('/login', loginUser); // Public route for user login
router.get('/users', protect , admin , getAllUsers); // for admin only, you can add role-based authorization later

export default router;

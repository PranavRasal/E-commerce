import express from 'express';
import { registerUser , loginUser , getAllUsers } from '../controllers/authController.js';
import protect from '../middleware/authmiddleware.js';


const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/users', protect, getAllUsers); // for admin only, you can add role-based authorization later


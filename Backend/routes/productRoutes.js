import express from 'express';
import admin from '../middleware/adminMiddleware.js';
import protect from '../middleware/authmiddleware.js';
import { createProduct , getAllProducts , getProductById , updateProduct , deleteProduct } from '../controllers/productController.js';
import multer from 'multer';
const upload = multer({ dest: 'uploads/' }); // Configure multer to store uploaded files in the 'uploads' directory

const router = express.Router();

router.route('/').get(getAllProducts).post(protect , admin , upload.single('imageUrl'), createProduct);
router.route('/:id').get(getProductById) // route for getting a product by ID
        .put(protect , admin , upload.single('imageUrl'), updateProduct) // route for updating a product by ID
        .delete(protect , admin , deleteProduct); // route for deleting a product by ID


export default router;
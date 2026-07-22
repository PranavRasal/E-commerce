import express from 'express';
import admin from '../middleware/adminMiddleware';
import protect from '../middleware/authmiddleware';
import { createProduct , getAllProducts , getProductById , updateProduct , deleteProduct } from '../controllers/productController.js';
import multer from 'multer';
const upload = multer({ dest: 'uploads/' }); // Configure multer to store uploaded files in the 'uploads' directory

const router = express.Router();

router.route('/').get(getAllProducts).post(protect , admin , upload.single('image'), createProduct);
router.route('/:id').get(getProductById)
        .put(protect , admin , upload.single('image'), updateProduct)
        .delete(protect , admin , deleteProduct);


export default router;
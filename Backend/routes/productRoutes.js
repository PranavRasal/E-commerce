import express from 'express';
import admin from '../middleware/adminMiddleware';
import protect from '../middleware/authmiddleware';
import { createProduct , getAllProducts , getProductById , updateProduct , deleteProduct } from '../controllers/productController.js';


const router = express.Router();

router.route('/').get(getAllProducts).post(protect , admin , createProduct);
router.route('/:id').get(getProductById)
        .put(protect , admin , updateProduct)
        .delete(protect , admin , deleteProduct);


export default router;
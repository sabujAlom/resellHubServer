import express from 'express';
import { getProducts, getProductById, createProduct, updateProduct, deleteProduct } from '../controllers/productController.js';
import { verifyJWT } from '../middleware/verifyJWT.js';
import { verifySeller } from '../middleware/verifySeller.js';

const router = express.Router();

router.get('/', getProducts);
router.get('/:id', getProductById);
router.post('/', verifyJWT, verifySeller, createProduct);
router.patch('/:id', verifyJWT, verifySeller, updateProduct);
router.delete('/:id', verifyJWT, verifySeller, deleteProduct);

export default router;

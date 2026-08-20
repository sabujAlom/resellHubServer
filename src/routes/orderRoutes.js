import express from 'express';
import { getOrders, createOrder, updateOrder } from '../controllers/orderController.js';
import { verifyJWT } from '../middleware/verifyJWT.js';

const router = express.Router();

router.get('/', verifyJWT, getOrders);
router.post('/', verifyJWT, createOrder);
router.patch('/:id', verifyJWT, updateOrder);

export default router;

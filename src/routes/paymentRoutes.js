import express from 'express';
import { createPaymentIntent, createPayment, getPayments, createCheckoutSession, verifySession } from '../controllers/paymentController.js';
import { verifyJWT } from '../middleware/verifyJWT.js';

const router = express.Router();

router.post('/create-payment-intent', verifyJWT, createPaymentIntent);
router.post('/create-checkout-session', verifyJWT, createCheckoutSession);
router.get('/verify-session', verifyJWT, verifySession);
router.post('/payments', verifyJWT, createPayment);
router.post('/', verifyJWT, createPayment);
router.get('/payments', verifyJWT, getPayments);
router.get('/', verifyJWT, getPayments);

export default router;

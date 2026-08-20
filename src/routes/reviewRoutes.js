import express from 'express';
import { getReviews, createReview } from '../controllers/reviewController.js';
import { verifyJWT } from '../middleware/verifyJWT.js';

const router = express.Router();

router.get('/', getReviews);
router.post('/', verifyJWT, createReview);

export default router;

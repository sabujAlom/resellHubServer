import express from 'express';
import { register, login, generateJWT } from '../controllers/authController.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/jwt', generateJWT);

export default router;

import express from 'express';
import { getAllUsers, updateUser, deleteUser } from '../controllers/userController.js';
import { verifyJWT } from '../middleware/verifyJWT.js';
import { verifyAdmin } from '../middleware/verifyAdmin.js';

const router = express.Router();

router.get('/', verifyJWT, verifyAdmin, getAllUsers);
router.patch('/:id', verifyJWT, verifyAdmin, updateUser);
router.delete('/:id', verifyJWT, verifyAdmin, deleteUser);

export default router;

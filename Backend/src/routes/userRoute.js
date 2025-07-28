import express from 'express';
import {register, login, getUserProfile, updateUser} from '../controllers/userController.js';
import { authenticateToken } from '../middlewares/auth.middleware.js';    
import db from '../models/index.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

router.get('/profile', authenticateToken, getUserProfile);
router.post('/update', authenticateToken, updateUser);




export default router;
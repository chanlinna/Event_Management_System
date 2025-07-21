import express from 'express';
import {
    register,
    login,
    authenticateToken

} from '../controllers/loginController.js';


const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/user', authenticateToken);

export default router;
import express from 'express';
import {
    login,
    authenticateToken

} from '../controllers/loginController.js';


const router = express.Router();

router.post('/login', login);
router.get('/user', authenticateToken);

export default router;
import express from 'express';
import {
    register,
    login,
    adminAuthenticateToken

} from '../controllers/loginController.js';


const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/admin', adminAuthenticateToken);

export default router;
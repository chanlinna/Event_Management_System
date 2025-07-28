import express from 'express';
import { createBooking } from '../controllers/bookingController.js';
import { authenticateToken } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/', authenticateToken, createBooking);

export default router;

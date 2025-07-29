import express from 'express';
import { createBooking, getUserBookings } from '../controllers/bookingController.js';
import { authenticateToken } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/', authenticateToken, createBooking);
router.get('/mybookings', authenticateToken, getUserBookings);

export default router;

import express from 'express';
const router = express.Router();
import {
  createEvent,
  getEvents,
  getEventById
} from '../controllers/eventController.js'; 
import upload from '../middlewares/upload.middleware.js'; 

router.post('/', upload.single('imageUrl'), createEvent);

// Route for getting all events
router.get('/', getEvents);

// Route for getting a single event by ID
router.get('/:id', getEventById);

export default router;
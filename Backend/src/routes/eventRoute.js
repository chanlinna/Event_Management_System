// backend/routes/eventRoutes.js
import express from 'express';
const router = express.Router();
import {
  createEvent,
  getEvents,
  getEventById
} from '../controllers/eventController.js'; 
import upload from '../middlewares/upload.middleware.js'; 

// Route for creating a new event
// IMPORTANT: 'imageUrl' in upload.single('imageUrl') must match the 'name' attribute
// of your <input type="file" name="imageUrl" /> in the frontend form.
router.post('/', upload.single('imageUrl'), createEvent);

// Route for getting all events
router.get('/', getEvents);

// Route for getting a single event by ID
router.get('/:id', getEventById);

export default router;
import { getAllVenues, createVenue, getVenueById, updateVenue, deleteVenue, searchVenues} from "../controllers/venueController.js";
import upload from '../middlewares/upload.middleware.js';
import express from 'express';
import multer from 'multer';

const router = express.Router();

router.post('/', upload.single('image'), createVenue);

router.get('/search', searchVenues);
router.get('/', getAllVenues);
router.get('/:id', getVenueById);
router.put('/:id', updateVenue);
router.delete('/:id', deleteVenue);

export default router;

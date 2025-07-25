import { getAllVenues, createVenue, getVenueById, updateVenue, deleteVenue } from "../controllers/venueController.js";

import express from 'express';

const router = express.Router();

router.get('/', getAllVenues);
router.post('/', createVenue);
router.get('/:id', getVenueById);
router.put('/:id', updateVenue);
router.delete('/:id', deleteVenue);

export default router;

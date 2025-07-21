import venueController from "../controllers/venueController.js";

import express from 'express';

const router = express.Router();

router.get('/', venueController.getAllVenues);
router.post('/', venueController.createVenue);
router.put('/:id', venueController.updateVenue);
router.delete('/:id', venueController.deleteVenue);

export default router;

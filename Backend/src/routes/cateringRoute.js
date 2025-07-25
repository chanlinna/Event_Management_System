import express from 'express';
import { getAllCaterings, createCatering, getCateringById, updateCatering, deleteCatering } from '../controllers/cateringController.js'; 
import db from '../models/index.js';

const router = express.Router();

router.get('/', getAllCaterings);
router.post('/', createCatering);
router.get('/:id', getCateringById);
router.put('/:id', updateCatering);
router.delete('/:id', deleteCatering);


export default router;
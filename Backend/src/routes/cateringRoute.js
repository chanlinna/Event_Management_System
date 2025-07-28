import express from 'express';
import { getAllCaterings, createCatering, getCateringById, updateCatering, deleteCatering } from '../controllers/cateringController.js'; 
import upload from '../middlewares/upload.middleware.js';
import db from '../models/index.js';

const router = express.Router();

router.post('/', upload.single('image') , createCatering);

router.get('/', getAllCaterings);
router.get('/:id', getCateringById);
router.put('/:id', updateCatering);
router.delete('/:id', deleteCatering);


export default router;
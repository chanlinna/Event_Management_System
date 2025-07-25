import db from '../models/index.js';

/**
 * @swagger
 * tags:
 *   - name: Catering
 *     description: Catering management
 */

/**
 * @swagger
 * /caterings:
 *   post:
 *     summary: Create a new catering
 *     tags: [Catering]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [ catering_set, price]
 *             properties:
 *               catering_set:
 *                 type: string
 *               price:
 *                 type: number
 *                 format: float

 *     responses:
 *       201:
 *         description: Catering created
 */
export const createCatering = async (req, res) => {
    try {
        const catering = await db.Catering.create(req.body);
        res.status(201).json(catering);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

/**
 * @swagger
 * /caterings:
 *   get:
 *     summary: Get all caterings
 *     tags: [Catering]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema: { type: integer, default: 1 }
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema: { type: integer, default: 10 }
 *         description: Number of items per page
 *       - in: query
 *         name: sortby
 *         schema:
 *           type: string
 *           enum: [catering_set, price]
 *         description: Sort by field (prefix with 'Desc' for descending)
 *     responses:
 *       200:
 *         description: List of caterings
 */

export const getAllCaterings = async (req, res) => {

    // take certain amount at a time
    const limit = parseInt(req.query.limit) || 10;
    // which page to take
    const page = parseInt(req.query.page) || 1;

    const total = await db.Catering.count();

    //sorting
    let sortby = req.query.sortby || 'price';
    let sortField = sortby;
    let sortOrder = 'ASC';


    try {
        const catering = await db.Catering.findAll(
            {
                // include: [db.Student, db.Teacher],
                limit: limit, 
                offset: (page - 1) * limit, 
                order: [[sortField, sortOrder]]
            }
        );
        res.json({
            meta: {
                totalItems: total,
                page: page,
                totalPages: Math.ceil(total / limit),
            },
            data: catering,
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

/**
 * @swagger
 * /caterings/{id}:
 *   get:
 *     summary: Get a catering by ID
 *     tags: [Catering]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *       - in: query
 *         name: populate
 *         schema:
 *           type: string
 *           example: events
 *         description: Include related models (e.g., events)
 *     responses:
 *       200:
 *         description: Catering found
 *       404:
 *         description: Not found
 */
export const getCateringById = async (req, res) => {

    const populate = req.query.populate?.toLowerCase().split(',').map(p => p.trim()) || [];
    const include = [];

    if (populate.includes('event') || populate.includes('events')) {
        include.push({
            model: db.Event,
            through: { attributes: [] },
        });
    }

    try {
        const catering = await db.Catering.findByPk(req.params.id, { include});
        if (!catering) return res.status(404).json({ message: 'Not found' });
        res.json(catering);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

/**
 * @swagger
 * /caterings/{id}:
 *   put:
 *     summary: Update a catering
 *     tags: [Catering]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { type: object }
 *     responses:
 *       200:
 *         description: Catering updated
 */
export const updateCatering = async (req, res) => {
    try {
        const catering = await db.Catering.findByPk(req.params.id);
        if (!catering) return res.status(404).json({ message: 'Not found' });
        await catering.update(req.body);
        res.json(catering);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

/**
 * @swagger
 * /caterings/{id}:
 *   delete:
 *     summary: Delete a catering
 *     tags: [Catering]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Catering deleted
 */
export const deleteCatering = async (req, res) => {
    try {
        const catering = await db.Catering.findByPk(req.params.id);
        if (!catering) return res.status(404).json({ message: 'Not found' });
        await catering.destroy();
        res.json({ message: 'Deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
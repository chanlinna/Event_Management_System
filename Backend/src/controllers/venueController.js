import db from '../models/index.js';


/**
 * @swagger
 * tags:
 *   - name: Venues
 *     description: Venue management
 */

/**
 * @swagger
 * /venues:
 *   post:
 *     summary: Create a new venue
 *     tags: [Venues]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, location, max_occupancy, phone]
 *             properties:
 *               name:
 *                 type: string
 *               location:
 *                 type: string
 *               max_occupancy:
 *                 type: integer
 *               phone:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       201:
 *         description: Venue created
 */
export const createVenue = async (req, res) => {
  try {
    const { name, location, max_occupancy, phone, email, price } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    const venue = await db.Venue.create({
      name,
      location,
      max_occupancy,
      phone,
      email,
      price,
      imageUrl,
    });

    res.status(201).json(venue);
  } catch (err) {
    console.error('Create venue error:', err);
    res.status(500).json({ error: err.message });
  }
};


/**
 * @swagger
 * /venues:
 *   get:
 *     summary: Get all venues
 *     tags: [Venues]
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
 *           enum: [name, location, max_occupancy]
 *         description: Sort by field (prefix with 'Desc' for descending)
 *     responses:
 *       200:
 *         description: List of caterings
 */

export const getAllVenues = async (req, res) => {

    // take certain amount at a time
    const limit = parseInt(req.query.limit) || 10;
    // which page to take
    const page = parseInt(req.query.page) || 1;

    const total = await db.Venue.count();

    //sorting
    let sortby = req.query.sortby || 'max_occupancy';
    let sortField = sortby;
    let sortOrder = 'ASC';

    if (sortby.endsWith('Desc')) {
        sortField = sortby.replace('Desc', '');
        sortOrder = 'DESC';
     }

    try {
        const venues = await db.Venue.findAll(
            {
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
            data: venues,
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

/**
 * @swagger
 * /venues/{id}:
 *   get:
 *     summary: Get a venue by ID
 *     tags: [Venues]
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
 *         description: Venue found
 *       404:
 *         description: Not found
 */
export const getVenueById = async (req, res) => {

    const populate = req.query.populate?.toLowerCase().split(',').map(p => p.trim()) || [];
    const include = [];

    if (populate.includes('event') || populate.includes('events')) {
        include.push(db.Event);
    }

    try {
        const venue = await db.Venue.findByPk(req.params.id, { include});
        if (!venue) return res.status(404).json({ message: 'Not found' });
        res.json(venue);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

/**
 * @swagger
 * /venues/{id}:
 *   put:
 *     summary: Update a venue
 *     tags: [Venues]
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
 *         description: Venue updated
 */
export const updateVenue = async (req, res) => {
    try {
        const venue = await db.Venue.findByPk(req.params.id);
        if (!venue) return res.status(404).json({ message: 'Not found' });
        await venue.update(req.body);
        res.json(venue);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

/**
 * @swagger
 * /venues/{id}:
 *   delete:
 *     summary: Delete a venue
 *     tags: [Venues]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Venue deleted
 */
export const deleteVenue = async (req, res) => {
    try {
        const venue = await db.Venue.findByPk(req.params.id);
        if (!venue) return res.status(404).json({ message: 'Not found' });
        await venue.destroy();
        res.json({ message: 'Deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

/**
 * @swagger
 * /venues/search:
 *   get:
 *     summary: Search venues by location, capacity, and sort them
 *     tags: [Venues]
 *     parameters:
 *       - in: query
 *         name: location
 *         schema: { type: string }
 *         description: Partial match for venue.location
 *       - in: query
 *         name: max_occupancy
 *         schema: { type: integer }
 *         description: Minimum required capacity
 *       - in: query
 *         name: price
 *         schema: { type: number }
 *         description: Maximum price per day
 *       - in: query
 *         name: page
 *         schema: { type: integer }
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema: { type: integer }
 *         description: Items per page
 *       - in: query
 *         name: sortby
 *         schema: { type: string }
 *         description: Field to sort by (e.g., max_occupancy, max_occupancyDesc, price, priceDesc)
 *     responses:
 *       200:
 *         description: Filtered venues
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Venue'
 *                 meta:
 *                   type: object
 *                   properties:
 *                     totalItems:
 *                       type: integer
 *                     currentPage:
 *                       type: integer
 *                     totalPages:
 *                       type: integer
 */
export const searchVenues = async (req, res) => {
  try {
    const max_occupancy = req.query.max_occupancy ? parseInt(req.query.max_occupancy) : null;
    const price = req.query.price ? parseFloat(req.query.price) : null;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const sortBy = req.query.sortby || 'max_occupancy';

    if (req.query.max_occupancy && isNaN(max_occupancy)) {
      return res.status(400).json({ error: 'Invalid max_occupancy parameter' });
    }

    const where = {};

    if (req.query.location) {
      where.location = {
        [db.Sequelize.Op.like]: `%${req.query.location}%`
      };
    }

    if (max_occupancy !== null) {
      where.max_occupancy = {
        [db.Sequelize.Op.lte]: max_occupancy
      };
    }

    if (price !== null) {
      where.price = {
        [db.Sequelize.Op.lte]: price
      };
    }

    let order = [['max_occupancy', 'ASC']];
    if (sortBy.endsWith('Desc')) {
      const field = sortBy.replace('Desc', '');
      order = [[field, 'DESC']];
    } else {
      order = [[sortBy, 'ASC']];
    }

    const { count, rows } = await db.Venue.findAndCountAll({
      where,
      order,
      limit,
      offset: (page - 1) * limit,
      attributes: ['venueId', 'name', 'location', 'max_occupancy', 'price', 'imageUrl']
    });

    res.json({
      data: rows,
      meta: {
        totalItems: count,
        currentPage: page,
        totalPages: Math.ceil(count / limit)
      }
    });
  } catch (err) {
    console.error('Search error:', err);
    res.status(500).json({ error: 'Venue search failed' });
  }
};




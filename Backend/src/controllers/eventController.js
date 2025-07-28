
// backend/controllers/eventController.js

import db from '../models/index.js'; // Import all models and Sequelize instance
const { Event, EventType, Venue, Customer, Catering, EventCatering, sequelize, Op } = db;
import enums from '../models/enums.js'; // Import enums for validation

// Helper function for sorting based on query parameter
const getOrderOptions = (sortBy) => {
  switch (sortBy) {
    case 'name': return [['name', 'ASC']];
    case 'nameDesc': return [['name', 'DESC']];
    case 'startDate': return [['startDate', 'ASC']]; // Assuming 'startDate' is the field in your model
    case 'startDateDesc': return [['startDate', 'DESC']];
    case 'budget': return [['budget', 'ASC']];
    case 'budgetDesc': return [['budget', 'DESC']];
    default: return [['startDate', 'ASC']]; // Default sort
  }
};


// @desc    Create a new event
// @route   POST /events
// @access  Private (e.g., requires authentication)
export const createEvent = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const {
      name,
      startDate,
      end_date,
      desc,
      budget,
      status,
      eventTypeId,
      venueId,
      custId,
      cateringIds,
      num_of_sets
    } = req.body; // imageUrl is NOT destructured from req.body now

    // --- NEW: Handle imageUrl from file upload ---
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;
    // --- END NEW ---

    // 1. Server-side Validation
    if (!name || !startDate || !eventTypeId || !venueId || !custId) {
      // Optional: Clean up uploaded file if validation fails here
      if (req.file) {
        // You would need a utility function to delete the file from the uploads folder
        // For example: deleteFile(req.file.path);
        console.warn(`Uploaded file ${req.file.filename} will not be used due to missing required fields.`);
      }
      await transaction.rollback();
      return res.status(400).json({ message: 'Missing required event fields: name, startDate, eventTypeId, venueId, custId.' });
    }

    if (end_date && new Date(end_date) <= new Date(startDate)) {
      if (req.file) { /* deleteFile(req.file.path); */ }
      await transaction.rollback();
      return res.status(400).json({ message: 'End date must be after start date.' });
    }

    if (budget !== undefined && (isNaN(budget) || budget < 0)) {
        if (req.file) { /* deleteFile(req.file.path); */ }
        await transaction.rollback();
        return res.status(400).json({ message: 'Budget must be a non-negative number.' });
    }

    if (status && !enums.StatusEnum.includes(status)) {
        if (req.file) { /* deleteFile(req.file.path); */ }
        await transaction.rollback();
        return res.status(400).json({ message: `Invalid status. Must be one of: ${enums.StatusEnum.join(', ')}.` });
    }

    const [eventType, venue, customer] = await Promise.all([
      EventType.findByPk(eventTypeId),
      Venue.findByPk(venueId),
      Customer.findByPk(custId)
    ]);

    if (!eventType) {
      if (req.file) { /* deleteFile(req.file.path); */ }
      await transaction.rollback();
      return res.status(404).json({ message: `EventType with ID ${eventTypeId} not found.` });
    }
    if (!venue) {
      if (req.file) { /* deleteFile(req.file.path); */ }
      await transaction.rollback();
      return res.status(404).json({ message: `Venue with ID ${venueId} not found.` });
    }
    if (!customer) {
      if (req.file) { /* deleteFile(req.file.path); */ }
      await transaction.rollback();
      return res.status(404).json({ message: `Customer with ID ${custId} not found.` });
    }

    // 2. Create the Event record
    const newEvent = await Event.create({
      name,
      startDate,
      end_date: end_date || null,
      desc,
      budget,
      status: status || 'pending',
      eventTypeId,
      venueId,
      custId,
      imageUrl, // <--- Now using the imageUrl derived from req.file
    }, { transaction });

    // 3. Handle EventCatering (Many-to-Many relationship) (same as before)
    if (cateringIds && cateringIds.length > 0) {
      if (!Array.isArray(num_of_sets) || cateringIds.length !== num_of_sets.length) {
        if (req.file) { /* deleteFile(req.file.path); */ } // Cleanup if this fails
        await transaction.rollback();
        return res.status(400).json({ message: 'num_of_sets array must match cateringIds array in length.' });
      }

      const eventCateringRecords = cateringIds.map((cateringId, index) => ({
        eventId: newEvent.eventId,
        cateringId: cateringId,
        num_of_set: num_of_sets[index] || 1
      }));

      const existingCaterings = await Catering.findAll({
        where: { cateringId: cateringIds }
      });
      if (existingCaterings.length !== cateringIds.length) {
        if (req.file) { /* deleteFile(req.file.path); */ } // Cleanup if this fails
        await transaction.rollback();
        return res.status(404).json({ message: 'One or more catering IDs not found.' });
      }

      await EventCatering.bulkCreate(eventCateringRecords, { transaction });
    }

    await transaction.commit();

    // 4. Send success response with created event (and potentially populated associations)
    const createdEventWithAssociations = await Event.findByPk(newEvent.eventId, {
      include: [
        { model: EventType },
        { model: Venue },
        { model: Customer },
        { model: Catering, through: { attributes: ['num_of_set'] } }
      ]
    });

    res.status(201).json({
      message: 'Event created successfully!',
      event: createdEventWithAssociations,
    });

  } catch (error) {
    await transaction.rollback();
    console.error('Error creating event:', error);
    // Important: If an error occurs after file upload but before database save, delete the file!
    if (req.file) {
      // You'll need to import 'fs' or your file deletion utility here
      // Example: fs.unlink(req.file.path, (err) => { if (err) console.error('Error deleting file:', err); });
      console.error(`Attempting to delete uploaded file: ${req.file.path}`);
      // Add your file deletion logic here
    }

    if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: 'Server Error: Could not create event.' });
  }
};

// @desc    Get all events with joined tables
// @route   GET /api/events
// @access  Public
export const getEvents = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    const sortBy = req.query.sortBy || 'startDate'; // Default sort by startDate
    const order = getOrderOptions(sortBy); // Get order options based on sortBy param

    // Optional filtering (e.g., by event type, venue, date range)
    const where = {};
    if (req.query.eventTypeId) {
        where.eventTypeId = req.query.eventTypeId;
    }
    if (req.query.venueId) {
        where.venueId = req.query.venueId;
    }
    if (req.query.status) {
        if (enums.StatusEnum.includes(req.query.status)) {
            where.status = req.query.status;
        }
    }
    // Example: filter by start date range
    if (req.query.startDateAfter) {
        where.startDate = { [Op.gte]: new Date(req.query.startDateAfter) };
    }
    if (req.query.startDateBefore) {
        where.startDate = { ...where.startDate, [Op.lte]: new Date(req.query.startDateBefore) };
    }


    const { count, rows: events } = await Event.findAndCountAll({
      where, // Apply filters here
      limit,
      offset,
      order, // Apply sorting here
      attributes: { exclude: [] }, // Make sure imageUrl is not excluded
      include: [ // Define which associated models to include (JOIN)
        {
          model: EventType, // Includes EventType details
          attributes: ['name'] // Only get the 'name' attribute from EventType
        },
        {
          model: Venue, // Includes Venue details (ASSUMED Venue model exists)
          attributes: ['name', 'location', 'max_occupancy'] // Example attributes
        },
        {
          model: Customer, // Includes Customer details (ASSUMED Customer model exists)
          // THIS IS THE LINE TO CHANGE:
          attributes: ['custId', 'firstName', 'lastName'] 
        },
        {
          model: Catering, // Includes Catering details through EventCatering join table
          through: { attributes: ['num_of_set'] }, // Get num_of_set from the join table
          attributes: ['catering_set', 'price'] // Example attributes from Catering model
        }
      ]
    });

    res.status(200).json({
      data: events,
      meta: {
        totalItems: count,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
        itemsPerPage: limit,
      },
    });

  } catch (error) {
    console.error('Error getting events:', error);
    res.status(500).json({ message: 'Server Error: Could not retrieve events.' });
  }
};


// @desc    Get event by ID with joined tables
// @route   GET /api/events/:id
// @access  Public
export const getEventById = async (req, res) => {
  try {
    const { id } = req.params;

    const event = await Event.findByPk(id, {
      include: [ // Define which associated models to include (JOIN)
        {
          model: EventType,
          attributes: ['name']
        },
        {
          model: Venue, // ASSUMED Venue model exists
          attributes: ['name', 'location', 'max_occupancy']
        },
        {
          model: Customer, // ASSUMED Customer model exists
          attributes: ['custId', 'firstName', 'lastName']
        },
        {
          model: Catering, // Include Catering details through EventCatering
          through: { attributes: ['num_of_set'] },
          attributes: ['catering_set', 'price', 'cateringId']
        }
      ]
    });

    if (!event) {
      return res.status(404).json({ message: 'Event not found.' });
    }

    res.status(200).json(event);

  } catch (error) {
    console.error('Error getting event by ID:', error);
    res.status(500).json({ message: 'Server Error: Could not retrieve event.' });
  }
};
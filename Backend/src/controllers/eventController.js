
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
// 

export const createEvent = async (req, res) => {
  console.log('--- createEvent: Request received ---');
  const transaction = await sequelize.transaction();
  try {
    const {
      name, startDate, end_date, desc, budget, status,
      eventTypeId, venueId, custId,
      cateringIds, // These are strings from req.body
      numOfSets // These are strings from req.body
    } = req.body;

    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    console.log('createEvent: Request Body (raw):', req.body); // Keep for debugging raw
    console.log('createEvent: Uploaded Image URL:', imageUrl);
    console.log('createEvent: File object (if present):', req.file);

    // --- NEW: Parse cateringIds and numOfSets to actual numbers ---
    let parsedCateringIds = [];
    let parsedNumOfSets = [];

    if (cateringIds) { // Check if cateringIds exist from req.body
      // If cateringIds comes as a single string "1", or "1,2", split it
      // If it comes as an array ['1'], map it directly.
      const rawCateringIds = Array.isArray(cateringIds) ? cateringIds : (cateringIds ? cateringIds.split(',') : []);
      const rawNumOfSets = Array.isArray(numOfSets) ? numOfSets : (numOfSets ? numOfSets.split(',') : []);

      parsedCateringIds = rawCateringIds.map(id => parseInt(id)).filter(id => !isNaN(id));
      parsedNumOfSets = rawNumOfSets.map(num => parseInt(num)).filter(num => !isNaN(num));
    }
    console.log('createEvent: Parsed cateringIds:', parsedCateringIds); // NEW LOG
    console.log('createEvent: Parsed numOfSets:', parsedNumOfSets);     // NEW LOG
    // --- END NEW ---

    // 1. Server-side Validation (use parsed values now)
    if (!name || !startDate || !end_date || !venueId || !eventTypeId || !custId) {
      if (req.file) { /* deleteFile(req.file.path); */ }
      await transaction.rollback();
      return res.status(400).json({ message: 'Missing required event fields: name, startDate, end_date, venueId, eventTypeId, custId.' });
    }

    // You might also need to parse venueId, eventTypeId, custId if they are strings from req.body
    const parsedVenueId = parseInt(venueId);
    const parsedEventTypeId = parseInt(eventTypeId);
    const parsedCustId = parseInt(custId);

    if (isNaN(parsedVenueId) || isNaN(parsedEventTypeId) || isNaN(parsedCustId)) {
        await transaction.rollback();
        return res.status(400).json({ message: 'Venue ID, Event Type ID, and Customer ID must be valid numbers.' });
    }


    // ... (rest of your existing validation logic using parsedVenueId, parsedEventTypeId, parsedCustId) ...
    const [eventType, venue, customer] = await Promise.all([
      EventType.findByPk(parsedEventTypeId), // Use parsed ID
      Venue.findByPk(parsedVenueId),       // Use parsed ID
      Customer.findByPk(parsedCustId)       // Use parsed ID
    ]);
    // ...

    // 2. Create the Event record (use parsed IDs)
    const newEvent = await Event.create({
      name, startDate, end_date: end_date || null, desc, budget, status: status || 'pending',
      eventTypeId: parsedEventTypeId, // Use parsed ID
      venueId: parsedVenueId,         // Use parsed ID
      custId: parsedCustId,           // Use parsed ID
      imageUrl,
    }, { transaction });

    console.log('createEvent: Event created in DB (temporary ID):', newEvent.eventId);

    // 3. Handle EventCatering (Many-to-Many relationship)
    // Use parsedCateringIds and parsedNumOfSets for this validation and creation
    if (parsedCateringIds.length > 0) { // Check if we have any parsed catering
      if (parsedCateringIds.length !== parsedNumOfSets.length) {
        if (req.file) { /* deleteFile(req.file.path); */ }
        await transaction.rollback();
        // This specific error message should ideally now be caught by frontend validation first
        return res.status(400).json({ message: 'Catering IDs and number of sets arrays must match in length after parsing.' });
      }

      const eventCateringRecords = parsedCateringIds.map((cateringId, index) => ({
        eventId: newEvent.eventId,
        cateringId: cateringId, // Now this is a number
        num_of_set: parsedNumOfSets[index] // Now this is a number
      }));

      const existingCaterings = await Catering.findAll({
        where: { cateringId: parsedCateringIds } // Use parsed IDs here
      });
      if (existingCaterings.length !== parsedCateringIds.length) {
        if (req.file) { /* deleteFile(req.file.path); */ }
        await transaction.rollback();
        return res.status(404).json({ message: 'One or more catering IDs not found.' });
      }

      await EventCatering.bulkCreate(eventCateringRecords, { transaction });
      console.log('createEvent: Catering records created.');
    }

    await transaction.commit();
    console.log('createEvent: Transaction committed successfully.');

    const createdEventWithAssociations = await Event.findByPk(newEvent.eventId, {
      include: [
        { model: EventType }, { model: Venue }, { model: Customer },
        { model: Catering, through: { attributes: ['num_of_set'] } }
      ]
    });
    console.log('createEvent: Associations populated.');

    res.status(201).json({ message: 'Event created successfully!', event: createdEventWithAssociations });

  } catch (error) {
    await transaction.rollback();
    console.error('--- createEvent: Error Caught ---');
    console.error('Error name:', error.name);
    console.error('Error message:', error.message);
    console.error('Full Error Object:', JSON.stringify(error, null, 2));
    console.error('Error Stack:', error.stack);

    if (req.file) {
      console.error(`Attempting to delete orphaned uploaded file: ${req.file.path}`);
    }

    if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ message: error.message });
    }
    if (error.name === 'SequelizeForeignKeyConstraintError') {
        return res.status(400).json({ message: 'Foreign key constraint failed. Ensure Venue ID, Event Type ID, Customer ID, and Catering IDs exist.' });
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
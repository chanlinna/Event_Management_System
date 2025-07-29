import db from '../models/index.js'; 
const { Event, EventCatering, Customer, Venue, Catering, EventType, User } = db;


/**
 * @swagger
 * /bookings:
 *   post:
 *     summary: Create a new event booking
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - startDate
 *               - endDate
 *               - desc
 *               - eventType
 *               - venue
 *               - catering
 *               - num_of_set
 *               - budget
 *             properties:
 *               name:
 *                 type: string
 *               startDate:
 *                 type: string
 *                 format: date
 *               endDate:
 *                 type: string
 *                 format: date
 *               desc:
 *                 type: string
 *               eventType:
 *                 type: string
 *               venue:
 *                 type: string
 *               catering:
 *                 type: string
 *               num_of_set:
 *                 type: integer
 *               budget:
 *                 type: number
 *     responses:
 *       201:
 *         description: Booking successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 bookingId:
 *                   type: integer
 *       401:
 *         description: Unauthorized – Token missing or invalid
 *       403:
 *         description: Forbidden – Invalid or expired token
 *       500:
 *         description: Server error
 */

export const createBooking = async (req, res) => {
  try {
    const {
      // Customer info
      firstName,
      lastName,
      organizationName,
      phoneNumber,
      // Event info
      name,
      startDate,
      endDate,
      desc,
      eventType,
      venue,
      catering,
      num_of_set,
      budget,
    } = req.body;

    // User ID from auth middleware (assume JWT verified)
    const userId = req.user.userId;
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    // Find or create customer for this user
    let customer = await Customer.findOne({ where: { userId } });
    if (!customer) {
      customer = await Customer.create({
        firstName,
        lastName,
        organizationName,
        phoneNumber,
        userId,
      });
    } else {
      // Optionally update customer info on booking
      await customer.update({
        firstName,
        lastName,
        organizationName,
        phoneNumber,
      });
    }

    // Find associated venue, catering, eventType by their names
    const selectedVenue = await Venue.findOne({ where: { name: venue } });
    if (!selectedVenue) return res.status(404).json({ error: "Venue not found" });

    const selectedCatering = await Catering.findOne({ where: { catering_set: catering } });
    if (!selectedCatering) return res.status(404).json({ error: "Catering not found" });

    const selectedEventType = await EventType.findOne({ where: { name: eventType } });
    if (!selectedEventType) return res.status(404).json({ error: "Event type not found" });

    // Create event booking with customer ID
    const newEvent = await Event.create({
      name,
      startDate,
      end_date: endDate,
      desc,
      budget,
      eventTypeId: selectedEventType.eventTypeId,
      venueId: selectedVenue.venueId,
      custId: customer.custId,
    });

    // Create event catering association
    await EventCatering.create({
      eventId: newEvent.eventId,
      cateringId: selectedCatering.cateringId,
      num_of_set,
    });

    return res.status(201).json({
      message: "Booking successful",
      bookingId: newEvent.eventId,
    });
  } catch (err) {
    console.error("Error creating booking:", err);
    if (err.errors) {
      err.errors.forEach((e) => console.error(e.message));
    }
    return res.status(500).json({
      error: "Something went wrong while booking.",
      details: err.message,
    });
  }
};

export const getUserBookings = async (req, res) => {
  try {
    const userId = req.user.userId; 

    // Find all customers linked to this user
    const customers = await Customer.findAll({
      where: { userId },
      attributes: ['custId'],
    });

    const custIds = customers.map(c => c.custId);

    if (custIds.length === 0) {
      return res.json([]); 
    }

    // Fetch bookings with related info
    const bookings = await Event.findAll({
      where: { custId: custIds },
      order: [['startDate', 'DESC']],
      include: [
        { model: Venue, attributes: ['name'] },
        { model: EventType, attributes: ['name'] },
        { 
          model: EventCatering,
          attributes: ['num_of_set'],
          include: [{ model: Catering, attributes: ['catering_set'] }]
        }
      ],
    });

    res.json(bookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

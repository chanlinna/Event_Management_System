/**
 * @swagger
 * /api/admin/bookings:
 *   get:
 *     summary: List bookings with filters
 *     tags: [Bookings]
 *     parameters:
 *       - in: query
 *         name: date
 *         schema:
 *           type: string
 *       - in: query
 *         name: venue
 *         schema:
 *           type: string
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of bookings
 */

/**
 * @swagger
 * /api/admin/bookings/{id}:
 *   get:
 *     summary: View booking details
 *     tags: [Bookings]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Booking details
 *   put:
 *     summary: Edit booking
 *     tags: [Bookings]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Booking updated
 *   delete:
 *     summary: Cancel booking
 *     tags: [Bookings]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Booking cancelled
 */
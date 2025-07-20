/**
 * @swagger
 * tags:
 *   - name: Dashboard
 *     description: Dashboard overview and activity
 *   - name: Venues
 *     description: Venue management
 *   - name: Catering
 *     description: Catering management
 *   - name: Bookings
 *     description: Booking management
 *   - name: Users
 *     description: User management
 */

/**
 * @swagger
 * /api/admin/dashboard/overview:
 *   get:
 *     summary: Get dashboard overview
 *     tags: [Dashboard]
 *     responses:
 *       200:
 *         description: Overview data including total bookings, venues, and catering options
 */

/**
 * @swagger
 * /api/admin/dashboard/activity:
 *   get:
 *     summary: Get recent activity list
 *     tags: [Dashboard]
 *     responses:
 *       200:
 *         description: List of recent activities
 */
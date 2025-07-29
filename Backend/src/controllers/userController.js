import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../models/index.js';

/**
 * @swagger
 * tags:
 *     name: User
 *     description: User Authentication routes
 */

/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [username, email, password]
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *     responses:
 *       201:
 *         description: User registered
 *       400:
 *         description: Email already exists
 */
export const register = async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({message: 'All fields are requires'});
    }

    try {
        const existingUser = await db.User.findOne({where: {email} });
        if(existingUser) {
            return res.status(400).json({message: 'Email already in use'});
        }

        const user = await db.User.create({
            username,
            email,
            password
        });

        res.status(201).json({
            message: 'User registered successfully',
            user: {
                id: user.userId,
                username: user.username,
                email: user.email,
            },
        });
    }
    catch(err) {
        res.status(500).json({error: err.message });
    }
};

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Login a user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *     responses:
 *       200:
 *         description: Successful login
 *       401:
 *         description: Invalid credentials
 *       404:
 *         description: User not found
 */
export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await db.User.findOne({ where: { email } });
        if (!user) return res.status(404).json({ error: 'User not found' });

        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(401).json({ error: 'Invalid credentials' });
        // jwt.sign(payload,signature,option)
        console.log("User data before signing JWT:", user);
        const token = jwt.sign({ userId: user.userId, email: user.email }, process.env.JWT_SECRET, {
            expiresIn: '1d',
        });
        console.log("Signed JWT payload:", { id: user.userId, email: user.email });

        res.json({ token, user: { userId: user.userId, email: user.email } });
    } catch (err) {
        res.status(500).json({ error: 'Login error', details: err.message });
    }
};

/**
 * GET /users/profile
 * Get user profile from token
 */
export const getUserProfile = async (req, res) => {
  const userId = req.user.userId;

  try {
    const user = await db.User.findByPk(userId, {
      attributes: ['userId', 'username', 'email']
    });

    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

/**
 * POST /api/user/update
 * Update user info
 */
export const updateUser = async (req, res) => {
  const userId = req.user.userId;
  const { username, email } = req.body;

  if (!username || !email) {
    return res.status(400).json({ message: 'Username and email are required' });
  }

  try {
    // Check for existing email or username (used by someone else)
    const existingEmail = await db.User.findOne({
      where: {
        email,
        userId: { [db.Sequelize.Op.ne]: userId }
      }
    });

    if (existingEmail) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    const existingUsername = await db.User.findOne({
      where: {
        username,
        userId: { [db.Sequelize.Op.ne]: userId }
      }
    });

    if (existingUsername) {
      return res.status(400).json({ message: 'Username already in use' });
    }

    await db.User.update(
      { username, email },
      { where: { userId } }
    );

    const updatedUser = await db.User.findByPk(userId, {
      attributes: ['userId', 'username', 'email']
    });

    res.json({
      message: 'User updated successfully',
      user: updatedUser
    });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update user', error: err.message });
  }
};




import dotenv from 'dotenv';
import db from './models/index.js';

dotenv.config();

db.sequelize.sync({ alter: true })
  .then(() => {
    console.log('Database synced');
   process.exit(0);
})
  .catch((err) => {
    console.error('Failed to sync database:', err);
    process.exit(1);
});
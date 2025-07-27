import express from 'express';
import dotenv from 'dotenv';
import { serveSwagger, setupSwagger } from './config/swagger.js';
import loginRoute from './routes/loginRoute.js';
import venueRoute from './routes/venueRoute.js';
import userRoute from './routes/userRoute.js';
import cateringRoute from './routes/cateringRoute.js';
import cors from 'cors';
import db from './models/index.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/docs', serveSwagger, setupSwagger);

app.use('/auth', loginRoute);
app.use('/venues', venueRoute);
app.use('/users', userRoute);
app.use('/caterings', cateringRoute);


app.get('/', (req, res) => res.send('Welcome to EventNa Management system API!'));

db.sequelize.sync({ alter: true })
  .then(() => {
    console.log('Database synced');
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to sync database:', err);
  });

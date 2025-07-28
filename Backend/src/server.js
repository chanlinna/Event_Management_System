import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { serveSwagger, setupSwagger } from './config/swagger.js';
import loginRoute from './routes/loginRoute.js';
import venueRoute from './routes/venueRoute.js';
import userRoute from './routes/userRoute.js';
import cateringRoute from './routes/cateringRoute.js';
import eventRoute from './routes/eventRoute.js';
import bookingRoute from './routes/bookingRoute.js';
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
app.use('/events', eventRoute);
app.use('/bookings', bookingRoute);



app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));


app.get('/', (req, res) => res.send('Welcome to EventNa Management system API!'));


app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
 

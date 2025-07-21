import express from 'express';
import dotenv from 'dotenv';
import { serveSwagger, setupSwagger } from './config/swagger.js';
import loginRoute from './routes/loginRoute.js';
import venueRoute from './routes/venueRoute.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/docs', serveSwagger, setupSwagger);

app.use('/auth', loginRoute);
app.use('/api/admin/venues', venueRoute);



app.get('/', (req, res) => res.send('Welcome to EventNa Management system API!'));

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));

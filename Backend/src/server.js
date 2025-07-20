import express from 'express';
import dotenv from 'dotenv';
import { serveSwagger, setupSwagger } from './config/swagger.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/docs', serveSwagger, setupSwagger);



app.get('/', (req, res) => res.send('Welcome to School API!'));

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));

// src/app.ts
import dotenv from 'dotenv';
import express, { Application } from 'express';
import { errorHandler } from './middleware/errorHandler';
import solarDataRoutes from './routes/solarDataRoutes';

// Load environment variables from .env file
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON body
app.use(express.json());

// Routes
app.use('/api', solarDataRoutes);

// Error handling middleware
app.use(errorHandler);

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

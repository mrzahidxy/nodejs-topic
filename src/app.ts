import express, { Response } from 'express';
import computeRoutes from './routes/computeRoutes';
import rateLimit from 'express-rate-limit';

const app = express();

app.use(express.json()); // Parses incoming JSON requests

// Rate limiting to prevent abuse
app.use(rateLimit({ 
  windowMs: 15 * 60 * 1000, 
  max: 100, 
  message: 'Too many requests, try again later.' 
}));

// Use compute-related routes under the /api path
app.use('/api', computeRoutes);

// Health check endpoint to check if the server is running
app.get('/', (res: Response) => {
  res.status(200).json({ message: 'Healthy' });
});

// Global error handler to catch any unhandled errors
app.use((err, res: Response) => {
  res.status(500).json({ error: 'Internal Server Error' });
});

export default app;

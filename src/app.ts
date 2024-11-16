import express from 'express';
import router from './routes/computeRoutes';

const app = express();

// Middleware for JSON parsing
app.use(express.json());

// Define routes
app.use('/api', router);

export default app;

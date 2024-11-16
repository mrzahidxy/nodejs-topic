import app from './app';
import logger from './utils/logger';
import dotenv from 'dotenv';

dotenv.config(); // Loads environment variables from a .env file.

const PORT = parseInt(process.env.PORT || '3000', 10);

// Start the server and log that it's running
const server = app.listen(PORT, () => logger.info(`Server running on port ${PORT}`));

// Graceful shutdown function
const shutdown = () => {
  logger.info('Shutting down server...');
  server.close(() => {
    logger.info('Server closed.');
    process.exit(0);
  });

  // Force shutdown after 10 seconds if not closed
  setTimeout(() => {
    logger.warn('Forcing shutdown...');
    process.exit(1);
  }, 10000);
};

// Listen for system termination signals to gracefully shutdown
process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);

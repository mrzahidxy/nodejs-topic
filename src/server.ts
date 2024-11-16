import cluster from 'cluster';
import { cpus } from 'os';
import logger from './utils/logger';
import app from './app';

const numCPUs = cpus().length;

// Graceful shutdown function
const shutdown = (server: any) => {
  server.close(() => {
    logger.info('Server closed');
    process.exit(0);
  });

  setTimeout(() => {
    logger.warn('Forced shutdown');
    process.exit(1);
  }, 10000);
};

if (cluster.isPrimary) {
  logger.info(`Primary process PID: ${process.pid}`);

  // Fork worker processes
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker) => {
    logger.info(`Worker ${worker.process.pid} exited`);
  });

  process.on('SIGTERM', () => process.exit(0));
  process.on('SIGINT', () => process.exit(0));

} else {
  const server = app.listen(3000, () => {
    logger.info(`Worker ${process.pid} running on port 3000`);
  });

  // Graceful shutdown for workers
  process.on('SIGTERM', () => shutdown(server));
  process.on('SIGINT', () => shutdown(server));
}

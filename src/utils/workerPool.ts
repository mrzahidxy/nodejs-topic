import Piscina from 'piscina';
import path from 'path';

export default new Piscina({
  filename: path.resolve(__dirname, '../../dist/workers/compressWorker.js'), // Path to the worker file
  maxThreads: Math.max(require('os').cpus().length - 1, 1), // Leaves one CPU free
  idleTimeout: 30000 // 30 seconds of idle time before a worker thread is released
});

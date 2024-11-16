import { Router, Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import { compressData } from '../utils/compression';
import { cpuIntensiveTask } from '../utils/cpuIntensiveTask';

const router = Router();

// Health Check Route
router.get('/health', asyncHandler(async (req: Request, res: Response) => {
  res.status(200).json({ status: 'ok' });
}));

// Compression Route
router.post('/compress', asyncHandler(async (req: Request, res: Response) => {
  const { data } = req.body;
  if (typeof data !== 'string' || !data.trim()) {
    return res.status(400).json({ error: 'Invalid input. Provide a non-empty string.' });
  }

  const start = Date.now();
  const compressedData = compressData(data);  // Compress data
  const timeElapsed = `${Date.now() - start}ms`;

  res.json({ method: 'worker-thread', compressedData, time: timeElapsed });
}));

// CPU-intensive Route
router.get('/cpu-intensive', asyncHandler(async (req: Request, res: Response) => {
  const { limit } = req.query;
  const result = cpuIntensiveTask(parseInt(limit as string) || 1000000);
  res.json({ method: 'worker-thread', result });
}));

export default router;

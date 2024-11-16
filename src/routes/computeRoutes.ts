import { Router, Request, Response } from 'express';
import piscina from '../utils/workerPool';
import logger from '../utils/logger';
import { asyncHandler } from '../utils/asyncHandler';

const router = Router();

router.post(
  '/compress',
  asyncHandler(async (req: Request, res: Response) => {
    const { data } = req.body;
    if (typeof data !== 'string' || !data.trim()) {
      return res.status(400).json({ error: 'Invalid input. Provide a non-empty string.' });
    }

    const start = Date.now();
    const compressedData = await piscina.run(data); // Sends data to worker for compression
    const timeElapsed = `${Date.now() - start}ms`;

    logger.info(`Compression completed in ${timeElapsed}`);
    res.json({ method: 'worker-thread', compressedData, time: timeElapsed });
  })
);

export default router;

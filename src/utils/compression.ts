// utils/compression.ts
import zlib from 'zlib';

// Compress data using gzip
export function compressData(data: string): Buffer {
  return zlib.gzipSync(data);  // Synchronous GZIP compression
}


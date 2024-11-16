import { gzip } from 'zlib';
import { promisify } from 'util';

const gzipAsync = promisify(gzip);

// Exported function to handle compression with Piscina
export default async function compressData(data: string): Promise<string> {
  const compressed = await gzipAsync(data);
  return compressed.toString('base64');
}

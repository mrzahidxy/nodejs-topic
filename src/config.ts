// config.ts
import { cpus } from 'os';

export const config = {
  port: process.env.PORT ?? 3000,  // Default to 3000 if PORT is not set
  numCPUs: cpus().length,  // Number of available CPU cores
};

export type Config = typeof config;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const piscina_1 = __importDefault(require("piscina"));
const path_1 = __importDefault(require("path"));
exports.default = new piscina_1.default({
    filename: path_1.default.resolve(__dirname, '../../dist/workers/compressWorker.js'), // Path to the worker file
    maxThreads: Math.max(require('os').cpus().length - 1, 1), // Leaves one CPU free
    idleTimeout: 30000 // 30 seconds of idle time before a worker thread is released
});

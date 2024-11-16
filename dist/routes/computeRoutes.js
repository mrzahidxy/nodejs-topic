"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const workerPool_1 = __importDefault(require("../utils/workerPool"));
const logger_1 = __importDefault(require("../utils/logger"));
const asyncHandler_1 = require("../utils/asyncHandler");
const router = (0, express_1.Router)();
router.post('/compress', (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const { data } = req.body;
    if (typeof data !== 'string' || !data.trim()) {
        return res.status(400).json({ error: 'Invalid input. Provide a non-empty string.' });
    }
    const start = Date.now();
    const compressedData = await workerPool_1.default.run(data); // Sends data to worker for compression
    const timeElapsed = `${Date.now() - start}ms`;
    logger_1.default.info(`Compression completed in ${timeElapsed}`);
    res.json({ method: 'worker-thread', compressedData, time: timeElapsed });
}));
exports.default = router;

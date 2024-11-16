"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const computeRoutes_1 = __importDefault(require("./routes/computeRoutes"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const app = (0, express_1.default)();
app.use(express_1.default.json()); // Parses incoming JSON requests
// Rate limiting to prevent abuse
app.use((0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: 'Too many requests, try again later.'
}));
// Use compute-related routes under the /api path
app.use('/api', computeRoutes_1.default);
// Health check endpoint to check if the server is running
app.get('/', (res) => {
    res.status(200).json({ message: 'Healthy' });
});
// Global error handler to catch any unhandled errors
app.use((err, res) => {
    res.status(500).json({ error: 'Internal Server Error' });
});
exports.default = app;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const logger_1 = __importDefault(require("./utils/logger"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config(); // Loads environment variables from a .env file.
const PORT = parseInt(process.env.PORT || '3000', 10);
// Start the server and log that it's running
const server = app_1.default.listen(PORT, () => logger_1.default.info(`Server running on port ${PORT}`));
// Graceful shutdown function
const shutdown = () => {
    logger_1.default.info('Shutting down server...');
    server.close(() => {
        logger_1.default.info('Server closed.');
        process.exit(0);
    });
    // Force shutdown after 10 seconds if not closed
    setTimeout(() => {
        logger_1.default.warn('Forcing shutdown...');
        process.exit(1);
    }, 10000);
};
// Listen for system termination signals to gracefully shutdown
process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);

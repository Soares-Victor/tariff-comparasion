import winston from 'winston';
import dotenv from "dotenv";

// initialize configuration
dotenv.config();

// log level
const logLevel = process.env.LOG_LEVEL || 'INFO';

// Winston Setup
const { combine, timestamp, printf } = winston.format;
const logger = winston.createLogger({
  level: logLevel.toLowerCase(),
  format: combine(
    timestamp({
      format: 'YYYY-MM-DD HH:mm:ss.SSS'
    }),
    printf(info => `${info.timestamp} ${info.level.toUpperCase()}: ${info.message}`)
  ),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
  exitOnError: false
});

if (process.env.NODE_ENV !== "production") {
  logger.add(new winston.transports.Console({
    handleExceptions: true
  }));
}

export default logger;
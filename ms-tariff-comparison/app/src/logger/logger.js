const winston = require("winston");


const { combine, timestamp, printf } = winston.format;
const logger = winston.createLogger({
  level: "info",
  format: combine(
      timestamp({
        format: 'YYYY-MM-DD HH:mm:ss.SSS'
      }),
      printf(info => `${info.timestamp} ${info.level.toUpperCase()}: ${info.message}`)
  ),
  transports: [
    new winston.transports.File({filename: "error.log", level: "error"}),
    new winston.transports.File({filename: "combined.log"}),
  ],
});

if (process.env.NODE_ENV !== "production") {
  logger.add(new winston.transports.Console({
    handleExceptions: true
  }));
}

module.exports = logger;

import winston from 'winston';
import dotenv from "dotenv";
import path from 'path';
import util from 'util';

const PROJECT_ROOT_PATH = path.join(__dirname, '..')

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
    new winston.transports.Console({
      handleExceptions: true
    })
  ],
  exitOnError: false
});

// Get Log Call Stack
function getStackData(stackIndex: number) {
  let stackData: any;
  const stackReg = /at\s+(.*)\s+\((.*):(\d*):(\d*)\)/i;
  const stackReg2 = /at\s+()(.*):(\d*):(\d*)/i;
  const err: any = new Error()
  const stacklist = err.stack.split('\n').slice(3);
  const s = stacklist[stackIndex] || stacklist[0]
  const sp = stackReg.exec(s) || stackReg2.exec(s)
  if (sp && sp.length === 5) {
    stackData = {
      method: sp[1],
      fileName: path.basename(sp[2]),
      filePath: path.relative(PROJECT_ROOT_PATH, sp[2]),
      line: sp[3],
      pos: sp[4],
      stack: stacklist.join('\n')
    }
  }
  return stackData;
}

function logAny(level: string, cause?: Error, message?: string, ...params: any[]) {
  return new Promise<any[]>(() => {
    const msg = params.length > 0 ? util.format(message, ...params) : message;
    let logMessage;

    if (process.env.LOG_LINE_NUMBER === 'true' || ['info', 'debug', 'notice'].indexOf(level) < 0) {
      const { filePath, line, pos } = getStackData(3);
      if (cause) {
        logMessage = util.format('[%s:%d:%d] %s \n %s', filePath, line, pos, message, cause.stack);
      } else {
        logMessage = util.format('[%s:%d:%d] %s', filePath, line, pos, msg);
      }
    } else {
      if (cause) {
        logMessage = util.format('%s \n %s', message, cause.stack);
      } else {
        logMessage = util.format('%s', msg);
      }
    }

    logger.log({
      level,
      message: logMessage
    });
  });
}

const log = {
  debug: (message: string, ...params: any[]) => {
    return logAny('debug', undefined, message, ...params);
  },
  info: (message: string, ...params: any[]) => {
    return logAny('info', undefined, message, ...params);
  },
  warn: (message: string, ...params: any[]) => {
    return logAny('warn', undefined, message, ...params);
  },
  error: (message: string, cause: Error) => {
    return logAny('error', cause, message);
  }
}

export default log;
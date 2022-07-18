import * as chalk from 'chalk';
import * as winston from 'winston';

const {
  combine,
  timestamp,
  json,
  errors,
  simple,
  colorize,
  prettyPrint,
  splat,
} = winston.format;

const printfy = winston.format.printf((info) => {
  if (info.message.constructor === Object)
    info.message = JSON.stringify(info.message, null, 4);

  return `${chalk.magenta(info.timestamp)} ${info.label || '-'} ${
    info.level
  }: ${info.message}`;
});

const Logger = winston.createLogger({
  level:
    process.env.LOGGER_LEVEL === 'silly' ? undefined : process.env.LOGGER_LEVEL,
  silent: process.env.LOGGER_LEVEL === 'silly',
  format: combine(
    errors({ stack: true }),
    colorize(),
    prettyPrint(),
    splat(),
    simple(),
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }),
    json(),
    printfy,
  ),
  defaultMeta: {},
  transports: [new winston.transports.Console({})],
});

export default Logger;

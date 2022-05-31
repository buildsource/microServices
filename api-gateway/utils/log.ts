import { Logger } from '@nestjs/common';
import * as chalk from 'chalk';

export const Log = (value: any, type = 'DEBUG') => {
  const logger = new Logger(type);
  const log = (...args) => logger.log(chalk.white(...args));

  log(value);
};

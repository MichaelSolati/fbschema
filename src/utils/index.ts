import * as path from 'path';

import {LogOptions} from '../types';

export const getWorkingDirectory = (filepath: string): string =>
  path.isAbsolute(filepath) ? filepath : path.join(process.cwd(), filepath);

export const log = (options: LogOptions, ...args: unknown[]) => {
  if (options.emitLogs) {
    const level = options.level || 'log';
    switch (level) {
      case 'warn':
        console.warn(...args);
        break;
      case 'error':
        console.error(...args);
        break;
      case 'info':
        console.info(...args);
        break;
      case 'debug':
        console.debug(...args);
        break;
      default:
        console.log(...args);
    }
  }
};

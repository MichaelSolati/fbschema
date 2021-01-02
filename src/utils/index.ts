import * as path from 'path';

export const getWorkingDirectory = (filepath: string): string =>
  path.isAbsolute(filepath) ? filepath : path.join(process.cwd(), filepath);

export const stripString = (value: string): string =>
  value.replace(/[^A-Z0-9]/gi, '');

import * as path from 'path';

export const getWorkingDirectory = (filepath: string): string =>
  path.isAbsolute(filepath) ? filepath : path.join(process.cwd(), filepath);

export const stripString = (value: string): string =>
  value.replace(/[^A-Z0-9]/gi, '');

export const isBoolean = (x: unknown): boolean => x === true || x === false;

export const isInteger = (x: unknown): boolean =>
  isNumber(x) && Number.isInteger(x);

export const isNumber = (x: unknown): boolean =>
  typeof x === 'number' && !isNaN(Number(x));

export const isString = (x: unknown): boolean => typeof x === 'string';

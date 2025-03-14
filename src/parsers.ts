import { ParserFunction } from './types';

export const defaultParser: ParserFunction = (data: string) =>
  data
    .split(' ')
    .filter((item) => item !== '')
    .map(Number);

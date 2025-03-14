export type ParserFunction = (data: string) => number[];

export const defaultParser: ParserFunction = (data: string): number[] => {
  return data
    .trim()
    .split(' ')
    .filter((item) => item !== '')
    .map(Number);
};

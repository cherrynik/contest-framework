export type ParserFunction = (data: string) => number[];

export const defaultParser: ParserFunction = (data: string): number[] => {
  return data.trim().split(/\s+/).map(Number);
};

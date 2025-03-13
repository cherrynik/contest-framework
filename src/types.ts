export type ParserFunction = (data: string) => number[];
export type Mode = 'file' | 'console';

export interface InputReader {
  read(): string[] | Promise<string[]>;
}

export interface OutputWriter {
  write(data: unknown): void;
}

export interface InputReader {
  read(): string[] | Promise<string[]>;
  close(): void;
}

export interface OutputWriter {
  write(data: unknown): void;
} 
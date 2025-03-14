import { createInterface } from 'readline';
import { stdin, stdout } from 'process';
import * as fs from 'fs';
import { DEFAULT_LINES_COUNT } from '@contest/utils';

export interface InputReader {
  read(): string[] | Promise<string[]>;
  close(): void;
}

export interface OutputWriter {
  write(data: unknown): void;
}

export class FileInputReader implements InputReader {
  constructor(private readonly filename = 'input.txt') {}

  read(): string[] {
    return fs.readFileSync(this.filename, 'utf-8').split('\n');
  }

  close(): void {
    // FileInputReader does not need to close any resources
  }
}

export class ConsoleInputReader implements InputReader {
  private rl: ReturnType<typeof createInterface>;
  private lines: string[] = [];
  private resolvePromise: (value: string[]) => void = () => {};

  constructor(private readonly expectedLines: number) {
    this.rl = createInterface({
      input: stdin,
      output: stdout,
    });

    this.rl.on('line', (line: string) => {
      this.lines.push(line);
      if (this.lines.length >= this.expectedLines) {
        this.rl.close();
        this.resolvePromise(this.lines);
      }
    });

    this.rl.on('close', () => {
      if (this.lines.length < this.expectedLines) {
        this.resolvePromise(this.lines);
      }
    });

    process.on('exit', () => {
      this.rl.close();
    });
  }

  read(): Promise<string[]> {
    return new Promise((resolve) => {
      this.resolvePromise = resolve;
    });
  }

  close(): void {
    this.rl.close();
  }
}

export class ConsoleOutputWriter implements OutputWriter {
  write(data: unknown): void {
    console.log(data);
  }
}

export class FileOutputWriter implements OutputWriter {
  constructor(private readonly filename = 'output.txt') {}

  write(data: unknown): void {
    fs.writeFileSync(this.filename, String(data));
  }
}

export const ioHandlers = {
  file: {
    input: new FileInputReader(),
    output: new FileOutputWriter(),
  },
  console: {
    input: new ConsoleInputReader(DEFAULT_LINES_COUNT),
    output: new ConsoleOutputWriter(),
  },
} as const;

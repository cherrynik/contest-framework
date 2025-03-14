import { createInterface } from 'readline';
import { stdin, stdout } from 'process';
import * as fs from 'fs';
import { InputReader } from '../types';

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
  // eslint-disable-next-line @typescript-eslint/no-empty-function
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

    // Handle process exit to ensure readline interface is closed
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

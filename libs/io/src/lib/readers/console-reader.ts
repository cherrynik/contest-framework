import { createInterface } from 'readline';
import { stdin, stdout } from 'process';
import { DEFAULT_LINES_COUNT } from '@contest/utils';
import { InputReader } from '../interfaces';

export class ConsoleInputReader implements InputReader {
  private rl: ReturnType<typeof createInterface>;
  private lines: string[] = [];
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private resolvePromise: (value: string[]) => void = () => {};

  constructor(private readonly expectedLines: number = DEFAULT_LINES_COUNT) {
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
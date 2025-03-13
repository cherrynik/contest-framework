import { createInterface, ReadLine } from 'readline';
import { stdin, stdout } from 'process';
import * as fs from 'fs';
import { InputReader } from '../types';

export class FileInputReader implements InputReader {
  constructor(private readonly filename: string = 'input.txt') {}

  read(): string[] {
    return fs.readFileSync(this.filename, 'utf-8').split('\n');
  }

  close(): void {
    // FileInputReader does not need to close any resources
  }
}

export class ConsoleInputReader implements InputReader {
  private rl: ReadLine;

  constructor() {
    this.rl = createInterface({
      input: stdin,
      output: stdout,
    });
  }

  read(): Promise<string[]> {
    return new Promise(resolve => {
      const lines: string[] = [];

      this.rl.on('line', (line: string) => {
        lines.push(line);
      });

      this.rl.on('close', () => {
        resolve(lines);
      });
    });
  }

  close(): void {
    this.rl.close();
  }
}

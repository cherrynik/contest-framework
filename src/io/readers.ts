import { createInterface } from 'readline';
import { stdin, stdout } from 'process';
import * as fs from 'fs';
import { InputReader } from '../types';

export class FileInputReader implements InputReader {
  constructor(private readonly filename: string = 'input.txt') {}

  read(): string[] {
    return fs.readFileSync(this.filename, 'utf-8').split('\n');
  }
}

export class ConsoleInputReader implements InputReader {
  read(): Promise<string[]> {
    return new Promise(resolve => {
      const lines: string[] = [];
      const rl = createInterface({
        input: stdin,
        output: stdout,
      });

      rl.on('line', (line: string) => {
        lines.push(line);
      });

      rl.on('close', () => {
        resolve(lines);
      });
    });
  }
}

import * as fs from 'fs';
import { InputReader } from '../interfaces';

export class FileInputReader implements InputReader {
  constructor(private readonly filename = 'input.txt') {}

  read(): string[] {
    return fs.readFileSync(this.filename, 'utf-8').split('\n');
  }

  close(): void {
    // FileInputReader does not need to close any resources
  }
} 
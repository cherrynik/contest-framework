import * as fs from 'fs';
import { OutputWriter } from '../types';

export class FileOutputWriter implements OutputWriter {
  constructor(private readonly filename = 'output.txt') {}

  write(data: unknown): void {
    fs.writeFileSync(this.filename, String(data));
  }
}

export class ConsoleOutputWriter implements OutputWriter {
  write(data: unknown): void {
    console.log(data);
  }
}

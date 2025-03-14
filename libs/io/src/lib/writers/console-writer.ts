import { OutputWriter } from '../interfaces';

export class ConsoleOutputWriter implements OutputWriter {
  write(data: unknown): void {
    console.log(data);
  }
} 
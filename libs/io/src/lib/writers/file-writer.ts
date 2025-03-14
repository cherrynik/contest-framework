import * as fs from 'fs';
import { OutputWriter } from '../interfaces';

export class FileOutputWriter implements OutputWriter {
  constructor(private readonly filename = 'output.txt') {}

  write(data: unknown): void {
    let content: string;
    if (Array.isArray(data)) {
      content = data.map(item => 
        typeof item === 'object' ? JSON.stringify(item) : String(item)
      ).join(',');
    } else if (data === null) {
      content = 'null';
    } else if (data === undefined) {
      content = 'undefined';
    } else if (typeof data === 'object') {
      content = JSON.stringify(data);
    } else {
      content = String(data);
    }
    fs.writeFileSync(this.filename, content);
  }
} 
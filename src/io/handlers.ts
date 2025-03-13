import { FileInputReader, ConsoleInputReader } from './readers';
import { FileOutputWriter, ConsoleOutputWriter } from './writers';

export const ioHandlers = {
  file: {
    input: new FileInputReader(),
    output: new FileOutputWriter(),
  },
  console: {
    input: new ConsoleInputReader(),
    output: new ConsoleOutputWriter(),
  },
} as const;

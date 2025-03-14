import { ConsoleInputReader, FileInputReader } from './readers';
import { ConsoleOutputWriter, FileOutputWriter } from './writers';
import { LINES_COUNT } from '../constants';

export const ioHandlers = {
  file: {
    input: new FileInputReader(),
    output: new FileOutputWriter(),
  },
  console: {
    input: new ConsoleInputReader(LINES_COUNT),
    output: new ConsoleOutputWriter(),
  },
} as const;

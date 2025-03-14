import { ContestFramework } from '../framework';
import { OutputWriter } from '../types';
import { ConsoleInputReader } from '../io/readers';

const LINES_COUNT = 1 as const;

const outputWriter: OutputWriter = {
  write: (result: unknown) => {
    console.log(result);
  },
};

class SumAllSolution extends ContestFramework {
  protected solve = (input: number[][]) => {
    const [firstLine] = input;
    return firstLine.reduce((sum, num) => sum + num, 0);
  };
}

// Run the solution
const solution = new SumAllSolution(
  new ConsoleInputReader(LINES_COUNT),
  outputWriter
);

solution.run().catch(console.error);

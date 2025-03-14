import { ContestFramework } from '../framework';
import { OutputWriter } from '../types';
import { ConsoleInputReader } from '../io/readers';

let linesCount;

const LinesReader = new ConsoleInputReader(1);
LinesReader.read()
  .then((lines) => {
    const [firstLine] = lines;
    const [a] = firstLine.split(' ').map(Number);
    linesCount = a;
  })
  .then(() => {
    const LINES_COUNT = linesCount;

    const outputWriter: OutputWriter = {
      write: (result: unknown) => {
        console.log(result);
      },
    };

    class SumAllSolution extends ContestFramework {
      protected solve = (input: number[][]) => {
        const lines = input;
        return lines.flat().reduce((sum, num) => sum + num, 0);
      };
    }

    // Run the solution
    const solution = new SumAllSolution(
      new ConsoleInputReader(LINES_COUNT),
      outputWriter,
    );

    solution.run().catch(console.error);
  });

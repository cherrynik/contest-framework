import { ContestFramework } from '@contest/core';
import { ConsoleInputReader } from '@contest/io';
import { sumAll } from '@contest/impls';

let linesCount;

const LinesReader = new ConsoleInputReader(1);
LinesReader.read()
  .then((lines) => {
    const [firstLine] = lines;
    const [a] = firstLine.split(' ').map(Number);

    linesCount = a;
    LinesReader.close();
  })
  .then(() => {
    const LINES_COUNT = linesCount;

    class SumAllDynamicSolution extends ContestFramework {
      protected solve = (input: number[][]) => {
        const lines = input;
        return sumAll(lines.flat());
      };
    }

    const solution = new SumAllDynamicSolution(new ConsoleInputReader(LINES_COUNT));

    solution.run().catch(console.error);
  });

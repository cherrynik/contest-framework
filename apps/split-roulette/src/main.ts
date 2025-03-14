import { ContestFramework } from '@contest/core';
import { ConsoleInputReader } from '@contest/io';
import { getAmountOfRouletteBets } from '@contest/impls';

const LINES_COUNT = 1 as const;

class SplitRouletteSolution extends ContestFramework {
  protected solve(input: string[][]): number {
    const [firstLine] = input;
    const [t] = firstLine.map(Number);

    return getAmountOfRouletteBets(t);
  }
}

const solution = new SplitRouletteSolution(
  new ConsoleInputReader(LINES_COUNT)
);

solution.run().catch(console.error);

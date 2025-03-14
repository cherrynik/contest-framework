import { ContestFramework } from '../framework';
import { ConsoleInputReader } from '../io/readers';

const LINES_COUNT = 1 as const;

export function splitRoulette(n: number): number {
  if (n === 1) return 0;
  return Math.ceil(Math.log2(n));
}

class SplitRouletteSolution extends ContestFramework {
  protected solve(input: string[][]): number {
    const [firstLine] = input;
    const n = Number(firstLine);

    return splitRoulette(n);
  }
}

const solution = new SplitRouletteSolution(new ConsoleInputReader(LINES_COUNT));

solution.run().catch(console.error);

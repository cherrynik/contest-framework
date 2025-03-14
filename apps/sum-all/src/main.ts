import { ContestFramework } from '@contest/core';
import { ConsoleInputReader } from '@contest/io';
import { getAmountToPay } from '@contest/impls';

const LINES_COUNT = 1 as const;

class SumAllSolution extends ContestFramework {
  protected solve(input: string[][]): number {
    const [firstLine] = input;
    const [price, trafficInMB, priceForExtraMB, usedInMB] =
      firstLine.map(Number);

    return getAmountToPay({
      price,
      trafficInMB,
      priceForExtraMB,
      usedInMB,
    });
  }
}

const solution = new SumAllSolution(
  new ConsoleInputReader(LINES_COUNT)
);

solution.run().catch(console.error);

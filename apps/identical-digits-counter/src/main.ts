import { ContestFramework } from '@contest/core';
import { ConsoleInputReader } from '@contest/io';
import { solveIdenticalDigitsCounter } from '@contest/impls';

const LINES_COUNT = 1; // We expect 1 line of input

class IdenticalDigitsCounterSolution extends ContestFramework {
  protected solve(input: unknown[][]): unknown {
    // Convert input to string array
    const inputLines = input.map((line) => line.join(' '));

    // Solve the problem
    return solveIdenticalDigitsCounter(inputLines);
  }
}

// Run the solution
const solution = new IdenticalDigitsCounterSolution(
  new ConsoleInputReader(LINES_COUNT)
);

solution.run().catch(console.error);

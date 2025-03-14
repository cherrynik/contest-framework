/**
 * Example application using the Contest Framework.
 * This file demonstrates how to use the framework to solve a problem.
 */

import { ContestFramework } from '@contest/core';
import { ConsoleInputReader } from '@contest/io';

const LINES_COUNT = 1 as const;

/**
 * Example solution class that extends the Contest Framework.
 * This is where you would implement your problem-solving logic.
 */
class Solution extends ContestFramework {
  constructor() {
    // Initialize with console I/O handlers
    super(new ConsoleInputReader(LINES_COUNT));
  }

  /**
   * Implement your solution logic here.
   * @param input Array of parsed input lines
   * @returns The solution result
   */
  protected solve(input: number[][]): unknown {
    // Your solution goes here
    // input[0] - first line of input
    // input[1] - second line of input
    return input;
  }
}

// Run the solution
new Solution().run();

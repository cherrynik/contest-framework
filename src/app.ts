/**
 * Example application using the Contest Framework.
 * This file demonstrates how to use the framework to solve a problem.
 */

import { ContestFramework, ioHandlers } from '.';

/**
 * Example solution class that extends the Contest Framework.
 * This is where you would implement your problem-solving logic.
 */
class Solution extends ContestFramework {
  constructor() {
    // Initialize with console I/O handlers
    const { input, output } = ioHandlers['console'];
    const INPUT_LINES = 3;
    super(INPUT_LINES, input, output); // 2 is the number of input lines
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

import { ContestFramework } from './framework';
import { defaultParser } from './parsers';
import { OutputWriter } from './types';
import { ConsoleInputReader } from './io/readers';

// Example output writer implementation
const outputWriter: OutputWriter = {
  write: (result: unknown) => {
    // In a real implementation, this would write to a file or stdout
    console.log(result);
  },
};

// Create a custom framework class that extends ContestFramework
class CustomFramework extends ContestFramework {
  protected solve(input: any[]): unknown {
    // Example solution: sum all numbers from the input
    const numbers = input.map(line => parseInt(line, 10));
    return numbers.reduce((sum, num) => sum + num, 0);
  }
}

async function main() {
  // Create a new instance of the custom framework with ConsoleInputReader
  const framework = new CustomFramework(
    5, // number of input lines to expect
    new ConsoleInputReader(),
    outputWriter,
    defaultParser
  );

  // Run the framework
  await framework.run();
}

// Run the main function
main().catch(console.error);

import { ContestFramework } from './core';
import { InputReader, OutputWriter } from '@contest/io';

// Mock implementations for testing
class MockInputReader implements InputReader {
  private lines: string[];

  constructor(lines: string[]) {
    this.lines = lines;
  }

  read(): string[] {
    return this.lines;
  }

  close(): void {
    // MockInputReader does not need to close any resources
  }
}

class MockOutputWriter implements OutputWriter {
  private output: unknown[] = [];

  write(data: unknown): void {
    this.output.push(data);
  }

  getOutput(): unknown[] {
    return this.output;
  }
}

describe('ContestFramework', () => {
  let inputReader: MockInputReader;
  let outputWriter: MockOutputWriter;
  let framework: ContestFramework;

  beforeEach(() => {
    inputReader = new MockInputReader([]);
    outputWriter = new MockOutputWriter();
    framework = new ContestFramework(inputReader, outputWriter);
  });

  describe('solve', () => {
    it('should throw error if not implemented', async () => {
      await expect(framework.run()).rejects.toThrow(
        'Solve method must be implemented'
      );
    });
  });

  describe('input processing', () => {
    class TestSolution extends ContestFramework {
      constructor() {
        super(inputReader, outputWriter);
      }

      protected override solve(input: unknown[][]): unknown {
        return input;
      }
    }

    it('should process input lines correctly', async () => {
      inputReader = new MockInputReader(['1 2 3', '4 5 6']);
      const solution = new TestSolution();
      await solution.run();

      const output = solution.result;
      expect(output).toEqual([
        [1, 2, 3],
        [4, 5, 6],
      ]);
    });

    it('should handle empty lines', async () => {
      inputReader = new MockInputReader(['1 2 3', '', '4 5 6']);
      const solution = new TestSolution();
      await solution.run();

      const output = solution.result;
      expect(output).toEqual([[1, 2, 3], [], [4, 5, 6]]);
    });

    it('should handle single line input', async () => {
      inputReader = new MockInputReader(['1 2 3']);
      const solution = new TestSolution();
      await solution.run();

      const output = solution.result;
      expect(output).toEqual([[1, 2, 3]]);
    });

    it('should handle no input', async () => {
      inputReader = new MockInputReader([]);
      const solution = new TestSolution();
      await solution.run();

      const output = solution.result;
      expect(output).toEqual([]);
    });
  });

  describe('output handling', () => {
    class TestSolution extends ContestFramework {
      constructor() {
        super(inputReader, outputWriter);
      }

      protected override solve(input: unknown[][]): unknown {
        return 'test output';
      }
    }

    it('should write output correctly', async () => {
      const solution = new TestSolution();
      await solution.run();

      expect(outputWriter.getOutput()).toEqual(['test output']);
    });

    it('should store result correctly', async () => {
      const solution = new TestSolution();
      await solution.run();

      expect(solution.result).toBe('test output');
    });
  });
});

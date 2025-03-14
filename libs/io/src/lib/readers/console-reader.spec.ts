import { stdin, stdout } from 'process';
import { createInterface } from 'readline';
import { ConsoleInputReader } from './console-reader';

jest.mock('readline');

describe('ConsoleInputReader', () => {
  type MockReadline = {
    on: jest.Mock;
    close: jest.Mock;
    lineCallback?: (line: string) => void;
    closeCallback?: () => void;
  };

  let mockReadline: MockReadline;

  beforeEach(() => {
    jest.clearAllMocks();
    mockReadline = {
      on: jest.fn((event: string, callback: unknown) => {
        if (event === 'line') {
          mockReadline.lineCallback = callback as (line: string) => void;
        } else if (event === 'close') {
          mockReadline.closeCallback = callback as () => void;
        }
        return mockReadline;
      }),
      close: jest.fn(),
    };
    (createInterface as jest.Mock).mockReturnValue(mockReadline);
  });

  it('should initialize with correct configuration', () => {
    new ConsoleInputReader(2);

    expect(createInterface).toHaveBeenCalledWith({
      input: stdin,
      output: stdout,
    });
  });

  it('should collect expected number of lines', async () => {
    const reader = new ConsoleInputReader(2);
    const readPromise = reader.read();

    // Simulate line inputs
    mockReadline.lineCallback?.('1 2 3');
    mockReadline.lineCallback?.('4 5 6');

    const lines = await readPromise;
    expect(lines).toEqual(['1 2 3', '4 5 6']);
    expect(mockReadline.close).toHaveBeenCalled();
  });

  it('should handle fewer lines than expected', async () => {
    const reader = new ConsoleInputReader(3);
    const readPromise = reader.read();

    // Simulate line inputs and close
    mockReadline.lineCallback?.('1 2 3');
    mockReadline.closeCallback?.();

    const lines = await readPromise;
    expect(lines).toEqual(['1 2 3']);
  });
}); 
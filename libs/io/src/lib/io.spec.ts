import {
  ConsoleInputReader,
  ConsoleOutputWriter,
  FileInputReader,
  FileOutputWriter,
} from './io';
import * as fs from 'fs';
import { stdin, stdout } from 'process';
import { createInterface } from 'readline';

jest.mock('fs');
jest.mock('readline');

console.log(process.cwd());

describe('IO', () => {
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

  describe('ConsoleOutputWriter', () => {
    let consoleSpy: jest.SpyInstance;

    beforeEach(() => {
      consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    });

    afterEach(() => {
      consoleSpy.mockRestore();
    });

    it('should write to console correctly', () => {
      const writer = new ConsoleOutputWriter();
      const data = [1, 2, 3];
      writer.write(data);

      expect(consoleSpy).toHaveBeenCalledWith(data);
    });

    it('should handle different types of data', () => {
      const writer = new ConsoleOutputWriter();
      
      writer.write('string');
      expect(consoleSpy).toHaveBeenCalledWith('string');

      writer.write(123);
      expect(consoleSpy).toHaveBeenCalledWith(123);

      writer.write({ test: 'value' });
      expect(consoleSpy).toHaveBeenCalledWith({ test: 'value' });
    });
  });

  describe('FileInputReader', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('should read file content correctly', () => {
      const mockContent = '1 2 3\n4 5 6';
      (fs.readFileSync as jest.Mock).mockReturnValue(mockContent);

      const reader = new FileInputReader('test.txt');
      const lines = reader.read();

      expect(fs.readFileSync).toHaveBeenCalledWith('test.txt', 'utf-8');
      expect(lines).toEqual(['1 2 3', '4 5 6']);
    });

    it('should use default filename if none provided', () => {
      const mockContent = '1 2 3';
      (fs.readFileSync as jest.Mock).mockReturnValue(mockContent);

      const reader = new FileInputReader();
      reader.read();

      expect(fs.readFileSync).toHaveBeenCalledWith('input.txt', 'utf-8');
    });

    it('should handle empty file', () => {
      (fs.readFileSync as jest.Mock).mockReturnValue('');

      const reader = new FileInputReader();
      const lines = reader.read();

      expect(lines).toEqual(['']);
    });

    it('should handle file with only newlines', () => {
      (fs.readFileSync as jest.Mock).mockReturnValue('\n\n\n');

      const reader = new FileInputReader();
      const lines = reader.read();

      expect(lines).toEqual(['', '', '', '']);
    });
  });

  describe('FileOutputWriter', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('should write content to file correctly', () => {
      const writer = new FileOutputWriter('output.txt');
      const data = [1, 2, 3];
      writer.write(data);

      expect(fs.writeFileSync).toHaveBeenCalledWith('output.txt', '1,2,3');
    });

    it('should use default filename if none provided', () => {
      const writer = new FileOutputWriter();
      writer.write('test');

      expect(fs.writeFileSync).toHaveBeenCalledWith('output.txt', 'test');
    });

    it('should convert non-string data to string', () => {
      const writer = new FileOutputWriter();
      const data = { test: 'value' };
      writer.write(data);

      expect(fs.writeFileSync).toHaveBeenCalledWith('output.txt', '{"test":"value"}');
    });

    it('should handle null and undefined', () => {
      const writer = new FileOutputWriter();
      
      writer.write(null);
      expect(fs.writeFileSync).toHaveBeenCalledWith('output.txt', 'null');

      writer.write(undefined);
      expect(fs.writeFileSync).toHaveBeenCalledWith('output.txt', 'undefined');
    });

    it('should handle arrays with different types', () => {
      const writer = new FileOutputWriter();
      const data = [1, 'two', { three: 3 }];
      writer.write(data);

      expect(fs.writeFileSync).toHaveBeenCalledWith('output.txt', '1,two,{"three":3}');
    });
  });
});

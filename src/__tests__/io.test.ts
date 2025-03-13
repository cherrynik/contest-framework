import { FileInputReader, ConsoleInputReader } from '../io/readers';
import { FileOutputWriter, ConsoleOutputWriter } from '../io/writers';
import * as fs from 'fs';

// Mock fs module
jest.mock('fs');

describe('I/O Components', () => {
  describe('FileInputReader', () => {
    let reader: FileInputReader;

    beforeEach(() => {
      reader = new FileInputReader('test.txt');
      jest.clearAllMocks();
    });

    it('should read file content correctly', () => {
      const mockContent = '1 2 3\n4 5 6';
      (fs.readFileSync as jest.Mock).mockReturnValue(mockContent);

      const result = reader.read();
      expect(result).toEqual(['1 2 3', '4 5 6']);
      expect(fs.readFileSync).toHaveBeenCalledWith('test.txt', 'utf-8');
    });
  });

  describe('FileOutputWriter', () => {
    let writer: FileOutputWriter;

    beforeEach(() => {
      writer = new FileOutputWriter('test.txt');
      jest.clearAllMocks();
    });

    it('should write data to file', () => {
      const data = 'test output';
      writer.write(data);
      expect(fs.writeFileSync).toHaveBeenCalledWith('test.txt', data);
    });
  });

  describe('ConsoleInputReader', () => {
    let reader: ConsoleInputReader;

    beforeEach(() => {
      reader = new ConsoleInputReader();
    });

    it('should return a promise', () => {
      const result = reader.read();
      expect(result).toBeInstanceOf(Promise);
    });
  });

  describe('ConsoleOutputWriter', () => {
    let writer: ConsoleOutputWriter;
    let consoleSpy: jest.SpyInstance;

    beforeEach(() => {
      writer = new ConsoleOutputWriter();
      consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    });

    afterEach(() => {
      consoleSpy.mockRestore();
    });

    it('should write to console', () => {
      const data = 'test output';
      writer.write(data);
      expect(consoleSpy).toHaveBeenCalledWith(data);
    });
  });
});

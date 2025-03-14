import * as fs from 'fs';
import { FileInputReader } from './file-reader';

jest.mock('fs');

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
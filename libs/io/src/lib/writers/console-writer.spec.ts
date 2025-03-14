import { ConsoleOutputWriter } from './console-writer';

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
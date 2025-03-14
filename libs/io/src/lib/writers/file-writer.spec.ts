import * as fs from 'fs';
import { FileOutputWriter } from './file-writer';

jest.mock('fs');

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
import { parsers } from './parsers';
import { defaultParser } from '../index';

describe('parsers', () => {
  it('should work', () => {
    expect(parsers()).toEqual('parsers');
  });
});

describe('defaultParser', () => {
  it('should parse a single number', () => {
    expect(defaultParser('42')).toEqual([42]);
  });

  it('should parse multiple numbers', () => {
    expect(defaultParser('1 2 3 4 5')).toEqual([1, 2, 3, 4, 5]);
  });

  it('should handle negative numbers', () => {
    expect(defaultParser('-1 -2 3 -4')).toEqual([-1, -2, 3, -4]);
  });

  it('should handle decimal numbers', () => {
    expect(defaultParser('1.5 2.7 -3.2')).toEqual([1.5, 2.7, -3.2]);
  });

  it('should handle leading/trailing whitespace', () => {
    expect(defaultParser('  1 2 3  ')).toEqual([1, 2, 3]);
  });

  it('should handle multiple spaces between numbers', () => {
    expect(defaultParser('1   2     3')).toEqual([1, 2, 3]);
  });

  it('should handle empty string', () => {
    expect(defaultParser('')).toEqual([]);
  });

  it('should handle string with only whitespace', () => {
    expect(defaultParser('   ')).toEqual([]);
  });

  it('should handle invalid number strings', () => {
    expect(defaultParser('1 abc 2')).toEqual([1, NaN, 2]);
  });

  it('should handle zero', () => {
    expect(defaultParser('0 -0 0.0')).toEqual([0, -0, 0]);
  });
});

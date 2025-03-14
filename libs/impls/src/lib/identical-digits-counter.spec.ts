import {
  countIdenticalDigitNumbers,
  solveIdenticalDigitsCounter,
} from './identical-digits-counter';

describe('Identical Digits Counter', () => {
  describe('countIdenticalDigitNumbers', () => {
    it('should correctly count numbers with identical digits in range [4, 7]', () => {
      const result = countIdenticalDigitNumbers(BigInt(4), BigInt(7));
      expect(result).toBe(4); // Numbers 4, 5, 6, 7
    });

    it('should correctly count numbers with identical digits in range [10, 100]', () => {
      const result = countIdenticalDigitNumbers(BigInt(10), BigInt(100));
      expect(result).toBe(9); // Numbers 11, 22, 33, 44, 55, 66, 77, 88, 99
    });

    it('should handle large ranges', () => {
      const result = countIdenticalDigitNumbers(BigInt(1), BigInt(100000));
      // 9 single-digit numbers (1-9)
      // 9 two-digit numbers (11, 22, ..., 99)
      // 9 three-digit numbers (111, 222, ..., 999)
      // 9 four-digit numbers (1111, 2222, ..., 9999)
      // 9 five-digit numbers (11111, 22222, ..., 99999)
      expect(result).toBe(9 * 5);
    });

    it('should handle ranges with no valid numbers', () => {
      const result = countIdenticalDigitNumbers(BigInt(123), BigInt(130));
      expect(result).toBe(0); // No numbers with identical digits in this range
    });
  });

  describe('solveIdenticalDigitsCounter', () => {
    it('should solve the first example', () => {
      const result = solveIdenticalDigitsCounter(['4 7']);
      expect(result).toBe(4);
    });

    it('should solve the second example', () => {
      const result = solveIdenticalDigitsCounter(['10 100']);
      expect(result).toBe(9);
    });
  });
});

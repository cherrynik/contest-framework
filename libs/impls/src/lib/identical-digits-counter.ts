/**
 * Counts the number of natural numbers with identical digits within a given range [L, R].
 * For example, numbers like 1, 22, 333, 4444 consist of identical digits.
 *
 * @param l - Lower bound of the range (inclusive)
 * @param r - Upper bound of the range (inclusive)
 * @returns The count of numbers with identical digits within the range
 */
export function countIdenticalDigitNumbers(l: bigint, r: bigint): number {
  // Helper function to check if a number consists of identical digits
  function hasIdenticalDigits(num: bigint): boolean {
    const numStr = num.toString();
    const firstDigit = numStr[0];
    return numStr.split('').every((digit) => digit === firstDigit);
  }

  // Helper function to generate all numbers with identical digits
  function generateIdenticalDigitNumbers(): bigint[] {
    const result: bigint[] = [];

    // Single-digit numbers (1-9)
    for (let digit = 1; digit <= 9; digit++) {
      // Start with a single digit
      let num = BigInt(digit);

      // Keep adding the same digit until we exceed the upper bound
      while (num <= r) {
        if (num >= l) {
          result.push(num);
        }
        // Append another digit (multiply by 10 and add the digit)
        num = num * BigInt(10) + BigInt(digit);
      }
    }

    return result;
  }

  // Generate all valid numbers and count them
  const validNumbers = generateIdenticalDigitNumbers();
  return validNumbers.length;
}

/**
 * Solves the problem of counting numbers with identical digits within a range.
 *
 * @param input - Array containing two strings representing L and R
 * @returns The count of numbers with identical digits within the range [L, R]
 */
export function solveIdenticalDigitsCounter(input: string[]): number {
  const [lStr, rStr] = input[0].split(' ');
  const l = BigInt(lStr);
  const r = BigInt(rStr);

  return countIdenticalDigitNumbers(l, r);
}

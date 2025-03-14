# Identical Digits Counter

This application counts the number of natural numbers with identical digits within a given range [L, R].

## Problem Description

While developing a task, Sasha decided to generate several new tests. Each of Sasha's tests must be a natural number not less than L and not greater than R. Additionally, the natural number in the test must consist of identical digits.

For example, the number 999 meets this requirement, while the number 123 does not. What is the maximum number of different tests that Sasha can create?

## Input Format

A single line contains two natural numbers L and R - the constraints on Sasha's tests.
Note that these numbers may not fit into a 32-bit data type, use a 64-bit type if necessary.

## Output Format

Output a single number - the number of tests that Sasha can create.

## Examples

### Example 1
Input:
```
4 7
```
Output:
```
4
```
Explanation: Sasha can use numbers 4, 5, 6, and 7.

### Example 2
Input:
```
10 100
```
Output:
```
9
```
Explanation: Sasha can use numbers 11, 22, 33, 44, 55, 66, 77, 88, and 99.

## Building and Running

```bash
# Build the application
nx build identical-digits-counter

# Run the application
nx serve identical-digits-counter
``` 
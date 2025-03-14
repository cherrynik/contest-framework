import { ContestFramework } from '../framework';
import { ConsoleInputReader } from '../io/readers';
import { ConsoleOutputWriter } from '../io/writers';

// Number of input lines we expect
const LINES_COUNT = 3;

class Task3Solution extends ContestFramework {
  constructor() {
    super(new ConsoleInputReader(LINES_COUNT), new ConsoleOutputWriter());
  }

  protected solve(input: number[][]): number {
    // Parse first line for n (number of employees) and t (time limit)
    const [n, t] = input[0];

    // Parse second line for floor numbers
    const floors = input[1];

    // Parse third line for index of leaving employee (convert to 0-based)
    const leavingEmployeeIndex = Number(input[2]) - 1;
    const leavingEmployeeFloor = floors[leavingEmployeeIndex];

    // Function to calculate steps between floors
    const getSteps = (from: number, to: number) => Math.abs(to - from);

    let minSteps = Infinity;

    // Try each floor as starting point
    for (let startFloorIndex = 0; startFloorIndex < n; startFloorIndex++) {
      const startFloor = floors[startFloorIndex];

      // Skip if we can't reach leaving employee in time from this start point
      const stepsToLeaving = getSteps(startFloor, leavingEmployeeFloor);
      if (stepsToLeaving > t) continue;

      // Create array of remaining floors to visit
      const remainingFloors = floors.filter((_, i) => i !== startFloorIndex);

      // Try all permutations of remaining floors
      const permutations = getPermutations(remainingFloors);

      for (const perm of permutations) {
        // Insert leaving employee floor at beginning if not starting there
        if (startFloor !== leavingEmployeeFloor) {
          perm.unshift(leavingEmployeeFloor);
        }

        // Calculate total steps for this path
        let totalSteps = getSteps(startFloor, perm[0]);
        for (let i = 1; i < perm.length; i++) {
          totalSteps += getSteps(perm[i - 1], perm[i]);
        }

        minSteps = Math.min(minSteps, totalSteps);
      }
    }

    return minSteps;
  }
}

// Helper function to generate permutations
function getPermutations<T>(arr: T[]): T[][] {
  if (arr.length <= 1) return [arr];

  const result: T[][] = [];
  for (let i = 0; i < arr.length; i++) {
    const current = arr[i];
    const remaining = [...arr.slice(0, i), ...arr.slice(i + 1)];
    const perms = getPermutations(remaining);

    for (const perm of perms) {
      result.push([current, ...perm]);
    }
  }

  return result;
}

// Create and run the solution
const solution = new Task3Solution();
solution.run().catch(console.error);

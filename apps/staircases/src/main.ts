import { ContestFramework } from '@contest/core';
import { permute } from '@contest/impls';
import { ConsoleInputReader } from '@contest/io';

const LINES_COUNT = 0 as const;

// 1 minute per floor
// start - 0 (parking), there is no staircase, only a lift to any floor
// can visit in any order, but one of them is leaving in t minutes

// Kate's plan:
// 1. go to any floor (immediately)
// 2. check out all the coleagues on that floor (immediately)
// 3. in the first t*60 seconds visit the leaving colleague
// 4. walk the least amount of floors through the staircase

// 1st line: n - amount of colleagues, t - time in minutes one of colleagues is leaving
// 2nd line: n integers - floors where colleagues are located
// 3rd line: k - number of the colleague that is leaving

// output: minimum amount of floors Kate needs to walk through

export class StaircasesSolution extends ContestFramework {
  protected solve(input: string[][]): number[][] {
    const [firstLine, secondLine, thirdLine] = input;

    const [colleaguesCount, leavingInMinutes] = [6, 1]; // firstLine.map(Number);
    const colleaguesFloors = [1, 2, 3, 6, 8, 25]; // secondLine.map(Number);
    const leavingColleagueIndex = 4; // Number(thirdLine[0]) - 1;

    // leavingInMinutes
    const result: number[][] = [],
      used: boolean[] = Array.from(
        { length: colleaguesFloors.length },
        () => false
      ),
      permutation: number[] = [];

    permute(result, colleaguesFloors, permutation, used);

    let perm;
    const fastest = result.reduce((fastestAcc, permutation) => {
      const time = permutation.reduce((acc, floor, i, thePermutation) => {
        if (i === 0) {
          return 0;
        }

        const diff = Math.abs(floor - thePermutation[i - 1]);

        return acc + diff;
      }, 0);

      if (time < fastestAcc) {
        perm = permutation;
        return time;
      }

      return fastestAcc;
    }, Infinity);

    console.log(fastest, perm);

    // result.forEach((permutation) => {
    //   permutation.forEach((floor, i, thePermutation) => {
    //     if (i === 0) {
    //       return;
    //     }

    //     const diff = Math.abs(floor - thePermutation[i - 1]);

    //   });
    // });

    return result;
  }
}

const inputReader = new ConsoleInputReader(LINES_COUNT);
const solution = new StaircasesSolution(inputReader);

solution.run().catch(console.error);

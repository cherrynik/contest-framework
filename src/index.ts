// import * as readline from "readline";

// const AMOUNT_OF_COINS = Infinity;

// let linesCount = 0;
// let hasFinished = false;

// type FirstLineInput = {
//   n: number;
// };

// type SecondLineInput = {
//   a: number;
//   b: number;
//   c: number;
// };

// type InputData = FirstLineInput | SecondLineInput;

// const getInputSerialized = (data: string): InputData | undefined => {
//   linesCount++;

//   if (linesCount === 1) {
//     // The first line contains the number N — the wallet's coin cost limit
//     const n: number = Number(data);
//     return { n };
//   } else if (linesCount === 2) {
//     // The second line contains three numbers: A, B, and C, representing coin types’ values
//     const [a, b, c] = data.split(" ").map(Number);
//     return { a, b, c };
//   }
// };

// const getSolution = (data: InputData): number | void => {
//   if ("n" in data) {
//     const { n } = data;
//     return n;
//   } else if ("a" in data && "b" in data && "c" in data) {
//     const { a, b, c } = data;
//     // Write your solution logic for a, b, c here
//   }
// };

// const main = (): void => {
//   const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout,
//   });

//   rl.on("line", (data: string) => {
//     const input = getInputSerialized(data);
//     if (!input) return;
//     const result = getSolution(input);

//     if (hasFinished) {
//       rl.close();
//       console.log(result);
//       process.exit(0);
//     }
//   });
// };

// main();

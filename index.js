// const readline = require("readline");

// const AMOUNT_OF_COINS = Infinity;

// let linesCount = 0;
// let hasFinished = false;

// const getInputSerialized = (data) => {
//   linesCount++;

//   if (linesCount === 1) {
//     // Первая строка содержит число N — ограничение на сумарную стоимость монет в кошельке
//     const n = Number(data);
//     return {
//       n,
//     };
//   } else if (linesCount === 2) {
//     // Вторая строка содержит три числа: A, B и C, задающие достоинства типов монет (1 <= A, B, C <= 10^5)
//     const [a, b, c] = data.split(" ").map(Number);
//     return {
//       a,
//       b,
//       c,
//     };
//   }
// };

// const getSolution = (data) => {
//   if (linesCount === 1) {
//     const { n } = data;
//     return n;
//   } else if (linesCount === 2) {
//     const { a, b, c } = data;
//   }
// };

// const main = () => {
//   const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout,
//   });

//   rl.on("line", (data) => {
//     const input = getInputSerialized(data);
//     const result = getSolution(input);

//     if (hasFinished) {
//       rl.close();

//       console.log(result);

//       process.exit(0);
//     }
//   });
// };

// main();

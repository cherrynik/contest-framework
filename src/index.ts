import { createInterface } from "readline";
import { stdin, stdout, exit } from "process";
import * as fs from "fs";

const MODE = process.argv.includes("--file") ? "file" : "console";

const program = {
  __STEPS_COUNT: 2,
  __linesCount: 0,
  __output: (result?: unknown) => {
    if (MODE === "file") {
      fs.writeFileSync("output.txt", String(result));
    } else {
      console.log(result);
    }
  },
  __exit: (result?: unknown) => {
    program.__output(result);

    exit(0);
  },
  __defaultParser: (data: string) => data.split(" ").map(Number),
  __customParserPerLine: {
    // Example custom parsers for specific lines
    // 0: (data: string) => data.split(",").map(Number), // Example: comma-separated numbers
    // 1: (data: string) => data.split("|").map(Number), // Example: pipe-separated numbers
  },

  __linesInput: [] as any[],
};

const processInput = (data: string) => {
  const {
    __linesCount,
    __linesInput,
    __STEPS_COUNT,
    __exit,
    __defaultParser,
    __customParserPerLine,
  } = program;

  // Get the appropriate parser for this line, or use default
  const parser = __customParserPerLine[__linesCount] || __defaultParser;
  __linesInput[__linesCount] = parser(data);

  program.__linesCount++;

  if (__linesCount === __STEPS_COUNT) {
    __exit();
  }
};

const main = (): void => {
  if (MODE === "file") {
    // File input mode
    const input = fs.readFileSync("input.txt", "utf-8").split("\n");
    input.forEach((line) => {
      if (line.trim()) {
        processInput(line.trim());
      }
    });
  } else {
    // Console input mode
    const rl = createInterface({
      input: stdin,
      output: stdout,
    });

    rl.on("line", (data: string) => {
      processInput(data);
    });
  }
};

main();

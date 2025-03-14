import { defaultParser, ParserFunction } from '@contest/parsers';
import {
  ConsoleInputReader,
  ConsoleOutputWriter,
  InputReader,
  OutputWriter,
} from '@contest/io';
import { DEFAULT_LINES_COUNT } from '@contest/utils';

export class ContestFramework {
  private linesInput: unknown[][];
  private readonly defaultParser: ParserFunction;
  private readonly customParserPerLine: Record<number, ParserFunction>;
  private readonly inputReader: InputReader;
  private readonly outputWriter: OutputWriter;
  #result: unknown;

  constructor(
    inputReader: InputReader = new ConsoleInputReader(DEFAULT_LINES_COUNT),
    outputWriter: OutputWriter = new ConsoleOutputWriter(),
    parser: ParserFunction = defaultParser,
    customParserPerLine: Record<number, ParserFunction> = {},
  ) {
    this.linesInput = [];
    this.defaultParser = parser;
    this.customParserPerLine = customParserPerLine;
    this.inputReader = inputReader;
    this.outputWriter = outputWriter;
    this.#result = null;
  }

  private processInput(data: string, lineIndex: number): void {
    const parser = this.customParserPerLine[lineIndex] || this.defaultParser;
    this.linesInput[lineIndex] = parser(data);
  }

  private exit(result?: unknown): void {
    this.#result = result;
    this.outputWriter.write(result);
  }

  protected solve(input: unknown[][]): unknown {
    // This method should be overridden by the user
    throw new Error('Solve method must be implemented');
  }

  public get result(): unknown {
    return this.#result;
  }

  public async run(): Promise<void> {
    const input = await this.inputReader.read();
    input.forEach((line, index) => {
      this.processInput(line, index);
    });
    this.exit(this.solve(this.linesInput));
  }
}

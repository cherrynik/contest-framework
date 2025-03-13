import { exit } from 'process';
import { InputReader, OutputWriter, ParserFunction } from './types';
import { defaultParser } from './parsers';

export class ContestFramework {
  private readonly stepsCount: number;
  private linesCount: number;
  private linesInput: any[];
  private readonly defaultParser: ParserFunction;
  private readonly customParserPerLine: Record<number, ParserFunction>;
  private readonly inputReader: InputReader;
  private readonly outputWriter: OutputWriter;

  constructor(
    stepsCount: number,
    inputReader: InputReader,
    outputWriter: OutputWriter,
    parser: ParserFunction = defaultParser,
    customParserPerLine: Record<number, ParserFunction> = {}
  ) {
    this.stepsCount = stepsCount;
    this.linesCount = 0;
    this.linesInput = [];
    this.defaultParser = parser;
    this.customParserPerLine = customParserPerLine;
    this.inputReader = inputReader;
    this.outputWriter = outputWriter;
  }

  private processInput(data: string): void {
    const parser = this.customParserPerLine[this.linesCount] || this.defaultParser;
    this.linesInput[this.linesCount] = parser(data);
    this.linesCount++;

    if (this.linesCount === this.stepsCount) {
      this.exit(this.solve(this.linesInput));
    }
  }

  private exit(result?: unknown): void {
    this.outputWriter.write(result);
    exit(0);
  }

  protected solve(input: any[]): unknown {
    // This method should be overridden by the user
    throw new Error('Solve method must be implemented');
  }

  public async run(): Promise<void> {
    const input = await this.inputReader.read();
    input.forEach(line => {
      if (line.trim()) {
        this.processInput(line.trim());
      }
    });
  }
}

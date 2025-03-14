import { exit } from 'process';
import { InputReader, OutputWriter, ParserFunction } from './types';
import { defaultParser } from './parsers';

export class ContestFramework {
  private linesInput: any[];
  private readonly defaultParser: ParserFunction;
  private readonly customParserPerLine: Record<number, ParserFunction>;
  private readonly inputReader: InputReader;
  private readonly outputWriter: OutputWriter;

  constructor(
    inputReader: InputReader,
    outputWriter: OutputWriter,
    parser: ParserFunction = defaultParser,
    customParserPerLine: Record<number, ParserFunction> = {}
  ) {
    this.linesInput = [];
    this.defaultParser = parser;
    this.customParserPerLine = customParserPerLine;
    this.inputReader = inputReader;
    this.outputWriter = outputWriter;
  }

  private processInput(data: string, lineIndex: number): void {
    const parser = this.customParserPerLine[lineIndex] || this.defaultParser;
    this.linesInput[lineIndex] = parser(data);
  }

  private exit(result?: unknown): void {
    this.outputWriter.write(result);
    exit(0);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected solve(input: any[]): unknown {
    // This method should be overridden by the user
    throw new Error('Solve method must be implemented');
  }

  public async run(): Promise<void> {
    const input = await this.inputReader.read();
    input.forEach((line, index) => {
      if (line.trim()) {
        this.processInput(line.trim(), index);
      }
    });
    this.exit(this.solve(this.linesInput));
  }
}

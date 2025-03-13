import { Mode, ParserFunction } from './types';
import { ContestFramework } from './framework';
import { ioHandlers } from './io/handlers';

export class ContestFrameworkFactory {
  static create(
    stepsCount: number,
    mode: Mode = 'console',
    parser?: ParserFunction,
    customParserPerLine?: Record<number, ParserFunction>
  ): ContestFramework {
    const { input, output } = ioHandlers[mode];

    return new ContestFramework(stepsCount, input, output, parser, customParserPerLine);
  }
}

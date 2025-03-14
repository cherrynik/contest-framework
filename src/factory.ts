import { Mode, ParserFunction } from './types';
import { ContestFramework } from './framework';
import { ioHandlers } from './io/handlers';

export class ContestFrameworkFactory {
  static create(
    mode: Mode = 'console',
    parser?: ParserFunction,
    customParserPerLine?: Record<number, ParserFunction>
  ): ContestFramework {
    const { input, output } = ioHandlers[mode];

    return new ContestFramework(input, output, parser, customParserPerLine);
  }
}

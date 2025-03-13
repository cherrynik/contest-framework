import { ContestFrameworkFactory } from '../factory';
import { ContestFramework } from '../framework';
import { Mode } from '../types';

describe('ContestFrameworkFactory', () => {
  describe('create', () => {
    it('should create framework instance with console mode', () => {
      const framework = ContestFrameworkFactory.create(2);
      expect(framework).toBeInstanceOf(ContestFramework);
    });

    it('should create framework instance with file mode', () => {
      const framework = ContestFrameworkFactory.create(2, 'file' as Mode);
      expect(framework).toBeInstanceOf(ContestFramework);
    });

    it('should use custom parser when provided', () => {
      const customParser = (data: string) => data.split(',').map(Number);
      const framework = ContestFrameworkFactory.create(2, 'console', customParser);
      expect(framework).toBeInstanceOf(ContestFramework);
    });

    it('should use custom parser per line when provided', () => {
      const customParserPerLine = {
        0: (data: string) => data.split(',').map(Number),
        1: (data: string) => data.split('|').map(Number),
      };
      const framework = ContestFrameworkFactory.create(
        2,
        'console',
        undefined,
        customParserPerLine
      );
      expect(framework).toBeInstanceOf(ContestFramework);
    });
  });
});

import { ContestFramework } from '../framework';
import { ConsoleInputReader } from '../io/readers';
import { defaultParser } from '../parsers';

const LINES_COUNT = 1 as const;
interface TariffInput {
  price: number;
  trafficInMB: number;
  priceForExtraMB: number;
  usedInMB: number;
}

const getAmountToPay = ({
  price,
  trafficInMB,
  priceForExtraMB,
  usedInMB,
}: TariffInput): number =>
  price + Math.max(usedInMB - trafficInMB, 0) * priceForExtraMB;

class InternetTariffSolution extends ContestFramework {
  protected solve(input: string[][]): number {
    const [firstLine] = input;
    const [price, trafficInMB, priceForExtraMB, usedInMB] =
      firstLine.map(Number);

    return getAmountToPay({
      price,
      trafficInMB,
      priceForExtraMB,
      usedInMB,
    });
  }
}

const solution = new InternetTariffSolution(
  new ConsoleInputReader(LINES_COUNT), // Console reader that will read 1 line
  {
    write: (result: unknown) => console.log(result),
  },
  defaultParser
);

solution.run().catch(console.error);

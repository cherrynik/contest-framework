import { ContestFramework } from '../framework';
import { ConsoleInputReader } from '../io/readers';

const LINES_COUNT = 1 as const;

const getAmountToPay = ({
  price,
  trafficInMB,
  priceForExtraMB,
  usedInMB,
}: {
  price: number;
  trafficInMB: number;
  priceForExtraMB: number;
  usedInMB: number;
}): number => price + Math.max(usedInMB - trafficInMB, 0) * priceForExtraMB;

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
  new ConsoleInputReader(LINES_COUNT),
);

solution.run().catch(console.error);

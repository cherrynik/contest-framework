export function impls(): string {
  return 'impls';
}

export const sumAll = (input: number[]): number => {
  return input.reduce((acc, curr) => acc + curr, 0);
};

export const getAmountToPay = ({
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

export const getAmountOfRouletteBets = (t: number): number =>
  t === 1 ? 0 : Math.ceil(Math.log2(t));

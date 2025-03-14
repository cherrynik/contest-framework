import { impls } from './impls';
import { sumAll, getAmountToPay, getAmountOfRouletteBets } from './impls';

describe('impls', () => {
  it('should work', () => {
    expect(impls()).toEqual('impls');
  });
});

describe('sumAll', () => {
  it('should return 0 for empty array', () => {
    expect(sumAll([])).toBe(0);
  });

  it('should correctly sum single number', () => {
    expect(sumAll([5])).toBe(5);
  });

  it('should correctly sum multiple numbers', () => {
    expect(sumAll([1, 2, 3, 4, 5])).toBe(15);
  });

  it('should handle negative numbers', () => {
    expect(sumAll([-1, -2, 3, 4])).toBe(4);
  });
});

describe('getAmountToPay', () => {
  it('should return base price when usage is below traffic limit', () => {
    expect(getAmountToPay({
      price: 100,
      trafficInMB: 10,
      priceForExtraMB: 1,
      usedInMB: 5
    })).toBe(100);
  });

  it('should return base price when usage equals traffic limit', () => {
    expect(getAmountToPay({
      price: 100,
      trafficInMB: 10,
      priceForExtraMB: 1,
      usedInMB: 10
    })).toBe(100);
  });

  it('should correctly calculate extra charges when usage exceeds limit', () => {
    expect(getAmountToPay({
      price: 100,
      trafficInMB: 10,
      priceForExtraMB: 2,
      usedInMB: 15
    })).toBe(110); // base 100 + (15-10)*2
  });

  it('should handle zero base price', () => {
    expect(getAmountToPay({
      price: 0,
      trafficInMB: 10,
      priceForExtraMB: 1,
      usedInMB: 15
    })).toBe(5);
  });
});

describe('getAmountOfRouletteBets', () => {
  it('should return 0 for input 1', () => {
    expect(getAmountOfRouletteBets(1)).toBe(0);
  });

  it('should return 1 for input 2', () => {
    expect(getAmountOfRouletteBets(2)).toBe(1);
  });

  it('should return 2 for input 3', () => {
    expect(getAmountOfRouletteBets(3)).toBe(2);
  });

  it('should return 2 for input 4', () => {
    expect(getAmountOfRouletteBets(4)).toBe(2);
  });

  it('should return 3 for input 5', () => {
    expect(getAmountOfRouletteBets(5)).toBe(3);
  });

  it('should handle larger numbers', () => {
    expect(getAmountOfRouletteBets(6)).toBe(3);
    expect(getAmountOfRouletteBets(7)).toBe(3);
    expect(getAmountOfRouletteBets(8)).toBe(3);
    expect(getAmountOfRouletteBets(9)).toBe(4);
    expect(getAmountOfRouletteBets(16)).toBe(4);
    expect(getAmountOfRouletteBets(17)).toBe(5);
  });
});

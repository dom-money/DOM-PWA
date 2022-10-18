import { BigNumber, ethers } from 'ethers';

type SumTwoBalancesOfToken = (
  firstNumber: BigNumber,
  secondNumber: BigNumber,
  tokenDecimals: number
  ) => string;

/**
 * Sums the two balances of a token and
 * returns a float number in string format
 * @param {BigNumber} firstNumber - First balance to sum
 * @param {BigNumber} secondNumber - Second balance to sum
 * @param {number} tokenDecimals - Number of token decimals
 * @return {string} Sum of two balances as a float number in string format
 */
export const sumTwoBalancesOfToken: SumTwoBalancesOfToken = (
    firstNumber,
    secondNumber,
    tokenDecimals,
) => {
  const sumAsBigNumber = firstNumber.add(secondNumber);
  if (sumAsBigNumber.isZero()) {
    return '0';
  };
  return ethers.utils.formatUnits(sumAsBigNumber, tokenDecimals);
};

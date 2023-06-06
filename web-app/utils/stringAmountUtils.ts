/**
 * Removes trailing zeros (if present)
 * @param {string} numberAsString - Number as a string
 * @return {string} Number as a string without trailing zeros
 */
const removeTrailingZeros = (numberAsString: string) => {
  const pattern = /^\d+(\.\d*[1-9])?/g;
  return numberAsString.match(pattern)?.[ 0 ] ?? '0';
};


/**
 * Replaces in string at specified index
 * @param {string} initialString - Initial String
 * @param {string} replacementString - Replacement String
 * @param {number} startingIndex - Index at which replacement should start
 * @return {string} Initial string with part of it replaced
 */
const replaceInStringAtIndex = (
    initialString: string,
    replacementString: string,
    startingIndex: number,
) => {
  const firstPart = initialString.substring(0, startingIndex);
  const middlePart = replacementString;
  const lastPart = initialString.substring(startingIndex + middlePart.length);
  return `${firstPart}${middlePart}${lastPart}`;
};


/**
 * Rounding number presented as string half up
 * (rounding will be always performed)
 * - Works for integer and float numbers
 * @param {string} inputNumberAsString - Input number as a string
 * @return {string} Rounded number as a string
 */
const roundNumberAsStringHalfUp = (inputNumberAsString: string) => {
  let amountString = inputNumberAsString;

  // Starting with the last digit
  let index = inputNumberAsString.length - 1;

  // While digit (starting with the last and moving downward) equals to '9' ...
  // .. changing that digit to '0'
  while (amountString[ index ] === '9' || amountString[ index ] === '.') {
    // If character at specified index equeals to '.' - just ...
    // .. skipping to the next index
    if (amountString[ index ] !== '.') {
      amountString = replaceInStringAtIndex(amountString, '0', index);
    };
    index--;
  };
  // If the end of the string is reached - inserting '1' at the beginning
  if (index === -1) {
    amountString = `1${amountString}`;
  } else {
  // If the end of the string isn't reached - incrementing digit ...
  // .. at the current index
    amountString = replaceInStringAtIndex(
        amountString,
        incrementNumberAsString(amountString[ index ]),
        index,
    );
  }
  return amountString;
};


/**
 * Increment number as a string
 * @param {string} numberAsString - Input number as a string
 * @return {string} Incremented number as a string
 */
const incrementNumberAsString = (numberAsString: string) => {
  return (parseInt(numberAsString)+ 1).toString();
};


const roundNumberAsString = (amount: string, maxDecimals: number) => {
  // Handling the case when amount is integer
  if (!(/\./g.test(amount))) {
    return amount;
  };

  // Getting integer and decimal parts of the number
  const { integerPart, decimalPart } = getIntegerAndDecimalParts(amount);

  // Handling the case when decimal part has less or equal number of ...
  // .. decimals than the `decimals` option
  if (decimalPart.length <= maxDecimals) {
    return `${integerPart}.${decimalPart}`;
  };

  // Getting the after last digital to decide if rounding is needed
  const roundingDigit = decimalPart?.[ maxDecimals ] ?? '0';
  const roundingDigitAsNumber = parseInt(roundingDigit);

  // Cutting amount to specified number of decimals
  const cutAmount = `${integerPart}.${decimalPart.slice(0, maxDecimals)}`;

  // Handling the case when no rounding is needed ...
  // .. and returning without trailing zeros
  if (roundingDigitAsNumber < 5) {
    return removeTrailingZeros(cutAmount);
  };

  // Handling the opposite case by rounding amount half up ...
  // .. and returning without trailing zeros
  const roundedHalfUpAmount = roundNumberAsStringHalfUp(cutAmount);
  return removeTrailingZeros(roundedHalfUpAmount);
};


const addTrailingZeros = (amount: string, maxDecimals: number) => {
  const { integerPart, decimalPart } = getIntegerAndDecimalParts(amount);
  const decimalPartWithTrailingZeros = decimalPart.padEnd(maxDecimals, '0');
  return `${integerPart}.${decimalPartWithTrailingZeros}`;
};


const addGrouping = (amount: string) => {
  const { integerPart, decimalPart } = getIntegerAndDecimalParts(amount);
  const groupingPattern = /\d{1,3}(?=(\d{3})+(?!\d))/g;
  const groupedIntegerPart = integerPart.replace(groupingPattern, '$&,');
  if (decimalPart.length === 0) {
    return groupedIntegerPart;
  };
  const formattedAmount = `${groupedIntegerPart}.${decimalPart}`;
  return formattedAmount;
};


/**
 * Sums the two balances of a token and
 * returns a float number in string format
 * @param {string} numberAsString - First balance to sum
 * @return {{integerPart: string, decimalPart: string}}
 * Sum of two balances as a float number in string format
 */
export const getIntegerAndDecimalParts = (numberAsString: string) => {
  const integerPart = numberAsString.match(/^[\d|,]+/)?.[ 0 ] ?? '0';
  const decimalPart = numberAsString.match(/(\.)(\d+)$/)?.[ 2 ] ?? '';
  return { integerPart, decimalPart };
};


type FormatStringAmountOptions =
  { useGrouping?: boolean} &
  ({
    maxDecimals: number;
    shouldAddTrailingZeros?: boolean;
  } |
  {
    maxDecimals: undefined;
    shouldAddTrailingZeros?: never;
  });

export const formatStringAmount = (
    unformattedAmount: string,
    {
      maxDecimals,
      shouldAddTrailingZeros,
      useGrouping,
    }: FormatStringAmountOptions,
) => {
  let formattedAmount = unformattedAmount;
  // Removing trailing zeros
  formattedAmount = removeTrailingZeros(formattedAmount);

  // If maxDecimals parameter is provided - rounding ...
  // .. amount to match the desired number of decimals
  if (maxDecimals) {
    // Rounding
    formattedAmount = roundNumberAsString(formattedAmount, maxDecimals);
  };
  // If shouldAddTrailingZeros parameter is provided - adding ...
  // .. trailing zeros to match a fixed number of decimals
  if (shouldAddTrailingZeros) {
    formattedAmount = addTrailingZeros(formattedAmount, maxDecimals);
  };
  // If addGrouping parameter is provided - adding ...
  // .. grouping separator
  if (useGrouping) {
    formattedAmount = addGrouping(formattedAmount);
  };
  return formattedAmount;
};


export const checkIfStringAmountIsZero = (amount: string) => {
  // Checking if string contains any digits in range of 1-9
  if (/[1-9]/g.test(amount)) {
    return false;
  };
  return true;
};

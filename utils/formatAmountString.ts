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

/**
 * Formats string amounts for displaying in the UI.
 * - Rounds half up
 * - Removes trailing zeros
 * @param {string} unformattedAmount - Unformatted Amount
 * @param {number | undefined} decimals - Number of decimals to display
 * @param {boolean | undefined} shouldAddTrailingZeros
 * - Should trailing zeros be added to match the provided number of decimals?
 * @return {string} Formatted amount
 */
const formatAmountString = (
    unformattedAmount: string,
    decimals?: number,
    shouldAddTrailingZeros = false,
) => {
  //
  // TBD: Optionally adding trailing zeros to match the exact number of decimals
  //

  // Removing trailing zeros
  const amountWithoutTrailingZeros = removeTrailingZeros(unformattedAmount);

  // If decimal parameter isn't provided - returning ...
  // .. amount just without trailing zeros
  if (!decimals) {
    return amountWithoutTrailingZeros;
  };

  // Getting integer part of the number
  const integerPart = amountWithoutTrailingZeros.match(/[^\.]*/)?.[ 0 ] ?? '0';

  // Handling the case when amount is integer
  if (!(/\./g.test(amountWithoutTrailingZeros))) {
    return integerPart;
  };

  // Getting decimal part of the number
  const decimalPart = amountWithoutTrailingZeros.match(/[^\.]*$/)?.[ 0 ] ?? '0';

  // Handling the case when decimal part has less or equal number of ...
  // .. decimals than the `decimals` option
  if (decimalPart.length <= decimals) {
    return `${integerPart}.${decimalPart}`;
  };

  // Getting the after last digital to decide if rounding is needed
  const roundingDigit = decimalPart?.[ decimals ] ?? '0';
  const roundingDigitAsNumber = parseInt(roundingDigit);

  // Cutting amount to specified number of decimals
  const cutAmount = `${integerPart}.${decimalPart.slice(0, decimals)}`;

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

export default formatAmountString;

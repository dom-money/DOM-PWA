import { useState } from 'react';
import { BigNumber, ethers } from 'ethers';
import { onInputChangeType } from '../components/AmountInput';

type UseInputAmpuntInputType = {
  balance?: BigNumber;
  tokenDecimals?: number;
};

type UseInputAmountType = ({
  balance,
  tokenDecimals,
}: UseInputAmpuntInputType) => {
  amount: string,
  amountUnformatted: string,
  amountAsBigNumber: BigNumber,
  isValid: boolean,
  errorMessage: string | null,
  handleChange: ({ formattedValue, value }: onInputChangeType) => void,
  handleClear: () => void,
};

const useInputAmount: UseInputAmountType = ({
  balance = BigNumber.from(0),
  tokenDecimals = 18,
}) => {
  const [ amount, setAmount ] = useState('');
  const [ amountUnformatted, setAmountUnformatted ] = useState('');
  const [
    amountAsBigNumber,
    setAmountAsBigNumber,
  ] = useState(BigNumber.from(0));
  const [ errorMessage, setErrorMessage ] = useState<string | null>(null);

  const isValid = errorMessage === null && amountAsBigNumber.gt(0);

  const handleChange = ({
    formattedValue,
    value: unformattedValue,
  }: onInputChangeType) => {
    const decimalPart = unformattedValue.match(/(\.)(\d+)$/)?.[ 2 ] ?? '';
    const decimalsAmount = decimalPart.length;
    // Not allowing inputing more decimals, than token supports
    if (decimalsAmount > tokenDecimals) {
      return;
    };
    setAmount(formattedValue);
    setAmountUnformatted(unformattedValue);
    // Converting inputed value to BigNumber
    let localAmountAsBigNumber = BigNumber.from(0);
    if (unformattedValue !== '') {
      localAmountAsBigNumber = ethers.utils.parseUnits(
          unformattedValue,
          tokenDecimals,
      );
    };
    setAmountAsBigNumber(localAmountAsBigNumber);
    checkForErrors(localAmountAsBigNumber);
  };

  const checkForErrors = (amountAsBigNumber: BigNumber) => {
    // Checking if user has enough money on his balance
    if (amountAsBigNumber.gt(balance)) {
      setErrorMessage('Not enough money');
      return;
    }
    setErrorMessage(null);
  };

  const handleClear = () => {
    setAmount('');
    setAmountUnformatted('');
    setAmountAsBigNumber(BigNumber.from(0));
    setErrorMessage(null);
  };

  return {
    amount,
    amountUnformatted,
    amountAsBigNumber,
    isValid,
    errorMessage,
    handleChange,
    handleClear,
  };
};

export default useInputAmount;

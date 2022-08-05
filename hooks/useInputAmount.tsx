import { useState } from 'react';

type useInputAmountType = (balance: number) => [
  amount: string,
  isValid: boolean,
  errorMessage: string,
  handleChange: ({ formattedValue, value }:HandleInputChangeType) => void,
  handleClear: () => void,
];

interface HandleInputChangeType {
  formattedValue: string,
  value: string
};

const useInputAmount: useInputAmountType = (walletBalance) => {
  const [ amount, setAmount ] = useState('');
  const [ numericAmount, setNumericAmount ] = useState(0);
  const [ errorMessage, setErrorMessage ] = useState('');

  const isValid = errorMessage === '' && numericAmount > 0;

  const handleChange = ({
    formattedValue,
    value,
  }: HandleInputChangeType) => {
    setAmount(formattedValue);
    const numericAmountValue = parseFloat(value);
    setNumericAmount(numericAmountValue);
    if (value && value.length > 0) {
      checkForErrors(numericAmountValue);
    } else {
      checkForErrors(0);
    };
  };

  const checkForErrors = (numericAmountValue: number) => {
    // Checking if user has enough money on his balance
    if (numericAmountValue > walletBalance) {
      setErrorMessage('Not enough money');
      return;
    }
    setErrorMessage('');
  };

  const handleClear = () => {
    setAmount('');
  };

  return [ amount, isValid, errorMessage, handleChange, handleClear ];
};

export default useInputAmount;

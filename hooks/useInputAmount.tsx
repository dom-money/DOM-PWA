import { useState } from 'react';

type useInputAmountType = (walletBalance: number) => [
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
  const [ errorMessage, setErrorMessage ] = useState('');

  const isValid = errorMessage === '' && amount.length > 0;

  const handleChange = ({
    formattedValue,
    value,
  }: HandleInputChangeType) => {
    setAmount(formattedValue);
    if (value && value.length > 0) {
      checkForErrors(parseFloat(value));
    } else {
      checkForErrors(0);
    }
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

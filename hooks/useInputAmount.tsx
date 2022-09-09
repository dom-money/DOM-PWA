import { useState } from 'react';
import { onInputChangeType } from '../components/AmountInput';

type useInputAmountType = (balance: number) => {
  amount: string,
  amountUnformatted: string,
  isValid: boolean,
  errorMessage: string,
  handleChange: ({ formattedValue, value }: onInputChangeType) => void,
  handleClear: () => void,
};

interface HandleInputChangeType {
  formattedValue: string,
  value: string
};

const useInputAmount: useInputAmountType = (balance) => {
  const [ amount, setAmount ] = useState('');
  const [ amountUnformatted, setAmountUnformatted ] = useState('');
  const [ numericAmount, setNumericAmount ] = useState(0);
  const [ errorMessage, setErrorMessage ] = useState('');

  const isValid = errorMessage === '' && numericAmount > 0;

  const handleChange = ({
    formattedValue,
    value,
  }: HandleInputChangeType) => {
    setAmount(formattedValue);
    setAmountUnformatted(value);
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
    if (numericAmountValue > balance) {
      setErrorMessage('Not enough money');
      return;
    }
    setErrorMessage('');
  };

  const handleClear = () => {
    setAmount('');
  };

  return {
    amount,
    amountUnformatted,
    isValid,
    errorMessage,
    handleChange,
    handleClear,
  };
};

export default useInputAmount;

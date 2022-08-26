import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

type useInputAddressType = () => [
  address: string,
  setAddress: React.Dispatch<React.SetStateAction<string>>,
  isValid: boolean,
  handleChange: (addressValue: string) => void,
  handleFocus: (addressValue: string) => void,
  handleClear: () => void,
];

const useInputAddress: useInputAddressType = () => {
  const [ address, setAddress ] = useState('');
  const router = useRouter();

  const addressFinalValidationPattern = /^0x[\da-f]{40}$/i;

  const isValid = addressFinalValidationPattern.test(address);

  useEffect(() => {
    if (!(typeof router.query.walletAddress === 'string')) {
      return;
    }
    if (!addressFinalValidationPattern.test(router.query.walletAddress)) {
      return;
    }
    setAddress(router.query.walletAddress);
  }, [ router.query ]);

  const handleChange = (addressValue: string) => {
    setAddress(addressValue);
  };

  const handleFocus = (addressValue: string) => {
    setAddress(addressValue);
  };

  const handleClear = () => {
    setAddress('');
  };

  return [
    address,
    setAddress,
    isValid,
    handleChange,
    handleFocus,
    handleClear,
  ];
};

export default useInputAddress;

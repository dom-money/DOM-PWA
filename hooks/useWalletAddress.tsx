import { useState, useEffect, useContext } from 'react';
import AuthContext, { AuthContextType } from '../context/AuthContext';

type useWalletAddressType = () => [
  walletAddress: string,
  isLoading: boolean,
  isError: boolean
]

const useWalletAddress: useWalletAddressType = () => {
  const { ethersProvider, signer } = useContext(AuthContext) as AuthContextType;

  const [ walletAddress, setWalletAddress ] = useState('');
  const [ isLoading, setIsLoading ] = useState(true);
  const [ isError, setIsError ] = useState(false);

  useEffect(() => {
    const getAccounts = async () => {
      try {
        if (!signer || !ethersProvider ) {
          return;
        };
        const response = await signer.getAddress();
        setWalletAddress(response);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsError(true);
        setIsLoading(false);
      }
    };

    getAccounts();
  }, [ ethersProvider, signer ]);

  return [ walletAddress, isLoading, isError ];
};

export default useWalletAddress;

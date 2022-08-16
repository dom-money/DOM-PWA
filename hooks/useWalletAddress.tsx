import { useState, useEffect, useContext } from 'react';
import AuthContext, { AuthContextType } from '../context/AuthContext';

type WalletAddressType = string | null;

type UseWalletAddressType = () => [
  walletAddress: WalletAddressType,
  isLoading: boolean,
  isError: boolean
]

const useWalletAddress: UseWalletAddressType = () => {
  const { ethersProvider, signer } = useContext(AuthContext) as AuthContextType;

  const [ walletAddress, setWalletAddress ] = useState<WalletAddressType>(null);
  const [ isLoading, setIsLoading ] = useState(true);
  const [ isError, setIsError ] = useState(false);

  useEffect(() => {
    if (!signer || !ethersProvider ) {
      return;
    };

    const getAccounts = async () => {
      try {
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

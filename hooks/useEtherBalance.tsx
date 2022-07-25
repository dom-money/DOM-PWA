import { useState, useEffect, useContext } from 'react';
import AuthContext, { AuthContextType } from '../context/AuthContext';
import { ethers } from 'ethers';

type useEtherBalanceType = () => [
  balance: number,
  isLoading: boolean,
  isError: boolean
]

const useEtherBalance: useEtherBalanceType = () => {
  const { ethersProvider, signer } = useContext(AuthContext) as AuthContextType;

  const [ balance, setBalance ] = useState(0);
  const [ isLoading, setIsLoading ] = useState(true);
  const [ isError, setIsError ] = useState(false);

  useEffect(() => {
    const getBalance = async () => {
      if (!signer || !ethersProvider ) {
        return;
      };
      try {
        const address = await signer.getAddress();
        const receivedBalance = await ethersProvider.getBalance(address);
        setBalance(parseFloat(ethers.utils.formatEther(receivedBalance)));
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsError(true);
        setIsLoading(false);
      }
    };

    getBalance();
  }, [ ethersProvider, signer ]);

  return [ balance, isLoading, isError ];
};

export default useEtherBalance;

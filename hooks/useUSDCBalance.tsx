import { useState, useEffect, useContext } from 'react';
import AuthContext, { AuthContextType } from '../context/AuthContext';
import { ethers } from 'ethers';
import genericErc20Abi from '../utils/Erc20.json';

type useUSDCBalanceType = () => [
  balanceUSDC: number,
  isLoading: boolean,
  isError: boolean
];

const tokenUSDCContractAddress = '0xe11A86849d99F524cAC3E7A0Ec1241828e332C62';

const useUSDCBalance: useUSDCBalanceType = () => {
  const { ethersProvider, signer } = useContext(AuthContext) as AuthContextType;

  const [ balanceUSDC, setBalanceUSDC ] = useState(0);
  const [ isLoading, setIsLoading ] = useState(true);
  const [ isError, setIsError ] = useState(false);

  useEffect(() => {
    const getBalance = async () => {
      if (!signer || !ethersProvider ) {
        return;
      };
      try {
        const address = await signer.getAddress();
        const contract = new ethers.Contract(
            tokenUSDCContractAddress,
            genericErc20Abi,
            ethersProvider,
        );
        const receivedBalance = await contract.balanceOf(address);
        const balanceAsFloatNumber = parseFloat(
            ethers.utils.formatEther(receivedBalance),
        );
        setBalanceUSDC(balanceAsFloatNumber);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsError(true);
        setIsLoading(false);
      }
    };

    getBalance();
  }, [ ethersProvider, signer ]);

  return [ balanceUSDC, isLoading, isError ];
};

export default useUSDCBalance;

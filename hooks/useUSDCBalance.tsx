import { useState, useEffect, useContext } from 'react';
import AuthContext, { AuthContextType } from '../context/AuthContext';
import { ethers, BigNumber } from 'ethers';
import genericErc20Abi from '../utils/Erc20.json';

type useUSDCBalanceType = () => [
  balanceAsNumber: number,
  balanceAsBigNumber: BigNumber,
  isLoading: boolean,
  isError: boolean
];

const TOKEN_USDC_CONTRACT_ADDRESS =
  '0xe11A86849d99F524cAC3E7A0Ec1241828e332C62';

const useUSDCBalance: useUSDCBalanceType = () => {
  const { ethersProvider, signer } = useContext(AuthContext) as AuthContextType;

  const [ balanceAsNumber, setBalanceAsNumber ] = useState(0);
  const [
    balanceAsBigNumber,
    setBalanceAsBigNumber,
  ] = useState(BigNumber.from(0));
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
            TOKEN_USDC_CONTRACT_ADDRESS,
            genericErc20Abi,
            ethersProvider,
        );
        const receivedBalance = await contract.balanceOf(address);
        setBalanceAsBigNumber(receivedBalance);
        setBalanceAsNumber(
            parseFloat(ethers.utils.formatEther(receivedBalance)),
        );
        setIsLoading(false);
      } catch (error) {
        setIsError(true);
        setIsLoading(false);
      }
    };

    getBalance();
  }, [ ethersProvider, signer ]);

  return [ balanceAsNumber, balanceAsBigNumber, isLoading, isError ];
};

export default useUSDCBalance;

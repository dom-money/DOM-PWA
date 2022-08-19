import { useState, useEffect, useContext } from 'react';
import AuthContext, { AuthContextType } from '../context/AuthContext';
import { ethers, BigNumber } from 'ethers';
import genericErc20Abi from '../utils/Erc20.json';
import EventListenersContext, {
  EventListenersContextType,
} from '../context/EventListenersContext';

type useWalletBalanceType = () => [
  balanceAsNumber: number,
  balanceAsBigNumber: BigNumber,
  isLoading: boolean,
  isError: boolean
];

export const TOKEN_USDC_CONTRACT_ADDRESS =
  '0x4DBCdF9B62e891a7cec5A2568C3F4FAF9E8Abe2b';

const useWalletBalance: useWalletBalanceType = () => {
  const { ethersProvider, signer } = useContext(AuthContext) as AuthContextType;

  const {
    depositToWalletEventData,
    withdrawFromWealthEventData,
    depositToWealthEventData,
    sentFromWalletEventData,
  } = useContext(EventListenersContext) as EventListenersContextType;

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
        const receivedBalance: BigNumber = await contract.balanceOf(address);
        const decimals: number = await contract.decimals();
        setBalanceAsBigNumber(receivedBalance);
        setBalanceAsNumber(
            parseFloat(ethers.utils.formatUnits(receivedBalance, decimals)),
        );
        setIsLoading(false);
      } catch (error) {
        setIsError(true);
        setIsLoading(false);
      }
    };

    getBalance();
  }, [
    ethersProvider,
    signer,
    depositToWalletEventData,
    depositToWealthEventData,
    withdrawFromWealthEventData,
    sentFromWalletEventData,
  ]);

  return [ balanceAsNumber, balanceAsBigNumber, isLoading, isError ];
};

export default useWalletBalance;

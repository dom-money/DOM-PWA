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

const useWalletBalance: useWalletBalanceType = () => {
  const { ethersProvider, signer } = useContext(AuthContext) as AuthContextType;

  const {
    walletEvent,
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
            process.env.NEXT_PUBLIC_USDC_CONTRACT_ADDRESS as string,
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
    walletEvent,
  ]);

  return [ balanceAsNumber, balanceAsBigNumber, isLoading, isError ];
};

export default useWalletBalance;

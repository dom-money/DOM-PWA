import { useContext } from 'react';
import { ethers, BigNumber } from 'ethers';
import { useQuery } from '@tanstack/react-query';
import { useAuthContext } from '../context/AuthContext';
import EventListenersContext, {
  EventListenersContextType,
} from '../context/EventListenersContext';
import { EthersProviderType, SignerType } from './useAuth';
import genericErc20Abi from '../utils/Erc20.json';

type WalletBalanceType = {
  balanceAsNumber: number;
  balanceAsBigNumber: BigNumber;
};

type GetWalletBalanceType = (
  ethersProvider: EthersProviderType,
  signer: SignerType
) => Promise<WalletBalanceType>;

const getWalletBalance: GetWalletBalanceType = async (
    ethersProvider,
    signer,
) => {
  return new Promise(async (resolve, reject) => {
    if (!signer || !ethersProvider ) {
      throw new Error('Signer and EthersProvider are not initialized');
    };
    try {
      const address = await signer.getAddress();
      const usdcContractWithProvider = new ethers.Contract(
          process.env.NEXT_PUBLIC_USDC_CONTRACT_ADDRESS as string,
          genericErc20Abi,
          ethersProvider,
      );
      const receivedBalance: BigNumber =
        await usdcContractWithProvider.balanceOf(address);
      const decimals: number = await usdcContractWithProvider.decimals();
      const balanceAsBigNumber = receivedBalance;
      const balanceAsNumber = parseFloat(
          ethers.utils.formatUnits(receivedBalance, decimals),
      );
      resolve({ balanceAsNumber, balanceAsBigNumber });
    } catch (error) {
      reject(error);
    };
  });
};

const useWalletBalance = () => {
  const { ethersProvider, signer } = useAuthContext();

  const {
    walletEvent,
  } = useContext(EventListenersContext) as EventListenersContextType;

  return useQuery(
      [ 'walletBalance', walletEvent ],
      () => getWalletBalance(ethersProvider, signer),
      {
        // The query will not execute until the `signer` and ...
        // .. `ethersProvider` are initialized
        enabled: !!signer && !!ethersProvider,
        // New data on key change will be swapped without Loading state
        keepPreviousData: true,
      },
  );
};

export default useWalletBalance;

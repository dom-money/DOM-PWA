import { ethers, BigNumber } from 'ethers';
import { useQuery } from '@tanstack/react-query';
import { useAuthContext } from '../context/AuthContext';
import { useEventListenersContext } from '../context/EventListenersContext';
import { Provider, Signer } from './useAuth';
import genericErc20Abi from '../utils/Erc20.json';

type WalletBalanceType = {
  balanceAsString: string;
  balanceAsBigNumber: BigNumber;
  tokenDecimals: number;
};

type GetWalletBalanceType = (
  ethersProvider: Provider | null,
  signer: Signer | null
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
      const tokenDecimals: number = await usdcContractWithProvider.decimals();
      const balanceAsBigNumber = receivedBalance;
      const balanceAsString = ethers.utils.formatUnits(
          balanceAsBigNumber,
          tokenDecimals,
      );
      resolve({ balanceAsString, balanceAsBigNumber, tokenDecimals });
    } catch (error) {
      reject(error);
    };
  });
};

const useWalletBalance = () => {
  const { provider, signer } = useAuthContext();
  const { walletEvent } = useEventListenersContext();

  return useQuery(
      [ 'walletBalance', walletEvent ],
      () => getWalletBalance(provider, signer),
      {
        // The query will not execute until the `signer` and ...
        // .. `ethersProvider` are initialized
        enabled: !!signer && !!provider,
        // New data on key change will be swapped without Loading state
        keepPreviousData: true,
      },
  );
};

export default useWalletBalance;

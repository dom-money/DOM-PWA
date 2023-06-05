import { ethers, BigNumber } from 'ethers';
import { useQuery } from '@tanstack/react-query';
import { useAuthContext } from '../context/AuthContext';
import { Provider, Signer } from './useAuth';

type EtherBalanceType = {
  balanceAsString: string;
  balanceAsBigNumber: BigNumber;
};

type GetEtherBalanceType = (
  provider: Provider | null,
  signer: Signer | null
) => Promise<EtherBalanceType>;

const getEtherBalance: GetEtherBalanceType = async (
    ethersProvider,
    signer,
) => {
  return new Promise(async (resolve, reject) => {
    if (!signer || !ethersProvider ) {
      throw new Error('Signer and EthersProvider are not initialized');
    };
    try {
      const receivedBalance = await signer.getBalance();
      const balanceAsBigNumber = receivedBalance;
      const balanceAsString = ethers.utils.formatEther(receivedBalance);
      resolve({ balanceAsString, balanceAsBigNumber });
    } catch (error) {
      reject(error);
    };
  });
};

const useEtherBalance = () => {
  const { provider, signer } = useAuthContext();

  return useQuery(
      [ 'walletBalance' ],
      () => getEtherBalance(provider, signer),
      {
        // The query will not execute until the `signer` and ...
        // .. `ethersProvider` are initialized
        enabled: !!signer && !!provider,
        // New data on key change will be swapped without Loading state
        keepPreviousData: true,
      },
  );
};

export default useEtherBalance;

import { useQuery } from '@tanstack/react-query';
import SafeApiKit, { OwnerResponse } from '@safe-global/api-kit';
import { useSafeStore } from '@/store/SafeStore';
import useWalletAddress from './useWalletAddress';

type GetSafes = (
  safeService: SafeApiKit | null,
  ownerAddress?: string,
) => Promise<OwnerResponse['safes']>;

const getSafes: GetSafes = (safeService, ownerAddress) => {
  if (!safeService || !ownerAddress ) {
    throw new Error('safeService and ownerAddress are not initialized');
  };

  return new Promise(async (resolve, reject) => {
    try {
      const { safes } = await safeService.getSafesByOwner(ownerAddress);
      resolve(safes);
    } catch (error) {
      reject(error);
    };
  });
};

const useSafes = () => {
  const { data: walletAddress } = useWalletAddress();
  const safeService = useSafeStore((state) => state.safeService);

  return useQuery(
      [ 'safes', walletAddress ],
      () => getSafes(safeService, walletAddress?.walletAddress),
      {
        // The query will not execute until the `safeService` and ...
        // .. `walletAddress` are initialized
        enabled: !!safeService && !!walletAddress,
        // New data on key change will be swapped without Loading state
        keepPreviousData: true,
      },
  );
};

export default useSafes;

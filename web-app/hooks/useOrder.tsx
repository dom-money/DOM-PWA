import { useQuery } from '@tanstack/react-query';
import backendClient from '@/lib/axios';
import { useAuthContext } from '../context/AuthContext';

const getOrder = (orderId: string, idToken?: string) => {
  if (!orderId || !idToken ) {
    throw new Error('orderId and idToken are not initialized');
  };
  const order = backendClient.get(`/orders/${orderId}`, {
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
  }).then((resp) => resp.data);

  return order;
};

const useOrder = (orderId: string) => {
  const { user } = useAuthContext();

  return useQuery(
      [ 'order', orderId ],
      () => getOrder(orderId, user?.idToken),
      {
        // The query will not execute until the `user` is initialized
        enabled: !!user,
        // New data on key change will be swapped without Loading state
        keepPreviousData: false,
        refetchInterval: 1000,
      },
  );
};

export default useOrder;

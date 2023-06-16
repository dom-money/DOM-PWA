import { useState } from 'react';
import { useRouter } from 'next/router';
import { PIXCode } from 'pixcode/lib/pixcode';
import { useAuthContext } from '@/context/AuthContext';
import backendClient from '@/lib/axios';

type UsePixCodeQRReader = () => [
  isDialogOpen: boolean,
  handleDialogOpen: () => void,
  handleResult: (pixCode: PIXCode, qrData: string) => void,
  handleDialogClose: () => void,
  isCreatingOrder: boolean,
];

const usePixCodeQRReader: UsePixCodeQRReader = () => {
  const [ isDialogOpen, setIsDialogOpen ] = useState(false);
  const [ isCreatingOrder, setIsCreatingOrder ] = useState(false);
  const { user } = useAuthContext();

  const router = useRouter();

  const handleDialogOpen = () => {
    setIsDialogOpen(true);
  };

  const handleResult = async (pixCode: PIXCode, qrData: string) => {
    if (!user) return;

    try {
      setIsCreatingOrder(true);
      const { data } = await backendClient({
        url: '/orders',
        method: 'post',
        data: { qr_data: qrData },
        headers: {
          Authorization: `Bearer ${user.idToken}`,
        },
      });

      router.push(`/orders/${data.order.id}`);
    } catch (error) {
      console.log(error);
    } finally {
      setIsCreatingOrder(false);
    }
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  return [
    isDialogOpen,
    handleDialogOpen,
    handleResult,
    handleDialogClose,
    isCreatingOrder,
  ];
};

export default usePixCodeQRReader;

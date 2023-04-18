import React from 'react';
import { SnackbarProvider as NotistackSnackbarProvider } from 'notistack';

interface SnackbarProviderProps {
  children: React.ReactNode;
};

const SnackbarProvider = ({
  children,
}: SnackbarProviderProps) => {
  return (
    <NotistackSnackbarProvider
      maxSnack={ 3 }
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      css='overflow-wrap: break-word; word-break: break-word;'
    >
      { children }
    </NotistackSnackbarProvider>
  );
};

export default SnackbarProvider;

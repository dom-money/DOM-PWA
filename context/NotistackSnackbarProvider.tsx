import React from 'react';
import { SnackbarProvider } from 'notistack';

interface NotistackSnackbarProviderProps {
  children: React.ReactNode;
};

const NotistackSnackbarProvider = ({
  children,
}: NotistackSnackbarProviderProps) => {
  return (
    <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      css='overflow-wrap: break-word; word-break: break-word;'
    >
      {children}
    </SnackbarProvider>
  );
};

export default NotistackSnackbarProvider;

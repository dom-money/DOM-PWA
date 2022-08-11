import React from 'react';
import { SnackbarProvider } from 'notistack';
import useAuth from '../hooks/useAuth';
import useLoading from '../hooks/useLoading';
import EventListenersProvider from './EventListenersProvider';
import AuthContext from './AuthContext';
import LoadingContext from './LoadingContext';

interface ContextProvidersProps {
  children: React.ReactNode
};

const ContextProviders = ({ children }: ContextProvidersProps) => {
  const { ...loadingArgs } = useLoading();
  const { ...authArgs } = useAuth(loadingArgs.setIsAuthLoaded);

  return (
    <LoadingContext.Provider value={{ ...loadingArgs }}>
      <AuthContext.Provider value={{ ...authArgs }}>
        <SnackbarProvider
          maxSnack={3}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          <EventListenersProvider ethersProvider={authArgs.ethersProvider}>
            {children}
          </EventListenersProvider>
        </SnackbarProvider>
      </AuthContext.Provider>
    </LoadingContext.Provider>
  );
};

export default ContextProviders;

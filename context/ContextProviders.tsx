import React from 'react';
import { SnackbarProvider } from 'notistack';
import useAuth from '../hooks/useAuth';
import useLoading from '../hooks/useLoading';
import EventListenersProvider from './EventListenersProvider';
import ReactQueryProvider from './ReactQueryProvider';
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
        <ReactQueryProvider>
          <SnackbarProvider
            maxSnack={3}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
            css='overflow-wrap: break-word; word-break: break-word;'
          >
            <EventListenersProvider
              ethersProvider={authArgs.ethersProvider}
            >
              {children}
            </EventListenersProvider>
          </SnackbarProvider>
        </ReactQueryProvider>
      </AuthContext.Provider>
    </LoadingContext.Provider>
  );
};

export default ContextProviders;

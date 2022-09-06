import React from 'react';
import { SnackbarProvider } from 'notistack';
import LoadingProvider from './LoadingProvider';
import AuthProvider from './AuthProvider';
import ReactQueryProvider from './ReactQueryProvider';
import EventListenersProvider from './EventListenersProvider';

interface ContextProvidersProps {
  children: React.ReactNode
};

const ContextProviders = ({ children }: ContextProvidersProps) => {
  return (
    <LoadingProvider>
      <AuthProvider>
        <ReactQueryProvider>
          <SnackbarProvider
            maxSnack={3}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
            css='overflow-wrap: break-word; word-break: break-word;'
          >
            <EventListenersProvider>
              {children}
            </EventListenersProvider>
          </SnackbarProvider>
        </ReactQueryProvider>
      </AuthProvider>
    </LoadingProvider>
  );
};

export default ContextProviders;

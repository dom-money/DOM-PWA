import React from 'react';
import LoadingProvider from './LoadingProvider';
import AuthProvider from './AuthProvider';
import ReactQueryProvider from './ReactQueryProvider';
import NotistackSnackbarProvider from './NotistackSnackbarProvider';
import EventListenersProvider from './EventListenersProvider';
import TransactionsQueueProvider from './TransactionsQueueProvider';

interface ContextProvidersProps {
  children: React.ReactNode;
};

const ContextProviders = ({ children }: ContextProvidersProps) => {
  return (
    <LoadingProvider>
      <AuthProvider>
        <ReactQueryProvider>
          <NotistackSnackbarProvider>
            <EventListenersProvider>
              <TransactionsQueueProvider>
                {children}
              </TransactionsQueueProvider>
            </EventListenersProvider>
          </NotistackSnackbarProvider>
        </ReactQueryProvider>
      </AuthProvider>
    </LoadingProvider>
  );
};

export default ContextProviders;

import React from 'react';
import LoadingProvider from './LoadingProvider';
import AuthProvider from './AuthProvider';
import ReactQueryProvider from './ReactQueryProvider';
import SnackbarProvider from './SnackbarProvider';
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
          <SnackbarProvider>
            <EventListenersProvider>
              <TransactionsQueueProvider>
                { children }
              </TransactionsQueueProvider>
            </EventListenersProvider>
          </SnackbarProvider>
        </ReactQueryProvider>
      </AuthProvider>
    </LoadingProvider>
  );
};

export default ContextProviders;

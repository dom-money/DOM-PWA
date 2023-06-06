import React from 'react';
import { GlobalLoadingProvider } from '@/store/GlobalLoadingStore';
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
    <GlobalLoadingProvider>
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
    </GlobalLoadingProvider>
  );
};

export default ContextProviders;

import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

interface ReactQueryProviderProviderProps {
  children: React.ReactNode;
};

const queryClient = new QueryClient();

const ReactQueryProvider = ({ children }: ReactQueryProviderProviderProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen />
    </QueryClientProvider>
  );
};

export default ReactQueryProvider;

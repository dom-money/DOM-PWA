import React from 'react';
import useAuth from '../hooks/useAuth';
import useLoading from '../hooks/useLoading';
import AuthContext from './AuthContext';
import LoadingContext from './LoadingContext';

interface ContextProvidersProps {
  children: React.ReactNode
}

const ContextProviders = ({ children }: ContextProvidersProps) => {
  const { ...loadingArgs } = useLoading();
  const { ...authArgs } = useAuth(loadingArgs.setIsAuthLoaded);

  return (
    <LoadingContext.Provider value={{ ...loadingArgs }}>
      <AuthContext.Provider value={{ ...authArgs }}>
        {children}
      </AuthContext.Provider>
    </LoadingContext.Provider>
  );
};

export default ContextProviders;

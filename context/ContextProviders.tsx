import React from 'react';
import useAuth from '../hooks/useAuth';
import AuthContext from './AuthContext';

interface ContextProvidersProps {
  children: React.ReactNode
}

const ContextProviders = ({ children }: ContextProvidersProps) => {
  const { ...args } = useAuth();
  return (
    <AuthContext.Provider value={{ ...args }}>
      {children}
    </AuthContext.Provider>

  );
};

export default ContextProviders;

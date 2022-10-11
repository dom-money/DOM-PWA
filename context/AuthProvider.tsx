import React from 'react';
import useAuth from '../hooks/useAuth';
import AuthContext from './AuthContext';

interface AuthProviderProps {
  children: React.ReactNode;
};

const AuthProvider = ({ children }: AuthProviderProps) => {
  const { ...authArgs } = useAuth();

  return (
    <AuthContext.Provider value={{ ...authArgs }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

import { createContext, useContext } from 'react';
import useAuth from '../hooks/useAuth';

export type AuthContextType = ReturnType<typeof useAuth>;

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export default AuthContext;

export const useAuthContext = () => {
  return useContext(AuthContext);
};

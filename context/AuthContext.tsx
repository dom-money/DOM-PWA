import { createContext } from 'react';
import useAuth from '../hooks/useAuth';

export type AuthContextType = ReturnType<typeof useAuth>;

const AuthContext = createContext<AuthContextType | null>(null);

export default AuthContext;

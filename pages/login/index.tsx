import React, { useContext } from 'react';
import type { NextPage } from 'next';
import AuthContext, { AuthContextType } from '../../context/AuthContext';

import LoginPageRender from '../../components/LoginPageRender';

const LoginPage: NextPage = () => {
  const { login } = useContext(AuthContext) as AuthContextType;

  return (
    <LoginPageRender onClick={login}/>
  );
};

export default LoginPage;

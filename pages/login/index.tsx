import React from 'react';
import type { NextPage } from 'next';
import { useAuthContext } from '../../context/AuthContext';

import LoginPageRender from '../../components/LoginPageRender';

const LoginPage: NextPage = () => {
  const { login } = useAuthContext();

  return (
    <LoginPageRender onClick={login}/>
  );
};

export default LoginPage;

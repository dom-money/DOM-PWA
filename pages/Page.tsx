/* eslint-disable require-jsdoc */
import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import SplashScreenPage from '../components/SplashScreenPage';
import { useLoadingContext } from '../context/LoadingContext';
import { useAuthContext } from '../context/AuthContext';

// Array of routes which should be available to unauthenticated users
const UNPROTECTED_ROUTES = [ '/login' ];

// Array of routes which should be unavailable to authenticated users
const AUTHENTICATED_UNAVAILABLE_ROUTES = [ '/login' ];

const Page = ({ Component, pageProps }: AppProps) => {
  // isAppLoaded is `true`, when app is loaded and authentication is finished
  const { isAppLoaded } = useLoadingContext();

  const { isUserLoggedIn } = useAuthContext();

  const router = useRouter();

  // If user is not logged in and is on a protected route, ...
  // .. they should be redirected to Login Page
  const shouldRedirectToLogin =
    !isUserLoggedIn &&
    !UNPROTECTED_ROUTES.includes(router.pathname);

  // If user is logged in and is on unavailable for authenticated ...
  // .. user's route, they should be redirected to Main Page
  const shouldRedirectToMain =
    isUserLoggedIn &&
    AUTHENTICATED_UNAVAILABLE_ROUTES.includes(router.pathname);

  useEffect(() => {
    if (!isAppLoaded) {
      return;
    };
    if (shouldRedirectToLogin) {
      router.push('/login');
    };
    if (shouldRedirectToMain) {
      router.push('/');
    };
  }, [ isAppLoaded, shouldRedirectToLogin, shouldRedirectToMain ]);

  if (!isAppLoaded || shouldRedirectToLogin || shouldRedirectToMain) {
    return <SplashScreenPage />;
  };

  return (
    <Component {...pageProps} />
  );
};

export default Page;

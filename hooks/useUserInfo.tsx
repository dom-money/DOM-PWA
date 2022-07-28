import { useState, useEffect, useContext } from 'react';
import AuthContext, { AuthContextType } from '../context/AuthContext';

interface UserInfoType {
  email?: string;
  name?: string;
  profileImage?: string;
  aggregateVerifier?: string;
  verifier?: string;
  verifierId?: string;
  typeOfLogin?: string;
  dappShare?: string ;
  idToken?: string;
  oAuthIdToken?: string;
};

type useUserInfoType = () => [
  userInfo: UserInfoType | null,
  isLoading: boolean,
  isError: boolean
]

const useUserInfo: useUserInfoType = () => {
  const { web3auth } = useContext(AuthContext) as AuthContextType;

  const [ userInfo, setUserInfo ] = useState<UserInfoType | null>(null);
  const [ isLoading, setIsLoading ] = useState(true);
  const [ isError, setIsError ] = useState(false);

  useEffect(() => {
    const getUserInfo = async () => {
      if (!web3auth) {
        console.log('web3auth not initialized yet');
        return;
      }
      try {
        const response = await web3auth.getUserInfo();
        setUserInfo(response);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsError(true);
        setIsLoading(false);
      }
    };

    getUserInfo();
  }, [ web3auth ]);

  return [ userInfo, isLoading, isError ];
};

export default useUserInfo;

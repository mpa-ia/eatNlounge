import { useEffect } from 'react';
import Router from 'next/router';
import useSWR, {  } from 'swr';
import { authorize, signout } from '../services/auth';
import Cookies from 'js-cookie';

type UseUser = {
  userData: User.Data | undefined;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mutateUser: (data?: Promise<ApiResponse<any>> | undefined, shouldRevalidate ?: boolean | undefined) => Promise <any>;
  logout: () => void;
};
export default function useUser(shouldRedirect = true): UseUser  {
  const { data: response, mutate: mutateUser } = useSWR('auth', authorize);
  const userData = response?.data.user;
  useEffect(() => {
    if (shouldRedirect) {
      if (!userData) {
        if (!Router.pathname.includes('signup')) {
          Router.push('/signin');
        }
      } else {
        Router.push(`/${userData.role}/dashboard`);
      }
    }
  }, [userData]);
  const logout = (): void => {
    mutateUser(signout());
    Cookies.remove('id_token');
    Router.push('/signin');
  };
  return { userData, mutateUser, logout };
}


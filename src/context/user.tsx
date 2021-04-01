
import React, { useEffect } from 'react';
import { authorize } from '../services/auth';
import Cookies from 'js-cookie';

type SetUser = (user: User.Data | null) => void;
type UserContextProps = {
	userData: User.Data | null;
  setUser: SetUser;
  logout: () => void;
};

const UserContext = React.createContext<UserContextProps | never>({
  userData: null,
  setUser: () => {
    console.warn('initialize');
  },
  logout: () => {
    console.warn('initialize');
  },
});

export const UserProvider: React.FC = ({ children }) => {
  const [userData, setUserData] = React.useState<User.Data | null>(null);
  useEffect(() => {
    const authorizeUser = async (): Promise<void> => {
      const response = await authorize();
      if (response) {
        setUserData(response.data.user);
      }
    };
    authorizeUser();
  }, []);
  const setUser: SetUser = user => {
    setUserData(user);
  };
  const logout = (): void => {
    Cookies.remove('id_token');
    setUser(null);
  };
  return (
    <UserContext.Provider value={{ userData, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextProps => {
  const { userData, setUser, logout } = React.useContext(UserContext);
  return { userData, setUser, logout };
};

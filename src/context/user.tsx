
import React, { useEffect } from 'react';
import { authorize } from '../services/auth';

type SetUser = (user: User.Data | null) => void;
type UserContextProps = {
	userData: User.Data | null;
	setUser: SetUser;
};

// eslint-disable-next-line @typescript-eslint/no-empty-function
const UserContext = React.createContext<UserContextProps | never>({ userData: null, setUser: () => { console.warn('initialize'); }});

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
  },[]);
  const setUser: SetUser = user => {
    setUserData(user);
  };
  return (
    <UserContext.Provider value={{ userData, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextProps => {
  const { userData, setUser } = React.useContext(UserContext);
  return { userData, setUser };
};

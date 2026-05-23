import { createContext, useEffect } from 'react';

import { useLocalStorage } from '@/utils/hooks/localStorage';
import { User } from '@/utils/types/user';

type UserContextProps = {
  currentUser: User | null;
  setCurrentUser: (user: User) => void;
  logout: () => void;
};

export const UserContext = createContext<UserContextProps>({} as UserContextProps);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser, logout] = useLocalStorage<User>('currentUser');

  useEffect(() => {
    const cookies = document.cookie.split(';').reduce((acc, cookie) => {
      const [key, value] = cookie.trim().split('=');
      acc[key] = value;
      return acc;
    }, {} as Record<string, string>);

    if (!cookies['userAccessToken']) {
      logout();
    }
  }, [logout]);

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser, logout }}>
      {children}
    </UserContext.Provider>
  );
}

import { createContext } from 'react';

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

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser, logout }}>
      {children}
    </UserContext.Provider>
  );
}

import React, { createContext, useState, useContext, ReactNode } from 'react';
import { UserType } from 'types/UserType';

const initialState = {
  user: null as UserType | null,
  updateUser: (user: UserType) => {}
};

export const UserContext = createContext(initialState);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserType | null>(null);

  const updateUser = (newUser: UserType) => {
    setUser(newUser);
  };

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);

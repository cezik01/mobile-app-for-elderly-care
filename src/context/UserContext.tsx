import React, { createContext, useState, useContext, ReactNode } from 'react';


// Kullanıcı bilgilerinin tipini tanımlayın
type UserType = {
  uid: string;
  role: string;
};

// Context için initial state'i tanımlayın
const initialState = {
  user: null as UserType | null,
  updateUser: (user: UserType) => {}
};

// UserContext'i ve içerisinde user ve updateUser fonksiyonunu oluşturun
export const UserContext = createContext(initialState);

// UserProvider componentini oluşturun
export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserType | null>(null);

  // Kullanıcı bilgisi ve rolü güncellemek için fonksiyon
  const updateUser = (newUser: UserType) => {
    setUser(newUser);
  };

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Kullanıcı bilgilerine erişim sağlayacak hook'u oluşturun
export const useUser = () => useContext(UserContext);

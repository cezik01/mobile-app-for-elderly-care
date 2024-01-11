import React, { createContext, useState, useEffect } from 'react';
import { getDatabase, ref, onValue } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import { FontSizeProviderProps } from 'types/FontSizeProviderProps';

const FontSizeContext = createContext({
  fontSize: 'large',
  setFontSize: (fontSize: string) => { },
});

export const FontSizeProvider = ({ children }: FontSizeProviderProps) => {
  const [fontSize, _setFontSize] = useState('large');

  const setFontSize = (newFontSize: string) => {
    console.log("Setting font size to:", newFontSize);
    _setFontSize(newFontSize);
  };

  useEffect(() => {
    const auth = getAuth();
    const db = getDatabase();

    if (auth.currentUser) {
      const userId = auth.currentUser.uid;
      const fontSizeRef = ref(db, `users/${userId}/preferences/fontSize`);

      const unsubscribe = onValue(fontSizeRef, (snapshot) => {
        if (snapshot.exists()) {
          const newFontSize = snapshot.val();
          setFontSize(newFontSize);
        }
      });

      return () => unsubscribe();
    }
  }, []);

  console.log('FontSizeProvider values:', { fontSize, setFontSize });

  return (
    <FontSizeContext.Provider value={{ fontSize, setFontSize }}>
      {children}
    </FontSizeContext.Provider>
  );
};

export default FontSizeContext;

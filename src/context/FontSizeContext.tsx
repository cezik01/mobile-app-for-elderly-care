import React, { createContext, useState, useEffect, useContext } from 'react';
import { getDatabase, ref, onValue } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import { FontSizeProviderProps } from 'types/FontSizeProviderProps';

const FontSizeContext = createContext<{ fontSize: string; setFontSize: (fontSize: string) => void }>({
  fontSize: 'large',
  setFontSize: () => {}, 
});

export const FontSizeProvider = ({ children }: FontSizeProviderProps) => {
  const [fontSize, setFontSize] = useState('large');
  

  useEffect(() => {
    const auth = getAuth();
    const db = getDatabase();
    let unsubscribe: (() => void) | null = null; 
    
    if (auth.currentUser) {
      const userId = auth.currentUser.uid;
      const fontSizeRef = ref(db, `users/${userId}/preferences/fontSize`);
      
      unsubscribe = onValue(fontSizeRef, (snapshot) => {
        if (snapshot.exists()) {
          const newFontSize = snapshot.val();
          setFontSize(newFontSize);
        }
      });
    }
    
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);
  
  
  console.log('FontSizeProvider values:', { fontSize, setFontSize });


  return (
    <FontSizeContext.Provider value={{ fontSize, setFontSize }}>
      {children}
    </FontSizeContext.Provider>
  );
};

export default FontSizeContext;
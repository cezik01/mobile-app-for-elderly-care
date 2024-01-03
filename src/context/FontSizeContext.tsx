import React, { createContext, useState, useEffect, useContext } from 'react';
import { getDatabase, ref, onValue } from 'firebase/database';
import { getAuth } from 'firebase/auth';

type FontSizeProviderProps = {
  children: React.ReactNode;
};

const FontSizeContext = createContext<{ fontSize: string; setFontSize: (fontSize: string) => void }>({
  fontSize: 'large', // Default value
  setFontSize: () => {}, // Placeholder function
});

export const FontSizeProvider = ({ children }: FontSizeProviderProps) => {
  const [fontSize, setFontSize] = useState('large'); // Default size
  

  useEffect(() => {
    const auth = getAuth(); // Make sure to define 'auth' in the scope
    const db = getDatabase();
    let unsubscribe: (() => void) | null = null; // Explicitly type 'unsubscribe'
    
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
    
    // Cleanup function
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

import React, { createContext, useContext, ReactNode } from 'react';

interface GlobalProviderProps {
  children: ReactNode;
}

const GlobalContext = createContext<null>(null); // You can extend this if needed

export const GlobalProvider = ({ children }: GlobalProviderProps) => {
  return (
    <GlobalContext.Provider value={null}>
        {children}
    </GlobalContext.Provider>
  );
};

export const useGlobal = () => useContext(GlobalContext);

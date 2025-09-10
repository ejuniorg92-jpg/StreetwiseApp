import { createContext, useContext, useEffect, useState } from 'react';

const TierContext = createContext();

export function TierProvider({ children }) {
  const [tier, setTier] = useState(
    () => localStorage.getItem('streetwise:tier') || 'streetwise'
  );
  useEffect(() => {
    localStorage.setItem('streetwise:tier', tier);
  }, [tier]);
  return (
    <TierContext.Provider value={{ tier, setTier }}>
      {children}
    </TierContext.Provider>
  );
}

export function useTier() {
  return useContext(TierContext);
}




import React, { createContext, useEffect, useState } from 'react';

export const ReducedMotionContext = createContext({
  isReducedMotion: false,
  setReducedMotion: () => {},
});

const ReducedMotionProvider = ({ children }) => {
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  const setReducedMotion = (value) => {
    setIsReducedMotion(value);
    localStorage.setItem('reducedMotion', value);
  };

  useEffect(() => {
    const hasOSReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    const storedReducedMotion = localStorage.getItem('reducedMotion');
    setReducedMotion(
      !storedReducedMotion ? hasOSReducedMotion : storedReducedMotion === 'true'
    );
  }, []);

  return (
    <ReducedMotionContext.Provider
      value={{
        isReducedMotion,
        setReducedMotion,
      }}
    >
      {children}
    </ReducedMotionContext.Provider>
  );
};

export default ReducedMotionProvider;

import React, { createContext, useState } from 'react';

export const BonusGameContext = createContext({
  isBonusGame: false,
  setBonusGame: () => {},
});

const BonusGameProvider = ({ children }) => {
  const [isBonusGame, setIsBonusGame] = useState(false);

  const setBonusGame = (value) => setIsBonusGame(value);

  return (
    <BonusGameContext.Provider
      value={{
        isBonusGame,
        setBonusGame,
      }}
    >
      {children}
    </BonusGameContext.Provider>
  );
};

export default BonusGameProvider;

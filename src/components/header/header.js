import React, { useContext } from 'react';
import styled from 'styled-components';
import ScoreCard from './score-card';

import Logo from '../../../public/images/logo.svg';
import BonusLogo from '../../../public/images/logo-bonus.svg';
import { LG_BREAKPOINT } from '../../constants';
import { BonusGameContext } from '../../providers/bonus-game-provider';

const StyledHeader = styled.header`
  border: 3px solid var(--header-outline);
  border-radius: var(--border-radius);
  margin-top: 1.9rem;
  margin-bottom: 6.5rem;
  padding: 10px 10px 10px 20px;
  width: 100%;

  > img {
    height: 3.1rem;
  }

  @media screen and (min-width: ${LG_BREAKPOINT}px) {
    border-radius: 14px;
    width: 705px;
    margin-top: 2.9rem;
    margin-bottom: 3.75rem;
    padding: 15px 20px 15px 30px;

    > img {
      height: 100%;
    }
  }
`;

const Header = ({ score }) => {
  const { isBonusGame } = useContext(BonusGameContext);

  return (
    <StyledHeader className='flex-row space-between align-center'>
      <h1 className='sr-only'>
        {isBonusGame
          ? 'Rock Paper Scissors Lizard Spock'
          : 'Rock Paper Scissors'}
      </h1>
      <img src={isBonusGame ? BonusLogo : Logo} alt='' />
      <ScoreCard score={score} />
    </StyledHeader>
  );
};

export default Header;

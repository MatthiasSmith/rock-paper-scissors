import React from 'react';
import styled from 'styled-components';
import ScoreCard from './score-card';

import Logo from '../../../public/images/logo.svg';

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

  @media screen and (min-width: 1024px) {
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
  return (
    <StyledHeader className='flex-row space-between align-center'>
      <img src={Logo} alt='Rock Paper Scissors' />
      <ScoreCard score={score} />
    </StyledHeader>
  );
};

export default Header;

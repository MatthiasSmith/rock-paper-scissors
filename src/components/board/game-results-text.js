import React from 'react';
import styled from 'styled-components';

import { gameResults } from '../../data/data';

const StyledGameResultsText = styled.h2`
  margin: 0 auto;
  text-align: center;
  font-size: 3.5rem;
  font-weight: var(--font-weight-bold);
  margin-bottom: 1.25rem;

  @media screen and (min-width: 1024px) {
    padding-top: 4rem;
  }
`;

const GameResultsText = ({ results }) => {
  return (
    <StyledGameResultsText>
      {results === gameResults.DRAW
        ? 'Draw'
        : results === gameResults.WIN
        ? 'You Win'
        : 'You Lose'}
    </StyledGameResultsText>
  );
};
export default GameResultsText;

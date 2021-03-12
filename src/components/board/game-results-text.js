import { gsap } from 'gsap';
import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

import { gameResults } from '../../data/data';

const StyledGameResultsText = styled.h2`
  margin: 0 auto;
  text-align: center;
  font-size: 3.5rem;
  font-weight: var(--font-weight-bold);
  margin-bottom: 1.25rem;
  opacity: 0;
`;

const GameResultsText = ({ results }) => {
  const gameResultsRef = useRef(null);

  useEffect(() => {
    gsap.to(gameResultsRef.current, { opacity: 1, duration: 0.5 });
  }, []);

  return (
    <StyledGameResultsText ref={gameResultsRef}>
      {results === gameResults.DRAW
        ? "It's a Draw"
        : results === gameResults.WIN
        ? 'You Win'
        : 'You Lose'}
    </StyledGameResultsText>
  );
};
export default GameResultsText;

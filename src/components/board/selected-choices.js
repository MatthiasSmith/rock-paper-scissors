import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { gsap } from 'gsap';

import ChoiceChip from '../choice-chip';
import { gameResults } from '../../data/data';

const StyledSelectedChoices = styled.div`
  margin-bottom: 4rem;

  h3 {
    font-size: 0.95rem;
    font-weight: var(--font-weight-bold);
    margin-top: 1.5rem;
    letter-spacing: 2px;
  }

  .blank-choice {
    height: 130px;
    width: 130px;
    background-color: transparent;
    border-radius: 50%;
    position: relative;

    &::after {
      content: '';
      border-radius: 50%;
      background-color: hsl(218, 46%, 16%);
      height: 100px;
      width: 100px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 1;
    }
  }
`;

const SelectedChoices = React.forwardRef(
  (
    { playerChoice, houseChoice, startingCoords, onAnimateComplete, results },
    ref
  ) => {
    const houseChoiceRef = useRef(null);

    useEffect(() => {
      if (!houseChoice) {
        gsap.to(ref.current.querySelectorAll('.fade-in'), {
          opacity: 1,
          delay: 0.75,
          duration: 0.5,
        });

        gsap.to(ref.current.querySelector(`[title=${playerChoice.title}]`), {
          x: 0,
          y: 0,
          ease: 'power1.in',
          duration: 0.4,
          onComplete: () => onAnimateComplete(),
        });
      } else {
        gsap.to(houseChoiceRef.current, {
          scale: 1,
          duration: 0.5,
          ease: 'back.out',
        });
      }
    }, [houseChoice]);

    return (
      <StyledSelectedChoices ref={ref} className='flex-row space-between'>
        <div className='flex-column align-center'>
          <ChoiceChip
            choice={playerChoice}
            coords={startingCoords}
            showCircles={results === gameResults.WIN}
          />
          <h3 className='fade-in'>You picked</h3>
        </div>
        <div className='flex-column align-center fade-in'>
          {houseChoice ? (
            <ChoiceChip
              ref={houseChoiceRef}
              choice={houseChoice}
              scaleUp={true}
              showCircles={results === gameResults.LOSE}
            />
          ) : (
            <div className='blank-choice'></div>
          )}
          <h3>The house picked</h3>
        </div>
      </StyledSelectedChoices>
    );
  }
);

export default SelectedChoices;

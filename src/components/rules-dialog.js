import React, {
  Fragment,
  useContext,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { gsap } from 'gsap';
import styled, { css } from 'styled-components';

import IconClose from '../../public/images/icon-close.svg';
import RulesImage from '../../public/images/image-rules.svg';
import BonusRulesImage from '../../public/images/image-rules-bonus.svg';
import Button from './button';

import { ReducedMotionContext } from '../providers/reduced-motion-provider';

const StyledDialogBackdrop = styled.div`
  background: rgba(0, 0, 0, 0.45);
  height: 100%;
  width: 100%;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9;
`;

const StyledDialog = styled.div`
  align-items: center;
  background: white;
  flex-flow: column;
  height: 100%;
  width: 100%;
  max-height: 749px;
  max-width: 400px;
  overflow-y: auto;
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 10;

  h2 {
    color: var(--dark-text);
    font-size: 2rem;
    margin-top: 6rem;
  }

  .image-container {
    margin: 6rem auto;
  }

  .close-button {
    margin-bottom: 3rem;
  }

  @media screen and (max-width: 425px) {
    .hidden-xs {
      display: none;
    }
  }

  @media screen and (min-width: 426px) {
    align-items: unset;
    border-radius: var(--lg-border-radius);
    max-width: 400px;
    max-height: ${(props) => (props.isBonusGame ? '461px' : '416px')};
    padding: 2rem 1.8rem;

    h2 {
      margin: 0;
    }

    .image-container {
      margin: 2.5rem auto 0;
      ${(props) =>
        props.isBonusGame &&
        css`
          margin-top: 1rem;
        `}
    }

    .close-button {
      margin: 0;
      padding: 0;
    }

    // override global style
    .hidden-gt-sm {
      display: none;
    }
  }
`;

const RulesDialog = ({ isOpen, onClose, isBonusGame }) => {
  const [gsapTL, setGsapTL] = useState(null);
  const { isReducedMotion } = useContext(ReducedMotionContext);
  const backdropRef = useRef(null);
  const dialogRef = useRef(null);
  const animationDuration = 0.4;
  const gameTitle = isBonusGame
    ? 'Rock, Paper, Scissors, Lizard, Spock'
    : 'Rock, Paper, Scissors';

  useLayoutEffect(() => {
    const tl = gsap.timeline({
      paused: true,
      defaults: { duration: animationDuration },
      onComplete: () => dialogRef.current.focus(),
    });
    tl.fromTo(
      dialogRef.current,
      { display: 'none', xPercent: -50, yPercent: 100 },
      {
        yPercent: -50,
        display: 'flex',
        ease: 'power2.out',
      }
    );
    tl.fromTo(
      backdropRef.current,
      { display: 'none', opacity: 0 },
      { display: 'block', opacity: 1 },
      `-=${animationDuration}`
    );

    setGsapTL(tl);
  }, []);

  useLayoutEffect(() => {
    if (!gsapTL) return;

    isReducedMotion ? gsapTL.duration(0) : gsapTL.duration(animationDuration);
    isOpen ? gsapTL.play() : gsapTL.reverse();
  }, [isOpen]);

  const handleKeyUp = (event) => {
    event.stopPropagation();

    if (event.key === 'Escape') {
      onClose();
    }
  };

  return (
    <Fragment>
      <StyledDialogBackdrop ref={backdropRef} open={isOpen} />
      <StyledDialog
        ref={dialogRef}
        tabIndex='-1'
        open={isOpen}
        onKeyUp={handleKeyUp}
        isBonusGame={isBonusGame}
        role='dialog'
        aria-labelledby='rules-header'
        aria-describedby='rules-text'
      >
        <div className='flex-row space-between align-center'>
          <h2 id='rules-header'>Rules</h2>
          <Button
            className='close-button hidden-xs'
            onClick={onClose}
            aria-label={`Close the ${gameTitle} rules dialog.`}
          >
            <img src={IconClose} alt='Close icon.' />
          </Button>
        </div>
        <div className='image-container flex-1'>
          <img
            className='rules-img'
            src={isBonusGame ? BonusRulesImage : RulesImage}
            alt={`The "${gameTitle}" rules diagram.`}
          />
          <p id='rules-text' className='sr-only'>
            {`The rules of "${gameTitle}" are as follows: `}
            {isBonusGame
              ? `Scissors beats Paper. Paper beats Rock. Rock beats Lizard. Lizard beats Spock. Spock beats Scissors. Scissors beats Lizard. Paper beats Spock. Rock beats Scissors. Lizard beats Paper. Spock beats Rock. `
              : `Rock beats scissors. Scissors beats paper. And paper beats rock. `}
            If player's choices are the same, it's a draw.
          </p>
        </div>
        <Button
          className='close-button hidden-gt-sm'
          onClick={onClose}
          aria-label={`Close the ${gameTitle} rules dialog.`}
        >
          <img src={IconClose} alt='Close icon.' />
        </Button>
      </StyledDialog>
    </Fragment>
  );
};

export default RulesDialog;

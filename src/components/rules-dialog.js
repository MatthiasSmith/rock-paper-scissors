import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

import IconClose from '../../public/images/icon-close.svg';
import RulesImage from '../../public/images/image-rules.svg';
import Button from './button';

const StyledDialogBackdrop = styled.div`
  display: ${(props) => (props.open ? 'block' : 'none')};
  background: rgba(0, 0, 0, 0.45);
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 9;
`;

const StyledDialog = styled.div`
  display: ${(props) => (props.open ? 'flex' : 'none')};
  align-items: center;
  background: white;
  flex-flow: column;
  height: 100%;
  width: 100%;
  max-height: 812px;
  max-width: 375px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
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

  @media screen and (min-width: 768px) {
    align-items: unset;
    border-radius: var(--desktop-border-radius);
    max-width: 400px;
    max-height: 416px;
    padding: 2rem 1.8rem;

    h2 {
      margin: 0;
    }

    .close-button {
      margin: 0;
      padding: 0;
    }

    .image-container {
      margin: 2.5rem auto 0;
    }
  }
`;

const RulesDialog = ({ isOpen, onClose }) => {
  const dialogRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      dialogRef.current.focus();
    }
  }, [isOpen]);

  const handleKeyUp = (event) => {
    event.stopPropagation();

    if (event.key === 'Escape') {
      onClose();
    }
  };

  return (
    <StyledDialogBackdrop open={isOpen}>
      <StyledDialog
        ref={dialogRef}
        tabIndex='-1'
        open={isOpen}
        aria-label='Rules dialog.'
        role='dialog'
        onKeyUp={handleKeyUp}
      >
        <div className='flex-row space-between align-center'>
          <h2>Rules</h2>
          <Button
            className='close-button hidden-sm'
            onClick={onClose}
            aria-label='Close modal button.'
          >
            <img src={IconClose} alt='Close icon.' />
          </Button>
        </div>
        <div className='image-container flex-1'>
          <img
            className='rules-img'
            src={RulesImage}
            alt='Rock, Paper, Scissors rules.'
          />
        </div>
        <Button
          className='close-button hidden-gt-sm'
          onClick={onClose}
          aria-label='Close modal button.'
        >
          <img src={IconClose} alt='Close icon.' />
        </Button>
      </StyledDialog>
    </StyledDialogBackdrop>
  );
};

export default RulesDialog;

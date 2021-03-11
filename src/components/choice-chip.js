import React from 'react';
import styled from 'styled-components';

const StyledChoiceChip = styled.div`
  background-image: ${(props) =>
    props.title === 'rock'
      ? 'var(--rock-gradient)'
      : props.title === 'paper'
      ? 'var(--paper-gradient)'
      : 'var(--scissors-gradient)'};
  box-shadow: inset 0px -10px 1px -5px rgba(0, 0, 0, 0.25);
  border-radius: 50%;
  cursor: ${(props) =>
    props.onClick && typeof props.onClick === 'function'
      ? 'pointer'
      : 'default'};
  height: 130px;
  width: 130px;
  min-height: 130px;
  overflow: hidden;

  .choice-chip__inner {
    background-color: hsl(0, 0%, 87%);
    border-radius: 50%;
    box-shadow: inset 0px 10px 1px -5px rgba(0, 0, 0, 0.12);
    height: 100px;
    width: 100px;
    margin: 0 auto;
    position: relative;
    z-index: 1;

    img {
      max-height: 53%;
      max-width: 46%;
    }
  }
`;

const ChoiceChip = ({ choice, onClick }) => {
  return (
    <StyledChoiceChip
      {...choice}
      onClick={onClick}
      className='flex-column justify-center align-center'
      role={onClick && typeof onClick === 'function' ? 'button' : undefined}
    >
      <div className='choice-chip__inner flex-column justify-center align-center'>
        <img src={choice.imageSrc} alt={choice.title} />
      </div>
    </StyledChoiceChip>
  );
};

export default ChoiceChip;

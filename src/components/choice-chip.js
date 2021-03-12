import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { gsap } from 'gsap';

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
  transform: ${(props) =>
    props.coords
      ? `translate(${props.coords.x}px, ${props.coords.y}px)`
      : props.scaleUp
      ? `scale(0)`
      : `translate(0px, 0px)`};

  .choice-chip-inner {
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

const StyledCircle = styled.div`
  background: rgba(255, 255, 255, 0.06);
  border-radius: 50%;
  position: absolute;
  top: -17px;
  left: -17px;
  width: 164px;
  height: 164px;
  z-index: -1;
  transform: scale(0);

  &::before,
  &::after {
    background: rgba(255, 255, 255, 0.025);
    border-radius: 50%;
    content: '';
    position: absolute;
    height: 100%;
    width: 100%;
  }

  &::before {
    transform: scale(1.35);
  }

  &::after {
    transform: scale(1.75);
  }
`;

const ChoiceChip = React.forwardRef(
  ({ choice, onSelect, showCircles, scaleUp, coords }, ref) => {
    const circleRef = useRef(null);
    const chipRef = useRef(null);

    useEffect(() => {
      showCircles
        ? gsap.to(circleRef.current, {
            scale: 1,
            duration: 1.5,
            ease: 'elastic.out',
          })
        : () => {};
    }, [showCircles]);

    const handleClick = (event) => {
      if (!onSelect) return;
      gsap.to(chipRef.current, { scale: 0.95, duration: 0.05 });
      gsap.to(chipRef.current, { scale: 1, duration: 0.05, delay: 0.05 });
      onSelect(event);
    };

    return (
      <div
        css={`
          position: relative;
        `}
      >
        <StyledChoiceChip
          {...choice}
          ref={ref ? ref : chipRef}
          onClick={
            onSelect && typeof onSelect === 'function' ? handleClick : undefined
          }
          tabIndex={onSelect && typeof onSelect === 'function' ? 0 : undefined}
          className={`flex-column justify-center align-center ${
            scaleUp ? 'scale-up' : ''
          }`}
          coords={coords}
          scaleUp={scaleUp}
          role={
            onSelect && typeof onSelect === 'function' ? 'button' : undefined
          }
        >
          <div className='choice-chip-inner flex-column justify-center align-center'>
            <img src={choice.imageSrc} alt={choice.title} />
          </div>
        </StyledChoiceChip>
        {showCircles ? <StyledCircle ref={circleRef} /> : null}
      </div>
    );
  }
);

export default ChoiceChip;

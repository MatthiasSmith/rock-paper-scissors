import React from 'react';
import styled from 'styled-components';

import { DESKTOP_BREAKPOINT } from '../constants';

const StyledBottomButtonRow = styled.div`
  margin-bottom: 2.5rem;
  justify-content: flex-end;
  width: 100%;
  align-items: center;

  @media screen and (min-width: ${DESKTOP_BREAKPOINT}px) {
    align-items: flex-end;
  }
`;

const BottomButtonRow = (props) => {
  return (
    <StyledBottomButtonRow className='flex-column flex-1 relative-z-index-1'>
      {props.children}
    </StyledBottomButtonRow>
  );
};

export default BottomButtonRow;

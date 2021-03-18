import React, { useContext } from 'react';
import styled from 'styled-components';

const StyledBottomButtonRow = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 2rem;
  width: 100%;
`;

const BottomButtonRow = (props) => {
  return (
    <StyledBottomButtonRow className='flex-1 relative-z-index-1'>
      {props.children}
    </StyledBottomButtonRow>
  );
};

export default BottomButtonRow;

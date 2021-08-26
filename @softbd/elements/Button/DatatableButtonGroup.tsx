import React from 'react';
import ButtonGroup from '@material-ui/core/ButtonGroup';

interface Props {
  children: React.ReactNode;
}

const DatatableButtonGroup = ({children}: Props) => {
  return (
    <ButtonGroup
      variant='text'
      color='primary'
      aria-label='text primary button group'>
      {children}
    </ButtonGroup>
  );
};

export default DatatableButtonGroup;

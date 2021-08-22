import React from 'react';
import {Button} from '@material-ui/core';
import ControlPointIcon from '@material-ui/icons/ControlPoint';

interface Props {
  onClick: () => void;
  className?: string;
}

const AddButton = ({onClick, className}: Props) => {
  return (
    <Button
      variant='contained'
      color={'primary'}
      startIcon={<ControlPointIcon />}
      onClick={onClick}
      className={className}>
      Add New
    </Button>
  );
};

export default AddButton;

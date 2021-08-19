import React from 'react';
import {Button} from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';

interface Props {
  onClick?: () => void;
  className?: string;
  label?: string;
}

const CancelButton = ({onClick, className, label}: Props) => {
  const btnText = label ? label : 'Cancel';
  return (
    <Button
      startIcon={<CancelIcon />}
      variant='contained'
      color='default'
      onClick={onClick}
      className={className}
    >
      {btnText}
    </Button>
  );
};

export default CancelButton;

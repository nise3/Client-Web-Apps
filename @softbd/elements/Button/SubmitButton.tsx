import React from 'react';
import {Button} from '@material-ui/core';
import {Save} from '@material-ui/icons';

interface Props {
  onClick?: () => void;
  className?: string;
  label?: string;
}

const CancelButton = ({onClick, className, label}: Props) => {
  const btnText = label ? label : 'Submit';
  return (
    <Button
      startIcon={<Save />}
      variant='contained'
      color='primary'
      onClick={onClick}
      className={className}
      type="submit"
    >
      {btnText}
    </Button>
  );
};

export default CancelButton;

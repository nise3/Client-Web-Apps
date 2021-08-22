import React from 'react';
import {Button} from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';
import ButtonSkeleton from '../Skeleton/ButtonSkeleton';

interface Props {
  onClick?: () => void;
  className?: string;
  label?: string;
  isLoading?: boolean;
}

const CancelButton = ({onClick, className, label, isLoading}: Props) => {
  const btnText = label ? label : 'Cancel';
  return (
    isLoading ? <ButtonSkeleton />
      :
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

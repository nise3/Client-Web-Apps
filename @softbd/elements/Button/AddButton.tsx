import React from 'react';
import {Fab} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import ButtonSkeleton from '../Skeleton/ButtonSkeleton';

interface Props {
  onClick: () => void;
  className?: string;
  isLoading?: boolean;
}

const AddButton = ({onClick, className, isLoading}: Props) => {
  return isLoading ? (
    <ButtonSkeleton />
  ) : (
    <Fab
      size='small'
      color='primary'
      onClick={onClick}
      className={className}
      aria-label='add'>
      <AddIcon />
    </Fab>
  );
};

export default AddButton;

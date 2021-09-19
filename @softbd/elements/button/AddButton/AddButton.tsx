import React from 'react';
import {Fab} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import ButtonSkeleton from '../../display/skeleton/ButtonSkeleton/ButtonSkeleton';
import Tooltip from '@material-ui/core/Tooltip';

interface Props {
  onClick: () => void;
  className?: string;
  isLoading?: boolean;
  tooltip?: any;
}

const AddButton = ({onClick, className, tooltip, isLoading}: Props) => {
  return isLoading ? (
    <ButtonSkeleton isCircle={true} />
  ) : (
    <Tooltip title={tooltip as any}>
      <Fab
        size='small'
        color='primary'
        onClick={onClick}
        className={className}
        aria-label='add'>
        <AddIcon />
      </Fab>
    </Tooltip>
  );
};

export default React.memo(AddButton);

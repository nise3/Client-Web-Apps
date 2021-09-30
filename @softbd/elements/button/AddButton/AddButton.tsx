import React from 'react';
import {Fab} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ButtonSkeleton from '../../display/skeleton/ButtonSkeleton/ButtonSkeleton';
import Tooltip from '@mui/material/Tooltip';

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
    <Tooltip title={false}>
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

import {ArrowDownIcon} from '@heroicons/react/outline';
import {head} from 'ramda';
import React from 'react';
import {useRecoilValue} from 'recoil';
import {IconButton, Tooltip} from '@mui/material';
import {elementIdsState} from './../../../state/atoms/template';
import useElementsDispatcher from './../../../state/dispatchers/elements';
import Button from './../Button';
interface Props {
  elementId: string;
}

function MoveLayerDownAction({elementId}: Props) {
  const elementIds = useRecoilValue(elementIdsState);
  const {reorderElement} = useElementsDispatcher();

  const handleMoveDownClick = () => {
    reorderElement(elementId, -1);
  };

  const moveDownDisabled = head(elementIds) === elementId;

  return (
    <Tooltip title='Move up' className='flex'>
      <span className='tooltip-button-container'>
        <Button
          type={'secondary'}
          onClick={handleMoveDownClick}
          className={'shape-action-button'}
          disabled={moveDownDisabled}>
          <IconButton
            aria-label='delete'
            disabled={moveDownDisabled}
            sx={{padding: 0}}
            disableRipple>
            <ArrowDownIcon style={{height: '1rem', width: '1rem'}} />
          </IconButton>
        </Button>
      </span>
    </Tooltip>
  );
}

export default MoveLayerDownAction;

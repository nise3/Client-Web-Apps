import {CgDuplicate, CgTrash} from 'react-icons/all';
import React from 'react';
import {Tooltip} from '@mui/material';
import useElementsDispatcher from '../../../state/dispatchers/elements';
import Button from '../Button';
import {useRecoilValue} from 'recoil';
import {elementSelector} from '../../../state/selectors/elements';
import {TextConfig} from 'konva/lib/shapes/Text';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import MoveLayerUpAction from './MoveLayerUpAction';
import MoveLayerDownAction from './MoveLayerDownAction';
interface Props {
  elementId: string;
}

function ShapeActions({elementId}: Props) {
  const {duplicateElement, deleteElement, updateElementProps, clearSelection} =
    useElementsDispatcher();

  const element = useRecoilValue(elementSelector(elementId));

  console.log('element:', element?.props.isLocked);

  const onLockedClick = () => {
    updateElementProps<TextConfig>(elementId, {
      isLocked: !element?.props.isLocked,
    });
    clearSelection();
  };
  const onDuplicateClick = () => {
    duplicateElement(elementId);
  };

  const onDeleteClick = () => {
    deleteElement(elementId);
  };

  return (
    <>
      <MoveLayerUpAction elementId={elementId} />
      <MoveLayerDownAction elementId={elementId} />

      <Tooltip
        title={element?.props.isLocked ? 'Unlock Element' : 'Lock Element'}
        className='flex'>
        <Button
          type={'secondary'}
          onClick={onLockedClick}
          className={'shape-action-button'}>
          {element?.props.isLocked ? (
            <LockOutlinedIcon style={{height: '1rem', width: '1rem'}} />
          ) : (
            <LockOpenOutlinedIcon style={{height: '1rem', width: '1rem'}} />
          )}
        </Button>
      </Tooltip>
      <Tooltip title='Duplicate' className='flex'>
        <Button
          type={'secondary'}
          onClick={onDuplicateClick}
          className={'shape-action-button'}>
          <CgDuplicate style={{height: '1rem', width: '1rem'}} />
        </Button>
      </Tooltip>
      <Tooltip title='Delete' className='flex'>
        <Button
          type={'secondary'}
          onClick={onDeleteClick}
          className={'shape-action-button'}>
          <CgTrash style={{height: '1rem', width: '1rem'}} />
        </Button>
      </Tooltip>
    </>
  );
}

export default ShapeActions;

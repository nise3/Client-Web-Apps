import {CgDuplicate, CgTrash} from 'react-icons/all';
import React from 'react';
import {Tooltip} from '@mui/material';
import useElementsDispatcher from './../../state/dispatchers/elements';
import Button from './Button';

interface Props {
  elementId: string;
}

function ShapeActions({elementId}: Props) {
  const {duplicateElement, deleteElement} = useElementsDispatcher();

  const onDuplicateClick = () => {
    duplicateElement(elementId);
  };

  const onDeleteClick = () => {
    deleteElement(elementId);
  };

  return (
    <>
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

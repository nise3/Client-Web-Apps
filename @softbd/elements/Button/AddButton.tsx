import React from 'react';
import {Button} from '@material-ui/core';
import {PlusOneOutlined} from '@material-ui/icons';

interface Props {
  onClick: () => void;
  className?: string;
}

const AddButton = ({onClick, className}: Props) => {
  return (
    <Button
      variant='contained'
      color={'primary'}
      startIcon={<PlusOneOutlined />}
      onClick={onClick}
      className={className}>
      Add New
    </Button>
  );
};

export default AddButton;

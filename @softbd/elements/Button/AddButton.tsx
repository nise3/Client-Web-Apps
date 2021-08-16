import React from 'react';
import {Button} from '@material-ui/core';
import {PlusCircleOutlined} from '@ant-design/icons';

interface Props {
  onClick: () => void;
  className?: string;
}

const AddButton = ({onClick, className}: Props) => {
  return (
    <Button
      variant='contained'
      color={'primary'}
      startIcon={<PlusCircleOutlined />}
      onClick={onClick}
      className={className}>
      Add New
    </Button>
  );
};

export default AddButton;

import {EditOutlined} from '@ant-design/icons';
import React from 'react';
import Button from '@material-ui/core/Button';

interface Props {
  onClick: () => void;
  className?: string;
}

const EditButton = ({onClick, className}: Props) => {
  return (
    <Button
      startIcon={<EditOutlined />}
      onClick={onClick}
      className={className}>
      Edit
    </Button>
  );
};

export default EditButton;

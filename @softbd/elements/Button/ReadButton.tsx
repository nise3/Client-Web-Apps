import {EyeOutlined} from '@ant-design/icons';
import React from 'react';
import Button from '@material-ui/core/Button';

interface Props {
  onClick: () => void;
  className?: string;
}

const ReadButton = ({onClick, className}: Props) => {
  return (
    <Button startIcon={<EyeOutlined />} onClick={onClick} className={className}>
      Read
    </Button>
  );
};

export default ReadButton;

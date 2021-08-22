import {EditOutlined} from '@ant-design/icons';
import React from 'react';
import Button from '@material-ui/core/Button';
import ButtonSkeleton from '../Skeleton/ButtonSkeleton';

interface Props {
  onClick: () => void;
  className?: string;
  variant?: 'text' | 'outlined' | 'contained';
  isLoading?: boolean;
}

const EditButton = ({onClick, className, variant, isLoading}: Props) => {
  return (
    isLoading ? <ButtonSkeleton />
      :
      <Button
        startIcon={<EditOutlined />}
        color={'primary'}
        onClick={onClick}
        className={className}
        variant={variant}
      >
        Edit
      </Button>
  );
};

export default EditButton;

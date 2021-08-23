import React from 'react';
import Button from '@material-ui/core/Button';
import ButtonSkeleton from '../Skeleton/ButtonSkeleton';
import {Edit} from '@material-ui/icons';

interface Props {
  onClick: () => void;
  isLoading?: boolean;
}

const EditButton = ({
  onClick,
  isLoading,
  ...extra
}: Props & WithStyles<any>) => {
  return isLoading ? (
    <ButtonSkeleton />
  ) : (
    <Button startIcon={<Edit />} onClick={onClick} {...extra}>
      Edit
    </Button>
  );
};

export default EditButton;

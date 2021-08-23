import React from 'react';
import Button from '@material-ui/core/Button';
import ButtonSkeleton from '../Skeleton/ButtonSkeleton';
import {Edit} from '@material-ui/icons';
import {makeStyles} from '@material-ui/core';
import clsx from 'clsx';

const useStyles = makeStyles(() => {
  return {
    button: {
      color: '#ff7011',
    },
  };
});

interface Props {
  onClick: () => void;
  isLoading?: boolean;
  className?: string;
}

const EditButton = ({onClick, isLoading, className, ...extra}: Props) => {
  const classes = useStyles();

  return isLoading ? (
    <ButtonSkeleton />
  ) : (
    <Button
      startIcon={<Edit />}
      onClick={onClick}
      className={clsx(classes.button, className)}
      {...extra}>
      Edit
    </Button>
  );
};

export default EditButton;

import React from 'react';
import Button from '@material-ui/core/Button';
import ButtonSkeleton from '../Skeleton/ButtonSkeleton';
import {Edit} from '@material-ui/icons';
import {makeStyles} from '@material-ui/core';
import clsx from 'clsx';
import IntlMessages from '../../../@crema/utility/IntlMessages';

const useStyles = makeStyles((theme) => {
  return {
    button: {
      color: theme.palette.success.main,
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
      <IntlMessages id='common.edit_btn' />
    </Button>
  );
};

export default EditButton;

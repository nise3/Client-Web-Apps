import React from 'react';
import Button from '@material-ui/core/Button';
import ButtonSkeleton from '../Skeleton/ButtonSkeleton';
import {Edit} from '@material-ui/icons';
import {makeStyles} from '@material-ui/core';
import clsx from 'clsx';
import {useIntl} from 'react-intl';

const useStyles = makeStyles(() => {
  return {
    button: {
      color: '#00bcd4',
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
  const {messages} = useIntl();

  return isLoading ? (
    <ButtonSkeleton />
  ) : (
    <Button
      startIcon={<Edit />}
      onClick={onClick}
      className={clsx(classes.button, className)}
      {...extra}>
      {messages['common.edit_btn']}
    </Button>
  );
};

export default EditButton;

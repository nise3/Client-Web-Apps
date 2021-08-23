import React from 'react';
import Button from '@material-ui/core/Button';
import {Visibility} from '@material-ui/icons';
import {makeStyles} from '@material-ui/core';
import {ButtonProps} from '@material-ui/core/Button/Button';
import clsx from 'clsx';

const useStyles = makeStyles(() => {
  return {
    button: {
      color: '#009688',
    },
  };
});

interface Props extends ButtonProps {
  onClick: () => void;
  className?: string;
}

const ReadButton = ({onClick, className, ...extra}: Props) => {
  const classes = useStyles();
  return (
    <Button
      startIcon={<Visibility />}
      onClick={onClick}
      className={clsx(classes.button, className)}
      {...extra}>
      Read
    </Button>
  );
};

export default ReadButton;

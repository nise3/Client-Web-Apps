import React from 'react';
import Button from '@material-ui/core/Button';
import {Visibility} from '@material-ui/icons';
import {makeStyles} from '@material-ui/core';
import {ButtonProps} from '@material-ui/core/Button/Button';
import clsx from 'clsx';
import IntlMessages from '../../../../@crema/utility/IntlMessages';
import ButtonSkeleton from '../../display/skeleton/ButtonSkeleton/ButtonSkeleton';

const useStyles = makeStyles((theme) => {
  return {
    button: {
      color: theme.palette.primary.main,
    },
  };
});

interface Props extends ButtonProps {
  onClick: () => void;
  className?: string;
  isLoading?: boolean;
}

const ReadButton = ({onClick, className, isLoading, ...extra}: Props) => {
  const classes = useStyles();
  return isLoading ? (
    <ButtonSkeleton />
  ) : (
    <Button
      startIcon={<Visibility />}
      onClick={onClick}
      className={clsx(classes.button, className)}
      {...extra}>
      <IntlMessages id='common.read_btn' />
    </Button>
  );
};

export default React.memo(ReadButton);

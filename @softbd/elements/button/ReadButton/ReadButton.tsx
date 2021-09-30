import React from 'react';
import Button from '@mui/material/Button';
import Visibility from '@mui/icons-material/Visibility';
import makeStyles from '@mui/styles/makeStyles';
import {ButtonProps} from '@mui/material/Button/Button';
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

import React from 'react';
import Button from '@mui/material/Button';
import makeStyles from '@mui/styles/makeStyles';
import clsx from 'clsx';
import {ButtonProps} from '@mui/material/Button/Button';
import ButtonSkeleton from '../../../@softbd/elements/display/skeleton/ButtonSkeleton/ButtonSkeleton';
import IntlMessages from '../../../@crema/utility/IntlMessages';

const useStyles = makeStyles((theme) => {
  return {
    button: {
      color: theme.palette.success.main,
    },
  };
});

interface Props extends ButtonProps {
  onClick: () => void;
  isLoading?: boolean;
  className?: string;
  variant?: 'text' | 'outlined' | 'contained' | undefined;
  color?: 'inherit' | 'primary' | 'secondary';
  btnText?: string;
  startIcon?: any;
}

const AssignBatchButton = ({
  onClick,
  isLoading,
  className,
  variant = 'contained',
  btnText,
  startIcon,
  ...extra
}: Props) => {
  const classes = useStyles();

  return isLoading ? (
    <ButtonSkeleton />
  ) : (
    <Button
      startIcon={startIcon}
      onClick={onClick}
      className={extra?.color ? clsx(classes.button, className) : className}
      color={extra?.color || 'secondary'}
      variant={variant}
      {...extra}>
      <IntlMessages id={btnText} />
    </Button>
  );
};

export default React.memo(AssignBatchButton);

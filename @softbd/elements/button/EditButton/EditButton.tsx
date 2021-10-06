import React from 'react';
import Button from '@mui/material/Button';
import ButtonSkeleton from '../../display/skeleton/ButtonSkeleton/ButtonSkeleton';
import makeStyles from '@mui/styles/makeStyles';
import clsx from 'clsx';
import IntlMessages from '../../../../@crema/utility/IntlMessages';
import {RiEditBoxFill} from 'react-icons/ri';
import {ButtonProps} from '@mui/material/Button/Button';

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
}

const EditButton = ({
  onClick,
  isLoading,
  className,
  variant = 'contained',
  ...extra
}: Props) => {
  const classes = useStyles();

  return isLoading ? (
    <ButtonSkeleton />
  ) : (
    <Button
      startIcon={<RiEditBoxFill />}
      onClick={onClick}
      className={extra?.color ? clsx(classes.button, className) : className}
      color={extra?.color || 'secondary'}
      variant={variant}
      {...extra}>
      <IntlMessages id='common.edit_btn' />
    </Button>
  );
};

export default React.memo(EditButton);

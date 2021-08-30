import React from 'react';
import Button from '@material-ui/core/Button';
import ButtonSkeleton from '../../display/skeleton/ButtonSkeleton/ButtonSkeleton';
import {makeStyles} from '@material-ui/core';
import clsx from 'clsx';
import IntlMessages from '../../../../@crema/utility/IntlMessages';
import {RiEditBoxFill} from 'react-icons/ri';

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
  variant?: 'text' | 'outlined' | 'contained' | undefined;
  color?: 'inherit' | 'primary' | 'secondary' | 'default';
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
      color={extra?.color ? extra.color : 'secondary'}
      variant={variant}
      {...extra}>
      <IntlMessages id='common.edit_btn' />
    </Button>
  );
};

export default EditButton;

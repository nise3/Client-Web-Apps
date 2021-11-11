import React from 'react';
import {styled} from '@mui/material/styles';
import Button from '@mui/material/Button';
import clsx from 'clsx';
import {ButtonProps} from '@mui/material/Button/Button';
import ButtonSkeleton from '../../../@softbd/elements/display/skeleton/ButtonSkeleton/ButtonSkeleton';
import IntlMessages from '../../../@crema/utility/IntlMessages';

const PREFIX = 'AssignBatchButton';

const classes = {
  button: `${PREFIX}-button`,
};

const StyledButton = styled(Button)(({theme}) => {
  return {
    [`& .${classes.button}`]: {
      color: theme.palette.success.main,
    },
  };
});

interface Props extends ButtonProps {
  onClick?: () => void;
  isLoading?: boolean;
  className?: string;
  variant?: 'text' | 'outlined' | 'contained' | undefined;
  color?: 'inherit' | 'primary' | 'secondary';
  btnText?: string;
  startIcon?: React.ReactNode;
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
  return isLoading ? (
    <ButtonSkeleton />
  ) : (
    <StyledButton
      startIcon={startIcon}
      onClick={onClick}
      className={extra?.color ? clsx(classes.button, className) : className}
      color={extra?.color || 'secondary'}
      variant={variant}
      {...extra}>
      <IntlMessages id={btnText} />
    </StyledButton>
  );
};

export default React.memo(AssignBatchButton);

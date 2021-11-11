import React from 'react';
import Button from '@mui/material/Button';
import ButtonSkeleton from '../../display/skeleton/ButtonSkeleton/ButtonSkeleton';
import {styled} from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';
import clsx from 'clsx';
import IntlMessages from '../../../../@crema/utility/IntlMessages';
import {RiEditBoxFill} from 'react-icons/ri';
import {ButtonProps} from '@mui/material/Button/Button';

const PREFIX = 'EditButton';

const classes = {
  button: `${PREFIX}-button`,
};

const StyledTooltip = styled(Tooltip)(({theme}) => {
  return {
    [`& .${classes.button}`]: {
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
  return isLoading ? (
    <ButtonSkeleton />
  ) : (
    <StyledTooltip title={<IntlMessages id='common.edit_btn' />}>
      <Button
        startIcon={<RiEditBoxFill />}
        onClick={onClick}
        className={className ? clsx(classes.button, className) : className}
        color={extra?.color || 'secondary'}
        variant={variant}
        {...extra}>
        <IntlMessages id='common.edit_btn' />
      </Button>
    </StyledTooltip>
  );
};

export default React.memo(EditButton);

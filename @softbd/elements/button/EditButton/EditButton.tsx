import React from 'react';
import Button from '@mui/material/Button';
import ButtonSkeleton from '../../display/skeleton/ButtonSkeleton/ButtonSkeleton';
import Tooltip from '@mui/material/Tooltip';
import IntlMessages from '../../../../@crema/utility/IntlMessages';
import {RiEditBoxFill} from 'react-icons/ri';
import {ButtonProps} from '@mui/material/Button/Button';

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
  variant = 'text',
  ...extra
}: Props) => {
  return isLoading ? (
    <ButtonSkeleton />
  ) : (
    <Tooltip title={<IntlMessages id='common.edit_btn' />}>
      <Button
        startIcon={<RiEditBoxFill />}
        onClick={onClick}
        sx={extra?.color && {color: 'warning.main'}}
        className={className ? className : className}
        color={extra?.color || 'warning'}
        variant={variant}
        {...extra}>
        <IntlMessages id='common.edit_btn' />
      </Button>
    </Tooltip>
  );
};

export default React.memo(EditButton);

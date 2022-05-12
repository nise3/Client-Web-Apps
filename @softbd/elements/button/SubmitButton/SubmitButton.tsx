import React from 'react';
import {Button} from '@mui/material';
import {Save} from '@mui/icons-material';
import ButtonSkeleton from '../../display/skeleton/ButtonSkeleton/ButtonSkeleton';
import {useIntl} from 'react-intl';

interface Props {
  onClick?: () => void;
  className?: string;
  label?: string;
  isSubmitting?: boolean;
  isLoading?: boolean;
  startIcon?: React.ReactNode | false;
  type?: 'submit' | 'button';

  [x: string]: any;
}

const SubmitButton = ({
  onClick,
  className,
  label,
  isSubmitting,
  isLoading,
  isDisable,
  startIcon,
  type = 'submit',
  ...rest
}: Props) => {
  const {messages} = useIntl();

  const btnText = label ? label : messages['common.done'];
  return isLoading ? (
    <ButtonSkeleton />
  ) : (
    <Button
      startIcon={startIcon === false ? undefined : startIcon || <Save />}
      variant='contained'
      color='primary'
      onClick={onClick}
      className={className}
      type={type}
      disabled={isSubmitting}
      {...rest}>
      {btnText}
    </Button>
  );
};

export default React.memo(SubmitButton);

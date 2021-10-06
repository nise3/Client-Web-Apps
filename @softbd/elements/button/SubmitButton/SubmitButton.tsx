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
}

const SubmitButton = ({
  onClick,
  className,
  label,
  isSubmitting,
  isLoading,
}: Props) => {
  const {messages} = useIntl();
  const btnText = label ? label : messages['common.done'];
  return isLoading ? (
    <ButtonSkeleton />
  ) : (
    <Button
      startIcon={<Save />}
      variant='contained'
      color='primary'
      onClick={onClick}
      className={className}
      type='submit'
      disabled={isSubmitting}>
      {btnText}
    </Button>
  );
};

export default React.memo(SubmitButton);

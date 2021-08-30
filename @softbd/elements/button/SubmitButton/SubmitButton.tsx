import React from 'react';
import {Button} from '@material-ui/core';
import {Save} from '@material-ui/icons';
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

export default SubmitButton;

import React from 'react';
import {Button} from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';
import ButtonSkeleton from '../../display/skeleton/ButtonSkeleton/ButtonSkeleton';
import {useIntl} from 'react-intl';

interface Props {
  onClick?: () => void;
  className?: string;
  label?: string;
  isLoading?: boolean;
}

const CancelButton = ({onClick, className, label, isLoading}: Props) => {
  const {messages} = useIntl();
  const btnText = label ? label : messages['common.cancel'];
  return isLoading ? (
    <ButtonSkeleton />
  ) : (
    <Button
      startIcon={<CancelIcon />}
      variant='contained'
      color='default'
      onClick={onClick}
      className={className}>
      {btnText}
    </Button>
  );
};

export default CancelButton;

import React from 'react';
import {Button} from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
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
      onClick={onClick}
      className={className}>
      {btnText}
    </Button>
  );
};

export default React.memo(CancelButton);

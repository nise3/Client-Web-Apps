import React from 'react';
import {Button} from '@mui/material';
import {useIntl} from 'react-intl';
import ButtonSkeleton from '../../../@softbd/elements/display/skeleton/ButtonSkeleton/ButtonSkeleton';

interface Props {
  onClick?: () => void;
  onRejectAction?: (id: any) => void;
  className?: string;
  label?: string;
  isSubmitting?: boolean;
  isLoading?: boolean;
  startIcon?: React.ReactNode | false;
  isDisable?: boolean;
  [x: string]: any;
}

const RejectButton = ({
  onClick,
  className,
  label,
  isSubmitting,
  isLoading,
  startIcon,
  onRejectAction,
  isDisable,
  ...rest
}: Props) => {
  const {messages} = useIntl();
  const btnText = label ? label : messages['common.done'];
  return isLoading ? (
    <ButtonSkeleton />
  ) : (
    <Button
      startIcon={startIcon === false ? undefined : startIcon}
      sx={{color: 'error.main'}}
      onClick={onRejectAction}
      variant={'outlined'}
      className={className}
      disabled={isDisable}
      {...rest}>
      {btnText}
    </Button>
  );
};

export default React.memo(RejectButton);

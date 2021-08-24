import React from 'react';
import {Button} from '@material-ui/core';
import ControlPointIcon from '@material-ui/icons/ControlPoint';
import ButtonSkeleton from '../Skeleton/ButtonSkeleton';
import {useIntl} from 'react-intl';

interface Props {
  onClick: () => void;
  className?: string;
  isLoading?: boolean;
}

const AddButton = ({onClick, className, isLoading}: Props) => {
  const {messages} = useIntl();
  return isLoading ? (
    <ButtonSkeleton />
  ) : (
    <Button
      variant='contained'
      color={'primary'}
      startIcon={<ControlPointIcon />}
      onClick={onClick}
      className={className}>
      {messages['common.add']}
    </Button>
  );
};

export default AddButton;

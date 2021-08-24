import {Checkbox} from '@material-ui/core';
import {MessageFormatElement} from '@formatjs/icu-messageformat-parser';
import TextInputSkeleton from '../Skeleton/TextInputSkeleton';
import React from 'react';
import Typography from '@material-ui/core/Typography';

type Props = {
  id: string;
  label: string | MessageFormatElement[];
  isLoading?: boolean;
  register?: any;
  errorInstance?: any;
  checked?: any;
  onChange: () => void;
};

const CustomCheckbox = ({
  id,
  register,
  label,
  isLoading,
  errorInstance,
  checked,
  onChange,
}: Props) => {
  return isLoading ? (
    <TextInputSkeleton />
  ) : (
    <Typography color={errorInstance[id] ? 'error' : 'inherit'}>
      {label}
      <Checkbox
        {...register(id)}
        checked={checked}
        onChange={onChange}
        style={{padding: '2px'}}
      />
    </Typography>
  );
};

export default CustomCheckbox;

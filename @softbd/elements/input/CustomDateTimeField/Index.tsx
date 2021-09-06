import React from 'react';
import TextInputSkeleton from '../../display/skeleton/TextInputSkeleton/TextInputSkeleton';
import {TextField} from '@material-ui/core';
import {MessageFormatElement} from '@formatjs/icu-messageformat-parser';

type Props = {
  id: string;
  label?: string | MessageFormatElement[];
  className?: string;
  variant?: 'outlined' | 'standard' | 'filled';
  size?: 'small' | 'medium';
  isLoading?: boolean;
  register?: any;
  errorInstance?: any;
  defaultValue?: string;
};

const CustomDateTimeField = ({
  id,
  label,
  className,
  variant,
  size,
  isLoading,
  register,
  errorInstance,
  defaultValue,
}: Props) => {
  return isLoading ? (
    <TextInputSkeleton />
  ) : (
    <TextField
      fullWidth
      variant={variant ? variant : 'outlined'}
      size={size ? size : 'small'}
      id={id}
      className={className}
      label={label}
      type={'datetime-local'}
      error={errorInstance[id] && Boolean(errorInstance[id])}
      helperText={errorInstance[id] && errorInstance[id].message}
      InputLabelProps={{shrink: true}}
      defaultValue={defaultValue}
      {...register(id)}
    />
  );
};

export default CustomDateTimeField;

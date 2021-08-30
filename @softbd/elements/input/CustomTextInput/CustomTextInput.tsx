import {TextField} from '@material-ui/core';
import React from 'react';
import TextInputSkeleton from '../../display/skeleton/TextInputSkeleton/TextInputSkeleton';
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
  multiline?: boolean;
  rows?: number;
};

const CustomTextInput = ({
  id,
  label,
  className,
  variant,
  size,
  isLoading,
  register,
  errorInstance,
  multiline,
  rows,
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
      multiline={multiline}
      rows={rows}
      error={errorInstance[id] && Boolean(errorInstance[id])}
      helperText={errorInstance[id] && errorInstance[id].message}
      {...register(id)}
    />
  );
};

export default CustomTextInput;

import {TextField} from '@material-ui/core';
import React from 'react';
import TextInputSkeleton from '../Skeleton/TextInputSkeleton';

type Props = {
  id: string;
  label?: string;
  className?: string;
  variant?: 'outlined' | 'standard' | 'filled';
  size?: 'small' | 'medium';
  isLoading?: boolean;
  register?: any;
  errorInstance?: any;
  options?: any;
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
  options,
}: Props) => {
  return isLoading ? (
    <TextInputSkeleton />
  ) : (
    <TextField
      fullWidth
      select
      variant={variant ? variant : 'outlined'}
      size={size ? size : 'small'}
      id={id}
      className={className}
      label={label}
      error={errorInstance[id] && Boolean(errorInstance[id])}
      helperText={errorInstance[id] && errorInstance[id].message}
      {...register(id)}
      SelectProps={{native: true}}>
      {options.map((option: any) => (
        <option key={option.value} value={option.value}>
          {option.title_en}
        </option>
      ))}
    </TextField>
  );
};

export default CustomTextInput;
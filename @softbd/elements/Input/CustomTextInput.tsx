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
  register?:any;
  errorInstance?:any;
}

const CustomTextInput = ({
                           id,
                           label,
                           className,
                           variant,
                           size,
                           isLoading,
                           register,
                           errorInstance
                         }: Props) => {
  return (
    isLoading ?
      <TextInputSkeleton/>
      :
      <TextField
        fullWidth
        variant={variant ? variant : 'outlined'}
        size={size ? size : 'small'}
        id={id}
        className={className}
        label={label}
        error={errorInstance[id] && Boolean(errorInstance[id])}
        helperText={errorInstance[id] && errorInstance[id].message}
        {...register(id)}
      />
  );
};

export default CustomTextInput;
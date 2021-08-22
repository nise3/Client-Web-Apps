import {TextField} from '@material-ui/core';
import React from 'react';
import TextInputSkeleton from '../Skeleton/TextInputSkeleton';

type Props = {
  id: string;
  name: string;
  label?: string;
  value: string;
  className?: string;
  error?: boolean;
  helperText?: string | boolean;
  onChange: any;
  variant?: 'outlined' | 'standard' | 'filled';
  size?: 'small' | 'medium';
  isLoading?: boolean;
}

const CustomTextInput = ({
                           id,
                           name,
                           label,
                           value,
                           className,
                           onChange,
                           error,
                           helperText,
                           variant,
                           size,
                           isLoading,
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
        name={name}
        className={className}
        label={label}
        value={value}
        onChange={onChange}
        error={error}
        helperText={helperText}
      />
  );
};

export default CustomTextInput;
import {TextareaAutosize} from '@material-ui/core';
import React from 'react';
import {MessageFormatElement} from '@formatjs/icu-messageformat-parser';
import TextInputSkeleton from '../Skeleton/TextInputSkeleton';

type Props = {
  id: string;
  label?: string | MessageFormatElement[];
  isLoading?: boolean;
  register?: any;
  errorInstance?: any;
  className?: string;
};

const CustomTextArea = ({
  id,
  label,
  className,
  register,
  errorInstance,
  isLoading,
}: Props) => {
  return isLoading ? (
    <TextInputSkeleton />
  ) : (
    <TextareaAutosize
      minRows={3}
      id={id}
      className={className}
      label={label}
      error={errorInstance[id] && Boolean(errorInstance[id])}
      helperText={errorInstance[id] && errorInstance[id].message}
      {...register(id)}
    />
  );
};

export default CustomTextArea;

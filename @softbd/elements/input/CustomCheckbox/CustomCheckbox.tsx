import {Checkbox} from '@mui/material';
import {MessageFormatElement} from '@formatjs/icu-messageformat-parser';
import TextInputSkeleton from '../../display/skeleton/TextInputSkeleton/TextInputSkeleton';
import React from 'react';
import Typography from '@mui/material/Typography';

type Props = {
  id: string;
  label: string | MessageFormatElement[];
  isLoading?: boolean;
  register?: any;
  errorInstance?: any;
  checked: boolean;
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
    <Typography color={errorInstance?.[id] ? 'error' : 'inherit'}>
      <Checkbox
        color='primary'
        {...register(id)}
        checked={checked}
        onChange={onChange}
        style={{padding: '2px', marginRight: 5}}
      />
      {label}
    </Typography>
  );
};

export default CustomCheckbox;

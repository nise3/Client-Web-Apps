import {Checkbox, FormControlLabel} from '@material-ui/core';
import {Controller} from 'react-hook-form';
import {MessageFormatElement} from '@formatjs/icu-messageformat-parser';
import TextInputSkeleton from '../Skeleton/TextInputSkeleton';
import React from 'react';
import Typography from '@material-ui/core/Typography';

type Props = {
  id: string;
  label: string | MessageFormatElement[];
  isLoading?: boolean;
  register?: any;
  control: any;
  errorInstance?: any;
  checked?: any;
  onChange?: any;
};

const CustomCheckbox = ({
  id,
  register,
  label,
  isLoading,
  control,
  errorInstance,
  checked,
  onChange,
}: Props) => {
  return isLoading ? (
    <TextInputSkeleton />
  ) : (
    <FormControlLabel
      control={
        <Controller
          control={control}
          {...register(id)}
          render={({field: {onChange}}) => (
            <Checkbox color='primary' checked={checked} onChange={onChange} />
          )}
        />
      }
      label={
        <Typography color={errorInstance[id] ? 'error' : 'inherit'}>
          {label}
        </Typography>
      }
    />
  );
};

export default CustomCheckbox;

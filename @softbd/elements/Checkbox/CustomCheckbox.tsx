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
};

const CustomCheckbox = ({
  id,
  register,
  label,
  isLoading,
  control,
  errorInstance,
}: Props) => {
  return isLoading ? (
    <TextInputSkeleton />
  ) : (
    <FormControlLabel
      control={
        <Controller
          control={control}
          defaultValue='false'
          {...register(id)}
          render={({field: {onChange}}) => (
            <Checkbox
              color='primary'
              onChange={(e) => onChange(e.target.checked)}
            />
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

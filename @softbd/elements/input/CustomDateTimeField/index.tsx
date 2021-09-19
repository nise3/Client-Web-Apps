import React from 'react';
import TextInputSkeleton from '../../display/skeleton/TextInputSkeleton/TextInputSkeleton';
import {TextField} from '@material-ui/core';
import {MessageFormatElement} from '@formatjs/icu-messageformat-parser';
import IntlMessages from '../../../../@crema/utility/IntlMessages';

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
      type='date'
      defaultValue={defaultValue}
      inputProps={{
        max: '9999-12-31',
      }}
      InputLabelProps={{
        shrink: true,
      }}
      error={errorInstance[id] && Boolean(errorInstance[id])}
      helperText={
        errorInstance[id] && errorInstance[id].message ? (
          errorInstance[id].message.hasOwnProperty('key') ? (
            <IntlMessages
              id={errorInstance[id].message.key}
              values={errorInstance[id].message?.values || {}}
            />
          ) : (
            errorInstance[id].message
          )
        ) : (
          ''
        )
      }
      {...register(id)}
    />
  );
};

export default CustomDateTimeField;

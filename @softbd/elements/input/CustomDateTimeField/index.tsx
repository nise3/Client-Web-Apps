import React from 'react';
import TextInputSkeleton from '../../display/skeleton/TextInputSkeleton/TextInputSkeleton';
import {TextField} from '@mui/material';
import {MessageFormatElement} from '@formatjs/icu-messageformat-parser';
import IntlMessages from '../../../../@crema/utility/IntlMessages';

type Props = {
  id: string;
  label?: string | MessageFormatElement[];
  className?: string;
  variant?: 'outlined' | 'standard' | 'filled';
  size?: 'small' | 'medium';
  isLoading?: boolean;
  required?: boolean;
  register?: any;
  errorInstance?: any;
  defaultValue?: string;
  disabled?: boolean;
  inputProps?: any;
};

const CustomDateTimeField = ({
  id,
  label,
  className,
  variant,
  size,
  isLoading = false,
  required = false,
  register,
  errorInstance,
  defaultValue,
  disabled = false,
  inputProps = {},
}: Props) => {
  return isLoading ? (
    <TextInputSkeleton />
  ) : (
    <TextField
      InputLabelProps={{
        shrink: true,
        required: required,
      }}
      fullWidth
      variant={variant ? variant : 'outlined'}
      size={size ? size : 'small'}
      id={id}
      className={className}
      label={label}
      type='date'
      defaultValue={defaultValue}
      inputProps={{
        ...{
          max: '9999-12-31',
          disabled: disabled,
        },
        ...inputProps,
      }}
      error={errorInstance?.[id] && Boolean(errorInstance?.[id])}
      helperText={
        errorInstance?.[id] && errorInstance?.[id].message ? (
          errorInstance?.[id].message.hasOwnProperty('key') ? (
            <IntlMessages
              id={errorInstance?.[id].message.key}
              values={errorInstance?.[id].message?.values || {}}
            />
          ) : (
            errorInstance?.[id].message
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

import {FormHelperText, TextField} from '@mui/material';
import React from 'react';
import TextInputSkeleton from '../../display/skeleton/TextInputSkeleton/TextInputSkeleton';
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
  multiline?: boolean;
  rows?: number;
  type?: string;
  defaultValue?: string;
  inputProps?: any;
  helperText?: any;
  [x: string]: any;
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
  type,
  defaultValue,
  inputProps,
  helperText,
  ...rest
}: Props) => {
  let errorObj = errorInstance?.[id];
  const reg = new RegExp('(.*)\\[(.*?)]', '');
  const matches = id.match(reg);
  if (matches) {
    errorObj = errorInstance?.[matches[1]]?.[matches[2]];
  }

  return isLoading ? (
    <TextInputSkeleton />
  ) : (
    <>
      {helperText && (
        <FormHelperText sx={{color: 'primary.main'}}>
          {helperText}
        </FormHelperText>
      )}
      <TextField
        fullWidth
        variant={variant ? variant : 'outlined'}
        size={size ? size : 'small'}
        id={id}
        className={className}
        label={label}
        multiline={multiline}
        rows={rows}
        type={type}
        error={errorObj && Boolean(errorObj)}
        helperText={
          errorObj && errorObj.message ? (
            errorObj.message.hasOwnProperty('key') ? (
              <IntlMessages
                id={errorObj.message.key}
                values={errorObj.message?.values || {}}
              />
            ) : (
              errorObj.message
            )
          ) : (
            ''
          )
        }
        defaultValue={defaultValue}
        inputProps={{...inputProps, ...{required: false}}}
        {...register(id)}
        {...rest}
      />
    </>
  );
};

export default CustomTextInput;

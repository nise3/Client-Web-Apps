import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
} from '@mui/material';
import TextInputSkeleton from '../../display/skeleton/TextInputSkeleton/TextInputSkeleton';
import React from 'react';
import {useIntl} from 'react-intl';
import {Controller} from 'react-hook-form';
import {getErrorObject} from '../../../utilities/helpers';
import IntlMessages from '../../../../@crema/utility/IntlMessages';

interface Props {
  id: string;
  label?: string;
  radios: Array<any>;
  isLoading?: boolean;
  required?: boolean;
  control: any;
  defaultValue?: string | number | undefined;
  onChange?: (e: any) => any;
  styles?: any;
  errorInstance?: any;
  optionInline?: boolean;
}

const FormRadioButtons = ({
  id,
  label,
  radios,
  isLoading,
  required = false,
  control,
  defaultValue = '',
  onChange: onChangeCallback,
  styles = {},
  errorInstance,
  optionInline = true,
}: Props) => {
  const {messages} = useIntl();
  let errorObj = getErrorObject(id, errorInstance);
  let helperText =
    errorObj && errorObj.message ? (
      errorObj.message.hasOwnProperty('key') ? (
        <IntlMessages
          id={errorObj.message.key}
          key={errorObj.message.key}
          values={errorObj.message?.values || {}}
        />
      ) : (
        errorObj.message
      )
    ) : (
      ''
    );
  return isLoading ? (
    <TextInputSkeleton />
  ) : (
    <FormControl component='fieldset'>
      {label && (
        <FormLabel
          error={typeof errorObj != 'undefined' ?? false}
          component='legend'
          required={required}>
          {messages[label]}
        </FormLabel>
      )}
      <Controller
        render={({field: {onChange, value = defaultValue.toString()}}) => (
          <RadioGroup
            row
            aria-label={id}
            value={value}
            onChange={(e) => {
              onChange(e.target.value);
              if (onChangeCallback && typeof onChangeCallback === 'function') {
                onChangeCallback(e.target.value);
              }
            }}
            sx={{flexDirection: optionInline ? 'row' : 'column'}}>
            {radios.map((status) => (
              <FormControlLabel
                key={status.key}
                value={status.key}
                sx={styles}
                control={<Radio />}
                label={status.label}
              />
            ))}
          </RadioGroup>
        )}
        name={id}
        control={control}
        defaultValue={defaultValue}
      />
      {errorObj && (
        <FormHelperText error={true} id={id}>
          {helperText}
        </FormHelperText>
      )}
    </FormControl>
  );
};

export default FormRadioButtons;

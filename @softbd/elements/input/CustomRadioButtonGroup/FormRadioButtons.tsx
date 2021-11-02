import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from '@mui/material';
import TextInputSkeleton from '../../display/skeleton/TextInputSkeleton/TextInputSkeleton';
import React from 'react';
import {useIntl} from 'react-intl';
import {Controller} from 'react-hook-form';

type Props = {
  id: string;
  label: string;
  radios: Array<any>;
  isLoading?: boolean;
  required?: boolean;
  control: any;
  defaultValue?: string;
  onChange?: (e: any) => any;
};

const FormRadioButtons = ({
  id,
  label,
  radios,
  isLoading,
  required = false,
  control,
  defaultValue = '',
  onChange: onChangeCallback,
}: Props) => {
  const {messages} = useIntl();

  return isLoading ? (
    <TextInputSkeleton />
  ) : (
    <FormControl component='fieldset'>
      <FormLabel component='legend' required={required}>
        {messages[label]}
      </FormLabel>
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
            }}>
            {radios.map((status) => (
              <FormControlLabel
                key={status.key}
                value={status.key}
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
    </FormControl>
  );
};

export default FormRadioButtons;

import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from '@material-ui/core';
import TextInputSkeleton from './Skeleton/TextInputSkeleton';
import React from 'react';
import {useIntl} from 'react-intl';
import {Controller} from 'react-hook-form';
import {rowStatusArray} from '../utilities/rowStatus';

type Props = {
  id: string;
  isLoading: boolean;
  control: any;
  defaultValue: string;
  onChange?: (e: any) => any;
};

const FormRowStatus = ({
  id,
  isLoading,
  control,
  defaultValue,
  onChange: onChangeCallback,
}: Props) => {
  const {messages} = useIntl();

  return isLoading ? (
    <TextInputSkeleton />
  ) : (
    <FormControl component='fieldset'>
      <FormLabel component='legend'>{messages['common.status']}</FormLabel>
      <Controller
        render={({field: {onChange, value = defaultValue.toString()}}) => (
          <RadioGroup
            row
            aria-label={id}
            value={value}
            onChange={(e) => {
              onChange(e.target.value);
              if (onChangeCallback && typeof onChangeCallback === 'function') {
                onChangeCallback(e);
              }
            }}>
            {rowStatusArray().map((status) => (
              <FormControlLabel
                value={status.key}
                control={<Radio />}
                label={status.label}
              />
            ))}
          </RadioGroup>
        )}
        name={id}
        control={control}
      />
    </FormControl>
  );
};

export default FormRowStatus;

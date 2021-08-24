import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from '@material-ui/core';
import TextInputSkeleton from './Skeleton/TextInputSkeleton';
import React, {useState} from 'react';
import {useIntl} from 'react-intl';

type Props = {
  id: string;
  isLoading: boolean;
  register?: any;
  defaultValue: string;
  onChange?: (e: any) => any;
};

const FormRowStatus = ({
  id,
  isLoading,
  register,
  defaultValue,
  onChange,
}: Props) => {
  const [rowStatus, setRowStatus] = useState<string>(defaultValue);
  const {messages} = useIntl();

  return isLoading ? (
    <TextInputSkeleton />
  ) : (
    <FormControl component='fieldset'>
      <FormLabel component='legend'>{messages['common.status']}</FormLabel>
      <RadioGroup
        id={id}
        {...register(id)}
        value={rowStatus}
        onChange={(e) => {
          console.log(e.target.value);
          setRowStatus(e.target.value.toString());

          if (onChange) {
            onChange(e);
          }
        }}>
        <FormControlLabel
          control={<Radio value={'1'} />}
          label={messages['common.active']}
        />
        <FormControlLabel
          control={<Radio value={'0'} />}
          label={messages['common.inactive']}
        />
      </RadioGroup>
    </FormControl>
  );
};

export default FormRowStatus;

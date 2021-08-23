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

type Props = {
  id: string;
  isLoading: boolean;
  register?: any;
};

const FormRowStatus = ({id, isLoading, register}: Props) => {
  const {messages} = useIntl();
  return isLoading ? (
    <TextInputSkeleton />
  ) : (
    <FormControl component='fieldset'>
      <FormLabel component='legend'>{messages['common.status']}</FormLabel>
      <RadioGroup id={id} {...register(id)}>
        <FormControlLabel
          control={<Radio value={1} />}
          label={messages['common.active']}
        />
        <FormControlLabel
          control={<Radio value={0} />}
          label={messages['common.inactive']}
        />
      </RadioGroup>
    </FormControl>
  );
};

export default FormRowStatus;

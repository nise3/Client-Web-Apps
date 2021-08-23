import {FormControl, FormControlLabel, FormLabel, Radio, RadioGroup} from '@material-ui/core';
import TextInputSkeleton from './Skeleton/TextInputSkeleton';
import React from 'react';

type Props = {
  id: string;
  isLoading: boolean;
  register?: any;
}

const FormRowStatus = ({id, isLoading, register}: Props) => {

  return (
    isLoading ? <TextInputSkeleton />
      :
      <FormControl component='fieldset'>
        <FormLabel component='legend'>Status</FormLabel>
        <RadioGroup
          id={id}
          {...register(id)}
        >
          <FormControlLabel control={<Radio value={'1'} />} label={'Active'} />
          <FormControlLabel control={<Radio value={'0'} />} label={'Inactive'} />
        </RadioGroup>
      </FormControl>
  );
};

export default FormRowStatus;
import {FormControl, FormControlLabel, FormLabel, Radio, RadioGroup} from '@material-ui/core';
import TextInputSkeleton from './Skeleton/TextInputSkeleton';
import React from 'react';

type Props = {
  id: string;
  name: string;
  value: string;
  onChange: any;
  isLoading: boolean;
}

const FormRowStatus = ({name, id, value, onChange, isLoading}: Props) => {

  return (
    isLoading ? <TextInputSkeleton />
      :
      <FormControl component='fieldset'>
        <FormLabel component='legend'>Status</FormLabel>
        <RadioGroup
          id={id}
          name={name}
          value={value}
          onChange={onChange}
        >
          <FormControlLabel control={<Radio value={'1'} />} label={'Active'} />
          <FormControlLabel control={<Radio value={'0'} />} label={'Inactive'} />
        </RadioGroup>
      </FormControl>
  );
};

export default FormRowStatus;
import {FormControl, FormControlLabel, FormLabel, Radio, RadioGroup} from '@material-ui/core';

type Props = {
  id: string;
  name: string;
  value: string;
  onChange: any;
}

const FormRowStatus = ({name, id, value, onChange}: Props) => {

  return (
    <FormControl component='fieldset'>
      <FormLabel component='legend'>Status</FormLabel>
      <RadioGroup
        id={id}
        name={name}
        value={value}
        onChange={onChange}
      >
        <FormControlLabel control={<Radio value={'1'}/>} label={'Active'} />
        <FormControlLabel control={<Radio value={'0'}/>} label={'Inactive'} />
      </RadioGroup>
    </FormControl>
  );
};

export default FormRowStatus;
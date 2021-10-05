import React, {FC} from 'react';
import Grid from '@mui/material/Grid';
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from '@mui/material';
import {useIntl} from 'react-intl';
import CustomFormSelect from '../../@softbd/elements/input/CustomFormSelect/CustomFormSelect';

interface OtherInfoFormProps {
  register: any;
  errors: any;
  control: any;
}

const OtherInfoForm: FC<OtherInfoFormProps> = ({register, errors, control}) => {
  const {messages} = useIntl();
  const yes = messages['common.yes'];
  const no = messages['common.no'];
  return (
    <Grid container spacing={5}>
      <Grid item xs={12} md={6}>
        <CustomFormSelect
          id='number_of_siblings'
          label={messages['common.number_of_siblings']}
          isLoading={false}
          control={control}
          options={[]}
          optionValueProp={''}
          errorInstance={errors}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <FormControl component='fieldset'>
          <FormLabel component='legend'>
            Does your family own any house?
          </FormLabel>
          <RadioGroup
            row
            aria-label='position'
            name='position'
            defaultValue='unmarried'>
            <FormControlLabel value='yes' control={<Radio />} label={yes} />
            <FormControlLabel value='no' control={<Radio />} label={no} />
          </RadioGroup>
        </FormControl>
      </Grid>
      <Grid item xs={12} md={6}>
        <FormControl component='fieldset'>
          <FormLabel component='legend'>
            Does your family own any property?
          </FormLabel>
          <RadioGroup
            row
            aria-label='position'
            name='position'
            defaultValue='unmarried'>
            <FormControlLabel value='yes' control={<Radio />} label={yes} />
            <FormControlLabel value='no' control={<Radio />} label={no} />
          </RadioGroup>
        </FormControl>
      </Grid>

      <Grid item xs={12} md={6}>
        <FormControl component='fieldset'>
          <FormLabel component='legend'>ds</FormLabel>
          <RadioGroup
            row
            aria-label='position'
            name='position'
            defaultValue='unmarried'>
            <FormControlLabel value='yes' control={<Radio />} label={yes} />
            <FormControlLabel value='no' control={<Radio />} label={no} />
          </RadioGroup>
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default OtherInfoForm;

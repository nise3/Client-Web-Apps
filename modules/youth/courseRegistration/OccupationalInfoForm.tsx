import React, {FC} from 'react';
import Grid from '@mui/material/Grid';
import CustomTextInput from '../../../@softbd/elements/input/CustomTextInput/CustomTextInput';
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from '@mui/material';
import {useIntl} from 'react-intl';

interface OccupationalInfoFormProps {
  register: any;
  errors: any;
  control: any;
}

const OccupationalInfoForm: FC<OccupationalInfoFormProps> = ({
  register,
  errors,
  control,
}) => {
  const {messages} = useIntl();
  const yes = messages['common.yes'];
  const no = messages['common.no'];
  const currently_working = messages['common.currently_working'];
  return (
    <Grid container spacing={5}>
      <Grid item xs={12} md={6}>
        <CustomTextInput
          id='main_occupation'
          label={messages['common.main_occupation']}
          register={register}
          errorInstance={errors}
          isLoading={false}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <CustomTextInput
          id='others_occupation'
          label={messages['common.others_occupation']}
          register={register}
          errorInstance={errors}
          isLoading={false}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <CustomTextInput
          id='monthly_income'
          label={messages['common.monthly_income']}
          register={register}
          errorInstance={errors}
          isLoading={false}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <FormControl component='fieldset'>
          <FormLabel component='legend'>{currently_working}</FormLabel>
          <RadioGroup
            row
            aria-label='position'
            name='position'
            defaultValue='yes'>
            <FormControlLabel value='yes' control={<Radio />} label={yes} />
            <FormControlLabel value='no' control={<Radio />} label={no} />
          </RadioGroup>
        </FormControl>
      </Grid>
      <Grid item xs={12} md={6}>
        <CustomTextInput
          id='year_of_experience'
          label={messages['common.year_of_experience']}
          register={register}
          errorInstance={errors}
          isLoading={false}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <CustomTextInput
          id='passing_year'
          label={messages['common.passing_year']}
          register={register}
          errorInstance={errors}
          isLoading={false}
        />
      </Grid>
    </Grid>
  );
};

export default OccupationalInfoForm;

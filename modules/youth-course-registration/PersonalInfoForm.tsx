import React, {FC} from 'react';
import Grid from '@mui/material/Grid';
import CustomTextInput from '../../@softbd/elements/input/CustomTextInput/CustomTextInput';

interface PersonalInfoFormProps {
  register: any;
  errors: any;
}

const PersonalInfoForm: FC<PersonalInfoFormProps> = ({register, errors}) => {
  return (
    <Grid container spacing={5}>
      <Grid item xs={12}>
        <CustomTextInput
          id='first_name'
          label={'First Name'}
          register={register}
          errorInstance={errors}
          isLoading={false}
        />
      </Grid>
    </Grid>
  );
};

export default PersonalInfoForm;

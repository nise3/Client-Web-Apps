import React, {FC} from 'react';
import Grid from '@mui/material/Grid';
import CustomTextInput from '../../@softbd/elements/input/CustomTextInput/CustomTextInput';

interface AddressFormProps {
  register: any;
  errors: any;
}

const AddressForm: FC<AddressFormProps> = ({register, errors}) => {
  return (
    <Grid container spacing={5}>
      <Grid item xs={12}>
        <CustomTextInput
          id='address'
          label={'Address'}
          register={register}
          errorInstance={errors}
          isLoading={false}
        />
      </Grid>
    </Grid>
  );
};

export default AddressForm;

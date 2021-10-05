import React, {FC} from 'react';
import Grid from '@mui/material/Grid';

interface OtherInfoFormProps {
  register: any;
  errors: any;
}

const OtherInfoForm: FC<OtherInfoFormProps> = ({register, errors}) => {
  return (
    <Grid container spacing={5}>
      <Grid item xs={12}></Grid>
    </Grid>
  );
};

export default OtherInfoForm;

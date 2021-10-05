import React, {FC} from 'react';
import Grid from '@mui/material/Grid';

interface OccupationalInfoFormProps {
  register: any;
  errors: any;
}

const OccupationalInfoForm: FC<OccupationalInfoFormProps> = ({
  register,
  errors,
}) => {
  return (
    <Grid container spacing={5}>
      <Grid item xs={12}></Grid>
    </Grid>
  );
};

export default OccupationalInfoForm;

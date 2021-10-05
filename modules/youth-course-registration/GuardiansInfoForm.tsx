import React, {FC} from 'react';
import Grid from '@mui/material/Grid';

interface GuardiansInfoFormProps {
  register: any;
  errors: any;
}

const GuardiansInfoForm: FC<GuardiansInfoFormProps> = ({register, errors}) => {
  return (
    <Grid container spacing={5}>
      <Grid item xs={12}></Grid>
    </Grid>
  );
};

export default GuardiansInfoForm;

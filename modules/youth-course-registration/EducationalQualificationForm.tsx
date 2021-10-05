import React, {FC} from 'react';
import Grid from '@mui/material/Grid';

interface EducationalQualificationFormProps {
  register: any;
  errors: any;
}

const EducationalQualificationForm: FC<EducationalQualificationFormProps> = ({
  register,
  errors,
}) => {
  return (
    <Grid container spacing={5}>
      <Grid item xs={12}></Grid>
    </Grid>
  );
};

export default EducationalQualificationForm;

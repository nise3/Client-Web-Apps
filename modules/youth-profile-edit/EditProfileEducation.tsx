import React from 'react';
import {Grid} from '@mui/material';
import {makeStyles, createStyles} from '@mui/styles';
import ProfileTab from './ProfileTab';
import EducationEditForm from './EducationEditForm';
import {CremaTheme} from '../../types/AppContextPropsType';

const useStyles = makeStyles((theme: CremaTheme) =>
  createStyles({
    root: {},
  }),
);

function EditProfileEducation() {
  const classes = useStyles();
  return (
    <>
      <Grid container spacing={6}>
        <Grid item md={4}>
          <ProfileTab />
        </Grid>
        <Grid item md={8}>
          <EducationEditForm />
        </Grid>
      </Grid>
    </>
  );
}

export default EditProfileEducation;

import React from 'react';
import {Grid} from '@material-ui/core';
import {makeStyles} from '@material-ui/core';
import ProfileTab from './ProfileTab';
import EducationEditForm from './EducationEditForm';
import {createStyles, Theme} from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},

  }));

function EditProfileEducation() {
  const classes = useStyles();
  return (
    <>
      <Grid container
            spacing={6}
      >
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

import React from 'react';
import {useIntl} from 'react-intl';
import useStyles from './index.style';
import {useForm} from 'react-hook-form';
import {Button, Container, Grid, Paper, Typography} from '@mui/material';
import CustomTextInput from '../../@softbd/elements/input/CustomTextInput/CustomTextInput';

const YouthSettingsChangePasswordPage = () => {
  const {messages} = useIntl();
  const classes = useStyles();
  const {
    register,
    formState: {errors},
  } = useForm<any>();
  return (
    <Container className={classes.rootContainer}>
      <Paper className={classes.paperBox}>
        <Grid container spacing={5}>
          <Grid item xs={12}>
            <Typography variant={'h6'} style={{fontWeight: 'bold'}}>
              {messages['common.change_password']}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <CustomTextInput
              id='old_password'
              label={messages['common.oldPassword']}
              register={register}
              errorInstance={errors}
            />
          </Grid>
          <Grid item xs={12}>
            <CustomTextInput
              id='new_password'
              label={messages['common.newPassword']}
              register={register}
              errorInstance={errors}
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant={'contained'} color={'primary'}>
              {messages['common.save']}
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default YouthSettingsChangePasswordPage;

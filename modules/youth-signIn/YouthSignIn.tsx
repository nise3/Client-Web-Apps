import React from 'react';
import {Box, Container, Grid, Paper, Switch, Typography} from '@mui/material';
import useStyles from './Registration.style';
import {useIntl} from 'react-intl';
import {SubmitHandler, useForm} from 'react-hook-form';
import CustomTextInput from '../../@softbd/elements/input/CustomTextInput/CustomTextInput';

const YouthSignIn = () => {
  const classes = useStyles();
  const {messages} = useIntl();
  const isLoading = false;
  const {
    // control,
    register,
    handleSubmit,
    formState: {
      errors,
      // isSubmitting
    },
  } = useForm();

  const onSubmit: SubmitHandler<any> = async () => {
  };
  return (
    <Container>
      <Paper className={classes.PaperBox}>
        <Typography
          variant={'h6'}
          style={{marginBottom: '10px', fontWeight: 'bold'}}>
          Sign in
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
          <Grid container spacing={3} maxWidth={'md'}>
            <Grid item xs={12}>
              <CustomTextInput
                id='user_id'
                label={messages['common.user_id']}
                register={register}
                isLoading={isLoading}
                errorInstance={errors}
              />
            </Grid>
            <Grid item xs={12}>
              <CustomTextInput
                id='password'
                label={messages['common.password']}
                register={register}
                isLoading={isLoading}
                errorInstance={errors}
              />
            </Grid>
            <Grid item xs={6}>
              <Box className={classes.toggle}>
                <Switch defaultChecked />
                <Typography>Remember me</Typography>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Typography style={{textAlign: 'right'}}>
                Forgot password?
              </Typography>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default YouthSignIn;

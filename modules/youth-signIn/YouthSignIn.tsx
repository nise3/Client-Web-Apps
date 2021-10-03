import React from 'react';
import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Switch,
  Typography,
} from '@mui/material';
import useStyles from './Registration.style';
import {useIntl} from 'react-intl';
import {SubmitHandler, useForm} from 'react-hook-form';
import CustomTextInput from '../../@softbd/elements/input/CustomTextInput/CustomTextInput';

const YouthSignIn = () => {
  const classes = useStyles();
  const {messages} = useIntl();
  const isLoading = false;
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm();

  const onSubmit: SubmitHandler<any> = async () => {};
  return (
    <Container maxWidth={'sm'}>
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
              <Typography className={classes.forgotpass}>
                Forgot password?
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Button variant='contained' style={{width: '100px'}}>
                Sign in
              </Button>
            </Grid>
          </Grid>
        </form>
        <Typography style={{marginTop: '10px'}}>
          Don't have an account? Sign up here
        </Typography>
      </Paper>
    </Container>
  );
};

export default YouthSignIn;

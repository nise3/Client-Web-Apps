import React from 'react';
import {styled} from '@mui/material/styles';
import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Switch,
  Typography,
} from '@mui/material';
import {useIntl} from 'react-intl';
import {SubmitHandler, useForm} from 'react-hook-form';
import CustomTextInput from '../../../@softbd/elements/input/CustomTextInput/CustomTextInput';

const PREFIX = 'YouthSignIn';

const classes = {
  PaperBox: `${PREFIX}-PaperBox`,
  toggle: `${PREFIX}-toggle`,
  forgotpass: `${PREFIX}-forgotpass`,
};

const StyledContainer = styled(Container)(({theme}) => ({
  [`& .${classes.PaperBox}`]: {
    padding: 40,
  },

  [`& .${classes.toggle}`]: {
    display: 'flex',
    alignItems: 'center',
  },

  [`& .${classes.forgotpass}`]: {
    marginTop: '7px',
    textAlign: 'right',
    // [theme.breakpoints.up('lg')]: {
    //   textAlign: 'right',
    // },
    // [theme.breakpoints.down('md')]: {
    //   textAlign: 'left',
    // },
  },
}));

const YouthSignIn = () => {
  const {messages} = useIntl();
  const isLoading = false;
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm();

  const onSubmit: SubmitHandler<any> = async () => {};
  return (
    <StyledContainer maxWidth={'sm'}>
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
    </StyledContainer>
  );
};

export default YouthSignIn;

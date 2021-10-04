import React from 'react';
import useStyles from './Registration.style';
import {SubmitHandler, useForm} from 'react-hook-form';
import {
  Box,
  Button,
  Container,
  Grid,
  Link,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import {useIntl} from 'react-intl';

const YouthVerification = () => {
  const classes = useStyles();
  const {messages} = useIntl();
  const enterVerificationCode = messages['common.enter_verification_code'];
  const verificationMessageOnMobile =
    messages['common.verificationMessageOnMobile'];
  const sendCodeText = messages['common.sendCodeText'];
  const verify = messages['common.verify'];
  const {handleSubmit} = useForm();

  const onSubmit: SubmitHandler<any> = async () => {};
  return (
    <Container maxWidth={'sm'} style={{marginTop: '100px'}}>
      <Paper className={classes.PaperBox}>
        <Typography
          variant={'h5'}
          style={{marginBottom: '10px', fontWeight: 'bold'}}>
          {enterVerificationCode}
        </Typography>
        <Typography style={{marginBottom: '10px'}}>
          {verificationMessageOnMobile}
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
          <Grid container spacing={3}>
            <Grid item xs={3}>
              <TextField id='' variant='outlined' />
            </Grid>
            <Grid item xs={3}>
              <TextField id='' variant='outlined' />
            </Grid>
            <Grid item xs={3}>
              <TextField id='' variant='outlined' />
            </Grid>
            <Grid item xs={3}>
              <TextField id='' variant='outlined' />
            </Grid>
          </Grid>
          <Box className={classes.sendCode}>
            <Link>{sendCodeText}</Link>
          </Box>

          <Grid item xs={12}>
            <Button
              variant='contained'
              style={{width: '200px', height: '50px'}}>
              {verify}
            </Button>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default YouthVerification;

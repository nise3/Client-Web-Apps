import React from 'react';
import useStyles from '../youth-signIn/Registration.style';
import {SubmitHandler, useForm} from 'react-hook-form';
import {
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
} from '@mui/material';

const YouthVerification = () => {
  const classes = useStyles();

  const {handleSubmit} = useForm();

  const onSubmit: SubmitHandler<any> = async () => {};
  return (
    <Container maxWidth={'sm'} style={{marginTop: '100px'}}>
      <Paper className={classes.PaperBox}>
        <Typography
          variant={'h5'}
          style={{marginBottom: '10px', fontWeight: 'bold'}}>
          Enter Verification code
        </Typography>
        <Typography style={{marginBottom: '10px'}}>
          We have just sent a verification code to ********675
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
          <Typography style={{marginTop: '15px', marginBottom: '15px'}}>
            send the code again
          </Typography>
          <Grid item xs={12}>
            <Button
              variant='contained'
              style={{width: '200px', height: '50px'}}>
              Verify
            </Button>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default YouthVerification;

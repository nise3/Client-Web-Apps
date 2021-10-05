import React from 'react';
import {Button, Container, Paper, Typography} from '@mui/material';
import useStyles from './Registration.style';

const YouthConfirmEmail = () => {
  const classes = useStyles();
  return (
    <Container maxWidth={'sm'} style={{marginTop: '100px'}}>
      <Paper className={classes.PaperBox}>
        <Typography variant={'h5'} className={classes.text}>
          Confirm your email address
        </Typography>
        <Typography style={{marginBottom: '10px'}}>
          Please click the button below to confirm your email
        </Typography>
        <Button variant='contained' className={classes.btn}>
          Confirm email
        </Button>
      </Paper>
    </Container>
  );
};

export default YouthConfirmEmail;

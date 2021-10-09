import React from 'react';
import {useIntl} from 'react-intl';
import useStyles from './index.style';
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

const ChoosePayment = () => {
  const {messages} = useIntl();
  const classes = useStyles();
  const onSubmit: SubmitHandler<any> = async () => {};
  const {handleSubmit} = useForm();
  return (
    <Container maxWidth={'sm'} className={classes.rootContainer}>
      <Paper style={{padding: '20px'}} className={classes.paperBox}>
        <Typography variant={'h6'} style={{fontWeight: 'bold'}}>
          {messages['common.enter_bkash_pin']}
        </Typography>
        <Typography mb={5}>{messages['common.enter_pin']}</Typography>
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
            <Link>{messages['common.send_code_text']}</Link>
          </Box>

          <Grid item xs={12}>
            <Button
              variant='contained'
              style={{width: '200px', height: '50px'}}>
              {messages['common.confirm']}
            </Button>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default ChoosePayment;

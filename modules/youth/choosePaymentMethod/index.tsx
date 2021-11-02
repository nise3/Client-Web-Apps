import React from 'react';
import useStyles from './index.style';
import {CardMedia, Container, Grid, Paper, Typography} from '@mui/material';
import {useIntl} from 'react-intl';
const ChoosePayment = () => {
  const classes = useStyles();
  const {messages} = useIntl();
  return (
    <Container maxWidth={'md'} className={classes.rootContainer}>
      <Paper style={{padding: '20px'}} className={classes.paperBox}>
        <Typography variant={'h6'} style={{fontWeight: 'bold'}} mb={5}>
          {messages['common.choose_payment_method']}
        </Typography>
        <Grid container spacing={5}>
          <Grid item xs={6} md={3}>
            <CardMedia
              component='img'
              height='70'
              style={{width: '120px'}}
              image='/images/payment/bkash.png'
              alt='bkash'
              title='bkash'
              className={classes.img}
            />
          </Grid>
          <Grid item xs={6} md={3}>
            <CardMedia
              component='img'
              height='70'
              style={{width: '120px'}}
              image='/images/payment/nagad.png'
              alt='nagad'
              title='nagad'
              className={classes.img}
            />
          </Grid>
          <Grid item xs={6} md={3}>
            <CardMedia
              component='img'
              height='70'
              style={{width: '120px'}}
              image='/images/payment/rocket.jpg'
              alt='rocket'
              title='rocket'
              className={classes.img}
            />
          </Grid>
          <Grid item xs={6} md={3}>
            <CardMedia
              component='img'
              height='70'
              style={{width: '120px'}}
              image='/images/payment/mycash.jpg'
              alt='mycash'
              title='mycash'
              className={classes.img}
            />
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default ChoosePayment;

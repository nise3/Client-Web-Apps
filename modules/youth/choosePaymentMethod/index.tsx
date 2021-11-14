import React from 'react';
import {styled} from '@mui/material/styles';
import {CardMedia, Container, Grid, Paper, Typography} from '@mui/material';
import {useIntl} from 'react-intl';

const PREFIX = 'ChoosePayment';

const classes = {
  paperBox: `${PREFIX}-paperBox`,
  btn: `${PREFIX}-btn`,
  img: `${PREFIX}-img`,
};

const StyledContainer = styled(Container)(({theme}) => ({
  display: 'flex',
  height: 'calc(100vh - 70px)',

  [`& .${classes.paperBox}`]: {
    margin: 'auto',
  },

  [`& .${classes.btn}`]: {
    marginTop: '12px',
    width: '100px',
  },

  [`& .${classes.img}`]: {
    '&:hover': {
      border: '1px solid #42b326',
      cursor: 'pointer',
      borderRadius: '10px',
    },
  },
}));

const ChoosePayment = () => {
  const {messages} = useIntl();
  return (
    <StyledContainer maxWidth={'md'}>
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
    </StyledContainer>
  );
};

export default ChoosePayment;

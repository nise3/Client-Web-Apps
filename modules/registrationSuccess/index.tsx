import React from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Typography,
} from '@mui/material';
import {Link} from '../../@softbd/elements/common';
import useStyles from './index.style';

const RegistrationSuccess = () => {
  const classes: any = useStyles();
  return (
    <Container maxWidth={'lg'} className={classes.rootContainer}>
      <Box sx={{textAlign: 'center', margin: 'auto', maxWidth: '700px'}}>
        <Card>
          <CardContent>
            <CardMedia
              component='img'
              alt='green iguana'
              height='350'
              image='/images/success.png'
            />
            <Typography
              variant={'h5'}
              align={'center'}
              style={{marginTop: '10px', marginBottom: '10px'}}>
              Thank you for your registration!
            </Typography>
            <Link href='/'>
              <Button color='primary' variant={'contained'}>
                Go to Homepage
              </Button>
            </Link>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default RegistrationSuccess;

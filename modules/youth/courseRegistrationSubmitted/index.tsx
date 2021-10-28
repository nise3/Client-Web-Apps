import React from 'react';

import {Box, Button, CardMedia, Container, Typography} from '@mui/material';
import useStyles from './index.style';

const YouthCourseRegistrationSubmittedPage = () => {
  const classes: any = useStyles();

  return (
    <Container maxWidth={'lg'} className={classes.rootContainer}>
      <Box sx={{textAlign: 'center', margin: 'auto', maxWidth: '700px'}}>
        <CardMedia
          component='img'
          alt='green iguana'
          height='350'
          image='./images/success.png'
        />
        <Typography
          variant={'h5'}
          align={'center'}
          style={{marginTop: '10px', marginBottom: '10px'}}>
          Your application has been submitted, please check your email for the
          access key.Press Next and then enter the access key and proceed with
          payment.
        </Typography>
        <Button color='primary' variant={'contained'}>
          Next
        </Button>
      </Box>
    </Container>
  );
};

export default YouthCourseRegistrationSubmittedPage;

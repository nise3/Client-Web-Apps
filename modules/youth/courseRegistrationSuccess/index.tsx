import React from 'react';

import {Box, Button, CardMedia, Container, Typography} from '@mui/material';
import useStyles from './index.style';

const YouthCourseRegistrationSuccessPage = () => {
  const classes: any = useStyles();

  return (
    <Container maxWidth={'xl'} className={classes.rootContainer}>
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
          Congratulations!You have enrolled your course!
        </Typography>
        <Button color='primary' variant={'contained'}>
          Go to Course
        </Button>
      </Box>
    </Container>
  );
};

export default YouthCourseRegistrationSuccessPage;

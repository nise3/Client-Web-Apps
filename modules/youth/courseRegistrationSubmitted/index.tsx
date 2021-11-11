import React from 'react';
import {styled} from '@mui/material/styles';
import {Box, Button, CardMedia, Container, Typography} from '@mui/material';

const StyledContainer = styled(Container)(({theme}) => ({
  height: 'calc(100vh - 70px)',
  display: 'flex',
  [theme.breakpoints.only('xs')]: {
    height: 'calc(100vh - 56px)',
  },
  [theme.breakpoints.only('sm')]: {
    height: 'calc(100vh - 75px)',
  },
}));

const YouthCourseRegistrationSubmittedPage = () => {
  return (
    <StyledContainer maxWidth={'lg'}>
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
    </StyledContainer>
  );
};

export default YouthCourseRegistrationSubmittedPage;

import React from 'react';
import {Box, Button, CardMedia, Container, Typography} from '@mui/material';
import {useRouter} from 'next/router';
import {Link} from '../../../@softbd/elements/common';
import {LINK_FRONTEND_YOUTH_COURSE_DETAILS} from '../../../@softbd/common/appLinks';
import {styled} from '@mui/material/styles';

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

const YouthCourseRegistrationSuccessPage = () => {
  const router = useRouter();
  const {courseId} = router.query;

  return (
    <StyledContainer maxWidth={'lg'}>
      <Box sx={{textAlign: 'center', margin: 'auto', maxWidth: '700px'}}>
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
          Congratulations!You have enrolled your course!
        </Typography>
        <Link href={LINK_FRONTEND_YOUTH_COURSE_DETAILS + courseId}>
          <Button color='primary' variant={'contained'}>
            Go to Course
          </Button>
        </Link>
      </Box>
    </StyledContainer>
  );
};

export default YouthCourseRegistrationSuccessPage;

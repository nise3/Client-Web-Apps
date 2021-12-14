import React from 'react';
import {Box, Button, CardMedia, Container, Typography} from '@mui/material';
import {useRouter} from 'next/router';
import {Link} from '../../../@softbd/elements/common';
import {LINK_FRONTEND_YOUTH_COURSE_DETAILS} from '../../../@softbd/common/appLinks';
import {styled} from '@mui/material/styles';
import {useIntl} from 'react-intl';

const StyledContainer = styled(Container)(({theme}) => ({
  display: 'flex',
  marginTop: '20px',
}));

const YouthCourseRegistrationSuccessPage = () => {
  const {messages} = useIntl();
  const router = useRouter();
  const {courseId} = router.query;

  return (
    <StyledContainer maxWidth={'lg'}>
      <Box sx={{textAlign: 'center', margin: 'auto'}}>
        <Box sx={{margin: 'auto', maxWidth: '700px'}}>
          <CardMedia
            component='img'
            alt='Course enrollment success'
            height='350'
            image='/images/success.png'
          />
        </Box>
        <Typography
          variant={'h5'}
          align={'center'}
          style={{marginTop: '10px', marginBottom: '10px'}}>
          {messages['course_enroll.success']}
        </Typography>
        <Link href={LINK_FRONTEND_YOUTH_COURSE_DETAILS + courseId}>
          <Button color='primary' variant={'contained'}>
            {messages['course_enroll.go_to_course']}
          </Button>
        </Link>
      </Box>
    </StyledContainer>
  );
};

export default YouthCourseRegistrationSuccessPage;

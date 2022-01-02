import React from 'react';
import {styled} from '@mui/material/styles';
import {Box, Button, CardMedia, Container, Typography} from '@mui/material';
import {useIntl} from 'react-intl';
import {Link} from '../../../@softbd/elements/common';
import {useRouter} from 'next/router';
import {LINK_FRONTEND_YOUTH_COURSE_ENROLLMENT_VERIFICATION} from '../../../@softbd/common/appLinks';

const StyledContainer = styled(Container)(({theme}) => ({
  display: 'flex',
  marginTop: '20px',
}));

const YouthCourseRegistrationSubmittedPage = () => {
  const {messages} = useIntl();
  const router = useRouter();
  const {courseId, enrollment_id}: any = router.query;

  return (
    <StyledContainer maxWidth={'lg'}>
      <Box sx={{textAlign: 'center', margin: 'auto'}}>
        <Box sx={{margin: 'auto', maxWidth: '700px'}}>
          <CardMedia
            component='img'
            alt='Registration form submitted'
            height='350'
            image='/images/success.png'
          />
        </Box>
        <Typography
          variant={'h5'}
          align={'center'}
          style={{marginTop: '10px', marginBottom: '10px'}}>
          {messages['course_enroll.submitted']}
        </Typography>
        <Link
          href={
            LINK_FRONTEND_YOUTH_COURSE_ENROLLMENT_VERIFICATION +
            courseId +
            `?enrollment_id=${enrollment_id}`
          }>
          <Button color='primary' variant={'contained'}>
            {messages['common.next']}
          </Button>
        </Link>
      </Box>
    </StyledContainer>
  );
};

export default YouthCourseRegistrationSubmittedPage;

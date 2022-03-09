import React, {useEffect, useState} from 'react';
import {Box, Button, CardMedia, Container, Typography} from '@mui/material';
import {useRouter} from 'next/router';
import {Link} from '../../../@softbd/elements/common';
import {LINK_FRONTEND_YOUTH_COURSE_DETAILS} from '../../../@softbd/common/appLinks';
import {styled} from '@mui/material/styles';
import {useIntl} from 'react-intl';
import {
  getBrowserCookie,
  removeBrowserCookie,
} from '../../../@softbd/libs/cookieInstance';
import {COOKIE_KEY_ASSESSMENT_ID} from '../../../shared/constants/AppConst';
import {youthDomain} from '../../../@softbd/common/constants';

const StyledContainer = styled(Container)(({theme}) => ({
  display: 'flex',
  marginTop: '20px',
}));

const AssessmentPaymentSuccessPage = () => {
  const {messages} = useIntl();
  const router = useRouter();
  const {responseStatus} = router.query;
  const [assessmentId, setAssessmentId] = useState<number | null>(null);

  useEffect(() => {
    const assessmentId = getBrowserCookie(COOKIE_KEY_ASSESSMENT_ID);
    if (assessmentId) {
      setAssessmentId(assessmentId);
      removeBrowserCookie(COOKIE_KEY_ASSESSMENT_ID);
    }
  }, []);

  const getResponseMessage = () => {
    switch (responseStatus) {
      case 'success':
        return messages['assessment_payment.success'];
      case 'failed':
        return messages['course_enroll.failed'];
      case 'cancelled':
        return messages['course_enroll.cancelled'];
      default:
        return '';
    }
  };

  return (
    <StyledContainer maxWidth={'lg'}>
      <Box sx={{textAlign: 'center', margin: 'auto'}}>
        <Box sx={{margin: 'auto', maxWidth: '700px'}}>
          <CardMedia
            component='img'
            alt='Assessment payment success'
            height='350'
            image='/images/success.png'
          />
        </Box>
        <Typography
          variant={'h5'}
          align={'center'}
          style={{marginTop: '10px', marginBottom: '10px'}}>
          {getResponseMessage()}
        </Typography>
        {assessmentId ? (
          <Link href={LINK_FRONTEND_YOUTH_COURSE_DETAILS + assessmentId}>
            <Button color='primary' variant={'contained'}>
              {messages['course_enroll.go_to_course']}
            </Button>
          </Link>
        ) : (
          <Link href={youthDomain()}>
            <Button color='primary' variant={'contained'}>
              {messages['common.goto_home']}
            </Button>
          </Link>
        )}
      </Box>
    </StyledContainer>
  );
};

export default AssessmentPaymentSuccessPage;

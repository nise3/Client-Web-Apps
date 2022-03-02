import React, {useEffect, useState} from 'react';
import {Box, Button, CardMedia, Container, Typography} from '@mui/material';
import {useRouter} from 'next/router';
import {Link} from '../../../@softbd/elements/common';
import {LINK_FRONTEND_NASCIB_MEMBER_REGISTRATION_PAYMENT_METHOD_PAGE} from '../../../@softbd/common/appLinks';
import {styled} from '@mui/material/styles';
import {useIntl} from 'react-intl';
import {
  getBrowserCookie,
  removeBrowserCookie,
} from '../../../@softbd/libs/cookieInstance';
import {
  COOKIE_KEY_COURSE_ID,
  COOKIE_NASCIB_MEMBER_REGISTRATION_PAYMENT_ID,
} from '../../../shared/constants/AppConst';

const StyledContainer = styled(Container)(({theme}) => ({
  display: 'flex',
  marginTop: '20px',
}));

const NASCIBMemberRegistrationSuccessPage = () => {
  const {messages} = useIntl();
  const router = useRouter();
  const {basePath} = router.query;
  const {responseStatus} = router.query;
  const [paymentId, setPaymentId] = useState<number | null>(null);

  useEffect(() => {
    const paymentId = getBrowserCookie(
      COOKIE_NASCIB_MEMBER_REGISTRATION_PAYMENT_ID,
    );
    if (paymentId) {
      setPaymentId(paymentId);
      removeBrowserCookie(COOKIE_KEY_COURSE_ID);
    }
  }, []);

  const getResponseMessage = () => {
    switch (responseStatus) {
      case 'success':
        return messages['member_registration.success'];
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
            alt='Course enrollment success'
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
        {paymentId ? (
          <Link
            href={
              LINK_FRONTEND_NASCIB_MEMBER_REGISTRATION_PAYMENT_METHOD_PAGE +
              paymentId
            }>
            <Button color='primary' variant={'contained'}>
              {messages['course_enroll.go_to_course']}
            </Button>
          </Link>
        ) : (
          <Link href={String(basePath)}>
            <Button color='primary' variant={'contained'}>
              {messages['common.goto_home']}
            </Button>
          </Link>
        )}
      </Box>
    </StyledContainer>
  );
};

export default NASCIBMemberRegistrationSuccessPage;

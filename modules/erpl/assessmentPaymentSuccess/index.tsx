import React from 'react';
import {Box, Button, CardMedia, Container, Typography} from '@mui/material';
import {useRouter} from 'next/router';
import {Link} from '../../../@softbd/elements/common';
import {styled} from '@mui/material/styles';
import {useIntl} from 'react-intl';
import {erplDomain} from '../../../@softbd/common/constants';

const StyledContainer = styled(Container)(({theme}) => ({
  display: 'flex',
  marginTop: '20px',
}));

const AssessmentPaymentSuccessPage = () => {
  const {messages} = useIntl();
  const router = useRouter();
  const {responseStatus} = router.query;
  let responseMsgColor = '';

  const getResponseMessage = () => {
    switch (responseStatus) {
      case 'success':
        responseMsgColor = '#2e7d32';
        return messages['assessment_payment.success'];
      case 'failed':
        responseMsgColor = '#ed6c02';
        return messages['course_enroll.failed'];
      case 'cancelled':
        responseMsgColor = '#d32f2f';
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
          style={{
            marginTop: '10px',
            marginBottom: '10px',
            color: responseMsgColor,
          }}>
          {getResponseMessage()}
        </Typography>
        <Link href={erplDomain()}>
          <Button color='primary' variant={'contained'}>
            {messages['common.goto_home']}
          </Button>
        </Link>
      </Box>
    </StyledContainer>
  );
};

export default AssessmentPaymentSuccessPage;

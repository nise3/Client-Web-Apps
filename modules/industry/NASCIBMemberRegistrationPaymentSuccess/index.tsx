import React from 'react';
import {Box, CardMedia, Container, Typography} from '@mui/material';
import {useRouter} from 'next/router';
import {styled} from '@mui/material/styles';
import {useIntl} from 'react-intl';

const StyledContainer = styled(Container)(({theme}) => ({
  display: 'flex',
  marginTop: '20px',
}));

const NASCIBMemberRegistrationSuccessPage = () => {
  const {messages} = useIntl();
  const router = useRouter();
  const {responseStatus} = router.query;

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
            alt='member registration success'
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
      </Box>
    </StyledContainer>
  );
};

export default NASCIBMemberRegistrationSuccessPage;

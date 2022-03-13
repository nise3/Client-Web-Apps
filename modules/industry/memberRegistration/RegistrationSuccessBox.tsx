import React from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';
import {Link} from '../../../@softbd/elements/common';
import {useIntl} from 'react-intl';

const RegistrationSuccessBox = () => {
  const {messages} = useIntl();
  return (
    <Box sx={{textAlign: 'center', margin: '10px auto', maxWidth: '700px'}}>
      <Card>
        <CardContent>
          <CardMedia
            component='img'
            alt='registration success'
            height='350'
            image='/images/success.png'
          />
          <Typography
            variant={'h5'}
            align={'center'}
            style={{marginTop: '10px', marginBottom: '10px'}}>
            {messages['registration_success.thanks_text']}
          </Typography>
          <Link href='/'>
            <Button color='primary' variant={'contained'}>
              {messages['common.goto_home']}
            </Button>
          </Link>
        </CardContent>
      </Card>
    </Box>
  );
};

export default RegistrationSuccessBox;

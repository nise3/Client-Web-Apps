import {Grid, Typography} from '@mui/material';
import React from 'react';
import {useIntl} from 'react-intl';

interface NoDataFoundComponentProps {
  message?: string;
  messageTextType?: any;
}

const NoDataFoundComponent = ({
  message,
  messageTextType,
}: NoDataFoundComponentProps) => {
  const {messages} = useIntl();

  return (
    <Grid container sx={{justifyContent: 'center', marginTop: 5}}>
      <Typography variant={messageTextType ?? 'h4'}>
        {message ?? messages['common.no_data_found']}
      </Typography>
    </Grid>
  );
};

export default NoDataFoundComponent;

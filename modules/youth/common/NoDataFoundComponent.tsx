import {Grid, Typography} from '@mui/material';
import React from 'react';
import {useIntl} from 'react-intl';

interface NoDataFoundComponentProps {
  message?: string;
  messageTextType?:
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'subtitle1'
    | 'subtitle2'
    | 'body1'
    | 'body2';
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

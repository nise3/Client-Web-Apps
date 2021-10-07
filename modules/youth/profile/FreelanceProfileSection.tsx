import {Card, CardContent, Switch, Typography} from '@mui/material';
import React from 'react';
import {useIntl} from 'react-intl';

const FreelanceProfileSection = () => {
  const {messages} = useIntl();

  return (
    <Card>
      <CardContent>
        <Typography variant={'h6'}>
          {messages['common.freelance_profile']}
        </Typography>
        <Typography variant={'body2'}>
          {messages['youth_profile.freelance_profile_turing_on_hint']}
        </Typography>
        <Switch color={'primary'} defaultChecked />
      </CardContent>
    </Card>
  );
};

export default FreelanceProfileSection;

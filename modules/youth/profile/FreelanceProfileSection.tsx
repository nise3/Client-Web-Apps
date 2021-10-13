import {
  Card,
  CardContent,
  FormControlLabel,
  Switch,
  Typography,
} from '@mui/material';
import React, {useCallback, useEffect, useState} from 'react';
import {useIntl} from 'react-intl';
import {isResponseSuccess} from '../../../@softbd/utilities/helpers';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import {updateYouthFreelanceProfileStatus} from '../../../services/youthManagement/YouthService';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import {useFetchYouthProfile} from '../../../services/youthManagement/hooks';

const FreelanceProfileSection = () => {
  const {messages} = useIntl();
  const {successStack} = useNotiStack();
  const {data: youthProfile} = useFetchYouthProfile();

  const [freelanceProfileStatus, setFreelanceProfileStatus] =
    useState<number>(0);

  useEffect(() => {
    if (youthProfile) {
      setFreelanceProfileStatus(youthProfile.is_freelance_profile);
    }
  }, [youthProfile]);

  const handleFreelanceProfileStatusChange = useCallback(async (event: any) => {
    const status = event.target.checked ? 1 : 0;
    setFreelanceProfileStatus(status);
    const data: any = {};
    data.is_freelance_profile = status;

    const response = await updateYouthFreelanceProfileStatus(data);
    if (isResponseSuccess(response)) {
      successStack(
        <IntlMessages
          id='common.subject_updated_successfully'
          values={{subject: <IntlMessages id='common.freelance_profile' />}}
        />,
      );
    }
  }, []);

  return (
    <Card>
      <CardContent>
        <Typography variant={'h6'}>
          {messages['common.freelance_profile']}
        </Typography>
        <Typography variant={'body2'}>
          {messages['youth_profile.freelance_profile_turing_on_hint']}
        </Typography>
        <FormControlLabel
          control={
            <Switch
              color={'primary'}
              onChange={handleFreelanceProfileStatusChange}
              checked={freelanceProfileStatus == 1}
            />
          }
          label=''
        />
      </CardContent>
    </Card>
  );
};

export default FreelanceProfileSection;

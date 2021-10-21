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
import {useAuthUser} from '../../../@crema/utility/AppHooks';
import {YouthAuthUser} from '../../../redux/types/models/CommonAuthUser';

const FreelanceProfileComponent = () => {
  const {messages} = useIntl();
  const {successStack} = useNotiStack();
  const authUser = useAuthUser<YouthAuthUser>();

  const [freelanceProfileStatus, setFreelanceProfileStatus] =
    useState<number>(0);

  useEffect(() => {
    if (authUser) {
      setFreelanceProfileStatus(authUser.is_freelance_profile);
    }
  }, [authUser]);

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

export default FreelanceProfileComponent;

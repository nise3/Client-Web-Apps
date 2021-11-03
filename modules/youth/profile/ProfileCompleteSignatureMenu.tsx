import {Card, CardContent} from '@mui/material';
import React from 'react';
import {useAuthUser} from '../../../@crema/utility/AppHooks';
import {YouthAuthUser} from '../../../redux/types/models/CommonAuthUser';
import BasicInfoItemBox from '../feed/components/BasicInfoItemBox';

const ProfileCompleteSignatureMenu = () => {
  const authUser = useAuthUser<YouthAuthUser>();

  return (
    <Card>
      <CardContent>
        <BasicInfoItemBox youthProfile={authUser} />
      </CardContent>
    </Card>
  );
};

export default ProfileCompleteSignatureMenu;

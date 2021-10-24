import React, {useCallback} from 'react';
import Button from '@mui/material/Button';
import {ButtonProps} from '@mui/material/Button/Button';
import IntlMessages from '../../../../@crema/utility/IntlMessages';
import ButtonSkeleton from '../../display/skeleton/ButtonSkeleton/ButtonSkeleton';
import {useAuthUser} from '../../../../@crema/utility/AppHooks';
import Router from 'next/router';
import {
  LINK_DASHBOARD,
  LINK_FRONTEND_NISE_ROOT,
  LINK_FRONTEND_YOUTH_ROOT,
} from '../../../common/appLinks';
import {Dashboard} from '@mui/icons-material';

interface Props extends ButtonProps {}

const GotoDashboardButton = ({className, ...extra}: Props) => {
  const authUser = useAuthUser();

  const onClickButton = useCallback(() => {
    if (authUser && authUser.isYouthUser) {
      Router.push(LINK_FRONTEND_YOUTH_ROOT);
    } else if (
      authUser &&
      (authUser.isSystemUser ||
        authUser.isInstituteUser ||
        authUser.isOrganizationUser)
    ) {
      Router.push(LINK_DASHBOARD);
    } else {
      Router.push(LINK_FRONTEND_NISE_ROOT);
    }
  }, [authUser]);

  return !authUser ? (
    <ButtonSkeleton />
  ) : (
    <Button
      startIcon={<Dashboard />}
      onClick={onClickButton}
      variant={'contained'}
      color={'primary'}
      {...extra}>
      <IntlMessages id='menu.dashboard' />
    </Button>
  );
};

export default React.memo(GotoDashboardButton);

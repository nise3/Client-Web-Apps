import IconRole from '../../../@softbd/icons/IconRole';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import CancelButton from '../../../@softbd/elements/button/CancelButton/CancelButton';
import React from 'react';
import CustomDetailsViewMuiModal from '../../../@softbd/modals/CustomDetailsViewMuiModal/CustomDetailsViewMuiModal';
import {Grid} from '@material-ui/core';
import DetailsInputView from '../../../@softbd/elements/display/DetailsInputView/DetailsInputView';
import {useAuthUser} from '../../../@crema/utility/AppHooks';
import {AuthUser} from '../../../types/models/AuthUser';
import {useIntl} from 'react-intl';

export default function UserInfoDetailsPopup({onClose}: {onClose: () => any}) {
  const user: AuthUser | null = useAuthUser();
  const {messages} = useIntl();

  return (
    <CustomDetailsViewMuiModal
      open={true}
      onClose={onClose}
      title={
        <>
          <IconRole />
          <IntlMessages id='role.label' />
        </>
      }
      maxWidth={'sm'}
      actions={
        <>
          <CancelButton onClick={onClose} />
        </>
      }>
      <Grid container spacing={5}>
        <Grid item xs={6}>
          <DetailsInputView
            label={messages['common.title_en']}
            value={user?.displayName}
          />
        </Grid>
      </Grid>
    </CustomDetailsViewMuiModal>
  );
}

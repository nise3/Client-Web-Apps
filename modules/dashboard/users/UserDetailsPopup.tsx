import React from 'react';
import {useIntl} from 'react-intl';
import CustomDetailsViewMuiModal from '../../../@softbd/modals/CustomDetailsViewMuiModal/CustomDetailsViewMuiModal';
import IconRole from '../../../@softbd/icons/IconRole';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import CancelButton from '../../../@softbd/elements/button/CancelButton/CancelButton';
import EditButton from '../../../@softbd/elements/button/EditButton/EditButton';
import {Grid} from '@mui/material';
import DetailsInputView from '../../../@softbd/elements/display/DetailsInputView/DetailsInputView';
import CustomChipRowStatus from '../../../@softbd/elements/display/CustomChipRowStatus/CustomChipRowStatus';
import {useFetchUser} from '../../../services/userManagement/hooks';
import UserTypes from '../../../@softbd/utilities/UserTypes';
import {isBreakPointUp} from '../../../@crema/utility/Utils';

type Props = {
  itemId: number;
  onClose: () => void;
  openEditModal: (id: number) => void;
};

const UserDetailsPopup = ({itemId, openEditModal, ...props}: Props) => {
  const {messages} = useIntl();
  const {data: itemData, isLoading} = useFetchUser(itemId);

  const getUserTypeName = (userType: number) => {
    switch (String(userType)) {
      case UserTypes.SYSTEM_USER:
        return messages['user.type.system'];
      case UserTypes.ORGANIZATION_USER:
        return messages['user.type.organization'];
      case UserTypes.INSTITUTE_USER:
        return messages['user.type.institute'];
      case UserTypes.INDUSTRY_ASSOCIATION_USER:
        return messages['user.type.industry_association'];
      default:
        return '';
    }
  };

  return (
    <>
      <CustomDetailsViewMuiModal
        open={true}
        {...props}
        title={
          <>
            <IconRole />
            <IntlMessages id='user.label' />
          </>
        }
        maxWidth={isBreakPointUp('xl') ? 'lg' : 'md'}
        actions={
          <>
            <CancelButton onClick={props.onClose} isLoading={isLoading} />
            {itemData && (
              <EditButton
                variant='contained'
                onClick={() => openEditModal(itemData.id)}
                isLoading={isLoading}
              />
            )}
          </>
        }>
        <Grid container spacing={5}>
          <Grid item xs={6}>
            <DetailsInputView
              label={messages['common.name_en']}
              value={itemData?.name_en}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={6}>
            <DetailsInputView
              label={messages['common.name']}
              value={itemData?.name}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={6}>
            <DetailsInputView
              label={messages['user.username']}
              value={itemData?.username}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={6}>
            <DetailsInputView
              label={messages['common.email']}
              value={itemData?.email}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={6}>
            <DetailsInputView
              label={messages['user.user_type']}
              value={getUserTypeName(itemData?.user_type)}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={6}>
            <DetailsInputView
              label={messages['role.label']}
              value={itemData?.role_title_en}
              isLoading={isLoading}
            />
          </Grid>
          {/*{itemData?.organization_id && (
            <Grid item xs={6}>
              <DetailsInputView
                label={messages['organization.label']}
                value={itemData?.organization_title_en}
                isLoading={isLoading}
              />
            </Grid>
          )}
          {itemData?.institute_id && (
            <Grid item xs={6}>
              <DetailsInputView
                label={messages['institute.label']}
                value={itemData?.institute_title_en}
                isLoading={isLoading}
              />
            </Grid>
          )}*/}
          <Grid item xs={6}>
            <CustomChipRowStatus
              label={messages['common.active_status']}
              value={itemData?.row_status}
              isLoading={isLoading}
            />
          </Grid>

          {itemData && itemData.institute_id ? (
            itemData?.training_center_id ? (
              <Grid item xs={6}>
                <DetailsInputView
                  label={messages['user.user_type']}
                  value={messages['user.training_center_user']}
                  isLoading={isLoading}
                />
              </Grid>
            ) : itemData?.branch_id ? (
              <Grid item xs={6}>
                <DetailsInputView
                  label={messages['user.user_type']}
                  value={messages['user.branch_user']}
                  isLoading={isLoading}
                />
              </Grid>
            ) : (
              <Grid item xs={6}>
                <DetailsInputView
                  label={messages['user.user_type']}
                  value={messages['user.institute_user']}
                  isLoading={isLoading}
                />
              </Grid>
            )
          ) : (
            <></>
          )}
        </Grid>
      </CustomDetailsViewMuiModal>
    </>
  );
};

export default UserDetailsPopup;

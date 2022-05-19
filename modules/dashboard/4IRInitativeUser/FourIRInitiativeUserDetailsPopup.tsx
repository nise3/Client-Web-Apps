import React from 'react';
import {Grid} from '@mui/material';
import CancelButton from '../../../@softbd/elements/button/CancelButton/CancelButton';
import CustomDetailsViewMuiModal from '../../../@softbd/modals/CustomDetailsViewMuiModal/CustomDetailsViewMuiModal';
import DetailsInputView from '../../../@softbd/elements/display/DetailsInputView/DetailsInputView';
import {useIntl} from 'react-intl';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import IconBranch from '../../../@softbd/icons/IconBranch';
import {isBreakPointUp} from '../../../@crema/utility/Utils';
import ImageView from '../../../@softbd/elements/display/ImageView/ImageView';
import {
  useFetch4IROneProjectContribution,
  // useFetch4IRProjectContribution,
} from '../../../services/4IRManagement/hooks';

type Props = {
  itemId: number;
  initiativeId: number | null;
  memberId: number | null;
  onClose: () => void;
  // openEditModal: (id: number) => void;
};

const FourIRInitiativeUserDetailsPopup = ({
  itemId,
  initiativeId,
  memberId,
  ...props
}: Props) => {
  const {messages} = useIntl();

  const {data: itemData, isLoading} =
    useFetch4IROneProjectContribution(memberId);
  return (
    <>
      <CustomDetailsViewMuiModal
        open={true}
        {...props}
        title={
          <>
            <IconBranch />
            <IntlMessages id='common.contributions' />
          </>
        }
        maxWidth={isBreakPointUp('xl') ? 'lg' : 'md'}
        actions={
          <>
            <CancelButton onClick={props.onClose} isLoading={isLoading} />
          </>
        }>
        <Grid container spacing={5}>
          <Grid item xs={12} md={6}>
            <ImageView
              label={messages['common.file']}
              imageUrl={itemData?.file_path}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <DetailsInputView
              label={messages['common.name']}
              value={itemData?.team_member_name}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <DetailsInputView
              label={messages['common.organization']}
              value={itemData?.organization}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <DetailsInputView
              label={messages['common.contact_number']}
              value={itemData?.team_member_phone_number}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <DetailsInputView
              label={messages['common.designation']}
              value={itemData?.team_member_designation}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <DetailsInputView
              label={messages['common.email']}
              value={itemData?.team_member_email}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <DetailsInputView
              label={messages['4ir.role_or_responsibility']}
              value={itemData?.role_responsibility}
              isLoading={isLoading}
            />
          </Grid>

          <Grid item xs={12}>
            <DetailsInputView
              label={messages['common.contributions']}
              value={
                <div
                  dangerouslySetInnerHTML={{
                    __html: itemData?.contribution?.contribution,
                  }}
                />
              }
              isLoading={isLoading}
            />
          </Grid>
        </Grid>
      </CustomDetailsViewMuiModal>
    </>
  );
};

export default FourIRInitiativeUserDetailsPopup;

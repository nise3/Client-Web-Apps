import {useFetchContactInfo} from '../../../services/IndustryAssociationManagement/hooks';
import {useIntl} from 'react-intl';
import CustomDetailsViewMuiModal from '../../../@softbd/modals/CustomDetailsViewMuiModal/CustomDetailsViewMuiModal';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import React from 'react';
import CancelButton from '../../../@softbd/elements/button/CancelButton/CancelButton';
import EditButton from '../../../@softbd/elements/button/EditButton/EditButton';
import {Grid} from '@mui/material';
import DetailsInputView from '../../../@softbd/elements/display/DetailsInputView/DetailsInputView';
import DecoratedRowStatus from '../../../@softbd/elements/display/DecoratedRowStatus/DecoratedRowStatus';
import {isBreakPointUp} from '../../../@crema/utility/Utils';
import IconOrganization from "../../../@softbd/icons/IconOrganization";

interface IContactInfoDetails {
  contactInfoId: number;
  onClose: () => void;
  openEditModal: (id: number) => void;
}

const IndustryAssociationContactInfoDetailsPopup = ({
  contactInfoId,
  openEditModal,
  ...props
}: IContactInfoDetails) => {
  const {data: contactInfo, isLoading} = useFetchContactInfo(contactInfoId);

  const {messages} = useIntl();

  return (
    <CustomDetailsViewMuiModal
      open={true}
      {...props}
      title={
        <>
          <IconOrganization />
          <IntlMessages id='common.contact_office' />
        </>
      }
      maxWidth={isBreakPointUp('xl') ? 'lg' : 'md'}
      actions={
        <>
          <CancelButton onClick={props.onClose} isLoading={isLoading} />
          <EditButton onClick={() => openEditModal(contactInfoId)} />
        </>
      }>
      <Grid container spacing={5}>
        <Grid item xs={6}>
          <DetailsInputView
            label={messages['common.title']}
            value={contactInfo?.title}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={6}>
          <DetailsInputView
            label={messages['common.title_en']}
            value={contactInfo?.title_en}
            isLoading={isLoading}
          />
        </Grid>

        <Grid item xs={6}>
          <DetailsInputView
            label={messages['common.email']}
            value={contactInfo?.email}
            isLoading={isLoading}
          />
        </Grid>

        <Grid item xs={6}>
          <DetailsInputView
            label={messages['common.phone_number']}
            value={contactInfo?.phone}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={6}>
          <DetailsInputView
            label={messages['common.mobile']}
            value={contactInfo?.mobile}
            isLoading={isLoading}
          />
        </Grid>

        <Grid item xs={6}>
          <DetailsInputView
            label={messages['common.status']}
            value={<DecoratedRowStatus rowStatus={contactInfo?.row_status} />}
            isLoading={isLoading}
          />
        </Grid>
      </Grid>
    </CustomDetailsViewMuiModal>
  );
};

export default IndustryAssociationContactInfoDetailsPopup;

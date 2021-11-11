import React from 'react';
import {Grid} from '@mui/material';
import CancelButton from '../../../@softbd/elements/button/CancelButton/CancelButton';
import CustomDetailsViewMuiModal from '../../../@softbd/modals/CustomDetailsViewMuiModal/CustomDetailsViewMuiModal';
import EditButton from '../../../@softbd/elements/button/EditButton/EditButton';
import DetailsInputView from '../../../@softbd/elements/display/DetailsInputView/DetailsInputView';
import {useIntl} from 'react-intl';
import {WorkOutline} from '@mui/icons-material';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import CustomChipRowStatus from '../../../@softbd/elements/display/CustomChipRowStatus/CustomChipRowStatus';
import { useFetchPartner } from '../../../services/cmsManagement/hooks';

type Props = {
  itemId: number;
  onClose: () => void;
  openEditModal: (id: number) => void;
};

const Nise3PartnersDetailsPopup = ({
  itemId,
  openEditModal,
  ...props
}: Props) => {
  // const {data: itemData, isLoading} = useFetchJobSector(itemId);
  const {data: itemData, isLoading} = useFetchPartner(itemId);
  const {messages} = useIntl();

  return (
    <>
      <CustomDetailsViewMuiModal
        maxWidth={'sm'}
        open={true}
        {...props}
        title={
          <>
            <WorkOutline />
            <IntlMessages id='nise.partners' />
          </>
        }
        actions={
          <>
            <CancelButton onClick={props.onClose} isLoading={isLoading} />
            <EditButton
              onClick={() => openEditModal(itemData.id)}
              isLoading={isLoading}
            />
          </>
        }>
        <Grid container spacing={5}>
          <Grid item xs={12}>
            <DetailsInputView
              label={messages['common.title']}
              value={itemData?.title}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={12}>
            <DetailsInputView
              label={messages['partner.main_image_path']}
              value={itemData?.main_image_path}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={12}>
            <DetailsInputView
              label={messages['partner.thumb_image_path']}
              value={itemData?.thumb_image_path}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={12}>
            <DetailsInputView
              label={messages['partner.grid_image_path']}
              value={itemData?.grid_image_path}
              isLoading={isLoading}
            />
          </Grid>

          <Grid item xs={12}>
            <CustomChipRowStatus
              label={messages['common.status']}
              value={itemData?.row_status}
              isLoading={isLoading}
            />
          </Grid>
        </Grid>
      </CustomDetailsViewMuiModal>
    </>
  );
};
export default Nise3PartnersDetailsPopup;

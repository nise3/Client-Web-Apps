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
import {useFetchJobSector} from '../../../services/organaizationManagement/hooks';

type Props = {
  itemId: number;
  onClose: () => void;
  openEditModal: (id: number) => void;
};

const SliderDetailsPopup = ({itemId, openEditModal, ...props}: Props) => {
  const {data: itemData, isLoading} = useFetchJobSector(itemId);
  const {messages} = useIntl();

  return (
    <>
      <CustomDetailsViewMuiModal
        maxWidth={'md'}
        open={true}
        {...props}
        title={
          <>
            <WorkOutline />
            <IntlMessages id='slider.label' />
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
          <Grid item xs={6}>
            <DetailsInputView
              label={messages['common.title']}
              value={itemData?.title}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={6}>
            <DetailsInputView
              label={messages['common.sub_title']}
              value={itemData?.sub_title}
              isLoading={isLoading}
            />
          </Grid>

          {itemData?.institute_title && (
            <Grid item xs={6}>
              <DetailsInputView
                label={messages['institute_label']}
                value={itemData?.institute_title}
                isLoading={isLoading}
              />
            </Grid>
          )}

          {itemData?.organization_title && (
            <Grid item xs={6}>
              <DetailsInputView
                label={messages['organization_label']}
                value={itemData?.organization_title}
                isLoading={isLoading}
              />
            </Grid>
          )}

          <Grid item xs={6}>
            <DetailsInputView
              label={messages['common.is_button_available']}
              value={itemData?.is_button_available}
              isLoading={isLoading}
            />
          </Grid>

          <Grid item xs={6}>
            <DetailsInputView
              label={messages['common.link']}
              value={itemData?.link}
              isLoading={isLoading}
            />
          </Grid>

          <Grid item xs={6}>
            <DetailsInputView
              label={messages['common.button_text']}
              value={itemData?.button_text}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={6}>
            <DetailsInputView
              label={messages['common.alt_title']}
              value={itemData?.alt_title}
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
export default SliderDetailsPopup;

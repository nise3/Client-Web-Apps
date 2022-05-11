import React from 'react';
import {Grid} from '@mui/material';
import CancelButton from '../../../@softbd/elements/button/CancelButton/CancelButton';
import CustomDetailsViewMuiModal from '../../../@softbd/modals/CustomDetailsViewMuiModal/CustomDetailsViewMuiModal';
import EditButton from '../../../@softbd/elements/button/EditButton/EditButton';
import DetailsInputView from '../../../@softbd/elements/display/DetailsInputView/DetailsInputView';
import {useIntl} from 'react-intl';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import CustomChipRowStatus from '../../../@softbd/elements/display/CustomChipRowStatus/CustomChipRowStatus';
import IconBranch from '../../../@softbd/icons/IconBranch';
import {isBreakPointUp} from '../../../@crema/utility/Utils';
import {useFetchFourIRToT} from '../../../services/4IRManagement/hooks';
import ImageView from '../../../@softbd/elements/display/ImageView/ImageView';

type Props = {
  itemId: number;
  onClose: () => void;
  openEditModal: (id: number) => void;
};

const FourIRToTDetailsPopup = ({itemId, openEditModal, ...props}: Props) => {
  const {messages} = useIntl();
  const {data: itemData, isLoading} = useFetchFourIRToT(itemId);

  return (
    <>
      <CustomDetailsViewMuiModal
        open={true}
        {...props}
        title={
          <>
            <IconBranch />
            <IntlMessages id='4ir_tot.label' />
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
          <Grid item xs={12}>
            <h3 style={{marginTop: '2px', marginBottom: '0'}}>
              {messages['4ir_tot.master_trainer']}
            </h3>
          </Grid>
          <Grid item xs={12} md={6}>
            <DetailsInputView
              label={messages['common.name']}
              value={itemData?.master_trainer_name}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <DetailsInputView
              label={messages['common.mobile']}
              value={itemData?.master_trainer_mobile}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <DetailsInputView
              label={messages['common.address']}
              value={itemData?.master_trainer_address}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <DetailsInputView
              label={messages['common.email']}
              value={itemData?.master_trainer_email}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={12}>
            <h3 style={{marginTop: '2px', marginBottom: '0'}}>
              {messages['4ir_tot.organiser']}
            </h3>
          </Grid>
          <Grid item xs={12} md={6}>
            <DetailsInputView
              label={messages['common.name']}
              value={itemData?.organiser_name}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <DetailsInputView
              label={messages['common.mobile']}
              value={itemData?.organiser_mobile}
              isLoading={isLoading}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <DetailsInputView
              label={messages['common.address']}
              value={itemData?.organiser_address}
              isLoading={isLoading}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <DetailsInputView
              label={messages['common.email']}
              value={itemData?.organiser_email}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={12}>
            <h3 style={{marginTop: '2px', marginBottom: '0'}}>
              {messages['4ir_tot.co_organiser']}
            </h3>
          </Grid>
          <Grid item xs={12} md={6}>
            <DetailsInputView
              label={messages['common.name']}
              value={itemData?.co_organiser_name}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <DetailsInputView
              label={messages['common.mobile']}
              value={itemData?.co_organiser_mobile}
              isLoading={isLoading}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <DetailsInputView
              label={messages['common.address']}
              value={itemData?.co_organiser_address}
              isLoading={isLoading}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <DetailsInputView
              label={messages['common.email']}
              value={itemData?.co_organiser_email}
              isLoading={isLoading}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <ImageView
              label={messages['4ir_tot.participants']}
              imageUrl={itemData?.participants}
              isLoading={isLoading}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <CustomChipRowStatus
              label={messages['common.active_status']}
              value={itemData?.row_status}
              isLoading={isLoading}
            />
          </Grid>
        </Grid>
      </CustomDetailsViewMuiModal>
    </>
  );
};

export default FourIRToTDetailsPopup;

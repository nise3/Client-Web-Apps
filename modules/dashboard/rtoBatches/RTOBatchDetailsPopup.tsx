import React from 'react';
import {Grid} from '@mui/material';
import CancelButton from '../../../@softbd/elements/button/CancelButton/CancelButton';
import CustomDetailsViewMuiModal from '../../../@softbd/modals/CustomDetailsViewMuiModal/CustomDetailsViewMuiModal';
import {useIntl} from 'react-intl';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import DetailsInputView from '../../../@softbd/elements/display/DetailsInputView/DetailsInputView';
import {isBreakPointUp} from '../../../@crema/utility/Utils';
import EditButton from '../../../@softbd/elements/button/EditButton/EditButton';
import {useFetchRTOBatch} from '../../../services/CertificateAuthorityManagement/hooks';
import IconBatch from '../../../@softbd/icons/IconBatch';

type Props = {
  itemId: number;
  onClose: () => void;
  openEditModal: (id: number) => void;
};

const RTOBatchDetailsPopup = ({itemId, openEditModal, ...props}: Props) => {
  const {messages} = useIntl();

  const {data: itemData, isLoading} = useFetchRTOBatch(itemId);

  return (
    <>
      <CustomDetailsViewMuiModal
        {...props}
        open={true}
        title={
          <>
            <IconBatch />
            <IntlMessages id='rto_batch.label' />
          </>
        }
        maxWidth={isBreakPointUp('xl') ? 'lg' : 'md'}
        actions={
          <>
            <CancelButton onClick={props.onClose} isLoading={false} />
            <EditButton
              variant={'contained'}
              onClick={() => openEditModal(itemData?.id)}
              isLoading={isLoading}
            />
          </>
        }>
        <Grid container spacing={5}>
          <Grid item xs={6}>
            <Grid container spacing={5}>
              <Grid item xs={12}>
                <DetailsInputView
                  label={messages['common.title']}
                  value={itemData?.title}
                  isLoading={isLoading}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={6}>
            <Grid container spacing={5}>
              <Grid item xs={12}>
                <DetailsInputView
                  label={messages['common.title_en']}
                  value={itemData?.title_en}
                  isLoading={isLoading}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={6}>
            <Grid container spacing={5}>
              <Grid item xs={12}>
                <DetailsInputView
                  label={messages['certificate_authority.label']}
                  value={itemData?.institutes_title}
                  isLoading={isLoading}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={6}>
            <Grid container spacing={5}>
              <Grid item xs={12}>
                <DetailsInputView
                  label={messages['rpl_sector.label']}
                  value={itemData?.rpl_sector_title}
                  isLoading={isLoading}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={6}>
            <Grid container spacing={5}>
              <Grid item xs={12}>
                <DetailsInputView
                  label={messages['rpl_occupation.label']}
                  value={itemData?.rpl_occupation_title}
                  isLoading={isLoading}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={6}>
            <Grid container spacing={5}>
              <Grid item xs={12}>
                <DetailsInputView
                  label={messages['rpl_level.label']}
                  value={itemData?.rpl_level_title}
                  isLoading={isLoading}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CustomDetailsViewMuiModal>
    </>
  );
};
export default RTOBatchDetailsPopup;

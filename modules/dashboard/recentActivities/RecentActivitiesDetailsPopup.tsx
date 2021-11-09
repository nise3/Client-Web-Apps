import React, {FC} from 'react';
import {useIntl} from 'react-intl';
import {useFetchRecentActivity} from '../../../services/cmsManagement/hooks';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import CancelButton from '../../../@softbd/elements/button/CancelButton/CancelButton';
import EditButton from '../../../@softbd/elements/button/EditButton/EditButton';
import {Grid} from '@mui/material';
import DetailsInputView from '../../../@softbd/elements/display/DetailsInputView/DetailsInputView';
import CustomChipRowStatus from '../../../@softbd/elements/display/CustomChipRowStatus/CustomChipRowStatus';
import CustomDetailsViewMuiModal from '../../../@softbd/modals/CustomDetailsViewMuiModal/CustomDetailsViewMuiModal';

interface RecentActivitiesDetailsPopupProps {
  recentActivityId: number | null;
  onClose: () => void;
  openEditModal: (id: number) => void;
}

const RecentActivitiesDetailsPopup: FC<RecentActivitiesDetailsPopupProps> = ({
  recentActivityId,
  openEditModal,
  ...props
}) => {
  const {messages} = useIntl();
  const {data: recentActivityData, isLoading} =
    useFetchRecentActivity(recentActivityId);

  return (
    <>
      <CustomDetailsViewMuiModal
        open={true}
        {...props}
        title={
          <>
            <IntlMessages id='recent_activities.institute' />
          </>
        }
        actions={
          <>
            <CancelButton onClick={props.onClose} isLoading={isLoading} />
            {recentActivityData && (
              <EditButton
                variant='contained'
                onClick={() => openEditModal(recentActivityData.id)}
                isLoading={isLoading}
              />
            )}
          </>
        }>
        <Grid container spacing={5}>
          <Grid item xs={6}>
            <DetailsInputView
              label={messages['common.title']}
              value={recentActivityData?.title}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={6}>
            <DetailsInputView
              label={messages['common.institute_id']}
              value={recentActivityData?.institute_id}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={6}>
            <DetailsInputView
              label={messages['common.organization_id']}
              value={recentActivityData?.organization_id}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={6}>
            <DetailsInputView
              label={messages['common.description']}
              value={recentActivityData?.description}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={6}>
            <DetailsInputView
              label={messages['common.content_type']}
              value={recentActivityData?.content_type}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={6}>
            <DetailsInputView
              label={messages['common.collage_image_path']}
              value={recentActivityData?.collage_image_path}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={6}>
            <DetailsInputView
              label={messages['common.collage_position']}
              value={recentActivityData?.collage_position}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={6}>
            <DetailsInputView
              label={messages['common.thumb_image_path']}
              value={recentActivityData?.thumb_image_path}
              isLoading={isLoading}
            />
          </Grid>

          <Grid item xs={6}>
            <DetailsInputView
              label={messages['common.grid_image_path']}
              value={recentActivityData?.grid_image_path}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={6}>
            <DetailsInputView
              label={messages['common.image_alt_title']}
              value={recentActivityData?.image_alt_title}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={6}>
            <DetailsInputView
              label={messages['common.content_path']}
              value={recentActivityData?.content_path}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={6}>
            <DetailsInputView
              label={messages['common.content_properties']}
              value={recentActivityData?.content_properties}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={6}>
            <DetailsInputView
              label={messages['common.embedded_id']}
              value={recentActivityData?.embedded_id}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={6}>
            <DetailsInputView
              label={messages['common.embedded_url']}
              value={recentActivityData?.embedded_url}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={6}>
            <CustomChipRowStatus
              label={messages['common.row_status']}
              value={recentActivityData?.row_status}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={6}>
            <DetailsInputView
              label={messages['common.other_language_fields']}
              value={recentActivityData?.other_language_fields}
              isLoading={isLoading}
            />
          </Grid>
        </Grid>
      </CustomDetailsViewMuiModal>
    </>
  );
};

export default RecentActivitiesDetailsPopup;

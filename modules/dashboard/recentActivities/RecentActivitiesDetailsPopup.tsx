import React, {FC} from 'react';
import {useIntl} from 'react-intl';
import {
  useFetchCMSGlobalConfig,
  useFetchRecentActivity,
} from '../../../services/cmsManagement/hooks';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import CancelButton from '../../../@softbd/elements/button/CancelButton/CancelButton';
import EditButton from '../../../@softbd/elements/button/EditButton/EditButton';
import {Grid} from '@mui/material';
import DetailsInputView from '../../../@softbd/elements/display/DetailsInputView/DetailsInputView';
import CustomChipRowStatus from '../../../@softbd/elements/display/CustomChipRowStatus/CustomChipRowStatus';
import CustomDetailsViewMuiModal from '../../../@softbd/modals/CustomDetailsViewMuiModal/CustomDetailsViewMuiModal';
import {getLanguageLabel} from '../../../@softbd/utilities/helpers';
import LanguageCodes from '../../../@softbd/utilities/LanguageCodes';
import ContentTypes from './ContentTypes';

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
  const {data: cmsGlobalConfig} = useFetchCMSGlobalConfig();

  const getContentTypeTitle = (contentType: number) => {
    switch (contentType) {
      case ContentTypes.IMAGE:
        return messages['content_type.image'];
      case ContentTypes.VIDEO:
        return messages['content_type.video'];
      case ContentTypes.YOUTUBE_SOURCE:
        return messages['content_type.youtube_video'];
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
              label={messages['common.show_in']}
              value={recentActivityData?.show_in_label}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={6}>
            <DetailsInputView
              label={messages['institute.label']}
              value={recentActivityData?.institute_title}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={6}>
            <DetailsInputView
              label={messages['organization.label']}
              value={recentActivityData?.organization_title}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={6}>
            <DetailsInputView
              label={messages['common.content_type']}
              value={getContentTypeTitle(recentActivityData?.content_type)}
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

          <Grid item xs={12}>
            <fieldset>
              <legend>
                {getLanguageLabel(
                  cmsGlobalConfig?.language_configs,
                  LanguageCodes.BANGLA,
                )}
              </legend>
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
                    label={messages['common.image_alt_title']}
                    value={recentActivityData?.image_alt_title}
                    isLoading={isLoading}
                  />
                </Grid>
                <Grid item xs={12}>
                  <DetailsInputView
                    label={messages['common.description']}
                    value={
                      <div
                        dangerouslySetInnerHTML={{
                          __html: recentActivityData?.description,
                        }}
                      />
                    }
                    isLoading={isLoading}
                  />
                </Grid>
              </Grid>
            </fieldset>
          </Grid>

          {Object.keys(recentActivityData?.other_language_fields || {}).map(
            (key: string) => (
              <Grid item xs={12} key={key}>
                <fieldset>
                  <legend>
                    {getLanguageLabel(cmsGlobalConfig?.language_configs, key)}
                  </legend>
                  <Grid container spacing={5}>
                    <Grid item xs={6}>
                      <DetailsInputView
                        label={messages['common.title']}
                        value={
                          recentActivityData.other_language_fields[key]?.title
                        }
                        isLoading={isLoading}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <DetailsInputView
                        label={messages['common.image_alt_title']}
                        value={
                          recentActivityData.other_language_fields[key]
                            ?.image_alt_title
                        }
                        isLoading={isLoading}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <DetailsInputView
                        label={messages['common.description']}
                        value={
                          <div
                            dangerouslySetInnerHTML={{
                              __html:
                                recentActivityData.other_language_fields[key]
                                  ?.description,
                            }}
                          />
                        }
                        isLoading={isLoading}
                      />
                    </Grid>
                  </Grid>
                </fieldset>
              </Grid>
            ),
          )}

          <Grid item xs={6}>
            <CustomChipRowStatus
              label={messages['common.row_status']}
              value={recentActivityData?.row_status}
              isLoading={isLoading}
            />
          </Grid>
        </Grid>
      </CustomDetailsViewMuiModal>
    </>
  );
};

export default RecentActivitiesDetailsPopup;

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
import {
  getLanguageLabel,
  getMomentDateFormat,
} from '../../../@softbd/utilities/helpers';
import LanguageCodes from '../../../@softbd/utilities/LanguageCodes';
import ContentTypes from './ContentTypes';

interface RecentActivitiesDetailsPopupProps {
  itemId: number | null;
  onClose: () => void;
  openEditModal: (id: number) => void;
}

const RecentActivitiesDetailsPopup: FC<RecentActivitiesDetailsPopupProps> = ({
  itemId,
  openEditModal,
  ...props
}) => {
  const {messages} = useIntl();
  const {data: itemData, isLoading} = useFetchRecentActivity(itemId);
  const {data: cmsGlobalConfig} = useFetchCMSGlobalConfig();

  const getContentTypeTitle = (contentType: number) => {
    switch (contentType) {
      case ContentTypes.IMAGE:
        return messages['content_type.image'];
      case ContentTypes.FACEBOOK_SOURCE:
        return messages['content_type.facebook_video'];
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
              label={messages['common.show_in']}
              value={itemData?.show_in_label}
              isLoading={isLoading}
            />
          </Grid>
          {itemData?.institute_title && (
            <Grid item xs={6}>
              <DetailsInputView
                label={messages['institute.label']}
                value={itemData?.institute_title}
                isLoading={isLoading}
              />
            </Grid>
          )}
          {itemData?.organization_title && (
            <Grid item xs={6}>
              <DetailsInputView
                label={messages['organization.label']}
                value={itemData?.organization_title}
                isLoading={isLoading}
              />
            </Grid>
          )}
          <Grid item xs={6}>
            <DetailsInputView
              label={messages['common.content_type']}
              value={getContentTypeTitle(itemData?.content_type)}
              isLoading={isLoading}
            />
          </Grid>

          <Grid item xs={6}>
            <DetailsInputView
              label={messages['common.content_path']}
              value={itemData?.content_path}
              isLoading={isLoading}
            />
          </Grid>

          <Grid item xs={6}>
            <DetailsInputView
              label={messages['common.collage_position']}
              value={itemData?.collage_position}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={6}>
            <DetailsInputView
              label={messages['common.collage_image_path']}
              value={itemData?.collage_image_path}
              isLoading={isLoading}
            />
          </Grid>

          <Grid item xs={6}>
            <DetailsInputView
              label={messages['common.grid_image_path']}
              value={itemData?.grid_image_path}
              isLoading={isLoading}
            />
          </Grid>

          <Grid item xs={6}>
            <DetailsInputView
              label={messages['common.thumb_image_path']}
              value={itemData?.thumb_image_path}
              isLoading={isLoading}
            />
          </Grid>

          <Grid item xs={6}>
            <DetailsInputView
              label={messages['common.embedded_id']}
              value={itemData?.embedded_id}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={6}>
            <DetailsInputView
              label={messages['common.embedded_url']}
              value={itemData?.embedded_url}
              isLoading={isLoading}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <DetailsInputView
              label={messages['common.publish_at']}
              value={
                itemData?.published_at
                  ? getMomentDateFormat(itemData.published_at, 'YYYY-MM-DD')
                  : ''
              }
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <DetailsInputView
              label={messages['common.archived_at']}
              value={
                itemData?.archived_at
                  ? getMomentDateFormat(itemData.archived_at, 'YYYY-MM-DD')
                  : ''
              }
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
                    value={itemData?.title}
                    isLoading={isLoading}
                  />
                </Grid>
                <Grid item xs={6}>
                  <DetailsInputView
                    label={messages['common.image_alt_title']}
                    value={itemData?.image_alt_title}
                    isLoading={isLoading}
                  />
                </Grid>
                <Grid item xs={12}>
                  <DetailsInputView
                    label={messages['common.description']}
                    value={
                      <div
                        dangerouslySetInnerHTML={{
                          __html: itemData?.description,
                        }}
                      />
                    }
                    isLoading={isLoading}
                  />
                </Grid>
              </Grid>
            </fieldset>
          </Grid>

          {Object.keys(itemData?.other_language_fields || {}).map(
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
                        value={itemData.other_language_fields[key]?.title}
                        isLoading={isLoading}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <DetailsInputView
                        label={messages['common.image_alt_title']}
                        value={
                          itemData.other_language_fields[key]?.image_alt_title
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
                                itemData.other_language_fields[key]
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
              value={itemData?.row_status}
              isLoading={isLoading}
            />
          </Grid>
        </Grid>
      </CustomDetailsViewMuiModal>
    </>
  );
};

export default RecentActivitiesDetailsPopup;

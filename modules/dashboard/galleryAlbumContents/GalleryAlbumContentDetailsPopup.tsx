import React from 'react';
import {Grid} from '@mui/material';
import CancelButton from '../../../@softbd/elements/button/CancelButton/CancelButton';
import CustomDetailsViewMuiModal from '../../../@softbd/modals/CustomDetailsViewMuiModal/CustomDetailsViewMuiModal';
import EditButton from '../../../@softbd/elements/button/EditButton/EditButton';
import DetailsInputView from '../../../@softbd/elements/display/DetailsInputView/DetailsInputView';
import {useIntl} from 'react-intl';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import IconGallery from '../../../@softbd/icons/IconGallery';
import DecoratedRowStatus from '../../../@softbd/elements/display/DecoratedRowStatus/DecoratedRowStatus';
import {
  useFetchCMSGlobalConfig,
  useFetchGalleryAlbumContent,
} from '../../../services/cmsManagement/hooks';
import GalleryAlbumContentTypes from './GalleryAlbumContentTypes';
import {
  getLanguageLabel,
  getMomentDateFormat,
} from '../../../@softbd/utilities/helpers';
import LanguageCodes from '../../../@softbd/utilities/LanguageCodes';

type Props = {
  itemId: number;
  onClose: () => void;
  openEditModal: (id: number) => void;
};

const GalleryAlbumContentDetailsPopup = ({
  itemId,
  openEditModal,
  ...props
}: Props) => {
  const {messages} = useIntl();
  const {data: itemData, isLoading} = useFetchGalleryAlbumContent(itemId);
  const {data: cmsGlobalConfig} = useFetchCMSGlobalConfig();

  const getContentTypeTitle = (contentType: number) => {
    switch (contentType) {
      case GalleryAlbumContentTypes.IMAGE:
        return messages['common.image'];
      case GalleryAlbumContentTypes.VIDEO:
        return messages['common.video'];
      default:
        return '';
    }
  };

  const getVideoTypeTitle = (videoType: number) => {
    switch (videoType) {
      case 1:
        return messages['common.youtube'];
      case 2:
        return messages['common.facebook'];
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
            <IconGallery />
            <IntlMessages id='galleries.institute' />
          </>
        }
        maxWidth={'md'}
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
          <Grid item xs={12} md={6}>
            <DetailsInputView
              label={messages['common.gallery_album']}
              value={itemData?.gallery_album_title}
              isLoading={isLoading}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <DetailsInputView
              label={messages['gallery_album.featured_status']}
              value={
                itemData?.featured == 1
                  ? messages['common.yes']
                  : messages['common.no']
              }
              isLoading={isLoading}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <DetailsInputView
              label={messages['common.content_type']}
              value={getContentTypeTitle(itemData?.content_type)}
              isLoading={isLoading}
            />
          </Grid>

          {itemData?.content_type == GalleryAlbumContentTypes.IMAGE && (
            <Grid item xs={12} md={6}>
              <DetailsInputView
                label={messages['common.content_path']}
                value={itemData?.content_path}
                isLoading={isLoading}
              />
            </Grid>
          )}

          {itemData?.content_type == GalleryAlbumContentTypes.VIDEO && (
            <React.Fragment>
              <Grid item xs={12} md={6}>
                <DetailsInputView
                  label={messages['common.video_type']}
                  value={getVideoTypeTitle(itemData?.video_type)}
                  isLoading={isLoading}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <DetailsInputView
                  label={messages['common.embedded_id']}
                  value={itemData?.embedded_id}
                  isLoading={isLoading}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <DetailsInputView
                  label={messages['common.embedded_url']}
                  value={itemData?.embedded_url}
                  isLoading={isLoading}
                />
              </Grid>
            </React.Fragment>
          )}

          <Grid item xs={12} md={6}>
            <DetailsInputView
              label={messages['common.main_image_path']}
              value={itemData?.content_cover_image_url}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <DetailsInputView
              label={messages['common.grid_image_path']}
              value={itemData?.content_grid_image_url}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <DetailsInputView
              label={messages['common.thumb_image_path']}
              value={itemData?.content_thumb_image_url}
              isLoading={isLoading}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <DetailsInputView
              label={messages['common.publish_at']}
              value={
                itemData?.published_at
                  ? getMomentDateFormat(itemData?.published_at, 'DD MMM, YYYY')
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
                  ? getMomentDateFormat(itemData?.archived_at, 'DD MMM, YYYY')
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
                <Grid item xs={12} md={6}>
                  <DetailsInputView
                    label={messages['common.content_title']}
                    value={itemData?.content_title}
                    isLoading={isLoading}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <DetailsInputView
                    label={messages['gallery_album.image_alt_title']}
                    value={itemData?.image_alt_title}
                    isLoading={isLoading}
                  />
                </Grid>
                <Grid item xs={12}>
                  <DetailsInputView
                    label={messages['common.content_description']}
                    value={
                      <div
                        dangerouslySetInnerHTML={{
                          __html: itemData?.content_description,
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
                    <Grid item xs={12} md={6}>
                      <DetailsInputView
                        label={messages['common.content_title']}
                        value={
                          itemData.other_language_fields[key]?.content_title
                        }
                        isLoading={isLoading}
                      />
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <DetailsInputView
                        label={messages['gallery_album.image_alt_title']}
                        value={
                          itemData.other_language_fields[key]?.image_alt_title
                        }
                        isLoading={isLoading}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <DetailsInputView
                        label={messages['common.content_description']}
                        value={
                          <div
                            dangerouslySetInnerHTML={{
                              __html:
                                itemData.other_language_fields[key]
                                  ?.content_description,
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

          <Grid item xs={12}>
            <DetailsInputView
              label={messages['common.status']}
              value={<DecoratedRowStatus rowStatus={itemData?.row_status} />}
              isLoading={isLoading}
            />
          </Grid>
        </Grid>
      </CustomDetailsViewMuiModal>
    </>
  );
};

export default GalleryAlbumContentDetailsPopup;

import React from 'react';
import {Grid} from '@mui/material';
import CancelButton from '../../../@softbd/elements/button/CancelButton/CancelButton';
import CustomDetailsViewMuiModal from '../../../@softbd/modals/CustomDetailsViewMuiModal/CustomDetailsViewMuiModal';
import EditButton from '../../../@softbd/elements/button/EditButton/EditButton';
import DetailsInputView from '../../../@softbd/elements/display/DetailsInputView/DetailsInputView';
import {useIntl} from 'react-intl';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import IconGallery from '../../../@softbd/icons/IconGallery';
import {
  useFetchCMSGlobalConfig,
  useFetchGalleryAlbum,
} from '../../../services/cmsManagement/hooks';
import DecoratedRowStatus from '../../../@softbd/elements/display/DecoratedRowStatus/DecoratedRowStatus';
import AlbumTypes from './AlbumTypes';
import {getLanguageLabel} from '../../../@softbd/utilities/helpers';
import LanguageCodes from '../../../@softbd/utilities/LanguageCodes';

type Props = {
  itemId: number;
  onClose: () => void;
  openEditModal: (id: number) => void;
};

const GalleryAlbumDetailsPopup = ({itemId, openEditModal, ...props}: Props) => {
  const {messages} = useIntl();
  const {data: itemData, isLoading} = useFetchGalleryAlbum(itemId);
  const {data: cmsGlobalConfig} = useFetchCMSGlobalConfig();

  const getAlbumTypeTitle = (albumType: number) => {
    switch (albumType) {
      case AlbumTypes.IMAGE:
        return messages['album_type.image'];
      case AlbumTypes.VIDEO:
        return messages['album_type.video'];
      case AlbumTypes.MIXED:
        return messages['album_type.mixed'];
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
        maxWidth={'sm'}
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
          <Grid item xs={6}>
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
          <Grid item xs={6}>
            <DetailsInputView
              label={messages['gallery_album.album_type']}
              value={getAlbumTypeTitle(itemData?.album_type)}
              isLoading={isLoading}
            />
          </Grid>

          <Grid item xs={6}>
            <DetailsInputView
              label={messages['gallery_album.parent_gallery_album']}
              value={itemData?.parent_gallery_album_id}
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
              label={messages['common.publish_at']}
              value={itemData?.published_at}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={6}>
            <DetailsInputView
              label={messages['common.archived_at']}
              value={itemData?.archived_at}
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
                    label={messages['gallery_album.image_alt_title']}
                    value={itemData?.image_alt_title}
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
                        label={messages['gallery_album.image_alt_title']}
                        value={
                          itemData.other_language_fields[key]?.image_alt_title
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

export default GalleryAlbumDetailsPopup;

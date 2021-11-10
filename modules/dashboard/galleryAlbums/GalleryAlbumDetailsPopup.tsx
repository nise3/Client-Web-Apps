import React from 'react';
import {Grid} from '@mui/material';
import CancelButton from '../../../@softbd/elements/button/CancelButton/CancelButton';
import CustomDetailsViewMuiModal from '../../../@softbd/modals/CustomDetailsViewMuiModal/CustomDetailsViewMuiModal';
import EditButton from '../../../@softbd/elements/button/EditButton/EditButton';
import DetailsInputView from '../../../@softbd/elements/display/DetailsInputView/DetailsInputView';
import {useIntl} from 'react-intl';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import IconGallery from '../../../@softbd/icons/IconGallery';
import {useFetchGalleryAlbum} from '../../../services/cmsManagement/hooks';
import {showIns, albumTypes, features} from './GalleryAlbumAddEditPopup';
import DecoratedRowStatus from '../../../@softbd/elements/display/DecoratedRowStatus/DecoratedRowStatus';

type Props = {
  itemId: number;
  onClose: () => void;
  openEditModal: (id: number) => void;
};

const GalleryAlbumDetailsPopup = ({itemId, openEditModal, ...props}: Props) => {
  const {messages} = useIntl();
  const {data: itemData, isLoading} = useFetchGalleryAlbum(itemId);
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
              value={showIns[itemData?.show_in - 1]?.label}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={6}>
            <DetailsInputView
              label={messages['common.title']}
              value={itemData?.title}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={6}>
            <DetailsInputView
              label={messages['gallery_album.featured_status']}
              value={features[itemData?.featured]?.label}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={6}>
            <DetailsInputView
              label={messages['gallery_album.album_type']}
              value={albumTypes[itemData?.album_type - 1]?.label}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={6}>
            <DetailsInputView
              label={messages['institute.label']}
              value={itemData?.institute_title}
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
          <Grid item xs={6}>
            <DetailsInputView
              label={messages['organization.label']}
              value={itemData?.organization_title}
              isLoading={isLoading}
            />
          </Grid>

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

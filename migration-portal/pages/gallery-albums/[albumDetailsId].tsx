import asyncComponent from '../../../@crema/utility/asyncComponent';
import PageMeta from '../../../@crema/core/PageMeta';
import React from 'react';
import {useIntl} from 'react-intl';
import MigrationPortalDefaultFrontPage from "../../../@softbd/layouts/hoc/MigrationPortalDefaultFrontPage";

const GalleryAlbumDetails = asyncComponent(
  () => import('../../../modules/migrationPortal/gallery/GalleryAlbumDetails'),
);
export default MigrationPortalDefaultFrontPage(() => {
  const {messages} = useIntl();
  return (
    <>
      <PageMeta title={messages['common.gallery_album'] as string} />
      <GalleryAlbumDetails />
    </>
  );
});

import asyncComponent from '../../../@crema/utility/asyncComponent';
import PageMeta from '../../../@crema/core/PageMeta';
import DashboardPage from '../../../@softbd/layouts/hoc/DashboardPage';
import React from 'react';
import {useIntl} from 'react-intl';

const VideosPage = asyncComponent(
  () =>
    import(
      '../../../modules/dashboard/galleryAlbumContents/GalleryAlbumContentsPage'
    ),
);
export default DashboardPage(() => {
  const {messages} = useIntl();
  return (
    <>
      <PageMeta title={messages['gallery_album_content.label']} />
      <VideosPage />
    </>
  );
});

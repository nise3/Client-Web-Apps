import InstituteDefaultFrontPage from '../../../@softbd/layouts/hoc/InstituteDefaultFrontPage';
import asyncComponent from '../../../@crema/utility/asyncComponent';
import PageMeta from '../../../@crema/core/PageMeta';
import React from 'react';
import {useIntl} from 'react-intl';

const GalleryAlbumDetails = asyncComponent(
  () => import('../../../modules/institute/gallery/GalleryAlbumDetails'),
);
export default InstituteDefaultFrontPage(() => {
  const {messages} = useIntl();
  return (
    <>
      <PageMeta title={messages['common.gallery_album'] as string} />
      <GalleryAlbumDetails />
    </>
  );
});

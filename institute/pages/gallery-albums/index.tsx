import asyncComponent from '../../../@crema/utility/asyncComponent';
import InstituteDefaultFrontPage from '../../../@softbd/layouts/hoc/InstituteDefaultFrontPage';
import React from 'react';
import PageMeta from '../../../@crema/core/PageMeta';
import {useIntl} from 'react-intl';

const InstituteGallery = asyncComponent(
  () => import('../../../modules/institute/gallery'),
);

export default InstituteDefaultFrontPage(() => {
  const {messages} = useIntl();
  return (
    <>
      <PageMeta title={messages['common.gallery_album'] as string} />
      <InstituteGallery />;
    </>
  );
});

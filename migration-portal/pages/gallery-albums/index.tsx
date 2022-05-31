import asyncComponent from '../../../@crema/utility/asyncComponent';
import React from 'react';
import PageMeta from '../../../@crema/core/PageMeta';
import {useIntl} from 'react-intl';
import MigrationPortalDefaultFrontPage from "../../../@softbd/layouts/hoc/MigrationPortalDefaultFrontPage";

const MigrationPortalGallery = asyncComponent(
  () => import('../../../modules/migrationPortal/gallery'),
);

export default MigrationPortalDefaultFrontPage(() => {
  const {messages} = useIntl();
  return (
    <>
      <PageMeta title={messages['common.gallery_album'] as string} />
      <MigrationPortalGallery />
    </>
  );
});

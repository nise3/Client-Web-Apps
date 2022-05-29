import asyncComponent from '../../@crema/utility/asyncComponent';
import MigrationPortalDefaultFrontPage from '../../@softbd/layouts/hoc/MigrationPortalDefaultFrontPage';
import React from 'react';
import {useIntl} from 'react-intl';
import PageMeta from '../../@crema/core/PageMeta';

const MigrationPortal = asyncComponent(
  () => import('../../modules/migrationPortal'),
);

export default MigrationPortalDefaultFrontPage(() => {
  const {messages} = useIntl();
  return (
    <>
      <PageMeta title={messages['migration_portal.label'] as string} />
      <MigrationPortal />
    </>
  );
});

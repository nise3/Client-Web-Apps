import asyncComponent from '../../../@crema/utility/asyncComponent';
import PageMeta from '../../../@crema/core/PageMeta';
import React from 'react';
import {useIntl} from 'react-intl';
import MigrationPortalDefaultFrontPage from '../../../@softbd/layouts/hoc/MigrationPortalDefaultFrontPage';

const MigrationPortalTrainingLinks = asyncComponent(
  () => import('../../../modules/migrationPortal/trainingLinks'),
);
export default MigrationPortalDefaultFrontPage(() => {
  const {messages} = useIntl();
  return (
    <>
      <PageMeta title={messages['migration_portal.training_links'] as string} />
      <MigrationPortalTrainingLinks />
    </>
  );
});

import asyncComponent from '../../../@crema/utility/asyncComponent';
import MigrationPortalDefaultFrontPage from '../../../@softbd/layouts/hoc/MigrationPortalDefaultFrontPage';
import React from 'react';
import PageMeta from '../../../@crema/core/PageMeta';
import {useIntl} from 'react-intl';

const MigrationPortalExpatriateWorkerMonitoring = asyncComponent(
  () => import('../../../modules/migrationPortal/expatriateWorkerMonitoring'),
);

export default MigrationPortalDefaultFrontPage(() => {
  const {messages} = useIntl();
  return (
    <>
      <PageMeta
        title={
          messages['migration_portal.expatriate_worker_monitoring'] as string
        }
      />
      <MigrationPortalExpatriateWorkerMonitoring />
    </>
  );
});

// import asyncComponent from '../../../@crema/utility/asyncComponent';
import MigrationPortalDefaultFrontPage from '../../../@softbd/layouts/hoc/MigrationPortalDefaultFrontPage';
import React from 'react';
import PageMeta from '../../../@crema/core/PageMeta';
import {useIntl} from 'react-intl';
import dynamic from 'next/dynamic';

const MigrationPortalExpatriateWorkerMonitoring = dynamic(
  () => import('../../../modules/migrationPortal/expatriateWorkerMonitoring'),{
      ssr: false
    }
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

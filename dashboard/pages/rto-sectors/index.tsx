import asyncComponent from '../../../@crema/utility/asyncComponent';
import PageMeta from '../../../@crema/core/PageMeta';
import DashboardPage from '../../../@softbd/layouts/hoc/DashboardPage';
import React from 'react';
import {useIntl} from 'react-intl';

const RTOSectorsPage = asyncComponent(
  () => import('../../../modules/dashboard/rtoSectors/RTOSectorsPage'),
);
export default DashboardPage(() => {
  const {messages} = useIntl();

  return (
    <>
      <PageMeta title={messages['rto-sectors.label']} />
      <RTOSectorsPage />
    </>
  );
});

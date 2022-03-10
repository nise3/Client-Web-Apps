import asyncComponent from '../../../@crema/utility/asyncComponent';
import PageMeta from '../../../@crema/core/PageMeta';
import DashboardPage from '../../../@softbd/layouts/hoc/DashboardPage';
import React from 'react';
import {useIntl} from 'react-intl';

const NisePublicationsPage = asyncComponent(
  () =>
    import('../../../modules/dashboard/nisePublications/nisePublicationsPage'),
);
export default DashboardPage(() => {
  const {messages} = useIntl();
  return (
    <>
      <PageMeta title={messages['publication.label']} />
      <NisePublicationsPage />
    </>
  );
});

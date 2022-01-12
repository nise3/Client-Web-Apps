import asyncComponent from '../../../@crema/utility/asyncComponent';
import PageMeta from '../../../@crema/core/PageMeta';
import DashboardPage from '../../../@softbd/layouts/hoc/DashboardPage';
import React from 'react';
import {useIntl} from 'react-intl';

//Todo: have to remove member list, this is not necessary
const ApplicationListPage = asyncComponent(
  () =>
    import('../../../modules/dashboard/applicationsList/ApplicationListPage'),
);
export default DashboardPage(() => {
  const {messages} = useIntl();
  return (
    <>
      <PageMeta title={messages['application_list.label'] as string} />
      <ApplicationListPage />
    </>
  );
});

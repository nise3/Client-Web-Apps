import React from 'react';
import asyncComponent from '../../../../@crema/utility/asyncComponent';
import PageMeta from '../../../../@crema/core/PageMeta';
import DashboardPage from '../../../../@softbd/layouts/hoc/DashboardPage';
import {useIntl} from 'react-intl';

const YouthJobApprovalYouthListPage = asyncComponent(
  () =>
    import(
      '../../../../modules/dashboard/jobRequirements/InstituteProvidedYouthList'
    ),
);
export default DashboardPage(() => {
  const {messages} = useIntl();
  return (
    <>
      <PageMeta title={messages['common.youth_approval']} />
      <YouthJobApprovalYouthListPage />
    </>
  );
});

import asyncComponent from '../../../@crema/utility/asyncComponent';
import PageMeta from '../../../@crema/core/PageMeta';
import DashboardPage from '../../../@softbd/layouts/hoc/DashboardPage';
import React from 'react';
import {useIntl} from 'react-intl';

const AssessmentManagementPage = asyncComponent(
  () =>
    import(
      '../../../modules/dashboard/assessmentManagement/AssessmentManagementPage'
    ),
);
export default DashboardPage(() => {
  const {messages} = useIntl();
  return (
    <>
      <PageMeta title={messages['assessmentManagement.label'] as string} />
      <AssessmentManagementPage />
    </>
  );
});

import asyncComponent from '../../../@crema/utility/asyncComponent';
import PageMeta from '../../../@crema/core/PageMeta';
import DashboardPage from '../../../@softbd/layouts/hoc/DashboardPage';
import React from 'react';
import {useIntl} from 'react-intl';

const RPLAssessmentManagementPage = asyncComponent(
  () =>
    import(
      '../../../modules/dashboard/rplAssessmentManagement/RPLAssessmentManagementPage'
    ),
);
export default DashboardPage(() => {
  const {messages} = useIntl();
  return (
    <>
      <PageMeta title={messages['assessmentManagement.label'] as string} />
      <RPLAssessmentManagementPage />
    </>
  );
});

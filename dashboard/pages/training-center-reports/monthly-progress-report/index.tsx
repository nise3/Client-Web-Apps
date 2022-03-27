import asyncComponent from '../../../../@crema/utility/asyncComponent';
import PageMeta from '../../../../@crema/core/PageMeta';
import DashboardPage from '../../../../@softbd/layouts/hoc/DashboardPage';
import React from 'react';
import {useIntl} from 'react-intl';

const SkillDevelopmentMonthlyReportCreatePage = asyncComponent(
  () =>
    import(
      '../../../../modules/dashboard/trainingCenterReports/MonthlyProgressReportPage'
    ),
);
export default DashboardPage(() => {
  const {messages} = useIntl();
  return (
    <>
      <PageMeta title={messages['skill_development_report.label']} />
      <SkillDevelopmentMonthlyReportCreatePage />
    </>
  );
});

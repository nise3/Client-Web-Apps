import asyncComponent from '../../../@crema/utility/asyncComponent';
import PageMeta from '../../../@crema/core/PageMeta';
import DashboardPage from '../../../@softbd/layouts/hoc/DashboardPage';
import React from 'react';
import {useIntl} from 'react-intl';

const TrainingCenterProgressReportCreate = asyncComponent(
  () =>
    import(
      '../../../modules/dashboard/trainingCenterProgressReportCombined/ProgressReportCreate'
    ),
);
export default DashboardPage(() => {
  const {messages} = useIntl();
  return (
    <>
      <PageMeta
        title={messages['training_center_progress_report_combined.label']}
      />
      <TrainingCenterProgressReportCreate />
    </>
  );
});

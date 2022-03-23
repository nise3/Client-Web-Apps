import React from 'react';
import {useIntl} from 'react-intl';
import asyncComponent from '../../../../@crema/utility/asyncComponent';
import DashboardPage from '../../../../@softbd/layouts/hoc/DashboardPage';
import PageMeta from '../../../../@crema/core/PageMeta';

const TrainingCenterProgressReportCreate = asyncComponent(
  () =>
    import(
      '../../../../modules/dashboard/trainingCenterProgressReportCombined/ProgressReportCreate'
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

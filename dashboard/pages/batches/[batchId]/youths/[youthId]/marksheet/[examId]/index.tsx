import React from 'react';
import {useIntl} from 'react-intl';
import DashboardPage from '../../../../../../../../@softbd/layouts/hoc/DashboardPage';
import PageMeta from '../../../../../../../../@crema/core/PageMeta';
import asyncComponent from '../../../../../../../../@crema/utility/asyncComponent';

const BatchesPage = asyncComponent(
  () =>
    import(
      '../../../../../../../../modules/dashboard/batches/ExamMarkSheet/ExamMarkSheetView'
    ),
);
export default DashboardPage(() => {
  const {messages} = useIntl();

  return (
    <>
      <PageMeta title={messages['batches.label']} />
      <BatchesPage />
    </>
  );
});

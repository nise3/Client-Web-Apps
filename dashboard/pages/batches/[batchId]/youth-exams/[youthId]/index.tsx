import React from 'react';
import {useIntl} from 'react-intl';
import DashboardPage from '../../../../../../@softbd/layouts/hoc/DashboardPage';
import PageMeta from '../../../../../../@crema/core/PageMeta';
import asyncComponent from '../../../../../../@crema/utility/asyncComponent';

const YouthAllExamListPage = asyncComponent(
  () =>
    import('../../../../../../modules/dashboard/batches/YouthAllExamListPage'),
);
export default DashboardPage(() => {
  const {messages} = useIntl();

  return (
    <>
      <PageMeta title={messages['common.marks_distribution'] as string} />
      <YouthAllExamListPage />
    </>
  );
});

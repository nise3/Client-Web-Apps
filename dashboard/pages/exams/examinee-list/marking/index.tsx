import asyncComponent from '../../../../../@crema/utility/asyncComponent';
import PageMeta from '../../../../../@crema/core/PageMeta';
import DashboardPage from '../../../../../@softbd/layouts/hoc/DashboardPage';
import React from 'react';
import {useIntl} from 'react-intl';

const MarkingViewPage = asyncComponent(
  () =>
    import(
      '../../../../../modules/dashboard/exams/examineeList/ExamMarking/ExamMarkingViewPage'
    ),
);
export default DashboardPage(() => {
  const {messages} = useIntl();
  return (
    <>
      <PageMeta title={messages['common.marks_distribution'] as string} />
      <MarkingViewPage />
    </>
  );
});

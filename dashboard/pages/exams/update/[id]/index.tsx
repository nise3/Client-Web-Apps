import asyncComponent from '../../../../../@crema/utility/asyncComponent';
import PageMeta from '../../../../../@crema/core/PageMeta';
import DashboardPage from '../../../../../@softbd/layouts/hoc/DashboardPage';
import React from 'react';
import {useIntl} from 'react-intl';

const ExamUpdatePage = asyncComponent(
  () =>
    import(
      '../../../../../modules/dashboard/exams/examCreateUpdate/ExamAddEditPage'
    ),
);
export default DashboardPage(() => {
  const {messages} = useIntl();
  return (
    <>
      <PageMeta title={messages['exam.label'] as string} />
      <ExamUpdatePage />
    </>
  );
});

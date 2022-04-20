import asyncComponent from '../../../../../@crema/utility/asyncComponent';
import PageMeta from '../../../../../@crema/core/PageMeta';
import DashboardPage from '../../../../../@softbd/layouts/hoc/DashboardPage';
import React from 'react';
import {useIntl} from 'react-intl';

const ExamMarkSheetPage = asyncComponent(
  () =>
    import(
      '../../../../../modules/dashboard/exams/youthList/ExamMarkSheet/ExamMarkSheetView'
    ),
);
export default DashboardPage(() => {
  const {messages} = useIntl();
  return (
    <>
      <PageMeta title={messages['common.answer_sheet'] as string} />
      <ExamMarkSheetPage />
    </>
  );
});

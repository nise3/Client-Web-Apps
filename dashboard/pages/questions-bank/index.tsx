import DashboardPage from '../../../@softbd/layouts/hoc/DashboardPage';
import {useIntl} from 'react-intl';
import PageMeta from '../../../@crema/core/PageMeta';
import React from 'react';
import asyncComponent from '../../../@crema/utility/asyncComponent';

const QuestionsBank = asyncComponent(
  () => import('../../../modules/dashboard/questionsBank/QuestionsBankPage'),
);

export default DashboardPage(() => {
  const {messages} = useIntl();
  return (
    <>
      <PageMeta title={messages['question-bank.label']} />
      <QuestionsBank />
    </>
  );
});

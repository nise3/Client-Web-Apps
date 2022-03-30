import asyncComponent from '../../../@crema/utility/asyncComponent';
import PageMeta from '../../../@crema/core/PageMeta';
import DashboardPage from '../../../@softbd/layouts/hoc/DashboardPage';
import React from 'react';
import {useIntl} from 'react-intl';

const RPLAssessmentQuestionSetPage = asyncComponent(
  () =>
    import(
      '../../../modules/dashboard/rplAssessmentQuestionSets/RPLAssessmentQuestionSetPage'
    ),
);
export default DashboardPage(() => {
  const {messages} = useIntl();
  return (
    <>
      <PageMeta title={messages['assessment_question_set.label']} />
      <RPLAssessmentQuestionSetPage />
    </>
  );
});

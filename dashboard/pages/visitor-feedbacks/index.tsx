import asyncComponent from '../../../@crema/utility/asyncComponent';
import PageMeta from '../../../@crema/core/PageMeta';
import DashboardPage from '../../../@softbd/layouts/hoc/DashboardPage';
import React from 'react';
import {useIntl} from 'react-intl';

const VisitorFeedbackPage = asyncComponent(
  () =>
    import('../../../modules/dashboard/visitorFeedbacks/VisitorFeedbackPage'),
);
export default DashboardPage(() => {
  const {messages} = useIntl();
  return (
    <>
      <PageMeta title={messages['visitor_feedback.label'] as string} />
      <VisitorFeedbackPage />
    </>
  );
});

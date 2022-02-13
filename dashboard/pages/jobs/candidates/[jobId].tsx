import asyncComponent from '../../../../@crema/utility/asyncComponent';
import DashboardPage from '../../../../@softbd/layouts/hoc/DashboardPage';
import {useIntl} from 'react-intl';
import PageMeta from '../../../../@crema/core/PageMeta';
import React from 'react';

const JobCandidatesPage = asyncComponent(
  () => import('../../../../modules/dashboard/candidates/CandidatePageV1'),
);

export default DashboardPage(() => {
  const {messages} = useIntl();
  return (
    <>
      <PageMeta title={messages['common.candidates'] as string} />
      <JobCandidatesPage />
    </>
  );
});

import asyncComponent from '../../../@crema/utility/asyncComponent';
import DashboardPage from '../../../@softbd/layouts/hoc/DashboardPage';
import {useIntl} from 'react-intl';
import PageMeta from '../../../@crema/core/PageMeta';
import React from 'react';

const JobIdCandidates = asyncComponent(
  () => import('../../../modules/dashboard/candidates/CandidatesPage'),
);

export default DashboardPage(() => {
  const {messages} = useIntl();
  return (
    <>
      <PageMeta title={messages['common.candidates'] as string} />
      <JobIdCandidates />
    </>
  );
});

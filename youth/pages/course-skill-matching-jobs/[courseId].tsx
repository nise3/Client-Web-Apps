import asyncComponent from '../../../@crema/utility/asyncComponent';
import PageMeta from '../../../@crema/core/PageMeta';
import React from 'react';
import YouthFrontPage from '../../../@softbd/layouts/hoc/YouthFrontPage';
import {useIntl} from 'react-intl';

const JobListPage = asyncComponent(
  () => import('../../../modules/courseSkillMatchingJobs'),
);
export default YouthFrontPage(() => {
  const {messages} = useIntl();
  return (
    <>
      <PageMeta title={messages['common.jobs']} />
      <JobListPage />
    </>
  );
});

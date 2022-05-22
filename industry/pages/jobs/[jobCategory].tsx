import asyncComponent from '../../../@crema/utility/asyncComponent';
import PageMeta from '../../../@crema/core/PageMeta';
import React from 'react';
import IndustryDefaultFrontPage from '../../../@softbd/layouts/hoc/IndustryDefaultFrontPage';
import {useIntl} from 'react-intl';

const JobListByCategoryPage = asyncComponent(
  () => import('../../../modules/youth/jobList'),
);
export default IndustryDefaultFrontPage(() => {
  const {messages} = useIntl();
  return (
    <>
      <PageMeta title={messages['common.jobs']} />
      <JobListByCategoryPage />
    </>
  );
});

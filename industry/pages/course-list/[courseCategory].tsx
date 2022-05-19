import asyncComponent from '../../../@crema/utility/asyncComponent';
import PageMeta from '../../../@crema/core/PageMeta';
import React from 'react';
import IndustryDefaultFrontPage from '../../../@softbd/layouts/hoc/IndustryDefaultFrontPage';
import {useIntl} from 'react-intl';

const CourseCategoryPage = asyncComponent(
  () => import('../../../modules/youth/courseList'),
);
export default IndustryDefaultFrontPage(() => {
  const {messages} = useIntl();
  return (
    <>
      <PageMeta title={messages['common.courses']} />
      <CourseCategoryPage />
    </>
  );
});

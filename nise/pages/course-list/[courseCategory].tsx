import asyncComponent from '../../../@crema/utility/asyncComponent';
import PageMeta from '../../../@crema/core/PageMeta';
import React from 'react';
import NiseFrontPage from '../../../@softbd/layouts/hoc/NiseFrontPage';
import {useIntl} from 'react-intl';

const CourseCategoryPage = asyncComponent(
  () => import('../../../modules/youth/courseList'),
);
export default NiseFrontPage(() => {
  const {messages} = useIntl();
  return (
    <>
      <PageMeta title={messages['common.courses']} />
      <CourseCategoryPage />
    </>
  );
});

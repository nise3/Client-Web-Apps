import asyncComponent from '../../../@crema/utility/asyncComponent';
import PageMeta from '../../../@crema/core/PageMeta';
import React from 'react';
import NiseFrontPage from '../../../@softbd/layouts/hoc/NiseFrontPage';
import {useIntl} from 'react-intl';

const CourseDetailsPage = asyncComponent(
  () => import('../../../modules/youth/courseDetails'),
);
export default NiseFrontPage(() => {
  const {messages} = useIntl();
  return (
    <>
      <PageMeta title={messages['common.course_details']} />
      <CourseDetailsPage />
    </>
  );
});

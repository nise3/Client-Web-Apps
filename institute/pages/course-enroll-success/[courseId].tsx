import asyncComponent from '../../../@crema/utility/asyncComponent';
import PageMeta from '../../../@crema/core/PageMeta';
import React from 'react';
import InstituteDefaultFrontPage from '../../../@softbd/layouts/hoc/InstituteDefaultFrontPage';
import {useIntl} from 'react-intl';

const CourseEnrollmentSuccessPage = asyncComponent(
  () => import('../../../modules/youth/courseRegistrationSuccess'),
);
export default InstituteDefaultFrontPage(() => {
  const {messages} = useIntl();

  return (
    <>
      <PageMeta title={messages['common.course_registration']} />
      <CourseEnrollmentSuccessPage />
    </>
  );
});
